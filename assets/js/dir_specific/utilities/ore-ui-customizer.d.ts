import { EncodedPluginData, OreUICustomizerSettings, Plugin } from "../../../shared/ore-ui-customizer-assets.js";
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
        "v1.21.100_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.90_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.90_Android": {
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
        "v1.21.70-71_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.70-71_Android": {
            displayName: string;
            url: string;
        };
        "v1.21.100-preview.23_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.90-preview.21_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.90-preview.20_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.80-preview.27-28_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.80-preview.25_PC": {
            displayName: string;
            url: string;
        };
        "v1.21.80-preview.20-22_PC": {
            displayName: string;
            url: string;
        };
    };
    /**
     * The version of the Ore UI Customizer.
     */
    const format_version = "1.3.0";
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
     * The list of imported plugins for the Ore UI Customizer.
     *
     * @type {Plugin[]}
     */
    const importedPlugins: {
        [key: string]: Plugin;
    };
    /**
     * The encoded list of the imported plugins for the Ore UI Customizer.
     *
     * @type {EncodedPluginData[]}
     */
    const encodedImportedPlugins: EncodedPluginData[];
    /**
     * Changes the hue of a color.
     *
     * @param {string} rgb The hex color code to change the hue of.
     * @param {number} degree The degree to change the hue by.
     * @returns {string} The new hex color code with the hue shift applied.
     *
     * @see https://stackoverflow.com/a/17433060/16872762
     */
    function changeHue(rgb: string, degree: number): string;
    /**
     * Converts a hex color code to HSL.
     *
     * @param {string} rgb The hex color code to convert to HSL.
     * @returns {{ h: number; s: number; l: number; }} The HSL values of the color.
     *
     * @see https://stackoverflow.com/a/17433060/16872762
     */
    function rgbToHSL(rgb: string): {
        h: number;
        s: number;
        l: number;
    };
    /**
     * Converts HSL values to a hex color code.
     *
     * @param {{ h: number; s: number; l: number }} hsl The HSL values.
     * @returns {string} The RGB hex code.
     *
     * @see https://stackoverflow.com/a/17433060/16872762
     */
    function hslToRGB(hsl: {
        h: number;
        s: number;
        l: number;
    }): string;
    /**
     * Normalizes a color value.
     *
     * @param {number} color The color value to normalize.
     * @param {number} m UNDOCUMENTED
     * @returns {number} The normalized color value.
     *
     * @see https://stackoverflow.com/a/17433060/16872762
     */
    function normalize_rgb_value(color: number, m: number): number;
    /**
     * Converts RGB values to a hex color code.
     *
     * @param {number} r The red value of the color.
     * @param {number} g The green value of the color.
     * @param {number} b The blue value of the color.
     * @returns {string} The hex color code.
     *
     * @see https://stackoverflow.com/a/17433060/16872762
     */
    function rgbToHex(r: number, g: number, b: number): string;
    /**
     * Converts a hex color code to RGB.
     *
     * @param {string} hex The hex color code to convert to RGB.
     * @returns {{ r: number; g: number; b: number; } | null} The RGB values of the color, or null if the color is invalid.
     *
     * @author 8Crafter
     */
    function hexToRGB(hex: string): {
        r: number;
        g: number;
        b: number;
    } | null;
    /**
     * Options for the HTML RGB loading bar.
     */
    interface HTMLRGBLoadingBarOptions {
        /**
         * The width of the loading bar.
         *
         * This is how many characters the bar consists of.
         *
         * @default 40
         */
        barWidth?: number;
        /**
         * The hue span of the loading bar.
         *
         * This is how much the hue changes from the left side of the bar to the right side.
         *
         * @default 60
         */
        hueSpan?: number;
        /**
         * The hue step of the loading bar.
         *
         * This is how much the hue is shifted each frame.
         *
         * @default 5
         */
        hueStep?: number;
        /**
         * The FPS of the loading bar animation.
         *
         * This is how many times per second the loading bar is updated, setting this too high may result in the loading bar having a buggy appearance.
         *
         * @default 10
         */
        barAnimationFPS?: number;
    }
    /**
     * A class for creating HTML RGB loading bars.
     */
    class HTMLRGBLoadingBar {
        #private;
        targetElement: HTMLElement;
        /**
         * Whether the loading bar is active or not.
         */
        get loadingBarActive(): boolean;
        /**
         * Whether the loading bar is in the process of stopping or not.
         */
        get loadingBarIsStopping(): boolean;
        /**
         * Creates an instance of RGBLoadingBar.
         *
         * @param {HTMLElement} targetElement The element to apply the loading bar to.
         */
        constructor(targetElement: HTMLElement);
        /**
         * Starts the loading bar.
         *
         * @returns {Promise<void>} A promise that resolves when the loading bar is stopped.
         *
         * @throws {Error} If the loading bar is already active.
         */
        startLoadingBar(options?: HTMLRGBLoadingBarOptions): Promise<void>;
        /**
         * Stops the loading bar.
         *
         * @returns {Promise<void>} A promise that resolves when the loading bar is stopped.
         */
        stopLoadingBar(): Promise<void>;
        /**
         * Waits until the loading bar is started.
         */
        waitUntilLoadingBarIsStarted(): Promise<void>;
    }
    /**
     * Updates the list of plugins.
     */
    function updatePluginsList(): void;
    /**
     * Validates the currently imported zip file, also importing it into zipFs and repairing the directory structure if possible.
     *
     * @returns {Promise<boolean>} A promise resolving to `true` if the zip file is valid and `false` otherwise.
     */
    function validateZipFile(): Promise<boolean>;
    function getSettings(): OreUICustomizerSettings;
    function setSettings(settings: {
        [key in keyof OreUICustomizerSettings]?: key extends "colorReplacements" ? Partial<OreUICustomizerSettings["colorReplacements"]> : key extends "enabledBuiltInPlugins" ? Partial<OreUICustomizerSettings["enabledBuiltInPlugins"]> : OreUICustomizerSettings[key];
    }): void;
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
    /**
     * Exports the current config as a JSON file.
     */
    function exportConfigFile(): void;
    function applyMods(): Promise<boolean>;
    function downloadInNewTab(): Promise<void>;
    function download(): Promise<void>;
}
declare global {
    /**
     * The namespace for 8Crafter's Ore UI Customizer.
     */
    var oreUICustomizer: typeof OreUICustomizer;
}
