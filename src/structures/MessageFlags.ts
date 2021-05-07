import Constants from "../Constants";

import BitField from "./BitField";

interface MessageFlagsConstructor {
	new(bits?: import("../Types").BitFieldResolvable<typeof Constants.MESSAGE_FLAGS>): MessageFlags;
	readonly prototype: MessageFlags;
	readonly [Symbol.species]: MessageFlagsConstructor;
}

class MessageFlags extends BitField<typeof Constants.MESSAGE_FLAGS> {
	// @ts-ignore
	public ["constructor"]: typeof MessageFlags;
	public static readonly default: typeof MessageFlags = MessageFlags;
	// @ts-ignore
	readonly [Symbol.species]: MessageFlagsConstructor;

	public static FLAGS = Constants.MESSAGE_FLAGS;
	public FLAGS = Constants.MESSAGE_FLAGS;

	public constructor(bits?: import("../Types").BitFieldResolvable<typeof Constants.MESSAGE_FLAGS>) {
		super(bits || 0);
	}
}

export = MessageFlags;
