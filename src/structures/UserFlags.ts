import Constants from "../Constants";

import BitField from "./BitField";

interface UserFlagsConstructor {
	new(bits?: import("../Types").BitFieldResolvable<typeof Constants.USER_FLAGS>): UserFlags;
	readonly prototype: UserFlags;
	readonly [Symbol.species]: UserFlagsConstructor;
}

class UserFlags extends BitField<typeof Constants.USER_FLAGS> {
	// @ts-ignore
	public ["constructor"]: typeof UserFlags;
	public static readonly default: typeof UserFlags = UserFlags;
	// @ts-ignore
	readonly [Symbol.species]: UserFlagsConstructor;

	public static FLAGS = Constants.USER_FLAGS;
	public FLAGS = Constants.USER_FLAGS;

	public constructor(bits?: import("../Types").BitFieldResolvable<typeof Constants.USER_FLAGS>) {
		super(bits || 0);
	}
}

export = UserFlags;
