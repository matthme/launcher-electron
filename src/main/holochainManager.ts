/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import semver from 'semver';
import * as childProcess from 'child_process';
import { LauncherEmitter } from './launcherEmitter';
import split from 'split';
import { AdminWebsocket, AppInfo } from '@holochain/client';
import { LauncherFileSystem, createDirIfNotExists } from './filesystem';
import { HOLOCHAIN_BINARIES } from './binaries';
import { HolochainVersion } from './sharedTypes';
import path from 'path';

const rustUtils = require('hc-launcher-rust-utils');

export type AdminPort = number;
export type AppPort = number;

const DEFAULT_BOOTSTRAP_SERVER = 'https://bootstrap.holo.host';
const DEFAULT_SIGNALING_SERVER = 'wss://signal.holo.host';

export class HolochainManager {
  processHandle: childProcess.ChildProcessWithoutNullStreams | undefined;
  adminPort: AdminPort;
  appPort: AppPort;
  adminWebsocket: AdminWebsocket;
  fs: LauncherFileSystem;
  installedApps: AppInfo[];
  launcherEmitter: LauncherEmitter;
  version: HolochainVersion;
  partition: string;

  constructor(
    processHandle: childProcess.ChildProcessWithoutNullStreams | undefined,
    launcherEmitter: LauncherEmitter,
    launcherFileSystem: LauncherFileSystem,
    adminPort: AdminPort,
    appPort: AppPort,
    adminWebsocket: AdminWebsocket,
    installedApps: AppInfo[],
    version: HolochainVersion,
    partition: string,
  ) {
    this.processHandle = processHandle;
    this.launcherEmitter = launcherEmitter;
    this.adminPort = adminPort;
    this.appPort = appPort;
    this.adminWebsocket = adminWebsocket;
    this.fs = launcherFileSystem;
    this.installedApps = installedApps;
    this.version = version;
    this.partition = partition;
  }

  static async launch(
    launcherEmitter: LauncherEmitter,
    launcherFileSystem: LauncherFileSystem,
    password: string,
    version: HolochainVersion,
    adminPort: number,
    lairUrl: string,
    bootstrapUrl?: string,
    signalingUrl?: string,
    nonDefaultPartition?: string, // launch with data from a non-default partition
  ): Promise<HolochainManager> {
    const partition = nonDefaultPartition
      ? `partition#${nonDefaultPartition}`
      : version.type === 'built-in'
        ? breakingHolochainVersion(version.version)
        : undefined;

    if (!partition)
      throw new Error('Only built-in holochain binaries can be used in the default partition.');

    createDirIfNotExists(path.join(launcherFileSystem.holochainDir, partition));

    const conductorEnvironmentPath = launcherFileSystem.conductorEnvironmentDir(partition);
    const configPath = launcherFileSystem.conductorConfigPath(partition);
    console.log('configPath: ', configPath);

    if (fs.existsSync(configPath)) {
      // TODO Reuse existing config and only overwrite chosen values if necessary
      const conductorConfigNew = rustUtils.defaultConductorConfig(
        adminPort,
        conductorEnvironmentPath,
        lairUrl,
        bootstrapUrl ? bootstrapUrl : DEFAULT_BOOTSTRAP_SERVER,
        signalingUrl ? signalingUrl : DEFAULT_SIGNALING_SERVER,
      );
      console.log('Overwriting new conductor-config.yaml...');
      fs.writeFileSync(configPath, conductorConfigNew);
    } else {
      const conductorConfig = rustUtils.defaultConductorConfig(
        adminPort,
        conductorEnvironmentPath,
        lairUrl,
        bootstrapUrl ? bootstrapUrl : DEFAULT_BOOTSTRAP_SERVER,
        signalingUrl ? signalingUrl : DEFAULT_SIGNALING_SERVER,
      );
      console.log(typeof conductorConfig);
      console.log('Writing new conductor-config.yaml...');
      fs.writeFileSync(configPath, conductorConfig);
    }

    if (version.type === 'running-external') {
      try {
        const adminWebsocket = await AdminWebsocket.connect(new URL(`ws://127.0.0.1:${adminPort}`));
        console.log('Connected to admin websocket of externally running conductor.');
        const installedApps = await adminWebsocket.listApps({});
        const appInterfaces = await adminWebsocket.listAppInterfaces();
        console.log('Got appInterfaces: ', appInterfaces);
        let appPort;
        if (appInterfaces.length > 0) {
          appPort = appInterfaces[0];
        } else {
          const attachAppInterfaceResponse = await adminWebsocket.attachAppInterface({});
          console.log('Attached app interface port: ', attachAppInterfaceResponse);
          appPort = attachAppInterfaceResponse.port;
        }
        return new HolochainManager(
          undefined,
          launcherEmitter,
          launcherFileSystem,
          adminPort,
          appPort,
          adminWebsocket,
          installedApps,
          version,
          partition,
        );
      } catch (e) {
        throw new Error(`Failed to connect to external holochain binary: ${JSON.stringify(e)}`);
      }
    }

    const binary = version.type === 'built-in' ? HOLOCHAIN_BINARIES[version.version] : version.path;
    console.log('HOLOCHAIN_BINARIES: ', HOLOCHAIN_BINARIES);
    console.log('HOLOCHAIN BINARY: ', binary);
    const conductorHandle = childProcess.spawn(binary, ['-c', configPath, '-p']);
    conductorHandle.stdin.write(password);
    conductorHandle.stdin.end();
    conductorHandle.stdout.pipe(split()).on('data', async (line: string) => {
      launcherEmitter.emitHolochainLog({
        version,
        partition,
        data: line,
      });
    });
    conductorHandle.stderr.pipe(split()).on('data', (line: string) => {
      launcherEmitter.emitHolochainError({
        version,
        partition,
        data: line,
      });
    });

    return new Promise((resolve, reject) => {
      conductorHandle.stdout.pipe(split()).on('data', async (line: string) => {
        if (line.includes('FATAL PANIC PanicInfo')) {
          reject(
            `Holochain version ${JSON.stringify(
              version,
            )} failed to start up and crashed. Check the logs for details.`,
          );
        }
        if (line.includes('Conductor ready.')) {
          const adminWebsocket = await AdminWebsocket.connect(
            new URL(`ws://127.0.0.1:${adminPort}`),
          );
          console.log('Connected to admin websocket.');
          const installedApps = await adminWebsocket.listApps({});
          const appInterfaces = await adminWebsocket.listAppInterfaces();
          console.log('Got appInterfaces: ', appInterfaces);
          let appPort;
          if (appInterfaces.length > 0) {
            appPort = appInterfaces[0];
          } else {
            const attachAppInterfaceResponse = await adminWebsocket.attachAppInterface({});
            console.log('Attached app interface port: ', attachAppInterfaceResponse);
            appPort = attachAppInterfaceResponse.port;
          }
          resolve(
            new HolochainManager(
              conductorHandle,
              launcherEmitter,
              launcherFileSystem,
              adminPort,
              appPort,
              adminWebsocket,
              installedApps,
              version,
              partition,
            ),
          );
        }
      });
    });
  }

  // TODO Add option to install happ without UI
  async installWebHapp(webHappPath: string, appId: string, networkSeed?: string) {
    const uiTargetDir = this.fs.happUiDir(appId, this.partition);
    console.log('uiTargetDir: ', uiTargetDir);
    console.log('Installing app...');
    const tempHappPath = await rustUtils.saveWebhapp(webHappPath, uiTargetDir);
    console.log('Stored UI and got temp happ path: ', tempHappPath);
    const pubKey = await this.adminWebsocket.generateAgentPubKey();
    const appInfo = await this.adminWebsocket.installApp({
      agent_key: pubKey,
      installed_app_id: appId,
      membrane_proofs: {},
      path: tempHappPath,
      network_seed: networkSeed,
    });
    await this.adminWebsocket.enableApp({ installed_app_id: appId });
    console.log('Insalled app.');
    const installedApps = await this.adminWebsocket.listApps({});
    console.log('Installed apps: ', installedApps);
    this.installedApps = installedApps;
    this.launcherEmitter.emitAppInstalled({
      version: this.version,
      partition: this.partition,
      data: appInfo,
    });
  }

  async uninstallApp(appId: string) {
    await this.adminWebsocket.uninstallApp({ installed_app_id: appId });
    fs.rmSync(this.fs.happUiDir(appId, this.partition), { recursive: true });
    console.log('Uninstalled app.');
    const installedApps = await this.adminWebsocket.listApps({});
    console.log('Installed apps: ', installedApps);
    this.installedApps = installedApps;
  }
}

function breakingHolochainVersion(version: string): string {
  if (!semver.valid(version)) {
    throw new Error('Version is not valid semver.');
  }
  switch (semver.major(version)) {
    case 0:
      switch (semver.minor(version)) {
        case 0:
          return `0.0.${semver.patch(version)}`;
        default:
          return `0.${semver.minor(version)}.x`;
      }
    default:
      return `${semver.major(version)}.x.x`;
  }
}
