/**
 * Created by Liming on 2017/3/22.
 */
"use strict";
//Encoding List
const ENCODINGS = [
    ['UTF-8', 'Unicode'],
    ['GBK', '中文'],
    ['GB18030', '中文'],
    ['Big5', '中文'],
    ['<hr>'],
    ['UTF-16LE', 'Unicode'],
    ['Windows-1256', '阿拉伯语'],
    ['ISO-8859-6', '阿拉伯语'],
    ['ISO-8859-10', '北欧语言'],
    ['ISO-8859-4', '波罗的海周边语言'],
    ['ISO-8859-13', '波罗的海周边语言'],
    ['Windows-1257', '波罗的海周边语言'],
    ['EUC-KR', '韩语'],
    ['ISO-8859-14', '凯尔特语'],
    ['ISO-8859-16', '罗马尼亚语'],
    ['ISO-8859-3', '南欧语言'],
    ['Shift_JIS', '日语'],
    ['EUC-JP', '日语'],
    ['ISO-2022-JP', '日语'],
    ['Windows-874', '泰语'],
    ['Windows-1254', '土耳其语'],
    ['Windows-1255', '希伯来语'],
    ['ISO-8859-8-I', '希伯来语'],
    ['ISO-8859-8', '希伯来语'],
    ['ISO-8859-7', '希腊语'],
    ['Windows-1253', '希腊语'],
    ['ISO-8859-5', '西里尔语'],
    ['Windows-1251', '西里尔语'],
    ['KOI8-R', '西里尔语'],
    ['KOI8-U', '西里尔语'],
    ['IBM866', '西里尔语'],
    ['Windows-1252', '西欧语言'],
    ['ISO-8859-15', '西欧语言'],
    ['Macintosh', '西欧语言'],
    ['Windows-1258', '越南语'],
    ['ISO-8859-2', '中欧语言'],
    ['Windows-1250', '中欧语言']
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
