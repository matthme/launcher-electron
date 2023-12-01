import { EventEmitter } from 'events';
import { HolochainVersion } from './sharedTypes';

export type APP_INSTALLED = 'app-installed';
export const APP_INSTALLED = 'app-installed';
export type LAIR_ERROR = 'lair-error';
export const LAIR_ERROR = 'lair-error';
export type LAIR_FATAL_PANIC = 'lair-fatal-panic';
export const LAIR_FATAL_PANIC = 'lair-fatal-panic';
export type LAIR_LOG = 'lair-log';
export const LAIR_LOG = 'lair-log';
export type LAIR_READY = 'lair-ready';
export const LAIR_READY = 'lair-ready';
export type HOLOCHAIN_ERROR = 'holochain-error';
export const HOLOCHAIN_ERROR = 'holochain-error';
export type HOLOCHAIN_FATAL_PANIC = 'holochain-fatal-panic';
export const HOLOCHAIN_FATAL_PANIC = 'holochain-fatal-panic';
export type HOLOCHAIN_LOG = 'holochain-log';
export const HOLOCHAIN_LOG = 'holochain-log';
export type WASM_LOG = 'wasm-log';
export const WASM_LOG = 'wasm-log';
export type WRONG_PASSWORD = 'wrong-password';
export const WRONG_PASSWORD = 'wrong-password';

export declare interface LauncherEmitter {
  on(
    event:
      | APP_INSTALLED
      | LAIR_ERROR
      | LAIR_FATAL_PANIC
      | LAIR_LOG
      | LAIR_READY
      | WRONG_PASSWORD
      | HOLOCHAIN_ERROR
      | HOLOCHAIN_FATAL_PANIC
      | HOLOCHAIN_LOG
      | WASM_LOG,
    listener: (event: HolochainData | string | Error) => void,
  ): this;
}

export class LauncherEmitter extends EventEmitter {
  emitAppInstalled(app: HolochainData) {
    this.emit(APP_INSTALLED, app);
  }
  emitLairError(error: string) {
    this.emit(LAIR_ERROR, error);
  }
  emitLairFatalPanic(panic: string) {
    this.emit(LAIR_FATAL_PANIC, panic);
  }
  emitLairLog(log: string) {
    this.emit(LAIR_LOG, log);
  }
  emitLairReady(url: string) {
    this.emit(LAIR_READY, url);
  }
  emitWrongPassword() {
    this.emit(WRONG_PASSWORD);
  }
  emitHolochainError(error: HolochainData) {
    this.emit(HOLOCHAIN_ERROR, error);
  }
  emitHolochainFatalPanic(panic: HolochainData) {
    this.emit(HOLOCHAIN_FATAL_PANIC, panic);
  }
  emitHolochainLog(log: HolochainData) {
    this.emit(HOLOCHAIN_LOG, log);
  }
  emitWasmLog(log: HolochainData) {
    this.emit(WASM_LOG, log);
  }
}

export interface HolochainData {
  version: HolochainVersion;
  partition: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
