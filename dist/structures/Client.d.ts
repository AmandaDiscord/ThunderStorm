/// <reference types="node" />
import { EventEmitter } from "events";
import VoiceRegion from "./VoiceRegion";
declare class Client extends EventEmitter {
    options: import("../types").ClientOptions;
    readyTimestamp: number | null;
    token: string;
    user: import("./ClientUser") | null;
    _snow: import("snowtransfer");
    constructor(options: import("../types").ClientOptions);
    emit<E extends keyof import("../types").ClientEvents>(event: E, ...args: import("../types").ClientEvents[E]): boolean;
    once<E extends keyof import("../types").ClientEvents>(event: E, listener: (...args: import("../types").ClientEvents[E]) => any): this;
    on<E extends keyof import("../types").ClientEvents>(event: E, listener: (...args: import("../types").ClientEvents[E]) => any): this;
    get readyAt(): Date | null;
    get uptime(): number;
    toString(): string;
    fetchUser(userID: string): Promise<import("./User")>;
    fetchInvite(id: string): Promise<import("./Invite") | null>;
    fetchVoiceRegions(): Promise<Map<any, VoiceRegion>>;
}
export = Client;
