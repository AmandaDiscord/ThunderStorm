import BitField from "./BitField";

const FLAGS = {
	CROSSPOSTED: BigInt(1) << BigInt(0),
	IS_CROSSPOST: BigInt(1) << BigInt(1),
	SUPPRESS_EMBEDS: BigInt(1) << BigInt(2),
	SOURCE_MESSAGE_DELETED: BigInt(1) << BigInt(3),
	URGENT: BigInt(1) << BigInt(4),
	HAS_THREAD: BigInt(1) << BigInt(5),
	EPHEMERAL: BigInt(1) << BigInt(6),
	LOADING: BigInt(1) << BigInt(7)
};

interface MessageFlagsConstructor {
	new(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>): MessageFlags;
	readonly prototype: MessageFlags;
	readonly [Symbol.species]: MessageFlagsConstructor;
}

class MessageFlags extends BitField<typeof FLAGS> {
	// @ts-ignore
	public ["constructor"]: typeof MessageFlags;
	public static readonly default: typeof MessageFlags = MessageFlags;
	// @ts-ignore
	readonly [Symbol.species]: MessageFlagsConstructor;

	public static FLAGS = FLAGS;
	public FLAGS = FLAGS;

	public constructor(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>) {
		super(bits || 0);
	}
}

export = MessageFlags;
