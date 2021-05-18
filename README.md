# ThunderStorm
ThunderStorm is a work in progress library to act as a compatibility layer between modular Discord interfaces such as DasWolke's WeatherStack libs and bot codebases which are based off of or directly coming from Discord.js. This library technically only covers the REST portion of Discord's API.

# Why?
Well, virtually nothing is cached internally, so memory usage will be significantly lower than libs with internally managed caches. The structures try to closely resemble Discord.js but working around not having caches or gateway actions makes it very limited. There is also the added benefit of helping you understand what your client actually needs cached and what it doesn't.

# Notes
Currently ThunderStorm is based off Discord.js v12 prior to the Manager PR. Managers *might* get implemented eventually, but the concept of Managers was to make distinctions between caches from rest/gateway interfaces which doesn't apply to ThunderStorm as there are no caches.

Because this lib doesn't operate with any caching, a lot of assumptions are made such as channel types where applicable such as message create only being "text" or "dm" depending on if guild_id is present.

## What You Need
You *need* to install AmandaDiscord/SnowTransfer.
What you use to cover the Gateway portion and receive events is up to you, but I will recommend AmandaDiscord/CloudStorm.

These libs have been updated to support the latest Discord API base url and will continue to receive support and typing improvements/general cleanup.

## Basic Code Example
```js
const SnowTransfer = require("snowtransfer");
const ThunderStorm = require("thunderstorm");

const token = "Your Token Here";

const Rest = new SnowTransfer(token);

const client = new ThunderStorm.Client({ snowtransfer: Rest });

// Somehow get data from the gateway whether it be in the same process or another process via IPC.
// instances of CloudStorm.Client emit the event "event" whenever raw gateway events happen. If this is via IPC,
// event names might not be the same. The data that's required by ThunderStorm is the data directly from the gateway plus an additional shard_id property
// which would look like:
// {
// 	d: Object,
// 	op: number,
// 	s: number,
// 	t: string,
// 	shard_id: number
// }
Gateway.on("event", (data) => ThunderStorm.handle(data, client));

// Now that you pass the data and your Client instance to ThunderStorm's handler, you can listen to client events
// like you normally would.
client.on("raw", console.log); // Each time an event would occur, this would just log the data directly from your gateway lib.
client.on("message", (message) => console.log(message.content));
```

# Remember
This Library is not complete by any stretch. Attempts towards 100% coverage of the Discord REST API are made with updates. Compatibility with Discord.js' API is made on a best-effort basis. Not everything is perfectly compatible. There may be some areas where either ThunderStorm or Discord.js is ahead of each other.
