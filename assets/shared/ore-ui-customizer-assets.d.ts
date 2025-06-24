/**
 * An interface that contains the settings for 8Crafter's Ore UI Customizer.
 */
export interface OreUICustomizerSettings {
    /**
     * This will allow you to turn hardcore mode on and off whenever you want.
     *
     * @type {boolean}
     */
    hardcoreModeToggleAlwaysClickable: boolean;
    /**
     * This will allow you to disable the experimental toggles even after the world has been played with them on, also applies to the `Education Edition` toggle.
     *
     * @type {boolean}
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
     * @type {boolean}
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
     * @type {boolean}
     */
    addMoreDefaultGameModes: boolean;
    /**
     * This will allow you to change the world seed whenever you want, also works on marketplace worlds that don't let you change the seed.
     *
     * @type {boolean}
     */
    allowForChangingSeeds: boolean;
    /**
     * This will allow you to change the flat world preset, even after the world has been created.
     *
     * Note: This option requires that the {@link addGeneratorTypeDropdown} option is enabled.
     *
     * @type {boolean}
     */
    allowForChangingFlatWorldPreset: any;
    /**
     * If specified, this will override the max length of every text box to be the specified value.
     *
     * Leave it blank to not override it.
     *
     * @type {`${number}` | ""}
     */
    maxTextLengthOverride: `${number}` | "";
    /**
     * This adds the `Debug` tab to the create and edit world screens.
     *
     * It also has a bunch of additional options added to the tab that aren't normally in there.
     *
     * @type {boolean}
     */
    addDebugTab: boolean;
    /**
     * This adds a button in the top right of the screen on the title bar to get access to the 8Crafter Utilities menu, this allows you to access certain menus without a keyboard shortcut, and has information and the auto rejoiner menu.
     *
     * @type {boolean}
     */
    add8CrafterUtilitiesMainMenuButton: boolean;
    /**
     * An object that lists whether or not each built in plugin is enabled.
     *
     * @type {Record<typeof builtInPlugins[number]["id"], boolean>}
     */
    enabledBuiltInPlugins: Record<(typeof builtInPlugins)[number]["id"], boolean>;
    /**
     * These are replacements for the UI colors.
     *
     * @type {Record<string, string>}
     *
     * @todo Make this functional.
     */
    colorReplacements: {
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
     * @default []
     */
    plugins?: EncodedPluginData[];
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
     * The namespace of the plugin, used to identify the plugin in error messages.
     *
     * Must consist only of alphanumeric characters, underscores, hyphens, and periods.
     *
     * Must not be `built-in`, as it is reserved for built-in plugins.
     */
    namespace: string;
    /**
     * The version of the plugin.
     *
     * This must be a valid semver string, without the leading `v`.
     */
    version: string;
    /**
     * The version of 8Crafter's Ore UI Customizer that this plugin is made for.
     *
     * This must be a valid semver string, without the leading `v`.
     */
    format_version: string;
    /**
     * The minimum version of 8Crafter's Ore UI Customizer that this plugin is compatible with.
     *
     * This must be a valid semver string, without the leading `v`.
     *
     * If not specified, no check will be done.
     */
    min_engine_version?: string;
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
}
/**
 * The default settings for 8Crafter's Ore UI Customizer.
 */
export declare const defaultOreUICustomizerSettings: OreUICustomizerSettings;
/**
 * Converts a blob to a data URI.
 *
 * @param {Blob} blob The blob to convert.
 * @returns {Promise<`data:${string};base64,${string}`>} A promise resolving with the data URI.
 */
export declare function blobToDataURI(blob: Blob): Promise<`data:${string};base64,${string}`>;
/**
 * Imports a plugin from a data URI.
 *
 * @param {string} dataURI The data URI to import the plugin from.
 * @param {"js" | "mcouicplugin"} [type="js"] The type of the plugin to import.
 * @returns {Promise<Plugin>} A promise resolving with the imported plugin.
 *
 * @throws {TypeError} If the plugin type is not supported.
 */
export declare function importPluginFromDataURI(dataURI: string, type?: "js" | "mcouicplugin"): Promise<Plugin>;
/**
 * Validates a plugin file.
 *
 * @param {Blob} plugin The plugin file to validate.
 * @param {"mcouicplugin" | "js"} type The type of the plugin file.
 * @returns {Promise<void>} A promise resolving to `void` when the plugin file is validated.
 *
 * @throws {TypeError} If the plugin type is not supported.
 * @throws {TypeError | SyntaxError} If the plugin is not valid.
 */
export declare function validatePluginFile(plugin: Blob, type: "mcouicplugin" | "js"): Promise<void>;
/**
 * Validates a plugin object.
 *
 * @param {any} plugin The plugin object to validate.
 * @returns {asserts plugin is Plugin} Asserts that the plugin object is valid. If it is not valid, throws an error. Otherwise, returns `void`.
 */
export declare function validatePluginObject(plugin: any): asserts plugin is Plugin;
/**
 * An interface that contains extracted symbol names from the compiled Ore UI react code.
 */
export interface ExtractedSymbolNames {
    /**
     * The function name for the translation string resolver.
     *
     * @default "wi"
     */
    translationStringResolver: string;
    /**
     * The function name for the header function.
     *
     * @default "fu"
     */
    headerFunciton: string;
    /**
     * The function name for the header spacing function.
     *
     * @default "Gc"
     */
    headerSpacingFunction: string;
    /**
     * The function name for the edit world text function.
     *
     * @default "Dk"
     */
    editWorldTextFunction: string;
    /**
     * The function name for the JS text.
     *
     * @default "js"
     */
    jsText: string;
    /**
     * The function name for the navbar button function.
     *
     * @default "lc"
     */
    navbarButtonFunction: string;
    /**
     * The function name for the navbar button image function.
     *
     * @default "xc"
     */
    navbarButtonImageFunction: string;
    /**
     * The function name for the context holder.
     *
     * @default "a"
     */
    contextHolder: string;
    /**
     * The function name for the facet holder.
     *
     * @default "r"
     */
    facetHolder: string;
}
/**
 * Extracts the symbol names from the given file contents for the Ore UI Customizer.
 *
 * @param {string} fileContents The file contents.
 * @returns {ExtractedSymbolNames} The extracted symbol names.
 */
export declare function getExtractedSymbolNames(fileContents: string): ExtractedSymbolNames;
/**
 * Extracts the regexes for the replacer function for the Ore UI Customizer.
 *
 * @param {ReturnType<typeof getExtractedSymbolNames>} extractedSymbolNames The extracted function names from the {@link getExtractedSymbolNames} function.
 * @returns An object containing the regexes for the replacer function.
 */
export declare function getReplacerRegexes(extractedSymbolNames: ReturnType<typeof getExtractedSymbolNames>): {
    /**
     * Make the hardcore mode toggle always clickable.
     *
     * ### Minecraft version support:
     *
     * #### Fully Supported:
     * - 1.21.70/71/72 (index-d6df7.js)
     * - 1.21.70/71/72 dev (index-1fd56.js)
     * - 1.21.80.20/21/22 preview (index-1da13.js)
     * - 1.21.80.25 preview (index-b3e96.js)
     * - 1.21.80.27/28 preview (index-07a21.js)
     * - 1.21.80.3 (index-07a21.js)
     * - 1.21.90.20 preview (index-fe5c0.js)
     *
     * #### Partially Supported:
     *
     * #### Not Supported:
     * - < 1.21.70
     * - 1.21.90.21 preview (index-aaad2.js)
     *
     * #### Support Unknown:
     * - \> 1.21.90.21 preview (index-aaad2.js)
     */
    readonly hardcoreModeToggleAlwaysClickable: {
        /**
         * Replacing the hardcore mode toggle (v1).
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.70/71/72 (index-d6df7.js)
         * - 1.21.70/71/72 dev (index-1fd56.js)
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - < 1.21.70
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * #### Support Unknown:
         * - \> 1.21.90.21 preview (index-aaad2.js)
         */
        readonly 0: readonly [RegExp];
    };
    /**
     * Allow for disabling the experimental toggles even after the world has been played with them on, also applies to the `Education Edition` toggle.
     *
     * ### Minecraft version support:
     *
     * #### Fully Supported:
     * - 1.21.70/71/72 (index-d6df7.js)
     * - 1.21.70/71/72 dev (index-1fd56.js)
     * - 1.21.80.20/21/22 preview (index-1da13.js)
     * - 1.21.80.25 preview (index-b3e96.js)
     * - 1.21.80.27/28 preview (index-07a21.js)
     * - 1.21.80.3 (index-07a21.js)
     * - 1.21.90.20 preview (index-fe5c0.js)
     *
     * #### Partially Supported:
     *
     * #### Not Supported:
     * - < 1.21.70
     * - 1.21.90.21 preview (index-aaad2.js)
     *
     * #### Support Unknown:
     * - \> 1.21.90.21 preview (index-aaad2.js)
     */
    readonly allowDisablingEnabledExperimentalToggles: {
        /**
         * Replacing experimental toggle generation code (v1).
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.70/71/72 (index-d6df7.js)
         * - 1.21.70/71/72 dev (index-1fd56.js)
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - < 1.21.70
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * #### Support Unknown:
         * - \> 1.21.90.21 preview (index-aaad2.js)
         */
        readonly 0: readonly [RegExp];
    };
    /**
     * Make the hardcore mode toggle always clickable (v1).
     *
     * ### Minecraft version support:
     *
     * #### Fully Supported:
     * - 1.21.70/71/72 (index-d6df7.js)
     * - 1.21.70/71/72 dev (index-1fd56.js)
     * - 1.21.80.20/21/22 preview (index-1da13.js)
     * - 1.21.80.25 preview (index-b3e96.js)
     * - 1.21.80.27/28 preview (index-07a21.js)
     * - 1.21.80.3 (index-07a21.js)
     * - 1.21.90.20 preview (index-fe5c0.js)
     *
     * #### Partially Supported:
     * - 1.21.90.21 preview (index-aaad2.js)
     *
     * #### Not Supported:
     * - < 1.21.70
     *
     * #### Support Unknown:
     * - \> 1.21.90.21 preview (index-aaad2.js)
     */
    readonly addMoreDefaultGameModes: {
        /**
         * Replacing game mode dropdown code (v1).
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.70/71/72 (index-d6df7.js)
         * - 1.21.70/71/72 dev (index-1fd56.js)
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - < 1.21.70
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * #### Support Unknown:
         * - \> 1.21.90.21 preview (index-aaad2.js)
         */
        readonly 0: readonly [RegExp];
        /**
         * Replacing game mode id enumeration (v1).
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.70/71/72 (index-d6df7.js)
         * - 1.21.70/71/72 dev (index-1fd56.js)
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - < 1.21.70
         *
         * #### Support Unknown:
         * - \> 1.21.90.21 preview (index-aaad2.js)
         */
        readonly 1: readonly [RegExp];
    };
    /**
     * Add the generator type dropdown to the advanced tab of the create and edit world screens.
     *
     * ### Minecraft version support:
     *
     * #### Fully Supported:
     * - 1.21.70/71/72 (index-d6df7.js)
     * - 1.21.70/71/72 dev (index-1fd56.js)
     * - 1.21.80.20/21/22 preview (index-1da13.js)
     * - 1.21.80.25 preview (index-b3e96.js)
     * - 1.21.80.27/28 preview (index-07a21.js)
     * - 1.21.80.3 (index-07a21.js)
     * - 1.21.90.20 preview (index-fe5c0.js)
     *
     * #### Partially Supported:
     * - 1.21.90.21 preview (index-aaad2.js)
     *
     * #### Not Supported:
     * - < 1.21.70
     *
     * #### Support Unknown:
     * - \> 1.21.90.21 preview (index-aaad2.js)
     */
    readonly addGeneratorTypeDropdown: {
        /**
         * Adding the generator type dropdown (v1).
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.70/71/72 (index-d6df7.js)
         * - 1.21.70/71/72 dev (index-1fd56.js)
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - < 1.21.70
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * #### Support Unknown:
         * - \> 1.21.90.21 preview (index-aaad2.js)
         */
        readonly 0: readonly [RegExp];
        /**
         * Replacing generator type id enumeration (v1).
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.70/71/72 (index-d6df7.js)
         * - 1.21.70/71/72 dev (index-1fd56.js)
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - < 1.21.70
         *
         * #### Support Unknown:
         * - \> 1.21.90.21 preview (index-aaad2.js)
         */
        readonly 1: readonly [RegExp];
    };
    /**
     * Allow for changing the seed in the edit world screen (v1).
     *
     * ### Minecraft version support:
     *
     * #### Fully Supported:
     * - 1.21.70/71/72 (index-d6df7.js)
     * - 1.21.70/71/72 dev (index-1fd56.js)
     * - 1.21.80.20/21/22 preview (index-1da13.js)
     * - 1.21.80.25 preview (index-b3e96.js)
     * - 1.21.80.27/28 preview (index-07a21.js)
     * - 1.21.80.3 (index-07a21.js)
     * - 1.21.90.20 preview (index-fe5c0.js)
     * - 1.21.90.21 preview (index-aaad2.js)
     *
     * #### Partially Supported:
     *
     * #### Not Supported:
     * - < 1.21.70
     *
     * #### Support Unknown:
     * - \> 1.21.90.21 preview (index-aaad2.js)
     */
    readonly allowForChangingSeeds: {
        /**
         * Replacing the seed text box in the advanced edit world tab (v1).
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.70/71/72 (index-d6df7.js)
         * - 1.21.70/71/72 dev (index-1fd56.js)
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - < 1.21.70
         *
         * #### Support Unknown:
         * - \> 1.21.90.21 preview (index-aaad2.js)
         */
        readonly 0: readonly [RegExp];
    };
    /**
     * Allow for changing the flat world preset in the advanced tab of the edit world screen.
     *
     * ### Minecraft version support:
     *
     * #### Fully Supported:
     * - 1.21.80.20/21/22 preview (index-1da13.js)
     * - 1.21.80.25 preview (index-b3e96.js)
     * - 1.21.80.27/28 preview (index-07a21.js)
     * - 1.21.80.3 (index-07a21.js)
     * - 1.21.90.20 preview (index-fe5c0.js)
     * - 1.21.90.21 preview (index-aaad2.js)
     *
     * #### Partially Supported:
     *
     * #### Not Supported:
     * - < 1.21.80.20 preview (index-1da13.js)
     * - < 1.21.80.3 (index-07a21.js)
     *
     * #### Support Unknown:
     * - \> 1.21.90.21 preview (index-aaad2.js)
     */
    readonly allowForChangingFlatWorldPreset: {
        /**
         * Make the flat world toggle and preset selector always enabled in the advanced tab of the edit world screen.
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - < 1.21.80.20 preview (index-1da13.js)
         * - < 1.21.80.3 (index-07a21.js)
         *
         * #### Support Unknown:
         * - \> 1.21.90.21 preview (index-aaad2.js)
         */
        readonly 0: readonly [RegExp];
        /**
         * Make the dropdown for the flat world preset selector always visible when the flat world toggle is enabled in the advanced tab of the edit world screen.
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - < 1.21.80.20 preview (index-1da13.js)
         * - < 1.21.80.3 (index-07a21.js)
         *
         * #### Support Unknown:
         * - \> 1.21.90.21 preview (index-aaad2.js)
         */
        readonly 1: readonly [RegExp];
    };
    /**
     * Adds the debug tab to the create and edit world screens.
     *
     * ### Minecraft version support:
     *
     * #### Fully Supported:
     * - 1.21.70/71/72 (index-d6df7.js)
     * - 1.21.70/71/72 dev (index-1fd56.js)
     * - 1.21.80.20/21/22 preview (index-1da13.js)
     * - 1.21.80.27/28 preview (index-07a21.js)
     * - 1.21.80.3 (index-07a21.js)
     * - 1.21.90.20 preview (index-fe5c0.js)
     *
     * #### Partially Supported:
     * - 1.21.60/61/62 (index-41cdf.js) {Only adds debug tab, does not modify it.}
     * - 1.21.60.27/28 preview (index-41cdf.js) {Only adds debug tab, does not modify it.}
     * - 1.21.80.25 preview (index-b3e96.js) {Only adds debug tab, does not modify it.}
     * - 1.21.90.21 preview (index-aaad2.js) {Only adds debug tab, does not modify it.}
     *
     * #### Not Supported:
     * - < 1.21.60
     *
     * ## Support Unknown:
     * - \> 1.21.90.21 preview (index-aaad2.js)
     */
    readonly addDebugTab: {
        /**
         * Replacing the debug tab of the create and edit world screens (v1).
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.70/71/72 (index-d6df7.js)
         * - 1.21.70/71/72 dev (index-1fd56.js)
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - < 1.21.70
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * ## Support Unknown:
         * - \> 1.21.90.21 preview (index-aaad2.js)
         * - 1.21.70.xx preview
         */
        readonly 0: readonly [RegExp];
        /**
         * Unhiding the debug tab of the create and edit world screens (v1).
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.60/61/62 (index-41cdf.js)
         * - 1.21.60.27/28 preview (index-41cdf.js)
         * - 1.21.70/71/72 (index-d6df7.js)
         * - 1.21.70/71/72 dev (index-1fd56.js)
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - < 1.21.60
         *
         * #### Support Unknown:
         * - \> 1.21.90.21 preview (index-aaad2.js)
         * - 1.21.70.xx preview
         */
        readonly 1: readonly [RegExp];
    };
    /**
     * Add the 8Crafter Utilities main menu button to the top right corner of the screen, in the navbar.
     *
     * ### Minecraft version support:
     *
     * #### Fully Supported:
     * - 1.21.70/71/72 (index-d6df7.js)
     * - 1.21.70/71/72 dev (index-1fd56.js)
     * - 1.21.80.20/21/22 preview (index-1da13.js)
     * - 1.21.80.25 preview (index-b3e96.js)
     * - 1.21.80.27/28 preview (index-07a21.js)
     * - 1.21.80.3 (index-07a21.js)
     * - 1.21.90.20 preview (index-fe5c0.js)
     *
     * #### Partially Supported:
     *
     * #### Not Supported:
     * - < 1.21.70
     * - 1.21.90.21 preview (index-aaad2.js)
     *
     * #### Support Unknown:
     * - \> 1.21.90.21 preview (index-aaad2.js)
     */
    readonly add8CrafterUtilitiesMainMenuButton: {
        /**
         * Adding the 8Crafter Utilities main menu button to the top right corner of the screen, in the navbar (v1).
         *
         * ### Minecraft version support:
         *
         * #### Fully Supported:
         * - 1.21.60/61/62 (index-41cdf.js)
         * - 1.21.60.27/28 preview (index-41cdf.js)
         * - 1.21.70/71/72 (index-d6df7.js)
         * - 1.21.70/71/72 dev (index-1fd56.js)
         * - 1.21.80.20/21/22 preview (index-1da13.js)
         * - 1.21.80.25 preview (index-b3e96.js)
         * - 1.21.80.27/28 preview (index-07a21.js)
         * - 1.21.80.3 (index-07a21.js)
         * - 1.21.90.20 preview (index-fe5c0.js)
         *
         * #### Partially Supported:
         *
         * #### Not Supported:
         * - 1.21.90.21 preview (index-aaad2.js)
         *
         * #### Support Unknown:
         * - < 1.21.60
         * - \> 1.21.90.21 preview (index-aaad2.js)
         * - 1.21.70.xx preview
         */
        readonly 0: readonly [RegExp];
    };
};
/**
 * A plugin for 8Crafter's Ore UI Customizer.
 */
export interface Plugin {
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
     * The namespace of the plugin, used to identify the plugin in error messages.
     *
     * Must consist only of alphanumeric characters, underscores, hyphens, and periods.
     *
     * Must not be `built-in`, as it is reserved for built-in plugins.
     */
    namespace: string;
    /**
     * The version of the plugin.
     *
     * This must be a valid semver string, without the leading `v`.
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
     */
    format_version: string;
    /**
     * The minimum version of 8Crafter's Ore UI Customizer that this plugin is compatible with.
     *
     * This must be a valid semver string, without the leading `v`.
     *
     * If not specified, no check will be done.
     */
    min_engine_version?: string;
}
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
    action: (zip: zip.FS) => void | Promise<void>;
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
    action: (zip: zip.FS) => void | Promise<void>;
}
/**
 * An action for a {@link Plugin}.
 */
export type PluginAction = PerTextFilePluginAction | PerBinaryFilePluginAction | GlobalBeforePluginAction | GlobalPluginAction;
/**
 * The built-in plugins.
 */
export declare const builtInPlugins: [{
    readonly name: "Add exact ping count to servers tab.";
    readonly id: "add-exact-ping-count-to-servers-tab";
    readonly namespace: "built-in";
    readonly version: "0.25.0";
    readonly actions: [{
        readonly id: "add-exact-ping-count-to-servers-tab";
        readonly context: "per_text_file";
        readonly action: (currentFileContent: string, file: zip.ZipFileEntry<any, any>) => Promise<string>;
    }];
    readonly format_version: "0.25.0";
    readonly min_engine_version: "0.25.0";
}, {
    readonly name: "Add max player count to servers tab.";
    readonly id: "add-max-player-count-to-servers-tab";
    readonly namespace: "built-in";
    readonly version: "0.25.0";
    readonly actions: [{
        readonly id: "add-max-player-count-to-servers-tab";
        readonly context: "per_text_file";
        readonly action: (currentFileContent: string, file: zip.ZipFileEntry<any, any>) => Promise<string>;
    }];
    readonly format_version: "0.25.0";
    readonly min_engine_version: "0.25.0";
}];
