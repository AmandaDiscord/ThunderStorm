"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichPresenceAssets = exports.Activity = exports.Presence = void 0;
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Base_1 = __importDefault(require("./Base"));
const Emoji_1 = __importDefault(require("./Emoji"));
const ActivityFlags_1 = __importDefault(require("../util/ActivityFlags"));
const Constants_1 = require("../util/Constants");
class Presence extends Base_1.default {
    constructor(client, data) {
        super(client);
        this.guild = null;
        this.member = null;
        this.userId = data.user.id;
        this._patch(data);
    }
    _patch(data) {
        var _a;
        const GuildMember = require("./GuildMember");
        const User = require("./User");
        this.status = data.status || this.status || "offline";
        if (data.activities)
            this.activities = data.activities.map(activity => new Activity(this, activity));
        else
            this.activities = [];
        this.clientStatus = data.client_status || null;
        if (data.user && data.guild_id) {
            this.member = new GuildMember(this.client, Object.assign({}, data, { mute: false, deaf: false, hoisted_role: data.guild_id, joined_at: new Date().toISOString(), nick: data.nick || null, roles: [] }));
            this.user = this.member.user;
            this.member.presence = this;
            this.user.presence = this;
            this.guild = this.member.guild;
        }
        else if (data.user) {
            this.user = data.user.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id) ? this.client.user : new User(this.client, data.user);
        }
        return this;
    }
    _clone() {
        const clone = Object.assign(Object.create(this), this);
        if (this.activities)
            clone.activities = this.activities.map(activity => activity._clone());
        return clone;
    }
    equals(presence) {
        return (this === presence ||
            (presence &&
                this.status === presence.status &&
                this.activities.length === presence.activities.length &&
                this.activities.every((activity, index) => activity.equals(presence.activities[index])) &&
                this.clientStatus.web === presence.clientStatus.web &&
                this.clientStatus.mobile === presence.clientStatus.mobile &&
                this.clientStatus.desktop === presence.clientStatus.desktop));
    }
    toJSON() {
        const value = this.member ? this.member.toJSON() : { user: this.user.toJSON() };
        value["activities"] = this.activities.map(i => i.toJSON());
        value["client_status"] = this.clientStatus;
        if (this.guild)
            value["guild_id"] = this.guild.id;
        // @ts-ignore
        delete value["joined_at"];
        delete value["mute"];
        // @ts-ignore
        delete value["deaf"];
        delete value["hoisted_role"];
        return value;
    }
}
exports.Presence = Presence;
class Activity {
    constructor(presence, data) {
        this.presence = presence;
        this.name = data.name;
        this.type = Constants_1.ActivityTypes[data.type];
        this.url = data.url || null;
        this.details = data.details || null;
        this.state = data.state || null;
        this.applicationId = data.application_id || null;
        this.timestamps = data.timestamps
            ? {
                start: data.timestamps.start ? new Date(Number(data.timestamps.start)) : null,
                end: data.timestamps.end ? new Date(Number(data.timestamps.end)) : null
            }
            : null;
        this.party = data.party || null;
        this.assets = data.assets ? new RichPresenceAssets(this, data.assets) : null;
        // @ts-ignore
        this.syncId = data.sync_id;
        this.flags = new ActivityFlags_1.default(data.flags).freeze();
        this.emoji = data.emoji ? new Emoji_1.default(presence.client, data.emoji) : null;
        this.createdTimestamp = new Date(data.created_at).getTime();
    }
    equals(activity) {
        return (this === activity ||
            (activity && this.name === activity.name && this.type === activity.type && this.url === activity.url));
    }
    get createdAt() {
        return new Date(this.createdTimestamp);
    }
    toString() {
        return this.name;
    }
    toJSON() {
        var _a, _b, _c, _d, _e, _f;
        return {
            name: this.name,
            type: Constants_1.ActivityTypes.indexOf(this.type),
            url: this.url || undefined,
            created_at: this.createdAt.getTime(),
            timestamps: {
                start: ((_b = (_a = this.timestamps) === null || _a === void 0 ? void 0 : _a.start) === null || _b === void 0 ? void 0 : _b.getTime()) || undefined,
                end: ((_d = (_c = this.timestamps) === null || _c === void 0 ? void 0 : _c.end) === null || _d === void 0 ? void 0 : _d.getTime()) || undefined
            },
            emoji: ((_e = this.emoji) === null || _e === void 0 ? void 0 : _e.toJSON()) || undefined,
            party: this.party || undefined,
            assets: ((_f = this.assets) === null || _f === void 0 ? void 0 : _f.toJSON()) || undefined,
            flags: Number(this.flags.bitfield)
        };
    }
    _clone() {
        return Object.assign(Object.create(this), this);
    }
}
exports.Activity = Activity;
class RichPresenceAssets {
    constructor(activity, assets) {
        this.activity = activity;
        this.largeText = assets.large_text || null;
        this.smallText = assets.small_text || null;
        this.largeImage = assets.large_image || null;
        this.smallImage = assets.small_image || null;
    }
    smallImageURL(options = {}) {
        if (!this.smallImage)
            return null;
        return this.activity.presence.client.rest.cdn.AppAsset(this.activity.applicationId, this.smallImage, {
            format: options.format,
            size: options.size
        });
    }
    largeImageURL(options = {}) {
        if (!this.largeImage)
            return null;
        if (/^spotify:/.test(this.largeImage)) {
            return `https://i.scdn.co/image/${this.largeImage.slice(8)}`;
        }
        else if (/^twitch:/.test(this.largeImage)) {
            return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${this.largeImage.slice(7)}.png`;
        }
        return this.activity.presence.client.rest.cdn.AppAsset(this.activity.applicationId, this.largeImage, {
            format: options.format,
            size: options.size
        });
    }
    toJSON() {
        return {
            large_text: this.largeText || undefined,
            small_text: this.smallText || undefined,
            large_image: this.largeImage || undefined,
            small_image: this.smallImage || undefined
        };
    }
}
exports.RichPresenceAssets = RichPresenceAssets;
exports.default = exports;
