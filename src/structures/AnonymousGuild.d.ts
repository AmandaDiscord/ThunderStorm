import BaseGuild from "./BaseGuild";
/**
 * Bundles common attributes and methods between {@link Guild} and {@link InviteGuild}
 * @abstract
 */
declare class AnonymousGuild extends BaseGuild {
    splash: string | null;
    banner: string | null;
    description: string | null;
    verificationLevel: import("../Types").VerificationLevel;
    vanityURLCode: string | null;
    nsfwLevel: import("../Types").NSFWLevel;
    constructor(client: import("../client/Client"), data: any);
    _patch(data: any): void;
    bannerURL(options?: import("../Types").ImageURLOptions): string | null;
    splashURL(options?: import("../Types").ImageURLOptions): string | null;
}
export = AnonymousGuild;
