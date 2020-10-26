import GuildMember from "./GuildMember";
declare class VoiceState {
    client: import("./Client");
    channelID: string | null;
    guildID: string | null;
    member: GuildMember | null;
    serverDeaf: boolean;
    selfDeaf: boolean;
    serverMute: boolean;
    selfMute: boolean;
    id: string;
    sessionID: string;
    streaming: boolean;
    supress: boolean;
    constructor(data: import("@amanda/discordtypings").VoiceStateData, client: import("./Client"));
}
export = VoiceState;
