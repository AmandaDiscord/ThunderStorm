"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Team_1 = __importDefault(require("./Team"));
const Application_1 = __importDefault(require("./interfaces/Application"));
const ApplicationCommandManager_1 = __importDefault(require("../managers/ApplicationCommandManager"));
const ApplicationFlags_1 = __importDefault(require("../util/ApplicationFlags"));
class ClientApplication extends Application_1.default {
    constructor(client, data) {
        super(client, data);
        this.commands = new ApplicationCommandManager_1.default(this.client);
    }
    _patch(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        super._patch(data);
        const User = require("./User");
        this.flags = "flags" in data ? new ApplicationFlags_1.default(data.flags).freeze() : this.flags;
        this.cover = (_b = (_a = data.cover_image, (_a !== null && _a !== void 0 ? _a : this.cover)), (_b !== null && _b !== void 0 ? _b : null));
        this.rpcOrigins = (_d = (_c = data.rpc_origins, (_c !== null && _c !== void 0 ? _c : this.rpcOrigins)), (_d !== null && _d !== void 0 ? _d : []));
        this.botRequireCodeGrant = (_f = (_e = data.bot_require_code_grant, (_e !== null && _e !== void 0 ? _e : this.botRequireCodeGrant)), (_f !== null && _f !== void 0 ? _f : null));
        this.botPublic = (_h = (_g = data.bot_public, (_g !== null && _g !== void 0 ? _g : this.botPublic)), (_h !== null && _h !== void 0 ? _h : null));
        if (data.owner && data.owner.id === ((_j = this.client.user) === null || _j === void 0 ? void 0 : _j.id))
            this.client.user._patch(data.owner);
        this.owner = data.team
            ? new Team_1.default(this.client, data.team)
            : data.owner
                ? (data.owner.id === ((_k = this.client.user) === null || _k === void 0 ? void 0 : _k.id) ? this.client.user : new User(this.client, data.owner))
                : (_l = this.owner, (_l !== null && _l !== void 0 ? _l : null));
    }
    get partial() {
        return !this.name;
    }
    async fetch() {
        const app = await this.client.api.oauth2.applications("@me").get();
        this._patch(app);
        return this;
    }
}
module.exports = ClientApplication;
