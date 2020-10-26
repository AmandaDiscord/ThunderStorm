"use strict";
const path_1 = require("path");
const isObject = (d) => typeof d === "object" && d !== null;
function flatten(obj, ...props) {
    if (!isObject(obj))
        return obj;
    const objProps = Object.keys(obj)
        .filter(k => !k.startsWith("_"))
        .map(k => ({ [k]: true }));
    props = objProps.length ? Object.assign(...objProps, ...props) : Object.assign({}, ...props);
    const out = {};
    for (let [prop, newProp] of Object.entries(props)) {
        if (!newProp)
            continue;
        newProp = newProp === true ? prop : newProp;
        const element = obj[prop];
        const elemIsObj = isObject(element);
        const valueOf = elemIsObj && typeof element.valueOf === "function" ? element.valueOf() : null;
        if (Array.isArray(element))
            out[newProp] = element.map(e => flatten(e));
        else if (typeof valueOf !== "object")
            out[newProp] = valueOf;
        else if (!elemIsObj)
            out[newProp] = element;
    }
    return out;
}
function basename(path, ext) {
    const res = path_1.parse(path);
    return ext && res.ext.startsWith(ext) ? res.name : res.base.split("?")[0];
}
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
        return basename(this.url).startsWith("SPOILER_");
    }
    toJSON() {
        return flatten(this);
    }
}
module.exports = MessageAttachment;
