"use strict";
const Util_1 = require("./Util/Util");
class MessageEmbed {
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
        this.files = data.files || [];
    }
    get createdAt() {
        return this.timestamp ? new Date(this.timestamp) : null;
    }
    get hexColor() {
        return this.color ? `#${this.color.toString(16).padStart(6, "0")}` : null;
    }
    get length() {
        return ((this.title ? this.title.length : 0) +
            (this.description ? this.description.length : 0) +
            (this.fields.length >= 1
                ? this.fields.reduce((prev, curr) => prev + curr.name.length + curr.value.length, 0)
                : 0) +
            (this.footer ? this.footer.text.length : 0));
    }
    addField(name, value, inline = false) {
        return this.addFields({ name, value, inline });
    }
    addFields(...fields) {
        this.fields.push(...MessageEmbed.normalizeFields(fields));
        return this;
    }
    spliceFields(index, deleteCount, ...fields) {
        this.fields.splice(index, deleteCount, ...MessageEmbed.normalizeFields(...fields));
        return this;
    }
    attachFiles(files) {
        this.files = this.files.concat(files);
        return this;
    }
    setAuthor(name, iconURL, url) {
        this.author = { name: Util_1.resolveString(name), iconURL, url };
        return this;
    }
    setColor(color) {
        this.color = Util_1.resolveColor(color);
        return this;
    }
    setDescription(description) {
        description = Util_1.resolveString(description);
        this.description = description;
        return this;
    }
    setFooter(text, iconURL) {
        text = Util_1.resolveString(text);
        this.footer = { text, iconURL, proxyIconURL: undefined };
        return this;
    }
    setImage(url) {
        this.image = { url };
        return this;
    }
    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }
    setTimestamp(timestamp = Date.now()) {
        if (timestamp instanceof Date)
            timestamp = timestamp.getTime();
        this.timestamp = timestamp;
        return this;
    }
    setTitle(title) {
        title = Util_1.resolveString(title);
        this.title = title;
        return this;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
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
    static normalizeField(name, value, inline = false) {
        name = Util_1.resolveString(name);
        if (!name)
            throw new RangeError("EMBED_FIELD_NAME");
        value = Util_1.resolveString(value);
        if (!value)
            throw new RangeError("EMBED_FIELD_VALUE");
        return { name, value, inline };
    }
    static normalizeFields(...fields) {
        return fields
            .flat(2)
            .map(field => this.normalizeField(field && field.name, field && field.value, field && typeof field.inline === "boolean" ? field.inline : false));
    }
}
module.exports = MessageEmbed;
