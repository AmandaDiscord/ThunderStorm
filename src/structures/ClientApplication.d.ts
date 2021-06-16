import Application from "./interfaces/Application";
import ApplicationCommandManager from "../managers/ApplicationCommandManager";
import ApplicationFlags from "../util/ApplicationFlags";
declare class ClientApplication extends Application {
    flags: Readonly<ApplicationFlags>;
    rpcOrigins: Array<string>;
    commands: ApplicationCommandManager;
    botRequireCodeGrant: boolean | null;
    botPublic: boolean | null;
    owner: import("./User") | import("./Team") | null;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").ApplicationData);
    _patch(data: import("@amanda/discordtypings").ApplicationData): void;
    get partial(): boolean;
    fetch(): Promise<this>;
}
export = ClientApplication;
