"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Webhook_1 = __importDefault(require("./Webhook"));
// @ts-ignore
class InteractionWebhook {
    constructor(client, id, token) {
        this.client = client;
        this.id = id;
        this.token = token;
    }
}
InteractionWebhook.default = InteractionWebhook;
Webhook_1.default.applyToClass(InteractionWebhook, ["sendSlackMessage", "edit", "delete", "createdTimestamp", "createdAt"]);
module.exports = InteractionWebhook;
