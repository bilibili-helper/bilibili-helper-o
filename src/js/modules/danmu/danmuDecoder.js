/**
 * Author: DrowsyFlesh
 * Create: 2020/5/24
 * Description:
 */
import protobuf from 'protobufjs';

const danmuConfig = JSON.parse(`{"id":{"type":"int64","id":1},"progress":{"type":"int32","id":2},"mode":{"type":"int32","id":3},"fontsize":{"type":"int32","id":4},"color":{"type":"uint32","id":5},"midHash":{"type":"string","id":6},"content":{"type":"string","id":7},"ctime":{"type":"int64","id":8},"weight":{"type":"int32","id":9},"action":{"type":"string","id":10},"pool":{"type":"int32","id":11},"idStr":{"type":"string","id":12}}`);
const danmuConfigMap = Object.keys(danmuConfig).reduce((target, key) => {
    const config = danmuConfig[key];
    target[config.id] = {key, ...config};
    return target;
}, {});

const decoderDanmu = (reader, length) => {
    const l = length ? reader.pos + length : reader.len;
    const danmu = {};
    while (reader.pos < l) {
        const pos = reader.uint32();
        const paramId = pos >>> 3;
        let param = danmuConfigMap[paramId];
        if (param) {
            danmu[param.key] = reader[param.type]();
        } else reader.skipType(pos & 7);
    }
    return danmu;
};

export const DanmuDecoder = (danmuData) => {
    const reader = new protobuf.Reader(new Uint8Array(danmuData));
    const danmuList = [];
    while (reader.pos < reader.len) {
        const currentPos = reader.uint32();
        switch (currentPos >>> 3) {
            case 1: {
                danmuList.push(decoderDanmu(reader, reader.uint32()));
                break;
            }
            default:
                reader.skipType(currentPos & 7);
        }
    }
    return danmuList;
};
