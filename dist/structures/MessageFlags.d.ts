import Constants from "../Constants";
import BitField from "./BitField";
interface MessageFlagsConstructor {
    new (bits?: import("../Types").BitFieldResolvable<typeof Constants.MESSAGE_FLAGS>): MessageFlags;
    readonly prototype: MessageFlags;
    readonly [Symbol.species]: MessageFlagsConstructor;
}
declare class MessageFlags extends BitField<typeof Constants.MESSAGE_FLAGS> {
    ["constructor"]: typeof MessageFlags;
    static readonly default: typeof MessageFlags;
    readonly [Symbol.species]: MessageFlagsConstructor;
    static FLAGS: {
        CROSSPOSTED: bigint;
        IS_CROSSPOST: bigint;
        SOURCE_MESSAGE_DELETED: bigint;
        URGENT: bigint;
    };
    FLAGS: {
        CROSSPOSTED: bigint;
        IS_CROSSPOST: bigint;
        SOURCE_MESSAGE_DELETED: bigint;
        URGENT: bigint;
    };
    constructor(bits?: import("../Types").BitFieldResolvable<typeof Constants.MESSAGE_FLAGS>);
}
export = MessageFlags;
