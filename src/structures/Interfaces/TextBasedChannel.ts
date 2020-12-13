import { isObject } from "../Util/Util";

export interface FetchMessageOptions {
	limit?: number;
	before?: string;
	after?: string;
	around?: string;
}

export async function send(instance: import("../Partial/PartialBase")<any> | import("../Channel") | import("../User") | import("../GuildMember"), content: import("../../Types").StringResolvable, options: import("../../Types").MessageOptions | undefined = {}) {
	const PartialBase: typeof import("../Partial/PartialBase") = require("../Partial/PartialBase");

	const User: typeof import("../User") = require("../User");
	const Channel: typeof import("../Channel") = require("../Channel");
	const GuildMember: typeof import("../GuildMember") = require("../GuildMember");

	const Message: typeof import("../Message") = require("../Message"); // lazy load

	let mode;
	const payload = transform(content, options);

	if (instance instanceof PartialBase) {
		if (instance.partialType == "Channel") mode = "channel";
		if (instance.partialType == "User") mode = "user";
	} else if (instance instanceof Channel) mode = "channel";
	else if (instance instanceof User) mode = "user";
	else if (instance instanceof GuildMember) mode = "user";

	let ID;
	// @ts-ignore
	if (mode == "user") ID = await instance.client._snow.user.createDirectMessageChannel(instance.id).then(chan => chan.id || chan.Id);
	else ID = instance.id;

	const msg = await instance.client._snow.channel.createMessage(ID, payload, { disableEveryone: options.disableEveryone || instance.client._snow.options.disableEveryone || false });
	return new Message(msg, instance.client);
}

export function deleteMessage(client: import("../Client"), channelID: string, messageID: string, timeout: number | undefined = 0): Promise<void> {
	return new Promise((res, rej) => {
		const action = async () => {
			await client._snow.channel.deleteMessage(channelID, messageID).catch(rej);
			return;
		};
		if (timeout) {
			setTimeout(() => {
				return res(action());
			}, timeout);
		} else {
			res(action());
		}
	});
}

export async function fetchMessage(client: import("../Client"), channelID: string, messageID: string): Promise<import("../Message")> {
	const Message = (await import("../Message")).default; // lazy load

	return client._snow.channel.getChannelMessage(channelID, messageID).then(data => new Message(data, client));
}

export async function fetchMessages(client: import("../Client"), channelID: string, options?: FetchMessageOptions): Promise<Array<import("../Message")>> {
	const Message = (await import("../Message")).default; // lazy load

	return client._snow.channel.getChannelMessages(channelID, options).then(data => data.map(i => new Message(i, client)));
}

export function transform(content: import("../../Types").StringResolvable, options: import("../../Types").MessageOptions = {}, isEdit: boolean | undefined = false): { content?: string | null; embeds?: Array<any>; nonce?: string; tts?: boolean; file?: any; } {
	const MessageEmbed: typeof import("../MessageEmbed") = require("../MessageEmbed");

	const payload: { content?: string | null; embed?: any; nonce?: string; tts?: boolean; file?: { name?: string, file: string } } = {};

	if (isObject(content) && !Array.isArray(content) && (content.content || content.embed || content.nonce || content.tts || content.file)) {
		if (content.attachment) options.file = content;
		else options = content;
		content = undefined;
	} else if (content instanceof MessageEmbed) {
		options.embed = content;
		content = undefined;
	} else if (Array.isArray(content)) {
		content = content.join("\n");
	} else content = String(content);

	payload["content"] = options.content || content || "";
	payload["embed"] = options.embed ? options.embed.toJSON() : undefined;
	payload["nonce"] = options.nonce;
	payload["tts"] = options.tts || false;
	payload["file"] = options.file ? { name: options.file.name || "file.png", file: options.file.attachment as string } : undefined;

	if (isEdit && !payload["content"]) payload["content"] = null;

	if ((!payload["content"] && !isEdit) || (payload["content"] === "")) delete payload["content"];
	if (!payload["embed"]) delete payload["embed"];
	if (!payload["nonce"]) delete payload["nonce"];
	if (!payload["tts"]) delete payload["tts"];
	if (!payload["file"]) delete payload["file"];

	if (payload["embed"]) {
		delete payload["embed"]["type"];
		for (const prop in payload["embed"]) {
			if (payload["embed"][prop] === null || payload["embed"][prop] === undefined || (Array.isArray(payload["embed"][prop]) && payload["embed"][prop].length === 0)) {
				delete payload["embed"][prop];
			}
		}
	}

	return payload;
}

export function sendTyping(client: import("../Client"), channelID: string) {
	return client._snow.channel.startChannelTyping(channelID);
}

export default { send, sendTyping, deleteMessage, fetchMessage, fetchMessages, transform };
