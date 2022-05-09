import winston, { format, transports } from "winston";
const { timestamp, combine, printf, cli } = format;

const colors = {
    error: "bold underline red",
    warn: "yellow",
    info: "blue",
    verbose: "white"
}

winston.addColors(colors);

const logFormat = combine(
    timestamp(),
    cli({ colors }),
    printf(info => `${info.timestamp} | ${info.level} ${info.message}`)
);

const logger = winston.createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3
    },
    transports: [
        // sends errors of level "verbose" and below to the console
        new transports.Console({ level: "verbose" }),
        new transports.File({ level: "error", filename: "logs/error.log" })
    ],
    format: logFormat
})

export default logger
