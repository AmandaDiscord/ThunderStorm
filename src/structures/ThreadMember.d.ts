import Base from "./Base";
declare class ThreadMember extends Base {
    flags: number;
    threadID: string;
    thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel") | import("./Partial/PartialThreadChannel");
    joinedAt: Date;
    joinedTimestamp: number;
    user: import("./Partial/PartialUser");
    constructor(thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel") | import("./Partial/PartialThreadChannel"), data: import("@amanda/discordtypings").ThreadMemberData);
    toJSON(): {
        flags: number;
        id: string;
        join_timestamp: string;
        user_id: string;
    };
    _patch(data: import("@amanda/discordtypings").ThreadMemberData): void;
}
export = ThreadMember;
