"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
const Collection_1 = __importDefault(require("./Util/Collection"));
class InteractionCommand {
    constructor(message, data) {
        this.users = new Collection_1.default();
        this.members = new Collection_1.default();
        this.channels = new Collection_1.default();
        this.roles = new Collection_1.default();
        this.options = new Collection_1.default();
        this.message = message;
        this._patch(data);
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            options: [...this.options.values()].map(o => o.toJSON()),
            resolved: {
                users: [...this.users.values()].map(u => u.toJSON()),
                members: [...this.members.values()].map(m => m.toJSON()),
                roles: [...this.roles.values()].map(r => r.toJSON()),
                channels: [...this.channels.values()].map(c => c.toJSON())
            }
        };
    }
    _patch(data) {
        var _a, _b;
        const CommandOption = require("./CommandOption");
        const User = require("./User");
        const GuildMember = require("./GuildMember");
        const Role = require("./Role");
        const PartialChannel = require("./Partial/PartialChannel");
        if (data.id)
            this.id = data.id;
        if (data.name)
            this.name = data.name;
        if (data.options) {
            this.options.clear();
            for (const option of data.options)
                this.options.set(option.name, new CommandOption(this, option));
        }
        if (data.resolved) {
            if (data.resolved.users) {
                this.users.clear();
                for (const id of Object.keys(data.resolved.users))
                    this.users.set(id, new User(data.resolved.users[id], this.message.client));
            }
            if (data.resolved.members) {
                this.members.clear();
                for (const id of Object.keys(data.resolved.members))
                    this.members.set(id, new GuildMember(Object.assign({}, data.resolved.members[id], { user: data.resolved.users && data.resolved.users[id] ? data.resolved.users[id] : { id: id, avatar: null, username: "Deleted User", discriminator: "0000" } }, { guild_id: (_a = this.message.guild) === null || _a === void 0 ? void 0 : _a.id }), this.message.client));
            }
            if (data.resolved.roles) {
                this.roles.clear();
                for (const id of Object.keys(data.resolved.roles))
                    this.roles.set(id, new Role(Object.assign({}, data.resolved.roles[id], { guild_id: (_b = this.message.guild) === null || _b === void 0 ? void 0 : _b.id }), this.message.client));
            }
            if (data.resolved.channels) {
                this.channels.clear();
                for (const id of Object.keys(data.resolved.channels)) {
                    const c = data.resolved.channels[id];
                    // @ts-ignore
                    this.channels.set(id, new PartialChannel({ id: c.id, name: c.name, type: Constants_1.default.CHANNEL_TYPES[c.type], permissions: c.permissions }, this.message.client));
                }
            }
        }
    }
}
module.exports = InteractionCommand;
