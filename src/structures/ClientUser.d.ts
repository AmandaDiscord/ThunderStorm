import User from "./User";
declare class ClientUser extends User {
    mfaEnabled: boolean;
    static readonly default: typeof ClientUser;
    constructor(client: import("../client/Client"), data: import("discord-typings").UserData);
    get verified(): boolean;
    edit(data: {
        username?: string;
        avatar?: import("../Types").BufferResolvable;
    }): Promise<this>;
    _patch(data: import("discord-typings").UserData): void;
}
export = ClientUser;
