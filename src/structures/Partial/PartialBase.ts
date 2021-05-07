import CategoryChannel from "../CategoryChannel";
import DMChannel from "../DMChannel";
import Guild from "../Guild";
import Message from "../Message";
import NewsChannel from "../NewsChannel";
import StageChannel from "../StageChannel";
import TextChannel from "../TextChannel";
import ThreadNewsChannel from "../ThreadNewsChannel";
import ThreadTextChannel from "../ThreadTextChannel";
import User from "../User";
import VoiceChannel from "../VoiceChannel";

import SnowflakeUtil from "../Util/SnowflakeUtil";

interface FetchData {
	"Base": PartialBase<any>;
	"Channel": import("../Channel");
	"Guild": import("../Guild");
	"Message": import("../Message");
	"Role": import("../Role");
	"Thread": import("../ThreadTextChannel") | import("../ThreadNewsChannel");
	"User": import("../User");
}

class PartialBase<Type extends FetchData[keyof FetchData]> {
	public client: import("../Client");
	public partial: boolean;
	public partialType: keyof FetchData = "Base";
	public id: string;
	public guild?: import("./PartialGuild") | null;
	public channel?: import("./PartialChannel");
	public parent?: import("./PartialChannel");

	public constructor(data: import("../../internal").PartialData, client: import("../Client")) {
		this.client = client;
		this.partial = true;

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

			if (channeldata.type === 0) data = new TextChannel(channeldata as any, this.client);
			else if (channeldata.type === 1) data = new DMChannel(channeldata as any, this.client);
			else if (channeldata.type === 2) data = new VoiceChannel(channeldata as any, this.client);
			else if (channeldata.type === 4) data = new CategoryChannel(channeldata as any, this.client);
			else if (channeldata.type === 5) data = new NewsChannel(channeldata as any, this.client);
			else if (channeldata.type === 13) data = new StageChannel(channeldata as any, this.client);
			else data = channeldata;
		} else if (this.partialType === "Guild") {
			const guilddata = await this.client._snow.guild.getGuild(this.id);
			if (!guilddata) return null;
			data = new Guild(guilddata, this.client);
		} else if (this.partialType === "Role") {
			const Role: typeof import("../Role") = require("../Role");
			if (!this.guild) return null;
			const rolesdata = await this.client._snow.guild.getGuildRoles(this.guild.id);
			if (!rolesdata) return null;
			const roledata = rolesdata.find(r => r.id === this.id);
			if (roledata) data = new Role(roledata as any, this.client);
		} else if (this.partialType === "Thread") {
			if (!this.parent) return null;
			const threaddata = await this.client._snow.channel.getChannelActiveThreads(this.parent.id);
			if (!threaddata) return null;
			const current = threaddata.find(c => c.id === this.id);
			if (!current) return null;
			data = current.type === 10 ? new ThreadNewsChannel(current, this.client) : new ThreadTextChannel(current, this.client);
		} else if (this.partialType === "User") {
			const userdata = await this.client._snow.user.getUser(this.id);
			if (!userdata) return null;
			if (userdata.id === this.client.user?.id) this.client.user._patch(userdata);
			data = userdata.id === this.client.user?.id ? this.client.user : new User(userdata, this.client);
		} else if (this.partialType === "Message") {
			if (!this.channel) return null;
			const messagedata = await this.client._snow.channel.getChannelMessage(this.channel.id, this.id);
			if (!messagedata) return null;
			if (this.guild) messagedata.guild_id = this.guild.id;
			data = new Message(messagedata, this.client);
		}

		// @ts-ignore
		return data;
	}
}

export = PartialBase;
