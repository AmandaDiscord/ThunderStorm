import Base from "./Base";
import IntegrationApplication from "./IntegrationApplication";
import Collection from "../util/Collection";
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
    constructor(client: import("../client/Client"), data: any, guild: import("./Guild") | import("./Partial/PartialGuild"));
    _patch(data: any): void;
    sync(): Promise<this>;
    edit(data: import("../Types").IntegrationEditData, reason?: string): Promise<this>;
    delete(reason?: string): Promise<this>;
    toJSON(): any;
}
export = Integration;
