/* Lovin Malta app mock data: one source for the four directions. Same screens, same content. */
window.LMA = {
  now: { temp: '27°', sea: '25°', wind: '14 km/h NW', sunset: '19:12', traffic: 'Heavy at Marsa and the Kappara junction', power: '2 planned cuts tomorrow', reports: 9, people: 1284 },
  reports: [
    { id: 1, title: 'Power cut on Tower Road', locality: 'Sliema', age: '31 min', by: 'Maria C.', count: 4, kind: 'power', icon: 'zap', confidence: '4 reports, Enemalta unconfirmed', votes: 12, x: 62, y: 43 },
    { id: 2, title: 'Flooding at the Msida junction', locality: 'Msida', age: '48 min', by: 'Andrew G.', count: 2, kind: 'water', icon: 'waves', confidence: '2 reports, photo', votes: 8, x: 58, y: 47 },
    { id: 3, title: 'Jellyfish at Golden Bay', locality: 'Mellieha', age: '1 h', by: 'Claire V.', count: 1, kind: 'sea', icon: 'fish', confidence: 'single report', votes: 5, x: 33, y: 18 },
    { id: 4, title: 'Roadworks on Triq il-Kbira, one lane open', locality: 'Mosta', age: '2 h', by: 'Luke F.', count: 3, kind: 'traffic', icon: 'traffic-cone', confidence: '3 reports, Transport Malta confirmed', votes: 21, x: 49, y: 36 },
    { id: 5, title: 'Bus 13 detour at the Ferries', locality: 'Sliema', age: '3 h', by: 'Sarah Z.', count: 6, kind: 'traffic', icon: 'bus', confidence: 'confirmed by Malta Public Transport', votes: 34, x: 63, y: 41 },
    { id: 6, title: 'Stray dog near the Mdina gate, friendly', locality: 'Rabat', age: '4 h', by: 'Chiara M.', count: 1, kind: 'other', icon: 'paw-print', confidence: 'single report', votes: 3, x: 44, y: 42 }
  ],
  news: [
    { title: 'New bus routes start Monday: what changes for Sliema and St Julian\'s', section: 'Local', age: '2 h', img: 'busmalta', hero: true, dek: 'Six routes move, two disappear and the Ferries interchange gets a new layout. Here is every change, stop by stop.' },
    { title: 'Notte Bianca 2026 programme announced: 140 events across Valletta', section: 'Culture', age: '4 h', img: 'valletta', dek: 'The capital stays open until two in the morning on 3 October.' },
    { title: 'Gozo Channel adds late crossings for the summer\'s last weekend', section: 'Gozo', age: '6 h', img: 'gozo' },
    { title: 'Enemalta: planned cuts in Mosta and Naxxar on Tuesday morning', section: 'Local', age: '7 h', img: 'power' },
    { title: 'The best pastizzi in Valletta, ranked by 2,000 of you', section: 'Food', age: '9 h', img: 'pastizzi' },
    { title: 'Court fines developer over Xemxija excavation without a permit', section: 'Court', age: 'yesterday', img: 'court' }
  ],
  events: [
    { title: 'Notte Bianca', venue: 'Valletta, city-wide', day: 'Sat', date: '3 Oct', time: '18:00', cat: 'Festival', img: 'nottebianca', featured: true },
    { title: 'Marsovin Wine Festival', venue: 'Hastings Gardens, Valletta', day: 'Fri', date: '11 Sep', time: '19:00', cat: 'Food and drink', img: 'wine' },
    { title: 'Farsons Beer Festival', venue: 'Ta\' Qali', day: 'Sat', date: '12 Sep', time: '20:00', cat: 'Music', img: 'beer' },
    { title: 'Sunset kayak to Comino', venue: 'Armier Bay', day: 'Sun', date: '13 Sep', time: '17:30', cat: 'Outdoors', img: 'comino' },
    { title: 'Farmers market', venue: 'Ta\' Qali', day: 'Sat', date: '12 Sep', time: '07:00', cat: 'Market', img: 'market' },
    { title: 'Manoel Theatre: season opening', venue: 'Valletta', day: 'Thu', date: '17 Sep', time: '20:00', cat: 'Theatre', img: 'theatre' }
  ],
  chat: [
    { from: 'me', text: 'Is there a power cut in Sliema right now?', at: '09:58' },
    { from: 'ejja', text: 'Four residents reported a cut on Tower Road 31 minutes ago. Enemalta has not confirmed it yet. The last one there lasted about 40 minutes.', at: '09:58' },
    { from: 'ejja', text: 'Want me to tell you when the power is back?', at: '09:58', chips: ['Yes, alert me', 'Show on the map', 'Report mine'] },
    { from: 'me', text: 'Yes, alert me', at: '09:59' },
    { from: 'ejja', text: 'Done. You will hear from me the moment the first resident reports it back, and I will keep it to Sliema only.', at: '09:59' }
  ],
  profile: { name: 'Maria Camilleri', locality: 'Sliema', trust: 'Trusted reporter', points: 318, reports: 42, confirmed: 31, rank: 12, initials: 'MC', alerts: ['Sliema', 'Gzira', 'St Julian\'s'], badges: ['First report', 'Trusted reporter', 'Storm watcher', 'Neighbour of the month'] },
  settings: [['Locality alerts', 'Sliema, Gzira, St Julian\'s', 'bell'], ['Notifications', 'Alerts only, 08:00 to 22:00', 'bell-ring'], ['Saved stories', '12', 'bookmark'], ['Leaderboard', 'You are 12th this month', 'trophy'], ['Ejja on WhatsApp', 'Open the chat', 'message-circle'], ['Appearance', 'System', 'sun-moon'], ['About Lovin Malta', 'v2.1 (46)', 'info']],
  img: function (seed, w, h) { return 'https://picsum.photos/seed/lovin-' + seed + '/' + (w || 600) + '/' + (h || 400); }
};
