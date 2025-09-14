import winston from "winston";

// Definiendo los niveles de Log
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Definiendo el nivel de log segun el entorno
const level = () => {
  const env = process.env.NODE_ENV || "development"; //Leemos la variable de entorno
  const isDevelopment = env === "development"; //comprobamos si esta en desarrollo
  return isDevelopment ? "debug" : " warn"; //si esta en desarrollo el nivel de log es debug, si no es warn
};

// Definiendo los colores para cada nivel de log
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

// Creando el formato de log
const format = winston.format.combine(
  winston.format.timestamp({ format: "DD--MM-YYYY  HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} - ${info.level}: ${info.message}`)
);

//  definiendo los transportes
const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: "logs/error.log", level: " error" }),
  new winston.transports.File({ filename: "logs/all.log" }),
];

// creando el logger
const logger = winston.createLogger({
  levels,
  level: level(),
  format,
  transports,
});

export default logger;
