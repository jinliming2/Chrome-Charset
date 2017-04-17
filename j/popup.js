/**
 * Created by Liming on 2017/2/14.
 */
"use strict";
(() => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if(tabs.length === 0) {
            return;
        }
        //Current Charset
        if(tabs[0].url.startsWith('file://') && localStorage.getItem('tab' + tabs[0].id)) {
            let charset = localStorage.getItem('tab' + tabs[0].id);
            for(let encoding of ENCODINGS) {
                if(encoding[0].toUpperCase() === charset.toUpperCase()) {
                    charset += `（${encoding[1]}）`;
                    break;
                }
            }
            document.getElementById('current').innerHTML = charset;
        } else {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'GetCharset'}, (response) => {
                response = response || 'Unknown';
                if(response !== 'Unknown') {
                    for(let encoding of ENCODINGS) {
                        if(encoding[0].toUpperCase() === response.toUpperCase()) {
                            response += `（${encoding[1]}）`;
                            break;
                        }
                    }
                }
                document.getElementById('current').innerHTML = response;
            });
        }
        //I18N
        document.getElementById('reset').innerHTML = chrome.i18n.getMessage('btnReset');
        document.getElementById('tip_current').innerHTML = chrome.i18n.getMessage('tipCurrent');
        //Reset
        document.getElementById('reset').addEventListener('click', () => {
            resetEncoding(tabs[0].id, () => {
                window.close();
            });
        });
        //Make List
        let list = document.getElementById('list');
        for(let encoding of ENCODINGS) {
            if(encoding.length === 1) {
                list.appendChild(document.createElement('hr'));
                continue;
            }
            let button = document.createElement('button');
            button.type = 'button';
            button.dataset.charset = encoding[0];
            button.innerHTML = `${encoding[1]}（${encoding[0]}）`;
            button.addEventListener('click', (e) => {
                setEncoding(tabs[0].id, e.target.dataset.charset, () => {
                    window.close();
                });
            });
            list.appendChild(button);
        }
    });
})();
