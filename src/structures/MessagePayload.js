"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseMessageComponent_1 = __importDefault(require("./BaseMessageComponent"));
const MessageEmbed_1 = __importDefault(require("./MessageEmbed"));
const errors_1 = require("../errors");
const Constants_1 = require("../util/Constants");
const DataResolver_1 = __importDefault(require("../util/DataResolver"));
const MessageFlags_1 = __importDefault(require("../util/MessageFlags"));
const Util_1 = __importDefault(require("../util/Util"));
class MessagePayload {
    constructor(target, options) {
        this.data = null;
        this.files = null;
        this.target = target;
        this.options = options;
    }
    get isWebhook() {
        const Webhook = require("./Webhook");
        const WebhookClient = require("../client/WebhookClient");
        return this.target instanceof Webhook || this.target instanceof WebhookClient;
    }
    get isUser() {
        const User = require("./User");
        const GuildMember = require("./GuildMember");
        return this.target instanceof User || this.target instanceof GuildMember;
    }
    get isMessage() {
        const Message = require("./Message");
        return this.target instanceof Message;
    }
    get isInteraction() {
        const Interaction = require("./Interaction");
        const InteractionWebhook = require("./InteractionWebhook");
        return this.target instanceof Interaction || this.target instanceof InteractionWebhook;
    }
    makeContent() {
        let content;
        if (this.options.content === null) {
            content = "";
        }
        else if (typeof this.options.content !== "undefined") {
            // @ts-ignore
            content = Util_1.default.verifyString(this.options.content, errors_1.RangeError, "MESSAGE_CONTENT_TYPE", false);
        }
        if (typeof content !== "string")
            return content;
        const isSplit = typeof this.options.split !== "undefined" && this.options.split !== false;
        const isCode = typeof this.options.code !== "undefined" && this.options.code !== false;
        const splitOptions = isSplit ? { ...this.options.split } : undefined;
        if (content) {
            if (isCode) {
                const codeName = typeof this.options.code === "string" ? this.options.code : "";
                content = `\`\`\`${codeName}\n${Util_1.default.cleanCodeBlockContent(content)}\n\`\`\``;
                if (isSplit) {
                    splitOptions.prepend = `${splitOptions.prepend || ""}\`\`\`${codeName}\n`;
                    splitOptions.append = `\n\`\`\`${splitOptions.append || ""}`;
                }
            }
            if (isSplit) {
                content = Util_1.default.splitMessage(content, splitOptions);
            }
        }
        return content;
    }
    resolveData() {
        var _a;
        if (this.data)
            return this;
        const isInteraction = this.isInteraction;
        const isWebhook = this.isWebhook;
        const content = this.makeContent();
        const tts = Boolean(this.options.tts);
        let nonce;
        if (typeof this.options.nonce !== "undefined") {
            nonce = this.options.nonce;
            if (typeof nonce === "number" ? !Number.isInteger(nonce) : typeof nonce !== "string") {
                throw new errors_1.RangeError("MESSAGE_NONCE_TYPE");
            }
        }
        // @ts-ignore Something about Union is not compatible
        const components = (this.options.components || []).map(c => BaseMessageComponent_1.default.create(Array.isArray(c) ? { type: Constants_1.MessageComponentTypes.ACTION_ROW, components: c } : c).toJSON());
        let username;
        let avatarURL;
        if (isWebhook) {
            username = this.options.username || this.target.name;
            if (this.options.avatarURL)
                avatarURL = this.options.avatarURL;
        }
        let flags;
        if (this.isMessage) {
            flags = this.options.flags != null ? Number(new MessageFlags_1.default(this.options.flags).bitfield) : Number(this.target.flags.bitfield);
        }
        else if (isInteraction && this.options.ephemeral) {
            flags = Number(MessageFlags_1.default.FLAGS.EPHEMERAL);
        }
        let allowedMentions = this.options.allowedMentions;
        if (allowedMentions) {
            allowedMentions = Util_1.default.cloneObject(allowedMentions);
            // @ts-ignore
            allowedMentions.replied_user = allowedMentions.repliedUser;
            delete allowedMentions.repliedUser;
        }
        let message_reference;
        if (typeof this.options.reply === "object") {
            // @ts-ignore
            const message_id = (this.options.reply.messageReference).id || this.options.reply.messageReference;
            if (message_id) {
                message_reference = {
                    message_id,
                    fail_if_not_exists: (_a = this.options.reply.failIfNotExists) !== null && _a !== void 0 ? _a : true
                };
            }
        }
        this.data = {
            content,
            tts,
            nonce,
            embeds: (this.options.embeds || []).map(embed => embed instanceof MessageEmbed_1.default ? embed.toJSON() : new MessageEmbed_1.default(embed).toJSON()),
            components,
            username,
            avatar_url: avatarURL,
            allowed_mentions: typeof content === "undefined" && typeof message_reference === "undefined" ? undefined : allowedMentions,
            flags,
            message_reference,
            attachments: this.options.attachments
        };
        return this;
    }
    async resolveFiles() {
        var _a, _b;
        if (this.files)
            return this;
        this.files = await Promise.all((_b = (_a = this.options.files) === null || _a === void 0 ? void 0 : _a.map(file => this.constructor.resolveFile(file))) !== null && _b !== void 0 ? _b : []);
        return this;
    }
    split() {
        if (!this.data)
            this.resolveData();
        if (!Array.isArray(this.data.content))
            return [this];
        const messagePayloads = [];
        for (let i = 0; i < this.data.content.length; i++) {
            let data;
            let opt;
            if (i === this.data.content.length - 1) {
                data = { ...this.data, content: this.data.content[i] };
                opt = { ...this.options, content: this.data.content[i] };
            }
            else {
                data = { content: this.data.content[i], tts: this.data.tts, allowed_mentions: this.options.allowedMentions };
                opt = { content: this.data.content[i], tts: this.data.tts, allowedMentions: this.options.allowedMentions };
            }
            const messagePayload = new MessagePayload(this.target, opt);
            messagePayload.data = data;
            messagePayloads.push(messagePayload);
        }
        return messagePayloads;
    }
    static async resolveFile(fileLike) {
        let attachment;
        let name;
        const findName = (thing) => {
            if (typeof thing === "string") {
                return Util_1.default.basename(thing);
            }
            if (thing.path) {
                return Util_1.default.basename(thing.path);
            }
            return "file.jpg";
        };
        const ownAttachment = typeof fileLike === "string" || fileLike instanceof Buffer || typeof fileLike.pipe === "function";
        if (ownAttachment) {
            attachment = fileLike;
            name = findName(attachment);
        }
        else {
            attachment = fileLike.attachment;
            name = fileLike.name || findName(attachment);
        }
        const resource = await DataResolver_1.default.resolveFile(attachment);
        return { attachment, name, file: resource };
    }
    static create(target, options, extra = {}) {
        return new this(target, typeof options !== "object" || options === null ? { content: options, ...extra } : { ...options, ...extra });
    }
}
Symbol.species;
module.exports = MessagePayload;
