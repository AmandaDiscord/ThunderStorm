import Base from "./Base";
import User from "./User";
declare class TeamMember extends Base {
    team: import("./Team");
    permissions: ["*"];
    membershipState: "INVITED" | "ACCEPTED";
    user: User;
    static readonly default: typeof TeamMember;
    constructor(team: import("./Team"), data: import("discord-typings").TeamMemberData);
    toString(): string;
    toJSON(): {
        id: string;
        team_id: string;
        membership_state: 1 | 2;
        permissions: ["*"];
        user: {
            username: string;
            discriminator: string;
            bot: boolean;
            id: string;
            avatar: string | null;
            public_flags: number;
        };
    };
    _patch(data: import("discord-typings").TeamMemberData): void;
}
export = TeamMember;
