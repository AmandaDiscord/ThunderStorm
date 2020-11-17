/**
 * I'm sorry for being lazy, discord.js
 */

import { resolveColor, resolveString, cloneObject } from "./Util/Util";

/**
 * Represents an embed in a message (image/video preview, rich embed, etc.)
 */
class MessageEmbed {
	/**
	 * The type of this embed, either:
	 * * `rich` - a rich embed
	 * * `image` - an image embed
	 * * `video` - a video embed
	 * * `gifv` - a gifv embed
	 * * `article` - an article embed
	 * * `link` - a link embed
	 */
	public type!: string;
	/**
	 * The title of this embed
	 */
	public title!: string | null;
	/**
	 * The description of this embed
	 */
	public description!: string | null;
	/**
	 * The URL of this embed
	 */
	public url!: string | null;
	/**
	 * The color of this embed
	 */
	public color!: number;
	/**
	 * The timestamp of this embed
	 */
	public timestamp!: number | null;
	public fields!: Array<import("../Types").EmbedField>;
	/**
	 * The thumbnail of this embed (if there is one)
	 */
	public thumbnail!: import("../Types").MessageEmbedThumbnail | null;
	/**
		 * The image of this embed, if there is one
		 */
	public image!: import("../Types").MessageEmbedImage | null;
	/**
	 * The author of this embed (if there is one)
	 */
	public author!: import("../Types").MessageEmbedAuthor | null;
	/**
	 * The provider of this embed (if there is one)
	 */
	public provider!: import("../Types").MessageEmbedProvider | null;
	/**
	 * The footer of this embed
	 */
	public footer!: import("../Types").MessageEmbedFooter | null;
	/**
	 * The files of this embed
	 */
	public files!: Array<import("../Types").FileOptions | string | import("./MessageAttachment")>;
	public video!: import("../Types").MessageEmbedVideo | null;

	/**
	 * @param data MessageEmbed to clone or raw embed data
	 */
	public constructor(data: import("@amanda/discordtypings").EmbedData = {}, skipValidation = false) {
		this.setup(data, skipValidation);
	}

	private setup(data: import("@amanda/discordtypings").EmbedData, skipValidation: boolean): void {
		this.type = data.type || "rich";
		this.title = data.title || null;
		this.description = data.description || null;
		this.url = data.url || null;
		this.color = resolveColor(data.color);
		this.timestamp = data.timestamp ? new Date(data.timestamp).getTime() : null;
		this.fields = [];
		if (data.fields) {
			this.fields = skipValidation ? data.fields.map(cloneObject) : MessageEmbed.normalizeFields(data.fields);
		}
		this.thumbnail = data.thumbnail
			? {
				url: data.thumbnail.url || "",
				proxyURL: (data.thumbnail.proxyURL || data.thumbnail.proxy_url) || "",
				height: data.thumbnail.height || 0,
				width: data.thumbnail.width || 0
			}
			: null;
		this.image = data.image
			? {
				url: data.image.url || "",
				proxyURL: (data.image.proxyURL || data.image.proxy_url) || "",
				height: data.image.height || 0,
				width: data.image.width || 0
			}
			: null;
		this.video = data.video
			? {
				url: data.video.url || "",
				proxyURL: (data.video.proxyURL || data.video.proxy_url) || "",
				height: data.video.height || 0,
				width: data.video.width || 0
			}
			: null;
		this.author = data.author
			? {
				name: data.author.name || "",
				url: data.author.url || "",
				iconURL: (data.author.iconURL || data.author.icon_url) || "",
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
				iconURL: (data.footer.iconURL || data.footer.icon_url) || "",
				proxyIconURL: (data.footer.proxyIconURL || data.footer.proxy_icon_url) || ""
			}
			: null;
		// @ts-ignore
		this.files = data.files || [];
	}

	/**
	 * The date displayed on this embed
	 */
	public get createdAt() {
		return this.timestamp ? new Date(this.timestamp) : null;
	}

	/**
	 * The hexadecimal version of the embed color, with a leading hash
	 */
	public get hexColor() {
		return this.color ? `#${this.color.toString(16).padStart(6, "0")}` : null;
	}

	/**
	 * The accumulated length for the embed title, description, fields and footer text
	 */
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

	/**
	 * Adds a field to the embed (max 25).
	 * @param name The name of this field
	 * @param value The value of this field
	 * @param inline If this field will be displayed inline
	 */
	public addField(name: import("../Types").StringResolvable, value: import("../Types").StringResolvable, inline = false): this {
		return this.addFields({ name, value, inline });
	}

	/**
	 * Adds fields to the embed (max 25).
	 * @param fields The fields to add
	 */
	public addFields(...fields: (import("../Types").EmbedFieldData | import("../Types").EmbedFieldData[])[]): this {
		// @ts-ignore
		this.fields.push(...MessageEmbed.normalizeFields(fields));
		return this;
	}

	/**
	 * Removes, replaces, and inserts fields in the embed (max 25).
	 * @param index The index to start at
	 * @param deleteCount The number of fields to remove
	 * @param fields The replacing field objects
	 */
	public spliceFields(index: number, deleteCount: number, ...fields: (import("../Types").EmbedFieldData | import("../Types").EmbedFieldData[])[]): this {
		this.fields.splice(index, deleteCount, ...MessageEmbed.normalizeFields(...fields));
		return this;
	}

	/**
	 * Sets the file to upload alongside the embed. This file can be accessed via `attachment://fileName.extension` when
	 * setting an embed image or author/footer icons. Multiple files can be attached.
	 * @param files Files to attach
	 */
	public attachFiles(files: Array<import("../Types").FileOptions | string | import("./MessageAttachment")>): this {
		this.files = this.files.concat(files);
		return this;
	}

	/**
	 * Sets the author of this embed.
	 * @param name The name of the author
	 * @param iconURL The icon URL of the author
	 * @param url The URL of the author
	 */
	public setAuthor(name: import("../Types").StringResolvable, iconURL?: string, url?: string): this {
		// @ts-ignore
		this.author = { name: resolveString(name), iconURL, url };
		return this;
	}

	/**
	 * Sets the color of this embed.
	 * @param color The color of the embed
	 */
	public setColor(color: import("../Types").ColorResolvable): this {
		this.color = resolveColor(color);
		return this;
	}

	/**
	 * Sets the description of this embed.
	 * @param description The description
	 */
	public setDescription(description: import("../Types").StringResolvable): this {
		description = resolveString(description);
		this.description = description;
		return this;
	}

	/**
	 * Sets the footer of this embed.
	 * @param text The text of the footer
	 * @param iconURL The icon URL of the footer
	 */
	public setFooter(text: import("../Types").StringResolvable, iconURL?: string): this {
		text = resolveString(text);
		// @ts-ignore
		this.footer = { text, iconURL, proxyIconURL: undefined };
		return this;
	}

	/**
	 * Sets the image of this embed.
	 * @param url The URL of the image
	 */
	public setImage(url: string): this {
		// @ts-ignore
		this.image = { url };
		return this;
	}

	/**
	 * Sets the thumbnail of this embed.
	 * @param url The URL of the thumbnail
	 */
	public setThumbnail(url: string): this {
		// @ts-ignore
		this.thumbnail = { url };
		return this;
	}

	/**
	 * Sets the timestamp of this embed.
	 * @param timestamp The timestamp or date
	 */
	public setTimestamp(timestamp: Date | number = Date.now()): this {
		if (timestamp instanceof Date) timestamp = timestamp.getTime();
		this.timestamp = timestamp;
		return this;
	}

	/**
	 * Sets the title of this embed.
	 * @param title The title
	 */
	public setTitle(title: import("../Types").StringResolvable): this {
		title = resolveString(title);
		this.title = title;
		return this;
	}

	/**
	 * Sets the URL of this embed.
	 * @param url The URL
	 */
	public setURL(url: string): this {
		this.url = url;
		return this;
	}

	/**
	 * Transforms the embed to a plain object.
	 * @returns The raw data of this embed
	 */
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

	/**
	 * Normalizes field input and resolves strings.
	 * @param name The name of the field
	 * @param value The value of the field
	 * @param inline Set the field to display inline
	 */
	public static normalizeField(name: import("../Types").StringResolvable, value: import("../Types").StringResolvable, inline = false): import("../Types").EmbedField {
		name = resolveString(name);
		if (!name) throw new RangeError("EMBED_FIELD_NAME");
		value = resolveString(value);
		if (!value) throw new RangeError("EMBED_FIELD_VALUE");
		return { name, value, inline };
	}

	/**
	 * Normalizes field input and resolves strings.
	 * @param fields Fields to normalize
	 */
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
