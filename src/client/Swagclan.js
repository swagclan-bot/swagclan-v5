import discord from "discord.js"

import HandlerInterface from "../interface/HandlerInterface.js"

export default class Swagclan extends discord.Client {
    constructor(options) {
        super(options);
    }

    async login(token) {
        try {
            return await super.login(token);
        } catch (e) {
            if (e.code === 500) {
                debug.error("Could not log in: Error 500, exiting process.");
                debug.error("HINT: Check your internet connection and check discord status.");
                debug.print("         There may be an issue with discord servers. https://discordstatus.com")
                
                return process.exit(0);
            }

            if (e.code === "TOKEN_INVALID") {
                debug.error("Could not log in: Invalid token provided, exiting process.");
                debug.error("HINT: Check that you have entered credentials correctly in .credentials.js. See README for help.");

                return process.exit(0);
            }

            debug.error("Could not log in, exiting process.", e);

            return process.exit(0);
        }
    }

    emit(ev, ...args) {
        HandlerInterface.handle(ev, ...args);

        super.emit(ev, ...args);
    }
}