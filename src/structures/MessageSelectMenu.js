"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const BaseMessageComponent_1 = __importDefault(require("./BaseMessageComponent"));
const Constants_1 = require("../util/Constants");
const Util_1 = __importDefault(require("../util/Util"));
class MessageSelectMenu extends BaseMessageComponent_1.default {
    // @ts-ignore
    constructor(data = {}) {
        super({ type: "SELECT_MENU" });
        this.setup(data);
    }
    setup(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.customId = (_b = (_a = data.custom_id) !== null && _a !== void 0 ? _a : data.customId) !== null && _b !== void 0 ? _b : null;
        this.placeholder = (_c = data.placeholder) !== null && _c !== void 0 ? _c : null;
        this.minValues = (_e = (_d = data.min_values) !== null && _d !== void 0 ? _d : data.minValues) !== null && _e !== void 0 ? _e : null;
        this.maxValues = (_g = (_f = data.max_values) !== null && _f !== void 0 ? _f : data.maxValues) !== null && _g !== void 0 ? _g : null;
        // @ts-ignore
        this.options = this.constructor.normalizeOptions((_h = data.options) !== null && _h !== void 0 ? _h : []);
        this.disabled = (_j = data.disabled) !== null && _j !== void 0 ? _j : false;
    }
    setCustomId(customId) {
        this.customId = Util_1.default.verifyString(customId, RangeError, "SELECT_MENU_CUSTOM_ID");
        return this;
    }
    setDisabled(disabled = true) {
        this.disabled = disabled;
        return this;
    }
    setMaxValues(maxValues) {
        this.maxValues = maxValues;
        return this;
    }
    setMinValues(minValues) {
        this.minValues = minValues;
        return this;
    }
    setPlaceholder(placeholder) {
        this.placeholder = Util_1.default.verifyString(placeholder, RangeError, "SELECT_MENU_PLACEHOLDER");
        return this;
    }
    addOptions(...options) {
        // @ts-ignore
        this.options.push(...this.constructor.normalizeOptions(options));
        return this;
    }
    setOptions(...options) {
        // @ts-ignore
        this.spliceOptions(0, this.options.length, options);
        return this;
    }
    spliceOptions(index, deleteCount, ...options) {
        this.options.splice(index, deleteCount, ...this.constructor.normalizeOptions(...options));
        return this;
    }
    toJSON() {
        var _a;
        return {
            custom_id: this.customId,
            disabled: this.disabled,
            placeholder: this.placeholder,
            min_values: this.minValues,
            max_values: (_a = this.maxValues) !== null && _a !== void 0 ? _a : (this.minValues ? this.options.length : undefined),
            options: this.options,
            type: typeof this.type === "string" ? Constants_1.MessageComponentTypes[this.type] : this.type
        };
    }
    static normalizeOption(option) {
        var _a;
        let { label, value, description, emoji } = option;
        label = Util_1.default.verifyString(label, RangeError, "SELECT_OPTION_LABEL");
        value = Util_1.default.verifyString(value, RangeError, "SELECT_OPTION_VALUE");
        // @ts-ignore
        emoji = emoji ? Util_1.default.resolvePartialEmoji(emoji) : null;
        // @ts-ignore
        description = description ? Util_1.default.verifyString(description, RangeError, "SELECT_OPTION_DESCRIPTION", true) : null;
        // @ts-ignore
        return { label, value, description, emoji, default: (_a = option.default) !== null && _a !== void 0 ? _a : false };
    }
    static normalizeOptions(...options) {
        return options.flat(Infinity).map(option => this.normalizeOption(option));
    }
}
Symbol.species;
MessageSelectMenu.default = MessageSelectMenu;
module.exports = MessageSelectMenu;
