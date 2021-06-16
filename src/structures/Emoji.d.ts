import Base from "./Base";
declare class Emoji extends Base {
    animated: boolean;
    name: string;
    id: string | null;
    deleted: boolean;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").EmojiData);
    get identifier(): string;
    get url(): string;
    get createdTimestamp(): number | null;
    get createdAt(): Date | null;
    toJSON(): {
        id: string | null;
        animated: boolean;
        name: string;
    };
    toString(): string;
    _patch(data: import("@amanda/discordtypings").EmojiData): void;
}
export = Emoji;
