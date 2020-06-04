/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const bilibili = $root.bilibili = (() => {

    /**
     * Namespace bilibili.
     * @exports bilibili
     * @namespace
     */
    const bilibili = {};

    bilibili.community = (function() {

        /**
         * Namespace community.
         * @memberof bilibili
         * @namespace
         */
        const community = {};

        community.service = (function() {

            /**
             * Namespace service.
             * @memberof bilibili.community
             * @namespace
             */
            const service = {};

            service.dm = (function() {

                /**
                 * Namespace dm.
                 * @memberof bilibili.community.service
                 * @namespace
                 */
                const dm = {};

                dm.v1 = (function() {

                    /**
                     * Namespace v1.
                     * @memberof bilibili.community.service.dm
                     * @namespace
                     */
                    const v1 = {};

                    v1.DmWebViewReply = (function() {

                        /**
                         * Properties of a DmWebViewReply.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDmWebViewReply
                         * @property {number|null} [state] DmWebViewReply state
                         * @property {string|null} [text] DmWebViewReply text
                         * @property {string|null} [textSide] DmWebViewReply textSide
                         * @property {bilibili.community.service.dm.v1.IDmSegConfig|null} [dmSge] DmWebViewReply dmSge
                         * @property {bilibili.community.service.dm.v1.IDanmakuFlagConfig|null} [flag] DmWebViewReply flag
                         * @property {Array.<string>|null} [specialDms] DmWebViewReply specialDms
                         */

                        /**
                         * Constructs a new DmWebViewReply.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DmWebViewReply.
                         * @implements IDmWebViewReply
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDmWebViewReply=} [properties] Properties to set
                         */
                        function DmWebViewReply(properties) {
                            this.specialDms = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DmWebViewReply state.
                         * @member {number} state
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.state = 0;

                        /**
                         * DmWebViewReply text.
                         * @member {string} text
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.text = "";

                        /**
                         * DmWebViewReply textSide.
                         * @member {string} textSide
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.textSide = "";

                        /**
                         * DmWebViewReply dmSge.
                         * @member {bilibili.community.service.dm.v1.IDmSegConfig|null|undefined} dmSge
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.dmSge = null;

                        /**
                         * DmWebViewReply flag.
                         * @member {bilibili.community.service.dm.v1.IDanmakuFlagConfig|null|undefined} flag
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.flag = null;

                        /**
                         * DmWebViewReply specialDms.
                         * @member {Array.<string>} specialDms
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         */
                        DmWebViewReply.prototype.specialDms = $util.emptyArray;

                        /**
                         * Creates a new DmWebViewReply instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmWebViewReply=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DmWebViewReply} DmWebViewReply instance
                         */
                        DmWebViewReply.create = function create(properties) {
                            return new DmWebViewReply(properties);
                        };

                        /**
                         * Encodes the specified DmWebViewReply message. Does not implicitly {@link bilibili.community.service.dm.v1.DmWebViewReply.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmWebViewReply} message DmWebViewReply message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmWebViewReply.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
                            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.text);
                            if (message.textSide != null && Object.hasOwnProperty.call(message, "textSide"))
                                writer.uint32(/* id 3, wireType 2 =*/26).string(message.textSide);
                            if (message.dmSge != null && Object.hasOwnProperty.call(message, "dmSge"))
                                $root.bilibili.community.service.dm.v1.DmSegConfig.encode(message.dmSge, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                            if (message.flag != null && Object.hasOwnProperty.call(message, "flag"))
                                $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.encode(message.flag, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                            if (message.specialDms != null && message.specialDms.length)
                                for (let i = 0; i < message.specialDms.length; ++i)
                                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.specialDms[i]);
                            return writer;
                        };

                        /**
                         * Encodes the specified DmWebViewReply message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DmWebViewReply.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmWebViewReply} message DmWebViewReply message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmWebViewReply.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DmWebViewReply message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DmWebViewReply} DmWebViewReply
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmWebViewReply.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmWebViewReply();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    message.state = reader.int32();
                                    break;
                                case 2:
                                    message.text = reader.string();
                                    break;
                                case 3:
                                    message.textSide = reader.string();
                                    break;
                                case 4:
                                    message.dmSge = $root.bilibili.community.service.dm.v1.DmSegConfig.decode(reader, reader.uint32());
                                    break;
                                case 5:
                                    message.flag = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.decode(reader, reader.uint32());
                                    break;
                                case 6:
                                    if (!(message.specialDms && message.specialDms.length))
                                        message.specialDms = [];
                                    message.specialDms.push(reader.string());
                                    break;
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a DmWebViewReply message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DmWebViewReply} DmWebViewReply
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmWebViewReply.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DmWebViewReply message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DmWebViewReply.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.state != null && message.hasOwnProperty("state"))
                                if (!$util.isInteger(message.state))
                                    return "state: integer expected";
                            if (message.text != null && message.hasOwnProperty("text"))
                                if (!$util.isString(message.text))
                                    return "text: string expected";
                            if (message.textSide != null && message.hasOwnProperty("textSide"))
                                if (!$util.isString(message.textSide))
                                    return "textSide: string expected";
                            if (message.dmSge != null && message.hasOwnProperty("dmSge")) {
                                let error = $root.bilibili.community.service.dm.v1.DmSegConfig.verify(message.dmSge);
                                if (error)
                                    return "dmSge." + error;
                            }
                            if (message.flag != null && message.hasOwnProperty("flag")) {
                                let error = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.verify(message.flag);
                                if (error)
                                    return "flag." + error;
                            }
                            if (message.specialDms != null && message.hasOwnProperty("specialDms")) {
                                if (!Array.isArray(message.specialDms))
                                    return "specialDms: array expected";
                                for (let i = 0; i < message.specialDms.length; ++i)
                                    if (!$util.isString(message.specialDms[i]))
                                        return "specialDms: string[] expected";
                            }
                            return null;
                        };

                        /**
                         * Creates a DmWebViewReply message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DmWebViewReply} DmWebViewReply
                         */
                        DmWebViewReply.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DmWebViewReply)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DmWebViewReply();
                            if (object.state != null)
                                message.state = object.state | 0;
                            if (object.text != null)
                                message.text = String(object.text);
                            if (object.textSide != null)
                                message.textSide = String(object.textSide);
                            if (object.dmSge != null) {
                                if (typeof object.dmSge !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.dmSge: object expected");
                                message.dmSge = $root.bilibili.community.service.dm.v1.DmSegConfig.fromObject(object.dmSge);
                            }
                            if (object.flag != null) {
                                if (typeof object.flag !== "object")
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.flag: object expected");
                                message.flag = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.fromObject(object.flag);
                            }
                            if (object.specialDms) {
                                if (!Array.isArray(object.specialDms))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.specialDms: array expected");
                                message.specialDms = [];
                                for (let i = 0; i < object.specialDms.length; ++i)
                                    message.specialDms[i] = String(object.specialDms[i]);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a DmWebViewReply message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.DmWebViewReply} message DmWebViewReply
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DmWebViewReply.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults)
                                object.specialDms = [];
                            if (options.defaults) {
                                object.state = 0;
                                object.text = "";
                                object.textSide = "";
                                object.dmSge = null;
                                object.flag = null;
                            }
                            if (message.state != null && message.hasOwnProperty("state"))
                                object.state = message.state;
                            if (message.text != null && message.hasOwnProperty("text"))
                                object.text = message.text;
                            if (message.textSide != null && message.hasOwnProperty("textSide"))
                                object.textSide = message.textSide;
                            if (message.dmSge != null && message.hasOwnProperty("dmSge"))
                                object.dmSge = $root.bilibili.community.service.dm.v1.DmSegConfig.toObject(message.dmSge, options);
                            if (message.flag != null && message.hasOwnProperty("flag"))
                                object.flag = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.toObject(message.flag, options);
                            if (message.specialDms && message.specialDms.length) {
                                object.specialDms = [];
                                for (let j = 0; j < message.specialDms.length; ++j)
                                    object.specialDms[j] = message.specialDms[j];
                            }
                            return object;
                        };

                        /**
                         * Converts this DmWebViewReply to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DmWebViewReply.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        return DmWebViewReply;
                    })();

                    v1.DmSegConfig = (function() {

                        /**
                         * Properties of a DmSegConfig.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDmSegConfig
                         * @property {number|Long|null} [pageSize] DmSegConfig pageSize
                         * @property {number|Long|null} [total] DmSegConfig total
                         */

                        /**
                         * Constructs a new DmSegConfig.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DmSegConfig.
                         * @implements IDmSegConfig
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDmSegConfig=} [properties] Properties to set
                         */
                        function DmSegConfig(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DmSegConfig pageSize.
                         * @member {number|Long} pageSize
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @instance
                         */
                        DmSegConfig.prototype.pageSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DmSegConfig total.
                         * @member {number|Long} total
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @instance
                         */
                        DmSegConfig.prototype.total = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * Creates a new DmSegConfig instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegConfig=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DmSegConfig} DmSegConfig instance
                         */
                        DmSegConfig.create = function create(properties) {
                            return new DmSegConfig(properties);
                        };

                        /**
                         * Encodes the specified DmSegConfig message. Does not implicitly {@link bilibili.community.service.dm.v1.DmSegConfig.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegConfig} message DmSegConfig message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmSegConfig.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.pageSize != null && Object.hasOwnProperty.call(message, "pageSize"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.pageSize);
                            if (message.total != null && Object.hasOwnProperty.call(message, "total"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.total);
                            return writer;
                        };

                        /**
                         * Encodes the specified DmSegConfig message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DmSegConfig.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegConfig} message DmSegConfig message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmSegConfig.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DmSegConfig message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DmSegConfig} DmSegConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmSegConfig.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmSegConfig();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    message.pageSize = reader.int64();
                                    break;
                                case 2:
                                    message.total = reader.int64();
                                    break;
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a DmSegConfig message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DmSegConfig} DmSegConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmSegConfig.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DmSegConfig message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DmSegConfig.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.pageSize != null && message.hasOwnProperty("pageSize"))
                                if (!$util.isInteger(message.pageSize) && !(message.pageSize && $util.isInteger(message.pageSize.low) && $util.isInteger(message.pageSize.high)))
                                    return "pageSize: integer|Long expected";
                            if (message.total != null && message.hasOwnProperty("total"))
                                if (!$util.isInteger(message.total) && !(message.total && $util.isInteger(message.total.low) && $util.isInteger(message.total.high)))
                                    return "total: integer|Long expected";
                            return null;
                        };

                        /**
                         * Creates a DmSegConfig message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DmSegConfig} DmSegConfig
                         */
                        DmSegConfig.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DmSegConfig)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DmSegConfig();
                            if (object.pageSize != null)
                                if ($util.Long)
                                    (message.pageSize = $util.Long.fromValue(object.pageSize)).unsigned = false;
                                else if (typeof object.pageSize === "string")
                                    message.pageSize = parseInt(object.pageSize, 10);
                                else if (typeof object.pageSize === "number")
                                    message.pageSize = object.pageSize;
                                else if (typeof object.pageSize === "object")
                                    message.pageSize = new $util.LongBits(object.pageSize.low >>> 0, object.pageSize.high >>> 0).toNumber();
                            if (object.total != null)
                                if ($util.Long)
                                    (message.total = $util.Long.fromValue(object.total)).unsigned = false;
                                else if (typeof object.total === "string")
                                    message.total = parseInt(object.total, 10);
                                else if (typeof object.total === "number")
                                    message.total = object.total;
                                else if (typeof object.total === "object")
                                    message.total = new $util.LongBits(object.total.low >>> 0, object.total.high >>> 0).toNumber();
                            return message;
                        };

                        /**
                         * Creates a plain object from a DmSegConfig message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.DmSegConfig} message DmSegConfig
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DmSegConfig.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.pageSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.pageSize = options.longs === String ? "0" : 0;
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.total = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.total = options.longs === String ? "0" : 0;
                            }
                            if (message.pageSize != null && message.hasOwnProperty("pageSize"))
                                if (typeof message.pageSize === "number")
                                    object.pageSize = options.longs === String ? String(message.pageSize) : message.pageSize;
                                else
                                    object.pageSize = options.longs === String ? $util.Long.prototype.toString.call(message.pageSize) : options.longs === Number ? new $util.LongBits(message.pageSize.low >>> 0, message.pageSize.high >>> 0).toNumber() : message.pageSize;
                            if (message.total != null && message.hasOwnProperty("total"))
                                if (typeof message.total === "number")
                                    object.total = options.longs === String ? String(message.total) : message.total;
                                else
                                    object.total = options.longs === String ? $util.Long.prototype.toString.call(message.total) : options.longs === Number ? new $util.LongBits(message.total.low >>> 0, message.total.high >>> 0).toNumber() : message.total;
                            return object;
                        };

                        /**
                         * Converts this DmSegConfig to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DmSegConfig
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DmSegConfig.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        return DmSegConfig;
                    })();

                    v1.DanmakuFlagConfig = (function() {

                        /**
                         * Properties of a DanmakuFlagConfig.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDanmakuFlagConfig
                         * @property {number|null} [recFlag] DanmakuFlagConfig recFlag
                         * @property {string|null} [recText] DanmakuFlagConfig recText
                         * @property {number|null} [recSwitch] DanmakuFlagConfig recSwitch
                         */

                        /**
                         * Constructs a new DanmakuFlagConfig.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DanmakuFlagConfig.
                         * @implements IDanmakuFlagConfig
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDanmakuFlagConfig=} [properties] Properties to set
                         */
                        function DanmakuFlagConfig(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DanmakuFlagConfig recFlag.
                         * @member {number} recFlag
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @instance
                         */
                        DanmakuFlagConfig.prototype.recFlag = 0;

                        /**
                         * DanmakuFlagConfig recText.
                         * @member {string} recText
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @instance
                         */
                        DanmakuFlagConfig.prototype.recText = "";

                        /**
                         * DanmakuFlagConfig recSwitch.
                         * @member {number} recSwitch
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @instance
                         */
                        DanmakuFlagConfig.prototype.recSwitch = 0;

                        /**
                         * Creates a new DanmakuFlagConfig instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuFlagConfig=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DanmakuFlagConfig} DanmakuFlagConfig instance
                         */
                        DanmakuFlagConfig.create = function create(properties) {
                            return new DanmakuFlagConfig(properties);
                        };

                        /**
                         * Encodes the specified DanmakuFlagConfig message. Does not implicitly {@link bilibili.community.service.dm.v1.DanmakuFlagConfig.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuFlagConfig} message DanmakuFlagConfig message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DanmakuFlagConfig.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.recFlag != null && Object.hasOwnProperty.call(message, "recFlag"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.recFlag);
                            if (message.recText != null && Object.hasOwnProperty.call(message, "recText"))
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.recText);
                            if (message.recSwitch != null && Object.hasOwnProperty.call(message, "recSwitch"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.recSwitch);
                            return writer;
                        };

                        /**
                         * Encodes the specified DanmakuFlagConfig message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DanmakuFlagConfig.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuFlagConfig} message DanmakuFlagConfig message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DanmakuFlagConfig.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DanmakuFlagConfig message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DanmakuFlagConfig} DanmakuFlagConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DanmakuFlagConfig.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DanmakuFlagConfig();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    message.recFlag = reader.int32();
                                    break;
                                case 2:
                                    message.recText = reader.string();
                                    break;
                                case 3:
                                    message.recSwitch = reader.int32();
                                    break;
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a DanmakuFlagConfig message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DanmakuFlagConfig} DanmakuFlagConfig
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DanmakuFlagConfig.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DanmakuFlagConfig message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DanmakuFlagConfig.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.recFlag != null && message.hasOwnProperty("recFlag"))
                                if (!$util.isInteger(message.recFlag))
                                    return "recFlag: integer expected";
                            if (message.recText != null && message.hasOwnProperty("recText"))
                                if (!$util.isString(message.recText))
                                    return "recText: string expected";
                            if (message.recSwitch != null && message.hasOwnProperty("recSwitch"))
                                if (!$util.isInteger(message.recSwitch))
                                    return "recSwitch: integer expected";
                            return null;
                        };

                        /**
                         * Creates a DanmakuFlagConfig message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DanmakuFlagConfig} DanmakuFlagConfig
                         */
                        DanmakuFlagConfig.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DanmakuFlagConfig)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DanmakuFlagConfig();
                            if (object.recFlag != null)
                                message.recFlag = object.recFlag | 0;
                            if (object.recText != null)
                                message.recText = String(object.recText);
                            if (object.recSwitch != null)
                                message.recSwitch = object.recSwitch | 0;
                            return message;
                        };

                        /**
                         * Creates a plain object from a DanmakuFlagConfig message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @static
                         * @param {bilibili.community.service.dm.v1.DanmakuFlagConfig} message DanmakuFlagConfig
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DanmakuFlagConfig.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                object.recFlag = 0;
                                object.recText = "";
                                object.recSwitch = 0;
                            }
                            if (message.recFlag != null && message.hasOwnProperty("recFlag"))
                                object.recFlag = message.recFlag;
                            if (message.recText != null && message.hasOwnProperty("recText"))
                                object.recText = message.recText;
                            if (message.recSwitch != null && message.hasOwnProperty("recSwitch"))
                                object.recSwitch = message.recSwitch;
                            return object;
                        };

                        /**
                         * Converts this DanmakuFlagConfig to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DanmakuFlagConfig
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DanmakuFlagConfig.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        return DanmakuFlagConfig;
                    })();

                    v1.DmSegMobileReply = (function() {

                        /**
                         * Properties of a DmSegMobileReply.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDmSegMobileReply
                         * @property {Array.<bilibili.community.service.dm.v1.IDanmakuElem>|null} [elems] DmSegMobileReply elems
                         */

                        /**
                         * Constructs a new DmSegMobileReply.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DmSegMobileReply.
                         * @implements IDmSegMobileReply
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDmSegMobileReply=} [properties] Properties to set
                         */
                        function DmSegMobileReply(properties) {
                            this.elems = [];
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DmSegMobileReply elems.
                         * @member {Array.<bilibili.community.service.dm.v1.IDanmakuElem>} elems
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @instance
                         */
                        DmSegMobileReply.prototype.elems = $util.emptyArray;

                        /**
                         * Creates a new DmSegMobileReply instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegMobileReply=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DmSegMobileReply} DmSegMobileReply instance
                         */
                        DmSegMobileReply.create = function create(properties) {
                            return new DmSegMobileReply(properties);
                        };

                        /**
                         * Encodes the specified DmSegMobileReply message. Does not implicitly {@link bilibili.community.service.dm.v1.DmSegMobileReply.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegMobileReply} message DmSegMobileReply message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmSegMobileReply.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.elems != null && message.elems.length)
                                for (let i = 0; i < message.elems.length; ++i)
                                    $root.bilibili.community.service.dm.v1.DanmakuElem.encode(message.elems[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified DmSegMobileReply message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DmSegMobileReply.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDmSegMobileReply} message DmSegMobileReply message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DmSegMobileReply.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DmSegMobileReply message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DmSegMobileReply} DmSegMobileReply
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmSegMobileReply.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmSegMobileReply();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    if (!(message.elems && message.elems.length))
                                        message.elems = [];
                                    message.elems.push($root.bilibili.community.service.dm.v1.DanmakuElem.decode(reader, reader.uint32()));
                                    break;
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a DmSegMobileReply message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DmSegMobileReply} DmSegMobileReply
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DmSegMobileReply.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DmSegMobileReply message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DmSegMobileReply.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.elems != null && message.hasOwnProperty("elems")) {
                                if (!Array.isArray(message.elems))
                                    return "elems: array expected";
                                for (let i = 0; i < message.elems.length; ++i) {
                                    let error = $root.bilibili.community.service.dm.v1.DanmakuElem.verify(message.elems[i]);
                                    if (error)
                                        return "elems." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a DmSegMobileReply message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DmSegMobileReply} DmSegMobileReply
                         */
                        DmSegMobileReply.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DmSegMobileReply)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DmSegMobileReply();
                            if (object.elems) {
                                if (!Array.isArray(object.elems))
                                    throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.elems: array expected");
                                message.elems = [];
                                for (let i = 0; i < object.elems.length; ++i) {
                                    if (typeof object.elems[i] !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.elems: object expected");
                                    message.elems[i] = $root.bilibili.community.service.dm.v1.DanmakuElem.fromObject(object.elems[i]);
                                }
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a DmSegMobileReply message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @static
                         * @param {bilibili.community.service.dm.v1.DmSegMobileReply} message DmSegMobileReply
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DmSegMobileReply.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.arrays || options.defaults)
                                object.elems = [];
                            if (message.elems && message.elems.length) {
                                object.elems = [];
                                for (let j = 0; j < message.elems.length; ++j)
                                    object.elems[j] = $root.bilibili.community.service.dm.v1.DanmakuElem.toObject(message.elems[j], options);
                            }
                            return object;
                        };

                        /**
                         * Converts this DmSegMobileReply to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DmSegMobileReply
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DmSegMobileReply.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        return DmSegMobileReply;
                    })();

                    v1.DanmakuElem = (function() {

                        /**
                         * Properties of a DanmakuElem.
                         * @memberof bilibili.community.service.dm.v1
                         * @interface IDanmakuElem
                         * @property {number|Long|null} [id] DanmakuElem id
                         * @property {number|null} [progress] DanmakuElem progress
                         * @property {number|null} [mode] DanmakuElem mode
                         * @property {number|null} [fontsize] DanmakuElem fontsize
                         * @property {number|null} [color] DanmakuElem color
                         * @property {string|null} [midHash] DanmakuElem midHash
                         * @property {string|null} [content] DanmakuElem content
                         * @property {number|Long|null} [ctime] DanmakuElem ctime
                         * @property {number|null} [weight] DanmakuElem weight
                         * @property {string|null} [action] DanmakuElem action
                         * @property {number|null} [pool] DanmakuElem pool
                         * @property {string|null} [idStr] DanmakuElem idStr
                         */

                        /**
                         * Constructs a new DanmakuElem.
                         * @memberof bilibili.community.service.dm.v1
                         * @classdesc Represents a DanmakuElem.
                         * @implements IDanmakuElem
                         * @constructor
                         * @param {bilibili.community.service.dm.v1.IDanmakuElem=} [properties] Properties to set
                         */
                        function DanmakuElem(properties) {
                            if (properties)
                                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DanmakuElem id.
                         * @member {number|Long} id
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DanmakuElem progress.
                         * @member {number} progress
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.progress = 0;

                        /**
                         * DanmakuElem mode.
                         * @member {number} mode
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.mode = 0;

                        /**
                         * DanmakuElem fontsize.
                         * @member {number} fontsize
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.fontsize = 0;

                        /**
                         * DanmakuElem color.
                         * @member {number} color
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.color = 0;

                        /**
                         * DanmakuElem midHash.
                         * @member {string} midHash
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.midHash = "";

                        /**
                         * DanmakuElem content.
                         * @member {string} content
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.content = "";

                        /**
                         * DanmakuElem ctime.
                         * @member {number|Long} ctime
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.ctime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                        /**
                         * DanmakuElem weight.
                         * @member {number} weight
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.weight = 0;

                        /**
                         * DanmakuElem action.
                         * @member {string} action
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.action = "";

                        /**
                         * DanmakuElem pool.
                         * @member {number} pool
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.pool = 0;

                        /**
                         * DanmakuElem idStr.
                         * @member {string} idStr
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         */
                        DanmakuElem.prototype.idStr = "";

                        /**
                         * Creates a new DanmakuElem instance using the specified properties.
                         * @function create
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuElem=} [properties] Properties to set
                         * @returns {bilibili.community.service.dm.v1.DanmakuElem} DanmakuElem instance
                         */
                        DanmakuElem.create = function create(properties) {
                            return new DanmakuElem(properties);
                        };

                        /**
                         * Encodes the specified DanmakuElem message. Does not implicitly {@link bilibili.community.service.dm.v1.DanmakuElem.verify|verify} messages.
                         * @function encode
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuElem} message DanmakuElem message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DanmakuElem.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                            if (message.progress != null && Object.hasOwnProperty.call(message, "progress"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.progress);
                            if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.mode);
                            if (message.fontsize != null && Object.hasOwnProperty.call(message, "fontsize"))
                                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.fontsize);
                            if (message.color != null && Object.hasOwnProperty.call(message, "color"))
                                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.color);
                            if (message.midHash != null && Object.hasOwnProperty.call(message, "midHash"))
                                writer.uint32(/* id 6, wireType 2 =*/50).string(message.midHash);
                            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                                writer.uint32(/* id 7, wireType 2 =*/58).string(message.content);
                            if (message.ctime != null && Object.hasOwnProperty.call(message, "ctime"))
                                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.ctime);
                            if (message.weight != null && Object.hasOwnProperty.call(message, "weight"))
                                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.weight);
                            if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                                writer.uint32(/* id 10, wireType 2 =*/82).string(message.action);
                            if (message.pool != null && Object.hasOwnProperty.call(message, "pool"))
                                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.pool);
                            if (message.idStr != null && Object.hasOwnProperty.call(message, "idStr"))
                                writer.uint32(/* id 12, wireType 2 =*/98).string(message.idStr);
                            return writer;
                        };

                        /**
                         * Encodes the specified DanmakuElem message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DanmakuElem.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {bilibili.community.service.dm.v1.IDanmakuElem} message DanmakuElem message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DanmakuElem.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DanmakuElem message from the specified reader or buffer.
                         * @function decode
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {bilibili.community.service.dm.v1.DanmakuElem} DanmakuElem
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DanmakuElem.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DanmakuElem();
                            while (reader.pos < end) {
                                let tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    message.id = reader.int64();
                                    break;
                                case 2:
                                    message.progress = reader.int32();
                                    break;
                                case 3:
                                    message.mode = reader.int32();
                                    break;
                                case 4:
                                    message.fontsize = reader.int32();
                                    break;
                                case 5:
                                    message.color = reader.uint32();
                                    break;
                                case 6:
                                    message.midHash = reader.string();
                                    break;
                                case 7:
                                    message.content = reader.string();
                                    break;
                                case 8:
                                    message.ctime = reader.int64();
                                    break;
                                case 9:
                                    message.weight = reader.int32();
                                    break;
                                case 10:
                                    message.action = reader.string();
                                    break;
                                case 11:
                                    message.pool = reader.int32();
                                    break;
                                case 12:
                                    message.idStr = reader.string();
                                    break;
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a DanmakuElem message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {bilibili.community.service.dm.v1.DanmakuElem} DanmakuElem
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DanmakuElem.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DanmakuElem message.
                         * @function verify
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DanmakuElem.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.id != null && message.hasOwnProperty("id"))
                                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                                    return "id: integer|Long expected";
                            if (message.progress != null && message.hasOwnProperty("progress"))
                                if (!$util.isInteger(message.progress))
                                    return "progress: integer expected";
                            if (message.mode != null && message.hasOwnProperty("mode"))
                                if (!$util.isInteger(message.mode))
                                    return "mode: integer expected";
                            if (message.fontsize != null && message.hasOwnProperty("fontsize"))
                                if (!$util.isInteger(message.fontsize))
                                    return "fontsize: integer expected";
                            if (message.color != null && message.hasOwnProperty("color"))
                                if (!$util.isInteger(message.color))
                                    return "color: integer expected";
                            if (message.midHash != null && message.hasOwnProperty("midHash"))
                                if (!$util.isString(message.midHash))
                                    return "midHash: string expected";
                            if (message.content != null && message.hasOwnProperty("content"))
                                if (!$util.isString(message.content))
                                    return "content: string expected";
                            if (message.ctime != null && message.hasOwnProperty("ctime"))
                                if (!$util.isInteger(message.ctime) && !(message.ctime && $util.isInteger(message.ctime.low) && $util.isInteger(message.ctime.high)))
                                    return "ctime: integer|Long expected";
                            if (message.weight != null && message.hasOwnProperty("weight"))
                                if (!$util.isInteger(message.weight))
                                    return "weight: integer expected";
                            if (message.action != null && message.hasOwnProperty("action"))
                                if (!$util.isString(message.action))
                                    return "action: string expected";
                            if (message.pool != null && message.hasOwnProperty("pool"))
                                if (!$util.isInteger(message.pool))
                                    return "pool: integer expected";
                            if (message.idStr != null && message.hasOwnProperty("idStr"))
                                if (!$util.isString(message.idStr))
                                    return "idStr: string expected";
                            return null;
                        };

                        /**
                         * Creates a DanmakuElem message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {bilibili.community.service.dm.v1.DanmakuElem} DanmakuElem
                         */
                        DanmakuElem.fromObject = function fromObject(object) {
                            if (object instanceof $root.bilibili.community.service.dm.v1.DanmakuElem)
                                return object;
                            let message = new $root.bilibili.community.service.dm.v1.DanmakuElem();
                            if (object.id != null)
                                if ($util.Long)
                                    (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                                else if (typeof object.id === "string")
                                    message.id = parseInt(object.id, 10);
                                else if (typeof object.id === "number")
                                    message.id = object.id;
                                else if (typeof object.id === "object")
                                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                            if (object.progress != null)
                                message.progress = object.progress | 0;
                            if (object.mode != null)
                                message.mode = object.mode | 0;
                            if (object.fontsize != null)
                                message.fontsize = object.fontsize | 0;
                            if (object.color != null)
                                message.color = object.color >>> 0;
                            if (object.midHash != null)
                                message.midHash = String(object.midHash);
                            if (object.content != null)
                                message.content = String(object.content);
                            if (object.ctime != null)
                                if ($util.Long)
                                    (message.ctime = $util.Long.fromValue(object.ctime)).unsigned = false;
                                else if (typeof object.ctime === "string")
                                    message.ctime = parseInt(object.ctime, 10);
                                else if (typeof object.ctime === "number")
                                    message.ctime = object.ctime;
                                else if (typeof object.ctime === "object")
                                    message.ctime = new $util.LongBits(object.ctime.low >>> 0, object.ctime.high >>> 0).toNumber();
                            if (object.weight != null)
                                message.weight = object.weight | 0;
                            if (object.action != null)
                                message.action = String(object.action);
                            if (object.pool != null)
                                message.pool = object.pool | 0;
                            if (object.idStr != null)
                                message.idStr = String(object.idStr);
                            return message;
                        };

                        /**
                         * Creates a plain object from a DanmakuElem message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @static
                         * @param {bilibili.community.service.dm.v1.DanmakuElem} message DanmakuElem
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DanmakuElem.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            let object = {};
                            if (options.defaults) {
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.id = options.longs === String ? "0" : 0;
                                object.progress = 0;
                                object.mode = 0;
                                object.fontsize = 0;
                                object.color = 0;
                                object.midHash = "";
                                object.content = "";
                                if ($util.Long) {
                                    let long = new $util.Long(0, 0, false);
                                    object.ctime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                } else
                                    object.ctime = options.longs === String ? "0" : 0;
                                object.weight = 0;
                                object.action = "";
                                object.pool = 0;
                                object.idStr = "";
                            }
                            if (message.id != null && message.hasOwnProperty("id"))
                                if (typeof message.id === "number")
                                    object.id = options.longs === String ? String(message.id) : message.id;
                                else
                                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                            if (message.progress != null && message.hasOwnProperty("progress"))
                                object.progress = message.progress;
                            if (message.mode != null && message.hasOwnProperty("mode"))
                                object.mode = message.mode;
                            if (message.fontsize != null && message.hasOwnProperty("fontsize"))
                                object.fontsize = message.fontsize;
                            if (message.color != null && message.hasOwnProperty("color"))
                                object.color = message.color;
                            if (message.midHash != null && message.hasOwnProperty("midHash"))
                                object.midHash = message.midHash;
                            if (message.content != null && message.hasOwnProperty("content"))
                                object.content = message.content;
                            if (message.ctime != null && message.hasOwnProperty("ctime"))
                                if (typeof message.ctime === "number")
                                    object.ctime = options.longs === String ? String(message.ctime) : message.ctime;
                                else
                                    object.ctime = options.longs === String ? $util.Long.prototype.toString.call(message.ctime) : options.longs === Number ? new $util.LongBits(message.ctime.low >>> 0, message.ctime.high >>> 0).toNumber() : message.ctime;
                            if (message.weight != null && message.hasOwnProperty("weight"))
                                object.weight = message.weight;
                            if (message.action != null && message.hasOwnProperty("action"))
                                object.action = message.action;
                            if (message.pool != null && message.hasOwnProperty("pool"))
                                object.pool = message.pool;
                            if (message.idStr != null && message.hasOwnProperty("idStr"))
                                object.idStr = message.idStr;
                            return object;
                        };

                        /**
                         * Converts this DanmakuElem to JSON.
                         * @function toJSON
                         * @memberof bilibili.community.service.dm.v1.DanmakuElem
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DanmakuElem.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        return DanmakuElem;
                    })();

                    return v1;
                })();

                return dm;
            })();

            return service;
        })();

        return community;
    })();

    return bilibili;
})();

export { $root as default };
