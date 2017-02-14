/**
 * Created by Liming on 2017/2/14.
 */
"use strict";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch(message.action) {
        case 'GetCharset':
            sendResponse(document.charset || 'Unknown');
            break;
    }
});
