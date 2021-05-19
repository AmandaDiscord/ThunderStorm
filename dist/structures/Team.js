"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Constants_1 = __importDefault(require("../Constants"));
const Collection_1 = __importDefault(require("./Util/Collection"));
const Base_1 = __importDefault(require("./Base"));
const TeamMember_1 = __importDefault(require("./TeamMember"));
class Team extends Base_1.default {
    constructor(data, client) {
        super(data, client);
        this.icon = null;
        this.members = new Collection_1.default();
        // @ts-ignore Discord.js docs name even though the typings doesn't declare a name???
        if (!this.name || data.name !== undefined)
            this.name = data.name || null;
        if (!this.icon || data.icon !== undefined)
            this.icon = data.icon || null;
        if (data.owner_user_id !== undefined)
            this.ownerID = data.owner_user_id;
        if (data.members && Array.isArray(data.members)) {
            this.members.clear();
            for (const member of data.members)
                this.members.set(member.user.id, new TeamMember_1.default(this, member));
        }
    }
    get owner() {
        return this.ownerID ? this.members.get(this.ownerID) : null;
    }
    iconURL(options = { size: 128, format: "png", dynamic: true }) {
        if (!this.icon)
            return null;
        return `${Constants_1.default.BASE_CDN_URL}/team-icons/${this.id}/${this.icon}.${options.format || "png"}${!["webp"].includes(options.format) ? `?size=${options.size || 128}` : ""}`;
    }
    toString() {
        return this.name || "Team";
    }
    toJSON() {
        return {
            id: this.id,
            icon: this.icon,
            name: this.name,
            owner_user_id: this.ownerID,
            members: [...this.members.values()].map(member => member.toJSON())
        };
    }
    _patch(data) {
        if (!this.name || data.name !== undefined)
            this.name = data.name || "";
        if (!this.icon || data.icon !== undefined)
            this.icon = data.icon || null;
        if (data.owner_user_id !== undefined)
            this.ownerID = data.owner_user_id;
        if (data.members && Array.isArray(data.members)) {
            this.members.clear();
            for (const member of data.members)
                this.members.set(member.user.id, new TeamMember_1.default(this, member));
        }
        super._patch(data);
    }
}
module.exports = Team;
