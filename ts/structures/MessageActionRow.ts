// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BaseMessageComponent from "./BaseMessageComponent";
import { MessageComponentTypes } from "../util/Constants";

// @ts-ignore
class MessageActionRow extends BaseMessageComponent {
	public type!: "ACTION_ROW";
	public components: Array<import("../Types").MessageActionRowComponent>;

	public static readonly default = MessageActionRow;

	public constructor(data?: MessageActionRow | import("../Types").MessageActionRowOptions) {
		super({ type: "ACTION_ROW" });

		this.components = (data?.components ?? []).map(c => BaseMessageComponent.create(c, null, true)) as Array<import("./MessageButton") | import("./MessageSelectMenu")>;
	}

	public addComponents(...components: Array<Array<import("../Types").MessageActionRowComponentResolvable>>) {

		this.components.push(...components.flat(Infinity).map(c => BaseMessageComponent.create(c as any, null, true)) as Array<import("./MessageButton") | import("./MessageSelectMenu")>);
		return this;
	}

	public spliceComponents(index: number, deleteCount: number, ...components: Array<Array<import("../Types").MessageActionRowComponentResolvable>>) {
		this.components.splice(
			index,
			deleteCount,
			...components.flat(Infinity).map(c => BaseMessageComponent.create(c as any, null, true)) as Array<import("./MessageButton") | import("./MessageSelectMenu")>
		);
		return this;
	}

	public toJSON() {
		return {
			components: this.components.map(c => c.toJSON()),
			type: MessageComponentTypes[this.type as import("../Types").MessageComponentType]
		};
	}
}

export = MessageActionRow;
