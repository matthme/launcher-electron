import winston, { createLogger, transports, format } from 'winston';
import path from 'path';
import { LauncherFileSystem } from './filesystem';
import {
  HOLOCHAIN_ERROR,
  HOLOCHAIN_LOG,
  HolochainData,
  LAIR_ERROR,
  LAIR_LOG,
  LauncherEmitter,
  WASM_LOG,
} from './launcherEmitter';

const { combine, timestamp } = format;

const HOLOCHAIN_LOGGERS: Record<string, winston.Logger> = {}; // loggers by holochain partition

// TODO define class LauncherLogger that can log all lair, holochain and launcher-specific stuff
// with methods logLair, logHolochain, logLauncher, logHapp, ...

export function setupLogs(
  launcherEmitter: LauncherEmitter,
  launcherFileSystem: LauncherFileSystem,
) {
  const logFilePath = path.join(launcherFileSystem.profileLogsDir, 'launcher.log');
  // with file rotation set maxsize. But then we require logic to garbage collect old files...
  // const logFileTransport = new transports.File({ filename: logFilePath, maxsize: 50_000_000, maxfiles: 5 });
  const logFileTransport = new transports.File({ filename: logFilePath });
  const lairLogger = createLairLogger(logFileTransport);

  launcherEmitter.on(LAIR_LOG, (log) => {
    const logLine = `[LAIR] ${log}`;
    console.log(logLine);
    lairLogger.log('info', logLine);
  });
  launcherEmitter.on(LAIR_ERROR, (log) => {
    const logLine = `[LAIR] ERROR: ${log}`;
    console.log(logLine);
    lairLogger.log('info', logLine);
  });
  launcherEmitter.on(HOLOCHAIN_LOG, (holochainData) => {
    logHolochain(holochainData as HolochainData, logFileTransport);
  });
  launcherEmitter.on(HOLOCHAIN_ERROR, (holochainData) => {
    logHolochain(holochainData as HolochainData, logFileTransport);
  });
  launcherEmitter.on(WASM_LOG, (holochainData) => {
    logHolochain(holochainData as HolochainData, logFileTransport);
  });
}

function logHolochain(
  holochainData: HolochainData,
  logFileTransport: winston.transports.FileTransportInstance,
) {
  const holochainPartition = holochainData.partition;
  const identifier = identifierFromHolochainData(holochainData);
  const line = (holochainData as HolochainData).data;
  const logLine = `[${identifier}]: ${line}`;
  console.log(logLine);
  let logger = HOLOCHAIN_LOGGERS[holochainPartition];
  if (logger) {
    logger.log('info', line);
  } else {
    logger = createHolochainLogger(identifier, logFileTransport);
    HOLOCHAIN_LOGGERS[holochainPartition] = logger;
    logger.log('info', line);
  }
}

function createHolochainLogger(
  label: string,
  logFileTransport: winston.transports.FileTransportInstance,
): winston.Logger {
  return createLogger({
    transports: [logFileTransport],
    format: combine(
      timestamp(),
      format.printf(({ level, message, timestamp }) => {
        return JSON.stringify({
          timestamp,
          label,
          level,
          message,
        });
      }),
    ),
  });
}

function createLairLogger(
  logFileTransport: winston.transports.FileTransportInstance,
): winston.Logger {
  return createLogger({
    transports: [logFileTransport],
    format: combine(
      timestamp(),
      format.printf(({ level, message, timestamp }) => {
        return JSON.stringify({
          timestamp,
          label: 'LAIR',
          level,
          message,
        });
      }),
    ),
  });
}

function identifierFromHolochainData(holochainData: HolochainData): string {
  let identifier: string;
  if (holochainData.version.type === 'built-in') {
    identifier = `HOLOCHAIN ${holochainData.version.version} @ partition ${holochainData.partition}`;
  } else if (holochainData.version.type === 'custom-path') {
    identifier = `HOLOCHAIN CUSTOM BINARY @ partition ${holochainData.partition}`;
  } else if (holochainData.version.type === 'running-external') {
    identifier = `HOLOCHAIN EXTERNAL BINARY @ partition ${holochainData.partition}`;
  } else {
    identifier = `HOLOCHAIN unknown`;
  }
  return identifier;
}
