# PermissionManager

鉴权对象是用来管理扩展中不同权限的状态变化。

例如当用户的登录状态发生改变时，PermissionManger通过监听cookie通知程序中对该权限有要求的功能点，并做出相应的调整。

PermissionManger在Feature实例化完成，功能点的配置初始化之后进行鉴权，如果鉴权没有通过则不会初始化该功能。初始化完成意味着该功能可以被其他模块依赖，反之以来该模块的子模块将不会得到加载和执行。

该鉴权过程其实还用于控制那些使用某些特性的功能，如画中画（PIP）。如果该权限没有校验通过则不会加载该功能。

## 为Feature添加鉴权过程

想要为Feature实现鉴权需求，只需要在Feature的设定中添加permissions属性，并用数组的方式组织，将相关权限名将其赋值即可。

当Feature初始化或者在启动后发生变化时，会约定执行 `permissionHandle${_.upperFirst(permissionName)}` 函数（如果有定义的话），如 `permissionHandleLogin`。

同时还会更新相关Feature的permissionMap属性，其结构为 `permissionMap = {permissionName: [boolean]}`。

目前有以下几种校验：

| Name          | Description                                                | has listener |
| ------------- | ---------------------------------------------------------- | ------------ |
| Login         | 判断用户是否登录。通过监听相关cookie实现。                 | true         |
| notifications | 判断是否开启推送通知。                                     | false        |
| pip           | 判断用户浏览器是否支持pip功能。                            | false        |
| downloads     | 判断用户是否授权下载管理权限。用于提供更合理的下载文件名。 | false        |

## 添加新的权限

为系统添加新的权限十分简单，需要关注一下几点。

1. 确定该权限是否为系统权限后者功能点；
2. 如果可以进行监听需要再`addListener`方法中进行添加；
3. `check`函数中添加新的case和相关处理函数；
4. 由于鉴权过程是FeatureManager在加载Feature之前的过程，所以最后会返回值为{pass, msg}这样的Promise对象。pass为是否通过，msg为如果没有通过时显示的警告或错误信息。请尽可能实现多语言化。