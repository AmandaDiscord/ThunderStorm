"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const stream_1 = __importDefault(require("stream"));
const centra_1 = __importDefault(require("centra"));
const errors_1 = require("../errors");
const Invite_1 = __importDefault(require("../structures/Invite"));
class DataResolver {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }
    static resolveCode(data, regex) {
        var _a, _b;
        return (_b = (_a = data.matchAll(regex).next().value) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : data;
    }
    static resolveInviteCode(data) {
        return this.resolveCode(data, Invite_1.default.INVITES_PATTERN);
    }
    static async resolveImage(image) {
        if (!image)
            return null;
        if (typeof image === "string" && image.startsWith("data:")) {
            return image;
        }
        const file = await this.resolveFileAsBuffer(image);
        return DataResolver.resolveBase64(file);
    }
    static resolveBase64(data) {
        if (Buffer.isBuffer(data))
            return `data:image/jpg;base64,${data.toString("base64")}`;
        return data;
    }
    static async resolveFile(resource) {
        if (Buffer.isBuffer(resource) || resource instanceof stream_1.default.Readable)
            return resource;
        if (typeof resource === "string") {
            if (/^https?:\/\//.test(resource)) {
                const res = await (0, centra_1.default)(resource).send();
                return res.body;
            }
            return new Promise((resolve, reject) => {
                const file = path_1.default.resolve(resource);
                fs_1.default.stat(file, (err, stats) => {
                    if (err)
                        return reject(err);
                    if (!stats.isFile())
                        return reject(new errors_1.Error("FILE_NOT_FOUND", file));
                    return resolve(fs_1.default.createReadStream(file));
                });
            });
        }
        throw new errors_1.TypeError("REQ_RESOURCE_TYPE");
    }
    static async resolveFileAsBuffer(resource) {
        const file = await this.resolveFile(resource);
        if (Buffer.isBuffer(file))
            return file;
        const buffers = [];
        // @ts-ignore
        for await (const data of file)
            buffers.push(data);
        return Buffer.concat(buffers);
    }
}
DataResolver.default = DataResolver;
module.exports = DataResolver;
