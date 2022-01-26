"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const BaseMessageComponent_1 = __importDefault(require("./BaseMessageComponent"));
const errors_1 = require("../errors");
const Constants_1 = require("../util/Constants");
const Util_1 = __importDefault(require("../util/Util"));
class MessageButton extends BaseMessageComponent_1.default {
    constructor(data) {
        super({ type: "BUTTON" });
        this.setup(data);
    }
    setup(data) {
        var _a, _b, _c, _d, _e;
        this.label = (_a = data.label) !== null && _a !== void 0 ? _a : null;
        this.customId = (_c = (_b = data.custom_id) !== null && _b !== void 0 ? _b : data.customId) !== null && _c !== void 0 ? _c : null;
        this.style = data.style ? MessageButton.resolveStyle(data.style) : null;
        if (!data.emoji)
            this.emoji = null;
        // @ts-ignore
        else
            this.setEmoji(data.emoji);
        this.url = (_d = data.url) !== null && _d !== void 0 ? _d : null;
        this.disabled = (_e = data.disabled) !== null && _e !== void 0 ? _e : false;
    }
    setCustomId(customId) {
        this.customId = Util_1.default.verifyString(customId, errors_1.RangeError, "BUTTON_CUSTOM_ID");
        return this;
    }
    setDisabled(disabled) {
        this.disabled = disabled;
        return this;
    }
    setEmoji(emoji) {
        if (typeof emoji === "string" && /^\d+$/.test(emoji))
            this.emoji = { id: emoji };
        else if (typeof emoji === "string")
            this.emoji = Util_1.default.parseEmoji(`${emoji}`);
        else
            this.emoji = { id: emoji.id || emoji.id || "", name: emoji.name, animated: emoji.animated };
        return this;
    }
    setLabel(label) {
        this.label = Util_1.default.verifyString(label, errors_1.RangeError, "BUTTON_LABEL");
        return this;
    }
    setStyle(style) {
        this.style = MessageButton.resolveStyle(style);
        return this;
    }
    setURL(url) {
        this.url = Util_1.default.verifyString(url, errors_1.RangeError, "BUTTON_URL");
        return this;
    }
    toJSON() {
        return {
            custom_id: this.customId,
            disabled: this.disabled,
            emoji: this.emoji,
            label: this.label,
            style: Constants_1.MessageButtonStyles[this.style],
            type: Constants_1.MessageComponentTypes[this.type],
            url: this.url
        };
    }
    static resolveStyle(style) {
        return typeof style === "string" ? style : Constants_1.MessageButtonStyles[style];
    }
}
MessageButton.default = MessageButton;
module.exports = MessageButton;
