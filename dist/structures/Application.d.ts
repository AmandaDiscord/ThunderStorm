import Base from "./Base";
declare class Application extends Base {
    description: string;
    icon: string | null;
    cover: string | null;
    name: string;
    constructor(data: import("@amanda/discordtypings").ApplicationData, client: import("./Client"));
    iconURL(options?: {
        size: number;
        format: string;
        dynamic: boolean;
    }): string | null;
    coverURL(options?: {
        size: number;
        format: string;
        dynamic: boolean;
    }): string | null;
    fetchAssets(): Promise<never[]>;
    toString(): string;
    toJSON(): {
        id: string;
        description: string;
        icon: string | null;
        name: string;
        cover_image?: string | undefined;
    };
    _patch(data: import("@amanda/discordtypings").ApplicationData): void;
}
export = Application;
