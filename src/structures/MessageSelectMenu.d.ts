import BaseMessageComponent from "./BaseMessageComponent";
interface MessageSelectMenuConstructor {
    new (data: MessageSelectMenu | import("../Types").MessageSelectMenuOptions): MessageSelectMenu;
    readonly prototype: MessageSelectMenu;
    readonly [Symbol.species]: MessageSelectMenuConstructor;
}
declare class MessageSelectMenu extends BaseMessageComponent {
    ["constructor"]: typeof MessageSelectMenu;
    static readonly default: typeof MessageSelectMenu;
    static [Symbol.species]: MessageSelectMenuConstructor;
    customId: string | null;
    placeholder: string | null;
    minValues: number | null;
    maxValues: number | null;
    options: Array<import("../Types").MessageSelectOption>;
    disabled: boolean;
    constructor(data?: MessageSelectMenu | import("../Types").MessageSelectMenuOptions);
    setup(data: MessageSelectMenu | import("../Types").MessageSelectMenuOptions): void;
    setCustomId(customId: string): this;
    setDisabled(disabled?: boolean): this;
    setMaxValues(maxValues: number): this;
    setMinValues(minValues: number): this;
    setPlaceholder(placeholder: string): this;
    addOptions(...options: Array<import("../Types").MessageSelectOptionData | Array<import("../Types").MessageSelectOptionData>>): this;
    setOptions(...options: Array<import("../Types").MessageSelectOptionData | Array<import("../Types").MessageSelectOptionData>>): this;
    spliceOptions(index: number, deleteCount: number, ...options: Array<import("../Types").MessageSelectOptionData | Array<import("../Types").MessageSelectOptionData>>): this;
    toJSON(): {
        custom_id: string | null;
        disabled: boolean;
        placeholder: string | null;
        min_values: number | null;
        max_values: number | undefined;
        options: import("../Types").MessageSelectOption[];
        type: 2 | 1 | 3 | null;
    };
    static normalizeOption(option: import("../Types").MessageSelectOptionData): import("../Types").MessageSelectOption;
    static normalizeOptions(...options: Array<import("../Types").MessageSelectOptionData | Array<import("../Types").MessageSelectOptionData>>): import("../Types").MessageSelectOption[];
}
export = MessageSelectMenu;
