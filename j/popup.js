/**
 * Created by Liming on 2017/2/14.
 */
"use strict";
(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if(tabs.length == 0) {
            return;
        }
        chrome.tabs.sendMessage(tabs[0].id, {action: 'GetCharset'}, (response) => {
            response = response || 'Unknown';
            document.getElementById('current').innerHTML = response;
        });
        document.getElementById('reset').innerHTML = chrome.i18n.getMessage('btnReset');
        document.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', (e) => {
                if(e.target.dataset.charset) {
                    localStorage.setItem('tab' + tabs[0].id, e.target.dataset.charset);
                } else {
                    localStorage.removeItem('tab' + tabs[0].id);
                }
                chrome.tabs.reload(tabs[0].id, {bypassCache: true}, () => {
                    window.close();
                });
            });
        });
    });
})();
