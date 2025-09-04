/**
 * Created by Liming on 2017/2/14.
 */
import { createMenu, removeMenu } from './menu.js';
import { setDefaultEncoding, setTabEncoding, recordRecentlySelectedEncoding, getEncoding } from './utils.js';

const PriorityDefault = 2;

const getNextRuleId = rules => (rules.reduce((max, rule) => Math.max(max, rule.id), 0) % Number.MAX_SAFE_INTEGER) + 1;

const filterRuleTabIds = tabId => rule => rule.condition.tabIds?.includes(tabId);
const filterRuleDefault = () => rule => rule.priority === PriorityDefault;

const removeTabRules = async filter => {
  const currentRules = await chrome.declarativeNetRequest.getSessionRules();
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: currentRules.filter(filter).map(rule => rule.id),
  });
};
const updateTabRules = async (condition, filter, contentType, encoding, priority) => {
  const currentRules = await chrome.declarativeNetRequest.getSessionRules();
  const id = getNextRuleId(currentRules);
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: currentRules.filter(rule => filter(rule)).map(rule => rule.id),
    addRules: [
      { contentType, resourceTypes: ['main_frame'] },

      { contentType: 'text/html', resourceTypes: ['sub_frame'] },
      { contentType: 'application/javascript', resourceTypes: ['script'] },
      { contentType: 'text/css', resourceTypes: ['stylesheet'] },
    ].map(({ contentType, resourceTypes }, index) => ({
      id: id + index,
      action: {
        type: 'modifyHeaders',
        responseHeaders: [{ header: 'Content-Type', operation: 'set', value: `${contentType}; charset=${encoding}` }]
      },
      condition: { ...condition, resourceTypes },
      priority,
    })),
  });
};

export const setEncoding = async (tabId, contentType, encoding) => {
  setTabEncoding(tabId, contentType, encoding);
  await recordRecentlySelectedEncoding(encoding);
  await updateTabRules({ tabIds: [tabId] }, filterRuleTabIds(tabId), contentType, encoding);
};

export const resetEncoding = async tabId => {
  setTabEncoding(tabId);
  await removeTabRules(filterRuleTabIds(tabId));
};

export const setupDefaultEncoding = async () => {
  const { configEnableDefault: encoding } = await chrome.storage.local.get('configEnableDefault');
  if (!encoding) {
    return;
  }
  setDefaultEncoding(encoding);

  await updateTabRules({}, filterRuleDefault(), 'text/html', encoding, PriorityDefault);
};

export const unsetDefaultEncoding = async () => {
  setDefaultEncoding();
  await removeTabRules(filterRuleDefault());
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  switch (message.type) {
    case 'setEncoding': sendResponse(await setEncoding(message.tabId, message.contentType, message.encoding)); break;
    case 'resetEncoding': sendResponse(await resetEncoding(message.tabId)); break;
    case 'getEncoding': sendResponse(getEncoding(message.tabId)); break;
    case 'createMenu': removeMenu(); sendResponse(createMenu()); break;
    case 'removeMenu': sendResponse(removeMenu()); break;
    case 'setupDefaultEncoding': unsetDefaultEncoding(); sendResponse(await setupDefaultEncoding()); break;
    case 'unsetDefaultEncoding': sendResponse(await unsetDefaultEncoding()); break;
  }
});

setupDefaultEncoding();
