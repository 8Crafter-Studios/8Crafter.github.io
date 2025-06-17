/**
 * The volume options.
 *
 * Each category *should* be between 0 and 100 (inclusive).
 *
 * @type {{[category in typeof volumeCategories[number]]: number}}
 */
declare const volume: {
    [category in (typeof volumeCategories)[number]]: number;
};
/**
 * @type {`${keyof typeof SoundEffects["audioElementsB"]}${"" | "B"}`}
 */
declare let defaultButtonSoundEffect: `${keyof (typeof SoundEffects)["audioElementsB"]}${"" | "B"}`;
/**
 * Cycles the hue rotate of the root element.
 *
 * @param {()=>boolean} stopOnCondition The condition to stop the cycle.
 * @param {number} interval The interval in milliseconds.
 * @param {number} step The step to add to the hue rotate.
 * @returns {Promise<true>}} A promise that resolves when the cycle is stopped.
 */
declare function cycleHueRotate(stopOnCondition?: () => boolean, interval?: number, step?: number): Promise<true>;
/**
 * Format file size in metric prefix
 *
 * @param {number | string} fileSize
 * @returns {string}
 */
declare const formatFileSizeMetric: (fileSize: number | string) => string;
/**
 * Gets a style rule.
 *
 * @param {string} name The name of the style rule.
 * @returns {CSSStyleDeclaration | null} The style rule.
 */
declare function getStyleRule(name: string): CSSStyleDeclaration | null;
/**
 * Executes a callback for each style rule.
 *
 * @param {(rule: CSSStyleDeclaration, ruleName: string, styleSheet: CSSStyleSheet)=>any} callbackfn The callback function.
 * @returns {null} Returns `null`.
 */
declare function forEachRuleCallback(callbackfn: (rule: CSSStyleDeclaration, ruleName: string, styleSheet: CSSStyleSheet) => any): null;
/**
 * Saves a setting.
 *
 * @param {string} key The ID of the setting.
 * @param {any} value The new value for the settings. Should be a value that can be serialized by `JSON.stringify`.
 * @throws {DOMException} Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
 */
declare function saveSetting(key: string, value: any): void;
/**
 * Gets a setting.
 *
 * @param {string} key The ID of the setting.
 * @returns {any | null} The value of the setting, or `null` if the setting hasn't been set.
 */
declare function getSetting(key: string): any | null;
/**
 *
 * @param {"auto"|"dark"|"light"|"BlueTheme"} theme
 */
declare function changeTheme(theme: "auto" | "dark" | "light" | "BlueTheme", setCSS?: boolean): void;
declare const themeDisplayMapping: {
    readonly auto: "Auto (Dark)" | "Auto (Light)" | "Auto";
    dark: string;
    light: string;
    BlueTheme: string;
};
declare const themeDisplayMappingB: {
    readonly auto: "dark" | "light";
    dark: string;
    light: string;
    BlueTheme: string;
};
declare const darkModePreference: MediaQueryList;
/**
 * Changes the CSS theme.
 *
 * @param {keyof typeof themeDisplayMapping} theme The theme to change to.
 */
declare function changeThemeCSS(theme: keyof typeof themeDisplayMapping): void;
/**
 * @type {["master", "ui"]}
 */
declare const volumeCategories: ["master", "ui"];
declare const volumeCategoryDisplayMapping: {
    readonly master: "Master";
    readonly ui: "UI";
};
/**
 * Get the volume of a volume category.
 *
 * @param {typeof volumeCategories[number]} category The volume category to get the volume of.
 * @returns {number} The volume of the volume category. Between 0 and 100 (inclusive).
 */
declare function getAudioCategoryVolume(category: (typeof volumeCategories)[number]): number;
/**
 * Converts a readable stream to a blob.
 *
 * @param {ReadableStream} readableStream The readable stream to convert to a blob.
 * @returns {Promise<Blob>} A promise that resolves with the blob.
 */
declare function readableStreamToBlob(readableStream: ReadableStream): Promise<Blob>;
/**
 * The audio context.
 */
declare const audioCtx: AudioContext;
/**
 * A class for playing sound effects.
 */
declare class SoundEffects {
    private constructor();
    /**
     * @type {string}
     */
    static scriptSrc: string;
    static audioElements: {
        pop: HTMLAudioElement;
        release: HTMLAudioElement;
        toast: HTMLAudioElement;
    };
    static dataURLs: {
        pop: string;
        release: string;
        toast: string;
    };
    static audioElementsB: {
        readonly pop: HTMLAudioElement;
        readonly release: HTMLAudioElement;
        readonly toast: HTMLAudioElement;
    };
    /**
     * @type {{pop: AudioBuffer; release: AudioBuffer; toast: AudioBuffer;}}
     */
    static audioBuffers: {
        pop: AudioBuffer;
        release: AudioBuffer;
        toast: AudioBuffer;
    };
    /**
     * Plays the pop sound effect.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<void>} A promise that resolves when the audio has finished playing.
     */
    static pop(options?: {
        volumeCategory?: (typeof volumeCategories)[number];
        volume?: number;
    }): Promise<void>;
    /**
     * Plays the pop sound effect using an audio buffer.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<{source: AudioScheduledSourceNode; ev: Event;}>} A promise that resolves with the audio source and event when the audio buffer has finished playing.
     */
    static popB(options?: {
        volumeCategory?: (typeof volumeCategories)[number];
        volume?: number;
    }): Promise<{
        source: AudioScheduledSourceNode;
        ev: Event;
    }>;
    /**
     * Plays the release sound effect.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<void>} A promise that resolves when the audio has finished playing.
     */
    static release(options?: {
        volumeCategory?: (typeof volumeCategories)[number];
        volume?: number;
    }): Promise<void>;
    /**
     * Plays the release sound effect using an audio buffer.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<{source: AudioScheduledSourceNode; ev: Event;}>} A promise that resolves with the audio source and event when the audio buffer has finished playing.
     */
    static releaseB(options?: {
        volumeCategory?: (typeof volumeCategories)[number];
        volume?: number;
    }): Promise<{
        source: AudioScheduledSourceNode;
        ev: Event;
    }>;
    /**
     * Plays the toast sound effect.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<void>} A promise that resolves when the audio has finished playing.
     */
    static toast(options?: {
        volumeCategory?: (typeof volumeCategories)[number];
        volume?: number;
    }): Promise<void>;
    /**
     * Plays the toast sound effect using an audio buffer.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<{source: AudioScheduledSourceNode; ev: Event;}>} A promise that resolves with the audio source and event when the audio buffer has finished playing.
     */
    static toastB(options?: {
        volumeCategory?: (typeof volumeCategories)[number];
        volume?: number;
    }): Promise<{
        source: AudioScheduledSourceNode;
        ev: Event;
    }>;
    /**
     * Play an audio buffer.
     *
     * @param {AudioBuffer | null} audioBuffer The audio buffer to play.
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<{source: AudioScheduledSourceNode, ev: Event}>} A promise that resolves with the audio source and event when the audio buffer has finished playing.
     */
    static playBuffer(audioBuffer: AudioBuffer | null, options?: {
        volumeCategory?: (typeof volumeCategories)[number];
        volume?: number;
    }): Promise<{
        source: AudioScheduledSourceNode;
        ev: Event;
    }>;
}
/**
 * The current color scheme.
 *
 * - `0`: Auto
 * - `1`: Dark
 * - `2`: Light
 * - `3`: Blue
 */
declare var colorScheme: number;
declare class PurpleBorderBackgroundElement extends HTMLElement {
    constructor();
}
