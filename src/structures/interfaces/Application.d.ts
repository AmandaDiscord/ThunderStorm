import Base from "../Base";
declare abstract class Application extends Base {
    name: string | null;
    description: string | null;
    icon: string | null;
    cover: string | null;
    static readonly default: typeof Application;
    constructor(client: import("../../client/Client"), data: import("discord-typings").ApplicationData);
    _patch(data: import("discord-typings").ApplicationData): void;
    get createdTimestamp(): number;
    get createdAt(): Date;
    iconURL(options?: import("../../Types").ImageURLOptions): string | null;
    coverURL(options?: import("../../Types").ImageURLOptions): string | null;
    fetchAssets(): Promise<never[]>;
    toString(): string | null;
    toJSON(): any;
}
export = Application;
