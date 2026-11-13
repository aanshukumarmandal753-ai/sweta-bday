/* Sweta memories: one animated screen synced to the song, then the old tune returns. Needs vox.mp3 */
(function () {
  'use strict';
  var SRC = 'vox.mp3', DUR = 42.89, BS = [9.29, 20.51, 34.0];
  var ACC = ['#ffd27a', '#ff7eb6', '#b79cff', '#7fd0ff'];
  var ONS = [0.3,0.68,1.25,1.8,2.2,2.54,3.66,3.99,4.33,4.68,5,5.31,5.62,6.38,6.93,7.24,7.63,7.95,8.44,8.74,9.53,9.87,10.24,10.83,11.2,11.64,12.04,12.41,12.71,13.11,13.55,13.9,14.62,15.01,15.38,15.77,16.32,16.71,17.61,18.02,18.37,18.68,19.12,19.5,19.87,20.64,21,21.35,21.72,22.17,22.71,23.04,23.58,24.15,24.59,24.91,25.47,25.85,26.19,26.62,26.94,27.36,27.73,28.1,28.48,28.86,29.3,29.64,30.04,30.36,31.11,31.48,31.93,32.61,32.94,33.37,34.3,34.67,35.08,35.42,35.74,36.11,36.52,37.12,37.51,37.9,38.55,39.05,39.37,40.06,40.54,40.87,41.2,41.55,41.97,42.53];
  var ENV = '00256655777547887568621268888888766677774115863378888778875211111026888668887888887568988888888886368767888778888876542111101345652016874478522257767776664112676545777666666568775311111136888888635899986468877888888888657767878777657854796368877877888878885258999877996479888888888875222111148987986786578558852378899878888877898888888888888765421111158726974479888778887788864379999888985588888888888764211111127987887786687468742688888889988877899888888888988776421111478788887766776468633787776798667887524787777555337877876788657876666788887458865798888788788889853687799779988988877789878756973368799779878864222221169999987788889888877875322111267424688862258988876764212110258745886776566668743579888888689888874799999987667764222211158978852578876766667876422112578525762158888877888765312212588635884268877667887776778888888888766666777666545533432';
  var LY = [
    ['Aaj ka din sirf tumhara hai',[0.3,0.68,1.25,1.8,2.2,2.54]],
    ['Chaand bhi tumhe dekh kar sharmaye',[3.66,3.99,4.33,4.68,5,5.31]],
    ['Har khushi tumhare naam likhi hai',[6.38,6.93,7.24,7.63,7.95,8.44]],
    ['Tum hasti raho to saari duniya muskurati hai',[9.53,9.87,10.83,11.2,12.04,12.41,13.11,13.55]],
    ['Meri Sita meri Radha tum ho',[14.62,15.01,15.38,15.77,16.32,16.71]],
    ['Meri Parvati meri jaan bhi tum',[17.61,18.02,18.37,18.68,19.12,19.5]],
    ['Mahadev tumhe de duniya ki khushi',[20.64,21,21.35,21.72,22.17,22.71]],
    ['Aankhon mein kabhi aansu na aaye',[23.58,24.15,24.59,24.91,25.47,25.85]],
    ['Pagalu bubu tum bas khush raho',[26.62,26.94,27.36,27.73,28.1,28.48]],
    ['Main hoon na saath',[29.3,29.64,30.04,30.36]],
    ['Hamesha tumhare saath',[31.11,31.48,31.93]],
    ['Bubu panda tumhara',[32.61,32.94,33.37]],
    ['Tumhe dekh ke jalne wale jalte rahenge',[34.3,34.67,35.08,35.42,35.74,36.11,36.52]],
    ['Happy birthday Sweta',[37.12,37.51,37.9]],
    ['Meri cute bubu',[38.55,39.05,39.37]],
    ['Love you birthday girl aaj aur hamesha',[40.06,40.54,40.87,41.2,41.55,41.97,42.53]]
  ];
  var $ = function (i) { return document.getElementById(i); };
  function css() {
    if (document.getElementById('mfxCss2')) return;
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=Anton&display=swap';
    document.head.appendChild(l);
    var s = document.createElement('style'); s.id = 'mfxCss2';
    s.textContent =
      '#mem .mfx-cv{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}' +
      '#mem.mfx-run .mfx-cv{z-index:3}' +
      '#mem>*:not(.mfx-cv):not(.mfx-stg){position:relative;z-index:1}' +
      '#mem.mfx-run>*:not(.mfx-stg):not(.mfx-cv){visibility:hidden}' +
      '#mem.mfx-fin #ph,#mem.mfx-fin #cap,#mem.mfx-fin #pd{display:none}' +
      '#mem>.mfx-stg{position:absolute;inset:0;z-index:2;overflow:hidden;background:#000;transition:opacity .7s}' +
      '.mfx-stg .mfx-bg{position:absolute;inset:-10%;background-size:cover;background-position:center;filter:blur(26px) saturate(1.3);opacity:.3;animation:mfxZoom 12s ease-in-out infinite alternate}' +
      '@keyframes mfxZoom{from{scale:1}to{scale:1.18}}' +
      '.mfx-stg .mfx-glow{position:absolute;left:50%;top:0;width:340px;height:340px;margin:-170px 0 0 -170px;border-radius:50%;' +
      'background:radial-gradient(circle,var(--ac),transparent 68%);opacity:.4;pointer-events:none}' +
      '.mfx-stg .mfx-cw{position:absolute;left:0;right:0;top:8%;display:flex;justify-content:center}' +
      '.mfx-card{width:min(54vw,220px);aspect-ratio:5/6;border-radius:20px;background-size:cover;background-position:center;' +
      'border:2px solid rgba(255,215,106,.75);box-shadow:0 0 44px var(--ac),0 0 90px rgba(255,255,255,.12);position:absolute}' +
      '.mfx-card.in0{animation:mfxIn0 .9s cubic-bezier(.2,1.3,.4,1) both}.mfx-card.in1{animation:mfxIn1 .9s cubic-bezier(.2,1.3,.4,1) both}' +
      '.mfx-card.in2{animation:mfxIn2 .9s cubic-bezier(.2,1.3,.4,1) both}.mfx-card.in3{animation:mfxIn3 .9s cubic-bezier(.2,1.3,.4,1) both}' +
      '.mfx-card.out{animation:mfxOut .6s ease-in both}' +
      '@keyframes mfxIn0{from{transform:translateY(90px) rotate(-10deg);opacity:0}to{transform:none;opacity:1}}' +
      '@keyframes mfxIn1{from{transform:scale(.3) rotate(12deg);opacity:0}to{transform:none;opacity:1}}' +
      '@keyframes mfxIn2{from{transform:perspective(600px) rotateY(90deg);opacity:0}to{transform:none;opacity:1}}' +
      '@keyframes mfxIn3{from{transform:translateY(-110px) rotate(8deg);opacity:0}to{transform:none;opacity:1}}' +
      '@keyframes mfxOut{to{transform:scale(1.25);opacity:0}}' +
      '.mfx-stg .mfx-w{position:absolute;left:0;right:0;top:56%;height:0;display:flex;justify-content:center;align-items:center;pointer-events:none}' +
      '.mfx-w b{display:block;font:400 7rem/1 Anton,Impact,"Arial Black",sans-serif;color:rgba(255,255,255,.34);text-transform:uppercase;' +
      'white-space:nowrap;text-shadow:0 0 30px rgba(255,255,255,.25)}' +
      '.mfx-w b.w0{animation:mfxW0 .55s cubic-bezier(.2,1.4,.4,1),mfxFx .9s ease-out}.mfx-w b.w1{animation:mfxW1 .55s cubic-bezier(.2,1.4,.4,1),mfxFx .9s ease-out}' +
      '.mfx-w b.w2{animation:mfxW2 .55s cubic-bezier(.2,1.4,.4,1),mfxFx .9s ease-out}.mfx-w b.w3{animation:mfxW3 .6s ease-out,mfxFx .9s ease-out}' +
      '@keyframes mfxW0{from{transform:scale(1.7);filter:blur(14px);opacity:0}to{transform:none;filter:blur(0);opacity:1}}' +
      '@keyframes mfxW1{from{transform:translateX(-100px) skewX(-25deg);filter:blur(10px);opacity:0}to{transform:none;filter:blur(0);opacity:1}}' +
      '@keyframes mfxW2{from{transform:perspective(500px) rotateX(-90deg);opacity:0}to{transform:none;opacity:1}}' +
      '@keyframes mfxW3{0%{transform:translateY(-90px) scale(.8);opacity:0}60%{transform:translateY(14px);opacity:1}100%{transform:none;opacity:1}}' +
      '@keyframes mfxFx{from{color:#fff;text-shadow:0 0 36px #fff,0 0 80px var(--ac)}to{color:rgba(255,255,255,.34);text-shadow:0 0 30px rgba(255,255,255,.25)}}' +
      '.mfx-stg .mfx-ln{position:absolute;left:6%;right:6%;bottom:17%;text-align:center;font:600 1.15rem/1.5 Poppins,sans-serif}' +
      '.mfx-ln span{display:inline-block;margin:0 .22em;color:rgba(255,255,255,.2);transition:color .3s,text-shadow .3s}' +
      '.mfx-ln span.l{color:#fff;text-shadow:0 0 8px #fff,0 0 20px var(--ac),0 0 34px var(--ac)}' +
      '.mfx-stg .mfx-fl{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none}' +
      '.mfx-fl.go{animation:mfxFl .55s ease-out}@keyframes mfxFl{from{opacity:.55}to{opacity:0}}';
    document.head.appendChild(s);
  }
  function css2() {
    if (document.getElementById('mfxCss3')) return;
    var s = document.createElement('style'); s.id = 'mfxCss3';
    s.textContent =
      '#mem.mfx-fin h2{text-shadow:0 0 12px #ffd27a,0 0 28px #ff7eb6}' +
      '.mfx-grid{display:grid;grid-template-columns:repeat(2,min(41vw,165px));gap:14px 16px;justify-content:center;margin:4px 0}' +
      '.mfx-tile{position:relative;aspect-ratio:4/5;border-radius:16px;overflow:hidden;border:2px solid rgba(255,215,106,.75);' +
      'box-shadow:0 0 26px rgba(255,126,182,.5);rotate:var(--r);will-change:translate;' +
      'animation:mfxTi .9s cubic-bezier(.2,1.4,.4,1) both var(--d),mfxFlt 3.6s ease-in-out infinite var(--d)}' +
      '@keyframes mfxTi{from{scale:.2;opacity:0}to{scale:1;opacity:1}}' +
      '@keyframes mfxFlt{0%,100%{translate:0 0}50%{translate:0 -7px}}' +
      '.mfx-tile i{position:absolute;inset:0;background-size:cover;background-position:center}' +
      '.mfx-tile p{position:absolute;left:0;right:0;bottom:0;margin:0;padding:18px 6px 6px;font:600 .62rem/1.3 Poppins,sans-serif;color:#fff;' +
      'background:linear-gradient(transparent,rgba(0,0,0,.7));text-shadow:0 0 8px rgba(255,126,182,.9)}';
    document.head.appendChild(s);
  }
  var mem, cv, ctx, W = 0, H = 0, raf = 0, last = 0, mode = '', running = false, entered = false;
  var aud = null, bgWas = false, vclock = null, useV = false, startAt = 0, ended = false;
  var stg, bgEl, glowEl, cwEl, wEl, lnEl, flEl, cardEl, oi = 0, ph = -1, li = -1, wj = 0, es = 0, wc = 0;
  var P = [], R = [], SP = [], O = [];
  var COLS = ['255,126,182', '183,156,255', '127,208,255', '255,210,122'];
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
  function fitWord() {
    var b = wEl.firstChild; b.style.scale = '1';
    var w = b.offsetWidth || 1, s = Math.min(1.5, 0.92 * W / w);
    b.style.scale = s + ' ' + (s * 1.1);
  }
  function showBig(w) {
    var b = wEl.firstChild; b.textContent = w.toUpperCase(); b.className = '';
    void b.offsetWidth; b.className = 'w' + (wc++ % 4); fitWord();
  }
  function accent(p) { return ACC[p % 4]; }
  function cy() { return H * 0.08 + Math.min(W * 0.54, 220) * 0.6; }
  function burst(n, col) {
    for (var i = 0; i < n && P.length < 80; i++) {
      var a = Math.random() * 6.283, sp = 60 + Math.random() * 120;
      P.push({ x: W / 2 + Math.cos(a) * 90, y: cy() + Math.sin(a) * 110, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 30, l: 0, m: 1 + Math.random() * 0.8,
        c: Math.random() < 0.5 ? col : '#fff', ch: Math.random() < 0.5 ? '♥' : '✦', s: 10 + Math.random() * 12 });
    }
  }
  function setPhase(p) {
    ph = p;
    var col = accent(p);
    stg.style.setProperty('--ac', col);
    var url = 'url("' + imgAt(p) + '")';
    bgEl.style.backgroundImage = url;
    var old = cardEl;
    if (old) { old.className = 'mfx-card out'; setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); }, 650); }
    cardEl = document.createElement('div'); cardEl.className = 'mfx-card in' + (p % 4); cardEl.style.backgroundImage = url;
    cwEl.appendChild(cardEl);
    flEl.classList.remove('go'); void flEl.offsetWidth; flEl.classList.add('go');
    R.push({ r: 60, a: 0.9, c: col }); burst(22, col);
  }
  function bokeh(a) {
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < O.length; i++) {
      var o = O[i]; o.y -= o.v / H; if (o.y < -0.2) { o.y = 1.2; o.x = Math.random(); }
      var x = (o.x + Math.sin(last / 1000 * o.s + o.p) * 0.05) * W, y = o.y * H;
      ctx.globalAlpha = a; ctx.drawImage(SP[o.c], x - o.r, y - o.r, o.r * 2, o.r * 2);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }
  function parts(dt) {
    for (var i = P.length - 1; i >= 0; i--) {
      var p = P[i]; p.l += dt; if (p.l > p.m) { P.splice(i, 1); continue; }
      p.vy += 40 * dt; p.x += p.vx * dt; p.y += p.vy * dt;
      ctx.globalAlpha = 1 - p.l / p.m; ctx.fillStyle = p.c; ctx.font = p.s + 'px serif'; ctx.fillText(p.ch, p.x, p.y);
    }
    ctx.globalAlpha = 1;
  }
  function showStep(dt) {
    var t = T();
    if (ended || t >= DUR + 0.2) { finish(); return; }
    var e0 = (ENV.charCodeAt(Math.floor(t * 20)) - 48) / 9 || 0; es += (e0 - es) * 0.35;
    var p = t < BS[0] ? 0 : t < BS[1] ? 1 : t < BS[2] ? 2 : 3;
    if (p !== ph) setPhase(p);
    while (oi < ONS.length && t >= ONS[oi]) { if (es > 0.45) { R.push({ r: 80, a: 0.7, c: accent(ph) }); burst(5, accent(ph)); } oi++; }
    var q = -1;
    for (var m = 0; m < LY.length; m++) { if (LY[m][1][0] - 0.1 <= t) q = m; }
    if (q !== li && q >= 0) {
      li = q; wj = 0;
      lnEl.innerHTML = LY[q][0].split(' ').map(function (w) { return '<span>' + w + '</span>'; }).join(' ');
    }
    if (li >= 0) {
      var ts = LY[li][1];
      while (wj < ts.length && t >= ts[wj]) { showBig(LY[li][0].split(' ')[wj]); lnEl.children[wj].className = 'l'; wj++; }
    }
    if (cardEl) cardEl.style.scale = 1 + es * 0.045;
    glowEl.style.top = cy() + 'px'; glowEl.style.opacity = 0.3 + es * 0.6; glowEl.style.scale = 1 + es * 0.3;
    ctx.clearRect(0, 0, W, H); bokeh(0.5);
    for (var i = R.length - 1; i >= 0; i--) {
      var r = R[i]; r.r += 280 * dt; r.a -= 0.95 * dt; if (r.a <= 0) { R.splice(i, 1); continue; }
      ctx.globalAlpha = r.a; ctx.strokeStyle = r.c; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(W / 2, cy(), r.r, 0, 6.283); ctx.stroke();
    }
    ctx.globalAlpha = 0.85; ctx.fillStyle = accent(ph); var base = Math.floor(t * 20);
    for (var b = 0; b < 26; b++) {
      var v = (ENV.charCodeAt(base - 13 + b) - 48) / 9 || 0, hh = 5 + v * 58;
      ctx.fillRect(W / 2 + (b - 13) * 11, H - 26 - hh, 6, hh);
    }
    ctx.globalAlpha = 1; parts(dt);
  }
  function finStep(dt) {
    ctx.clearRect(0, 0, W, H); bokeh(0.7);
    if (Math.random() < 0.08 && P.length < 40) {
      var c = ACC[Math.floor(Math.random() * 4)];
      P.push({ x: Math.random() * W, y: H + 10, vx: (Math.random() - 0.5) * 30, vy: -60 - Math.random() * 60, l: 0, m: 3 + Math.random() * 2, c: c, ch: Math.random() < 0.6 ? '♥' : '✦', s: 12 + Math.random() * 14 });
    }
    for (var i = P.length - 1; i >= 0; i--) {
      var p = P[i]; p.l += dt; if (p.l > p.m) { P.splice(i, 1); continue; }
      p.x += p.vx * dt + Math.sin(p.l * 2 + i) * 0.4; p.y += p.vy * dt;
      ctx.globalAlpha = Math.min(1, (p.m - p.l)) * 0.7; ctx.fillStyle = p.c; ctx.font = p.s + 'px serif'; ctx.fillText(p.ch, p.x, p.y);
    }
    ctx.globalAlpha = 1;
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
    var n = Math.min(4, nImg()), h = '';
    for (var i = 0; i < n; i++) {
      h += '<div class="mfx-tile" style="--r:' + (i % 2 ? 3 : -3) + 'deg;--d:' + (i * 0.25) + 's"><i style="background-image:url(\'' + imgAt(i) + '\')"></i><p>' + cap(i) + '</p></div>';
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
    mem.classList.remove('mfx-run', 'mfx-fin'); stg = null; cardEl = null;
  }
  function begin() {
    running = true; mode = 'show'; ended = false; useV = false; oi = 0; ph = -1; li = -1; wj = 0; wc = 0; es = 0; P = []; R = [];
    try { bgWas = !au.paused; au.pause(); } catch (e) { bgWas = false; }
    stg = document.createElement('div'); stg.className = 'mfx-stg';
    stg.innerHTML = '<div class="mfx-bg"></div><div class="mfx-glow"></div><div class="mfx-cw"></div><div class="mfx-w"><b></b></div><div class="mfx-ln"></div><div class="mfx-fl"></div>';
    mem.insertBefore(stg, mem.firstChild);
    bgEl = stg.querySelector('.mfx-bg'); glowEl = stg.querySelector('.mfx-glow'); cwEl = stg.querySelector('.mfx-cw');
    wEl = stg.querySelector('.mfx-w'); lnEl = stg.querySelector('.mfx-ln'); flEl = stg.querySelector('.mfx-fl'); cardEl = null;
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
    var dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts;
    if (cv.width !== cv.clientWidth) size();
    try { if (mode === 'show') showStep(dt); else if (mode === 'fin') finStep(dt); } catch (e) { finish(); }
  }
  function init() {
    mem = $('mem'); if (!mem || mem.querySelector('.mfx-cv')) return;
    css();
    cv = document.createElement('canvas'); cv.className = 'mfx-cv'; mem.insertBefore(cv, mem.firstChild);
    ctx = cv.getContext('2d'); size(); window.addEventListener('resize', size);
    for (var i = 0; i < 4; i++) {
      var c = document.createElement('canvas'); c.width = c.height = 96; var x = c.getContext('2d');
      var g = x.createRadialGradient(48, 48, 0, 48, 48, 48);
      g.addColorStop(0, 'rgba(' + COLS[i] + ',.35)'); g.addColorStop(1, 'rgba(' + COLS[i] + ',0)');
      x.fillStyle = g; x.fillRect(0, 0, 96, 96); SP.push(c);
    }
    for (i = 0; i < 8; i++) O.push({ x: Math.random(), y: Math.random(), r: 40 + Math.random() * 60, c: i % 4, v: 12 + Math.random() * 18, s: 0.3 + Math.random() * 0.4, p: Math.random() * 6 });
    new MutationObserver(function () {
      var on = mem.classList.contains('on');
      if (on && !entered) { entered = true; tryStart(); } else if (!on && entered) { entered = false; try { if (aud) aud.pause(); } catch (e) {} setTimeout(function () { if (!mem.classList.contains('on')) cleanup(); }, 1000); }
    }).observe(mem, { attributes: true, attributeFilter: ['class'] });
    raf = requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
