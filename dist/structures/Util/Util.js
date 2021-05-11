"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const Constants_1 = require("../../Constants");
function isObject(d) {
    return typeof d === "object" && d !== null;
}
exports.isObject = isObject;
/**
 * Flatten an object. Any properties that are collections will get converted to an array of keys.
 * @param obj The object to flatten.
 * @param props Specific properties to include/exclude.
 */
function flatten(obj, ...props) {
    if (!isObject(obj))
        return obj;
    const objProps = Object.keys(obj)
        .filter(k => !k.startsWith("_"))
        .map(k => ({ [k]: true }));
    // @ts-ignore
    props = objProps.length ? Object.assign(...objProps, ...props) : Object.assign({}, ...props);
    const out = {};
    // eslint-disable-next-line prefer-const
    for (let [prop, newProp] of Object.entries(props)) {
        if (!newProp)
            continue;
        // @ts-ignore
        newProp = newProp === true ? prop : newProp;
        const element = obj[prop];
        const elemIsObj = isObject(element);
        const valueOf = elemIsObj && typeof element.valueOf === "function" ? element.valueOf() : null;
        // If it's an array, flatten each element
        // @ts-ignore
        if (Array.isArray(element))
            out[newProp] = element.map(e => flatten(e));
        // If it's an object with a primitive `valueOf`, use that value
        // @ts-ignore
        else if (typeof valueOf !== "object")
            out[newProp] = valueOf;
        // If it's a primitive
        // @ts-ignore
        else if (!elemIsObj)
            out[newProp] = element;
    }
    return out;
}
exports.flatten = flatten;
/**
 * Alternative to Node's `path.basename`, removing query string after the extension if it exists.
 * @param path Path to get the basename of
 * @param ext File extension to remove
 * @returns Basename of the path
 */
function basename(path, ext) {
    const res = path_1.parse(path);
    return ext && res.ext.startsWith(ext) ? res.name : res.base.split("?")[0];
}
exports.basename = basename;
/**
 * Resolves a ColorResolvable into a color number.
 * @param color Color to resolve
 * @returns A color
 */
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
/**
 * Resolves a StringResolvable to a string.
 * @param data The string resolvable to resolve
 */
function resolveString(data) {
    if (typeof data === "string")
        return data;
    if (Array.isArray(data))
        return data.join("\n");
    return String(data);
}
exports.resolveString = resolveString;
/**
 * Shallow-copies an object with its class/prototype intact.
 * @param obj Object to clone
 */
function cloneObject(obj) {
    // @ts-ignore
    return Object.assign(Object.create(obj), obj);
}
exports.cloneObject = cloneObject;
/**
 * Transforms a snowflake from a bit string to a decimal string.
 * @param num Bit string to be transformed
 */
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
    // @ts-ignore
    num = parseInt(num, 2);
    // @ts-ignore
    while (num > 0) {
        // @ts-ignore
        dec = (num % 10).toString() + dec;
        // @ts-ignore
        num = Math.floor(num / 10);
    }
    return dec;
}
exports.binaryToID = binaryToID;
/**
 * Transforms a snowflake from a decimal string to a bit string.
 * @param num Snowflake to be transformed
 */
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
/**
 * Escapes any Discord-flavour markdown in a string.
 * @param text Content to escape
 * @param options What types of markdown to escape
 */
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
/**
 * Escapes code block markdown in a string.
 * @param text Content to escape
 */
function escapeCodeBlock(text) {
    return text.replace(/```/g, "\\`\\`\\`");
}
exports.escapeCodeBlock = escapeCodeBlock;
/**
 * Escapes inline code markdown in a string.
 * @param text Content to escape
 */
function escapeInlineCode(text) {
    return text.replace(/(?<=^|[^`])`(?=[^`]|$)/g, "\\`");
}
exports.escapeInlineCode = escapeInlineCode;
/**
 * Escapes italic markdown in a string.
 * @param text Content to escape
 */
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
/**
 * Escapes bold markdown in a string.
 * @param text Content to escape
 */
function escapeBold(text) {
    let i = 0;
    return text.replace(/\*\*(\*)?/g, (_, match) => {
        if (match)
            return ++i % 2 ? `${match}\\*\\*` : `\\*\\*${match}`;
        return "\\*\\*";
    });
}
exports.escapeBold = escapeBold;
/**
 * Escapes underline markdown in a string.
 * @param text Content to escape
 */
function escapeUnderline(text) {
    let i = 0;
    return text.replace(/__(_)?/g, (_, match) => {
        if (match)
            return ++i % 2 ? `${match}\\_\\_` : `\\_\\_${match}`;
        return "\\_\\_";
    });
}
exports.escapeUnderline = escapeUnderline;
/**
 * Escapes strikethrough markdown in a string.
 * @param text Content to escape
 */
function escapeStrikethrough(text) {
    return text.replace(/~~/g, "\\~\\~");
}
exports.escapeStrikethrough = escapeStrikethrough;
/**
 * Escapes spoiler markdown in a string.
 * @param text Content to escape
 */
function escapeSpoiler(text) {
    return text.replace(/\|\|/g, "\\|\\|");
}
exports.escapeSpoiler = escapeSpoiler;
/**
 * Parses emoji info out of a string. The string must be one of:
 * * A UTF-8 emoji (no ID)
 * * A URL-encoded UTF-8 emoji (no ID)
 * * A Discord custom emoji (`<:name:id>` or `<a:name:id>`)
 * @param text Emoji string to parse
 * @returns Object with `animated`, `name`, and `id` properties
 */
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
function cleanContent(str, message) {
    let string = str
        .replace(/<@!?\d+>/g, input => {
        const id = input.replace(/<|!|>|@/g, "");
        const member = message.mentions.members.get(id);
        if (member) {
            return removeMentions(`@${member.displayName}`);
        }
        else {
            const user = message.mentions.users.get(id);
            return user ? removeMentions(`@${user.username}`) : input;
        }
    })
        .replace(/<#\d+>/g, () => {
        return "#deleted-channel";
    })
        .replace(/<@&\d+>/g, () => {
        return "@deleted-role";
    });
    if (message.client.options.disableEveryone) {
        string = string.replace(/@([^<>@ ]*)/gmsu, (match, target) => {
            if (target.match(/^[&!]?\d+$/)) {
                return `@${target}`;
            }
            else {
                return `@\u200b${target}`;
            }
        });
    }
    return string;
}
exports.cleanContent = cleanContent;
function removeMentions(str) {
    return str.replace(/@/g, "@\u200b");
}
exports.removeMentions = removeMentions;
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
    parseEmoji,
    cleanContent,
    removeMentions
};
