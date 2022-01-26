"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Endpoints_1 = __importDefault(require("snowtransfer/dist/Endpoints"));
const Base_1 = __importDefault(require("./Base"));
const Constants_1 = require("../util/Constants");
const DataResolver_1 = __importDefault(require("../util/DataResolver"));
// @ts-ignore
class GuildTemplate extends Base_1.default {
    constructor(client, data) {
        super(client);
        this._patch(data);
    }
    _patch(data) {
        const PartialGuild = require("./Partial/PartialGuild");
        const User = require("./User");
        this.code = data.code;
        this.name = data.name;
        this.description = data.description;
        this.usageCount = data.usage_count;
        this.creatorId = data.creator_id;
        this.creator = new User(this.client, data.creator);
        this.createdAt = new Date(data.created_at);
        this.updatedAt = new Date(data.updated_at);
        this.guildId = data.source_guild_id;
        this.guild = new PartialGuild(this.client, { id: this.guildId });
        this.serializedGuild = data.serialized_source_guild;
        this.unSynced = "is_dirty" in data ? Boolean(data.is_dirty) : null;
        return this;
    }
    async createGuild(name, icon) {
        const Guild = require("./Guild");
        const { client } = this;
        const data = await client.api.guilds.templates(this.code).post({
            data: {
                name,
                icon: await DataResolver_1.default.resolveImage(icon)
            }
        });
        return new Promise(resolve => {
            const resolveGuild = (guild) => {
                client.off(Constants_1.Events.GUILD_CREATE, handleGuild);
                client.decrementMaxListeners();
                resolve(guild);
            };
            const handleGuild = (guild) => {
                if (guild.id === data.id) {
                    client.clearTimeout(timeout);
                    resolveGuild(guild);
                }
            };
            client.incrementMaxListeners();
            client.on(Constants_1.Events.GUILD_CREATE, handleGuild);
            const timeout = client.setTimeout(() => resolveGuild(new Guild(client, data)), 10000);
        });
    }
    edit(options = {}) {
        return this.client.api
            .guilds(this.guildId)
            .templates(this.code)
            .patch({ data: options })
            .then((data) => this._patch(data));
    }
    delete() {
        return this.client.api
            .guilds(this.guildId)
            .templates(this.code)
            .delete()
            .then(() => this);
    }
    sync() {
        return this.client.api
            .guilds(this.guildId)
            .templates(this.code)
            .put()
            .then((data) => this._patch(data));
    }
    get createdTimestamp() {
        return this.createdAt.getTime();
    }
    get updatedTimestamp() {
        return this.updatedAt.getTime();
    }
    get url() {
        return `${Endpoints_1.default.BASE_HOST}${Endpoints_1.default.BASE_URL}/guilds/templates/${this.code}`;
    }
    toString() {
        return this.code;
    }
}
GuildTemplate.GUILD_TEMPLATES_PATTERN = /discord(?:app)?\.(?:com\/template|new)\/([\w-]{2,255})/gi;
GuildTemplate.default = GuildTemplate;
module.exports = GuildTemplate;
