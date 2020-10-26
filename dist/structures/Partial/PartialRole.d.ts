import PartialBase from "./PartialBase";
import PartialGuild from "./PartialGuild";
declare class PartialRole extends PartialBase<import("../Role")> {
    partialType: "Role";
    guild: PartialGuild | null;
    constructor(data: import("../../internal").PartialData, client: import("../Client"));
    toString(): string;
    toJSON(): {
        id: string;
        guild_id: string | null;
    };
}
export = PartialRole;
