/* Sweta birthday intro: night sky, butterflies, greeting, touch effects.
   Use: swIntro(function(){ ...next screen... }) */
(function () {
  'use strict';

  var WISHES = [
    'Tum meri favourite person ho 💖',
    'Tumhari smile meri sabse badi khushi hai 😊',
    'Sweta, tum bahut khaas ho ✨',
    'Main hamesha tumhare saath hoon 🤝',
    'Tum ho to sab kuch khoobsurat hai 🌸',
    'Happy Birthday my bubu 🎂',
    'Tum meri duniya ho ♾️'
  ];
  var HEARTS = ['❤', '💖', '💗', '💕', '💜'];
  var SPARK = ['#ffd9a0', '#ff7eb6', '#7fd0ff', '#b79cff', '#ffffff'];
  var PAL = [
    ['#ff7eb6', '#b79cff'],
    ['#7fd0ff', '#b79cff'],
    ['#ffd9a0', '#ff7eb6'],
    ['#b79cff', '#7fd0ff']
  ];

  var started = false;

  function css() {
    var s = document.createElement('style');
    s.textContent =
      '#swIntro{position:fixed;inset:0;z-index:60;overflow:hidden;opacity:0;transition:opacity 1s;' +
      'background:radial-gradient(40rem 30rem at 85% 0%,rgba(127,208,255,.16),transparent 60%),' +
      'radial-gradient(40rem 30rem at 10% 90%,rgba(255,126,182,.16),transparent 60%),#0b0716;' +
      'touch-action:manipulation;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent}' +
      '#swIntro.on{opacity:1}' +
      '#swIntro canvas{position:absolute;inset:0;width:100%;height:100%}' +
      '.swi-fx{position:absolute;inset:0;pointer-events:none;overflow:hidden}' +
      '.swi-fx>*{position:absolute;pointer-events:none;will-change:transform,opacity}' +
      '.swi-c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;' +
      'text-align:center;padding:24px;pointer-events:none;gap:4px}' +
      '.swi-c>*{opacity:0;animation:swiup 1.3s forwards}' +
      '.swi-k{font:italic 500 1.05rem "Cormorant Garamond",Georgia,serif;letter-spacing:.28em;text-transform:uppercase;color:#cdb9dc;animation-delay:.4s!important}' +
      '.swi-h{font:400 clamp(2.4rem,11vw,3.4rem)/1.1 "Pinyon Script","Brush Script MT",cursive;color:#fdf0f7;' +
      'text-shadow:0 0 24px rgba(255,126,182,.55);animation-delay:1s!important}' +
      '.swi-n{font:400 clamp(3.2rem,16vw,4.8rem)/1.05 "Pinyon Script","Brush Script MT",cursive;' +
      'background:linear-gradient(135deg,#ffd9a0,#ff7eb6,#b79cff);-webkit-background-clip:text;background-clip:text;color:transparent;' +
      'filter:drop-shadow(0 0 18px rgba(255,126,182,.45));animation-delay:1.8s!important}' +
      '.swi-b{font:italic 500 1.5rem "Cormorant Garamond",Georgia,serif;color:#ff7eb6;animation-delay:2.6s!important}' +
      '.swi-t{margin-top:26px;font:300 1rem "Jost",system-ui,sans-serif;letter-spacing:.08em;color:#cdb9dc;' +
      'animation:swiup 1.2s 3.6s forwards,swipulse 2.4s 5s ease-in-out infinite!important}' +
      '.swi-go{position:absolute;left:50%;bottom:9%;transform:translateX(-50%);padding:12px 30px;border-radius:30px;' +
      'border:1px solid rgba(255,217,160,.6);background:rgba(255,255,255,.08);color:#ffe9c8;' +
      'font:500 .95rem "Jost",system-ui,sans-serif;letter-spacing:.08em;cursor:pointer;backdrop-filter:blur(6px);' +
      '-webkit-backdrop-filter:blur(6px);opacity:0;pointer-events:none;transition:opacity 1s}' +
      '.swi-go.show{opacity:1;pointer-events:auto}' +
      '@keyframes swiup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}' +
      '@keyframes swipulse{0%,100%{opacity:.55}50%{opacity:1}}';
    document.head.appendChild(s);
    if (!document.getElementById('swiFonts')) {
      var l = document.createElement('link');
      l.id = 'swiFonts';
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Jost:wght@300;500&display=swap';
      document.head.appendChild(l);
    }
  }

  function swIntro(done) {
    if (started) { if (done) done(); return; }
    started = true;
    css();

    var root = document.createElement('div');
    root.id = 'swIntro';
    root.innerHTML =
      '<canvas></canvas>' +
      '<div class="swi-c">' +
      '<div class="swi-k">Sirf tumhare liye</div>' +
      '<div class="swi-h">Happy Birthday</div>' +
      '<div class="swi-n">Sweta</div>' +
      '<div class="swi-b">my bubu ♥</div>' +
      '<div class="swi-t">Tumhare dudu ki taraf se 😊😘</div>' +
      '</div>' +
      '<div class="swi-fx"></div>' +
      '<button class="swi-go" type="button">Aage bhi hai bubu ji 🤓</button>';
    document.body.appendChild(root);

    var cv = root.querySelector('canvas');
    var ctx = cv.getContext('2d');
    var fx = root.querySelector('.swi-fx');
    var btn = root.querySelector('.swi-go');
    var W = 0, H = 0, raf = 0, closed = false;
    var B = [], stars = [];

    function size() {
      var d = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * d; cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    }
    size();
    window.addEventListener('resize', size);

    var i;
    for (i = 0; i < 70; i++) {
      stars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + .3, p: Math.random() * 6.28, s: Math.random() * 1.5 + .5 });
    }

    function mk(x, y, n) {
      return {
        x: x, y: y,
        s: .6 + Math.random() * .7,
        ph: Math.random() * 6.28,
        sp: 6 + Math.random() * 4,
        vx: (Math.random() - .5) * .5,
        vy: -(.25 + Math.random() * .45),
        wob: Math.random() * 6.28,
        c: PAL[n % PAL.length]
      };
    }
    for (i = 0; i < 8; i++) B.push(mk(Math.random() * W, Math.random() * H, i));

    function wing(cx, cy, rx, ry, rot, c) {
      var g = ctx.createRadialGradient(cx, cy, 1, cx, cy, Math.max(rx, ry));
      g.addColorStop(0, c[0]);
      g.addColorStop(1, c[1]);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, rot, 0, 6.2832);
      ctx.fill();
    }

    function drawB(b, t) {
      var flap = .2 + .8 * Math.abs(Math.sin(t * .001 * b.sp + b.ph));
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(Math.sin(b.wob) * .25);
      ctx.scale(b.s, b.s);
      ctx.shadowColor = b.c[0];
      ctx.shadowBlur = 12;
      ctx.globalAlpha = .9;
      for (var side = -1; side <= 1; side += 2) {
        ctx.save();
        ctx.scale(side * flap, 1);
        wing(15, -10, 17, 24, -.5, b.c);
        wing(11, 12, 11, 15, .5, b.c);
        ctx.restore();
      }
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fdf0f7';
      ctx.beginPath();
      ctx.ellipse(0, 0, 2, 13, 0, 0, 6.2832);
      ctx.fill();
      ctx.strokeStyle = '#fdf0f7';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -12); ctx.quadraticCurveTo(-6, -22, -10, -24);
      ctx.moveTo(0, -12); ctx.quadraticCurveTo(6, -22, 10, -24);
      ctx.stroke();
      ctx.restore();
    }

    function loop(t) {
      if (closed) return;
      ctx.clearRect(0, 0, W, H);
      var k;
      for (k = 0; k < stars.length; k++) {
        var s = stars[k];
        ctx.globalAlpha = .25 + .75 * Math.abs(Math.sin(t * .001 * s.s + s.p));
        ctx.fillStyle = '#fdf0f7';
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      for (k = 0; k < B.length; k++) {
        var b = B[k];
        b.wob += .02;
        b.x += b.vx + Math.sin(b.wob) * .9;
        b.y += b.vy + Math.cos(b.wob * .7) * .3;
        if (b.y < -60) { b.y = H + 60; b.x = Math.random() * W; }
        if (b.x < -60) b.x = W + 60;
        if (b.x > W + 60) b.x = -60;
        drawB(b, t);
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    function rm(el) { return function () { if (el.parentNode) el.parentNode.removeChild(el); }; }
    function rnd(a, b) { return a + Math.random() * (b - a); }

    function burst(x, y) {
      if (fx.children.length > 70) return;
      var n, el, a, r, dx, dy, an;

      el = document.createElement('div');
      el.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:22px;height:22px;margin:-11px 0 0 -11px;' +
        'border:2px solid rgba(255,126,182,.85);border-radius:50%;box-shadow:0 0 14px rgba(255,126,182,.6)';
      fx.appendChild(el);
      an = el.animate([{ transform: 'scale(.3)', opacity: .95 }, { transform: 'scale(7)', opacity: 0 }], { duration: 900, easing: 'ease-out' });
      an.onfinish = rm(el);

      for (n = 0; n < 9; n++) {
        el = document.createElement('div');
        el.textContent = HEARTS[n % HEARTS.length];
        el.style.cssText = 'left:' + x + 'px;top:' + y + 'px;font-size:' + rnd(16, 30) + 'px;margin:-12px 0 0 -12px';
        fx.appendChild(el);
        dx = rnd(-130, 130); dy = -rnd(60, 220);
        an = el.animate([
          { transform: 'translate(0,0) rotate(0deg) scale(.4)', opacity: 0 },
          { transform: 'translate(' + dx * .4 + 'px,' + dy * .4 + 'px) rotate(' + rnd(-25, 25) + 'deg) scale(1)', opacity: 1, offset: .3 },
          { transform: 'translate(' + dx + 'px,' + dy + 'px) rotate(' + rnd(-50, 50) + 'deg) scale(.9)', opacity: 0 }
        ], { duration: rnd(1200, 1900), easing: 'ease-out' });
        an.onfinish = rm(el);
      }

      for (n = 0; n < 12; n++) {
        el = document.createElement('div');
        el.textContent = '✦';
        el.style.cssText = 'left:' + x + 'px;top:' + y + 'px;font-size:' + rnd(10, 18) + 'px;color:' + SPARK[n % SPARK.length] +
          ';margin:-8px 0 0 -8px;text-shadow:0 0 8px currentColor';
        fx.appendChild(el);
        a = Math.random() * 6.2832; r = rnd(40, 120);
        an = el.animate([
          { transform: 'translate(0,0) scale(1)', opacity: 1 },
          { transform: 'translate(' + Math.cos(a) * r + 'px,' + Math.sin(a) * r + 'px) scale(0)', opacity: 0 }
        ], { duration: rnd(700, 1100), easing: 'ease-out' });
        an.onfinish = rm(el);
      }

      el = document.createElement('div');
      el.textContent = WISHES[Math.floor(Math.random() * WISHES.length)];
      var wx = Math.min(Math.max(x, 110), Math.max(110, W - 110));
      el.style.cssText = 'left:' + wx + 'px;top:' + y + 'px;transform:translateX(-50%);white-space:nowrap;' +
        'font:italic 500 1.2rem "Cormorant Garamond",Georgia,serif;color:#ffd9a0;text-shadow:0 0 12px rgba(255,126,182,.8)';
      fx.appendChild(el);
      an = el.animate([
        { transform: 'translate(-50%,0)', opacity: 0 },
        { transform: 'translate(-50%,-30px)', opacity: 1, offset: .25 },
        { transform: 'translate(-50%,-100px)', opacity: 0 }
      ], { duration: 2600, easing: 'ease-out' });
      an.onfinish = rm(el);

      if (B.length > 16) B.shift();
      B.push(mk(x, y, B.length));
    }

    function onDown(e) {
      if (closed) return;
      if (e.target && e.target.closest && e.target.closest('.swi-go')) return;
      burst(e.clientX, e.clientY);
    }
    root.addEventListener('pointerdown', onDown);

    function close() {
      if (closed) return;
      closed = true;
      root.classList.remove('on');
      if (done) done();
      setTimeout(function () {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', size);
        if (root.parentNode) root.parentNode.removeChild(root);
      }, 1100);
    }
    btn.addEventListener('click', close);

    requestAnimationFrame(function () { root.classList.add('on'); });
    setTimeout(function () { btn.classList.add('show'); }, 5000);
  }

  window.swIntro = swIntro;
})();
