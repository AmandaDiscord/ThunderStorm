import Collection from "./Util/Collection";
import Base from "./Base";
import TeamMember from "./TeamMember";
declare class Team extends Base {
    name: string;
    icon: string | null;
    ownerID: string;
    members: Collection<string, TeamMember>;
    constructor(data: import("@amanda/discordtypings").TeamData, client: import("./Client"));
    get owner(): TeamMember | null | undefined;
    iconURL(options?: {
        size: number;
        format: string;
        dynamic: boolean;
    }): string | null;
    toString(): string;
    toJSON(): {
        id: string;
        icon: string | null;
        name: string;
        owner_user_id: string;
        members: {
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
        }[];
    };
    _patch(data: import("@amanda/discordtypings").TeamData): void;
}
export = Team;
