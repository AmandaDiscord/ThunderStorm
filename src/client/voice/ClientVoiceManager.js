"use strict";
class ClientVoiceManager {
    constructor(client) {
        this.adapters = new Map();
        this.client = client;
    }
    onVoiceServer(payload) {
        var _a;
        (_a = this.adapters.get(payload === null || payload === void 0 ? void 0 : payload.guild_id)) === null || _a === void 0 ? void 0 : _a.onVoiceServerUpdate(payload);
    }
    onVoiceStateUpdate(payload) {
        var _a, _b;
        if ((payload === null || payload === void 0 ? void 0 : payload.guild_id) && payload.session_id && payload.user_id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id)) {
            (_b = this.adapters.get(payload.guild_id)) === null || _b === void 0 ? void 0 : _b.onVoiceStateUpdate(payload);
        }
    }
}
module.exports = ClientVoiceManager;
