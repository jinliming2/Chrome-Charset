# Chrome-Charset
[![Launched](https://img.shields.io/badge/Chrome--Charset-launched-brightgreen.svg)](https://github.com/jinliming2/Chrome-Charset)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jinliming2/Chrome-Charset/master/LICENSE)
[![GitHub Release](https://img.shields.io/github/release/jinliming2/Chrome-Charset.svg)](https://github.com/jinliming2/Chrome-Charset/releases)
[![GitHub stars](https://img.shields.io/github/stars/jinliming2/Chrome-Charset.svg)](https://github.com/jinliming2/Chrome-Charset/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/jinliming2/Chrome-Charset.svg)](https://github.com/jinliming2/Chrome-Charset/network)
[![GitHub issues](https://img.shields.io/github/issues/jinliming2/Chrome-Charset.svg)](https://github.com/jinliming2/Chrome-Charset/issues)
[![Privacy Policy 隐私策略](https://img.shields.io/badge/Privacy--Policy-隐私策略-f74455.svg)](./PrivacyPolicy.md)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fjinliming2%2FChrome-Charset.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fjinliming2%2FChrome-Charset?ref=badge_shield)

[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/oenllhgkiiljibhfagbfogdbchhdchml.svg)](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml)
[![Chrome Web Store Rating Count](https://img.shields.io/chrome-web-store/rating-count/oenllhgkiiljibhfagbfogdbchhdchml.svg)](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/oenllhgkiiljibhfagbfogdbchhdchml.svg)](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml)
[![Chrome Web Store Stars](https://img.shields.io/chrome-web-store/stars/oenllhgkiiljibhfagbfogdbchhdchml.svg)](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml)
[![Chrome Web Store Downloads](https://img.shields.io/chrome-web-store/d/oenllhgkiiljibhfagbfogdbchhdchml.svg)](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml)

[![Edge Web Store Version](https://img.shields.io/badge/dynamic/json?label=edge%20web%20store&color=3277BC&prefix=v&query=$.version&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/ljameaionljangkhnobkellagnjjohno)](https://microsoftedge.microsoft.com/addons/detail/ljameaionljangkhnobkellagnjjohno)
[![Edge Web Store Rating Count](https://img.shields.io/badge/dynamic/json?label=rating&color=97ca00&query=$.ratingCount&suffix=%20total&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/ljameaionljangkhnobkellagnjjohno)](https://microsoftedge.microsoft.com/addons/detail/ljameaionljangkhnobkellagnjjohno)
[![Edge Web Store Rating](https://img.shields.io/badge/dynamic/json?label=rating&color=4c1&query=$.averageRating&suffix=/5&url=https://microsoftedge.microsoft.com/addons/getproductdetailsbycrxid/ljameaionljangkhnobkellagnjjohno)](https://microsoftedge.microsoft.com/addons/detail/ljameaionljangkhnobkellagnjjohno)


An extension used to modify the page default encoding for Chromium 55+ based browsers.

用于在基于 Chromium 55+ 内核的浏览器下修改网站默认编码的扩展程序。

## Release
- **[Google Chrome Web Store](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml) / Recommend 推荐**
- **[Microsoft Edge Web Store](https://microsoftedge.microsoft.com/addons/detail/ljameaionljangkhnobkellagnjjohno) / Recommend 推荐**
- [GitHub Release](https://github.com/jinliming2/Chrome-Charset/releases)

### Package is invalid: "CRX_HEADER_INVALID"
> Download from the Google Chrome Web Store may never get this error.
>
> 从 Google Chrome 商店安装时应该不会碰到这个错误。

Google Chrome 70 started to support CRX3 and disabled old version of CRX file in Chrome 73. So, if your browser version greater than 70, please download crx3 version. ([#12](https://github.com/jinliming2/Chrome-Charset/issues/12))

Google Chrome 70 开始支持 CRX3 格式的扩展程序，并且在 Chrome 73 之后禁用了旧版本的扩展程序格式。所以，如果你的浏览器版本大于 70，建议下载 crx3 版本。（[#12](https://github.com/jinliming2/Chrome-Charset/issues/12)）

### About GitHub Release
First of all, I recommend you install this extension from the Google Chrome Web Store or Microsoft Edge Web Store.

Releases from GitHub are downloaded from Google Chrome Web Store, so it also included upgrade info and verification metadata, and can also upgrade automatically.

首先，我建议从 Google Chrome Web Store / Microsoft Edge Web Store 安装这个扩展程序。

GitHub Release 中的 crx 文件都是从 Google Chrome Web Store 下载的而不是自己打包的，所以包含了升级信息以及校验元数据，安装后应该不会报警告，同时也会自动到商店检查更新。

## History
### v1.0.0(2025/09/04)
1. 【重构】迁移 [Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate)（GitHub Issue: [#28](https://github.com/jinliming2/Chrome-Charset/issues/28)）
   * 受限于 [Manifest V3 的限制](https://github.com/jinliming2/Chrome-Charset/issues/28#issuecomment-3240343366:~:text=%E5%8F%A6%E5%A4%96%E4%B8%80%E4%B8%AA%E5%B0%B1%E6%98%AF%20Manifest%20V3%20%E7%9A%84%E5%90%8E%E5%8F%B0%E6%9C%8D%E5%8A%A1%E6%94%B9%E7%94%A8%20Service%20Worker%EF%BC%8C%E5%9C%A8%20Service%20Worker%20%E4%B8%8B%E6%97%A0%E6%B3%95%E4%BD%BF%E7%94%A8%20XMLHttpRequest%20API%EF%BC%8C%E8%BF%99%E5%8F%AF%E8%83%BD%E5%AF%BC%E8%87%B4%E6%97%A0%E6%B3%95%E7%9B%B4%E6%8E%A5%E4%BF%AE%E6%94%B9%E6%9C%AC%E5%9C%B0%E6%96%87%E4%BB%B6%20file%3A//...%20%E7%9A%84%E7%BC%96%E7%A0%81%EF%BC%88%E9%9C%80%E8%A6%81%20overrideMimeType%EF%BC%89%E3%80%82fetch%20API%20%E6%B2%A1%E6%9C%89%E7%B1%BB%E4%BC%BC%E7%9A%84%E6%96%B9%E6%B3%95%EF%BC%8C%E6%88%91%E5%8F%AF%E8%83%BD%E9%9C%80%E8%A6%81%E5%86%8D%E6%89%BE%E6%89%BE%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95%EF%BC%8C%E4%B8%8D%E8%BF%87%E8%BF%99%E4%B8%AA%E5%85%88%E4%B8%8D%E5%AE%9E%E7%8E%B0%EF%BC%8C%E5%90%8E%E9%9D%A2%E6%89%BE%E5%88%B0%E6%96%B9%E6%B3%95%E5%86%8D%E8%AF%B4%E3%80%82)，临时去除 file 协议支持
   * 受限于 [Manifest V3 的限制](https://github.com/jinliming2/Chrome-Charset/issues/28)，部分场景下可能出现编码替换后网页展示异常，请提交 issue
   * 目前通过一些变通的方法来支持了依赖 JavaScript 来渲染的页面（使用类似于 React、Vue 之类的框架），如果遇到问题，欢迎提交 issue

### v0.5.5(2020/12/9)
1. 【优化】file 协议缺少权限时，不要每次都弹提示框，现在仅弹一次（GitHub Issue: [#23](https://github.com/jinliming2/Chrome-Charset/issues/23)）

### v0.5.4(2020/7/6)
1. 【匹配】优先根据请求类型进行匹配（GitHub Issue: [#18](https://github.com/jinliming2/Chrome-Charset/issues/18)）
2. 【i18n】补充扩展描述

### v0.5.3(2020/3/15)
1. 【样式】适配 Edge 浏览器选项页宽度

### v0.5.2(2019/5/12)
1. 【样式】适配新版 Chrome Dark 模式主题

### v0.5.1(2019/3/19)
1. 【修复】由于 v0.5.0 发布时少打包了一个文件，导致 Chrome 商店无法安装、更新

### v0.5.0(2019/3/15)
1. 【重构】将编码探测脚本改为按需执行
2. 【重构】网络请求事件改为按需注册，并在扩展程序不需要工作时卸载
3. 【i18n】新增多个国家语言的翻译，并针对部分 RTL 语种优化页面布局
4. 【i18n】编码列表针对各个国家语言进行优化，以当前语言选择置顶的编码，编码列表排序以当前语言为准
5. 【新增】记录并置顶最近使用的三个编码
6. 【新增】支持设置默认编码，对所有页面生效（GitHub Issue：[#8](https://github.com/jinliming2/Chrome-Charset/issues/8)）
7. 【新增】配置选项页面
8. 【样式】重新设计 popup 弹窗页面样式

### v0.4.3(2019/1/5)
1. 【修复】由于 Chrome 72（也许更早）开始支持 Network Service，导致编码修改失败的问题

### v0.4.2(2018/2/24)
1. 【修复】如果网站没有提供 Content-Type，则应该使用 text/plain 作为默认 Content-Type 而不是 text/html（GitHub Issue：[#5](https://github.com/jinliming2/Chrome-Charset/issues/5)）

### v0.4.1(2017/7/31)
1. 【修复】部分纯js内容的Content-Type为application/x-javascript而导致匹配失败不转换编码的问题（GitHub Issue：[#2](https://github.com/jinliming2/Chrome-Charset/issues/2)）

### v0.4(2017/7/1)
1. 新增设置选项：允许设置是否显示右键菜单（GitHub Issue：[#1](https://github.com/jinliming2/Chrome-Charset/issues/1)）
2. 将默认语言设置为英文en，中文浏览器、英文浏览器不受影响，其他语言浏览器默认显示英文。（Chrome商店反馈）

### v0.3.1(2017/5/7)
1. 【修复】file协议下修改html文档编码失败的Bug。

### v0.3(2017/4/17)
1. 增加对file://协议本地文件的支持。

### v0.2(2017/3/22)
1. 修改编码列表加载逻辑。
2. 右上角窗口检测当前编码时显示注释。
3. 添加右键菜单。
4. 添加英语支持。

### v0.1(2017/2/14)
1. 测试版，对Chrome 54选择编码功能中所列出的编码进行了支持。


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fjinliming2%2FChrome-Charset.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fjinliming2%2FChrome-Charset?ref=badge_large)
