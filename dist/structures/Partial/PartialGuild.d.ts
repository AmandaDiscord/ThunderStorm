import PartialBase from "./PartialBase";
declare class PartialGuild extends PartialBase<import("../Guild")> {
    partialType: "Guild";
    memberCount: number;
    available: boolean;
    constructor(data: import("../../internal").PartialData & {
        unavailable?: boolean;
    }, client: import("../Client"));
    toJSON(): {
        id: string;
        member_count: number;
        unavailable: boolean;
    };
    fetchMembers(options: string): Promise<import("../GuildMember") | null>;
    fetchMembers(options: import("../../types").FetchMemberOptions): Promise<Array<import("../GuildMember")> | null>;
}
export = PartialGuild;
