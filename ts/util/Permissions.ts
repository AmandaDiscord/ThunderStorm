import BitField from "./BitField";

interface PermissionsConstructor {
	new(bits?: import("../Types").PermissionResolvable): Permissions;
	readonly prototype: Permissions;
	readonly [Symbol.species]: PermissionsConstructor;
}

const FLAGS = {
	CREATE_INSTANT_INVITE: BigInt(1) << BigInt(0),
	KICK_MEMBERS: BigInt(1) << BigInt(1),
	BAN_MEMBERS: BigInt(1) << BigInt(2),
	ADMINISTRATOR: BigInt(1) << BigInt(3),
	MANAGE_CHANNELS: BigInt(1) << BigInt(4),
	MANAGE_GUILD: BigInt(1) << BigInt(5),
	ADD_REACTIONS: BigInt(1) << BigInt(6),
	VIEW_AUDIT_LOG: BigInt(1) << BigInt(7),
	PRIORITY_SPEAKER: BigInt(1) << BigInt(8),
	STREAM: BigInt(1) << BigInt(9),
	VIEW_CHANNEL: BigInt(1) << BigInt(10),
	SEND_MESSAGES: BigInt(1) << BigInt(11),
	SEND_TTS_MESSAGES: BigInt(1) << BigInt(12),
	MANAGE_MESSAGES: BigInt(1) << BigInt(13),
	EMBED_LINKS: BigInt(1) << BigInt(14),
	ATTACH_FILES: BigInt(1) << BigInt(15),
	READ_MESSAGE_HISTORY: BigInt(1) << BigInt(16),
	MENTION_EVERYONE: BigInt(1) << BigInt(17),
	USE_EXTERNAL_EMOJIS: BigInt(1) << BigInt(18),
	VIEW_GUILD_INSIGHTS: BigInt(1) << BigInt(19),
	CONNECT: BigInt(1) << BigInt(20),
	SPEAK: BigInt(1) << BigInt(21),
	MUTE_MEMBERS: BigInt(1) << BigInt(22),
	DEAFEN_MEMBERS: BigInt(1) << BigInt(23),
	MOVE_MEMBERS: BigInt(1) << BigInt(24),
	USE_VAD: BigInt(1) << BigInt(25),
	CHANGE_NICKNAME: BigInt(1) << BigInt(26),
	MANAGE_NICKNAMES: BigInt(1) << BigInt(27),
	MANAGE_ROLES: BigInt(1) << BigInt(28),
	MANAGE_WEBHOOKS: BigInt(1) << BigInt(29),
	MANAGE_EMOJIS: BigInt(1) << BigInt(30),
	USE_APPLICATION_COMMANDS: BigInt(1) << BigInt(31),
	REQUEST_TO_SPEAK: BigInt(1) << BigInt(32),
	MANAGE_THREADS: BigInt(1) << BigInt(34),
	CREATE_PUBLIC_THREADS: BigInt(1) << BigInt(35),
	CREATE_PRIVATE_THREADS: BigInt(1) << BigInt(36),
	USE_EXTERNAL_STICKERS: BigInt(1) << BigInt(37),
	SEND_MESSAGES_IN_THREADS: BigInt(1) << BigInt(38),
	START_EMBEDDED_ACTIVITIES: BigInt(1) << BigInt(39)
};


class Permissions extends BitField<typeof FLAGS> {
	// @ts-ignore
	public ["constructor"]: typeof Permissions;
	public static readonly default: typeof Permissions = Permissions;
	// @ts-ignore
	readonly [Symbol.species]: PermissionsConstructor;

	public static FLAGS = FLAGS;
	public FLAGS = FLAGS;
	public static ALL = Object.values(FLAGS).reduce((all, p) => all | p, BigInt(0));
	public static DEFAULT = BigInt(10432467);
	public static STAGE_MODERATOR = FLAGS.MANAGE_CHANNELS | FLAGS.MUTE_MEMBERS | FLAGS.MOVE_MEMBERS;
	public static defaultBit = BigInt(0);

	public constructor(bits?: import("../Types").PermissionResolvable) {
		super(bits || 0);
	}

	public any(permission: import("../Types").PermissionResolvable, checkAdmin = true) {
		return (checkAdmin && this.has(this.constructor.FLAGS.ADMINISTRATOR)) || super.any.call(this, permission);
	}

	public has(permission: import("../Types").PermissionResolvable, checkAdmin = true) {
		return (checkAdmin && super.has.call(this, this.constructor.FLAGS.ADMINISTRATOR)) || super.has.call(this, permission);
	}
}

export = Permissions;
