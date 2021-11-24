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

import SnowflakeUtil from "../../util/SnowflakeUtil";
import Util from "../../util/Util";

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
	public client: import("../../client/Client");
	public partial: true = true;
	public partialType: keyof FetchData = "Base";
	public id: string;
	public guild?: import("./PartialGuild") | null;
	public channel?: import("./PartialChannel");
	public parent?: import("./PartialChannel");

	public static readonly default = PartialBase;

	public constructor(client: import("../../client/Client"), data: import("../../internal").PartialData) {
		this.client = client;

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

			data = Util.createChannelFromData(this.client, channeldata as import("discord-typings").TextChannelData);
		} else if (this.partialType === "Guild") {
			const guilddata = await this.client._snow.guild.getGuild(this.id);
			if (!guilddata) return null;
			data = new Guild(this.client, guilddata);
		} else if (this.partialType === "Role") {
			const Role: typeof import("../Role") = require("../Role");
			if (!this.guild) return null;
			const rolesdata = await this.client._snow.guild.getGuildRoles(this.guild.id);
			if (!rolesdata) return null;
			const roledata = rolesdata.find(r => r.id === this.id);
			if (roledata) data = new Role(this.client, roledata as any);
		} else if (this.partialType === "Thread") {
			const threaddata = await this.client._snow.channel.getChannel(this.id) as import("discord-typings").ThreadChannelData;
			if (!threaddata) return null;
			data = threaddata.type === 10 && this.guild ? new ThreadNewsChannel(this.guild, threaddata) : (this.guild ? new ThreadTextChannel(this.guild, threaddata) : null);
		} else if (this.partialType === "User") {
			const userdata = await this.client._snow.user.getUser(this.id);
			if (!userdata) return null;
			if (userdata.id === this.client.user?.id) this.client.user!._patch(userdata);
			data = userdata.id === this.client.user?.id ? this.client.user : new User(this.client, userdata);
		} else if (this.partialType === "Message") {
			if (!this.channel) return null;
			const messagedata = await this.client._snow.channel.getChannelMessage(this.channel.id, this.id);
			if (!messagedata) return null;
			if (this.guild) messagedata.guild_id = this.guild.id;
			data = new Message(this.client, messagedata, this.channel);
		}

		return data as Type;
	}
}

export = PartialBase;
