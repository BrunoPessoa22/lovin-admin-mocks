/* Mock 2: HeroUI v3 skin. The primitives use HeroUI's own compiled stylesheet
   (@heroui/styles 3.2.4: .button, .card, .chip, .table-root, .tabs, .input, .switch,
   .checkbox, .avatar, .alert, .pagination, .kbd) and its theme tokens (background,
   surface, default, accent, muted, separator) through the Tailwind theme bridge. */
(function () {
  'use strict';
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var icon = function (name, cls) { return '<i data-lucide="' + name + '" class="shrink-0 ' + (cls || 'size-4') + '" aria-hidden="true"></i>'; };
  var TONE = { default: 'default', accent: 'accent', info: 'accent', success: 'success', warning: 'warning', danger: 'danger' };
  var DOT = { default: 'bg-muted', accent: 'bg-accent', info: 'bg-accent', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger' };

  var UI = {};
  UI.cls = {
    muted: 'text-sm text-muted',
    row: 'flex flex-wrap items-center gap-2',
    plainList: 'flex flex-col',
    queueList: 'flex flex-col gap-2 p-2',
    actions: 'flex justify-end items-center gap-1',
    danger: 'text-danger-soft-foreground',
    switchList: 'flex flex-col divide-y divide-separator'
  };
  UI.icon = icon;

  UI.button = function (o) {
    var v = o.variant || 'secondary';
    var map = { primary: 'button--primary', secondary: 'button--tertiary', ghost: 'button--ghost', soft: 'button--secondary', danger: o.soft ? 'button--danger-soft' : 'button--danger', dangerSoft: 'button--danger-soft' };
    var cls = 'button ' + (map[v] || 'button--tertiary') + (o.size === 'sm' ? ' button--sm' : '');
    var ic = o.icon ? icon(o.icon) : '';
    var badge = o.badge ? '<span class="badge badge--primary badge--danger badge--sm ms-1"><span class="badge__label">' + o.badge + '</span></span>' : '';
    return '<button type="button" class="' + cls + '" ' + (o.attrs || '') + '>' + (o.iconRight ? '' : ic) + esc(o.label) + badge + (o.iconRight ? ic : '') + '</button>';
  };
  UI.iconButton = function (o) { return '<button type="button" class="button button--ghost button--sm button--icon-only" aria-label="' + esc(o.label) + '" title="' + esc(o.label) + '" ' + (o.attrs || '') + '>' + icon(o.icon) + '</button>'; };
  UI.chip = function (o) {
    var t = TONE[o.tone] || 'default';
    return '<span class="chip chip--soft chip--' + t + ' whitespace-nowrap">' + (o.dot ? '<span class="size-1.5 rounded-full ms-1 ' + DOT[o.tone] + '"></span>' : '') + (o.icon ? icon(o.icon, 'size-3 ms-1') : '') + '<span class="chip__label">' + esc(o.label) + (o.count != null ? ' <span class="opacity-60 tabular-nums">' + o.count + '</span>' : '') + '</span></span>';
  };
  UI.count = function (n) { return '<span class="chip chip--primary chip--accent ms-2 tabular-nums"><span class="chip__label">' + n + '</span></span>'; };
  UI.mono = function (t) { return '<span class="font-mono text-xs text-muted">' + esc(t) + '</span>'; };
  UI.num = function (t) { return '<span class="tabular-nums">' + esc(t) + '</span>'; };

  UI.stat = function (o) {
    return '<div class="card card--default group hover:bg-surface-hover transition-colors"><a href="' + o.href + '" class="flex flex-col gap-3 outline-none"><span class="flex items-start justify-between"><span class="text-3xl font-semibold tabular-nums tracking-tight ' + (o.value ? 'text-foreground' : 'text-muted') + '">' + esc(o.value) + '</span><span class="size-7 rounded-2xl bg-default flex items-center justify-center text-muted group-hover:text-accent">' + icon('arrow-up-right', 'size-3.5') + '</span></span><span class="text-sm text-muted leading-5">' + esc(o.label) + '</span></a>' + (o.sub ? '<span class="flex flex-wrap gap-x-3 text-xs font-medium text-accent-soft-foreground [&_a:hover]:underline">' + o.sub + '</span>' : '') + '</div>';
  };
  UI.plainStat = function (o) { return '<div class="flex flex-col py-1 pe-3"><span class="text-xl font-semibold tabular-nums tracking-tight">' + esc(o.value) + '</span><span class="text-xs text-muted">' + esc(o.label) + '</span></div>'; };
  UI.kv = function (rows, opt) {
    var tones = (opt && opt.tones) || {};
    return '<dl class="flex flex-col divide-y divide-separator">' + rows.map(function (r) {
      var v = tones[String(r[1]).toLowerCase()] ? UI.chip({ label: r[1], tone: tones[String(r[1]).toLowerCase()], dot: true }) : '<span class="font-medium text-end">' + esc(r[1]) + '</span>';
      return '<div class="flex justify-between gap-4 py-2 text-sm"><dt class="text-muted">' + esc(r[0]) + '</dt><dd>' + v + '</dd></div>';
    }).join('') + '</dl>';
  };
  UI.workRow = function (at, action, target, extra) {
    return '<li><a href="#" class="flex items-baseline gap-3 py-2 px-2 -mx-2 rounded-2xl hover:bg-default text-sm"><span class="font-mono text-xs text-muted whitespace-nowrap">' + esc(at) + '</span><span class="font-medium">' + esc(action) + '</span><span class="ms-auto text-end text-muted truncate">' + esc(target) + '</span>' + (extra || '') + '</a></li>';
  };

  UI.tabs = function (o) {
    var sec = o.variant === 'line';
    return '<div class="tabs' + (sec ? ' tabs--secondary' : '') + ' w-fit max-w-full" data-orientation="horizontal" ' + (o.attrs || '') + '><div class="tabs__list-container overflow-x-auto"><div class="tabs__list" data-orientation="horizontal" role="tablist">' + o.items.map(function (t) {
      var key = t.key || t.label;
      return '<button type="button" role="tab" class="tabs__tab" data-tab-key="' + esc(key) + '" ' + (t.key ? 'data-key="' + t.key + '"' : '') + ' data-selected="' + !!t.active + '" aria-selected="' + !!t.active + '"><span class="tabs__separator"></span>' + esc(t.label) + (t.count != null ? '<span class="chip chip--soft chip--default chip--sm ms-1.5 tabular-nums"><span class="chip__label">' + t.count + '</span></span>' : '') + '</button>';
    }).join('') + '</div></div></div>';
  };
  UI.segmented = function (items) {
    return '<div class="tabs w-fit" data-orientation="horizontal"><div class="tabs__list-container"><div class="tabs__list" data-orientation="horizontal" role="group">' + items.map(function (t) {
      return '<button type="button" class="tabs__tab" data-filter-chip data-selected="' + !!t.active + '" aria-pressed="' + !!t.active + '">' + (t.icon ? icon(t.icon, 'size-3.5 me-1.5') : '') + esc(t.label) + '</button>';
    }).join('') + '</div></div></div>';
  };
  UI.filterChips = function (items, attrs) {
    return '<div class="flex flex-wrap gap-1.5" ' + (attrs || '') + '>' + items.map(function (t) {
      return '<button type="button" class="toggle-button toggle-button--default toggle-button--sm lm-toggle" data-filter-chip ' + (t.key ? 'data-key="' + t.key + '"' : '') + ' data-selected="' + !!t.active + '" aria-pressed="' + !!t.active + '">' + (t.icon ? icon(t.icon, 'size-3.5') : '') + esc(t.label) + (t.count != null ? '<span class="tabular-nums opacity-60 text-xs">' + t.count + '</span>' : '') + '</button>';
    }).join('') + '</div>';
  };
  UI.bars = function (o) {
    var max = Math.max.apply(null, o.values) || 1;
    return '<div class="flex items-end gap-1.5 h-32 mt-2">' + o.values.map(function (v, i) {
      var h = Math.max(4, Math.round(v / max * 100));
      return '<div class="flex-1 rounded-t-lg rounded-b-sm ' + (i === o.values.length - 1 ? 'bg-accent' : 'bg-accent/60 hover:bg-accent') + ' transition-colors" style="height:' + h + '%" title="' + v + '"></div>';
    }).join('') + '</div><div class="flex justify-between mt-2 font-mono text-[11px] text-muted"><span>' + esc(o.labels[0]) + '</span><span>' + esc(o.labels[1]) + '</span></div>';
  };

  UI.table = function (o) {
    var cb = function (checked) { return '<button type="button" role="checkbox" class="checkbox" data-checkbox aria-checked="' + !!checked + '" data-selected="' + !!checked + '"><span class="checkbox__control"><span class="checkbox__indicator">' + icon('check', 'size-3') + '</span></span></button>'; };
    var th = function (c) {
      var al = c.align === 'right' ? 'text-end' : '';
      return '<th class="table__column ' + al + ' whitespace-nowrap" ' + (c.sortable ? 'data-allows-sorting="true"' : '') + '><span class="table__sortable-column-header ' + (c.align === 'right' ? 'justify-end' : '') + ' gap-1">' + esc(c.label) + (c.sortable ? '<span class="table__sortable-column-indicator ' + (c.active ? 'text-accent' : 'opacity-50') + '">' + icon(c.active === 'desc' ? 'chevron-down' : 'chevrons-up-down', 'size-3') + '</span>' : '') + '</span></th>';
    };
    var head = '<thead class="table__header"><tr>' + (o.selectable ? '<th class="table__column w-10">' + cb(false) + '</th>' : '') + o.columns.map(th).join('') + '</tr></thead>';
    var body = '<tbody class="table__body">' + o.rows.map(function (r, i) {
      var ra = o.rowAttrs ? o.rowAttrs(i) : '';
      var sel = /data-selected="true"/.test(ra);
      return '<tr class="table__row' + (/data-member/.test(ra) ? ' cursor-pointer' : '') + '" ' + ra + '>' + (o.selectable ? '<td class="table__cell w-10">' + cb(sel) + '</td>' : '') +
        r.map(function (cell, j) { var c = o.columns[j] || {}; return '<td class="table__cell ' + (c.align === 'right' ? 'text-end' : '') + (c.mono ? ' whitespace-nowrap' : '') + '">' + cell + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody>';
    return '<div class="table-root table-root--primary" ' + (o.attrs || '') + '><div class="table__scroll-container"><table class="table__content">' + head + body + '</table></div>' + (o.footer ? '<div class="table__footer flex-wrap justify-between gap-3 text-sm">' + o.footer + '</div>' : '') + '</div>';
  };
  UI.inlineForm = function (o) { return '<div class="flex gap-2 max-w-xl"><input type="text" class="input input--full-width" placeholder="' + esc(o.placeholder) + '">' + UI.button({ label: o.button, variant: 'secondary', size: 'sm' }) + '</div>'; };
  UI.stack = function (arr) { return '<div class="flex flex-col gap-5">' + arr.join('') + '</div>'; };
  UI.grid = function (html, kind) {
    var g = { stats: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4', plain: 'flex flex-wrap gap-x-8 gap-y-2 px-1', two: 'grid grid-cols-1 lg:grid-cols-2 gap-5', three: 'grid grid-cols-1 md:grid-cols-3 gap-4' }[kind] || 'grid gap-4';
    return '<div class="' + g + '">' + html + '</div>';
  };
  UI.sectionHeader = function (o) {
    return '<div class="flex flex-wrap items-end justify-between gap-3 px-1"><div>' + (o.eyebrow ? '<p class="text-xs font-medium text-accent-soft-foreground">' + esc(o.eyebrow) + '</p>' : '') +
      '<h1 class="text-2xl font-semibold tracking-tight inline-flex items-center">' + esc(o.title) + (o.count != null ? UI.count(o.count) : '') + '</h1>' + (o.meta ? '<p class="mt-1 text-sm text-muted">' + esc(o.meta) + '</p>' : '') + '</div>' +
      (o.actions ? '<div class="flex flex-wrap items-center gap-2">' + o.actions + '</div>' : '') + '</div>';
  };
  UI.card = function (o) {
    var head = (o.title || o.actions) ? '<div class="card__header flex-row flex-wrap items-center justify-between gap-3 ' + (o.flush ? 'px-4 pt-4' : '') + '"><div class="flex items-center gap-2"><h2 class="text-base font-semibold">' + esc(o.title || '') + '</h2>' + (o.count != null ? UI.count(o.count) : '') + (o.chip || '') + (o.meta ? '<span class="text-xs text-muted">' + esc(o.meta) + '</span>' : '') + '</div>' + (o.actions ? '<div class="flex flex-wrap items-center gap-2">' + o.actions + '</div>' : '') + '</div>' : '';
    var desc = o.description ? '<p class="card__description ' + (o.flush ? 'px-4' : '') + '">' + esc(o.description) + '</p>' : '';
    return '<div class="card card--default ' + (o.flush ? 'p-1 gap-2' : '') + '" ' + (o.attrs || '') + '>' + head + desc + '<div class="card__content ' + (o.flush ? 'gap-2 [&>.flex-wrap]:px-3 [&>.flex-wrap]:pt-2 [&>.flex-wrap.items-end]:pb-1 [&>details]:px-3 [&>details]:py-2' : 'gap-4') + '">' + o.body + '</div>' + (o.footer ? '<div class="card__footer text-sm ' + (o.flush ? 'px-4 pb-3' : 'pt-2 border-t border-separator') + '">' + o.footer + '</div>' : '') + '</div>';
  };
  UI.empty = function (text, attrs) { return '<p class="px-4 py-4 text-sm text-muted" ' + (attrs || '') + '>' + esc(text) + '</p>'; };
  UI.queueItem = function (it) {
    return '<details data-kind="' + it.kind + '" ' + (it.open ? 'open' : '') + ' class="group rounded-3xl bg-surface-secondary open:bg-surface-secondary hover:bg-surface-tertiary open:hover:bg-surface-secondary transition-colors"><summary class="list-none cursor-pointer grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-3 gap-y-1 px-4 py-3 [&::-webkit-details-marker]:hidden">' +
      UI.chip({ label: it.kindLabel, tone: it.tone, icon: it.icon }) + '<span class="font-medium text-sm truncate">' + esc(it.title) + '</span><span class="font-mono text-xs text-muted whitespace-nowrap">' + esc(it.age) + '</span>' + icon('chevron-down', 'size-4 text-muted group-open:rotate-180 transition') + '</summary>' +
      '<div class="px-4 pb-4 pt-1 flex flex-col gap-3"><div class="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">' + it.meta.map(function (m) { return '<span>' + esc(m[0]) + ' <b class="font-medium text-foreground">' + esc(m[1]) + '</b></span>'; }).join('') + '</div>' +
      '<div class="alert alert--default"><span class="alert__indicator">' + icon('info', 'size-4') + '</span><div class="alert__content"><p class="alert__description text-foreground">' + esc(it.hint) + '</p></div></div><div class="flex flex-wrap items-center gap-2">' + it.actions.map(function (a, i) { return UI.button({ label: a, variant: i === 0 ? 'primary' : (/reject/i.test(a) ? 'dangerSoft' : 'secondary'), size: 'sm', icon: i === 0 ? 'check' : (/reject/i.test(a) ? 'x' : (/hold|held/i.test(a) ? 'pause' : '')) }); }).join('') + '<span class="text-xs text-muted">Every decision lands in the audit log.</span></div></div></details>';
  };
  UI.formRow = function (fields) { return '<div class="flex flex-wrap items-end gap-3">' + fields.join('') + '</div>'; };
  UI.input = function (o) {
    var id = 'f' + Math.random().toString(36).slice(2, 7);
    return '<div class="flex flex-col gap-1 min-w-40 ' + (o.grow ? 'flex-[' + o.grow + '_1_16rem]' : 'flex-1') + '"><label for="' + id + '" class="label">' + esc(o.label) + '</label><div class="relative">' + (o.icon ? '<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-field-placeholder">' + icon(o.icon, 'size-4') + '</div>' : '') +
      '<input id="' + id + '" type="' + (o.type || 'text') + '" placeholder="' + esc(o.placeholder || '') + '" class="input input--full-width text-sm ' + (o.icon ? 'ps-9 ' : '') + (o.mono ? 'font-mono ' : '') + '" ' + (o.attrs || '') + '></div></div>';
  };
  UI.select = function (o) {
    return '<div class="flex flex-col gap-1 flex-1 min-w-40"><label class="label">' + esc(o.label) + '</label><div class="relative"><select class="input input--full-width appearance-none text-sm pe-9">' + o.options.map(function (x) { return '<option>' + esc(x) + '</option>'; }).join('') + '</select><div class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-field-placeholder">' + icon('chevron-down', 'size-4') + '</div></div></div>';
  };
  UI.buttonSlot = function (html) { return '<div class="flex flex-col gap-1"><span class="text-sm">&nbsp;</span>' + html + '</div>'; };
  UI.person = function (o) {
    var name = o.href ? '<a href="' + o.href + '" class="font-medium hover:text-accent-soft-foreground hover:underline">' + esc(o.name) + '</a>' : '<span class="font-medium">' + esc(o.name) + '</span>';
    return '<div class="flex flex-col leading-tight">' + name + '<span class="text-xs text-muted">' + (o.raw ? o.sub : esc(o.sub)) + '</span></div>';
  };
  UI.avatar = function (o) { return '<span class="avatar avatar--soft ' + (o.size === 'lg' ? 'avatar--lg' : 'avatar--sm') + '"><span class="avatar__fallback avatar__fallback--accent">' + esc(o.initials) + '</span></span>'; };
  UI.profileHeader = function (o) {
    return '<div class="flex flex-col gap-3"><a href="' + o.back.href + '" class="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground w-fit px-1">' + icon('arrow-left', 'size-4') + esc(o.back.label) + '</a>' +
      '<div class="card card--default flex-row flex-wrap items-center gap-4">' + (o.avatar || '') + '<div class="flex flex-col gap-1 min-w-0 flex-1"><div class="flex flex-wrap items-center gap-2"><h1 class="text-xl font-semibold tracking-tight">' + esc(o.title) + '</h1>' + (o.chips || '') + '</div><p class="text-sm text-muted">' + o.sub + '</p></div><div class="flex flex-wrap gap-2">' + (o.actions || '') + '</div></div></div>';
  };
  UI.photoStrip = function (n) { var s = ''; for (var i = 0; i < n; i++) s += '<div class="aspect-[4/3] rounded-2xl bg-default flex items-center justify-center text-muted">' + icon('image', 'size-5') + '</div>'; return '<div class="grid grid-cols-5 gap-2 mt-2">' + s + '</div>'; };
  UI.disclosure = function (o) { return '<details class="disclosure group"><summary class="disclosure__trigger list-none inline-flex items-center gap-2 text-sm font-medium text-accent-soft-foreground [&::-webkit-details-marker]:hidden">' + icon('chevron-right', 'size-4 group-open:rotate-90 transition') + esc(o.summary) + '</summary><div class="pt-3">' + o.body + '</div></details>'; };
  UI.alert = function (o) { return '<div class="alert alert--' + (TONE[o.tone] || 'default') + ' bg-surface-secondary shadow-none" role="alert"><span class="alert__indicator">' + icon('alert-triangle', 'size-4') + '</span><div class="alert__content"><p class="alert__title">' + esc(o.title) + '</p><p class="alert__description">' + esc(o.text) + '</p></div></div>'; };
  UI.pagination = function (o) {
    var l = function (label, active, dis, nav) { return '<span class="pagination__item"><button type="button" class="pagination__link' + (nav ? ' pagination__link--nav' : '') + '" ' + (active ? 'data-active="true"' : '') + (dis ? ' disabled' : '') + '>' + label + '</button></span>'; };
    return '<nav class="pagination"><div class="pagination__summary">' + esc(o.summary) + '</div><div class="pagination__content">' + l(icon('chevron-left', 'size-4') + 'Previous', false, true, true) + l(String(o.page), true) + l('2') + l('3') + '<span class="pagination__ellipsis">...</span>' + l(String(o.pages)) + l('Next' + icon('chevron-right', 'size-4'), false, false, true) + '</div></nav>';
  };
  UI.switchRow = function (o) {
    return '<div class="flex items-center justify-between gap-4 py-3"><div><p class="text-sm font-medium">' + esc(o.label) + '</p><p class="description">' + esc(o.description) + '</p></div><button type="button" role="switch" class="switch" data-switch aria-checked="' + !!o.checked + '" data-selected="' + !!o.checked + '"><span class="switch__control"><span class="switch__thumb"></span></span></button></div>';
  };
  UI.column = function (title, items) {
    return '<div class="flex flex-col gap-2"><div class="flex justify-between text-sm"><span class="font-semibold">' + esc(title) + '</span><span class="text-muted tabular-nums">' + items.length + '</span></div>' + (items.length ? '<ul class="flex flex-col gap-2">' + items.map(function (t) { var m = t.match(/^(LM-\d+)\s(.*)$/); return '<li class="text-sm text-muted bg-surface-secondary rounded-2xl px-3 py-2"><span class="font-mono text-xs text-foreground me-1">' + esc(m ? m[1] : '') + '</span>' + esc(m ? m[2] : t) + '</li>'; }).join('') + '</ul>' : '<p class="text-sm text-muted">none</p>') + '</div>';
  };

  UI.shell = function (o) {
    var M = window.MOCK;
    var navHtml = o.nav.map(function (n) {
      return '<a href="#section=' + n.key + '" data-nav="' + n.key + '" class="flex items-center gap-3 h-9 px-3 text-sm font-medium rounded-3xl text-foreground hover:bg-default aria-[current=page]:bg-accent-soft aria-[current=page]:text-accent-soft-foreground transition-colors">' + icon(n.icon, 'size-4') + '<span class="truncate">' + esc(n.label) + '</span>' + (n.badge ? '<span class="badge badge--primary badge--accent badge--sm ms-auto tabular-nums"><span class="badge__label">' + n.badge + '</span></span>' : '') + '</a>';
    }).join('');
    var panels = o.panels.map(function (p) { return '<section data-section-panel="' + p.key + '" hidden>' + p.html + '</section>'; }).join('');
    document.body.innerHTML =
      '<div class="min-h-screen flex flex-col bg-background text-foreground">' +
      '<div class="bg-background-inverse text-background text-xs"><div class="max-w-[1400px] mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2"><span><b>' + esc(M.label) + '</b> ' + esc(M.tagline) + '</span><span class="flex items-center gap-3"><span class="opacity-70">Accent</span><span class="inline-flex rounded-2xl border border-current/20 p-0.5">' +
        '<button type="button" data-accent-option="default" class="px-2 py-0.5 rounded-xl aria-pressed:bg-background aria-pressed:text-foreground">Library default</button><button type="button" data-accent-option="lovin" class="px-2 py-0.5 rounded-xl aria-pressed:bg-background aria-pressed:text-foreground">Lovin red</button></span>' +
        '<a href="' + M.other.url + '" class="inline-flex items-center gap-1 underline underline-offset-2 hover:no-underline">Compare with ' + esc(M.other.label) + ' ' + icon('arrow-right', 'size-3') + '</a></span></div></div>' +
      '<header class="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-separator"><div class="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">' +
        '<span class="text-base font-bold tracking-tight">Lovin <span class="text-accent">admin</span></span>' +
        '<div class="flex items-center gap-2"><button type="button" id="search-open" class="hidden sm:inline-flex items-center gap-2 h-9 ps-3 pe-1.5 w-72 rounded-3xl bg-default text-sm text-muted hover:bg-default-hover">' + icon('search', 'size-4') + '<span class="flex-1 text-start truncate">Search users, reports, listings</span><kbd class="kbd h-6 text-xs"><span>Ctrl</span><span>K</span></kbd></button>' +
        '<button type="button" id="theme-toggle" class="button button--ghost button--sm button--icon-only" aria-label="Toggle dark mode">' + icon('moon') + '</button>' +
        '<button type="button" class="button button--ghost button--sm button--icon-only" aria-label="Notifications">' + icon('bell') + '</button>' +
        '<button type="button" class="inline-flex items-center gap-2 h-9 ps-1 pe-3 rounded-3xl hover:bg-default">' + UI.avatar({ initials: o.admin.initials }) + '<span class="hidden md:block text-sm font-medium">' + esc(o.admin.name) + '</span>' + icon('chevron-down', 'size-3.5 text-muted') + '</button></div></div></header>' +
      '<div class="max-w-[1400px] w-full mx-auto px-4 sm:px-6 flex-1 flex flex-col lg:flex-row gap-6 py-6">' +
        '<aside class="lg:w-60 shrink-0 lg:sticky lg:top-20 self-start"><nav class="flex lg:flex-col gap-1 overflow-x-auto" aria-label="Admin sections">' + navHtml + '</nav><p class="hidden lg:block mt-6 px-3 text-xs text-muted">Lovin Malta · ' + esc(o.version) + '</p></aside>' +
        '<main class="flex-1 min-w-0" id="main">' + panels + '</main></div>' +
      '<div id="palette" hidden class="fixed inset-0 z-50 bg-backdrop flex items-start justify-center p-4 pt-[12vh]"><div class="w-full max-w-xl bg-overlay rounded-3xl shadow-overlay overflow-hidden" role="dialog" aria-label="Search the admin"><div class="flex items-center gap-2 px-4 py-3 border-b border-separator">' + icon('search', 'size-4 text-muted') + '<input type="text" class="flex-1 bg-transparent text-base outline-none placeholder:text-muted" placeholder="Search users, reports, listings, intelligence, venues, drafts"><button type="button" id="palette-close" class="kbd kbd--light">Esc</button></div>' +
        '<div class="max-h-[50vh] overflow-y-auto p-2">' + [['Users', [['Maria Camilleri', 'Trusted · 42 reports'], ['Matthew Attard', 'Regular · 9 reports']]], ['Review centre', [['Power cut, Tower Road, Sliema', 'Held · 31 min']]], ['Marketplace', [['Two-bedroom apartment, Gzira', 'Pending · Lovin Properties']]], ['Malta Intelligence', [['pa-planning', 'failing · 6 failures']]]].map(function (g) { return '<div class="pt-2"><p class="px-2 pb-1 text-xs font-medium text-muted">' + g[0] + '</p>' + g[1].map(function (h) { return '<a href="#" class="flex justify-between items-baseline gap-3 px-3 py-2 rounded-2xl hover:bg-default text-sm"><span class="font-medium">' + esc(h[0]) + '</span><span class="text-xs text-muted">' + esc(h[1]) + '</span></a>'; }).join('') + '</div>'; }).join('') + '</div></div></div></div>';
  };

  window.UI = UI;
})();
