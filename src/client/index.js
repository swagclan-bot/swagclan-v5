import Swagclan from "./Swagclan.js"

import ModuleInterface from "../interface/ModuleInterface.js"

import debug from "../util/debug.js"

import credentials from "../../.credentials.js"

const client = new Swagclan;

export default client;

(async () => {
    debug.info("Logging in..");

    await client.login(credentials.token);

    debug.success("Bot successfully logged in.");
    debug.info("- " + client.user.tag + " (" + client.user.id + ")");
    debug.info("- " + client.guilds.cache.size + " guilds.");

    await ModuleInterface.load("fun");
})();