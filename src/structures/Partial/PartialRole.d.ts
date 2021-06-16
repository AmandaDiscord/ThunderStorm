import PartialBase from "./PartialBase";
declare class PartialRole extends PartialBase<import("../Role")> {
    partialType: "Role";
    guild: import("./PartialGuild") | null;
    name: string;
    constructor(client: import("../../client/Client"), data: import("../../internal").PartialData);
    toString(): string;
    toJSON(): {
        id: string;
        guild_id: string | null;
    };
}
export = PartialRole;
