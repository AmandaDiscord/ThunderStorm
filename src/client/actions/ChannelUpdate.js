"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Action_1 = __importDefault(require("./Action"));
const Constants_1 = require("../../util/Constants");
class ChannelUpdateAction extends Action_1.default {
    handle(data) {
        const PartialGuild = require("../../structures/Partial/PartialGuild");
        const TextChannel = require("../../structures/TextChannel");
        const DMChannel = require("../../structures/DMChannel");
        const VoiceChannel = require("../../structures/VoiceChannel");
        const CategoryChannel = require("../../structures/CategoryChannel");
        const NewsChannel = require("../../structures/NewsChannel");
        const StoreChannel = require("../../structures/StoreChannel");
        const StageChannel = require("../../structures/StageChannel");
        const Channel = require("../../structures/Channel");
        let guild;
        // @ts-ignore
        if (data.guild_id)
            guild = new PartialGuild(this.client, { id: data.guild_id });
        let chan;
        if (data.type === 0 && guild)
            chan = new TextChannel(guild, data);
        else if (data.type === 1)
            chan = new DMChannel(this.client, data);
        else if (data.type === 2 && guild)
            chan = new VoiceChannel(guild, data);
        else if (data.type === 4 && guild)
            chan = new CategoryChannel(guild, data);
        else if (data.type === 5 && guild)
            chan = new NewsChannel(guild, data);
        else if (data.type === 6 && guild)
            chan = new StoreChannel(guild, data);
        else if (data.type === 13 && guild)
            chan = new StageChannel(guild, data);
        else
            chan = new Channel(this.client, data);
        this.client.emit(Constants_1.Events.CHANNEL_UPDATE, chan);
        return { channel: chan };
    }
}
module.exports = ChannelUpdateAction;
