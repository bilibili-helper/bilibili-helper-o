# Feature

Feature 作为一个功能点，需要使用FeatureManager进行加载。如果拥有UI界面，需要设定hasUI属性，并且满足相关约定。

简单Featue的示例: [createNewFeature](./createNewFeature.md)。

## Directory

```javascript
moduleName
    index.js
    UI
        index.js
        ...
    _locales
        zh_CN
            messages.json
            ...
        ...
    ...
```

1. `moduleName/index.js`文件必须导出继承自Feature的类。如果有UI的话，需要同时导出UI目录下的index.js。类名为首字母大写模块名。如：模块videoAnchor的UI类为VideoAnchor。
2. `moduleName/UI/index.js`文件必须导出继承自UI的类。类名必须为xxxUI，其中xxx为模块名。如：模块videoAnchor的UI类为VideoAnchorUI。
3. `moduleName/_locales/zh_CN`目录名必须为`localesSupportList.json`中存在的名称，且目录下只能有json文件，文件名命名规则不作约定。

## Properties

| Type                            | Name            | Description                                      |
| ------------------------------- | --------------- | ------------------------------------------------ |
| String                          | name            | 首字母小写，驼峰命名的Feature名称                |
| String                          | optionStoreName | 配置仓库名，格式：`bilibili-helper-${this.name}` |
| String                          | dataStoreName   | 数据仓库名，格式：`in-module-${this.name}`       |
| String                          | kind            | 分类名                                           |
| Boolean                         | initialed       | 初始化状态                                       |
| Array of String                 | dependencies    | 依赖配置                                         |
| Array of String                 | permissions     | 权限配置                                         |
| [SettingObject](#SettingObject) | settings        | 设置对象                                         |
| Object                          | permissionMap   | 当前权限状态                                     |
| Any                             | store           | 模块本地数据仓库，非配置仓库                     |



## OptionType

规定功能子选项的功能类型

Enum: `checkbox` or `radio`

|Value|Description|
| -------- | ---------------------- |
| checkbox | 表示子选项是复选框类型。 |
| radio    | 表示子选项是单选组。   |



## PermissionsType

规定该功能需要进行的权限校验项目

Enum: `login` or `notifications`

| Value         | Description                           |
| ------------- | ------------------------------------- |
| login         | 表示功能需要登录BILIBILI账号。        |
| notifications | 表示功能需要获得`notifications`权限。 |
| pip | 表示用户所使用的浏览器支持画中画功能。 |
| downloads | 表示功能需要获取文件下载和管理功能。 |



## OptionObject

| Type   | Name        | Description                                                  |
| ------ | ----------- | ------------------------------------------------------------ |
| String | key         | 用于标记子选项的名称，子选项之前不能重复。                   |
| String | title       | 在设置页面中作为设置名称进行显示。                           |
| String | description | 在设置页面中作为设置的表述/说明进行显示。                    |
| Bool   | on          | 如果type配置为checkbox，则该配置表示该子选项的默认值，代表启用与否。 |

## SubPageObject

| Type                                   | Name        | Description                                                  |
| -------------------------------------- | ----------- | ------------------------------------------------------------ |
| String                                 | title       | 在设置页面二级页面中作为设置名称进行显示。<br />可以和[SettingObject](#SettingObject)中的title不同。 |
| String                                 | decsription | 在设置页面二级页面中作为设置描述进行显示。<br />可以和[SettingObject](#SettingObject)中的description不同。 |
| enum in [OptionType](#OptionType)      | type        | 表示该功能的二级页面中子选项的功能类型。                     |
| Array of [OptionObject](#OptionObject) | options     | 规定功能在设置页面的二级页面中显示的子选项。                 |
| [OptionObject](#OptionObject)'s key    | value       | 如果type配置为radio，则设置该项目二级页面中表示子选项单选组的默认值。 |



## SettingObject

| Type                                   | Name        | Description                                                  |
| -------------------------------------- | ----------- | ------------------------------------------------------------ |
| Bool                                   | on          | 表示该功能是否启用。                                         |
| String                                 | title       | 在设置页面中作为设置名称进行显示。                           |
| String                                 | description | 在设置页面中作为设置的表述/说明进行显示。                    |
| Bool                                   | toggle      | 规定该功能的设置在设置页面是否可以点击（进行开关切换）       |
| Bool                                   | hide        | 规定该功能的设置在设置页面是否显示。<br />一般来说，作为锚点的功能模块是不需要显示并且默认开启的。 |
| Bool                                   | hasUI       | 规定该功能是否加载UI。<br />如果为true，则会根据[Properties](#Properties)中的[kind](#kind)配置在相应页面中加载UI子目录下的UI类。 |
| enum in [OptionType](#OptionType)      | type        | 表示该功能的一级页面中子选项的功能类型。                     |
| Array of [OptionObject](#OptionObject) | options     | 规定功能在设置页面的一级页面中显示的子选项。                 |
| String                                 | value       | 如果type配置为radio，则设置该项目表示子选项单选组的默认值。  |
| [SubPageObject](#SubPageObject)        | subPage     | 规定功能在设置页面的二级页面中显示的子选项                   |
