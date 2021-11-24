// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BitField from "./BitField";

const FLAGS = {
	SUPPRESS_JOIN_NOTIFICATIONS: BigInt(1) << BigInt(0),
	SUPPRESS_PREMIUM_SUBSCRIPTIONS: BigInt(1) << BigInt(1),
	SUPPRESS_GUILD_REMINDER_NOTIFICATIONS: BigInt(1) << BigInt(2),
	SUPPRESS_GUILD_NOTIFICATION_REPLIES: BigInt(1) << BigInt(3)
};

interface SystemChannelFlagsConstructor {
	new(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>): SystemChannelFlags;
	readonly prototype: SystemChannelFlags;
	readonly [Symbol.species]: SystemChannelFlagsConstructor;
}

class SystemChannelFlags extends BitField<typeof FLAGS> {
	// @ts-ignore
	public ["constructor"]: typeof SystemChannelFlags;
	public static readonly default = SystemChannelFlags;
	// @ts-ignore
	readonly [Symbol.species]: SystemChannelFlagsConstructor;

	public static FLAGS = FLAGS;
	public FLAGS = FLAGS;

	public constructor(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>) {
		super(bits || 0);
	}
}

export = SystemChannelFlags;
