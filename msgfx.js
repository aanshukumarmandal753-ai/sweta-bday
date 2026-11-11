/* Sweta msg screen: new wish text + panda & bear couple + hearts, balloons, lights. */
(function () {
  'use strict';
  var LINES = [
    'I wish aaj ke baad tumhara har din accha jaye.',
    'Nahi bhi gaya to main bana dunga.',
    'Happy birthday \uD83C\uDF88\uD83C\uDF88 meri cute bubu.',
    'Mahadev tumhe duniya ki saari khushi de.',
    'Tum yaar aage badhti jao aur hasti raho.',
    'Tumhe dekh ke jalne wale jalte reh jayenge \u263A\uFE0F\uD83E\uDD17\uD83D\uDE18',
    'Main tumhare saath hoon, tumhara bubu panda boyfriend husband friend ban ke.'
  ];
  function css() {
    if (document.getElementById('mfxCss')) return;
    var s = document.createElement('style'); s.id = 'mfxCss';
    s.textContent =
      '#msg .mfx-cv{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}' +
      '#msg>*:not(.mfx-cv){position:relative;z-index:1}' +
      '#msg #msgT,#msg .sub,#msg .av{display:none}' +
      '#msg .mfx-scene{width:230px;height:150px;flex:none}' +
      '#msg .mfx-t{max-width:320px;font:600 .98rem/1.55 Poppins,sans-serif;color:#ffe9b0;text-shadow:0 0 12px rgba(255,200,120,.55)}' +
      '#msg .mfx-t p{margin:0 0 7px;opacity:0;translate:0 10px}' +
      '#msg.on .mfx-t p{animation:mfxIn .9s ease forwards}' +
      '#msg .mfx-t p:nth-child(1){animation-delay:.5s}#msg .mfx-t p:nth-child(2){animation-delay:1.6s}' +
      '#msg .mfx-t p:nth-child(3){animation-delay:2.7s;color:#fff;font-size:1.1rem}#msg .mfx-t p:nth-child(4){animation-delay:3.8s}' +
      '#msg .mfx-t p:nth-child(5){animation-delay:4.9s}#msg .mfx-t p:nth-child(6){animation-delay:6s}#msg .mfx-t p:nth-child(7){animation-delay:7.1s}' +
      '@keyframes mfxIn{to{opacity:1;translate:0 0}}' +
      '#msg .mfx-pa{transform-origin:50% 100%;animation:mfxSwL 2.6s ease-in-out infinite;filter:drop-shadow(0 0 7px #7fd0ff)}' +
      '#msg .mfx-be{transform-origin:50% 100%;animation:mfxSwR 2.6s ease-in-out infinite;filter:drop-shadow(0 0 7px #ff7eb6)}' +
      '@keyframes mfxSwL{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(4deg)}}' +
      '@keyframes mfxSwR{0%,100%{transform:rotate(3deg)}50%{transform:rotate(-4deg)}}' +
      '#msg .mfx-h{transform-origin:115px 40px;animation:mfxBeat 1.3s ease-in-out infinite}' +
      '@keyframes mfxBeat{0%,100%{transform:scale(.8)}50%{transform:scale(1.25)}}';
    document.head.appendChild(s);
  }
  function scene() {
    return '<svg class="mfx-scene" viewBox="0 0 230 150">' +
      '<g class="mfx-pa"><circle cx="38" cy="50" r="12" fill="#222"/><circle cx="82" cy="50" r="12" fill="#222"/>' +
      '<ellipse cx="60" cy="122" rx="34" ry="28" fill="#fff"/><circle cx="60" cy="80" r="33" fill="#fff"/>' +
      '<circle cx="48" cy="80" r="3.6" fill="#222"/><circle cx="72" cy="80" r="3.6" fill="#222"/>' +
      '<circle cx="40" cy="90" r="6" fill="#ffb6c8" opacity=".8"/><circle cx="80" cy="90" r="6" fill="#ffb6c8" opacity=".8"/>' +
      '<path d="M54 90q6 6 12 0" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/></g>' +
      '<g class="mfx-be"><circle cx="150" cy="50" r="11" fill="#a0653a"/><circle cx="192" cy="50" r="11" fill="#a0653a"/>' +
      '<ellipse cx="171" cy="122" rx="34" ry="28" fill="#b9753f"/><circle cx="171" cy="80" r="33" fill="#b9753f"/>' +
      '<ellipse cx="171" cy="91" rx="13" ry="10" fill="#e8b98a"/>' +
      '<circle cx="159" cy="78" r="3.6" fill="#222"/><circle cx="183" cy="78" r="3.6" fill="#222"/>' +
      '<circle cx="151" cy="90" r="5.5" fill="#ff9d8a" opacity=".7"/><circle cx="191" cy="90" r="5.5" fill="#ff9d8a" opacity=".7"/>' +
      '<ellipse cx="171" cy="87" rx="4" ry="3" fill="#3b2314"/></g>' +
      '<text class="mfx-h" x="115" y="40" font-size="26" text-anchor="middle">💖</text></svg>';
  }
  function init() {
    var m = document.getElementById('msg');
    if (!m || m.querySelector('.mfx-cv')) return;
    css();
    var cv = document.createElement('canvas'); cv.className = 'mfx-cv';
    m.insertBefore(cv, m.firstChild);
    var box = document.createElement('div'); box.innerHTML = scene();
    var sc = box.firstChild;
    var t = document.createElement('div'); t.className = 'mfx-t';
    t.innerHTML = LINES.map(function (l) { return '<p>' + l + '</p>'; }).join('');
    var h = document.getElementById('msgT') || m.querySelector('h2');
    m.insertBefore(sc, h); m.insertBefore(t, h);
    var ctx = cv.getContext('2d'), W = 0, H = 0, d = 1, i, last = 0;
    function size() {
      d = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth || window.innerWidth; H = cv.clientHeight || window.innerHeight;
      cv.width = W * d; cv.height = H * d;
    }
    size(); window.addEventListener('resize', size);
    var E = [], EM = ['💖', '🎈', '💕', '🤍', '🎈'], L = [], F = [], P = [];
    for (i = 0; i < 14; i++) L.push({ x: (i + 0.5) / 14, ph: Math.random() * 6 });
    function pc() { return ['#ffd27a', '#ff7eb6', '#7fd0ff', '#ffffff', '#b79cff'][Math.floor(Math.random() * 5)]; }
    function frame(ts) {
      requestAnimationFrame(frame);
      if (!m.classList.contains('on') || !cv.clientWidth) return;
      if (cv.width !== Math.round(cv.clientWidth * d)) size();
      var s = ts / 1000, dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts;
      ctx.setTransform(d, 0, 0, d, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(255,220,160,.35)'; ctx.lineWidth = 1; ctx.beginPath();
      ctx.moveTo(0, 8); for (i = 0; i <= 14; i++) ctx.quadraticCurveTo((i - 0.5) / 14 * W, 26, i / 14 * W, 8);
      ctx.stroke();
      for (i = 0; i < L.length; i++) {
        var a = 0.4 + 0.6 * Math.abs(Math.sin(s * 1.6 + L[i].ph)), x = L[i].x * W, y = 20;
        var g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, 'rgba(255,230,160,' + a + ')'); g.addColorStop(1, 'rgba(255,200,100,0)');
        ctx.fillStyle = g; ctx.fillRect(x - 9, y - 9, 18, 18);
      }
      if (Math.random() < 0.012 && F.length < 3) { var fx = W * (0.15 + Math.random() * 0.7), fy = H * (0.1 + Math.random() * 0.25), fc = pc();
        for (i = 0; i < 28; i++) { var an = i / 28 * 6.283; P.push({ x: fx, y: fy, vx: Math.cos(an) * (40 + Math.random() * 40), vy: Math.sin(an) * (40 + Math.random() * 40), l: 0, c: fc }); } F.push(1); }
      F.length = 0;
      ctx.globalCompositeOperation = 'lighter';
      for (i = P.length - 1; i >= 0; i--) {
        var p = P[i]; p.l += dt; p.vy += 50 * dt; p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.l > 1.2) { P.splice(i, 1); continue; }
        ctx.globalAlpha = 1 - p.l / 1.2; ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, 6.28); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
      if (Math.random() < 0.05 && E.length < 12) E.push({ x: Math.random() * W, y: H + 20, v: 35 + Math.random() * 35,
        z: 18 + Math.random() * 14, e: EM[Math.floor(Math.random() * EM.length)], ph: Math.random() * 6 });
      for (i = E.length - 1; i >= 0; i--) {
        var q = E[i]; q.y -= q.v * dt;
        if (q.y < -30) { E.splice(i, 1); continue; }
        ctx.globalAlpha = 0.4; ctx.font = q.z + 'px serif';
        ctx.fillText(q.e, q.x + Math.sin(s * 2 + q.ph) * 14, q.y);
      }
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
