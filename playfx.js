/* Sweta: Pop the Wishes + Birthday Puzzle + One Last Surprise in ONE animated interface (neon line-art background). */
(function () {
  'use strict';
  var $ = function (i) { return document.getElementById(i); };
  var PINK = '#ff4fa3', RED = '#ff5566', GOLD = '#ffd27a', WH = '#fff4fb';
  var scr, cv, ctx, fv, fx, W = 0, H = 0, last = 0, T = 0, entered = false, scN = 0, scT = 0, dirty = false;
  var panels = [], dots = [], lns = [], AM = [], PT = [], RG = [], HS, CR, PL, SH = {};
  function css() {
    if ($('pfxCss')) return;
    var l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cinzel:wght@700&display=swap';
    document.head.appendChild(l);
    var s = document.createElement('style'); s.id = 'pfxCss';
    s.textContent =
      '#wish{justify-content:flex-start;gap:8px;padding:14px 12px 10px}' +
      '#wish .pfx-dim{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse at 50% 45%,rgba(0,0,0,.5),rgba(0,0,0,.86) 85%)}' +
      '#wish .pfx-cv{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}' +
      '#wish .pfx-fx{position:fixed;inset:0;width:100%;height:100%;z-index:3;pointer-events:none}' +
      '#wish .pfx-steps,#wish .pfx-panels{position:relative;z-index:1}' +
      '.pfx-steps{display:flex;align-items:center;justify-content:center;flex:none;margin-top:6px}' +
      '.pfx-st{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:1.1rem;border:1.5px solid rgba(255,126,182,.35);background:rgba(20,6,26,.75);transition:.5s}' +
      '.pfx-st.on{border-color:#ffd27a;scale:1.18;box-shadow:0 0 14px #ff7eb6,0 0 30px rgba(255,126,182,.5)}' +
      '.pfx-st.done{border-color:#ffd27a;background:rgba(255,210,122,.2)}' +
      '.pfx-ln{width:42px;height:2px;background:rgba(255,126,182,.25);position:relative;overflow:hidden}' +
      '.pfx-ln:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#ff7eb6,#ffd27a);translate:-100% 0;transition:translate .9s}' +
      '.pfx-ln.f:after{translate:0 0}' +
      '#wish .pfx-panels{flex:1 1 0;min-height:0;width:100%;max-width:420px}' +
      '.pfx-p{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:12px;overflow-y:auto;overflow-x:hidden;opacity:0;visibility:hidden;scale:.86;translate:0 36px;' +
      'transition:opacity .5s,scale .6s cubic-bezier(.2,1.25,.4,1),translate .6s cubic-bezier(.2,1.25,.4,1),visibility 0s .6s}' +
      '.pfx-p:before,.pfx-p:after{content:"";flex:1 0 0}' +
      '.pfx-p.on{opacity:1;visibility:visible;scale:1;translate:0 0;transition-delay:.3s,.3s,.3s,0s}' +
      '.pfx-p.out{translate:0 -44px;scale:1.08}' +
      '.pfx-p.on>*:not(.wish){animation:pfxUp .65s cubic-bezier(.2,1.2,.4,1) both}' +
      '.pfx-p.on>:nth-child(1){animation-delay:.4s}.pfx-p.on>:nth-child(2){animation-delay:.5s}.pfx-p.on>:nth-child(3){animation-delay:.6s}' +
      '.pfx-p.on>:nth-child(4){animation-delay:.7s}.pfx-p.on>:nth-child(5){animation-delay:.8s}.pfx-p.on>:nth-child(6){animation-delay:.9s}' +
      '@keyframes pfxUp{from{opacity:0;translate:0 26px}to{opacity:1;translate:0 0}}' +
      '#wish .wish{padding:10px 16px;border-radius:16px;display:flex;align-items:center;justify-content:center;line-height:1.5;background:rgba(255,255,255,.05);' +
      'border:1px solid rgba(255,210,122,.35);box-shadow:0 0 22px rgba(255,126,182,.25)}' +
      '#wish .wish:empty{opacity:0}' +
      '.pfx-pop{animation:pfxPop .6s cubic-bezier(.2,1.4,.4,1)}@keyframes pfxPop{from{scale:.6;opacity:0}to{scale:1;opacity:1}}' +
      '#wish .sc{box-shadow:0 0 0 2px rgba(255,210,122,.85),0 0 34px rgba(255,79,163,.55)}' +
      '#wish .sc:after{content:"";position:absolute;top:0;bottom:0;left:0;width:35%;pointer-events:none;translate:-160% 0;background:linear-gradient(100deg,transparent,rgba(255,255,255,.3),transparent);animation:pfxSh 3.6s ease-in-out infinite}' +
      '@keyframes pfxSh{0%{translate:-160% 0}60%,100%{translate:420% 0}}';
    document.head.appendChild(s);
  }
  function size() { W = window.innerWidth; H = window.innerHeight; cv.width = fv.width = W; cv.height = fv.height = H; }
  function spr(w, h, fn) { var c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d')); return c; }
  function hp(c, cx, cy, s) {
    c.beginPath();
    for (var i = 0; i <= 48; i++) {
      var t = i / 48 * 6.2832, x = 16 * Math.pow(Math.sin(t), 3), y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      if (i) c.lineTo(cx + x * s, cy - y * s); else c.moveTo(cx + x * s, cy - y * s);
    }
    c.closePath();
  }
  function mk(polys) {
    var s = { p: polys, l: [], t: 0 };
    polys.forEach(function (pl) { var d = 0; for (var i = 1; i < pl.length; i++) d += Math.hypot(pl[i][0] - pl[i - 1][0], pl[i][1] - pl[i - 1][1]); s.l.push(d); s.t += d; });
    return s;
  }
  function ar(cx, cy, r, a0, a1, n) { var a = []; for (var i = 0; i <= n; i++) { var t = a0 + (a1 - a0) * i / n; a.push([cx + Math.cos(t) * r, cy + Math.sin(t) * r]); } return a; }
  function qd(a, b, c, n) { var r = []; for (var i = 0; i <= n; i++) { var t = i / n, u = 1 - t; r.push([u * u * a[0] + 2 * u * t * b[0] + t * t * c[0], u * u * a[1] + 2 * u * t * b[1] + t * t * c[1]]); } return r; }
  function shapes() {
    var h = []; for (var i = 0; i <= 60; i++) { var t = i / 60 * 6.2832; h.push([50 + 16 * Math.pow(Math.sin(t), 3) * 2.6, 56 - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 2.6]); }
    SH.heart = mk([h]);
    var cb = []; for (i = 0; i <= 20; i++) cb.push([100 - i * 5, 70 + 11 * Math.sin(i / 20 * Math.PI)]);
    SH.crown = mk([[[0, 70], [0, 22], [20, 46], [35, 8], [50, 42], [65, 8], [80, 46], [100, 22], [100, 70]], cb, ar(0, 20, 3.5, 0, 6.3, 10), ar(35, 6, 3.5, 0, 6.3, 10), ar(65, 6, 3.5, 0, 6.3, 10), ar(100, 20, 3.5, 0, 6.3, 10)]);
    SH.couple = mk([[[0, 97], [100, 97]], ar(30, 30, 11, 0, 6.3, 22), ar(58, 35, 10, 0, 6.3, 22), qd([19, 30], [22, 13], [41, 23], 10), qd([48, 37], [50, 20], [68, 28], 10),
      [[27, 41], [27, 50]], [[34, 41], [34, 50]], [[55, 44], [55, 51]], [[62, 44], [62, 51]],
      [[8, 97], [8, 74]].concat(qd([8, 74], [9, 55], [27, 50], 8)), qd([34, 50], [49, 55], [51, 74], 8).concat([[51, 97]]),
      [[51, 97], [51, 76]].concat(qd([51, 76], [51, 57], [55, 51], 6)), qd([62, 51], [88, 53], [92, 78], 8).concat([[92, 97]])]);
    SH.arL = mk([[[100, 50], [0, 50]], [[10, 42], [0, 50], [10, 58]]]);
    SH.arR = mk([[[0, 50], [100, 50]], [[90, 42], [100, 50], [90, 58]]]);
  }
  function trace(sh, p, ox, oy, S) {
    var rem = p * sh.t; ctx.beginPath();
    for (var k = 0; k < sh.p.length && rem > 0; k++) {
      var pl = sh.p[k]; ctx.moveTo(ox + pl[0][0] * S, oy + pl[0][1] * S);
      for (var i = 1; i < pl.length; i++) {
        var dx = pl[i][0] - pl[i - 1][0], dy = pl[i][1] - pl[i - 1][1], d = Math.hypot(dx, dy);
        if (rem >= d) { ctx.lineTo(ox + pl[i][0] * S, oy + pl[i][1] * S); rem -= d; }
        else { var f = rem / d; ctx.lineTo(ox + (pl[i - 1][0] + dx * f) * S, oy + (pl[i - 1][1] + dy * f) * S); rem = 0; break; }
      }
    }
  }
  function neon(sh, p, ox, oy, S, col, a) {
    if (p <= 0) return; trace(sh, Math.min(1, p), ox, oy, S); ctx.strokeStyle = col;
    ctx.globalAlpha = a * 0.2; ctx.lineWidth = 7; ctx.stroke(); ctx.globalAlpha = a; ctx.lineWidth = 1.8; ctx.stroke();
  }
  function hrt(cx, cy, w, p, col, a) { var S = w / 84; neon(SH.heart, p, cx - 50 * S, cy - 56 * S, S, col, a); }
  function scene(t) {
    var D = 6.6, p = Math.min(1, t / 2.4), a = Math.min(1, t / 0.5) * Math.min(1, (D - t) / 0.9) * 0.62, k = scN % 4, S, ox, oy, fs, cy;
    if (a <= 0) return;
    ctx.save(); ctx.lineJoin = ctx.lineCap = 'round';
    if (k === 0) {
      S = Math.min(W * 0.42, 170) / 100; ctx.translate(W / 2, H * 0.19); ctx.rotate(Math.sin(t * 0.8) * 0.12);
      neon(SH.crown, p, -50 * S, -40 * S, S, PINK, a); hrt(0, -62 * S + Math.sin(t * 2) * 5, 60 * S, (p - 0.3) / 0.7, RED, a);
    } else if (k === 1) {
      S = Math.min(W * 0.62, 250) / 100; ox = W / 2 - 50 * S; oy = H * 0.9 - 97 * S;
      neon(SH.couple, p, ox, oy, S, WH, a); hrt(W / 2 - 4 * S, oy + 6 * S + Math.sin(t * 3) * 3, 16 * S, (p - 0.5) / 0.5, '#ff8a6a', a);
    } else if (k === 2) {
      fs = Math.min(W * 0.3, 118); cy = H * 0.64; S = fs * 0.8 / 100;
      hrt(W / 2, cy - fs * 0.95, fs * 0.75, p, WH, a);
      neon(SH.arL, p, W / 2 - fs * 1.7, cy - 50 * S, S, WH, a); neon(SH.arR, p, W / 2 + fs * 0.9, cy - 50 * S, S, WH, a);
      ctx.font = fs + 'px "Great Vibes",cursive'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var tw = ctx.measureText('love').width; ctx.save(); ctx.beginPath(); ctx.rect(W / 2 - tw / 2 - 10, cy - fs, (tw + 20) * p, fs * 2); ctx.clip();
      ctx.strokeStyle = WH; ctx.lineWidth = 6; ctx.globalAlpha = a * 0.25; ctx.strokeText('love', W / 2, cy); ctx.globalAlpha = a; ctx.fillStyle = WH; ctx.fillText('love', W / 2, cy); ctx.restore();
    } else {
      fs = Math.min(W * 0.5, 190); cy = H * 0.5; var q = 0.7 + 0.3 * Math.min(1, t / 1.1);
      ctx.translate(W / 2, cy); ctx.scale(q, q); ctx.globalAlpha = a * 0.7; ctx.fillStyle = WH;
      hp(ctx, 0, 0, fs / 40); hp2(fs / 40 * 0.42); ctx.fill('evenodd');
      ctx.font = '700 ' + fs * 0.26 + 'px Cinzel,Georgia,serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('LOVE', 0, -fs * 0.62); ctx.fillText('YOU', 0, fs * 0.6);
    }
    ctx.restore(); ctx.globalAlpha = 1;
  }
  function hp2(s) { for (var i = 0; i <= 48; i++) { var t = i / 48 * 6.2832, x = 16 * Math.pow(Math.sin(t), 3), y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t); if (i) ctx.lineTo(x * s, -y * s); else ctx.moveTo(x * s, -y * s); } ctx.closePath(); }
  function sprites() {
    HS = [PINK, RED, '#ffffff'].map(function (col) {
      return spr(56, 52, function (x) { x.strokeStyle = col; x.lineWidth = 2.4; x.shadowColor = col; x.shadowBlur = 9; x.lineJoin = 'round'; hp(x, 28, 24, 1.35); x.stroke(); });
    });
    CR = spr(110, 80, function (x) {
      x.strokeStyle = PINK; x.lineWidth = 2.4; x.shadowColor = PINK; x.shadowBlur = 10; x.lineJoin = 'round'; x.beginPath();
      var p = SH.crown.p, i, j; for (j = 0; j < 2; j++) { x.moveTo(5 + p[j][0][0] * 1, 5 + p[j][0][1]); for (i = 1; i < p[j].length; i++) x.lineTo(5 + p[j][i][0], 5 + p[j][i][1] * 0.95); }
      x.stroke();
    });
    PL = spr(24, 24, function (x) { x.strokeStyle = '#fff'; x.lineWidth = 1.6; x.shadowColor = '#ffd27a'; x.shadowBlur = 6; x.beginPath(); x.moveTo(12, 3); x.lineTo(12, 21); x.moveTo(3, 12); x.lineTo(21, 12); x.stroke(); });
  }
  function mkAmb() {
    var i; AM = [];
    for (i = 0; i < 9; i++) AM.push({ t: 0, c: i % 3, x: Math.random(), y: Math.random(), v: 14 + Math.random() * 30, sz: 18 + Math.random() * 26, ph: Math.random() * 6 });
    for (i = 0; i < 3; i++) AM.push({ t: 1, x: Math.random(), y: Math.random(), vx: 14 + Math.random() * 14, vy: 8 + Math.random() * 10, sz: 44 + Math.random() * 30, ph: Math.random() * 6 });
    for (i = 0; i < 30; i++) AM.push({ t: 2, x: Math.random(), y: Math.random(), ph: Math.random() * 6, sz: 8 + Math.random() * 9 });
  }
  function ambient(dt) {
    for (var i = 0; i < AM.length; i++) {
      var o = AM[i], x, y;
      if (o.t === 2) { ctx.globalAlpha = 0.08 + 0.7 * Math.pow(Math.abs(Math.sin(T * 1.1 + o.ph)), 3); ctx.drawImage(PL, o.x * W, o.y * H, o.sz, o.sz); continue; }
      if (o.t === 0) { o.y -= o.v * dt / H; if (o.y < -0.08) { o.y = 1.08; o.x = Math.random(); } x = o.x * W + Math.sin(T * 0.7 + o.ph) * 18; y = o.y * H; ctx.globalAlpha = 0.45; ctx.drawImage(HS[o.c], x, y, o.sz, o.sz * 0.93); }
      else {
        o.x += o.vx * dt / W; o.y -= o.vy * dt / H; if (o.x > 1.1 || o.y < -0.12) { o.x = -0.1; o.y = 0.5 + Math.random() * 0.6; }
        ctx.save(); ctx.translate(o.x * W, o.y * H); ctx.rotate(Math.sin(T * 0.9 + o.ph) * 0.4); ctx.globalAlpha = 0.55; ctx.drawImage(CR, -o.sz / 2, -o.sz * 0.36, o.sz, o.sz * 0.73); ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
  }
  function burst(x, y, n, ci) {
    for (var i = 0; i < n && PT.length < 120; i++) {
      var a = Math.random() * 6.283, sp = 50 + Math.random() * 130;
      PT.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40, l: 0, m: 0.9 + Math.random() * 0.8, im: Math.random() < 0.6 ? HS[ci === undefined ? Math.floor(Math.random() * 3) : ci] : PL, sz: 14 + Math.random() * 16 });
    }
  }
  function ring(x, y, c) { RG.push({ x: x, y: y, r: 8, a: 0.9, c: c }); }
  function front(dt) {
    if (!PT.length && !RG.length) { if (dirty) { fx.clearRect(0, 0, W, H); dirty = false; } return; }
    dirty = true; fx.clearRect(0, 0, W, H); var i;
    for (i = RG.length - 1; i >= 0; i--) { var r = RG[i]; r.r += 260 * dt; r.a -= 0.9 * dt; if (r.a <= 0) { RG.splice(i, 1); continue; } fx.globalAlpha = r.a; fx.strokeStyle = r.c; fx.lineWidth = 2; fx.beginPath(); fx.arc(r.x, r.y, r.r, 0, 6.283); fx.stroke(); }
    for (i = PT.length - 1; i >= 0; i--) {
      var p = PT[i]; p.l += dt; if (p.l > p.m) { PT.splice(i, 1); continue; }
      p.vy += 60 * dt; p.x += p.vx * dt; p.y += p.vy * dt; fx.globalAlpha = 1 - p.l / p.m; fx.drawImage(p.im, p.x - p.sz / 2, p.y - p.sz / 2, p.sz, p.sz * (p.im === PL ? 1 : 0.93));
    }
    fx.globalAlpha = 1;
  }
  function frame(ts) {
    requestAnimationFrame(frame);
    if (!scr.classList.contains('on')) { last = ts; return; }
    var dt = Math.min(0.08, (ts - (last || ts)) / 1000); last = ts; T += dt; scT += dt;
    if (scT > 6.6) { scT = 0; scN++; }
    ctx.clearRect(0, 0, W, H); scene(scT); ambient(dt); front(dt);
  }
  function toStage(n) {
    panels.forEach(function (p, i) { p.classList.toggle('on', i === n); p.classList.toggle('out', i < n); });
    dots.forEach(function (d, i) { d.classList.toggle('on', i === n); d.classList.toggle('done', i < n); });
    lns.forEach(function (l, i) { l.classList.toggle('f', i < n); });
    scN = n; scT = 0; ring(W / 2, H * 0.4, PINK); burst(W / 2, H * 0.4, 24);
  }
  function celebrate(el) {
    var r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    ring(x, y, GOLD); ring(x, y, PINK); burst(x, y, 34);
  }
  function watchBtn(id) {
    var el = $(id); if (!el) return; var was = el.classList.contains('hide');
    new MutationObserver(function () { var h = el.classList.contains('hide'); if (was && !h) celebrate(el); was = h; }).observe(el, { attributes: true, attributeFilter: ['class'] });
  }
  function build() {
    scr = $('wish'); var pz = $('puz'), sc = $('scr');
    if (!scr || !pz || !sc || scr.querySelector('.pfx-cv')) return;
    css(); shapes(); sprites(); mkAmb();
    var wrap = document.createElement('div'); wrap.className = 'pfx-panels';
    [scr, pz, sc].forEach(function (src) {
      var p = document.createElement('div'); p.className = 'pfx-p';
      if (src === scr) { var ch = []; for (var i = 0; i < src.childNodes.length; i++) ch.push(src.childNodes[i]); ch.forEach(function (c) { p.appendChild(c); }); }
      else while (src.firstChild) p.appendChild(src.firstChild);
      wrap.appendChild(p); panels.push(p);
    });
    var dim = document.createElement('div'); dim.className = 'pfx-dim';
    cv = document.createElement('canvas'); cv.className = 'pfx-cv'; fv = document.createElement('canvas'); fv.className = 'pfx-fx';
    var st = document.createElement('div'); st.className = 'pfx-steps';
    st.innerHTML = '<i class="pfx-st">🎈</i><i class="pfx-ln"></i><i class="pfx-st">🧩</i><i class="pfx-ln"></i><i class="pfx-st">✨</i>';
    dots = [].slice.call(st.querySelectorAll('.pfx-st')); lns = [].slice.call(st.querySelectorAll('.pfx-ln'));
    scr.appendChild(dim); scr.appendChild(cv); scr.appendChild(st); scr.appendChild(wrap); scr.appendChild(fv);
    ctx = cv.getContext('2d'); fx = fv.getContext('2d'); size(); window.addEventListener('resize', size);
    $('wB').onclick = function () { toStage(1); initPuz(); };
    $('pB').onclick = function () { toStage(2); initScratch(); };
    ['wB', 'pB', 'scB'].forEach(watchBtn);
    var wt = $('wt');
    new MutationObserver(function () { wt.classList.remove('pfx-pop'); void wt.offsetWidth; wt.classList.add('pfx-pop'); }).observe(wt, { childList: true, characterData: true, subtree: true });
    $('bl').addEventListener('pointerdown', function (e) { if (e.target.closest && e.target.closest('.b')) { ring(e.clientX, e.clientY, '#ff7eb6'); burst(e.clientX, e.clientY, 12); } });
    $('pz').addEventListener('pointerdown', function (e) { ring(e.clientX, e.clientY, GOLD); burst(e.clientX, e.clientY, 5, 2); });
    var lt = 0, trail = function (e) { var n = Date.now(); if (n - lt < 45) return; lt = n; var t = e.touches ? e.touches[0] : e; burst(t.clientX, t.clientY, 2); };
    $('sc').addEventListener('touchmove', trail, { passive: true }); $('sc').addEventListener('mousemove', function (e) { if (e.buttons) trail(e); });
    new MutationObserver(function () { if (scr.classList.contains('on') && !entered) { entered = true; toStage(0); } }).observe(scr, { attributes: true, attributeFilter: ['class'] });
    if (scr.classList.contains('on')) { entered = true; toStage(0); }
    requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
