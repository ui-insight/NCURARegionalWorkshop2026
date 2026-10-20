/* Part 2 deck: NARC grid rendering, narrative cards, room tally */
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
