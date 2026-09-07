/* Lovin Admin mock: the sections, composed from UI primitives. This file is shared by both
   mockups; only window.UI (the design-system skin) differs. Interactions that matter for
   judging a design system are real: section routing on #section=, dark mode, the accent
   switch, queue filters, expandable queue rows, the chart series toggle, the Users profile
   and the listing detail, the intel tabs and the command palette. */
(function () {
  'use strict';
  var D = window.LM;
  var UI = window.UI;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function statusTone(s) {
    s = String(s).toLowerCase();
    if (s === 'live' || s === 'active' || s === 'ok' || s === 'approved' || s === 'connected' || s === 'running') return 'success';
    if (s === 'held' || s === 'expired' || s === 'stale' || s === 'pending' || s === 'suspended') return 'warning';
    if (s === 'rejected' || s === 'archived' || s === 'failing' || s === 'refused') return 'danger';
    if (s === 'newsroom' || s === 'trusted') return 'accent';
    return 'default';
  }
  function trustTone(t) {
    t = String(t).toLowerCase();
    if (t === 'trusted') return 'success';
    if (t === 'regular') return 'accent';
    if (t === 'newsroom') return 'default';
    return 'warning';
  }
  var link = function (section, extra) { return './#section=' + section + (extra || ''); };
  var initials = function (name) { return String(name).split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join('').toUpperCase(); };

  /* ---------- HOME ---------- */
  function home() {
    var attn = D.attention.map(function (a) {
      var sub = a.sub ? a.sub.map(function (s) { return '<a href="' + link('intel', '&intel=' + s) + '">' + esc(s) + '</a>'; }).join(' ') : '';
      return UI.stat({ value: a.value, label: a.label, href: link(a.section), sub: sub, delta: a.delta });
    }).join('');
    var top = D.top.map(function (t) { return UI.plainStat(t); }).join('');

    var agentBody = '<p class="' + UI.cls.muted + '">' + esc(D.agent.note) + '</p>' + UI.kv(D.agent.kv, { tones: { connected: 'success' } }) +
      '<div class="' + UI.cls.row + '">' + UI.button({ label: 'Pause alerts', icon: 'pause', variant: 'secondary', size: 'sm' }) +
      UI.button({ label: 'Open the newsroom desk', icon: 'arrow-right', variant: 'ghost', size: 'sm', iconRight: true }) + '</div>';

    var work = '<ul class="' + UI.cls.plainList + '">' + D.mywork.map(function (w) { return UI.workRow(w[0], w[1], w[2]); }).join('') + '</ul>';

    var seriesTabs = UI.tabs({
      attrs: 'id="series-tabs"',
      items: [{ key: 'incidents', label: 'Reports', active: true }, { key: 'wa', label: 'WhatsApp' }, { key: 'users', label: 'New users' }, { key: 'leads', label: 'Leads' }]
    });
    var chart = '<div id="bars">' + UI.bars({ values: D.series.incidents, labels: D.series.labels }) + '</div>';

    var leadChips = UI.filterChips(D.leads.kinds.map(function (k) { return { label: k.label, count: k.count, active: !!k.active }; }));
    var leadsTable = UI.table({
      columns: [{ label: 'When', mono: true }, { label: 'Kind' }, { label: 'Item' }, { label: 'Name' }, { label: 'Contact' }],
      rows: D.leads.rows.map(function (r) { return [UI.mono(r[0]), UI.chip({ label: r[1], tone: 'default' }), '<b>' + esc(r[2]) + '</b>', esc(r[3]), esc(r[4])]; })
    });

    var releasesTable = UI.table({
      columns: [{ label: 'Version', mono: true }, { label: 'Deployed', mono: true }, { label: 'Description' }],
      rows: D.releases.map(function (r) {
        var desc = r.description ? esc(r.description) : UI.inlineForm({ placeholder: 'What shipped in this release', button: 'Save note' });
        return [UI.mono(r.version), UI.mono(r.deployed), desc];
      })
    });

    return UI.stack([
      UI.sectionHeader({ eyebrow: 'Home', title: 'Good morning, ' + D.admin.name.split(' ')[0], meta: 'generated ' + D.generated + ' · ' + D.version }),
      UI.grid(attn, 'stats'),
      UI.grid(top, 'plain'),
      UI.grid([
        UI.card({ title: 'Ejja on WhatsApp', chip: UI.chip({ label: 'connected', tone: 'success', dot: true }), body: agentBody }),
        UI.card({ title: 'My work today', actions: UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }), body: work })
      ].join(''), 'two'),
      UI.card({ title: 'Last 14 days', actions: seriesTabs, body: chart }),
      UI.card({ title: 'Leads and advertisers', actions: UI.button({ label: 'Download CSV', icon: 'download', variant: 'secondary', size: 'sm' }), body: leadChips + leadsTable }),
      UI.card({ title: 'Releases', count: D.releases.length, actions: UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }), body: releasesTable })
    ]);
  }

  /* ---------- REVIEW CENTRE ---------- */
  function review() {
    var chips = UI.filterChips(D.queue.kinds.map(function (k) { return { key: k.key, label: k.label, count: k.count, icon: k.icon, active: !!k.active }; }), 'id="queue-filters"');
    var items = '<div class="' + UI.cls.queueList + '" id="queue-list">' + D.queue.items.map(function (it) { return UI.queueItem(it); }).join('') + '</div>';
    var empty = UI.empty('Nothing in the queue for this filter.', 'id="queue-empty" hidden');
    return UI.stack([
      UI.sectionHeader({ eyebrow: 'Review centre', title: 'Review centre', count: 7, actions: UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }), meta: 'Oldest first. Held items expire after 24 h without a decision.' }),
      UI.card({ body: chips + empty + items, flush: true })
    ]);
  }

  /* ---------- USERS ---------- */
  function people() {
    var filters = UI.formRow([
      UI.input({ label: 'Search users', placeholder: 'name, provider, trust level or report count', icon: 'search', attrs: 'id="people-search"', grow: 2 }),
      UI.select({ label: 'Status', options: ['All statuses', 'Active', 'Suspended'] }),
      UI.select({ label: 'Saved views', options: ['Saved views'].concat(D.people.views) }),
      UI.buttonSlot(UI.button({ label: 'Save view', icon: 'bookmark', variant: 'secondary' }))
    ]);
    var bulk = '<div class="' + UI.cls.row + '" id="people-bulk">' + UI.chip({ label: '2 selected', tone: 'accent' }) +
      UI.button({ label: 'Suspend selected', icon: 'user-x', variant: 'secondary', size: 'sm' }) +
      UI.button({ label: 'Unsuspend selected', icon: 'user-check', variant: 'secondary', size: 'sm' }) +
      UI.button({ label: 'Clear', variant: 'ghost', size: 'sm' }) + '</div>';
    var table = UI.table({
      selectable: true,
      attrs: 'id="people-table"',
      columns: [{ label: 'User', sortable: true }, { label: 'Provider' }, { label: 'Trust', sortable: true }, { label: 'Reports', align: 'right', sortable: true, active: 'desc' }, { label: 'Points', align: 'right', sortable: true }, { label: 'Last connection', mono: true }, { label: 'Status' }],
      rows: D.people.rows.map(function (r, i) {
        return [UI.person({ name: r.name, sub: r.provider === 'WhatsApp' ? '+356 79 ...' : r.provider, href: link('people', '&member=' + i), avatar: initials(r.name) }),
          UI.chip({ label: r.provider, tone: 'default' }), UI.chip({ label: r.trust, tone: trustTone(r.trust), soft: true }),
          UI.num(r.reports), UI.num(r.points), UI.mono(r.last), UI.chip({ label: r.status, tone: statusTone(r.status), dot: true })];
      }),
      rowAttrs: function (i) { return 'data-member="' + i + '" ' + (i === 1 || i === 7 ? 'data-selected="true"' : ''); },
      footer: '<span class="' + UI.cls.muted + '">Showing 12 of 2,148. Sort with the column headers; tick rows for a bulk suspend or unsuspend.</span>' + UI.button({ label: 'Load more', icon: 'arrow-down', variant: 'secondary', size: 'sm' })
    });
    var listPanel = '<div id="people-list">' + UI.stack([
      UI.sectionHeader({ eyebrow: 'Users', title: 'Users', count: '2,148', actions: UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }) }),
      UI.card({ body: filters + bulk + table, flush: true })
    ]) + '</div>';

    var p = D.people.profile;
    var profileHeader = UI.profileHeader({
      back: { label: 'Back to users', href: link('people') },
      avatar: UI.avatar({ initials: 'MC', size: 'lg' }),
      title: p.name, sub: UI.mono(p.pub_id) + ' · ' + esc(p.provider) + ' · member since ' + esc(p.joined),
      chips: UI.chip({ label: p.trust, tone: 'success', soft: true }) + UI.chip({ label: p.status, tone: 'success', dot: true }),
      actions: UI.button({ label: 'Copy link', icon: 'link', variant: 'ghost', size: 'sm' }) + UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }) + UI.button({ label: 'Suspend', icon: 'user-x', variant: 'danger', size: 'sm', soft: true })
    });
    var profileTabs = UI.tabs({ variant: 'line', items: p.tabs.map(function (t, i) { return { label: t, active: i === 0, count: i === 2 ? 42 : (i === 3 ? 6 : null) }; }) });
    var overview = UI.grid([
      UI.card({ title: 'Overview', body: '<div class="' + UI.cls.row + '">' + p.stats.map(function (s) { return UI.plainStat({ value: s[0], label: s[1] }); }).join('') + '</div>' + UI.kv(p.kv) }),
      UI.card({ title: 'Activity', actions: UI.filterChips([{ label: 'All', active: true }, { label: 'Reports' }, { label: 'Listings' }, { label: 'Sign-ins' }]), body: '<ul class="' + UI.cls.plainList + '">' + p.activity.map(function (a) { return UI.workRow(a[0], a[1], a[2], a[3] ? UI.chip({ label: a[3], tone: statusTone(a[3]), soft: true }) : ''); }).join('') + '</ul>' + UI.button({ label: 'Load more', icon: 'arrow-down', variant: 'secondary', size: 'sm' }) })
    ].join(''), 'two');
    var profilePanel = '<div id="people-profile" hidden>' + UI.stack([profileHeader, profileTabs, overview]) + '</div>';
    return listPanel + profilePanel;
  }

  /* ---------- MARKETPLACE ---------- */
  function market() {
    var queue = UI.table({
      columns: [{ label: 'Listing' }, { label: 'Seller' }, { label: 'Locality' }, { label: 'Price', align: 'right' }, { label: 'Age', mono: true }, { label: 'Actions', align: 'right' }],
      rows: D.market.queue.map(function (r) {
        return [UI.person({ name: r[0], sub: r[1], href: link('market', '&listing=1') }), UI.person({ name: r[2], sub: r[5], avatar: initials(r[2]) }), esc(r[3]), UI.num(r[4]), UI.mono(r[6]),
          '<div class="' + UI.cls.actions + '">' + UI.button({ label: 'Release', icon: 'check', variant: 'primary', size: 'sm' }) + UI.button({ label: 'Hold', icon: 'pause', variant: 'secondary', size: 'sm' }) + UI.button({ label: 'Reject', icon: 'x', variant: 'ghost', size: 'sm' }) + '</div>'];
      })
    });
    var search = UI.toolbar({ search: 'title, description or listing id', buttons: [{ label: 'Section', icon: 'layers' }, { label: 'Sort', icon: 'arrow-up-down' }, { label: 'Columns', icon: 'columns-3' }] });
    var statuses = UI.filterChips(D.market.statuses);
    var all = UI.table({
      columns: [{ label: 'Listing' }, { label: 'Status' }, { label: 'Seller' }, { label: 'Locality' }, { label: 'Price', align: 'right' }, { label: 'Posted', mono: true }],
      rows: D.market.all.map(function (r) { return [UI.person({ name: r[0], sub: r[2], href: link('market', '&listing=1') }), UI.chip({ label: r[1], tone: statusTone(r[1]), dot: true }), UI.person({ name: r[3], sub: '', avatar: initials(r[3]) }), esc(r[4]), UI.num(r[5]), UI.mono(r[6])]; }),
      footer: UI.pagination({ page: 1, pages: 102, summary: '1 to 8 of 812' })
    });
    var listPanel = '<div id="market-list">' + UI.stack([
      UI.sectionHeader({ eyebrow: 'Marketplace', title: 'Market queue', count: 12, actions: UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }), meta: 'Pending listings are released, held or rejected here. Every decision lands in the audit log.' }),
      UI.card({ body: queue, flush: true }),
      UI.card({ title: 'All listings', count: 812, actions: UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }), body: search + statuses + all, flush: true })
    ]) + '</div>';

    var d = D.market.detail;
    var detail = '<div id="market-detail" hidden>' + UI.stack([
      UI.profileHeader({ back: { label: 'Back to all listings', href: link('market') }, title: d.title, sub: UI.mono(d.id) + ' · posted from the site', chips: UI.chip({ label: d.status, tone: 'warning', dot: true }),
        actions: UI.button({ label: 'Release', icon: 'check', variant: 'primary', size: 'sm' }) + UI.button({ label: 'Hold', icon: 'pause', variant: 'secondary', size: 'sm' }) + UI.button({ label: 'Reject', icon: 'x', variant: 'danger', size: 'sm', soft: true }) }),
      UI.grid([
        UI.card({ title: 'Listing', body: UI.kv(d.kv) }),
        UI.card({ title: 'Description', body: '<p>' + esc(d.description) + '</p>' + UI.photoStrip(5) })
      ].join(''), 'two')
    ]) + '</div>';
    return listPanel + detail;
  }

  /* ---------- MALTA INTELLIGENCE ---------- */
  function intel() {
    var header = UI.sectionHeader({
      eyebrow: 'Malta Intelligence', title: 'Malta Intelligence', count: 9,
      actions: UI.segmented([{ label: 'Sources', icon: 'rss', active: true }, { label: 'Latest items', icon: 'list' }]) +
        UI.button({ label: 'Triage', icon: 'alert-triangle', variant: 'secondary', size: 'sm', badge: 2 }) +
        UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' })
    });
    var tabs = UI.tabs({ variant: 'line', attrs: 'id="intel-tabs"', items: [{ key: 'registry', label: 'Registry', active: true }, { key: 'feed', label: 'Captured items', count: 1284 }] });
    var registry = UI.table({
      columns: [{ label: 'Source' }, { label: 'Status' }, { label: 'Category' }, { label: 'Scraper' }, { label: 'Last check', mono: true }, { label: 'Failures', align: 'right' }, { label: 'Actions', align: 'right' }],
      rows: D.intel.sources.map(function (s) {
        return [UI.person({ name: s[0], sub: UI.mono(s[1]), raw: true }), UI.chip({ label: s[2], tone: statusTone(s[2]), dot: true }), esc(s[3]), UI.chip({ label: s[4], tone: 'default' }), UI.mono(s[5]) + '<div class="' + UI.cls.muted + '">' + esc(s[6]) + '</div>', UI.num(s[7]),
          '<div class="' + UI.cls.actions + '">' + UI.iconButton({ icon: 'zap', label: 'Refresh now' }) + UI.iconButton({ icon: 'database', label: 'Backfill' }) + UI.iconButton({ icon: 'pencil', label: 'Edit' }) + UI.iconButton({ icon: 'eye-off', label: 'Disable' }) + '</div>'];
      }),
      rowAttrs: function (i) { return i === 6 ? 'data-tone="danger"' : (i === 7 ? 'data-tone="warning"' : ''); }
    });
    var add = UI.disclosure({ summary: 'Add a source', body: UI.formRow([
      UI.input({ label: 'Name', placeholder: 'Malta Tourism Authority news' }), UI.input({ label: 'Slug', placeholder: 'mta-news', mono: true }), UI.input({ label: 'URL', placeholder: 'https://' }),
      UI.select({ label: 'Scraper', options: ['rss', 'html', 'json'] }), UI.select({ label: 'Category', options: ['government', 'statistics', 'finance', 'regulatory', 'planning', 'labour', 'environment', 'eu'] }),
      UI.buttonSlot(UI.button({ label: 'Add source', icon: 'plus', variant: 'primary' }))
    ]) });
    var backfill = UI.card({ title: 'Deep backfill', description: 'Walks a source\'s own archive pager beyond the bounded refresh: a page depth, a date floor or both. Only archive-backed sources have a walker.',
      body: UI.formRow([UI.input({ label: 'Source slug', placeholder: 'pick a source above', mono: true }), UI.input({ label: 'Pages', placeholder: '1-120', type: 'number' }), UI.input({ label: 'Since', placeholder: '30d, 1y or YYYY-MM-DD' }), UI.buttonSlot(UI.button({ label: 'Run backfill', icon: 'database', variant: 'primary' }))]) });
    var feedFilters = UI.toolbar({ search: 'title or summary', buttons: [{ label: 'Source', icon: 'rss' }, { label: 'Kind', icon: 'tag' }, { label: 'Last 7 days', icon: 'calendar' }] });
    var feed = UI.table({
      columns: [{ label: 'Captured', mono: true }, { label: 'Source' }, { label: 'Title' }, { label: 'Kind' }, { label: 'Published', mono: true }],
      rows: D.intel.items.map(function (i) { return [UI.mono(i[0]), UI.mono(i[1]), '<b>' + esc(i[2]) + '</b>', UI.chip({ label: i[3], tone: 'default' }), UI.mono(i[4])]; }),
      footer: UI.pagination({ page: 1, pages: 214, summary: '1 to 6 of 1,284' })
    });
    var registryPanel = '<div id="intel-registry">' + UI.card({ body: registry + add, flush: true }) + backfill + '</div>';
    var feedPanel = '<div id="intel-feed" hidden>' + UI.card({ body: feedFilters + feed, flush: true }) + '</div>';
    var planning = UI.card({ title: 'Planning Watch', count: '1,284', actions: UI.button({ label: 'Reload', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }) + UI.button({ label: 'Fetch now', icon: 'database', variant: 'secondary', size: 'sm' }),
      body: UI.alert({ tone: 'warning', title: 'Source stale', text: D.intel.planning.note }) + UI.table({
        columns: [{ label: 'Ref', mono: true }, { label: 'Locality' }, { label: 'Status' }, { label: 'Submitted', mono: true }, { label: 'Proposal' }],
        rows: D.intel.planning.rows.map(function (r) { return [UI.mono(r[0]), esc(r[1]), UI.chip({ label: r[2], tone: statusTone(r[2]), dot: true }), UI.mono(r[3]), esc(r[4])]; })
      }) });
    return UI.stack([header, tabs, registryPanel, feedPanel, planning]);
  }

  /* ---------- NEWSROOM ---------- */
  function newsroom() {
    return UI.stack([
      UI.sectionHeader({ eyebrow: 'Newsroom', title: 'Newsroom desk', meta: 'The desk itself lives on the public site behind the newsroom sign-in.', actions: UI.button({ label: 'Open the newsroom desk', icon: 'arrow-right', variant: 'primary', size: 'sm', iconRight: true }) }),
      UI.grid([
        UI.card({ title: 'Reports', body: UI.kv(D.newsroom.reports) }),
        UI.card({ title: 'Users and growth', body: UI.kv(D.newsroom.growth) })
      ].join(''), 'two')
    ]);
  }

  /* ---------- SOURCES ---------- */
  function sources() {
    return UI.stack([
      UI.sectionHeader({ eyebrow: 'Sources', title: 'Source health', count: 7, actions: UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }), meta: 'Per-source fetch log for the feeds behind the public site: last success, last attempt, failures in 24 h.' }),
      UI.card({ flush: true, body: UI.table({
        columns: [{ label: 'Source' }, { label: 'Last ok', mono: true }, { label: 'Last attempt', mono: true }, { label: 'Failures 24 h', align: 'right' }, { label: 'Duration', align: 'right', mono: true }, { label: 'Last error' }],
        rows: D.sources.map(function (s) { return ['<b>' + esc(s[0]) + '</b>', UI.mono(s[1]), UI.mono(s[2]), s[3] ? UI.chip({ label: String(s[3]), tone: s[3] > 3 ? 'danger' : 'warning' }) : UI.num(0), UI.mono(s[4]), s[5] ? '<span class="' + UI.cls.danger + '">' + esc(s[5]) + '</span>' : '<span class="' + UI.cls.muted + '">none</span>']; }),
        rowAttrs: function (i) { return i === 5 ? 'data-tone="danger"' : (i === 4 ? 'data-tone="warning"' : ''); }
      }) })
    ]);
  }

  /* ---------- SETTINGS ---------- */
  function settings() {
    var switches = '<div class="' + UI.cls.switchList + '">' + D.settings.switches.map(function (s) { return UI.switchRow({ label: s[0], description: s[1], checked: s[2] }); }).join('') + '</div>';
    var admins = UI.table({ columns: [{ label: 'Email' }, { label: 'Created', mono: true }, { label: 'Last sign-in', mono: true }, { label: '', align: 'right' }],
      rows: D.settings.admins.map(function (a) { return [esc(a[0]), UI.mono(a[1]), UI.mono(a[2]), UI.iconButton({ icon: 'trash-2', label: 'Remove' })]; }) });
    var addAdmin = UI.formRow([UI.input({ label: 'New admin email', placeholder: 'name@lovinmalta.com', type: 'email' }), UI.input({ label: 'Password', placeholder: '12 characters or more', type: 'password' }), UI.buttonSlot(UI.button({ label: 'Add admin', icon: 'user-plus', variant: 'primary' }))]);
    var audit = UI.table({ columns: [{ label: 'When', mono: true }, { label: 'Admin' }, { label: 'Action' }, { label: 'Target' }],
      rows: D.settings.audit.map(function (a) { return [UI.mono(a[0]), esc(a[1]), UI.chip({ label: a[2], tone: 'default' }), a[3] ? UI.mono(a[3]) : '']; }) });
    var errors = UI.table({ columns: [{ label: 'Path', mono: true }, { label: 'Error' }, { label: 'Count', align: 'right' }, { label: 'Last seen', mono: true }],
      rows: D.settings.errors.map(function (e) { return [UI.mono(e[0]), '<span class="' + UI.cls.danger + '">' + esc(e[1]) + '</span>', UI.num(e[2]), UI.mono(e[3])]; }) });
    var p = D.settings.pilot;
    var pilotBody = '<p class="' + UI.cls.muted + '">' + esc(p.line) + '</p><div class="' + UI.cls.row + '">' + p.chips.map(function (c) { return UI.chip({ label: c, tone: 'default' }); }).join('') + '</div>' +
      UI.grid([UI.column('Ready', p.ready), UI.column('In review', p.review), UI.column('Blocked', p.blocked)].join(''), 'three');
    return UI.stack([
      UI.sectionHeader({ eyebrow: 'Settings', title: 'Settings', count: 1, actions: UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }) }),
      UI.grid([
        UI.card({ title: 'Feature switches', description: 'Each switch writes to the meta table and takes effect on the next request.', body: switches }),
        UI.card({ title: 'Admin accounts', count: 3, body: admins + addAdmin, flush: true })
      ].join(''), 'two'),
      UI.card({ title: 'Audit log', actions: UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }), body: audit, footer: '<span class="' + UI.cls.muted + '">Newest first, capped at 20 rows; every admin mutation lands here.</span>', flush: true }),
      UI.card({ title: 'Errors, last 24 h', count: 1, actions: UI.button({ label: 'Refresh', icon: 'refresh-cw', variant: 'ghost', size: 'sm' }), body: errors, flush: true }),
      UI.card({ title: 'Pilot build loop', chip: UI.chip({ label: p.state, tone: 'success', dot: true }), meta: p.checked, body: pilotBody })
    ]);
  }

  /* ---------- BOOT ---------- */
  var SECTIONS = { home: home, review: review, people: people, market: market, intel: intel, newsroom: newsroom, sources: sources, settings: settings };

  function parseHash() {
    var out = {};
    location.hash.replace(/^#/, '').split('&').forEach(function (p) { if (!p) return; var kv = p.split('='); out[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || ''); });
    return out;
  }

  function route() {
    var h = parseHash();
    var key = SECTIONS[h.section] ? h.section : 'home';
    document.querySelectorAll('[data-section-panel]').forEach(function (el) { el.hidden = el.getAttribute('data-section-panel') !== key; });
    document.querySelectorAll('[data-nav]').forEach(function (el) {
      var on = el.getAttribute('data-nav') === key;
      if (on) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
    });
    var pl = document.getElementById('people-list'), pp = document.getElementById('people-profile');
    if (pl && pp) { pp.hidden = !h.member; pl.hidden = !!h.member; }
    var ml = document.getElementById('market-list'), md = document.getElementById('market-detail');
    if (ml && md) { md.hidden = !h.listing; ml.hidden = !!h.listing; }
    window.scrollTo(0, 0);
    if (window.lucide) window.lucide.createIcons();
  }

  function setTheme(dark) {
    var root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.style.colorScheme = dark ? 'dark' : 'light';
    try { localStorage.setItem('lm-theme', dark ? 'dark' : 'light'); } catch (e) {}
    var b = document.getElementById('theme-toggle');
    if (b) { b.innerHTML = UI.icon(dark ? 'sun' : 'moon'); b.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode'); }
    if (window.lucide) window.lucide.createIcons();
  }
  function setAccent(mode) {
    document.documentElement.setAttribute('data-accent', mode);
    try { localStorage.setItem('lm-accent', mode); } catch (e) {}
    document.querySelectorAll('[data-accent-option]').forEach(function (el) {
      var on = el.getAttribute('data-accent-option') === mode;
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      el.setAttribute('data-selected', on ? 'true' : 'false');
    });
  }

  function wire() {
    document.addEventListener('click', function (e) {
      var nav = e.target.closest('[data-nav]');
      if (nav) { e.preventDefault(); location.hash = '#section=' + nav.getAttribute('data-nav'); return; }
      var opt = e.target.closest('[data-accent-option]');
      if (opt) { setAccent(opt.getAttribute('data-accent-option')); return; }
      if (e.target.closest('#theme-toggle')) { setTheme(!document.documentElement.classList.contains('dark')); return; }
      if (e.target.closest('#search-open')) { openPalette(true); return; }
      if (e.target.closest('#palette-close') || (e.target.id === 'palette')) { openPalette(false); return; }
      var st = e.target.closest('#series-tabs [data-key]');
      if (st) {
        st.parentNode.querySelectorAll('[data-key]').forEach(function (t) { t.setAttribute('data-selected', t === st ? 'true' : 'false'); t.setAttribute('aria-selected', t === st ? 'true' : 'false'); });
        document.getElementById('bars').innerHTML = UI.bars({ values: D.series[st.getAttribute('data-key')], labels: D.series.labels });
        return;
      }
      var it = e.target.closest('#intel-tabs [data-key]');
      if (it) {
        it.parentNode.querySelectorAll('[data-key]').forEach(function (t) { t.setAttribute('data-selected', t === it ? 'true' : 'false'); t.setAttribute('aria-selected', t === it ? 'true' : 'false'); });
        document.getElementById('intel-registry').hidden = it.getAttribute('data-key') !== 'registry';
        document.getElementById('intel-feed').hidden = it.getAttribute('data-key') !== 'feed';
        if (window.lucide) window.lucide.createIcons();
        return;
      }
      var qf = e.target.closest('#queue-filters [data-key]');
      if (qf) {
        qf.parentNode.querySelectorAll('[data-key]').forEach(function (t) { t.setAttribute('data-selected', t === qf ? 'true' : 'false'); t.setAttribute('aria-pressed', t === qf ? 'true' : 'false'); });
        var k = qf.getAttribute('data-key'); var n = 0;
        document.querySelectorAll('#queue-list [data-kind]').forEach(function (row) { var show = k === 'all' || row.getAttribute('data-kind') === k; row.hidden = !show; if (show) n++; });
        document.getElementById('queue-empty').hidden = n > 0;
        return;
      }
      var chip = e.target.closest('[data-filter-chip]');
      if (chip && !chip.closest('#queue-filters')) {
        chip.parentNode.querySelectorAll('[data-filter-chip]').forEach(function (t) { t.setAttribute('data-selected', t === chip ? 'true' : 'false'); t.setAttribute('aria-pressed', t === chip ? 'true' : 'false'); });
        return;
      }
      var tab = e.target.closest('[data-tab-key]');
      if (tab) { tab.parentNode.querySelectorAll('[data-tab-key]').forEach(function (t) { t.setAttribute('data-selected', t === tab ? 'true' : 'false'); t.setAttribute('aria-selected', t === tab ? 'true' : 'false'); }); return; }
      var sw = e.target.closest('[data-switch]');
      if (sw) { var on = sw.getAttribute('aria-checked') !== 'true'; sw.setAttribute('aria-checked', on ? 'true' : 'false'); sw.setAttribute('data-selected', on ? 'true' : 'false'); return; }
      var cb = e.target.closest('[data-checkbox]');
      if (cb) { var c = cb.getAttribute('aria-checked') !== 'true'; cb.setAttribute('aria-checked', c ? 'true' : 'false'); cb.setAttribute('data-selected', c ? 'true' : 'false'); var tr = cb.closest('tr'); if (tr) tr.setAttribute('data-selected', c ? 'true' : 'false'); return; }
      var row = e.target.closest('tr[data-member]');
      if (row && !e.target.closest('a, button, [data-checkbox]')) { location.hash = '#section=people&member=' + row.getAttribute('data-member'); return; }
    });
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(true); }
      if (e.key === 'Escape') openPalette(false);
      if (e.altKey && !e.ctrlKey && !e.metaKey) { var s = D.nav[Number(e.key) - 1]; if (s) { e.preventDefault(); location.hash = '#section=' + s.key; } }
    });
    window.addEventListener('hashchange', route);
  }
  function openPalette(open) {
    var p = document.getElementById('palette');
    if (!p) return;
    p.hidden = !open;
    if (open) { var i = p.querySelector('input'); if (i) { i.value = ''; i.focus(); } if (window.lucide) window.lucide.createIcons(); }
  }

  function boot() {
    var dark = false, accent = 'default';
    try { dark = localStorage.getItem('lm-theme') === 'dark'; accent = localStorage.getItem('lm-accent') || 'default'; } catch (e) {}
    UI.shell({
      nav: D.nav, version: D.version, admin: D.admin,
      panels: Object.keys(SECTIONS).map(function (k) { return { key: k, html: SECTIONS[k]() }; })
    });
    wire();
    setTheme(dark);
    setAccent(accent);
    route();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
