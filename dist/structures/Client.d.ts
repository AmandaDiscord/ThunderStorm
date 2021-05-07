/// <reference types="node" />
import { EventEmitter } from "events";
import Collection from "./Util/Collection";
import VoiceRegion from "./VoiceRegion";
interface Client {
    addListener<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
    emit<E extends keyof import("../Types").ClientEvents>(event: E, ...args: import("../Types").ClientEvents[E]): boolean;
    eventNames(): Array<keyof import("../Types").ClientEvents>;
    listenerCount(event: keyof import("../Types").ClientEvents): number;
    listeners(event: keyof import("../Types").ClientEvents): Array<(...args: Array<any>) => any>;
    off<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
    on<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
    once<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
    prependListener<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
    prependOnceListener<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
    rawListeners(event: keyof import("../Types").ClientEvents): Array<(...args: Array<any>) => any>;
    removeAllListeners(event?: keyof import("../Types").ClientEvents): this;
    removeListener<E extends keyof import("../Types").ClientEvents>(event: E, listener: (...args: import("../Types").ClientEvents[E]) => any): this;
}
declare class Client extends EventEmitter {
    options: import("../Types").ClientOptions;
    readyTimestamp: number | null;
    token: string;
    user: import("./ClientUser") | null;
    _snow: import("snowtransfer");
    constructor(options: import("../Types").ClientOptions);
    get readyAt(): Date | null;
    get uptime(): number;
    toString(): string;
    fetchUser(userID: string): Promise<import("./User")>;
    fetchInvite(id: string): Promise<import("./Invite") | null>;
    fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>>;
}
export = Client;
