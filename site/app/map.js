/* A stylised Malta map (Gozo, Comino, Malta) with the report pins from LMA.reports. */
window.LMMap = function (opts) {
  opts = opts || {};
  var portrait = !!opts.portrait, R = portrait ? [5.2, 3.2] : [3.6, 2.3];
  var pins = (window.LMA.reports || []).map(function (r) {
    return '<g class="pin" data-kind="' + r.kind + '" transform="translate(' + r.x + ' ' + r.y + ')"><circle r="' + R[0] + '" class="pin-halo"/><circle r="' + R[1] + '" class="pin-dot"/></g>';
  }).join('');
  return '<svg class="map ' + (opts.cls || '') + '" viewBox="' + (portrait ? '0 -34 100 138' : '0 0 100 70') + '" preserveAspectRatio="' + (portrait ? 'xMidYMid meet' : 'xMidYMid slice') + '" aria-label="Map of Malta with live reports">' +
    '<rect x="-20" y="-60" width="140" height="200" class="sea"/>' +
    '<g class="roads" stroke-width=".35" fill="none"><path d="M38 40 L52 44 L62 43 L70 48"/><path d="M46 36 L50 44 L47 56"/><path d="M60 33 L58 47 L64 58"/></g>' +
    '<path class="land" d="M30 28 L38 26 L45 30 L52 29 L60 33 L68 36 L76 42 L78 50 L72 58 L64 62 L55 60 L47 57 L40 52 L34 45 L30 38 Z"/>' +
    '<path class="land" d="M8 12 L16 8 L24 9 L30 14 L28 20 L20 23 L12 21 L7 17 Z"/>' +
    '<path class="land" d="M32 21 L36 20 L37 24 L33 25 Z"/>' +
    '<g class="labels" font-size="2.6"><text x="14" y="16">Gozo</text><text x="50" y="46">Malta</text><text x="61" y="41">Sliema</text><text x="62" y="35">St Julian\'s</text><text x="70" y="52">Valletta</text><text x="41" y="35">Mosta</text></g>' +
    pins + '</svg>';
};
