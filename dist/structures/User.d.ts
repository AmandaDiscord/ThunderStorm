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
    get createdTimestamp(): number;
    get createdAt(): Date;
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
        size?: number;
        format?: "png" | "jpg" | "gif" | "webp";
        dynamic?: boolean;
    }): string | null;
    displayAvatarURL(options?: {
        size?: number;
        format?: "png" | "jpg" | "gif" | "webp";
        dynamic?: boolean;
    }): string | null;
    fetch(): Promise<this>;
    send(content: import("../Types").StringResolvable, options?: import("../Types").MessageOptions): Promise<import("./Message")>;
}
export = User;
