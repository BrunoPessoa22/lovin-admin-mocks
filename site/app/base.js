/* Shared runtime for the app mocks: tab routing, the report sheet, the gallery's remote control,
   the phone frame on desktop, Lucide icons. Each direction renders its own markup. */
(function () {
  'use strict';
  var TABS = ['live', 'news', 'whatson', 'ejja', 'you'];
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function icons() { if (window.lucide) window.lucide.createIcons(); }
  function show(tab) {
    if (TABS.indexOf(tab) < 0) tab = 'live';
    document.querySelectorAll('[data-screen]').forEach(function (el) { el.hidden = el.getAttribute('data-screen') !== tab; if (!el.hidden) el.scrollTop = 0; });
    document.querySelectorAll('[data-tab]').forEach(function (el) { var on = el.getAttribute('data-tab') === tab; el.setAttribute('aria-selected', on ? 'true' : 'false'); el.setAttribute('data-selected', on ? 'true' : 'false'); });
    document.body.setAttribute('data-current', tab);
    icons();
  }
  function sheet(open) { var s = document.getElementById('sheet'); if (!s) return; s.hidden = !open; document.body.classList.toggle('sheet-open', !!open); icons(); }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-tab]'); if (t) { e.preventDefault(); show(t.getAttribute('data-tab')); return; }
    if (e.target.closest('[data-open-sheet]')) { e.preventDefault(); sheet(true); return; }
    if (e.target.closest('[data-close-sheet]') || e.target.id === 'sheet-backdrop') { e.preventDefault(); sheet(false); return; }
    var seg = e.target.closest('[data-seg]');
    if (seg) { seg.parentNode.querySelectorAll('[data-seg]').forEach(function (x) { x.setAttribute('data-selected', x === seg ? 'true' : 'false'); x.setAttribute('aria-selected', x === seg ? 'true' : 'false'); }); return; }
    var chip = e.target.closest('[data-chip]');
    if (chip) { chip.parentNode.querySelectorAll('[data-chip]').forEach(function (x) { x.setAttribute('data-selected', x === chip ? 'true' : 'false'); }); return; }
    var like = e.target.closest('[data-like]');
    if (like) { var on = like.getAttribute('data-selected') === 'true'; like.setAttribute('data-selected', on ? 'false' : 'true'); return; }
  });
  window.addEventListener('message', function (e) { var d = e.data || {}; if (d.lmTab) show(d.lmTab); if (d.lmSheet != null) sheet(!!d.lmSheet); if (d.lmTheme) document.documentElement.setAttribute('data-theme', d.lmTheme); });
  window.LMBase = { esc: esc, show: show, sheet: sheet, icons: icons, TABS: TABS,
    boot: function (render) { render(); var h = (location.hash || '').replace('#', ''); show(h || 'live'); icons(); } };
})();
