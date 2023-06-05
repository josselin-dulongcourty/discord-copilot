const { Events } = require("discord.js");

module.exports = {
    name: "ClientReady",
    type: Events.ClientReady,
    when: "once",

    /**
     * 
     * @param {import("discord.js").Client} client 
     */
    run: function(client) {
        console.log("Registered.")
        client.registerCommands();
    }
}