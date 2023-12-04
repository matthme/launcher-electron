
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const LESSOPEN: string;
	export const npm_package_devDependencies__types_node: string;
	export const npm_package_dependencies_hc_launcher_rust_utils: string;
	export const LANGUAGE: string;
	export const USER: string;
	export const LC_TIME: string;
	export const npm_package_dependencies__holochain_client: string;
	export const npm_package_dependencies__electron_toolkit_utils: string;
	export const npm_package_scripts_typecheck_node: string;
	export const npm_config_version_commit_hooks: string;
	export const npm_config_user_agent: string;
	export const npm_package_devDependencies_get_port: string;
	export const npm_config_bin_links: string;
	export const npm_config_wrap_output: string;
	export const XDG_SESSION_TYPE: string;
	export const npm_node_execpath: string;
	export const npm_package_devDependencies_vite: string;
	export const npm_package_devDependencies__electron_toolkit_tsconfig: string;
	export const npm_package_scripts_dev_sveltekit: string;
	export const npm_config_init_version: string;
	export const SHLVL: string;
	export const HOME: string;
	export const OLDPWD: string;
	export const npm_package_dependencies_bufferutil: string;
	export const npm_package_devDependencies__typescript_eslint_parser: string;
	export const DESKTOP_SESSION: string;
	export const NVM_BIN: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const NVM_INC: string;
	export const COREPACK_ROOT: string;
	export const npm_config_init_license: string;
	export const npm_package_devDependencies__sveltejs_adapter_static: string;
	export const GNOME_SHELL_SESSION_MODE: string;
	export const GTK_MODULES: string;
	export const YARN_WRAP_OUTPUT: string;
	export const npm_config_version_tag_prefix: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const LC_MONETARY: string;
	export const NIX_PROFILES: string;
	export const npm_package_devDependencies_lit: string;
	export const npm_package_scripts_check: string;
	export const SYSTEMD_EXEC_PID: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_package_scripts_postinstall: string;
	export const npm_config_engine_strict: string;
	export const COLORTERM: string;
	export const npm_package_devDependencies_utf_8_validate: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_description: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const NVM_DIR: string;
	export const npm_package_readmeFilename: string;
	export const MANDATORY_PATH: string;
	export const IM_CONFIG_PHASE: string;
	export const npm_package_devDependencies_prettier: string;
	export const npm_package_devDependencies_electron_builder: string;
	export const npm_package_scripts_dev: string;
	export const FORCE_COLOR: string;
	export const GTK_IM_MODULE: string;
	export const LOGNAME: string;
	export const npm_package_devDependencies__electron_toolkit_eslint_config_prettier: string;
	export const npm_package_type: string;
	export const _: string;
	export const npm_package_private: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const npm_package_scripts_check_watch: string;
	export const XDG_SESSION_CLASS: string;
	export const DEFAULTS_PATH: string;
	export const npm_package_scripts_lint: string;
	export const npm_config_registry: string;
	export const npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
	export const USERNAME: string;
	export const TERM: string;
	export const npm_package_scripts_build_sveltekit: string;
	export const GNOME_DESKTOP_SESSION_ID: string;
	export const npm_package_scripts_start: string;
	export const npm_config_ignore_scripts: string;
	export const WINDOWPATH: string;
	export const npm_package_scripts_build_linux: string;
	export const npm_package_devDependencies__tanstack_svelte_query: string;
	export const PATH: string;
	export const NODE: string;
	export const SESSION_MANAGER: string;
	export const PAPERSIZE: string;
	export const npm_package_name: string;
	export const XDG_MENU_PREFIX: string;
	export const LC_ADDRESS: string;
	export const GNOME_TERMINAL_SCREEN: string;
	export const XDG_RUNTIME_DIR: string;
	export const npm_package_scripts_setup: string;
	export const DISPLAY: string;
	export const npm_package_devDependencies_electron_vite: string;
	export const LANG: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const LC_TELEPHONE: string;
	export const npm_package_devDependencies_eslint: string;
	export const npm_package_dependencies_winston: string;
	export const npm_package_scripts_fetch_default_apps: string;
	export const XMODIFIERS: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XAUTHORITY: string;
	export const LS_COLORS: string;
	export const GNOME_TERMINAL_SERVICE: string;
	export const MOZ_USE_XINPUT2: string;
	export const npm_lifecycle_script: string;
	export const npm_package_main: string;
	export const SSH_AGENT_LAUNCHER: string;
	export const SSH_AUTH_SOCK: string;
	export const npm_package_devDependencies_electron_squirrel_startup: string;
	export const npm_package_devDependencies_concurrently: string;
	export const npm_config_version_git_message: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const SHELL: string;
	export const LC_NAME: string;
	export const npm_lifecycle_event: string;
	export const npm_package_version: string;
	export const QT_ACCESSIBILITY: string;
	export const GDMSESSION: string;
	export const npm_config_argv: string;
	export const npm_package_dependencies_split: string;
	export const npm_package_dependencies__electron_toolkit_preload: string;
	export const npm_package_scripts_build_win: string;
	export const npm_package_scripts_build: string;
	export const npm_package_devDependencies_vite_plugin_tailwind_purgecss: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_package_devDependencies_svelte: string;
	export const LESSCLOSE: string;
	export const NIX_SSL_CERT_FILE: string;
	export const LC_MEASUREMENT: string;
	export const npm_package_devDependencies__electron_toolkit_eslint_config_ts: string;
	export const npm_config_version_git_tag: string;
	export const npm_config_version_git_sign: string;
	export const GPG_AGENT_INFO: string;
	export const LC_IDENTIFICATION: string;
	export const npm_package_scripts_typecheck: string;
	export const npm_config_strict_ssl: string;
	export const QT_IM_MODULE: string;
	export const npm_package_scripts_format: string;
	export const GPG_TTY: string;
	export const PWD: string;
	export const npm_execpath: string;
	export const XDG_CONFIG_DIRS: string;
	export const NVM_CD_FLAGS: string;
	export const XDG_DATA_DIRS: string;
	export const npm_package_devDependencies_electron: string;
	export const npm_package_devDependencies__napi_rs_cli: string;
	export const LC_NUMERIC: string;
	export const npm_config_save_prefix: string;
	export const npm_config_ignore_optional: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const LC_PAPER: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_package_scripts_preview: string;
	export const PNPM_HOME: string;
	export const VTE_VERSION: string;
	export const npm_package_devDependencies__skeletonlabs_tw_plugin: string;
	export const INIT_CWD: string;
	export const npm_package_scripts_build_mac: string;
	export const npm_package_devDependencies__skeletonlabs_skeleton: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		LESSOPEN: string;
		npm_package_devDependencies__types_node: string;
		npm_package_dependencies_hc_launcher_rust_utils: string;
		LANGUAGE: string;
		USER: string;
		LC_TIME: string;
		npm_package_dependencies__holochain_client: string;
		npm_package_dependencies__electron_toolkit_utils: string;
		npm_package_scripts_typecheck_node: string;
		npm_config_version_commit_hooks: string;
		npm_config_user_agent: string;
		npm_package_devDependencies_get_port: string;
		npm_config_bin_links: string;
		npm_config_wrap_output: string;
		XDG_SESSION_TYPE: string;
		npm_node_execpath: string;
		npm_package_devDependencies_vite: string;
		npm_package_devDependencies__electron_toolkit_tsconfig: string;
		npm_package_scripts_dev_sveltekit: string;
		npm_config_init_version: string;
		SHLVL: string;
		HOME: string;
		OLDPWD: string;
		npm_package_dependencies_bufferutil: string;
		npm_package_devDependencies__typescript_eslint_parser: string;
		DESKTOP_SESSION: string;
		NVM_BIN: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		NVM_INC: string;
		COREPACK_ROOT: string;
		npm_config_init_license: string;
		npm_package_devDependencies__sveltejs_adapter_static: string;
		GNOME_SHELL_SESSION_MODE: string;
		GTK_MODULES: string;
		YARN_WRAP_OUTPUT: string;
		npm_config_version_tag_prefix: string;
		npm_package_devDependencies_svelte_check: string;
		LC_MONETARY: string;
		NIX_PROFILES: string;
		npm_package_devDependencies_lit: string;
		npm_package_scripts_check: string;
		SYSTEMD_EXEC_PID: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_package_scripts_postinstall: string;
		npm_config_engine_strict: string;
		COLORTERM: string;
		npm_package_devDependencies_utf_8_validate: string;
		npm_package_devDependencies_typescript: string;
		npm_package_description: string;
		npm_package_devDependencies_tailwindcss: string;
		NVM_DIR: string;
		npm_package_readmeFilename: string;
		MANDATORY_PATH: string;
		IM_CONFIG_PHASE: string;
		npm_package_devDependencies_prettier: string;
		npm_package_devDependencies_electron_builder: string;
		npm_package_scripts_dev: string;
		FORCE_COLOR: string;
		GTK_IM_MODULE: string;
		LOGNAME: string;
		npm_package_devDependencies__electron_toolkit_eslint_config_prettier: string;
		npm_package_type: string;
		_: string;
		npm_package_private: string;
		npm_package_devDependencies_autoprefixer: string;
		npm_package_scripts_check_watch: string;
		XDG_SESSION_CLASS: string;
		DEFAULTS_PATH: string;
		npm_package_scripts_lint: string;
		npm_config_registry: string;
		npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
		USERNAME: string;
		TERM: string;
		npm_package_scripts_build_sveltekit: string;
		GNOME_DESKTOP_SESSION_ID: string;
		npm_package_scripts_start: string;
		npm_config_ignore_scripts: string;
		WINDOWPATH: string;
		npm_package_scripts_build_linux: string;
		npm_package_devDependencies__tanstack_svelte_query: string;
		PATH: string;
		NODE: string;
		SESSION_MANAGER: string;
		PAPERSIZE: string;
		npm_package_name: string;
		XDG_MENU_PREFIX: string;
		LC_ADDRESS: string;
		GNOME_TERMINAL_SCREEN: string;
		XDG_RUNTIME_DIR: string;
		npm_package_scripts_setup: string;
		DISPLAY: string;
		npm_package_devDependencies_electron_vite: string;
		LANG: string;
		XDG_CURRENT_DESKTOP: string;
		LC_TELEPHONE: string;
		npm_package_devDependencies_eslint: string;
		npm_package_dependencies_winston: string;
		npm_package_scripts_fetch_default_apps: string;
		XMODIFIERS: string;
		XDG_SESSION_DESKTOP: string;
		XAUTHORITY: string;
		LS_COLORS: string;
		GNOME_TERMINAL_SERVICE: string;
		MOZ_USE_XINPUT2: string;
		npm_lifecycle_script: string;
		npm_package_main: string;
		SSH_AGENT_LAUNCHER: string;
		SSH_AUTH_SOCK: string;
		npm_package_devDependencies_electron_squirrel_startup: string;
		npm_package_devDependencies_concurrently: string;
		npm_config_version_git_message: string;
		npm_package_devDependencies__sveltejs_kit: string;
		SHELL: string;
		LC_NAME: string;
		npm_lifecycle_event: string;
		npm_package_version: string;
		QT_ACCESSIBILITY: string;
		GDMSESSION: string;
		npm_config_argv: string;
		npm_package_dependencies_split: string;
		npm_package_dependencies__electron_toolkit_preload: string;
		npm_package_scripts_build_win: string;
		npm_package_scripts_build: string;
		npm_package_devDependencies_vite_plugin_tailwind_purgecss: string;
		npm_package_devDependencies_tslib: string;
		npm_package_devDependencies_svelte: string;
		LESSCLOSE: string;
		NIX_SSL_CERT_FILE: string;
		LC_MEASUREMENT: string;
		npm_package_devDependencies__electron_toolkit_eslint_config_ts: string;
		npm_config_version_git_tag: string;
		npm_config_version_git_sign: string;
		GPG_AGENT_INFO: string;
		LC_IDENTIFICATION: string;
		npm_package_scripts_typecheck: string;
		npm_config_strict_ssl: string;
		QT_IM_MODULE: string;
		npm_package_scripts_format: string;
		GPG_TTY: string;
		PWD: string;
		npm_execpath: string;
		XDG_CONFIG_DIRS: string;
		NVM_CD_FLAGS: string;
		XDG_DATA_DIRS: string;
		npm_package_devDependencies_electron: string;
		npm_package_devDependencies__napi_rs_cli: string;
		LC_NUMERIC: string;
		npm_config_save_prefix: string;
		npm_config_ignore_optional: string;
		npm_package_devDependencies_postcss: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		LC_PAPER: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_package_scripts_preview: string;
		PNPM_HOME: string;
		VTE_VERSION: string;
		npm_package_devDependencies__skeletonlabs_tw_plugin: string;
		INIT_CWD: string;
		npm_package_scripts_build_mac: string;
		npm_package_devDependencies__skeletonlabs_skeleton: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
