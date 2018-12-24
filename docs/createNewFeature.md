# 创建新功能

在创建新功能前，需要先确定几个参数

1. 功能名，本文以newFeature为例；
2. 功能类别（kind），代表功能作用于那一个页面，本文以newKind为例；
3. 确定涉及到的权限是否会影响到功能使用状态，如果需要则添加permissions属性。

确定好后执行如下步骤：

1. 在`src/js/modules`下创建以首字母小写的驼峰式命名规则新建文件夹，本文以newFeature为例；
2. 创建`index.js`文件，并编写如下代码

```javascript

import {Feature} from 'Libs/feature';

export class NewFeature extends Feature {
    constructor() {
        super({
            name: 'newFeature', // requested
            kind: 'newKind', // requested
            dependencies: [], // optional
            permissions: [], // optional
            settings: { // requested
                on: true, // requested
                toggle: true, // optional
                title: '功能的标题，在设置页面显示',
                description: '功能的描述，也会在设置页面显示，没有则不显示',
            },
        });
    }
}
```

具体设置请参见 [Feature](./Feature.md)。
