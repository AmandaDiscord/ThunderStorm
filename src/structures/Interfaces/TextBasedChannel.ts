import centra from "centra";
import stream from "stream";
import path from "path";
import fs from "fs";

import { isObject } from "../Util/Util";

export interface FetchMessageOptions {
	limit?: number;
	before?: string;
	after?: string;
	around?: string;
}

type PartialMessagable = import("../Partial/PartialBase")<import("../Channel") | import("../User") | (import("../ThreadTextChannel") | import("../ThreadNewsChannel"))>

export async function send(instance: PartialMessagable | import("../Channel") | import("../User") | import("../GuildMember"), content: import("../../Types").StringResolvable, options?: import("../../Types").MessageOptions): Promise<import("../Message")>;
export async function send(instance: import("../Message") | import("../Partial/PartialMessage"), content: import("../../Types").StringResolvable, options?: import("../../Types").MessageOptions): Promise<import("@amanda/discordtypings").MessageData>
export async function send(instance: PartialMessagable | import("../Channel") | import("../User") | import("../GuildMember") | import("../Message") | import("../Partial/PartialMessage"), content: import("../../Types").StringResolvable, options: import("../../Types").MessageOptions | undefined = {}): Promise<import("../Message") | import("@amanda/discordtypings").MessageData> {
	const PartialBase: typeof import("../Partial/PartialBase") = require("../Partial/PartialBase");

	const User: typeof import("../User") = require("../User");
	const Channel: typeof import("../Channel") = require("../Channel");
	const GuildMember: typeof import("../GuildMember") = require("../GuildMember");
	const Message: typeof import("../Message") = require("../Message"); // lazy load

	let mode;
	if (instance instanceof PartialBase) {
		if (instance.partialType === "Channel" || instance.partialType === "Thread") mode = "channel";
		if (instance.partialType === "User") mode = "user";
		if (instance.partialType === "Message") mode = "message";
	} else if (instance instanceof Channel) mode = "channel";
	else if (instance instanceof User) mode = "user";
	else if (instance instanceof GuildMember) mode = "user";
	else if (instance instanceof Message) mode = "message";

	const payload = await transform(content, options, mode === "message");

	let ID;
	if (mode == "user") ID = await instance.client._snow.user.createDirectMessageChannel(instance.id).then(chan => chan.id);
	else if (mode === "message") ID = (instance as typeof Message.prototype).channel.id;
	else ID = instance.id;

	let msg;
	if (mode !== "message") msg = await instance.client._snow.channel.createMessage(ID, payload, { disableEveryone: options.disableEveryone || instance.client._snow.options.disableEveryone || false });
	else msg = await instance.client._snow.channel.editMessage(ID, instance.id, payload, { disableEveryone: options.disableEveryone || instance.client._snow.options.disableEveryone || false });
	if (mode === "message") return msg;
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
	const Message: typeof import("../Message") = require("../Message"); // lazy load

	const data = await client._snow.channel.getChannelMessage(channelID, messageID);
	return new Message(data, client);
}

export async function fetchMessages(client: import("../Client"), channelID: string, options?: FetchMessageOptions): Promise<Array<import("../Message")>> {
	const Message: typeof import("../Message") = require("../Message"); // lazy load

	const data = await client._snow.channel.getChannelMessages(channelID, options);
	return data.map(i => new Message(i, client));
}

export async function transform(content: import("../../Types").StringResolvable | import("../../Types").MessageOptions, options?: import("../../Types").MessageOptions, isEdit?: boolean): Promise<{ content?: string | null; embeds?: Array<any>; nonce?: string; tts?: boolean; file?: any; }> {
	const MessageEmbed: typeof import("../MessageEmbed") = require("../MessageEmbed");
	const MessageAttachment: typeof import("../MessageAttachment") = require("../MessageAttachment");

	const payload: { content?: string | null; embed?: any; nonce?: string; tts?: boolean; file?: { name?: string, file: string } } = {};
	const opts = options ? options : {};

	if (content instanceof MessageEmbed) {
		opts.embed = content;
		content = undefined;
	} else if (content instanceof MessageAttachment) {
		opts.file = content;
		content = undefined;
	} else if (isObject(content) && !Array.isArray(content) && (content.content || content.embed || content.nonce || content.tts || content.file)) {
		if (content.attachment) opts.file = content;
		else Object.assign(opts, content);
		if (content.disableEveryone !== undefined) opts.disableEveryone = content.disableEveryone;
		content = undefined;
	} else if (Array.isArray(content)) {
		content = content.join("\n");
	} else content = String(content);

	let file: { name?: string; file: Buffer } | undefined = undefined;
	if (opts.file) {
		file = {} as { file: Buffer };
		Object.assign(file, { name: opts.file.name || "file.png" });
		if (Buffer.isBuffer(opts.file.attachment)) Object.assign(file, { file: opts.file.attachment });
		else if (opts.file.attachment instanceof stream.Readable) {
			const buf = await getStream(opts.file.attachment);
			Object.assign(file, { file: buf });
		} else if (typeof opts.file.attachment === "string" && opts.file.attachment.startsWith("http")) {
			const res = await centra(opts.file.attachment, "get").header("User-Agent", "ThunderStorm (https://github.com/AmandaDiscord/ThunderStorm, 0.1.0)").header("Accept", "*/*").send();
			if (res.statusCode !== 200) throw new Error("Non OK status code on get Attachment");
			if (!res.body) throw new Error("No body on get Attachment");

			const decoded = new URL(opts.file.attachment);
			const contentType = res.headers["content-type"];

			if (decoded.pathname.match(/\.\w+$/)) Object.assign(file, { name: (decoded.pathname.match(/\/(\w+%-\.\w+$)/) as RegExpMatchArray)[1] });
			else if (contentType) {
				let type = "png";
				const split = contentType.split("/");

				if (contentType === "text/plain") type = "txt";
				else if (contentType === "image/jpeg") type = "jpg";
				else if (contentType === "audio/mpeg") type = "mp3";
				else if (contentType === "audio/vorbis") type = "ogg";
				else type = split[1];

				Object.assign(file, { name: `file.${type}` });
			}

			Object.assign(file, { file: res.body });
		} else if (typeof opts.file.attachment === "string" && (path.isAbsolute(opts.file.attachment) || opts.file.attachment.startsWith("."))) {
			const dir = path.isAbsolute(opts.file.attachment) ? opts.file.attachment : path.join(process.cwd(), opts.file.attachment);
			const buf = await fs.promises.readFile(dir);

			Object.assign(file, { name: path.basename(opts.file.attachment), file: buf });
		} else Object.assign(file, { name: opts.file.name || "file.png", file: Buffer.from(opts.file.attachment as string) });
	}

	payload["content"] = opts.content || content || "";
	payload["embed"] = opts.embed ? opts.embed.toJSON() : undefined;
	payload["nonce"] = opts.nonce;
	payload["tts"] = opts.tts || false;
	if (!isEdit) payload["file"] = file ? file as unknown as { name?: string; file: string } : undefined;

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

function getStream(readable: stream.Readable): Promise<Buffer> {
	return new Promise(res => {
		const chunks: Array<Buffer> = [];
		const fn = (chunk: Buffer) => {
			chunks.push(chunk);
		};

		readable.on("data", fn);

		readable.once("end", () => {
			readable.removeListener("data", fn);
			res(Buffer.concat(chunks));
		});
	});
}

export function sendTyping(client: import("../Client"), channelID: string) {
	return client._snow.channel.startChannelTyping(channelID);
}

export default { send, sendTyping, deleteMessage, fetchMessage, fetchMessages, transform };
