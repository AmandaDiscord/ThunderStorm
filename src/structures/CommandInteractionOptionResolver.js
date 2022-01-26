"use strict";
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const errors_1 = require("../errors");
class CommandInteractionOptionResolver {
    constructor(client, options, resolved) {
        var _a, _b, _c, _d;
        this._group = null;
        this._subcommand = null;
        this.client = client;
        this._hoistedOptions = options;
        if (((_a = this._hoistedOptions[0]) === null || _a === void 0 ? void 0 : _a.type) === "SUB_COMMAND_GROUP") {
            this._group = this._hoistedOptions[0].name;
            this._hoistedOptions = (_b = this._hoistedOptions[0].options) !== null && _b !== void 0 ? _b : [];
        }
        if (((_c = this._hoistedOptions[0]) === null || _c === void 0 ? void 0 : _c.type) === "SUB_COMMAND") {
            this._subcommand = this._hoistedOptions[0].name;
            this._hoistedOptions = (_d = this._hoistedOptions[0].options) !== null && _d !== void 0 ? _d : [];
        }
        this.data = Object.freeze([...options]);
        this.resolved = Object.freeze(resolved);
    }
    get(name, required = false) {
        const option = this._hoistedOptions.find(opt => opt.name === name);
        if (!option) {
            if (required) {
                throw new errors_1.TypeError("COMMAND_INTERACTION_OPTION_NOT_FOUND", name);
            }
            return null;
        }
        return option;
    }
    _getTypedOption(name, type, properties, required) {
        const option = this.get(name, required);
        if (!option) {
            return null;
        }
        else if (option.type !== type) {
            throw new errors_1.TypeError("COMMAND_INTERACTION_OPTION_TYPE", name, option.type, type);
        }
        else if (required && properties.every(prop => option[prop] === null || typeof option[prop] === "undefined")) {
            throw new errors_1.TypeError("COMMAND_INTERACTION_OPTION_EMPTY", name, option.type);
        }
        return option;
    }
    getSubcommand(required = true) {
        if (required && !this._subcommand) {
            throw new errors_1.TypeError("COMMAND_INTERACTION_OPTION_NO_SUB_COMMAND");
        }
        return this._subcommand;
    }
    getSubcommandGroup(required = true) {
        if (required && !this._group) {
            throw new errors_1.TypeError("COMMAND_INTERACTION_OPTION_NO_SUB_COMMAND_GROUP");
        }
        return this._group;
    }
    getBoolean(name, required = false) {
        const option = this._getTypedOption(name, "BOOLEAN", ["value"], required);
        return (option === null || option === void 0 ? void 0 : option.value) === undefined ? null : !!option.value;
    }
    getChannel(name, required = false) {
        var _a;
        const option = this._getTypedOption(name, "CHANNEL", ["channel"], required);
        return (_a = option === null || option === void 0 ? void 0 : option.channel) !== null && _a !== void 0 ? _a : null;
    }
    getString(name, required = false) {
        var _a;
        const option = this._getTypedOption(name, "STRING", ["value"], required);
        return (_a = option === null || option === void 0 ? void 0 : option.value) !== null && _a !== void 0 ? _a : null;
    }
    getInteger(name, required = false) {
        var _a;
        const option = this._getTypedOption(name, "INTEGER", ["value"], required);
        return (_a = option === null || option === void 0 ? void 0 : option.value) !== null && _a !== void 0 ? _a : null;
    }
    getNumber(name, required = false) {
        var _a;
        const option = this._getTypedOption(name, "NUMBER", ["value"], required);
        return (_a = option === null || option === void 0 ? void 0 : option.value) !== null && _a !== void 0 ? _a : null;
    }
    getUser(name, required = false) {
        var _a;
        const option = this._getTypedOption(name, "USER", ["user"], required);
        return (_a = option === null || option === void 0 ? void 0 : option.user) !== null && _a !== void 0 ? _a : null;
    }
    getMember(name, required = false) {
        var _a;
        const option = this._getTypedOption(name, "USER", ["member"], required);
        return (_a = option === null || option === void 0 ? void 0 : option.member) !== null && _a !== void 0 ? _a : null;
    }
    getRole(name, required = false) {
        var _a;
        const option = this._getTypedOption(name, "ROLE", ["role"], required);
        return (_a = option === null || option === void 0 ? void 0 : option.role) !== null && _a !== void 0 ? _a : null;
    }
    getMentionable(name, required = false) {
        var _a, _b, _c;
        const option = this._getTypedOption(name, "MENTIONABLE", ["user", "member", "role"], required);
        return (_c = (_b = (_a = option === null || option === void 0 ? void 0 : option.member) !== null && _a !== void 0 ? _a : option === null || option === void 0 ? void 0 : option.user) !== null && _b !== void 0 ? _b : option === null || option === void 0 ? void 0 : option.role) !== null && _c !== void 0 ? _c : null;
    }
    getMessage(name, required = false) {
        var _a;
        const option = this._getTypedOption(name, "_MESSAGE", ["message"], required);
        return (_a = option === null || option === void 0 ? void 0 : option.message) !== null && _a !== void 0 ? _a : null;
    }
    getFocused(getFull = false) {
        const focusedOption = this._hoistedOptions.find(option => option.focused);
        if (!focusedOption)
            throw new errors_1.TypeError("AUTOCOMPLETE_INTERACTION_OPTION_NO_FOCUSED_OPTION");
        return getFull ? focusedOption : focusedOption.value;
    }
}
CommandInteractionOptionResolver.default = CommandInteractionOptionResolver;
module.exports = CommandInteractionOptionResolver;
