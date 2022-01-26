declare class ThreadMetaData {
    client: import("../client/Client");
    thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel");
    locked: boolean;
    autoArchiveDuration: number;
    archiver: import("./Partial/PartialUser") | null;
    archiveStatusChangedAt: Date;
    archiveStatusChangedTimestamp: number;
    private _archived;
    static readonly default: typeof ThreadMetaData;
    constructor(thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel"), data: import("discord-typings").ThreadMetaData);
    get archived(): boolean;
    toJSON(): {
        locked: boolean;
        auto_archive_duration: number;
        archived: boolean;
        archive_timestamp: string;
        archiver_id?: string | undefined;
    };
    _patch(data: import("discord-typings").ThreadMetaData): void;
}
export = ThreadMetaData;
