import Base from "./Base";
declare class BaseGuild extends Base {
    name: string;
    icon: string | null;
    features: Array<import("../Types").Feature>;
    constructor(client: import("../client/Client"), data: Partial<import("@amanda/discordtypings").GuildData>);
    get createdTimestamp(): number;
    get createdAt(): Date;
    get nameAcronym(): string;
    get partnered(): boolean;
    get verified(): boolean;
    iconURL(options?: import("../Types").ImageURLOptions & {
        dynamic?: boolean;
    }): string | null;
    fetch(): Promise<import("./Guild")>;
    toString(): string;
}
export = BaseGuild;
