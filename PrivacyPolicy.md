# Privacy Policy 隐私策略

This Privacy Policy shall provide you with a general overview of the collection and processing of your data.

此隐私策略将为您提供有关数据收集和处理的一般概述。

# What kind of personal data do I collect? 我收集什么样的个人数据？
None.

无。

This extension can work offline totally, it never uploads any bits of data.

此扩展完全可以离线工作，而不上传任何数据。

When you enable this extension on any webpage, and extension works, the only one thing it does is to intercept HTTP request and modify the response headers. for local files with "file://" protocol, it reloads the local file, converts encoding and replaces to the web page.

当您在任意页面启用扩展，并指定修改了编码后，扩展做的唯一一件事情就是拦截 HTTP 请求并修改响应头。对于“file://”协议的本地文件，扩展会重新加载本地文件，转换编码之后替换到页面中。

The only thing it stores is the settings, which includes the three encodings you use most recently, display the context menu or not, and the default encoding for all web pages.

扩展存储的唯一内容是设置，包含了您最近使用的三个编码、是否显示右键菜单和对所有页面生效的默认编码。

The settings never sync to the server, it will only store locally.

存储的设置永远不会同步到服务器上，只会本地存储。

# Why extension requires these permissions? 扩展为什么需要这些权限？

## "webRequest" and "webRequestBlocking"
To block the HTTP requests and modify responded headers is how this extension works, so the extension needs "webRequest" to match requests and needs "webRequestBlocking" to intercept requests and modify responses.

扩展的工作方式就是拦截 HTTP 请求并修改响应头，所以扩展需要“webRequest”权限去匹配请求并需要“webRequestBlocking”权限去拦截请求响应的内容，并对响应进行修改。

## "<all_urls>"
The extension needs to have the permission of the specified Hosts / URLs to intercept network request, the extension required all site permission to satisfy all users. **You can override this in browser's Extension Manage page if you need more privacy.**

扩展需要指定 Host 或 URL 权限来拦截网络请求，为了使所有用户都可以正常使用，扩展申请了所有 Host 和 URL 的权限（即“<all_urls>”）。**如果您对此感到不快乐，可以在浏览器的扩展管理页面覆盖这项权限。**

## "contextMenus"
To display the context menu on every webpage, you can disable this in the extension options page, after you do that, this permission will not be used.

用于在所有页面添加右键菜单项。您可以在扩展的选项页关闭右键菜单显示，这样扩展程序将不会再用到这个权限了。

## "tabs"
This permission used to detect the encoding of the webpage, the extension will send JavaScript codes to the webpage that current activated, the only things this code does is get the current encoding of the webpage and reply to the extension.

这个权限用于检查网页的当前编码，扩展程序向当前的页面发送一段 JavaScript 代码，这段代码的唯一功能就是获取当前页面的编码并返回给扩展程序。

And, to modify the encoding of local files with "file://" protocol, to display context menu also needs this permission too.

修改“file://”协议的本地文件的编码、显示右键菜单也都需要这项权限。

# Contact 联系我
You can always contact me with questions or feedback about the privacy policy by [E-mail](mailto:jinliming2@gmail.com) or [GitHub Issues](https://github.com/jinliming2/Chrome-Charset/issues).

您可以通过 [E-mail](mailto:jinliming2@gmail.com) 或是 [GitHub Issues](https://github.com/jinliming2/Chrome-Charset/issues) 向我咨询关于隐私策略的问题，或是提供反馈。
