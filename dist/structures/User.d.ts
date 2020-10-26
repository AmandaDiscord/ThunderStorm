declare class User {
    client: import("./Client");
    partial: false;
    username: string;
    discriminator: string;
    bot: boolean;
    id: string;
    avatar: string | null;
    flags: number;
    system: boolean;
    constructor(data: import("@amanda/discordtypings").UserData, client: import("./Client"));
    get tag(): string;
    get defaultAvatarURL(): string;
    toString(): string;
    toJSON(): {
        username: string;
        discriminator: string;
        bot: boolean;
        id: string;
        avatar: string | null;
        public_flags: number;
    };
    avatarURL(options?: {
        size: number;
        format: string;
        dynamic: boolean;
    }): string | null;
    displayAvatarURL(options?: {
        size: number;
        format: string;
        dynamic: boolean;
    }): string | null;
    fetch(): Promise<this>;
    send(content: import("../types").StringResolvable, options?: import("../types").MessageOptions): Promise<import("./Message")>;
}
export = User;
