import User from "./User";
declare class ClientUser extends User {
    mfaEnabled: boolean;
    constructor(data: import("@amanda/discordtypings").UserData, client: import("./Client"));
    get verified(): boolean;
    edit(data: {
        username?: string;
        avatar?: import("../Types").BufferResolvable;
    }): Promise<this>;
    _patch(data: import("@amanda/discordtypings").UserData): void;
}
export = ClientUser;
