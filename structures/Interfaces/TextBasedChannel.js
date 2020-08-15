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
		if (instance.type == "Channel") mode = "channel";
		if (instance.type == "User") mode = "user";
	} else if (instance instanceof Channel) mode = "channel";
	else if (instance instanceof User) mode = "user";
	else if (instance instanceof GuildMember) mode = "user";

	let ID
	// @ts-ignore
	if (mode == "user") ID = await instance.client._snow.user.createDirectMessageChannel(instance.id).then(chan => chan.id || chan.Id);
	else ID = instance.id;

	const msg = await instance.client._snow.channel.createMessage(ID, payload, { disableEveryone: options.disableEveryone || false });
	return new Message(msg, instance.client);
}

/**
 * @param {import("../../typings/index").StringResolvable} content
 * @param {import("../../typings/index").MessageOptions} [options]
 * @param {boolean} [isEdit]
 * @returns {{ content?: ?string, embeds?: Array<any>, nonce?: string, tts?: boolean, files?: Array<any> }}
 */
function transform(content, options = {}, isEdit = false) {
	const MessageEmbed = require("../MessageEmbed");
	const MessageAttachment = require("../MessageAttachment");

	let payload = {};

	if (isObject(content) && !Array.isArray(content) && (content.content || content.embed || content.nonce || content.tts || content.file)) {
		options = content;
		content = undefined;
	} else if (content instanceof MessageEmbed) {
		options.embed = content;
		content = undefined;
	} else if (content instanceof MessageAttachment) {
		options.files = [content];
		content = undefined;
	} else if (Array.isArray(content)) {
		 if (content.every(item => item instanceof MessageAttachment)) {
			options.files = content;
			content = undefined;
		} else content = content.join("\n");
	} else content = String(content);

	payload["content"] = options.content || content || "";
	payload["embed"] = options.embed ? options.embed.toJSON() : undefined;
	payload["nonce"] = options.nonce;
	payload["tts"] = options.tts || false;
	payload["files"] = options.files ? options.files.map(file => file.toJSON()) : undefined;

	if (isEdit && !payload["content"]) payload["content"] = null;

	if ((!payload["content"] && !isEdit) || (payload["content"] === "")) delete payload["content"];
	if (!payload["embed"]) delete payload["embed"];
	if (!payload["nonce"]) delete payload["nonce"];
	if (!payload["tts"]) delete payload["tts"];
	if (!payload["files"]) delete payload["files"];

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

module.exports = {
	send,
	transform
}
