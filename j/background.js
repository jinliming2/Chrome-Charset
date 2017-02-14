/**
 * Created by Liming on 2017/2/14.
 */
"use strict";
localStorage.clear();
let charsetPattern = /; ?charset=([^;]+)/;
chrome.webRequest.onHeadersReceived.addListener((details) => {
    if(localStorage.getItem('tab' + details.tabId)) {
        let i;
        for(i = 0; i < details.responseHeaders.length; ++i) {
            if(details.responseHeaders[i].name.toLowerCase() == 'content-type') {
                let value = details.responseHeaders[i].value.toLowerCase();
                if(
                    value.substr(0, 4) == 'text' ||
                    value.substr(0, 22) == 'application/javascript' ||
                    value.substr(0, 16) == 'application/json'
                ) {
                    if(charsetPattern.test(value)) {
                        value = value.replace(charsetPattern.exec(value)[1], localStorage.getItem('tab' + details.tabId));
                    } else {
                        value += value.substr(-1) == ';' ? ' ' : '; ';
                        value += 'charset=' + localStorage.getItem('tab' + details.tabId);
                    }
                    details.responseHeaders[i].value = value;
                }
                break;
            }
        }
        if(i >= details.responseHeaders.length) {
            details.responseHeaders.push({
                name: 'Content-Type',
                value: 'text/html; charset=' + localStorage.getItem('tab' + details.tabId)
            });
        }
    }
    return {responseHeaders: details.responseHeaders};
}, {urls: ["<all_urls>"]}, ["responseHeaders", "blocking"]);
