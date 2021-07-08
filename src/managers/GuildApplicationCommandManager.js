"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ApplicationCommandManager_1 = __importDefault(require("./ApplicationCommandManager"));
const errors_1 = require("../errors");
const Collection_1 = __importDefault(require("../util/Collection"));
const Constants_1 = require("../util/Constants");
class GuildApplicationCommandManager extends ApplicationCommandManager_1.default {
    constructor(guild, iterable) {
        super(guild.client, iterable);
        this.guild = guild;
    }
    async fetchPermissions(command) {
        if (command) {
            const id = this.resolveID(command);
            if (!id)
                throw new errors_1.TypeError("INVALID_TYPE", "command", "ApplicationCommandResolvable");
            const d = await this.commandPath(id).permissions.get();
            return d.permissions.map((perm) => this.constructor.transformPermissions(perm, true));
        }
        const data = await this.commandPath.permissions.get();
        return data.reduce((coll, perm) => coll.set(perm.id, perm.permissions.map((p) => this.constructor.transformPermissions(p, true))), new Collection_1.default());
    }
    async setPermissions(command, permissions) {
        const id = this.resolveID(command);
        if (id) {
            const data = await this.commandPath(id).permissions.put({
                data: { permissions: permissions.map(perm => this.constructor.transformPermissions(perm)) }
            });
            return data.permissions.map((perm) => this.constructor.transformPermissions(perm, true));
        }
        const data = await this.commandPath.permissions.put({
            data: command.map(perm => ({
                id: perm.id,
                permissions: perm.permissions.map(p => this.constructor.transformPermissions(p))
            }))
        });
        return data.reduce((coll, perm) => coll.set(perm.id, perm.permissions.map((p) => this.constructor.transformPermissions(p, true))), new Collection_1.default());
    }
    static transformPermissions(permissions, received) {
        return {
            id: permissions.id,
            permission: permissions.permission,
            type: typeof permissions.type === "number" && !received
                ? permissions.type
                : Constants_1.ApplicationCommandPermissionTypes[permissions.type]
        };
    }
}
Symbol.species;
GuildApplicationCommandManager.default = GuildApplicationCommandManager;
module.exports = GuildApplicationCommandManager;
