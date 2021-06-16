import Collection from "../util/Collection";
import BaseClient from "./BaseClient";
import ActionsManager from "./actions/ActionManager";
import ClientVoiceManager from "./voice/ClientVoiceManager";
import ClientApplication from "../structures/ClientApplication";
import VoiceRegion from "../structures/VoiceRegion";
import Webhook from "../structures/Webhook";
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
declare class Client extends BaseClient {
    readyTimestamp: number | null;
    user: import("../structures/ClientUser") | null;
    actions: ActionsManager;
    voice: ClientVoiceManager;
    application: ClientApplication | null;
    constructor(options: import("../Types").ClientOptions);
    get readyAt(): Date | null;
    get uptime(): number;
    toString(): string;
    fetchUser(userID: string): Promise<import("../structures/User")>;
    fetchInvite(id: string): Promise<import("../structures/Invite") | null>;
    fetchWebhook(id: string, token?: string): Promise<Webhook>;
    fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>>;
}
export = Client;
