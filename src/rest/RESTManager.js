"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const APIRequest_1 = __importDefault(require("./APIRequest"));
const APIRouter_1 = __importDefault(require("./APIRouter"));
const RequestHandler_1 = __importDefault(require("./RequestHandler"));
const errors_1 = require("../errors");
const Collection_1 = __importDefault(require("../util/Collection"));
const Constants_1 = require("../util/Constants");
const Endpoints_1 = __importDefault(require("snowtransfer/dist/Endpoints"));
class RESTManager {
    constructor(client, tokenPrefix = "Bot") {
        this.handlers = new Collection_1.default();
        this.globalReset = null;
        this.globalDelay = null;
        this.client = client;
        this.handlers = new Collection_1.default();
        this.tokenPrefix = tokenPrefix;
        this.versioned = true;
        this.globalLimit = (client.options.restGlobalRateLimit || 0) > 0 ? client.options.restGlobalRateLimit || 0 : Infinity;
        this.globalRemaining = this.globalLimit;
        this.globalReset = null;
        this.globalDelay = null;
        if ((client.options.restSweepInterval || 0) > 0) {
            const interval = client.setInterval(() => {
                this.handlers.sweep(handler => handler._inactive);
            }, (client.options.restSweepInterval || 0) * 1000);
            interval.unref();
        }
    }
    /**
     * I don't think you could feasibly type this.
     */
    get api() {
        return APIRouter_1.default(this);
    }
    getAuth() {
        const token = this.client.token || this.client.accessToken;
        if (token)
            return `${this.tokenPrefix} ${token}`;
        throw new errors_1.Error("TOKEN_MISSING");
    }
    get cdn() {
        return Constants_1.Endpoints.CDN(Endpoints_1.default.CDN_URL);
    }
    request(method, url, options) {
        const apiRequest = new APIRequest_1.default(this, method, url, options);
        let handler = this.handlers.get(apiRequest.route);
        if (!handler) {
            handler = new RequestHandler_1.default(this);
            this.handlers.set(apiRequest.route, handler);
        }
        return handler.push(apiRequest);
    }
    get endpoint() {
        return `${Endpoints_1.default.BASE_HOST}${Endpoints_1.default.BASE_URL}`;
    }
    set endpoint(endpoint) {
        void 0;
    }
}
module.exports = RESTManager;
