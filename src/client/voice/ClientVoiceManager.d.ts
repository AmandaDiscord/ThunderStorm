declare class ClientVoiceManager {
    client: import("../Client");
    adapters: Map<string, any>;
    static readonly default: typeof ClientVoiceManager;
    constructor(client: import("../Client"));
    onVoiceServer(payload: import("../../internal").InboundDataType<"VOICE_SERVER_UPDATE">["d"]): void;
    onVoiceStateUpdate(payload: import("../../internal").InboundDataType<"VOICE_STATE_UPDATE">["d"]): void;
}
export = ClientVoiceManager;
