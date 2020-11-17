/// <reference types="node" />
import { EventEmitter } from "events";
import VoiceRegion from "./VoiceRegion";
declare class Client extends EventEmitter {
    options: import("../Types").ClientOptions;
    readyTimestamp: number | null;
    token: string;
    user: import("./ClientUser") | null;
    _snow: import("snowtransfer");
    constructor(options: import("../Types").ClientOptions);
    emit<E extends keyof import("../Types").ClientEvents>(event: E, ...args: import("../Types").ClientEvents[E]): boolean;
    once<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
    on<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
    get readyAt(): Date | null;
    get uptime(): number;
    toString(): string;
    fetchUser(userID: string): Promise<import("./User")>;
    fetchInvite(id: string): Promise<import("./Invite") | null>;
    fetchVoiceRegions(): Promise<Map<any, VoiceRegion>>;
}
export = Client;
