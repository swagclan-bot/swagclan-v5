import Swagclan from "./Swagclan.js"

import debug from "../util/debug.js"

import credentials from "../../.credentials.js"

const client = new Swagclan;

export default client;

(async () => {
    debug.info("Logging in..");

    try {
        await client.login(credentials.token);
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

    debug.success("Bot successfully logged in.");
    debug.info("- " + client.user.tag + " (" + client.user.id + ")");
    debug.info("- " + client.guilds.cache.size + " guilds.");
})();