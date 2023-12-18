// Types that are shared between renderer, preload and main process

import { AgentPubKey, AppInfo } from '@holochain/client';
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
  uninstallApp: (app: ExtendedAppInfo) => Promise<void>;
}

export interface ExtendedAppInfo {
  appInfo: AppInfo;
  version: HolochainVersion;
  holochainDataRoot: HolochainDataRoot;
}

export type HolochainDataRoot =
  | {
      type: 'partition';
      /**
       * If it's a custom partition, it will start with 'partition#'
       */
      name: string;
    }
  | {
      /**
       * A partition that's not under control of the launcher but provided externally. Used when the launcher
       * connects to an externally running holochain binary
       */
      type: 'external';
      /**
       * The name is used to determine the storage location of localStorage and other browser-related data.
       * It will start with 'external#'.
       */
      name: string;
      path: string;
    };

export type HolochainPartition =
  | {
      /**
       * The default partition. Its folder name is based on the holochain version, e.g. 0.2.x
       * for all holochain versions semver compatible with holochain 0.2.0
       */
      type: 'default';
    }
  | {
      /**
       * A custom partition with a custom name. Its folder name will be named partition#[cusom name here]
       */
      type: 'custom';
      name: string;
    }
  | {
      /**
       * A partition that's not under control of the launcher but provided externally. Used when the launcher
       * connects to an externally running holochain binary
       */
      type: 'external';
      /**
       * The name is used to determine the storage location of localStorage and other browser-related data
       */
      name: string;
      path: string;
    };

export type HolochainVersion =
  | {
      /**
       * holochain binary that has been shipped with the launcher
       */
      type: 'built-in';
      version: string;
    }
  | {
      /**
       * Custom holochain binary from a path
       */
      type: 'custom-path';
      path: string;
    }
  | {
      /**
       * Externally running holochain binary. E.g. started via a terminal.
       */
      type: 'running-external';
      /**
       * Path to the conductor configuration file
       */
      configPath: string;
      /**
       * The path where webhapp-related data like UI assets are to be stored.
       */
      appsDataDir: string;
      /**
       * Admin interface port
       */
      adminPort: number;
    };

export interface RunningHolochain {
  version: HolochainVersion;
  holochainDataRoot: HolochainDataRoot;
  appPort: number;
}

export type WindowInfo = {
  agentPubKey: AgentPubKey;
  adminPort?: number;
};
