/**
 * Created by Liming on 2017/2/14.
 */
"use strict";
localStorage.clear();
const charsetPattern = /; ?charset=([^;]+)/;
const html_special_chars = (html) => html.replace(/&/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
    .replace(/\r\n?|\n/g, '<br>');

chrome.webRequest.onHeadersReceived.addListener((details) => {
    if(localStorage.getItem('tab' + details.tabId)) {
        let i;
        for(i = 0; i < details.responseHeaders.length; ++i) {
            if(details.responseHeaders[i].name.toLowerCase() === 'content-type') {
                let value = details.responseHeaders[i].value.toLowerCase();
                if(
                    value.startsWith('text') ||
                    value.startsWith('application/javascript') ||
                    value.startsWith('application/json')
                ) {
                    if(charsetPattern.test(value)) {
                        value = value.replace(charsetPattern.exec(value)[1], localStorage.getItem('tab' + details.tabId));
                    } else {
                        value += value.substr(-1) === ';' ? ' ' : '; ';
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

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(tab.url.startsWith('file://') && changeInfo.status === 'complete' && localStorage.getItem('tab' + tabId)) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.overrideMimeType('text/plain; charset=' + localStorage.getItem('tab' + tabId));
        xmlHttp.onload = () => {
            const is_html = /\.html?$/.test(tab.url);
            const data = is_html ? encodeURI(xmlHttp.responseText) : encodeURI(html_special_chars(xmlHttp.responseText));
            chrome.tabs.executeScript(tabId, {
                code: `const _t = document.open('text/${is_html ? 'html' : 'plain'}', 'replace');
                _t.write(${is_html ? `decodeURI('${data}')` : `'<pre>' + decodeURI('${data}') + '</pre>'`});
                _t.close();`,
                runAt: 'document_start'
            });
        };
        xmlHttp.onerror = () => {
            alert(chrome.i18n.getMessage('cannotLoadLocalFile'));
        };
        xmlHttp.open('GET', tab.url, true);
        xmlHttp.send();
    }
});
