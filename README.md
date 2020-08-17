# ThunderStorm
My cats don't like it when they hear the thunder.

ThunderStorm is a work in progress library to act as a sort of compatibility layer between WeatherStack modules and bot codebases which are based off Discord.js. This library could qualify as Rest only since it does not internally cache objects

This library is originally meant to just be used by AmandaDiscord so features from Discord.js may not get added as they are released but compatibility with the Discord API will continue to be supported for the forseeable future.

# Why?
Well, virtually nothing is cached internally, so memory usage will be significantly lower than libs with internally managed caches. The structures try to closely resemble Discord.js but working around not having access to Gateway actions or cache makes it very limited. There is also the added benefit of helping you understand what your client actually needs cached and what it doesn't.

# Getting Started
Currently ThunderStorm is based off Discord.js prior to the Manager PR. Managers *might* get implemented eventually but this project is very new.

## What You Need
You need to install these libs:

AmandaDiscord/CloudStorm
AmandaDiscord/SnowTransfer

These libs have been updated to support the latest Discord API base url and will continue to receive support and typing improvements/general cleanup.

## Basic Code Example
```js
const SnowTransfer = require("snowtransfer");
const ThunderStorm = require("thunderstorm");

const token = "Your Token Here";

const Rest = new SnowTransfer(token);

const client = new ThunderStorm.Client({ snowtransfer: Rest });

// Somehow get data from CloudStorm whether it be in the same process or another process via IPC.
// instances of CloudStorm.Client emit the event "event" whenever raw gateway events happen. If this is via IPC,
// event names might not be the same. The data that's required by ThunderStorm is the data directly from CloudStorm
// which would look like:
// {
// 	d: Object,
// 	op: number,
// 	s: number,
// 	t: string,
// 	shard_id: number
// }
CloudStormDataEmitter.on("event", (data) => ThunderStorm.handle(data, client));

// Now that you pass the data and your Client instance to ThunderStorm's handler, you can listen to client events
// like you normally would.
client.on("raw", console.log); // Each time an event would occur, this would just log the data directly from CloudStorm.
client.on("message", (message) => console.log(message.content));
```

# Remember
This Library is not complete and 100% data completion/compatibility is not guaranteed. This is a huge work in progress library, but some basic things work as of now.
