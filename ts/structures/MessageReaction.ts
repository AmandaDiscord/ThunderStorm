import Collection from "../util/Collection";

import ReactionEmoji from "./ReactionEmoji";

class MessageReaction {
	public message: import("./Message") | import("./Partial/PartialMessage");
	public me: boolean;
	public count = 0;
	public users: Collection<string, import("./User")> = new Collection();
	public emoji: import("./ReactionEmoji");

	public constructor(message: import("./Message") | import("./Partial/PartialMessage"), emoji: import("discord-typings").ReactionData["emoji"], count: number, me: boolean) {
		this.message = message;
		this.me = me;
		this.count = count || 0;
		this.emoji = new ReactionEmoji(this, emoji);
	}

	public async remove(user: import("../Types").UserResolvable = this.message.client.user as import("./ClientUser")): Promise<MessageReaction> {
		const Message: typeof import("./Message") = require("./Message");
		const Guild: typeof import("./Guild") = require("./Guild");
		let userId: string;
		if (typeof user === "string") userId = user;
		else if (user instanceof Message) userId = user.author!.Id;
		else if (user instanceof Guild) userId = user.ownerId;
		else userId = user.Id;

		if (!userId) return Promise.reject(new Error("Couldn't resolve the user ID to remove from the reaction."));
		await this.message.client._snow.channel.deleteReaction(this.message.channel.Id, this.message.Id, this.emoji.identifier, userId);
		if (this.message instanceof Message) this.message.reactions.get(this.emoji.Id || this.emoji.name)?.users.delete(userId);
		return this;
	}

	public async removeAll(): Promise<MessageReaction> {
		const Message: typeof import("./Message") = require("./Message");
		await this.message.client._snow.channel.deleteReaction(this.message.channel.Id, this.message.Id, this.emoji.identifier);
		if (this.message instanceof Message) this.message.reactions.delete(this.emoji.Id || this.emoji.name);
		this.count = 0;
		this.me = false;
		return this;
	}

	public async fetchUsers(): Promise<Collection<string, import("./User")>> {
		const message = this.message;
		const User: typeof import("./User") = require("./User");
		const data = await this.message.client._snow.channel.getReactions(message.channel.Id, message.Id, this.emoji.identifier);
		const users: Collection<string, import("./User")> = new Collection();
		for (const rawUser of data) {
			if (rawUser.id === message.client.user?.Id) {
				message.client.user._patch(rawUser);
				this.me = true;
			}
			const user = rawUser.id === message.client.user?.Id ? message.client.user : new User(message.client, rawUser);
			this.users.set(user.Id, user);
			users.set(user.Id, user);
		}
		return users;
	}
}

export = MessageReaction;
