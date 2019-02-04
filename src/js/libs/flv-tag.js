/***
 * Copyright (C) 2018 Qli5. All Rights Reserved.
 *
 * @author qli5 <goodlq11[at](163|gmail).com>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import TwentyFourDataView from './twenty-four-dataview.js';

class FLVTag {
    constructor(dataView, currentOffset = 0) {
        this.tagHeader = new TwentyFourDataView(dataView.buffer, dataView.byteOffset + currentOffset, 11);
        this.tagData = new TwentyFourDataView(dataView.buffer, dataView.byteOffset + currentOffset + 11, this.dataSize);
        this.previousSize = new TwentyFourDataView(dataView.buffer, dataView.byteOffset + currentOffset + 11 + this.dataSize, 4);
    }

    get tagType() {
        return this.tagHeader.getUint8(0);
    }

    get dataSize() {
        return this.tagHeader.getUint24(1);
    }

    get timestamp() {
        return this.tagHeader.getUint24(4);
    }

    get timestampExtension() {
        return this.tagHeader.getUint8(7);
    }

    get streamID() {
        return this.tagHeader.getUint24(8);
    }

    stripKeyframesScriptData() {
        let hasKeyframes = 'hasKeyframes\x01';
        let keyframes = '\x00\x09keyframs\x03';
        if (this.tagType != 0x12) throw 'can not strip non-scriptdata\'s keyframes';

        let index;
        index = this.tagData.indexOf(hasKeyframes);
        if (index != -1) {
            //0x0101 => 0x0100
            this.tagData.setUint8(index + hasKeyframes.length, 0x00);
        }

        // Well, I think it is unnecessary
        /*index = this.tagData.indexOf(keyframes)
        if (index != -1) {
            this.dataSize = index;
            this.tagHeader.setUint24(1, index);
            this.tagData = new TwentyFourDataView(this.tagData.buffer, this.tagData.byteOffset, index);
        }*/
    }

    getDuration() {
        if (this.tagType != 0x12) throw 'can not find non-scriptdata\'s duration';

        let duration = 'duration\x00';
        let index = this.tagData.indexOf(duration);
        if (index == -1) throw 'can not get flv meta duration';

        index += 9;
        return this.tagData.getFloat64(index);
    }

    getDurationAndView() {
        if (this.tagType != 0x12) throw 'can not find non-scriptdata\'s duration';

        let duration = 'duration\x00';
        let index = this.tagData.indexOf(duration);
        if (index == -1) throw 'can not get flv meta duration';

        index += 9;
        return {
            duration: this.tagData.getFloat64(index),
            durationDataView: new TwentyFourDataView(this.tagData.buffer, this.tagData.byteOffset + index, 8)
        };
    }

    getCombinedTimestamp() {
        return (this.timestampExtension << 24 | this.timestamp);
    }

    setCombinedTimestamp(timestamp) {
        if (timestamp < 0) throw 'timestamp < 0';
        this.tagHeader.setUint8(7, timestamp >> 24);
        this.tagHeader.setUint24(4, timestamp & 0x00FFFFFF);
    }
}

export default FLVTag;
