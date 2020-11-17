"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowflakeUtil = exports.idToBinary = exports.binaryToID = exports.cloneObject = exports.resolveString = exports.resolveColor = exports.basename = exports.flatten = exports.isObject = void 0;
const path_1 = require("path");
const Constants_1 = require("../../Constants");
function isObject(d) {
    return typeof d === "object" && d !== null;
}
exports.isObject = isObject;
function flatten(obj, ...props) {
    if (!isObject(obj))
        return obj;
    const objProps = Object.keys(obj)
        .filter(k => !k.startsWith("_"))
        .map(k => ({ [k]: true }));
    props = objProps.length ? Object.assign(...objProps, ...props) : Object.assign({}, ...props);
    const out = {};
    for (let [prop, newProp] of Object.entries(props)) {
        if (!newProp)
            continue;
        newProp = newProp === true ? prop : newProp;
        const element = obj[prop];
        const elemIsObj = isObject(element);
        const valueOf = elemIsObj && typeof element.valueOf === "function" ? element.valueOf() : null;
        if (Array.isArray(element))
            out[newProp] = element.map(e => flatten(e));
        else if (typeof valueOf !== "object")
            out[newProp] = valueOf;
        else if (!elemIsObj)
            out[newProp] = element;
    }
    return out;
}
exports.flatten = flatten;
function basename(path, ext) {
    const res = path_1.parse(path);
    return ext && res.ext.startsWith(ext) ? res.name : res.base.split("?")[0];
}
exports.basename = basename;
function resolveColor(color) {
    if (typeof color === "string") {
        if (color === "RANDOM")
            return Math.floor(Math.random() * (0xffffff + 1));
        if (color === "DEFAULT")
            return 0;
        color = Constants_1.Colors[color] || parseInt(color.replace("#", ""), 16);
    }
    else if (Array.isArray(color)) {
        color = (color[0] << 16) + (color[1] << 8) + color[2];
    }
    if ((color && color < 0) || (color && color > 0xffffff))
        throw new RangeError("COLOR_RANGE");
    else if (color && isNaN(color))
        throw new TypeError("COLOR_CONVERT");
    return color || 0;
}
exports.resolveColor = resolveColor;
function resolveString(data) {
    if (typeof data === "string")
        return data;
    if (Array.isArray(data))
        return data.join("\n");
    return String(data);
}
exports.resolveString = resolveString;
function cloneObject(obj) {
    return Object.assign(Object.create(obj), obj);
}
exports.cloneObject = cloneObject;
function binaryToID(num) {
    let dec = "";
    while (num.length > 50) {
        const high = parseInt(num.slice(0, -32), 2);
        const low = parseInt((high % 10).toString(2) + num.slice(-32), 2);
        dec = (low % 10).toString() + dec;
        num =
            Math.floor(high / 10).toString(2) +
                Math.floor(low / 10)
                    .toString(2)
                    .padStart(32, "0");
    }
    num = parseInt(num, 2);
    while (num > 0) {
        dec = (num % 10).toString() + dec;
        num = Math.floor(num / 10);
    }
    return dec;
}
exports.binaryToID = binaryToID;
function idToBinary(num) {
    let bin = "";
    let high = parseInt(num.slice(0, -10)) || 0;
    let low = parseInt(num.slice(-10));
    while (low > 0 || high > 0) {
        bin = String(low & 1) + bin;
        low = Math.floor(low / 2);
        if (high > 0) {
            low += 5000000000 * (high % 2);
            high = Math.floor(high / 2);
        }
    }
    return bin;
}
exports.idToBinary = idToBinary;
const EPOCH = 1420070400000;
let INCREMENT = 0;
exports.SnowflakeUtil = {
    generate(timestamp = Date.now()) {
        if (timestamp instanceof Date)
            timestamp = timestamp.getTime();
        if (typeof timestamp !== "number" || isNaN(timestamp)) {
            throw new TypeError(`"timestamp" argument must be a number (received ${isNaN(timestamp) ? "NaN" : typeof timestamp})`);
        }
        if (INCREMENT >= 4095)
            INCREMENT = 0;
        const BINARY = `${(timestamp - EPOCH).toString(2).padStart(42, "0")}0000100000${(INCREMENT++)
            .toString(2)
            .padStart(12, "0")}`;
        return binaryToID(BINARY);
    },
    deconstruct(snowflake) {
        const BINARY = idToBinary(snowflake).toString(2).padStart(64, "0");
        const res = {
            timestamp: parseInt(BINARY.substring(0, 42), 2) + EPOCH,
            workerID: parseInt(BINARY.substring(42, 47), 2),
            processID: parseInt(BINARY.substring(47, 52), 2),
            increment: parseInt(BINARY.substring(52, 64), 2),
            binary: BINARY
        };
        Object.defineProperty(res, "date", {
            get: function get() {
                return new Date(this.timestamp);
            },
            enumerable: true
        });
        return res;
    }
};
exports.default = {
    isObject,
    flatten,
    basename,
    resolveColor,
    resolveString,
    cloneObject,
    SnowflakeUtil: exports.SnowflakeUtil
};
