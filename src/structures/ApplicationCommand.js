"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Base_1 = __importDefault(require("./Base"));
const Constants_1 = require("../util/Constants");
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
class ApplicationCommand extends Base_1.default {
    constructor(client, data, guild) {
        super(client);
        this.id = data.id;
        this.guild = (guild !== null && guild !== void 0 ? guild : null);
        this._patch(data);
    }
    _patch(data) {
        var _a, _b;
        this.name = data.name;
        this.description = data.description;
        this.options = (_b = (_a = data.options) === null || _a === void 0 ? void 0 : _a.map(o => this.constructor.transformOption(o, true)), (_b !== null && _b !== void 0 ? _b : []));
        this.defaultPermission = data.default_permission;
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    get manager() {
        var _a;
        return (_a = this.guild, (_a !== null && _a !== void 0 ? _a : this.client.application)).commands;
    }
    edit(data) {
        return this.manager.edit(this, data);
    }
    delete() {
        return this.manager.delete(this);
    }
    fetchPermissions() {
        const { Error } = require("../errors");
        if (!this.guild)
            throw new Error("GLOBAL_COMMAND_PERMISSIONS");
        return this.manager.fetchPermissions(this);
    }
    setPermissions(permissions) {
        const { Error } = require("../errors");
        if (!this.guild)
            throw new Error("GLOBAL_COMMAND_PERMISSIONS");
        return this.manager.setPermissions(this, permissions);
    }
    static transformOption(option, received) {
        var _a;
        return {
            type: typeof option.type === "number" && !received ? option.type : Constants_1.ApplicationCommandOptionTypes[option.type],
            name: option.name,
            description: option.description,
            required: option.required,
            choices: option.choices,
            options: (_a = option.options) === null || _a === void 0 ? void 0 : _a.map(o => this.transformOption(o, received))
        };
    }
}
ApplicationCommand.default = ApplicationCommand;
module.exports = ApplicationCommand;
