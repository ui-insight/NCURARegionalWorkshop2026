// Click a QR code (.qr-zoom) to show it full screen. Click the big code to open its link;
// click anywhere else or press Esc to close. Each .qr-zoom carries data-qr-src,
// data-qr-href and data-qr-caption.
(function () {
  var overlay = document.createElement('div');
  overlay.className = 'qr-overlay';
  overlay.hidden = true;
  overlay.innerHTML = '<a target="_blank" rel="noopener"><img alt="" /></a><p></p>';
  document.body.appendChild(overlay);
  var link = overlay.querySelector('a');
  var big = overlay.querySelector('img');
  var caption = overlay.querySelector('p');

  function close() { overlay.hidden = true; }
  function open(el) {
    big.src = el.dataset.qrSrc;
    big.alt = el.querySelector('img') ? el.querySelector('img').alt : '';
    link.href = el.dataset.qrHref;
    link.title = 'Open ' + el.dataset.qrHref;
    caption.textContent = el.dataset.qrCaption || '';
    overlay.hidden = false;
  }

  document.querySelectorAll('.qr-zoom').forEach(function (el) {
    // preventDefault and stopPropagation keep a surrounding card link from firing
    el.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); open(el); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); open(el); }
    });
  });
  overlay.addEventListener('click', function (e) { if (!link.contains(e.target)) close(); });
  link.addEventListener('click', function () { setTimeout(close, 0); });
  // Capture phase, so Esc closes the code instead of opening Reveal's overview
  document.addEventListener('keydown', function (e) {
    if (!overlay.hidden && e.key === 'Escape') { e.stopImmediatePropagation(); e.preventDefault(); close(); }
  }, true);
})();
