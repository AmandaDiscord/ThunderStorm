"use strict";
/**
 * I'm sorry for being lazy, discord.js
 */
const Util_1 = require("./Util/Util");
/**
 * Represents an embed in a message (image/video preview, rich embed, etc.)
 */
class MessageEmbed {
    /**
     * @param data MessageEmbed to clone or raw embed data
     */
    constructor(data = {}, skipValidation = false) {
        this.setup(data, skipValidation);
    }
    setup(data, skipValidation) {
        this.type = data.type || "rich";
        this.title = data.title || null;
        this.description = data.description || null;
        this.url = data.url || null;
        this.color = Util_1.resolveColor(data.color);
        this.timestamp = data.timestamp ? new Date(data.timestamp).getTime() : null;
        this.fields = [];
        if (data.fields) {
            this.fields = skipValidation ? data.fields.map(Util_1.cloneObject) : MessageEmbed.normalizeFields(data.fields);
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
    get createdAt() {
        return this.timestamp ? new Date(this.timestamp) : null;
    }
    /**
     * The hexadecimal version of the embed color, with a leading hash
     */
    get hexColor() {
        return this.color ? `#${this.color.toString(16).padStart(6, "0")}` : null;
    }
    /**
     * The accumulated length for the embed title, description, fields and footer text
     */
    get length() {
        return ((this.title ? this.title.length : 0) +
            (this.description ? this.description.length : 0) +
            (this.fields.length >= 1
                ? this.fields.reduce((prev, curr) => prev + curr.name.length + curr.value.length, 0)
                : 0) +
            (this.footer ? this.footer.text.length : 0));
    }
    /**
     * Adds a field to the embed (max 25).
     * @param name The name of this field
     * @param value The value of this field
     * @param inline If this field will be displayed inline
     */
    addField(name, value, inline = false) {
        return this.addFields({ name, value, inline });
    }
    /**
     * Adds fields to the embed (max 25).
     * @param fields The fields to add
     */
    addFields(...fields) {
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
    spliceFields(index, deleteCount, ...fields) {
        this.fields.splice(index, deleteCount, ...MessageEmbed.normalizeFields(...fields));
        return this;
    }
    /**
     * Sets the file to upload alongside the embed. This file can be accessed via `attachment://fileName.extension` when
     * setting an embed image or author/footer icons. Multiple files can be attached.
     * @param files Files to attach
     */
    attachFiles(files) {
        this.files = this.files.concat(files);
        return this;
    }
    /**
     * Sets the author of this embed.
     * @param name The name of the author
     * @param iconURL The icon URL of the author
     * @param url The URL of the author
     */
    setAuthor(name, iconURL, url) {
        // @ts-ignore
        this.author = { name: Util_1.resolveString(name), iconURL, url };
        return this;
    }
    /**
     * Sets the color of this embed.
     * @param color The color of the embed
     */
    setColor(color) {
        this.color = Util_1.resolveColor(color);
        return this;
    }
    /**
     * Sets the description of this embed.
     * @param description The description
     */
    setDescription(description) {
        description = Util_1.resolveString(description);
        this.description = description;
        return this;
    }
    /**
     * Sets the footer of this embed.
     * @param text The text of the footer
     * @param iconURL The icon URL of the footer
     */
    setFooter(text, iconURL) {
        text = Util_1.resolveString(text);
        // @ts-ignore
        this.footer = { text, iconURL, proxyIconURL: undefined };
        return this;
    }
    /**
     * Sets the image of this embed.
     * @param url The URL of the image
     */
    setImage(url) {
        // @ts-ignore
        this.image = { url };
        return this;
    }
    /**
     * Sets the thumbnail of this embed.
     * @param url The URL of the thumbnail
     */
    setThumbnail(url) {
        // @ts-ignore
        this.thumbnail = { url };
        return this;
    }
    /**
     * Sets the timestamp of this embed.
     * @param timestamp The timestamp or date
     */
    setTimestamp(timestamp = Date.now()) {
        if (timestamp instanceof Date)
            timestamp = timestamp.getTime();
        this.timestamp = timestamp;
        return this;
    }
    /**
     * Sets the title of this embed.
     * @param title The title
     */
    setTitle(title) {
        title = Util_1.resolveString(title);
        this.title = title;
        return this;
    }
    /**
     * Sets the URL of this embed.
     * @param url The URL
     */
    setURL(url) {
        this.url = url;
        return this;
    }
    /**
     * Transforms the embed to a plain object.
     * @returns The raw data of this embed
     */
    toJSON() {
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
    static normalizeField(name, value, inline = false) {
        name = Util_1.resolveString(name);
        if (!name)
            throw new RangeError("EMBED_FIELD_NAME");
        value = Util_1.resolveString(value);
        if (!value)
            throw new RangeError("EMBED_FIELD_VALUE");
        return { name, value, inline };
    }
    /**
     * Normalizes field input and resolves strings.
     * @param fields Fields to normalize
     */
    static normalizeFields(...fields) {
        return fields
            .flat(2)
            .map(field => this.normalizeField(field && field.name, field && field.value, field && typeof field.inline === "boolean" ? field.inline : false));
    }
}
module.exports = MessageEmbed;
