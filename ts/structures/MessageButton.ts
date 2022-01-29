// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BaseMessageComponent from "./BaseMessageComponent";
import { RangeError } from "../errors";
import { MessageButtonStyles, MessageComponentTypes } from "../util/Constants";
import Util from "../util/Util";

class MessageButton extends BaseMessageComponent {
	public label!: string | null;
	public customId!: string | null;
	public style!: import("../Types").MessageButtonStyle | null;
	public emoji!: { id: string | null; name?: string; animated?: boolean } | null;
	public url!: string | null;
	public disabled!: boolean;

	public static readonly default = MessageButton;

	public constructor(data: import("discord-typings").MessageComponentData | import("../Types").MessageButtonOptions) {
		super({ type: "BUTTON" });

		this.setup(data);
	}

	public setup(data: import("discord-typings").MessageComponentData | import("../Types").MessageButtonOptions) {
		this.label = data.label ?? null;
		this.customId = (data as import("discord-typings").MessageComponentData).custom_id ?? (data as import("../Types").MessageButtonOptions).customId ?? null;
		this.style = data.style ? MessageButton.resolveStyle(data.style) : null;
		if (!data.emoji) this.emoji = null;
		// @ts-ignore
		else this.setEmoji(data.emoji);
		this.url = data.url ?? null;
		this.disabled = data.disabled ?? false;
	}

	public setCustomId(customId: string): this {
		this.customId = Util.verifyString(customId, RangeError as unknown as ErrorConstructor, "BUTTON_CUSTOM_ID");
		return this;
	}

	public setDisabled(disabled: boolean): this {
		this.disabled = disabled;
		return this;
	}

	public setEmoji(emoji: import("../Types").EmojiIdentifierResolvable): this {
		if (typeof emoji === "string" && /^\d+$/.test(emoji)) this.emoji = { id: emoji };
		else if (typeof emoji === "string") this.emoji = Util.parseEmoji(`${emoji}`);
		else this.emoji = { id: (emoji as Exclude<import("../Types").EmojiIdentifierResolvable, import("./GuildEmoji") | import("./ReactionEmoji") | string>).id || emoji.id || null, name: emoji.name, animated: emoji.animated };
		return this;
	}

	public setLabel(label: string): this {
		this.label = Util.verifyString(label, RangeError as unknown as ErrorConstructor, "BUTTON_LABEL");
		return this;
	}

	public setStyle(style: import("../Types").MessageButtonStyleResolvable): this {
		this.style = MessageButton.resolveStyle(style);
		return this;
	}

	public setURL(url: string): this {
		this.url = Util.verifyString(url, RangeError as unknown as ErrorConstructor, "BUTTON_URL");
		return this;
	}

	public toJSON() {
		return {
			custom_id: this.customId,
			disabled: this.disabled,
			emoji: this.emoji,
			label: this.label,
			style: MessageButtonStyles[this.style as import("../Types").MessageButtonStyle],
			type: MessageComponentTypes[this.type as import("../Types").MessageComponentType],
			url: this.url
		};
	}

	public static resolveStyle(style: import("../Types").MessageButtonStyleResolvable): import("../Types").MessageButtonStyle {
		return typeof style === "string" ? style : MessageButtonStyles[style];
	}
}

export = MessageButton;
