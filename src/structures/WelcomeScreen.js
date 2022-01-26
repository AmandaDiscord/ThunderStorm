"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Base_1 = __importDefault(require("./Base"));
const WelcomeChannel_1 = __importDefault(require("./WelcomeChannel"));
const collection_1 = require("@discordjs/collection");
// @ts-ignore
class WelcomeScreen extends Base_1.default {
    constructor(guild, data) {
        var _a;
        super(guild.client);
        this.guild = guild;
        this.description = (_a = data.description) !== null && _a !== void 0 ? _a : null;
        this.welcomeChannels = new collection_1.Collection();
        for (const channel of data.welcome_channels) {
            const welcomeChannel = new WelcomeChannel_1.default(this.guild, channel);
            this.welcomeChannels.set(welcomeChannel.channelId, welcomeChannel);
        }
    }
    get enabled() {
        return this.guild.partial ? false : this.guild.features.includes("WELCOME_SCREEN_ENABLED");
    }
}
WelcomeScreen.default = WelcomeScreen;
module.exports = WelcomeScreen;
