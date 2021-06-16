"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = require("path");
const centra_1 = __importDefault(require("centra"));
const Endpoints_1 = __importDefault(require("snowtransfer/dist/src/Endpoints"));
const Constants_1 = require("./Constants");
const errors_1 = require("../errors");
const has = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const isObject = (d) => typeof d === "object" && d !== null;
class Util {
    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
    }
    static flatten(obj, ...props) {
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
    static splitMessage(text, { maxLength = 2000, char = "\n", prepend = "", append = "" } = {}) {
        // @ts-ignore
        text = Util.verifyString(text, errors_1.RangeError, "MESSAGE_CONTENT_TYPE", false);
        if (text.length <= maxLength)
            return [text];
        const splitText = text.split(char);
        if (splitText.some(elem => elem.length > maxLength))
            throw new errors_1.RangeError("SPLIT_MAX_LEN");
        const messages = [];
        let msg = "";
        for (const chunk of splitText) {
            if (msg && (msg + char + chunk + append).length > maxLength) {
                messages.push(msg + append);
                msg = prepend;
            }
            msg += (msg && msg !== prepend ? char : "") + chunk;
        }
        return messages.concat(msg).filter(m => m);
    }
    static escapeMarkdown(text, { codeBlock = true, inlineCode = true, bold = true, italic = true, underline = true, strikethrough = true, spoiler = true, codeBlockContent = true, inlineCodeContent = true } = {}) {
        if (!codeBlockContent) {
            return text
                .split("```")
                .map((subString, index, array) => {
                if (index % 2 && index !== array.length - 1)
                    return subString;
                return Util.escapeMarkdown(subString, {
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
                return Util.escapeMarkdown(subString, {
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
            text = Util.escapeInlineCode(text);
        if (codeBlock)
            text = Util.escapeCodeBlock(text);
        if (italic)
            text = Util.escapeItalic(text);
        if (bold)
            text = Util.escapeBold(text);
        if (underline)
            text = Util.escapeUnderline(text);
        if (strikethrough)
            text = Util.escapeStrikethrough(text);
        if (spoiler)
            text = Util.escapeSpoiler(text);
        return text;
    }
    static escapeCodeBlock(text) {
        return text.replace(/```/g, "\\`\\`\\`");
    }
    static escapeInlineCode(text) {
        return text.replace(/(?<=^|[^`])`(?=[^`]|$)/g, "\\`");
    }
    static escapeItalic(text) {
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
    static escapeBold(text) {
        let i = 0;
        return text.replace(/\*\*(\*)?/g, (_, match) => {
            if (match)
                return ++i % 2 ? `${match}\\*\\*` : `\\*\\*${match}`;
            return "\\*\\*";
        });
    }
    static escapeUnderline(text) {
        let i = 0;
        return text.replace(/__(_)?/g, (_, match) => {
            if (match)
                return ++i % 2 ? `${match}\\_\\_` : `\\_\\_${match}`;
            return "\\_\\_";
        });
    }
    static escapeStrikethrough(text) {
        return text.replace(/~~/g, "\\~\\~");
    }
    static escapeSpoiler(text) {
        return text.replace(/\|\|/g, "\\|\\|");
    }
    static async fetchRecommendedShards(token, guildsPerShard = 1000) {
        if (!token)
            throw new errors_1.Error("TOKEN_MISSING");
        const res = await centra_1.default(Endpoints_1.default.BASE_HOST + Endpoints_1.default.BASE_URL + Constants_1.Endpoints.botGateway, "get").header("Authorization", `Bot ${token.replace(/^Bot\s*/i, "")}`).send();
        if (res.statusCode === 200)
            return res.json().then(data => data.shards * (1000 / guildsPerShard));
        if (res.statusCode === 401)
            throw new errors_1.Error("TOKEN_INVALID");
        throw res;
    }
    static parseEmoji(text) {
        if (text.includes("%"))
            text = decodeURIComponent(text);
        if (!text.includes(":"))
            return { animated: false, name: text, id: null };
        const m = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/);
        if (!m)
            return null;
        return { animated: Boolean(m[1]), name: m[2], id: m[3] || null };
    }
    static resolvePartialEmoji(emoji) {
        if (!emoji)
            return null;
        if (typeof emoji === "string")
            return /^\d{17,19}$/.test(emoji) ? { id: emoji } : Util.parseEmoji(emoji);
        const { id, name, animated } = emoji;
        if (!id && !name)
            return null;
        return { id, name, animated };
    }
    static cloneObject(obj) {
        return Object.assign(Object.create(obj), obj);
    }
    static mergeDefault(def, given) {
        if (!given)
            return def;
        for (const key in def) {
            if (!has(given, key) || given[key] === undefined) {
                given[key] = def[key];
            }
            else if (given[key] === Object(given[key])) {
                given[key] = Util.mergeDefault(def[key], given[key]);
            }
        }
        return given;
    }
    static makeError(obj) {
        const err = new Error(obj.message);
        err.name = obj.name;
        err.stack = obj.stack;
        return err;
    }
    static makePlainError(err) {
        return {
            name: err.name,
            message: err.message,
            stack: err.stack
        };
    }
    static moveElementInArray(array, element, newIndex, offset = false) {
        const index = array.indexOf(element);
        newIndex = (offset ? index : 0) + newIndex;
        if (newIndex > -1 && newIndex < array.length) {
            const removedElement = array.splice(index, 1)[0];
            array.splice(newIndex, 0, removedElement);
        }
        return array.indexOf(element);
    }
    static verifyString(data, error = Error, errorMessage = `Expected a string, got ${data} instead.`, allowEmpty = true) {
        if (typeof data !== "string")
            throw new error(errorMessage);
        if (!allowEmpty && data.length === 0)
            throw new error(errorMessage);
        return data;
    }
    static resolveColor(color) {
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
            throw new errors_1.RangeError("COLOR_RANGE");
        else if (color && isNaN(color))
            throw new errors_1.TypeError("COLOR_CONVERT");
        return color || 0;
    }
    static discordSort(collection) {
        return collection.sorted((a, b) => a.rawPosition - b.rawPosition ||
            parseInt(b.id.slice(0, -10)) - parseInt(a.id.slice(0, -10)) ||
            parseInt(b.id.slice(10)) - parseInt(a.id.slice(10)));
    }
    static setPosition(item, position, relative, sorted, route, reason) {
        let updatedItems = sorted.array();
        Util.moveElementInArray(updatedItems, item, position, relative);
        // @ts-ignore
        updatedItems = updatedItems.map((r, i) => ({ id: r.id, position: i }));
        return route.patch({ data: updatedItems, reason }).then(() => updatedItems);
    }
    static basename(path, ext) {
        const res = path_1.parse(path);
        return ext && res.ext.startsWith(ext) ? res.name : res.base.split("?")[0];
    }
    static idToBinary(num) {
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
    static binaryToID(num) {
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
    static removeMentions(str) {
        return str.replace(/@/g, "@\u200b");
    }
    static cleanContent(str, message) {
        let string = str
            .replace(/<@!?\d+>/g, input => {
            const id = input.replace(/<|!|>|@/g, "");
            const member = message.mentions.members.get(id);
            if (member) {
                return Util.removeMentions(`@${member.displayName}`);
            }
            else {
                const user = message.mentions.users.get(id);
                return user ? Util.removeMentions(`@${user.username}`) : input;
            }
        })
            .replace(/<#\d+>/g, () => {
            return "#deleted-channel";
        })
            .replace(/<@&\d+>/g, input => {
            var _a;
            const id = input.replace(/<|!|>|@|&/g, "");
            const member = message.mentions.members.find(m => m.roles.has(id)) || (message.member && message.member.roles.has(id) ? message.member : null);
            return `@${member ? ((_a = member.roles.get(id)) === null || _a === void 0 ? void 0 : _a.name) || "deleted-role" : "deleted-role"}`;
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
    static cleanCodeBlockContent(text) {
        return text.replace(/```/g, "`\u200b``");
    }
    static delayFor(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }
}
module.exports = Util;
