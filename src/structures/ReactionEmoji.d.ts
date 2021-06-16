declare class ReactionEmoji {
    client: import("../client/Client");
    reaction: import("./MessageReaction");
    name: string;
    id: string | null;
    animated: boolean;
    constructor(reaction: import("./MessageReaction"), emoji: {
        name: string;
        id: string | null;
        animated?: boolean;
    });
    get createdTimestamp(): number | null;
    get createdAt(): Date | null;
    get url(): string | null;
    get identifier(): string;
    toJSON(): {
        id: string | null;
        name: string;
        animated: boolean;
    };
    toString(): string;
}
export = ReactionEmoji;
