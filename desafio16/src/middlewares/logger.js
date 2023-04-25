const log4js = require("log4js");

log4js.configure({
    appenders: {
        console: { type: "console" },
        infoFile: { type: "file", filename: "info.log"},
        errorsFile: { type: "file", filename: "error.log"},
        warningFile: { type: "file", filename: "warn.log"},
    },
    categories: {
        default: { appenders: ["console"], level: "trace" },
        console: { appenders: ["console"], level: "debug" },
        infoFile: { appenders: ["console", "infoFile"], level: "info" },
        errorsFile: { appenders: ["console","errorsFile"], level: "error" },
        warningFile: { appenders: ["console", "warningFile"], level: "warn" },
    }
});

const logger = log4js.getLogger();
const consoleLogger = log4js.getLogger("console");
const infoLogger = log4js.getLogger("infoFile");
const errorLogger = log4js.getLogger("errorsFile");
const warnLogger = log4js.getLogger("warningFile");

module.exports = {
    logger,
    consoleLogger,
    infoLogger,
    errorLogger,
    warnLogger
}