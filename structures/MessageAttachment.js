const { parse } = require('path');

const isObject = d => typeof d === 'object' && d !== null;

/**
 * Flatten an object. Any properties that are collections will get converted to an array of keys.
 * @param {Object} obj The object to flatten.
 * @param {...Object<string, boolean|string>} [props] Specific properties to include/exclude.
 * @returns {Object}
 */
function flatten(obj, ...props) {
	if (!isObject(obj)) return obj;

	const objProps = Object.keys(obj)
		.filter(k => !k.startsWith('_'))
		.map(k => ({ [k]: true }));

	// @ts-ignore
	props = objProps.length ? Object.assign(...objProps, ...props) : Object.assign({}, ...props);

	const out = {};

	for (let [prop, newProp] of Object.entries(props)) {
		if (!newProp) continue;
		// @ts-ignore
		newProp = newProp === true ? prop : newProp;

		const element = obj[prop];
		const elemIsObj = isObject(element);
		const valueOf = elemIsObj && typeof element.valueOf === 'function' ? element.valueOf() : null;

		// If it's an array, flatten each element
		if (Array.isArray(element)) out[newProp] = element.map(e => flatten(e));
		// If it's an object with a primitive `valueOf`, use that value
		else if (typeof valueOf !== 'object') out[newProp] = valueOf;
		// If it's a primitive
		else if (!elemIsObj) out[newProp] = element;
	}

	return out;
}

/**
 * Alternative to Node's `path.basename`, removing query string after the extension if it exists.
 * @param {string} path Path to get the basename of
 * @param {string} [ext] File extension to remove
 * @returns {string} Basename of the path
 * @private
 */
function basename(path, ext) {
	let res = parse(path);
	return ext && res.ext.startsWith(ext) ? res.name : res.base.split('?')[0];
}

/**
 * Represents an attachment in a message.
 */
class MessageAttachment {
	/**
	 * @param {import("../typings/index").BufferResolvable|import("stream").Stream} attachment The file
	 * @param {string} [name=null] The name of the file, if any
	 * @param {Object} [data] Extra data
	 */
	constructor(attachment, name = null, data) {
		this.attachment = attachment;
		/**
		 * The name of this attachment
		 * @type {?string}
		 */
		this.name = name;
		if (data) this._patch(data);
	}

	/**
	 * Sets the file of this attachment.
	 * @param {import("../typings/index").BufferResolvable|import("stream").Stream} attachment The file
	 * @param {string} [name=null] The name of the file, if any
	 * @returns {MessageAttachment} This attachment
	 */
	setFile(attachment, name = null) {
		this.attachment = attachment;
		this.name = name;
		return this;
	}

	/**
	 * Sets the name of this attachment.
	 * @param {string} name The name of the file
	 * @returns {MessageAttachment} This attachment
	 */
	setName(name) {
		this.name = name;
		return this;
	}

	_patch(data) {
		/**
		 * The ID of this attachment
		 * @type {import("@amanda/discordtypings").Snowflake}
		 */
		this.id = data.id;

		/**
		 * The size of this attachment in bytes
		 * @type {number}
		 */
		this.size = data.size;

		/**
		 * The URL to this attachment
		 * @type {string}
		 */
		this.url = data.url;

		/**
		 * The Proxy URL to this attachment
		 * @type {string}
		 */
		this.proxyURL = data.proxy_url;

		/**
		 * The height of this attachment (if an image or video)
		 * @type {?number}
		 */
		this.height = typeof data.height !== 'undefined' ? data.height : null;

		/**
		 * The width of this attachment (if an image or video)
		 * @type {?number}
		 */
		this.width = typeof data.width !== 'undefined' ? data.width : null;
	}

	/**
	 * Whether or not this attachment has been marked as a spoiler
	 * @type {boolean}
	 * @readonly
	 */
	get spoiler() {
		return basename(this.url).startsWith('SPOILER_');
	}

	toJSON() {
		return flatten(this);
	}
}

module.exports = MessageAttachment;
