import Base from "./Base";
import ActivityFlags from "../util/ActivityFlags";
export declare class Presence extends Base {
    userId: string;
    guild: import("./Partial/PartialGuild") | null;
    status: import("../Types").PresenceStatus;
    activities: Array<Activity>;
    clientStatus: import("discord-typings").ClientStatusData;
    user: import("./User");
    member: import("./GuildMember") | null;
    constructor(client: import("../client/Client"), data: import("discord-typings").PresenceData);
    _patch(data: import("discord-typings").PresenceData | import("discord-typings").PresenceUpdateData): this;
    _clone(): this;
    equals(presence: Presence): boolean;
    toJSON(): import("discord-typings").PresenceData;
}
export declare class Activity {
    presence: Presence;
    name: string;
    type: import("../Types").ActivityType;
    url: string | null;
    details: string | null;
    state: string | null;
    applicationId: string | null;
    timestamps: {
        start: Date | null;
        end: Date | null;
    } | null;
    party: Exclude<import("discord-typings").ActivityData["party"], undefined> | null;
    assets: RichPresenceAssets | null;
    syncId: string;
    flags: Readonly<ActivityFlags>;
    emoji: import("./Emoji") | null;
    createdTimestamp: number;
    constructor(presence: Presence, data: import("discord-typings").ActivityData);
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
            id: string;
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
    constructor(activity: Activity, assets: Exclude<import("discord-typings").ActivityData["assets"], undefined>);
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
declare const _default: typeof import("./Presence");
export default _default;
