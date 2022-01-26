"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const APIRequest_1 = __importDefault(require("./APIRequest"));
const APIRouter_1 = __importDefault(require("./APIRouter"));
const RequestHandler_1 = __importDefault(require("./RequestHandler"));
const errors_1 = require("../errors");
const collection_1 = require("@discordjs/collection");
const Constants_1 = require("../util/Constants");
const Endpoints_1 = __importDefault(require("snowtransfer/dist/Endpoints"));
class RESTManager {
    constructor(client, tokenPrefix = "Bot") {
        this.handlers = new collection_1.Collection();
        this.versioned = true;
        this.globalReset = null;
        this.globalDelay = null;
        this.client = client;
        this.tokenPrefix = tokenPrefix;
        this.versioned = true;
        this.globalLimit = (client.options.restGlobalRateLimit || 0) > 0 ? client.options.restGlobalRateLimit || 0 : Infinity;
        this.globalRemaining = this.globalLimit;
        if ((client.options.restSweepInterval || 0) > 0) {
            const interval = client.setInterval(() => {
                this.handlers.sweep(handler => handler._inactive);
            }, (client.options.restSweepInterval || 0) * 1000);
            interval.unref();
        }
    }
    get api() {
        return (0, APIRouter_1.default)(this);
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
        void endpoint;
    }
}
RESTManager.default = RESTManager;
module.exports = RESTManager;
