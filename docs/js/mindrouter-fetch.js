// Small fetch helper for MindRouter-style endpoints.
// It supports JSON APIs directly, and image-ish payloads by returning an object URL
// when the response looks like an image.

export async function fetchText(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request failed: ${response.status} ${text}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export async function callMCPTool(url, toolName, args = {}, options = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      ...(options.headers || {})
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: { name: toolName, arguments: args }
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`MCP request failed: ${response.status} ${text}`);
  }

  const payload = await response.json();
  if (payload.error) {
    throw new Error(payload.error.message || JSON.stringify(payload.error));
  }

  const content = payload.result && payload.result.content;
  if (Array.isArray(content) && content.length && content[0].text) {
    return content[0].text;
  }
  return payload.result || payload;
}

export async function fetchImageObjectUrl(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || 'POST',
    headers: options.headers || {}
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Image request failed: ${response.status} ${text}`);
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
