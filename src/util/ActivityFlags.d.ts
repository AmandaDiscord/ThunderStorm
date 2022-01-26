import BitField from "./BitField";
declare const FLAGS: {
    INSTANCE: bigint;
    JOIN: bigint;
    SPECTATE: bigint;
    JOIN_REQUEST: bigint;
    SYNC: bigint;
    PLAY: bigint;
    PARTY_PRIVACY_FRIENDS: bigint;
    PARTY_PRIVACY_VOICE_CHANNEL: bigint;
    EMBEDDED: bigint;
};
interface ActivityFlagsConstructor {
    new (bits?: import("../Types").BitFieldResolvable<typeof FLAGS>): ActivityFlags;
    readonly prototype: ActivityFlags;
    readonly [Symbol.species]: ActivityFlagsConstructor;
}
declare class ActivityFlags extends BitField<typeof FLAGS> {
    ["constructor"]: typeof ActivityFlags;
    static readonly default: typeof ActivityFlags;
    readonly [Symbol.species]: ActivityFlagsConstructor;
    static FLAGS: {
        INSTANCE: bigint;
        JOIN: bigint;
        SPECTATE: bigint;
        JOIN_REQUEST: bigint;
        SYNC: bigint;
        PLAY: bigint;
        PARTY_PRIVACY_FRIENDS: bigint;
        PARTY_PRIVACY_VOICE_CHANNEL: bigint;
        EMBEDDED: bigint;
    };
    FLAGS: {
        INSTANCE: bigint;
        JOIN: bigint;
        SPECTATE: bigint;
        JOIN_REQUEST: bigint;
        SYNC: bigint;
        PLAY: bigint;
        PARTY_PRIVACY_FRIENDS: bigint;
        PARTY_PRIVACY_VOICE_CHANNEL: bigint;
        EMBEDDED: bigint;
    };
    constructor(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>);
}
export = ActivityFlags;
