/**
 * Created by Liming on 2017/3/22.
 */
const LocaleDependentStaticEncodingList = (chrome.i18n.getMessage('staticEncodingList') || '').split(',');
//Encoding List
const ENCODINGS = [
  ['<hr>'],
  ['Big5', chrome.i18n.getMessage('encodingChineseTraditional')],
  ['GBK', chrome.i18n.getMessage('encodingChineseSimplified')],
  ['GB18030', chrome.i18n.getMessage('encodingChineseSimplified')],
  ['EUC-JP', chrome.i18n.getMessage('encodingJapanese')],
  ['EUC-KR', chrome.i18n.getMessage('encodingKorean')],
  ['IBM866', chrome.i18n.getMessage('encodingCyrillic')],
  ['ISO-2022-JP', chrome.i18n.getMessage('encodingJapanese')],
  ['ISO-8859-2', chrome.i18n.getMessage('encodingCentralEuropean')],
  ['ISO-8859-3', chrome.i18n.getMessage('encodingSouthEuropean')],
  ['ISO-8859-4', chrome.i18n.getMessage('encodingBaltic')],
  ['ISO-8859-5', chrome.i18n.getMessage('encodingCyrillic')],
  ['ISO-8859-6', chrome.i18n.getMessage('encodingArabic')],
  ['ISO-8859-7', chrome.i18n.getMessage('encodingGreek')],
  ['ISO-8859-8', chrome.i18n.getMessage('encodingHebrew')],
  ['ISO-8859-8-I', chrome.i18n.getMessage('encodingHebrew')],
  ['ISO-8859-10', chrome.i18n.getMessage('encodingNordic')],
  ['ISO-8859-13', chrome.i18n.getMessage('encodingBaltic')],
  ['ISO-8859-14', chrome.i18n.getMessage('encodingCeltic')],
  ['ISO-8859-15', chrome.i18n.getMessage('encodingWestern')],
  ['ISO-8859-16', chrome.i18n.getMessage('encodingRomanian')],
  ['KOI8-R', chrome.i18n.getMessage('encodingCyrillic')],
  ['KOI8-U', chrome.i18n.getMessage('encodingCyrillic')],
  ['Macintosh', chrome.i18n.getMessage('encodingWestern')],
  ['Shift_JIS', chrome.i18n.getMessage('encodingJapanese')],
  ['UTF-8', chrome.i18n.getMessage('encodingUnicode')],
  ['UTF-16LE', chrome.i18n.getMessage('encodingUnicode')],
  ['Windows-874', chrome.i18n.getMessage('encodingThai')],
  ['Windows-1250', chrome.i18n.getMessage('encodingCentralEuropean')],
  ['Windows-1251', chrome.i18n.getMessage('encodingCyrillic')],
  ['Windows-1252', chrome.i18n.getMessage('encodingWestern')],
  ['Windows-1253', chrome.i18n.getMessage('encodingGreek')],
  ['Windows-1254', chrome.i18n.getMessage('encodingTurkish')],
  ['Windows-1255', chrome.i18n.getMessage('encodingHebrew')],
  ['Windows-1256', chrome.i18n.getMessage('encodingArabic')],
  ['Windows-1257', chrome.i18n.getMessage('encodingBaltic')],
  ['Windows-1258', chrome.i18n.getMessage('encodingVietnamese')],
];

export const getENCODINGS = async () => {
  const { recent: recentlySelectedEncodingList = [] } = await chrome.storage.local.get('recent');

  return ENCODINGS.sort(([a, nameA], [b, nameB]) => {
    // we always put UTF-8 as top position
    if (a === 'UTF-8') return -1;
    if (b === 'UTF-8') return 1;
    // then put local dependent encoding items
    {
      const hasA = LocaleDependentStaticEncodingList.indexOf(a);
      const hasB = LocaleDependentStaticEncodingList.indexOf(b);
      if (hasA >= 0 && hasB >= 0) return hasA > hasB ? 1 : -1;
      if (hasA >= 0) return -1;
      if (hasB >= 0) return 1;
    }
    // then put user recently selected encodings
    {
      const hasA = recentlySelectedEncodingList.indexOf(a);
      const hasB = recentlySelectedEncodingList.indexOf(b);
      if (hasA >= 0 && hasB >= 0) return hasA > hasB ? 1 : -1;
      if (hasA >= 0) return -1;
      if (hasB >= 0) return 1;
    }
    // then put a delimiter
    if (a === '<hr>') return -1;
    if (b === '<hr>') return 1;
    // then put UTF-16LE
    if (a === 'UTF-16LE') return -1;
    if (b === 'UTF-16LE') return 1;
    // sort all left encodings by their name
    return nameA.localeCompare(nameB, chrome.i18n.getUILanguage());
  });
};
