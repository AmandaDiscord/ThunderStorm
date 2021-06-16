"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Collection_1 = __importDefault(require("../util/Collection"));
const Constants_1 = __importDefault(require("../util/Constants"));
const BaseClient_1 = __importDefault(require("./BaseClient"));
const ActionManager_1 = __importDefault(require("./actions/ActionManager"));
const ClientVoiceManager_1 = __importDefault(require("./voice/ClientVoiceManager"));
const VoiceRegion_1 = __importDefault(require("../structures/VoiceRegion"));
const Webhook_1 = __importDefault(require("../structures/Webhook"));
class Client extends BaseClient_1.default {
    constructor(options) {
        super(options);
        this.readyTimestamp = null;
        this.user = null;
        this.application = null;
        this.actions = new ActionManager_1.default(this);
        this.voice = new ClientVoiceManager_1.default(this);
        this._snow.requestHandler.on("rateLimit", data => {
            this.emit(Constants_1.default.Events.RATE_LIMIT, data);
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
        const User = require("../structures/User");
        const user = await this._snow.user.getUser(userID);
        if (user.id === ((_a = this.user) === null || _a === void 0 ? void 0 : _a.id))
            this.user._patch(user);
        return user.id === ((_b = this.user) === null || _b === void 0 ? void 0 : _b.id) ? this.user : new User(this, user);
    }
    async fetchInvite(id) {
        const Invite = require("../structures/Invite");
        const match = id.match(/h?t?t?p?s?:?\/?\/?d?i?s?c?o?r?d?\.?g?g?\/?([\w\d]+)/);
        let code;
        if (match && match[1])
            code = match[1];
        if (!code)
            return null;
        const data = await this._snow.invite.getInvite(code, { with_counts: true, with_expiration: true });
        return new Invite(this, data);
    }
    async fetchWebhook(id, token) {
        const data = await this._snow.webhook.getWebhook(id, token);
        return new Webhook_1.default(this, { token, ...data });
    }
    async fetchVoiceRegions() {
        const data = await this._snow.voice.getVoiceRegions();
        return new Collection_1.default(data.map(item => [item.id, new VoiceRegion_1.default(item)]));
    }
}
module.exports = Client;
