import type { zip } from "./zip";

/**
 * An interface that contains the settings for 8Crafter's Ore UI Customizer.
 */
export interface OreUICustomizerSettings {
    /**
     * This will allow you to turn hardcore mode on and off whenever you want.
     *
     * @default true
     */
    hardcoreModeToggleAlwaysClickable: boolean;
    /**
     * This will allow you to disable the experimental toggles even after the world has been played with them on, also applies to the `Education Edition` toggle.
     *
     * @default true
     */
    allowDisablingEnabledExperimentalToggles: boolean;
    /**
     * This will add a dropdown that allows you to select the world generator type.
     *
     * It lets you choose any of the following world generator types:
     *
     * - `Legacy`
     * - `Infinite world`
     * - `Flat world`
     * - `Void world`
     *
     * @default true
     */
    addGeneratorTypeDropdown: boolean;
    /**
     * This will add more options to the `Game Mode` dropdown.
     *
     * It will cause the dropdown to have the following options:
     *
     * - `Survival`
     * - `Creative`
     * - `Adventure`
     * - `Default`
     * - `Spectator`
     *
     * @default true
     */
    addMoreDefaultGameModes: boolean;
    /**
     * This will allow you to change the world seed whenever you want, also works on marketplace worlds that don't let you change the seed.
     *
     * @default true
     */
    allowForChangingSeeds: boolean;
    /**
     * This will allow you to change the flat world preset, even after the world has been created.
     *
     * Note: This option requires that the {@link addGeneratorTypeDropdown} option is enabled.
     *
     * @default true
     */
    allowForChangingFlatWorldPreset: boolean;
    /**
     * If specified, this will override the max length of every text box to be the specified value.
     *
     * Leave it blank to not override it.
     */
    maxTextLengthOverride: `${number}` | "";
    /**
     * This adds the `Debug` tab to the create and edit world screens.
     *
     * It also has a bunch of additional options added to the tab that aren't normally in there.
     *
     * @default true
     */
    addDebugTab: boolean;
    /**
     * This adds a button in the top right of the screen on the title bar to get access to the 8Crafter Utilities menu, this allows you to access certain menus without a keyboard shortcut, and has information and the auto rejoiner menu.
     *
     * @default true
     */
    add8CrafterUtilitiesMainMenuButton: boolean;
    /**
     * An object that lists whether or not each built in plugin is enabled.
     */
    enabledBuiltInPlugins: Record<BuiltInPluginID, boolean>;
    /**
     * These are replacements for the UI colors.
     *
     * @todo Make this functional.
     */
    colorReplacements: {
        // /**
        //  * Gray 80
        //  *
        //  * This is used as the solid background for many Ore UI menus.
        //  */
        // "#313233": "#006188",
        // /**
        //  * Gray 70
        //  *
        //  * This is used for the main part of a pressed button.
        //  */
        // "#48494a": "#007eaf",
        // "#3c8527": "#27856e",
        // "#e6e8eb": "#6200ff",
        // "#58585a": "#2c6387",
        // "#242425": "#003347",
        // "#1e1e1f": "#002c3d",
        // "#8c8d90": "#1fbfff",
        "#a0e081": string;
        "#86d562": string;
        "#6cc349": string;
        "#52a535": string;
        "#3c8527": string;
        "#2a641c": string;
        "#1d4d13": string;
        "#153a0e": string;
        "#112f0b": string;
        "#0f2b0a": string;
        "#ffffff": string;
        "#000000": string;
        "#f4f6f9": string;
        "#e6e8eb": string;
        "#d0d1d4": string;
        "#b1b2b5": string;
        "#8c8d90": string;
        "#58585a": string;
        "#48494a": string;
        "#313233": string;
        "#242425": string;
        "#1e1e1f": string;
        "#ff8080": string;
        "#d93636": string;
        "#b31b1b": string;
        "#d54242": string;
        "#ca3636": string;
        "#c02d2d": string;
        "#b62525": string;
        "#ad1d1d": string;
        "#a31616": string;
        "#990f0f": string;
        "#ffb366": string;
        "#d3791f": string;
        "#a65b11": string;
        "#ffe866": string;
        "#e5c317": string;
        "#8a7500": string;
        "#fff0c5": string;
        "#ffd783": string;
        "#f8af2b": string;
        "#ce8706": string;
        "#ae7100": string;
        "#8cb3ff": string;
        "#2e6be5": string;
        "#1452cc": string;
        "rgba(0, 0, 0, 0.1)": string;
        "rgba(0, 0, 0, 0.2)": string;
        "rgba(0, 0, 0, 0.25)": string;
        "rgba(0, 0, 0, 0.3)": string;
        "rgba(0, 0, 0, 0.4)": string;
        "rgba(0, 0, 0, 0.5)": string;
        "rgba(0, 0, 0, 0.6)": string;
        "rgba(0, 0, 0, 0.7)": string;
        "rgba(0, 0, 0, 0.8)": string;
        "rgba(0, 0, 0, 0.9)": string;
        "rgba(0, 0, 0, 1)": string;
        "rgba(255, 255, 255, 0.1)": string;
        "rgba(255, 255, 255, 0.2)": string;
        "rgba(255, 255, 255, 0.3)": string;
        "rgba(255, 255, 255, 0.4)": string;
        "rgba(255, 255, 255, 0.5)": string;
        "rgba(255, 255, 255, 0.6)": string;
        "rgba(255, 255, 255, 0.7)": string;
        "rgba(255, 255, 255, 0.8)": string;
        "rgba(255, 255, 255, 0.9)": string;
        "#FB95E2": string;
        "#FFB1EC": string;
        "#E833C2": string;
        "#F877DC": string;
        "#643ACB": string;
        "#AC90F3": string;
        "#9471E0": string;
        "#8557F8": string;
        "#7345E5": string;
        "#5D2CC6": string;
        "#4A1CAC": string;
        "#050029": string;
        "rgba(5, 0, 41, 0.5)": string;
    };
    /**
     * A list of additional plugins to apply.
     *
     * This is only present when manually provided encoded plugin data to apply, or when {@link bundleEncodedPluginDataInConfigFile} is true.
     *
     * This will not include plugins from the {@link preloadedPlugins} list.
     *
     * @default []
     */
    plugins?: EncodedPluginData[];
    /**
     * Whether or not to bundle the encoded plugin data in the config file.
     *
     * If false, it will just include some details of the active plugins.
     *
     * @default false
     */
    bundleEncodedPluginDataInConfigFile?: boolean;
    /**
     * The details of the active plugins.
     *
     * This includes plugins from both {@link plugins} and {@link preloadedPlugins}.
     *
     * @default []
     */
    activePluginsDetails?: Omit<EncodedPluginData, "fileType" | "dataURI">[];
    /**
     * A list of already loaded plugins to apply.
     *
     * This will only be present when passing a list of preloaded plugins to the apply mods function.
     *
     * @default []
     */
    preloadedPlugins?: Plugin[];
}

export interface EncodedPluginData {
    /**
     * The display name of the plugin.
     */
    name: string;
    /**
     * The id of the plugin, used to identify the plugin when applying the plugins, also used to identify the plugin in error messages, this should be unique.
     *
     * Must consist only of alphanumeric characters, underscores, hyphens, and periods.
     */
    id: string;
    /**
     * The UUID of the plugin, used to uniquely identify the plugin.
     *
     * Must be a valid UUID.
     *
     * @example "39a5d251-b6e0-47db-92d1-317eaa7dfe44"
     */
    uuid: string;
    /**
     * The namespace of the plugin, used in conjunction with the {@link id} to identify the plugin in error messages.
     *
     * Must consist only of alphanumeric characters, underscores, hyphens, and periods.
     *
     * Must not be `built-in`, as it is reserved for built-in plugins.
     */
    namespace: string;
    /**
     * An optional description of the plugin.
     */
    description?: string;
    /**
     * The version of the plugin.
     *
     * This must be a valid semver string, without the leading `v`.
     *
     * @example "3.17.4-preview.20+BUILD.5"
     */
    version: string;
    /**
     * The version of 8Crafter's Ore UI Customizer that this plugin is made for.
     *
     * This must be a valid semver string, without the leading `v`.
     *
     * @example "1.0.0"
     */
    format_version: string;
    /**
     * The minimum version of 8Crafter's Ore UI Customizer that this plugin is compatible with.
     *
     * This must be a valid semver string, without the leading `v`.
     *
     * If not specified, no check will be done.
     *
     * @example "1.0.0"
     */
    min_engine_version?: string;
    /**
     * The data URI of the icon of the plugin.
     *
     * If not specified the default icon will be used.
     *
     * The MIME type must match `image/*`.
     *
     * @example "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
     */
    icon_data_uri?: `data:image/${string};base64,${string}`;
    /**
     * The dependencies of the plugin.
     */
    dependencies?: (
        | {
              /**
               * The UUID of the plugin dependency.
               *
               * Must be a valid UUID.
               *
               * May also be the UUID of a built-in plugin to force the user to have it enabled to use the plugin.
               *
               * @example "39a5d251-b6e0-47db-92d1-317eaa7dfe44"
               */
              uuid: string;
              /**
               * The version of the plugin dependency.
               *
               * Must be a valid semver string, without the leading `v`.
               *
               * @example "3.17.4-preview.20+BUILD.5"
               */
              version: string;
          }
        | {
              /**
               * The name of a built-in module.
               *
               * @todo This is currently not functional.
               */
              module_name: string;
              /**
               * The version of the module dependency.
               *
               * Must be a valid semver string, without the leading `v`.
               *
               * @example "3.17.4-preview.20+BUILD.5"
               */
              version: string;
          }
    )[];
    /**
     * Additonal metadata about the plugin.
     */
    metadata?: {
        /**
         * The authors of the plugin.
         *
         * @example ["8Crafter", "StormStqr"]
         */
        authors?: string[];
        /**
         * The URL of the website for the plugin, or just the plugin creator's website.
         *
         * @example "https://www.8crafter.com"
         */
        url?: string;
        /**
         * The type of the plugin.
         *
         * @example "plugin"
         */
        product_type?: "plugin";
        /**
         * The license of the plugin
         */
        license?: string;
        /**
         * Any other metadata you want to add.
         */
        [key: string]: unknown;
    };
    /**
     * The details of the plugin in the marketplace.
     *
     * This is only used if the plugin is from the marketplace.
     *
     * This is mutually exclusive with {@link checkForUpdatesDetails}.
     */
    marketplaceDetails?: {
        /**
         * The id of the plugin in the marketplace.
         *
         * Format:
         * ```typescript
         * `${pluginPublisher}.${id}`
         * ```
         *
         * @example "8crafer.my-custom-plugin"
         */
        marketplaceId: string;
        /**
         * The original download URL of the plugin in the marketplace.
         *
         * @example "https://marketplace.ore-ui-customizer.8crafter.com/download/plugin/8crafer.my-custom-plugin/1.0.0"
         */
        originalDownloadURL: string;
        /**
         * The URL of the plugin in the marketplace.
         *
         * @example "https://marketplace.ore-ui-customizer.8crafter.com/plugin/8crafer.my-custom-plugin"
         */
        marketplaceURL: string;
    };
    /**
     * The details of the plugin to check for updates.
     *
     * This is only used if the plugin is not from the marketplace.
     *
     * This allows non-marketplace plugins to be checked for updates.
     *
     * This is mutually exclusive with {@link marketplaceDetails}.
     */
    checkForUpdatesDetails?: {
        /**
         * The URL to the JSON object containing the newest version of the plugin.
         *
         * The JSON object should have the following structure:
         * ```json
         * {
         *     // The version of the plugin.
         *     "version": "1.0.1-rc.5",
         *     // The download URL of the plugin.
         *     "url": "https://example.com/ore-ui-customizer-plugins/my-custom-plugin/1.0.1-rc.5/myCustomPlugin.ouicplugin"
         * }
         * ```
         *
         * When fetching the URL, the response should have an MIME type of `application/json` or `text/json`.
         *
         * @example "https://example.com/ore-ui-customizer-plugins/my-custom-plugin/latestVersion.json"
         */
        versionInfoURL: string;
    };
    /**
     * The file type of the plugin.
     */
    fileType: "js" | "mcouicplugin";
    /**
     * The data URI of the plugin.
     */
    dataURI: `data:${string};base64,${string}`;
}

/**
 * A type containing a union of all built-in plugin module names.
 */
export type BuiltInPluginModuleName = never;

/**
 * The data of the `manifest.json` file of a plugin.
 */
export interface PluginManifestJSON {
    /**
     * The version of the plugin manifest.
     *
     * @default 1
     */
    format_version: 1;
    /**
     * The header of the plugin manifest.
     */
    header: {
        /**
         * The display name of the plugin.
         *
         * @example "My Custom Plugin"
         */
        name: string;
        /**
         * The id of the plugin, used to identify the plugin when applying the plugins, also used to identify the plugin in error messages, this should be unique.
         *
         * Must consist only of alphanumeric characters, underscores, hyphens, and periods.
         *
         * @example "my-custom-plugin"
         */
        id: string;
        /**
         * The UUID of the plugin, used to uniquely identify the plugin.
         *
         * Must be a valid UUID.
         *
         * @example "39a5d251-b6e0-47db-92d1-317eaa7dfe44"
         */
        uuid: string;
        /**
         * The namespace of the plugin, used in conjunction with the {@link id} to identify the plugin in error messages.
         *
         * Must consist only of alphanumeric characters, underscores, hyphens, and periods.
         *
         * Must not be `built-in`, as it is reserved for built-in plugins.
         *
         * @example "andexpl"
         */
        namespace: string;
        /**
         * An optional description of the plugin.
         */
        description?: string;
        /**
         * The version of the plugin.
         *
         * This must be a valid semver string, without the leading `v`.
         *
         * @example "3.17.4-preview.20+BUILD.5"
         */
        version: string;
        /**
         * The version of 8Crafter's Ore UI Customizer that this plugin is made for.
         *
         * This must be a valid semver string, without the leading `v`.
         *
         * @example "1.0.0"
         */
        format_version: string;
        /**
         * The minimum version of 8Crafter's Ore UI Customizer that this plugin is compatible with.
         *
         * This must be a valid semver string, without the leading `v`.
         *
         * If not specified, no check will be done.
         *
         * @example "1.0.0"
         */
        min_engine_version?: string;
    };
    /**
     * The entry script of the plugin.
     *
     * Should be a path to a JavaScript file, relative to the location of the manifest.json file.
     *
     * @example "scripts/index.js"
     */
    entry: string;
    /**
     * The data URI of the icon of the plugin.
     *
     * If not specified the default icon will be used.
     *
     * The MIME type must match `image/*`.
     *
     * @example "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
     */
    icon_data_uri?: `data:image/${string};base64,${string}`;
    /**
     * The dependencies of the plugin.
     *
     * These dependencies can be other themes, plugins, configs, or plugin modules (similar to the `@minecraft/server` module from Minecraft Bedrock Edition's scripting API).
     */
    dependencies?: (
        | {
              /**
               * The UUID of the theme, plugin, or config dependency.
               *
               * Must be a valid UUID.
               *
               * May also be the UUID of a built-in theme or plugin to force the user to have it enabled to use the theme.
               *
               * @example "39a5d251-b6e0-47db-92d1-317eaa7dfe44"
               */
              uuid: string;
              /**
               * The version of the theme, plugin, or config dependency.
               *
               * Must be a valid semver string, without the leading `v`.
               *
               * @example "3.17.4-preview.20+BUILD.5"
               */
              version: string;
          }
        | {
              /**
               * The name of a built-in module.
               *
               * @todo This is currently not functional.
               */
              module_name: BuiltInPluginModuleName;
              /**
               * The version of the module dependency.
               *
               * Must be a valid semver string, without the leading `v`.
               *
               * @example "3.17.4-preview.20+BUILD.5"
               */
              version: string;
          }
    )[];
    /**
     * Additonal metadata about the plugin.
     */
    metadata: {
        /**
         * The authors of the plugin.
         *
         * @example ["8Crafter", "StormStqr"]
         */
        authors?: string[];
        /**
         * The URL of the website for the plugin, or just the plugin creator's website.
         *
         * @example "https://www.8crafter.com"
         */
        url?: string;
        /**
         * The product type.
         *
         * @example "plugin"
         */
        product_type: "plugin";
        /**
         * The license of the plugin.
         */
        license?: string;
        /**
         * Any other metadata you want to add.
         */
        [key: string]: unknown;
    };
    /**
     * The details of the plugin in the marketplace.
     *
     * This is only used if the plugin is from the marketplace.
     *
     * This should not be included when uploading the plugin to the marketplace, as the server will handle adding this information.
     *
     * This is mutually exclusive with {@link checkForUpdatesDetails}.
     */
    marketplaceDetails?: {
        /**
         * The id of the plugin in the marketplace.
         *
         * Format:
         * ```typescript
         * `${pluginPublisher}.${id}`
         * ```
         *
         * @example "8crafer.my-custom-plugin"
         */
        marketplaceId: string;
        /**
         * The original download URL of the plugin in the marketplace.
         *
         * @example "https://marketplace.ore-ui-customizer.8crafter.com/download/plugin/8crafer.my-custom-plugin/1.0.0"
         */
        originalDownloadURL: string;
        /**
         * The URL of the plugin in the marketplace.
         *
         * @example "https://marketplace.ore-ui-customizer.8crafter.com/plugin/8crafer.my-custom-plugin"
         */
        marketplaceURL: string;
    };
    /**
     * The details of the plugin to check for updates.
     *
     * This is only used if the plugin is not from the marketplace.
     *
     * This allows non-marketplace plugins to be checked for updates.
     *
     * This is mutually exclusive with {@link marketplaceDetails}.
     */
    checkForUpdatesDetails?: {
        /**
         * The URL to the JSON object containing the newest version of the plugin.
         *
         * The JSON object should have the following structure:
         * ```json
         * {
         *     // The version of the plugin.
         *     "version": "1.0.1-rc.5",
         *     // The download URL of the plugin.
         *     "url": "https://example.com/ore-ui-customizer-plugins/my-custom-plugin/1.0.1-rc.5/myCustomPlugin.ouicplugin"
         * }
         * ```
         *
         * When fetching the URL, the response should have an MIME type of `application/json` or `text/json`.
         *
         * @example "https://example.com/ore-ui-customizer-plugins/my-custom-plugin/latestVersion.json"
         */
        versionInfoURL: string;
    };
}

/**
 * The data of the `manifest.json` file of a theme.
 */
export interface ThemeManifestJSON {
    /**
     * The version of the theme manifest.
     *
     * @default 1
     */
    format_version: 1;
    /**
     * The header of the theme manifest.
     */
    header: {
        /**
         * The display name of the theme.
         *
         * @example "My Custom Theme"
         */
        name: string;
        /**
         * The id of the theme, used to identify the theme when applying the themes, also used to identify the theme in error messages, this should be unique.
         *
         * Must consist only of alphanumeric characters, underscores, hyphens, and periods.
         *
         * @example "my-custom-theme"
         */
        id: string;
        /**
         * The UUID of the theme, used to uniquely identify the theme.
         *
         * Must be a valid UUID.
         *
         * @example "39a5d251-b6e0-47db-92d1-317eaa7dfe44"
         */
        uuid: string;
        /**
         * An optional description of the theme.
         */
        description?: string;
        /**
         * The version of the theme.
         *
         * This must be a valid semver string, without the leading `v`.
         *
         * @example "3.17.4-preview.20+BUILD.5"
         */
        version: string;
        /**
         * The version of 8Crafter's Ore UI Customizer that this theme is made for.
         *
         * This must be a valid semver string, without the leading `v`.
         *
         * @example "1.0.0"
         */
        format_version: string;
    };
    /**
     * The data URI of the icon of the theme.
     *
     * If not specified the default icon will be used.
     *
     * The MIME type must match `image/*`.
     *
     * @example "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
     */
    icon_data_uri?: `data:image/${string};base64,${string}`;
    /**
     * The dependencies of the theme.
     *
     * These dependencies can be other themes, plugins, or configs.
     */
    dependencies?: {
        /**
         * The UUID of the theme, plugin, or config dependency.
         *
         * Must be a valid UUID.
         *
         * May also be the UUID of a built-in theme or plugin to force the user to have it enabled to use the theme.
         *
         * @example "39a5d251-b6e0-47db-92d1-317eaa7dfe44"
         */
        uuid: string;
        /**
         * The version of the theme, plugin, or config dependency.
         *
         * Must be a valid semver string, without the leading `v`.
         *
         * @example "3.17.4-preview.20+BUILD.5"
         */
        version: string;
    }[];
    /**
     * Additonal metadata about the theme.
     */
    metadata: {
        /**
         * The authors of the theme.
         *
         * @example ["8Crafter", "StormStqr"]
         */
        authors?: string[];
        /**
         * The URL of the website for the theme, or just the theme creator's website.
         *
         * @example "https://www.8crafter.com"
         */
        url?: string;
        /**
         * The product type.
         *
         * @example "theme"
         */
        product_type: "theme";
        /**
         * The license of the theme.
         */
        license?: string;
        /**
         * Any other metadata you want to add.
         */
        [key: string]: unknown;
    };
    /**
     * The details of the theme in the marketplace.
     *
     * This is only used if the theme is from the marketplace.
     *
     * This should not be included when uploading the theme to the marketplace, as the server will handle adding this information.
     *
     * This is mutually exclusive with {@link checkForUpdatesDetails}.
     */
    marketplaceDetails?: {
        /**
         * The id of the theme in the marketplace.
         *
         * Format:
         * ```typescript
         * `${themePublisher}.${id}`
         * ```
         *
         * @example "8crafer.my-custom-theme"
         */
        marketplaceId: string;
        /**
         * The original download URL of the theme in the marketplace.
         *
         * @example "https://marketplace.ore-ui-customizer.8crafter.com/download/theme/8crafer.my-custom-theme/1.0.0"
         */
        originalDownloadURL: string;
        /**
         * The URL of the theme in the marketplace.
         *
         * @example "https://marketplace.ore-ui-customizer.8crafter.com/theme/8crafer.my-custom-theme"
         */
        marketplaceURL: string;
    };
    /**
     * The details of the theme to check for updates.
     *
     * This is only used if the theme is not from the marketplace.
     *
     * This allows non-marketplace themes to be checked for updates.
     *
     * This is mutually exclusive with {@link marketplaceDetails}.
     */
    checkForUpdatesDetails?: {
        /**
         * The URL to the JSON object containing the newest version of the theme.
         *
         * The JSON object should have the following structure:
         * ```json
         * {
         *     // The version of the theme.
         *     "version": "1.0.1-rc.5",
         *     // The download URL of the theme.
         *     "url": "https://example.com/ore-ui-customizer-themes/my-custom-theme/1.0.1-rc.5/myCustomTheme.ouictheme"
         * }
         * ```
         *
         * When fetching the URL, the response should have an MIME type of `application/json` or `text/json`.
         *
         * @example "https://example.com/ore-ui-customizer-themes/my-custom-theme/latestVersion.json"
         */
        versionInfoURL: string;
    };
}

/**
 * The JSON data of a config file for 8Crafter's Ore UI Customizer.
 */
export interface OreUICustomizerConfig {
    /**
     * The settings for 8Crafter's Ore UI Customizer.
     */
    oreUICustomizerConfig: OreUICustomizerSettings;
    /**
     * The version of 8Crafter's Ore UI Customizer.
     */
    oreUICustomizerVersion: string;
    /**
     * Additonal metadata about the config file.
     */
    metadata?: {
        /**
         * The name of the config.
         *
         * @example "My Custom Config"
         *
         * @default
         * ```typescript
         * `Unnamed Config ${++highestUnnamedConfigNumber}`
         * ```
         */
        name?: string;
        /**
         * The id of the config, this should be unique.
         *
         * This is required if the config is from the marketplace.
         *
         * Must consist only of alphanumeric characters, underscores, hyphens, and periods.
         *
         * @default undefined
         */
        id?: string;
        /**
         * The UUID of the config, used to uniquely identify the config.
         *
         * This is required if the config is from the marketplace, or if you wish to have a plugin or theme require the config as a dependency.
         *
         * If it is not specified a new UUID will be generated.
         *
         * Must be a valid UUID.
         *
         * @example "39a5d251-b6e0-47db-92d1-317eaa7dfe44"
         *
         * @default crypto.randomUUID()
         */
        uuid?: string;
        /**
         * An optional description of the config.
         *
         * @default undefined
         */
        description?: string;
        /**
         * The version of the config.
         *
         * This is required if the config is from the marketplace.
         *
         * This must be a valid semver string, without the leading `v`.
         *
         * @example "3.17.4-preview.20+BUILD.5"
         *
         * @default "1.0.0"
         */
        version?: string;
        /**
         * The data URI of the icon for the config.
         *
         * If not specified the default icon will be used.
         *
         * The MIME type must match `image/*`.
         *
         * @example "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
         */
        pack_icon_data_uri?: `data:image/${string};base64,${string}`;
        /**
         * The dependencies of the config.
         *
         * These dependencies can be other themes, plugins, or configs.
         *
         * @default []
         */
        dependencies?: {
            /**
             * The UUID of the theme, plugin, or config dependency.
             *
             * Must be a valid UUID.
             *
             * May also be the UUID of a built-in theme or plugin to force the user to have it enabled to use the theme.
             *
             * @example "39a5d251-b6e0-47db-92d1-317eaa7dfe44"
             */
            uuid: string;
            /**
             * The version of the theme, plugin, or config dependency.
             *
             * Must be a valid semver string, without the leading `v`.
             *
             * @example "3.17.4-preview.20+BUILD.5"
             */
            version: string;
        }[];
        /**
         * The authors of the config.
         *
         * @example ["8Crafter", "StormStqr"]
         */
        authors?: string[];
        /**
         * The URL of the website for the config, or just the config creator's website.
         *
         * @example "https://www.8crafter.com"
         */
        url?: string;
        /**
         * The product type.
         *
         * @example "config"
         */
        product_type: "config";
        /**
         * The license of the config.
         */
        license?: string;
        /**
         * Any other metadata you want to add.
         */
        [key: string]: unknown;
    };
    /**
     * The details of the config in the marketplace.
     *
     * This is only used if the config is from the marketplace.
     *
     * This should not be included when uploading the config to the marketplace, as the server will handle adding this information.
     *
     * This is mutually exclusive with {@link checkForUpdatesDetails}.
     */
    marketplaceDetails?: {
        /**
         * The id of the config in the marketplace.
         *
         * Format:
         * ```typescript
         * `${configPublisher}.${id}`
         * ```
         *
         * @example "8crafer.my-custom-config"
         */
        marketplaceId: string;
        /**
         * The original download URL of the config in the marketplace.
         *
         * @example "https://marketplace.ore-ui-customizer.8crafter.com/download/config/8crafer.my-custom-config/1.0.0"
         */
        originalDownloadURL: string;
        /**
         * The URL of the config in the marketplace.
         *
         * @example "https://marketplace.ore-ui-customizer.8crafter.com/config/8crafer.my-custom-config"
         */
        marketplaceURL: string;
    };
    /**
     * The details of the config to check for updates.
     *
     * This is only used if the config is not from the marketplace.
     *
     * This allows non-marketplace configs to be checked for updates.
     *
     * This is mutually exclusive with {@link marketplaceDetails}.
     */
    checkForUpdatesDetails?: {
        /**
         * The URL to the JSON object containing the newest version of the config.
         *
         * The JSON object should have the following structure:
         * ```json
         * {
         *     // The version of the config.
         *     "version": "1.0.1-rc.5",
         *     // The download URL of the config.
         *     "url": "https://example.com/ore-ui-customizer-configs/my-custom-config/1.0.1-rc.5/myCustomConfig.ouicconfig"
         * }
         * ```
         *
         * When fetching the URL, the response should have an MIME type of `application/json` or `text/json`.
         *
         * @example "https://example.com/ore-ui-customizer-configs/my-custom-config/latestVersion.json"
         */
        versionInfoURL: string;
    };
}

/**
 * The legacy pre-v1.0.0 JSON format for the configs for 8Crafter's Ore UI Customizer.
 *
 * @deprecated
 */
export interface LegacyOreUICustomizerConfigJSON extends Partial<OreUICustomizerSettings> {
    /**
     * The version of 8Crafter's Ore UI Customizer.
     */
    format_version: string;
}

/**
 * A plugin for 8Crafter's Ore UI Customizer.
 */
export interface Plugin extends Pick<PluginManifestJSON, "marketplaceDetails" | "checkForUpdatesDetails"> {
    /**
     * The display name of the plugin.
     */
    name: string;
    /**
     * The id of the plugin, used to identify the plugin when applying the plugins, also used to identify the plugin in error messages, this should be unique.
     *
     * Must consist only of alphanumeric characters, underscores, hyphens, and periods.
     */
    id: string;
    /**
     * The UUID of the plugin, used to uniquely identify the plugin.
     *
     * Must be a valid UUID.
     *
     * @example "39a5d251-b6e0-47db-92d1-317eaa7dfe44"
     */
    uuid: string;
    /**
     * The namespace of the plugin, used in conjunction with the {@link id} to identify the plugin in error messages.
     *
     * Must consist only of alphanumeric characters, underscores, hyphens, and periods.
     *
     * Must not be `built-in`, as it is reserved for built-in plugins.
     */
    namespace: string;
    /**
     * An optional description of the plugin.
     */
    description?: string;
    /**
     * The version of the plugin.
     *
     * This must be a valid semver string, without the leading `v`.
     *
     * @example "3.17.4-preview.20+BUILD.5"
     */
    version: string;
    /**
     * The actions of the plugin.
     */
    actions: PluginAction[];
    /**
     * The version of 8Crafter's Ore UI Customizer that this plugin is made for.
     *
     * This must be a valid semver string, without the leading `v`.
     *
     * @example "1.0.0"
     */
    format_version: string;
    /**
     * The minimum version of 8Crafter's Ore UI Customizer that this plugin is compatible with.
     *
     * This must be a valid semver string, without the leading `v`.
     *
     * If not specified, no check will be done.
     *
     * @example "1.0.0"
     */
    min_engine_version?: string;
    /**
     * The data URI of the icon of the plugin.
     *
     * If not specified the default icon will be used.
     *
     * The MIME type must match `image/*`.
     *
     * @example "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
     */
    icon_data_uri?: `data:image/${string};base64,${string}`;
    /**
     * The dependencies of the plugin.
     */
    dependencies?: PluginManifestJSON["dependencies"];
    /**
     * Additonal metadata about the plugin.
     */
    metadata?: {
        /**
         * The authors of the plugin.
         *
         * @example ["8Crafter", "StormStqr"]
         */
        authors?: string[];
        /**
         * The URL of the website for the plugin, or just the plugin creator's website.
         *
         * @example "https://www.8crafter.com"
         */
        url?: string;
        /**
         * The type of the plugin.
         *
         * @example "plugin"
         */
        product_type?: "plugin";
        /**
         * The license of the plugin
         */
        license?: string;
        /**
         * Any other metadata you want to add.
         */
        [key: string]: unknown;
    };
}

/**
 * The type of the value of the exported `plugin` variable of the script listed as the {@linkcode PluginManifestJSON.entry | entry} of a plugin's {@linkcode PluginManifestJSON | manifest.json} file.
 */
export type PluginEntryScriptPlugin = Pick<Plugin, "actions">;

/**
 * The context of a {@link PluginAction}.
 */
export type PluginActionContext = "per_text_file" | "per_binary_file" | "global_before" | "global";

/**
 * The base interface for an action for a {@link Plugin}.
 */
export interface PluginActionBase {
    /**
     * The id of the plugin action, used to identify the plugin action in error messages, this should be unique.
     *
     * Must consist only of alphanumeric characters, underscores, hyphens, and periods.
     */
    id: string;
    /**
     * The context of the plugin action.
     *
     * - `per_text_file`: The plugin action is run once per file, with the file passed into the plugin action. This only targets files with text content. It currently targets the following file types: `.txt`, `.md`, `.js`, `.jsx`, `.html`, `.css`, `.json`, `.jsonc`, `.jsonl`.
     * - `per_binary_file`: The plugin action is run once per file, with the file passed into the plugin action. This only targets files with non-text content. It currently targets all file types except for the following file types: `.txt`, `.md`, `.js`, `.jsx`, `.html`, `.css`, `.json`, `.jsonc`, `.jsonl`.
     * - `global_before`: The plugin action is before the other plugin actions have been run, with the zip file system object passed into the plugin action.
     * - `global`: The plugin action is run once all other plugin actions have been run, with the zip file system object passed into the plugin action.
     */
    context: PluginActionContext;
    /**
     * The action to run.
     */
    action: PluginAction["action"];
}

/**
 * An action for a {@link Plugin} with a context of `per_text_file`.
 */
export interface PerTextFilePluginAction extends PluginActionBase {
    context: "per_text_file";
    /**
     * The action to run.
     *
     * @async
     * @param {string} currentFileContent The current text content of the file as a string, with the modifications made by the previously executed plugin actions, modifications should be applied to this content.
     * @param {zip.ZipFileEntry<any, any>} file The file.
     * @param {zip.FS} zip The zip file system.
     * @returns {string | Promise<string>} The new text content of the file as a string, or a promise resolving to a string.
     * @throws {Error} If the action is unable to do what it needs to, make it throw an error.
     */
    action: (currentFileContent: string, file: zip.ZipFileEntry<any, any>, zip: zip.FS) => string | Promise<string>;
}
/**
 * An action for a {@link Plugin} with a context of `per_binary_file`.
 */
export interface PerBinaryFilePluginAction extends PluginActionBase {
    context: "per_binary_file";
    /**
     * The action to run.
     *
     * @async
     * @param {Blob} currentFileContent The current binary content of the file, as a {@link Blob}, with the modifications made by the previously executed plugin actions, modifications should be applied to this content.
     * @param {zip.ZipFileEntry<any, any>} file The file.
     * @param {zip.FS} zip The zip file system.
     * @returns {Blob | Promise<Blob>} The new binary content of the file as a {@link Blob}, or a promise resolving to a {@link Blob}.
     * @throws {Error} If the action is unable to do what it needs to, make it throw an error.
     */
    action: (currentFileContent: Blob, file: zip.ZipFileEntry<any, any>, zip: zip.FS) => Blob | Promise<Blob>;
}
/**
 * An action for a {@link Plugin} with a context of `global_before`.
 *
 * @todo Make this plugin context type functional.
 */
export interface GlobalBeforePluginAction extends PluginActionBase {
    context: "global_before";
    /**
     * The action to run.
     *
     * @async
     * @param {zip.FS} zip The zip file system.
     * @returns {void | Promise<void>} A promise that resolves when the action is complete, or nothing.
     * @throws {Error} If the action is unable to do what it needs to, make it throw an error.
     */
    action(zip: zip.FS): void | Promise<void>;
}
/**
 * An action for a {@link Plugin} with a context of `global`.
 *
 * @todo Make this plugin context type functional.
 */
export interface GlobalPluginAction extends PluginActionBase {
    context: "global";
    /**
     * The action to run.
     *
     * @async
     * @param {zip.FS} zip The zip file system.
     * @returns {void | Promise<void>} A promise that resolves when the action is complete, or nothing.
     * @throws {Error} If the action is unable to do what it needs to, make it throw an error.
     */
    action(zip: zip.FS): void | Promise<void>;
}

/**
 * An action for a {@link Plugin}.
 */
export type PluginAction = PerTextFilePluginAction | PerBinaryFilePluginAction | GlobalBeforePluginAction | GlobalPluginAction;

/**
 * The ID of a built-in plugin.
 */
export type BuiltInPluginID = "add-exact-ping-count-to-servers-tab" | "add-max-player-count-to-servers-tab" | "facet-spy";

export type { zip } from "./zip.js";
