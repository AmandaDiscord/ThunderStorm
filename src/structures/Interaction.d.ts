import Base from "./Base";
declare class Interaction extends Base {
    type: import("../Types").InteractionType;
    token: string;
    applicationID: string;
    channelID: string | null;
    guildID: string | null;
    user: import("./User");
    member: import("./GuildMember") | null;
    version: number;
    channel: import("./Partial/PartialChannel") | null;
    guild: import("./Partial/PartialGuild") | null;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").InteractionData);
    get createdTimestamp(): number;
    get createdAt(): Date;
    isCommand(): boolean;
    isMessageComponent(): boolean;
}
export = Interaction;
