"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const constants_1 = __importDefault(require("./constants"));
const CategoryChannel_1 = __importDefault(require("./structures/CategoryChannel"));
const ClientUser_1 = __importDefault(require("./structures/ClientUser"));
const DMChannel_1 = __importDefault(require("./structures/DMChannel"));
const Guild_1 = __importDefault(require("./structures/Guild"));
const GuildMember_1 = __importDefault(require("./structures/GuildMember"));
const Message_1 = __importDefault(require("./structures/Message"));
const TextChannel_1 = __importDefault(require("./structures/TextChannel"));
const VoiceChannel_1 = __importDefault(require("./structures/VoiceChannel"));
const VoiceState_1 = __importDefault(require("./structures/VoiceState"));
const Role_1 = __importDefault(require("./structures/Role"));
const PartialRole_1 = __importDefault(require("./structures/Partial/PartialRole"));
function handle(data, client) {
    if (data.t === "READY") {
        client.emit(constants_1.default.CLIENT_ONLY_EVENTS.EVENT, data);
        const typed = data;
        client.user = new ClientUser_1.default(typed.d.user, client);
        client.readyTimestamp = Date.now();
        client.emit(constants_1.default.CLIENT_ONLY_EVENTS.READY, client.user);
    }
    if (!client.user)
        return;
    if (data.t !== "READY")
        client.emit(constants_1.default.CLIENT_ONLY_EVENTS.EVENT, data);
    if (data.t === "GUILD_CREATE") {
        const typed = data;
        const guild = new Guild_1.default(typed.d, client);
        client.emit(constants_1.default.EVENTS.GUILD_CREATE, guild);
    }
    else if (data.t === "GUILD_DELETE") {
        const PartialGuild = require("./structures/Partial/PartialGuild");
        const typed = data;
        client.emit(constants_1.default.EVENTS.GUILD_DELETE, new PartialGuild({ id: typed.d.id, unavailable: typed.d.unavailable }, client));
    }
    else if (data.t === "CHANNEL_CREATE") {
        const typed = data;
        let chan;
        if (typed.d.type === 0)
            chan = new TextChannel_1.default(typed.d, client);
        else if (typed.d.type === 1)
            chan = new DMChannel_1.default(typed.d, client);
        else if (typed.d.type === 2)
            chan = new VoiceChannel_1.default(typed.d, client);
        else if (typed.d.type === 4)
            chan = new CategoryChannel_1.default(typed.d, client);
        client.emit(constants_1.default.EVENTS.CHANNEL_CREATE, chan);
    }
    else if (data.t === "MESSAGE_CREATE") {
        const typed = data;
        const message = new Message_1.default(typed.d, client);
        client.emit(constants_1.default.EVENTS.MESSAGE_CREATE, message);
    }
    else if (data.t === "MESSAGE_REACTION_ADD") {
        const typed = data;
        client.emit(constants_1.default.EVENTS.MESSAGE_REACTION_ADD, typed.d);
    }
    else if (data.t === "MESSAGE_REACTION_REMOVE") {
        const typed = data;
        client.emit(constants_1.default.EVENTS.MESSAGE_REACTION_REMOVE, typed.d);
    }
    else if (data.t === "MESSAGE_REACTION_REMOVE_ALL") {
        const typed = data;
        client.emit(constants_1.default.EVENTS.MESSAGE_REACTION_REMOVE_ALL, typed.d);
    }
    else if (data.t === "MESSAGE_UPDATE") {
        const typed = data;
        const message = new Message_1.default(typed.d, client);
        client.emit(constants_1.default.EVENTS.MESSAGE_UPDATE, message);
    }
    else if (data.t === "MESSAGE_DELETE") {
        const typed = data;
        client.emit(constants_1.default.EVENTS.MESSAGE_DELETE, typed.d);
    }
    else if (data.t === "VOICE_STATE_UPDATE") {
        const typed = data;
        const voicestate = new VoiceState_1.default(typed.d, client);
        client.emit(constants_1.default.EVENTS.VOICE_STATE_UPDATE, voicestate);
    }
    else if (data.t === "GUILD_MEMBER_UPDATE") {
        const typed = data;
        if (!typed.d.user)
            return;
        client.emit(constants_1.default.EVENTS.GUILD_MEMBER_UPDATE, new GuildMember_1.default(typed.d, client));
    }
    else if (data.t === "GUILD_ROLE_CREATE") {
        const typed = data;
        client.emit(constants_1.default.EVENTS.GUILD_ROLE_CREATE, new Role_1.default({ guild_id: typed.d.guild_id, ...typed.d.role }, client));
    }
    else if (data.t === "GUILD_ROLE_UPDATE") {
        const typed = data;
        client.emit(constants_1.default.EVENTS.GUILD_ROLE_UPDATE, new Role_1.default({ guild_id: typed.d.guild_id, ...typed.d.role }, client));
    }
    else if (data.t === "GUILD_ROLE_DELETE") {
        const typed = data;
        client.emit(constants_1.default.EVENTS.GUILD_ROLE_DELETE, new PartialRole_1.default({ id: typed.d.role_id, guild_id: typed.d.guild_id }, client));
    }
}
module.exports = handle;