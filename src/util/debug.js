import chalk from "chalk"
import util from "util"
import fs from "fs"
import randomstring from "randomstring"

const logStream = fs.createWriteStream("logs.txt", {
    flags: "a"
});

function _print(prefix, ...fmt) {
    const date = new Date().toISOString();
    const format = util.format(...fmt);

    const id = randomstring.generate({
        length: 20,
        charset: "alphanumeric",
        capitalization: "lowercase"
    });
    
    const log = "[" + date + "]" + " " + prefix + " " + format;
    const stripped = log.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, "");

    console.log(log);

    logStream.write("{" + id + "} " + log + "\n");

    return id;
}

export const success = (...fmt) => _print(chalk.bgGreen("[SUCCESS]"), ...fmt);
export const log = (...fmt) => _print(chalk.bgGrey("[LOG]"), ...fmt);
export const info = (...fmt) => _print(chalk.bgBlue("[INFO]"), ...fmt);
export const warn = (...fmt) => _print(chalk.bgYellow("[WARN]"), ...fmt);
export const debug = (...fmt) => _print(chalk.bgYellowBright("[DEBUG]"), ...fmt);
export const error = (...fmt) => _print(chalk.bgRed("[ERROR]"), ...fmt);

export default { success, log, info, warn, debug, error }