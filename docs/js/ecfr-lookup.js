// eCFR lookup for the recalled-versus-accessed demo, through the AI4RA MCP server.
// The server (ai4ra-mcp, hosted on the lakehouse VM) wraps the eCFR API as MCP tools
// and allows any browser origin, so the deck calls it directly: no key, no proxy.
// It follows the server's own instructions: ecfr_search limited to 2 CFR 200, then
// ecfr_get_regulation on the top hit. A section over 6,000 characters comes back as
// an outline of its lettered paragraphs, and only the one paragraph that answers the
// question is read, so each lookup is two or three small calls, never a whole section.
import { callMCPTool } from './mindrouter-fetch.js';

export const ECFR_MCP_URL = 'https://nlayman-external.insight.uidaho.edu/mcp/ecfr/mcp';

const STOPWORDS = new Set((
  'a an the of to for in on at by with without from under over into is are was were be been being ' +
  'do does did can could may might must shall should will would what which who whom whose when where ' +
  'how why that this these those it its their they them he she we you i my our your and or but if then ' +
  'than as about per any some all each every no not only also much many how charge charged use used ' +
  'allowed allow counts count toward recipient recipients subrecipient subrecipients federal award ' +
  'awards grant grants rule rules'
).split(/\s+/));

// A tool result is a JSON string inside the first content part. A tool error comes back
// as plain prose ("Error executing tool ..."), so anything that is not JSON is an error.
function parseToolResult(raw) {
  if (raw && typeof raw === 'object') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(String(raw).replace(/^Error executing tool \w+:\s*/, ''));
  }
}

async function ecfrTool(name, args) {
  const data = parseToolResult(await callMCPTool(ECFR_MCP_URL, name, args));
  if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
  return data;
}

// Content words of a question, most distinctive first by position. The eCFR search matches a
// section only when it has every word, so callers search with three, then fewer.
export function keywordsFromQuestion(question, max = 3) {
  const words = String(question)
    .toLowerCase()
    .replace(/[^a-z0-9.\s-]/g, ' ')
    .split(/\s+/)
    .filter(function (w) { return w && !STOPWORDS.has(w) && w.length > 1; });
  const seen = [];
  words.forEach(function (w) { if (!seen.includes(w)) seen.push(w); });
  return seen.slice(0, max);
}

// Pick the outline entry whose heading best matches: the search words count double, since they
// are the distilled intent, and the question's other content words break ties. Index 0 when none match.
export function pickChunkByKeywords(outline, question, searchWords) {
  const strong = (Array.isArray(searchWords) ? searchWords : String(searchWords || '').split(/\s+/))
    .map(function (w) { return w.toLowerCase(); }).filter(Boolean);
  const weak = keywordsFromQuestion(question, 8).filter(function (w) { return !strong.includes(w); });
  function hits(heading, words) {
    return words.reduce(function (n, w) {
      return n + (new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + 's?\\b').test(heading) ? 1 : 0);
    }, 0);
  }
  let best = 0;
  let bestScore = -1;
  outline.forEach(function (line, i) {
    const heading = String(line).toLowerCase();
    const score = 2 * hits(heading, strong) + hits(heading, weak);
    if (score > bestScore) { best = i; bestScore = score; }
  });
  return best;
}

function outlineOffset(line) {
  const n = parseInt(String(line).split(':')[0], 10);
  return Number.isNaN(n) ? null : n;
}

// Full-text search of 2 CFR 200 (the Uniform Guidance). Returns the server's result list.
export async function searchUniformGuidance(words, perPage = 3) {
  const data = await ecfrTool('ecfr_search', { query: words, title: 2, part: '200', per_page: perPage });
  return data.results || [];
}

// Search with the words given, then with fewer, until something in 2 CFR 200 matches.
async function searchWithFallback(words, onStatus) {
  let list = Array.isArray(words) ? words.slice() : String(words).trim().split(/\s+/);
  while (list.length) {
    const query = list.join(' ');
    if (onStatus) onStatus('Searching 2 CFR 200 for “' + query + '”…');
    const results = await searchUniformGuidance(query, 3);
    const top = results.find(function (r) { return r && r.section; });
    if (top) return { top: top, query: query };
    list.pop();
  }
  return null;
}

// Search, then read the one chunk of the top hit that bears on the question.
// options.question    the question, used to choose a chunk and as the fallback keyword source
// options.chooseChunk async (outline, question) => index; the model's pick. On failure the
//                     keyword pick is used.
// options.onStatus    progress text for the page
// Returns null when nothing in 2 CFR 200 matches the words.
export async function lookupUniformGuidance(words, options = {}) {
  const onStatus = options.onStatus || function () {};
  const found = await searchWithFallback(words, onStatus);
  if (!found) return null;
  const top = found.top;
  const args = { title: Number(top.title || 2), part: String(top.part || '200'), section: String(top.section) };

  onStatus('Reading ' + (top.citation || ('2 CFR ' + top.section)) + '…');
  const first = await ecfrTool('ecfr_get_regulation', args);
  let text = first.text || '';
  let pinpoint = first.pinpoint || first.citation || '';
  let chunkHeading = '';

  if (first.truncated && Array.isArray(first.outline) && first.outline.length) {
    let index = null;
    if (options.chooseChunk) {
      try {
        index = await options.chooseChunk(first.outline, options.question || words);
      } catch {
        index = null;
      }
    }
    if (typeof index !== 'number' || index < 0 || index >= first.outline.length) {
      index = pickChunkByKeywords(first.outline, options.question || words, found.query);
    }
    const offset = outlineOffset(first.outline[index]);
    chunkHeading = String(first.outline[index]).replace(/^\d+:\s*/, '').replace(/\s*\([\d,]+ chars\)\s*$/, '');
    onStatus('Reading ' + (first.citation || args.section) + ', ' + chunkHeading + '…');
    const chunk = await ecfrTool('ecfr_get_regulation', Object.assign({ offset: offset }, args));
    text = chunk.text || '';
    pinpoint = chunk.pinpoint || pinpoint;
  }

  return {
    citation: first.citation || ('2 CFR ' + args.section),
    pinpoint: pinpoint,
    heading: top.heading || '',
    chunkHeading: chunkHeading,
    date: first.date || '',
    sourceUrl: first.source_url || '',
    searchWords: found.query,
    text: text.trim()
  };
}
