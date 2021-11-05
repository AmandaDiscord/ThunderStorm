import BitField from "./BitField";

const FLAGS = {
	INSTANCE: BigInt(1) << BigInt(0),
	JOIN: BigInt(1) << BigInt(1),
	SPECTATE: BigInt(1) << BigInt(2),
	JOIN_REQUEST: BigInt(1) << BigInt(3),
	SYNC: BigInt(1) << BigInt(4),
	PLAY: BigInt(1) << BigInt(5),
	PARTY_PRIVACY_FRIENDS: BigInt(1) << BigInt(6),
	PARTY_PRIVACY_VOICE_CHANNEL: BigInt(1) << BigInt(7),
	EMBEDDED: BigInt(1) << BigInt(8)
};

interface ActivityFlagsConstructor {
	new(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>): ActivityFlags;
	readonly prototype: ActivityFlags;
	readonly [Symbol.species]: ActivityFlagsConstructor;
}

class ActivityFlags extends BitField<typeof FLAGS> {
	// @ts-ignore
	public ["constructor"]: typeof ActivityFlags;
	public static readonly default: typeof ActivityFlags = ActivityFlags;
	// @ts-ignore
	readonly [Symbol.species]: ActivityFlagsConstructor;

	public static FLAGS = FLAGS;
	public FLAGS = FLAGS;

	public constructor(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>) {
		super(bits || 0);
	}
}


export = ActivityFlags;
