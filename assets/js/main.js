/* ==========================================================================
   Trade With Badami — Main Script (vanilla JS, requires Bootstrap 5 bundle)

   01. Helpers
   02. Header: sticky shadow + active link
   03. Back to top + footer year
   04. Reveal on scroll
   05. Hide media whose files are not uploaded yet
   06. Lightbox (signal result images, moment photos, videos)
   07. Filters (results + blog) and blog search
   08. Risk calculator
   09. Contact form (Web3Forms / Formspree / any JSON endpoint)
   10. Blog article: table of contents, reading progress, copy link
   ========================================================================== */
(function () {
    "use strict";

    /* 01. Helpers -------------------------------------------------------- */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    /* 02. Header --------------------------------------------------------- */
    const header = $(".site-header");
    const backToTop = $(".back-to-top");

    function onScroll() {
        const y = window.scrollY;
        if (header) header.classList.toggle("is-scrolled", y > 10);
        if (backToTop) backToTop.classList.toggle("is-visible", y > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const page = document.body.dataset.page;
    if (page) {
        $$('[data-nav="' + page + '"]').forEach((link) => {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        });
    }

    /* 03. Back to top + year --------------------------------------------- */
    if (backToTop) {
        backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

    /* 04. Reveal on scroll ----------------------------------------------- */
    const revealEls = $$(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* 05. Hide media not uploaded yet ------------------------------------
       Cards marked [data-optional] are hidden automatically if their image or
       video file is missing, so empty slots never show as broken images.  */
    function updateEmptyStates() {
        $$("[data-empty-target]").forEach((box) => {
            const scope = $(box.dataset.emptyTarget);
            if (!scope) return;
            const visible = $$("[data-optional]", scope).filter((el) => !el.classList.contains("is-missing"));
            const section = box.closest("[data-hide-when-empty]");
            if (section) section.hidden = visible.length === 0;
            else box.hidden = visible.length > 0; // show "coming soon" message when nothing is uploaded
        });
    }

    $$("[data-optional]").forEach((item) => {
        const img = $("img", item);
        const video = $("video", item);
        const markMissing = () => {
            item.classList.add("is-missing");
            updateEmptyStates();
        };
        if (img) {
            if (img.complete && img.naturalWidth === 0) markMissing();
            img.addEventListener("error", markMissing, { once: true });
        }
        if (video) {
            const src = $("source", video) || video;
            src.addEventListener("error", markMissing, { once: true });
        }
    });
    updateEmptyStates();

    /* 06. Lightbox ------------------------------------------------------- */
    const lightboxEl = $("#lightboxModal");
    if (lightboxEl && window.bootstrap) {
        const modal = bootstrap.Modal.getOrCreateInstance(lightboxEl);
        const stage = $(".lightbox-stage", lightboxEl);
        const caption = $(".lightbox-caption", lightboxEl);
        const counter = $(".lightbox-counter", lightboxEl);
        const prevBtn = $(".lightbox-btn.prev", lightboxEl);
        const nextBtn = $(".lightbox-btn.next", lightboxEl);
        let group = [];
        let index = 0;

        const visibleTriggers = (name) =>
            $$('[data-lightbox="' + name + '"]').filter((el) => {
                const item = el.closest(".result-item, .moment-item");
                return !item || (!item.classList.contains("is-hidden") && !item.classList.contains("is-missing"));
            });

        function render() {
            const el = group[index];
            if (!el) return;
            const type = el.dataset.type || "image";
            const src = el.dataset.src;
            const title = el.dataset.title || "";
            const sub = el.dataset.subtitle || "";
            stage.innerHTML = "";

            if (type === "video") {
                const v = document.createElement("video");
                v.src = src;
                v.controls = true;
                v.autoplay = true;
                v.playsInline = true;
                if (el.dataset.poster) v.poster = el.dataset.poster;
                stage.appendChild(v);
            } else {
                const img = document.createElement("img");
                img.src = src;
                img.alt = title;
                stage.appendChild(img);
            }
            const multiple = group.length > 1;
            stage.appendChild(prevBtn);
            stage.appendChild(nextBtn);
            prevBtn.hidden = nextBtn.hidden = !multiple;
            counter.hidden = !multiple;
            caption.innerHTML = "";
            if (title) {
                const strong = document.createElement("strong");
                strong.textContent = title;
                caption.appendChild(strong);
            }
            if (sub) {
                const small = document.createElement("small");
                small.textContent = sub;
                caption.appendChild(small);
            }
            counter.textContent = index + 1 + " / " + group.length;
        }

        function go(step) {
            index = (index + step + group.length) % group.length;
            render();
        }

        document.addEventListener("click", (e) => {
            const trigger = e.target.closest("[data-lightbox]");
            if (!trigger) return;
            e.preventDefault();
            group = visibleTriggers(trigger.dataset.lightbox);
            index = Math.max(0, group.indexOf(trigger));
            render();
            modal.show();
        });

        prevBtn.addEventListener("click", () => go(-1));
        nextBtn.addEventListener("click", () => go(1));
        document.addEventListener("keydown", (e) => {
            if (!lightboxEl.classList.contains("show") || group.length < 2) return;
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
        });

        // Swipe support on touch screens
        let touchX = null;
        stage.addEventListener("touchstart", (e) => (touchX = e.touches[0].clientX), { passive: true });
        stage.addEventListener("touchend", (e) => {
            if (touchX === null || group.length < 2) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1);
            touchX = null;
        });

        // Stop video playback when the modal closes
        lightboxEl.addEventListener("hidden.bs.modal", () => (stage.innerHTML = ""));
    }

    /* 07. Filters & search ----------------------------------------------- */
    $$("[data-filter-group]").forEach((bar) => {
        const target = $(bar.dataset.filterGroup);
        if (!target) return;
        const itemSelector = bar.dataset.itemSelector || "[data-category]";
        const searchInput = bar.dataset.search ? $(bar.dataset.search) : null;
        const emptyMsg = bar.dataset.empty ? $(bar.dataset.empty) : null;
        let active = "all";

        function apply() {
            const q = searchInput ? searchInput.value.trim().toLowerCase() : "";
            let shown = 0;
            $$(itemSelector, target).forEach((item) => {
                const cats = (item.dataset.category || "").split(" ");
                const text = (item.dataset.search || item.textContent).toLowerCase();
                const match = (active === "all" || cats.includes(active)) && (!q || text.includes(q));
                item.classList.toggle("is-hidden", !match);
                if (match && !item.classList.contains("is-missing")) shown++;
            });
            if (emptyMsg) emptyMsg.style.display = shown ? "none" : "block";
        }

        $$(".filter-btn", bar).forEach((btn) => {
            btn.addEventListener("click", () => {
                $$(".filter-btn", bar).forEach((b) => {
                    b.classList.remove("active");
                    b.setAttribute("aria-pressed", "false");
                });
                btn.classList.add("active");
                btn.setAttribute("aria-pressed", "true");
                active = btn.dataset.filter;
                apply();
            });
        });
        if (searchInput) searchInput.addEventListener("input", apply);

        // Allow deep links like blog.html?category=risk-management
        const params = new URLSearchParams(window.location.search);
        const preset = params.get("category");
        if (preset) {
            const btn = $('.filter-btn[data-filter="' + preset + '"]', bar);
            if (btn) btn.click();
        }
        if (searchInput && params.get("q")) {
            searchInput.value = params.get("q");
            apply();
        }
    });

    /* 08. Risk calculator ------------------------------------------------ */
    const calc = $("#riskCalculator");
    if (calc) {
        const fmt = (n) =>
            "$" + (isFinite(n) ? n : 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const read = (name) => parseFloat(calc.elements[name].value) || 0;

        function compute() {
            const balance = read("balance");
            const riskPct = read("riskPct");
            const rr = read("rr");
            const trades = read("trades");
            const riskAmount = (balance * riskPct) / 100;
            const target = riskAmount * rr;
            const lossStreak = riskAmount * trades;

            $("#calcRisk").textContent = fmt(riskAmount);
            $("#calcTarget").textContent = fmt(target);
            $("#calcStreak").textContent = fmt(lossStreak);
            $("#calcLeft").textContent = fmt(Math.max(balance - lossStreak, 0));

            const warn = $("#calcWarning");
            if (warn) warn.hidden = riskPct <= 2;
        }
        calc.addEventListener("input", compute);
        calc.addEventListener("submit", (e) => e.preventDefault());
        compute();
    }

    /* 09. Contact form ---------------------------------------------------
       Works with Web3Forms (default), Formspree or any endpoint that accepts
       a JSON POST. Set the endpoint in the form's "action" attribute and,
       for Web3Forms, paste your access key into the hidden "access_key" field. */
    $$("form[data-ajax-form]").forEach((form) => {
        const status = $(".form-status", form);
        const btn = $('button[type="submit"]', form);

        function showStatus(type, msg) {
            status.className = "form-status is-" + type;
            status.textContent = msg;
            status.setAttribute("role", type === "error" ? "alert" : "status");
        }

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            status.className = "form-status";

            if (!form.checkValidity()) {
                form.classList.add("was-validated");
                const firstInvalid = $(":invalid", form);
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Spam protection: bots fill the hidden field
            const honey = form.elements["botcheck"];
            if (honey && honey.checked) return;

            const keyField = form.elements["access_key"];
            if (keyField && /YOUR_/.test(keyField.value)) {
                showStatus(
                    "error",
                    "The form is not connected yet. Please add your Web3Forms access key in contact.html, or message us on WhatsApp for now."
                );
                return;
            }

            const data = Object.fromEntries(new FormData(form).entries());
            delete data.botcheck;

            btn.disabled = true;
            btn.classList.add("is-loading");

            try {
                const res = await fetch(form.action, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify(data),
                });
                const json = await res.json().catch(() => ({}));
                if (res.ok && json.success !== false) {
                    form.reset();
                    form.classList.remove("was-validated");
                    showStatus("success", "Thank you! Your message has been sent. Waseem will get back to you soon.");
                } else {
                    throw new Error(json.message || "Request failed");
                }
            } catch (err) {
                showStatus(
                    "error",
                    "Sorry, your message could not be sent right now. Please try again or contact us on WhatsApp."
                );
            } finally {
                btn.disabled = false;
                btn.classList.remove("is-loading");
            }
        });
    });

    /* 10. Blog article helpers ------------------------------------------- */
    const article = $(".article-content");
    const tocList = $("#tocList");
    if (article && tocList) {
        const slug = (s) =>
            s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);
        $$("h2", article)
            .filter((h) => !h.closest(".toc, .takeaways"))
            .forEach((h) => {
                if (!h.id) h.id = slug(h.textContent);
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = "#" + h.id;
                a.textContent = h.textContent;
                li.appendChild(a);
                tocList.appendChild(li);
            });
    }

    const progress = $(".reading-progress");
    if (progress && article) {
        const update = () => {
            const rect = article.getBoundingClientRect();
            const total = article.offsetHeight - window.innerHeight;
            const done = Math.min(Math.max(-rect.top / (total > 0 ? total : 1), 0), 1);
            progress.style.width = done * 100 + "%";
        };
        window.addEventListener("scroll", update, { passive: true });
        update();
    }

    $$("[data-copy-link]").forEach((btn) => {
        btn.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                const icon = $("i", btn);
                icon.className = "fa-solid fa-check";
                setTimeout(() => (icon.className = "fa-solid fa-link"), 1800);
            } catch (e) {
                window.prompt("Copy this link:", window.location.href);
            }
        });
    });
})();
