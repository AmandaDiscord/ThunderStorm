class ActionsManager {
	public client: import("../Client");

	public ChannelCreate!: import("./ChannelCreate");
	public ChannelDelete!: import("./ChannelDelete");
	public ChannelUpdate!: import("./ChannelUpdate");
	public GuildBanAdd!: import("./GuildBanAdd");
	public GuildBanRemove!: import("./GuildBanRemove");
	public GuildDelete!: import("./GuildDelete");
	public GuildEmojiCreate!: import("./GuildEmojiCreate");
	public GuildEmojisUpdate!: import("./GuildEmojisUpdate");
	public GuildIntegrationsUpdate!: import("./GuildIntegrationsUpdate");
	public GuildMemberRemove!: import("./GuildMemberRemove");
	public GuildMemberUpdate!: import("./GuildMemberUpdate");
	public GuildRoleCreate!: import("./GuildRoleCreate");
	public GuildRoleDelete!: import("./GuildRoleDelete");
	public GuildRoleUpdate!: import("./GuildRoleUpdate");
	public GuildUpdate!: import("./GuildUpdate");
	public InviteCreate!: import("./InviteCreate");
	public InviteDelete!: import("./InviteDelete");
	public MessageCreate!: import("./MessageCreate");
	public MessageDelete!: import("./MessageDelete");
	public MessageDeleteBulk!: import("./MessageDeleteBulk");
	public MessageReactionAdd!: import("./MessageReactionAdd");
	public MessageReactionRemove!: import("./MessageReactionRemove");
	public MessageReactionRemoveAll!: import("./MessageReactionRemoveAll");
	public MessageReactionRemoveEmoji!: import("./MessageReactionRemoveEmoji");
	public MessageUpdate!: import("./MessageUpdate");
	public PresenceUpdate!: import("./PresenceUpdate");
	public TypingStart!: import("./TypingStart");
	public UserUpdate!: import("./UserUpdate");
	public VoiceStateUpdate!: import("./VoiceStateUpdate");
	public WebhooksUpdate!: import("./WebhooksUpdate");

	public constructor(client: import("../Client")) {
		this.client = client;

		this.register(require("./MessageCreate"));
		this.register(require("./MessageDelete"));
		this.register(require("./MessageDeleteBulk"));
		this.register(require("./MessageUpdate"));
		this.register(require("./MessageReactionAdd"));
		this.register(require("./MessageReactionRemove"));
		this.register(require("./MessageReactionRemoveAll"));
		this.register(require("./MessageReactionRemoveEmoji"));
		this.register(require("./ChannelCreate"));
		this.register(require("./ChannelDelete"));
		this.register(require("./ChannelUpdate"));
		this.register(require("./GuildDelete"));
		this.register(require("./GuildUpdate"));
		this.register(require("./InviteCreate"));
		this.register(require("./InviteDelete"));
		this.register(require("./GuildMemberRemove"));
		this.register(require("./GuildMemberUpdate"));
		this.register(require("./GuildBanAdd"));
		this.register(require("./GuildBanRemove"));
		this.register(require("./GuildRoleCreate"));
		this.register(require("./GuildRoleDelete"));
		this.register(require("./GuildRoleUpdate"));
		this.register(require("./PresenceUpdate"));
		this.register(require("./UserUpdate"));
		this.register(require("./VoiceStateUpdate"));
		this.register(require("./GuildEmojisUpdate"));
		this.register(require("./GuildIntegrationsUpdate"));
		this.register(require("./WebhooksUpdate"));
		this.register(require("./TypingStart"));
	}

	public register(Action: typeof import("./Action")) {
		this[Action.name.replace(/Action$/, "") as Exclude<keyof ActionsManager, "client">] = new Action(this.client) as any;
	}
}

export = ActionsManager;
