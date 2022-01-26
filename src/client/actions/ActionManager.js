"use strict";
// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
class ActionsManager {
    constructor(client) {
        this.client = client;
        this.register(require("./MessageCreate"));
        this.register(require("./MessageDelete"));
        this.register(require("./MessageDeleteBulk"));
        this.register(require("./MessageUpdate"));
        this.register(require("./MessageReactionAdd"));
        this.register(require("./MessageReactionRemove"));
        this.register(require("./MessageReactionRemoveAll"));
        this.register(require("./MessageReactionRemoveEmoji"));
        this.register(require("./ChannelCreate"));
        this.register(require("./ChannelDelete"));
        this.register(require("./ChannelUpdate"));
        this.register(require("./GuildDelete"));
        this.register(require("./GuildUpdate"));
        this.register(require("./InteractionCreate"));
        this.register(require("./InviteCreate"));
        this.register(require("./InviteDelete"));
        this.register(require("./GuildMemberRemove"));
        this.register(require("./GuildMemberUpdate"));
        this.register(require("./GuildBanAdd"));
        this.register(require("./GuildBanRemove"));
        this.register(require("./GuildRoleCreate"));
        this.register(require("./GuildRoleDelete"));
        this.register(require("./GuildRoleUpdate"));
        this.register(require("./PresenceUpdate"));
        this.register(require("./ThreadCreate"));
        this.register(require("./ThreadDelete"));
        this.register(require("./ThreadListSync"));
        this.register(require("./UserUpdate"));
        this.register(require("./VoiceStateUpdate"));
        this.register(require("./GuildEmojisUpdate"));
        this.register(require("./GuildIntegrationsUpdate"));
        this.register(require("./WebhooksUpdate"));
        this.register(require("./TypingStart"));
    }
    register(Action) {
        this[Action.name.replace(/Action$/, "")] = new Action(this.client);
    }
}
ActionsManager.default = ActionsManager;
module.exports = ActionsManager;
