/* Sweta curtain: glowing butterflies, sparkles, pulsing glow, floating panda hearts. */
(function () {
  'use strict';
  function css() {
    if (document.getElementById('cfxCss')) return;
    var s = document.createElement('style');
    s.id = 'cfxCss';
    s.textContent =
      '#curtain .cfx-cv{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none;transition:opacity .6s}' +
      '#curtain.go .cfx-cv,#curtain.go .cfx-glow,#curtain.go .cfx-sheen{opacity:0}' +
      '#curtain .cfx-glow{position:absolute;left:50%;top:50%;width:340px;height:340px;margin:-170px 0 0 -170px;z-index:2;' +
      'pointer-events:none;border-radius:50%;background:radial-gradient(circle,rgba(150,200,255,.55),rgba(60,120,255,.22) 45%,rgba(0,0,0,0) 70%);' +
      'animation:cfxPulse 3.2s ease-in-out infinite;transition:opacity .6s}' +
      '@keyframes cfxPulse{0%,100%{opacity:.55;scale:.9}50%{opacity:1;scale:1.12}}' +
      '#curtain .cfx-sheen{position:absolute;top:0;bottom:0;left:-40%;width:40%;z-index:2;pointer-events:none;' +
      'background:linear-gradient(100deg,rgba(255,255,255,0),rgba(190,220,255,.28),rgba(255,255,255,0));' +
      'animation:cfxSheen 5s ease-in-out infinite;transition:opacity .6s}' +
      '@keyframes cfxSheen{0%{left:-40%}60%,100%{left:110%}}' +
      '#curtain #curBtn{max-width:80%;line-height:1.4;padding:16px 26px;border:1px solid rgba(190,220,255,.8);color:#fff;' +
      'text-shadow:0 0 10px rgba(150,200,255,.9);animation:cfxBtn 2.6s ease-in-out infinite}' +
      '@keyframes cfxBtn{0%,100%{translate:0 0;box-shadow:0 0 14px rgba(120,180,255,.6),0 0 30px rgba(80,140,255,.35)}' +
      '50%{translate:0 -6px;box-shadow:0 0 26px rgba(200,230,255,.95),0 0 60px rgba(80,140,255,.65)}}';
    document.head.appendChild(s);
  }
  function init() {
    var cur = document.getElementById('curtain');
    if (!cur || cur.querySelector('.cfx-cv')) return;
    css();
    var g = document.createElement('div'); g.className = 'cfx-glow';
    var sh = document.createElement('div'); sh.className = 'cfx-sheen';
    var cv = document.createElement('canvas'); cv.className = 'cfx-cv';
    cur.appendChild(g); cur.appendChild(sh); cur.appendChild(cv);
    var ctx = cv.getContext('2d'), W = 0, H = 0, d = 1;
    function size() {
      d = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth || window.innerWidth; H = cv.clientHeight || window.innerHeight;
      cv.width = W * d; cv.height = H * d;
    }
    size(); window.addEventListener('resize', size);
    var B = [], S = [], E = [], EM = ['🐼', '🧸', '💕', '🤍', '🦋'], i;
    for (i = 0; i < 5; i++) B.push({ x: Math.random() * 400, y: Math.random() * 800, s: 12 + Math.random() * 12,
      ph: Math.random() * 6, sp: 0.5 + Math.random() * 0.5, a: Math.random() * 6.28 });
    for (i = 0; i < 40; i++) S.push({ x: Math.random(), y: Math.random(), r: 0.8 + Math.random() * 1.8, ph: Math.random() * 6 });
    function wing(s, flap) {
      var gr = ctx.createRadialGradient(s * 0.6, -s * 0.3, 0, s * 0.6, -s * 0.3, s * 1.4);
      gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(1, 'rgba(80,160,255,.55)');
      ctx.fillStyle = gr;
      ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s * 0.6, -s * 1.5, s * 1.9, -s * 1.1, s * 1.3, -s * 0.1);
      ctx.bezierCurveTo(s * 1.7, s * 0.5, s * 0.9, s * 1.2, 0, s * 0.2);
      ctx.fill();
    }
    function bfly(b, t) {
      var fl = Math.abs(Math.cos(t * 4.5 * b.sp + b.ph)) * 0.8 + 0.2;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.sin(t * b.sp + b.ph) * 0.4);
      ctx.shadowColor = '#7fb8ff'; ctx.shadowBlur = 18;
      for (var k = -1; k <= 1; k += 2) { ctx.save(); ctx.scale(k * fl, 1); wing(b.s, fl); ctx.restore(); }
      ctx.fillStyle = '#fff'; ctx.fillRect(-1.2, -b.s * 0.5, 2.4, b.s);
      ctx.restore();
    }
    var last = 0;
    function frame(ts) {
      requestAnimationFrame(frame);
      if (!cur.classList.contains('on') || cur.classList.contains('go')) return;
      if (!cv.clientWidth) return;
      if (cv.width !== Math.round(cv.clientWidth * d)) size();
      var t = ts / 1000, dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts;
      ctx.setTransform(d, 0, 0, d, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (i = 0; i < S.length; i++) {
        var p = S[i], a = 0.5 + 0.5 * Math.sin(t * 2 + p.ph);
        ctx.fillStyle = 'rgba(200,230,255,' + (a * 0.9) + ')';
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r * (0.6 + a * 0.6), 0, 6.28); ctx.fill();
      }
      for (i = 0; i < B.length; i++) {
        var b = B[i];
        b.a += (Math.random() - 0.5) * 0.15;
        b.x += Math.cos(b.a) * 28 * b.sp * dt; b.y += (Math.sin(b.a) * 20 - 14) * b.sp * dt;
        if (b.y < -30) b.y = H + 30; if (b.y > H + 40) b.y = -20;
        if (b.x < -30) b.x = W + 20; if (b.x > W + 30) b.x = -20;
        bfly(b, t);
      }
      ctx.globalCompositeOperation = 'source-over'; ctx.shadowBlur = 0;
      if (Math.random() < 0.03 && E.length < 8) E.push({ x: Math.random() * W, y: H + 20, v: 30 + Math.random() * 30,
        z: 18 + Math.random() * 14, e: EM[Math.floor(Math.random() * EM.length)], ph: Math.random() * 6 });
      for (i = E.length - 1; i >= 0; i--) {
        var m = E[i]; m.y -= m.v * dt;
        if (m.y < -30) { E.splice(i, 1); continue; }
        ctx.globalAlpha = Math.min(0.85, m.y / H * 1.6); ctx.font = m.z + 'px serif';
        ctx.fillText(m.e, m.x + Math.sin(t * 2 + m.ph) * 12, m.y);
      }
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
