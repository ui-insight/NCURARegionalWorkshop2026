/* Part 2 deck: NARC grid rendering, guess pads, narrative cards, room tally */
(function () {
  'use strict';

  /* --- NARC grids: <div class="narc-grid" data-grid="[[0,1],[1,0]]"> --- */
  var PALETTE = window.NARC_PALETTE || {};

  document.querySelectorAll('.narc-grid[data-grid]').forEach(function (el) {
    var rows = JSON.parse(el.dataset.grid);
    var cols = rows[0].length;
    el.style.gridTemplateColumns = 'repeat(' + cols + ', var(--cell))';
    rows.forEach(function (row) {
      row.forEach(function (v) {
        var cell = document.createElement('span');
        cell.className = 'narc-cell';
        cell.style.background = PALETTE[v] || '#000000';
        el.appendChild(cell);
      });
    });
    el.setAttribute('role', 'img');
    if (!el.getAttribute('aria-label')) {
      el.setAttribute('aria-label', rows.length + ' by ' + cols + ' color grid');
    }
  });

  /* --- Guess pads: paint the hidden grid, then check it ---
     <div class="guess-pad" id="pad-x" data-rows="5" data-cols="5" data-answer="[[...]]"></div>
     <div class="guess-tools" data-pad="pad-x" data-palette="0,2,3,4" data-copy="[[...]]" data-copy-label="Start from grid 3"></div>
     Same control as the UI AI Symposium deck (bertybaums/narratives-workshop). */
  var NAMES = window.NARC_COLOR_NAMES || {};

  // A mouse or touch click leaves focus on the button, and Reveal would then
  // advance the slide AND press the button again on the space bar. A keyboard
  // click has detail 0 and keeps its focus, so tabbing through the cells still works.
  function dropFocus(e, el) {
    if (e.detail > 0) el.blur();
  }

  document.querySelectorAll('.guess-pad').forEach(function (pad) {
    var rows = Number(pad.dataset.rows), cols = Number(pad.dataset.cols);
    var answer = JSON.parse(pad.dataset.answer);
    var tools = document.querySelector('.guess-tools[data-pad="' + pad.id + '"]');
    var palette = (tools.dataset.palette || '0').split(',').map(Number);
    var current = palette[1] != null ? palette[1] : palette[0];
    var state = [];
    var cells = [];

    var result = document.createElement('p');
    result.className = 'guess-result';
    result.setAttribute('aria-live', 'polite');

    function clearResult() {
      result.textContent = '';
      result.className = 'guess-result';
    }

    function paint(r, c, v) {
      state[r][c] = v;
      cells[r][c].style.background = PALETTE[v];
      cells[r][c].setAttribute('aria-label', 'Row ' + (r + 1) + ' column ' + (c + 1) + ', ' + (NAMES[v] || v));
    }

    pad.style.gridTemplateColumns = 'repeat(' + cols + ', var(--cell))';
    pad.setAttribute('role', 'group');
    pad.setAttribute('aria-label', 'Your guess for the hidden grid, ' + rows + ' by ' + cols);

    function addCell(r, c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'guess-cell';
      b.addEventListener('click', function (e) {
        pad.classList.add('touched');
        paint(r, c, state[r][c] === current ? 0 : current);
        clearResult();
        dropFocus(e, b);
      });
      pad.appendChild(b);
      cells[r].push(b);
      state[r].push(0);
    }

    for (var r = 0; r < rows; r++) {
      state.push([]);
      cells.push([]);
      for (var c = 0; c < cols; c++) addCell(r, c);
    }
    for (r = 0; r < rows; r++) for (c = 0; c < cols; c++) paint(r, c, 0);

    var q = document.createElement('span');
    q.className = 'guess-q';
    q.setAttribute('aria-hidden', 'true');
    q.textContent = '?';
    pad.appendChild(q);

    palette.forEach(function (v) {
      var s = document.createElement('button');
      s.type = 'button';
      s.className = 'swatch';
      s.style.background = PALETTE[v];
      s.title = 'Paint ' + (NAMES[v] || v);
      s.setAttribute('aria-label', 'Paint ' + (NAMES[v] || v));
      s.setAttribute('aria-pressed', String(v === current));
      s.addEventListener('click', function (e) {
        current = v;
        tools.querySelectorAll('.swatch').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        s.setAttribute('aria-pressed', 'true');
        dropFocus(e, s);
      });
      tools.appendChild(s);
    });

    function btn(text, fn) {
      var x = document.createElement('button');
      x.type = 'button';
      x.className = 'tool-btn';
      x.textContent = text;
      x.addEventListener('click', function (e) {
        fn();
        dropFocus(e, x);
      });
      tools.appendChild(x);
    }

    function fill(source) {
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) paint(r, c, source ? source[r][c] : 0);
      clearResult();
    }

    if (tools.dataset.copy) {
      var copyFrom = JSON.parse(tools.dataset.copy);
      btn(tools.dataset.copyLabel || 'Start from the last grid', function () {
        pad.classList.add('touched');
        fill(copyFrom);
      });
    }
    btn('Clear', function () {
      pad.classList.remove('touched');
      fill(null);
    });
    btn('Check', function () {
      var off = 0;
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) if (state[r][c] !== answer[r][c]) off++;
      result.textContent = off === 0 ? 'Exactly right' : off + (off === 1 ? ' cell' : ' cells') + ' off';
      result.className = 'guess-result ' + (off === 0 ? 'ok' : 'off');
    });

    tools.appendChild(result);
  });

  /* --- Narrative cards: click to reveal whether the model solved it --- */
  document.querySelectorAll('.narr-grid').forEach(function (grid) {
    grid.querySelectorAll('.narr-card').forEach(function (card) {
      card.addEventListener('click', function () {
        card.classList.toggle('revealed');
      });
    });
    var all = grid.parentElement.querySelector('.narr-reveal-all');
    if (all) {
      all.addEventListener('click', function () {
        var cards = grid.querySelectorAll('.narr-card');
        var anyHidden = Array.prototype.some.call(cards, function (c) {
          return !c.classList.contains('revealed');
        });
        cards.forEach(function (c) { c.classList.toggle('revealed', anyHidden); });
        all.textContent = anyHidden ? 'Hide results' : 'Reveal all';
      });
    }
  });

  /* --- Room tally: click adds a hand, shift-click removes one --- */
  document.querySelectorAll('.tally').forEach(function (tally) {
    var buttons = tally.querySelectorAll('.tally-btn');
    var bar = tally.querySelector('.tally-bar');

    function render() {
      var total = 0;
      buttons.forEach(function (b) { total += Number(b.dataset.n || 0); });
      bar.innerHTML = '';
      buttons.forEach(function (b) {
        var n = Number(b.dataset.n || 0);
        b.querySelector('.tally-n').textContent = n;
        if (!n) return;
        var seg = document.createElement('span');
        seg.className = 'tally-seg tally-' + b.dataset.opt;
        seg.style.flexGrow = n;
        seg.textContent = n;
        bar.appendChild(seg);
      });
      bar.classList.toggle('empty', total === 0);
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function (e) {
        var n = Number(b.dataset.n || 0);
        b.dataset.n = e.shiftKey ? Math.max(0, n - 1) : n + 1;
        render();
      });
    });

    var reset = tally.querySelector('.tally-reset');
    if (reset) {
      reset.addEventListener('click', function () {
        buttons.forEach(function (b) { b.dataset.n = 0; });
        render();
      });
    }

    render();
  });
})();
