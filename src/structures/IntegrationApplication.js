"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Application_1 = __importDefault(require("./interfaces/Application"));
class IntegrationApplication extends Application_1.default {
    _patch(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        super._patch(data);
        const User = require("./User");
        // @ts-ignore
        this.bot = data.bot ? (data.bot.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id) ? this.client.user : new User(this.client, data.bot)) : (_b = this.bot, (_b !== null && _b !== void 0 ? _b : null));
        this.termsOfServiceURL = (_d = (_c = data.terms_of_service_url, (_c !== null && _c !== void 0 ? _c : this.termsOfServiceURL)), (_d !== null && _d !== void 0 ? _d : null));
        this.privacyPolicyURL = (_f = (_e = data.privacy_policy_url, (_e !== null && _e !== void 0 ? _e : this.privacyPolicyURL)), (_f !== null && _f !== void 0 ? _f : null));
        this.rpcOrigins = (_h = (_g = data.rpc_origins, (_g !== null && _g !== void 0 ? _g : this.rpcOrigins)), (_h !== null && _h !== void 0 ? _h : []));
        this.summary = (_k = (_j = data.summary, (_j !== null && _j !== void 0 ? _j : this.summary)), (_k !== null && _k !== void 0 ? _k : null));
        // @ts-ignore
        this.hook = (_m = (_l = data.hook, (_l !== null && _l !== void 0 ? _l : this.hook)), (_m !== null && _m !== void 0 ? _m : null));
        this.cover = (_p = (_o = data.cover_image, (_o !== null && _o !== void 0 ? _o : this.cover)), (_p !== null && _p !== void 0 ? _p : null));
        this.verifyKey = (_r = (_q = data.verify_key, (_q !== null && _q !== void 0 ? _q : this.verifyKey)), (_r !== null && _r !== void 0 ? _r : null));
    }
}
module.exports = IntegrationApplication;
