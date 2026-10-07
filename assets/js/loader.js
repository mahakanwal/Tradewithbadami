/* Trade With Badami — GSAP page loader
   Add in <head> (NOT deferred):  <script src="assets/js/loader.js"></script>
   Settings below. */
(function () {
  'use strict';

  var SHOW_EVERY_PAGE = false;   // false = first visit of a session + on every refresh; true = on every page load
  var MIN_TIME = 2300;           // minimum ms the loader stays (intro animation length)
  var MAX_TIME = 8000;           // safety: always leave after this many ms
  var GSAP_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';

  var force = /[?&]loader\b/.test(location.search);   // add ?loader to the URL to force it while testing
  var isReload = false;                                   // page refresh (F5 / Ctrl+R / pull-to-refresh)
  try {
    var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    isReload = nav ? nav.type === 'reload' : (performance.navigation && performance.navigation.type === 1);
  } catch (e) {}
  try {
    if (!force && !SHOW_EVERY_PAGE && !isReload && sessionStorage.getItem('twb_loader') === '1') return;
    sessionStorage.setItem('twb_loader', '1');
  } catch (e) {}

  var root = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- styles ---------- */
  var css =
    'html.ld-lock,html.ld-lock body{overflow:hidden!important}' +
    '#twb-loader{position:fixed;inset:0;z-index:99999;color:#fff;font-family:"Hanken Grotesk",system-ui,sans-serif;-webkit-font-smoothing:antialiased}' +
    '#twb-loader *{box-sizing:border-box}' +
    '.ld-panel{position:absolute;left:0;width:100%;height:50.6%;background:#033428;will-change:transform}' +
    '.ld-panel.t{top:0}.ld-panel.b{bottom:0}' +
    '.ld-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:64px 64px;' +
      '-webkit-mask-image:radial-gradient(ellipse at center,#000 30%,transparent 78%);mask-image:radial-gradient(ellipse at center,#000 30%,transparent 78%)}' +
    '.ld-glow{position:absolute;left:50%;top:50%;width:70vmin;height:70vmin;margin:-35vmin 0 0 -35vmin;border-radius:50%;background:radial-gradient(circle,rgba(156,237,106,.22),transparent 68%)}' +
    '.ld-chart{position:absolute;left:50%;bottom:7%;transform:translateX(-50%);width:min(900px,96vw);height:auto;max-height:46vh;opacity:.7;pointer-events:none;overflow:visible}' +
    '.ld-c{transform-box:fill-box;transform-origin:50% 100%}' +
    '.ld-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px}' +
    '.ld-title{display:flex;flex-wrap:wrap;justify-content:center;gap:0 .3em;margin:0;font-family:"Moderustic","Hanken Grotesk",system-ui,sans-serif;font-weight:800;font-size:clamp(42px,9vw,104px);line-height:1.08;letter-spacing:-.01em}' +
    '.ld-word{display:inline-block;overflow:hidden;padding:.06em .03em .14em}' +
    '.ld-word.w2{color:#9ced6a;font-style:italic;font-weight:700}' +
    '.ld-char{display:inline-block;will-change:transform}' +
    '.ld-sub{margin-top:14px;overflow:hidden;padding:2px 0}' +
    '.ld-sub span{display:block;font-size:clamp(11px,1.5vw,14px);letter-spacing:.34em;text-transform:uppercase;color:rgba(255,255,255,.62);font-weight:600}' +
    '.ld-meter{margin-top:34px;display:flex;flex-direction:column;align-items:center}' +
    '.ld-bar{width:min(280px,62vw);height:3px;border-radius:3px;background:rgba(255,255,255,.14);overflow:hidden}' +
    '.ld-bar i{display:block;height:100%;width:100%;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,#7fd94b,#c8f984);box-shadow:0 0 12px rgba(156,237,106,.7)}' +
    '.ld-pct{margin-top:12px;font-size:12px;letter-spacing:.22em;color:rgba(255,255,255,.55);font-variant-numeric:tabular-nums;font-weight:600}' +
    '.ld-fade{transition:opacity .5s ease}' +
    '@media(max-width:575px){.ld-title{flex-direction:column;align-items:center}}';
  var st = document.createElement('style'); st.id = 'twb-loader-css'; st.textContent = css;
  (document.head || root).appendChild(st);

  /* ---------- markup ---------- */
  function chars(word, cls) {
    return '<span class="ld-word ' + cls + '">' + word.split('').map(function (c) { return '<span class="ld-char">' + c + '</span>'; }).join('') + '</span>';
  }
  // candles (deterministic upward-trending series)
  var N = 15, W = 900, H = 260, step = W / N, lv = [0.22, 0.30, 0.26, 0.38, 0.33, 0.30, 0.44, 0.52, 0.47, 0.58, 0.55, 0.50, 0.66, 0.74, 0.84];
  var candlesSvg = '', pts = [];
  for (var i = 0; i < N; i++) {
    var close = lv[i], open = i ? lv[i - 1] : 0.18, up = close >= open;
    var x = step * i + step / 2, yo = H - open * H, yc = H - close * H;
    var hi = Math.min(yo, yc) - (10 + (i * 7) % 16), lo = Math.max(yo, yc) + (8 + (i * 11) % 14);
    var col = up ? '#26d07c' : '#ef4b4b';
    candlesSvg += '<g class="ld-c"><line x1="' + x + '" x2="' + x + '" y1="' + hi + '" y2="' + lo + '" stroke="' + col + '" stroke-width="2.4" stroke-linecap="round"/>' +
      '<rect x="' + (x - step * 0.2) + '" y="' + Math.min(yo, yc) + '" width="' + (step * 0.4) + '" height="' + Math.max(Math.abs(yo - yc), 4) + '" rx="2" fill="' + col + '"/></g>';
    pts.push(x.toFixed(1) + ',' + (yc - 22).toFixed(1));
  }
  var el = document.createElement('div');
  el.id = 'twb-loader'; el.setAttribute('role', 'status'); el.setAttribute('aria-label', 'Loading Trade With Badami');
  el.innerHTML =
    '<div class="ld-panel t"></div><div class="ld-panel b"></div>' +
    '<div class="ld-glow"></div><div class="ld-grid"></div>' +
    '<svg class="ld-chart" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMax meet" aria-hidden="true">' + candlesSvg +
      '<polyline class="ld-line" points="' + pts.join(' ') + '" fill="none" stroke="#9ced6a" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 6px rgba(156,237,106,.8))"/></svg>' +
    '<div class="ld-content" aria-hidden="true">' +
      '<div class="ld-title">' + chars('Trade', 'w1') + chars('With', 'w2') + chars('Badami', 'w3') + '</div>' +
      '<div class="ld-sub"><span>Trading Educator &middot; Deriv Partner</span></div>' +
      '<div class="ld-meter"><div class="ld-bar"><i></i></div><div class="ld-pct">0%</div></div>' +
    '</div>';
  root.classList.add('ld-lock');
  root.appendChild(el);

  /* ---------- state ---------- */
  var started = Date.now(), pageLoaded = document.readyState === 'complete', introDone = false, leaving = false, g = null;
  function q(s) { return el.querySelectorAll(s); }

  function cleanup() {
    if (el.parentNode) el.parentNode.removeChild(el);
    root.classList.remove('ld-lock');
    window.dispatchEvent(new Event('twb:loaded'));
  }
  function simpleLeave() {            // fallback (no GSAP / reduced motion)
    if (leaving) return; leaving = true;
    el.classList.add('ld-fade'); el.style.opacity = '0';
    setTimeout(cleanup, 550);
  }
  function tryLeave() {
    if (leaving || !pageLoaded) return;
    if (!g) { if (reduce || gsapFailed) setTimeout(simpleLeave, Math.max(0, 900 - (Date.now() - started))); return; }
    if (introDone) leaveFancy();
  }
  window.addEventListener('load', function () { pageLoaded = true; tryLeave(); });
  setTimeout(function () { if (!leaving) { g ? leaveFancy() : simpleLeave(); } }, MAX_TIME);

  /* ---------- GSAP animation ---------- */
  var prog = { v: 0 }, gsapFailed = false;
  function render() {
    var p = Math.min(prog.v, 1);
    q('.ld-bar i')[0].style.transform = 'scaleX(' + p + ')';
    q('.ld-pct')[0].textContent = Math.round(p * 100) + '%';
  }

  function intro() {
    var C = q('.ld-char'), line = q('.ld-line')[0], len = line.getTotalLength ? line.getTotalLength() : 1400;
    g.set(C, { yPercent: 125, rotate: 9, transformOrigin: '0% 100%' });
    g.set(q('.ld-sub span'), { yPercent: 130 });
    g.set(q('.ld-c'), { scaleY: 0, opacity: 0 });
    g.set(line, { strokeDasharray: len, strokeDashoffset: len });
    g.set(q('.ld-meter'), { opacity: 0, y: 12 });
    g.set(q('.ld-glow'), { scale: 0.6, opacity: 0 });

    var tl = g.timeline({ onComplete: function () { introDone = true; tryLeave(); } });
    tl.to(q('.ld-glow'), { scale: 1, opacity: 1, duration: 1.6, ease: 'power2.out' }, 0)
      .to(q('.ld-c'), { scaleY: 1, opacity: 1, duration: 0.75, stagger: 0.06, ease: 'back.out(1.7)' }, 0.1)
      .to(line, { strokeDashoffset: 0, duration: 1.35, ease: 'power2.inOut' }, 0.55)
      .to(C, { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.04, ease: 'power4.out' }, 0.4)
      .to(q('.ld-sub span'), { yPercent: 0, duration: 0.7, ease: 'power3.out' }, 1.25)
      .to(q('.ld-meter'), { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.3)
      .to(C, { color: '#c8f984', duration: 0.25, stagger: { each: 0.03, yoyo: true, repeat: 1 }, ease: 'none', clearProps: 'color' }, 1.55);
    g.to(prog, { v: 0.88, duration: MIN_TIME / 1000, ease: 'power1.out', onUpdate: render });
  }

  function leaveFancy() {
    if (leaving) return; leaving = true;
    g.to(prog, { v: 1, duration: 0.35, ease: 'power2.out', onUpdate: render, onComplete: function () {
      var o = g.timeline({ onComplete: cleanup });
      o.to(q('.ld-char'), { yPercent: -125, rotate: -6, duration: 0.6, stagger: 0.025, ease: 'power3.in' }, 0.15)
       .to([q('.ld-sub span'), q('.ld-meter'), q('.ld-chart')], { opacity: 0, y: -14, duration: 0.4, ease: 'power2.in' }, 0)
       .to([q('.ld-grid'), q('.ld-glow')], { opacity: 0, duration: 0.5 }, 0.35)
       .to(q('.ld-panel.t'), { yPercent: -100, duration: 1, ease: 'power4.inOut' }, 0.8)
       .to(q('.ld-panel.b'), { yPercent: 100, duration: 1, ease: 'power4.inOut' }, 0.8);
    } });
  }

  if (reduce) { /* no animation: just show static brand then fade out when loaded */
    q('.ld-chart')[0].style.display = 'none';
    return;
  }

  function boot() {
    var fontsReady = (document.fonts && document.fonts.ready) ? Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 700); })]) : Promise.resolve();
    fontsReady.then(function () { g = window.gsap; intro(); });
  }
  if (window.gsap) { boot(); }
  else {
    var s = document.createElement('script');
    s.src = GSAP_SRC; s.async = true;
    s.onload = boot;
    s.onerror = function () { gsapFailed = true; tryLeave(); };
    (document.head || root).appendChild(s);
  }
})();