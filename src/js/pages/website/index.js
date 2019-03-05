/* global TARGET_ORIGIN */
/**
 * Author: DrowsyFlesh
 * Create: 2019/2/27
 * Description:
 */
const HelperID = 'kpbnombpnpcffllnianjibmpadjolanh';
let HelperPort = chrome.runtime.connect(HelperID);
// 接收来自proxy for website 模块的message并转发给website
HelperPort.onMessage.addListener((message /*HelperPort*/) => {
    const {from, ...rest} = message;
    if (from !== 'helperProxy') { return; }
    window.postMessage({from: 'helper', ...rest}, TARGET_ORIGIN);
});

// 接收从website代码发送过来的message并转发给helper proxy for website 模块
window.addEventListener('message', (event) => {
    const {from, ...rest} = event.data;
    if (from !== 'website') { return; }
    HelperPort.postMessage({from, ...rest});
});

