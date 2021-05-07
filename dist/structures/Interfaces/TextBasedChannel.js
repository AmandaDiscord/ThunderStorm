"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        if (instance.partialType === "Channel" || instance.partialType === "Thread")
            mode = "channel";
        if (instance.partialType === "User")
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
        ID = await instance.client._snow.user.createDirectMessageChannel(instance.id).then(chan => chan.id);
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
    const Message = require("../Message");
    const data = await client._snow.channel.getChannelMessage(channelID, messageID);
    return new Message(data, client);
}
exports.fetchMessage = fetchMessage;
async function fetchMessages(client, channelID, options) {
    const Message = require("../Message");
    const data = await client._snow.channel.getChannelMessages(channelID, options);
    return data.map(i => new Message(i, client));
}
exports.fetchMessages = fetchMessages;
function transform(content, options, isEdit) {
    const MessageEmbed = require("../MessageEmbed");
    const MessageAttachment = require("../MessageAttachment");
    const payload = {};
    const opts = options ? options : {};
    if (content instanceof MessageEmbed) {
        opts.embed = content;
        content = undefined;
    }
    else if (content instanceof MessageAttachment) {
        opts.file = content;
        content = undefined;
    }
    else if (Util_1.isObject(content) && !Array.isArray(content) && (content.content || content.embed || content.nonce || content.tts || content.file)) {
        if (content.attachment)
            opts.file = content;
        else
            Object.assign(opts, content);
        if (content.disableEveryone !== undefined)
            opts.disableEveryone = content.disableEveryone;
        content = undefined;
    }
    else if (Array.isArray(content)) {
        content = content.join("\n");
    }
    else
        content = String(content);
    payload["content"] = opts.content || content || "";
    payload["embed"] = opts.embed ? opts.embed.toJSON() : undefined;
    payload["nonce"] = opts.nonce;
    payload["tts"] = opts.tts || false;
    payload["file"] = opts.file ? { name: opts.file.name || "file.png", file: opts.file.attachment.toString() } : undefined;
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
exports.default = { send, sendTyping, deleteMessage, fetchMessage, fetchMessages, transform };
