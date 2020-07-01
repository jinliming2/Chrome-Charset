/**
 * Created by Liming on 2017/2/14.
 */
const charsetPattern = /; ?charset=([^;]+)/;
const html_special_chars = html => html
  .replace(/&/g, '&gt;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/ /g, '&nbsp;')
  .replace(/'/g, '&#39;')
  .replace(/"/g, '&quot;')
  .replace(/\r\n?|\n/g, '<br>');
const recordRecentlySelectedEncoding = encoding => {
  const recent = (localStorage.getItem('recent') || '')
    .split(',')
    .filter(e => e && e !== encoding)
    .slice(0, 2);
  localStorage.setItem('recent', [encoding, ...recent].join(','));
};

const options = [
  chrome.webRequest.OnHeadersReceivedOptions.BLOCKING,
  chrome.webRequest.OnHeadersReceivedOptions.RESPONSE_HEADERS,
];
if(chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS')) {
  options.push(chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS);
}

const encodingList = new Map();
const listeners = new Map();
let defaultEncoding;
let defaultListener;

const getHeaderModifier = () => details => {
  const encoding = encodingList.get(details.tabId) || defaultEncoding;
  if (!encoding) {
    return;
  }
  let found = false;
  for (const responseHeader of details.responseHeaders) {
    if (responseHeader.name.toLowerCase() !== 'content-type') {
      continue;
    }
    found = true;
    let value = responseHeader.value.toLowerCase();
    if(
      ['main_frame', 'sub_frame', 'stylesheet', 'script', 'xmlhttprequest'].includes(details.type) ||
      value.startsWith('text') ||
      value.startsWith('application/javascript') ||
      value.startsWith('application/x-javascript') ||
      value.startsWith('application/json')
    ) {
      if(charsetPattern.test(value)) {
        value = value.replace(charsetPattern.exec(value)[1], encoding);
      } else {
        value += value.substr(-1) === ';' ? ' ' : '; ';
        value += `charset=${encoding}`;
      }
      responseHeader.value = value;
    }
    break;
  }
  if (!found) {
    details.responseHeaders.push({
      name: 'Content-Type',
      value: `text/plain; charset=${encoding}`,
    });
  }
  return { responseHeaders: details.responseHeaders };
};

const bodyModifier = (tabId, changeInfo, tab) => {
  if (!tab.url.toLowerCase().startsWith('file://')) {
    return;
  }
  if (changeInfo.status.toLowerCase() !== 'complete') {
    return;
  }
  const encoding = encodingList.get(tabId) || defaultEncoding;
  if (!encoding) {
    return;
  }
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.overrideMimeType(`text/plain; charset=${encoding}`);
  xmlHttp.onload = () => {
    const is_html = /\.html?$/.test(tab.url);
    const data = is_html ? encodeURIComponent(xmlHttp.responseText) : encodeURIComponent(html_special_chars(xmlHttp.responseText));
    chrome.tabs.executeScript(tabId, {
      code: `const _t = document.open('text/${is_html ? 'html' : 'plain'}', 'replace');
      _t.write(${is_html ? `decodeURIComponent('${data}')` : `'<pre>' + decodeURIComponent('${data}') + '</pre>'`});
      _t.close();`,
      runAt: 'document_start',
    });
  };
  xmlHttp.onerror = () => alert(chrome.i18n.getMessage('cannotLoadLocalFile'));
  xmlHttp.open('GET', tab.url, true);
  xmlHttp.send();
};

const setEncoding = (tabId, encoding) => {
  encodingList.set(tabId, encoding);
  recordRecentlySelectedEncoding(encoding);
  if (defaultEncoding) {
    return;
  }
  if (listeners.size === 0) {
    chrome.tabs.onUpdated.addListener(bodyModifier);
  }
  if (!listeners.has(tabId)) {
    const headerModifier = getHeaderModifier();
    listeners.set(tabId, headerModifier);
    chrome.webRequest.onHeadersReceived.addListener(headerModifier, { urls: ['<all_urls>'], tabId }, options);
  }
};

const resetEncoding = tabId => {
  const callback = listeners.get(tabId);
  if (callback) {
    chrome.webRequest.onHeadersReceived.removeListener(callback);
    listeners.delete(tabId);
  }
  encodingList.delete(tabId);
  if (defaultEncoding) {
    return;
  }
  if (listeners.size === 0) {
    chrome.tabs.onUpdated.removeListener(bodyModifier);
  }
};

const getEncoding = tabId => encodingList.get(tabId) || defaultEncoding;

const setupDefaultEncoding = () => {
  defaultEncoding = localStorage.getItem('config_enable_default');
  if (!defaultEncoding) {
    return;
  }
  if (listeners.size === 0) {
    chrome.tabs.onUpdated.addListener(bodyModifier);
  }
  listeners.forEach((callback, tabId) => {
    chrome.webRequest.onHeadersReceived.removeListener(callback);
    listeners.delete(tabId);
  });
  if (!defaultListener) {
    defaultListener = getHeaderModifier();
  }
  chrome.webRequest.onHeadersReceived.addListener(defaultListener, { urls: ['<all_urls>'] }, options);
};

const unsetDefaultEncoding = () => {
  defaultEncoding = undefined;
  chrome.webRequest.onHeadersReceived.removeListener(defaultListener);
  encodingList.forEach((encoding, tabId) => {
    if (!listeners.has(tabId)) {
      const headerModifier = getHeaderModifier();
      listeners.set(tabId, headerModifier);
      chrome.webRequest.onHeadersReceived.addListener(headerModifier, { urls: ['<all_urls>'], tabId }, options);
    }
  });
  if (listeners.size === 0) {
    chrome.tabs.onUpdated.removeListener(bodyModifier);
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch(message.type) {
    case 'setEncoding': sendResponse(setEncoding(message.tabId, message.encoding)); break;
    case 'resetEncoding': sendResponse(resetEncoding(message.tabId)); break;
    case 'getEncoding': sendResponse(getEncoding(message.tabId)); break;
    case 'createMenu': removeMenu(); sendResponse(createMenu()); break;
    case 'removeMenu': sendResponse(removeMenu()); break;
    case 'setupDefaultEncoding': unsetDefaultEncoding(); sendResponse(setupDefaultEncoding()); break;
    case 'unsetDefaultEncoding': sendResponse(unsetDefaultEncoding()); break;
  }
});

setupDefaultEncoding();
