import { PartialTypes } from "../../util/Constants";

class GenericAction {
	public client: import("../Client");

	public constructor(client: import("../Client")) {
		this.client = client;
	}

	public handle(...args: Array<any>) {
		return args as any;
	}

	public getPayload(data: any, manager: any, id: string, partialType: keyof typeof PartialTypes) {
		return data;
	}

	public getChannel(data: any) {
		const id = data.channel_id || data.id;
		return (
			data.channel ||
			this.getPayload(
				{
					id,
					guild_id: data.guild_id,
					recipients: [data.author || { id: data.user_id }]
				},
				{},
				id,
				PartialTypes.CHANNEL
			)
		);
	}

	getMessage(data: any, channel: any) {
		const id = data.message_id || data.id;
		return (
			data.message ||
			this.getPayload(
				{
					id,
					channel_id: channel.id,
					guild_id: data.guild_id || (channel.guild ? channel.guild.id : null)
				},
				channel.messages,
				id,
				PartialTypes.MESSAGE
			)
		);
	}

	getReaction(data: any, message: any, user: any) {
		const id = data.emoji.id || decodeURIComponent(data.emoji.name);
		return this.getPayload(
			{
				emoji: data.emoji,
				count: message.partial ? null : 0,
				me: user ? user.id === this.client.user?.id : false
			},
			message.reactions,
			id,
			PartialTypes.REACTION
		);
	}

	getMember(data: any, guild: any) {
		return this.getPayload(data, guild.members, data.user.id, PartialTypes.GUILD_MEMBER);
	}

	getUser(data: any) {
		const id = data.user_id;
		return data.user || this.getPayload({ id }, {}, id, PartialTypes.USER);
	}

	getUserFromMember(data: any) {
		return this.getUser(data);
	}
}

export = GenericAction;
