import PartialBase from "./PartialBase";
declare class PartialRole extends PartialBase<import("../Role")> {
    partialType: "Role";
    guild: import("./PartialGuild") | null;
    constructor(data: import("../../internal").PartialData, client: import("../Client"));
    toString(): string;
    toJSON(): {
        id: string;
        guild_id: string | null;
    };
}
export = PartialRole;
