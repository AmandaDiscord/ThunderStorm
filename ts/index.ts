// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import BaseClient from "./client/BaseClient";
import Client from "./client/Client";
import WebhookClient from "./client/WebhookClient";

import ActivityFlags from "./util/ActivityFlags";
import ApplicationFlags from "./util/ApplicationFlags";
import BitField from "./util/BitField";
import { Collection } from "@discordjs/collection";
import Constants from "./util/Constants";
import DataResolver from "./util/DataResolver";
import BaseManager from "./managers/BaseManager";
import DiscordAPIError from "./rest/DiscordAPIError";
import HTTPError from "./rest/HTTPError";
import MessageFlags from "./util/MessageFlags";
import Permissions from "./util/Permissions";
import SnowflakeUtil from "./util/SnowflakeUtil";
import SystemChannelFlags from "./util/SystemChannelFlags";
import UserFlags from "./util/UserFlags";
import Util from "./util/Util";
const version = "11.6.4";
import handle from "./handle";

import ApplicationCommandManager from "./managers/ApplicationCommandManager";
import GuildApplicationCommandManager from "./managers/GuildApplicationCommandManager";

import AnonymousGuild from "./structures/AnonymousGuild";
import Application from "./structures/interfaces/Application";
import ApplicationCommand from "./structures/ApplicationCommand";
import AutocompleteInteraction from "./structures/AutocompleteInteraction";
import Base from "./structures/Base";
import BaseCommandInteraction from "./structures/BaseCommandInteraction";
import { Activity } from "./structures/Presence";
import BaseGuild from "./structures/BaseGuild";
import BaseGuildEmoji from "./structures/BaseGuildEmoji";
import BaseGuildVoiceChannel from "./structures/BaseGuildVoiceChannel";
import BaseMessageComponent from "./structures/BaseMessageComponent";
import ButtonInteraction from "./structures/ButtonInteraction";
import CategoryChannel from "./structures/CategoryChannel";
import Channel from "./structures/Channel";
import ClientApplication from "./structures/ClientApplication";
import ClientUser from "./structures/ClientUser";
import Collector from "./structures/interfaces/Collector";
import CommandInteraction from "./structures/CommandInteraction";
import CommandInteractionOptionResolver from "./structures/CommandInteractionOptionResolver";
import ContextMenuInteraction from "./structures/ContextMenuInteraction";
import DMChannel from "./structures/DMChannel";
import Emoji from "./structures/Emoji";
import Guild from "./structures/Guild";
import GuildAuditLogs from "./structures/GuildAuditLogs";
import GuildBan from "./structures/GuildBan";
import GuildChannel from "./structures/GuildChannel";
import GuildEmoji from "./structures/GuildEmoji";
import GuildMember from "./structures/GuildMember";
import GuildPreview from "./structures/GuildPreview";
import GuildTemplate from "./structures/GuildTemplate";
import Integration from "./structures/Integration";
import IntegrationApplication from "./structures/IntegrationApplication";
import Interaction from "./structures/Interaction";
import InteractionWebhook from "./structures/InteractionWebhook";
import Invite from "./structures/Invite";
import InviteGuild from "./structures/InviteGuild";
import Message from "./structures/Message";
import MessageActionRow from "./structures/MessageActionRow";
import MessageAttachment from "./structures/MessageAttachment";
import MessageButton from "./structures/MessageButton";
import MessageCollector from "./structures/MessageCollector";
import MessageComponentInteraction from "./structures/MessageComponentInteraction";
import MessageComponentInteractionCollector from "./structures/MessageComponentInteractionCollector";
import MessageEmbed from "./structures/MessageEmbed";
import MessageMentions from "./structures/MessageMentions";
import MessagePayload from "./structures/MessagePayload";
import MessageReaction from "./structures/MessageReaction";
import MessageSelectMenu from "./structures/MessageSelectMenu";
import NewsChannel from "./structures/NewsChannel";
import OAuth2Guild from "./structures/Oauth2Guild";
import PermissionOverwrites from "./structures/PermissionOverwrites";
import Presence from "./structures/Presence";
import ReactionCollector from "./structures/ReactionCollector";
import ReactionEmoji from "./structures/ReactionEmoji";
import { RichPresenceAssets } from "./structures/Presence";
import Role from "./structures/Role";
import Sticker from "./structures/Sticker";
import StoreChannel from "./structures/StoreChannel";
import StageChannel from "./structures/StageChannel";
import Team from "./structures/Team";
import TeamMember from "./structures/TeamMember";
import TextChannel from "./structures/TextChannel";
import ThreadMember from "./structures/ThreadMember";
import ThreadMetaData from "./structures/ThreadMetadata";
import ThreadNewsChannel from "./structures/ThreadNewsChannel";
import ThreadTextChannel from "./structures/ThreadTextChannel";
import User from "./structures/User";
import VoiceChannel from "./structures/VoiceChannel";
import VoiceRegion from "./structures/VoiceRegion";
import VoiceState from "./structures/VoiceState";
import Webhook from "./structures/Webhook";
import WelcomeChannel from "./structures/WelcomeChannel";
import WelcomeScreen from "./structures/WelcomeScreen";

import PartialBase from "./structures/Partial/PartialBase";
import PartialChannel from "./structures/Partial/PartialChannel";
import PartialGuild from "./structures/Partial/PartialGuild";
import PartialMessage from "./structures/Partial/PartialMessage";
import PartialRole from "./structures/Partial/PartialRole";
import PartialThreadChannel from "./structures/Partial/PartialThreadChannel";
import PartialUser from "./structures/Partial/PartialUser";

export * from "./Types";

const discordSort = Util.discordSort;
const escapeMarkdown = Util.escapeMarkdown;
const fetchRecommendedShards = Util.fetchRecommendedShards;
const resolveColor = Util.resolveColor;
const verifyString = Util.verifyString;
const splitMessage = Util.splitMessage;

export {
	BaseClient,
	Client,
	WebhookClient,
	ActivityFlags,
	ApplicationFlags,
	BitField,
	Collection,
	Constants,
	DataResolver,
	BaseManager,
	DiscordAPIError,
	HTTPError,
	MessageFlags,
	Permissions,
	SnowflakeUtil,
	SystemChannelFlags,
	UserFlags,
	Util,
	version,
	handle,

	ApplicationCommandManager,
	GuildApplicationCommandManager,

	discordSort,
	escapeMarkdown,
	fetchRecommendedShards,
	resolveColor,
	verifyString,
	splitMessage,

	AnonymousGuild,
	Application,
	ApplicationCommand,
	AutocompleteInteraction,
	Base,
	BaseCommandInteraction,
	Activity,
	MessagePayload,
	BaseGuild,
	BaseGuildEmoji,
	BaseGuildVoiceChannel,
	BaseMessageComponent,
	ButtonInteraction,
	CategoryChannel,
	Channel,
	ClientApplication,
	ClientUser,
	Collector,
	CommandInteraction,
	CommandInteractionOptionResolver,
	ContextMenuInteraction,
	DMChannel,
	Emoji,
	Guild,
	GuildAuditLogs,
	GuildBan,
	GuildChannel,
	GuildEmoji,
	GuildMember,
	GuildPreview,
	GuildTemplate,
	Integration,
	IntegrationApplication,
	Interaction,
	InteractionWebhook,
	Invite,
	InviteGuild,
	Message,
	MessageActionRow,
	MessageAttachment,
	MessageButton,
	MessageCollector,
	MessageComponentInteraction,
	MessageComponentInteractionCollector,
	MessageEmbed,
	MessageMentions,
	MessageReaction,
	MessageSelectMenu,
	NewsChannel,
	OAuth2Guild,
	PermissionOverwrites,
	Presence,
	ReactionCollector,
	ReactionEmoji,
	RichPresenceAssets,
	Role,
	Sticker,
	StoreChannel,
	StageChannel,
	Team,
	TeamMember,
	TextChannel,
	ThreadMember,
	ThreadMetaData,
	ThreadNewsChannel,
	ThreadTextChannel,
	User,
	VoiceChannel,
	VoiceRegion,
	VoiceState,
	Webhook,
	WelcomeChannel,
	WelcomeScreen,

	PartialBase,
	PartialChannel,
	PartialGuild,
	PartialMessage,
	PartialRole,
	PartialThreadChannel,
	PartialUser
};

export default exports as typeof import("./index");
