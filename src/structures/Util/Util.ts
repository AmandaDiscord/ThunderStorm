import { parse } from "path";

import { Colors } from "../../Constants";

export function isObject(d: any) {
	return typeof d === "object" && d !== null;
}

/**
 * Flatten an object. Any properties that are collections will get converted to an array of keys.
 * @param obj The object to flatten.
 * @param props Specific properties to include/exclude.
 */
export function flatten(obj: any, ...props: Array<{ [s: string]: boolean | string; }>): any {
	if (!isObject(obj)) return obj;

	const objProps = Object.keys(obj)
		.filter(k => !k.startsWith("_"))
		.map(k => ({ [k]: true }));

	// @ts-ignore
	props = objProps.length ? Object.assign(...objProps, ...props) : Object.assign({}, ...props);

	const out = {};

	// eslint-disable-next-line prefer-const
	for (let [prop, newProp] of Object.entries(props)) {
		if (!newProp) continue;
		// @ts-ignore
		newProp = newProp === true ? prop : newProp;

		const element = obj[prop];
		const elemIsObj = isObject(element);
		const valueOf = elemIsObj && typeof element.valueOf === "function" ? element.valueOf() : null;

		// If it's an array, flatten each element
		// @ts-ignore
		if (Array.isArray(element)) out[newProp] = element.map(e => flatten(e));
		// If it's an object with a primitive `valueOf`, use that value
		// @ts-ignore
		else if (typeof valueOf !== "object") out[newProp] = valueOf;
		// If it's a primitive
		// @ts-ignore
		else if (!elemIsObj) out[newProp] = element;
	}

	return out;
}

/**
 * Alternative to Node's `path.basename`, removing query string after the extension if it exists.
 * @param path Path to get the basename of
 * @param ext File extension to remove
 * @returns Basename of the path
 */
export function basename(path: string, ext?: string): string {
	const res = parse(path);
	return ext && res.ext.startsWith(ext) ? res.name : res.base.split("?")[0];
}

/**
 * Resolves a ColorResolvable into a color number.
 * @param color Color to resolve
 * @returns A color
 */
export function resolveColor(color: import("../../Types").ColorResolvable | undefined): number {
	if (typeof color === "string") {
		if (color === "RANDOM") return Math.floor(Math.random() * (0xffffff + 1));
		if (color === "DEFAULT") return 0;
		color = Colors[color] || parseInt(color.replace("#", ""), 16);
	} else if (Array.isArray(color)) {
		color = (color[0] << 16) + (color[1] << 8) + color[2];
	}

	if ((color && color < 0) || (color && color > 0xffffff)) throw new RangeError("COLOR_RANGE");
	else if (color && isNaN(color)) throw new TypeError("COLOR_CONVERT");

	return color || 0;
}

/**
 * Resolves a StringResolvable to a string.
 * @param data The string resolvable to resolve
 */
export function resolveString(data: import("../../Types").StringResolvable): string {
	if (typeof data === "string") return data;
	if (Array.isArray(data)) return data.join("\n");
	return String(data);
}

/**
 * Shallow-copies an object with its class/prototype intact.
 * @param obj Object to clone
 */
export function cloneObject<T>(obj: T): T {
	// @ts-ignore
	return Object.assign(Object.create(obj), obj);
}

/**
 * Transforms a snowflake from a bit string to a decimal string.
 * @param num Bit string to be transformed
 */
export function binaryToID(num: string): string {
	let dec = "";

	while (num.length > 50) {
		const high = parseInt(num.slice(0, -32), 2);
		const low = parseInt((high % 10).toString(2) + num.slice(-32), 2);

		dec = (low % 10).toString() + dec;
		num =
			Math.floor(high / 10).toString(2) +
			Math.floor(low / 10)
				.toString(2)
				.padStart(32, "0");
	}

	// @ts-ignore
	num = parseInt(num, 2);
	// @ts-ignore
	while (num > 0) {
		// @ts-ignore
		dec = (num % 10).toString() + dec;
		// @ts-ignore
		num = Math.floor(num / 10);
	}

	return dec;
}

/**
 * Transforms a snowflake from a decimal string to a bit string.
 * @param num Snowflake to be transformed
 */
export function idToBinary(num: string): string {
	let bin = "";
	let high = parseInt(num.slice(0, -10)) || 0;
	let low = parseInt(num.slice(-10));
	while (low > 0 || high > 0) {
		bin = String(low & 1) + bin;
		low = Math.floor(low / 2);
		if (high > 0) {
			low += 5000000000 * (high % 2);
			high = Math.floor(high / 2);
		}
	}
	return bin;
}

// Discord epoch (2015-01-01T00:00:00.000Z)
const EPOCH = 1420070400000;
let INCREMENT = 0;

/**
 * A container for useful snowflake-related methods.
 */
export const SnowflakeUtil = {
	/**
	 * Generates a Discord snowflake.
	 * This hardcodes the worker ID as 1 and the process ID as 0.
	 * @param timestamp Timestamp or date of the snowflake to generate
	 * @returns The generated snowflake
	 */
	generate(timestamp: number | Date = Date.now()): string {
		if (timestamp instanceof Date) timestamp = timestamp.getTime();
		if (typeof timestamp !== "number" || isNaN(timestamp)) {
			throw new TypeError(
				`"timestamp" argument must be a number (received ${isNaN(timestamp) ? "NaN" : typeof timestamp})`
			);
		}
		if (INCREMENT >= 4095) INCREMENT = 0;
		const BINARY = `${(timestamp - EPOCH).toString(2).padStart(42, "0")}0000100000${(INCREMENT++)
			.toString(2)
			.padStart(12, "0")}`;
		return binaryToID(BINARY);
	},

	/**
	 * Deconstructs a Discord snowflake.
	 * @param snowflake Snowflake to deconstruct
	 * @returns Deconstructed snowflake
	 */
	deconstruct(snowflake: string) {
		// @ts-ignore
		const BINARY = idToBinary(snowflake).toString(2).padStart(64, "0");
		const res = {
			timestamp: parseInt(BINARY.substring(0, 42), 2) + EPOCH,
			workerID: parseInt(BINARY.substring(42, 47), 2),
			processID: parseInt(BINARY.substring(47, 52), 2),
			increment: parseInt(BINARY.substring(52, 64), 2),
			binary: BINARY
		};
		Object.defineProperty(res, "date", {
			get: function get() {
				return new Date(this.timestamp);
			},
			enumerable: true
		});
		return res;
	}
};

export default {
	isObject,
	flatten,
	basename,
	resolveColor,
	resolveString,
	cloneObject,
	SnowflakeUtil
};
