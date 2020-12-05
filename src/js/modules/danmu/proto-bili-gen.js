/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import protobuf from 'protobufjs';
export default (function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

    $root.bilibili = (function() {

        /**
         * Namespace bilibili.
         * @exports bilibili
         * @namespace
         */
        var bilibili = {};

        bilibili.community = (function() {

            /**
             * Namespace community.
             * @memberof bilibili
             * @namespace
             */
            var community = {};

            community.service = (function() {

                /**
                 * Namespace service.
                 * @memberof bilibili.community
                 * @namespace
                 */
                var service = {};

                service.dm = (function() {

                    /**
                     * Namespace dm.
                     * @memberof bilibili.community.service
                     * @namespace
                     */
                    var dm = {};

                    dm.v1 = (function() {

                        /**
                         * Namespace v1.
                         * @memberof bilibili.community.service.dm
                         * @namespace
                         */
                        var v1 = {};

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
                             * @property {boolean|null} [checkBox] DmWebViewReply checkBox
                             * @property {number|Long|null} [count] DmWebViewReply count
                             * @property {Array.<bilibili.community.service.dm.v1.ICommandDm>|null} [commandDms] DmWebViewReply commandDms
                             * @property {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig|null} [dmSetting] DmWebViewReply dmSetting
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
                                this.commandDms = [];
                                if (properties)
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                             * DmWebViewReply checkBox.
                             * @member {boolean} checkBox
                             * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                             * @instance
                             */
                            DmWebViewReply.prototype.checkBox = false;

                            /**
                             * DmWebViewReply count.
                             * @member {number|Long} count
                             * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                             * @instance
                             */
                            DmWebViewReply.prototype.count = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                            /**
                             * DmWebViewReply commandDms.
                             * @member {Array.<bilibili.community.service.dm.v1.ICommandDm>} commandDms
                             * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                             * @instance
                             */
                            DmWebViewReply.prototype.commandDms = $util.emptyArray;

                            /**
                             * DmWebViewReply dmSetting.
                             * @member {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig|null|undefined} dmSetting
                             * @memberof bilibili.community.service.dm.v1.DmWebViewReply
                             * @instance
                             */
                            DmWebViewReply.prototype.dmSetting = null;

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
                                    for (var i = 0; i < message.specialDms.length; ++i)
                                        writer.uint32(/* id 6, wireType 2 =*/50).string(message.specialDms[i]);
                                if (message.checkBox != null && Object.hasOwnProperty.call(message, "checkBox"))
                                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.checkBox);
                                if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                                    writer.uint32(/* id 8, wireType 0 =*/64).int64(message.count);
                                if (message.commandDms != null && message.commandDms.length)
                                    for (var i = 0; i < message.commandDms.length; ++i)
                                        $root.bilibili.community.service.dm.v1.CommandDm.encode(message.commandDms[i], writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                                if (message.dmSetting != null && Object.hasOwnProperty.call(message, "dmSetting"))
                                    $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.encode(message.dmSetting, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
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
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmWebViewReply();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
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
                                    case 7:
                                        message.checkBox = reader.bool();
                                        break;
                                    case 8:
                                        message.count = reader.int64();
                                        break;
                                    case 9:
                                        if (!(message.commandDms && message.commandDms.length))
                                            message.commandDms = [];
                                        message.commandDms.push($root.bilibili.community.service.dm.v1.CommandDm.decode(reader, reader.uint32()));
                                        break;
                                    case 10:
                                        message.dmSetting = $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.decode(reader, reader.uint32());
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
                                    var error = $root.bilibili.community.service.dm.v1.DmSegConfig.verify(message.dmSge);
                                    if (error)
                                        return "dmSge." + error;
                                }
                                if (message.flag != null && message.hasOwnProperty("flag")) {
                                    var error = $root.bilibili.community.service.dm.v1.DanmakuFlagConfig.verify(message.flag);
                                    if (error)
                                        return "flag." + error;
                                }
                                if (message.specialDms != null && message.hasOwnProperty("specialDms")) {
                                    if (!Array.isArray(message.specialDms))
                                        return "specialDms: array expected";
                                    for (var i = 0; i < message.specialDms.length; ++i)
                                        if (!$util.isString(message.specialDms[i]))
                                            return "specialDms: string[] expected";
                                }
                                if (message.checkBox != null && message.hasOwnProperty("checkBox"))
                                    if (typeof message.checkBox !== "boolean")
                                        return "checkBox: boolean expected";
                                if (message.count != null && message.hasOwnProperty("count"))
                                    if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                                        return "count: integer|Long expected";
                                if (message.commandDms != null && message.hasOwnProperty("commandDms")) {
                                    if (!Array.isArray(message.commandDms))
                                        return "commandDms: array expected";
                                    for (var i = 0; i < message.commandDms.length; ++i) {
                                        var error = $root.bilibili.community.service.dm.v1.CommandDm.verify(message.commandDms[i]);
                                        if (error)
                                            return "commandDms." + error;
                                    }
                                }
                                if (message.dmSetting != null && message.hasOwnProperty("dmSetting")) {
                                    var error = $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.verify(message.dmSetting);
                                    if (error)
                                        return "dmSetting." + error;
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
                                var message = new $root.bilibili.community.service.dm.v1.DmWebViewReply();
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
                                    for (var i = 0; i < object.specialDms.length; ++i)
                                        message.specialDms[i] = String(object.specialDms[i]);
                                }
                                if (object.checkBox != null)
                                    message.checkBox = Boolean(object.checkBox);
                                if (object.count != null)
                                    if ($util.Long)
                                        (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                                    else if (typeof object.count === "string")
                                        message.count = parseInt(object.count, 10);
                                    else if (typeof object.count === "number")
                                        message.count = object.count;
                                    else if (typeof object.count === "object")
                                        message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
                                if (object.commandDms) {
                                    if (!Array.isArray(object.commandDms))
                                        throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.commandDms: array expected");
                                    message.commandDms = [];
                                    for (var i = 0; i < object.commandDms.length; ++i) {
                                        if (typeof object.commandDms[i] !== "object")
                                            throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.commandDms: object expected");
                                        message.commandDms[i] = $root.bilibili.community.service.dm.v1.CommandDm.fromObject(object.commandDms[i]);
                                    }
                                }
                                if (object.dmSetting != null) {
                                    if (typeof object.dmSetting !== "object")
                                        throw TypeError(".bilibili.community.service.dm.v1.DmWebViewReply.dmSetting: object expected");
                                    message.dmSetting = $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.fromObject(object.dmSetting);
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
                                var object = {};
                                if (options.arrays || options.defaults) {
                                    object.specialDms = [];
                                    object.commandDms = [];
                                }
                                if (options.defaults) {
                                    object.state = 0;
                                    object.text = "";
                                    object.textSide = "";
                                    object.dmSge = null;
                                    object.flag = null;
                                    object.checkBox = false;
                                    if ($util.Long) {
                                        var long = new $util.Long(0, 0, false);
                                        object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                    } else
                                        object.count = options.longs === String ? "0" : 0;
                                    object.dmSetting = null;
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
                                    for (var j = 0; j < message.specialDms.length; ++j)
                                        object.specialDms[j] = message.specialDms[j];
                                }
                                if (message.checkBox != null && message.hasOwnProperty("checkBox"))
                                    object.checkBox = message.checkBox;
                                if (message.count != null && message.hasOwnProperty("count"))
                                    if (typeof message.count === "number")
                                        object.count = options.longs === String ? String(message.count) : message.count;
                                    else
                                        object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                                if (message.commandDms && message.commandDms.length) {
                                    object.commandDms = [];
                                    for (var j = 0; j < message.commandDms.length; ++j)
                                        object.commandDms[j] = $root.bilibili.community.service.dm.v1.CommandDm.toObject(message.commandDms[j], options);
                                }
                                if (message.dmSetting != null && message.hasOwnProperty("dmSetting"))
                                    object.dmSetting = $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig.toObject(message.dmSetting, options);
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

                        v1.CommandDm = (function() {

                            /**
                             * Properties of a CommandDm.
                             * @memberof bilibili.community.service.dm.v1
                             * @interface ICommandDm
                             * @property {number|Long|null} [id] CommandDm id
                             * @property {number|Long|null} [oid] CommandDm oid
                             * @property {number|Long|null} [mid] CommandDm mid
                             * @property {string|null} [command] CommandDm command
                             * @property {string|null} [content] CommandDm content
                             * @property {number|null} [progress] CommandDm progress
                             * @property {string|null} [ctime] CommandDm ctime
                             * @property {string|null} [mtime] CommandDm mtime
                             * @property {string|null} [extra] CommandDm extra
                             * @property {string|null} [idStr] CommandDm idStr
                             */

                            /**
                             * Constructs a new CommandDm.
                             * @memberof bilibili.community.service.dm.v1
                             * @classdesc Represents a CommandDm.
                             * @implements ICommandDm
                             * @constructor
                             * @param {bilibili.community.service.dm.v1.ICommandDm=} [properties] Properties to set
                             */
                            function CommandDm(properties) {
                                if (properties)
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * CommandDm id.
                             * @member {number|Long} id
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @instance
                             */
                            CommandDm.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                            /**
                             * CommandDm oid.
                             * @member {number|Long} oid
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @instance
                             */
                            CommandDm.prototype.oid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                            /**
                             * CommandDm mid.
                             * @member {number|Long} mid
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @instance
                             */
                            CommandDm.prototype.mid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                            /**
                             * CommandDm command.
                             * @member {string} command
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @instance
                             */
                            CommandDm.prototype.command = "";

                            /**
                             * CommandDm content.
                             * @member {string} content
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @instance
                             */
                            CommandDm.prototype.content = "";

                            /**
                             * CommandDm progress.
                             * @member {number} progress
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @instance
                             */
                            CommandDm.prototype.progress = 0;

                            /**
                             * CommandDm ctime.
                             * @member {string} ctime
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @instance
                             */
                            CommandDm.prototype.ctime = "";

                            /**
                             * CommandDm mtime.
                             * @member {string} mtime
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @instance
                             */
                            CommandDm.prototype.mtime = "";

                            /**
                             * CommandDm extra.
                             * @member {string} extra
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @instance
                             */
                            CommandDm.prototype.extra = "";

                            /**
                             * CommandDm idStr.
                             * @member {string} idStr
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @instance
                             */
                            CommandDm.prototype.idStr = "";

                            /**
                             * Creates a new CommandDm instance using the specified properties.
                             * @function create
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @static
                             * @param {bilibili.community.service.dm.v1.ICommandDm=} [properties] Properties to set
                             * @returns {bilibili.community.service.dm.v1.CommandDm} CommandDm instance
                             */
                            CommandDm.create = function create(properties) {
                                return new CommandDm(properties);
                            };

                            /**
                             * Encodes the specified CommandDm message. Does not implicitly {@link bilibili.community.service.dm.v1.CommandDm.verify|verify} messages.
                             * @function encode
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @static
                             * @param {bilibili.community.service.dm.v1.ICommandDm} message CommandDm message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            CommandDm.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                                if (message.oid != null && Object.hasOwnProperty.call(message, "oid"))
                                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.oid);
                                if (message.mid != null && Object.hasOwnProperty.call(message, "mid"))
                                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.mid);
                                if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.command);
                                if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.content);
                                if (message.progress != null && Object.hasOwnProperty.call(message, "progress"))
                                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.progress);
                                if (message.ctime != null && Object.hasOwnProperty.call(message, "ctime"))
                                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.ctime);
                                if (message.mtime != null && Object.hasOwnProperty.call(message, "mtime"))
                                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.mtime);
                                if (message.extra != null && Object.hasOwnProperty.call(message, "extra"))
                                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.extra);
                                if (message.idStr != null && Object.hasOwnProperty.call(message, "idStr"))
                                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.idStr);
                                return writer;
                            };

                            /**
                             * Encodes the specified CommandDm message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.CommandDm.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @static
                             * @param {bilibili.community.service.dm.v1.ICommandDm} message CommandDm message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            CommandDm.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a CommandDm message from the specified reader or buffer.
                             * @function decode
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {bilibili.community.service.dm.v1.CommandDm} CommandDm
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            CommandDm.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.CommandDm();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.id = reader.int64();
                                        break;
                                    case 2:
                                        message.oid = reader.int64();
                                        break;
                                    case 3:
                                        message.mid = reader.int64();
                                        break;
                                    case 4:
                                        message.command = reader.string();
                                        break;
                                    case 5:
                                        message.content = reader.string();
                                        break;
                                    case 6:
                                        message.progress = reader.int32();
                                        break;
                                    case 7:
                                        message.ctime = reader.string();
                                        break;
                                    case 8:
                                        message.mtime = reader.string();
                                        break;
                                    case 9:
                                        message.extra = reader.string();
                                        break;
                                    case 10:
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
                             * Decodes a CommandDm message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {bilibili.community.service.dm.v1.CommandDm} CommandDm
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            CommandDm.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a CommandDm message.
                             * @function verify
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            CommandDm.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.id != null && message.hasOwnProperty("id"))
                                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                                        return "id: integer|Long expected";
                                if (message.oid != null && message.hasOwnProperty("oid"))
                                    if (!$util.isInteger(message.oid) && !(message.oid && $util.isInteger(message.oid.low) && $util.isInteger(message.oid.high)))
                                        return "oid: integer|Long expected";
                                if (message.mid != null && message.hasOwnProperty("mid"))
                                    if (!$util.isInteger(message.mid) && !(message.mid && $util.isInteger(message.mid.low) && $util.isInteger(message.mid.high)))
                                        return "mid: integer|Long expected";
                                if (message.command != null && message.hasOwnProperty("command"))
                                    if (!$util.isString(message.command))
                                        return "command: string expected";
                                if (message.content != null && message.hasOwnProperty("content"))
                                    if (!$util.isString(message.content))
                                        return "content: string expected";
                                if (message.progress != null && message.hasOwnProperty("progress"))
                                    if (!$util.isInteger(message.progress))
                                        return "progress: integer expected";
                                if (message.ctime != null && message.hasOwnProperty("ctime"))
                                    if (!$util.isString(message.ctime))
                                        return "ctime: string expected";
                                if (message.mtime != null && message.hasOwnProperty("mtime"))
                                    if (!$util.isString(message.mtime))
                                        return "mtime: string expected";
                                if (message.extra != null && message.hasOwnProperty("extra"))
                                    if (!$util.isString(message.extra))
                                        return "extra: string expected";
                                if (message.idStr != null && message.hasOwnProperty("idStr"))
                                    if (!$util.isString(message.idStr))
                                        return "idStr: string expected";
                                return null;
                            };

                            /**
                             * Creates a CommandDm message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {bilibili.community.service.dm.v1.CommandDm} CommandDm
                             */
                            CommandDm.fromObject = function fromObject(object) {
                                if (object instanceof $root.bilibili.community.service.dm.v1.CommandDm)
                                    return object;
                                var message = new $root.bilibili.community.service.dm.v1.CommandDm();
                                if (object.id != null)
                                    if ($util.Long)
                                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                                    else if (typeof object.id === "string")
                                        message.id = parseInt(object.id, 10);
                                    else if (typeof object.id === "number")
                                        message.id = object.id;
                                    else if (typeof object.id === "object")
                                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                                if (object.oid != null)
                                    if ($util.Long)
                                        (message.oid = $util.Long.fromValue(object.oid)).unsigned = false;
                                    else if (typeof object.oid === "string")
                                        message.oid = parseInt(object.oid, 10);
                                    else if (typeof object.oid === "number")
                                        message.oid = object.oid;
                                    else if (typeof object.oid === "object")
                                        message.oid = new $util.LongBits(object.oid.low >>> 0, object.oid.high >>> 0).toNumber();
                                if (object.mid != null)
                                    if ($util.Long)
                                        (message.mid = $util.Long.fromValue(object.mid)).unsigned = false;
                                    else if (typeof object.mid === "string")
                                        message.mid = parseInt(object.mid, 10);
                                    else if (typeof object.mid === "number")
                                        message.mid = object.mid;
                                    else if (typeof object.mid === "object")
                                        message.mid = new $util.LongBits(object.mid.low >>> 0, object.mid.high >>> 0).toNumber();
                                if (object.command != null)
                                    message.command = String(object.command);
                                if (object.content != null)
                                    message.content = String(object.content);
                                if (object.progress != null)
                                    message.progress = object.progress | 0;
                                if (object.ctime != null)
                                    message.ctime = String(object.ctime);
                                if (object.mtime != null)
                                    message.mtime = String(object.mtime);
                                if (object.extra != null)
                                    message.extra = String(object.extra);
                                if (object.idStr != null)
                                    message.idStr = String(object.idStr);
                                return message;
                            };

                            /**
                             * Creates a plain object from a CommandDm message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @static
                             * @param {bilibili.community.service.dm.v1.CommandDm} message CommandDm
                             * @param {$protobuf.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            CommandDm.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                var object = {};
                                if (options.defaults) {
                                    if ($util.Long) {
                                        var long = new $util.Long(0, 0, false);
                                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                    } else
                                        object.id = options.longs === String ? "0" : 0;
                                    if ($util.Long) {
                                        var long = new $util.Long(0, 0, false);
                                        object.oid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                    } else
                                        object.oid = options.longs === String ? "0" : 0;
                                    if ($util.Long) {
                                        var long = new $util.Long(0, 0, false);
                                        object.mid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                    } else
                                        object.mid = options.longs === String ? "0" : 0;
                                    object.command = "";
                                    object.content = "";
                                    object.progress = 0;
                                    object.ctime = "";
                                    object.mtime = "";
                                    object.extra = "";
                                    object.idStr = "";
                                }
                                if (message.id != null && message.hasOwnProperty("id"))
                                    if (typeof message.id === "number")
                                        object.id = options.longs === String ? String(message.id) : message.id;
                                    else
                                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                                if (message.oid != null && message.hasOwnProperty("oid"))
                                    if (typeof message.oid === "number")
                                        object.oid = options.longs === String ? String(message.oid) : message.oid;
                                    else
                                        object.oid = options.longs === String ? $util.Long.prototype.toString.call(message.oid) : options.longs === Number ? new $util.LongBits(message.oid.low >>> 0, message.oid.high >>> 0).toNumber() : message.oid;
                                if (message.mid != null && message.hasOwnProperty("mid"))
                                    if (typeof message.mid === "number")
                                        object.mid = options.longs === String ? String(message.mid) : message.mid;
                                    else
                                        object.mid = options.longs === String ? $util.Long.prototype.toString.call(message.mid) : options.longs === Number ? new $util.LongBits(message.mid.low >>> 0, message.mid.high >>> 0).toNumber() : message.mid;
                                if (message.command != null && message.hasOwnProperty("command"))
                                    object.command = message.command;
                                if (message.content != null && message.hasOwnProperty("content"))
                                    object.content = message.content;
                                if (message.progress != null && message.hasOwnProperty("progress"))
                                    object.progress = message.progress;
                                if (message.ctime != null && message.hasOwnProperty("ctime"))
                                    object.ctime = message.ctime;
                                if (message.mtime != null && message.hasOwnProperty("mtime"))
                                    object.mtime = message.mtime;
                                if (message.extra != null && message.hasOwnProperty("extra"))
                                    object.extra = message.extra;
                                if (message.idStr != null && message.hasOwnProperty("idStr"))
                                    object.idStr = message.idStr;
                                return object;
                            };

                            /**
                             * Converts this CommandDm to JSON.
                             * @function toJSON
                             * @memberof bilibili.community.service.dm.v1.CommandDm
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            CommandDm.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return CommandDm;
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
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmSegConfig();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
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
                                var message = new $root.bilibili.community.service.dm.v1.DmSegConfig();
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
                                var object = {};
                                if (options.defaults) {
                                    if ($util.Long) {
                                        var long = new $util.Long(0, 0, false);
                                        object.pageSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                    } else
                                        object.pageSize = options.longs === String ? "0" : 0;
                                    if ($util.Long) {
                                        var long = new $util.Long(0, 0, false);
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
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DanmakuFlagConfig();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
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
                                var message = new $root.bilibili.community.service.dm.v1.DanmakuFlagConfig();
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
                                var object = {};
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
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                                    for (var i = 0; i < message.elems.length; ++i)
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
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DmSegMobileReply();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
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
                                    for (var i = 0; i < message.elems.length; ++i) {
                                        var error = $root.bilibili.community.service.dm.v1.DanmakuElem.verify(message.elems[i]);
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
                                var message = new $root.bilibili.community.service.dm.v1.DmSegMobileReply();
                                if (object.elems) {
                                    if (!Array.isArray(object.elems))
                                        throw TypeError(".bilibili.community.service.dm.v1.DmSegMobileReply.elems: array expected");
                                    message.elems = [];
                                    for (var i = 0; i < object.elems.length; ++i) {
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
                                var object = {};
                                if (options.arrays || options.defaults)
                                    object.elems = [];
                                if (message.elems && message.elems.length) {
                                    object.elems = [];
                                    for (var j = 0; j < message.elems.length; ++j)
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
                             * @property {number|null} [attr] DanmakuElem attr
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
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
                             * DanmakuElem attr.
                             * @member {number} attr
                             * @memberof bilibili.community.service.dm.v1.DanmakuElem
                             * @instance
                             */
                            DanmakuElem.prototype.attr = 0;

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
                                if (message.attr != null && Object.hasOwnProperty.call(message, "attr"))
                                    writer.uint32(/* id 13, wireType 0 =*/104).int32(message.attr);
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
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DanmakuElem();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
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
                                    case 13:
                                        message.attr = reader.int32();
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
                                if (message.attr != null && message.hasOwnProperty("attr"))
                                    if (!$util.isInteger(message.attr))
                                        return "attr: integer expected";
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
                                var message = new $root.bilibili.community.service.dm.v1.DanmakuElem();
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
                                if (object.attr != null)
                                    message.attr = object.attr | 0;
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
                                var object = {};
                                if (options.defaults) {
                                    if ($util.Long) {
                                        var long = new $util.Long(0, 0, false);
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
                                        var long = new $util.Long(0, 0, false);
                                        object.ctime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                                    } else
                                        object.ctime = options.longs === String ? "0" : 0;
                                    object.weight = 0;
                                    object.action = "";
                                    object.pool = 0;
                                    object.idStr = "";
                                    object.attr = 0;
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
                                if (message.attr != null && message.hasOwnProperty("attr"))
                                    object.attr = message.attr;
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

                        v1.DanmuWebPlayerConfig = (function() {

                            /**
                             * Properties of a DanmuWebPlayerConfig.
                             * @memberof bilibili.community.service.dm.v1
                             * @interface IDanmuWebPlayerConfig
                             * @property {boolean|null} [dmSwitch] DanmuWebPlayerConfig dmSwitch
                             * @property {boolean|null} [aiSwitch] DanmuWebPlayerConfig aiSwitch
                             * @property {number|null} [aiLevel] DanmuWebPlayerConfig aiLevel
                             * @property {boolean|null} [blocktop] DanmuWebPlayerConfig blocktop
                             * @property {boolean|null} [blockscroll] DanmuWebPlayerConfig blockscroll
                             * @property {boolean|null} [blockbottom] DanmuWebPlayerConfig blockbottom
                             * @property {boolean|null} [blockcolor] DanmuWebPlayerConfig blockcolor
                             * @property {boolean|null} [blockspecial] DanmuWebPlayerConfig blockspecial
                             * @property {boolean|null} [preventshade] DanmuWebPlayerConfig preventshade
                             * @property {boolean|null} [dmask] DanmuWebPlayerConfig dmask
                             * @property {number|null} [opacity] DanmuWebPlayerConfig opacity
                             * @property {number|null} [dmarea] DanmuWebPlayerConfig dmarea
                             * @property {number|null} [speedplus] DanmuWebPlayerConfig speedplus
                             * @property {number|null} [fontsize] DanmuWebPlayerConfig fontsize
                             * @property {boolean|null} [screensync] DanmuWebPlayerConfig screensync
                             * @property {boolean|null} [speedsync] DanmuWebPlayerConfig speedsync
                             * @property {string|null} [fontfamily] DanmuWebPlayerConfig fontfamily
                             * @property {boolean|null} [bold] DanmuWebPlayerConfig bold
                             * @property {number|null} [fontborder] DanmuWebPlayerConfig fontborder
                             * @property {string|null} [drawType] DanmuWebPlayerConfig drawType
                             */

                            /**
                             * Constructs a new DanmuWebPlayerConfig.
                             * @memberof bilibili.community.service.dm.v1
                             * @classdesc Represents a DanmuWebPlayerConfig.
                             * @implements IDanmuWebPlayerConfig
                             * @constructor
                             * @param {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig=} [properties] Properties to set
                             */
                            function DanmuWebPlayerConfig(properties) {
                                if (properties)
                                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                        if (properties[keys[i]] != null)
                                            this[keys[i]] = properties[keys[i]];
                            }

                            /**
                             * DanmuWebPlayerConfig dmSwitch.
                             * @member {boolean} dmSwitch
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.dmSwitch = false;

                            /**
                             * DanmuWebPlayerConfig aiSwitch.
                             * @member {boolean} aiSwitch
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.aiSwitch = false;

                            /**
                             * DanmuWebPlayerConfig aiLevel.
                             * @member {number} aiLevel
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.aiLevel = 0;

                            /**
                             * DanmuWebPlayerConfig blocktop.
                             * @member {boolean} blocktop
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.blocktop = false;

                            /**
                             * DanmuWebPlayerConfig blockscroll.
                             * @member {boolean} blockscroll
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.blockscroll = false;

                            /**
                             * DanmuWebPlayerConfig blockbottom.
                             * @member {boolean} blockbottom
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.blockbottom = false;

                            /**
                             * DanmuWebPlayerConfig blockcolor.
                             * @member {boolean} blockcolor
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.blockcolor = false;

                            /**
                             * DanmuWebPlayerConfig blockspecial.
                             * @member {boolean} blockspecial
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.blockspecial = false;

                            /**
                             * DanmuWebPlayerConfig preventshade.
                             * @member {boolean} preventshade
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.preventshade = false;

                            /**
                             * DanmuWebPlayerConfig dmask.
                             * @member {boolean} dmask
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.dmask = false;

                            /**
                             * DanmuWebPlayerConfig opacity.
                             * @member {number} opacity
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.opacity = 0;

                            /**
                             * DanmuWebPlayerConfig dmarea.
                             * @member {number} dmarea
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.dmarea = 0;

                            /**
                             * DanmuWebPlayerConfig speedplus.
                             * @member {number} speedplus
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.speedplus = 0;

                            /**
                             * DanmuWebPlayerConfig fontsize.
                             * @member {number} fontsize
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.fontsize = 0;

                            /**
                             * DanmuWebPlayerConfig screensync.
                             * @member {boolean} screensync
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.screensync = false;

                            /**
                             * DanmuWebPlayerConfig speedsync.
                             * @member {boolean} speedsync
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.speedsync = false;

                            /**
                             * DanmuWebPlayerConfig fontfamily.
                             * @member {string} fontfamily
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.fontfamily = "";

                            /**
                             * DanmuWebPlayerConfig bold.
                             * @member {boolean} bold
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.bold = false;

                            /**
                             * DanmuWebPlayerConfig fontborder.
                             * @member {number} fontborder
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.fontborder = 0;

                            /**
                             * DanmuWebPlayerConfig drawType.
                             * @member {string} drawType
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             */
                            DanmuWebPlayerConfig.prototype.drawType = "";

                            /**
                             * Creates a new DanmuWebPlayerConfig instance using the specified properties.
                             * @function create
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @static
                             * @param {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig=} [properties] Properties to set
                             * @returns {bilibili.community.service.dm.v1.DanmuWebPlayerConfig} DanmuWebPlayerConfig instance
                             */
                            DanmuWebPlayerConfig.create = function create(properties) {
                                return new DanmuWebPlayerConfig(properties);
                            };

                            /**
                             * Encodes the specified DanmuWebPlayerConfig message. Does not implicitly {@link bilibili.community.service.dm.v1.DanmuWebPlayerConfig.verify|verify} messages.
                             * @function encode
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @static
                             * @param {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig} message DanmuWebPlayerConfig message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            DanmuWebPlayerConfig.encode = function encode(message, writer) {
                                if (!writer)
                                    writer = $Writer.create();
                                if (message.dmSwitch != null && Object.hasOwnProperty.call(message, "dmSwitch"))
                                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.dmSwitch);
                                if (message.aiSwitch != null && Object.hasOwnProperty.call(message, "aiSwitch"))
                                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.aiSwitch);
                                if (message.aiLevel != null && Object.hasOwnProperty.call(message, "aiLevel"))
                                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.aiLevel);
                                if (message.blocktop != null && Object.hasOwnProperty.call(message, "blocktop"))
                                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.blocktop);
                                if (message.blockscroll != null && Object.hasOwnProperty.call(message, "blockscroll"))
                                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.blockscroll);
                                if (message.blockbottom != null && Object.hasOwnProperty.call(message, "blockbottom"))
                                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.blockbottom);
                                if (message.blockcolor != null && Object.hasOwnProperty.call(message, "blockcolor"))
                                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.blockcolor);
                                if (message.blockspecial != null && Object.hasOwnProperty.call(message, "blockspecial"))
                                    writer.uint32(/* id 8, wireType 0 =*/64).bool(message.blockspecial);
                                if (message.preventshade != null && Object.hasOwnProperty.call(message, "preventshade"))
                                    writer.uint32(/* id 9, wireType 0 =*/72).bool(message.preventshade);
                                if (message.dmask != null && Object.hasOwnProperty.call(message, "dmask"))
                                    writer.uint32(/* id 10, wireType 0 =*/80).bool(message.dmask);
                                if (message.opacity != null && Object.hasOwnProperty.call(message, "opacity"))
                                    writer.uint32(/* id 11, wireType 5 =*/93).float(message.opacity);
                                if (message.dmarea != null && Object.hasOwnProperty.call(message, "dmarea"))
                                    writer.uint32(/* id 12, wireType 0 =*/96).int32(message.dmarea);
                                if (message.speedplus != null && Object.hasOwnProperty.call(message, "speedplus"))
                                    writer.uint32(/* id 13, wireType 5 =*/109).float(message.speedplus);
                                if (message.fontsize != null && Object.hasOwnProperty.call(message, "fontsize"))
                                    writer.uint32(/* id 14, wireType 5 =*/117).float(message.fontsize);
                                if (message.screensync != null && Object.hasOwnProperty.call(message, "screensync"))
                                    writer.uint32(/* id 15, wireType 0 =*/120).bool(message.screensync);
                                if (message.speedsync != null && Object.hasOwnProperty.call(message, "speedsync"))
                                    writer.uint32(/* id 16, wireType 0 =*/128).bool(message.speedsync);
                                if (message.fontfamily != null && Object.hasOwnProperty.call(message, "fontfamily"))
                                    writer.uint32(/* id 17, wireType 2 =*/138).string(message.fontfamily);
                                if (message.bold != null && Object.hasOwnProperty.call(message, "bold"))
                                    writer.uint32(/* id 18, wireType 0 =*/144).bool(message.bold);
                                if (message.fontborder != null && Object.hasOwnProperty.call(message, "fontborder"))
                                    writer.uint32(/* id 19, wireType 0 =*/152).int32(message.fontborder);
                                if (message.drawType != null && Object.hasOwnProperty.call(message, "drawType"))
                                    writer.uint32(/* id 20, wireType 2 =*/162).string(message.drawType);
                                return writer;
                            };

                            /**
                             * Encodes the specified DanmuWebPlayerConfig message, length delimited. Does not implicitly {@link bilibili.community.service.dm.v1.DanmuWebPlayerConfig.verify|verify} messages.
                             * @function encodeDelimited
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @static
                             * @param {bilibili.community.service.dm.v1.IDanmuWebPlayerConfig} message DanmuWebPlayerConfig message or plain object to encode
                             * @param {$protobuf.Writer} [writer] Writer to encode to
                             * @returns {$protobuf.Writer} Writer
                             */
                            DanmuWebPlayerConfig.encodeDelimited = function encodeDelimited(message, writer) {
                                return this.encode(message, writer).ldelim();
                            };

                            /**
                             * Decodes a DanmuWebPlayerConfig message from the specified reader or buffer.
                             * @function decode
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @param {number} [length] Message length if known beforehand
                             * @returns {bilibili.community.service.dm.v1.DanmuWebPlayerConfig} DanmuWebPlayerConfig
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            DanmuWebPlayerConfig.decode = function decode(reader, length) {
                                if (!(reader instanceof $Reader))
                                    reader = $Reader.create(reader);
                                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig();
                                while (reader.pos < end) {
                                    var tag = reader.uint32();
                                    switch (tag >>> 3) {
                                    case 1:
                                        message.dmSwitch = reader.bool();
                                        break;
                                    case 2:
                                        message.aiSwitch = reader.bool();
                                        break;
                                    case 3:
                                        message.aiLevel = reader.int32();
                                        break;
                                    case 4:
                                        message.blocktop = reader.bool();
                                        break;
                                    case 5:
                                        message.blockscroll = reader.bool();
                                        break;
                                    case 6:
                                        message.blockbottom = reader.bool();
                                        break;
                                    case 7:
                                        message.blockcolor = reader.bool();
                                        break;
                                    case 8:
                                        message.blockspecial = reader.bool();
                                        break;
                                    case 9:
                                        message.preventshade = reader.bool();
                                        break;
                                    case 10:
                                        message.dmask = reader.bool();
                                        break;
                                    case 11:
                                        message.opacity = reader.float();
                                        break;
                                    case 12:
                                        message.dmarea = reader.int32();
                                        break;
                                    case 13:
                                        message.speedplus = reader.float();
                                        break;
                                    case 14:
                                        message.fontsize = reader.float();
                                        break;
                                    case 15:
                                        message.screensync = reader.bool();
                                        break;
                                    case 16:
                                        message.speedsync = reader.bool();
                                        break;
                                    case 17:
                                        message.fontfamily = reader.string();
                                        break;
                                    case 18:
                                        message.bold = reader.bool();
                                        break;
                                    case 19:
                                        message.fontborder = reader.int32();
                                        break;
                                    case 20:
                                        message.drawType = reader.string();
                                        break;
                                    default:
                                        reader.skipType(tag & 7);
                                        break;
                                    }
                                }
                                return message;
                            };

                            /**
                             * Decodes a DanmuWebPlayerConfig message from the specified reader or buffer, length delimited.
                             * @function decodeDelimited
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @static
                             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                             * @returns {bilibili.community.service.dm.v1.DanmuWebPlayerConfig} DanmuWebPlayerConfig
                             * @throws {Error} If the payload is not a reader or valid buffer
                             * @throws {$protobuf.util.ProtocolError} If required fields are missing
                             */
                            DanmuWebPlayerConfig.decodeDelimited = function decodeDelimited(reader) {
                                if (!(reader instanceof $Reader))
                                    reader = new $Reader(reader);
                                return this.decode(reader, reader.uint32());
                            };

                            /**
                             * Verifies a DanmuWebPlayerConfig message.
                             * @function verify
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @static
                             * @param {Object.<string,*>} message Plain object to verify
                             * @returns {string|null} `null` if valid, otherwise the reason why it is not
                             */
                            DanmuWebPlayerConfig.verify = function verify(message) {
                                if (typeof message !== "object" || message === null)
                                    return "object expected";
                                if (message.dmSwitch != null && message.hasOwnProperty("dmSwitch"))
                                    if (typeof message.dmSwitch !== "boolean")
                                        return "dmSwitch: boolean expected";
                                if (message.aiSwitch != null && message.hasOwnProperty("aiSwitch"))
                                    if (typeof message.aiSwitch !== "boolean")
                                        return "aiSwitch: boolean expected";
                                if (message.aiLevel != null && message.hasOwnProperty("aiLevel"))
                                    if (!$util.isInteger(message.aiLevel))
                                        return "aiLevel: integer expected";
                                if (message.blocktop != null && message.hasOwnProperty("blocktop"))
                                    if (typeof message.blocktop !== "boolean")
                                        return "blocktop: boolean expected";
                                if (message.blockscroll != null && message.hasOwnProperty("blockscroll"))
                                    if (typeof message.blockscroll !== "boolean")
                                        return "blockscroll: boolean expected";
                                if (message.blockbottom != null && message.hasOwnProperty("blockbottom"))
                                    if (typeof message.blockbottom !== "boolean")
                                        return "blockbottom: boolean expected";
                                if (message.blockcolor != null && message.hasOwnProperty("blockcolor"))
                                    if (typeof message.blockcolor !== "boolean")
                                        return "blockcolor: boolean expected";
                                if (message.blockspecial != null && message.hasOwnProperty("blockspecial"))
                                    if (typeof message.blockspecial !== "boolean")
                                        return "blockspecial: boolean expected";
                                if (message.preventshade != null && message.hasOwnProperty("preventshade"))
                                    if (typeof message.preventshade !== "boolean")
                                        return "preventshade: boolean expected";
                                if (message.dmask != null && message.hasOwnProperty("dmask"))
                                    if (typeof message.dmask !== "boolean")
                                        return "dmask: boolean expected";
                                if (message.opacity != null && message.hasOwnProperty("opacity"))
                                    if (typeof message.opacity !== "number")
                                        return "opacity: number expected";
                                if (message.dmarea != null && message.hasOwnProperty("dmarea"))
                                    if (!$util.isInteger(message.dmarea))
                                        return "dmarea: integer expected";
                                if (message.speedplus != null && message.hasOwnProperty("speedplus"))
                                    if (typeof message.speedplus !== "number")
                                        return "speedplus: number expected";
                                if (message.fontsize != null && message.hasOwnProperty("fontsize"))
                                    if (typeof message.fontsize !== "number")
                                        return "fontsize: number expected";
                                if (message.screensync != null && message.hasOwnProperty("screensync"))
                                    if (typeof message.screensync !== "boolean")
                                        return "screensync: boolean expected";
                                if (message.speedsync != null && message.hasOwnProperty("speedsync"))
                                    if (typeof message.speedsync !== "boolean")
                                        return "speedsync: boolean expected";
                                if (message.fontfamily != null && message.hasOwnProperty("fontfamily"))
                                    if (!$util.isString(message.fontfamily))
                                        return "fontfamily: string expected";
                                if (message.bold != null && message.hasOwnProperty("bold"))
                                    if (typeof message.bold !== "boolean")
                                        return "bold: boolean expected";
                                if (message.fontborder != null && message.hasOwnProperty("fontborder"))
                                    if (!$util.isInteger(message.fontborder))
                                        return "fontborder: integer expected";
                                if (message.drawType != null && message.hasOwnProperty("drawType"))
                                    if (!$util.isString(message.drawType))
                                        return "drawType: string expected";
                                return null;
                            };

                            /**
                             * Creates a DanmuWebPlayerConfig message from a plain object. Also converts values to their respective internal types.
                             * @function fromObject
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @static
                             * @param {Object.<string,*>} object Plain object
                             * @returns {bilibili.community.service.dm.v1.DanmuWebPlayerConfig} DanmuWebPlayerConfig
                             */
                            DanmuWebPlayerConfig.fromObject = function fromObject(object) {
                                if (object instanceof $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig)
                                    return object;
                                var message = new $root.bilibili.community.service.dm.v1.DanmuWebPlayerConfig();
                                if (object.dmSwitch != null)
                                    message.dmSwitch = Boolean(object.dmSwitch);
                                if (object.aiSwitch != null)
                                    message.aiSwitch = Boolean(object.aiSwitch);
                                if (object.aiLevel != null)
                                    message.aiLevel = object.aiLevel | 0;
                                if (object.blocktop != null)
                                    message.blocktop = Boolean(object.blocktop);
                                if (object.blockscroll != null)
                                    message.blockscroll = Boolean(object.blockscroll);
                                if (object.blockbottom != null)
                                    message.blockbottom = Boolean(object.blockbottom);
                                if (object.blockcolor != null)
                                    message.blockcolor = Boolean(object.blockcolor);
                                if (object.blockspecial != null)
                                    message.blockspecial = Boolean(object.blockspecial);
                                if (object.preventshade != null)
                                    message.preventshade = Boolean(object.preventshade);
                                if (object.dmask != null)
                                    message.dmask = Boolean(object.dmask);
                                if (object.opacity != null)
                                    message.opacity = Number(object.opacity);
                                if (object.dmarea != null)
                                    message.dmarea = object.dmarea | 0;
                                if (object.speedplus != null)
                                    message.speedplus = Number(object.speedplus);
                                if (object.fontsize != null)
                                    message.fontsize = Number(object.fontsize);
                                if (object.screensync != null)
                                    message.screensync = Boolean(object.screensync);
                                if (object.speedsync != null)
                                    message.speedsync = Boolean(object.speedsync);
                                if (object.fontfamily != null)
                                    message.fontfamily = String(object.fontfamily);
                                if (object.bold != null)
                                    message.bold = Boolean(object.bold);
                                if (object.fontborder != null)
                                    message.fontborder = object.fontborder | 0;
                                if (object.drawType != null)
                                    message.drawType = String(object.drawType);
                                return message;
                            };

                            /**
                             * Creates a plain object from a DanmuWebPlayerConfig message. Also converts values to other types if specified.
                             * @function toObject
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @static
                             * @param {bilibili.community.service.dm.v1.DanmuWebPlayerConfig} message DanmuWebPlayerConfig
                             * @param {$protobuf.IConversionOptions} [options] Conversion options
                             * @returns {Object.<string,*>} Plain object
                             */
                            DanmuWebPlayerConfig.toObject = function toObject(message, options) {
                                if (!options)
                                    options = {};
                                var object = {};
                                if (options.defaults) {
                                    object.dmSwitch = false;
                                    object.aiSwitch = false;
                                    object.aiLevel = 0;
                                    object.blocktop = false;
                                    object.blockscroll = false;
                                    object.blockbottom = false;
                                    object.blockcolor = false;
                                    object.blockspecial = false;
                                    object.preventshade = false;
                                    object.dmask = false;
                                    object.opacity = 0;
                                    object.dmarea = 0;
                                    object.speedplus = 0;
                                    object.fontsize = 0;
                                    object.screensync = false;
                                    object.speedsync = false;
                                    object.fontfamily = "";
                                    object.bold = false;
                                    object.fontborder = 0;
                                    object.drawType = "";
                                }
                                if (message.dmSwitch != null && message.hasOwnProperty("dmSwitch"))
                                    object.dmSwitch = message.dmSwitch;
                                if (message.aiSwitch != null && message.hasOwnProperty("aiSwitch"))
                                    object.aiSwitch = message.aiSwitch;
                                if (message.aiLevel != null && message.hasOwnProperty("aiLevel"))
                                    object.aiLevel = message.aiLevel;
                                if (message.blocktop != null && message.hasOwnProperty("blocktop"))
                                    object.blocktop = message.blocktop;
                                if (message.blockscroll != null && message.hasOwnProperty("blockscroll"))
                                    object.blockscroll = message.blockscroll;
                                if (message.blockbottom != null && message.hasOwnProperty("blockbottom"))
                                    object.blockbottom = message.blockbottom;
                                if (message.blockcolor != null && message.hasOwnProperty("blockcolor"))
                                    object.blockcolor = message.blockcolor;
                                if (message.blockspecial != null && message.hasOwnProperty("blockspecial"))
                                    object.blockspecial = message.blockspecial;
                                if (message.preventshade != null && message.hasOwnProperty("preventshade"))
                                    object.preventshade = message.preventshade;
                                if (message.dmask != null && message.hasOwnProperty("dmask"))
                                    object.dmask = message.dmask;
                                if (message.opacity != null && message.hasOwnProperty("opacity"))
                                    object.opacity = options.json && !isFinite(message.opacity) ? String(message.opacity) : message.opacity;
                                if (message.dmarea != null && message.hasOwnProperty("dmarea"))
                                    object.dmarea = message.dmarea;
                                if (message.speedplus != null && message.hasOwnProperty("speedplus"))
                                    object.speedplus = options.json && !isFinite(message.speedplus) ? String(message.speedplus) : message.speedplus;
                                if (message.fontsize != null && message.hasOwnProperty("fontsize"))
                                    object.fontsize = options.json && !isFinite(message.fontsize) ? String(message.fontsize) : message.fontsize;
                                if (message.screensync != null && message.hasOwnProperty("screensync"))
                                    object.screensync = message.screensync;
                                if (message.speedsync != null && message.hasOwnProperty("speedsync"))
                                    object.speedsync = message.speedsync;
                                if (message.fontfamily != null && message.hasOwnProperty("fontfamily"))
                                    object.fontfamily = message.fontfamily;
                                if (message.bold != null && message.hasOwnProperty("bold"))
                                    object.bold = message.bold;
                                if (message.fontborder != null && message.hasOwnProperty("fontborder"))
                                    object.fontborder = message.fontborder;
                                if (message.drawType != null && message.hasOwnProperty("drawType"))
                                    object.drawType = message.drawType;
                                return object;
                            };

                            /**
                             * Converts this DanmuWebPlayerConfig to JSON.
                             * @function toJSON
                             * @memberof bilibili.community.service.dm.v1.DanmuWebPlayerConfig
                             * @instance
                             * @returns {Object.<string,*>} JSON object
                             */
                            DanmuWebPlayerConfig.prototype.toJSON = function toJSON() {
                                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                            };

                            return DanmuWebPlayerConfig;
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

    return $root;
})(protobuf);
