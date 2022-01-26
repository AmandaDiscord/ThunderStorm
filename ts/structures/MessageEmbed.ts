// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import { RangeError } from "../errors";
import Util from "../util/Util";

class MessageEmbed {
	public type!: string;
	public title!: string | null;
	public description!: string | null;
	public url!: string | null;
	public color!: number;
	public timestamp!: number | null;
	public fields!: Array<import("../Types").EmbedField>;
	public thumbnail!: import("../Types").MessageEmbedThumbnail | null;
	public image!: import("../Types").MessageEmbedImage | null;
	public author!: import("../Types").MessageEmbedAuthor | null;
	public provider!: import("../Types").MessageEmbedProvider | null;
	public footer!: import("../Types").MessageEmbedFooter | null;
	public files!: Array<import("../Types").FileOptions | string | import("./MessageAttachment")>;
	public video!: import("../Types").MessageEmbedVideo | null;

	public static readonly default = MessageEmbed;

	public constructor(data: import("discord-typings").EmbedData = {}, skipValidation = false) {
		this.setup(data, skipValidation);
	}

	private setup(data: import("discord-typings").EmbedData, skipValidation: boolean): void {
		this.type = data.type || "rich";
		this.title = data.title || null;
		this.description = data.description || null;
		this.url = data.url || null;
		this.color = Util.resolveColor(data.color);
		this.timestamp = data.timestamp ? new Date(data.timestamp).getTime() : null;
		this.fields = [];
		if (data.fields) this.fields = skipValidation ? data.fields.map(Util.cloneObject) : MessageEmbed.normalizeFields(data.fields);
		this.thumbnail = data.thumbnail
			? {
				url: data.thumbnail.url || "",
				proxyURL: data.thumbnail.proxy_url || "",
				height: data.thumbnail.height || 0,
				width: data.thumbnail.width || 0
			}
			: null;
		this.image = data.image
			? {
				url: data.image.url || "",
				proxyURL: data.image.proxy_url || "",
				height: data.image.height || 0,
				width: data.image.width || 0
			}
			: null;
		this.video = data.video
			? {
				url: data.video.url || "",
				proxyURL: data.video.proxy_url || "",
				height: data.video.height || 0,
				width: data.video.width || 0
			}
			: null;
		this.author = data.author
			? {
				name: data.author.name || "",
				url: data.author.url || "",
				// @ts-ignore
				iconURL: (data.author.iconURL || data.author.icon_url) || "",
				// @ts-ignore
				proxyIconURL: (data.author.proxyIconURL || data.author.proxy_icon_url) || ""
			}
			: null;
		this.provider = data.provider
			? {
				name: data.provider.name || "",
				url: data.provider.name || ""
			}
			: null;
		this.footer = data.footer
			? {
				text: data.footer.text || "",
				iconURL: data.footer.icon_url || "",
				proxyIconURL: data.footer.proxy_icon_url || ""
			}
			: null;
		// @ts-ignore
		this.files = data.files || [];
	}

	public get createdAt() {
		return this.timestamp ? new Date(this.timestamp) : null;
	}

	public get hexColor() {
		return this.color ? `#${this.color.toString(16).padStart(6, "0")}` : null;
	}

	public get length() {
		return (
			(this.title ? this.title.length : 0) +
			(this.description ? this.description.length : 0) +
			(this.fields.length >= 1
				? this.fields.reduce((prev, curr) => prev + curr.name.length + curr.value.length, 0)
				: 0) +
			(this.footer ? this.footer.text.length : 0)
		);
	}

	public addField(name: import("../Types").StringResolvable, value: import("../Types").StringResolvable, inline = false): this {
		return this.addFields({ name, value, inline });
	}

	public addFields(...fields: (import("../Types").EmbedFieldData | import("../Types").EmbedFieldData[])[]): this {
		this.fields.push(...MessageEmbed.normalizeFields(...fields));
		return this;
	}

	public spliceFields(index: number, deleteCount: number, ...fields: (import("../Types").EmbedFieldData | import("../Types").EmbedFieldData[])[]): this {
		this.fields.splice(index, deleteCount, ...MessageEmbed.normalizeFields(...fields));
		return this;
	}

	public attachFiles(files: Array<import("../Types").FileOptions | string | import("./MessageAttachment")>): this {
		this.files = this.files.concat(files);
		return this;
	}

	public setAuthor(name: import("../Types").StringResolvable, iconURL?: string, url?: string): this {
		this.author = { name: Util.verifyString(name, RangeError as unknown as ErrorConstructor, "EMBED_AUTHOR_TEXT"), iconURL: iconURL as string, url: url as string, proxyIconURL: "" };
		return this;
	}

	public setColor(color: import("../Types").ColorResolvable): this {
		this.color = Util.resolveColor(color);
		return this;
	}

	public setDescription(description: import("../Types").StringResolvable): this {
		this.description = Util.verifyString(description, RangeError as unknown as ErrorConstructor, "EMBED_DESCRIPTION");
		return this;
	}

	public setFooter(text: import("../Types").StringResolvable, iconURL?: string): this {
		this.footer = { text: Util.verifyString(text, RangeError as unknown as ErrorConstructor, "EMBED_FOOTER_TEXT"), iconURL: iconURL as string, proxyIconURL: "" };
		return this;
	}

	public setImage(url: string): this {
		this.image = { url, proxyURL: "", height: 0, width: 0 };
		return this;
	}

	public setThumbnail(url: string): this {
		this.thumbnail = { url, proxyURL: "", height: 0, width: 0 };
		return this;
	}

	public setTimestamp(timestamp: Date | number = Date.now()): this {
		if (timestamp instanceof Date) timestamp = timestamp.getTime();
		this.timestamp = timestamp;
		return this;
	}

	public setTitle(title: import("../Types").StringResolvable): this {
		this.title = Util.verifyString(title, RangeError as unknown as ErrorConstructor, "EMBED_TITLE");
		return this;
	}

	public setURL(url: string): this {
		this.url = url;
		return this;
	}

	public toJSON() {
		return {
			title: this.title,
			type: "rich",
			description: this.description,
			url: this.url,
			timestamp: this.timestamp ? new Date(this.timestamp) : null,
			color: this.color,
			fields: this.fields,
			thumbnail: this.thumbnail,
			image: this.image,
			author: this.author
				? {
					name: this.author.name,
					url: this.author.url,
					icon_url: this.author.iconURL
				}
				: null,
			footer: this.footer
				? {
					text: this.footer.text,
					icon_url: this.footer.iconURL
				}
				: null
		};
	}

	public static normalizeField(name: import("../Types").StringResolvable, value: import("../Types").StringResolvable, inline = false): import("../Types").EmbedField {
		return {
			name: Util.verifyString(name, RangeError as unknown as ErrorConstructor, "EMBED_FIELD_NAME", false),
			value: Util.verifyString(value, RangeError as unknown as ErrorConstructor, "EMBED_FIELD_VALUE", false),
			inline
		};
	}

	public static normalizeFields(...fields: (import("../Types").EmbedFieldData | import("../Types").EmbedFieldData[])[]): import("../Types").EmbedField[] {
		return fields
			.flat(2)
			.map(field =>
				this.normalizeField(
					field && field.name,
					field && field.value,
					field && typeof field.inline === "boolean" ? field.inline : false
				)
			);
	}
}

export = MessageEmbed;
