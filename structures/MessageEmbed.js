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
 * @typedef {string|number|number[]} ColorResolvable
 */

/**
 * Represents a field of a MessageEmbed
 * @typedef {Object} EmbedField
 * @property {string} name The name of this field
 * @property {string} value The value of this field
 * @property {boolean} inline If this field will be displayed inline
 */

/**
 * @typedef {Object} FileOptions
 * @property {import("../typings/index").BufferResolvable} attachment File to attach
 * @property {string} [name='file.jpg'] Filename of the attachment
 */


/**
 * Resolves a ColorResolvable into a color number.
 * @param {ColorResolvable} color Color to resolve
 * @returns {number} A color
 */
function resolveColor(color) {
	if (typeof color === 'string') {
		if (color === 'RANDOM') return Math.floor(Math.random() * (0xffffff + 1));
		if (color === 'DEFAULT') return 0;
		color = Colors[color] || parseInt(color.replace('#', ''), 16);
	} else if (Array.isArray(color)) {
		color = (color[0] << 16) + (color[1] << 8) + color[2];
	}

	if (color < 0 || color > 0xffffff) throw new RangeError('COLOR_RANGE');
	// @ts-ignore
	else if (color && isNaN(color)) throw new TypeError('COLOR_CONVERT');

	// @ts-ignore
	return color;
}

/**
 * Resolves a StringResolvable to a string.
 * @param {import("../typings/index").StringResolvable} data The string resolvable to resolve
 * @returns {string}
 */
function resolveString(data) {
	if (typeof data === 'string') return data;
	if (Array.isArray(data)) return data.join('\n');
	return String(data);
}

/**
 * Shallow-copies an object with its class/prototype intact.
 * @param {T} obj Object to clone
 * @returns {T}
 * @template T
 * @private
 */
function cloneObject(obj) {
	// @ts-ignore
	return Object.assign(Object.create(obj), obj);
}

/**
 * Represents an embed in a message (image/video preview, rich embed, etc.)
 */
class MessageEmbed {
	/**
	 * @name MessageEmbed
	 * @kind constructor
	 * @param {import("../typings/internal").EmbedData} [data={}] MessageEmbed to clone or raw embed data
	 */
	constructor(data = {}, skipValidation = false) {
		this.setup(data, skipValidation);
	}

	/**
	 * @param {import("../typings/internal").EmbedData} data
	 * @param {boolean} skipValidation
	 */
	setup(data, skipValidation) {
		/**
		 * The type of this embed, either:
		 * * `rich` - a rich embed
		 * * `image` - an image embed
		 * * `video` - a video embed
		 * * `gifv` - a gifv embed
		 * * `article` - an article embed
		 * * `link` - a link embed
		 * @type {string}
		 */
		this.type = data.type;

		/**
		 * The title of this embed
		 * @type {?string}
		 */
		this.title = data.title;

		/**
		 * The description of this embed
		 * @type {?string}
		 */
		this.description = data.description;

		/**
		 * The URL of this embed
		 * @type {?string}
		 */
		this.url = data.url;

		/**
		 * The color of this embed
		 * @type {?number}
		 */
		this.color = resolveColor(data.color);

		/**
		 * The timestamp of this embed
		 * @type {?number}
		 */
		this.timestamp = data.timestamp ? new Date(data.timestamp).getTime() : null;

		/**
		 * Represents a field of a MessageEmbed
		 * @typedef {Object} EmbedField
		 * @property {string} name The name of this field
		 * @property {string} value The value of this field
		 * @property {boolean} inline If this field will be displayed inline
		 */

		/**
		 * The fields of this embed
		 * @type {EmbedField[]}
		 */
		this.fields = [];
		if (data.fields) {
			this.fields = skipValidation ? data.fields.map(cloneObject) : MessageEmbed.normalizeFields(data.fields);
		}

		/**
		 * Represents the thumbnail of a MessageEmbed
		 * @typedef {Object} MessageEmbedThumbnail
		 * @property {string} url URL for this thumbnail
		 * @property {string} proxyURL ProxyURL for this thumbnail
		 * @property {number} height Height of this thumbnail
		 * @property {number} width Width of this thumbnail
		 */

		/**
		 * The thumbnail of this embed (if there is one)
		 * @type {?MessageEmbedThumbnail}
		 */
		this.thumbnail = data.thumbnail
			? {
					url: data.thumbnail.url,
					proxyURL: data.thumbnail.proxyURL || data.thumbnail.proxy_url,
					height: data.thumbnail.height,
					width: data.thumbnail.width,
				}
			: null;

		/**
		 * Represents the image of a MessageEmbed
		 * @typedef {Object} MessageEmbedImage
		 * @property {string} url URL for this image
		 * @property {string} proxyURL ProxyURL for this image
		 * @property {number} height Height of this image
		 * @property {number} width Width of this image
		 */

		/**
		 * The image of this embed, if there is one
		 * @type {?MessageEmbedImage}
		 */
		this.image = data.image
			? {
					url: data.image.url,
					proxyURL: data.image.proxyURL || data.image.proxy_url,
					height: data.image.height,
					width: data.image.width,
				}
			: null;

		/**
		 * Represents the video of a MessageEmbed
		 * @typedef {Object} MessageEmbedVideo
		 * @property {string} url URL of this video
		 * @property {string} proxyURL ProxyURL for this video
		 * @property {number} height Height of this video
		 * @property {number} width Width of this video
		 */

		/**
		 * The video of this embed (if there is one)
		 * @type {?MessageEmbedVideo}
		 * @readonly
		 */
		// @ts-ignore
		this.video = data.video
			? {
					url: data.video.url,
					proxyURL: data.video.proxyURL || data.video.proxy_url,
					height: data.video.height,
					width: data.video.width,
				}
			: null;

		/**
		 * Represents the author field of a MessageEmbed
		 * @typedef {Object} MessageEmbedAuthor
		 * @property {string} name The name of this author
		 * @property {string} url URL of this author
		 * @property {string} iconURL URL of the icon for this author
		 * @property {string} proxyIconURL Proxied URL of the icon for this author
		 */

		/**
		 * The author of this embed (if there is one)
		 * @type {?MessageEmbedAuthor}
		 */
		this.author = data.author
			? {
					name: data.author.name,
					url: data.author.url,
					iconURL: data.author.iconURL || data.author.icon_url,
					proxyIconURL: data.author.proxyIconURL || data.author.proxy_icon_url,
				}
			: null;

		/**
		 * Represents the provider of a MessageEmbed
		 * @typedef {Object} MessageEmbedProvider
		 * @property {string} name The name of this provider
		 * @property {string} url URL of this provider
		 */

		/**
		 * The provider of this embed (if there is one)
		 * @type {?MessageEmbedProvider}
		 */
		this.provider = data.provider
			? {
					name: data.provider.name,
					url: data.provider.name,
				}
			: null;

		/**
		 * Represents the footer field of a MessageEmbed
		 * @typedef {Object} MessageEmbedFooter
		 * @property {string} text The text of this footer
		 * @property {string} iconURL URL of the icon for this footer
		 * @property {string} proxyIconURL Proxied URL of the icon for this footer
		 */

		/**
		 * The footer of this embed
		 * @type {?MessageEmbedFooter}
		 */
		this.footer = data.footer
			? {
					text: data.footer.text,
					iconURL: data.footer.iconURL || data.footer.icon_url,
					proxyIconURL: data.footer.proxyIconURL || data.footer.proxy_icon_url,
				}
			: null;

		/**
		 * The files of this embed
		 * @type {Array<FileOptions|string|import("./MessageAttachment")>}
		 */
		// @ts-ignore
		this.files = data.files || [];
	}

	/**
	 * The date displayed on this embed
	 * @type {?Date}
	 * @readonly
	 */
	get createdAt() {
		return this.timestamp ? new Date(this.timestamp) : null;
	}

	/**
	 * The hexadecimal version of the embed color, with a leading hash
	 * @type {?string}
	 * @readonly
	 */
	get hexColor() {
		return this.color ? `#${this.color.toString(16).padStart(6, '0')}` : null;
	}

	/**
	 * The accumulated length for the embed title, description, fields and footer text
	 * @type {number}
	 * @readonly
	 */
	get length() {
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
	 * @param {import("../typings/index").StringResolvable} name The name of this field
	 * @param {import("../typings/index").StringResolvable} value The value of this field
	 * @param {boolean} [inline=false] If this field will be displayed inline
	 * @returns {MessageEmbed}
	 */
	addField(name, value, inline) {
		return this.addFields({ name, value, inline });
	}

	/**
	 * Adds fields to the embed (max 25).
	 * @param {...EmbedFieldData|EmbedFieldData[]} fields The fields to add
	 * @returns {MessageEmbed}
	 */
	addFields(...fields) {
		// @ts-ignore
		this.fields.push(...MessageEmbed.normalizeFields(fields));
		return this;
	}

	/**
	 * Removes, replaces, and inserts fields in the embed (max 25).
	 * @param {number} index The index to start at
	 * @param {number} deleteCount The number of fields to remove
	 * @param {...EmbedFieldData|EmbedFieldData[]} [fields] The replacing field objects
	 * @returns {MessageEmbed}
	 */
	spliceFields(index, deleteCount, ...fields) {
		this.fields.splice(index, deleteCount, ...MessageEmbed.normalizeFields(...fields));
		return this;
	}

	/**
	 * Sets the file to upload alongside the embed. This file can be accessed via `attachment://fileName.extension` when
	 * setting an embed image or author/footer icons. Multiple files can be attached.
	 * @param {Array<FileOptions|string|import("./MessageAttachment")>} files Files to attach
	 * @returns {MessageEmbed}
	 */
	attachFiles(files) {
		this.files = this.files.concat(files);
		return this;
	}

	/**
	 * Sets the author of this embed.
	 * @param {import("../typings/index").StringResolvable} name The name of the author
	 * @param {string} [iconURL] The icon URL of the author
	 * @param {string} [url] The URL of the author
	 * @returns {MessageEmbed}
	 */
	setAuthor(name, iconURL, url) {
		// @ts-ignore
		this.author = { name: resolveString(name), iconURL, url };
		return this;
	}

	/**
	 * Sets the color of this embed.
	 * @param {ColorResolvable} color The color of the embed
	 * @returns {MessageEmbed}
	 */
	setColor(color) {
		this.color = resolveColor(color);
		return this;
	}

	/**
	 * Sets the description of this embed.
	 * @param {import("../typings/index").StringResolvable} description The description
	 * @returns {MessageEmbed}
	 */
	setDescription(description) {
		description = resolveString(description);
		this.description = description;
		return this;
	}

	/**
	 * Sets the footer of this embed.
	 * @param {import("../typings/index").StringResolvable} text The text of the footer
	 * @param {string} [iconURL] The icon URL of the footer
	 * @returns {MessageEmbed}
	 */
	setFooter(text, iconURL) {
		text = resolveString(text);
		this.footer = { text, iconURL, proxyIconURL: undefined };
		return this;
	}

	/**
	 * Sets the image of this embed.
	 * @param {string} url The URL of the image
	 * @returns {MessageEmbed}
	 */
	setImage(url) {
		// @ts-ignore
		this.image = { url };
		return this;
	}

	/**
	 * Sets the thumbnail of this embed.
	 * @param {string} url The URL of the thumbnail
	 * @returns {MessageEmbed}
	 */
	setThumbnail(url) {
		// @ts-ignore
		this.thumbnail = { url };
		return this;
	}

	/**
	 * Sets the timestamp of this embed.
	 * @param {Date|number} [timestamp=Date.now()] The timestamp or date
	 * @returns {MessageEmbed}
	 */
	setTimestamp(timestamp = Date.now()) {
		if (timestamp instanceof Date) timestamp = timestamp.getTime();
		this.timestamp = timestamp;
		return this;
	}

	/**
	 * Sets the title of this embed.
	 * @param {import("../typings/index").StringResolvable} title The title
	 * @returns {MessageEmbed}
	 */
	setTitle(title) {
		title = resolveString(title);
		this.title = title;
		return this;
	}

	/**
	 * Sets the URL of this embed.
	 * @param {string} url The URL
	 * @returns {MessageEmbed}
	 */
	setURL(url) {
		this.url = url;
		return this;
	}

	/**
	 * Transforms the embed to a plain object.
	 * @returns {Object} The raw data of this embed
	 */
	toJSON() {
		return {
			title: this.title,
			type: 'rich',
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
						icon_url: this.author.iconURL,
					}
				: null,
			footer: this.footer
				? {
						text: this.footer.text,
						icon_url: this.footer.iconURL,
					}
				: null,
		};
	}

	/**
	 * Normalizes field input and resolves strings.
	 * @param {import("../typings/index").StringResolvable} name The name of the field
	 * @param {import("../typings/index").StringResolvable} value The value of the field
	 * @param {boolean} [inline=false] Set the field to display inline
	 * @returns {EmbedField}
	 */
	static normalizeField(name, value, inline = false) {
		name = resolveString(name);
		if (!name) throw new RangeError('EMBED_FIELD_NAME');
		value = resolveString(value);
		if (!value) throw new RangeError('EMBED_FIELD_VALUE');
		return { name, value, inline };
	}

	/**
	 * @typedef {Object} EmbedFieldData
	 * @property {import("../typings/index").StringResolvable} name The name of this field
	 * @property {import("../typings/index").StringResolvable} value The value of this field
	 * @property {boolean} [inline] If this field will be displayed inline
	 */

	/**
	 * Normalizes field input and resolves strings.
	 * @param  {...EmbedFieldData|EmbedFieldData[]} fields Fields to normalize
	 * @returns {EmbedField[]}
	 */
	static normalizeFields(...fields) {
		return fields
			// @ts-ignore
			.flat(2) // Not sure why TS does not like this. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
			.map(field =>
				this.normalizeField(
					field && field.name,
					field && field.value,
					field && typeof field.inline === 'boolean' ? field.inline : false,
				),
			);
	}
}

module.exports = MessageEmbed;
