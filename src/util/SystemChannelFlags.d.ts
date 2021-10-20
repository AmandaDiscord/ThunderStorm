import BitField from "./BitField";
declare const FLAGS: {
    SUPPRESS_JOIN_NOTIFICATIONS: bigint;
    SUPPRESS_PREMIUM_SUBSCRIPTIONS: bigint;
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS: bigint;
    SUPPRESS_JOIN_NOTIFICATION_REPLIES: bigint;
};
interface SystemChannelFlagsConstructor {
    new (bits?: import("../Types").BitFieldResolvable<typeof FLAGS>): SystemChannelFlags;
    readonly prototype: SystemChannelFlags;
    readonly [Symbol.species]: SystemChannelFlagsConstructor;
}
declare class SystemChannelFlags extends BitField<typeof FLAGS> {
    ["constructor"]: typeof SystemChannelFlags;
    static readonly default: typeof SystemChannelFlags;
    readonly [Symbol.species]: SystemChannelFlagsConstructor;
    static FLAGS: {
        SUPPRESS_JOIN_NOTIFICATIONS: bigint;
        SUPPRESS_PREMIUM_SUBSCRIPTIONS: bigint;
        SUPPRESS_GUILD_REMINDER_NOTIFICATIONS: bigint;
        SUPPRESS_JOIN_NOTIFICATION_REPLIES: bigint;
    };
    FLAGS: {
        SUPPRESS_JOIN_NOTIFICATIONS: bigint;
        SUPPRESS_PREMIUM_SUBSCRIPTIONS: bigint;
        SUPPRESS_GUILD_REMINDER_NOTIFICATIONS: bigint;
        SUPPRESS_JOIN_NOTIFICATION_REPLIES: bigint;
    };
    constructor(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>);
}
export = SystemChannelFlags;
