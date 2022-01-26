import Base from "./Base";
declare class ThreadMember extends Base {
    flags: number;
    threadId: string;
    thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel") | import("./Partial/PartialThreadChannel");
    joinedAt: Date;
    joinedTimestamp: number;
    user: import("./Partial/PartialUser");
    static readonly default: typeof ThreadMember;
    constructor(thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel") | import("./Partial/PartialThreadChannel"), data: import("discord-typings").ThreadMemberData);
    toJSON(): {
        flags: number;
        id: string;
        join_timestamp: string;
        user_id: string;
    };
    _patch(data: import("discord-typings").ThreadMemberData): void;
}
export = ThreadMember;
