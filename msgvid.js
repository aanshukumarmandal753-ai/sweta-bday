/* Sweta msg screen: looping lantern video behind everything. Needs bg.mp4 */
(function () {
  'use strict';
  function init() {
    var m = document.getElementById('msg');
    if (!m || m.querySelector('.mfx-vid')) return;
    var s = document.createElement('style');
    s.textContent = '#msg>video.mfx-vid{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;' +
      'opacity:.6;z-index:0;pointer-events:none}';
    document.head.appendChild(s);
    var v = document.createElement('video');
    v.className = 'mfx-vid'; v.src = 'bg.mp4'; v.muted = true; v.loop = true;
    v.setAttribute('playsinline', ''); v.setAttribute('muted', ''); v.preload = 'auto';
    m.insertBefore(v, m.firstChild);
    function tick() {
      requestAnimationFrame(tick);
      var on = m.classList.contains('on');
      if (on && v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else if (!on && !v.paused) v.pause();
    }
    requestAnimationFrame(tick);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
