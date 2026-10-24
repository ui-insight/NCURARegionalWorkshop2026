// Pachinko board for the "how a model picks the next word" slide.
// Balls drop from one spot, bounce through staggered nails, and land in word bins.
// Nails can be dragged side to side (never up or down). The teaching point: you
// never steer one ball, only the shape of the pile, and the nails are the weights.
(function () {
  var root = document.getElementById('pachinko');
  if (!root) return;

  var canvas = root.querySelector('canvas');
  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;

  var WORDS = ['rejected', 'returned', 'submitted', 'approved', 'funded'];
  var BINS = WORDS.length;
  var BIN_W = W / BINS;
  var BIN_TOP = H - 150;          // top of the bin dividers
  var FLOOR = H - 30;             // balls stop here
  var BALL_R = 3.5, NAIL_R = 3;
  var GRAVITY = 0.11, BOUNCE = 0.3, JITTER = 1.2, MAX_V = 3.2, MAX_UP = 0.8;
  var DROP_X = 2.5 * BIN_W;          // set by the previous word; dragged by hand too
  var DROP_Y = 40, PREV = 'proposal';

  var GOLD = '#f1b300', INK = '#191919', MUTED = '#8a8a8a';

  // Staggered nail grid
  var ROWS = 9, TOP = 84, ROW_GAP = (BIN_TOP - TOP - 30) / (ROWS - 1);
  var SPACING = 17;
  var home = [];
  for (var r = 0; r < ROWS; r++) {
    var offset = (r % 2) ? SPACING / 2 : 0;
    for (var x = SPACING / 2 + offset; x < W - 10; x += SPACING) {
      home.push({ x: x, y: TOP + r * ROW_GAP });
    }
  }
  var nails = home.map(function (n) { return { x: n.x, y: n.y }; });

  var balls = [];
  var counts = new Array(BINS).fill(0);
  var dragging = null, hover = null, funnelHover = false;

  function drop(n) {
    for (var i = 0; i < n; i++) {
      balls.push({ x: DROP_X + (Math.random() - 0.5) * 8, y: DROP_Y - i * 22, vx: (Math.random() - 0.5) * 0.6, vy: 0, done: false });
    }
  }

  function step() {
    for (var i = 0; i < balls.length; i++) {
      var b = balls[i];
      if (b.done) continue;
      b.vy += GRAVITY;
      b.x += b.vx; b.y += b.vy;
      b.vx *= 0.995;
      var sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (sp > MAX_V) { b.vx *= MAX_V / sp; b.vy *= MAX_V / sp; }

      // nails
      for (var j = 0; j < nails.length; j++) {
        var n = nails[j];
        var dx = b.x - n.x, dy = b.y - n.y;
        var d2 = dx * dx + dy * dy, min = BALL_R + NAIL_R;
        if (d2 < min * min) {
          var d = Math.sqrt(d2) || 0.01, nx = dx / d, ny = dy / d;
          b.x = n.x + nx * min; b.y = n.y + ny * min;
          var vn = b.vx * nx + b.vy * ny;
          if (vn < 0) {
            b.vx -= (1 + BOUNCE) * vn * nx;
            b.vy -= (1 + BOUNCE) * vn * ny;
            b.vx += (Math.random() - 0.5) * JITTER;
            if (b.vy < -MAX_UP) b.vy = -MAX_UP;   // a nail can nudge a ball up, not launch it
          }
        }
      }

      // side walls
      if (b.x < BALL_R) { b.x = BALL_R; b.vx = Math.abs(b.vx) * BOUNCE; }
      if (b.x > W - BALL_R) { b.x = W - BALL_R; b.vx = -Math.abs(b.vx) * BOUNCE; }

      // bin dividers
      if (b.y > BIN_TOP - BALL_R) {
        for (var k = 1; k < BINS; k++) {
          var wx = k * BIN_W;
          if (Math.abs(b.x - wx) < BALL_R) {
            b.x = b.x < wx ? wx - BALL_R : wx + BALL_R;
            b.vx = -b.vx * BOUNCE;
          }
        }
      }

      // land
      if (b.y >= FLOOR - BALL_R) {
        b.done = true;
        var bin = Math.min(BINS - 1, Math.max(0, Math.floor(b.x / BIN_W)));
        counts[bin]++;
      }
    }
    balls = balls.filter(function (b) { return !b.done; });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // the previous word, and the funnel it drops from
    ctx.textAlign = 'center';
    ctx.fillStyle = INK;
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    var phrase = 'The ' + PREV + ' was';
    var half = ctx.measureText(phrase).width / 2 + 6;
    var tx = Math.max(half, Math.min(W - half, DROP_X));
    ctx.fillText(phrase, tx, 16);
    ctx.fillStyle = (dragging === 'funnel' || funnelHover) ? GOLD : MUTED;
    ctx.beginPath(); ctx.moveTo(DROP_X - 14, 22); ctx.lineTo(DROP_X + 14, 22); ctx.lineTo(DROP_X, 38); ctx.closePath(); ctx.fill();

    // bins and their piles
    var max = Math.max.apply(null, counts.concat([1]));
    var total = counts.reduce(function (a, c) { return a + c; }, 0);
    for (var i = 0; i < BINS; i++) {
      var x0 = i * BIN_W;
      var h = (FLOOR - BIN_TOP - 4) * counts[i] / max;
      ctx.fillStyle = counts[i] === max && total ? GOLD : 'rgba(241,179,0,0.45)';
      ctx.fillRect(x0 + 6, FLOOR - h, BIN_W - 12, h);
      ctx.fillStyle = INK;
      ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(WORDS[i], x0 + BIN_W / 2, H - 4);
      if (total) {
        ctx.fillStyle = MUTED;
        ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(Math.round(100 * counts[i] / total) + '%', x0 + BIN_W / 2, FLOOR - h - 6);
      }
    }
    ctx.strokeStyle = INK; ctx.lineWidth = 2;
    for (var k = 1; k < BINS; k++) {
      ctx.beginPath(); ctx.moveTo(k * BIN_W, BIN_TOP); ctx.lineTo(k * BIN_W, FLOOR); ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(0, FLOOR); ctx.lineTo(W, FLOOR); ctx.stroke();

    // nails, and the track a dragged nail can slide along
    if (dragging) {
      ctx.strokeStyle = 'rgba(241,179,0,0.5)'; ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(0, dragging.y); ctx.lineTo(W, dragging.y); ctx.stroke(); ctx.setLineDash([]);
    }
    for (var j = 0; j < nails.length; j++) {
      var n = nails[j], moved = Math.abs(n.x - home[j].x) > 0.5;
      ctx.fillStyle = (n === dragging || n === hover) ? GOLD : (moved ? '#b8860b' : INK);
      ctx.beginPath(); ctx.arc(n.x, n.y, NAIL_R + (n === hover || n === dragging ? 2 : 0), 0, Math.PI * 2); ctx.fill();
    }

    // balls in flight
    ctx.fillStyle = '#2f6fbf';
    for (var i2 = 0; i2 < balls.length; i2++) {
      ctx.beginPath(); ctx.arc(balls[i2].x, balls[i2].y, BALL_R, 0, Math.PI * 2); ctx.fill();
    }

    var label = root.querySelector('.pk-total');
    if (label) label.textContent = total + (total === 1 ? ' ball' : ' balls');
  }

  function loop() {
    // nails glide toward a target when a button moves them
    nails.forEach(function (n) {
      if (n.tx === undefined) return;
      n.x += (n.tx - n.x) * 0.12;
      if (Math.abs(n.tx - n.x) < 0.2) { n.x = n.tx; n.tx = undefined; }
    });
    // two physics steps per frame keeps fast balls from passing through nails
    step(); step();
    draw();
    requestAnimationFrame(loop);
  }

  // Pointer handling. getBoundingClientRect accounts for Reveal's slide scaling.
  function toCanvas(e) {
    var r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height };
  }
  function nailAt(p) {
    var best = null, bestD = 9 * 9;
    nails.forEach(function (n) {
      var d = (n.x - p.x) * (n.x - p.x) + (n.y - p.y) * (n.y - p.y);
      if (d < bestD) { best = n; bestD = d; }
    });
    return best;
  }
  canvas.addEventListener('pointerdown', function (e) {
    var p0 = toCanvas(e);
    if (p0.y < 44 && Math.abs(p0.x - DROP_X) < 26) { dragging = 'funnel'; canvas.setPointerCapture(e.pointerId); e.preventDefault(); e.stopPropagation(); return; }
    var n = nailAt(p0);
    if (n) { dragging = n; canvas.setPointerCapture(e.pointerId); e.preventDefault(); e.stopPropagation(); }
  });
  canvas.addEventListener('pointermove', function (e) {
    var p = toCanvas(e);
    if (dragging === 'funnel') {
      DROP_X = Math.max(14, Math.min(W - 14, p.x));
      e.preventDefault();
    } else if (dragging) {
      dragging.tx = undefined;
      dragging.x = Math.max(NAIL_R, Math.min(W - NAIL_R, p.x)); // side to side only
      e.preventDefault();
    } else {
      funnelHover = p.y < 44 && Math.abs(p.x - DROP_X) < 26;
      hover = funnelHover ? null : nailAt(p);
      canvas.style.cursor = (hover || funnelHover) ? 'ew-resize' : 'default';
    }
  });
  function release() { dragging = null; }
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('pointerleave', function () { hover = null; funnelHover = false; });

  root.querySelectorAll('[data-pk]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var a = btn.getAttribute('data-pk');
      if (a === 'drop1') drop(1);
      else if (a === 'drop25') drop(25);
      else if (a === 'reset') { counts = new Array(BINS).fill(0); balls = []; }
      else if (a === 'nails') { shifted = false; nails.forEach(function (n, i) { n.tx = home[i].x; }); }
      else if (a === 'shift') { shiftNails(); }
    });
  });

  // "Shift the nails": a banana. In each row, six nails pack into a short
  // solid shelf; the top shelf ends just past the drop point, and each shelf
  // below ends further right by a bigger step, so the shelves bend down and to
  // the right like a banana. A ball lands near a shelf's right end, usually
  // rolls off that end, and drops onto the next shelf. The rest of each row's
  // nails spread out to the left of its shelf; nothing sits under or right of
  // the band. Balls that roll off a shelf's left end make the tail.
  var shifted = false, SHELF = 6, PACK = 9, CLEAR = 14;
  var RIGHT_END = [-10, 9, 15, 24, 36, 52, 72, 96, 124];      // shelf right end, measured from the drop point
  function shiftNails() {
    shifted = true;
    var rows = {};
    nails.forEach(function (n, i) { (rows[n.y] = rows[n.y] || []).push(i); });
    var ys = Object.keys(rows).map(Number).sort(function (p, q) { return p - q; });
    ys.forEach(function (y, r) {
      var idx = rows[y].slice().sort(function (p, q) { return home[p].x - home[q].x; });
      var end = Math.min(W - NAIL_R, DROP_X + RIGHT_END[Math.min(r, RIGHT_END.length - 1)]);
      var start = end - PACK * (SHELF - 1);
      var shelf = idx.slice(-SHELF), rest = idx.slice(0, idx.length - SHELF);
      shelf.forEach(function (i, k) { nails[i].tx = start + PACK * k; });
      var leftEnd = start - CLEAR;
      rest.forEach(function (i, k) {
        nails[i].tx = Math.max(NAIL_R, NAIL_R + (leftEnd - NAIL_R) * (rest.length > 1 ? k / (rest.length - 1) : 0.5));
      });
    });
  }

  // The previous word moves the drop point. Same board, different starting place.
  var chips = root.querySelectorAll('[data-pk-prev]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      PREV = chip.getAttribute('data-pk-prev');
      DROP_X = parseFloat(chip.getAttribute('data-pk-x')) * W;
      counts = new Array(BINS).fill(0); balls = [];
      if (shifted) shiftNails();           // the funnel follows the drop point
      chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
      var q = root.querySelector('.pk-prompt');
      if (q) q.textContent = '"The ' + PREV + ' was ___."';
    });
  });

  loop();
})();
