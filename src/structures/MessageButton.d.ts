import BaseMessageComponent from "./BaseMessageComponent";
declare class MessageButton extends BaseMessageComponent {
    label: string | null;
    customID: string | null;
    style: import("../Types").MessageButtonStyle | null;
    emoji: {
        id: string | null;
        name?: string;
        animated?: boolean;
    } | null;
    url: string | null;
    disabled: boolean;
    constructor(data: MessageButton | import("../Types").MessageButtonOptions);
    setup(data: MessageButton | import("../Types").MessageButtonOptions): void;
    setCustomID(customID: string): this;
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
        style: 1 | 2 | 4 | 5 | 3;
        type: 1 | 2;
        url: string | null;
    };
    static resolveStyle(style: import("../Types").MessageButtonStyleResolvable): import("../Types").MessageButtonStyle;
}
export = MessageButton;
