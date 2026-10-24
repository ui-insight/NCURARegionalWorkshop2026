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
  var BALL_R = 5, NAIL_R = 6;
  var GRAVITY = 0.11, BOUNCE = 0.5, JITTER = 0.3, MAX_V = 3.2;
  var DROP_X = 2.5 * BIN_W;          // over the middle of a bin, not a divider

  var GOLD = '#f1b300', INK = '#191919', MUTED = '#8a8a8a';

  // Staggered nail grid
  var ROWS = 9, TOP = 70, ROW_GAP = (BIN_TOP - TOP - 30) / (ROWS - 1);
  var SPACING = 50;
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
  var dragging = null, hover = null;

  function drop(n) {
    for (var i = 0; i < n; i++) {
      balls.push({ x: DROP_X + (Math.random() - 0.5) * 2, y: 18 - i * 22, vx: 0, vy: 0, done: false });
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

    // funnel marker
    ctx.fillStyle = MUTED;
    ctx.beginPath(); ctx.moveTo(DROP_X - 14, 6); ctx.lineTo(DROP_X + 14, 6); ctx.lineTo(DROP_X, 22); ctx.closePath(); ctx.fill();

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
    var best = null, bestD = 22 * 22;
    nails.forEach(function (n) {
      var d = (n.x - p.x) * (n.x - p.x) + (n.y - p.y) * (n.y - p.y);
      if (d < bestD) { best = n; bestD = d; }
    });
    return best;
  }
  canvas.addEventListener('pointerdown', function (e) {
    var n = nailAt(toCanvas(e));
    if (n) { dragging = n; canvas.setPointerCapture(e.pointerId); e.preventDefault(); e.stopPropagation(); }
  });
  canvas.addEventListener('pointermove', function (e) {
    var p = toCanvas(e);
    if (dragging) {
      dragging.x = Math.max(NAIL_R, Math.min(W - NAIL_R, p.x)); // side to side only
      e.preventDefault();
    } else {
      hover = nailAt(p);
      canvas.style.cursor = hover ? 'ew-resize' : 'default';
    }
  });
  function release() { dragging = null; }
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('pointerleave', function () { hover = null; });

  root.querySelectorAll('[data-pk]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var a = btn.getAttribute('data-pk');
      if (a === 'drop1') drop(1);
      else if (a === 'drop25') drop(25);
      else if (a === 'reset') { counts = new Array(BINS).fill(0); balls = []; }
      else if (a === 'nails') { nails.forEach(function (n, i) { n.x = home[i].x; }); }
    });
  });

  loop();
})();
