class ClientVoiceManager {
	public client: import("../Client");
	public adapters: Map<string, any> = new Map();

	public constructor(client: import("../Client")) {
		this.client = client;
	}

	public onVoiceServer(payload: import("../../internal").InboundDataType<"VOICE_SERVER_UPDATE">["d"]) {
		this.adapters.get(payload?.guild_id as string)?.onVoiceServerUpdate(payload);
	}

	public onVoiceStateUpdate(payload: import("../../internal").InboundDataType<"VOICE_STATE_UPDATE">["d"]) {
		if (payload?.guild_id && payload.session_id && payload.user_id === this.client.user?.Id) {
			this.adapters.get(payload.guild_id)?.onVoiceStateUpdate(payload);
		}
	}
}

export = ClientVoiceManager;
