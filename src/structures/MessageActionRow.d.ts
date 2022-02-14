import BaseMessageComponent from "./BaseMessageComponent";
declare class MessageActionRow extends BaseMessageComponent {
    type: "ACTION_ROW";
    components: Array<import("../Types").MessageActionRowComponent>;
    static readonly default: typeof MessageActionRow;
    constructor(data?: MessageActionRow | import("../Types").MessageActionRowOptions);
    addComponents(...components: Array<Array<import("../Types").MessageActionRowComponentResolvable>>): this;
    spliceComponents(index: number, deleteCount: number, ...components: Array<Array<import("../Types").MessageActionRowComponentResolvable>>): this;
    toJSON(): {
        components: ({
            custom_id: string | null;
            disabled: boolean;
            emoji: {
                id: string | null;
                name?: string | undefined;
                animated?: boolean | undefined;
            } | null;
            label: string | null;
            style: 1 | 4 | 5 | 2 | 3;
            type: 1 | 2 | 3;
            url: string | null;
        } | {
            custom_id: string | null;
            disabled: boolean;
            placeholder: string | null;
            min_values: number | null;
            max_values: number | undefined;
            options: import("../Types").MessageSelectOption[];
            type: 1 | 2 | 3 | null;
        })[];
        type: 1 | 2 | 3;
    };
}
export = MessageActionRow;
