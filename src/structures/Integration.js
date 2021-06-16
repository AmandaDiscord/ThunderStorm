"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Base_1 = __importDefault(require("./Base"));
const IntegrationApplication_1 = __importDefault(require("./IntegrationApplication"));
const Collection_1 = __importDefault(require("../util/Collection"));
class Integration extends Base_1.default {
    constructor(client, data, guild) {
        super(client);
        this.roles = new Collection_1.default();
        const PartialRole = require("./Partial/PartialRole");
        const User = require("./User");
        this.guild = guild;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.enabled = data.enabled;
        this.syncing = data.syncing;
        this.role = new PartialRole(this.client, data.role_id);
        this.user = data.user ? new User(this.client, data.user) : null;
        this.account = data.account;
        this.syncedAt = data.synced_at;
        this._patch(data);
    }
    _patch(data) {
        this.expireBehavior = data.expire_behavior;
        this.expireGracePeriod = data.expire_grace_period;
        if ("application" in data) {
            if (this.application) {
                this.application._patch(data.application);
            }
            else {
                this.application = new IntegrationApplication_1.default(this.client, data.application);
            }
        }
        else if (!this.application) {
            this.application = null;
        }
    }
    sync() {
        this.syncing = true;
        return this.client.api
            .guilds(this.guild.id)
            .integrations(this.id)
            .post()
            .then(() => {
            this.syncing = false;
            this.syncedAt = Date.now();
            return this;
        });
    }
    edit(data, reason) {
        const payload = {};
        if ("expireBehavior" in data) {
            payload.expire_behavior = data.expireBehavior;
        }
        if ("expireGracePeriod" in data) {
            payload.expire_grace_period = data.expireGracePeriod;
        }
        // The option enable_emoticons is only available for Twitch at this moment
        return this.client.api
            .guilds(this.guild.id)
            .integrations(this.id)
            .patch({ payload, reason })
            .then(() => {
            this._patch(data);
            return this;
        });
    }
    delete(reason) {
        return this.client.api
            .guilds(this.guild.id)
            .integrations(this.id)
            .delete({ reason })
            .then(() => this);
    }
    toJSON() {
        // @ts-ignore
        return super.toJSON({ role: "roleID", guild: "guildID", user: "userID" });
    }
}
module.exports = Integration;
