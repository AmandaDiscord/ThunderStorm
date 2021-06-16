import RequestHandler from "./RequestHandler";
import Collection from "../util/Collection";
declare type HTTPMethod = Parameters<import("snowtransfer/dist/src/RequestHandler")["request"]>[1];
declare type Options = {
    route: string;
    data?: any;
    auth?: boolean;
    versioned?: boolean;
    query?: any;
    reason?: string;
    headers?: any;
    files?: Array<any>;
};
declare class RESTManager {
    client: import("../client/BaseClient");
    handlers: Collection<string, RequestHandler>;
    tokenPrefix: "Bot";
    versioned: boolean;
    globalLimit: number;
    globalRemaining: number;
    globalReset: number | null;
    globalDelay: Promise<void> | null;
    constructor(client: import("../client/BaseClient"), tokenPrefix?: RESTManager["tokenPrefix"]);
    /**
     * I don't think you could feasibly type this.
     */
    get api(): any;
    getAuth(): string;
    get cdn(): {
        Emoji: (emojiID: string, format?: import("..").AllowedImageFormat) => string;
        Asset: (name: string) => string;
        DefaultAvatar: (discriminator: string) => string;
        Avatar: (userID: string, hash: string, format?: import("..").AllowedImageFormat, size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | undefined, dynamic?: boolean) => string;
        Banner: (guildID: string, hash: string, format?: import("..").AllowedImageFormat, size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | undefined) => string;
        Icon: (guildID: string, hash: string, format?: import("..").AllowedImageFormat, size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | undefined, dynamic?: boolean) => string;
        AppIcon: (clientID: string, hash: string, options?: {
            format?: "webp" | "png" | "jpg" | "jpeg" | "gif" | undefined;
            size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | undefined;
        }) => string;
        AppAsset: (clientID: string, hash: string, options?: {
            format?: "webp" | "png" | "jpg" | "jpeg" | "gif" | undefined;
            size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | undefined;
        }) => string;
        GDMIcon: (channelID: string, hash: string, format?: import("..").AllowedImageFormat, size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | undefined) => string;
        Splash: (guildID: string, hash: string, format?: import("..").AllowedImageFormat, size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | undefined) => string;
        DiscoverySplash: (guildID: string, hash: string, format?: import("..").AllowedImageFormat, size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | undefined) => string;
        TeamIcon: (teamID: string, hash: string, options?: {
            format?: "webp" | "png" | "jpg" | "jpeg" | "gif" | undefined;
            size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | undefined;
        }) => string;
    };
    request(method: HTTPMethod, url: string, options: Options): Promise<any>;
    get endpoint(): string;
    set endpoint(endpoint: string);
}
export = RESTManager;
