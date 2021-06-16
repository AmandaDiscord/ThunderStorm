"use strict";
const Constants_1 = require("../../util/Constants");
class GenericAction {
    constructor(client) {
        this.client = client;
    }
    handle(data) {
        return data;
    }
    getPayload(data, manager, id, partialType) {
        return data;
    }
    getChannel(data) {
        const id = data.channel_id || data.id;
        return (data.channel ||
            this.getPayload({
                id,
                guild_id: data.guild_id,
                recipients: [data.author || { id: data.user_id }]
            }, {}, id, Constants_1.PartialTypes.CHANNEL));
    }
    getMessage(data, channel) {
        const id = data.message_id || data.id;
        return (data.message ||
            this.getPayload({
                id,
                channel_id: channel.id,
                guild_id: data.guild_id || (channel.guild ? channel.guild.id : null)
            }, channel.messages, id, Constants_1.PartialTypes.MESSAGE));
    }
    getReaction(data, message, user) {
        var _a;
        const id = data.emoji.id || decodeURIComponent(data.emoji.name);
        return this.getPayload({
            emoji: data.emoji,
            count: message.partial ? null : 0,
            me: user ? user.id === ((_a = this.client.user) === null || _a === void 0 ? void 0 : _a.id) : false
        }, message.reactions, id, Constants_1.PartialTypes.REACTION);
    }
    getMember(data, guild) {
        return this.getPayload(data, guild.members, data.user.id, Constants_1.PartialTypes.GUILD_MEMBER);
    }
    getUser(data) {
        const id = data.user_id;
        return data.user || this.getPayload({ id }, {}, id, Constants_1.PartialTypes.USER);
    }
    getUserFromMember(data) {
        return this.getUser(data);
    }
}
module.exports = GenericAction;
