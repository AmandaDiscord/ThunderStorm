"use strict";
class APIRequest {
    constructor(rest, method, path, options) {
        this.rest = rest;
        this.client = rest.client;
        this.method = method;
        this.route = options.route;
        this.options = options;
        this.retries = 0;
        let queryString = "";
        if (options.query) {
            const query = Object.entries(options.query)
                .filter(([, value]) => value !== null && typeof value !== "undefined")
                .flatMap(([key, value]) => (Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]));
            queryString = new URLSearchParams(query).toString();
        }
        this.path = `${path}${queryString && `?${queryString}`}`;
    }
    make() {
        return this.client._snow.requestHandler.request(this.options.route, this.method, this.options.files && this.options.files.length ? "multipart" : "json", this.options.data, this.retries);
    }
}
APIRequest.default = APIRequest;
module.exports = APIRequest;
