/* Sweta site: lag fix (30fps cap, lighter canvas, paused hidden animations) + gift screen text */
(function () {
  'use strict';
  try {
    var d0 = window.devicePixelRatio || 1;
    if (d0 > 1.25) Object.defineProperty(window, 'devicePixelRatio', { get: function () { return 1.25; }, configurable: true });
  } catch (e) {}
  try {
    var raf = window.requestAnimationFrame.bind(window), q = {}, n = 0, sch = false, lt = 0, av = 0;
    var tick = function (ts) {
      sch = false;
      if (ts - lt < 30) { sch = true; raf(tick); return; }
      lt = ts; var c = q; q = {};
      for (var k in c) { try { if (c[k].name === 'animVis' && (av++ & 1)) { window.requestAnimationFrame(c[k]); continue; } c[k](ts); } catch (e) {} }
      if (!sch) { for (var j in q) { sch = true; raf(tick); break; } }
    };
    window.requestAnimationFrame = function (cb) {
      var id = ++n; q[id] = cb;
      if (!sch) { sch = true; raf(tick); }
      return id;
    };
    window.cancelAnimationFrame = function (id) { delete q[id]; };
  } catch (e) {}
  var st = document.createElement('style');
  st.textContent = '.screen:not(.on) *,.screen:not(.on) *:before,.screen:not(.on) *:after{animation-play-state:paused!important}*{-webkit-backdrop-filter:none!important;backdrop-filter:none!important}section.screen{transition:opacity .4s}';
  (document.head || document.documentElement).appendChild(st);

  var TOP = 'Meri cute si bubu ji mai ne ye tumhare liye apne Dil aur dimag se banaya hai☺️🫂 kaisa laga batana 🤭 love you my baby 🍼🍼';
  var BOT = 'Es pe touch karo 🤓🎈';
  function norm(s) { return (s || '').replace(/\s+/g, ' ').trim(); }
  function fix() {
    var root = document.getElementById('gift') || document.body;
    if (!root) return;
    var els = root.querySelectorAll('h1,h2,h3,p,div,span');
    for (var i = 0; i < els.length; i++) {
      var e = els[i], t = norm(e.textContent);
      if (e.children.length > 0 && !(e.children.length === 1 && e.children[0].tagName === 'BR')) continue;
      if (t === 'A surprise awaits you... ✨') {
        e.textContent = TOP;
        e.style.cssText += ';font-size:1.05rem;line-height:1.5;padding:0 18px;max-width:92%;margin-left:auto;margin-right:auto;text-align:center';
      } else if (t === 'Something special just for you') {
        e.style.display = 'none';
      } else if (t === 'Tap the gift to open 🎁') {
        e.textContent = BOT;
      }
    }
  }
  function go() { fix(); setTimeout(fix, 600); setTimeout(fix, 2000); }
  document.addEventListener('DOMContentLoaded', function () {
    try {
      if (typeof window.go === 'function') window.go = function (id) {
        var a = document.querySelectorAll('.screen'), i, e = document.getElementById(id);
        for (i = 0; i < a.length; i++) a[i].classList.remove('on');
        if (e) e.classList.add('on');
      };
    } catch (e) {}
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
