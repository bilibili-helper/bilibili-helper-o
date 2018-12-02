# 概要

本文介绍助手重构的整体思路

![main](./images/main.jpg)

上图为整体概览，有如下描述：

1. 扩展是在background.js中依赖功能管理器（FeatureManager）加载功能的
2. 加载功能时经过权限管理器（PermissionManager）处理，根据鉴权结果调整扩展状态
3. 扩展在相关页面（如视频播放页面）被打开时，通过相关页面的入口文件（如video.js）请求相关功能的配置进行动态的UI加载

您可能会有如下需求：

1. 创建一个拥有定时器的功能：参见 [dynamicCheck](../src/js/modules/dynamicCheck/index.js)
2. 创建一个拥有UI的功能：参见 [menu](../src/js/modules/menu)
3. 创建一个后端发送消息来更细UI的功能：参见 [videoDownload](../src/js/modules/videoDownload)

注意：

1. 如果您需要为新页面添加功能，需要先创建类似 [VideoAnchor](../src/js/modules/videoAnchor) 这样的锚模块，并参见 [danmu](../src/js/modules/danmu) 功能进行定向UI注入
2. 如果您需要为功能添加权限校验，需要添加permissions属性
3. 如果您需要为功能添加i18n支持，参见 [Menu](../src/js/modules/menu) 功能

其他：

FeatureManager：[link](./FeatureManager.md)

Feature：[link](./Feature.md)

UIManager: [link](./UIManager.md)

MessageStore: [link](./MessageStore.md)

