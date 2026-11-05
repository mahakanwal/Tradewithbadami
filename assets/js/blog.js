/* ==========================================================================
   Trade With Badami — dynamic blog (public side)
   Reads published posts from Supabase through its REST API (no library needed).
   Works on:  blog.html (list)   and   post.html?slug=... (single article)
   ========================================================================== */
(function () {
    "use strict";
    const CFG = window.TWB || {};
    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
    const CATS = CFG.CATEGORIES || {};
    const configured = CFG.SUPABASE_URL && !/YOUR-/.test(CFG.SUPABASE_URL) && CFG.SUPABASE_KEY && !/YOUR-/.test(CFG.SUPABASE_KEY);

    const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const catLabel = (slug) => CATS[slug] || slug;
    const fmtDate = (iso) => iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "Asia/Karachi" }) : "";
    const isoDate = (iso) => (iso ? new Date(iso).toISOString().slice(0, 10) : "");
    const postUrl = (slug) => "post.html?slug=" + encodeURIComponent(slug);
    const absPostUrl = (slug) => (CFG.SITE_URL || location.origin) + "/post.html?slug=" + encodeURIComponent(slug);
    const cover = (u) => u || "assets/images/brand/og-image.jpg";
    const absUrl = (u) => (/^https?:/.test(u) ? u : (CFG.SITE_URL || location.origin) + "/" + String(u).replace(/^\//, ""));

    async function api(query) {
        const res = await fetch(CFG.SUPABASE_URL + "/rest/v1/" + query, { headers: { apikey: CFG.SUPABASE_KEY, Accept: "application/json" } });
        if (!res.ok) throw new Error("API " + res.status);
        return res.json();
    }
    const LIST_COLS = "slug,title,excerpt,category,cover_url,read_minutes,published_at,keywords";
    const fetchList = () => api("posts?select=" + LIST_COLS + "&order=published_at.desc.nullslast&limit=500");

    function card(p) {
        const url = postUrl(p.slug);
        return `
        <article class="col-md-6 col-lg-4 blog-item" data-category="${esc(p.category)}">
            <div class="blog-card">
                <a class="blog-thumb" href="${url}" tabindex="-1" aria-hidden="true">
                    <img src="${esc(cover(p.cover_url))}" alt="${esc(p.title)}" width="1200" height="630" loading="lazy">
                </a>
                <div class="blog-body">
                    <span class="blog-cat">${esc(catLabel(p.category))}</span>
                    <div class="blog-meta">
                        <span><i class="fa-regular fa-calendar" aria-hidden="true"></i><time datetime="${isoDate(p.published_at)}">${fmtDate(p.published_at)}</time></span>
                        <span><i class="fa-regular fa-clock" aria-hidden="true"></i>${p.read_minutes || 5} min read</span>
                    </div>
                    <h3><a href="${url}">${esc(p.title)}</a></h3>
                    <p>${esc(p.excerpt)}</p>
                    <a class="link-arrow" href="${url}" aria-label="Read: ${esc(p.title)}">Read Article <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>
        </article>`;
    }

    function notConfigured(el) {
        el.innerHTML = '<div class="col-12"><div class="results-empty" style="display:block"><p class="mb-0">Blog is not connected yet. Open <code>assets/js/config.js</code> and add your Supabase URL and key (see SETUP-BLOG.md).</p></div></div>';
    }

    /* ======================= BLOG LIST ======================= */
    async function initList() {
        const grid = $("#blogGrid");
        if (!grid) return;
        const bar = $("#blogFilters"), search = $("#blogSearch"), empty = $("#blogEmpty"), more = $("#blogMore");
        if (!configured) return notConfigured(grid);

        grid.innerHTML = '<div class="col-12 text-center py-5"><p class="mb-0">Loading articles…</p></div>';
        let posts = [];
        try { posts = await fetchList(); }
        catch (e) { grid.innerHTML = '<div class="col-12"><div class="results-empty" style="display:block"><p class="mb-0">Articles could not be loaded right now. Please refresh in a moment.</p></div></div>'; return; }

        const params = new URLSearchParams(location.search);
        let active = CATS[params.get("category")] ? params.get("category") : "all";
        let q = (params.get("q") || "").trim().toLowerCase();
        let shown = CFG.POSTS_PER_PAGE || 9;
        if (search && q) search.value = params.get("q");

        // Filter buttons (only categories that actually have posts)
        const used = new Set(posts.map((p) => p.category));
        const btn = (slug, label) => `<button type="button" class="filter-btn${slug === active ? " active" : ""}" data-filter="${esc(slug)}" aria-pressed="${slug === active}">${esc(label)}</button>`;
        bar.innerHTML = btn("all", "All") + Object.keys(CATS).filter((c) => used.has(c)).map((c) => btn(c, CATS[c])).join("");

        function render() {
            const list = posts.filter((p) => {
                const okCat = active === "all" || p.category === active;
                const hay = (p.title + " " + p.excerpt + " " + (p.keywords || "") + " " + catLabel(p.category)).toLowerCase();
                return okCat && (!q || hay.includes(q));
            });
            grid.innerHTML = list.slice(0, shown).map(card).join("");
            empty.style.display = list.length ? "none" : "block";
            if (more) more.style.display = list.length > shown ? "" : "none";
        }
        bar.addEventListener("click", (e) => {
            const b = e.target.closest(".filter-btn");
            if (!b) return;
            active = b.dataset.filter; shown = CFG.POSTS_PER_PAGE || 9;
            $$(".filter-btn", bar).forEach((x) => { x.classList.toggle("active", x === b); x.setAttribute("aria-pressed", x === b); });
            render();
        });
        if (search) search.addEventListener("input", () => { q = search.value.trim().toLowerCase(); shown = CFG.POSTS_PER_PAGE || 9; render(); });
        if (more) more.querySelector("button").addEventListener("click", () => { shown += CFG.POSTS_PER_PAGE || 9; render(); });
        render();
    }

    /* ======================= HOME: LATEST POSTS ======================= */
    async function initLatest() {
        const box = $("#latestPosts");
        if (!box) return;
        const section = $("#latestSection");
        if (!configured) { if (section) section.hidden = true; return; }
        try {
            const posts = (await fetchList()).slice(0, parseInt(box.dataset.count, 10) || 3);
            if (!posts.length) { if (section) section.hidden = true; return; }
            box.innerHTML = posts.map(card).join("");
        } catch (e) { if (section) section.hidden = true; }
    }

    /* ======================= SINGLE POST ======================= */
    function setMeta(sel, attr, val) { const el = $(sel); if (el && val) el.setAttribute(attr, val); }

    function buildToc(root) {
        const toc = $("#tocList");
        if (!toc) return;
        const slug = (s) => s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);
        const hs = $$("h2", root).filter((h) => !h.closest(".toc, .takeaways, .faq-accordion"));
        if (hs.length < 2) { const nav = $(".toc"); if (nav) nav.style.display = "none"; return; }
        hs.forEach((h) => {
            if (!h.id) h.id = slug(h.textContent) || "section";
            const li = document.createElement("li"), a = document.createElement("a");
            a.href = "#" + h.id; a.textContent = h.textContent; li.appendChild(a); toc.appendChild(li);
        });
    }

    function showNotFound(msg) {
        document.title = "Article not found | Trade With Badami";
        const r = $("#postRoot");
        r.innerHTML = '<section class="section"><div class="container text-center"><h1 class="mb-3">Article not found</h1><p class="mb-4">' + esc(msg || "This article does not exist or is no longer published.") + '</p><a class="btn-main" href="blog.html">Back to the blog <i class="fa-solid fa-arrow-right"></i></a></div></section>';
        const m = document.createElement("meta"); m.name = "robots"; m.content = "noindex"; document.head.appendChild(m);
    }

    async function initPost() {
        const root = $("#postRoot");
        if (!root) return;
        if (!configured) { root.innerHTML = '<section class="section"><div class="container"><p>Blog is not connected yet (see SETUP-BLOG.md).</p></div></section>'; return; }
        const slug = new URLSearchParams(location.search).get("slug");
        if (!slug) return showNotFound("No article was selected.");

        let post, list;
        try {
            const [rows, all] = await Promise.all([
                api("posts?select=*&slug=eq." + encodeURIComponent(slug) + "&limit=1"),
                fetchList()
            ]);
            post = rows[0]; list = all;
        } catch (e) { return showNotFound("The article could not be loaded right now. Please try again."); }
        if (!post) return showNotFound();

        const url = absPostUrl(post.slug), img = absUrl(cover(post.cover_url));
        const desc = post.meta_description || post.excerpt || "";
        const catUrl = "blog.html?category=" + encodeURIComponent(post.category);

        // ---- <head> / SEO
        document.title = post.title + " | Trade With Badami";
        setMeta('meta[name="description"]', "content", desc);
        setMeta('meta[name="keywords"]', "content", post.keywords);
        setMeta('link[rel="canonical"]', "href", url);
        setMeta('meta[property="og:title"]', "content", post.title);
        setMeta('meta[property="og:description"]', "content", desc);
        setMeta('meta[property="og:url"]', "content", url);
        setMeta('meta[property="og:image"]', "content", img);
        setMeta('meta[name="twitter:title"]', "content", post.title);
        setMeta('meta[name="twitter:description"]', "content", desc);
        setMeta('meta[name="twitter:image"]', "content", img);
        const ld = {
            "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: desc, image: img,
            datePublished: post.published_at, dateModified: post.updated_at || post.published_at,
            author: { "@type": "Person", name: CFG.AUTHOR, url: (CFG.SITE_URL || "") + "/about.html" },
            publisher: { "@type": "Organization", name: "Trade With Badami", logo: { "@type": "ImageObject", url: (CFG.SITE_URL || "") + "/assets/images/brand/logo.png" } },
            mainEntityOfPage: { "@type": "WebPage", "@id": url }, articleSection: catLabel(post.category), keywords: post.keywords || "", inLanguage: "en",
            timeRequired: "PT" + (post.read_minutes || 5) + "M"
        };
        const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);

        // ---- Header
        $("#postCat").textContent = catLabel(post.category); $("#postCat").href = catUrl;
        $("#postCrumbCat").textContent = catLabel(post.category);
        $("#postTitle").textContent = post.title;
        $("#postDate").textContent = fmtDate(post.published_at); $("#postDate").setAttribute("datetime", isoDate(post.published_at));
        $("#postRead").textContent = (post.read_minutes || 5) + " min read";
        // ---- Cover + content
        const coverImg = $("#postCover");
        coverImg.src = cover(post.cover_url); coverImg.alt = post.title;
        const body = $("#postBody");
        body.innerHTML = post.content || "";
        $$("a[href^='http']", body).forEach((a) => { if (!a.href.startsWith(location.origin)) { a.target = "_blank"; a.rel = "noopener"; } });
        buildToc($(".article-content"));

        // ---- Share links
        const enc = encodeURIComponent;
        $("#shareWa").href = "https://wa.me/?text=" + enc(post.title + " " + url);
        $("#shareFb").href = "https://www.facebook.com/sharer/sharer.php?u=" + enc(url);
        $("#shareX").href = "https://twitter.com/intent/tweet?url=" + enc(url) + "&text=" + enc(post.title);
        $("#shareLi").href = "https://www.linkedin.com/sharing/share-offsite/?url=" + enc(url);

        // ---- Prev / next (by date)
        const i = list.findIndex((p) => p.slug === post.slug);
        const newer = i > 0 ? list[i - 1] : null, older = i >= 0 && i < list.length - 1 ? list[i + 1] : null;
        $("#postNav").innerHTML =
            (older ? `<a class="prev" href="${postUrl(older.slug)}"><span><i class="fa-solid fa-arrow-left"></i> Previous</span><strong>${esc(older.title)}</strong></a>` : "<span></span>") +
            (newer ? `<a class="next" href="${postUrl(newer.slug)}"><span>Next <i class="fa-solid fa-arrow-right"></i></span><strong>${esc(newer.title)}</strong></a>` : "<span></span>");

        // ---- Sidebar
        $("#recentPosts").innerHTML = list.filter((p) => p.slug !== post.slug).slice(0, 4).map((p) =>
            `<div class="recent-post"><img src="${esc(cover(p.cover_url))}" alt="" width="76" height="56" loading="lazy"><div><a href="${postUrl(p.slug)}">${esc(p.title)}</a><small>${fmtDate(p.published_at)}</small></div></div>`).join("");
        const counts = {}; list.forEach((p) => (counts[p.category] = (counts[p.category] || 0) + 1));
        $("#catList").innerHTML = Object.keys(CATS).filter((c) => counts[c]).map((c) =>
            `<li><a href="blog.html?category=${esc(c)}">${esc(CATS[c])} <span>(${counts[c]})</span></a></li>`).join("");

        // ---- Related (same category first, then newest)
        const others = list.filter((p) => p.slug !== post.slug);
        const related = others.filter((p) => p.category === post.category).concat(others.filter((p) => p.category !== post.category)).slice(0, 3);
        if (related.length) { $("#relatedGrid").innerHTML = related.map(card).join(""); $("#relatedSection").hidden = false; }

        root.classList.remove("is-loading");
    }

    initList();
    initLatest();
    initPost();
})();
