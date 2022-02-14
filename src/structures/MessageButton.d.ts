import BaseMessageComponent from "./BaseMessageComponent";
declare class MessageButton extends BaseMessageComponent {
    label: string | null;
    customId: string | null;
    style: import("../Types").MessageButtonStyle | null;
    emoji: {
        id: string | null;
        name?: string;
        animated?: boolean;
    } | null;
    url: string | null;
    disabled: boolean;
    static readonly default: typeof MessageButton;
    constructor(data: import("discord-typings").MessageComponentData | import("../Types").MessageButtonOptions);
    setup(data: import("discord-typings").MessageComponentData | import("../Types").MessageButtonOptions): void;
    setCustomId(customId: string): this;
    setDisabled(disabled: boolean): this;
    setEmoji(emoji: import("../Types").EmojiIdentifierResolvable): this;
    setLabel(label: string): this;
    setStyle(style: import("../Types").MessageButtonStyleResolvable): this;
    setURL(url: string): this;
    toJSON(): {
        custom_id: string | null;
        disabled: boolean;
        emoji: {
            id: string | null;
            name?: string | undefined;
            animated?: boolean | undefined;
        } | null;
        label: string | null;
        style: 2 | 1 | 4 | 5 | 3;
        type: 2 | 1 | 3;
        url: string | null;
    };
    static resolveStyle(style: import("../Types").MessageButtonStyleResolvable): import("../Types").MessageButtonStyle;
}
export = MessageButton;
