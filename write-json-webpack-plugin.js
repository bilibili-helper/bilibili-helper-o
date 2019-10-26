/**
 * Author: DrowsyFlesh
 * Create: 2019/10/25
 * Description:
 */
const path = require("path");

class WriteJsonWebpackPlugin {
    constructor(options) {
        this.options = options || {};
        this.options.object = options.object || {};
        this.options.path = options.path || "";
        this.options.filename = options.filename || "timestamp.json";
        this.options.pretty = options.pretty;

        this.createObj = this.createObj.bind(this);
    }

    apply(compiler) {
        if (compiler.hooks) {
            compiler.hooks.emit.tapAsync(this.constructor.name, this.createObj);
        } else {
            // Fallback for webpack under version 4
            compiler.plugin("emit", this.createObj);
        }
    }

    createObj(compilation, callback) {
        const json = JSON.stringify(
            this.options.object,
            null,
            this.options.pretty ? 4 : null
        );
        const output = path.join(this.options.path, this.options.filename);

        Object.assign(compilation.assets, {
            [output]: {
                source() {
                    return json;
                },
                size() {
                    return json.length;
                },
            },
        });

        callback();
    }
}

module.exports = WriteJsonWebpackPlugin;
