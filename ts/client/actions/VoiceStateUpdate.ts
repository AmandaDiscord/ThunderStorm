// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Action from "./Action";
import { Events } from "../../util/Constants";

class VoiceStateUpdate extends Action {
	public static readonly default = VoiceStateUpdate;

	public handle(data: import("discord-typings").VoiceStateData) {
		const VoiceState: typeof import("../../structures/VoiceState") = require("../../structures/VoiceState");
		const state = new VoiceState(this.client, data);
		this.client.emit(Events.VOICE_STATE_UPDATE, state);
	}
}

export = VoiceStateUpdate;
