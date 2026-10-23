// Key status indicator: a small badge on every page saying whether the
// workshop key is loaded in this tab, plus a one-time toast when the key
// has just been read from ?key= (the moment after scanning the QR code).
import { getKey, wasKeyLoadedFromURL } from './key-manager.js';

const STYLE = `
.key-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-decoration: none;
  white-space: nowrap;
  border: 1.5px solid transparent;
}
.key-badge::before {
  content: "";
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: currentColor;
}
.key-badge.is-loaded {
  color: #191919;
  background: #f1b300;
  border-color: #f1b300;
}
.key-badge.is-missing {
  color: #9a3412;
  background: #fff4ec;
  border-color: #f6b48a;
}
.key-badge.is-missing::before { background: #ea580c; }
.key-badge.is-loaded::before { background: #166534; }
.nav-list .key-badge { margin-left: 0.25rem; align-self: center; }
.slides-home .key-badge { margin-left: 0.5rem; min-height: 2.5rem; padding: 0.55rem 0.9rem; font-size: 0.85rem; }
.key-toast {
  position: fixed;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%) translateY(1rem);
  z-index: 10000;
  max-width: min(32rem, 92vw);
  padding: 0.8rem 1.1rem;
  border-radius: 0.75rem;
  background: #191919;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 0.95rem;
  line-height: 1.4;
  box-shadow: 0 12px 32px rgba(0,0,0,0.3);
  opacity: 0;
  transition: opacity 250ms ease, transform 250ms ease;
}
.key-toast strong { color: #f1b300; }
.key-toast.is-visible { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

let badge = null;

function ensureStyle() {
  if (document.getElementById('key-status-style')) return;
  const style = document.createElement('style');
  style.id = 'key-status-style';
  style.textContent = STYLE;
  document.head.appendChild(style);
}

function describe(key) {
  if (!key) return { cls: 'is-missing', text: 'No key loaded', title: 'Promptulus will ask for a key. Scan the workshop QR code or paste a key on the home page.' };
  const kind = key.startsWith('mr2_') ? 'MindRouter key loaded' : 'Key loaded';
  return { cls: 'is-loaded', text: kind, title: 'Promptulus links on this site carry the key. It lives in this browser tab only.' };
}

function mountBadge(container, href) {
  if (!container) return;
  if (!badge) {
    badge = document.createElement('a');
    badge.className = 'key-badge';
    badge.href = href || 'index.html#key';
    if (container.classList.contains('nav-list')) {
      const li = document.createElement('li');
      li.appendChild(badge);
      container.appendChild(li);
    } else {
      container.appendChild(badge);
    }
  }
  const d = describe(getKey());
  badge.className = 'key-badge ' + d.cls;
  badge.textContent = d.text;
  badge.title = d.title;
}

function showToast(key) {
  const toast = document.createElement('div');
  toast.className = 'key-toast';
  toast.setAttribute('role', 'status');
  const kind = key.startsWith('mr2_') ? 'University of Idaho MindRouter key' : 'API key';
  toast.innerHTML = '<strong>Workshop key loaded.</strong> The ' + kind +
    ' is set for this tab. Promptulus links on this site will use it automatically.';
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-visible'));
  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 300);
  }, 7000);
}

/**
 * Mount the badge and, when the key has just arrived via the URL, the toast.
 * @param {Object} opts
 * @param {Element} opts.container  Where to put the badge (.nav-list or .slides-home)
 * @param {string}  [opts.href]     Where the badge links (default: home page key modal)
 */
export function initKeyStatus(opts) {
  ensureStyle();
  mountBadge(opts.container, opts.href);
  const key = getKey();
  if (key && wasKeyLoadedFromURL()) showToast(key);
  window.__keyStatus = () => mountBadge(opts.container, opts.href);
}
