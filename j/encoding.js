/**
 * Created by Liming on 2017/3/22.
 */
"use strict";
//Encoding List
const ENCODINGS = [
    ['UTF-8', 'Unicode'],
    ['GBK', chrome.i18n.getMessage('Chinese')],
    ['GB18030', chrome.i18n.getMessage('Chinese')],
    ['Big5', chrome.i18n.getMessage('Chinese')],
    ['<hr>'],
    ['UTF-16LE', 'Unicode'],
    ['Windows-1256', chrome.i18n.getMessage('Arabic')],
    ['ISO-8859-6', chrome.i18n.getMessage('Arabic')],
    ['ISO-8859-10', chrome.i18n.getMessage('Nordic')],
    ['ISO-8859-4', chrome.i18n.getMessage('Baltic')],
    ['ISO-8859-13', chrome.i18n.getMessage('Baltic')],
    ['Windows-1257', chrome.i18n.getMessage('Baltic')],
    ['EUC-KR', chrome.i18n.getMessage('Korean')],
    ['ISO-8859-14', chrome.i18n.getMessage('Celtic')],
    ['ISO-8859-16', chrome.i18n.getMessage('Romanian')],
    ['ISO-8859-3', chrome.i18n.getMessage('SouthEuropean')],
    ['Shift_JIS', chrome.i18n.getMessage('Japanese')],
    ['EUC-JP', chrome.i18n.getMessage('Japanese')],
    ['ISO-2022-JP', chrome.i18n.getMessage('Japanese')],
    ['Windows-874', chrome.i18n.getMessage('Thai')],
    ['Windows-1254', chrome.i18n.getMessage('Turkish')],
    ['Windows-1255', chrome.i18n.getMessage('Hebrew')],
    ['ISO-8859-8-I', chrome.i18n.getMessage('Hebrew')],
    ['ISO-8859-8', chrome.i18n.getMessage('Hebrew')],
    ['ISO-8859-7', chrome.i18n.getMessage('Greek')],
    ['Windows-1253', chrome.i18n.getMessage('Greek')],
    ['ISO-8859-5', chrome.i18n.getMessage('Cyrillic')],
    ['Windows-1251', chrome.i18n.getMessage('Cyrillic')],
    ['KOI8-R', chrome.i18n.getMessage('Cyrillic')],
    ['KOI8-U', chrome.i18n.getMessage('Cyrillic')],
    ['IBM866', chrome.i18n.getMessage('Cyrillic')],
    ['Windows-1252', chrome.i18n.getMessage('Western')],
    ['ISO-8859-15', chrome.i18n.getMessage('Western')],
    ['Macintosh', chrome.i18n.getMessage('Western')],
    ['Windows-1258', chrome.i18n.getMessage('Vietnamese')],
    ['ISO-8859-2', chrome.i18n.getMessage('CentralEuropean')],
    ['Windows-1250', chrome.i18n.getMessage('CentralEuropean')]
];

let setEncoding = (tabId, charset, callback) => {
    localStorage.setItem('tab' + tabId, charset);
    chrome.tabs.reload(tabId, {bypassCache: true}, callback);
};

let resetEncoding = (tabId, callback) => {
    localStorage.removeItem('tab' + tabId);
    chrome.tabs.reload(tabId, {bypassCache: true}, callback);
};

let getEncoding = (tabId) => {
    return localStorage.getItem('tab' + tabId);
};
