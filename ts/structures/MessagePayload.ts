import BaseMessageComponent from "./BaseMessageComponent";
import MessageEmbed from "./MessageEmbed";
import { RangeError } from "../errors";
import { MessageComponentTypes } from "../util/Constants";
import DataResolver from "../util/DataResolver";
import MessageFlags from "../util/MessageFlags";
import Util from "../util/Util";

interface MessagePayloadConstructor {
	new(target: import("../Types").MessageTarget, options: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions): MessagePayload;
	readonly prototype: MessagePayload;
	readonly [Symbol.species]: MessagePayloadConstructor;
}

class MessagePayload {
	// @ts-ignore
	public ["constructor"]: typeof MessagePayload;
	// @ts-ignore
	readonly [Symbol.species]: MessagePayloadConstructor;

	public target: import("../Types").MessageTarget;
	public options: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions | import("../Types").MessageEditOptions | import("../Types").ReplyMessageOptions;
	public data: any | null = null;
	public files: Array<any> | null = null;

	public constructor(target: import("../Types").MessageTarget, options: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions | import("../Types").MessageEditOptions | import("../Types").ReplyMessageOptions) {
		this.target = target;
		this.options = options;
	}

	public get isWebhook() {
		const Webhook: typeof import("./Webhook") = require("./Webhook");
		const WebhookClient: typeof import("../client/WebhookClient") = require("../client/WebhookClient");
		return this.target instanceof Webhook || this.target instanceof WebhookClient;
	}

	public get isUser() {
		const User: typeof import("./User") = require("./User");
		const GuildMember: typeof import("./GuildMember") = require("./GuildMember");
		return this.target instanceof User || this.target instanceof GuildMember;
	}

	public get isMessage() {
		const Message: typeof import("./Message") = require("./Message");
		return this.target instanceof Message;
	}

	public get isInteraction() {
		const Interaction: typeof import("./Interaction") = require("./Interaction");
		const InteractionWebhook: typeof import("./InteractionWebhook") = require("./InteractionWebhook");
		return this.target instanceof Interaction || this.target instanceof InteractionWebhook;
	}

	public makeContent() {
		let content;
		if ((this.options as import("../Types").MessageOptions).content === null) {
			content = "";
		} else if (typeof (this.options as import("../Types").MessageOptions).content !== "undefined") {
			// @ts-ignore
			content = Util.verifyString(this.options.content, RangeError, "MESSAGE_CONTENT_TYPE", false);
		}

		if (typeof content !== "string") return content;

		const isSplit = typeof (this.options as import("../Types").MessageOptions).split !== "undefined" && (this.options as import("../Types").MessageOptions).split !== false;
		const isCode = typeof (this.options as import("../Types").MessageOptions).code !== "undefined" && (this.options as import("../Types").MessageOptions).code !== false;
		const splitOptions = isSplit ? { ...(this.options as import("../Types").MessageOptions).split as import("../Types").SplitOptions } : undefined;

		if (content) {
			if (isCode) {
				const codeName = typeof (this.options as import("../Types").MessageOptions).code === "string" ? (this.options as import("../Types").MessageOptions).code : "";
				content = `\`\`\`${codeName}\n${Util.cleanCodeBlockContent(content)}\n\`\`\``;
				if (isSplit) {
					(splitOptions as import("../Types").SplitOptions).prepend = `${(splitOptions as import("../Types").SplitOptions).prepend || ""}\`\`\`${codeName}\n`;
					(splitOptions as import("../Types").SplitOptions).append = `\n\`\`\`${(splitOptions as import("../Types").SplitOptions).append || ""}`;
				}
			}

			if (isSplit) {
				content = Util.splitMessage(content, splitOptions);
			}
		}

		return content;
	}

	public resolveData() {
		if (this.data) return this;
		const isInteraction = this.isInteraction;
		const isWebhook = this.isWebhook;

		const content = this.makeContent();
		const tts = Boolean((this.options as import("../Types").MessageOptions).tts);

		let nonce;
		if (typeof (this.options as import("../Types").MessageOptions).nonce !== "undefined") {
			nonce = (this.options as import("../Types").MessageOptions).nonce;
			if (typeof nonce === "number" ? !Number.isInteger(nonce) : typeof nonce !== "string") {
				throw new RangeError("MESSAGE_NONCE_TYPE");
			}
		}

		// @ts-ignore Something about Union is not compatible
		const components = ((this.options as import("../Types").MessageOptions).components || []).map(c =>
			(BaseMessageComponent.create(
				Array.isArray(c) ? { type: MessageComponentTypes.ACTION_ROW, components: c } : c
			) as import("../Types").MessageComponent).toJSON()
		);

		let username;
		let avatarURL;
		if (isWebhook) {
			username = (this.options as import("../Types").WebhookMessageOptions).username || (this.target as import("./Webhook")).name;
			if ((this.options as import("../Types").WebhookMessageOptions).avatarURL) avatarURL = (this.options as import("../Types").WebhookMessageOptions).avatarURL;
		}

		let flags;
		if (this.isMessage) {
			flags = (this.options as import("../Types").MessageEditOptions).flags != null ? Number(new MessageFlags((this.options as import("../Types").MessageEditOptions).flags as any).bitfield) : Number((this.target as import("./Message")).flags.bitfield);
		} else if (isInteraction && (this.options as import("../Types").InteractionReplyOptions).ephemeral) {
			flags = Number(MessageFlags.FLAGS.EPHEMERAL);
		}

		let allowedMentions = this.options.allowedMentions;

		if (allowedMentions) {
			allowedMentions = Util.cloneObject(allowedMentions);
			// @ts-ignore
			allowedMentions.replied_user = allowedMentions.repliedUser;
			delete allowedMentions.repliedUser;
		}

		let message_reference;
		if (typeof (this.options as import("../Types").MessageOptions).reply === "object") {
			// @ts-ignore
			const message_id: string = (((this.options as import("../Types").MessageOptions).reply as import("../Types").ReplyOptions).messageReference).id || ((this.options as import("../Types").MessageOptions).reply as import("../Types").ReplyOptions).messageReference;
			if (message_id) {
				message_reference = {
					message_id,
					fail_if_not_exists: ((this.options as import("../Types").MessageOptions).reply as import("../Types").ReplyOptions).failIfNotExists ?? true
				};
			}
		}

		this.data = {
			content,
			tts,
			nonce,
			embeds: (this.options.embeds || []).map(embed => embed instanceof MessageEmbed ? embed.toJSON() : new MessageEmbed(embed).toJSON()),
			components,
			username,
			avatar_url: avatarURL,
			allowed_mentions: typeof content === "undefined" && typeof message_reference === "undefined" ? undefined : allowedMentions,
			flags,
			message_reference,
			attachments: (this.options as import("../Types").MessageEditOptions).attachments
		};
		return this;
	}

	public async resolveFiles() {
		if (this.files) return this;

		this.files = await Promise.all(this.options.files?.map(file => this.constructor.resolveFile(file)) ?? []);
		return this;
	}

	public split() {
		if (!this.data) this.resolveData();

		if (!Array.isArray(this.data.content)) return [this];

		const messagePayloads = [];

		for (let i = 0; i < this.data.content.length; i++) {
			let data;
			let opt;

			if (i === this.data.content.length - 1) {
				data = { ...this.data, content: this.data.content[i] };
				opt = { ...this.options, content: this.data.content[i] };
			} else {
				data = { content: this.data.content[i], tts: this.data.tts, allowed_mentions: this.options.allowedMentions };
				opt = { content: this.data.content[i], tts: this.data.tts, allowedMentions: this.options.allowedMentions };
			}

			const messagePayload = new MessagePayload(this.target, opt);
			messagePayload.data = data;
			messagePayloads.push(messagePayload);
		}

		return messagePayloads;
	}

	public static async resolveFile(fileLike: import("../Types").BufferResolvable | import("stream").Stream | import("../Types").FileOptions | import("./MessageAttachment")) {
		let attachment;
		let name;

		const findName = (thing: string | { path: string } | Buffer | import("stream").Stream | import("../Types").FileOptions | import("./MessageAttachment")) => {
			if (typeof thing === "string") {
				return Util.basename(thing);
			}

			if ((thing as { path: string }).path) {
				return Util.basename((thing as { path: string }).path);
			}

			return "file.jpg";
		};

		const ownAttachment =
			typeof fileLike === "string" || fileLike instanceof Buffer || typeof (fileLike as import("stream").Stream).pipe === "function";
		if (ownAttachment) {
			attachment = fileLike;
			name = findName(attachment);
		} else {
			attachment = (fileLike as import("../Types").FileOptions).attachment;
			name = (fileLike as import("../Types").FileOptions).name || findName(attachment);
		}

		const resource = await DataResolver.resolveFile(attachment);
		return { attachment, name, file: resource };
	}

	public static create(target: import("../Types").MessageTarget, options?: string | null | import("../Types").MessageOptions | import("../Types").WebhookMessageOptions | import("../Types").MessageEditOptions, extra: import("../Types").MessageOptions | import("../Types").WebhookMessageOptions = {}) {
		return new this(
			target,
			typeof options !== "object" || options === null ? { content: options, ...extra } as import("../Types").MessageEditOptions : { ...options, ...extra } as import("../Types").MessageOptions
		);
	}
}

export = MessagePayload;
