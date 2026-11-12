/* Sweta cake screen (light version): glowing lines, white+color cake, glowing stat cards, living background. */
(function () {
  'use strict';
  var L1 = 'Devi ji, aap sirf khushi deserve karte hain. Aapki aankhon mein aansu nahi aane chahiye \u263A\uFE0F\uD83E\uDD17\u2728';
  var L2 = 'Khush raha karo pagalu bubu \u263A\uFE0F\uD83E\uDD13\u2665\uFE0F\uD83C\uDF88';
  var B1 = '\uD83C\uDF2C\uFE0F candles bujhao bubu \u2728';
  var B2 = 'Aage aur hai maata \u263A\uFE0F\u2665\uFE0F';
  function css() {
    if (document.getElementById('ckfxCss')) return;
    var s = document.createElement('style'); s.id = 'ckfxCss';
    s.textContent =
      '#cake .ckfx-cv{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}' +
      '#cake>*:not(.ckfx-cv){position:relative;z-index:1}' +
      '#cake>.sub:not(#ckT){display:none}' +
      '#cake .ckfx-w,#cake #ckT{max-width:310px;font:600 .95rem/1.5 Poppins,sans-serif;color:#fff;opacity:1;' +
      'text-shadow:0 0 6px #fff,0 0 16px #ff7eb6,0 0 30px #ff4fb0,0 0 46px rgba(255,210,122,.6);will-change:opacity;animation:ckPulse 2.4s ease-in-out infinite}' +
      '#cake #ckT{font-size:1.05rem}' +
      '@keyframes ckPulse{0%,100%{opacity:.82}50%{opacity:1}}' +
      '#cake .stats{gap:10px 14px}' +
      '#cake .stats>div{position:relative;overflow:hidden;min-width:128px;padding:8px 12px;border-radius:16px;' +
      'background:linear-gradient(135deg,rgba(255,255,255,.12),rgba(255,126,182,.1));border:1px solid rgba(255,200,230,.45);' +
      'box-shadow:0 0 20px rgba(255,160,200,.4);will-change:translate;animation:ckCard 3.2s ease-in-out infinite}' +
      '#cake .stats>div:nth-child(2){animation-delay:.4s}#cake .stats>div:nth-child(3){animation-delay:.8s}#cake .stats>div:nth-child(4){animation-delay:1.2s}' +
      '@keyframes ckCard{0%,100%{translate:0 0}50%{translate:0 -5px}}' +
      '#cake .stats>div:after{content:"";position:absolute;top:0;bottom:0;left:0;width:40%;translate:-150% 0;' +
      'background:linear-gradient(100deg,transparent,rgba(255,255,255,.35),transparent);will-change:translate;animation:ckSheen 4s ease-in-out infinite}' +
      '#cake .stats>div:nth-child(2):after{animation-delay:.5s}#cake .stats>div:nth-child(3):after{animation-delay:1s}#cake .stats>div:nth-child(4):after{animation-delay:1.5s}' +
      '@keyframes ckSheen{0%{translate:-150% 0}55%,100%{translate:350% 0}}' +
      '#cake .stats b{color:#fff6d8;text-shadow:0 0 10px #ffd27a,0 0 24px #ff7eb6}' +
      '#cake .stats small{color:#ffd9ec;text-shadow:0 0 8px rgba(255,126,182,.8)}' +
      '#cake .cake{will-change:translate;animation:ckBob 3s ease-in-out infinite}' +
      '@keyframes ckBob{0%,100%{translate:0 0}50%{translate:0 -6px}}' +
      '#cake .cake:before{content:"";position:absolute;left:-46px;right:-46px;top:-34px;bottom:-16px;border-radius:50%;z-index:-1;' +
      'background:conic-gradient(rgba(255,126,182,0),rgba(255,126,182,.55),rgba(127,208,255,0),rgba(183,156,255,.55),rgba(255,210,122,.4),rgba(255,126,182,0));' +
      'filter:blur(16px);will-change:transform;animation:ckSpin 8s linear infinite}' +
      '@keyframes ckSpin{to{transform:rotate(360deg)}}' +
      '#cake .t{overflow:hidden;background:linear-gradient(#fff,#fff4fa 70%,#ffe3f1);' +
      'box-shadow:inset 0 -7px 0 rgba(255,150,200,.3),0 0 26px rgba(255,255,255,.55),0 0 50px rgba(255,126,182,.4)}' +
      '#cake .t:before{content:"";position:absolute;left:0;top:40%;height:28%;width:200%;opacity:.9;will-change:translate;' +
      'background:linear-gradient(90deg,#ff7eb6,#b79cff,#7fd0ff,#ffd27a,#ff7eb6,#b79cff,#7fd0ff,#ffd27a,#ff7eb6);animation:ckBand 6s linear infinite}' +
      '@keyframes ckBand{to{translate:-50% 0}}' +
      '#cake .t:after{content:"";position:absolute;inset:0;pointer-events:none;' +
      'background:radial-gradient(circle at 20% 82%,#ff7eb6 2px,transparent 3px),radial-gradient(circle at 50% 88%,#7fd0ff 2px,transparent 3px),' +
      'radial-gradient(circle at 78% 80%,#ffd27a 2px,transparent 3px),radial-gradient(circle at 36% 18%,#b79cff 2px,transparent 3px),radial-gradient(circle at 70% 20%,#ff7eb6 2px,transparent 3px)}' +
      '#cake .fl{box-shadow:0 0 14px #ffc400,0 0 32px rgba(255,170,0,.8)}' +
      '#cake .ckfx-s{position:absolute;pointer-events:none;font-style:normal;line-height:1;will-change:opacity;animation:ckTw 1.9s ease-in-out infinite;text-shadow:0 0 8px currentColor}' +
      '@keyframes ckTw{0%,100%{opacity:.15;scale:.6}50%{opacity:1;scale:1.2}}';
    document.head.appendChild(s);
  }
  function init() {
    var c = document.getElementById('cake');
    if (!c || c.querySelector('.ckfx-cv')) return;
    css();
    var cv = document.createElement('canvas'); cv.className = 'ckfx-cv';
    c.insertBefore(cv, c.firstChild);
    var old = c.querySelector('.sub:not(#ckT)');
    var w1 = document.createElement('div'); w1.className = 'ckfx-w'; w1.textContent = L1;
    if (old) old.parentNode.insertBefore(w1, old); else c.insertBefore(w1, c.querySelector('.stats'));
    var ckT = document.getElementById('ckT');
    function fixT() { if (ckT && ckT.textContent.indexOf('Make a wish') > -1) ckT.textContent = L2; }
    if (ckT) { fixT(); new MutationObserver(fixT).observe(ckT, { childList: true, characterData: true, subtree: true }); }
    var bl = document.getElementById('blow');
    function fixB() {
      if (!bl) return;
      var x = bl.textContent;
      if (x.indexOf('Blow') > -1) bl.textContent = B1; else if (x.indexOf('Memories') > -1) bl.textContent = B2;
    }
    if (bl) { fixB(); new MutationObserver(fixB).observe(bl, { childList: true, characterData: true, subtree: true }); }
    var ck = document.getElementById('ck');
    if (ck) {
      var sp = [[-26, 20, '#ffd27a', 16], [160, 8, '#7fd0ff', 18], [-34, 92, '#ff7eb6', 14], [168, 88, '#b79cff', 16], [62, -34, '#fff', 20], [-10, 140, '#ffd27a', 12], [140, 140, '#ff7eb6', 13]];
      for (var k = 0; k < sp.length; k++) {
        var e = document.createElement('i'); e.className = 'ckfx-s'; e.textContent = '\u2726';
        e.style.cssText = 'left:' + sp[k][0] + 'px;top:' + sp[k][1] + 'px;color:' + sp[k][2] + ';font-size:' + sp[k][3] + 'px;animation-delay:' + (k * 0.3) + 's';
        ck.appendChild(e);
      }
    }
    var ctx = cv.getContext('2d'), W = 0, H = 0, i, last = 0, O = [], C = [], E = [], S = [], SP = [];
    function size() { W = cv.clientWidth || window.innerWidth; H = cv.clientHeight || window.innerHeight; cv.width = W; cv.height = H; }
    size(); window.addEventListener('resize', size);
    var COL = ['255,126,182', '183,156,255', '127,208,255', '255,210,122'], EM = ['\uD83D\uDC96', '\uD83C\uDF88', '\uD83D\uDC95', '\uD83E\uDD0D'];
    for (i = 0; i < 4; i++) {
      var sc = document.createElement('canvas'); sc.width = sc.height = 96; var sx = sc.getContext('2d');
      var gg = sx.createRadialGradient(48, 48, 0, 48, 48, 48);
      gg.addColorStop(0, 'rgba(' + COL[i] + ',.3)'); gg.addColorStop(1, 'rgba(' + COL[i] + ',0)');
      sx.fillStyle = gg; sx.fillRect(0, 0, 96, 96); SP.push(sc);
    }
    for (i = 0; i < 7; i++) O.push({ x: Math.random(), y: Math.random(), r: 40 + Math.random() * 60, c: i % 4, ph: Math.random() * 6, sp: 0.04 + Math.random() * 0.05 });
    for (i = 0; i < 16; i++) C.push({ x: Math.random(), y: Math.random(), v: 24 + Math.random() * 30, a: Math.random() * 6, ra: 1 + Math.random() * 3, c: COL[i % 4], w: 4 + Math.random() * 4 });
    for (i = 0; i < 30; i++) S.push({ x: Math.random(), y: Math.random(), ph: Math.random() * 6, r: 0.6 + Math.random() * 1.2 });
    function frame(ts) {
      requestAnimationFrame(frame);
      if (!c.classList.contains('on') || !cv.clientWidth) return;
      if (ts - last < 33) return;
      if (cv.width !== cv.clientWidth) size();
      var t = ts / 1000, dt = Math.min(0.08, (ts - last) / 1000); last = ts;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (i = 0; i < O.length; i++) {
        var o = O[i], x = (o.x + Math.sin(t * o.sp + o.ph) * 0.12) * W, y = ((o.y - t * o.sp * 0.5) % 1 + 1) % 1 * H;
        ctx.drawImage(SP[o.c], x - o.r, y - o.r, o.r * 2, o.r * 2);
      }
      for (i = 0; i < S.length; i++) {
        var p = S[i];
        ctx.fillStyle = 'rgba(255,235,200,' + ((0.3 + 0.7 * Math.abs(Math.sin(t * 1.4 + p.ph))) * 0.8) + ')';
        ctx.fillRect(p.x * W, p.y * H, p.r * 2, p.r * 2);
      }
      ctx.globalCompositeOperation = 'source-over';
      for (i = 0; i < C.length; i++) {
        var f = C[i]; f.y += f.v * dt / H; f.a += f.ra * dt; if (f.y > 1.03) { f.y = -0.03; f.x = Math.random(); }
        ctx.save(); ctx.translate(f.x * W + Math.sin(t + f.a) * 10, f.y * H); ctx.rotate(f.a);
        ctx.scale(Math.cos(f.a * 2), 1); ctx.fillStyle = 'rgba(' + f.c + ',.75)'; ctx.fillRect(-f.w / 2, -f.w, f.w, f.w * 2); ctx.restore();
      }
      if (Math.random() < 0.06 && E.length < 5) E.push({ x: Math.random() * W, y: H + 20, v: 32 + Math.random() * 32, z: 16 + Math.random() * 14, e: EM[Math.floor(Math.random() * 4)], ph: Math.random() * 6 });
      ctx.globalAlpha = 0.4;
      for (i = E.length - 1; i >= 0; i--) {
        var m = E[i]; m.y -= m.v * dt;
        if (m.y < -30) { E.splice(i, 1); continue; }
        ctx.font = m.z + 'px serif'; ctx.fillText(m.e, m.x + Math.sin(t * 2 + m.ph) * 12, m.y);
      }
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(frame);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
