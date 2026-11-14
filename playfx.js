/* Sweta: Pop the Wishes + Birthday Puzzle + One Last Surprise in ONE animated interface, with the nazar video + song as the background. */
(function () {
  'use strict';
  var $ = function (i) { return document.getElementById(i); };
  var PINK = '#ff4fa3', RED = '#ff5566', GOLD = '#ffd27a';
  var VSRC = 'nazar.mp4', ASRC = 'nazar.mp3', OFF = 0.277;
  var ENV = '079433734243346442464334334333224222332434533222222222322222232222322833227232632286322729145429844333235432963334332343373332533454337333222222115943358434434294336333444353322222356433342433223222974336333633359334322344329443354354333363332212321795335432954439434532299339532234336544674';
  var scr, cv, ctx, fv, fx, amb, actx, band, vid, glow, sweep, W = 0, H = 0, last = 0, T = 0, entered = false, dirty = false, frN = 0;
  var panels = [], dots = [], lns = [], AM = [], PT = [], RG = [], HS, CR, PL, OR = [], EY, SS, ORB = [], EYE = [], star = null, nextStar = 2, be = 0, lastBeat = 0, lastGl = -1;
  var na = null, active = false, bgWas = false, fallback = false, warmed = false, stopTm = 0;
  var pr = null;

  function css() {
    if ($('pfxCss')) return;
    var s = document.createElement('style'); s.id = 'pfxCss';
    s.textContent =
      '#wish{justify-content:flex-start;gap:8px;padding:12px 12px 44px;background:#05010a}' +
      '#wish .pfx-amb{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:.8}' +
      '#wish .pfx-dim{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse at 50% 38%,rgba(0,0,0,.25),rgba(0,0,0,.78) 80%)}' +
      '#wish .pfx-cv{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}' +
      '#wish .pfx-fx{position:fixed;inset:0;width:100%;height:100%;z-index:3;pointer-events:none}' +
      '#wish .pfx-steps,#wish .pfx-panels,#wish .pfx-band{position:relative;z-index:1}' +
      '.pfx-steps{display:flex;align-items:center;justify-content:center;flex:none;margin-top:4px}' +
      '.pfx-st{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:1.05rem;border:1.5px solid rgba(255,126,182,.35);background:rgba(20,6,26,.8);transition:.4s}' +
      '.pfx-st.on{border-color:#ffd27a;scale:1.18;box-shadow:0 0 14px #ff7eb6,0 0 28px rgba(255,126,182,.5)}' +
      '.pfx-st.done{border-color:#ffd27a;background:rgba(255,210,122,.2)}' +
      '.pfx-ln{width:42px;height:2px;background:rgba(255,126,182,.25);position:relative;overflow:hidden}' +
      '.pfx-ln:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#ff7eb6,#ffd27a);translate:-100% 0;transition:translate .7s}' +
      '.pfx-ln.f:after{translate:0 0}' +
      '.pfx-band{flex:none;margin:2px auto 0;border-radius:18px;will-change:transform}' +
      '.pfx-bv{position:relative;width:100%;height:100%;border-radius:18px;overflow:hidden;background:#000;border:1.5px solid rgba(255,210,122,.7)}' +
      '.pfx-bv video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 40%;display:block}' +
      '.pfx-gl{position:absolute;inset:-5px;border-radius:23px;pointer-events:none;box-shadow:0 0 22px 2px #ff4fa3,0 0 46px rgba(255,210,122,.55);opacity:.35;z-index:-1;will-change:opacity}' +
      '.pfx-sw{position:absolute;top:0;bottom:0;left:0;width:34%;pointer-events:none;translate:-160% 0;background:linear-gradient(100deg,transparent,rgba(255,255,255,.22),transparent);animation:pfxSw 4.2s ease-in-out infinite}' +
      '@keyframes pfxSw{0%{translate:-160% 0}55%,100%{translate:420% 0}}' +
      '.pfx-bv:after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(0,0,0,.28),transparent 22%,transparent 78%,rgba(0,0,0,.34))}' +
      '#wish .pfx-panels{flex:1 1 0;min-height:0;width:100%;max-width:420px}' +
      '#wish .pfx-panels:before{content:"";position:absolute;inset:0;border-radius:24px;pointer-events:none;background:linear-gradient(180deg,rgba(34,8,44,.62),rgba(10,3,16,.78));border:1px solid rgba(255,190,220,.2);box-shadow:inset 0 0 34px rgba(255,100,170,.1),0 0 26px rgba(255,79,163,.16)}' +
      '.pfx-p{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;gap:6px;overflow-y:auto;overflow-x:hidden;opacity:0;visibility:hidden;scale:.9;translate:0 30px;padding:0 8px;' +
      'transition:opacity .35s,scale .45s cubic-bezier(.2,1.25,.4,1),translate .45s cubic-bezier(.2,1.25,.4,1),visibility 0s .45s}' +
      '.pfx-p:before,.pfx-p:after{content:"";flex:1 0 0}' +
      '.pfx-p.on{opacity:1;visibility:visible;scale:1;translate:0 0;transition-delay:.12s,.12s,.12s,0s}' +
      '.pfx-p.out{translate:0 -36px;scale:1.06}' +
      '.pfx-p.on>*:not(.wish){animation:pfxUp .5s cubic-bezier(.2,1.2,.4,1) both}' +
      '.pfx-p.on>:nth-child(1){animation-delay:.15s}.pfx-p.on>:nth-child(2){animation-delay:.22s}.pfx-p.on>:nth-child(3){animation-delay:.3s}' +
      '.pfx-p.on>:nth-child(4){animation-delay:.38s}.pfx-p.on>:nth-child(5){animation-delay:.46s}.pfx-p.on>:nth-child(6){animation-delay:.54s}' +
      '@keyframes pfxUp{from{opacity:0;translate:0 22px}to{opacity:1;translate:0 0}}' +
      '.pfx-p h2{position:relative;margin:0}' +
      '.pfx-p h2:after{content:"";display:block;height:2px;width:62%;margin:4px auto 0;background:linear-gradient(90deg,transparent,#ffd27a,#ff7eb6,transparent);animation:pfxLn 3s ease-in-out infinite}' +
      '@keyframes pfxLn{0%,100%{scale:.45 1;opacity:.6}50%{scale:1 1;opacity:1}}' +
      '#wish .wish{padding:10px 16px;border-radius:16px;display:flex;align-items:center;justify-content:center;line-height:1.5;background:rgba(255,255,255,.06);' +
      'border:1px solid rgba(255,210,122,.4);box-shadow:0 0 22px rgba(255,126,182,.28)}' +
      '#wish .wish:empty{opacity:0}' +
      '#pc{display:inline-block;padding:4px 16px;border-radius:99px;background:rgba(255,210,122,.1);border:1px solid rgba(255,210,122,.32)}' +
      '#bl .b{box-shadow:inset -7px -9px 16px rgba(0,0,0,.2),inset 6px 6px 12px rgba(255,255,255,.3)}' +
      '#wB,#pB,#scB{box-shadow:0 0 22px rgba(255,126,182,.55);animation:pfxBt 1.6s ease-in-out infinite}' +
      '@keyframes pfxBt{0%,100%{scale:1}50%{scale:1.05}}' +
      '.pfx-pop{animation:pfxPop .5s cubic-bezier(.2,1.4,.4,1)}@keyframes pfxPop{from{scale:.6;opacity:0}to{scale:1;opacity:1}}' +
      '#wish .sc{box-shadow:0 0 0 2px rgba(255,210,122,.85),0 0 34px rgba(255,79,163,.55)}' +
      '#wish .sc:after{content:"";position:absolute;top:0;bottom:0;left:0;width:35%;pointer-events:none;translate:-160% 0;background:linear-gradient(100deg,transparent,rgba(255,255,255,.3),transparent);animation:pfxSh 3.6s ease-in-out infinite}' +
      '@keyframes pfxSh{0%{translate:-160% 0}60%,100%{translate:420% 0}}';
    document.head.appendChild(s);
  }
  function layout() {
    var bh = Math.max(120, Math.min(Math.round((W - 24) * 9 / 16), 230, H - 617)), bw = Math.min(W - 24, Math.round(bh * 2.2), 440);
    band.style.height = bh + 'px'; band.style.width = bw + 'px';
  }
  function size() { W = window.innerWidth; H = window.innerHeight; cv.width = fv.width = W; cv.height = fv.height = H; layout(); }
  function spr(w, h, fn) { var c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d')); return c; }
  function hp(c, cx, cy, s) {
    c.beginPath();
    for (var i = 0; i <= 48; i++) {
      var t = i / 48 * 6.2832, x = 16 * Math.pow(Math.sin(t), 3), y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      if (i) c.lineTo(cx + x * s, cy - y * s); else c.moveTo(cx + x * s, cy - y * s);
    }
    c.closePath();
  }
  function sprites() {
    HS = [PINK, RED, '#ffffff'].map(function (col) {
      return spr(56, 52, function (x) { x.strokeStyle = col; x.lineWidth = 2.4; x.shadowColor = col; x.shadowBlur = 9; x.lineJoin = 'round'; hp(x, 28, 24, 1.35); x.stroke(); });
    });
    CR = spr(110, 80, function (x) {
      x.strokeStyle = PINK; x.lineWidth = 2.4; x.shadowColor = PINK; x.shadowBlur = 10; x.lineJoin = 'round'; x.beginPath();
      var p = [[[0, 70], [0, 22], [20, 46], [35, 8], [50, 42], [65, 8], [80, 46], [100, 22], [100, 70]], []], i;
      x.moveTo(5 + p[0][0][0], 5 + p[0][0][1]); for (i = 1; i < p[0].length; i++) x.lineTo(5 + p[0][i][0], 5 + p[0][i][1] * 0.95);
      x.stroke();
    });
    PL = spr(24, 24, function (x) { x.strokeStyle = '#fff'; x.lineWidth = 1.6; x.shadowColor = '#ffd27a'; x.shadowBlur = 6; x.beginPath(); x.moveTo(12, 3); x.lineTo(12, 21); x.moveTo(3, 12); x.lineTo(21, 12); x.stroke(); });
    OR = ['255,210,122', '255,126,182', '255,150,70'].map(function (c) {
      return spr(64, 64, function (x) { var g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(' + c + ',.95)'); g.addColorStop(0.35, 'rgba(' + c + ',.35)'); g.addColorStop(1, 'rgba(' + c + ',0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); });
    });
    EY = spr(56, 56, function (x) { x.font = '40px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('🧿', 28, 30); });
    SS = spr(150, 8, function (x) { var g = x.createLinearGradient(0, 0, 150, 0); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.85, 'rgba(255,230,170,.9)'); g.addColorStop(1, '#fff'); x.fillStyle = g; x.beginPath(); x.moveTo(0, 4); x.lineTo(150, 1); x.lineTo(150, 7); x.closePath(); x.fill(); });
  }
  function mkAmb() {
    var i; AM = []; ORB = []; EYE = [];
    for (i = 0; i < 6; i++) AM.push({ t: 0, c: i % 3, x: Math.random(), y: Math.random(), v: 14 + Math.random() * 28, sz: 18 + Math.random() * 24, ph: Math.random() * 6 });
    for (i = 0; i < 2; i++) AM.push({ t: 1, x: Math.random(), y: Math.random(), vx: 14 + Math.random() * 14, vy: 8 + Math.random() * 10, sz: 44 + Math.random() * 26, ph: Math.random() * 6 });
    for (i = 0; i < 22; i++) AM.push({ t: 2, x: Math.random(), y: Math.random(), ph: Math.random() * 6, sz: 8 + Math.random() * 9 });
    for (i = 0; i < 14; i++) ORB.push({ x: Math.random(), y: Math.random(), v: 10 + Math.random() * 26, sz: 16 + Math.random() * 44, c: i % 3, ph: Math.random() * 6, a: 0.3 + Math.random() * 0.4 });
    for (i = 0; i < 3; i++) EYE.push({ x: 0.12 + i * 0.38 + Math.random() * 0.1, y: Math.random(), v: 9 + Math.random() * 8, ph: Math.random() * 6, sz: 30 + Math.random() * 14 });
  }
  function ambient(dt) {
    var i, o, x, y;
    for (i = 0; i < ORB.length; i++) {
      o = ORB[i]; o.y -= o.v * dt / H; if (o.y < -0.1) { o.y = 1.1; o.x = Math.random(); }
      ctx.globalAlpha = o.a * (0.75 + 0.25 * Math.sin(T * 1.6 + o.ph) + be * 0.5); ctx.drawImage(OR[o.c], o.x * W + Math.sin(T * 0.5 + o.ph) * 20 - o.sz / 2, o.y * H, o.sz, o.sz);
    }
    for (i = 0; i < EYE.length; i++) {
      o = EYE[i]; o.y -= o.v * dt / H; if (o.y < -0.1) { o.y = 1.1; o.x = Math.random(); }
      ctx.globalAlpha = 0.28 + 0.25 * Math.sin(T * 1.3 + o.ph); ctx.drawImage(EY, o.x * W + Math.sin(T * 0.6 + o.ph) * 16, o.y * H, o.sz, o.sz);
    }
    for (i = 0; i < AM.length; i++) {
      o = AM[i];
      if (o.t === 2) { ctx.globalAlpha = 0.08 + 0.7 * Math.pow(Math.abs(Math.sin(T * 1.1 + o.ph)), 3); ctx.drawImage(PL, o.x * W, o.y * H, o.sz, o.sz); continue; }
      if (o.t === 0) { o.y -= o.v * dt / H; if (o.y < -0.08) { o.y = 1.08; o.x = Math.random(); } x = o.x * W + Math.sin(T * 0.7 + o.ph) * 18; y = o.y * H; ctx.globalAlpha = 0.45; ctx.drawImage(HS[o.c], x, y, o.sz, o.sz * 0.93); }
      else {
        o.x += o.vx * dt / W; o.y -= o.vy * dt / H; if (o.x > 1.1 || o.y < -0.12) { o.x = -0.1; o.y = 0.5 + Math.random() * 0.6; }
        ctx.save(); ctx.translate(o.x * W, o.y * H); ctx.rotate(Math.sin(T * 0.9 + o.ph) * 0.4); ctx.globalAlpha = 0.5; ctx.drawImage(CR, -o.sz / 2, -o.sz * 0.36, o.sz, o.sz * 0.73); ctx.restore();
      }
    }
    ctx.globalAlpha = 1;
  }
  function shooter(dt) {
    nextStar -= dt;
    if (!star && nextStar <= 0) { star = { x: W * (0.35 + Math.random() * 0.65), y: H * (0.05 + Math.random() * 0.3), l: 0 }; nextStar = 2.2 + Math.random() * 3; }
    if (!star) return;
    star.l += dt; var p = star.l / 1.05; if (p >= 1) { star = null; return; }
    ctx.save(); ctx.translate(star.x - p * W * 0.7, star.y + p * W * 0.42); ctx.rotate(0.54); ctx.globalAlpha = Math.sin(p * 3.14); ctx.drawImage(SS, -150, -4); ctx.restore(); ctx.globalAlpha = 1;
  }
  function burst(x, y, n, ci) {
    for (var i = 0; i < n && PT.length < 100; i++) {
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

  /* ---- video + song ---- */
  function media() {
    if (na) return;
    na = new Audio(ASRC); na.loop = true; na.preload = 'auto'; na.volume = 0.85; try { na.load(); } catch (e) {}
    vid = document.createElement('video'); vid.muted = true; vid.defaultMuted = true; vid.setAttribute('muted', ''); vid.playsInline = true; vid.setAttribute('playsinline', ''); vid.setAttribute('webkit-playsinline', '');
    vid.preload = 'auto'; vid.src = VSRC; try { vid.load(); } catch (e) {}
    try { var au0 = window.au || (typeof au !== 'undefined' ? au : null); if (au0) au0.addEventListener('play', function () { if (active) { try { au0.pause(); } catch (e) {} } }); } catch (e) {}
  }
  function warm() {
    if (warmed || !vid) return; warmed = true;
    var go = function () { if (active || !vid.paused) return; var p = vid.play(); if (p && p.then) p.then(function () { if (!active) { vid.pause(); try { vid.currentTime = 0; } catch (e) {} } }).catch(function () {}); };
    if (vid.readyState >= 2) go(); else vid.addEventListener('loadeddata', go, { once: true });
  }
  function startMedia() {
    clearTimeout(stopTm); if (active) return; active = true; fallback = false;
    try { var a0 = (typeof au !== 'undefined') ? au : null; bgWas = !!(a0 && !a0.paused); if (a0) a0.pause(); } catch (e) { bgWas = false; }
    try { na.currentTime = 0; } catch (e) {}
    var p = na.play(); if (p && p.catch) p.catch(function () { fallback = true; try { vid.muted = false; vid.loop = true; vid.play(); } catch (e) {} });
    try { vid.currentTime = 0; } catch (e) {}
    var q = vid.play(); if (q && q.catch) q.catch(function () {});
  }
  function stopMedia() {
    if (!active) return; active = false;
    try { na.pause(); } catch (e) {} try { vid.pause(); vid.muted = true; vid.loop = false; } catch (e) {}
    if (bgWas) { try { var a0 = au; a0.volume = 0.55; var p = a0.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
    bgWas = false;
  }
  function sync() {
    if (!active || fallback) return;
    var at = na.currentTime;
    if (at < OFF) { if (!vid.paused) vid.pause(); if (vid.currentTime > 0.05) { try { vid.currentTime = 0; } catch (e) {} } return; }
    if (vid.paused && vid.readyState >= 2) { var q = vid.play(); if (q && q.catch) q.catch(function () {}); }
    var d = vid.currentTime - (at - OFF);
    if (d > 0.3 || d < -0.3) { try { vid.currentTime = at - OFF; } catch (e) {} vid.playbackRate = 1; }
    else if (d > 0.05) vid.playbackRate = 0.93; else if (d < -0.05) vid.playbackRate = 1.07; else vid.playbackRate = 1;
  }
  function ambDraw() {
    if (vid.readyState < 2 || !vid.videoWidth) return;
    var vh = vid.videoHeight, sw = Math.min(vid.videoWidth, vh * 0.571), sx = (vid.videoWidth - sw) / 2;
    try { actx.drawImage(vid, sx, 0, sw, vh, 0, 0, 64, 112); } catch (e) {}
  }
  function beat() {
    var e = 0, i;
    if (active && !na.paused) { i = Math.floor(na.currentTime * 20) % ENV.length; e = ENV.charCodeAt(i) - 48; }
    var t = e / 9; be += (t - be) * 0.4;
    if (e >= 8 && T - lastBeat > 0.45) {
      lastBeat = T; var r = band.getBoundingClientRect(); ring(r.left + r.width / 2, r.top + r.height / 2, GOLD); burst(r.left + r.width / 2, r.top + r.height / 2, 5);
    }
    var g = Math.round((0.3 + 0.7 * be) * 20) / 20;
    if (g !== lastGl) { lastGl = g; glow.style.opacity = g; }
  }
  function frame(ts) {
    requestAnimationFrame(frame);
    if (!scr.classList.contains('on')) { last = ts; return; }
    var dt = Math.min(0.08, (ts - (last || ts)) / 1000); last = ts; T += dt; frN++;
    sync(); beat();
    if (!(frN & 1)) ambDraw();
    ctx.clearRect(0, 0, W, H); ambient(dt); shooter(dt); front(dt);
  }
  function toStage(n) {
    panels.forEach(function (p, i) { p.classList.toggle('on', i === n); p.classList.toggle('out', i < n); });
    dots.forEach(function (d, i) { d.classList.toggle('on', i === n); d.classList.toggle('done', i < n); });
    lns.forEach(function (l, i) { l.classList.toggle('f', i < n); });
    ring(W / 2, H * 0.32, PINK); burst(W / 2, H * 0.32, 20);
  }
  function celebrate(el) {
    var r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    ring(x, y, GOLD); ring(x, y, PINK); burst(x, y, 30);
  }
  function watchBtn(id) {
    var el = $(id); if (!el) return; var was = el.classList.contains('hide');
    new MutationObserver(function () { var h = el.classList.contains('hide'); if (was && !h) celebrate(el); was = h; }).observe(el, { attributes: true, attributeFilter: ['class'] });
  }
  function build() {
    scr = $('wish'); var pz = $('puz');
    if (!scr || !pz || scr.querySelector('.pfx-cv')) return;
    css(); sprites(); mkAmb(); media();
    var wrap = document.createElement('div'); wrap.className = 'pfx-panels';
    [scr, pz].forEach(function (src) {
      var p = document.createElement('div'); p.className = 'pfx-p';
      if (src === scr) { var ch = []; for (var i = 0; i < src.childNodes.length; i++) ch.push(src.childNodes[i]); ch.forEach(function (c) { p.appendChild(c); }); }
      else while (src.firstChild) p.appendChild(src.firstChild);
      wrap.appendChild(p); panels.push(p);
    });
    amb = document.createElement('canvas'); amb.className = 'pfx-amb'; amb.width = 64; amb.height = 112; actx = amb.getContext('2d');
    var dim = document.createElement('div'); dim.className = 'pfx-dim';
    cv = document.createElement('canvas'); cv.className = 'pfx-cv'; fv = document.createElement('canvas'); fv.className = 'pfx-fx';
    var st = document.createElement('div'); st.className = 'pfx-steps';
    st.innerHTML = '<i class="pfx-st">🎈</i><i class="pfx-ln"></i><i class="pfx-st">🧩</i>';
    dots = [].slice.call(st.querySelectorAll('.pfx-st')); lns = [].slice.call(st.querySelectorAll('.pfx-ln'));
    band = document.createElement('div'); band.className = 'pfx-band';
    glow = document.createElement('div'); glow.className = 'pfx-gl';
    var bv = document.createElement('div'); bv.className = 'pfx-bv'; bv.appendChild(vid);
    sweep = document.createElement('div'); sweep.className = 'pfx-sw'; bv.appendChild(sweep);
    band.appendChild(glow); band.appendChild(bv);
    scr.appendChild(amb); scr.appendChild(dim); scr.appendChild(cv); scr.appendChild(st); scr.appendChild(band); scr.appendChild(wrap); scr.appendChild(fv);
    ctx = cv.getContext('2d'); fx = fv.getContext('2d'); size(); window.addEventListener('resize', size);
    $('wB').onclick = function () { toStage(1); if (!pr) pr = initPuz(); else pr.then(function () { shuffle(); }); };
    ['wB', 'pB'].forEach(watchBtn);
    try { var pi = new Image(); pi.src = CFG.puzzlePhoto; } catch (e) {}
    var wt = $('wt');
    new MutationObserver(function () { wt.classList.remove('pfx-pop'); void wt.offsetWidth; wt.classList.add('pfx-pop'); }).observe(wt, { childList: true, characterData: true, subtree: true });
    $('bl').addEventListener('pointerdown', function (e) { if (e.target.closest && e.target.closest('.b')) { ring(e.clientX, e.clientY, '#ff7eb6'); burst(e.clientX, e.clientY, 12); } });
    $('pz').addEventListener('pointerdown', function (e) { ring(e.clientX, e.clientY, GOLD); burst(e.clientX, e.clientY, 5, 2); });
        var onS = function () {
      var on = scr.classList.contains('on');
      if (on) { clearTimeout(stopTm); if (!entered) { entered = true; toStage(0); setTimeout(function () { if (!pr) pr = initPuz(); }, 2500); } startMedia(); }
      else if (active) { clearTimeout(stopTm); stopTm = setTimeout(function () { if (!scr.classList.contains('on')) { entered = false; stopMedia(); } }, 300); }
    };
    new MutationObserver(onS).observe(scr, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('visibilitychange', function () {
      if (!active) return;
      if (document.hidden) { try { na.pause(); vid.pause(); } catch (e) {} }
      else { try { var p = na.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
    });
    if (scr.classList.contains('on')) onS();
    requestAnimationFrame(frame);
    warm();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
