import Base from "./Base";
import ActivityFlags from "../util/ActivityFlags";
export declare class Presence extends Base {
    userID: string;
    guild: import("./Partial/PartialGuild") | null;
    status: import("../Types").PresenceStatus;
    activities: Array<Activity>;
    clientStatus: import("@amanda/discordtypings").ClientStatusData;
    user: import("./User");
    member: import("./GuildMember") | null;
    constructor(client: import("../client/Client"), data: import("@amanda/discordtypings").PresenceData);
    _patch(data: import("@amanda/discordtypings").PresenceData): this;
    _clone(): this;
    equals(presence: Presence): boolean;
    toJSON(): import("@amanda/discordtypings").PresenceData;
}
export declare class Activity {
    presence: Presence;
    name: string;
    type: import("../Types").ActivityType;
    url: string | null;
    details: string | null;
    state: string | null;
    applicationID: string | null;
    timestamps: {
        start: Date | null;
        end: Date | null;
    } | null;
    party: Exclude<import("@amanda/discordtypings").ActivityData["party"], undefined> | null;
    assets: RichPresenceAssets | null;
    syncID: string;
    flags: Readonly<ActivityFlags>;
    emoji: import("./Emoji") | null;
    createdTimestamp: number;
    constructor(presence: Presence, data: import("@amanda/discordtypings").ActivityData);
    equals(activity: Activity): boolean;
    get createdAt(): Date;
    toString(): string;
    toJSON(): {
        name: string;
        type: number;
        url: string | undefined;
        created_at: number;
        timestamps: {
            start: number | undefined;
            end: number | undefined;
        };
        emoji: {
            id: string | null;
            animated: boolean;
            name: string;
        } | undefined;
        party: {
            id?: string | undefined;
            size?: [number, number] | undefined;
        } | undefined;
        assets: {
            large_text: string | undefined;
            small_text: string | undefined;
            large_image: string | undefined;
            small_image: string | undefined;
        } | undefined;
        flags: number;
    };
    _clone(): Activity;
}
export declare class RichPresenceAssets {
    largeText: string | null;
    smallText: string | null;
    largeImage: string | null;
    smallImage: string | null;
    activity: Activity;
    constructor(activity: Activity, assets: Exclude<import("@amanda/discordtypings").ActivityData["assets"], undefined>);
    smallImageURL(options?: {
        format?: import("../Types").AllowedImageFormat;
        size?: import("../Types").ImageSize;
    }): string | null;
    largeImageURL(options?: {
        format?: import("../Types").AllowedImageFormat;
        size?: import("../Types").ImageSize;
    }): string | null;
    toJSON(): {
        large_text: string | undefined;
        small_text: string | undefined;
        large_image: string | undefined;
        small_image: string | undefined;
    };
}
declare const _default: {
    Presence: typeof Presence;
    Activity: typeof Activity;
    RichPresenceAssets: typeof RichPresenceAssets;
};
export default _default;
