const fs = require("node:fs")
const path = require("node:path")
const { Client, Collection, Routes } = require("discord.js");

class CopilotClient extends Client {
    constructor(options, copilot) {
        super(options);
        this._token = copilot.token;
        this._commandsPath = copilot.commandsPath;
        this._eventsPath = copilot.eventsPath;
        this._basePath = copilot.basePath;

        this.commands = new Collection();
        this._loadCommands();
        this.events = new Collection();
        this._loadEvents();

        this._console = null;
    }

    get basePath() {
        return this._basePath;
    }

    get console() {
        return this._console;
    }
    set console(channelId) {
        this._console = channelId;
    }

    login() {
        super.login(this._token);
    }

    _loadCommands() {
        const commandsPath = path.join(this._basePath, this._commandsPath);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'name' in command.data && 'run' in command) {
                this.commands.set(command.data.name, command);
            }
        }
    }

    registerCommands() {
        this.rest.put(
            Routes.applicationCommands(this.application.id),
            { body: this.commands.map(command => command.data.toJSON()) },
        );
    }

    _loadEvents() {
        const eventsPath = path.join(this._basePath, this._eventsPath);
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const eventFile = require(filePath);
            const event = eventFile.event;
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if (!!event && !!event.name && !!event.type && !!event.run) {
                this.events.set(event.name, event);
            }
        }

        this._setupEvents();
    }

    _setupEvents() {
        this.events.forEach((event) => {
            this[event.when].call(this, event.type, event.run);
        });
    }
}

module.exports = {
    CopilotClient
}