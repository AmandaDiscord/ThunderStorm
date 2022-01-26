# ThunderStorm
ThunderStorm is a compatibility layer between modular Discord interfaces such as DasWolke's WeatherStack libs and bot codebases which are based off of or directly coming from Discord.js.

# Legal
This lib uses a lot of code by Discord.js, thus their license has been included.
Please don't sue me.

# Why?
Let's be honest, Discord.js takes a lot of memory which is the price it pays for being user friendly. But what if I told you it doesn't have to be that way?

# Notes
Currently ThunderStorm is based off of a mix of Discord.js v13 and v11. Where it mostly resembles v11 is the fact that there is no such thing as caches in ThunderStorm, so some methods have been moved back to where they were in v11 such as Client.fetchUser instead of Client.users.fetch. The index will export the latest v11 version string just for memes.

Because this lib doesn't operate with any caching, **A LOT** of assumptions are made such as channel types where applicable such as message create only being "GUILD_TEXT" or "DM" depending on if guild_id is present.

If you want to install ThunderStorm and have it work with *some* modules which depend on Discord.js, you could change the entry in the package.json to have its key be listed as discord.js
This also allows you to import thunderstorm as if it were Discord.js such as:
```js
const Discord = require("discord.js")
```

## What You Need
ThunderStorm requires node 14 at least.
You *need* to install DasWolke/SnowTransfer because that's the lib ThunderStorm uses to send REST actions.

What you use to cover the Gateway portion and receive events is up to you, but I will recommend DasWolke/CloudStorm.

## Basic Code Example

```ts
import ThunderStorm from "thunderstorm";
```

TS users are encouraged to add `skipLibCheck: true` to their tsconfig.json or ThunderStorm may throw errors when you try to transpile. I'm sorry, but there isn't much I can do until Discord.js introduces more type safe logic.

```js
const SnowTransfer = require("snowtransfer");
const ThunderStorm = require("thunderstorm");

const token = "Your Token Here";

const Rest = new SnowTransfer.SnowTransfer(token);

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
