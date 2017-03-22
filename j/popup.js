/**
 * Created by Liming on 2017/2/14.
 */
"use strict";
(() => {
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

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if(tabs.length == 0) {
            return;
        }
        chrome.tabs.sendMessage(tabs[0].id, {action: 'GetCharset'}, (response) => {
            response = response || 'Unknown';
            document.getElementById('current').innerHTML = response;
        });
        //I18N
        document.getElementById('reset').innerHTML = chrome.i18n.getMessage('btnReset');
        document.getElementById('tip_current').innerHTML = chrome.i18n.getMessage('tipCurrent');
        //Reset
        document.getElementById('reset').addEventListener('click', () => {
            localStorage.removeItem('tab' + tabs[0].id);
            chrome.tabs.reload(tabs[0].id, {bypassCache: true}, () => {
                window.close();
            });
        });
        //Make List
        let list = document.getElementById('list');
        for(let encoding of ENCODINGS) {
            if(encoding.length == 1) {
                list.appendChild(document.createElement('hr'));
                continue;
            }
            let button = document.createElement('button');
            button.type = 'button';
            button.dataset.charset = encoding[0];
            button.innerHTML = `${encoding[1]}（${encoding[0]}）`;
            button.addEventListener('click', (e) => {
                localStorage.setItem('tab' + tabs[0].id, e.target.dataset.charset);
                chrome.tabs.reload(tabs[0].id, {bypassCache: true}, () => {
                    window.close();
                });
            });
            list.appendChild(button);
        }
    });
})();
