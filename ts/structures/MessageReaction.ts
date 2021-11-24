// THIS FILE HAS BEEN MODIFIED FROM DISCORD.JS CODE
import { Collection } from "@discordjs/collection";

import ReactionEmoji from "./ReactionEmoji";

class MessageReaction {
	public message: import("./Message") | import("./Partial/PartialMessage");
	public me: boolean;
	public count = 0;
	public users = new Collection<string, import("./User")>();
	public emoji: import("./ReactionEmoji");

	public static readonly default = MessageReaction;

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
		else if (user instanceof Message) userId = user.author!.id;
		else if (user instanceof Guild) userId = user.ownerId;
		else userId = user.id;

		if (!userId) return Promise.reject(new Error("Couldn't resolve the user ID to remove from the reaction."));
		await this.message.client._snow.channel.deleteReaction(this.message.channel.id, this.message.id, this.emoji.identifier, userId);
		if (this.message instanceof Message) this.message.reactions.get(this.emoji.id || this.emoji.name)?.users.delete(userId);
		return this;
	}

	public async removeAll(): Promise<MessageReaction> {
		const Message: typeof import("./Message") = require("./Message");
		await this.message.client._snow.channel.deleteReaction(this.message.channel.id, this.message.id, this.emoji.identifier);
		if (this.message instanceof Message) this.message.reactions.delete(this.emoji.id || this.emoji.name);
		this.count = 0;
		this.me = false;
		return this;
	}

	public async fetchUsers(): Promise<Collection<string, import("./User")>> {
		const message = this.message;
		const User: typeof import("./User") = require("./User");
		const data = await this.message.client._snow.channel.getReactions(message.channel.id, message.id, this.emoji.identifier);
		const users = new Collection<string, import("./User")>();
		for (const rawUser of data) {
			if (rawUser.id === message.client.user?.id) {
				message.client.user._patch(rawUser);
				this.me = true;
			}
			const user = rawUser.id === message.client.user?.id ? message.client.user : new User(message.client, rawUser);
			this.users.set(user.id, user);
			users.set(user.id, user);
		}
		return users;
	}
}

export = MessageReaction;
