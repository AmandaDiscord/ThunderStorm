// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import Util from "../util/Util";

class MessageAttachment {
	public attachment: string | Buffer | import("stream").Stream;
	public name: string | null;
	public id!: string;
	public size!: number;
	public url!: string;
	public proxyURL = "";
	public height: number | null = null;
	public width: number | null = null;

	public static readonly default = MessageAttachment;

	public constructor(attachment: import("../Types").BufferResolvable | import("stream").Stream, name: string | null = null, data?: import("discord-typings").AttachmentData) {
		this.attachment = attachment;
		this.name = name;
		if (data) {
			if (data.id) this.id = data.id;
			if (data.size) this.size = data.size;
			if (data.url) this.url = data.url;
			if (data.proxy_url) this.proxyURL = data.proxy_url;
			if (data.height) this.height = data.height;
			if (data.width) this.width = data.width;
		}
	}

	public setFile(attachment: import("../Types").BufferResolvable | import("stream").Stream, name: string | null = null): this {
		this.attachment = attachment;
		this.name = name;
		return this;
	}

	public setName(name: string): this {
		this.name = name;
		return this;
	}

	public _patch(data: import("discord-typings").AttachmentData) {
		if (data.id) this.id = data.id;
		if (data.size) this.size = data.size;
		if (data.url) this.url = data.url;
		if (data.proxy_url) this.proxyURL = data.proxy_url;
		if (data.height) this.height = data.height;
		if (data.width) this.width = data.width;
	}

	public get spoiler() {
		return Util.basename(this.url).startsWith("SPOILER_");
	}

	public toJSON() {
		return {
			id: this.id,
			size: this.size,
			url: this.url,
			proxy_url: this.url,
			height: this.height,
			width: this.width,
			name: this.name,
			attachment: this.attachment
		};
	}
}

export = MessageAttachment;
