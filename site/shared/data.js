/* Lovin Admin mock data. One source for both mockups so the comparison is only about the
   design system. Every number, name and locality here is sample content in the shape the
   real admin renders (docs/PRODUCT-MAP.md, web/admin.html). */
window.LM = {
  version: 'v1.71',
  generated: '2026-09-07 10:02 UTC',
  admin: { name: 'Alex Dreyfus', email: 'alex@lovinmalta.com', initials: 'AD' },

  nav: [
    { key: 'home', label: 'Home', icon: 'house' },
    { key: 'review', label: 'Review centre', icon: 'inbox', badge: 7 },
    { key: 'people', label: 'Users', icon: 'users' },
    { key: 'market', label: 'Marketplace', icon: 'briefcase', badge: 12 },
    { key: 'intel', label: 'Malta Intelligence', icon: 'landmark', badge: 2 },
    { key: 'newsroom', label: 'Newsroom', icon: 'newspaper' },
    { key: 'sources', label: 'Sources', icon: 'rss' },
    { key: 'settings', label: 'Settings', icon: 'key-round', badge: 1 }
  ],

  attention: [
    { value: 7, label: 'items in the Review centre', section: 'review' },
    { value: 12, label: 'marketplace listings to review', section: 'market' },
    { value: 1, label: 'unhandled errors, 24 h', section: 'settings' },
    { value: 2, label: 'sources stale or failing', section: 'intel', sub: ['pa-planning', 'jobsplus-labour'] },
    { value: 1, label: 'releases waiting for a description', section: 'home' }
  ],

  top: [
    { value: '1,284', label: 'people on WhatsApp' },
    { value: '312', label: 'WhatsApp msgs in, 24 h' },
    { value: '298', label: 'WhatsApp msgs out, 24 h' },
    { value: '9', label: 'reports today' },
    { value: '23', label: 'active reports' },
    { value: '41', label: 'leads total' },
    { value: '3,908', label: 'newsletter subscribers' }
  ],

  agent: {
    state: 'connected',
    note: 'Ejja answered 298 messages in the last 24 h. Alerts go out 08:00 to 22:00 Malta time, subscribers only.',
    kv: [
      ['Agent', 'connected'],
      ['Mode', 'answering and alerts'],
      ['Last inbound', '09:58 UTC, from Sliema'],
      ['Alerts today', '14 sent to 212 subscribers'],
      ['Number age', '37 days']
    ]
  },

  mywork: [
    ['09:01', 'login', ''],
    ['09:14', 'approve report', 'Power cut, Tower Road, Sliema'],
    ['09:22', 'release listing', 'Two-bedroom apartment, Msida'],
    ['09:40', 'suspend member', 'QA 0d4c9e8b'],
    ['09:52', 'edit source', 'pa-planning']
  ],

  series: {
    labels: ['2026-08-25', '2026-09-07'],
    incidents: [6, 9, 4, 11, 7, 5, 8, 14, 10, 6, 9, 12, 8, 9],
    wa: [210, 244, 198, 260, 231, 175, 190, 302, 288, 240, 265, 310, 296, 312],
    users: [12, 18, 9, 22, 15, 8, 11, 27, 19, 14, 16, 24, 21, 17],
    leads: [1, 3, 0, 2, 4, 1, 2, 5, 3, 2, 1, 6, 4, 3]
  },

  leads: {
    kinds: [
      { label: 'All', count: 41, active: true },
      { label: 'advertise', count: 18 },
      { label: 'experience', count: 14 },
      { label: 'jobs', count: 9 }
    ],
    rows: [
      ['2026-09-07', 'advertise', 'Homepage takeover, October', 'Marisa Cutajar', 'marisa@phoenicia.example'],
      ['2026-09-07', 'experience', 'Blue Lagoon sailing', 'Lead f3d08bb9', 'lead-b8ec45@example.com'],
      ['2026-09-06', 'jobs', 'Featured job slot', 'Karl Debono', 'karl@gamingjobs.example'],
      ['2026-09-06', 'advertise', 'WhatsApp sponsored alert', 'Gozo Channel', 'ads@gozochannel.example'],
      ['2026-09-05', 'experience', 'Comino kayak tour', 'Lead 5a93d377', 'lead-08d825@example.com'],
      ['2026-09-05', 'advertise', 'Food section sponsor', 'Ta Kris restaurant', 'hello@takris.example']
    ]
  },

  releases: [
    { version: 'v1.71', deployed: '2026-09-07 08:59', description: '' },
    { version: 'v1.70', deployed: '2026-09-06 21:12', description: 'Property hub: news, guides and listings behind one door (LM-145)' },
    { version: 'v1.69', deployed: '2026-09-06 17:40', description: 'Users: saved views, bulk suspend, keyboard shortcuts' },
    { version: 'v1.68', deployed: '2026-09-06 11:05', description: 'Malta Intelligence: triage view and batched refresh' }
  ],

  queue: {
    kinds: [
      { key: 'all', label: 'All', count: 7, active: true },
      { key: 'incident_held', label: 'Held', count: 2, icon: 'shield-check' },
      { key: 'incident_text_held', label: 'Text held', count: 1, icon: 'eye-off' },
      { key: 'photo_quarantine', label: 'Photo review', count: 1, icon: 'image-off' },
      { key: 'incident_flagged', label: 'Flagged', count: 1, icon: 'flag' },
      { key: 'whatson_pending', label: "What's On", count: 1, icon: 'calendar' },
      { key: 'market_pending', label: 'Market', count: 1, icon: 'tag' }
    ],
    items: [
      { kind: 'incident_flagged', kindLabel: 'Flagged', tone: 'danger', icon: 'flag', title: 'Fight outside Paceville club, police on site', age: '12 min', open: true,
        meta: [['Reporter', 'Josef B. (WhatsApp)'], ['Locality', 'St Julian\'s'], ['Confidence', 'single report'], ['Flags', '3 readers']],
        hint: 'Names a venue and describes an arrest. The newsroom desk should confirm with the police before it goes live.',
        actions: ['Approve', 'Hold', 'Reject'] },
      { kind: 'incident_held', kindLabel: 'Held', tone: 'info', icon: 'shield-check', title: 'Power cut, Tower Road, Sliema', age: '31 min',
        meta: [['Reporter', 'Maria Camilleri'], ['Locality', 'Sliema'], ['Confidence', '4 reports, Enemalta unconfirmed']],
        hint: 'Held by the locality surge rule: 4 reports in 10 minutes from Sliema.',
        actions: ['Approve', 'Reject'] },
      { kind: 'incident_held', kindLabel: 'Held', tone: 'info', icon: 'shield-check', title: 'Flooding at the Msida junction after the storm', age: '48 min',
        meta: [['Reporter', 'Andrew Grech'], ['Locality', 'Msida'], ['Confidence', '2 reports']],
        hint: 'Photo attached, plate numbers visible. Blur before release or approve text only.',
        actions: ['Approve', 'Approve text only', 'Reject'] },
      { kind: 'incident_text_held', kindLabel: 'Text held', tone: 'warning', icon: 'eye-off', title: 'Jellyfish at Golden Bay this morning', age: '1 h',
        meta: [['Reporter', 'Claire Vella'], ['Locality', 'Mellieha'], ['Held by', 'model moderation, 0.62']],
        hint: 'Details mention a named lifeguard. Map pin is live, the text waits here.',
        actions: ['Release text', 'Keep held'] },
      { kind: 'photo_quarantine', kindLabel: 'Photo review', tone: 'warning', icon: 'image-off', title: 'Roadworks photo, Triq il-Kbira, Mosta', age: '2 h',
        meta: [['Reporter', 'Luke Farrugia'], ['Locality', 'Mosta'], ['Reason', 'faces detected']],
        hint: 'One face in the frame. Approve with the automatic blur or reject the photo.',
        actions: ['Approve with blur', 'Reject photo'] },
      { kind: 'whatson_pending', kindLabel: "What's On", tone: 'success', icon: 'calendar', title: 'Notte Bianca 2026, Valletta, 3 October', age: '3 h',
        meta: [['Submitted by', 'Roberta Galea'], ['Venue', 'Valletta, city-wide'], ['Category', 'Festival']],
        hint: 'Official programme link checked. Poster is the organiser\'s own.',
        actions: ['Publish', 'Ask for changes', 'Reject'] },
      { kind: 'market_pending', kindLabel: 'Market', tone: 'success', icon: 'tag', title: 'Two-bedroom apartment, Gzira, EUR 1,150 a month', age: '5 h',
        meta: [['Seller', 'Daniel Spiteri'], ['Locality', 'Gzira'], ['Contact', 'WhatsApp']],
        hint: 'First listing from this member. Photos are original, price is within the locality band.',
        actions: ['Release', 'Hold', 'Reject'] }
    ]
  },

  people: {
    total: 2148,
    views: ['Morning triage', 'Suspended this week', 'New this month'],
    columns: ['User', 'Provider', 'Trust', 'Reports', 'Points', 'Last connection', 'Status'],
    rows: [
      { name: 'Maria Camilleri', provider: 'WhatsApp', trust: 'Trusted', reports: 42, points: 318, last: '2026-09-07 09:58', status: 'Active' },
      { name: 'Josef Borg', provider: 'WhatsApp', trust: 'New', reports: 3, points: 12, last: '2026-09-07 09:50', status: 'Active' },
      { name: 'Claire Vella', provider: 'Google', trust: 'Regular', reports: 17, points: 141, last: '2026-09-07 08:31', status: 'Active' },
      { name: 'Andrew Grech', provider: 'name', trust: 'Regular', reports: 11, points: 96, last: '2026-09-06 22:14', status: 'Active' },
      { name: 'Sarah Zammit', provider: 'WhatsApp', trust: 'Trusted', reports: 63, points: 522, last: '2026-09-06 19:02', status: 'Active' },
      { name: 'Luke Farrugia', provider: 'Google', trust: 'New', reports: 2, points: 8, last: '2026-09-06 16:45', status: 'Active' },
      { name: 'Chiara Micallef', provider: 'WhatsApp', trust: 'Regular', reports: 24, points: 203, last: '2026-09-05 11:20', status: 'Active' },
      { name: 'QA 0d4c9e8b', provider: 'name', trust: 'New', reports: 3, points: 9, last: '2026-09-04 12:34', status: 'Suspended' },
      { name: 'Matthew Attard', provider: 'WhatsApp', trust: 'Regular', reports: 9, points: 77, last: '2026-09-03 07:12', status: 'Active' },
      { name: 'Roberta Galea', provider: 'Google', trust: 'Trusted', reports: 38, points: 401, last: '2026-09-02 18:40', status: 'Active' },
      { name: 'Daniel Spiteri', provider: 'WhatsApp', trust: 'New', reports: 1, points: 5, last: '2026-09-02 10:05', status: 'Active' },
      { name: 'Newsroom', provider: 'newsroom', trust: 'Newsroom', reports: 0, points: 0, last: '2026-09-07 08:00', status: 'Newsroom' }
    ],
    profile: {
      name: 'Maria Camilleri', pub_id: 'm_7f3a91c2', provider: 'WhatsApp', joined: '2026-06-12', trust: 'Trusted', status: 'Active',
      tabs: ['Overview', 'Activity', 'Reports', 'Listings', 'Audit'],
      stats: [['42', 'reports'], ['318', 'points'], ['6', 'listings']],
      kv: [['Locality', 'Sliema'], ['Sign-ins', '212'], ['Last sign-in', '2026-09-07 09:58 from Malta'], ['Newsletter', 'subscribed'], ['WhatsApp alerts', 'Sliema, Gzira, St Julian\'s']],
      activity: [
        ['09:58', 'report', 'Power cut, Tower Road, Sliema', 'held'],
        ['08:12', 'sign-in', 'WhatsApp', ''],
        ['Sep 6', 'listing', 'Bicycle, city bike, EUR 120', 'live'],
        ['Sep 6', 'report', 'Bus 13 detour at the Ferries', 'live'],
        ['Sep 5', 'vote', 'Power: outage confirmed, Gzira', ''],
        ['Sep 4', 'report', 'Jellyfish at Exiles', 'archived']
      ]
    }
  },

  market: {
    queue: [
      ['Two-bedroom apartment, Gzira', 'Lovin Properties', 'Daniel Spiteri', 'Gzira', 'EUR 1,150/mo', 'WhatsApp', '5 h'],
      ['Toyota Aygo 2018, 61,000 km', 'Lovin Cars', 'Kevin Mifsud', 'Birkirkara', 'EUR 7,900', 'Phone', '9 h'],
      ['Kitchen manager, full time', 'Lovin Jobs', 'Ta Kris restaurant', 'Sliema', 'EUR 28,000/yr', 'Email', '11 h'],
      ['Penthouse with sea views, Xemxija', 'Lovin Properties', 'Frank Sant', 'St Paul\'s Bay', 'EUR 495,000', 'WhatsApp', '14 h'],
      ['Volkswagen Polo 2016, 98,000 km', 'Lovin Cars', 'Anna Pace', 'Qormi', 'EUR 6,200', 'WhatsApp', 'yesterday'],
      ['Junior front-end developer', 'Lovin Jobs', 'Betsson Malta', 'Ta\' Xbiex', 'EUR 32,000/yr', 'Email', 'yesterday']
    ],
    statuses: [
      { label: 'All', count: 812, active: true }, { label: 'Pending', count: 12 }, { label: 'Live', count: 640 }, { label: 'Held', count: 4 }, { label: 'Expired', count: 131 }, { label: 'Rejected', count: 19 }, { label: 'Archived', count: 6 }
    ],
    all: [
      ['Waiting staff for a busy seafront cafe', 'Live', 'Lovin Jobs', 'Marina Cafe', 'Sliema', 'EUR 1,500/mo', '2026-09-07'],
      ['Two-bedroom apartment, Gzira', 'Pending', 'Lovin Properties', 'Daniel Spiteri', 'Gzira', 'EUR 1,150/mo', '2026-09-07'],
      ['Mercedes-Benz A-Class 2019, 52,000 km', 'Live', 'Lovin Cars', 'Gianluca Pisani', 'Naxxar', 'EUR 22,500', '2026-09-06'],
      ['Studio flat near the university', 'Held', 'Lovin Properties', 'Ivan Muscat', 'Msida', 'EUR 750/mo', '2026-09-06'],
      ['Accountant, ACCA part qualified', 'Live', 'Lovin Jobs', 'Zampa Debattista', 'Valletta', 'EUR 30,000/yr', '2026-09-05'],
      ['Honda Jazz 2015, 120,000 km', 'Expired', 'Lovin Cars', 'Rita Abela', 'Zebbug', 'EUR 5,400', '2026-08-06'],
      ['Townhouse with courtyard, Rabat', 'Rejected', 'Lovin Properties', 'Unverified', 'Rabat', 'EUR 320,000', '2026-08-30'],
      ['Weekend barista, Victoria', 'Live', 'Lovin Jobs', 'Cafe Jubilee', 'Gozo', 'EUR 9/h', '2026-09-04']
    ],
    detail: {
      title: 'Two-bedroom apartment, Gzira', id: 'mk_3f9a12', status: 'Pending',
      kv: [['Section', 'Lovin Properties'], ['Seller', 'Daniel Spiteri (WhatsApp, member since 2 Sep)'], ['Locality', 'Gzira'], ['Price', 'EUR 1,150 a month'], ['Posted', '2026-09-07 04:52 UTC'], ['Photos', '5, originals verified'], ['Views', '0 (not live)']],
      description: 'Bright two-bedroom apartment on the third floor, lift, two minutes from the Gzira seafront. Furnished, air conditioning in both bedrooms, available from 1 October. Long lets only.'
    }
  },

  intel: {
    tabs: ['Registry', 'Captured items'],
    sources: [
      ['NSO news releases', 'nso-releases', 'ok', 'statistics', 'html', '2026-09-07 09:30', 'ok: 09:30', 0],
      ['Government press releases (DOI)', 'doi-press-releases', 'ok', 'government', 'json', '2026-09-07 09:30', 'ok: 09:30', 0],
      ['MFSA news', 'mfsa-notices', 'ok', 'regulatory', 'rss', '2026-09-07 09:15', 'ok: 09:15', 0],
      ['Central Bank of Malta news', 'cbm-publications', 'ok', 'finance', 'rss', '2026-09-07 09:15', 'ok: 09:15', 0],
      ['Central Bank of Malta events', 'cbm-events', 'ok', 'finance', 'rss', '2026-09-07 09:15', 'ok: 09:15', 0],
      ['ERA notices', 'era-notices', 'ok', 'environment', 'rss', '2026-09-07 09:00', 'ok: 09:00', 0],
      ['Planning Authority activity', 'pa-planning', 'failing', 'planning', 'html', '2026-09-07 09:30', 'ok: 2026-09-05 18:00', 6],
      ['Jobsplus labour market', 'jobsplus-labour', 'stale', 'labour', 'html', '2026-09-06 03:00', 'ok: 2026-09-03 03:00', 2],
      ['European Commission in Malta', 'ec-malta-news', 'ok', 'eu', 'rss', '2026-09-07 09:00', 'ok: 09:00', 0]
    ],
    items: [
      ['09:31', 'nso-releases', 'Inbound tourism: July 2026', 'release', '2026-09-07'],
      ['09:31', 'doi-press-releases', 'PR261812: Budget 2027 consultation opens', 'press release', '2026-09-07'],
      ['09:16', 'mfsa-notices', 'Warning: unlicensed entity using the name Mediterranean Capital', 'notice', '2026-09-07'],
      ['09:16', 'cbm-publications', 'Monthly statistics, August 2026', 'publication', '2026-09-06'],
      ['09:01', 'era-notices', 'Public consultation: Comino management plan', 'consultation', '2026-09-05'],
      ['09:01', 'ec-malta-news', 'Erasmus+ 2027 call published', 'news', '2026-09-05']
    ],
    planning: {
      total: 1284,
      note: '1,284 applications in the last 12 months. Last fetch 2026-09-05 18:00 (stale). Source https://www.pa.org.mt/',
      rows: [
        ['PA/06412/26', 'Sliema', 'Pending', '2026-09-04', 'Demolition of a townhouse and construction of 9 apartments'],
        ['PA/06398/26', 'Mellieha', 'Approved', '2026-09-03', 'Change of use from garage to class 4B retail'],
        ['PA/06371/26', 'Marsaskala', 'Refused', '2026-09-02', 'Additional floor over an existing block'],
        ['PA/06344/26', 'Victoria, Gozo', 'Pending', '2026-09-01', 'Boutique hotel in a scheduled property']
      ]
    }
  },

  newsroom: {
    reports: [['Live on the map', '23'], ['Held or text held', '3'], ['Confirmed by a second source', '11'], ['Archived, 7 days', '58']],
    growth: [['New members, 7 days', '112'], ['WhatsApp people', '1,284'], ['Newsletter subscribers', '3,908'], ['Saved stories, 7 days', '2,341']]
  },

  sources: [
    ['Times of Malta RSS', '2026-09-07 09:55', '2026-09-07 09:55', 0, '0.8 s', ''],
    ['Lovin WordPress archive', '2026-09-07 09:45', '2026-09-07 09:45', 0, '2.1 s', ''],
    ['Enemalta planned cuts', '2026-09-07 09:00', '2026-09-07 09:00', 0, '1.4 s', ''],
    ['Malta Met Office', '2026-09-07 09:50', '2026-09-07 09:50', 0, '0.6 s', ''],
    ['Transport Malta detours', '2026-09-07 08:30', '2026-09-07 09:30', 2, '12.0 s', 'HTTP 503 from the detours page'],
    ['Planning Authority', '2026-09-05 18:00', '2026-09-07 09:30', 6, '30.0 s', 'HTTP 403 Forbidden for https://www.pa.org.mt/'],
    ['Gozo Channel schedule', '2026-09-07 09:40', '2026-09-07 09:40', 0, '0.9 s', '']
  ],

  settings: {
    switches: [
      ['Community reports', 'Members can post reports to Lovin Live', true],
      ['Marketplace posting', 'Members can post jobs, homes and cars', true],
      ['WhatsApp alerts', 'Ejja sends proactive alerts to subscribers', true],
      ['GeoIP on sign-in', 'Resolve the country of a member sign-in (D-16: off by default)', false],
      ['Newsletter capture', 'Show the newsletter box on the front page', true],
      ['market_seed', 'Sample listings for the marketplace (dev only)', false]
    ],
    admins: [
      ['alex@lovinmalta.com', '2026-08-31 16:02', '2026-09-07 09:01'],
      ['chris@lovinmalta.com', '2026-09-01 10:30', '2026-09-06 18:22'],
      ['newsroom@lovinmalta.com', '2026-09-02 08:15', '2026-09-07 07:58']
    ],
    audit: [
      ['2026-09-07 09:52', 'alex@lovinmalta.com', 'edit source', 'pa-planning'],
      ['2026-09-07 09:40', 'alex@lovinmalta.com', 'suspend member', 'QA 0d4c9e8b'],
      ['2026-09-07 09:22', 'alex@lovinmalta.com', 'release listing', 'mk_2a77c1'],
      ['2026-09-07 09:14', 'alex@lovinmalta.com', 'approve report', 'r_88fe01'],
      ['2026-09-07 09:01', 'alex@lovinmalta.com', 'login', ''],
      ['2026-09-07 07:58', 'newsroom@lovinmalta.com', 'login', ''],
      ['2026-09-06 18:40', 'chris@lovinmalta.com', 'reject listing', 'mk_19b0d4']
    ],
    errors: [['api/market/mk_5c1a77/photo', 'OSError: image too large after decode', 1, '2026-09-07 03:12']],
    pilot: {
      state: 'running', checked: 'checked just now', line: 'lane 2 building LM-249 (Malta intelligence monitoring screen), 14 min',
      chips: ['today 12 shipped', '0 blocked', '4 lanes'],
      ready: ['LM-260 History link on the profile lands the desk on a trail capped at 20 rows', 'LM-265 Profile reports stream shows held reports as plain text', 'LM-266 Release or reject a pending listing from the member profile'],
      review: ['LM-258 Sources: retry button on a failing feed'],
      blocked: []
    }
  }
};
