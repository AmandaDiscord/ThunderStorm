import Base from "./Base";
import GuildPreviewEmoji from "./GuildPreviewEmoji";
import Collection from "../util/Collection";
declare class GuildPreview extends Base {
    name: string;
    icon: string | null;
    splash: string | null;
    discoverySplash: string | null;
    features: Array<import("../Types").Feature>;
    approximateMemberCount: number;
    approximatePresenceCount: number;
    description: string | null;
    emojis: Collection<string, GuildPreviewEmoji>;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").GuildPreviewData);
    _patch(data: import("@amanda/discordtypings").GuildPreviewData): void;
    splashURL(options?: import("../Types").ImageURLOptions): string | null;
    discoverySplashURL(options?: import("../Types").ImageURLOptions): string | null;
    iconURL(options?: import("../Types").ImageURLOptions & {
        dynamic?: boolean;
    }): string | null;
    fetch(): Promise<this>;
    toString(): string;
    toJSON(): any;
}
export = GuildPreview;
