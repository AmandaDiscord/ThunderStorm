/**
 * I'm sorry for being lazy, discord.js
 */
undefined;

const Colors = {
	DEFAULT: 0x000000,
	WHITE: 0xffffff,
	AQUA: 0x1abc9c,
	GREEN: 0x2ecc71,
	BLUE: 0x3498db,
	YELLOW: 0xffff00,
	PURPLE: 0x9b59b6,
	LUMINOUS_VIVID_PINK: 0xe91e63,
	GOLD: 0xf1c40f,
	ORANGE: 0xe67e22,
	RED: 0xe74c3c,
	GREY: 0x95a5a6,
	NAVY: 0x34495e,
	DARK_AQUA: 0x11806a,
	DARK_GREEN: 0x1f8b4c,
	DARK_BLUE: 0x206694,
	DARK_PURPLE: 0x71368a,
	DARK_VIVID_PINK: 0xad1457,
	DARK_GOLD: 0xc27c0e,
	DARK_ORANGE: 0xa84300,
	DARK_RED: 0x992d22,
	DARK_GREY: 0x979c9f,
	DARKER_GREY: 0x7f8c8d,
	LIGHT_GREY: 0xbcc0c0,
	DARK_NAVY: 0x2c3e50,
	BLURPLE: 0x7289da,
	GREYPLE: 0x99aab5,
	DARK_BUT_NOT_BLACK: 0x2c2f33,
	NOT_QUITE_BLACK: 0x23272a,
	RANDOM: "lol"
};

/**
 * Can be a number, hex string, an RGB array like:
 * ```js
 * [255, 0, 255] // purple
 * ```
 * or one of the following strings:
 * - `DEFAULT`
 * - `WHITE`
 * - `AQUA`
 * - `GREEN`
 * - `BLUE`
 * - `YELLOW`
 * - `PURPLE`
 * - `LUMINOUS_VIVID_PINK`
 * - `GOLD`
 * - `ORANGE`
 * - `RED`
 * - `GREY`
 * - `DARKER_GREY`
 * - `NAVY`
 * - `DARK_AQUA`
 * - `DARK_GREEN`
 * - `DARK_BLUE`
 * - `DARK_PURPLE`
 * - `DARK_VIVID_PINK`
 * - `DARK_GOLD`
 * - `DARK_ORANGE`
 * - `DARK_RED`
 * - `DARK_GREY`
 * - `LIGHT_GREY`
 * - `DARK_NAVY`
 * - `BLURPLE`
 * - `GREYPLE`
 * - `DARK_BUT_NOT_BLACK`
 * - `NOT_QUITE_BLACK`
 * - `RANDOM`
 */
type ColorResolvable = keyof typeof Colors | number | Array<number>;

/**
 * Represents a field of a MessageEmbed
 */
interface EmbedField {
	/**
	 * The name of this field
	 */
	name: string;
	/**
	 * The value of this field
	 */
	value: string;
	/**
	 * If this field will be displayed inline
	 */
	inline: boolean;
}

interface FileOptions {
	/**
	 * File to attach
	 */
	attachment: import("../types").BufferResolvable;
	/**
	 * Filename of the attachment
	 */
	name?: string;
}

/**
 * Represents the thumbnail of a MessageEmbed
 */
interface MessageEmbedThumbnail {
	/**
	 * URL for this thumbnail
	 */
	url: string;
	/**
	 * ProxyURL for this thumbnail
	 */
	proxyURL: string;
	/**
	 * Height of this thumbnail
	 */
	height: number;
	/**
	 * Width of this thumbnail
	 */
	width: number;
}

/**
 * Represents the image of a MessageEmbed
 */
interface MessageEmbedImage {
	/**
	 * URL for this image
	 */
	url: string;
	/**
	 * ProxyURL for this image
	 */
	proxyURL: string;
	/**
	 * Height of this image
	 */
	height: number;
	/**
	 * Width of this image
	 */
	width: number;
}

/**
 * Represents the video of a MessageEmbed
 */
interface MessageEmbedVideo {
	/**
	 * URL of this video
	 */
	url: string;
	/**
	 * ProxyURL for this video
	 */
	proxyURL: string;
	/**
	 * Height of this video
	 */
	height: number;
	/**
	 * Width of this video
	 */
	width: number;
}

/**
 * Represents the author field of a MessageEmbed
 */
interface MessageEmbedAuthor {
	/**
	 * The name of this author
	 */
	name: string;
	/**
	 * URL of this author
	 */
	url: string;
	/**
	 * URL of the icon for this author
	 */
	iconURL: string;
	/**
	 * Proxied URL of the icon for this author
	 */
	proxyIconURL: string;
}

/**
 * Represents the provider of a MessageEmbed
 */
interface MessageEmbedProvider {
	/**
	 * The name of this provider
	 */
	name: string;
	/**
	 * URL of this provider
	 */
	url: string;
}

/**
 * Represents the footer field of a MessageEmbed
 */
interface MessageEmbedFooter {
	/**
	 * The text of this footer
	 */
	text: string;
	/**
	 * URL of the icon for this footer
	 */
	iconURL: string;
	/**
	 * Proxied URL of the icon for this footer
	 */
	proxyIconURL: string;
}

interface EmbedFieldData {
	name: import("../types").StringResolvable;
	value: import("../types").StringResolvable;
	inline?: boolean
}


/**
 * Resolves a ColorResolvable into a color number.
 * @param color Color to resolve
 * @returns A color
 */
function resolveColor(color: ColorResolvable | undefined): number {
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
function resolveString(data: import("../types").StringResolvable): string {
	if (typeof data === "string") return data;
	if (Array.isArray(data)) return data.join("\n");
	return String(data);
}

/**
 * Shallow-copies an object with its class/prototype intact.
 * @param obj Object to clone
 */
function cloneObject<T>(obj: T): T {
	// @ts-ignore
	return Object.assign(Object.create(obj), obj);
}

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
	public fields!: Array<EmbedField>;
	/**
	 * The thumbnail of this embed (if there is one)
	 */
	public thumbnail!: MessageEmbedThumbnail | null;
	/**
		 * The image of this embed, if there is one
		 */
	public image!: MessageEmbedImage | null;
	/**
	 * The author of this embed (if there is one)
	 */
	public author!: MessageEmbedAuthor | null;
	/**
	 * The provider of this embed (if there is one)
	 */
	public provider!: MessageEmbedProvider | null;
	/**
	 * The footer of this embed
	 */
	public footer!: MessageEmbedFooter | null;
	/**
	 * The files of this embed
	 */
	public files!: Array<FileOptions|string|import("./MessageAttachment")>;
	public video!: MessageEmbedVideo | null;

	/**
	 * @param data MessageEmbed to clone or raw embed data
	 */
	public constructor(data: import("@amanda/discordtypings").EmbedData = {}, skipValidation = false) {
		this.setup(data, skipValidation);
	}

	private setup(data: import("@amanda/discordtypings").EmbedData, skipValidation: boolean) {
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
	public addField(name: import("../types").StringResolvable, value: import("../types").StringResolvable, inline = false): this {
		return this.addFields({ name, value, inline });
	}

	/**
	 * Adds fields to the embed (max 25).
	 * @param fields The fields to add
	 */
	public addFields(...fields: (EmbedFieldData | EmbedFieldData[])[]): this {
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
	public spliceFields(index: number, deleteCount: number, ...fields: (EmbedFieldData | EmbedFieldData[])[]): this {
		this.fields.splice(index, deleteCount, ...MessageEmbed.normalizeFields(...fields));
		return this;
	}

	/**
	 * Sets the file to upload alongside the embed. This file can be accessed via `attachment://fileName.extension` when
	 * setting an embed image or author/footer icons. Multiple files can be attached.
	 * @param files Files to attach
	 */
	public attachFiles(files: Array<FileOptions | string | import("./MessageAttachment")>): this {
		this.files = this.files.concat(files);
		return this;
	}

	/**
	 * Sets the author of this embed.
	 * @param name The name of the author
	 * @param iconURL The icon URL of the author
	 * @param url The URL of the author
	 */
	public setAuthor(name: import("../types").StringResolvable, iconURL?: string, url?: string): this {
		// @ts-ignore
		this.author = { name: resolveString(name), iconURL, url };
		return this;
	}

	/**
	 * Sets the color of this embed.
	 * @param color The color of the embed
	 */
	public setColor(color: ColorResolvable): this {
		this.color = resolveColor(color);
		return this;
	}

	/**
	 * Sets the description of this embed.
	 * @param description The description
	 */
	public setDescription(description: import("../types").StringResolvable): this {
		description = resolveString(description);
		this.description = description;
		return this;
	}

	/**
	 * Sets the footer of this embed.
	 * @param text The text of the footer
	 * @param iconURL The icon URL of the footer
	 */
	public setFooter(text: import("../types").StringResolvable, iconURL?: string): this {
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
	public setTitle(title: import("../types").StringResolvable): this {
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
	public static normalizeField(name: import("../types").StringResolvable, value: import("../types").StringResolvable, inline = false): EmbedField {
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
	public static normalizeFields(...fields: (EmbedFieldData | EmbedFieldData[])[]): EmbedField[] {
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
