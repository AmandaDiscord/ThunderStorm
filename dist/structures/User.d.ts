import Base from "./Base";
import UserFlags from "./UserFlags";
declare class User extends Base {
    partial: false;
    username: string;
    discriminator: string;
    bot: boolean;
    id: string;
    avatar: string | null;
    flags: Readonly<UserFlags>;
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
    send(content: import("../Types").StringResolvable, options?: Exclude<import("../Types").MessageOptions, "suppress">): Promise<import("./Message")>;
    _patch(data: import("@amanda/discordtypings").UserData): void;
}
export = User;
