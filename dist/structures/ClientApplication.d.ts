import Application from "./Application";
import Team from "./Team";
import User from "./User";
declare class ClientApplication extends Application {
    rpcOrigins: Array<string>;
    botRequiredCodeGrant: boolean;
    botPublic: boolean;
    owner: Team | User | null;
    constructor(data: import("@amanda/discordtypings").ApplicationData, client: import("./Client"));
    toJSON(): import("@amanda/discordtypings").ApplicationData;
    _patch(data: import("@amanda/discordtypings").ApplicationData): void;
}
export = ClientApplication;
