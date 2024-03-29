import * as path from 'path';
import { app } from 'electron';

const binariesDirectory = app.isPackaged
  ? path.join(app.getAppPath(), '../app.asar.unpacked/resources/bins')
  : path.join(app.getAppPath(), './resources/bins');

const HOLOCHAIN_BINARIES = {
  '0.2.5-rc.0': path.join(
    binariesDirectory,
    `holochain-v0.2.5-rc.0${process.platform === 'win32' ? '.exe' : ''}`,
  ),
};

const LAIR_BINARY = path.join(
  binariesDirectory,
  `lair-keystore-v0.3.0${process.platform === 'win32' ? '.exe' : ''}`,
);

export { HOLOCHAIN_BINARIES, LAIR_BINARY };
