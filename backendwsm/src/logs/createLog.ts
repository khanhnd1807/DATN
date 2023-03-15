import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";
import path from "path";
const logDir = "./logDir"; // directory path you want to set
if (!fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}

const transport: DailyRotateFile = new DailyRotateFile({
  filename: path.join(logDir, "/error.txt"),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

transport.on("rotate", function (oldFilename, newFilename) {
  // do something fun
});

export const logger = winston.createLogger({
  transports: [transport],
});
