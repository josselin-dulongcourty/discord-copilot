const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong"),

    /**
     * 
     * @param {import("discord.js").Interaction} interaction 
     */
    async run(interaction) {
        console.log(interaction.commandName);
        interaction.reply("Pong!");
    }
}