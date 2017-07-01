/**
 * Created by Liming on 2017/3/22.
 */
"use strict";
(() => {
    let _menu = false;
    const menuList = {};
    //CreateMenu
    const createMenu = () => {
        menuList['default'] = chrome.contextMenus.create({
            type: "radio",
            title: chrome.i18n.getMessage('default'),
            checked: true,
            onclick: (info, tab) => {
                if(!info.wasChecked) {
                    resetEncoding(tab.id);
                }
            }
        });
        for(let encoding of ENCODINGS) {
            if(encoding.length === 1) {
                continue;
            }
            menuList[encoding[0].toUpperCase()] = chrome.contextMenus.create({
                type: "radio",
                title: `${encoding[1]}（${encoding[0]}）`,
                checked: false,
                onclick: (info, tab) => {
                    if(!info.wasChecked) {
                        setEncoding(tab.id, encoding[0]);
                    }
                }
            });
        }
        _menu = true;
    };
    //UpdateMenu
    const updateMenu = tabId => {
        let charset = getEncoding(tabId);
        charset = charset ? menuList[charset.toUpperCase()] : menuList['default'];
        for(let menu in menuList) {
            chrome.contextMenus.update(menuList[menu], {
                checked: false
            });
        }
        chrome.contextMenus.update(charset, {
            checked: true
        });
    };
    chrome.tabs.onActivated.addListener((activeInfo) => {
        if (!_menu) {
            return;
        }
        updateMenu(activeInfo.tabId);
    });
    chrome.tabs.onUpdated.addListener((tabId) => {
        if (!_menu) {
            return;
        }
        updateMenu(tabId);
    });
    chrome.windows.onFocusChanged.addListener(() => {
        if (!_menu) {
            return;
        }
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if(tabs.length === 0) {
                return;
            }
            updateMenu(tabs[0].id);
        });
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        switch(message.action) {
            case 'ShowMenu':
                createMenu();
                break;
            case 'HideMenu':
                _menu = false;
                chrome.contextMenus.removeAll();
                break;
        }
    });
    const config = localStorage.getItem('config_menu');
    if(config === 'false') {
        return;
    }
    createMenu();
})();
