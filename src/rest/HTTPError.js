"use strict";
class HTTPError extends Error {
    constructor(message, name, code, method, path) {
        super(message);
        this.name = name;
        this.code = code || 500;
        this.method = method;
        this.path = path;
    }
}
HTTPError.default = HTTPError;
module.exports = HTTPError;
