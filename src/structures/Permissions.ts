import Constants from "../Constants";

import BitField from "./BitField";

interface PermissionsConstructor {
	new(bits: import("../Types").PermissionResolvable): Permissions;
	readonly prototype: Permissions;
	readonly [Symbol.species]: PermissionsConstructor;
}

class Permissions extends BitField<typeof Constants.PERMISSION_FLAGS> {
	// @ts-ignore
	public ["constructor"]: typeof Permissions;
	public static readonly default: typeof Permissions = Permissions;
	// @ts-ignore
	readonly [Symbol.species]: PermissionsConstructor;

	public static ALL = Object.values(Constants.PERMISSION_FLAGS).reduce((all, p) => all | p, BigInt(0));
	public static DEFAULT = BigInt(10432467);

	public constructor(bits: import("../Types").PermissionResolvable) {
		// @ts-ignore
		super(bits);
	}

	public static get FLAGS() {
		return Constants.PERMISSION_FLAGS;
	}

	public get FLAGS() {
		return Constants.PERMISSION_FLAGS;
	}

	/**
	 * Checks whether the bitfield has a permission, or any of multiple permissions.
	 * @param permission Permission(s) to check for
	 * @param checkAdmin Whether to allow the administrator permission to override
	 */
	public any(permission: import("../Types").PermissionResolvable, checkAdmin = true) {
		return (checkAdmin && this.has(this.constructor.FLAGS.ADMINISTRATOR)) || super.any.call(this, permission);
	}

	/**
	 * Checks whether the bitfield has a permission, or multiple permissions.
	 * @param permission Permission(s) to check for
	 * @param checkAdmin Whether to allow the administrator permission to override
	 */
	public has(permission: import("../Types").PermissionResolvable, checkAdmin = true) {
		return (checkAdmin && super.has.call(this, this.constructor.FLAGS.ADMINISTRATOR)) || super.has.call(this, permission);
	}
}

export = Permissions;
