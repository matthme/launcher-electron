import path from 'path';
import fs from 'fs';
import semver from 'semver';

export type Profile = string;

class LauncherFileSystem {
  public profileDataDir: string;
  public profileLogsDir: string;
  public profile: string;

  constructor(profileDataDir: string, profileLogsDir: string, profile: string) {
    this.profileDataDir = profileDataDir;
    this.profileLogsDir = profileLogsDir;
    this.profile = profile;
  }

  static connect(app: Electron.App, profile?: Profile) {
    const breakingAppVersion = breakingVersion(app.getVersion());
    profile = profile ? profile : 'default';

    const defaultLogsPath = app.getPath('logs');
    console.log('defaultLogsPath: ', defaultLogsPath);
    // app.setPath('logs', path.join(defaultLogsPath, profile));
    const defaultUserDataPath = app.getPath('userData');
    console.log('defaultUserDataPath: ', defaultUserDataPath);
    // check whether userData path has already been modified, otherwise, set paths to point
    // to the profile-specific paths
    if (!defaultUserDataPath.endsWith(profile)) {
      app.setPath('logs', path.join(defaultUserDataPath, breakingAppVersion, profile, 'logs'));
      app.setAppLogsPath(path.join(defaultUserDataPath, breakingAppVersion, profile, 'logs'));
      app.setPath('userData', path.join(defaultUserDataPath, breakingAppVersion, profile));
      app.setPath(
        'sessionData',
        path.join(defaultUserDataPath, breakingAppVersion, profile, 'chromium'),
      );
      fs.rmdirSync(defaultLogsPath);
    }

    const profileDataDir = app.getPath('userData');
    const profileLogsDir = app.getPath('logs');

    console.log('Got profileLogsDir and profileDataDir: ', profileLogsDir, profileDataDir);

    const launcherFileSystem = new LauncherFileSystem(profileDataDir, profileLogsDir, profile);

    launcherFileSystem.createInitialDirectoryStructure();
    return launcherFileSystem;
  }

  createInitialDirectoryStructure = () => {
    createDirIfNotExists(this.keystoreDir);
    createDirIfNotExists(this.holochainDir);
  };

  get keystoreDir() {
    return path.join(this.profileDataDir, 'lair');
  }

  get holochainDir() {
    return path.join(this.profileDataDir, 'holochain');
  }

  holochainPartitionDir(partition: string) {
    return path.join(this.holochainDir, partition);
  }

  conductorConfigPath(partition: string) {
    return path.join(this.holochainDir, partition, 'conductor-config.yaml');
  }

  conductorEnvironmentDir(partition: string) {
    return path.join(this.holochainDir, partition, 'dbs');
  }

  happUiDir(appId: string, partition: string) {
    return path.join(this.holochainPartitionDir(partition), 'apps', appId, 'ui');
  }

  happConfigPath(appId: string, partition: string) {
    return path.join(this.holochainPartitionDir(partition), 'apps', appId, 'app-config.json');
  }

  keystoreInitialized = () => {
    return fs.existsSync(path.join(this.keystoreDir, 'lair-keystore-config.yaml'));
  };

  // factoryReset = (deleteLogs: boolean) => {};
}

export function createDirIfNotExists(path: fs.PathLike) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

export { LauncherFileSystem };

function breakingVersion(version: string): string {
  if (!semver.valid(version)) {
    throw new Error('Version is not valid semver.');
  }
  if (semver.prerelease(version)) {
    return version;
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
