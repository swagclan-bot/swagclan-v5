import fs from "fs/promises"

import debug from "./util/debug.js"

import credentialHelper from "./helper/credential.js"

try {
    await fs.readFile(".credentials.js");
} catch (e) {
    if (e.code === "ENOENT") {
        await credentialHelper();
    }

    debug.error("Could not read credentials. Assuming that they exist..");
}

import "./client/index.js"