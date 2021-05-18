"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordAPIError = require("snowtransfer/dist/src/RequestHandler").DiscordAPIError;
exports.DiscordAPIError = DiscordAPIError;
const PartialBase_1 = __importDefault(require("./structures/Partial/PartialBase"));
exports.PartialBase = PartialBase_1.default;
const PartialChannel_1 = __importDefault(require("./structures/Partial/PartialChannel"));
exports.PartialChannel = PartialChannel_1.default;
const PartialGuild_1 = __importDefault(require("./structures/Partial/PartialGuild"));
exports.PartialGuild = PartialGuild_1.default;
const PartialMessage_1 = __importDefault(require("./structures/Partial/PartialMessage"));
exports.PartialMessage = PartialMessage_1.default;
const PartialRole_1 = __importDefault(require("./structures/Partial/PartialRole"));
exports.PartialRole = PartialRole_1.default;
const PartialThreadChannel_1 = __importDefault(require("./structures/Partial/PartialThreadChannel"));
exports.PartialThreadChannel = PartialThreadChannel_1.default;
const PartialUser_1 = __importDefault(require("./structures/Partial/PartialUser"));
exports.PartialUser = PartialUser_1.default;
const Application_1 = __importDefault(require("./structures/Application"));
exports.Application = Application_1.default;
const Base_1 = __importDefault(require("./structures/Base"));
exports.Base = Base_1.default;
const CategoryChannel_1 = __importDefault(require("./structures/CategoryChannel"));
exports.CategoryChannel = CategoryChannel_1.default;
const Channel_1 = __importDefault(require("./structures/Channel"));
exports.Channel = Channel_1.default;
const Client_1 = __importDefault(require("./structures/Client"));
exports.Client = Client_1.default;
const ClientApplication_1 = __importDefault(require("./structures/ClientApplication"));
exports.ClientApplication = ClientApplication_1.default;
const ClientUser_1 = __importDefault(require("./structures/ClientUser"));
exports.ClientUser = ClientUser_1.default;
const CommandOption_1 = __importDefault(require("./structures/CommandOption"));
exports.CommandOption = CommandOption_1.default;
const DMChannel_1 = __importDefault(require("./structures/DMChannel"));
exports.DMChannel = DMChannel_1.default;
const Emoji_1 = __importDefault(require("./structures/Emoji"));
exports.Emoji = Emoji_1.default;
const Guild_1 = __importDefault(require("./structures/Guild"));
exports.Guild = Guild_1.default;
const GuildChannel_1 = __importDefault(require("./structures/GuildChannel"));
exports.GuildChannel = GuildChannel_1.default;
const GuildMember_1 = __importDefault(require("./structures/GuildMember"));
exports.GuildMember = GuildMember_1.default;
const InteractionCommand_1 = __importDefault(require("./structures/InteractionCommand"));
exports.InteractionCommand = InteractionCommand_1.default;
const InteractionMessage_1 = __importDefault(require("./structures/InteractionMessage"));
exports.InteractionMessage = InteractionMessage_1.default;
const Invite_1 = __importDefault(require("./structures/Invite"));
exports.Invite = Invite_1.default;
const Message_1 = __importDefault(require("./structures/Message"));
exports.Message = Message_1.default;
const MessageAttachment_1 = __importDefault(require("./structures/MessageAttachment"));
exports.MessageAttachment = MessageAttachment_1.default;
const MessageEmbed_1 = __importDefault(require("./structures/MessageEmbed"));
exports.MessageEmbed = MessageEmbed_1.default;
const MessageFlags_1 = __importDefault(require("./structures/MessageFlags"));
exports.MessageFlags = MessageFlags_1.default;
const MessageMentions_1 = __importDefault(require("./structures/MessageMentions"));
exports.MessageMentions = MessageMentions_1.default;
const MessageReaction_1 = __importDefault(require("./structures/MessageReaction"));
exports.MessageReaction = MessageReaction_1.default;
const NewsChannel_1 = __importDefault(require("./structures/NewsChannel"));
exports.NewsChannel = NewsChannel_1.default;
const ReactionEmoji_1 = __importDefault(require("./structures/ReactionEmoji"));
exports.ReactionEmoji = ReactionEmoji_1.default;
const Role_1 = __importDefault(require("./structures/Role"));
exports.Role = Role_1.default;
const StageChannel_1 = __importDefault(require("./structures/StageChannel"));
exports.StageChannel = StageChannel_1.default;
const SystemChannelFlags_1 = __importDefault(require("./structures/SystemChannelFlags"));
exports.SystemChannelFlags = SystemChannelFlags_1.default;
const Team_1 = __importDefault(require("./structures/Team"));
exports.Team = Team_1.default;
const TeamMember_1 = __importDefault(require("./structures/TeamMember"));
exports.TeamMember = TeamMember_1.default;
const TextChannel_1 = __importDefault(require("./structures/TextChannel"));
exports.TextChannel = TextChannel_1.default;
const ThreadMember_1 = __importDefault(require("./structures/ThreadMember"));
exports.ThreadMember = ThreadMember_1.default;
const ThreadMetadata_1 = __importDefault(require("./structures/ThreadMetadata"));
exports.ThreadMetadata = ThreadMetadata_1.default;
const ThreadNewsChannel_1 = __importDefault(require("./structures/ThreadNewsChannel"));
exports.ThreadNewsChannel = ThreadNewsChannel_1.default;
const ThreadTextChannel_1 = __importDefault(require("./structures/ThreadTextChannel"));
exports.ThreadTextChannel = ThreadTextChannel_1.default;
const User_1 = __importDefault(require("./structures/User"));
exports.User = User_1.default;
const UserFlags_1 = __importDefault(require("./structures/UserFlags"));
exports.UserFlags = UserFlags_1.default;
const VoiceChannel_1 = __importDefault(require("./structures/VoiceChannel"));
exports.VoiceChannel = VoiceChannel_1.default;
const VoiceRegion_1 = __importDefault(require("./structures/VoiceRegion"));
exports.VoiceRegion = VoiceRegion_1.default;
const VoiceState_1 = __importDefault(require("./structures/VoiceState"));
exports.VoiceState = VoiceState_1.default;
const BitField_1 = __importDefault(require("./structures/BitField"));
exports.BitField = BitField_1.default;
const Collection_1 = __importDefault(require("./structures/Util/Collection"));
exports.Collection = Collection_1.default;
const Constants_1 = __importDefault(require("./Constants"));
exports.Constants = Constants_1.default;
const handle_1 = __importDefault(require("./handle"));
exports.handle = handle_1.default;
const PermissionOverwrites_1 = __importDefault(require("./structures/PermissionOverwrites"));
exports.PermissionOverwrites = PermissionOverwrites_1.default;
const Permissions_1 = __importDefault(require("./structures/Permissions"));
exports.Permissions = Permissions_1.default;
const SnowflakeUtil_1 = __importDefault(require("./structures/Util/SnowflakeUtil"));
exports.SnowflakeUtil = SnowflakeUtil_1.default;
const Util_1 = __importDefault(require("./structures/Util/Util"));
exports.Util = Util_1.default;
const version = "11.6.4";
exports.version = version;
