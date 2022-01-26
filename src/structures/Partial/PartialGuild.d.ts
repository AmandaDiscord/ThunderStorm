import { Collection } from "@discordjs/collection";
import PartialBase from "./PartialBase";
import GuildApplicationCommandManager from "../../managers/GuildApplicationCommandManager";
declare class PartialGuild extends PartialBase<import("../Guild")> {
    partialType: "Guild";
    memberCount: number;
    available: boolean;
    name: string;
    commands: GuildApplicationCommandManager;
    static readonly default: typeof PartialGuild;
    constructor(client: import("../../client/Client"), data: import("../../internal").PartialData & {
        unavailable?: boolean;
    });
    get me(): import("../GuildMember");
    toString(): string;
    toJSON(): {
        id: string;
        member_count: number;
        unavailable: boolean;
        name: string;
    };
    fetchMembers(options: string): Promise<import("../GuildMember") | null>;
    fetchMembers(options: import("../../Types").FetchMemberOptions): Promise<Array<import("../GuildMember")> | null>;
    fetchInvites(): Promise<Collection<string, import("../Invite")>>;
}
export = PartialGuild;
