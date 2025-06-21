import { OreUICustomizerSettings, Plugin } from "../../../shared/ore-ui-customizer-assets.js";
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
    const format_version = "0.25.1";
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
    const importedPlugins: Plugin[];
    /**
     * Validates the currently imported zip file, also importing it into zipFs and repairing the directory structure if possible.
     *
     * @returns {Promise<boolean>} A promise resolving to `true` if the zip file is valid and `false` otherwise.
     */
    function validateZipFile(): Promise<boolean>;
    function getSettings(): OreUICustomizerSettings;
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
