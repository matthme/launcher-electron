// Types that are shared between renderer, preload and main process

import { AppInfo } from '@holochain/client';
import { ZomeCallNapi, ZomeCallUnsignedNapi } from 'hc-launcher-rust-utils';

export interface ElectronAPI {
  getInstalledApps: () => Promise<ExtendedAppInfo[]>;
  installApp: (
    filePath: string,
    appId: string,
    partition: string,
    networkSeed?: string,
  ) => Promise<void>;
  ipcHandlersReady: () => Promise<boolean>;
  lairSetupRequired: () => Promise<boolean>;
  launch: (password: string) => Promise<void>;
  openApp: (extendedAppInfo: ExtendedAppInfo) => Promise<void>;
  onHolochainReady: (callback: (e: any, payload: RunningHolochain[]) => any) => any;
  onProgressUpdate: (callback) => void;
  onIPCHandlersReady: (callback) => void;
  signZomeCall: (zomeCall: ZomeCallUnsignedNapi) => Promise<ZomeCallNapi>;
  uninstallApp: (appId: string, partition: string) => Promise<void>;
}

export interface ExtendedAppInfo {
  appInfo: AppInfo;
  version: HolochainVersion;
  partition: string;
}

export type HolochainVersion =
  | {
      // holochain binary that has been shipped with the launcher
      type: 'built-in';
      version: string;
    }
  | {
      // Custom holochain binary from a path
      type: 'custom-path';
      path: string;
    }
  | {
      // Externally running holochain binary. E.g. started via a terminal.
      type: 'running-external';
    };

export interface RunningHolochain {
  version: HolochainVersion;
  partition: string;
  appPort: number;
}
