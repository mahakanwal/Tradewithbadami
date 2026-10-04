/* Trade With Badami — live candlestick background for hero banners.
   Auto-attaches to .hero (home) and .page-header (all other pages).
   Canvas sits BEHIND the content; existing backgrounds are not touched. */
(function () {
  'use strict';
  var heroes = document.querySelectorAll('.hero, .page-header');
  if (!heroes.length) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Minimal CSS: keep hero content above the canvas
  var st = document.createElement('style');
  st.textContent =
    '.has-candles{position:relative;overflow:hidden}' +
    '.has-candles>*:not(.candles-bg){position:relative;z-index:1}' +
    '.candles-bg{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;display:block;' +
    '-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 18%,#000 82%,transparent 100%);' +
    'mask-image:linear-gradient(to bottom,transparent 0,#000 18%,#000 82%,transparent 100%)}';
  document.head.appendChild(st);

  function isDark(el) {
    var n = el, c;
    while (n && n !== document.documentElement) {
      c = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
      if (c && (c.length < 4 || parseFloat(c[3]) > 0.5)) {
        return (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) < 140;
      }
      n = n.parentElement;
    }
    return el.classList.contains('page-header');
  }

  function Chart(host) {
    var cv = document.createElement('canvas');
    cv.className = 'candles-bg';
    cv.setAttribute('aria-hidden', 'true');
    host.classList.add('has-candles');
    host.insertBefore(cv, host.firstChild);

    var ctx = cv.getContext('2d');
    var dark = isDark(host);
    var A = dark ? 0.30 : 0.20;           // candle opacity
    var UP = '38,208,124', DN = '239,75,75';
    var W, H, dpr, gap, bw, visible = true;
    var candles = [], price = 100, vol = 1.2;
    var STEP = 1500;                       // ms per candle
    var t0 = performance.now(), lastClose = t0;
    var lo = 90, hi = 110, seed = Math.random() * 1000;

    function rnd(a) { return (Math.random() - 0.5) * 2 * a; }

    function newCandle() {
      var o = price;
      return { o: o, c: o, h: o, l: o, target: o + rnd(vol * 3), ph: Math.random() * 6.28 };
    }
    function finish(c) {
      price = c.c;
      vol = Math.max(0.6, Math.min(2.4, vol + rnd(0.25)));
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.clientWidth; H = host.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = W < 576 ? 16 : 24; bw = gap * 0.5;
      var need = Math.ceil(W / gap) + 4;
      if (!candles.length) {
        candles.push(newCandle());
        while (candles.length < need) { var c = candles[candles.length - 1]; simulate(c, 1); finish(c); candles.push(newCandle()); }
      }
      while (candles.length < need) candles.unshift(candles[0]);
    }

    // fully resolve a candle (used for history)
    function simulate(c, k) {
      c.c = c.target; c.h = Math.max(c.o, c.c) + Math.random() * vol * 1.4; c.l = Math.min(c.o, c.c) - Math.random() * vol * 1.4;
    }

    function draw(now) {
      var live = candles[candles.length - 1];
      var p = Math.min((now - lastClose) / STEP, 1);
      // live candle wobbles up/down toward its target
      var wob = Math.sin(now / 170 + live.ph) * vol * 0.55 + Math.sin(now / 61 + live.ph) * vol * 0.2;
      live.c = live.o + (live.target - live.o) * (0.35 + 0.65 * p) + wob;
      live.h = Math.max(live.h, live.o, live.c);
      live.l = Math.min(live.l, live.o, live.c);

      if (p >= 1) {
        finish(live);
        candles.push(newCandle()); candles.shift();
        lastClose = now; p = 0;
      }
      var shift = p * gap;                 // smooth scroll left

      var min = Infinity, max = -Infinity, i, c;
      for (i = 0; i < candles.length; i++) { c = candles[i]; if (c.l < min) min = c.l; if (c.h > max) max = c.h; }
      lo += (min - lo) * 0.04; hi += (max - hi) * 0.04;
      var padY = H * 0.14, span = Math.max(hi - lo, 1);
      function Y(v) { return H - padY - ((v - lo) / span) * (H - padY * 2); }

      ctx.clearRect(0, 0, W, H);

      // faint horizontal grid
      ctx.strokeStyle = dark ? 'rgba(255,255,255,0.05)' : 'rgba(3,52,40,0.05)';
      ctx.lineWidth = 1; ctx.beginPath();
      for (i = 1; i < 5; i++) { var gy = Math.round(H * i / 5) + 0.5; ctx.moveTo(0, gy); ctx.lineTo(W, gy); }
      ctx.stroke();

      var x0 = W - (candles.length - 1) * gap - gap / 2 - shift + gap;
      for (i = 0; i < candles.length; i++) {
        c = candles[i];
        var x = x0 + i * gap, up = c.c >= c.o, col = up ? UP : DN;
        ctx.strokeStyle = 'rgba(' + col + ',' + A + ')'; ctx.fillStyle = 'rgba(' + col + ',' + A + ')';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(x, Y(c.h)); ctx.lineTo(x, Y(c.l)); ctx.stroke();
        var yt = Y(Math.max(c.o, c.c)), yb = Y(Math.min(c.o, c.c));
        ctx.fillRect(x - bw / 2, yt, bw, Math.max(yb - yt, 2));
      }
      // live price line
      var ly = Y(live.c);
      ctx.setLineDash([4, 5]); ctx.strokeStyle = 'rgba(' + (live.c >= live.o ? UP : DN) + ',' + (A * 1.3) + ')';
      ctx.beginPath(); ctx.moveTo(0, ly); ctx.lineTo(W, ly); ctx.stroke(); ctx.setLineDash([]);
    }

    function loop(now) {
      if (visible) draw(now);
      requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', function () { var n = candles.length; candles.length = Math.min(n, candles.length); resize(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(host);
    }
    if (reduce) { draw(performance.now()); return; }
    requestAnimationFrame(loop);
  }

  heroes.forEach(Chart);
})();

/* ---------------------------------------------------------------------------
   Section decoration: animated trend line + floating mini candles + soft glows
   for plain (white) sections. Dark / soft-green / hero sections are untouched.
--------------------------------------------------------------------------- */
(function () {
  'use strict';
  var secs = Array.prototype.filter.call(document.querySelectorAll('main section.section, main section.section-sm'), function (s) {
    return !/\bbg-|\bhero\b|\bpage-header\b|\bhighlights\b|data-no-fx/.test(s.className) && !s.hasAttribute('data-no-fx');
  });
  if (!secs.length) return;

  var css =
    '.has-fx{position:relative}' +
    '.has-fx>.container{position:relative;z-index:1}' +
    '.fx-deco{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none}' +
    '.fx-glow{position:absolute;border-radius:50%;filter:blur(10px);animation:fxFloat 14s ease-in-out infinite}' +
    '.fx-glow.g1{width:460px;height:460px;right:-140px;top:-160px;background:radial-gradient(circle,rgba(156,237,106,.28),transparent 70%)}' +
    '.fx-glow.g2{width:380px;height:380px;left:-140px;bottom:-170px;background:radial-gradient(circle,rgba(3,52,40,.10),transparent 70%);animation-delay:-6s}' +
    '.fx-line{position:absolute;left:0;bottom:6%;width:100%;height:46%}' +
    '.fx-line svg{width:100%;height:100%;display:block;overflow:visible;animation:fxReveal 9s ease-in-out infinite}' +
    '.fx-line .ln{fill:none;stroke:#7fd94b;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;opacity:.55}' +
    '.fx-line .ar{fill:url(#fxGrad)}' +
    '.fx-dot{position:absolute;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#7fd94b;opacity:0;animation:fxDot 9s ease-in-out infinite}' +
    '.fx-dot::after{content:"";position:absolute;inset:-8px;border-radius:50%;border:2px solid rgba(127,217,75,.55);animation:fxPing 1.8s ease-out infinite}' +
    '.fx-candles{position:absolute;top:44px;width:130px;height:110px;opacity:.7}' +
    '.fx-candles.r{right:4%}.fx-candles.l{left:3%}' +
    '.fx-candles i{position:absolute;bottom:0;width:10px;border-radius:2px;animation:fxBob 5s ease-in-out infinite}' +
    '.fx-candles i::before{content:"";position:absolute;left:50%;width:2px;margin-left:-1px;top:-14px;bottom:-14px;background:inherit;border-radius:2px}' +
    '.fx-candles i.u{background:rgba(38,208,124,.45)}.fx-candles i.d{background:rgba(239,75,75,.38)}' +
    '@keyframes fxReveal{0%{clip-path:inset(-10px 100% -10px 0);opacity:1}55%,85%{clip-path:inset(-10px 0 -10px 0);opacity:1}100%{clip-path:inset(-10px 0 -10px 0);opacity:0}}' +
    '@keyframes fxDot{0%,52%{opacity:0}58%,85%{opacity:1}100%{opacity:0}}' +
    '@keyframes fxPing{0%{transform:scale(.6);opacity:1}100%{transform:scale(1.8);opacity:0}}' +
    '@keyframes fxBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}' +
    '@keyframes fxFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(-26px,22px)}}' +
    '@media(max-width:767px){.fx-candles{display:none}.fx-glow.g1{width:300px;height:300px}.fx-line{height:34%}}' +
    '@media(prefers-reduced-motion:reduce){.fx-deco *{animation:none!important}.fx-dot{display:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function r(a, b) { return a + Math.random() * (b - a); }

  secs.forEach(function (sec, idx) {
    var flip = idx % 2 === 1;
    // trend line: upward drift with pullbacks
    var n = 11, pts = [], y = 85, i, x;
    for (i = 0; i < n; i++) {
      x = 24 + (i / (n - 1)) * 1152;
      pts.push([x, Math.max(8, Math.min(92, y))]);
      y += r(-26, 8) * (i % 3 === 2 ? -0.8 : 1);
    }
    var d = 'M' + pts.map(function (p) { return p[0].toFixed(0) + ' ' + p[1].toFixed(1); }).join(' L');
    var last = pts[n - 1];
    var area = d + ' L1200 100 L0 100 Z';

    var candles = '';
    var hs = [34, 56, 44, 72, 52];
    for (i = 0; i < hs.length; i++) {
      candles += '<i class="' + (Math.random() > 0.38 ? 'u' : 'd') + '" style="left:' + (i * 24) + 'px;height:' + hs[i] + 'px;animation-delay:-' + (i * 0.9).toFixed(1) + 's"></i>';
    }

    var deco = document.createElement('div');
    deco.className = 'fx-deco'; deco.setAttribute('aria-hidden', 'true');
    deco.innerHTML =
      '<span class="fx-glow g1"></span><span class="fx-glow g2"></span>' +
      '<div class="fx-line"' + (flip ? ' style="transform:scaleX(-1)"' : '') + '>' +
        '<svg viewBox="0 0 1200 100" preserveAspectRatio="none"><defs><linearGradient id="fxGrad" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#9ced6a" stop-opacity=".28"/><stop offset="1" stop-color="#9ced6a" stop-opacity="0"/></linearGradient></defs>' +
        '<path class="ar" d="' + area + '"/><path class="ln" d="' + d + '"/></svg>' +
        '<span class="fx-dot" style="left:' + (last[0] / 12) + '%;top:' + last[1] + '%"></span>' +
      '</div>' +
      '<div class="fx-candles ' + (flip ? 'l' : 'r') + '">' + candles + '</div>';

    sec.classList.add('has-fx');
    sec.insertBefore(deco, sec.firstChild);
  });
})();