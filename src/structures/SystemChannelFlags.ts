import Constants from "../Constants";

import BitField from "./BitField";

interface SystemChannelFlagsConstructor {
	new(bits?: import("../Types").BitFieldResolvable<typeof Constants.SYSTEM_CHANNEL_FLAGS>): SystemChannelFlags;
	readonly prototype: SystemChannelFlags;
	readonly [Symbol.species]: SystemChannelFlagsConstructor;
}

class SystemChannelFlags extends BitField<typeof Constants.SYSTEM_CHANNEL_FLAGS> {
	// @ts-ignore
	public ["constructor"]: typeof SystemChannelFlags;
	public static readonly default: typeof SystemChannelFlags = SystemChannelFlags;
	// @ts-ignore
	readonly [Symbol.species]: SystemChannelFlagsConstructor;

	public static FLAGS = Constants.SYSTEM_CHANNEL_FLAGS;
	public FLAGS = Constants.SYSTEM_CHANNEL_FLAGS;

	public constructor(bits?: import("../Types").BitFieldResolvable<typeof Constants.SYSTEM_CHANNEL_FLAGS>) {
		super(bits || 0);
	}
}

export = SystemChannelFlags;
