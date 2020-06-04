/**
 * Author: DrowsyFlesh
 * Create: 2020/6/3
 * Description:
 */
import root from './proto-bili-gen';
const DmSegMobileReply = root.bilibili.community.service.dm.v1.DmSegMobileReply;
const DmWebViewReply = root.bilibili.community.service.dm.v1.DmWebViewReply;

export const DmWebViewReplyDecoder = (buff) => {
    const message = DmWebViewReply.decode(new Uint8Array(buff));
    const data = DmWebViewReply.toObject(message);
    return data;
};

export const DmSegMobileReplyDecoder = (buff) => {
    const message = DmSegMobileReply.decode(new Uint8Array(buff));
    const data = DmSegMobileReply.toObject(message);
    return data;
}
