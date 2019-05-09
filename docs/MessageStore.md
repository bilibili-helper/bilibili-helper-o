# MessageStore

### 使用messageStore的原因

助手需要监听实际页面中的一些request，并且要求UI能够对这些request做出相应的反馈。

但是，助手的UI需要等到B站的Vue脚本你执行完更新相应DOM之后才能够执行，不然页面会被vue崩坏。

在等待过程中出现了UI初始化和响应时间无法匹配的问题。而messageStore的作用就是能够暂存监听到的相关request，并且在UI初始化后异步执行处理task列表（这些task只能是异步的，没有优先级的）。

### initializedName

一个用于表示DOM初始化完毕的字符串，这里约定以featureName + DOMInitialized的字符串形式，如danmu功能的该字符串命名为danmuDOMInitialized。

```javascript
this.store = new MessageStore('danmuDOMInitialized');
```

### addListener

每个MessageStore拥有一些监听事件，具体如下：

initializedName 当监听到拥有`initializedName`参数的message时，会对该messageStore初始化时的同名参数进行比较，如果相同，则标记该store已经初始化完成，并且立即执行队列中的事件

tabUnload

### StoreObject

| Type                               | Name  | Description                                         |
| ---------------------------------- | ----- | --------------------------------------------------- |
| number                             | state | 表示store的初始化状态，0表示未初始化，1表示已初始化 |
| array of [TaskObject](#TaskObject) | queue | 存放监听到的未处理的事件                            |
| object                             | data  | 存放相关数据，如cid等                               |



## TaskObject

| Type                  | Name  | Description                |
| --------------------- | ----- | -------------------------- |
| Number                | tabId | 需要发送任务消息的目标页面 |
| [TaskData](#taskData) | data  | 详见 [TaskData](#TaskData) |

### TaskData

| Type   | Name     | Description                                             |
| ------ | -------- | ------------------------------------------------------- |
| string | command  | 代表任务的特殊标识符，用于区分所要执行的不用的任务/事件 |
| /      | 其他参数 |                                                         |



## method

messageStore拥有几个使用的方法，用于管理监听到的事件和数据

### createData(tabId): [StoreObject](#StoreObject)

返回的是 [StoreObject](#StoreObject) 结构的对象，默认state为0.

创建一个与某个tab有关的数据结构，此处必须使用tabId，因为messageStore会监听带有`tabUnload`参数的message通知，并进行清理工作。

### has(tabId): bool

对指定tabId的store的查询

### get(tabId): [StoreObject](#StoreObject)

返回指定tabId的StoreObject

### delete(tabId): void

删除指定tabId的StoreObject

### dealWith(tabId): void

异步处理指定tabId的store的queue。

处理过程其实是依次取出 [TaskObject](#TaskObject) 中的数据，然后用`chrome.tabs.sendMessage`对指定tabId的页面进行消息发送，当页面捕获消息并根据 [TaskData](#TaskData) 里的command进行过滤后在前端页面执行相关的操作，其中自然的就附带发送了一些监听到的数据。
