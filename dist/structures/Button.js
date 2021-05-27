"use strict";
class Button {
    constructor(data, client) {
        this.style = "primary";
        this.label = null;
        this.emoji = null;
        this.identifier = null;
        this.url = null;
        this.disabled = false;
        this.client = client;
        this._patch(data);
    }
    get id() {
        return this.url ? this.url : this.identifier;
    }
    setStyle(style) {
        this.style = style;
        return this;
    }
    toJSON() {
        const value = {
            type: 2,
            style: this.style === "primary" ? 1 :
                this.style === "secondary" ? 2 :
                    this.style === "success" ? 3 :
                        this.style === "danger" ? 4 :
                            this.style === "link" ? 5 : 1
        };
        if (this.label)
            value["label"] = this.label;
        if (this.emoji)
            value["emoji"] = this.emoji;
        if (this.identifier && !this.url)
            value["custom_id"] = this.identifier;
        if (this.url)
            value["url"] = this.url;
        if (this.disabled !== undefined)
            value["disabled"] = this.disabled;
        return value;
    }
    _patch(data) {
        if (data.style) {
            this.style = data.style === 1 ? "primary" :
                data.style === 2 ? "secondary" :
                    data.style === 3 ? "success" :
                        data.style === 4 ? "danger" :
                            data.style === 5 ? "link" : "primary";
        }
        if (data.label)
            this.label = data.label;
        if (data.emoji)
            this.emoji = { id: data.emoji.id || null, name: data.emoji.name, animated: data.emoji.animated || false };
        if (data.custom_id)
            this.identifier = data.custom_id;
        if (data.url)
            this.url = data.url;
        if (data.disabled !== undefined)
            this.disabled = data.disabled;
    }
}
module.exports = Button;
