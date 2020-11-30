"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEmoji = exports.escapeSpoiler = exports.escapeStrikethrough = exports.escapeUnderline = exports.escapeBold = exports.escapeItalic = exports.escapeInlineCode = exports.escapeCodeBlock = exports.escapeMarkdown = exports.idToBinary = exports.binaryToID = exports.cloneObject = exports.resolveString = exports.resolveColor = exports.basename = exports.flatten = exports.isObject = void 0;
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
function escapeMarkdown(text, { codeBlock = true, inlineCode = true, bold = true, italic = true, underline = true, strikethrough = true, spoiler = true, codeBlockContent = true, inlineCodeContent = true } = {}) {
    if (!codeBlockContent) {
        return text
            .split("```")
            .map((subString, index, array) => {
            if (index % 2 && index !== array.length - 1)
                return subString;
            return escapeMarkdown(subString, {
                inlineCode,
                bold,
                italic,
                underline,
                strikethrough,
                spoiler,
                inlineCodeContent
            });
        })
            .join(codeBlock ? "\\`\\`\\`" : "```");
    }
    if (!inlineCodeContent) {
        return text
            .split(/(?<=^|[^`])`(?=[^`]|$)/g)
            .map((subString, index, array) => {
            if (index % 2 && index !== array.length - 1)
                return subString;
            return escapeMarkdown(subString, {
                codeBlock,
                bold,
                italic,
                underline,
                strikethrough,
                spoiler
            });
        })
            .join(inlineCode ? "\\`" : "`");
    }
    if (inlineCode)
        text = escapeInlineCode(text);
    if (codeBlock)
        text = escapeCodeBlock(text);
    if (italic)
        text = escapeItalic(text);
    if (bold)
        text = escapeBold(text);
    if (underline)
        text = escapeUnderline(text);
    if (strikethrough)
        text = escapeStrikethrough(text);
    if (spoiler)
        text = escapeSpoiler(text);
    return text;
}
exports.escapeMarkdown = escapeMarkdown;
function escapeCodeBlock(text) {
    return text.replace(/```/g, "\\`\\`\\`");
}
exports.escapeCodeBlock = escapeCodeBlock;
function escapeInlineCode(text) {
    return text.replace(/(?<=^|[^`])`(?=[^`]|$)/g, "\\`");
}
exports.escapeInlineCode = escapeInlineCode;
function escapeItalic(text) {
    let i = 0;
    text = text.replace(/(?<=^|[^*])\*([^*]|\*\*|$)/g, (_, match) => {
        if (match === "**")
            return ++i % 2 ? `\\*${match}` : `${match}\\*`;
        return `\\*${match}`;
    });
    i = 0;
    return text.replace(/(?<=^|[^_])_([^_]|__|$)/g, (_, match) => {
        if (match === "__")
            return ++i % 2 ? `\\_${match}` : `${match}\\_`;
        return `\\_${match}`;
    });
}
exports.escapeItalic = escapeItalic;
function escapeBold(text) {
    let i = 0;
    return text.replace(/\*\*(\*)?/g, (_, match) => {
        if (match)
            return ++i % 2 ? `${match}\\*\\*` : `\\*\\*${match}`;
        return "\\*\\*";
    });
}
exports.escapeBold = escapeBold;
function escapeUnderline(text) {
    let i = 0;
    return text.replace(/__(_)?/g, (_, match) => {
        if (match)
            return ++i % 2 ? `${match}\\_\\_` : `\\_\\_${match}`;
        return "\\_\\_";
    });
}
exports.escapeUnderline = escapeUnderline;
function escapeStrikethrough(text) {
    return text.replace(/~~/g, "\\~\\~");
}
exports.escapeStrikethrough = escapeStrikethrough;
function escapeSpoiler(text) {
    return text.replace(/\|\|/g, "\\|\\|");
}
exports.escapeSpoiler = escapeSpoiler;
function parseEmoji(text) {
    if (text.includes("%"))
        text = decodeURIComponent(text);
    if (!text.includes(":"))
        return { animated: false, name: text, id: null };
    const m = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
    if (!m)
        return null;
    return { animated: Boolean(m[1]), name: m[2], id: m[3] || null };
}
exports.parseEmoji = parseEmoji;
exports.default = {
    isObject,
    flatten,
    basename,
    resolveColor,
    resolveString,
    cloneObject,
    binaryToID,
    idToBinary,
    escapeMarkdown,
    escapeCodeBlock,
    escapeInlineCode,
    escapeItalic,
    escapeBold,
    escapeUnderline,
    escapeStrikethrough,
    escapeSpoiler,
    parseEmoji
};
