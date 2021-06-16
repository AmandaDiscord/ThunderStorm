import BaseMessageComponent from "./BaseMessageComponent";
import { RangeError } from "../errors";
import { MessageButtonStyles, MessageComponentTypes } from "../util/Constants";
import Util from "../util/Util";

class MessageButton extends BaseMessageComponent {
	public label!: string | null;
	public customID!: string | null;
	public style!: import("../Types").MessageButtonStyle | null;
	public emoji!: { id: string | null; name?: string; animated?: boolean } | null;
	public url!: string | null;
	public disabled!: boolean;

	public constructor(data: MessageButton | import("../Types").MessageButtonOptions) {
		super({ type: "BUTTON" });

		this.setup(data);
	}

	public setup(data: MessageButton | import("../Types").MessageButtonOptions) {
		this.label = data.label ?? null;
		// @ts-ignore
		this.customID = data.custom_id ?? data.customID ?? null;
		this.style = data.style ? MessageButton.resolveStyle(data.style) : null;
		if (!data.emoji) this.emoji = null;
		else this.setEmoji(data.emoji);
		this.url = data.url ?? null;
		this.disabled = data.disabled ?? false;
	}

	public setCustomID(customID: string): this {
		// @ts-ignore
		this.customID = Util.verifyString(customID, RangeError, "BUTTON_CUSTOM_ID");
		return this;
	}

	public setDisabled(disabled: boolean): this {
		this.disabled = disabled;
		return this;
	}

	public setEmoji(emoji: import("../Types").EmojiIdentifierResolvable): this {
		if (typeof emoji === "string" && /^\d+$/.test(emoji)) this.emoji = { id: emoji };
		else if (typeof emoji === "string") this.emoji = Util.parseEmoji(`${emoji}`);
		else this.emoji = { id: emoji.id, name: emoji.name, animated: emoji.animated };
		return this;
	}

	public setLabel(label: string): this {
		// @ts-ignore
		this.label = Util.verifyString(label, RangeError, "BUTTON_LABEL");
		return this;
	}

	public setStyle(style: import("../Types").MessageButtonStyleResolvable): this {
		this.style = MessageButton.resolveStyle(style);
		return this;
	}

	public setURL(url: string): this {
		// @ts-ignore
		this.url = Util.verifyString(url, RangeError, "BUTTON_URL");
		return this;
	}

	public toJSON() {
		return {
			custom_id: this.customID,
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
