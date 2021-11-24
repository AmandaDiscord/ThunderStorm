// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import STEndpoints from "snowtransfer/dist/Endpoints";

import Base from "./Base";
import { Events } from "../util/Constants";
import DataResolver from "../util/DataResolver";

// @ts-ignore
class GuildTemplate extends Base {
	public static GUILD_TEMPLATES_PATTERN = /discord(?:app)?\.(?:com\/template|new)\/([\w-]{2,255})/gi;

	public code!: string;
	public name!: string;
	public description!: string | null;
	public usageCount!: number;
	public creatorId!: string;
	public creator!: import("./User");
	public createdAt!: Date;
	public updatedAt!: Date;
	public guildId!: string;
	public serializedGuild!: Partial<import("discord-typings").GuildData>;
	public unSynced!: boolean | null;
	public guild!: import("./Partial/PartialGuild");

	public static readonly default = GuildTemplate;

	public constructor(client: import("../client/Client"), data: any) {
		super(client);
		this._patch(data);
	}

	public _patch(data: any) {
		const PartialGuild: typeof import("./Partial/PartialGuild") = require("./Partial/PartialGuild");
		const User: typeof import("./User") = require("./User");

		this.code = data.code;
		this.name = data.name;
		this.description = data.description;
		this.usageCount = data.usage_count;
		this.creatorId = data.creator_id;
		this.creator = new User(this.client, data.creator);
		this.createdAt = new Date(data.created_at);
		this.updatedAt = new Date(data.updated_at);
		this.guildId = data.source_guild_id;
		this.guild = new PartialGuild(this.client, { id: this.guildId });
		this.serializedGuild = data.serialized_source_guild;
		this.unSynced = "is_dirty" in data ? Boolean(data.is_dirty) : null;

		return this;
	}

	public async createGuild(name: string, icon?: import("../Types").BufferResolvable | import("../Types").Base64Resolvable): Promise<import("./Guild")> {
		const Guild: typeof import("./Guild") = require("./Guild");
		const { client } = this;
		const data = await client.api.guilds.templates(this.code).post({
			data: {
				name,
				icon: await DataResolver.resolveImage(icon)
			}
		});
		return new Promise(resolve => {
			const resolveGuild = (guild: import("./Guild")) => {
				client.off(Events.GUILD_CREATE, handleGuild);
				client.decrementMaxListeners();
				resolve(guild);
			};

			const handleGuild = (guild: import("./Guild")) => {
				if (guild.id === data.id) {
					client.clearTimeout(timeout);
					resolveGuild(guild);
				}
			};

			client.incrementMaxListeners();
			client.on(Events.GUILD_CREATE, handleGuild);

			const timeout = client.setTimeout(() => resolveGuild(new Guild(client, data)), 10000);
		});
	}

	public edit(options: { name?: string, description?: string } = {}): Promise<this> {
		return this.client.api
			.guilds(this.guildId)
			.templates(this.code)
			.patch({ data: options })
			.then((data: any) => this._patch(data));
	}

	public delete(): Promise<this> {
		return this.client.api
			.guilds(this.guildId)
			.templates(this.code)
			.delete()
			.then(() => this);
	}

	public sync(): Promise<this> {
		return this.client.api
			.guilds(this.guildId)
			.templates(this.code)
			.put()
			.then((data: any) => this._patch(data));
	}

	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	public get updatedTimestamp() {
		return this.updatedAt.getTime();
	}

	public get url() {
		return `${STEndpoints.BASE_HOST}${STEndpoints.BASE_URL}/guilds/templates/${this.code}`;
	}

	public toString() {
		return this.code;
	}
}

export = GuildTemplate;
