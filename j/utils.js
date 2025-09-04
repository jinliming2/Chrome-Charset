const encodingList = new Map();
let defaultEncoding;

export const checkOrRequestPermission = async permission => {
  if (await chrome.permissions.contains(permission)) {
    return true;
  }
  return chrome.permissions.request(permission);
}

export const setDefaultEncoding = encoding => {
  defaultEncoding = encoding ? { encoding } : undefined;
};
export const setTabEncoding = (tabId, contentType, encoding) => {
  if (encoding) {
    encodingList.set(tabId, { contentType, encoding });
  } else {
    encodingList.delete(tabId);
  }
};
export const getEncoding = tabId => encodingList.get(tabId) || defaultEncoding;

export const recordRecentlySelectedEncoding = async encoding => {
  const { recent } = await chrome.storage.local.get('recent');

  await chrome.storage.local.set({
    recent: [
      encoding,
      ...(recent || [])
        .filter(e => e && e !== encoding)
        .slice(0, 2),
    ]
  });
};
