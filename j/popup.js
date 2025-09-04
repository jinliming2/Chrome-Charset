/**
 * Created by Liming on 2017/2/14.
 */
import { getENCODINGS } from './encoding.js';

const rtl = chrome.i18n.getMessage('@@bidi_dir') === 'rtl' ? '&rlm;' : '';
const printEncodingInfo = info => `${info[1]} ${rtl}(${info[0]})`;

const distance = (x1, y1, x2, y2) => {
  var xDelta = x1 - x2;
  var yDelta = y1 - y2;
  return Math.sqrt(xDelta * xDelta + yDelta * yDelta);
};

chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
  if (tabs.length === 0) {
    return;
  }
  const ENCODINGS = await getENCODINGS();

  // Detect current encoding
  const currentDOM = document.getElementById('current');
  currentDOM.innerHTML = '......';
  const fileEncoding = tabs[0].url.startsWith('file://') && chrome.runtime.sendMessage({ type: 'getEncoding', tabId: tabs[0].id });
  if (fileEncoding) {
    const encodingInfo = ENCODINGS.find(e => e[0].toUpperCase() === fileEncoding.toUpperCase());
    currentDOM.innerHTML = encodingInfo ? printEncodingInfo(encodingInfo) : chrome.i18n.getMessage('unknown');
  } else {
    const results = await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => document.characterSet || document.charset,
    });
    if (results[0].result) {
      const encodingInfo = ENCODINGS.find(e => e[0].toUpperCase() === String(results[0].result).toUpperCase());
      currentDOM.innerHTML = printEncodingInfo(encodingInfo || [results[0].result, chrome.i18n.getMessage('unknown')]);
    } else {
      currentDOM.innerHTML = chrome.i18n.getMessage('unknown');
    }
  }
  // I18n
  document.getElementById('reset').innerHTML = chrome.i18n.getMessage('btnReset');
  document.getElementById('tip-current').innerHTML = chrome.i18n.getMessage('tipCurrent');
  // Setted default encoding
  const { configEnableDefault: defaultEncoding } = await chrome.storage.local.get('configEnableDefault');
  if (defaultEncoding) {
    const encodingInfo = ENCODINGS.find(e => e[0].toUpperCase() === defaultEncoding.toUpperCase());
    const defaultTip = document.getElementById('default-tip');
    defaultTip.innerHTML = chrome.i18n.getMessage('defaultEncodingEnabled', [printEncodingInfo(encodingInfo)]);
    defaultTip.title = chrome.i18n.getMessage('tipDisableDefaultEncoding');
    defaultTip.addEventListener('click', () => chrome.runtime.openOptionsPage());
  }
  // Reset button
  document.getElementById('reset').addEventListener('click', async () => {
    await chrome.runtime.sendMessage({ type: 'resetEncoding', tabId: tabs[0].id });
    await chrome.tabs.reload(tabs[0].id, { bypassCache: true });
    window.close();
  });
  // Get Content-Type
  const [{ result: contentType = 'text/html' }] = await chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: () => document.contentType,
  });
  // Initialize encoding list
  const list = document.getElementById('list');
  list.addEventListener('click', async e => {
    if (!(e.target instanceof HTMLButtonElement && e.target.dataset.encoding)) {
      return;
    }
    await chrome.runtime.sendMessage({ type: 'setEncoding', tabId: tabs[0].id, contentType, encoding: e.target.dataset.encoding });
    await chrome.tabs.reload(tabs[0].id, { bypassCache: true });
    window.close();
  });
  for (const encodingInfo of ENCODINGS) {
    if (encodingInfo.length === 1) {
      list.appendChild(document.createElement('hr'));
      continue;
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.encoding = encodingInfo[0];
    button.innerHTML = printEncodingInfo(encodingInfo);
    list.appendChild(button);
  }
  // Ripple animate event
  let inks = [];
  const removeInks = () => {
    for (const ink of inks) {
      if (ink.parentElement) {
        ink.parentElement.removeChild(ink);
      }
    }
    inks = [];
  };
  document.body.addEventListener('mousedown', e => {
    removeInks();
    if (!(e && e.target instanceof HTMLButtonElement)) {
      return;
    }
    const rect = e.target.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    const cornerDistances = [
      { x: 0, y: 0 },
      { x: rect.width, y: 0 },
      { x: 0, y: rect.height },
      { x: rect.width, y: rect.height },
    ].map(corner => Math.round(distance(x, y, corner.x, corner.y)));
    const radius = Math.max(...cornerDistances);
    const startTranslate = `${x - radius}px, ${y - radius}px`;
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.height = ripple.style.width = `${2 * radius}px`;
    const ink = document.createElement('div');
    ink.classList.add('ink');
    ink.appendChild(ripple);
    e.target.appendChild(ink);
    const duration = Math.max(800, Math.log(radius) * radius);
    ripple.animate({
      transform: [
        `translate(${startTranslate}) scale(0)`,
        `translate(${startTranslate}) scale(1)`,
      ],
    }, {
      duration,
      easing: 'cubic-bezier(.2, .9, .1, .9)',
      fill: 'forwards',
    });
    inks.push(ink);
  });
  document.body.addEventListener('mouseup', removeInks);
});
