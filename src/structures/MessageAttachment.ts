import { flatten, basename } from "./Util/Util";

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
	public constructor(attachment: import("../Types").BufferResolvable | import("stream").Stream, name: string | null = null, data?: any) {
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
	public setFile(attachment: import("../Types").BufferResolvable | import("stream").Stream, name: string | null = null): this {
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
