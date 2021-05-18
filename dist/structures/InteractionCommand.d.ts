import Collection from "./Util/Collection";
declare class InteractionCommand {
    id: string;
    name: string;
    message: import("./InteractionMessage");
    users: Collection<string, import("./User")>;
    members: Collection<string, import("./GuildMember")>;
    channels: Collection<string, import("./Partial/PartialChannel")>;
    roles: Collection<string, import("./Role")>;
    options: Collection<string, import("./CommandOption")>;
    constructor(message: import("./InteractionMessage"), data: import("@amanda/discordtypings").ApplicationCommandInteractionData);
    toJSON(): {
        id: string;
        name: string;
        options: import("@amanda/discordtypings").ApplicationCommandInteractionDataOption[];
        resolved: {
            users: {
                username: string;
                discriminator: string;
                bot: boolean;
                id: string;
                avatar: string | null;
                public_flags: number;
            }[];
            members: {
                id: string;
                nick: string | null;
                mute: boolean;
                joined_at: string;
                premium_since: string | null;
                user: {
                    username: string;
                    discriminator: string;
                    bot: boolean;
                    id: string;
                    avatar: string | null;
                    public_flags: number;
                };
                roles: string[];
                guild_id: string | undefined;
            }[];
            roles: {
                name: string;
                id: string;
                color: number;
                managed: boolean;
                hoist: boolean;
                permissions: number;
                position: number;
                mentionable: boolean;
                guild_id: string | undefined;
            }[];
            channels: {
                id: string;
                guild_id: string | null;
                type: number;
                name: string;
                permissions: string;
            }[];
        };
    };
    _patch(data: import("@amanda/discordtypings").ApplicationCommandInteractionData): void;
}
export = InteractionCommand;
