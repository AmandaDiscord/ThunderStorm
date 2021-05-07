import Base from "./Base";
import PartialUser from "./Partial/PartialUser";
declare class ThreadMember extends Base {
    flags: number;
    threadID: string;
    thread: import("./ThreadTextChannel") | import("./ThreadNewsChannel") | import("./Partial/PartialThreadChannel");
    joinedAt: Date;
    joinedTimestamp: number;
    user: PartialUser;
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
