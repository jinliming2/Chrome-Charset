# Chrome-Charset
[![Launched](https://img.shields.io/badge/Chrome--Charset-launched-brightgreen.svg)](https://github.com/jinliming2/Chrome-Charset)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jinliming2/Chrome-Charset/master/LICENSE)
[![GitHub Release](https://img.shields.io/github/release/jinliming2/Chrome-Charset.svg)](https://github.com/jinliming2/Chrome-Charset/releases)
[![GitHub stars](https://img.shields.io/github/stars/jinliming2/Chrome-Charset.svg)](https://github.com/jinliming2/Chrome-Charset/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/jinliming2/Chrome-Charset.svg)](https://github.com/jinliming2/Chrome-Charset/network)
[![GitHub issues](https://img.shields.io/github/issues/jinliming2/Chrome-Charset.svg)](https://github.com/jinliming2/Chrome-Charset/issues)
[![Financial Contributors on Open Collective](https://opencollective.com/charset/all/badge.svg?label=financial+contributors)](https://opencollective.com/charset) 

[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/oenllhgkiiljibhfagbfogdbchhdchml.svg)](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml)
[![Chrome Web Store Stars](https://img.shields.io/chrome-web-store/stars/oenllhgkiiljibhfagbfogdbchhdchml.svg)](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml)
[![Chrome Web Store Rating Count](https://img.shields.io/chrome-web-store/rating-count/oenllhgkiiljibhfagbfogdbchhdchml.svg)](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml)
[![Chrome Web Store Version](https://img.shields.io/chrome-web-store/v/oenllhgkiiljibhfagbfogdbchhdchml.svg)](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml)
[![Chrome Web Store Downloads](https://img.shields.io/chrome-web-store/d/oenllhgkiiljibhfagbfogdbchhdchml.svg)](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml)


A Google Chrome extension used to modify the page default encoding for Google Chrome 55+.

用于在Google Chrome浏览器下修改网站默认编码的扩展程序。

## Release
- **[Google Chrome Web Store](https://chrome.google.com/webstore/detail/oenllhgkiiljibhfagbfogdbchhdchml) / Recommend 推荐**
- [GitHub Release](https://github.com/jinliming2/Chrome-Charset/releases)

### Package is invalid: "CRX_HEADER_INVALID"
> Download from the Google Chrome Web Store may never get this error.
>
> 从 Google Chrome 商店安装时应该不会碰到这个错误。

Google Chrome 70 started to support CRX3 and disabled old version of CRX file in Chrome 73. So, if your browser version greater than 70, please download crx3 version. ([#12](https://github.com/jinliming2/Chrome-Charset/issues/12))

Google Chrome 70 开始支持 CRX3 格式的扩展程序，并且在 Chrome 73 之后禁用了旧版本的扩展程序格式。所以，如果你的浏览器版本大于 70，建议下载 crx3 版本。（[#12](https://github.com/jinliming2/Chrome-Charset/issues/12)）

### About GitHub Release
First of all, I recommend you install this extension from the Google Chrome Web Store.

Releases from GitHub are downloaded from Google Chrome Web Store, so it also included upgrade info and verification metadata, and can also upgrade automatically.

首先，我建议从 Google Chrome Web Store 安装这个扩展程序。

GitHub Release 中的 crx 文件都是从 Google Chrome Web Store 下载的而不是自己打包的，所以包含了升级信息以及校验元数据，安装后应该不会报警告，同时也会自动到商店检查更新。

## History
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

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/jinliming2/Chrome-Charset/graphs/contributors"><img src="https://opencollective.com/charset/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/charset/contribute)]

#### Individuals

<a href="https://opencollective.com/charset"><img src="https://opencollective.com/charset/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/charset/contribute)]

<a href="https://opencollective.com/charset/organization/0/website"><img src="https://opencollective.com/charset/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/charset/organization/1/website"><img src="https://opencollective.com/charset/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/charset/organization/2/website"><img src="https://opencollective.com/charset/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/charset/organization/3/website"><img src="https://opencollective.com/charset/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/charset/organization/4/website"><img src="https://opencollective.com/charset/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/charset/organization/5/website"><img src="https://opencollective.com/charset/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/charset/organization/6/website"><img src="https://opencollective.com/charset/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/charset/organization/7/website"><img src="https://opencollective.com/charset/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/charset/organization/8/website"><img src="https://opencollective.com/charset/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/charset/organization/9/website"><img src="https://opencollective.com/charset/organization/9/avatar.svg"></a>
