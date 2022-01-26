import Base from "./Base";
declare class Interaction extends Base {
    type: import("../Types").InteractionType;
    token: string;
    applicationId: string;
    channelId: string | null;
    guildId: string | null;
    user: import("./User");
    member: import("./GuildMember") | null;
    version: number;
    memberPermissions: Readonly<import("../util/Permissions")> | null;
    locale: string | null;
    guildLocale: string | null;
    channel: import("./Partial/PartialChannel") | null;
    guild: import("./Partial/PartialGuild") | null;
    static readonly default: typeof Interaction;
    constructor(client: import("../client/Client"), data: import("discord-typings").InteractionData);
    get createdTimestamp(): number;
    get createdAt(): Date;
    isCommand(): boolean;
    isMessageComponent(): boolean;
}
export = Interaction;
