/**
 * Created by Liming on 2019/3/2.
 */
import { getENCODINGS } from './encoding.js';
import { checkOrRequestPermission } from './utils.js';

const rtl = chrome.i18n.getMessage('@@bidi_dir') === 'rtl' ? '&rlm;' : '';
const printEncodingInfo = info => `${info[1]} ${rtl}(${info[0]})`;

// I18n
document.getElementById('menu').innerHTML = chrome.i18n.getMessage('optionMenu');
document.getElementById('default-encoding').innerHTML = chrome.i18n.getMessage('optionDefaultEncoding');
// Initialize encoding list
const list = document.getElementById('default-encoding-list');
let option = document.createElement('option');
option.value = '';
option.innerHTML = chrome.i18n.getMessage('default');
list.appendChild(option);
const optgroup = [
  document.createElement('optgroup'),
  document.createElement('optgroup'),
];
optgroup[0].label = chrome.i18n.getMessage('optionRecommendEncoding');
optgroup[1].label = chrome.i18n.getMessage('optionOtherEncoding');
let index = 0;
for (const encodingInfo of await getENCODINGS()) {
  if (encodingInfo.length === 1) {
    ++index;
    continue;
  }
  option = document.createElement('option');
  option.value = encodingInfo[0];
  option.innerHTML = printEncodingInfo(encodingInfo);
  optgroup[index].appendChild(option);
}
optgroup.forEach(o => list.appendChild(o));
// Current Setting
(async () => {
  const contextMenuButton = document.getElementById('context-menu');
  if (contextMenuButton instanceof HTMLInputElement) {
    contextMenuButton.checked = !!(await chrome.storage.local.get('configMenu').configMenu);
  }
  if (list instanceof HTMLSelectElement) {
    list.value = (await chrome.storage.local.get('configEnableDefault')).configEnableDefault || '';
  }
})();
// Fix RTL mode display
if (rtl) {
  list.style.backgroundPosition = '8px';
}
// Change Events
document.body.addEventListener('change', async e => {
  if (e.target instanceof HTMLInputElement) {
    if (e.target.id === 'context-menu') {
      if (e.target.checked) {
        if (!(await checkOrRequestPermission({ permissions: ['contextMenus'] }))) {
          e.target.checked = false;
          return;
        }
        await chrome.storage.local.set({ configMenu: true });
        chrome.runtime.sendMessage({ type: 'createMenu' });
      } else {
        await chrome.storage.local.remove('configMenu');
        chrome.runtime.sendMessage({ type: 'removeMenu' });
        await chrome.permissions.remove({ permissions: ['contextMenus'] });
      }
      return;
    }
  }
  if (e.target instanceof HTMLSelectElement) {
    if (e.target.id === 'default-encoding-list') {
      console.log(e.target.value);
      if (e.target.value) {
        if (!(await checkOrRequestPermission({ origins: ['<all_urls>'] }))) {
          e.target.value = (await chrome.storage.local.get('configEnableDefault')).configEnableDefault || '';
          return;
        }
        await chrome.storage.local.set({ configEnableDefault: e.target.value });
        chrome.runtime.sendMessage({ type: 'setupDefaultEncoding' });
      } else {
        await chrome.storage.local.remove('configEnableDefault');
        chrome.runtime.sendMessage({ type: 'unsetDefaultEncoding' });
        await chrome.permissions.remove({ origins: ['<all_urls>'] });
      }
      return;
    }
  }
});
