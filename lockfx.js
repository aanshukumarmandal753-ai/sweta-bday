/* Sweta lock screen: neon hearts + LOVE background (like the video), animated card, tap message.
   Self-contained: injects its own CSS. Needs the #lock section from the page. */
(function () {
  'use strict';

  var PINK = ['#ff3fa4', '#ff6fc0', '#ff2e93', '#ff8fd0'];
  var EMO = ['❤', '💖', '💗', '💕', '💘'];
  var SPK = ['#ffd9a0', '#ff7eb6', '#7fd0ff', '#ffffff'];

  function css() {
    if (document.getElementById('lfxCss')) return;
    var s = document.createElement('style');
    s.id = 'lfxCss';
    s.textContent =
      '#lock .lfx-bg{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}' +
      '#lock .lfx-fx{position:fixed;inset:0;z-index:9;pointer-events:none;overflow:hidden}' +
      '#lock .lfx-fx>*{position:absolute;pointer-events:none;will-change:transform,opacity}' +
      '#lock .phone{position:relative;z-index:2;overflow:hidden;border-color:rgba(255,79,163,.55)}' +
      '#lock .phone:not(.shake){animation:lfxFloat 4.5s ease-in-out infinite}' +
      '#lock .phone:after{content:"";position:absolute;top:-50%;left:-70%;width:35%;height:200%;pointer-events:none;' +
      'background:linear-gradient(90deg,transparent,rgba(255,255,255,.13),transparent);transform:skewX(-20deg);' +
      'animation:lfxSheen 5s ease-in-out infinite}' +
      '#lock #lockIc{display:inline-block;font-size:1.9rem!important;transform-origin:50% 10%;' +
      'filter:drop-shadow(0 0 10px rgba(255,79,163,.85));animation:lfxLock 2.4s ease-in-out infinite}' +
      '#lock #hint{font-size:.9rem;line-height:1.45;animation:lfxHint 2.4s ease-in-out infinite}' +
      '#lock .dots i:not(.f){animation:lfxDot 1.6s ease-in-out infinite}' +
      '#lock .dots i:nth-child(2){animation-delay:.2s}#lock .dots i:nth-child(3){animation-delay:.4s}' +
      '#lock .dots i:nth-child(4){animation-delay:.6s}' +
      '#lock .pad button{animation:lfxBtn 3s ease-in-out infinite}' +
      '#lock .pad button:nth-child(2n){animation-delay:.6s}#lock .pad button:nth-child(3n){animation-delay:1.2s}' +
      '#lock .lfx-msg{padding:12px 16px;border-radius:18px;text-align:center;color:#fff;' +
      'font:600 .95rem/1.45 Poppins,system-ui,sans-serif;background:rgba(18,4,24,.85);' +
      'border:1px solid rgba(255,79,163,.75);box-shadow:0 0 28px rgba(255,63,164,.55);' +
      'text-shadow:0 0 8px rgba(255,79,163,.7)}' +
      '#lock .lfx-msg b{display:block;font-size:1.25rem;color:#ffd76a;margin-bottom:2px}' +
      '@keyframes lfxFloat{0%,100%{transform:translateY(0);box-shadow:0 0 28px rgba(255,63,164,.3),0 0 60px rgba(180,60,255,.2)}' +
      '50%{transform:translateY(-9px);box-shadow:0 0 44px rgba(255,63,164,.65),0 0 90px rgba(180,60,255,.4)}}' +
      '@keyframes lfxSheen{0%,55%{left:-70%}80%,100%{left:120%}}' +
      '@keyframes lfxLock{0%,100%{transform:rotate(-8deg) scale(1)}50%{transform:rotate(8deg) scale(1.15)}}' +
      '@keyframes lfxHint{0%,100%{opacity:.78}50%{opacity:1}}' +
      '@keyframes lfxDot{0%,100%{box-shadow:0 0 0 rgba(255,79,163,0)}50%{box-shadow:0 0 12px rgba(255,79,163,.9)}}' +
      '@keyframes lfxBtn{0%,100%{box-shadow:0 0 4px rgba(255,79,163,.08)}50%{box-shadow:0 0 16px rgba(255,79,163,.4)}}';
    document.head.appendChild(s);
  }

  function mkSprite(w, h, fn) {
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    fn(c.getContext('2d'), w, h);
    return c;
  }

  function heart(g, cx, cy, s) {
    g.beginPath();
    g.moveTo(cx, cy + s * 0.95);
    g.bezierCurveTo(cx + s * 1.7, cy - s * 0.1, cx + s * 0.85, cy - s * 1.35, cx, cy - s * 0.45);
    g.bezierCurveTo(cx - s * 0.85, cy - s * 1.35, cx - s * 1.7, cy - s * 0.1, cx, cy + s * 0.95);
    g.closePath();
  }

  function init() {
    var lock = document.getElementById('lock');
    if (!lock || lock.getAttribute('data-lfx')) return;
    lock.setAttribute('data-lfx', '1');
    css();

    var cv = document.createElement('canvas');
    cv.className = 'lfx-bg';
    var fx = document.createElement('div');
    fx.className = 'lfx-fx';
    lock.insertBefore(cv, lock.firstChild);
    lock.appendChild(fx);

    var ctx = cv.getContext('2d');
    var W = 0, H = 0, T = 0, last = 0, lastMsg = 0;
    var SP = [], P = [], D = [];

    function size() {
      var d = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * d; cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    }
    size();
    window.addEventListener('resize', size);

    function mkP(first) {
      var love = Math.random() < 0.3, sc = 0.4 + Math.random() * 0.9;
      return {
        t: love ? SP[SP.length - 1] : SP[Math.floor(Math.random() * PINK.length)],
        x: Math.random() * W, y: first ? Math.random() * H : H + 70, sc: sc,
        vy: (16 + Math.random() * 46) * (0.5 + sc), a: 0.45 + 0.55 * Math.min(1, sc),
        ph: Math.random() * 6.28, f: 0.5 + Math.random() * 1.2, am: 6 + Math.random() * 16
      };
    }

    function build() {
      var i;
      PINK.forEach(function (col) {
        SP.push(mkSprite(72, 72, function (g, w, h) {
          g.shadowColor = col; g.shadowBlur = 16; g.fillStyle = col;
          heart(g, w / 2, h / 2, 15); g.fill();
          heart(g, w / 2, h / 2, 15); g.fill();
          g.shadowBlur = 0; g.fillStyle = 'rgba(255,255,255,.75)';
          heart(g, w / 2, h / 2 - 1, 8); g.fill();
        }));
      });
      SP.push(mkSprite(150, 60, function (g, w, h) {
        g.font = '700 30px Poppins, Arial, sans-serif';
        g.textAlign = 'center'; g.textBaseline = 'middle';
        g.shadowColor = '#ff3fa4'; g.shadowBlur = 14; g.fillStyle = '#ff9bd6';
        g.fillText('LOVE', w / 2, h / 2); g.fillText('LOVE', w / 2, h / 2);
        g.shadowBlur = 0; g.fillStyle = '#fff0fa';
        g.fillText('LOVE', w / 2, h / 2);
      }));
      for (i = 0; i < (W < 500 ? 30 : 46); i++) P.push(mkP(true));
      for (i = 0; i < 28; i++) {
        D.push({ x: Math.random() * W, y: Math.random() * H, r: 0.8 + Math.random() * 1.4, p: Math.random() * 6.28,
          s: 0.6 + Math.random() * 1.6, c: i % 3 ? '#7fd0ff' : '#ffffff', vy: 4 + Math.random() * 10 });
      }
      requestAnimationFrame(frame);
    }

    function frame(ts) {
      requestAnimationFrame(frame);
      if (!lock.classList.contains('on')) { last = ts; return; }
      var dt = Math.min(0.05, (ts - (last || ts)) / 1000);
      last = ts; T += dt;
      ctx.clearRect(0, 0, W, H);
      var i, p, w, h, d;
      for (i = 0; i < D.length; i++) {
        d = D[i];
        d.y -= d.vy * dt;
        if (d.y < -5) { d.y = H + 5; d.x = Math.random() * W; }
        ctx.globalAlpha = 0.25 + 0.75 * Math.abs(Math.sin(T * d.s + d.p));
        ctx.fillStyle = d.c;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.2832); ctx.fill();
      }
      for (i = 0; i < P.length; i++) {
        p = P[i];
        p.y -= p.vy * dt;
        if (p.y < -70) P[i] = p = mkP(false);
        w = p.t.width * p.sc * 0.8; h = p.t.height * p.sc * 0.8;
        ctx.save();
        ctx.translate(p.x + Math.sin(T * p.f + p.ph) * p.am, p.y);
        ctx.rotate(Math.sin(T * p.f + p.ph) * 0.25);
        ctx.globalAlpha = p.a * (0.75 + 0.25 * Math.sin(T * p.f * 2 + p.ph));
        ctx.drawImage(p.t, -w / 2, -h / 2, w, h);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }

    function rm(el) { return function () { if (el.parentNode) el.parentNode.removeChild(el); }; }
    function rnd(a, b) { return a + Math.random() * (b - a); }
    var MSGS = ['I love you Sweta ☺️', 'I love you bubu ji 😘', 'Aaj to aapka Happy wala birthday hai na, to khush raho 🤗🤓'];
    var mi = 0, cur = null;

    function say(x, y) {
      var now = Date.now();
      if (now - lastMsg < 600) return;
      lastMsg = now;
      if (cur && cur.parentNode) cur.parentNode.removeChild(cur);
      var m = document.createElement('div');
      m.className = 'lfx-msg';
      m.textContent = MSGS[mi++ % MSGS.length];
      var w = Math.min(280, W * 0.8);
      var cx = Math.min(Math.max(x, w / 2 + 10), W - w / 2 - 10);
      var cy = Math.min(Math.max(y - 100, 90), Math.max(90, H - 200));
      m.style.cssText = 'left:' + cx + 'px;top:' + cy + 'px;width:' + w + 'px;font-size:1.1rem';
      fx.appendChild(m);
      cur = m;
      var a = m.animate([
        { opacity: 0, transform: 'translate(-50%,12px) scale(.85)' },
        { opacity: 1, transform: 'translate(-50%,0) scale(1)', offset: 0.15 },
        { opacity: 1, transform: 'translate(-50%,-14px) scale(1)', offset: 0.8 },
        { opacity: 0, transform: 'translate(-50%,-40px) scale(.96)' }
      ], { duration: 3000, easing: 'ease-out' });
      a.onfinish = rm(m);
    }



    function burst(x, y, quiet) {
      if (fx.children.length > 60) return;
      var n, el, an, ang, r;
      el = document.createElement('div');
      el.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:22px;height:22px;margin:-11px 0 0 -11px;' +
        'border:2px solid rgba(255,79,163,.9);border-radius:50%;box-shadow:0 0 14px rgba(255,79,163,.7)';
      fx.appendChild(el);
      an = el.animate([{ transform: 'scale(.3)', opacity: 1 }, { transform: 'scale(6)', opacity: 0 }], { duration: 800, easing: 'ease-out' });
      an.onfinish = rm(el);
      for (n = 0; n < 9; n++) {
        el = document.createElement('div');
        el.textContent = EMO[n % EMO.length];
        el.style.cssText = 'left:' + x + 'px;top:' + y + 'px;font-size:' + rnd(16, 30) + 'px;margin:-12px 0 0 -12px';
        fx.appendChild(el);
        var dx = rnd(-120, 120), dy = -rnd(60, 200);
        an = el.animate([
          { transform: 'translate(0,0) scale(.4)', opacity: 0 },
          { transform: 'translate(' + dx * 0.4 + 'px,' + dy * 0.4 + 'px) scale(1)', opacity: 1, offset: 0.3 },
          { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.9)', opacity: 0 }
        ], { duration: rnd(1200, 1800), easing: 'ease-out' });
        an.onfinish = rm(el);
      }
      for (n = 0; n < 10; n++) {
        el = document.createElement('div');
        el.textContent = '✦';
        el.style.cssText = 'left:' + x + 'px;top:' + y + 'px;font-size:' + rnd(10, 18) + 'px;color:' + SPK[n % SPK.length] +
          ';margin:-8px 0 0 -8px;text-shadow:0 0 8px currentColor';
        fx.appendChild(el);
        ang = Math.random() * 6.2832; r = rnd(40, 110);
        an = el.animate([
          { transform: 'translate(0,0) scale(1)', opacity: 1 },
          { transform: 'translate(' + Math.cos(ang) * r + 'px,' + Math.sin(ang) * r + 'px) scale(0)', opacity: 0 }
        ], { duration: rnd(700, 1100), easing: 'ease-out' });
        an.onfinish = rm(el);
      }
      if (!quiet) say(x, y);
    }

    lock.addEventListener('pointerdown', function (e) { burst(e.clientX, e.clientY, e.target.closest(".pad")); });

    var fonts = document.fonts && document.fonts.load ? document.fonts.load('700 30px Poppins') : Promise.resolve();
    Promise.race([fonts, new Promise(function (r) { setTimeout(r, 1200); })]).then(build, build);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
