# bilibili-helper
[![LICENSE](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)
[![Website](https://img.shields.io/website-up-down-green-red/http/bilihelper.guguke.net.svg)](https://bilihelper.guguke.net/)

Copyright (c) 2018 [Zac Yu](mailto:me@zacyu.com), Google LLC, [ruo](mailto:jjj201200@gmail.com)

An auxiliary extension for Bilibili (bilibili.com) which allows users to bypass playback restrictions, replace video players and use shortcuts.

哔哩哔哩 (bilibili.com) 辅助工具，可以下载视频，查询弹幕发送人以及一些十分实用的直播区功能。

## DOC

重构中使用的技术栈

1. react16
2. webpack
3. Styled-component

样式参考自chrome设置页面

使用Styled-component控制样式

###功能模块的简单想法
功能的特点分为: 1. 在UI需求上有需要和不需要两种，2. 在权限上有需要检测和不需要检测两种。
对于（1.）考虑设定固定的UI绘制锚点，包括但不局限于：POPUP页面，主站视频播放页面的某几个DOM和直播间页面某几个DOM
对于（2.）考虑设定每个模块的装载，其中必须包括权限检测流程，判断是否需要检测权限，如果需要且没有获得权限则弹出提示框并示意用户开启权限（应该允许不再弹出提示框）


## Website
https://bilihelper.guguke.net

## Wiki
https://github.com/zacyu/bilibili-helper/wiki

## Release (发行)

[Chrome Web Store](https://chrome.google.com/webstore/detail/kpbnombpnpcffllnianjibmpadjolanh)

[Download at Github ](https://github.com/zacyu/bilibili-helper/releases)

## License (许可)
[MIT](LICENSE)

## Terms of Service & Privacy Policy (隐私协议)
http://addons-privacy.com/
