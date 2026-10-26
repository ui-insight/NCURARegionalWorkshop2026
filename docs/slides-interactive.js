/* Interactive slide elements ·shared across all decks */
(function () {
  'use strict';

  /* --- Task sorter (zones, AI/DS, etc.) --- */
  document.querySelectorAll('.task-sorter').forEach(function (sorter) {
    sorter.querySelectorAll('.sort-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.sort-item');
        item.querySelectorAll('.sort-btn').forEach(function (b) { b.classList.remove('chosen'); });
        btn.classList.add('chosen');
      });
    });

    var revealBtn = sorter.querySelector('.sort-reveal');
    if (revealBtn) {
      revealBtn.addEventListener('click', function () {
        sorter.querySelectorAll('.sort-item').forEach(function (item) {
          var answer = item.dataset.answer;
          var chosen = item.querySelector('.sort-btn.chosen');
          if (chosen && chosen.dataset.zone === answer) {
            item.classList.add('correct');
            item.classList.remove('wrong');
          } else {
            item.classList.add('wrong');
            item.classList.remove('correct');
            item.querySelectorAll('.sort-btn').forEach(function (b) {
              if (b.dataset.zone === answer) b.classList.add('answer');
            });
          }
        });
        revealBtn.textContent = 'Answers revealed';
        revealBtn.style.pointerEvents = 'none';
        revealBtn.style.opacity = '0.5';
      });
    }
  });

  /* --- Hallucination exercise --- */
  document.querySelectorAll('.hallucination-exercise').forEach(function (ex) {
    ex.querySelectorAll('.h-sentence').forEach(function (s) {
      s.addEventListener('click', function () {
        if (!ex.classList.contains('revealed')) {
          s.classList.toggle('flagged');
        }
      });
    });

    var revealBtn = ex.querySelector('.sort-reveal');
    if (revealBtn) {
      revealBtn.addEventListener('click', function () {
        if (ex.classList.contains('revealed')) {
          ex.classList.remove('revealed');
          ex.querySelectorAll('.h-sentence').forEach(function (s) {
            s.classList.remove('flagged');
          });
          revealBtn.textContent = 'Reveal answers';
        } else {
          ex.classList.add('revealed');
          ex.querySelectorAll('.h-sentence').forEach(function (s) {
            s.classList.remove('flagged');
          });
          revealBtn.textContent = 'Try again';
        }
      });
    }
  });

  /* --- Spectrum sliders (0-10 score display) --- */
  function updateSpectrumReadout(range) {
    if (!range) return;
    var item = range.closest('.spectrum-item');
    var readout = item ? item.querySelector('.spectrum-value') : null;
    if (!readout) return;
    readout.textContent = Number(range.value).toFixed(1);
  }

  document.querySelectorAll('.spectrum-range').forEach(function (range) {
    updateSpectrumReadout(range);
  });

  document.addEventListener('input', function (evt) {
    if (evt.target && evt.target.classList.contains('spectrum-range')) {
      updateSpectrumReadout(evt.target);
    }
  });

  document.addEventListener('change', function (evt) {
    if (evt.target && evt.target.classList.contains('spectrum-range')) {
      updateSpectrumReadout(evt.target);
    }
  });

  /* --- Toggle compare --- */
  document.querySelectorAll('.toggle-compare').forEach(function (comp) {
    comp.querySelectorAll('.toggle-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = btn.dataset.panel;
        comp.querySelectorAll('.toggle-btn').forEach(function (b) { b.classList.remove('active'); });
        comp.querySelectorAll('.toggle-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var target = comp.querySelector('.toggle-panel[data-panel="' + panel + '"]');
        if (target) target.classList.add('active');
      });
    });
  });

  /* --- Medallion expand --- */
  document.querySelectorAll('.medallion-layer.expandable').forEach(function (layer) {
    layer.addEventListener('click', function () {
      var detailId = layer.dataset.detail;
      var detail = document.getElementById(detailId);
      if (detail) {
        document.querySelectorAll('.medallion-detail.visible').forEach(function (d) {
          if (d.id !== detailId) d.classList.remove('visible');
        });
        detail.classList.toggle('visible');
      }
    });
  });

  /* --- Source trust rater --- */
  document.querySelectorAll('.traffic-btn').forEach(function (btn) {
    var states = ['', 'green', 'yellow', 'red'];
    var idx = 0;
    btn.addEventListener('click', function () {
      idx = (idx + 1) % states.length;
      btn.className = 'traffic-btn' + (states[idx] ? ' ' + states[idx] : '');
    });
  });

  /* --- Card flip --- */
  document.querySelectorAll('.flip-card').forEach(function (card) {
    card.addEventListener('click', function () {
      card.classList.toggle('flipped');
    });
  });
})();
