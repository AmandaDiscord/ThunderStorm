import PartialBase from "./PartialBase";
declare class PartialGuild extends PartialBase<import("../Guild")> {
    partialType: "Guild";
    memberCount: number;
    available: boolean;
    name: string;
    constructor(data: import("../../internal").PartialData & {
        unavailable?: boolean;
    }, client: import("../Client"));
    toString(): string;
    toJSON(): {
        id: string;
        member_count: number;
        unavailable: boolean;
        name: string;
    };
    fetchMembers(options: string): Promise<import("../GuildMember") | null>;
    fetchMembers(options: import("../../Types").FetchMemberOptions): Promise<Array<import("../GuildMember")> | null>;
}
export = PartialGuild;
