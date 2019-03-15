/**
 * Created by Liming on 2019/3/2.
 */
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
for (const encodingInfo of ENCODINGS) {
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
const contextMenuButton = document.getElementById('context-menu');
if (contextMenuButton instanceof HTMLInputElement) {
  contextMenuButton.checked = (localStorage.getItem('config_menu') === 'true');
}
if (list instanceof HTMLSelectElement) {
  list.value = localStorage.getItem('config_enable_default') || '';
}
// Fix RTL mode display
if (rtl) {
  list.style.backgroundPosition = '8px';
}
// Change Events
document.body.addEventListener('change', e => {
  if (e.target instanceof HTMLInputElement) {
    if (e.target.id === 'context-menu') {
      if (e.target.checked) {
        localStorage.setItem('config_menu', 'true');
        chrome.runtime.sendMessage({ type: 'createMenu' });
      } else {
        localStorage.removeItem('config_menu');
        chrome.runtime.sendMessage({ type: 'removeMenu' });
      }
      return;
    }
  }
  if (e.target instanceof HTMLSelectElement) {
    if (e.target.id === 'default-encoding-list') {
      if (e.target.value) {
        localStorage.setItem('config_enable_default', e.target.value);
        chrome.runtime.sendMessage({ type: 'setupDefaultEncoding' });
      } else {
        localStorage.removeItem('config_enable_default');
        chrome.runtime.sendMessage({ type: 'unsetDefaultEncoding' });
      }
      return;
    }
  }
});
