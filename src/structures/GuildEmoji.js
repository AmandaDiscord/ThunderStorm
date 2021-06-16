"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Collection_1 = __importDefault(require("../util/Collection"));
const BaseGuildEmoji_1 = __importDefault(require("./BaseGuildEmoji"));
const errors_1 = require("../errors");
const PartialRole_1 = __importDefault(require("./Partial/PartialRole"));
class GuildEmoji extends BaseGuildEmoji_1.default {
    constructor(client, data, guild) {
        super(client, data, guild);
        this.author = null;
    }
    _clone() {
        const clone = super._clone();
        clone._roles = this._roles.slice();
        return clone;
    }
    _patch(data) {
        super._patch(data);
    }
    get roles() {
        return new Collection_1.default(this._roles.map(i => [i, new PartialRole_1.default(this.client, { id: i, guild_id: this.guild.id })]));
    }
    async fetchAuthor() {
        if (this.managed) {
            throw new errors_1.Error("EMOJI_MANAGED");
        }
        const data = await this.client._snow.emoji.getEmoji(this.guild.id, this.id);
        this._patch(data);
        return this.author;
    }
    async edit(data) {
        // @ts-ignore
        const roles = data.roles ? data.roles.map(r => r.id || r) : undefined;
        const newData = await this.client._snow.emoji.updateEmoji(this.guild.id, this.id, { name: data.name, roles });
        const clone = this._clone();
        clone._patch(newData);
        return clone;
    }
    setName(name) {
        return this.edit({ name });
    }
    async delete() {
        await this.client._snow.emoji.deleteEmoji(this.guild.id, this.id);
        return this;
    }
    equals(other) {
        if (other instanceof GuildEmoji) {
            return (other.id === this.id &&
                other.name === this.name &&
                other.managed === this.managed &&
                other.available === this.available &&
                other.requiresColons === this.requiresColons &&
                other.roles.size === this.roles.size &&
                other.roles.every(role => this.roles.has(role.id)));
        }
        else {
            return (other.id === this.id &&
                other.name === this.name &&
                !!other.roles &&
                other.roles.length === this.roles.size &&
                other.roles.every(role => this.roles.has(role)));
        }
    }
}
module.exports = GuildEmoji;
