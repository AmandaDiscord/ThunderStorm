/**
 * @param {PartialBase | Channel | User | GuildMember} instance
 * @param {string} content
 * @param {*} options
 */
async function send(instance, content, options) {
	const PartialBase = require("../Partial/PartialBase");
	const User = require("../User");
	const Channel = require("../Channel");
	const GuildMember = require("../GuildMember");

	const Message = require("../Message"); // lazy load

	let mode
	if (instance instanceof PartialBase) {
		if (instance.type == "Channel") mode = "channel";
		if (instance.type == "User") mode = "user";
	} else if (instance instanceof Channel) mode = "channel";
	else if (instance instanceof User) mode = "user";
	else if (instance instanceof GuildMember) mode = "user";

	let ID
	if (mode == "user") ID = await instance.client._snow.user.createDirectMessageChannel(instance.id).then(chan => chan.id);
	else ID = instance.id;

	const msg = await instance.client._snow.channel.createMessage(ID, content);
	return new Message(msg, instance.client);
}

module.exports = {
	send
}
