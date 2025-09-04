/**
 * Created by Liming on 2017/3/22.
 */
import { setEncoding, resetEncoding } from './background.js';
import { getENCODINGS } from './encoding.js';
import { getEncoding } from './utils.js';

const rtl = chrome.i18n.getMessage('@@bidi_dir') === 'rtl' ? '\u{200f}' : '';
const printEncodingInfo = info => `${info[1]} ${rtl}(${info[0]})`;

let selectedMenu;

const menuClicked = async (info, tab) => {
  if (info.wasChecked) {
    return;
  }
  if (info.menuItemId === 'default') {
    resetEncoding(tab.id);
  } else {
    const [{ result: contentType = 'text/html' }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.contentType,
    });
    setEncoding(tab.id, contentType, info.menuItemId);
  }
  await chrome.tabs.reload(tab.id, { bypassCache: true });
};

const updateMenu = tabId => {
  const encoding = getEncoding(tabId)?.encoding || 'default';
  if (selectedMenu === encoding) {
    return;
  }
  chrome.contextMenus.update(selectedMenu, { checked: false });
  chrome.contextMenus.update(encoding, { checked: true });
  selectedMenu = encoding;
};

const tabUpdatedEvent = tabId => updateMenu(tabId);
const tabActivatedEvent = activeInfo => updateMenu(activeInfo.tabId);
const windowsFocusedEvent = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length === 0) {
      return;
    }
    updateMenu(tabs[0].id);
  });
};

export const createMenu = async () => {
  if (!(await chrome.storage.local.get('configMenu')).configMenu) {
    return;
  }

  chrome.contextMenus.create({
    type: 'radio',
    id: 'default',
    title: chrome.i18n.getMessage('default'),
    checked: true,
  });
  selectedMenu = 'default';
  for (const encoding of await getENCODINGS()) {
    if (encoding.length === 1) {
      continue;
    }
    chrome.contextMenus.create({
      type: 'radio',
      id: encoding[0],
      title: printEncodingInfo(encoding),
      checked: false,
    });
  }
  chrome.tabs.onUpdated.addListener(tabUpdatedEvent);
  chrome.tabs.onActivated.addListener(tabActivatedEvent);
  chrome.windows.onFocusChanged.addListener(windowsFocusedEvent);
  chrome.contextMenus.onClicked.addListener(menuClicked);
};

export const removeMenu = () => {
  chrome.contextMenus.removeAll();
  chrome.tabs.onUpdated.removeListener(tabUpdatedEvent);
  chrome.tabs.onActivated.removeListener(tabActivatedEvent);
  chrome.windows.onFocusChanged.removeListener(windowsFocusedEvent);
  chrome.contextMenus.onClicked.removeListener(menuClicked);
  selectedMenu = undefined;
};

createMenu();
