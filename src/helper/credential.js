import inquirer from "inquirer"
import fs from "fs/promises"

import debug from "../util/debug.js"

function validateString(text) {
    if (typeof text !== "string") {
        return false;
    }

    return text.length > 0;
}

function validateSnowflake(text) {
    const snowflakeRegex = /\d{17,19}/;

    return snowflakeRegex.test(text);
}

export default async function credentialHelper() {
    debug.info("Credentials not found, running credential helper..");
    debug.info("Bot credentials can be found at https://discord.com/developers/applications");

    const prompt = await inquirer.prompt([
        {
            type: "input",
            name: "token",
            message: "Bot token:",
            validate: validateString
        },
        {
            type: "input",
            name: "id",
            message: "Client ID:",
            validate: validateSnowflake },
        {
            type: "input",
            name: "secret",
            message: "Client secret:",
            validate: validateString }
    ]);

    const credentialFormat = `export default {
    token: "${prompt.token}",
    id: "${prompt.id}",
    secret: "${prompt.secret}",
}`;

    try {
        await fs.writeFile(".credentials.js", credentialFormat, "utf-8");

        debug.info("Written files to .credentials.js.");
        
        debug.success("Credential helper complete.");
    } catch (e) {
        debug.error("Could not write file. Write the following to .credentials.js:\n%s\n. Re-run the program once completed.");

        process.exit(0);
    }
}