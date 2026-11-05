/* ==========================================================================
   Trade With Badami — blog admin (login + create / edit / publish / delete)
   Uses Supabase Auth + Postgres + Storage. Only emails listed in the
   `admins` table can write (enforced by database rules, not by this file).
   ========================================================================== */
(function () {
    "use strict";
    const CFG = window.TWB || {};
    const CATS = CFG.CATEGORIES || {};
    const $ = (s, c = document) => c.querySelector(s);
    const show = (el, on = true) => { el.hidden = !on; };
    const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    const configured = CFG.SUPABASE_URL && !/YOUR-/.test(CFG.SUPABASE_URL) && CFG.SUPABASE_KEY && !/YOUR-/.test(CFG.SUPABASE_KEY);
    const views = { login: $("#viewLogin"), list: $("#viewList"), editor: $("#viewEditor") };
    const topBar = $("#topBar");
    function go(name) {
        Object.entries(views).forEach(([k, el]) => show(el, k === name));
        show(topBar, name !== "login");
        window.scrollTo(0, 0);
    }
    let toastTimer;
    function toast(msg, isErr) {
        const t = $("#toast");
        t.textContent = msg; t.classList.toggle("err", !!isErr); t.classList.add("show");
        clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
    }
    function showErr(el, msg) { el.textContent = msg || ""; el.classList.toggle("show", !!msg); }

    if (!configured) {
        go("login");
        showErr($("#loginError"), "Not connected yet: open assets/js/config.js and add your Supabase URL and key (see SETUP-BLOG.md).");
        $("#btnLogin").disabled = true;
        return;
    }

    const sb = window.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_KEY, { auth: { persistSession: true, autoRefreshToken: true } });

    /* ----------------------------- AUTH ----------------------------- */
    async function ensureAdmin() {
        const { data, error } = await sb.rpc("is_admin");
        if (error || data !== true) {
            await sb.auth.signOut();
            return false;
        }
        return true;
    }

    $("#loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = $("#btnLogin"); showErr($("#loginError"), "");
        btn.disabled = true; btn.textContent = "Logging in…";
        const { data, error } = await sb.auth.signInWithPassword({ email: $("#loginEmail").value.trim(), password: $("#loginPass").value });
        if (error) { showErr($("#loginError"), "Wrong email or password."); }
        else if (!(await ensureAdmin())) { showErr($("#loginError"), "This account is not allowed to manage the blog."); }
        else { $("#whoami").textContent = data.user.email; await openList(); }
        btn.disabled = false; btn.textContent = "Log in";
    });

    $("#btnLogout").addEventListener("click", async () => {
        if (dirty && !confirm("You have unsaved changes. Log out anyway?")) return;
        dirty = false;
        await sb.auth.signOut();
        $("#loginPass").value = "";
        go("login");
    });

    /* ----------------------------- LIST ----------------------------- */
    const statusOf = (p) => !p.published ? ["draft", "Draft"] : (p.published_at && new Date(p.published_at) > new Date() ? ["sched", "Scheduled"] : ["pub", "Published"]);
    const fmt = (iso) => iso ? new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

    async function openList() {
        go("list");
        const body = $("#postRows");
        body.innerHTML = '<tr><td colspan="5">Loading…</td></tr>';
        const { data, error } = await sb.from("posts").select("id,slug,title,category,published,published_at,updated_at").order("published_at", { ascending: false, nullsFirst: true });
        if (error) { body.innerHTML = '<tr><td colspan="5">Could not load articles: ' + esc(error.message) + "</td></tr>"; return; }
        if (!data.length) { body.innerHTML = '<tr><td colspan="5">No articles yet. Click “New article”.</td></tr>'; return; }
        body.innerHTML = data.map((p) => {
            const [cls, label] = statusOf(p);
            const live = p.published && cls === "pub" ? `<a class="adm-btn outline sm" href="post.html?slug=${encodeURIComponent(p.slug)}" target="_blank" rel="noopener" title="View on site"><i class="fa-solid fa-arrow-up-right-from-square"></i></a> ` : "";
            return `<tr>
                <td class="title">${esc(p.title)}<small>/${esc(p.slug)}</small></td>
                <td class="hide-sm">${esc(CATS[p.category] || p.category)}</td>
                <td><span class="adm-pill ${cls}">${label}</span></td>
                <td class="hide-sm">${fmt(p.published_at || p.updated_at)}</td>
                <td class="acts">${live}<button class="adm-btn outline sm" data-edit="${p.id}"><i class="fa-regular fa-pen-to-square"></i> Edit</button></td>
            </tr>`;
        }).join("");
    }
    $("#postRows").addEventListener("click", (e) => { const b = e.target.closest("[data-edit]"); if (b) openEditor(b.dataset.edit); });
    $("#btnNew").addEventListener("click", () => openEditor(null));

    /* ----------------------------- EDITOR ----------------------------- */
    const f = { title: $("#fTitle"), slug: $("#fSlug"), excerpt: $("#fExcerpt"), date: $("#fDate"), cat: $("#fCategory"), read: $("#fRead"), cover: $("#fCover"), meta: $("#fMeta"), keywords: $("#fKeywords"), html: $("#htmlEditor") };
    f.cat.innerHTML = Object.entries(CATS).map(([k, v]) => `<option value="${esc(k)}">${esc(v)}</option>`).join("");

    let current = null;          // loaded row (null = new)
    let dirty = false, slugTouched = false, readTouched = false, mode = "visual";

    const quill = new Quill("#visualEditor", {
        theme: "snow",
        placeholder: "Write your article here…",
        modules: {
            toolbar: {
                container: [[{ header: [2, 3, false] }], ["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["blockquote", "link", "image"], ["clean"]],
                handlers: { image: () => pickImage((url) => { const r = quill.getSelection(true); quill.insertEmbed(r.index, "image", url, "user"); quill.setSelection(r.index + 1); }) }
            }
        }
    });

    const slugify = (s) => s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80).replace(/^-|-$/g, "");
    const getHtml = () => {
        if (mode === "html") return f.html.value.trim();
        const h = quill.root.innerHTML;
        return quill.getText().trim() === "" && !/<img/.test(h) ? "" : h;
    };
    const plain = (html) => { const d = document.createElement("div"); d.innerHTML = html; return (d.textContent || "").replace(/\s+/g, " ").trim(); };
    const toLocalInput = (iso) => { if (!iso) return ""; const d = new Date(iso); return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16); };
    const markDirty = () => { dirty = true; };

    function updateSlugHint() { $("#slugHint").innerHTML = "Link will be: …/post.html?slug=<b>" + esc(f.slug.value || "my-article-title") + "</b>"; }
    function updateStatusUi() {
        const p = current || {};
        const [cls, label] = current ? statusOf(p) : ["draft", "Draft"];
        const pill = $("#statusPill"); pill.className = "adm-pill " + cls; pill.textContent = label;
        $("#btnPublish span").textContent = current && p.published ? "Update" : "Publish";
        show($("#btnDelete"), !!current);
        $("#editorHeading").textContent = current ? "Edit article" : "New article";
    }
    function autoRead() {
        if (readTouched) return;
        const words = plain(getHtml()).split(" ").filter(Boolean).length;
        f.read.value = Math.max(1, Math.ceil(words / 200));
    }
    function setCover(url) {
        f.cover.value = url || "";
        const img = $("#coverPreview");
        if (url) { img.src = url; img.hidden = false; } else { img.removeAttribute("src"); img.hidden = true; }
        show($("#btnCoverRemove"), !!url);
    }

    function applyMode(m) {
        mode = m;
        $("#tabVisual").classList.toggle("on", m === "visual"); $("#tabHtml").classList.toggle("on", m === "html");
        show($("#paneVisual"), m === "visual"); show($("#paneHtml"), m === "html");
    }
    function setMode(m) {
        if (m === mode) return;
        if (m === "html") {
            f.html.value = getHtml();
        } else {
            if (/<table|class="(takeaways|callout|accordion)|<aside/.test(f.html.value) && !confirm("The Visual editor cannot keep tables, callouts and FAQ blocks — they may be removed. Switch anyway?")) return;
            quill.setContents([]); quill.clipboard.dangerouslyPasteHTML(0, f.html.value);
        }
        applyMode(m);
    }
    $("#tabVisual").addEventListener("click", () => setMode("visual"));
    $("#tabHtml").addEventListener("click", () => setMode("html"));

    async function openEditor(id) {
        showErr($("#editorError"), "");
        let row = null;
        if (id) {
            const { data, error } = await sb.from("posts").select("*").eq("id", id).single();
            if (error) return toast("Could not open the article.", true);
            row = data;
        }
        current = row; slugTouched = !!row; readTouched = !!row;
        f.title.value = row ? row.title : ""; f.slug.value = row ? row.slug : ""; f.excerpt.value = row ? row.excerpt : "";
        f.date.value = toLocalInput(row && row.published_at);
        if (row && ![...f.cat.options].some((o) => o.value === row.category)) f.cat.add(new Option(row.category, row.category));
        f.cat.value = row ? row.category : Object.keys(CATS)[0];
        f.read.value = row ? row.read_minutes : 5; f.meta.value = row ? row.meta_description || "" : ""; f.keywords.value = row ? row.keywords || "" : "";
        setCover(row ? row.cover_url : "");
        // choose the editor mode
        const html = row ? row.content : "";
        quill.setContents([]);
        if (/<table|class="(takeaways|callout|accordion)|<aside|<figure/.test(html)) { f.html.value = html; applyMode("html"); }
        else { f.html.value = ""; applyMode("visual"); quill.clipboard.dangerouslyPasteHTML(0, html); }
        updateSlugHint(); updateStatusUi(); go("editor");
        dirty = false;
    }

    // live helpers
    f.title.addEventListener("input", () => { if (!slugTouched) { f.slug.value = slugify(f.title.value); updateSlugHint(); } markDirty(); });
    f.slug.addEventListener("input", () => { slugTouched = true; f.slug.value = f.slug.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/-{2,}/g, "-").replace(/^-/, ""); updateSlugHint(); markDirty(); });
    f.slug.addEventListener("blur", () => { f.slug.value = slugify(f.slug.value); updateSlugHint(); });
    f.read.addEventListener("input", () => { readTouched = true; markDirty(); });
    f.html.addEventListener("input", () => { autoRead(); markDirty(); });
    quill.on("text-change", (d, o, source) => { if (source === "user") { autoRead(); markDirty(); } });
    [f.excerpt, f.date, f.cat, f.cover, f.meta, f.keywords].forEach((el) => el.addEventListener("input", markDirty));
    f.cover.addEventListener("change", () => setCover(f.cover.value.trim()));
    window.addEventListener("beforeunload", (e) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } });
    $("#btnBack").addEventListener("click", () => { if (dirty && !confirm("You have unsaved changes. Leave without saving?")) return; dirty = false; openList(); });

    /* ----------------------------- IMAGES ----------------------------- */
    function processImage(file, opts) {
        opts = opts || {};
        return new Promise((resolve, reject) => {
            if (/svg|gif/.test(file.type)) return resolve({ blob: file, ext: file.type.includes("svg") ? "svg" : "gif" });
            const img = new Image(), url = URL.createObjectURL(file);
            img.onload = () => {
                let sx = 0, sy = 0, sw = img.width, sh = img.height, w, h;
                if (opts.w && opts.h) {                      // crop to exact ratio (cover)
                    const target = opts.w / opts.h, ratio = sw / sh;
                    if (ratio > target) { const nw = sh * target; sx = (sw - nw) / 2; sw = nw; } else { const nh = sw / target; sy = (sh - nh) / 2; sh = nh; }
                    w = Math.min(opts.w, sw); h = Math.round(w / target);
                } else { w = Math.min(opts.maxW || 1600, sw); h = Math.round(sh * (w / sw)); }
                const c = document.createElement("canvas"); c.width = w; c.height = h;
                c.getContext("2d").drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
                c.toBlob((b) => { URL.revokeObjectURL(url); b ? resolve({ blob: b, ext: "webp" }) : reject(new Error("Image conversion failed")); }, "image/webp", 0.85);
            };
            img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("This file is not a valid image")); };
            img.src = url;
        });
    }
    async function uploadImage(file, opts) {
        const { blob, ext } = await processImage(file, opts);
        const d = new Date(), base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "image";
        const path = d.getFullYear() + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + Date.now() + "-" + base + "." + ext;
        const { error } = await sb.storage.from("blog-images").upload(path, blob, { contentType: blob.type || "image/" + ext, cacheControl: "31536000" });
        if (error) throw error;
        return sb.storage.from("blog-images").getPublicUrl(path).data.publicUrl;
    }
    function pickImage(cb, opts) {
        const inp = document.createElement("input"); inp.type = "file"; inp.accept = "image/*";
        inp.onchange = async () => {
            const file = inp.files[0]; if (!file) return;
            if (file.size > 12 * 1024 * 1024) return toast("Image is too large (max 12 MB).", true);
            toast("Uploading image…");
            try { cb(await uploadImage(file, opts)); toast("Image uploaded"); markDirty(); }
            catch (e) { toast("Upload failed: " + (e.message || e), true); }
        };
        inp.click();
    }
    $("#btnCover").addEventListener("click", () => pickImage((u) => setCover(u), { w: 1200, h: 630 }));
    $("#btnCoverRemove").addEventListener("click", () => { setCover(""); markDirty(); });

    // HTML-mode helpers
    function insertAtCursor(text) {
        const t = f.html, s = t.selectionStart, e = t.selectionEnd;
        t.value = t.value.slice(0, s) + text + t.value.slice(e);
        t.focus(); t.selectionStart = t.selectionEnd = s + text.length;
        autoRead(); markDirty();
    }
    const SNIPPETS = {
        callout: '\n<div class="callout"><strong>Title</strong>Your highlighted note goes here.</div>\n',
        takeaways: '\n<aside class="takeaways">\n<h2>Key Takeaways</h2>\n<ul class="check-list"><li>First point</li><li>Second point</li><li>Third point</li></ul>\n</aside>\n',
        table: '\n<div class="table-wrap"><table>\n<thead><tr><th>Column 1</th><th>Column 2</th></tr></thead>\n<tbody>\n<tr><td>Row 1</td><td>Value</td></tr>\n<tr><td>Row 2</td><td>Value</td></tr>\n</tbody></table></div>\n'
    };
    document.querySelectorAll("[data-snippet]").forEach((b) => b.addEventListener("click", () => insertAtCursor(SNIPPETS[b.dataset.snippet])));
    $("#btnHtmlImage").addEventListener("click", () => pickImage((u) => insertAtCursor('\n<p><img src="' + u + '" alt="Describe the image" loading="lazy"></p>\n')));

    /* ----------------------------- SAVE ----------------------------- */
    let saving = false;
    async function save(publish) {
        if (saving) return;
        const err = $("#editorError"); showErr(err, "");
        const title = f.title.value.trim(), slug = slugify(f.slug.value || f.title.value), content = getHtml();
        if (!title) return showErr(err, "Please write a title."), f.title.focus();
        if (!slug) return showErr(err, "Please add a URL slug."), f.slug.focus();
        if (publish && !content) return showErr(err, "The article is empty — write something before publishing.");

        let excerpt = f.excerpt.value.trim();
        if (!excerpt) { const t = plain(content); excerpt = t.length > 170 ? t.slice(0, 167).replace(/\s+\S*$/, "") + "…" : t; }
        let when = f.date.value ? new Date(f.date.value).toISOString() : (current && current.published_at) || null;
        if (publish && !when) when = new Date().toISOString();
        const row = {
            title, slug, content, excerpt, category: f.cat.value, cover_url: f.cover.value.trim() || null,
            meta_description: f.meta.value.trim() || null, keywords: f.keywords.value.trim() || null,
            read_minutes: Math.max(1, parseInt(f.read.value, 10) || 5), published: !!publish, published_at: when
        };
        saving = true; [$("#btnDraft"), $("#btnPublish")].forEach((b) => (b.disabled = true));
        const q = current ? sb.from("posts").update(row).eq("id", current.id) : sb.from("posts").insert(row);
        const { data, error } = await q.select().single();
        saving = false; [$("#btnDraft"), $("#btnPublish")].forEach((b) => (b.disabled = false));
        if (error) {
            showErr(err, error.code === "23505" ? "Another article already uses this URL slug. Please change the slug." : "Could not save: " + error.message);
            return window.scrollTo(0, 0);
        }
        current = data; f.slug.value = data.slug; f.date.value = toLocalInput(data.published_at); updateSlugHint(); updateStatusUi(); dirty = false;
        toast(publish ? (new Date(data.published_at) > new Date() ? "Scheduled ✔" : "Published ✔") : "Draft saved ✔");
    }
    $("#btnDraft").addEventListener("click", () => save(false));
    $("#btnPublish").addEventListener("click", () => save(true));
    document.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s" && !views.editor.hidden) { e.preventDefault(); save(!!(current && current.published)); } });

    $("#btnDelete").addEventListener("click", async () => {
        if (!current) return;
        if (!confirm("Delete “" + current.title + "” permanently? This cannot be undone.")) return;
        const { error } = await sb.from("posts").delete().eq("id", current.id);
        if (error) return toast("Could not delete: " + error.message, true);
        dirty = false; toast("Article deleted"); openList();
    });

    /* ----------------------------- PREVIEW ----------------------------- */
    $("#btnPreview").addEventListener("click", () => {
        $("#pvCat").textContent = CATS[f.cat.value] || f.cat.value;
        $("#pvTitle").textContent = f.title.value || "Untitled";
        const c = f.cover.value.trim(); $("#pvCover").src = c || ""; show($("#pvCoverWrap"), !!c);
        $("#pvBody").innerHTML = getHtml() || "<p><em>Nothing written yet.</em></p>";
        $("#previewBox").classList.add("show"); document.body.style.overflow = "hidden";
    });
    const closePv = () => { $("#previewBox").classList.remove("show"); document.body.style.overflow = ""; };
    $("#btnClosePreview").addEventListener("click", closePv);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePv(); });

    /* ----------------------------- START ----------------------------- */
    (async function start() {
        const { data } = await sb.auth.getSession();
        if (data.session && (await ensureAdmin())) { $("#whoami").textContent = data.session.user.email; openList(); }
        else go("login");
    })();
})();
