// Key manager: reads ?key= from URL, stores in sessionStorage, propagates to links
// sessionStorage is tab-scoped — cleared when the tab closes, never written to disk.

const STORAGE_KEY = 'ai4ra_gemini_key';

// Cross-origin links that need ?key= appended (sessionStorage can't help here)
const CROSS_ORIGIN_TARGETS = [
  'nate-layman.github.io/promptulus',
  'ui-insight.github.io/data-crawler-carl'
];

export function getKey() {
  return sessionStorage.getItem(STORAGE_KEY) || '';
}

export function setKey(k) {
  if (k) {
    sessionStorage.setItem(STORAGE_KEY, k);
  } else {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}

export function readKeyFromURL() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('key');
  if (key) {
    setKey(key);
    const cleanUrl = new URL(window.location);
    cleanUrl.searchParams.delete('key');
    window.history.replaceState({}, '', cleanUrl);
  }
  return getKey();
}

function isCrossOriginTarget(href) {
  if (!href) return false;
  return CROSS_ORIGIN_TARGETS.some(function (target) { return href.includes(target); });
}

function appendKeyToUrl(href, key) {
  try {
    const url = new URL(href, window.location.origin);
    url.searchParams.set('key', key);
    return url.toString();
  } catch {
    const sep = href.includes('?') ? '&' : '?';
    return href + sep + 'key=' + encodeURIComponent(key);
  }
}

// Intercept clicks on interactive links to inject key at click time
export function installLinkInterceptor() {
  document.addEventListener('click', function (e) {
    const key = getKey();
    if (!key) return;
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (isCrossOriginTarget(href)) {
      e.preventDefault();
      const newHref = appendKeyToUrl(href, key);
      if (anchor.target === '_blank') {
        window.open(newHref, '_blank', 'noopener');
      } else {
        window.location.href = newHref;
      }
    }
  });
}
