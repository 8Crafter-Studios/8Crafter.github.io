/**
 * The namespace for 8Crafter's Ore UI Customizer.
 */
export declare namespace OreUICustomizer {
    /**
     * The list of zip file presets available presets for the Ore UI Customizer.
     */
    const currentPresets: {
        none: {
            displayName: string;
            url: string;
        };
        "v1.21.70-71_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.70-71_Android": {
            displayName: string;
            url: string;
        };
        "v1.21.80_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.80_Android": {
            displayName: string;
            url: string;
        };
        "v1.21.90_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.80-preview.20-22_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.80-preview.25_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.80-preview.27-28_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.90-preview.20_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.90-preview.21_PC": {
            displayName: string;
            url: string;
        };
    };
    /**
     * The version of the Ore UI Customizer.
     */
    const format_version = "0.24.0";
    /**
     * @type {File | undefined}
     */
    let zipFile: File | undefined;
    /**
     * @type {(zip.Entry)[] | undefined}
     */
    let zipFileEntries: zip.Entry[] | undefined;
    /**
     * @type {zip.FS}
     */
    let zipFs: zip.FS | undefined;
    /**
     * @type {keyof typeof currentPresets}
     */
    let currentPreset: keyof typeof currentPresets;
    /**
     * @type {File}
     */
    let currentImportedFile: File | undefined;
    /**
     * @type {HTMLElement}
     */
    let currentColorPickerTarget: HTMLElement | undefined;
    /**
     * Validates the currently imported zip file, also importing it into zipFs and repairing the directory structure if possible.
     *
     * @returns {Promise<boolean>} A promise resolving to `true` if the zip file is valid and `false` otherwise.
     */
    function validateZipFile(): Promise<boolean>;
    function getSettings(): {
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
    };
    /**
     *
     * @param {HTMLElement} target
     * @param {{hueShift?: number, saturationShift?: number, lightnessShift?: number, brightnessShift?: number, redShift?: number, greenShift?: number, blueShift?: number, alphaShift?: number, setHue?: number, setSaturation?: number, setLightness?: number, setBrightness?: number, setRed?: number, setGreen?: number, setBlue?: number, setAlpha?: number}} filterOptions
     */
    function applyColorFilterToColorOverride(target: HTMLElement, filterOptions: {
        hueShift?: number;
        saturationShift?: number;
        lightnessShift?: number;
        brightnessShift?: number;
        redShift?: number;
        greenShift?: number;
        blueShift?: number;
        alphaShift?: number;
        setHue?: number;
        setSaturation?: number;
        setLightness?: number;
        setBrightness?: number;
        setRed?: number;
        setGreen?: number;
        setBlue?: number;
        setAlpha?: number;
    }): void;
    function stringToRegexString(str: string): string;
    function makeRegexRobustToWhitespace(regexString: string): string;
    function refreshOreUIPreview(menuHTMLFileName?: string): Promise<void>;
    function applyMods(): Promise<boolean>;
    function downloadInNewTab(): Promise<void>;
}
declare global {
    /**
     * The namespace for 8Crafter's Ore UI Customizer.
     */
    var oreUICustomizer: typeof OreUICustomizer;
}
