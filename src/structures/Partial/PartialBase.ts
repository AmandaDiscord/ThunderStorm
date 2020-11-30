import CategoryChannel from "../CategoryChannel";
import DMChannel from "../DMChannel";
import Guild from "../Guild";
import NewsChannel from "../NewsChannel";
import TextChannel from "../TextChannel";
import User from "../User";
import VoiceChannel from "../VoiceChannel";

import SnowflakeUtil from "../Util/SnowflakeUtil";

interface FetchData {
	"User": import("../User")
	"Channel": import("../Channel")
	"Guild": import("../Guild")
	"Role": import("../Role")
	"Base": PartialBase<any>
}

class PartialBase<Type extends FetchData[keyof FetchData]> {
	public client: import("../Client");
	public partial: boolean;
	public partialType: keyof FetchData;
	public id: string;
	public guild?: import("./PartialGuild") | null

	public constructor(data: import("../../internal").PartialData, client: import("../Client")) {
		this.client = client;
		this.partial = true;
		this.partialType = "Base";

		this.id = data.id;
	}

	public get createdTimestamp() {
		return SnowflakeUtil.deconstruct(this.id).timestamp;
	}

	public get createdAt() {
		return new Date(this.createdTimestamp);
	}

	public toJSON() {
		return {
			id: this.id
		};
	}

	public async fetch(): Promise<Type | null> {
		let data = null;

		if (this.partialType === "Channel") {
			const channeldata = await this.client._snow.channel.getChannel(this.id);
			// @ts-ignore
			if (channeldata.type === 0) data = new TextChannel(channeldata, this.client);
			// @ts-ignore
			else if (channeldata.type === 1) data = new DMChannel(channeldata, this.client);
			// @ts-ignore
			else if (channeldata.type === 2) data = new VoiceChannel(channeldata, this.client);
			// @ts-ignore
			else if (channeldata.type === 4) data = new CategoryChannel(channeldata, this.client);
			// @ts-ignore
			else if (channeldata.type === 5) data = new NewsChannel(channeldata, this.client);
			else data = channeldata;
		} else if (this.partialType === "Guild") {
			const guilddata = await this.client._snow.guild.getGuild(this.id);
			if (!guilddata) return null;
			data = new Guild(guilddata, this.client);
		} else if (this.partialType === "User") {
			const userdata = await this.client._snow.user.getUser(this.id);
			if (!userdata) return null;
			data = new User(userdata, this.client);
		} else if (this.partialType === "Role") {
			const Role = (await import("../Role")).default; // lazy load
			if (!this.guild) return null;
			const rolesdata = await this.client._snow.guild.getGuildRoles(this.guild.id);
			if (!rolesdata) return null;
			const roledata = rolesdata.find(r => r.id === this.id);
			// @ts-ignore
			if (roledata) data = new Role(roledata, this.client);
		}

		// @ts-ignore
		return data;
	}
}

export = PartialBase;
