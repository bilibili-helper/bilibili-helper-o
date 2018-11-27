# FeatureManager

FeatureManager在background.js中被加载并实例化。它以依赖加载的方式完成扩展功能的载入。

## Listener

| commend            | other properties                                             | Description                  | Return                                                       |
| ------------------ | ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------ |
| getSettings        | feature：指定返回某一个功能的配置<br />kind：指定返回某一类功能的配置<br />checkHide：过滤掉不需要显示配置的功能<br />hasUI：过滤出拥有UI的配置 | 返回功能的配置               | {FeatureName: [SettingObject](./Feature.md/#SettingObject), ...} |
| inIncognitoContext |                                                              | 返回用户所处的隐私模式的状态 | Bool                                                         |
| setSetting         | feature：指定设置某一个功能的配置<br />settings              | 设置某个功能的配置           | true                                                         |
| getSetting         | feature：指定获取某一个功能的配置                            | 获取某个功能的配置           | settings                                                     |

