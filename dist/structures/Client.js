"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const events_1 = require("events");
const Constants_1 = __importDefault(require("../Constants"));
const Collection_1 = __importDefault(require("./Util/Collection"));
const VoiceRegion_1 = __importDefault(require("./VoiceRegion"));
class Client extends events_1.EventEmitter {
    constructor(options) {
        super();
        this.options = options;
        this.readyTimestamp = null;
        const match = options.snowtransfer.token.match(/B?o?t? ?([\w\d\._]+)/);
        if (match)
            this.token = match[1];
        else
            this.token = options.snowtransfer.token;
        this.user = null;
        this._snow = options.snowtransfer;
        this._snow.requestHandler.on("rateLimit", data => {
            this.emit(Constants_1.default.CLIENT_ONLY_EVENTS.RATE_LIMIT, data);
        });
    }
    get readyAt() {
        return this.readyTimestamp ? new Date(this.readyTimestamp) : null;
    }
    get uptime() {
        return this.readyTimestamp ? Date.now() - this.readyTimestamp : 0;
    }
    toString() {
        return this.user ? `<@${this.user.id}>` : "Client";
    }
    async fetchUser(userID) {
        var _a, _b;
        const User = require("./User");
        const user = await this._snow.user.getUser(userID);
        if (user.id === ((_a = this.user) === null || _a === void 0 ? void 0 : _a.id))
            this.user._patch(user);
        return user.id === ((_b = this.user) === null || _b === void 0 ? void 0 : _b.id) ? this.user : new User(user, this);
    }
    async fetchInvite(id) {
        const Invite = require("./Invite");
        const match = id.match(/h?t?t?p?s?:?\/?\/?d?i?s?c?o?r?d?\.?g?g?\/?([\w\d]+)/);
        let code;
        if (match && match[1])
            code = match[1];
        if (!code)
            return null;
        const data = await this._snow.invite.getInvite(code, true);
        return new Invite(data, this);
    }
    async fetchVoiceRegions() {
        const data = await this._snow.voice.getVoiceRegions();
        return new Collection_1.default(data.map(item => [item.id, new VoiceRegion_1.default(item)]));
    }
}
module.exports = Client;
