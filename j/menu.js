/**
 * Created by Liming on 2017/3/22.
 */
const rtl = chrome.i18n.getMessage('@@bidi_dir') === 'rtl' ? '\u{200f}' : '';
const printEncodingInfo = info => `${info[1]} ${rtl}(${info[0]})`;

let selectedMenu = 'default';

const menuClicked = (info, tab) => {
  if (info.wasChecked) {
    return;
  }
  if (info.menuItemId === 'default') {
    resetEncoding(tab.id);
  } else {
    setEncoding(tab.id, info.menuItemId);
  }
  chrome.tabs.reload(tab.id, { bypassCache: true });
};

const updateMenu = tabId => {
  const encoding = getEncoding(tabId) || 'default';
  if (selectedMenu === encoding) {
    return;
  }
  chrome.contextMenus.update(selectedMenu, { checked: false });
  chrome.contextMenus.update(encoding, { checked: true });
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

const createMenu = () => {
  chrome.contextMenus.create({
    type: 'radio',
    id: 'default',
    title: chrome.i18n.getMessage('default'),
    checked: true,
    onclick: menuClicked,
  });
  for (const encoding of ENCODINGS) {
    if (encoding.length === 1) {
      continue;
    }
    chrome.contextMenus.create({
      type: 'radio',
      id: encoding[0],
      title: printEncodingInfo(encoding),
      checked: false,
      onclick: menuClicked,
    });
  }
  chrome.tabs.onUpdated.addListener(tabUpdatedEvent);
  chrome.tabs.onActivated.addListener(tabActivatedEvent);
  chrome.windows.onFocusChanged.addListener(windowsFocusedEvent);
};

const removeMenu = () => {
  chrome.contextMenus.removeAll();
  chrome.tabs.onUpdated.removeListener(tabUpdatedEvent);
  chrome.tabs.onActivated.removeListener(tabActivatedEvent);
  chrome.windows.onFocusChanged.removeListener(windowsFocusedEvent);
};

if (localStorage.getItem('config_menu') === 'true') {
  createMenu();
}
