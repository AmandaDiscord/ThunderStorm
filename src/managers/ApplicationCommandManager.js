"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseManager_1 = __importDefault(require("./BaseManager"));
const errors_1 = require("../errors");
const ApplicationCommand_1 = __importDefault(require("../structures/ApplicationCommand"));
const Collection_1 = __importDefault(require("../util/Collection"));
class ApplicationCommandManager extends BaseManager_1.default {
    constructor(client, iterable) {
        super(client, iterable, ApplicationCommand_1.default);
    }
    _add(data, cache) {
        // @ts-ignore
        return super._add(data, cache, { extras: [this.guild] });
    }
    get commandPath() {
        var _a;
        let path = this.client.api.applications((_a = this.client.application) === null || _a === void 0 ? void 0 : _a.id);
        // @ts-ignore
        if (this.guild)
            path = path.guilds(this.guild.id);
        return path.commands;
    }
    async fetch(id, cache = true, force = false) {
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
        // @ts-ignore
        return data.reduce((coll, command) => coll.set(command.id, this._add(command, cache)), new Collection_1.default());
    }
    async create(command) {
        const data = await this.commandPath.post({
            data: this.constructor.transformCommand(command)
        });
        return this._add(data);
    }
    async set(commands) {
        const data = await this.commandPath.put({
            data: commands.map(c => this.constructor.transformCommand(c))
        });
        // @ts-ignore
        return data.reduce((coll, command) => coll.set(command.id, this._add(command)), new Collection_1.default());
    }
    async edit(command, data) {
        const id = this.resolveID(command);
        if (!id)
            throw new errors_1.TypeError("INVALID_TYPE", "command", "ApplicationCommandResolvable");
        const patched = await this.commandPath(id).patch({ data: this.constructor.transformCommand(data) });
        return this._add(patched);
    }
    async delete(command) {
        const id = this.resolveID(command);
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
