"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const collection_1 = require("@discordjs/collection");
const SnowflakeUtil_1 = __importDefault(require("../util/SnowflakeUtil"));
const Base_1 = __importDefault(require("./Base"));
const TeamMember_1 = __importDefault(require("./TeamMember"));
// @ts-ignore
class Team extends Base_1.default {
    constructor(client, data) {
        super(client);
        this.icon = null;
        this.members = new collection_1.Collection();
        if (data)
            this._patch(data);
    }
    get createdTimestamp() {
        return SnowflakeUtil_1.default.deconstruct(this.id).timestamp;
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    get owner() {
        return this.ownerId ? this.members.get(this.ownerId) : null;
    }
    iconURL(options = { size: 128, format: "png" }) {
        if (!this.icon)
            return null;
        return this.client.rest.cdn.TeamIcon(this.id, this.icon, options);
    }
    toString() {
        return this.name || "Team";
    }
    toJSON() {
        return {
            id: this.id,
            icon: this.icon,
            name: this.name,
            owner_user_id: this.ownerId,
            members: [...this.members.values()].map(member => member.toJSON())
        };
    }
    _patch(data) {
        if (data.id)
            this.id = data.id;
        if (!this.name || data.name !== undefined)
            this.name = data.name || "";
        if (!this.icon || data.icon !== undefined)
            this.icon = data.icon || null;
        if (data.owner_user_id !== undefined)
            this.ownerId = data.owner_user_id;
        if (data.members && Array.isArray(data.members)) {
            this.members.clear();
            for (const member of data.members)
                this.members.set(member.user.id, new TeamMember_1.default(this, member));
        }
        super._patch(data);
    }
}
Team.default = Team;
module.exports = Team;
