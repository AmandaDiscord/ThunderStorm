import BitField from "./BitField";
declare const FLAGS: {
    DISCORD_EMPLOYEE: bigint;
    PARTNERED_SERVER_OWNER: bigint;
    DISCORD_PARTNER: bigint;
    HYPESQUAD_EVENTS: bigint;
    BUGHUNTER_LEVEL_1: bigint;
    HOUSE_BRAVERY: bigint;
    HOUSE_BRILLIANCE: bigint;
    HOUSE_BALANCE: bigint;
    EARLY_SUPPORTER: bigint;
    TEAM_USER: bigint;
    SYSTEM: bigint;
    BUGHUNTER_LEVEL_2: bigint;
    VERIFIED_BOT: bigint;
    EARLY_VERIFIED_BOT_DEVELOPER: bigint;
    CERTIFIED_MODERATOR: bigint;
    BOT_HTTP_INTERACTIONS: bigint;
};
interface UserFlagsConstructor {
    new (bits?: import("../Types").BitFieldResolvable<typeof FLAGS>): UserFlags;
    readonly prototype: UserFlags;
    readonly [Symbol.species]: UserFlagsConstructor;
}
declare class UserFlags extends BitField<typeof FLAGS> {
    ["constructor"]: typeof UserFlags;
    static readonly default: typeof UserFlags;
    readonly [Symbol.species]: UserFlagsConstructor;
    static FLAGS: {
        DISCORD_EMPLOYEE: bigint;
        PARTNERED_SERVER_OWNER: bigint;
        DISCORD_PARTNER: bigint;
        HYPESQUAD_EVENTS: bigint;
        BUGHUNTER_LEVEL_1: bigint;
        HOUSE_BRAVERY: bigint;
        HOUSE_BRILLIANCE: bigint;
        HOUSE_BALANCE: bigint;
        EARLY_SUPPORTER: bigint;
        TEAM_USER: bigint;
        SYSTEM: bigint;
        BUGHUNTER_LEVEL_2: bigint;
        VERIFIED_BOT: bigint;
        EARLY_VERIFIED_BOT_DEVELOPER: bigint;
        CERTIFIED_MODERATOR: bigint;
        BOT_HTTP_INTERACTIONS: bigint;
    };
    FLAGS: {
        DISCORD_EMPLOYEE: bigint;
        PARTNERED_SERVER_OWNER: bigint;
        DISCORD_PARTNER: bigint;
        HYPESQUAD_EVENTS: bigint;
        BUGHUNTER_LEVEL_1: bigint;
        HOUSE_BRAVERY: bigint;
        HOUSE_BRILLIANCE: bigint;
        HOUSE_BALANCE: bigint;
        EARLY_SUPPORTER: bigint;
        TEAM_USER: bigint;
        SYSTEM: bigint;
        BUGHUNTER_LEVEL_2: bigint;
        VERIFIED_BOT: bigint;
        EARLY_VERIFIED_BOT_DEVELOPER: bigint;
        CERTIFIED_MODERATOR: bigint;
        BOT_HTTP_INTERACTIONS: bigint;
    };
    constructor(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>);
}
export = UserFlags;
