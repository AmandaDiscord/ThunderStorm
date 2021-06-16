import Base from "./Base";
declare class GuildBan extends Base {
    guild: import("./Partial/PartialGuild");
    user: import("./User");
    reason: string | null;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").GuildBanAddData & {
        reason?: string;
    }, guild: import("./Partial/PartialGuild"));
    _patch(data: import("@amanda/discordtypings").GuildBanAddData & {
        reason?: string;
    }): void;
    get partial(): boolean;
    fetch(): Promise<any>;
}
export = GuildBan;
