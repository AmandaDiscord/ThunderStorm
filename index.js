const PartialBase = require("./structures/Partial/PartialBase");
const PartialChannel = require("./structures/Partial/PartialChannel");
const PartialGuild = require("./structures/Partial/PartialGuild");
const PartialUser = require("./structures/Partial/PartialUser");

const CategoryChannel = require("./structures/CategoryChannel");
const Channel = require("./structures/Channel");
const Client = require("./structures/Client");
const ClientUser = require("./structures/ClientUser");
const DMChannel = require("./structures/DMChannel");
const Guild = require("./structures/Guild");
const GuildChannel = require("./structures/GuildChannel");
const GuildMember = require("./structures/GuildMember");
const Message = require("./structures/Message");
const NewsChannel = require("./structures/NewsChannel");
const TextChannel = require("./structures/TextChannel");
const User = require("./structures/User");
const VoiceChannel = require("./structures/VoiceChannel");
const VoiceState = require("./structures/VoiceState");

const handle = require("./handle");

module.exports = {
	CategoryChannel,
	Channel,
	Client,
	ClientUser,
	DMChannel,
	Guild,
	GuildChannel,
	GuildMember,
	Message,
	NewsChannel,
	TextChannel,
	User,
	VoiceChannel,
	VoiceState,

	PartialBase,
	PartialChannel,
	PartialGuild,
	PartialUser,

	handle
}
