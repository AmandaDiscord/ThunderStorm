import Constants from "../Constants";
import BitField from "./BitField";
interface SystemChannelFlagsConstructor {
    new (bits?: import("../Types").BitFieldResolvable<typeof Constants.SYSTEM_CHANNEL_FLAGS>): SystemChannelFlags;
    readonly prototype: SystemChannelFlags;
    readonly [Symbol.species]: SystemChannelFlagsConstructor;
}
declare class SystemChannelFlags extends BitField<typeof Constants.SYSTEM_CHANNEL_FLAGS> {
    ["constructor"]: typeof SystemChannelFlags;
    static readonly default: typeof SystemChannelFlags;
    readonly [Symbol.species]: SystemChannelFlagsConstructor;
    static FLAGS: {
        WELCOME_MESSAGE_DISABLED: bigint;
        BOOST_MESSAGE_DISABLED: bigint;
    };
    FLAGS: {
        WELCOME_MESSAGE_DISABLED: bigint;
        BOOST_MESSAGE_DISABLED: bigint;
    };
    constructor(bits?: import("../Types").BitFieldResolvable<typeof Constants.SYSTEM_CHANNEL_FLAGS>);
}
export = SystemChannelFlags;
