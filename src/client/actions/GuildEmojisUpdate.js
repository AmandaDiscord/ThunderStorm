"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
const Action_1 = __importDefault(require("./Action"));
const collection_1 = require("@discordjs/collection");
const Constants_1 = require("../../util/Constants");
class GuildEmojisUpdateAction extends Action_1.default {
    handle(data) {
        const PartialGuild = require("../../structures/Partial/PartialGuild");
        const Emoji = require("../../structures/Emoji");
        const guild = new PartialGuild(this.client, { id: data.guild_id });
        const emojis = data.emojis.map(e => new Emoji(this.client, e));
        for (const emoji of emojis) {
            // VERY HUGE ASSUMPTION. Manually adding emojis one by one should take longer than 1 second unless user was a pro speed runner.
            // Multiple added at the same time should be included in the same GUILD_EMOJIS_UPDATE event.
            if (emoji.createdTimestamp && emoji.createdTimestamp > Date.now() - 1000)
                this.client.actions.GuildEmojiCreate.handle(guild, emoji);
        }
        this.client.emit(Constants_1.Events.GUILD_EMOJIS_UPDATE, guild, new collection_1.Collection(emojis.map(e => [e.id, e])));
    }
}
GuildEmojisUpdateAction.default = GuildEmojisUpdateAction;
module.exports = GuildEmojisUpdateAction;
