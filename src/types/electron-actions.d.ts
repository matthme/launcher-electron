export type IPC_EVENTS =
  | 'sign-zome-call'
  | 'open-app'
  | 'install-app'
  | 'uninstall-app'
  | 'get-installed-apps'
  | 'get-app-port'
  | 'lair-setup-required'
  | 'loading-progress-update'
  | 'launch'
  | 'ipc-handlers-ready'
  | 'holochain-ready';
