/**
 * Author: DrowsyFlesh
 * Create: 2020/5/24
 * Description:
 */
import protobuf from 'protobufjs';

const danmuElementConfig = {
    id: {type: 'int64', id: 1},
    progress: {type: 'int32', id: 2},
    mode: {type: 'int32', id: 3},
    fontsize: {type: 'int32', id: 4},
    color: {type: 'uint32', id: 5},
    midHash: {type: 'string', id: 6},
    content: {type: 'string', id: 7},
    ctime: {type: 'int64', id: 8},
    weight: {type: 'int32', id: 9},
    action: {type: 'string', id: 10},
    pool: {type: 'int32', id: 11},
    idStr: {type: 'string', id: 12},
};
const danmuViewConfig = {
    state: {type: 'int32', id: 1},
    text: {type: 'string', id: 2},
    textSide: {type: 'string', id: 3},
    dmSge: {type: 'DmSegConfig', id: 4},
    flag: {type: 'DanmakuFlagConfig', id: 5},
    specialDms: {rule: 'repeated', type: 'string', id: 6},
};

const danmuSegConfig = {
    pageSize: {type: 'int64', id: 1},
    total: {type: 'int64', id: 2},
}
const danmuConfigMap = (map) => Object.keys(map).reduce((target, key) => {
    const config = map[key];
    target[config.id] = {key, ...config};
    return target;
}, {});

const decoderDanmu = (reader, length) => {
    const l = length ? reader.pos + length : reader.len;
    const danmu = {};
    const config = danmuConfigMap(danmuElementConfig);
    while (reader.pos < l) {
        const pos = reader.uint32();
        const paramId = pos >>> 3;
        let param = config[paramId];
        if (param) {
            danmu[param.key] = reader[param.type]();
        } else {
            reader.skipType(pos & 7);
        }
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
const DanmuSegConfigDecoder = (reader, length) => {
    reader = !(reader instanceof protobuf.Reader) ? protobuf.Reader.create(reader) : reader;
    const l = length ? reader.pos + length : reader.len;
    const res = {};
    const config = danmuConfigMap(danmuSegConfig);
    while (reader.pos < l) {
        const pos = reader.uint32();
        const paramId = pos >>> 3;
        let param = config[paramId];
        if (param) {
            res[param.key] = reader[param.type]();
        } else {
            reader.skipType(pos & 7);
        }
    }
    return res;
}
export const DanmuOptionDecoder = (viewData, length) => {
    const reader = protobuf.Reader.create(new Uint8Array(viewData));
    const l = length ? reader.pos + length : reader.len;
    const view = {
        specialDms: [],
    };
    while (reader.pos < l) {
        const pos = reader.uint32();
        const paramId = pos >>> 3;
        switch (paramId) {
            case 1:
            case 2:
            case 3:
                break;
            case 4:
                view.dmSge = DanmuSegConfigDecoder(reader, reader.uint32());
                break;
            case 5:
                break;
            case 6:
                view.specialDms.push(reader.toString());
                break;
            case 7:
                break;
            default:
                //console.log(reader.pos, reader.len);
                reader.skipType(pos & 7);
                break;
        }
    }
    return view;
};
