# bilibili-helper-safe

哔哩哔哩 (bilibili.com) 辅助工具，可以替换播放器、去广告、推送通知并进行一些快捷操作。本插件致力于在提供便利服务的同时最大限度的保护用户的隐私和安全。

## 发行

目前本插件尚未发行到Google Chrome Web Store。不过在近期会协调发行。

## 声明

本项目中使用的 HTML5 播放器修改自 jabbany 以 [MIT许可协议](http://www.opensource.org/licenses/mit-license.php) 发布的开源项目 [ABPlayerHTML5](https://github.com/jabbany/ABPlayerHTML5)。
本项目的主体代码基于 Zhuogu 以 [MIT许可协议](http://www.opensource.org/licenses/mit-license.php) 发行的开源项目 [bilibili-helper](https://github.com/Zhuogu/bilibili-helper)。

## 许可
[MIT许可协议](http://www.opensource.org/licenses/mit-license.php).

## 隐私协议
- 本插件不能也不会访问或者采集用户在`*.bilibili.com`,`*.bilibili.tv`,`*.letv.cn`,`*.guguke.net` 以外域的任何的个人信息。
- 对于上述域（站点/服务）的信息采集也仅限于用于实现插件基础功能，插件不会把用户在这些站点的任何个人信息上传到第三方服务，除以下特例内必要的实现插件功能的服务：
    - `*.guguke.net` : 用于解析拒绝服务的CID。本服务尚未提供相关的隐私策略。本插件提供的信息包括并且限于：在`bilibili`当前视频的CID，之前用户访问此服务所在服务器时服务器留下的cookie等非即逝信息。
