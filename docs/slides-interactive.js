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

  /* --- Token builder (branching predictor with drag, chart, attention) --- */
  (function () {
    var el = document.getElementById('token-builder');
    if (!el) return;

    var S = ['The', 'proposal', 'was'];
    var tree = [
      { w:'submitted', p:40, next:[
        { w:'on', p:35, next:[{ w:'time.', p:45 },{ w:'Friday.', p:25 },{ w:'schedule.', p:20 },{ w:'March 15th.', p:10 }]},
        { w:'to', p:30, next:[{ w:'NSF.', p:35 },{ w:'NIH.', p:30 },{ w:'Grants.gov.', p:20 },{ w:'the sponsor.', p:15 }]},
        { w:'late', p:20, next:[{ w:'again.', p:30 },{ w:'unfortunately.', p:25 },{ w:'but accepted.', p:25 },{ w:'by hours.', p:20 }]},
        { w:'without', p:15, next:[{ w:'review.', p:40 },{ w:'approval.', p:30 },{ w:'signatures.', p:20 },{ w:'edits.', p:10 }]}
      ]},
      { w:'approved', p:25, next:[
        { w:'by', p:40, next:[{ w:'the dean.', p:40 },{ w:'committee.', p:25 },{ w:'NSF.', p:20 },{ w:'leadership.', p:15 }]},
        { w:'with', p:25, next:[{ w:'conditions.', p:40 },{ w:'modifications.', p:25 },{ w:'minor edits.', p:20 },{ w:'full funding.', p:15 }]},
        { w:'after', p:20, next:[{ w:'review.', p:35 },{ w:'revisions.', p:30 },{ w:'months.', p:20 },{ w:'resubmission.', p:15 }]},
        { w:'despite', p:15, next:[{ w:'concerns.', p:35 },{ w:'the budget.', p:25 },{ w:'objections.', p:25 },{ w:'missing data.', p:15 }]}
      ]},
      { w:'reviewed', p:20, next:[
        { w:'by', p:35, next:[{ w:'the panel.', p:35 },{ w:'three reviewers.', p:25 },{ w:'external experts.', p:25 },{ w:'senior staff.', p:15 }]},
        { w:'and', p:30, next:[{ w:'approved.', p:40 },{ w:'returned.', p:25 },{ w:'revised.', p:20 },{ w:'flagged.', p:15 }]},
        { w:'before', p:20, next:[{ w:'submission.', p:45 },{ w:'the deadline.', p:25 },{ w:'approval.', p:20 },{ w:'routing.', p:10 }]},
        { w:'twice', p:15, next:[{ w:'already.', p:40 },{ w:'by mistake.', p:25 },{ w:'and returned.', p:20 },{ w:'for compliance.', p:15 }]}
      ]},
      { w:'rejected', p:15, next:[
        { w:'due', p:35, next:[{ w:'to budget.', p:40 },{ w:'to scope.', p:25 },{ w:'to formatting.', p:20 },{ w:'to timing.', p:15 }]},
        { w:'by', p:30, next:[{ w:'the panel.', p:35 },{ w:'NSF.', p:25 },{ w:'reviewers.', p:25 },{ w:'committee.', p:15 }]},
        { w:'after', p:20, next:[{ w:'review.', p:35 },{ w:'initial screening.', p:25 },{ w:'three rounds.', p:25 },{ w:'peer review.', p:15 }]},
        { w:'without', p:15, next:[{ w:'explanation.', p:35 },{ w:'feedback.', p:30 },{ w:'review.', p:20 },{ w:'comment.', p:15 }]}
      ]}
    ];

    /* Pre-compute all 64 paths */
    function walk(nodes, ws, prob) {
      var out = [];
      nodes.forEach(function (n) {
        var w2 = ws.concat([n.w]), p2 = prob * n.p / 100;
        if (n.next) out = out.concat(walk(n.next, w2, p2));
        else out.push({ words: w2, prob: p2 });
      });
      return out;
    }
    var paths = walk(tree, [], 1).sort(function (a, b) { return b.prob - a.prob; });
    var maxP = paths[0].prob;

    /* Attention weights ·how much each word contributes at each step */
    var attnWeights = [
      [.05, .45, .50],              // predicting word 4 from [The, proposal, was]
      [.04, .12, .29, .55],         // predicting word 5
      [.03, .08, .14, .30, .45]     // predicting word 6
    ];

    var chosen = [], curOpts = tree;

    function matches(path) {
      for (var i = 0; i < chosen.length; i++) {
        if (path.words[i] !== chosen[i]) return false;
      }
      return true;
    }

    function render(showAttn) {
      var words = S.concat(chosen);
      var step = chosen.length;           // 0, 1, 2, or 3
      var weights = step < 3 ? attnWeights[step] : attnWeights[2];

      /* Sentence */
      var sh = '';
      words.forEach(function (w, i) {
        var cls = 'tb-w';
        if (i < 3) cls += ' tb-start';
        else cls += ' tb-picked';
        /* Weight label above each word */
        var wt = (i < weights.length) ? weights[i] : null;
        var wtHtml = wt !== null
          ? '<span class="tb-weight visible" title="Attention weight: how much the model focuses on this word when predicting the next one">' + wt.toFixed(2).replace(/^0/, '') + '</span>'
          : '';
        sh += '<span class="' + cls + '">' + wtHtml + w + '</span> ';
      });
      if (step < 3) sh += '<span class="tb-blank" id="tb-drop">___</span>';

      /* Attention note ·removed to prevent layout shift */

      /* Options or outcome */
      var oh = '';
      if (chosen.length >= 3) {
        var cp = paths.find(matches);
        var pct = cp ? (cp.prob * 100).toFixed(1) : '?';
        oh = '<div class="tb-outcome">Your path: <strong>' + pct + '%</strong> probable.' +
             '<br><button class="tb-reset">Start over</button></div>';
      } else {
        oh = '<div class="tb-options">';
        curOpts.slice().sort(function (a, b) { return b.p - a.p; }).forEach(function (o) {
          oh += '<div class="tb-option" data-word="' + o.w + '" data-pct="' + o.p + '%">' +
                '<span class="tb-word">' + o.w + '</span></div>';
        });
        oh += '</div>';
      }

      /* Chart */
      var mc = 0;
      var ch = '<div class="tb-chart">';
      paths.forEach(function (p) {
        var h = Math.max(4, (p.prob / maxP) * 100);
        var m = matches(p);
        if (m) mc++;
        var exact = chosen.length >= 3 && m;
        var cls = exact ? 'tb-bar tb-bar-exact' : m ? 'tb-bar tb-bar-match' : 'tb-bar';
        var sentence = S.concat(p.words).join(' ');
        var pct = (p.prob * 100).toFixed(1) + '%';
        ch += '<div class="' + cls + '" style="height:' + h + '%"' +
              ' data-tip="' + sentence + ' ·' + pct + '"></div>';
      });
      ch += '</div>';
      var lbl = chosen.length === 0 ? 'Cumulative probability ·64 possible paths' :
                chosen.length < 3 ? 'Cumulative probability ·' + mc + ' of 64 match' :
                'Cumulative probability ·your path highlighted';
      var probContent = '';
      if (chosen.length >= 3) {
        var cp2 = paths.find(matches);
        probContent = (cp2 ? (cp2.prob * 100).toFixed(1) : '?') + '%';
      }
      var probTxt = '<div class="tb-chart-prob">' + probContent + '</div>';
      ch = '<div class="tb-chart-wrap">' + ch +
           '<div class="tb-chart-label">' + lbl + '</div>' + probTxt + '</div>';

      /* Gradient descent modal */
      var gdModal = '<div class="tb-gd-overlay">' +
        '<div class="tb-gd-modal">' +
        '<button class="tb-gd-close">&times;</button>' +
        '<div class="tb-gd-kicker">Sidebar</div>' +
        '<img src="img/diagrams/gradient_descent.png" class="tb-gd-img" alt="Gradient descent visualization">' +
        '<p class="tb-gd-title">How does it learn?</p>' +
        '<p class="tb-gd-text">' +
        'The model measures how wrong each prediction was, ' +
        'then nudges weights downhill, like a ball rolling to the lowest point. ' +
        'Repeat billions of times until predictions fit the training data.</p>' +
        '</div></div>';

      /* Layout: attention note, sentence, step label, then options + chart side by side */
      var stepVis = chosen.length < 3 ? '' : ' style="visibility:hidden"';
      var stepLabel = '<div class="tb-step"' + stepVis + '>Drag or click a word</div>';
      el.innerHTML = '<p class="tb-sentence">' + sh + '</p>' +
                     stepLabel +
                     '<div class="tb-lower">' +
                     '<div class="tb-main">' + oh + '</div>' + ch +
                     '</div>' + gdModal;

      /* Bind interactions */
      bindDrag();

      var rb = el.querySelector('.tb-reset');
      if (rb) rb.addEventListener('click', function () {
        chosen = []; curOpts = tree; render(false);
      });

      /* Chart click → open gradient descent modal */
      var chartEl = el.querySelector('.tb-chart');
      var overlay = el.querySelector('.tb-gd-overlay');
      if (chartEl && overlay) {
        chartEl.style.cursor = 'pointer';
        chartEl.addEventListener('click', function () { overlay.classList.add('visible'); });
        overlay.addEventListener('click', function (e) {
          if (e.target === overlay || e.target.classList.contains('tb-gd-close')) {
            overlay.classList.remove('visible');
          }
        });
      }

    }

    function placeWord(word) {
      var node = curOpts.find(function (n) { return n.w === word; });
      if (!node) return;
      chosen.push(word);
      curOpts = node.next || [];
      render(true);
    }

    function bindDrag() {
      el.querySelectorAll('.tb-option').forEach(function (opt) {
        var sx, sy, ghost, dragging;

        function onStart(e) {
          e.preventDefault();
          var ev = e.touches ? e.touches[0] : e;
          sx = ev.clientX; sy = ev.clientY;
          dragging = false; ghost = null;
          document.addEventListener('mousemove', onMove);
          document.addEventListener('mouseup', onEnd);
          document.addEventListener('touchmove', onMove, { passive: false });
          document.addEventListener('touchend', onEnd);
        }

        function onMove(e) {
          e.preventDefault();
          var ev = e.touches ? e.touches[0] : e;
          if (!dragging && (Math.abs(ev.clientX - sx) + Math.abs(ev.clientY - sy) > 6)) {
            dragging = true;
            ghost = opt.cloneNode(true);
            ghost.classList.add('tb-ghost');
            ghost.style.width = opt.getBoundingClientRect().width + 'px';
            document.body.appendChild(ghost);
            opt.style.opacity = '0.3';
          }
          if (ghost) {
            ghost.style.left = (ev.clientX - 30) + 'px';
            ghost.style.top = (ev.clientY - 14) + 'px';
            var drop = document.getElementById('tb-drop');
            if (drop) {
              var dr = drop.getBoundingClientRect();
              var over = ev.clientX > dr.left - 30 && ev.clientX < dr.right + 30 &&
                         ev.clientY > dr.top - 30 && ev.clientY < dr.bottom + 30;
              drop.classList.toggle('tb-drop-hover', over);
            }
          }
        }

        function onEnd(e) {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onEnd);
          document.removeEventListener('touchmove', onMove);
          document.removeEventListener('touchend', onEnd);
          if (dragging && ghost) {
            ghost.remove();
            var ev = e.changedTouches ? e.changedTouches[0] : e;
            var drop = document.getElementById('tb-drop');
            if (drop) {
              var dr = drop.getBoundingClientRect();
              if (ev.clientX > dr.left - 30 && ev.clientX < dr.right + 30 &&
                  ev.clientY > dr.top - 30 && ev.clientY < dr.bottom + 30) {
                placeWord(opt.dataset.word);
                return;
              }
            }
            opt.style.opacity = '';
          } else {
            placeWord(opt.dataset.word);
          }
        }

        opt.addEventListener('mousedown', onStart);
        opt.addEventListener('touchstart', onStart, { passive: false });
      });
    }

    render(false);
  })();

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
