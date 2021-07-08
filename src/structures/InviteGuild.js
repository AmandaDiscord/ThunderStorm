"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const AnonymousGuild_1 = __importDefault(require("./AnonymousGuild"));
const WelcomeChannel_1 = __importDefault(require("./WelcomeChannel"));
class InviteGuild extends AnonymousGuild_1.default {
    constructor(client, data) {
        super(client, data);
        this.welcomeScreen = typeof data.welcome_screen !== "undefined" ? new WelcomeChannel_1.default(this, data.welcome_screen) : null;
    }
}
module.exports = InviteGuild;
