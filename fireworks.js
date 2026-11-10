/* Sweta gift: white animated gift box + fireworks + "Love you Sweta".
   Use: swFireworks(6000) when the gift is opened. */
(function () {
  'use strict';

  var COLORS = ['#ffd27a', '#ff4fb0', '#7fa8ff', '#ff4d4d', '#ffffff', '#b79cff', '#ffb347'];

  function css() {
    if (document.getElementById('swgCss')) return;
    var s = document.createElement('style');
    s.id = 'swgCss';
    s.textContent =
      '#giftBox.gift{animation:swgBob 2.4s ease-in-out infinite;filter:drop-shadow(0 0 20px rgba(255,255,255,.3))}' +
      '@keyframes swgBob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-12px) rotate(2deg)}}' +
      '#giftBox .box{background:linear-gradient(135deg,#ffffff 0%,#f6efff 55%,#ffe4f2 100%);' +
      'box-shadow:0 0 34px rgba(255,255,255,.5),0 0 60px rgba(255,126,182,.35);animation:swgGlow 2.6s ease-in-out infinite}' +
      '@keyframes swgGlow{0%,100%{box-shadow:0 0 28px rgba(255,255,255,.45),0 0 50px rgba(255,126,182,.3)}' +
      '50%{box-shadow:0 0 46px rgba(255,255,255,.85),0 0 90px rgba(127,208,255,.5)}}' +
      '#giftBox .lid{background:linear-gradient(135deg,#ffffff,#ffe4f2 60%,#eadcff)}' +
      '#giftBox .box:after,#giftBox .lid:after{background:linear-gradient(180deg,#ff7eb6,#b79cff,#7fd0ff,#ffd27a,#ff7eb6);' +
      'background-size:100% 300%;animation:swgRib 3.2s linear infinite}' +
      '@keyframes swgRib{to{background-position:0 150%}}' +
      '#giftBox.gift:before{content:"";position:absolute;left:-30px;right:-30px;top:-20px;bottom:-10px;border-radius:50%;' +
      'z-index:-1;pointer-events:none;background:conic-gradient(from 0deg,rgba(255,126,182,0),rgba(255,126,182,.5),' +
      'rgba(127,208,255,0),rgba(183,156,255,.5),rgba(255,126,182,0));filter:blur(16px);animation:swgSpin 6s linear infinite}' +
      '@keyframes swgSpin{to{transform:rotate(360deg)}}' +
      '#giftBox.open{animation:none}' +
      '#giftBox.open .box{animation:none;box-shadow:0 0 90px 30px rgba(255,255,255,.95),0 0 150px 50px rgba(255,126,182,.6)}' +
      '.swg-s{position:absolute;pointer-events:none;font-style:normal;line-height:1;animation:swgTw 1.8s ease-in-out infinite;' +
      'text-shadow:0 0 8px currentColor}' +
      '@keyframes swgTw{0%,100%{opacity:.15;transform:scale(.5) rotate(0deg)}50%{opacity:1;transform:scale(1.2) rotate(40deg)}}' +
      '#swFw{position:fixed;inset:0;z-index:70;pointer-events:none;transition:opacity 1s}' +
      '#swFw canvas{position:absolute;inset:0;width:100%;height:100%}' +
      '.swf-t{position:absolute;left:0;right:0;top:36%;text-align:center;opacity:0;transform:scale(.6);' +
      'transition:opacity 1.1s,transform 1.1s cubic-bezier(.2,1.4,.4,1)}' +
      '.swf-t.in{opacity:1;transform:scale(1)}' +
      '.swf-t small{display:block;font:italic 500 1.3rem "Cormorant Garamond",Georgia,serif;letter-spacing:.3em;' +
      'text-transform:uppercase;color:#fff;text-shadow:0 0 14px rgba(255,126,182,.9)}' +
      '.swf-t b{display:block;font:400 clamp(3.6rem,19vw,5.4rem)/1.05 "Pinyon Script","Brush Script MT",cursive;' +
      'background:linear-gradient(135deg,#ffe9b0,#ff7eb6,#b79cff);-webkit-background-clip:text;background-clip:text;' +
      'color:transparent;filter:drop-shadow(0 0 18px rgba(255,126,182,.7));animation:swfPulse 1.6s ease-in-out infinite}' +
      '@keyframes swfPulse{50%{filter:drop-shadow(0 0 30px rgba(255,200,140,.95))}}';
    document.head.appendChild(s);
  }

  function decorate() {
    var g = document.getElementById('giftBox');
    if (!g || g.querySelector('.swg-s')) return;
    var spots = [
      [-18, 10, '#ffd27a', 14], [128, 0, '#7fd0ff', 16], [-10, 100, '#ff7eb6', 12], [130, 95, '#b79cff', 14],
      [55, -30, '#ffffff', 18], [20, 150, '#ffd27a', 12], [100, 150, '#ff7eb6', 13]
    ];
    for (var i = 0; i < spots.length; i++) {
      var e = document.createElement('i');
      e.className = 'swg-s';
      e.textContent = '✦';
      e.style.cssText = 'left:' + spots[i][0] + 'px;top:' + spots[i][1] + 'px;color:' + spots[i][2] +
        ';font-size:' + spots[i][3] + 'px;animation-delay:' + (i * 0.27) + 's';
      g.appendChild(e);
    }
  }

  function swFireworks(ms) {
    ms = ms || 6000;
    css();
    var gs = document.getElementById("gift"); if (gs) gs.classList.add("swg-fw");
    if (document.getElementById('swFw')) return;

    var root = document.createElement('div');
    root.id = 'swFw';
    root.innerHTML = '<canvas></canvas><div class="swf-t"><small>Love you</small><b>Sweta</b>' +
      '<span style="font-size:2rem">💖</span></div>';
    document.body.appendChild(root);

    var cv = root.querySelector('canvas');
    var ctx = cv.getContext('2d');
    var tx = root.querySelector('.swf-t');
    var W = 0, H = 0, sc = 1;
    var rockets = [], parts = [], flashes = [];
    var t0 = null, nextLaunch = 0, raf = 0, textOn = false, fading = false;

    function size() {
      var d = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      sc = Math.min(W, 520) / 380;
      cv.width = W * d; cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    }
    size();

    function pick() { return COLORS[Math.floor(Math.random() * COLORS.length)]; }

    function launch() {
      rockets.push({
        x: W * (0.15 + Math.random() * 0.7),
        y: H + 10,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(H * 0.013 + Math.random() * 2),
        ty: H * (0.3 + Math.random() * 0.3),
        c: pick(), c2: pick()
      });
    }

    function burst(x, y, c1, c2) {
      flashes.push({ x: x, y: y, l: 0 });
      var n = 110, i, a, sp;
      for (i = 0; i < n; i++) {
        a = Math.random() * 6.2832;
        sp = (i % 3 === 0 ? 5.2 : (i % 3 === 1 ? 3.6 : 2.2)) * (0.85 + Math.random() * 0.3) * sc;
        parts.push({
          x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, l: 0,
          m: 70 + Math.random() * 40, c: (i % 4 === 0 ? c2 : c1), g: 0.045, f: 0.975,
          s: 1.4 + Math.random() * 1.2, tw: Math.random() < 0.3
        });
      }
    }

    function frame(ts) {
      if (!t0) t0 = ts;
      var el = ts - t0, i, p, r;

      if (el < ms - 1800 && el >= nextLaunch) {
        launch();
        if (el === 0 || nextLaunch === 0) launch();
        nextLaunch = el + 380 + Math.random() * 320;
      }
      if (!textOn && el > 700) { textOn = true; tx.classList.add('in'); }
      if (!fading && el > ms - 900) { fading = true; root.style.opacity = '0'; }

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,.22)';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';

      for (i = rockets.length - 1; i >= 0; i--) {
        r = rockets[i];
        r.x += r.vx; r.y += r.vy;
        for (var k = 0; k < 2; k++) {
          parts.push({ x: r.x, y: r.y, vx: (Math.random() - 0.5) * 0.6, vy: 0.6 + Math.random() * 0.8, l: 0,
            m: 16 + Math.random() * 10, c: '#ff9a3c', g: 0.02, f: 0.96, s: 1.2, tw: false });
        }
        if (r.y <= r.ty) { burst(r.x, r.y, r.c, r.c2); rockets.splice(i, 1); }
      }

      for (i = flashes.length - 1; i >= 0; i--) {
        var f = flashes[i];
        var rad = 30 + f.l * 14;
        var g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, rad);
        g.addColorStop(0, 'rgba(255,255,255,' + (0.7 - f.l * 0.12) + ')');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(f.x - rad, f.y - rad, rad * 2, rad * 2);
        if (++f.l > 5) flashes.splice(i, 1);
      }

      for (i = parts.length - 1; i >= 0; i--) {
        p = parts[i];
        var px = p.x, py = p.y;
        p.vx *= p.f; p.vy *= p.f; p.vy += p.g;
        p.x += p.vx; p.y += p.vy;
        p.l++;
        if (p.l >= p.m) { parts.splice(i, 1); continue; }
        var a = 1 - p.l / p.m;
        if (p.tw && Math.random() < 0.25) a *= 0.25;
        ctx.globalAlpha = a;
        ctx.strokeStyle = p.c;
        ctx.lineWidth = p.s;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s * 0.8, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (parts.length > 1200) parts.splice(0, parts.length - 1200);

      if (el > ms + 1000) {
        cancelAnimationFrame(raf);
        if (root.parentNode) root.parentNode.removeChild(root);
        return;
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }

  css();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', decorate);
  else decorate();
  window.swFireworks = swFireworks;
})();
