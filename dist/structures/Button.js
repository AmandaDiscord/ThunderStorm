"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Collection_1 = __importDefault(require("./Util/Collection"));
class Button {
    constructor(data, client) {
        this.style = null;
        this.children = new Collection_1.default();
        this.label = null;
        this.emoji = null;
        this.identifier = null;
        this.url = null;
        this.disabled = false;
        this.client = client;
        this._patch(data);
    }
    toJSON() {
        const value = {
            type: this.type === "row" ? 1 : 2
        };
        if (this.style) {
            value["style"] = this.style === "primary" ? 1 :
                this.style === "secondary" ? 2 :
                    this.style === "success" ? 3 :
                        this.style === "danger" ? 4 :
                            this.style === "link" ? 5 : 1;
        }
        if (this.label)
            value["label"] = this.label;
        if (this.emoji)
            value["emoji"] = this.emoji;
        if (this.identifier)
            value["custom_id"] = this.identifier;
        if (this.url)
            value["url"] = this.url;
        if (this.disabled !== undefined && this.type !== "row")
            value["disabled"] = this.disabled;
        // @ts-ignore
        if (this.children.size)
            value["components"] = this.children.map(i => i.toJSON());
        return value;
    }
    _patch(data) {
        if (data.type)
            this.type = data.type === 1 ? "row" : "button";
        if (data.style) {
            this.style = data.style === 1 ? "primary" :
                data.style === 2 ? "secondary" :
                    data.style === 3 ? "success" :
                        data.style === 4 ? "danger" :
                            data.style === 5 ? "link" : "primary";
        }
        if (data.components) {
            this.children.clear();
            for (const child of data.components)
                this.children.set(child.custom_id, new Button(child, this.client));
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
