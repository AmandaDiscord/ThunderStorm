import Constants from "../Constants";
import BitField from "./BitField";
interface UserFlagsConstructor {
    new (bits?: import("../Types").BitFieldResolvable<typeof Constants.USER_FLAGS>): UserFlags;
    readonly prototype: UserFlags;
    readonly [Symbol.species]: UserFlagsConstructor;
}
declare class UserFlags extends BitField<typeof Constants.USER_FLAGS> {
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
        EARLY_VERIFIED_DEVELOPER: bigint;
        VERIFIED_DEVELOPER: bigint;
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
        EARLY_VERIFIED_DEVELOPER: bigint;
        VERIFIED_DEVELOPER: bigint;
    };
    constructor(bits?: import("../Types").BitFieldResolvable<typeof Constants.USER_FLAGS>);
}
export = UserFlags;
