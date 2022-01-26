import BaseGuild from "./BaseGuild";
declare abstract class AnonymousGuild extends BaseGuild {
    splash: string | null;
    banner: string | null;
    description: string | null;
    verificationLevel: import("../Types").VerificationLevel;
    vanityURLCode: string | null;
    nsfwLevel: import("../Types").NSFWLevel;
    static readonly default: typeof AnonymousGuild;
    constructor(client: import("../client/Client"), data: any);
    _patch(data: any): void;
    bannerURL(options?: import("../Types").ImageURLOptions): void | null;
    splashURL(options?: import("../Types").ImageURLOptions): string | null;
}
export = AnonymousGuild;
