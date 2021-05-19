"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const centra_1 = __importDefault(require("centra"));
const stream_1 = __importDefault(require("stream"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Util_1 = require("../Util/Util");
async function send(instance, content, options = {}) {
    const PartialBase = require("../Partial/PartialBase");
    const User = require("../User");
    const Channel = require("../Channel");
    const GuildMember = require("../GuildMember");
    const Message = require("../Message"); // lazy load
    let mode;
    if (instance instanceof PartialBase) {
        if (instance.partialType === "Channel" || instance.partialType === "Thread")
            mode = "channel";
        if (instance.partialType === "User")
            mode = "user";
        if (instance.partialType === "Message")
            mode = "message";
    }
    else if (instance instanceof Channel)
        mode = "channel";
    else if (instance instanceof User)
        mode = "user";
    else if (instance instanceof GuildMember)
        mode = "user";
    else if (instance instanceof Message)
        mode = "message";
    const payload = await transform(content, options, mode === "message");
    let ID;
    if (mode == "user")
        ID = await instance.client._snow.user.createDirectMessageChannel(instance.id).then(chan => chan.id);
    else if (mode === "message")
        ID = instance.channel.id;
    else
        ID = instance.id;
    let msg;
    if (mode !== "message")
        msg = await instance.client._snow.channel.createMessage(ID, payload, { disableEveryone: options.disableEveryone || instance.client._snow.options.disableEveryone || false });
    else
        msg = await instance.client._snow.channel.editMessage(ID, instance.id, payload, { disableEveryone: options.disableEveryone || instance.client._snow.options.disableEveryone || false });
    if (mode === "message")
        return msg;
    return new Message(msg, instance.client);
}
exports.send = send;
function deleteMessage(client, channelID, messageID, timeout = 0) {
    return new Promise((res, rej) => {
        const action = () => {
            return client._snow.channel.deleteMessage(channelID, messageID).then(res).catch(rej);
        };
        if (timeout) {
            setTimeout(() => {
                return action();
            }, timeout);
        }
        else {
            action();
        }
    });
}
exports.deleteMessage = deleteMessage;
async function fetchMessage(client, channelID, messageID) {
    const Message = require("../Message"); // lazy load
    const data = await client._snow.channel.getChannelMessage(channelID, messageID);
    return new Message(data, client);
}
exports.fetchMessage = fetchMessage;
async function fetchMessages(client, channelID, options) {
    const Message = require("../Message"); // lazy load
    const data = await client._snow.channel.getChannelMessages(channelID, options);
    return data.map(i => new Message(i, client));
}
exports.fetchMessages = fetchMessages;
async function transform(content, options, isEdit, isWebhook) {
    const MessageEmbed = require("../MessageEmbed");
    const MessageAttachment = require("../MessageAttachment");
    const payload = {};
    const opts = options ? options : {};
    if (content instanceof MessageEmbed) {
        // @ts-ignore
        opts.embed = content;
        content = undefined;
    }
    else if (content instanceof MessageAttachment) {
        // @ts-ignore
        opts.file = content;
        content = undefined;
    }
    else if (Util_1.isObject(content) && !Array.isArray(content) && (content.content || content.embed || content.embeds || content.nonce || content.tts || content.file)) {
        // @ts-ignore
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
    let file = undefined;
    // @ts-ignore Well. Yes. Of course opts.file does not exist on one of the options types. That's why I'm checking if it exists, typescript. Stop being so fn annoying
    if (opts.file) {
        file = {};
        // @ts-ignore
        Object.assign(file, { name: opts.file.name || "file.png" });
        // @ts-ignore
        if (Buffer.isBuffer(opts.file.attachment))
            Object.assign(file, { file: opts.file.attachment });
        // @ts-ignore
        else if (opts.file.attachment instanceof stream_1.default.Readable) {
            // @ts-ignore
            const buf = await getStream(opts.file.attachment);
            Object.assign(file, { file: buf });
            // @ts-ignore
        }
        else if (typeof opts.file.attachment === "string" && opts.file.attachment.startsWith("http")) {
            // @ts-ignore
            const res = await centra_1.default(opts.file.attachment, "get").header("User-Agent", "ThunderStorm (https://github.com/AmandaDiscord/ThunderStorm, 0.1.0)").header("Accept", "*/*").send();
            if (res.statusCode !== 200)
                throw new Error("Non OK status code on get Attachment");
            if (!res.body)
                throw new Error("No body on get Attachment");
            // @ts-ignore
            const decoded = new URL(opts.file.attachment);
            const contentType = res.headers["content-type"];
            if (decoded.pathname.match(/\.\w+$/))
                Object.assign(file, { name: decoded.pathname.match(/\/(\w+%-\.\w+$)/)[1] });
            else if (contentType) {
                let type = "png";
                const split = contentType.split("/");
                if (contentType === "text/plain")
                    type = "txt";
                else if (contentType === "image/jpeg")
                    type = "jpg";
                else if (contentType === "audio/mpeg")
                    type = "mp3";
                else if (contentType === "audio/vorbis")
                    type = "ogg";
                else
                    type = split[1];
                Object.assign(file, { name: `file.${type}` });
            }
            Object.assign(file, { file: res.body });
            // @ts-ignore
        }
        else if (typeof opts.file.attachment === "string" && (path_1.default.isAbsolute(opts.file.attachment) || opts.file.attachment.startsWith("."))) {
            // @ts-ignore
            const dir = path_1.default.isAbsolute(opts.file.attachment) ? opts.file.attachment : path_1.default.join(process.cwd(), opts.file.attachment);
            const buf = await fs_1.default.promises.readFile(dir);
            // @ts-ignore
            Object.assign(file, { name: path_1.default.basename(opts.file.attachment), file: buf });
            // @ts-ignore
        }
        else
            Object.assign(file, { name: opts.file.name || "file.png", file: Buffer.from(opts.file.attachment) });
    }
    payload["content"] = opts.content || content || "";
    // @ts-ignore
    if (isWebhook)
        payload["embeds"] = opts.embeds ? opts.embeds.map(e => e.toJSON()) : (opts.embed ? opts.embed.toJSON() : undefined);
    // @ts-ignore
    else
        payload["embed"] = opts.embed ? opts.embed.toJSON() : undefined;
    // @ts-ignore
    payload["nonce"] = opts.nonce;
    payload["tts"] = opts.tts || false;
    if (opts.allowedMentions)
        payload["allowed_mentions"] = opts.allowedMentions;
    // @ts-ignore
    if (isEdit && opts.suppress)
        payload["flags"] = 4;
    // @ts-ignore
    if (opts.ephemeral)
        payload["flags"] = 64;
    payload["file"] = file ? file : undefined;
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
    if (payload["embeds"] || payload["embed"]) {
        for (const embed of payload["embeds"] || [payload["embed"]]) {
            delete embed["type"];
            for (const prop in embed) {
                if (embed[prop] === null || embed[prop] === undefined || (Array.isArray(embed[prop]) && embed[prop].length === 0)) {
                    delete embed[prop];
                }
            }
        }
    }
    return payload;
}
exports.transform = transform;
function getStream(readable) {
    return new Promise(res => {
        const chunks = [];
        const fn = (chunk) => {
            chunks.push(chunk);
        };
        readable.on("data", fn);
        readable.once("end", () => {
            readable.removeListener("data", fn);
            res(Buffer.concat(chunks));
        });
    });
}
function sendTyping(client, channelID) {
    return client._snow.channel.startChannelTyping(channelID);
}
exports.sendTyping = sendTyping;
exports.default = { send, sendTyping, deleteMessage, fetchMessage, fetchMessages, transform };
