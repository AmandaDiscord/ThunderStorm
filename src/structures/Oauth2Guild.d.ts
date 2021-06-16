import BaseGuild from "./BaseGuild";
import Permissions from "../util/Permissions";
declare class OAuth2Guild extends BaseGuild {
    owner: boolean;
    permissions: Readonly<Permissions>;
    constructor(client: import("../client/Client"), data: Partial<import("@amanda/discordtypings").GuildData>);
}
export = OAuth2Guild;
