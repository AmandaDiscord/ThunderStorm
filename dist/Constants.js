"use strict";
const EVENTS = {
    CHANNEL_CREATE: "channelCreate",
    CHANNEL_PINS_UPDATE: "channelPinsUpdate",
    GUILD_CREATE: "guildCreate",
    GUILD_DELETE: "guildDelete",
    GUILD_EMOJIS_UPDATE: "guildEmojisUpdate",
    GUILD_MEMBER_UPDATE: "guildMemberUpdate",
    GUILD_ROLE_CREATE: "guildRoleCreate",
    GUILD_ROLE_DELETE: "guildRoleDelete",
    GUILD_ROLE_UPDATE: "guildRoleUpdate",
    MESSAGE_CREATE: "message",
    MESSAGE_DELETE: "messageDelete",
    MESSAGE_UPDATE: "messageUpdate",
    MESSAGE_REACTION_ADD: "messageReactionAdd",
    MESSAGE_REACTION_REMOVE: "messageReactionRemove",
    MESSAGE_REACTION_REMOVE_ALL: "messageReactionRemoveAll",
    READY: "ready",
    RESUMED: "ready",
    VOICE_STATE_UPDATE: "voiceStateUpdate"
};
const CLIENT_ONLY_EVENTS = {
    EVENT: "raw",
    READY: "ready",
    SHARD_DISCONNECT: "shardDisconnect",
    SHARD_READY: "shardReady",
    SHARD_RESUMED: "shardResume"
};
const CLOUD_ONLY_EVENTS = {
    DISCONNECTED: "disconnected",
    EVENT: "event",
    READY: "ready",
    SHARD_READY: "shardReady"
};
const Colors = {
    DEFAULT: 0x000000,
    WHITE: 0xffffff,
    AQUA: 0x1abc9c,
    GREEN: 0x2ecc71,
    BLUE: 0x3498db,
    YELLOW: 0xffff00,
    PURPLE: 0x9b59b6,
    LUMINOUS_VIVID_PINK: 0xe91e63,
    GOLD: 0xf1c40f,
    ORANGE: 0xe67e22,
    RED: 0xe74c3c,
    GREY: 0x95a5a6,
    NAVY: 0x34495e,
    DARK_AQUA: 0x11806a,
    DARK_GREEN: 0x1f8b4c,
    DARK_BLUE: 0x206694,
    DARK_PURPLE: 0x71368a,
    DARK_VIVID_PINK: 0xad1457,
    DARK_GOLD: 0xc27c0e,
    DARK_ORANGE: 0xa84300,
    DARK_RED: 0x992d22,
    DARK_GREY: 0x979c9f,
    DARKER_GREY: 0x7f8c8d,
    LIGHT_GREY: 0xbcc0c0,
    DARK_NAVY: 0x2c3e50,
    BLURPLE: 0x7289da,
    GREYPLE: 0x99aab5,
    DARK_BUT_NOT_BLACK: 0x2c2f33,
    NOT_QUITE_BLACK: 0x23272a,
    RANDOM: "lol"
};
const API_VERSION = 8;
const Constants = {
    API_VERSION,
    BASE_API_ENDPOINT: `/api/v${API_VERSION}`,
    BASE_CDN_URL: "https://cdn.discordapp.com",
    BASE_HOST: "https://discord.com",
    SYSTEM_USER_ID: "643945264868098049",
    CLIENT_ONLY_EVENTS,
    CLOUD_ONLY_EVENTS,
    Colors,
    EVENTS
};
module.exports = Constants;
