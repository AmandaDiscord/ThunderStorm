import BaseGuild from "./BaseGuild";
import Permissions from "../util/Permissions";
declare class OAuth2Guild extends BaseGuild {
    owner: boolean;
    permissions: Readonly<Permissions>;
    static readonly default: typeof OAuth2Guild;
    constructor(client: import("../client/Client"), data: Partial<import("discord-typings").GuildData>);
}
export = OAuth2Guild;
