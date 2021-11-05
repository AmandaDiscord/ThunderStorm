import BitField from "./BitField";

const FLAGS = {
	GATEWAY_PRESENCE: BigInt(1) << BigInt(12),
	GATEWAY_PRESENCE_LIMITED: BigInt(1) << BigInt(13),
	GATEWAY_GUILD_MEMBERS: BigInt(1) << BigInt(14),
	GATEWAY_GUILD_MEMBERS_LIMITED: BigInt(1) << BigInt(15),
	VERIFICATION_PENDING_GUILD_LIMIT: BigInt(1) << BigInt(16),
	EMBEDDED: BigInt(1) << BigInt(17),
	GATEWAY_MESSAGE_CONTENT: BigInt(1) << BigInt(18),
	GATEWAY_MESSAGE_CONTENT_LIMITED: BigInt(1) << BigInt(19)
};

interface ApplicationFlagsConstructor {
	new(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>): ApplicationFlags;
	readonly prototype: ApplicationFlags;
	readonly [Symbol.species]: ApplicationFlagsConstructor;
}

class ApplicationFlags extends BitField<typeof FLAGS> {
	// @ts-ignore
	public ["constructor"]: typeof ApplicationFlags;
	public static readonly default: typeof ApplicationFlags = ApplicationFlags;
	// @ts-ignore
	readonly [Symbol.species]: ApplicationFlagsConstructor;

	public static FLAGS = FLAGS;
	public FLAGS = FLAGS;

	public constructor(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>) {
		super(bits || 0);
	}
}

export = ApplicationFlags;
