import { Collection } from "@discordjs/collection";
import Base from "./Base";
import TeamMember from "./TeamMember";
declare class Team extends Base {
    name: string;
    icon: string | null;
    ownerId: string;
    members: Collection<string, TeamMember>;
    static readonly default: typeof Team;
    constructor(client: import("../client/Client"), data: import("discord-typings").TeamData);
    get createdTimestamp(): number;
    get createdAt(): Date;
    get owner(): TeamMember | null | undefined;
    iconURL(options?: import("../Types").ImageURLOptions): string | null;
    toString(): string;
    toJSON(): {
        id: string;
        icon: string | null;
        name: string;
        owner_user_id: string;
        members: {
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
        }[];
    };
    _patch(data: import("discord-typings").TeamData): void;
}
export = Team;
