const isObject = d => typeof d === 'object' && d !== null;

/**
 * @param {PartialBase | Channel | User | GuildMember} instance
 * @param {import("../../typings/index").StringResolvable} content
 * @param {import("../../typings/index").MessageOptions} [options]
 */
async function send(instance, content, options = {}) {
	const PartialBase = require("../Partial/PartialBase");
	const User = require("../User");
	const Channel = require("../Channel");
	const GuildMember = require("../GuildMember");

	const Message = require("../Message"); // lazy load

	let mode, payload = transform(content, options);

	if (instance instanceof PartialBase) {
		if (instance.partialType == "Channel") mode = "channel";
		if (instance.partialType == "User") mode = "user";
	} else if (instance instanceof Channel) mode = "channel";
	else if (instance instanceof User) mode = "user";
	else if (instance instanceof GuildMember) mode = "user";

	let ID
	// @ts-ignore
	if (mode == "user") ID = await instance.client._snow.user.createDirectMessageChannel(instance.id).then(chan => chan.id || chan.Id);
	else ID = instance.id;

	const msg = await instance.client._snow.channel.createMessage(ID, payload, { disableEveryone: options.disableEveryone || instance.client._snow.options.disableEveryone || false });
	return new Message(msg, instance.client);
}

/**
 * @param {import("../../typings/index").Client} client
 * @param {string} channelID
 * @param {string} messageID
 * @param {number} [timeout]
 * @returns {Promise<void>}
 */
function deleteMessage(client, channelID, messageID, timeout = 0) {
	return new Promise((res, rej) => {
		const action = async () => {
			await client._snow.channel.deleteMessage(channelID, messageID).catch(rej);
			return;
		}
		if (timeout) {
			setTimeout(async () => {
				return res(action());
			}, timeout);
		} else {
			res(action());
		}
	});
}

/**
 * @param {import("../../typings/index").Client} client
 * @param {string} channelID
 * @param {string} messageID
 */
function fetchMessage(client, channelID, messageID) {
	const Message = require("../Message"); // lazy load

	return client._snow.channel.getChannelMessage(channelID, messageID).then(data => new Message(data, client));
}

/**
 * @param {import("../../typings/index").StringResolvable} content
 * @param {import("../../typings/index").MessageOptions} [options]
 * @param {boolean} [isEdit]
 * @returns {{ content?: ?string, embeds?: Array<any>, nonce?: string, tts?: boolean, file?: any }}
 */
function transform(content, options = {}, isEdit = false) {
	const MessageEmbed = require("../MessageEmbed");

	let payload = {};

	if (isObject(content) && !Array.isArray(content) && (content.content || content.embed || content.nonce || content.tts || content.file)) {
		if (content.attachment) options.file = content
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
	payload["file"] = options.file ? { name: options.file.name || "file.png", file: options.file.attachment } : undefined;

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

/**
 * @param {import("../../typings/index").Client} client
 * @param {string} channelID
 */
function sendTyping(client, channelID) {
	return client._snow.channel.startChannelTyping(channelID);
}

module.exports = {
	send,
	sendTyping,
	deleteMessage,
	fetchMessage,
	transform
}
