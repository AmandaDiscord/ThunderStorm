import BitField from "./BitField";
declare const FLAGS: {
    MANAGED_EMOJI: bigint;
    GROUP_DM_CREATE: bigint;
    RPC_HAS_CONNECTED: bigint;
    GATEWAY_PRESENCE: bigint;
    GATEWAY_PRESENCE_LIMITED: bigint;
    GATEWAY_GUILD_MEMBERS: bigint;
    GATEWAY_GUILD_MEMBERS_LIMITED: bigint;
    VERIFICATION_PENDING_GUILD_LIMIT: bigint;
    EMBEDDED: bigint;
};
interface ApplicationFlagsConstructor {
    new (bits?: import("../Types").BitFieldResolvable<typeof FLAGS>): ApplicationFlags;
    readonly prototype: ApplicationFlags;
    readonly [Symbol.species]: ApplicationFlagsConstructor;
}
declare class ApplicationFlags extends BitField<typeof FLAGS> {
    ["constructor"]: typeof ApplicationFlags;
    static readonly default: typeof ApplicationFlags;
    readonly [Symbol.species]: ApplicationFlagsConstructor;
    static FLAGS: {
        MANAGED_EMOJI: bigint;
        GROUP_DM_CREATE: bigint;
        RPC_HAS_CONNECTED: bigint;
        GATEWAY_PRESENCE: bigint;
        GATEWAY_PRESENCE_LIMITED: bigint;
        GATEWAY_GUILD_MEMBERS: bigint;
        GATEWAY_GUILD_MEMBERS_LIMITED: bigint;
        VERIFICATION_PENDING_GUILD_LIMIT: bigint;
        EMBEDDED: bigint;
    };
    FLAGS: {
        MANAGED_EMOJI: bigint;
        GROUP_DM_CREATE: bigint;
        RPC_HAS_CONNECTED: bigint;
        GATEWAY_PRESENCE: bigint;
        GATEWAY_PRESENCE_LIMITED: bigint;
        GATEWAY_GUILD_MEMBERS: bigint;
        GATEWAY_GUILD_MEMBERS_LIMITED: bigint;
        VERIFICATION_PENDING_GUILD_LIMIT: bigint;
        EMBEDDED: bigint;
    };
    constructor(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>);
}
export = ApplicationFlags;
