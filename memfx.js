/* Sweta memories: one video-style line-art screen built from a single photo (p5.jpg), synced to the song, then the old tune returns. Needs vox.mp3 */
(function () {
  'use strict';
  var SRC = 'vox.mp3', PIC = 'p5.jpg', DUR = 42.89, BS = [9.29, 20.51, 34.0];
  var ONS = [0.3,0.68,1.25,1.8,2.2,2.54,3.66,3.99,4.33,4.68,5,5.31,5.62,6.38,6.93,7.24,7.63,7.95,8.44,8.74,9.53,9.87,10.24,10.83,11.2,11.64,12.04,12.41,12.71,13.11,13.55,13.9,14.62,15.01,15.38,15.77,16.32,16.71,17.61,18.02,18.37,18.68,19.12,19.5,19.87,20.64,21,21.35,21.72,22.17,22.71,23.04,23.58,24.15,24.59,24.91,25.47,25.85,26.19,26.62,26.94,27.36,27.73,28.1,28.48,28.86,29.3,29.64,30.04,30.36,31.11,31.48,31.93,32.61,32.94,33.37,34.3,34.67,35.08,35.42,35.74,36.11,36.52,37.12,37.51,37.9,38.55,39.05,39.37,40.06,40.54,40.87,41.2,41.55,41.97,42.53];
  var ENV = '00256655777547887568621268888888766677774115863378888778875211111026888668887888887568988888888886368767888778888876542111101345652016874478522257767776664112676545777666666568775311111136888888635899986468877888888888657767878777657854796368877877888878885258999877996479888888888875222111148987986786578558852378899878888877898888888888888765421111158726974479888778887788864379999888985588888888888764211111127987887786687468742688888889988877899888888888988776421111478788887766776468633787776798667887524787777555337877876788657876666788887458865798888788788889853687799779988988877789878756973368799779878864222221169999987788889888877875322111267424688862258988876764212110258745886776566668743579888888689888874799999987667764222211158978852578876766667876422112578525762158888877888765312212588635884268877667887776778888888888766666777666545533432';
  var $ = function (i) { return document.getElementById(i); };
  function css() {
    if (document.getElementById('mfxCss2')) return;
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap'; document.head.appendChild(l);
    var s = document.createElement('style'); s.id = 'mfxCss2';
    s.textContent =
      '#mem .mfx-cv{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}' +
      '#mem.mfx-run .mfx-cv{z-index:3}' +
      '#mem>*:not(.mfx-cv):not(.mfx-stg):not(.mfx-fbg){position:relative;z-index:1}' +
      '#mem.mfx-run>*:not(.mfx-stg):not(.mfx-cv):not(.mfx-fbg){visibility:hidden}' +
      '#mem.mfx-fin #ph,#mem.mfx-fin #cap,#mem.mfx-fin #pd{display:none}' +
      '#mem>.mfx-stg{position:absolute;inset:0;z-index:2;overflow:hidden;background:linear-gradient(180deg,#1b2046,#262b59 48%,#12142e);transition:opacity .7s}' +
      '.mfx-stg .mfx-w{position:absolute;inset:0;opacity:0;background:linear-gradient(180deg,#2b1a48,#7d3b63 55%,#c76a7c);transition:opacity 1.4s}' +
      '.mfx-stg.warm .mfx-w{opacity:1}' +
      '.mfx-au{position:absolute;width:110vmax;height:110vmax;border-radius:50%;pointer-events:none;will-change:translate;animation:mfxAu 16s ease-in-out infinite alternate}' +
      '.mfx-au.a1{left:-60vmax;top:-55vmax;background:radial-gradient(circle,rgba(255,170,95,.22),transparent 62%)}' +
      '.mfx-au.a2{right:-60vmax;bottom:-50vmax;background:radial-gradient(circle,rgba(140,120,255,.26),transparent 62%);animation-delay:-5s}' +
      '.mfx-au.a3{left:-30vmax;bottom:-30vmax;background:radial-gradient(circle,rgba(255,110,150,.16),transparent 62%);animation-delay:-9s}' +
      '@keyframes mfxAu{from{translate:0 0;scale:1}to{translate:14vw 9vh;scale:1.2}}' +
      '.mfx-vg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 42%,transparent 42%,rgba(3,4,16,.62))}' +
      '.mfx-gr{position:absolute;inset:-20%;pointer-events:none;opacity:.14;background-image:var(--gr);animation:mfxGr .7s steps(1) infinite}' +
      '@keyframes mfxGr{0%{translate:0 0}20%{translate:-7% 5%}40%{translate:6% -9%}60%{translate:-4% -6%}80%{translate:9% 7%}}' +
      '.mfx-sc{position:absolute;top:0;bottom:0;width:1px;left:0;background:rgba(255,255,255,.1);pointer-events:none;animation:mfxSc 3.4s steps(1) infinite}' +
      '@keyframes mfxSc{0%{translate:18vw 0;opacity:0}12%{translate:18vw 0;opacity:1}24%{translate:63vw 0;opacity:0}50%{translate:41vw 0;opacity:1}58%{translate:41vw 0;opacity:0}80%{translate:84vw 0;opacity:1}90%,100%{translate:84vw 0;opacity:0}}' +
      '.mfx-fk{position:absolute;inset:0;background:rgba(255,240,220,.05);pointer-events:none;animation:mfxFk 2.3s steps(1) infinite}' +
      '@keyframes mfxFk{0%{opacity:0}8%{opacity:1}14%{opacity:0}55%{opacity:0}58%{opacity:1}62%{opacity:0}}' +
      '.mfx-stg .mfx-ln{position:absolute;left:7%;right:7%;bottom:15%;text-align:center;font:600 1.8rem/1.25 Caveat,"Segoe Script","Bradley Hand",cursive;color:#f4ecff}' +
      '.mfx-ln span{display:inline-block;margin:0 .16em;opacity:0;translate:0 12px;rotate:-3deg;transition:opacity .45s,translate .5s cubic-bezier(.2,1.3,.4,1),rotate .5s;text-shadow:0 0 14px rgba(255,210,150,.45)}' +
      '.mfx-ln span.l{opacity:1;translate:0 0;rotate:0deg}' +
      '.mfx-ln:after{content:"";display:block;height:2px;width:64%;margin:8px auto 0;background:linear-gradient(90deg,transparent,#ffd27a,#ff7eb6,transparent);scale:0 1;transition:scale .9s .3s}' +
      '.mfx-ln.u:after{scale:1 1}' +
      '.mfx-stg .mfx-ck{position:absolute;top:14px;right:18px;font:600 1rem Caveat,"Segoe Script",cursive;color:rgba(255,255,255,.5);letter-spacing:.04em}' +
      '.mfx-stg .mfx-fl{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}' +
      '.mfx-fl.go{animation:mfxFl .55s ease-out}@keyframes mfxFl{from{opacity:.14}to{opacity:0}}';
    document.head.appendChild(s);
  }
  function css2() {
    if (document.getElementById('mfxCss3')) return;
    var s = document.createElement('style'); s.id = 'mfxCss3';
    s.textContent =
      '#mem.mfx-fin h2{text-shadow:0 0 12px #ffd27a,0 0 28px #ff7eb6}' +
      '#mem .mfx-fbg{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;background:linear-gradient(180deg,#1b2046,#262b59 48%,#12142e)}' +
      '.mfx-ph{position:relative;width:100%;height:100%;border-radius:inherit;overflow:hidden}' +
      '.mfx-ph i{position:absolute;inset:0;background-size:cover;background-position:50% 22%;animation:mfxKB 8s ease-in-out infinite alternate}' +
      '@keyframes mfxKB{from{scale:1.02;translate:-2% 0}to{scale:1.14;translate:2% -2%}}' +
      '.mfx-grid{display:grid;grid-template-columns:min(66vw,270px);gap:14px;justify-content:center;margin:4px 0}' +
      '.mfx-tile{position:relative;aspect-ratio:1;padding:6px;box-sizing:border-box;rotate:var(--r);will-change:translate;border-radius:26px;' +
      'background:#f7efe6;box-shadow:0 0 34px rgba(255,170,120,.5);' +
      'animation:mfxTi .9s cubic-bezier(.2,1.4,.4,1) both var(--d),mfxFlt 3.6s ease-in-out infinite var(--d)}' +
      '.mfx-tile .mfx-ph{border-radius:20px}' +
      '@keyframes mfxTi{from{scale:.2;opacity:0}to{scale:1;opacity:1}}' +
      '@keyframes mfxFlt{0%,100%{translate:0 0}50%{translate:0 -7px}}' +
      '.mfx-tile p{position:absolute;left:6px;right:6px;bottom:6px;margin:0;padding:22px 8px 9px;z-index:3;font:600 1.15rem/1.2 Caveat,"Segoe Script",cursive;color:#fff;border-radius:0 0 20px 20px;' +
      'background:linear-gradient(transparent,rgba(20,6,30,.78))}';
    document.head.appendChild(s);
  }
  var mem, cv, ctx, W = 0, H = 0, D = 1, raf = 0, last = 0, mode = '', running = false, entered = false;
  var aud = null, bgWas = false, vclock = null, useV = false, startAt = 0, ended = false;
  var stg, glowEl, lnEl, flEl, ckEl, oi = 0, ph = -1, ps = 0, pe = DUR, lit = -1, es = 0, bt = 0, ckS = -1;
  var P = [], R = [], PE = [], DU = [], SPR = {}, DT = null, PH = null, FL = [], lastPet = 0, wasWarm = false;
  function size() { W = cv.clientWidth || window.innerWidth; H = cv.clientHeight || window.innerHeight; D = Math.min(window.devicePixelRatio || 1, 1.25); cv.width = Math.round(W * D); cv.height = Math.round(H * D); }
  function T() {
    if (useV) return (performance.now() - vclock) / 1000;
    var t = aud ? aud.currentTime : 0;
    if (t === 0 && performance.now() - startAt > 1500) { useV = true; vclock = performance.now() - 1500; }
    return t;
  }
  function cap(i) { try { return CFG.photos[i].cap || ''; } catch (e) { return ''; } }
  function nImg() { try { return imgs.length; } catch (e) { return 0; } }
  function ease(x) { x = x < 0 ? 0 : x > 1 ? 1 : x; return x * x * (3 - 2 * x); }
  function eo(x) { x = x < 0 ? 0 : x > 1 ? 1 : x; return 1 - Math.pow(1 - x, 3); }
  function eb(x) { x = x < 0 ? 0 : x > 1 ? 1 : x; var c = 1.70158; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); }
  function spr(w, draw) { var c = document.createElement('canvas'); c.width = c.height = w; draw(c.getContext('2d'), w); return c; }
  function mkSprites() {
    SPR.h = ['#ff5fa2', '#ff8fc0', '#c79bff', '#ff4d6d'].map(function (col) {
      return spr(64, function (x) {
        var g = x.createRadialGradient(26, 24, 2, 32, 32, 34); g.addColorStop(0, '#fff'); g.addColorStop(0.35, col); g.addColorStop(1, col);
        x.shadowColor = col; x.shadowBlur = 8; x.fillStyle = g; x.beginPath(); x.moveTo(32, 56);
        x.bezierCurveTo(-4, 32, 10, 6, 32, 22); x.bezierCurveTo(54, 6, 68, 32, 32, 56); x.fill();
      });
    });
    SPR.p = ['#e02a45', '#ff6b86'].map(function (col) {
      return spr(48, function (x) {
        var g = x.createLinearGradient(8, 8, 40, 40); g.addColorStop(0, '#ffd0d8'); g.addColorStop(1, col);
        x.fillStyle = g; x.beginPath(); x.moveTo(24, 4); x.bezierCurveTo(46, 14, 44, 36, 24, 44); x.bezierCurveTo(4, 36, 2, 14, 24, 4); x.fill();
      });
    });
    SPR.s = spr(48, function (x) {
      x.shadowColor = '#fff2b0'; x.shadowBlur = 10; x.fillStyle = '#fffbe0'; x.beginPath(); x.moveTo(24, 3);
      x.quadraticCurveTo(26, 22, 45, 24); x.quadraticCurveTo(26, 26, 24, 45); x.quadraticCurveTo(22, 26, 3, 24); x.quadraticCurveTo(22, 22, 24, 3); x.fill();
    });
    SPR.o = spr(96, function (x) {
      var g = x.createRadialGradient(48, 48, 0, 48, 48, 48); g.addColorStop(0, 'rgba(255,225,170,.95)'); g.addColorStop(0.3, 'rgba(255,190,120,.4)'); g.addColorStop(1, 'rgba(255,170,100,0)');
      x.fillStyle = g; x.fillRect(0, 0, 96, 96);
    });
    SPR.g = spr(96, function (x) {
      var g = x.createRadialGradient(48, 48, 0, 48, 48, 48); g.addColorStop(0, 'rgba(255,140,190,.55)'); g.addColorStop(1, 'rgba(255,140,190,0)');
      x.fillStyle = g; x.fillRect(0, 0, 96, 96);
    });
    var n = document.createElement('canvas'); n.width = n.height = 96; var nx = n.getContext('2d'), im = nx.createImageData(96, 96), i;
    for (i = 0; i < im.data.length; i += 4) { var v = Math.random() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
    nx.putImageData(im, 0, 0); SPR.n = n.toDataURL('image/png');
  }
  function mkAmb() { DU = []; for (var i = 0; i < 40; i++) DU.push({ x: Math.random(), y: Math.random(), v: 4 + Math.random() * 10, ph: Math.random() * 6, sz: 0.8 + Math.random() * 1.3 }); }
  function dust(dt, t) {
    for (var i = 0; i < DU.length; i++) {
      var o = DU[i]; o.y -= o.v * dt / H; if (o.y < -0.02) { o.y = 1.02; o.x = Math.random(); }
      ctx.fillStyle = 'rgba(255,240,215,' + (0.12 + 0.5 * Math.abs(Math.sin(t * 1.2 + o.ph))) + ')'; ctx.fillRect(o.x * W + Math.sin(t * 0.6 + o.ph) * 10, o.y * H, o.sz, o.sz);
    }
  }
  function buildDots() {
    if (DT || !PH || !PH.naturalWidth) return;
    try {
      var cw = 72, ch = 88, c = document.createElement('canvas'); c.width = cw; c.height = ch; var x = c.getContext('2d');
      var nw = PH.naturalWidth, nh = PH.naturalHeight, sw = nw * 0.72, sh = sw * ch / cw;
      x.drawImage(PH, nw * 0.2, nh * 0.045, sw, sh, 0, 0, cw, ch);
      var d = x.getImageData(0, 0, cw, ch).data, L = new Array(cw * ch), B = new Array(cw * ch), i, j, a, b, hist = new Array(64).fill(0);
      for (i = 0; i < cw * ch; i++) L[i] = (d[i * 4] * 0.3 + d[i * 4 + 1] * 0.59 + d[i * 4 + 2] * 0.11) / 255;
      for (j = 0; j < ch; j++) for (i = 0; i < cw; i++) {
        var sm = 0, k = 0;
        for (b = -2; b <= 2; b++) for (a = -2; a <= 2; a++) { var ii = i + a, jj = j + b; if (ii >= 0 && jj >= 0 && ii < cw && jj < ch) { sm += L[jj * cw + ii]; k++; } }
        B[j * cw + i] = Math.min(1, Math.max(0, L[j * cw + i] + 1.5 * (L[j * cw + i] - sm / k)));
        hist[Math.min(63, B[j * cw + i] * 64 | 0)]++;
      }
      var acc = 0, lo = 0, hi = 1, tot = cw * ch;
      for (i = 0; i < 64; i++) { acc += hist[i]; if (acc > tot * 0.1) { lo = i / 64; break; } }
      acc = 0; for (i = 63; i >= 0; i--) { acc += hist[i]; if (acc > tot * 0.06) { hi = i / 64; break; } }
      var A = [];
      for (j = 0; j < ch; j++) for (i = 0; i < cw; i++) {
        var l = Math.min(1, Math.max(0, (B[j * cw + i] - lo) / Math.max(0.1, hi - lo))), ex = (i / cw - 0.5) / 0.5, ey = (j / ch - 0.5) / 0.52, q = Math.hypot(ex, ey), m = 1 - Math.min(1, Math.max(0, (q - 0.68) / 0.32));
        l = Math.pow(l, 1.25) * (m * m * (3 - 2 * m));
        if (l > 0.13) A.push({ tx: (i + 0.5) / cw, ty: (j + 0.5) / ch, sx: Math.random(), sy: Math.random(), d: Math.random() * 3.6, r: 0.22 + 0.7 * l, ph: Math.random() * 6 });
      }
      DT = A;
    } catch (e) { DT = null; }
  }
  function ring(x, y, c) { R.push({ x: x, y: y, r: 30, a: 0.8, c: c }); }
  function burst(n, x, y) {
    for (var i = 0; i < n && P.length < 70; i++) {
      var a = Math.random() * 6.283, sp = 50 + Math.random() * 110, k = Math.random() < 0.55;
      P.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 30, l: 0, m: 1 + Math.random() * 0.8, im: k ? SPR.h[Math.floor(Math.random() * 4)] : SPR.s, sz: 9 + Math.random() * 11 });
    }
  }
  function petal(x, y) { if (PE.length < 34) PE.push({ x: x, y: y, vx: (Math.random() - 0.5) * 16, vy: 26 + Math.random() * 26, r: Math.random() * 6, vr: (Math.random() - 0.5) * 3, ph: Math.random() * 6, sz: 9 + Math.random() * 8, c: Math.random() < 0.7 ? 0 : 1 }); }
  function parts(dt, t) {
    var i;
    for (i = PE.length - 1; i >= 0; i--) {
      var q = PE[i]; q.y += q.vy * dt; q.x += q.vx * dt + Math.sin(t * 1.5 + q.ph) * 0.4; q.r += q.vr * dt;
      if (q.y > H + 20) { PE.splice(i, 1); continue; }
      ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.r); ctx.globalAlpha = 0.85; ctx.drawImage(SPR.p[q.c], -q.sz / 2, -q.sz / 2, q.sz, q.sz * 1.2); ctx.restore();
    }
    for (i = P.length - 1; i >= 0; i--) {
      var p = P[i]; p.l += dt; if (p.l > p.m) { P.splice(i, 1); continue; }
      p.vy += 40 * dt; p.x += p.vx * dt; p.y += p.vy * dt;
      ctx.globalAlpha = 1 - p.l / p.m; ctx.drawImage(p.im, p.x - p.sz / 2, p.y - p.sz / 2, p.sz, p.sz);
    }
    ctx.globalAlpha = 1;
  }
  function line(a) { ctx.lineCap = ctx.lineJoin = 'round'; ctx.strokeStyle = 'rgba(255,255,255,' + a + ')'; ctx.lineWidth = 1.7; }
  function glowLine(a) { ctx.strokeStyle = 'rgba(255,225,190,' + (a * 0.14) + ')'; ctx.lineWidth = 6; ctx.stroke(); line(a); ctx.stroke(); }
  function wb(i) { return Math.sin(i * 12.9898 + bt * 78.233) * 0.5; }
  function orb(x, y, r, a) {
    ctx.globalAlpha = a * (0.55 + es * 0.4); ctx.drawImage(SPR.o, x - r * 3, y - r * 3, r * 6, r * 6);
    ctx.globalAlpha = a; ctx.fillStyle = '#fff3d6'; ctx.beginPath(); ctx.arc(x, y, r * 0.5, 0, 6.2832); ctx.fill();
  }
  function lid(cx, cy, ew, m, p) {
    if (p <= 0) return; var N = 36, n = Math.max(1, Math.floor(N * p)), i; ctx.beginPath();
    for (i = 0; i <= n; i++) { var u = i / N, x = cx - ew + 2 * ew * u, y = cy + 4 * m * ew * u * (1 - u) + wb(i); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
    glowLine(0.95);
  }
  function faceCrop(sz) { return PH && PH.naturalWidth ? [PH.naturalWidth * 0.08, PH.naturalHeight * 0.03, PH.naturalWidth * 0.84, PH.naturalWidth * 0.84] : null; }
  function disc(x, y, r, al) {
    var c = faceCrop(); if (!c || al <= 0) return;
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.clip(); ctx.globalAlpha = al; ctx.drawImage(PH, c[0], c[1], c[2], c[3], x - r, y - r, 2 * r, 2 * r); ctx.restore(); ctx.globalAlpha = 1;
  }
  /* scene 0: eye */
  function sc0(t, a) {
    var cx = W / 2, cy = H * 0.33, ew = Math.min(W * 0.36, 150), i, bl = 0, tb = t - 7.1;
    if (tb > 0 && tb < 0.4) bl = Math.sin(tb / 0.4 * Math.PI);
    var open = 1 - 0.93 * bl;
    ctx.globalAlpha = a; orb(W * 0.8 + Math.sin(t * 0.4) * 8, H * 0.13 + Math.cos(t * 0.5) * 6, 15 + es * 6, a); ctx.globalAlpha = a;
    lid(cx, cy, ew, -0.52 * open, eo((t - 0.1) / 1.5)); lid(cx, cy, ew, 0.46 * open, eo((t - 0.6) / 1.5));
    for (i = 0; i < 10; i++) {
      var g = eo((t - 2 - i * 0.09) / 0.5); if (g <= 0 || open < 0.4) continue;
      var u = (i + 1) / 11, X = cx - ew + 2 * ew * u, m = -0.52 * open * ew, Y = cy + 4 * m * u * (1 - u), tx = 2 * ew, ty = 4 * m * (1 - 2 * u), l = Math.hypot(tx, ty), nx = ty / l, ny = -tx / l, ln = (6 + 5 * Math.sin(u * 3.14)) * g;
      ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X + nx * ln, Y + ny * ln); ctx.strokeStyle = 'rgba(255,255,255,' + (0.8 * a) + ')'; ctx.lineWidth = 1.4; ctx.stroke();
    }
    var ir = ew * 0.3, ip = eo((t - 1.6) / 1.0), px = cx + Math.sin(t * 0.9) * ew * 0.07 * eo((t - 3) / 1), py = cy + Math.cos(t * 0.7) * ew * 0.03 * eo((t - 3) / 1);
    if (ip > 0 && open > 0.25) {
      line(0.9 * a * open); ctx.beginPath(); ctx.arc(px, py, ir, -1.57, -1.57 + 6.2832 * ip); ctx.stroke();
      ctx.beginPath(); ctx.arc(px, py, ir * 0.62, -1.57, -1.57 + 6.2832 * ip); ctx.strokeStyle = 'rgba(255,255,255,' + (0.45 * a * open) + ')'; ctx.stroke();
      var pa = eo((t - 4.2) / 1.6) * open;
      if (t > 2.3) { ctx.globalAlpha = a * open * (1 - pa * 0.7); ctx.fillStyle = '#fdf6e8'; ctx.beginPath(); ctx.arc(px, py, ew * 0.12, 0, 6.2832); ctx.fill(); }
      disc(px, py, ir * 0.96, 0.92 * pa * a);
      ctx.globalAlpha = a * open; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px - ir * 0.3, py - ir * 0.3, 2.2, 0, 6.2832); ctx.fill();
    }
    var ho = eo((t - 0.4) / 1.4); if (ho > 0) { ctx.beginPath(); ctx.moveTo(W * 0.1, H * 0.5); ctx.lineTo(W * (0.1 + 0.8 * ho), H * 0.5); line(0.5 * a); ctx.stroke(); }
    ctx.globalAlpha = 1;
  }
  /* scene 1: garden */
  function sc1(t, a) {
    var by = H * 0.47, x0 = W * 0.08, x1 = W * 0.92, N = 9, i, bp = eo(t / 1.2);
    ctx.beginPath(); ctx.moveTo(x0, by); ctx.lineTo(x0 + (x1 - x0) * bp, by); line(0.6 * a); ctx.stroke();
    var mp = eo((t - 1.8) / 1.6), mr = Math.min(W * 0.15, 62), mx = W / 2, my = H * 0.2 + Math.sin(t * 0.8) * 4;
    if (mp > 0) {
      ctx.globalAlpha = a * mp * (0.7 + es * 0.3); ctx.drawImage(SPR.g, mx - mr * 2.1, my - mr * 2.1, mr * 4.2, mr * 4.2);
      disc(mx, my, mr * mp, 0.95 * a);
      ctx.globalAlpha = a * mp; ctx.beginPath(); ctx.arc(mx, my, mr * mp + 4, 0, 6.2832); line(0.85 * a * mp); ctx.stroke();
      ctx.save(); ctx.setLineDash([3, 9]); ctx.lineDashOffset = -t * 14; ctx.beginPath(); ctx.arc(mx, my, mr + 12, 0, 6.2832); ctx.strokeStyle = 'rgba(255,200,215,' + (0.6 * a * mp) + ')'; ctx.stroke(); ctx.restore();
    }
    var wp = Math.max(0, Math.min(1, (t - 3.2) / 5.4)), ox = W * (0.14 + 0.72 * ease(wp)), oy = by - H * 0.16 + Math.sin(t * 2) * 5;
    for (i = 0; i < N; i++) {
      var fx = x0 + (x1 - x0) * (i + 0.5) / N, gp = eo((t - 0.5 - i * 0.16) / 1.1);
      if (gp <= 0) continue;
      if (ox > fx && wp > 0 && !FL[i]) { FL[i] = 1; for (var k = 0; k < 4; k++) petal(fx, by - H * 0.1); ring(fx, by - H * 0.1, '#ff7a8a'); }
      var h = H * 0.13 * (0.8 + 0.35 * Math.abs(Math.sin(i * 2.1 + 1))) * gp, sw = Math.sin(t * 1.3 + i * 0.9) * 3 * gp, tx = fx + sw, ty = by - h;
      ctx.beginPath(); ctx.moveTo(fx, by); ctx.quadraticCurveTo(fx + sw * 0.2 - 4, by - h * 0.5, tx, ty); line(0.85 * a); ctx.stroke();
      if (gp > 0.45) {
        var lp = eo((gp - 0.45) / 0.4), ly = by - h * 0.42;
        ctx.beginPath(); ctx.moveTo(fx - 1, ly); ctx.quadraticCurveTo(fx - 8 * lp, ly - 3 * lp, fx - 11 * lp, ly - 9 * lp); ctx.moveTo(fx + 1, ly + 6); ctx.quadraticCurveTo(fx + 8 * lp, ly + 3 * lp, fx + 11 * lp, ly - 3 * lp); ctx.strokeStyle = 'rgba(255,255,255,' + (0.6 * a) + ')'; ctx.lineWidth = 1.3; ctx.stroke();
      }
      if (gp > 0.7) {
        var bq = eb((gp - 0.7) / 0.3), r = 6.5 * bq; ctx.fillStyle = 'rgba(214,41,63,' + a + ')'; ctx.beginPath(); ctx.arc(tx, ty, r, 0, 6.2832); ctx.fill();
        ctx.beginPath(); ctx.arc(tx, ty, r * 0.55, 0.3, 2.9); ctx.strokeStyle = 'rgba(255,140,150,' + (0.9 * a) + ')'; ctx.lineWidth = 1.2; ctx.stroke();
      }
    }
    if (wp > 0) {
      ctx.beginPath(); ctx.moveTo(ox - 22 * (1 - wp * 0.6), by); ctx.quadraticCurveTo(ox - 8, by - (by - oy) * 0.5, ox, oy); line(0.9 * a); ctx.stroke(); orb(ox, oy, 7 + es * 3, a);
    }
    ctx.globalAlpha = 1;
  }
  /* scene 2: dotted portrait */
  function sc2(t, a) {
    var pw = Math.min(W * 0.68, 270), pg = pw * 1.2, cx = W / 2, cy = H * 0.34, x0 = cx - pw / 2, y0 = cy - pg / 2, i, sc = 1 + es * 0.012;
    var rp = eo(t / 2.2), rc = pw * 0.78;
    if (rp > 0) { ctx.save(); ctx.setLineDash([2, 10]); ctx.lineDashOffset = -t * 12; ctx.beginPath(); ctx.arc(cx, cy, rc, -1.57, -1.57 + 6.2832 * rp); ctx.strokeStyle = 'rgba(255,255,255,' + (0.55 * a) + ')'; ctx.lineWidth = 1.6; ctx.stroke(); ctx.restore(); }
    var oa = t * 0.7; orb(cx + Math.cos(oa) * rc, cy + Math.sin(oa) * rc, 6 + es * 3, a * eo((t - 1) / 1));
    if (DT) {
      var band = -1, bc = (t - 5) % 4, n = DT.length, d, e, X, Y, s, tt;
      if (t > 5 && bc < 1.8) band = y0 + pg * (bc / 1.8);
      ctx.fillStyle = 'rgba(255,246,236,' + (0.88 * a) + ')'; var pitch = pw / 72;
      for (i = 0; i < n; i++) {
        d = DT[i]; tt = (t - 0.3 - d.d) / 1.7; if (tt <= 0) continue; e = eo(tt);
        X = d.sx * W + (x0 + d.tx * pw - d.sx * W) * e; Y = d.sy * H + (y0 + d.ty * pg - d.sy * H) * e;
        if (tt > 1) { X += Math.sin(t * 1.7 + d.ph) * 0.3; Y += Math.cos(t * 1.4 + d.ph) * 0.3; X = cx + (X - cx) * sc; Y = cy + (Y - cy) * sc; }
        s = d.r * pitch * 1.05 * (tt > 1 ? 1 : 0.4 + 0.6 * tt);
        if (band >= 0 && Math.abs(Y - band) < 14) s *= 1.7;
        ctx.fillRect(X - s / 2, Y - s / 2, s, s);
      }
    }
    ctx.globalAlpha = 1;
  }
  /* scene 3: finale */
  function sc3(t, a) {
    var S = Math.min(W * 0.56, 220), fw = S + 16, fh = S + 40, px = W / 2, py = H * 0.06, dp = eb(t / 1.2);
    var th = 0.22 * Math.exp(-t * 1.1) * Math.cos(t * 3.2) + 0.03 * Math.sin(t * 0.9), len = (H * 0.34 - py) * dp;
    ctx.save(); ctx.globalAlpha = a; ctx.translate(px, py); ctx.rotate(th);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-fw * 0.4, len - fh * 0.5); ctx.moveTo(0, 0); ctx.lineTo(fw * 0.4, len - fh * 0.5); line(0.7 * a); ctx.stroke();
    ctx.translate(0, len); ctx.fillStyle = '#f7efe6'; ctx.beginPath(); ctx.moveTo(-fw / 2 + 8, -fh / 2); ctx.arcTo(fw / 2, -fh / 2, fw / 2, fh / 2, 10); ctx.arcTo(fw / 2, fh / 2, -fw / 2, fh / 2, 10); ctx.arcTo(-fw / 2, fh / 2, -fw / 2, -fh / 2, 10); ctx.arcTo(-fw / 2, -fh / 2, fw / 2, -fh / 2, 10); ctx.closePath(); ctx.fill();
    if (PH && PH.naturalWidth) {
      ctx.save(); ctx.beginPath(); ctx.rect(-S / 2, -fh / 2 + 8, S, S); ctx.clip();
      var k = 1.02 + 0.05 * Math.sin(t * 0.5), sw = PH.naturalWidth * 0.9 / k; ctx.drawImage(PH, PH.naturalWidth * 0.05, PH.naturalHeight * 0.04, sw, sw, -S / 2, -fh / 2 + 8, S, S); ctx.restore();
    }
    ctx.restore();
    var hp = eo((t - 2.4) / 3.2), hx = W / 2, hy = H * 0.655, hs = Math.min(W * 0.07, 28);
    if (hp > 0) {
      var n = Math.floor(60 * hp), i, tx = 0, ty = 0; ctx.beginPath();
      for (i = 0; i <= n; i++) { var u = i / 60 * 6.2832, x = 16 * Math.pow(Math.sin(u), 3), y = 13 * Math.cos(u) - 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) - Math.cos(4 * u); tx = hx + x * hs / 16 * 1.4; ty = hy - y * hs / 16 * 1.4; if (i) ctx.lineTo(tx, ty); else ctx.moveTo(tx, ty); }
      ctx.strokeStyle = 'rgba(255,150,170,' + a + ')'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.stroke();
      if (hp < 1) {
        ctx.save(); ctx.translate(tx, ty); ctx.lineCap = 'butt'; ctx.strokeStyle = '#efe6dc'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(6, -9); ctx.lineTo(26, -40); ctx.stroke();
        ctx.strokeStyle = '#2a2230'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(22, -34); ctx.lineTo(31, -48); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(10, -6); ctx.lineTo(6, -12); ctx.closePath(); ctx.fill(); ctx.restore();
      }
    }
    if (t > 0.6 && t - lastPet > 0.22) { lastPet = t; petal(W * (0.05 + Math.random() * 0.9), -10); }
    ctx.globalAlpha = 1;
  }
  function setPhase(p) {
    ph = p; ps = p ? BS[p - 1] : 0; pe = p < 3 ? BS[p] : DUR; lit = -1;
    var c = cap(p), words = c.split(/\s+/).filter(Boolean);
    lnEl.className = 'mfx-ln'; lnEl.innerHTML = words.map(function (w) { return '<span>' + w + '</span>'; }).join(' ');
    flEl.classList.remove('go'); void flEl.offsetWidth; flEl.classList.add('go');
    if (p === 3) stg.classList.add('warm');
    ring(W / 2, H * 0.33, '#ffd27a'); burst(16, W / 2, H * 0.33);
  }
  function showStep(dt) {
    var t = T();
    if (ended || t >= DUR + 0.2) { finish(); return; }
    var e0 = (ENV.charCodeAt(Math.floor(t * 20)) - 48) / 9 || 0; es += (e0 - es) * 0.35; bt = Math.floor(t * 8);
    var p = t < BS[0] ? 0 : t < BS[1] ? 1 : t < BS[2] ? 2 : 3;
    if (p !== ph) { if (p !== 1 || !FL.length) FL = []; setPhase(p); }
    while (oi < ONS.length && t >= ONS[oi]) {
      if (es > 0.45) { ring(W / 2, H * 0.33, '#ffd7a0'); burst(4, W / 2, H * 0.33); }
      oi++;
    }
    var n = Math.ceil(lnEl.children.length * Math.min(1, Math.max(0, (t - ps - 0.5) / ((pe - ps) * 0.62))));
    if (n !== lit) { lit = n; for (var k = 0; k < lnEl.children.length; k++) lnEl.children[k].className = k < n ? 'l' : ''; if (n >= lnEl.children.length) lnEl.classList.add('u'); }
    var sec = Math.floor(t); if (sec !== ckS) { ckS = sec; ckEl.textContent = Math.floor(sec / 60) + ':' + (sec % 60 < 10 ? '0' : '') + sec % 60; }
    ctx.setTransform(D, 0, 0, D, 0, 0); ctx.clearRect(0, 0, W, H); dust(dt, t);
    var S = [0, BS[0], BS[1], BS[2]], E = [BS[0], BS[1], BS[2], DUR], F = [sc0, sc1, sc2, sc3], j;
    for (j = 0; j < 4; j++) {
      if (t < S[j] - 0.2 || t > E[j] + 0.4) continue;
      var a = (j ? ease((t - (S[j] - 0.2)) / 0.9) : ease(t / 1.0)) * (j < 3 ? 1 - ease((t - (E[j] - 0.5)) / 0.9) : 1);
      if (a > 0.01) F[j](Math.max(0, t - S[j]), a);
    }
    for (var i = R.length - 1; i >= 0; i--) {
      var r = R[i]; r.r += 240 * dt; r.a -= 0.95 * dt; if (r.a <= 0) { R.splice(i, 1); continue; }
      ctx.globalAlpha = r.a; ctx.strokeStyle = r.c; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 6.283); ctx.stroke();
    }
    ctx.globalAlpha = 1; parts(dt, t);
  }
  function finStep(dt) {
    var t = last / 1000; ctx.setTransform(D, 0, 0, D, 0, 0);
    ctx.clearRect(0, 0, W, H); es = 0; dust(dt, t); parts(dt, t);
  }
  function resumeBg() {
    try {
      if (!bgWas) return;
      au.volume = 0; var p = au.play(); if (p && p.catch) p.catch(function () {});
      var v = 0, iv = setInterval(function () { v += 0.03; if (v >= 0.55) { v = 0.55; clearInterval(iv); } au.volume = v; }, 120);
    } catch (e) {}
  }
  function finish() {
    if (mode === 'fin') return;
    mode = 'fin'; running = false; window.__mfxq = false;
    try { if (aud) aud.pause(); } catch (e) {}
    resumeBg();
    var s = stg; if (s) { s.style.opacity = 0; setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 800); }
    mem.classList.remove('mfx-run'); mem.classList.add('mfx-fin');
    css2(); P = []; R = []; PE = [];
    var fb = document.createElement('div'); fb.className = 'mfx-fbg';
    fb.innerHTML = '<i class="mfx-au a1"></i><i class="mfx-au a2"></i><i class="mfx-au a3"></i>';
    mem.insertBefore(fb, mem.firstChild);
    var h = '<div class="mfx-tile" style="--r:-2deg;--d:0s"><div class="mfx-ph"><i style="background-image:url(\'' + PIC + '\')"></i></div><p>' + cap(3) + '</p></div>';
    var g = document.createElement('div'); g.className = 'mfx-grid'; g.innerHTML = h;
    mem.insertBefore(g, $('nx'));
    try { mi = nImg() - 1; } catch (e) {}
    $('nx').textContent = 'Aage bhi Hai birthday girl 💗♥️';
  }
  function cleanup() {
    try { if (aud) aud.pause(); } catch (e) {}
    if (mode === 'show') resumeBg();
    mode = ''; running = false; window.__mfxq = false;
    if (stg && stg.parentNode) stg.parentNode.removeChild(stg);
    var g = mem.querySelector('.mfx-grid'); if (g) g.parentNode.removeChild(g);
    var f = mem.querySelector('.mfx-fbg'); if (f) f.parentNode.removeChild(f);
    mem.classList.remove('mfx-run', 'mfx-fin'); stg = null;
  }
  var pre = null, warmed = false;
  function warm() {
    if (warmed) return; warmed = true;
    try { pre = new Audio(SRC); pre.preload = 'auto'; pre.load(); } catch (e) { pre = null; }
    try {
      PH = new Image(); PH.onload = function () { buildDots(); if (PH.decode) PH.decode().catch(function () {}); }; PH.src = PIC;
      Promise.all(CFG.photos.map(function (p, i) { return loadImg(p.src, i); })).then(function (a) { try { if (!imgs.length) imgs = a; } catch (e) {} });
    } catch (e) {}
  }
  function begin() {
    window.__mfxq = true; running = true; mode = 'show'; ended = false; useV = false; oi = 0; ph = -1; es = 0; P = []; R = []; PE = []; FL = []; lastPet = 0; ckS = -1;
    try { bgWas = !au.paused; au.pause(); } catch (e) { bgWas = false; }
    stg = document.createElement('div'); stg.className = 'mfx-stg'; stg.style.setProperty('--gr', 'url(' + SPR.n + ')');
    stg.innerHTML = '<div class="mfx-w"></div><i class="mfx-au a1"></i><i class="mfx-au a2"></i><i class="mfx-au a3"></i><div class="mfx-vg"></div><div class="mfx-gr"></div><i class="mfx-sc"></i><div class="mfx-fk"></div><div class="mfx-ck"></div><div class="mfx-ln"></div><div class="mfx-fl"></div>';
    mem.insertBefore(stg, mem.firstChild);
    lnEl = stg.querySelector('.mfx-ln'); flEl = stg.querySelector('.mfx-fl'); ckEl = stg.querySelector('.mfx-ck');
    mem.classList.add('mfx-run'); size(); buildDots();
    aud = pre || new Audio(SRC); pre = null; aud.preload = 'auto'; startAt = performance.now();
    aud.addEventListener('ended', function () { ended = true; });
    var pr = aud.play(); if (pr && pr.catch) pr.catch(function () { useV = true; vclock = performance.now(); });
  }
  function tryStart() {
    var tries = 0;
    (function w() {
      if (!mem.classList.contains('on') || running) return;
      if (nImg() >= 1) { try { begin(); } catch (e) { cleanup(); } return; }
      if (++tries < 60) setTimeout(w, 150);
    })();
  }
  function frame(ts) {
    raf = requestAnimationFrame(frame);
    if (!mem.classList.contains('on') || !cv.clientWidth) return;
    if (ts - last < 30) return;
    var dt = Math.min(0.08, (ts - last) / 1000); last = ts;
    if (cv.width !== Math.round(cv.clientWidth * D)) size();
    try { if (mode === 'show') showStep(dt); else if (mode === 'fin') finStep(dt); } catch (e) { finish(); }
  }
  function init() {
    mem = $('mem'); if (!mem || mem.querySelector('.mfx-cv')) return;
    css();
    cv = document.createElement('canvas'); cv.className = 'mfx-cv'; mem.insertBefore(cv, mem.firstChild);
    ctx = cv.getContext('2d'); size(); window.addEventListener('resize', size);
    mkSprites(); mkAmb(); setTimeout(warm, 2500);
    var bl = $('blow'); if (bl) bl.addEventListener('click', warm);
    var tm = $('toMem');
    if (tm) tm.addEventListener('click', function (e) {
      try {
        warm(); if (running || nImg() < 1) return;
        e.stopImmediatePropagation();
        document.querySelectorAll('.screen').forEach(function (s) { s.classList.remove('on'); });
        mem.style.transition = 'opacity .2s'; mem.classList.add('on'); setTimeout(function () { mem.style.transition = ''; }, 500);
        initMem(); begin();
      } catch (er) {}
    }, true);
    new MutationObserver(function () {
      var on = mem.classList.contains('on');
      if (on && !entered) { entered = true; tryStart(); } else if (!on && entered) { setTimeout(function () { if (!mem.classList.contains('on') && entered) { entered = false; try { if (aud) aud.pause(); } catch (e) {} cleanup(); } }, 700); }
    }).observe(mem, { attributes: true, attributeFilter: ['class'] });
    raf = requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
