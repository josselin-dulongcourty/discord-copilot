const { SlashCommandBuilder, ChannelType } = require("discord.js");

class CopilotSlashCommand {
    constructor(options) {
        this._name = options.name;
        this._data = options.data;
        this._runFn = options.run || options.execute;
        this._setupFn = options.setup || options.init || null;
        this._killFn = options.kill || options.stop || null;
    }

    get name() { return this._name; }

    get data() { return this._data.toJSON(); }

    get run() { return this._runFn; }
    get setup() { return this._setupFn; }
    get kill() { return this._killFn; }
}

module.exports = {
    CopilotSlashCommand
}