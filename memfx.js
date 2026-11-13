/* Sweta memories: one animated screen synced to the song, then the old tune returns. Needs vox.mp3 */
(function () {
  'use strict';
  var SRC = 'vox.mp3', DUR = 42.89, BS = [9.29, 20.51, 34.0];
  var ACC = ['#ffd27a', '#ff7eb6', '#b79cff', '#7fd0ff'];
  var ONS = [0.3,0.68,1.25,1.8,2.2,2.54,3.66,3.99,4.33,4.68,5,5.31,5.62,6.38,6.93,7.24,7.63,7.95,8.44,8.74,9.53,9.87,10.24,10.83,11.2,11.64,12.04,12.41,12.71,13.11,13.55,13.9,14.62,15.01,15.38,15.77,16.32,16.71,17.61,18.02,18.37,18.68,19.12,19.5,19.87,20.64,21,21.35,21.72,22.17,22.71,23.04,23.58,24.15,24.59,24.91,25.47,25.85,26.19,26.62,26.94,27.36,27.73,28.1,28.48,28.86,29.3,29.64,30.04,30.36,31.11,31.48,31.93,32.61,32.94,33.37,34.3,34.67,35.08,35.42,35.74,36.11,36.52,37.12,37.51,37.9,38.55,39.05,39.37,40.06,40.54,40.87,41.2,41.55,41.97,42.53];
  var ENV = '00256655777547887568621268888888766677774115863378888778875211111026888668887888887568988888888886368767888778888876542111101345652016874478522257767776664112676545777666666568775311111136888888635899986468877888888888657767878777657854796368877877888878885258999877996479888888888875222111148987986786578558852378899878888877898888888888888765421111158726974479888778887788864379999888985588888888888764211111127987887786687468742688888889988877899888888888988776421111478788887766776468633787776798667887524787777555337877876788657876666788887458865798888788788889853687799779988988877789878756973368799779878864222221169999987788889888877875322111267424688862258988876764212110258745886776566668743579888888689888874799999987667764222211158978852578876766667876422112578525762158888877888765312212588635884268877667887776778888888888766666777666545533432';
  var $ = function (i) { return document.getElementById(i); };
  function css() {
    if (document.getElementById('mfxCss2')) return;
    var s = document.createElement('style'); s.id = 'mfxCss2';
    s.textContent =
      '#mem .mfx-cv{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}' +
      '#mem.mfx-run .mfx-cv{z-index:3}' +
      '#mem>*:not(.mfx-cv):not(.mfx-stg):not(.mfx-fbg){position:relative;z-index:1}' +
      '#mem.mfx-run>*:not(.mfx-stg):not(.mfx-cv):not(.mfx-fbg){visibility:hidden}' +
      '#mem.mfx-fin #ph,#mem.mfx-fin #cap,#mem.mfx-fin #pd{display:none}' +
      '#mem>.mfx-stg{position:absolute;inset:0;z-index:2;overflow:hidden;background:radial-gradient(ellipse at 50% 30%,#2b0a30,#0c0416 62%,#000);transition:opacity .7s}' +
      '.mfx-stg .mfx-bg{position:absolute;inset:-10%;background-size:cover;background-position:center;filter:blur(30px) saturate(1.4);opacity:.2;animation:mfxZoom 12s ease-in-out infinite alternate}' +
      '@keyframes mfxZoom{from{scale:1}to{scale:1.18}}' +
      '.mfx-au{position:absolute;width:110vmax;height:110vmax;border-radius:50%;pointer-events:none;will-change:translate;animation:mfxAu 15s ease-in-out infinite alternate}' +
      '.mfx-au.a1{left:-60vmax;top:-55vmax;background:radial-gradient(circle,rgba(255,90,170,.34),transparent 62%)}' +
      '.mfx-au.a2{right:-60vmax;bottom:-50vmax;background:radial-gradient(circle,rgba(150,100,255,.34),transparent 62%);animation-delay:-5s}' +
      '.mfx-au.a3{left:-30vmax;bottom:-30vmax;background:radial-gradient(circle,rgba(80,160,255,.22),transparent 62%);animation-delay:-9s}' +
      '@keyframes mfxAu{from{translate:0 0;scale:1}to{translate:14vw 9vh;scale:1.2}}' +
      '.mfx-rays{position:absolute;left:-50%;top:-30%;width:200%;height:160%;pointer-events:none;will-change:transform;' +
      'background:repeating-conic-gradient(from 0deg at 50% 38%,rgba(255,170,215,.13) 0 7deg,transparent 7deg 22deg);' +
      '-webkit-mask-image:radial-gradient(circle at 50% 38%,#000,transparent 62%);mask-image:radial-gradient(circle at 50% 38%,#000,transparent 62%);animation:mfxSpin 70s linear infinite}' +
      '@keyframes mfxSpin{to{transform:rotate(360deg)}}' +
      '.mfx-stg .mfx-glow{position:absolute;left:50%;top:0;width:360px;height:360px;margin:-180px 0 0 -180px;border-radius:50%;' +
      'background:radial-gradient(circle,var(--ac),transparent 68%);opacity:.4;pointer-events:none}' +
      '.mfx-stg .mfx-cw{position:absolute;left:0;right:0;top:8%;display:flex;justify-content:center}' +
      '.mfx-card{position:absolute;width:min(58vw,230px);aspect-ratio:5/6;padding:3px;box-sizing:border-box;' +
      'background:linear-gradient(135deg,#ffe9b0,#ff7eb6,#b79cff,#7fd0ff,#ffe9b0);box-shadow:0 0 36px var(--ac),0 0 84px rgba(255,126,182,.25)}' +
      '.mfx-card{border-radius:28px}' +
      '.mfx-ph{position:relative;width:100%;height:100%;border-radius:inherit;overflow:hidden}' +
      '.mfx-ph i{position:absolute;inset:0;background-size:cover;background-position:center;animation:mfxKB 8s ease-in-out infinite alternate}' +
      '@keyframes mfxKB{from{scale:1.02;translate:-2% 0}to{scale:1.16;translate:2% -2%}}' +
      '.mfx-ph:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,transparent 55%,rgba(30,0,40,.45));pointer-events:none}' +
      '.mfx-ph:before{content:"";position:absolute;top:0;bottom:0;left:0;width:45%;z-index:2;pointer-events:none;translate:-160% 0;' +
      'background:linear-gradient(100deg,transparent,rgba(255,255,255,.3),transparent);animation:mfxSh 4.5s ease-in-out infinite}' +
      '@keyframes mfxSh{0%{translate:-160% 0}55%,100%{translate:380% 0}}' +
      '.mfx-card.in0{animation:mfxIn0 .9s cubic-bezier(.2,1.3,.4,1) both}.mfx-card.in1{animation:mfxIn1 .9s cubic-bezier(.2,1.3,.4,1) both}' +
      '.mfx-card.in2{animation:mfxIn2 .9s cubic-bezier(.2,1.3,.4,1) both}.mfx-card.in3{animation:mfxIn3 .9s cubic-bezier(.2,1.3,.4,1) both}' +
      '.mfx-card.out{animation:mfxOut .6s ease-in both}' +
      '@keyframes mfxIn0{from{transform:translateY(90px) rotate(-10deg);opacity:0}to{transform:none;opacity:1}}' +
      '@keyframes mfxIn1{from{transform:scale(.3) rotate(12deg);opacity:0}to{transform:none;opacity:1}}' +
      '@keyframes mfxIn2{from{transform:perspective(600px) rotateY(90deg);opacity:0}to{transform:none;opacity:1}}' +
      '@keyframes mfxIn3{from{transform:translateY(-110px) rotate(8deg);opacity:0}to{transform:none;opacity:1}}' +
      '@keyframes mfxOut{to{transform:scale(1.25);opacity:0}}' +
      '.mfx-stg .mfx-ln{position:absolute;left:6%;right:6%;bottom:17%;text-align:center;font:600 1.2rem/1.5 Poppins,sans-serif}' +
      '.mfx-ln span{display:inline-block;margin:0 .22em;color:rgba(255,255,255,.22);transition:color .3s,text-shadow .3s,translate .3s}' +
      '.mfx-ln span.l{color:#fff;translate:0 -2px;text-shadow:0 0 8px #fff,0 0 20px var(--ac),0 0 36px var(--ac)}' +
      '.mfx-stg .mfx-fl{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}' +
      '.mfx-fl.go{animation:mfxFl .55s ease-out}@keyframes mfxFl{from{opacity:.5}to{opacity:0}}';
    document.head.appendChild(s);
  }
  function css2() {
    if (document.getElementById('mfxCss3')) return;
    var s = document.createElement('style'); s.id = 'mfxCss3';
    s.textContent =
      '#mem.mfx-fin h2{text-shadow:0 0 12px #ffd27a,0 0 28px #ff7eb6}' +
      '#mem .mfx-fbg{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;background:radial-gradient(ellipse at 50% 30%,#2b0a30,#0c0416 62%,#000)}' +
      '.mfx-grid{display:grid;grid-template-columns:repeat(2,min(41vw,165px));gap:14px 16px;justify-content:center;margin:4px 0}' +
      '.mfx-tile{position:relative;aspect-ratio:4/5;padding:3px;box-sizing:border-box;rotate:var(--r);will-change:translate;' +
      'background:linear-gradient(135deg,#ffe9b0,#ff7eb6,#b79cff,#7fd0ff,#ffe9b0);box-shadow:0 0 26px rgba(255,126,182,.55);' +
      'animation:mfxTi .9s cubic-bezier(.2,1.4,.4,1) both var(--d),mfxFlt 3.6s ease-in-out infinite var(--d)}' +
      '.mfx-tile{border-radius:30px}' +
      '@keyframes mfxTi{from{scale:.2;opacity:0}to{scale:1;opacity:1}}' +
      '@keyframes mfxFlt{0%,100%{translate:0 0}50%{translate:0 -7px}}' +
      '.mfx-tile .mfx-ph i{animation-delay:var(--d)}' +
      '.mfx-tile p{position:absolute;left:0;right:0;bottom:0;margin:0;padding:18px 6px 8px;z-index:3;font:600 .62rem/1.3 Poppins,sans-serif;color:#fff;' +
      'background:linear-gradient(transparent,rgba(0,0,0,.72));text-shadow:0 0 8px rgba(255,126,182,.9)}';
    document.head.appendChild(s);
  }
  var mem, cv, ctx, W = 0, H = 0, raf = 0, last = 0, mode = '', running = false, entered = false;
  var aud = null, bgWas = false, vclock = null, useV = false, startAt = 0, ended = false;
  var stg, bgEl, glowEl, cwEl, wEl, lnEl, flEl, cardEl, toks = [], wi = 0, oi = 0, ph = -1, ps = 0, pe = DUR, lit = -1, es = 0, wc = 0;
  var P = [], R = [], A = [], BK = [], SPR = {}, nextShoot = 4, shoot = null, lastDraw = 0;
  function size() { W = cv.clientWidth || window.innerWidth; H = cv.clientHeight || window.innerHeight; cv.width = W; cv.height = H; }
  function T() {
    if (useV) return (performance.now() - vclock) / 1000;
    var t = aud ? aud.currentTime : 0;
    if (t === 0 && performance.now() - startAt > 3000) { useV = true; vclock = performance.now() - 3000; }
    return t;
  }
  function cap(i) { try { return CFG.photos[i].cap || ''; } catch (e) { return ''; } }
  function nImg() { try { return imgs.length; } catch (e) { return 0; } }
  function imgAt(i) { try { return imgs[i % imgs.length]; } catch (e) { return ''; } }
  function showBig(w) {}
  function accent(p) { return ACC[p % 4]; }
  function cwd() { return Math.min(W * 0.58, 230); }
  function cy() { return H * 0.08 + cwd() * 0.6; }
  function spr(w, draw) { var c = document.createElement('canvas'); c.width = c.height = w; draw(c.getContext('2d'), w); return c; }
  function mkSprites() {
    SPR.h = ['#ff5fa2', '#ff8fc0', '#c79bff', '#ff4d6d'].map(function (col) {
      return spr(64, function (x) {
        var g = x.createRadialGradient(26, 24, 2, 32, 32, 34); g.addColorStop(0, '#fff'); g.addColorStop(0.35, col); g.addColorStop(1, col);
        x.shadowColor = col; x.shadowBlur = 8; x.fillStyle = g; x.beginPath(); x.moveTo(32, 56);
        x.bezierCurveTo(-4, 32, 10, 6, 32, 22); x.bezierCurveTo(54, 6, 68, 32, 32, 56); x.fill();
      });
    });
    SPR.p = ['#ffc2dc', '#ff9ac4'].map(function (col) {
      return spr(48, function (x) {
        var g = x.createLinearGradient(8, 8, 40, 40); g.addColorStop(0, '#fff'); g.addColorStop(1, col);
        x.fillStyle = g; x.beginPath(); x.moveTo(24, 4); x.bezierCurveTo(46, 14, 44, 36, 24, 44); x.bezierCurveTo(4, 36, 2, 14, 24, 4); x.fill();
      });
    });
    SPR.b = ['#ff7eb6', '#b79cff', '#ffd27a', '#7fd0ff'].map(function (col) {
      return spr(96, function (x) {
        var g = x.createRadialGradient(48, 48, 4, 48, 48, 46); g.addColorStop(0, col); g.addColorStop(0.7, col); g.addColorStop(1, 'rgba(0,0,0,0)');
        x.globalAlpha = 0.9; x.fillStyle = g; x.beginPath(); x.arc(48, 48, 46, 0, 6.283); x.fill();
      });
    });
    SPR.s = spr(48, function (x) {
      x.shadowColor = '#fff2b0'; x.shadowBlur = 10; x.fillStyle = '#fffbe0'; x.beginPath(); x.moveTo(24, 3);
      x.quadraticCurveTo(26, 22, 45, 24); x.quadraticCurveTo(26, 26, 24, 45); x.quadraticCurveTo(22, 26, 3, 24); x.quadraticCurveTo(22, 22, 24, 3); x.fill();
    });
  }
  function mkAmb() {
    var i; A = [];
    for (i = 0; i < 14; i++) A.push({ t: 0, c: i % 4, x: Math.random(), y: Math.random(), v: 18 + Math.random() * 38, sz: 12 + Math.random() * 26, a: 0.3 + Math.random() * 0.4, ph: Math.random() * 6 });
    for (i = 0; i < 12; i++) A.push({ t: 1, c: i % 2, x: Math.random(), y: Math.random(), v: 22 + Math.random() * 26, sz: 10 + Math.random() * 12, a: 0.55, ph: Math.random() * 6, r: Math.random() * 6, vr: 0.6 + Math.random() * 1.4 });
    BK = []; for (i = 0; i < 9; i++) BK.push({ c: i % 4, x: Math.random(), y: Math.random(), v: 6 + Math.random() * 12, sz: 70 + Math.random() * 90, ph: Math.random() * 6 });
    for (i = 0; i < 40; i++) A.push({ t: 2, x: Math.random(), y: Math.random(), ph: Math.random() * 6, sz: 0.8 + Math.random() * 1.3 });
  }
  function amb(dt, t) {
    for (var i = 0; i < A.length; i++) {
      var o = A[i];
      if (o.t === 2) { ctx.fillStyle = 'rgba(255,240,215,' + (0.15 + 0.7 * Math.abs(Math.sin(t * 1.3 + o.ph))) + ')'; ctx.fillRect(o.x * W, o.y * H, o.sz, o.sz); continue; }
      if (o.t === 0) { o.y -= o.v * dt / H; if (o.y < -0.06) { o.y = 1.06; o.x = Math.random(); } }
      else { o.y += o.v * dt / H; o.r += o.vr * dt; if (o.y > 1.05) { o.y = -0.05; o.x = Math.random(); } }
      var x = o.x * W + Math.sin(t * 0.8 + o.ph) * 16, y = o.y * H;
      ctx.globalAlpha = o.a;
      if (o.t === 0) ctx.drawImage(SPR.h[o.c], x - o.sz / 2, y - o.sz / 2, o.sz, o.sz);
      else { ctx.save(); ctx.translate(x, y); ctx.rotate(o.r); ctx.drawImage(SPR.p[o.c], -o.sz / 2, -o.sz / 2, o.sz, o.sz * 1.3); ctx.restore(); }
    }
    ctx.globalAlpha = 1;
  }
  function bokeh(dt, t, k) {
    for (var i = 0; i < BK.length; i++) {
      var o = BK[i]; o.y -= o.v * dt / H; if (o.y < -0.15) { o.y = 1.15; o.x = Math.random(); }
      var sz = o.sz * (1 + es * 0.18);
      ctx.globalAlpha = (0.07 + 0.09 * es + 0.03 * Math.sin(t + o.ph)) * k;
      ctx.drawImage(SPR.b[o.c], o.x * W + Math.sin(t * 0.4 + o.ph) * 24 - sz / 2, o.y * H - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1;
  }
  function ribbons(t, col) {
    ctx.strokeStyle = col; ctx.lineCap = 'round';
    for (var r = 0; r < 3; r++) {
      for (var w = 0; w < 2; w++) {
        ctx.globalAlpha = w ? 0.4 : 0.09; ctx.lineWidth = w ? 2.5 : 13; ctx.beginPath();
        for (var x = 0; x <= W; x += 14) {
          var y = H * 0.665 + r * 11 + Math.sin(x * 0.013 + t * (1 + r * 0.45) + r * 2) * (10 + es * 24);
          if (x) ctx.lineTo(x, y); else ctx.moveTo(x, y);
        }
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }
  function fw(x, y, col) {
    for (var i = 0; i < 24; i++) {
      var a = i * 0.2618 + Math.random() * 0.1, sp = 90 + Math.random() * 110;
      P.push({ x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, l: 0, m: 1 + Math.random() * 0.6, im: i % 3 ? SPR.s : SPR.h[Math.floor(Math.random() * 4)], sz: 9 + Math.random() * 9 });
    }
  }
  function burst(n, col) {
    for (var i = 0; i < n && P.length < 70; i++) {
      var a = Math.random() * 6.283, sp = 60 + Math.random() * 120, k = Math.random() < 0.6;
      P.push({ x: W / 2 + Math.cos(a) * cwd() * 0.55, y: cy() + Math.sin(a) * cwd() * 0.65, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 30, l: 0, m: 1 + Math.random() * 0.8,
        im: k ? SPR.h[Math.floor(Math.random() * 4)] : SPR.s, sz: 10 + Math.random() * 14 });
    }
  }
  function parts(dt) {
    for (var i = P.length - 1; i >= 0; i--) {
      var p = P[i]; p.l += dt; if (p.l > p.m) { P.splice(i, 1); continue; }
      p.vy += 40 * dt; p.x += p.vx * dt; p.y += p.vy * dt;
      ctx.globalAlpha = 1 - p.l / p.m; ctx.drawImage(p.im, p.x - p.sz / 2, p.y - p.sz / 2, p.sz, p.sz);
    }
    ctx.globalAlpha = 1;
  }
  function setPhase(p) {
    ph = p; ps = p ? BS[p - 1] : 0; pe = p < 3 ? BS[p] : DUR; lit = -1;
    var c = cap(p), col = accent(p);
    stg.style.setProperty('--ac', col);
    var words = c.split(/\s+/).filter(Boolean);
    lnEl.innerHTML = words.map(function (w) { return '<span>' + w + '</span>'; }).join(' ');
    toks = (c.match(/[A-Za-z]+/g) || []).map(function (w) { return w.toUpperCase(); }); wi = 0;
    if (toks.length) showBig(toks[wi++ % toks.length]);
    var url = 'url("' + imgAt(p) + '")';
    bgEl.style.backgroundImage = url;
    var old = cardEl;
    if (old) { old.className = 'mfx-card out'; setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); }, 650); }
    cardEl = document.createElement('div'); cardEl.className = 'mfx-card s' + (p % 4) + ' in' + (p % 4);
    cardEl.innerHTML = '<div class="mfx-ph"><i></i></div>'; cardEl.querySelector('i').style.backgroundImage = url;
    cwEl.appendChild(cardEl);
    flEl.classList.remove('go'); void flEl.offsetWidth; flEl.classList.add('go');
    R.push({ r: 60, a: 0.9, c: col }); burst(22, col);
    fw(W * 0.18, H * 0.2, col); fw(W * 0.82, H * 0.28, col);
  }
  function showStep(dt) {
    var t = T();
    if (ended || t >= DUR + 0.2) { finish(); return; }
    var e0 = (ENV.charCodeAt(Math.floor(t * 20)) - 48) / 9 || 0; es += (e0 - es) * 0.35;
    var p = t < BS[0] ? 0 : t < BS[1] ? 1 : t < BS[2] ? 2 : 3;
    if (p !== ph) setPhase(p);
    while (oi < ONS.length && t >= ONS[oi]) {
      if (toks.length) showBig(toks[wi++ % toks.length]);
      if (es > 0.45) { R.push({ r: 80, a: 0.7, c: accent(ph) }); burst(5, accent(ph)); }
      if (oi % 9 === 8) fw(W * (0.15 + Math.random() * 0.7), H * (0.12 + Math.random() * 0.3), accent(ph));
      oi++;
    }
    var n = Math.ceil(lnEl.children.length * Math.min(1, (t - ps) / ((pe - ps) * 0.72)));
    if (n !== lit) { lit = n; for (var k = 0; k < lnEl.children.length; k++) lnEl.children[k].className = k < n ? 'l' : ''; }
    if (cardEl) cardEl.style.scale = 1 + es * 0.04;
    glowEl.style.top = cy() + 'px'; glowEl.style.opacity = 0.3 + es * 0.6; glowEl.style.scale = 1 + es * 0.3;
    ctx.clearRect(0, 0, W, H); bokeh(dt, t, 1);
    var hs = cwd() * 1.9 * (1 + es * 0.12); ctx.globalAlpha = 0.1 + es * 0.12; ctx.drawImage(SPR.h[ph % 4], W / 2 - hs / 2, cy() - hs * 0.45, hs, hs); ctx.globalAlpha = 1;
    ribbons(t, accent(ph)); amb(dt, t);
    for (var i = R.length - 1; i >= 0; i--) {
      var r = R[i]; r.r += 280 * dt; r.a -= 0.95 * dt; if (r.a <= 0) { R.splice(i, 1); continue; }
      ctx.globalAlpha = r.a; ctx.strokeStyle = r.c; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(W / 2, cy(), r.r, 0, 6.283); ctx.stroke();
    }
    var rx = cwd() * 0.58, ry = cwd() * 0.7;
    for (var s = 0; s < 8; s++) {
      var an = t * 0.9 + s * 0.785, sz = 12 + 8 * Math.abs(Math.sin(t * 3 + s));
      ctx.globalAlpha = 0.9; ctx.drawImage(SPR.s, W / 2 + Math.cos(an) * rx - sz / 2, cy() + Math.sin(an) * ry - sz / 2, sz, sz);
    }
    for (var q = 0; q < 6; q++) {
      var an2 = -t * 0.6 + q * 1.047;
      ctx.globalAlpha = 0.85; ctx.drawImage(SPR.h[q % 4], W / 2 + Math.cos(an2) * cwd() * 0.88 - 8, cy() + Math.sin(an2) * cwd() * 0.98 - 8, 16, 16);
    }
    ctx.globalAlpha = 1;
    if (t >= nextShoot && !shoot) { shoot = { x: W * (0.2 + Math.random() * 0.5), y: -10, l: 0 }; nextShoot = t + 5 + Math.random() * 4; }
    if (shoot) {
      shoot.x += 330 * dt; shoot.y += 250 * dt; shoot.l += dt;
      var g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - 70, shoot.y - 53); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x - 70, shoot.y - 53); ctx.stroke();
      if (shoot.l > 1.3) shoot = null;
    }
    ctx.globalAlpha = 0.8; ctx.fillStyle = accent(ph); var base = Math.floor(t * 20);
    for (var b = 0; b < 26; b++) {
      var v = (ENV.charCodeAt(base - 13 + b) - 48) / 9 || 0, hh = 5 + v * 58;
      ctx.fillRect(W / 2 + (b - 13) * 11, H - 26 - hh, 6, hh);
    }
    ctx.globalAlpha = 1; parts(dt);
  }
  function finStep(dt) {
    var t = last / 1000;
    ctx.clearRect(0, 0, W, H); es = 0; bokeh(dt, t, 1.6); amb(dt, t); parts(dt);
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
    mode = 'fin'; running = false;
    try { if (aud) aud.pause(); } catch (e) {}
    resumeBg();
    var s = stg; if (s) { s.style.opacity = 0; setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 800); }
    mem.classList.remove('mfx-run'); mem.classList.add('mfx-fin');
    css2(); P = []; R = [];
    var fb = document.createElement('div'); fb.className = 'mfx-fbg';
    fb.innerHTML = '<i class="mfx-au a1"></i><i class="mfx-au a2"></i><i class="mfx-au a3"></i><div class="mfx-rays"></div>';
    mem.insertBefore(fb, mem.firstChild);
    var n = Math.min(4, nImg()), h = '';
    for (var i = 0; i < n; i++) {
      h += '<div class="mfx-tile s' + i + '" style="--r:' + (i % 2 ? 3 : -3) + 'deg;--d:' + (i * 0.25) + 's"><div class="mfx-ph"><i style="background-image:url(\'' + imgAt(i) + '\')"></i></div><p>' + cap(i) + '</p></div>';
    }
    var g = document.createElement('div'); g.className = 'mfx-grid'; g.innerHTML = h;
    mem.insertBefore(g, $('nx'));
    try { mi = nImg() - 1; } catch (e) {}
    $('nx').textContent = 'Aage bhi Hai birthday girl 💗♥️';
  }
  function cleanup() {
    try { if (aud) aud.pause(); } catch (e) {}
    if (mode === 'show') resumeBg();
    mode = ''; running = false;
    if (stg && stg.parentNode) stg.parentNode.removeChild(stg);
    var g = mem.querySelector('.mfx-grid'); if (g) g.parentNode.removeChild(g);
    var f = mem.querySelector('.mfx-fbg'); if (f) f.parentNode.removeChild(f);
    mem.classList.remove('mfx-run', 'mfx-fin'); stg = null; cardEl = null;
  }
  function begin() {
    running = true; mode = 'show'; ended = false; useV = false; oi = 0; ph = -1; wc = 0; es = 0; P = []; R = []; shoot = null; nextShoot = 4;
    try { bgWas = !au.paused; au.pause(); } catch (e) { bgWas = false; }
    stg = document.createElement('div'); stg.className = 'mfx-stg';
    stg.innerHTML = '<div class="mfx-bg"></div><i class="mfx-au a1"></i><i class="mfx-au a2"></i><i class="mfx-au a3"></i><div class="mfx-rays"></div><div class="mfx-glow"></div><div class="mfx-cw"></div><div class="mfx-ln"></div><div class="mfx-fl"></div>';
    mem.insertBefore(stg, mem.firstChild);
    bgEl = stg.querySelector('.mfx-bg'); glowEl = stg.querySelector('.mfx-glow'); cwEl = stg.querySelector('.mfx-cw');
    lnEl = stg.querySelector('.mfx-ln'); flEl = stg.querySelector('.mfx-fl'); cardEl = null;
    mem.classList.add('mfx-run'); size();
    aud = new Audio(SRC); aud.preload = 'auto'; startAt = performance.now();
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
    if (cv.width !== cv.clientWidth) size();
    try { if (mode === 'show') showStep(dt); else if (mode === 'fin') finStep(dt); } catch (e) { finish(); }
  }
  function init() {
    mem = $('mem'); if (!mem || mem.querySelector('.mfx-cv')) return;
    css();
    cv = document.createElement('canvas'); cv.className = 'mfx-cv'; mem.insertBefore(cv, mem.firstChild);
    ctx = cv.getContext('2d'); size(); window.addEventListener('resize', size);
    mkSprites(); mkAmb();
    new MutationObserver(function () {
      var on = mem.classList.contains('on');
      if (on && !entered) { entered = true; tryStart(); } else if (!on && entered) { entered = false; try { if (aud) aud.pause(); } catch (e) {} setTimeout(function () { if (!mem.classList.contains('on')) cleanup(); }, 1000); }
    }).observe(mem, { attributes: true, attributeFilter: ['class'] });
    raf = requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
