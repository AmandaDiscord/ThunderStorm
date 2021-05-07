import Collection from "./Util/Collection";
declare class Emoji {
    client: import("./Client");
    id: string | null;
    animated: boolean;
    available: boolean;
    managed: boolean;
    name: string;
    requiresColons: boolean;
    user: import("./User") | null;
    roles: Collection<string, import("./Partial/PartialRole")>;
    constructor(data: import("@amanda/discordtypings").EmojiData, client: import("./Client"));
    get identifier(): string;
    get url(): string;
    get createdTimestamp(): number | null;
    get createdAt(): Date | null;
    toJSON(): {
        id: string | null;
        animated: boolean;
        available: boolean;
        managed: boolean;
        name: string;
        requires_colons: boolean;
    };
    toString(): string;
    _patch(data: import("@amanda/discordtypings").EmojiData): void;
}
export = Emoji;
