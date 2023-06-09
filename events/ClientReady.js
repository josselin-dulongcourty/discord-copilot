const { Events } = require("discord.js");
const { CopilotEventHandler } = require("../classes/CopilotEventHandler");

const event = new CopilotEventHandler({
    name: "ClientReady",
    type: Events.ClientReady,
    when: "once",
    run: async function (client) {
        console.log("Registered.")
        client.registerCommands();
    }
});

module.exports = {
    event
}