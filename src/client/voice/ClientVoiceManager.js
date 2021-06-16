"use strict";
class ClientVoiceManager {
    constructor(client) {
        this.adapters = new Map();
        this.client = client;
    }
    onVoiceServer(payload) {
        var _a, _b;
        (_b = this.adapters.get((_a = payload) === null || _a === void 0 ? void 0 : _a.guild_id)) === null || _b === void 0 ? void 0 : _b.onVoiceServerUpdate(payload);
    }
    onVoiceStateUpdate(payload) {
        var _a, _b, _c;
        if (((_a = payload) === null || _a === void 0 ? void 0 : _a.guild_id) && payload.session_id && payload.user_id === ((_b = this.client.user) === null || _b === void 0 ? void 0 : _b.id)) {
            (_c = this.adapters.get(payload.guild_id)) === null || _c === void 0 ? void 0 : _c.onVoiceStateUpdate(payload);
        }
    }
}
module.exports = ClientVoiceManager;
