import RequestHandler from "./RequestHandler";
import { Collection } from "@discordjs/collection";
declare type HTTPMethod = Parameters<import("snowtransfer/dist/RequestHandler")["request"]>[1];
declare class RESTManager {
    client: import("../client/BaseClient");
    handlers: Collection<string, RequestHandler>;
    tokenPrefix: "Bot";
    versioned: boolean;
    globalLimit: number;
    globalRemaining: number;
    globalReset: number | null;
    globalDelay: Promise<void> | null;
    static readonly default: typeof RESTManager;
    constructor(client: import("../client/BaseClient"), tokenPrefix?: RESTManager["tokenPrefix"]);
    get api(): import("../internal").Route;
    getAuth(): string;
    get cdn(): {
        Emoji: (emojiId: string, format?: import("..").AllowedImageFormat) => string;
        Asset: (name: string) => string;
        DefaultAvatar: (discriminator: number) => string;
        Avatar: (userId: string, hash: string, format?: import("..").AllowedImageFormat, size?: import("..").ImageSize | undefined, dynamic?: boolean) => string;
        GuildMemberAvatar: (guildId: string, memberId: string, hash: string, format?: import("..").AllowedImageFormat, size?: import("..").ImageSize | undefined, dynamic?: boolean) => string;
        Banner: (id: string, hash: string, format?: import("..").AllowedImageFormat, size?: import("..").ImageSize | undefined, dynamic?: boolean) => void;
        Icon: (guildId: string, hash: string, format?: import("..").AllowedImageFormat, size?: import("..").ImageSize | undefined, dynamic?: boolean) => string;
        AppIcon: (clientId: string, hash: string, options?: {
            format?: import("..").AllowedImageFormat | undefined;
            size?: import("..").ImageSize | undefined;
        }) => string;
        AppAsset: (clientId: string, hash: string, options?: {
            format?: import("..").AllowedImageFormat | undefined;
            size?: import("..").ImageSize | undefined;
        }) => string;
        StickerPackBanner: (bannerId: string, format?: import("..").AllowedImageFormat, size?: import("..").ImageSize | undefined) => string;
        GDMIcon: (channelId: string, hash: string, format?: import("..").AllowedImageFormat, size?: import("..").ImageSize | undefined) => string;
        Splash: (guildId: string, hash: string, format?: import("..").AllowedImageFormat, size?: import("..").ImageSize | undefined) => string;
        DiscoverySplash: (guildId: string, hash: string, format?: import("..").AllowedImageFormat, size?: import("..").ImageSize | undefined) => string;
        TeamIcon: (teamId: string, hash: string, options?: {
            format?: import("..").AllowedImageFormat | undefined;
            size?: import("..").ImageSize | undefined;
        }) => string;
        Sticker: (stickerId: string, stickerFormat: "png" | "LOTTIE") => string;
        RoleIcon: (roleId: string, hash: string, format?: import("..").AllowedImageFormat, size?: import("..").ImageSize | undefined) => string;
    };
    request(method: HTTPMethod, url: string, options: import("../internal").RestOptions): Promise<any>;
    get endpoint(): string;
    set endpoint(endpoint: string);
}
export = RESTManager;
