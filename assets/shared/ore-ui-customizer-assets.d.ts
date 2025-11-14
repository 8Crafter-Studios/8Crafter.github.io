import "./zip.js";
import type { OreUICustomizerSettings, Plugin } from "ore-ui-customizer-types";
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
declare global {
    namespace globalThis {
        /**
         * Joins paths, works like `path.join`.
         *
         * @param input The paths to join.
         * @returns The joined path.
         */
        function joinPath(...input: string[]): string;
    }
}
/**
 * Imports a plugin from a data URI.
 *
 * @param {string} dataURI The data URI to import the plugin from.
 * @param {"js" | "mcouicplugin"} [type="js"] The type of the plugin to import.
 * @returns {Promise<Plugin>} A promise resolving with the imported plugin.
 *
 * @throws {TypeError} If the plugin type is not supported.
 *
 * @todo Add support for relative script imports in the scripts of .mcouicplugin files, use RollupJS, also use the `rollup-plugin-typescript2` RollupJS plugin to allow for typescript.
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
 * @throws {TypeError | SyntaxError | ReferenceError | EvalError} If the plugin is not valid.
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
        readonly 1: readonly [{
            readonly regex: RegExp;
            readonly replacement: `return ${string}.createElement(${string}.Fragment,null,${string}.createElement(${string}.Mount,{when:false},${string}.createElement($1,{onChange:$2,value:$3,title:$4(".useFlatWorldTitle"),description:$4(".useFlatWorldDescription"),disabled:$5,offNarrationText:$6,onNarrationText:$7,narrationSuffix:$8})),${string}.createElement(${string}.Mount,{when:false,condition:!1},${string}.createElement($9,{title:$4(".useFlatWorldTitle"),description:$4(".useFlatWorldDescription"),value:$3,onChange:$2,disabled:$5,narrationSuffix:$8,offNarrationText:$6,onNarrationText:$7,onExpandNarrationHint:$10},${string}.createElement($11,{title:$12(".title"),customSelectionDescription:${string}.createElement($13,{preset:$14}),options:$15,value:$16,onItemSelect:e=>$17($18[e]),disabled:$5,wrapperRole:"neutral80",indented:!0,dropdownNarrationSuffix:$19}))))`;
        }, {
            readonly regex: RegExp;
            readonly replacement: "return $1.createElement($2,{data:$3},($4=>false /* $5 */ ?$6.createElement($7,{onChange:$8,value:$9,title:$10(\".useFlatWorldTitle\"),description:$11(\".useFlatWorldDescription\"),disabled:$12,offNarrationText:$13,onNarrationText:$14,narrationSuffix:$15}):$16.createElement($17,{title:$18(\".useFlatWorldTitle\"),description:$19(\".useFlatWorldDescription\"),value:$20,onChange:$21,disabled:$22,narrationSuffix:$23,offNarrationText:$24,onNarrationText:$25,onExpandNarrationHint:$26},$27.createElement($28,{title:$29(\".title\"),customSelectionDescription:$30.createElement($31,{selectedPreset:$32,selectedPresetID:$33}),options:$34,value:$35,onItemSelect:$36=>$37($38[$39]),disabled:$40,wrapperRole:\"neutral80\",indented:!0,dropdownNarrationSuffix:$41}))))}";
        }];
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
        readonly 1: readonly [{
            readonly regex: RegExp;
            readonly replacement: "$1.push($2),";
        }, {
            readonly regex: RegExp;
            readonly replacement: "[{label:\".debugTabLabel\",image:RB.DebugIcon,value:\"debug\"}]";
        }];
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
 * The built-in plugins.
 */
export declare const builtInPlugins: [{
    readonly name: "Add exact ping count to servers tab.";
    readonly id: "add-exact-ping-count-to-servers-tab";
    readonly namespace: "built-in";
    readonly version: "1.0.0";
    readonly uuid: "a1ffa1f2-a8d1-4948-a307-4067d4a82880";
    readonly description: "A built-in plugin that adds the exact ping count to the servers tab.";
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
    readonly version: "1.0.0";
    readonly uuid: "09b88cde-e265-4f42-b203-564f0df6ca1e";
    readonly description: "A built-in plugin that adds the max player count to the servers tab.";
    readonly actions: [{
        readonly id: "add-max-player-count-to-servers-tab";
        readonly context: "per_text_file";
        readonly action: (currentFileContent: string, file: zip.ZipFileEntry<any, any>) => Promise<string>;
    }];
    readonly format_version: "0.25.0";
    readonly min_engine_version: "0.25.0";
}, {
    readonly name: "Facet spy.";
    readonly id: "facet-spy";
    readonly namespace: "built-in";
    readonly version: "1.1.0";
    readonly uuid: "e2355295-b202-4f4b-96b8-7bd7b6eaac23";
    readonly description: "Facet spy.";
    readonly actions: [{
        readonly id: "inject-facet-spy";
        readonly context: "per_text_file";
        readonly action: (currentFileContent: string, file: zip.ZipFileEntry<any, any>) => Promise<string>;
    }, {
        readonly id: "inject-into-routes";
        readonly context: "per_text_file";
        readonly action: (currentFileContent: string, file: zip.ZipFileEntry<any, any>) => Promise<string>;
    }];
    readonly format_version: "1.0.0";
    readonly min_engine_version: "1.0.0";
}];
