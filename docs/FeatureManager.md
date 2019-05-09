# FeatureManager

![FeatureManager](./images/FeatureManager.jpg)

FeatureManager在background.js中被加载并实例化。它以依赖加载的方式完成扩展功能的载入。

### addListener

该方法监听了一些实用的事件，分别如下：

getSettings {FeatureName: FeatureSettingObject} 该事件根据如下参数返回相应feature的配置

| Name      | Description                                                 |
| --------- | ----------------------------------------------------------- |
| feature   | 如果指定feature则优先返回指定名称的Feature的配置            |
| kind      | 如果指定kind则返回指定kind那一类Feature的配置               |
| checkHide | 如果设置checkHide为true，则忽略那些配置有checkHide的Feature |
| hasUI     | 只获取有该setting配置的Feature                              |

inIncognitoContext {boolean} 返回浏览器当前是否处于隐私模式的状态

setSetting 设置指定参数（feature）的配置

getSetting 获取指定参数（feature）的配置

### instantiateFeatures

实例化各项功能的Feature类，并缓存到FeatureManager中备用

### loadFeatures

开始处理实例化后的Feature类，进行如下步骤

### 	checkModuleRequire

检查Feature的依赖是否已经初始化，即只要初始化完成了（initialed为true）就认为依赖加载完成

### 	loadFeautre 

执行具体的载入流程

### 		initSetting

初始化Feature配置

### 		permissionCheck

检查所需权限是否满足

### 		launch

启动功能

### dealwith wait queue

若功能依赖没有被全部加载，则将该功能暂时加入待加载队列。

上一队列遍历完后检查待加载队列是否为空，如果不为空则开始新一轮队列再次执行`checkModuleRequire`以下的所有步骤。



## Listener

| command            | other properties                                             | Description                  | Return                                                       |
| ------------------ | ------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------ |
| getSettings        | feature {string}：指定返回某一个功能的配置<br />kind {string}：指定返回某一类功能的配置<br />checkHide {bool}：过滤掉不需要显示配置的功能<br />hasUI {bool}：过滤出拥有UI的配置 | 返回功能的配置               | {FeatureName: [SettingObject](./Feature.md/#SettingObject), ...} |
| inIncognitoContext |                                                              | 返回用户所处的隐私模式的状态 | Bool                                                         |
| setSetting         | feature {string}：指定设置某一个功能<br />settings {SettingObject}：参见 [SettingObject](./Feature.md#SettingObject) | 设置某个功能的配置           | true                                                         |
| getSetting         | feature {string}：指定获取某一个功能                         | 获取某个功能的配置           | settings                                                     |
| getFeatureStore    | feature {string}：指定获取某一个功能                         | 获取某个功能的store对象      | FeatureStore                                                 |

