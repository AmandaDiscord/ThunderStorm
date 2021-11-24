// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BitField from "./BitField";

const FLAGS = {
	DISCORD_EMPLOYEE: BigInt(1) << BigInt(0),
	PARTNERED_SERVER_OWNER: BigInt(1) << BigInt(1),
	DISCORD_PARTNER: BigInt(1) << BigInt(1),
	HYPESQUAD_EVENTS: BigInt(1) << BigInt(2),
	BUGHUNTER_LEVEL_1: BigInt(1) << BigInt(3),
	HOUSE_BRAVERY: BigInt(1) << BigInt(6),
	HOUSE_BRILLIANCE: BigInt(1) << BigInt(7),
	HOUSE_BALANCE: BigInt(1) << BigInt(8),
	EARLY_SUPPORTER: BigInt(1) << BigInt(9),
	TEAM_USER: BigInt(1) << BigInt(10),
	SYSTEM: BigInt(1) << BigInt(12),
	BUGHUNTER_LEVEL_2: BigInt(1) << BigInt(14),
	VERIFIED_BOT: BigInt(1) << BigInt(16),
	EARLY_VERIFIED_BOT_DEVELOPER: BigInt(1) << BigInt(17),
	CERTIFIED_MODERATOR: BigInt(1) << BigInt(18),
	BOT_HTTP_INTERACTIONS: BigInt(1) << BigInt(19)
};

interface UserFlagsConstructor {
	new(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>): UserFlags;
	readonly prototype: UserFlags;
	readonly [Symbol.species]: UserFlagsConstructor;
}

class UserFlags extends BitField<typeof FLAGS> {
	// @ts-ignore
	public ["constructor"]: typeof UserFlags;
	public static readonly default = UserFlags;
	// @ts-ignore
	readonly [Symbol.species]: UserFlagsConstructor;

	public static FLAGS = FLAGS;
	public FLAGS = FLAGS;

	public constructor(bits?: import("../Types").BitFieldResolvable<typeof FLAGS>) {
		super(bits || 0);
	}
}

export = UserFlags;
