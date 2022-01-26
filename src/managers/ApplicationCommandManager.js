"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const BaseManager_1 = __importDefault(require("./BaseManager"));
const errors_1 = require("../errors");
const ApplicationCommand_1 = __importDefault(require("../structures/ApplicationCommand"));
const collection_1 = require("@discordjs/collection");
// @ts-ignore
class ApplicationCommandManager extends BaseManager_1.default {
    constructor(client, iterable) {
        // @ts-ignore
        super(client, iterable, ApplicationCommand_1.default);
    }
    _add(data, cache) {
        return super._add(data, cache, { extras: [this.guild] });
    }
    get commandPath() {
        let path = this.client.api.applications(this.client.application.id);
        if (this.guild)
            path = path.guilds(this.guild.id);
        return path.commands;
    }
    async fetch(id, cache = true, force = false) {
        const PartialGuild = require("../structures/Partial/PartialGuild");
        if (id) {
            if (!force) {
                const existing = this.cache.get(id);
                if (existing)
                    return existing;
            }
            const command = await this.commandPath(id).get();
            return this._add(command, cache);
        }
        const data = await this.commandPath.get();
        return data.reduce((coll, command) => coll.set(command.id, this._add(new ApplicationCommand_1.default(this.client, command, command.guild_id ? new PartialGuild(this.client, { id: command.guild_id }) : undefined), cache)), new collection_1.Collection());
    }
    async create(command) {
        const data = await this.commandPath.post({
            data: this.constructor.transformCommand(command)
        });
        return this._add(data);
    }
    async set(commands) {
        const PartialGuild = require("../structures/Partial/PartialGuild");
        const data = await this.commandPath.put({
            data: commands.map(c => this.constructor.transformCommand(c))
        });
        return data.reduce((coll, command) => coll.set(command.id, this._add(new ApplicationCommand_1.default(this.client, command, command.guild_id ? new PartialGuild(this.client, { id: command.guild_id }) : undefined))), new collection_1.Collection());
    }
    async edit(command, data) {
        const id = this.resolveId(command);
        if (!id)
            throw new errors_1.TypeError("INVALID_TYPE", "command", "ApplicationCommandResolvable");
        const patched = await this.commandPath(id).patch({ data: this.constructor.transformCommand(data) });
        return this._add(patched);
    }
    async delete(command) {
        const id = this.resolveId(command);
        if (!id)
            throw new errors_1.TypeError("INVALID_TYPE", "command", "ApplicationCommandResolvable");
        await this.commandPath(id).delete();
        const cached = this.cache.get(id);
        this.cache.delete(id);
        return cached !== null && cached !== void 0 ? cached : null;
    }
    static transformCommand(command) {
        var _a;
        return {
            name: command.name,
            description: command.description,
            options: (_a = command.options) === null || _a === void 0 ? void 0 : _a.map(o => ApplicationCommand_1.default.transformOption(o)),
            default_permission: command.defaultPermission
        };
    }
}
Symbol.species;
ApplicationCommandManager.default = ApplicationCommandManager;
module.exports = ApplicationCommandManager;
