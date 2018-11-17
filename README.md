# bilibili-helper

[![LICENSE](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)
[![Build Status](https://img.shields.io/travis/zacyu/bilibili-helper.svg)](https://travis-ci.org/zacyu/bilibili-helper)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/kpbnombpnpcffllnianjibmpadjolanh.svg)](https://chrome.google.com/webstore/detail/kpbnombpnpcffllnianjibmpadjolanh)
[![Chrome Webstore Downloads](https://img.shields.io/chrome-web-store/d/kpbnombpnpcffllnianjibmpadjolanh.svg)](https://chrome.google.com/webstore/detail/kpbnombpnpcffllnianjibmpadjolanh)
[![Website](https://img.shields.io/website-up-down-green-red/http/bilihelper.guguke.net.svg)](https://bilihelper.guguke.net/)

Copyright (c) 2018 [Zac Yu](mailto:me@zacyu.com), Google LLC, [Drowsy Flesh](mailto:jjj201200@gmail.com)

An auxiliary extension for Bilibili (bilibili.com) which allows users to bypass playback restrictions, replace video players and use shortcuts.

哔哩哔哩 (bilibili.com) 辅助工具，可以下载视频，查询弹幕发送人以及一些十分实用的直播区功能。

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

## Document

1. Module
2. Feature
3. UI
4. FeatureManager
5. UIManager
6. MessageStore
7. i18n

## Module

框架中module为modules文件夹中的一个模块，负责实现一种助手的功能，例如：

​debug：该模块提供一个调试变量，所有模块都需要依赖他执行，用他来标记是否需要让用户看到调试信息。未来可以取消所有依赖，当其他模块需要的时候进行单独检查。

videoAnchor：该模块作为一个锚，没有任何后台监听功能。让其他依赖项可以获取其返回的UI对象，从而实现定向的DOM注入。

### 目录结构约定

```
moduleName
  index.js         1
  UI
    index.js       2
    ...
  _locales 
    zh_CN          3
      messages.json
      ...
    ...
  ...
```

1: 该文件必须导出继承自Feature的类。如果有UI的话，需要同时导出UI目录下的index.js。类名为首字母大写模块名。如：模块videoAnchor的UI类为VideoAnchor。

2: 该文件必须导出继承自UI的类。类名必须为xxxUI，其中xxx为模块名。如：模块videoAnchor的UI类为VideoAnchorUI。

3: 该目录名必须为`localesSupportList.json`中存在的名称，且目录下只能有json文件，文件名不作约定。

## Feature

Feature为助手的一个功能模块，即一个Feature等于一个module。Feature可以拥有UI，如需要则在模块目录下创建名为`UI`的目录，同时导出继承自UI类的UI模块

### Feature类

该类由FeatureManager负责实例化并加载。
几个简单的Feature示例：

```javascript
// debug feature
import {Feature} from 'Libs/feature';

export class Debug extends Feature {
    constructor() {
        super({
            name: 'debug',
            kind: 'other',
            settings: {
                on: true,
                toggle: false,
                title: '调试模式',
                description: '开启后会在控制台输出更多信息，并执行更多用于测试的代码',
            },
        });
    }

    afterSetOption = async (options) => {
        chrome.runtime.sendMessage({commend: 'debugMode', value: options.on});
    };
}
```

如上，继承自Feature的Debug类，在constructor方法中设置了如下配置

1. name：模块名。约定为首字母小写驼峰。
2. kind：模块分类。目前有video，live，other，popup。FeatureManager通过对kind进行过滤，从而让UIManager依赖加载kind指定的那些Feature。相同kind的Feature在设置页面中会被放在同一个Card中。如果需要新的kind，需要在config页面修改kindMap。
3. settings：Feature的各种设定，具体见下一节。

### settings

如下为一个完整的settings对象：

```javascript
{
    name: 'moduleName',
    kind: 'kindName',
    permission: {login, notification}, 4 // 需要特定权限时，在执行init方法时鉴权，默认为空 
    dependencies: ['dependency1',...], // 指定模块的依赖，默认为空
    settings: {
    	on: true, // 指模块是否执行launch方法
    	toggle: false, // 指模块在config页面是否可以设置on属性
    	title: 'module title', // 用于在config页面显示的模块名称
    	description: 'module description', // 用于在config页面显示的模块描述
        type: 'checkout | radio', // 当模块拥有子选项时，规定选项是类别
        options: [ // 一级页面子选项配置
            {
                key: 'option1', // 子选项键名，数组中key不能重复
                title: 'option1 title', // 子选项名称，用于在config页面显示
                description: 'option1 description',	// 用于在config页面显示的子选项描述
                on: true, // 当子选项类型(type)为checkout时，规定启用状态
            },
            ...
        ],
        value: 'option1', // 当子选项类型(type)radio时，根据该值规定启用的子选项，对应子选项key
        subPage: { // 二级页面配置，可与一级页面子选项同时配置
            title: 'subPage title', // 该模块在config页面二级页面的标题
            description: 'subPage description', // 该模块在config页面二级页面的描述
            type: 'checkout | radio', // 该模块在config页面二级页面的子选项类型
            options: [ // 同上
            	{
                	key: 'option1',
                	title: 'option1 title',
                	value: 'option1 value',
                	on: true,
                	description: 'option1 description',
            	},
            	...
        	],
            value: 'option1',
        },
	},
}
```

4: 需要扩展`Utils`中的`PERMISSION_TYPE`，已经有的鉴权对象为`login`和` notification`。


### methods

Feature类拥有一些方便的方法，便于开发调用，具体如下：

#### launch
如果模块启用则会调用该方法

#### pause

#### addListener

#### getSetting

#### setSetting

#### afterSetSetting

## UI

## FeatureManager

## UIManager

## MessageStore

## i18n
