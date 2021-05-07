"use strict";
const Util_1 = require("./Util/Util");
class MessageAttachment {
    constructor(attachment, name = null, data) {
        this.proxyURL = "";
        this.height = null;
        this.width = null;
        this.attachment = attachment;
        this.name = name;
        if (data)
            this._patch(data);
    }
    setFile(attachment, name = null) {
        this.attachment = attachment;
        this.name = name;
        return this;
    }
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
