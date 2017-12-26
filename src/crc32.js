/* eslint no-unused-vars: 0 */
/* global Uint32Array: false */

const CRC32_POLY = 0xEDB88320;

class CrcRainbowTableNode {
    constructor(currDigit = '') {
        this.val = currDigit;
        this.next = [];
    }
}

class Crc32Engine {
    static initCrc32Table(table) {
        for (let i = 0; i < 256; i++) {
            let currCrc = i;
            for (let j = 0; j < 8; j++) {
                if (currCrc & 1) {
                    currCrc = (currCrc >>> 1) ^ CRC32_POLY;
                } else {
                    currCrc >>>= 1;
                }
            }
            table[i] = currCrc;
        }
    }

    constructor() {
        this.crc32Table = new Uint32Array(256);
        Crc32Engine.initCrc32Table(this.crc32Table);
        this.rainbowTable = new CrcRainbowTableNode();
        // Initialize the rainbow Table
        for (let i = 1; i < 100000; i++) {
            this.addRainbowTableEntry(i);
        }
    }

    addRainbowTableEntry(i) {
        let currNode = this.rainbowTable;
        let hash = (this.compute(i) >>> 0).toString(16);
        for (let currChar of hash) {
            let hasChar = false;
            for (let child of currNode.next) {
                if (child.val === currChar) {
                    currNode = child;
                    hasChar = true;
                    break;
                }
            }
            if (!hasChar) {
                currNode.next.push(new CrcRainbowTableNode(currChar));
                currNode = currNode.next[currNode.next.length - 1];
            }
        }
        currNode.next.push(i);
    }

    compute(input, addPadding = false) {
        let currCrc = 0;
        for (let digit of input.toString()) {
            currCrc = this.crc32Update(currCrc, Number(digit));
        }
        if (addPadding) {
            for (let i = 0; i < 5; i++) {
                currCrc = this.crc32Update(currCrc, 0);
            }
        }
        return currCrc;
    }

    crack(hash) {
        let results = [];
        let hashVal = ~Number('0x' + hash) >>> 0;
        let baseHash = 0xFFFFFFFF;

        for (let digitCount = 1; digitCount < 10; digitCount++) {
            baseHash = this.crc32Update(baseHash, 0x30); // 0x30: '0'
            if (digitCount < 6) {
                // Direct lookup
                results = results.concat(this.lookup(hashVal ^ baseHash));
            } else {
                // Lookup with prefix
                let startPrefix = Math.pow(10, digitCount - 6);
                let endPrefix = Math.pow(10, digitCount - 5);

                for (let prefix = startPrefix; prefix < endPrefix; prefix++) {
                    for (let postfix of this.lookup(hashVal ^ baseHash ^
                                                    this.compute(prefix, true))) {
                        results.push(prefix * 100000 + postfix);
                    }
                }
            }
        }
        return results;
    }

    crc32Update(currCrc, code) {
        return (currCrc >>> 8) ^ this.crc32Table[(currCrc ^ code) & 0xFF];
    }

    lookup(hash) {
        let currNode = this.rainbowTable;
        for (let currChar of (hash >>> 0).toString(16)) {
            let hasChar = false;
            for (let child of currNode.next) {
                if (child.val === currChar) {
                    currNode = child;
                    hasChar = true;
                    break;
                }
            }
            if (!hasChar) {
                return [];
            }
        }
        return currNode.next.filter((i) => typeof i === 'number');
    }
}
