"use strict";
const Util_1 = require("./Util/Util");
/**
 * Represents an attachment in a message.
 */
class MessageAttachment {
    /**
     * @param attachment The file
     * @param name The name of the file, if any
     * @param data Extra data
     */
    constructor(attachment, name = null, data) {
        /**
         * The Proxy URL to this attachment
         */
        this.proxyURL = "";
        /**
         * The height of this attachment (if an image or video)
         */
        this.height = null;
        /**
         * The width of this attachment (if an image or video)
         */
        this.width = null;
        this.attachment = attachment;
        this.name = name;
        if (data) {
            if (data.id)
                this.id = data.id;
            if (data.size)
                this.size = data.size;
            if (data.url)
                this.url = data.url;
            if (data.proxy_url)
                this.proxyURL = data.proxy_url;
            if (data.height)
                this.height = data.height;
            if (data.width)
                this.width = data.width;
        }
    }
    /**
     * Sets the file of this attachment.
     * @param attachment The file
     * @param name The name of the file, if any
     * @returns This attachment
     */
    setFile(attachment, name = null) {
        this.attachment = attachment;
        this.name = name;
        return this;
    }
    /**
     * Sets the name of this attachment.
     * @param name The name of the file
     * @returns This attachment
     */
    setName(name) {
        this.name = name;
        return this;
    }
    _patch(data) {
        if (data.id)
            this.id = data.id;
        if (data.size)
            this.size = data.size;
        if (data.url)
            this.url = data.url;
        if (data.proxy_url)
            this.proxyURL = data.proxy_url;
        if (data.height)
            this.height = data.height;
        if (data.width)
            this.width = data.width;
    }
    /**
     * Whether or not this attachment has been marked as a spoiler
     */
    get spoiler() {
        return Util_1.basename(this.url).startsWith("SPOILER_");
    }
    toJSON() {
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
module.exports = MessageAttachment;
