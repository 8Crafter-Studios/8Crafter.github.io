/**
 * The default settings for 8Crafter's Ore UI Customizer.
 */
export const defaultOreUICustomizerSettings = {
    /**
     * This will allow you to turn hardcore mode on and off whenever you want.
     *
     * @type {boolean}
     */
    hardcoreModeToggleAlwaysClickable: true,
    /**
     * This will allow you to disable the experimental toggles even after the world has been played with them on, also applies to the `Education Edition` toggle.
     *
     * @type {boolean}
     */
    allowDisablingEnabledExperimentalToggles: true,
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
    addGeneratorTypeDropdown: true,
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
    addMoreDefaultGameModes: true,
    /**
     * This will allow you to change the world seed whenever you want, also works on marketplace worlds that don't let you change the seed.
     *
     * @type {boolean}
     */
    allowForChangingSeeds: true,
    /**
     * This will allow you to change the flat world preset, even after the world has been created.
     *
     * Note: This option requires that the {@link addGeneratorTypeDropdown} option is enabled.
     *
     * @type {boolean}
     */
    allowForChangingFlatWorldPreset: true,
    /**
     * If specified, this will override the max length of every text box to be the specified value.
     *
     * Leave it blank to not override it.
     *
     * @type {`${number}` | ""}
     */
    maxTextLengthOverride: "1000000",
    /**
     * This adds the `Debug` tab to the create and edit world screens.
     *
     * It also has a bunch of additional options added to the tab that aren't normally in there.
     *
     * @type {boolean}
     */
    addDebugTab: true,
    add8CrafterUtilitiesMainMenuButton: true,
    /**
     * These are replacements for the UI colors.
     *
     * @type {Record<string, string>}
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
        "#a0e081": "#a0e081",
        "#86d562": "#86d562",
        "#6cc349": "#6cc349",
        "#52a535": "#52a535",
        "#3c8527": "#3c8527",
        "#2a641c": "#2a641c",
        "#1d4d13": "#1d4d13",
        "#153a0e": "#153a0e",
        "#112f0b": "#112f0b",
        "#0f2b0a": "#0f2b0a",
        "#ffffff": "#ffffff",
        "#000000": "#000000",
        "#f4f6f9": "#f4f6f9",
        "#e6e8eb": "#e6e8eb",
        "#d0d1d4": "#d0d1d4",
        "#b1b2b5": "#b1b2b5",
        "#8c8d90": "#8c8d90",
        "#58585a": "#58585a",
        "#48494a": "#48494a",
        "#313233": "#313233",
        "#242425": "#242425",
        "#1e1e1f": "#1e1e1f",
        "#ff8080": "#ff8080",
        "#d93636": "#d93636",
        "#b31b1b": "#b31b1b",
        "#d54242": "#d54242",
        "#ca3636": "#ca3636",
        "#c02d2d": "#c02d2d",
        "#b62525": "#b62525",
        "#ad1d1d": "#ad1d1d",
        "#a31616": "#a31616",
        "#990f0f": "#990f0f",
        "#ffb366": "#ffb366",
        "#d3791f": "#d3791f",
        "#a65b11": "#a65b11",
        "#ffe866": "#ffe866",
        "#e5c317": "#e5c317",
        "#8a7500": "#8a7500",
        "#fff0c5": "#fff0c5",
        "#ffd783": "#ffd783",
        "#f8af2b": "#f8af2b",
        "#ce8706": "#ce8706",
        "#ae7100": "#ae7100",
        "#8cb3ff": "#8cb3ff",
        "#2e6be5": "#2e6be5",
        "#1452cc": "#1452cc",
        "rgba(0, 0, 0, 0.1)": "rgba(0, 0, 0, 0.1)",
        "rgba(0, 0, 0, 0.2)": "rgba(0, 0, 0, 0.2)",
        "rgba(0, 0, 0, 0.25)": "rgba(0, 0, 0, 0.25)",
        "rgba(0, 0, 0, 0.3)": "rgba(0, 0, 0, 0.3)",
        "rgba(0, 0, 0, 0.4)": "rgba(0, 0, 0, 0.4)",
        "rgba(0, 0, 0, 0.5)": "rgba(0, 0, 0, 0.5)",
        "rgba(0, 0, 0, 0.6)": "rgba(0, 0, 0, 0.6)",
        "rgba(0, 0, 0, 0.7)": "rgba(0, 0, 0, 0.7)",
        "rgba(0, 0, 0, 0.8)": "rgba(0, 0, 0, 0.8)",
        "rgba(0, 0, 0, 0.9)": "rgba(0, 0, 0, 0.9)",
        "rgba(0, 0, 0, 1)": "rgba(0, 0, 0, 1)",
        "rgba(255, 255, 255, 0.1)": "rgba(255, 255, 255, 0.1)",
        "rgba(255, 255, 255, 0.2)": "rgba(255, 255, 255, 0.2)",
        "rgba(255, 255, 255, 0.3)": "rgba(255, 255, 255, 0.3)",
        "rgba(255, 255, 255, 0.4)": "rgba(255, 255, 255, 0.4)",
        "rgba(255, 255, 255, 0.5)": "rgba(255, 255, 255, 0.5)",
        "rgba(255, 255, 255, 0.6)": "rgba(255, 255, 255, 0.6)",
        "rgba(255, 255, 255, 0.7)": "rgba(255, 255, 255, 0.7)",
        "rgba(255, 255, 255, 0.8)": "rgba(255, 255, 255, 0.8)",
        "rgba(255, 255, 255, 0.9)": "rgba(255, 255, 255, 0.9)",
        "#FB95E2": "#FB95E2",
        "#FFB1EC": "#FFB1EC",
        "#E833C2": "#E833C2",
        "#F877DC": "#F877DC",
        "#643ACB": "#643ACB",
        "#AC90F3": "#AC90F3",
        "#9471E0": "#9471E0",
        "#8557F8": "#8557F8",
        "#7345E5": "#7345E5",
        "#5D2CC6": "#5D2CC6",
        "#4A1CAC": "#4A1CAC",
        "#050029": "#050029",
        "rgba(5, 0, 41, 0.5)": "rgba(5, 0, 41, 0.5)",
    },
};
/**
 * Extracts the function names from the given file contents for the Ore UI Customizer.
 *
 * @param {string} fileContents The file contents.
 * @returns The extracted function names.
 */
export function getExtractedFunctionNames(fileContents) {
    let extractedFunctionNames = {
        translationStringResolver: "wi",
        headerFunciton: "fu",
        headerSpacingFunction: "Gc",
        editWorldTextFunction: "Dk",
        jsText: "js",
        navbarButtonFunction: "lc",
        navbarButtonImageFunction: "xc",
    };
    extractedFunctionNames.translationStringResolver =
        fileContents.match(/([a-zA-Z0-9_\$]{2})\("TitleBar.Buttons.Close"\)/)?.[1] ?? extractedFunctionNames.translationStringResolver;
    extractedFunctionNames.headerFunciton =
        fileContents.match(/a\.createElement\(([a-zA-Z0-9_\$]{2}),null,n\("\.microsoftSignInButtonTitle"\)\),/)?.[1] ?? extractedFunctionNames.headerFunciton;
    extractedFunctionNames.headerSpacingFunction =
        fileContents.match(/a\.createElement\(([a-zA-Z0-9_\$]{2}),\{size:1\}\),/)?.[1] ?? extractedFunctionNames.headerSpacingFunction;
    extractedFunctionNames.editWorldTextFunction =
        fileContents.match(/([a-zA-Z0-9_\$]{2})\.Text=function\(\{children:e,align:t\}\)/)?.[1] ?? extractedFunctionNames.editWorldTextFunction;
    extractedFunctionNames.jsText =
        fileContents.match(/a\.createElement\(([a-zA-Z0-9_\$]{2}),\{type:"body",variant:"dimmer"\}/)?.[1] ?? extractedFunctionNames.jsText;
    extractedFunctionNames.navbarButtonFunction =
        fileContents.match(/return a\.createElement\(([a-zA-Z0-9_\$]{2}),\{className:"r5Ne9"/)?.[1] ?? extractedFunctionNames.navbarButtonFunction;
    extractedFunctionNames.navbarButtonImageFunction =
        fileContents.match(/a\.createElement\(([a-zA-Z0-9_\$]{2}),\{className:"GNMZ6"/)?.[1] ?? extractedFunctionNames.navbarButtonImageFunction;
    return extractedFunctionNames;
}
/**
 * Extracts the regexes for the replacer function for the Ore UI Customizer.
 *
 * @param {ReturnType<typeof getExtractedFunctionNames>} extractedFunctionNames The extracted function names from the {@link getExtractedFunctionNames} function.
 * @returns An object containing the regexes for the replacer function.
 */
export function getReplacerRegexes(extractedFunctionNames) {
    /**
     * Lists of regexes to use for certain modifications.
     */
    const replacerRegexes = {
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
        hardcoreModeToggleAlwaysClickable: {
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
            0: [
                /**
                 * Known supported Minecraft versions:
                 *
                 * - 1.21.70/71/72 (index-d6df7.js)
                 * - 1.21.70/71/72 dev (index-1fd56.js)
                 * - 1.21.80.20/21/22 preview (index-1da13.js)
                 * - 1.21.80.25 preview (index-b3e96.js)
                 * - 1.21.80.27/28 preview (index-07a21.js)
                 * - 1.21.80.3 (index-07a21.js)
                 * - 1.21.90.20 preview (index-fe5c0.js)
                 */
                /function ([a-zA-Z0-9_\$]{2})\(\s*?\{\s*?generalData\s*?:\s*?e\s*?,\s*?isLockedTemplate\s*?:\s*?t\s*?\}\s*?\)\s*?\{\s*?const\s*?\{\s*?t\s*?:\s*?n\s*?\}\s*?=\s*?([a-zA-Z0-9_\$]{2})\("CreateNewWorld\.general"\)\s*?,\s*?l\s*?=\s*?([a-zA-Z0-9_\$]{2})\(\)\s*?,\s*?o\s*?=\s*?\(\s*?0\s*?,\s*?a\s*?\.\s*?useContext\s*?\)\s*?\(\s*?([a-zA-Z0-9_\$]{2})\s*?\)\s*?===\s*?([a-zA-Z0-9_\$]{2})\.CREATE\s*?,\s*?i=\s*?\(\s*?0\s*?,\s*?r\.useSharedFacet\s*?\)\s*?\(\s*?([a-zA-Z0-9_\$]{2})\s*?\)\s*?,\s*?c\s*?=\s*?\(\s*?0\s*?,\s*?r\.useFacetMap\s*?\)\s*?\(\s*?\(\s*?\(\s*?e\s*?,\s*?t\s*?,\s*?n\s*?\)\s*?=>\s*?n\s*?\|\|\s*?t\s*?\|\|\s*?!o\s*?\|\|\s*?e\.gameMode\s*?!==\s*?([a-zA-Z0-9_\$]{2})\.SURVIVAL\s*?&&\s*?e\.gameMode\s*?!==\s*?([a-zA-Z0-9_\$]{2})\.ADVENTURE\s*?\)\s*?,\s*?\[\s*?o\s*?\]\s*?,\s*?\[\s*?e\s*?,\s*?t\s*?,\s*?i\s*?\]\s*?\)\s*?;\s*?return \s*?a\.createElement\(\s*?([a-zA-Z0-9_\$]{2})\s*?,\s*?\{\s*?title\s*?:\s*?([a-zA-Z0-9_\$]{1})\("\.hardcoreModeTitle"\)\s*?,\s*?soundEffectPressed\s*?:\s*?"ui\.hardcore_toggle_press"\s*?,\s*?disabled\s*?:\s*?c\s*?,\s*?description\s*?:\s*?([a-zA-Z0-9_\$]{1})\("\.hardcoreModeDescription"\)\s*?,\s*?value\s*?:\s*?\(\s*?0\s*?,\s*?r\.useFacetMap\s*?\)\s*?\(\s*?\(\s*?e\s*?=>\s*?e\.isHardcore\s*?\)\s*?,\s*?\[\s*?\]\s*?,\s*?\[\s*?e\s*?\]\s*?\)\s*?,\s*?onChange\s*?:\s*?\(\s*?0\s*?,\s*?r\.useFacetCallback\s*?\)\s*?\(\s*?\(\s*?e\s*?=>\s*?t\s*?=>\s*?\{\s*?e\.isHardcore\s*?=\s*?t\s*?,\s*?l\(\s*?t\s*?\?\s*?"ui\.hardcore_enable"\s*?:\s*?"ui\.hardcore_disable"\s*?\)\s*?\}\s*?\)\s*?,\s*?\[\s*?l\s*?\]\s*?,\s*?\[\s*?e\s*?\]\s*?\)\s*?,\s*?gamepad\s*?:\s*?\{\s*?index\s*?:\s*?4\s*?\}\s*?,\s*?imgSrc\s*?:\s*?([a-zA-Z0-9_\$]{2})\s*?,\s*?"data-testid"\s*?:\s*?"hardcore-mode-toggle"\s*?\}\s*?\)\s*?\}/g,
            ],
        },
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
        allowDisablingEnabledExperimentalToggles: {
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
            0: [
                /**
                 * Known supported Minecraft versions:
                 *
                 * - 1.21.70/71/72 (index-d6df7.js)
                 * - 1.21.70/71/72 dev (index-1fd56.js)
                 * - 1.21.80.20/21/22 preview (index-1da13.js)
                 * - 1.21.80.25 preview (index-b3e96.js)
                 * - 1.21.80.27/28 preview (index-07a21.js)
                 * - 1.21.80.3 (index-07a21.js)
                 * - 1.21.90.20 preview (index-fe5c0.js)
                 */
                new RegExp(`function ([a-zA-Z0-9_\$]{2})\\(\\{experimentalFeature:e,gamepadIndex:t,disabled:n,achievementsDisabledMessages:l,areAllTogglesDisabled:o\\}\\)\\{const\\{gt:i\\}=function\\(\\)\\{const\\{translate:e,formatDate:t\\}=\\(0,a\\.useContext\\)\\(([a-zA-Z0-9_\$]{2})\\);return\\(0,a\\.useMemo\\)\\(\\(\\(\\)=>\\(\\{f:\\{formatDate:t\\},gt:\\(t,n\\)=>\\{var a;return null!==\\(a=e\\(t,n\\)\\)&&void 0!==a\\?a:t\\}\\}\\)\\),\\[e,t\\]\\)\\}\\(\\),\\{t:c\\}=${extractedFunctionNames.translationStringResolver}\\("CreateNewWorld\\.all"\\),s=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.id\\),\\[\\],\\[e\\]\\),u=\\(0,r\\.useFacetUnwrap\\)\\(s\\),d=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.title\\),\\[\\],\\[e\\]\\),m=\\(0,r\\.useFacetUnwrap\\)\\(d\\),p=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.description\\),\\[\\],\\[e\\]\\),f=\\(0,r\\.useFacetUnwrap\\)\\(p\\),g=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.isEnabled\\),\\[\\],\\[e\\]\\),E=\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t\\)=>e\\|\\|t\\.isTogglePermanentlyDisabled\\),\\[\\],\\[\\(0,r\\.useFacetWrap\\)\\(n\\),e\\]\\),h=\\(0,r\\.useFacetCallback\\)\\(\\(\\(e,t\\)=>n=>\\{n&&t\\?([a-zA-Z0-9_\$]{2})\\.set\\(\\{userTriedToActivateToggle:!0,doSetToggleValue:\\(\\)=>e\\.isEnabled=n,userHasAcceptedBetaFeatures:!1\\}\\):e\\.isEnabled=n\\}\\),\\[\\],\\[e,o\\]\\),v=c\\("\\.narrationSuffixDisablesAchievements"\\),b=\\(0,r\\.useFacetMap\\)\\(\\(e=>0===e\\.length\\?c\\("\\.narrationSuffixEnablesAchievements"\\):void 0\\),\\[c\\],\\[l\\]\\);return null!=u\\?a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:m!==r\\.NO_VALUE\\?i\\(m\\):"",description:f!==r\\.NO_VALUE\\?i\\(f\\):"",gamepad:\\{index:t\\},value:g,disabled:E,onChange:h,onNarrationText:v,offNarrationText:b\\}\\):null\\}`),
            ],
        },
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
        addMoreDefaultGameModes: {
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
            0: [
                /**
                 * Known supported Minecraft versions:
                 *
                 * - 1.21.70/71/72 (index-d6df7.js)
                 * - 1.21.70/71/72 dev (index-1fd56.js)
                 * - 1.21.80.20/21/22 preview (index-1da13.js)
                 * - 1.21.80.25 preview (index-b3e96.js)
                 * - 1.21.80.27/28 preview (index-07a21.js)
                 * - 1.21.80.3 (index-07a21.js)
                 * - 1.21.90.20 preview (index-fe5c0.js)
                 */
                new RegExp(`function ([a-zA-Z0-9_\$]{2})\\(\\{generalData:e,isLockedTemplate:t,isUsingTemplate:n,achievementsDisabledMessages:l,isHardcoreMode:o\\}\\)\\{const\\{t:i\\}=${extractedFunctionNames.translationStringResolver}\\("CreateNewWorld\\.general"\\),\\{t:c\\}=${extractedFunctionNames.translationStringResolver}\\("CreateNewWorld\\.all"\\),s=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),u=\\(0,a\\.useContext\\)\\(([a-zA-Z0-9_\$]{2})\\)!==([a-zA-Z0-9_\$]{2})\\.CREATE,d=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),m=\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t,n\\)=>e\\|\\|t\\|\\|n\\),\\[\\],\\[t,s,o\\]\\),p=\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t\\)=>\\{const n=\\[([a-zA-Z0-9_\$]{2})\\(\\{label:i\\("\\.gameModeSurvivalLabel"\\),description:i\\("\\.gameModeSurvivalDescription"\\),value:([a-zA-Z0-9_\$]{2})\\.SURVIVAL\\},1===e\\.length\\?\\{narrationSuffix:c\\("\\.narrationSuffixEnablesAchievements"\\)\\}:\\{\\}\\),\\{label:i\\("\\.gameModeCreativeLabel"\\),description:i\\("\\.gameModeCreativeDescription"\\),value:(?:[a-zA-Z0-9_\$]{2})\\.CREATIVE,narrationSuffix:c\\("\\.narrationSuffixDisablesAchievements"\\)\\}\\];return\\(u\\|\\|t\\)&&n\\.push\\((?:[a-zA-Z0-9_\$]{2})\\(\\{label:i\\("\\.gameModeAdventureLabel"\\),description:i\\(t\\?"\\.gameModeAdventureTemplateDescription":"\\.gameModeAdventureDescription"\\),value:(?:[a-zA-Z0-9_\$]{2})\\.ADVENTURE\\},1===e\\.length\\?\\{narrationSuffix:c\\("\\.narrationSuffixEnablesAchievements"\\)\\}:\\{\\}\\)\\),n\\}\\),\\[i,c,u\\],\\[l,n\\]\\),f=\\(0,r\\.useNotifyMountComplete\\)\\(\\);return a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:i\\("\\.gameModeTitle"\\),disabled:m,options:p,onMountComplete:f,value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.gameMode\\),\\[\\],\\[e\\]\\),onChange:\\(0,r\\.useFacetCallback\\)\\(\\(\\(e,t\\)=>n=>\\{const a=e\\.gameMode;e\\.gameMode=n,u&&t\\.trackOptionChanged\\(([a-zA-Z0-9_\$]{2})\\.GameModeChanged,a,n\\)\\}\\),\\[u\\],\\[e,d\\]\\)\\}\\)\\}`),
            ],
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
            1: [
                /**
                 * Known supported Minecraft versions:
                 *
                 * - 1.21.70/71/72 (index-d6df7.js)
                 * - 1.21.70/71/72 dev (index-1fd56.js)
                 * - 1.21.80.20/21/22 preview (index-1da13.js)
                 * - 1.21.80.25 preview (index-b3e96.js)
                 * - 1.21.80.27/28 preview (index-07a21.js)
                 * - 1.21.80.3 (index-07a21.js)
                 * - 1.21.90.20 preview (index-fe5c0.js)
                 * - 1.21.90.21 preview (index-aaad2.js)
                 */
                new RegExp(`function\\(e\\)\\{e\\[e\\.UNKNOWN=-1\\]="UNKNOWN",e\\[e\\.SURVIVAL=0\\]="SURVIVAL",e\\[e\\.CREATIVE=1\\]="CREATIVE",e\\[e\\.ADVENTURE=2\\]="ADVENTURE"\\}\\(([a-zA-Z0-9_\$]{2})\\|\\|\\(([a-zA-Z0-9_\$]{2})=\\{\\}\\)\\),`),
            ],
        },
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
        addGeneratorTypeDropdown: {
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
            0: [
                /**
                 * Known supported Minecraft versions:
                 *
                 * - 1.21.70/71/72 (index-d6df7.js)
                 * - 1.21.70/71/72 dev (index-1fd56.js)
                 * - 1.21.80.20/21/22 preview (index-1da13.js)
                 * - 1.21.80.25 preview (index-b3e96.js)
                 * - 1.21.80.27/28 preview (index-07a21.js)
                 * - 1.21.80.3 (index-07a21.js)
                 * - 1.21.90.20 preview (index-fe5c0.js)
                 */
                new RegExp(`(?:[a-zA-Z0-9_\$]{1})&&!(?:[a-zA-Z0-9_\$]{1})\\?a\\.createElement\\(r\\.Mount,\\{when:([a-zA-Z0-9_\$]{1})\\},a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{label:([a-zA-Z0-9_\$]{1})\\("\\.generatorTypeLabel"\\),options:\\[\\{value:([a-zA-Z0-9_\$]{2})\\.Overworld,label:(?:[a-zA-Z0-9_\$]{1})\\("\\.vanillaWorldGeneratorLabel"\\),description:(?:[a-zA-Z0-9_\$]{1})\\("\\.vanillaWorldGeneratorDescription"\\)\\},\\{value:(?:[a-zA-Z0-9_\$]{2})\\.Flat,label:(?:[a-zA-Z0-9_\$]{1})\\("\\.flatWorldGeneratorLabel"\\),description:(?:[a-zA-Z0-9_\$]{1})\\("\\.flatWorldGeneratorDescription"\\)\\},\\{value:(?:[a-zA-Z0-9_\$]{2})\\.Void,label:(?:[a-zA-Z0-9_\$]{1})\\("\\.voidWorldGeneratorLabel"\\),description:(?:[a-zA-Z0-9_\$]{1})\\("\\.voidWorldGeneratorDescription"\\)\\}\\],value:([a-zA-Z0-9_\$]{1})\\.value,onChange:(?:[a-zA-Z0-9_\$]{1})\\.onChange\\}\\)\\)\\):null`),
            ],
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
            1: [
                /**
                 * Known supported Minecraft versions:
                 *
                 * - 1.21.70/71/72 (index-d6df7.js)
                 * - 1.21.70/71/72 dev (index-1fd56.js)
                 * - 1.21.80.20/21/22 preview (index-1da13.js)
                 * - 1.21.80.25 preview (index-b3e96.js)
                 * - 1.21.80.27/28 preview (index-07a21.js)
                 * - 1.21.80.3 (index-07a21.js)
                 * - 1.21.90.20 preview (index-fe5c0.js)
                 * - 1.21.90.21 preview (index-aaad2.js)
                 */
                new RegExp(`function\\(e\\)\\{e\\[e\\.Legacy=0\\]="Legacy",e\\[e\\.Overworld=1\\]="Overworld",e\\[e\\.Flat=2\\]="Flat",e\\[e\\.Nether=3\\]="Nether",e\\[e\\.TheEnd=4\\]="TheEnd",e\\[e\\.Void=5\\]="Void",e\\[e\\.Undefined=6\\]="Undefined"\\}\\(([a-zA-Z0-9_\$]{2})\\|\\|\\((?:[a-zA-Z0-9_\$]{2})=\\{\\}\\)\\),`),
            ],
        },
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
        allowForChangingSeeds: {
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
            0: [
                /**
                 * Known supported Minecraft versions:
                 *
                 * - 1.21.70/71/72 (index-d6df7.js)
                 * - 1.21.70/71/72 dev (index-1fd56.js)
                 * - 1.21.80.20/21/22 preview (index-1da13.js)
                 * - 1.21.80.25 preview (index-b3e96.js)
                 * - 1.21.80.27/28 preview (index-07a21.js)
                 * - 1.21.80.3 (index-07a21.js)
                 * - 1.21.90.20 preview (index-fe5c0.js)
                 * - 1.21.90.21 preview (index-aaad2.js)
                 */
                new RegExp(`([a-zA-Z0-9_\$]{2})=\\(\\{advancedData:e,isEditorWorld:t,onSeedValueChange:n,isSeedChangeLocked:l,showSeedTemplates:o\\}\\)=>\\{const\\{t:i\\}=([a-zA-Z0-9_\$]{2})\\("CreateNewWorld\\.advanced"\\),\\{t:c\\}=(?:[a-zA-Z0-9_\$]{2})\\("CreateNewWorld\\.all"\\),s=\\(0,a\\.useContext\\)\\(([a-zA-Z0-9_\$]{2})\\)!==([a-zA-Z0-9_\$]{2})\\.CREATE,u=([a-zA-Z0-9_\$]{2})\\(([a-zA-Z0-9_\$]{2})\\),d=([a-zA-Z0-9_\$]{2})\\(\\),m=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),p=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),f=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.worldSeed\\),\\[\\],\\[e\\]\\),g=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.isClipboardCopySupported\\),\\[\\],\\[m\\]\\),E=\\(0,r\\.useFacetCallback\\)\\(\\(\\(e,t,n\\)=>\\(\\)=>\\{t\\.copyToClipboard\\(e\\),n\\.queueSnackbar\\(i\\("\\.copyToClipboard"\\)\\)\\}\\),\\[i\\],\\[f,m,p\\]\\),h=s\\?E:\\(\\)=>d\\.push\\("/create-new-world/seed-templates"\\),v=s\\?"":i\\("\\.worldSeedPlaceholder"\\),b=i\\(s\\?"\\.worldSeedCopyButton":"\\.worldSeedButton"\\),y=\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t,n\\)=>t\\|\\|n&&u&&!s&&e\\.generatorType!=([a-zA-Z0-9_\$]{2})\\.Overworld\\),\\[u,s\\],\\[e,l,t\\]\\);return o\\?a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{data:g\\},\\(e=>s&&!e\\?a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{disabled:s,label:i\\("\\.worldSeedLabel"\\),description:i\\("\\.worldSeedDescription"\\),maxLength:32,value:f,onChange:n,placeholder:i\\("\\.worldSeedPlaceholder"\\),disabledNarrationSuffix:c\\("\\.narrationSuffixTemplateLocked"\\),"data-testid":"world-seed-text-field"\\}\\):a\\.createElement\\((?:[a-zA-Z0-9_\$]{2})\\.WithButton,\\{buttonInputLegend:b,buttonText:b,buttonOnClick:h,textDisabled:s,disabled:y,label:i\\("\\.worldSeedLabel"\\),description:i\\("\\.worldSeedDescription"\\),maxLength:32,value:f,onChange:n,placeholder:v,buttonNarrationHint:i\\("\\.narrationTemplatesButtonNarrationHint"\\),disabledNarrationSuffix:c\\("\\.narrationSuffixTemplateLocked"\\),"data-testid":"world-seed-with-button"\\}\\)\\)\\)\\):a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\((?:[a-zA-Z0-9_\$]{2}),\\{disabled:y,label:i\\("\\.worldSeedLabel"\\),description:i\\("\\.worldSeedDescription"\\),maxLength:32,value:f,onChange:n,placeholder:i\\("\\.worldSeedPlaceholder"\\),disabledNarrationSuffix:c\\("\\.narrationSuffixTemplateLocked"\\)\\}\\)\\)\\},`),
            ],
        },
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
        allowForChangingFlatWorldPreset: {
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
            0: [
                /**
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
                new RegExp(`a\\.createElement\\(r\\.Mount,\\{when:(?:[a-zA-Z0-9_\$]{1})\\},a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.useFlatWorld\\),\\[\\],\\[([a-zA-Z0-9_\$]{1})\\]\\),preset:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.flatWorldPreset\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),onValueChanged:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.useFlatWorld=t,t&&e\\.flatWorldPreset\\?([a-zA-Z0-9_\$]{1})\\(([a-zA-Z0-9_\$]{2})\\[e\\.flatWorldPreset\\]\\):(?:[a-zA-Z0-9_\$]{1})\\(""\\)\\}\\),\\[(?:[a-zA-Z0-9_\$]{1})\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),onPresetChanged:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.flatWorldPreset=t,e\\.useFlatWorld\\?(?:[a-zA-Z0-9_\$]{1})\\((?:[a-zA-Z0-9_\$]{2})\\[t\\]\\):(?:[a-zA-Z0-9_\$]{1})\\(""\\)\\}\\),\\[(?:[a-zA-Z0-9_\$]{1})\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),disabled:(?:[a-zA-Z0-9_\$]{1}),hideAccordion:\\(0,r\\.useFacetMap\\)\\(\\(e=>null==e\\.flatWorldPreset\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),achievementsDisabledMessages:([a-zA-Z0-9_\$]{1})\\}\\)\\)\\)`),
            ],
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
            1: [
                /**
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
                new RegExp(`return a\\.createElement\\(a\\.Fragment,null,a\\.createElement\\(r\\.Mount,\\{when:(?:[a-zA-Z0-9_\$]{1})\\},a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{onChange:([a-zA-Z0-9_\$]{1}),value:([a-zA-Z0-9_\$]{1}),title:([a-zA-Z0-9_\$]{1})\\("\\.useFlatWorldTitle"\\),description:(?:[a-zA-Z0-9_\$]{1})\\("\\.useFlatWorldDescription"\\),disabled:([a-zA-Z0-9_\$]{1}),offNarrationText:([a-zA-Z0-9_\$]{1}),onNarrationText:([a-zA-Z0-9_\$]{1}),narrationSuffix:([a-zA-Z0-9_\$]{1})\\}\\)\\),a\\.createElement\\(r\\.Mount,\\{when:(?:[a-zA-Z0-9_\$]{1}),condition:!1\\},a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:(?:[a-zA-Z0-9_\$]{1})\\("\\.useFlatWorldTitle"\\),description:(?:[a-zA-Z0-9_\$]{1})\\("\\.useFlatWorldDescription"\\),value:(?:[a-zA-Z0-9_\$]{1}),onChange:(?:[a-zA-Z0-9_\$]{1}),disabled:(?:[a-zA-Z0-9_\$]{1}),narrationSuffix:(?:[a-zA-Z0-9_\$]{1}),offNarrationText:(?:[a-zA-Z0-9_\$]{1}),onNarrationText:(?:[a-zA-Z0-9_\$]{1}),onExpandNarrationHint:([a-zA-Z0-9_\$]{1})\\},a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:([a-zA-Z0-9_\$]{1})\\("\\.title"\\),customSelectionDescription:a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{preset:([a-zA-Z0-9_\$]{1})\\}\\),options:([a-zA-Z0-9_\$]{1}),value:([a-zA-Z0-9_\$]{1}),onItemSelect:e=>l\\(([a-zA-Z0-9_\$]{2})\\[e\\]\\),disabled:(?:[a-zA-Z0-9_\$]{1}),wrapperRole:"neutral80",indented:!0,dropdownNarrationSuffix:([a-zA-Z0-9_\$]{1})\\}\\)\\)\\)\\)`),
            ],
        },
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
        addDebugTab: {
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
            0: [
                /**
                 * Known supported Minecraft versions:
                 *
                 * - 1.21.70/71/72 (index-d6df7.js)
                 * - 1.21.70/71/72 dev (index-1fd56.js)
                 * - 1.21.80.20/21/22 preview (index-1da13.js)
                 * - 1.21.80.27/28 preview (index-07a21.js)
                 * - 1.21.80.3 (index-07a21.js)
                 * - 1.21.90.20 preview (index-fe5c0.js)
                 */
                new RegExp(`function ([a-zA-Z0-9_\$]{2})\\(\\{(?:worldData:e,achievementsDisabledMessages:t,)?onUnlockTemplateSettings:(?:[a-zA-Z0-9_\$]{1}),onExportTemplate:(?:[a-zA-Z0-9_\$]{1}),onClearPlayerData:(?:[a-zA-Z0-9_\$]{1}),isEditorWorld:(?:[a-zA-Z0-9_\$]{1})\\}\\)\\{const (?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),(?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useFacetMap\\)\\(\\(\\(\\{allBiomes:e\\}\\)=>e\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),(?:(?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.isLockedTemplate\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),(?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.achievementsDisabled\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),)?(?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useFacetMap\\)\\(\\(\\(\\{spawnDimensionId:e\\}\\)=>e\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),(?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useFacetMap\\)\\(\\(e=>([a-zA-Z0-9_\$]{2})\\(e,\\(e=>\\(\\{label:e\\.label,dimension:e\\.dimension,value:e\\.id\\}\\)\\)\\)\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),(?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t\\)=>([a-zA-Z0-9_\$]{2})\\(e,\\(e=>e\\.dimension===t\\)\\)\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1}),(?:[a-zA-Z0-9_\$]{1})\\]\\),(?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.spawnBiomeId\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),(?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.defaultSpawnBiome\\|\\|e\\.isBiomeOverrideActive\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),(?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),(?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useFacetMap\\)\\(\\(e=>([a-zA-Z0-9_\$]{2})\\(e\\.platform\\)\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),(?:[a-zA-Z0-9_\$]{1})=\\(0,a\\.useContext\\)\\(([a-zA-Z0-9_\$]{2})\\)!==([a-zA-Z0-9_\$]{2})\\.CREATE,(?:[a-zA-Z0-9_\$]{1})=\\(0,r\\.useFacetMap\\)\\(\\(e=>e&&(?:[a-zA-Z0-9_\$]{1})\\),\\[(?:[a-zA-Z0-9_\$]{1})\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\);return a\\.createElement\\(r\\.DeferredMountProvider,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{(?:isLockedTemplate:u,achievementsDisabled:d,achievementsDisabledMessages:t,)?narrationText:"Debug",onUnlockTemplateSettings:(?:[a-zA-Z0-9_\$]{1}),isEditorWorld:(?:[a-zA-Z0-9_\$]{1})\\},a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:"Flat nether",gamepad:\\{index:0\\},value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.flatNether\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),onChange` +
                    `:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.flatNether=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\)\\}\\)\\),a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\((?:[a-zA-Z0-9_\$]{2}),\\{title:"Enable game version override",gamepad:\\{index:1\\},value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.enableGameVersionOverride\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),onChange:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.enableGameVersionOverride=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\)\\}\\)\\),a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{label:"Game version override",gamepadIndex:2,placeholder:"0\\.0\\.0",maxLength:30,disabled:\\(0,r\\.useFacetMap\\)\\(\\(e=>!e\\.enableGameVersionOverride\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.gameVersionOverride\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),onChange:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.gameVersionOverride=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\)\\}\\)\\),` +
                    `a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:"World biome settings"\\}\\)\\),a\\.createElement\\((?:[a-zA-Z0-9_\$]{2}),\\{title:"Default spawn biome",description:"Using the default spawn biome will mean a random overworld spawn is selected",gamepad:\\{index:3\\},disabled:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.isBiomeOverrideActive\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.defaultSpawnBiome\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),onChange:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.defaultSpawnBiome=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\)\\}\\),a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{onMountComplete:\\(0,r\\.useNotifyMountComplete\\)\\(\\),title:"Spawn dimension filter",disabled:(?:[a-zA-Z0-9_\$]{1}),wrapToggleText:!0,options:\\[\\{label:"Overworld",value:0\\},\\{label:"Nether",value:1\\}\\],value:(?:[a-zA-Z0-9_\$]{1}),onChange:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.spawnDimensionId=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\)\\}\\)\\),a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:"Spawn biome",options:(?:[a-zA-Z0-9_\$]{1}),onItemSelect:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>e\\.spawnBiomeId=t\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),disabled:(?:[a-zA-Z0-9_\$]{1}),value:\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t\\)=>t\\.filter\\(\\(t=>t\\.value===e\\)\\)\\.length>0\\?e:t\\[0\\]\\.value\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1}),(?:[a-zA-Z0-9_\$]{1})\\]\\),focusOnSelectedItem:!0\\}\\)\\),a\\.createElement\\((?:[a-zA-Z0-9_\$]{2}),\\{title:"Biome override",description:"Set the world to a selected biome\\. This will override the Spawn biome!",gamepad:\\{index:6\\},value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.isBiomeOverrideActive\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),onChange:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.isBiomeOverrideActive=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\)\\}\\),a\\.createElement\\((?:[a-zA-Z0-9_\$]{2}),\\{title:"Biome override",` +
                    `description:"Select biome to be used in the entire world",options:(?:[a-zA-Z0-9_\$]{1}),disabled:\\(0,r\\.useFacetMap\\)\\(\\(e=>!e\\.isBiomeOverrideActive\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),onItemSelect:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.biomeOverrideId=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.biomeOverrideId\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),focusOnSelectedItem:!0\\}\\),a\\.createElement\\(r\\.Mount,\\{when:(?:[a-zA-Z0-9_\$]{1})\\},a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{onExportTemplate:(?:[a-zA-Z0-9_\$]{1}),onClearPlayerData:(?:[a-zA-Z0-9_\$]{1})\\}\\)\\)\\)\\)\\}`),
            ],
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
            1: [
                /**
                 * Known supported Minecraft versions:
                 *
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
                 */
                new RegExp(`e&&([tr])\\.push\\(\\{label:"\\.debugTabLabel",image:([a-zA-Z0-9_\$]{2}),value:"debug"\\}\\),`),
            ],
        },
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
        add8CrafterUtilitiesMainMenuButton: {
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
            0: [
                /**
                 * Known supported Minecraft versions:
                 *
                 * - 1.21.60/61/62 (index-41cdf.js)
                 * - 1.21.60.27/28 preview (index-41cdf.js)
                 * - 1.21.70/71/72 (index-d6df7.js)
                 * - 1.21.70/71/72 dev (index-1fd56.js)
                 * - 1.21.80.20/21/22 preview (index-1da13.js)
                 * - 1.21.80.25 preview (index-b3e96.js)
                 * - 1.21.80.27/28 preview (index-07a21.js)
                 * - 1.21.80.3 (index-07a21.js)
                 * - 1.21.90.20 preview (index-fe5c0.js)
                 */
                new RegExp(`a\\.createElement\\(r\\.Mount,\\{when:([a-zA-Z0-9_\$]{1})\\},a\\.createElement\\(a\\.Fragment,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2})\\.Divider,null\\),a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{onClick:([eo]),screenAnalyticsId:([a-zA-Z0-9_\$]{1})\\}\\)\\)\\)`),
            ],
        },
    };
    return replacerRegexes;
}
