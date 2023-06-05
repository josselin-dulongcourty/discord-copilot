const { GatewayIntentBits } = require('discord.js');
const { CopilotClient } = require('./classes/CopilotClient');

const dotenv = require('dotenv');

if (process.env.NODE_ENV !== "production") {
    dotenv.config({
        path: "./.env"
    })
}
const token = process.env.DISCORD_SECRET;

const client = new CopilotClient({
    intents: [GatewayIntentBits.Guilds]
}, {
    token: token,
    commandsPath: "./commands",
    eventsPath: "./events",
    basePath: __dirname,
});


client.login();