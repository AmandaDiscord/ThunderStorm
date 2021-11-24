import MessageComponentInteraction from "./MessageComponentInteraction";

class SelectMenuInteraction extends MessageComponentInteraction {
	public values: Array<string>;

	public static readonly default = SelectMenuInteraction;

	public constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData) {
		super(client, data);

		this.values = data.data?.values?.map(i => i.value) ?? [];
	}
}

export = SelectMenuInteraction;
