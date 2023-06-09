class CopilotEventHandler {
    constructor(options) {
        this._name = options.name;
        this._type = options.type;
        this._listening = options.listening || options.when;
        this._runFn = options.run || options.execute;
    }

    get name() { return this._name; }
    set name(newName) { this._name = newName; }

    get type() { return this._type; }
    set type(newType) { this._type = newType }

    get when() { return this._listening; }
    get listening() { return this._listening; }
    set when(newListening) { this._listening = newListening; }
    set listening(newListening) { this._listening = newListening };

    // Fonction run qui execute this._runFn, les paramètres sont conservés
    get run() { return this._runFn; }
}

module.exports = {
    CopilotEventHandler
}