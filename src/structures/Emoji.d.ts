import Base from "./Base";
declare class Emoji extends Base {
    animated: boolean;
    name: string;
    id: string;
    deleted: boolean;
    static readonly default: typeof Emoji;
    constructor(client: import("../client/Client"), data: import("discord-typings").EmojiData);
    get identifier(): string;
    get url(): string;
    get createdTimestamp(): number | null;
    get createdAt(): Date | null;
    toJSON(): {
        id: string;
        animated: boolean;
        name: string;
    };
    toString(): string;
    _patch(data: import("discord-typings").EmojiData): void;
}
export = Emoji;
