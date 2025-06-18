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
    add8CrafterUtilitiesMainMenuButton: boolean;
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
}
/**
 * The default settings for 8Crafter's Ore UI Customizer.
 */
export declare const defaultOreUICustomizerSettings: OreUICustomizerSettings;
/**
 * Extracts the function names from the given file contents for the Ore UI Customizer.
 *
 * @param {string} fileContents The file contents.
 * @returns The extracted function names.
 */
export declare function getExtractedFunctionNames(fileContents: string): {
    translationStringResolver: string;
    headerFunciton: string;
    headerSpacingFunction: string;
    editWorldTextFunction: string;
    jsText: string;
    navbarButtonFunction: string;
    navbarButtonImageFunction: string;
};
/**
 * Extracts the regexes for the replacer function for the Ore UI Customizer.
 *
 * @param {ReturnType<typeof getExtractedFunctionNames>} extractedFunctionNames The extracted function names from the {@link getExtractedFunctionNames} function.
 * @returns An object containing the regexes for the replacer function.
 */
export declare function getReplacerRegexes(extractedFunctionNames: ReturnType<typeof getExtractedFunctionNames>): {
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
