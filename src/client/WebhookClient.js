"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const BaseClient_1 = __importDefault(require("./BaseClient"));
const Webhook_1 = __importDefault(require("../structures/Webhook"));
class WebhookClient extends BaseClient_1.default {
    constructor(id, token, options) {
        super(options);
        this.client = this;
        this.id = id;
        this.token = token;
    }
}
Webhook_1.default.applyToClass(WebhookClient);
module.exports = WebhookClient;
