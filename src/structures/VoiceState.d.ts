import GuildMember from "./GuildMember";
declare class VoiceState {
    client: import("../client/Client");
    id: string;
    channelID: string | null;
    guildID: string | null;
    member: GuildMember | null;
    serverDeaf: boolean;
    selfDeaf: boolean;
    serverMute: boolean;
    selfMute: boolean;
    sessionID: string;
    streaming: boolean;
    supress: boolean;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").VoiceStateData);
    toJSON(): {
        channel_id: string | null;
        guild_id: string | null;
        member: {
            id: string;
            nick: string | null;
            mute: boolean;
            joined_at: string;
            premium_since: Date | null;
            user: {
                username: string;
                discriminator: string;
                bot: boolean;
                id: string;
                avatar: string | null;
                public_flags: number;
            };
            roles: string[];
            guild_id: string | null;
            hoisted_role: string | null;
        } | null;
        deaf: boolean;
        self_deaf: boolean;
        mute: boolean;
        self_mute: boolean;
        session_id: string;
        self_stream: boolean;
        suppress: boolean;
        user_id: string;
    };
    _patch(data: import("@amanda/discordtypings").VoiceStateData): void;
}
export = VoiceState;
