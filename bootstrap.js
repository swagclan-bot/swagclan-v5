import { config } from "dotenv"

config();

config({
    path: ".lang.env"
});

import "./src/index.js"