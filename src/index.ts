const DiscordAPIError: typeof import("snowtransfer/dist/src/RequestHandler").DiscordAPIErrror = require("snowtransfer/dist/src/RequestHandler").DiscordAPIError;

import PartialBase from "./structures/Partial/PartialBase";
import PartialChannel from "./structures/Partial/PartialChannel";
import PartialGuild from "./structures/Partial/PartialGuild";
import PartialMessage from "./structures/Partial/PartialMessage";
import PartialRole from "./structures/Partial/PartialRole";
import PartialThreadChannel from "./structures/Partial/PartialThreadChannel";
import PartialUser from "./structures/Partial/PartialUser";

import Application from "./structures/Application";
import Base from "./structures/Base";
import CategoryChannel from "./structures/CategoryChannel";
import Channel from "./structures/Channel";
import Client from "./structures/Client";
import ClientApplication from "./structures/ClientApplication";
import ClientUser from "./structures/ClientUser";
import DMChannel from "./structures/DMChannel";
import Emoji from "./structures/Emoji";
import Guild from "./structures/Guild";
import GuildChannel from "./structures/GuildChannel";
import GuildMember from "./structures/GuildMember";
import Invite from "./structures/Invite";
import Message from "./structures/Message";
import MessageAttachment from "./structures/MessageAttachment";
import MessageEmbed from "./structures/MessageEmbed";
import MessageFlags from "./structures/MessageFlags";
import MessageMentions from "./structures/MessageMentions";
import MessageReaction from "./structures/MessageReaction";
import NewsChannel from "./structures/NewsChannel";
import ReactionEmoji from "./structures/ReactionEmoji";
import Role from "./structures/Role";
import StageChannel from "./structures/StageChannel";
import SystemChannelFlags from "./structures/SystemChannelFlags";
import Team from "./structures/Team";
import TeamMember from "./structures/TeamMember";
import TextChannel from "./structures/TextChannel";
import ThreadMember from "./structures/ThreadMember";
import ThreadMetadata from "./structures/ThreadMetadata";
import ThreadNewsChannel from "./structures/ThreadNewsChannel";
import ThreadTextChannel from "./structures/ThreadTextChannel";
import User from "./structures/User";
import UserFlags from "./structures/UserFlags";
import VoiceChannel from "./structures/VoiceChannel";
import VoiceRegion from "./structures/VoiceRegion";
import VoiceState from "./structures/VoiceState";

import BitField from "./structures/BitField";
import Collection from "./structures/Util/Collection";
import Constants from "./Constants";
import handle from "./handle";
import PermissionOverwrites from "./structures/PermissionOverwrites";
import Permissions from "./structures/Permissions";
import SnowflakeUtil from "./structures/Util/SnowflakeUtil";
import Util from "./structures/Util/Util";

export * from "./Types";

const version = "11.6.4";

export {
	Application,
	Base,
	CategoryChannel,
	Channel,
	Client,
	ClientApplication,
	ClientUser,
	DMChannel,
	Emoji,
	Guild,
	GuildChannel,
	GuildMember,
	Invite,
	Message,
	MessageAttachment,
	MessageEmbed,
	MessageFlags,
	MessageMentions,
	MessageReaction,
	NewsChannel,
	ReactionEmoji,
	Role,
	StageChannel,
	SystemChannelFlags,
	Team,
	TeamMember,
	TextChannel,
	ThreadMember,
	ThreadMetadata,
	ThreadNewsChannel,
	ThreadTextChannel,
	User,
	UserFlags,
	VoiceChannel,
	VoiceRegion,
	VoiceState,

	PartialBase,
	PartialChannel,
	PartialGuild,
	PartialMessage,
	PartialRole,
	PartialThreadChannel,
	PartialUser,

	BitField,
	Collection,
	Constants,
	DiscordAPIError,
	handle,
	PermissionOverwrites,
	Permissions,
	SnowflakeUtil,
	Util,
	version
};
