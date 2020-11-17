"use strict";
const Util_1 = require("./Util/Util");
class MessageAttachment {
    constructor(attachment, name = null, data) {
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
        this.id = data.id;
        this.size = data.size;
        this.url = data.url;
        this.proxyURL = data.proxy_url;
        this.height = typeof data.height !== "undefined" ? data.height : null;
        this.width = typeof data.width !== "undefined" ? data.width : null;
    }
    get spoiler() {
        return Util_1.basename(this.url).startsWith("SPOILER_");
    }
    toJSON() {
        return Util_1.flatten(this);
    }
}
module.exports = MessageAttachment;
