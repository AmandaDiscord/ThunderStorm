"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTyping = exports.transform = exports.fetchMessage = exports.deleteMessage = exports.send = void 0;
const Util_1 = require("../Util/Util");
async function send(instance, content, options = {}) {
    const PartialBase = require("../Partial/PartialBase");
    const User = require("../User");
    const Channel = require("../Channel");
    const GuildMember = require("../GuildMember");
    const Message = require("../Message");
    let mode;
    const payload = transform(content, options);
    if (instance instanceof PartialBase) {
        if (instance.partialType == "Channel")
            mode = "channel";
        if (instance.partialType == "User")
            mode = "user";
    }
    else if (instance instanceof Channel)
        mode = "channel";
    else if (instance instanceof User)
        mode = "user";
    else if (instance instanceof GuildMember)
        mode = "user";
    let ID;
    if (mode == "user")
        ID = await instance.client._snow.user.createDirectMessageChannel(instance.id).then(chan => chan.id || chan.Id);
    else
        ID = instance.id;
    const msg = await instance.client._snow.channel.createMessage(ID, payload, { disableEveryone: options.disableEveryone || instance.client._snow.options.disableEveryone || false });
    return new Message(msg, instance.client);
}
exports.send = send;
function deleteMessage(client, channelID, messageID, timeout = 0) {
    return new Promise((res, rej) => {
        const action = async () => {
            await client._snow.channel.deleteMessage(channelID, messageID).catch(rej);
            return;
        };
        if (timeout) {
            setTimeout(() => {
                return res(action());
            }, timeout);
        }
        else {
            res(action());
        }
    });
}
exports.deleteMessage = deleteMessage;
async function fetchMessage(client, channelID, messageID) {
    const Message = (await Promise.resolve().then(() => __importStar(require("../Message")))).default;
    return client._snow.channel.getChannelMessage(channelID, messageID).then(data => new Message(data, client));
}
exports.fetchMessage = fetchMessage;
function transform(content, options = {}, isEdit = false) {
    const MessageEmbed = require("../MessageEmbed");
    const payload = {};
    if (Util_1.isObject(content) && !Array.isArray(content) && (content.content || content.embed || content.nonce || content.tts || content.file)) {
        if (content.attachment)
            options.file = content;
        else
            options = content;
        content = undefined;
    }
    else if (content instanceof MessageEmbed) {
        options.embed = content;
        content = undefined;
    }
    else if (Array.isArray(content)) {
        content = content.join("\n");
    }
    else
        content = String(content);
    payload["content"] = options.content || content || "";
    payload["embed"] = options.embed ? options.embed.toJSON() : undefined;
    payload["nonce"] = options.nonce;
    payload["tts"] = options.tts || false;
    payload["file"] = options.file ? { name: options.file.name || "file.png", file: options.file.attachment } : undefined;
    if (isEdit && !payload["content"])
        payload["content"] = null;
    if ((!payload["content"] && !isEdit) || (payload["content"] === ""))
        delete payload["content"];
    if (!payload["embed"])
        delete payload["embed"];
    if (!payload["nonce"])
        delete payload["nonce"];
    if (!payload["tts"])
        delete payload["tts"];
    if (!payload["file"])
        delete payload["file"];
    if (payload["embed"]) {
        delete payload["embed"]["type"];
        for (const prop in payload["embed"]) {
            if (payload["embed"][prop] === null || payload["embed"][prop] === undefined || (Array.isArray(payload["embed"][prop]) && payload["embed"][prop].length === 0)) {
                delete payload["embed"][prop];
            }
        }
    }
    return payload;
}
exports.transform = transform;
function sendTyping(client, channelID) {
    return client._snow.channel.startChannelTyping(channelID);
}
exports.sendTyping = sendTyping;
exports.default = { send, sendTyping, deleteMessage, fetchMessage, transform };
