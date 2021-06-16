import Base from "./Base";
import User from "./User";
declare class TeamMember extends Base {
    team: import("./Team");
    permissions: ["*"];
    membershipState: "INVITED" | "ACCEPTED";
    user: User;
    constructor(team: import("./Team"), data: import("@amanda/discordtypings").TeamMemberData);
    toString(): string;
    toJSON(): {
        id: string;
        team_id: string;
        membership_state: 2 | 1;
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
    _patch(data: import("@amanda/discordtypings").TeamMemberData): void;
}
export = TeamMember;
