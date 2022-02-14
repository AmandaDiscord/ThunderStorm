// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BaseMessageComponent from "./BaseMessageComponent";
import { MessageComponentTypes } from "../util/Constants";
import Util from "../util/Util";

interface MessageSelectMenuConstructor {
	new(data: MessageSelectMenu | import("../Types").MessageSelectMenuOptions): MessageSelectMenu;
	readonly prototype: MessageSelectMenu;
	readonly [Symbol.species]: MessageSelectMenuConstructor;
}

class MessageSelectMenu extends BaseMessageComponent {
	public ["constructor"]: typeof MessageSelectMenu;
	public static readonly default = MessageSelectMenu;
	public static [Symbol.species]: MessageSelectMenuConstructor;

	public customId!: string | null;
	public placeholder!: string | null;
	public minValues!: number | null;
	public maxValues!: number | null;
	public options!: Array<import("../Types").MessageSelectOption>;
	public disabled!: boolean;

	// @ts-ignore
	public constructor(data: MessageSelectMenu | import("../Types").MessageSelectMenuOptions = {}) {
		super({ type: "SELECT_MENU" });

		this.setup(data);
	}

	public setup(data: MessageSelectMenu | import("../Types").MessageSelectMenuOptions) {
		this.customId = (data as import("discord-typings").MessageComponentData).custom_id ?? data.customId ?? null;
		this.placeholder = data.placeholder ?? null;
		this.minValues = (data as import("discord-typings").MessageComponentData).min_values ?? data.minValues ?? null;
		this.maxValues = (data as import("discord-typings").MessageComponentData).max_values ?? data.maxValues ?? null;
		// @ts-ignore
		this.options = this.constructor.normalizeOptions(data.options ?? []);
		this.disabled = data.disabled ?? false;
	}

	public setCustomId(customId: string) {
		this.customId = Util.verifyString(customId, RangeError, "SELECT_MENU_CUSTOM_ID");
		return this;
	}

	public setDisabled(disabled = true) {
		this.disabled = disabled;
		return this;
	}

	public setMaxValues(maxValues: number) {
		this.maxValues = maxValues;
		return this;
	}

	public setMinValues(minValues: number) {
		this.minValues = minValues;
		return this;
	}

	public setPlaceholder(placeholder: string) {
		this.placeholder = Util.verifyString(placeholder, RangeError, "SELECT_MENU_PLACEHOLDER");
		return this;
	}

	public addOptions(...options: Array<import("../Types").MessageSelectOptionData | Array<import("../Types").MessageSelectOptionData>>) {
		// @ts-ignore
		this.options.push(...this.constructor.normalizeOptions(options));
		return this;
	}

	public setOptions(...options: Array<import("../Types").MessageSelectOptionData | Array<import("../Types").MessageSelectOptionData>>) {
		// @ts-ignore
		this.spliceOptions(0, this.options.length, options);
		return this;
	}

	public spliceOptions(index: number, deleteCount: number, ...options: Array<import("../Types").MessageSelectOptionData | Array<import("../Types").MessageSelectOptionData>>) {
		this.options.splice(index, deleteCount, ...this.constructor.normalizeOptions(...options));
		return this;
	}

	public toJSON() {
		return {
			custom_id: this.customId,
			disabled: this.disabled,
			placeholder: this.placeholder,
			min_values: this.minValues,
			max_values: this.maxValues ?? (this.minValues ? this.options.length : undefined),
			options: this.options,
			type: typeof this.type === "string" ? MessageComponentTypes[this.type] : this.type
		};
	}

	public static normalizeOption(option: import("../Types").MessageSelectOptionData): import("../Types").MessageSelectOption {
		let { label, value, description, emoji } = option;

		label = Util.verifyString(label, RangeError, "SELECT_OPTION_LABEL");
		value = Util.verifyString(value, RangeError, "SELECT_OPTION_VALUE");
		// @ts-ignore
		emoji = emoji ? Util.resolvePartialEmoji(emoji) : null;
		// @ts-ignore
		description = description ? Util.verifyString(description, RangeError, "SELECT_OPTION_DESCRIPTION", true) : null;

		// @ts-ignore
		return { label, value, description, emoji, default: option.default ?? false };
	}

	public static normalizeOptions(...options: Array<import("../Types").MessageSelectOptionData | Array<import("../Types").MessageSelectOptionData>>) {
		return options.flat(Infinity).map(option => this.normalizeOption(option as import("../Types").MessageSelectOptionData));
	}
}

export = MessageSelectMenu;
