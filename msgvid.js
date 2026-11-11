/* Sweta msg screen: floating sky lanterns animation behind everything (no video file). */
(function () {
  'use strict';
  function init() {
    var m = document.getElementById('msg');
    if (!m || m.querySelector('.mfx-lan')) return;
    var s = document.createElement('style');
    s.textContent = '#msg>canvas.mfx-lan{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}';
    document.head.appendChild(s);
    var cv = document.createElement('canvas'); cv.className = 'mfx-lan';
    m.insertBefore(cv, m.firstChild);
    var ctx = cv.getContext('2d'), W = 0, H = 0, d = 1, i, last = 0, N = 34, A = [], T = [];
    function size() {
      d = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth || window.innerWidth; H = cv.clientHeight || window.innerHeight;
      cv.width = W * d; cv.height = H * d;
    }
    size(); window.addEventListener('resize', size);
    function mk(fresh) {
      var z = 0.25 + Math.random() * 0.75;
      return { x: Math.random() * W, y: fresh ? Math.random() * H : H + 40 + Math.random() * 60, z: z,
        w: 9 + 30 * z, v: 10 + 38 * z, ph: Math.random() * 6, sw: 8 + 14 * z, fl: Math.random() * 6 };
    }
    for (i = 0; i < N; i++) A.push(mk(true));
    for (i = 0; i < 60; i++) T.push({ x: Math.random(), y: Math.random(), ph: Math.random() * 6, r: 0.5 + Math.random() * 1.2 });
    A.sort(function (a, b) { return a.z - b.z; });
    function lantern(L, t) {
      var x = L.x + Math.sin(t * 0.6 + L.ph) * L.sw, y = L.y, w = L.w, h = w * 1.3;
      var f = 0.85 + 0.15 * Math.sin(t * 5 + L.fl), a = Math.min(1, (H + 40 - y) / 80) * (0.3 + 0.4 * L.z);
      var g = ctx.createRadialGradient(x, y, 0, x, y, w * 2.6);
      g.addColorStop(0, 'rgba(255,190,90,' + (0.5 * a * f) + ')'); g.addColorStop(1, 'rgba(255,140,40,0)');
      ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g;
      ctx.fillRect(x - w * 2.6, y - w * 2.6, w * 5.2, w * 5.2);
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = a;
      var b = ctx.createLinearGradient(0, y - h / 2, 0, y + h / 2);
      b.addColorStop(0, '#ff9a3c'); b.addColorStop(0.6, '#ffc766'); b.addColorStop(1, '#fff0b8');
      ctx.fillStyle = b; ctx.beginPath();
      ctx.moveTo(x - w * 0.42, y - h / 2); ctx.lineTo(x + w * 0.42, y - h / 2);
      ctx.quadraticCurveTo(x + w * 0.62, y + h * 0.1, x + w * 0.3, y + h / 2);
      ctx.lineTo(x - w * 0.3, y + h / 2); ctx.quadraticCurveTo(x - w * 0.62, y + h * 0.1, x - w * 0.42, y - h / 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,230,' + (0.85 * f) + ')';
      ctx.beginPath(); ctx.ellipse(x, y + h * 0.38, w * 0.2, w * 0.12, 0, 0, 6.28); ctx.fill();
      ctx.globalAlpha = 1;
    }
    function frame(ts) {
      requestAnimationFrame(frame);
      if (!m.classList.contains('on') || !cv.clientWidth) return;
      if (cv.width !== Math.round(cv.clientWidth * d)) size();
      var t = ts / 1000, dt = Math.min(0.05, (ts - last) / 1000 || 0.016); last = ts;
      ctx.setTransform(d, 0, 0, d, 0, 0); ctx.clearRect(0, 0, W, H);
      for (i = 0; i < T.length; i++) {
        var p = T[i], q = 0.3 + 0.7 * Math.abs(Math.sin(t * 1.3 + p.ph));
        ctx.fillStyle = 'rgba(255,225,170,' + (q * 0.7) + ')';
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, 6.28); ctx.fill();
      }
      for (i = 0; i < A.length; i++) {
        var L = A[i]; L.y -= L.v * dt;
        if (L.y < -60) { var n = mk(false); L.x = n.x; L.y = n.y; L.w = n.w; L.v = n.v; L.z = n.z; L.sw = n.sw; }
        lantern(L, t);
      }
    }
    requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
