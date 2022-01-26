import Base from "./Base";
import IntegrationApplication from "./IntegrationApplication";
import { Collection } from "@discordjs/collection";
declare class Integration extends Base {
    guild: import("./Guild") | import("./Partial/PartialGuild");
    name: string;
    type: string;
    enabled: boolean;
    syncing: boolean;
    role: import("./Partial/PartialRole");
    user: import("./User") | null;
    account: import("../Types").IntegrationAccount;
    syncedAt: number;
    roles: Collection<string, import("./Role")>;
    expireBehavior: number;
    expireGracePeriod: number;
    application: IntegrationApplication | null;
    static readonly default: typeof Integration;
    constructor(client: import("../client/Client"), data: any, guild: import("./Guild") | import("./Partial/PartialGuild"));
    _patch(data: any): void;
    sync(): Promise<this>;
    delete(reason?: string): Promise<this>;
    toJSON(): any;
}
export = Integration;
