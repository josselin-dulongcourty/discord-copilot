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
        this.loadCommands();
        this.events = new Collection();
        this.loadEvents();
    }

    get basePath() {
        return this._basePath;
    }

    login() {
        super.login(this._token);
    }

    loadCommands() {
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

    loadEvents() {
        const eventsPath = path.join(this._basePath, this._eventsPath);
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('name' in event && 'type' in event && 'run' in event) {
                this.events.set(event.name, event);
            }
        }

        this.setupEvents();
    }

    setupEvents() {
        this.events.forEach((event) => {
            this[event.when](event.type, event.run);
        });
    }
}

module.exports = {
    CopilotClient
}