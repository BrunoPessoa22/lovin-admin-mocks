/* Mock 1: Preline UI skin, modelled on Preline's own admin dashboard template
   (blocks/application-pages/admin-dashboard-pages: fixed 260 px sidebar, bordered search in
   the top bar, uppercase stat labels, avatars and rounded-full status badges in tables, a
   "N results" footer with Prev/Next). Class strings are Preline's; the theme tokens are
   Preline's semantic layer/surface/muted/primary set. */
(function () {
  'use strict';
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var icon = function (name, cls) { return '<i data-lucide="' + name + '" class="shrink-0 ' + (cls || 'size-4') + '" aria-hidden="true"></i>'; };

  var TONES = {
    default: { chip: 'bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200', dot: 'bg-gray-500 dark:bg-neutral-400', icon: 'circle' },
    accent: { chip: 'bg-primary-100 text-primary-800 dark:bg-primary-500/10 dark:text-primary-400', dot: 'bg-primary-600 dark:bg-primary-400', icon: 'badge-check' },
    info: { chip: 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400', dot: 'bg-blue-600 dark:bg-blue-400', icon: 'shield-check' },
    success: { chip: 'bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500', dot: 'bg-teal-600 dark:bg-teal-500', icon: 'circle-check' },
    warning: { chip: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500', dot: 'bg-yellow-600 dark:bg-yellow-500', icon: 'triangle-alert' },
    danger: { chip: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500', dot: 'bg-red-600 dark:bg-red-500', icon: 'circle-x' }
  };
  var BTN = {
    base: 'inline-flex items-center gap-x-2 font-medium rounded-lg border focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
    md: 'py-2 px-3 text-sm', sm: 'py-1.5 px-2.5 text-sm',
    primary: 'border-transparent bg-primary text-primary-foreground hover:bg-primary-hover focus:bg-primary-focus',
    secondary: 'bg-layer border-layer-line text-layer-foreground shadow-2xs hover:bg-layer-hover focus:bg-layer-focus',
    ghost: 'border-transparent text-primary hover:bg-primary-100 hover:text-primary-800 focus:bg-primary-100 dark:hover:bg-primary-500/10 dark:hover:text-primary-400',
    soft: 'border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200 dark:bg-primary-500/10 dark:text-primary-400',
    danger: 'border-transparent bg-red-600 text-white hover:bg-red-700',
    dangerSoft: 'border-transparent bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-500/10 dark:text-red-500'
  };

  var UI = {};
  UI.cls = {
    muted: 'text-sm text-muted-foreground-1',
    row: 'flex flex-wrap items-center gap-2',
    plainList: 'divide-y divide-layer-line',
    queueList: 'divide-y divide-layer-line',
    actions: 'flex justify-end items-center gap-x-1',
    danger: 'text-red-600 dark:text-red-500',
    switchList: 'divide-y divide-layer-line'
  };
  UI.icon = icon;

  UI.button = function (o) {
    var v = o.variant || 'secondary';
    if (v === 'danger' && o.soft) v = 'dangerSoft';
    var cls = [BTN.base, BTN[o.size || 'md'], BTN[v] || BTN.secondary].join(' ');
    var badge = o.badge ? '<span class="inline-flex items-center justify-center size-5 rounded-full text-xs font-medium bg-red-600 text-white">' + o.badge + '</span>' : '';
    var ic = o.icon ? icon(o.icon, 'size-4') : '';
    return '<button type="button" class="' + cls + '" ' + (o.attrs || '') + '>' + (o.iconRight ? '' : ic) + esc(o.label) + badge + (o.iconRight ? ic : '') + '</button>';
  };
  UI.iconButton = function (o) {
    return '<button type="button" class="size-8 inline-flex justify-center items-center rounded-lg border border-transparent text-muted-foreground-1 hover:bg-muted-hover hover:text-foreground focus:outline-hidden" aria-label="' + esc(o.label) + '" title="' + esc(o.label) + '" ' + (o.attrs || '') + '>' + icon(o.icon, 'size-4') + '</button>';
  };
  UI.chip = function (o) {
    var t = TONES[o.tone] || TONES.default;
    var lead = o.icon ? icon(o.icon, 'size-3') : (o.dot ? icon(t.icon, 'size-3') : '');
    return '<span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full whitespace-nowrap ' + t.chip + '">' + lead + esc(o.label) + (o.count != null ? '<span class="opacity-70">' + o.count + '</span>' : '') + '</span>';
  };
  UI.count = function (n) { return '<span class="ms-2 py-0.5 px-2 inline-flex items-center rounded-full text-xs font-medium bg-surface text-foreground tabular-nums">' + n + '</span>'; };
  UI.mono = function (t) { return '<span class="text-sm text-muted-foreground-1 tabular-nums">' + esc(t) + '</span>'; };
  UI.num = function (t) { return '<span class="tabular-nums">' + esc(t) + '</span>'; };

  UI.stat = function (o) {
    var d = o.delta;
    var trend = d ? '<span class="inline-flex items-center gap-x-1 text-xs font-medium ' + ({ success: 'text-teal-600 dark:text-teal-500', danger: 'text-red-600 dark:text-red-500', warning: 'text-yellow-600 dark:text-yellow-500' }[d.tone] || 'text-muted-foreground-1') + '">' + (d.dir ? icon(d.dir === 'up' ? 'trending-up' : 'trending-down', 'size-3.5') : '') + esc(d.text) + '</span>' : '';
    return '<div class="p-4 md:p-5 flex flex-col bg-layer border border-layer-line shadow-2xs rounded-xl"><a href="' + o.href + '" class="flex flex-col focus:outline-hidden group">' +
      '<span class="inline-flex items-center gap-x-1 text-xs uppercase text-muted-foreground-1">' + esc(o.label) + icon('circle-help', 'size-3.5 text-muted-foreground') + '</span>' +
      '<span class="mt-1 flex items-center gap-x-2"><span class="text-xl sm:text-2xl font-medium text-foreground tabular-nums group-hover:text-primary">' + esc(o.value) + '</span>' + trend + '</span></a>' +
      (o.sub ? '<span class="mt-2 flex flex-wrap gap-x-3 text-xs font-medium text-primary [&_a:hover]:underline">' + o.sub + '</span>' : '') + '</div>';
  };
  UI.plainStat = function (o) { return '<div class="flex flex-col py-1 pe-4"><span class="text-lg font-medium tabular-nums text-foreground">' + esc(o.value) + '</span><span class="text-xs text-muted-foreground-1">' + esc(o.label) + '</span></div>'; };
  UI.kv = function (rows, opt) {
    var tones = (opt && opt.tones) || {};
    return '<dl class="divide-y divide-layer-line">' + rows.map(function (r) {
      var v = tones[String(r[1]).toLowerCase()] ? UI.chip({ label: r[1], tone: tones[String(r[1]).toLowerCase()], dot: true }) : '<span class="font-medium text-foreground text-end">' + esc(r[1]) + '</span>';
      return '<div class="flex justify-between gap-x-4 py-2 text-sm"><dt class="text-muted-foreground-1">' + esc(r[0]) + '</dt><dd>' + v + '</dd></div>';
    }).join('') + '</dl>';
  };
  UI.workRow = function (at, action, target, extra) {
    return '<li><a href="#" class="flex items-center gap-x-3 py-2 text-sm hover:bg-muted-hover -mx-2 px-2 rounded-lg"><span class="text-xs text-muted-foreground-1 tabular-nums whitespace-nowrap w-10">' + esc(at) + '</span><span class="font-medium text-foreground">' + esc(action) + '</span><span class="ms-auto text-end text-muted-foreground-1 truncate">' + esc(target) + '</span>' + (extra || '') + '</a></li>';
  };

  UI.tabs = function (o) {
    if (o.variant === 'line') {
      return '<nav class="flex gap-x-1 border-b border-layer-line overflow-x-auto" ' + (o.attrs || '') + ' role="tablist">' + o.items.map(function (t) {
        var key = t.key || t.label;
        return '<button type="button" role="tab" data-tab-key="' + esc(key) + '" ' + (t.key ? 'data-key="' + t.key + '"' : '') + ' aria-selected="' + !!t.active + '" data-selected="' + !!t.active + '" class="py-3 px-2.5 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-muted-foreground-1 hover:text-foreground focus:outline-hidden data-[selected=true]:font-semibold data-[selected=true]:border-primary data-[selected=true]:text-primary">' + esc(t.label) +
          (t.count != null ? '<span class="py-0.5 px-1.5 rounded-full text-xs bg-surface text-foreground tabular-nums">' + t.count + '</span>' : '') + '</button>';
      }).join('') + '</nav>';
    }
    return '<div class="inline-flex bg-surface rounded-lg p-1 gap-x-1" ' + (o.attrs || '') + ' role="tablist">' + o.items.map(function (t) {
      var key = t.key || t.label;
      return '<button type="button" role="tab" data-tab-key="' + esc(key) + '" ' + (t.key ? 'data-key="' + t.key + '"' : '') + ' aria-selected="' + !!t.active + '" data-selected="' + !!t.active + '" class="py-1.5 px-3 inline-flex items-center rounded-md text-sm font-medium whitespace-nowrap text-muted-foreground-1 hover:text-foreground focus:outline-hidden data-[selected=true]:bg-layer data-[selected=true]:text-foreground data-[selected=true]:shadow-2xs">' + esc(t.label) + '</button>';
    }).join('') + '</div>';
  };
  UI.segmented = function (items) {
    return '<div class="inline-flex bg-surface rounded-lg p-1 gap-x-1" role="group">' + items.map(function (t) {
      return '<button type="button" data-filter-chip aria-pressed="' + !!t.active + '" data-selected="' + !!t.active + '" class="py-1.5 px-3 inline-flex items-center gap-x-1.5 rounded-md text-sm font-medium whitespace-nowrap text-muted-foreground-1 hover:text-foreground data-[selected=true]:bg-layer data-[selected=true]:text-foreground data-[selected=true]:shadow-2xs">' + (t.icon ? icon(t.icon, 'size-3.5') : '') + esc(t.label) + '</button>';
    }).join('') + '</div>';
  };
  UI.filterChips = function (items, attrs) {
    return '<div class="flex flex-wrap gap-2" ' + (attrs || '') + '>' + items.map(function (t) {
      return '<button type="button" data-filter-chip ' + (t.key ? 'data-key="' + t.key + '"' : '') + ' aria-pressed="' + !!t.active + '" data-selected="' + !!t.active + '" class="py-1.5 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg bg-layer border border-layer-line text-layer-foreground shadow-2xs hover:bg-layer-hover focus:outline-hidden data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:border-primary">' +
        (t.icon ? icon(t.icon, 'size-3.5') : '') + esc(t.label) + (t.count != null ? '<span class="tabular-nums opacity-70">' + t.count + '</span>' : '') + '</button>';
    }).join('') + '</div>';
  };
  UI.toolbar = function (o) {
    return '<div class="flex flex-wrap items-center gap-2"><div class="relative flex-1 min-w-56"><div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-muted-foreground-1">' + icon('search', 'size-4') + '</div><input type="text" placeholder="' + esc(o.search) + '" class="py-2 ps-10 pe-3 block w-full bg-surface border-transparent rounded-lg text-sm text-foreground placeholder:text-muted-foreground-1 focus:bg-layer focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden"></div>' +
      o.buttons.map(function (b) { return '<button type="button" class="' + [BTN.base, BTN.md, BTN.secondary].join(' ') + '">' + icon(b.icon, 'size-4') + esc(b.label) + icon('chevron-down', 'size-3.5 text-muted-foreground') + '</button>'; }).join('') + '</div>';
  };

  UI.bars = function (o) {
    var max = Math.max.apply(null, o.values) || 1;
    var nice = Math.ceil(max / 4) * 4;
    var ticks = [nice, nice * 0.75, nice * 0.5, nice * 0.25, 0];
    return '<div class="flex gap-x-2 mt-3"><div class="flex flex-col justify-between h-40 text-[11px] text-muted-foreground-1 tabular-nums text-end w-8 pb-4">' + ticks.map(function (t) { return '<span>' + Math.round(t) + '</span>'; }).join('') + '</div>' +
      '<div class="flex-1"><div class="relative h-36">' + [0, 25, 50, 75, 100].map(function (p) { return '<div class="absolute inset-x-0 border-t border-layer-line" style="top:' + p + '%"></div>'; }).join('') +
      '<div class="absolute inset-0 flex items-end gap-x-2 px-1">' + o.values.map(function (v, i) { var h = Math.max(2, Math.round(v / nice * 100)); return '<div class="flex-1 rounded-sm ' + (i === o.values.length - 1 ? 'bg-primary' : 'bg-primary-400 dark:bg-primary-500/70') + '" style="height:' + h + '%" title="' + v + '"></div>'; }).join('') + '</div></div>' +
      '<div class="flex justify-between mt-2 text-[11px] text-muted-foreground-1 tabular-nums"><span>' + esc(o.labels[0]) + '</span><span>' + esc(o.labels[1]) + '</span></div></div></div>';
  };

  UI.table = function (o) {
    var th = function (c) {
      var al = c.align === 'right' ? 'text-end' : 'text-start';
      var inner = esc(c.label) + (c.sortable ? icon(c.active === 'desc' ? 'chevron-down' : 'chevrons-up-down', 'size-3.5 ' + (c.active ? 'text-primary' : 'text-muted-foreground')) : '');
      return '<th scope="col" class="px-4 py-3 ' + al + ' text-xs font-semibold uppercase text-foreground whitespace-nowrap' + (c.sortable ? ' cursor-pointer' : '') + '"><span class="inline-flex items-center gap-x-1">' + inner + '</span></th>';
    };
    var cb = function (checked) { return '<button type="button" role="checkbox" data-checkbox aria-checked="' + !!checked + '" data-selected="' + !!checked + '" class="group size-4 shrink-0 inline-flex items-center justify-center rounded-sm border border-line-3 bg-layer aria-checked:bg-primary aria-checked:border-primary focus:outline-hidden">' + icon('check', 'size-3 text-white opacity-0 group-aria-checked:opacity-100') + '</button>'; };
    var head = '<thead class="bg-muted"><tr>' + (o.selectable ? '<th scope="col" class="ps-4 py-3 w-8">' + cb(false) + '</th>' : '') + o.columns.map(th).join('') + '</tr></thead>';
    var body = '<tbody class="divide-y divide-table-line">' + o.rows.map(function (r, i) {
      var ra = o.rowAttrs ? o.rowAttrs(i) : '';
      var sel = /data-selected="true"/.test(ra);
      var tone = /data-tone="danger"/.test(ra) ? ' bg-red-50/60 dark:bg-red-500/5' : (/data-tone="warning"/.test(ra) ? ' bg-yellow-50/60 dark:bg-yellow-500/5' : '');
      return '<tr ' + ra + ' class="hover:bg-muted-hover data-[selected=true]:bg-primary-50 dark:data-[selected=true]:bg-primary-500/10' + tone + (/data-member/.test(ra) ? ' cursor-pointer' : '') + '">' + (o.selectable ? '<td class="ps-4 py-3 w-8">' + cb(sel) + '</td>' : '') +
        r.map(function (cell, j) { var c = o.columns[j] || {}; return '<td class="px-4 py-3 text-sm text-foreground align-middle whitespace-nowrap ' + (c.align === 'right' ? 'text-end' : '') + '">' + cell + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody>';
    return '<div class="overflow-x-auto" ' + (o.attrs || '') + '><table class="min-w-full divide-y divide-table-line">' + head + body + '</table></div>' +
      (o.footer ? '<div class="px-4 py-3 border-t border-layer-line grid gap-3 md:flex md:justify-between md:items-center text-sm">' + o.footer + '</div>' : '');
  };
  UI.inlineForm = function (o) {
    return '<div class="flex gap-2 max-w-xl"><input type="text" placeholder="' + esc(o.placeholder) + '" class="py-1.5 px-3 block w-full bg-layer border border-layer-line rounded-lg text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden">' + UI.button({ label: o.button, variant: 'secondary', size: 'sm' }) + '</div>';
  };
  UI.stack = function (arr) { return '<div class="flex flex-col gap-5">' + arr.join('') + '</div>'; };
  UI.grid = function (html, kind) {
    var g = { stats: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4', plain: 'flex flex-wrap gap-x-8 gap-y-2 px-1', two: 'grid grid-cols-1 lg:grid-cols-2 gap-5', three: 'grid grid-cols-1 md:grid-cols-3 gap-5' }[kind] || 'grid gap-4';
    return '<div class="' + g + '">' + html + '</div>';
  };
  UI.sectionHeader = function (o) {
    return '<div class="flex flex-wrap items-end justify-between gap-3"><div>' +
      '<h1 class="text-xl font-semibold text-foreground inline-flex items-center">' + esc(o.title) + (o.count != null ? UI.count(o.count) : '') + '</h1>' +
      (o.meta ? '<p class="text-sm text-muted-foreground-1">' + esc(o.meta) + '</p>' : '') + '</div>' +
      (o.actions ? '<div class="flex flex-wrap items-center gap-2">' + o.actions + '</div>' : '') + '</div>';
  };
  UI.card = function (o) {
    var head = (o.title || o.actions) ? '<div class="px-4 md:px-5 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-layer-line"><div><div class="flex items-center gap-x-2"><h2 class="text-lg font-semibold text-foreground">' + esc(o.title || '') + '</h2>' + (o.count != null ? UI.count(o.count) : '') + (o.chip || '') + (o.meta ? '<span class="text-xs text-muted-foreground-1">' + esc(o.meta) + '</span>' : '') + '</div>' + (o.description ? '<p class="text-sm text-muted-foreground-1">' + esc(o.description) + '</p>' : '') + '</div>' + (o.actions ? '<div class="flex flex-wrap items-center gap-2">' + o.actions + '</div>' : '') + '</div>' : (o.description ? '<p class="px-4 md:px-5 pt-4 text-sm text-muted-foreground-1">' + esc(o.description) + '</p>' : '');
    return '<div class="flex flex-col bg-layer border border-layer-line shadow-2xs rounded-xl overflow-hidden" ' + (o.attrs || '') + '>' + head + '<div class="' + (o.flush ? 'flex flex-col [&>*+*]:border-t [&>*+*]:border-layer-line [&>div.flex-wrap]:p-4 [&>div.flex-wrap]:md:px-5 [&>details]:px-4 [&>details]:md:px-5 [&>details]:py-3' : 'p-4 md:p-5 flex flex-col gap-4') + '">' + o.body + '</div>' +
      (o.footer ? '<div class="px-4 md:px-5 py-3 border-t border-layer-line text-sm">' + o.footer + '</div>' : '') + '</div>';
  };
  UI.empty = function (text, attrs) { return '<p class="p-4 md:p-5 text-sm text-muted-foreground-1" ' + (attrs || '') + '>' + esc(text) + '</p>'; };
  UI.queueItem = function (it) {
    return '<details data-kind="' + it.kind + '" ' + (it.open ? 'open' : '') + ' class="group"><summary class="list-none cursor-pointer grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-3 gap-y-1 px-4 md:px-5 py-3 hover:bg-muted-hover group-open:bg-muted [&::-webkit-details-marker]:hidden">' +
      UI.chip({ label: it.kindLabel, tone: it.tone, icon: it.icon }) + '<span class="font-semibold text-sm text-foreground truncate">' + esc(it.title) + '</span><span class="text-xs text-muted-foreground-1 tabular-nums whitespace-nowrap">' + esc(it.age) + '</span>' + icon('chevron-down', 'size-4 text-muted-foreground group-open:rotate-180 transition') + '</summary>' +
      '<div class="px-4 md:px-5 pb-4 pt-1 flex flex-col gap-3"><div class="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground-1">' + it.meta.map(function (m) { return '<span>' + esc(m[0]) + ' <b class="font-medium text-foreground">' + esc(m[1]) + '</b></span>'; }).join('') + '</div>' +
      '<div class="flex gap-x-2 text-sm text-foreground bg-muted border border-layer-line rounded-lg px-3 py-2">' + icon('info', 'size-4 mt-0.5 text-muted-foreground-1') + '<span>' + esc(it.hint) + '</span></div><div class="flex flex-wrap items-center gap-2">' + it.actions.map(function (a, i) { return UI.button({ label: a, variant: i === 0 ? 'primary' : (/reject/i.test(a) ? 'dangerSoft' : 'secondary'), size: 'sm', icon: i === 0 ? 'check' : (/reject/i.test(a) ? 'x' : (/hold|held/i.test(a) ? 'pause' : '')) }); }).join('') + '<span class="text-xs text-muted-foreground-1">Every decision lands in the audit log.</span></div></div></details>';
  };
  UI.formRow = function (fields) { return '<div class="flex flex-wrap items-end gap-3">' + fields.join('') + '</div>'; };
  UI.input = function (o) {
    var id = 'f' + Math.random().toString(36).slice(2, 7);
    return '<div class="flex flex-col gap-1 min-w-40 ' + (o.grow ? 'flex-[' + o.grow + '_1_16rem]' : 'flex-1') + '"><label for="' + id + '" class="text-sm font-medium text-foreground">' + esc(o.label) + '</label><div class="relative">' +
      (o.icon ? '<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-muted-foreground-1">' + icon(o.icon, 'size-4') + '</div>' : '') +
      '<input id="' + id + '" type="' + (o.type || 'text') + '" placeholder="' + esc(o.placeholder || '') + '" class="py-2 px-3 ' + (o.icon ? 'ps-10 ' : '') + (o.mono ? 'font-mono ' : '') + 'block w-full bg-layer border border-layer-line rounded-lg text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden" ' + (o.attrs || '') + '></div></div>';
  };
  UI.select = function (o) {
    return '<div class="flex flex-col gap-1 flex-1 min-w-40"><label class="text-sm font-medium text-foreground">' + esc(o.label) + '</label><div class="relative"><select class="appearance-none py-2 ps-3 pe-9 block w-full bg-layer border border-layer-line rounded-lg text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-hidden">' + o.options.map(function (x) { return '<option>' + esc(x) + '</option>'; }).join('') + '</select><div class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none text-muted-foreground-1">' + icon('chevron-down', 'size-4') + '</div></div></div>';
  };
  UI.buttonSlot = function (html) { return '<div class="flex flex-col gap-1"><span class="text-sm">&nbsp;</span>' + html + '</div>'; };
  UI.avatar = function (o) {
    var s = o.size === 'lg' ? 'size-14 text-lg' : 'size-9.5 text-sm';
    return '<span class="inline-flex shrink-0 items-center justify-center ' + s + ' rounded-full bg-layer border border-layer-line text-foreground font-medium">' + esc(o.initials) + '</span>';
  };
  UI.person = function (o) {
    var name = o.href ? '<a href="' + o.href + '" class="text-sm font-semibold text-foreground hover:text-primary">' + esc(o.name) + '</a>' : '<span class="text-sm font-semibold text-foreground">' + esc(o.name) + '</span>';
    var text = '<div class="flex flex-col leading-tight min-w-0">' + name + (o.sub ? '<span class="text-sm text-muted-foreground-1">' + (o.raw ? o.sub : esc(o.sub)) + '</span>' : '') + '</div>';
    return o.avatar ? '<div class="flex items-center gap-x-3">' + UI.avatar({ initials: o.avatar }) + text + '</div>' : text;
  };
  UI.profileHeader = function (o) {
    return '<div class="flex flex-col gap-3"><a href="' + o.back.href + '" class="inline-flex items-center gap-x-1 text-sm text-muted-foreground-1 hover:text-primary w-fit">' + icon('arrow-left', 'size-4') + esc(o.back.label) + '</a>' +
      '<div class="flex flex-wrap items-center gap-4 bg-layer border border-layer-line shadow-2xs rounded-xl p-4 md:p-5">' + (o.avatar || '') + '<div class="flex flex-col gap-1 min-w-0 flex-1"><div class="flex flex-wrap items-center gap-2"><h1 class="text-xl font-semibold text-foreground">' + esc(o.title) + '</h1>' + (o.chips || '') + '</div><p class="text-sm text-muted-foreground-1">' + o.sub + '</p></div><div class="flex flex-wrap gap-2">' + (o.actions || '') + '</div></div></div>';
  };
  UI.photoStrip = function (n) { var s = ''; for (var i = 0; i < n; i++) s += '<div class="aspect-[4/3] rounded-lg bg-surface border border-layer-line flex items-center justify-center text-muted-foreground-1">' + icon('image', 'size-5') + '</div>'; return '<div class="grid grid-cols-5 gap-2 mt-2">' + s + '</div>'; };
  UI.disclosure = function (o) { return '<details class="group"><summary class="list-none cursor-pointer inline-flex items-center gap-x-2 text-sm font-medium text-primary hover:underline [&::-webkit-details-marker]:hidden">' + icon('chevron-right', 'size-4 group-open:rotate-90 transition') + esc(o.summary) + '</summary><div class="pt-3">' + o.body + '</div></details>'; };
  UI.alert = function (o) {
    var t = { warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-500/10 dark:border-yellow-500/30 dark:text-yellow-500', danger: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-500', success: 'bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-500/10 dark:border-teal-500/30 dark:text-teal-500' }[o.tone] || 'bg-blue-50 border-blue-200 text-blue-800';
    return '<div class="flex gap-x-3 border rounded-lg p-4 text-sm ' + t + '" role="alert">' + icon('triangle-alert', 'size-4 mt-0.5') + '<div><p class="font-semibold">' + esc(o.title) + '</p><p class="mt-0.5 opacity-90">' + esc(o.text) + '</p></div></div>';
  };
  UI.pagination = function (o) {
    var b = function (label, ic, dis) { return '<button type="button" ' + (dis ? 'disabled' : '') + ' class="py-1.5 px-2 inline-flex items-center gap-x-1 text-sm rounded-lg bg-layer border border-layer-line text-layer-foreground shadow-2xs hover:bg-layer-hover disabled:opacity-50 disabled:pointer-events-none">' + (ic === 'l' ? icon('chevron-left', 'size-3.5') : '') + esc(label) + (ic === 'r' ? icon('chevron-right', 'size-3.5') : '') + '</button>'; };
    return '<p class="text-sm text-muted-foreground-1"><span class="font-semibold text-foreground">' + esc(o.summary.replace(/^.* of /, '')) + '</span> results · ' + esc(o.summary) + '</p><div class="flex items-center gap-x-2"><span class="text-sm text-muted-foreground-1 tabular-nums">' + o.page + ' of ' + o.pages + '</span>' + b('Prev', 'l', true) + b('Next', 'r') + '</div>';
  };
  UI.switchRow = function (o) {
    return '<div class="flex items-center justify-between gap-4 py-3"><div><p class="text-sm font-medium text-foreground">' + esc(o.label) + '</p><p class="text-xs text-muted-foreground-1">' + esc(o.description) + '</p></div>' +
      '<button type="button" role="switch" data-switch aria-checked="' + !!o.checked + '" data-selected="' + !!o.checked + '" class="group relative inline-flex h-6 w-11 shrink-0 p-0.5 rounded-full bg-gray-200 dark:bg-neutral-700 aria-checked:bg-primary transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"><span class="size-5 rounded-full bg-white shadow transform transition group-aria-checked:translate-x-5"></span></button></div>';
  };
  UI.column = function (title, items) {
    return '<div class="flex flex-col gap-2"><div class="flex justify-between text-sm"><span class="font-semibold text-foreground">' + esc(title) + '</span><span class="text-muted-foreground-1 tabular-nums">' + items.length + '</span></div>' + (items.length ? '<ul class="flex flex-col gap-2">' + items.map(function (t) { var m = t.match(/^(LM-\d+)\s(.*)$/); return '<li class="text-sm text-muted-foreground-2 bg-muted border border-layer-line rounded-lg px-3 py-2"><span class="font-mono text-xs text-foreground me-1">' + esc(m ? m[1] : '') + '</span>' + esc(m ? m[2] : t) + '</li>'; }).join('') + '</ul>' : '<p class="text-sm text-muted-foreground">none</p>') + '</div>';
  };

  UI.shell = function (o) {
    var M = window.MOCK;
    var mainNav = o.nav.slice(0, 5), deskNav = o.nav.slice(5);
    var item = function (n, tile) {
      return '<li><a href="#section=' + n.key + '" data-nav="' + n.key + '" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-foreground rounded-lg hover:bg-muted-hover focus:outline-hidden aria-[current=page]:bg-muted-hover aria-[current=page]:font-medium">' +
        (tile ? '<span class="inline-flex items-center justify-center size-6 rounded-md bg-primary text-primary-foreground">' + icon(n.icon, 'size-3.5') + '</span>' : icon(n.icon, 'size-4 text-muted-foreground-2')) + '<span class="truncate">' + esc(n.label) + '</span>' +
        (n.badge ? '<span class="ms-auto py-0.5 px-1.5 inline-flex items-center rounded-full text-xs font-medium tabular-nums bg-primary-100 text-primary-800 dark:bg-primary-500/10 dark:text-primary-400">' + n.badge + '</span>' : '') + '</a></li>';
    };
    var sidebar = '<aside class="hidden lg:flex fixed inset-y-0 start-0 z-40 w-65 bg-layer border-e border-layer-line flex-col"><div class="p-4 pb-2 flex items-center gap-x-2"><span class="inline-flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground font-bold text-sm">L</span><span class="text-lg font-bold text-foreground">Lovin <span class="text-primary">admin</span></span></div>' +
      '<nav class="p-3 w-full flex flex-col"><ul class="flex flex-col gap-y-0.5">' + mainNav.map(function (n) { return item(n, false); }).join('') + '</ul>' +
      '<div class="mt-4 pt-4 border-t border-layer-line"><span class="block px-2.5 mb-2 text-xs uppercase text-muted-foreground-1">Desks</span><ul class="flex flex-col gap-y-0.5">' + deskNav.map(function (n) { return item(n, true); }).join('') + '</ul></div></nav>' +
      '<div class="mt-auto p-3 border-t border-layer-line"><button type="button" class="w-full flex items-center gap-x-3 py-2 px-2.5 rounded-lg hover:bg-muted-hover text-start"><span class="inline-flex items-center justify-center size-9 rounded-lg bg-foreground text-foreground-inverse font-bold text-sm">LM</span><span class="flex flex-col leading-tight min-w-0"><span class="text-sm font-medium text-foreground">Lovin Malta</span><span class="text-xs text-muted-foreground-1">' + esc(o.version) + ' · production</span></span>' + icon('chevrons-up-down', 'size-4 ms-auto text-muted-foreground-1') + '</button></div></aside>';
    var header = '<header class="sticky top-0 inset-x-0 z-30 w-full bg-layer border-b border-layer-line text-sm py-2.5 lg:ps-65"><nav class="px-4 sm:px-6 flex items-center w-full gap-x-3"><span class="lg:hidden text-base font-bold text-foreground me-2">Lovin <span class="text-primary">admin</span></span>' +
      '<button type="button" id="search-open" class="relative w-full max-w-72 text-start"><span class="absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground-1">' + icon('search', 'size-4') + '</span><span class="block py-2 ps-10 pe-16 w-full bg-layer border border-layer-line rounded-lg text-sm text-muted-foreground-1 hover:bg-layer-hover truncate">Search</span><span class="absolute inset-y-0 end-0 flex items-center pe-3 text-xs text-muted-foreground-1">Ctrl + /</span></button>' +
      '<div class="ms-auto flex items-center gap-x-1"><button type="button" class="relative size-9.5 inline-flex justify-center items-center rounded-full border border-transparent text-foreground hover:bg-muted-hover" aria-label="Notifications">' + icon('bell', 'size-4') + '<span class="absolute top-1 end-1 inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full text-[10px] font-medium bg-red-500 text-white">7</span></button>' +
      '<button type="button" id="theme-toggle" class="size-9.5 inline-flex justify-center items-center rounded-full border border-transparent text-foreground hover:bg-muted-hover" aria-label="Toggle dark mode">' + icon('moon', 'size-4') + '</button>' +
      '<button type="button" class="size-9.5 inline-flex justify-center items-center rounded-full border border-transparent text-foreground hover:bg-muted-hover" aria-label="Activity">' + icon('activity', 'size-4') + '</button>' +
      '<span class="mx-2 h-6 border-e border-layer-line"></span>' + UI.button({ label: 'Log out', variant: 'secondary', size: 'sm' }) + '<button type="button" class="ms-1 inline-flex items-center gap-x-2 rounded-full">' + UI.avatar({ initials: o.admin.initials }) + '</button></div></nav>' +
      '<nav class="lg:hidden mt-2 px-4 sm:px-6 flex gap-1 overflow-x-auto">' + o.nav.map(function (n) { return '<a href="#section=' + n.key + '" data-nav="' + n.key + '" class="shrink-0 py-1.5 px-2.5 text-sm rounded-lg hover:bg-muted-hover aria-[current=page]:bg-muted-hover aria-[current=page]:font-medium">' + esc(n.label) + '</a>'; }).join('') + '</nav></header>';
    var panels = o.panels.map(function (p) { return '<section data-section-panel="' + p.key + '" hidden>' + p.html + '</section>'; }).join('');
    document.body.innerHTML = '<div class="min-h-screen bg-page text-foreground">' + sidebar + header +
      '<main class="lg:ps-65"><div class="p-3 sm:p-5 pb-16 max-w-[1400px]" id="main">' + panels + '</div><footer class="px-5 pb-6 pt-2 lg:ps-5 flex justify-between text-xs text-muted-foreground-1"><span>Lovin Malta · ' + esc(o.version) + '</span><span>Signed in as ' + esc(o.admin.email) + '</span></footer></main>' +
      '<div class="fixed bottom-4 end-4 z-50 flex items-center gap-x-2 rounded-full bg-gray-900 text-white text-xs ps-4 pe-1.5 py-1.5 shadow-lg" role="group" aria-label="Mock controls"><b>' + esc(M.label) + '</b><span class="opacity-40">|</span><span class="opacity-70">Accent</span><span class="inline-flex rounded-full bg-white/10 p-0.5"><button type="button" data-accent-option="default" class="px-2 py-0.5 rounded-full aria-pressed:bg-white aria-pressed:text-gray-900">Default</button><button type="button" data-accent-option="lovin" class="px-2 py-0.5 rounded-full aria-pressed:bg-white aria-pressed:text-gray-900">Lovin red</button></span><a href="' + M.other.url + '" class="inline-flex items-center gap-x-1 rounded-full bg-white text-gray-900 px-3 py-1 font-medium hover:bg-gray-100">Compare with ' + esc(M.other.short) + icon('arrow-right', 'size-3') + '</a></div>' +
      '<div id="palette" hidden class="fixed inset-0 z-50 bg-gray-900/50 dark:bg-black/60 flex items-start justify-center p-4 pt-[12vh]"><div class="w-full max-w-xl bg-layer border border-layer-line rounded-xl shadow-lg overflow-hidden" role="dialog" aria-label="Search the admin"><div class="flex items-center gap-x-2 px-4 py-3 border-b border-layer-line">' + icon('search', 'size-4 text-muted-foreground-1') + '<input type="text" class="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground-1 focus:outline-hidden" placeholder="Search users, reports, listings, intelligence, venues, drafts"><button type="button" id="palette-close" class="text-xs text-muted-foreground-1 hover:text-foreground">Esc</button></div>' +
      '<div class="max-h-[50vh] overflow-y-auto p-2">' + [['Users', [['Maria Camilleri', 'Trusted · 42 reports'], ['Matthew Attard', 'Regular · 9 reports']]], ['Review centre', [['Power cut, Tower Road, Sliema', 'Held · 31 min']]], ['Marketplace', [['Two-bedroom apartment, Gzira', 'Pending · Lovin Properties']]], ['Malta Intelligence', [['pa-planning', 'failing · 6 failures']]]].map(function (g) { return '<div class="pt-2"><p class="px-2 pb-1 text-xs font-semibold uppercase text-muted-foreground-1">' + g[0] + '</p>' + g[1].map(function (h) { return '<a href="#" class="flex justify-between items-baseline gap-x-3 px-2 py-2 rounded-lg hover:bg-muted-hover text-sm"><span class="font-medium text-foreground">' + esc(h[0]) + '</span><span class="text-xs text-muted-foreground-1">' + esc(h[1]) + '</span></a>'; }).join('') + '</div>'; }).join('') + '</div></div></div></div>';
  };

  window.UI = UI;
})();
