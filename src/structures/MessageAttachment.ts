import { parse } from "path";

const isObject = (d: any) => typeof d === "object" && d !== null;

/**
 * Flatten an object. Any properties that are collections will get converted to an array of keys.
 * @param obj The object to flatten.
 * @param props Specific properties to include/exclude.
 */
function flatten(obj: any, ...props: Array<{ [s: string]: boolean | string; }>): any {
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
function basename(path: string, ext?: string): string {
	const res = parse(path);
	return ext && res.ext.startsWith(ext) ? res.name : res.base.split("?")[0];
}

/**
 * Represents an attachment in a message.
 */
class MessageAttachment {
	public attachment: string | Buffer | import("stream").Stream;
	/**
	 * The name of this attachment
	 */
	public name: string | null;
	/**
	 * The ID of this attachment
	 */
	public id!: string;
	/**
	 * The size of this attachment in bytes
	 */
	public size!: number;
	/**
	 * The URL to this attachment
	 */
	public url!: string;
	/**
	 * The Proxy URL to this attachment
	 */
	public proxyURL!: string;
	/**
	 * The height of this attachment (if an image or video)
	 */
	public height!: number | null;
	/**
	 * The width of this attachment (if an image or video)
	 */
	public width!: number | null;

	/**
	 * @param attachment The file
	 * @param name The name of the file, if any
	 * @param data Extra data
	 */
	public constructor(attachment: import("../types").BufferResolvable | import("stream").Stream, name: string | null = null, data?: any) {
		this.attachment = attachment;
		this.name = name;
		if (data) this._patch(data);
	}

	/**
	 * Sets the file of this attachment.
	 * @param attachment The file
	 * @param name The name of the file, if any
	 * @returns This attachment
	 */
	public setFile(attachment: import("../types").BufferResolvable | import("stream").Stream, name: string | null = null): this {
		this.attachment = attachment;
		this.name = name;
		return this;
	}

	/**
	 * Sets the name of this attachment.
	 * @param name The name of the file
	 * @returns This attachment
	 */
	public setName(name: string): this {
		this.name = name;
		return this;
	}

	public _patch(data: any) {
		this.id = data.id;
		this.size = data.size;
		this.url = data.url;
		this.proxyURL = data.proxy_url;
		this.height = typeof data.height !== "undefined" ? data.height : null;
		this.width = typeof data.width !== "undefined" ? data.width : null;
	}

	/**
	 * Whether or not this attachment has been marked as a spoiler
	 */
	public get spoiler() {
		return basename(this.url).startsWith("SPOILER_");
	}

	public toJSON() {
		return flatten(this);
	}
}

export = MessageAttachment;
