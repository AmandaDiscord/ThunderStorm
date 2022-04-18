# Notice!
This module is no longer used by the AmandaDiscord organization and will not receive anymore maintenence updates. Whatever is left in this semi-broken state is what you get. You may fork this module and update should you so desire, but you will not receive any official support from the AmandaDiscord organization.

## Why?
Realistically, there was only 1 person working on ThunderStorm and trying to match the progress and speed of an entire community on top of trying to keep up with the speed of Discord's updates is not feasible. This is pretty hard to manage solo on its own, but also trying to be original with implementations as the Discord.js community might not always offer the latest and greatest of what Discord can handle and then changing those implementations once official implementations are released. As such, this entire project, while nice and helpful, was a large mental strain that was not needed.

## Memory Usage
The AmandaDiscord organization is an advocate for better performing software, but just importing this module makes it so that we do not meet our memory usage demands. As such, we are migrating to using the raw api/gateway as that has the most minimal memory footprint. We would strongly advise doing the same and avoiding using libs of such magnitude.

## What about contributing to Discord.js?
If you are a maintainer or contributer to Discord.js and you would like to use my work for the end goal of converting Discord.js to TypeScript, you may do so. We do not care.

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

What you use to cover the Gateway portion and receive events is up to you, but we recommend DasWolke/CloudStorm.

## Basic Code Example

```ts
import ThunderStorm from "thunderstorm";
```

TS users are encouraged to add `skipLibCheck: true` to their tsconfig.json or ThunderStorm may throw errors when you try to transpile. We're sorry, but there isn't much we can do until Discord.js introduces more type safe logic.

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
