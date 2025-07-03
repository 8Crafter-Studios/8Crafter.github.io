import semver from "./semver.js";

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
export const defaultOreUICustomizerSettings: OreUICustomizerSettings = {
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
    maxTextLengthOverride: "1000000" as const,
    /**
     * This adds the `Debug` tab to the create and edit world screens.
     *
     * It also has a bunch of additional options added to the tab that aren't normally in there.
     *
     * @type {boolean}
     */
    addDebugTab: true,
    add8CrafterUtilitiesMainMenuButton: true,
    enabledBuiltInPlugins: {
        "add-exact-ping-count-to-servers-tab": true,
        "add-max-player-count-to-servers-tab": true,
        "facet-spy": true,
    },
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
    plugins: [],
} as OreUICustomizerSettings;

/**
 * Converts a blob to a data URI.
 *
 * @param {Blob} blob The blob to convert.
 * @returns {Promise<`data:${string};base64,${string}`>} A promise resolving with the data URI.
 */
export async function blobToDataURI(blob: Blob): Promise<`data:${string};base64,${string}`> {
    if (typeof globalThis.Buffer === "undefined") {
        const arrayBuffer = await blob.arrayBuffer();
        const byteArray = new Uint8Array(arrayBuffer);
        const base64String: string = byteArray.reduce((data: string, byte: number): string => data + String.fromCharCode(byte), "");
        const base64Encoded: string = btoa(base64String);
        return `data:${blob.type || "application/octet-stream"};base64,${base64Encoded}`;
    } else {
        const base64Encoded: string = Buffer.from(await blob.bytes()).toString("base64url");
        return `data:${blob.type || "application/octet-stream"};base64,${base64Encoded}` as const;
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
 */
export async function importPluginFromDataURI(dataURI: string, type: "js" | "mcouicplugin" = "js"): Promise<Plugin> {
    switch (type) {
        case "mcouicplugin": {
            throw new TypeError(`The plugin type "${type}" is not supported yet, but support for it will be coming soon.`);
        }
        case "js": {
            const data: { plugin: Plugin } = await import(dataURI);
            return data.plugin;
        }
        default: {
            throw new TypeError(`Unsupported plugin type "${type}".`);
        }
    }
}

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
export async function validatePluginFile(plugin: Blob, type: "mcouicplugin" | "js"): Promise<void> {
    switch (type) {
        case "mcouicplugin": {
            const zipFs = new zip.fs.FS();
            await zipFs.importBlob(plugin);
            throw new TypeError(`The plugin type "${type}" is not supported yet, but support for it will be coming soon.`);
        }
        case "js": {
            const dataURI: string = URL.createObjectURL(plugin);
            const data: { plugin: Plugin } = await import(dataURI);
            if (data?.plugin) {
                validatePluginObject(data.plugin);
            } else {
                throw new SyntaxError(`Plugin is missing required variable export "plugin".`);
            }
            return;
        }
        default: {
            throw new TypeError(`Unsupported plugin type "${type}".`);
        }
    }
}

/**
 * Validates a plugin object.
 *
 * @param {any} plugin The plugin object to validate.
 * @returns {asserts plugin is Plugin} Asserts that the plugin object is valid. If it is not valid, throws an error. Otherwise, returns `void`.
 */
export function validatePluginObject(plugin: any): asserts plugin is Plugin {
    if (typeof plugin !== "object") throw new TypeError(`Plugin must be an object.`);
    const pluginObject: Plugin = plugin;
    if (!pluginObject.actions) throw new SyntaxError(`Plugin is missing required property "actions".`);
    if (!(pluginObject.actions instanceof Array)) throw new SyntaxError(`Plugin property "actions" must be an array.`);
    if (!pluginObject.format_version) throw new SyntaxError(`Plugin is missing required property "format_version".`);
    if (typeof pluginObject.format_version !== "string") throw new SyntaxError(`Plugin property "format_version" must be a string.`);
    if (pluginObject.format_version.startsWith("v")) throw new SyntaxError(`Plugin property "format_version" must not include the leading "v".`);
    if (semver.valid(pluginObject.format_version) === null) throw new SyntaxError(`Plugin property "format_version" must be a valid semver version.`);
    if (!pluginObject.id) throw new SyntaxError(`Plugin is missing required property "id".`);
    if (typeof pluginObject.id !== "string") throw new SyntaxError(`Plugin property "id" must be a string.`);
    if (!/^[a-zA-Z0-9_\-\.]+$/.test(pluginObject.id)) throw new SyntaxError(`Plugin property "id" does not match the pattern /^[a-zA-Z0-9_\-\.]+$/.`);
    if (!pluginObject.name) throw new SyntaxError(`Plugin is missing required property "name".`);
    if (typeof pluginObject.name !== "string") throw new SyntaxError(`Plugin property "name" must be a string.`);
    if (typeof pluginObject.min_engine_version !== "undefined" && typeof pluginObject.min_engine_version !== "string")
        throw new SyntaxError(`Plugin property "min_engine_version" must be a string or undefined.`);
    if (typeof pluginObject.min_engine_version === "string" && pluginObject.min_engine_version.startsWith("v"))
        throw new SyntaxError(`Plugin property "min_engine_version" must not include the leading "v".`);
    if (typeof pluginObject.min_engine_version === "string" && semver.valid(pluginObject.min_engine_version) === null)
        throw new SyntaxError(`Plugin property "min_engine_version" must be a valid semver version or undefined.`);
    if (!pluginObject.namespace) throw new SyntaxError(`Plugin is missing required property "namespace".`);
    if (pluginObject.namespace === "built-in" && !builtInPlugins.includes(pluginObject as (typeof builtInPlugins)[number]))
        throw new SyntaxError(`Plugin is using the reserved namespace "built-in" but is not a built-in plugin.`);
    if (!/^[a-zA-Z0-9_\-\.]+$/.test(pluginObject.namespace))
        throw new SyntaxError(`Plugin property "namespace" does not match the pattern /^[a-zA-Z0-9_\-\.]+$/.`);
    if (!pluginObject.version) throw new SyntaxError(`Plugin is missing required property "version".`);
    if (typeof pluginObject.version !== "string") throw new SyntaxError(`Plugin property "version" must be a string.`);
    if (pluginObject.version.startsWith("v")) throw new SyntaxError(`Plugin property "version" must not include the leading "v".`);
    if (semver.valid(pluginObject.version) === null) throw new SyntaxError(`Plugin property "version" must be a valid semver version.`);
    let pluginIndex = 0;
    for (const action of pluginObject.actions) {
        if (!action.action) throw new SyntaxError(`Plugin action ${pluginIndex} is missing required property "action".`);
        if (typeof action.action !== "function") throw new SyntaxError(`Plugin action ${pluginIndex} property "action" must be a function.`);
        if (!action.context) throw new SyntaxError(`Plugin action ${pluginIndex} is missing required property "context".`);
        if (typeof action.context !== "string") throw new SyntaxError(`Plugin action ${pluginIndex} property "context" must be a string.`);
        if (!["per_text_file", "per_binary_file", "global_before", "global"].includes(action.context))
            throw new SyntaxError(
                `Plugin action ${pluginIndex} property "context" must be one of "per_text_file", "per_binary_file", "global_before", "global".`
            );
        if (!action.id) throw new SyntaxError(`Plugin action ${pluginIndex} is missing required property "id".`);
        if (typeof action.id !== "string") throw new SyntaxError(`Plugin action ${pluginIndex} property "id" must be a string.`);
        if (!/^[a-zA-Z0-9_\-\.]+$/.test(action.id))
            throw new SyntaxError(`Plugin action ${pluginIndex} property "id" does not match the pattern /^[a-zA-Z0-9_\-\.]+$/.`);
        pluginIndex++;
    }
    return;
}

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
export function getExtractedSymbolNames(fileContents: string): ExtractedSymbolNames {
    /**
     * The extracted symbol names.
     */
    let extractedSymbolNames: ExtractedSymbolNames = {
        translationStringResolver: "wi",
        headerFunciton: "fu",
        headerSpacingFunction: "Gc",
        editWorldTextFunction: "Dk",
        jsText: "js",
        navbarButtonFunction: "lc",
        navbarButtonImageFunction: "xc",
        contextHolder: "a",
        facetHolder: "r",
    };

    [extractedSymbolNames.contextHolder, extractedSymbolNames.facetHolder] =
        (fileContents
            .match(/var ([a-zA-Z0-9_\$])[\s\n]*=[\s\n]*[a-zA-Z0-9_\$]\(3464\),[\s\n]*([a-zA-Z0-9_\$])[\s\n]*=[\s\n]*[a-zA-Z0-9_\$]\(52910\)/)
            ?.slice(1, 3)
            ?.map((v: string, i: number): string => v ?? [extractedSymbolNames.contextHolder, extractedSymbolNames.facetHolder][i as 0 | 1]) as
            | [contextHolder: string, facetHolder: string]
            | undefined) ?? ([extractedSymbolNames.contextHolder, extractedSymbolNames.facetHolder] as const);

    extractedSymbolNames.translationStringResolver =
        fileContents.match(/([a-zA-Z0-9_\$]{2})\("TitleBar.Buttons.Close"\)/)?.[1] ?? extractedSymbolNames.translationStringResolver;

    extractedSymbolNames.headerFunciton =
        fileContents.match(
            new RegExp(
                `${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),null,([a-zA-Z0-9_\\$]{1})\\("\\.microsoftSignInButtonTitle"\\)\\),`
            )
        )?.[1] ?? extractedSymbolNames.headerFunciton;

    extractedSymbolNames.headerSpacingFunction =
        fileContents.match(new RegExp(`${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{size:1\\}\\),`))?.[1] ??
        extractedSymbolNames.headerSpacingFunction;

    extractedSymbolNames.editWorldTextFunction =
        fileContents.match(/([a-zA-Z0-9_\$]{2})\.Text=function\(\{children:e,align:t\}\)/)?.[1] ?? extractedSymbolNames.editWorldTextFunction;

    extractedSymbolNames.jsText =
        fileContents.match(
            new RegExp(`${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{type:"body",variant:"dimmer"\\}`)
        )?.[1] ?? extractedSymbolNames.jsText;

    extractedSymbolNames.navbarButtonFunction =
        fileContents.match(new RegExp(`return ${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{className:"`))?.[1] ??
        extractedSymbolNames.navbarButtonFunction;

    extractedSymbolNames.navbarButtonImageFunction =
        fileContents.match(
            new RegExp(
                `${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{className:"[a-zA-Z0-9_\\$]+",src:[a-zA-Z0-9_\\$]{2},imageRendering:"pixelated"`
            )
        )?.[1] ?? extractedSymbolNames.navbarButtonImageFunction;

    return extractedSymbolNames;
}

/**
 * Extracts the regexes for the replacer function for the Ore UI Customizer.
 *
 * @param {ReturnType<typeof getExtractedSymbolNames>} extractedSymbolNames The extracted function names from the {@link getExtractedSymbolNames} function.
 * @returns An object containing the regexes for the replacer function.
 */
export function getReplacerRegexes(extractedSymbolNames: ReturnType<typeof getExtractedSymbolNames>) {
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
                new RegExp(
                    `function ([a-zA-Z0-9_\\$]{2})\\(\\s*?\\{\\s*?generalData\\s*?:\\s*?e\\s*?,\\s*?isLockedTemplate\\s*?:\\s*?t\\s*?\\}\\s*?\\)\\s*?\\{\\s*?const\\s*?\\{\\s*?t\\s*?:\\s*?(?:[a-zA-Z0-9_\\$]{1})\\s*?\\}\\s*?=\\s*?([a-zA-Z0-9_\\$]{2})\\("CreateNewWorld\\.general"\\)\\s*?,\\s*?([a-zA-Z0-9_\\$]{1})\\s*?=\\s*?([a-zA-Z0-9_\\$]{2})\\(\\)\\s*?,\\s*?o\\s*?=\\s*?\\(\\s*?0\\s*?,\\s*?${extractedSymbolNames.contextHolder}\\s*?\\.\\s*?useContext\\s*?\\)\\s*?\\(\\s*?([a-zA-Z0-9_\\$]{2})\\s*?\\)\\s*?===\\s*?([a-zA-Z0-9_\\$]{2})\\.CREATE\\s*?,\\s*?i=\\s*?\\(\\s*?0\\s*?,\\s*?${extractedSymbolNames.facetHolder}\\.useSharedFacet\\s*?\\)\\s*?\\(\\s*?([a-zA-Z0-9_\\$]{2})\\s*?\\)\\s*?,\\s*?c\\s*?=\\s*?\\(\\s*?0\\s*?,\\s*?${extractedSymbolNames.facetHolder}\\.useFacetMap\\s*?\\)\\s*?\\(\\s*?\\(\\s*?\\(\\s*?e\\s*?,\\s*?t\\s*?,\\s*?(?:[a-zA-Z0-9_\\$]{1})\\s*?\\)\\s*?=>\\s*?(?:[a-zA-Z0-9_\\$]{1})\\s*?\\|\\|\\s*?t\\s*?\\|\\|\\s*?!o\\s*?\\|\\|\\s*?e\\.gameMode\\s*?!==\\s*?([a-zA-Z0-9_\\$]{2})\\.SURVIVAL\\s*?&&\\s*?e\\.gameMode\\s*?!==\\s*?([a-zA-Z0-9_\\$]{2})\\.ADVENTURE\\s*?\\)\\s*?,\\s*?\\[\\s*?o\\s*?\\]\\s*?,\\s*?\\[\\s*?e\\s*?,\\s*?t\\s*?,\\s*?i\\s*?\\]\\s*?\\)\\s*?;\\s*?return \\s*?${extractedSymbolNames.contextHolder}\\.createElement\\(\\s*?([a-zA-Z0-9_\\$]{2})\\s*?,\\s*?\\{\\s*?title\\s*?:\\s*?([a-zA-Z0-9_\\$]{1})\\("\\.hardcoreModeTitle"\\)\\s*?,\\s*?soundEffectPressed\\s*?:\\s*?"ui\\.hardcore_toggle_press"\\s*?,\\s*?disabled\\s*?:\\s*?c\\s*?,\\s*?description\\s*?:\\s*?([a-zA-Z0-9_\\$]{1})\\("\\.hardcoreModeDescription"\\)\\s*?,\\s*?value\\s*?:\\s*?\\(\\s*?0\\s*?,\\s*?${extractedSymbolNames.facetHolder}\\.useFacetMap\\s*?\\)\\s*?\\(\\s*?\\(\\s*?e\\s*?=>\\s*?e\\.isHardcore\\s*?\\)\\s*?,\\s*?\\[\\s*?\\]\\s*?,\\s*?\\[\\s*?e\\s*?\\]\\s*?\\)\\s*?,\\s*?onChange\\s*?:\\s*?\\(\\s*?0\\s*?,\\s*?${extractedSymbolNames.facetHolder}\\.useFacetCallback\\s*?\\)\\s*?\\(\\s*?\\(\\s*?e\\s*?=>\\s*?t\\s*?=>\\s*?\\{\\s*?e\\.isHardcore\\s*?=\\s*?t\\s*?,\\s*?(?:[a-zA-Z0-9_\\$]{1})\\(\\s*?t\\s*?\\?\\s*?"ui\\.hardcore_enable"\\s*?:\\s*?"ui\\.hardcore_disable"\\s*?\\)\\s*?\\}\\s*?\\)\\s*?,\\s*?\\[\\s*?(?:[a-zA-Z0-9_\\$]{1})\\s*?\\]\\s*?,\\s*?\\[\\s*?e\\s*?\\]\\s*?\\)\\s*?,\\s*?gamepad\\s*?:\\s*?\\{\\s*?index\\s*?:\\s*?4\\s*?\\}\\s*?,\\s*?imgSrc\\s*?:\\s*?([a-zA-Z0-9_\\$]{2})\\s*?,\\s*?"data-testid"\\s*?:\\s*?"hardcore-mode-toggle"\\s*?\\}\\s*?\\)\\s*?\\}`,
                    "g"
                ),
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
                new RegExp(
                    `function ([a-zA-Z0-9_\\$]{2})\\(\\{experimentalFeature:e,gamepadIndex:t,disabled:([a-zA-Z0-9_\\$]{1}),achievementsDisabledMessages:([a-zA-Z0-9_\\$]{1}),areAllTogglesDisabled:o\\}\\)\\{const\\{gt:i\\}=function\\(\\)\\{const\\{translate:e,formatDate:t\\}=\\(0,${extractedSymbolNames.contextHolder}\\.useContext\\)\\(([a-zA-Z0-9_\\$]{2})\\);return\\(0,${extractedSymbolNames.contextHolder}\\.useMemo\\)\\(\\(\\(\\)=>\\(\\{f:\\{formatDate:t\\},gt:\\(t,(?:[a-zA-Z0-9_\\$]{1})\\)=>\\{var (?:[a-zA-Z0-9_\\$]{1});return null!==\\((?:[a-zA-Z0-9_\\$]{1})=e\\(t,(?:[a-zA-Z0-9_\\$]{1})\\)\\)&&void 0!==(?:[a-zA-Z0-9_\\$]{1})\\?(?:[a-zA-Z0-9_\\$]{1}):t\\}\\}\\)\\),\\[e,t\\]\\)\\}\\(\\),\\{t:c\\}=${extractedSymbolNames.translationStringResolver}\\("CreateNewWorld\\.all"\\),s=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.id\\),\\[\\],\\[e\\]\\),u=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetUnwrap\\)\\(s\\),d=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.title\\),\\[\\],\\[e\\]\\),m=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetUnwrap\\)\\(d\\),p=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.description\\),\\[\\],\\[e\\]\\),f=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetUnwrap\\)\\(p\\),g=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.isEnabled\\),\\[\\],\\[e\\]\\),E=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(\\(e,t\\)=>e\\|\\|t\\.isTogglePermanentlyDisabled\\),\\[\\],\\[\\(0,${extractedSymbolNames.facetHolder}\\.useFacetWrap\\)\\((?:[a-zA-Z0-9_\\$]{1})\\),e\\]\\),h=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(\\(e,t\\)=>(?:[a-zA-Z0-9_\\$]{1})=>\\{(?:[a-zA-Z0-9_\\$]{1})&&t\\?([a-zA-Z0-9_\\$]{2})\\.set\\(\\{userTriedToActivateToggle:!0,doSetToggleValue:\\(\\)=>e\\.isEnabled=(?:[a-zA-Z0-9_\\$]{1}),userHasAcceptedBetaFeatures:!1\\}\\):e\\.isEnabled=(?:[a-zA-Z0-9_\\$]{1})\\}\\),\\[\\],\\[e,o\\]\\),([a-zA-Z0-9_\\$]{1})=c\\("\\.narrationSuffixDisablesAchievements"\\),([a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>0===e\\.length\\?c\\("\\.narrationSuffixEnablesAchievements"\\):void 0\\),\\[c\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\);return null!=u\\?${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{title:m!==${extractedSymbolNames.facetHolder}\\.NO_VALUE\\?i\\(m\\):"",description:f!==${extractedSymbolNames.facetHolder}\\.NO_VALUE\\?i\\(f\\):"",gamepad:\\{index:t\\},value:g,disabled:E,onChange:h,onNarrationText:([a-zA-Z0-9_\\$]{1}),offNarrationText:(?:[a-zA-Z0-9_\\$]{1})\\}\\):null\\}`
                ),
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
                new RegExp(
                    `function ([a-zA-Z0-9_\\$]{2})\\(\\{generalData:e,isLockedTemplate:t,isUsingTemplate:([a-zA-Z0-9_\\$]{1}),achievementsDisabledMessages:([a-zA-Z0-9_\\$]{1}),isHardcoreMode:o\\}\\)\\{const\\{t:i\\}=${extractedSymbolNames.translationStringResolver}\\("CreateNewWorld\\.general"\\),\\{t:c\\}=${extractedSymbolNames.translationStringResolver}\\("CreateNewWorld\\.all"\\),s=\\(0,${extractedSymbolNames.facetHolder}\\.useSharedFacet\\)\\(([a-zA-Z0-9_\\$]{2})\\),u=\\(0,${extractedSymbolNames.contextHolder}\\.useContext\\)\\(([a-zA-Z0-9_\\$]{2})\\)!==([a-zA-Z0-9_\\$]{2})\\.CREATE,d=\\(0,${extractedSymbolNames.facetHolder}\\.useSharedFacet\\)\\(([a-zA-Z0-9_\\$]{2})\\),m=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(\\(e,t,(?:[a-zA-Z0-9_\\$]{1})\\)=>e\\|\\|t\\|\\|(?:[a-zA-Z0-9_\\$]{1})\\),\\[\\],\\[t,s,o\\]\\),p=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(\\(e,t\\)=>\\{const (?:[a-zA-Z0-9_\\$]{1})=\\[([a-zA-Z0-9_\\$]{2})\\(\\{label:i\\("\\.gameModeSurvivalLabel"\\),description:i\\("\\.gameModeSurvivalDescription"\\),value:([a-zA-Z0-9_\\$]{2})\\.SURVIVAL\\},1===e\\.length\\?\\{narrationSuffix:c\\("\\.narrationSuffixEnablesAchievements"\\)\\}:\\{\\}\\),\\{label:i\\("\\.gameModeCreativeLabel"\\),description:i\\("\\.gameModeCreativeDescription"\\),value:(?:[a-zA-Z0-9_\\$]{2})\\.CREATIVE,narrationSuffix:c\\("\\.narrationSuffixDisablesAchievements"\\)\\}\\];return\\(u\\|\\|t\\)&&(?:[a-zA-Z0-9_\\$]{1})\\.push\\((?:[a-zA-Z0-9_\\$]{2})\\(\\{label:i\\("\\.gameModeAdventureLabel"\\),description:i\\(t\\?"\\.gameModeAdventureTemplateDescription":"\\.gameModeAdventureDescription"\\),value:(?:[a-zA-Z0-9_\\$]{2})\\.ADVENTURE\\},1===e\\.length\\?\\{narrationSuffix:c\\("\\.narrationSuffixEnablesAchievements"\\)\\}:\\{\\}\\)\\),(?:[a-zA-Z0-9_\\$]{1})\\}\\),\\[i,c,u\\],\\[(?:[a-zA-Z0-9_\\$]{1}),(?:[a-zA-Z0-9_\\$]{1})\\]\\),f=\\(0,${extractedSymbolNames.facetHolder}\\.useNotifyMountComplete\\)\\(\\);return ${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{title:i\\("\\.gameModeTitle"\\),disabled:m,options:p,onMountComplete:f,value:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.gameMode\\),\\[\\],\\[e\\]\\),onChange:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(\\(e,t\\)=>(?:[a-zA-Z0-9_\\$]{1})=>\\{const ([a-zA-Z0-9_\\$]{1})=e\\.gameMode;e\\.gameMode=(?:[a-zA-Z0-9_\\$]{1}),u&&t\\.trackOptionChanged\\(([a-zA-Z0-9_\\$]{2})\\.GameModeChanged,(?:[a-zA-Z0-9_\\$]{1}),(?:[a-zA-Z0-9_\\$]{1})\\)\\}\\),\\[u\\],\\[e,d\\]\\)\\}\\)\\}`
                ),
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
                new RegExp(
                    `function\\(e\\)\\{e\\[e\\.UNKNOWN=-1\\]="UNKNOWN",e\\[e\\.SURVIVAL=0\\]="SURVIVAL",e\\[e\\.CREATIVE=1\\]="CREATIVE",e\\[e\\.ADVENTURE=2\\]="ADVENTURE"(?:,e\\[e\\.DEFAULT=5\\]="DEFAULT",e\\[e\\.SPECTATOR=6\\]="SPECTATOR")\\}\\(([a-zA-Z0-9_\\$]{2})\\|\\|\\(([a-zA-Z0-9_\\$]{2})=\\{\\}\\)\\),`
                ),
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
                new RegExp(
                    `(?:[a-zA-Z0-9_\\$]{1})&&!(?:[a-zA-Z0-9_\\$]{1})\\?${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.Mount,\\{when:([a-zA-Z0-9_\\$]{1})\\},${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.DeferredMount,null,${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{label:([a-zA-Z0-9_\\$]{1})\\("\\.generatorTypeLabel"\\),options:\\[\\{value:([a-zA-Z0-9_\\$]{2})\\.Overworld,label:(?:[a-zA-Z0-9_\\$]{1})\\("\\.vanillaWorldGeneratorLabel"\\),description:(?:[a-zA-Z0-9_\\$]{1})\\("\\.vanillaWorldGeneratorDescription"\\)\\},\\{value:(?:[a-zA-Z0-9_\\$]{2})\\.Flat,label:(?:[a-zA-Z0-9_\\$]{1})\\("\\.flatWorldGeneratorLabel"\\),description:(?:[a-zA-Z0-9_\\$]{1})\\("\\.flatWorldGeneratorDescription"\\)\\},\\{value:(?:[a-zA-Z0-9_\\$]{2})\\.Void,label:(?:[a-zA-Z0-9_\\$]{1})\\("\\.voidWorldGeneratorLabel"\\),description:(?:[a-zA-Z0-9_\\$]{1})\\("\\.voidWorldGeneratorDescription"\\)\\}\\],value:([a-zA-Z0-9_\\$]{1})\\.value,onChange:(?:[a-zA-Z0-9_\\$]{1})\\.onChange\\}\\)\\)\\):null`
                ),
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
                new RegExp(
                    `function\\(e\\)\\{e\\[e\\.Legacy=0\\]="Legacy",e\\[e\\.Overworld=1\\]="Overworld",e\\[e\\.Flat=2\\]="Flat",e\\[e\\.Nether=3\\]="Nether",e\\[e\\.TheEnd=4\\]="TheEnd",e\\[e\\.Void=5\\]="Void",e\\[e\\.Undefined=6\\]="Undefined"\\}\\(([a-zA-Z0-9_\\$]{2})\\|\\|\\((?:[a-zA-Z0-9_\\$]{2})=\\{\\}\\)\\),`
                ),
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
                new RegExp(
                    `([a-zA-Z0-9_\\$]{2})=\\(\\{advancedData:e,isEditorWorld:t,onSeedValueChange:([a-zA-Z0-9_\\$]{1}),isSeedChangeLocked:([a-zA-Z0-9_\\$]{1}),showSeedTemplates:o\\}\\)=>\\{const\\{t:i\\}=([a-zA-Z0-9_\\$]{2})\\("CreateNewWorld\\.advanced"\\),\\{t:c\\}=(?:[a-zA-Z0-9_\\$]{2})\\("CreateNewWorld\\.all"\\),s=\\(0,${extractedSymbolNames.contextHolder}\\.useContext\\)\\(([a-zA-Z0-9_\\$]{2})\\)!==([a-zA-Z0-9_\\$]{2})\\.CREATE,u=([a-zA-Z0-9_\\$]{2})\\(([a-zA-Z0-9_\\$]{2})\\),d=([a-zA-Z0-9_\\$]{2})\\(\\),m=\\(0,${extractedSymbolNames.facetHolder}\\.useSharedFacet\\)\\(([a-zA-Z0-9_\\$]{2})\\),p=\\(0,${extractedSymbolNames.facetHolder}\\.useSharedFacet\\)\\(([a-zA-Z0-9_\\$]{2})\\),f=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.worldSeed\\),\\[\\],\\[e\\]\\),g=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.isClipboardCopySupported\\),\\[\\],\\[m\\]\\),E=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(\\(e,t,(?:[a-zA-Z0-9_\\$]{1})\\)=>\\(\\)=>\\{t\\.copyToClipboard\\(e\\),(?:[a-zA-Z0-9_\\$]{1})\\.queueSnackbar\\(i\\("\\.copyToClipboard"\\)\\)\\}\\),\\[i\\],\\[f,m,p\\]\\),h=s\\?E:\\(\\)=>d\\.push\\("/create-new-world/seed-templates"\\),([a-zA-Z0-9_\\$]{1})=s\\?"":i\\("\\.worldSeedPlaceholder"\\),([a-zA-Z0-9_\\$]{1})=i\\(s\\?"\\.worldSeedCopyButton":"\\.worldSeedButton"\\),y=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(\\(e,t,(?:[a-zA-Z0-9_\\$]{1})\\)=>t\\|\\|(?:[a-zA-Z0-9_\\$]{1})&&u&&!s&&e\\.generatorType!=([a-zA-Z0-9_\\$]{2})\\.Overworld\\),\\[u,s\\],\\[e,(?:[a-zA-Z0-9_\\$]{1}),t\\]\\);return o\\?${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.DeferredMount,null,${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{data:g\\},\\(e=>s&&!e\\?${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{disabled:s,label:i\\("\\.worldSeedLabel"\\),description:i\\("\\.worldSeedDescription"\\),maxLength:32,value:f,onChange:(?:[a-zA-Z0-9_\\$]{1}),placeholder:i\\("\\.worldSeedPlaceholder"\\),disabledNarrationSuffix:c\\("\\.narrationSuffixTemplateLocked"\\),"data-testid":"world-seed-text-field"\\}\\):${extractedSymbolNames.contextHolder}\\.createElement\\((?:[a-zA-Z0-9_\\$]{2})\\.WithButton,\\{buttonInputLegend:(?:[a-zA-Z0-9_\\$]{1}),buttonText:(?:[a-zA-Z0-9_\\$]{1}),buttonOnClick:h,textDisabled:s,disabled:y,label:i\\("\\.worldSeedLabel"\\),description:i\\("\\.worldSeedDescription"\\),maxLength:32,value:f,onChange:(?:[a-zA-Z0-9_\\$]{1}),placeholder:(?:[a-zA-Z0-9_\\$]{1}),buttonNarrationHint:i\\("\\.narrationTemplatesButtonNarrationHint"\\),disabledNarrationSuffix:c\\("\\.narrationSuffixTemplateLocked"\\),"data-testid":"world-seed-with-button"\\}\\)\\)\\)\\):${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.DeferredMount,null,${extractedSymbolNames.contextHolder}\\.createElement\\((?:[a-zA-Z0-9_\\$]{2}),\\{disabled:y,label:i\\("\\.worldSeedLabel"\\),description:i\\("\\.worldSeedDescription"\\),maxLength:32,value:f,onChange:(?:[a-zA-Z0-9_\\$]{1}),placeholder:i\\("\\.worldSeedPlaceholder"\\),disabledNarrationSuffix:c\\("\\.narrationSuffixTemplateLocked"\\)\\}\\)\\)\\},`
                ),
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
                new RegExp(
                    `${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.Mount,\\{when:(?:[a-zA-Z0-9_\\$]{1})\\},${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{value:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.useFlatWorld\\),\\[\\],\\[([a-zA-Z0-9_\\$]{1})\\]\\),preset:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.flatWorldPreset\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),onValueChanged:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.useFlatWorld=t,t&&e\\.flatWorldPreset\\?([a-zA-Z0-9_\\$]{1})\\(([a-zA-Z0-9_\\$]{2})\\[e\\.flatWorldPreset\\]\\):(?:[a-zA-Z0-9_\\$]{1})\\(""\\)\\}\\),\\[(?:[a-zA-Z0-9_\\$]{1})\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),onPresetChanged:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.flatWorldPreset=t,e\\.useFlatWorld\\?(?:[a-zA-Z0-9_\\$]{1})\\((?:[a-zA-Z0-9_\\$]{2})\\[t\\]\\):(?:[a-zA-Z0-9_\\$]{1})\\(""\\)\\}\\),\\[(?:[a-zA-Z0-9_\\$]{1})\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),disabled:(?:[a-zA-Z0-9_\\$]{1}),hideAccordion:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>null==e\\.flatWorldPreset\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),achievementsDisabledMessages:([a-zA-Z0-9_\\$]{1})\\}\\)\\)\\)`
                ),
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
                new RegExp(
                    `return ${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.contextHolder}\\.Fragment,null,${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.Mount,\\{when:(?:[a-zA-Z0-9_\\$]{1})\\},${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{onChange:([a-zA-Z0-9_\\$]{1}),value:([a-zA-Z0-9_\\$]{1}),title:([a-zA-Z0-9_\\$]{1})\\("\\.useFlatWorldTitle"\\),description:(?:[a-zA-Z0-9_\\$]{1})\\("\\.useFlatWorldDescription"\\),disabled:([a-zA-Z0-9_\\$]{1}),offNarrationText:([a-zA-Z0-9_\\$]{1}),onNarrationText:([a-zA-Z0-9_\\$]{1}),narrationSuffix:([a-zA-Z0-9_\\$]{1})\\}\\)\\),${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.Mount,\\{when:(?:[a-zA-Z0-9_\\$]{1}),condition:!1\\},${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{title:(?:[a-zA-Z0-9_\\$]{1})\\("\\.useFlatWorldTitle"\\),description:(?:[a-zA-Z0-9_\\$]{1})\\("\\.useFlatWorldDescription"\\),value:(?:[a-zA-Z0-9_\\$]{1}),onChange:(?:[a-zA-Z0-9_\\$]{1}),disabled:(?:[a-zA-Z0-9_\\$]{1}),narrationSuffix:(?:[a-zA-Z0-9_\\$]{1}),offNarrationText:(?:[a-zA-Z0-9_\\$]{1}),onNarrationText:(?:[a-zA-Z0-9_\\$]{1}),onExpandNarrationHint:([a-zA-Z0-9_\\$]{1})\\},${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{title:([a-zA-Z0-9_\\$]{1})\\("\\.title"\\),customSelectionDescription:${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{preset:([a-zA-Z0-9_\\$]{1})\\}\\),options:([a-zA-Z0-9_\\$]{1}),value:([a-zA-Z0-9_\\$]{1}),onItemSelect:e=>([a-zA-Z0-9_\\$]{1})\\(([a-zA-Z0-9_\\$]{2})\\[e\\]\\),disabled:(?:[a-zA-Z0-9_\\$]{1}),wrapperRole:"neutral80",indented:!0,dropdownNarrationSuffix:([a-zA-Z0-9_\\$]{1})\\}\\)\\)\\)\\)`
                ),
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
                new RegExp(
                    `function ([a-zA-Z0-9_\\$]{2})\\(\\{(?:worldData:e,achievementsDisabledMessages:t,)?onUnlockTemplateSettings:(?:[a-zA-Z0-9_\\$]{1}),onExportTemplate:(?:[a-zA-Z0-9_\\$]{1}),onClearPlayerData:(?:[a-zA-Z0-9_\\$]{1}),isEditorWorld:(?:[a-zA-Z0-9_\\$]{1})\\}\\)\\{const (?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useSharedFacet\\)\\(([a-zA-Z0-9_\\$]{2})\\),(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(\\(\\{allBiomes:e\\}\\)=>e\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),(?:(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.isLockedTemplate\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.achievementsDisabled\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),)?(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(\\(\\{spawnDimensionId:e\\}\\)=>e\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>([a-zA-Z0-9_\\$]{2})\\(e,\\(e=>\\(\\{label:e\\.label,dimension:e\\.dimension,value:e\\.id\\}\\)\\)\\)\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(\\(e,t\\)=>([a-zA-Z0-9_\\$]{2})\\(e,\\(e=>e\\.dimension===t\\)\\)\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1}),(?:[a-zA-Z0-9_\\$]{1})\\]\\),(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.spawnBiomeId\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.defaultSpawnBiome\\|\\|e\\.isBiomeOverrideActive\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useSharedFacet\\)\\(([a-zA-Z0-9_\\$]{2})\\),(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>([a-zA-Z0-9_\\$]{2})\\(e\\.platform\\)\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.contextHolder}\\.useContext\\)\\(([a-zA-Z0-9_\\$]{2})\\)!==([a-zA-Z0-9_\\$]{2})\\.CREATE,(?:[a-zA-Z0-9_\\$]{1})=\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e&&(?:[a-zA-Z0-9_\\$]{1})\\),\\[(?:[a-zA-Z0-9_\\$]{1})\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\);return ${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.DeferredMountProvider,null,${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{(?:isLockedTemplate:u,achievementsDisabled:d,achievementsDisabledMessages:t,)?narrationText:"Debug",onUnlockTemplateSettings:(?:[a-zA-Z0-9_\\$]{1}),isEditorWorld:(?:[a-zA-Z0-9_\\$]{1})\\},${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.DeferredMount,null,${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{title:"Flat nether",gamepad:\\{index:0\\},value:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.flatNether\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),onChange` +
                        `:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.flatNether=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\)\\}\\)\\),${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.DeferredMount,null,${extractedSymbolNames.contextHolder}\\.createElement\\((?:[a-zA-Z0-9_\\$]{2}),\\{title:"Enable game version override",gamepad:\\{index:1\\},value:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.enableGameVersionOverride\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),onChange:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.enableGameVersionOverride=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\)\\}\\)\\),${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.DeferredMount,null,${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{label:"Game version override",gamepadIndex:2,placeholder:"0\\.0\\.0",maxLength:30,disabled:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>!e\\.enableGameVersionOverride\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),value:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.gameVersionOverride\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),onChange:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.gameVersionOverride=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\)\\}\\)\\),` +
                        `${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.DeferredMount,null,${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{title:"World biome settings"\\}\\)\\),${extractedSymbolNames.contextHolder}\\.createElement\\((?:[a-zA-Z0-9_\\$]{2}),\\{title:"Default spawn biome",description:"Using the default spawn biome will mean a random overworld spawn is selected",gamepad:\\{index:3\\},disabled:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.isBiomeOverrideActive\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),value:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.defaultSpawnBiome\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),onChange:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.defaultSpawnBiome=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\)\\}\\),${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.DeferredMount,null,${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{onMountComplete:\\(0,${extractedSymbolNames.facetHolder}\\.useNotifyMountComplete\\)\\(\\),title:"Spawn dimension filter",disabled:(?:[a-zA-Z0-9_\\$]{1}),wrapToggleText:!0,options:\\[\\{label:"Overworld",value:0\\},\\{label:"Nether",value:1\\}\\],value:(?:[a-zA-Z0-9_\\$]{1}),onChange:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.spawnDimensionId=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\)\\}\\)\\),${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.DeferredMount,null,${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{title:"Spawn biome",options:(?:[a-zA-Z0-9_\\$]{1}),onItemSelect:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(e=>t=>e\\.spawnBiomeId=t\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),disabled:(?:[a-zA-Z0-9_\\$]{1}),value:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(\\(e,t\\)=>t\\.filter\\(\\(t=>t\\.value===e\\)\\)\\.length>0\\?e:t\\[0\\]\\.value\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1}),(?:[a-zA-Z0-9_\\$]{1})\\]\\),focusOnSelectedItem:!0\\}\\)\\),${extractedSymbolNames.contextHolder}\\.createElement\\((?:[a-zA-Z0-9_\\$]{2}),\\{title:"Biome override",description:"Set the world to a selected biome\\. This will override the Spawn biome!",gamepad:\\{index:6\\},value:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.isBiomeOverrideActive\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),onChange:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.isBiomeOverrideActive=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\)\\}\\),${extractedSymbolNames.contextHolder}\\.createElement\\((?:[a-zA-Z0-9_\\$]{2}),\\{title:"Biome override",` +
                        `description:"Select biome to be used in the entire world",options:(?:[a-zA-Z0-9_\\$]{1}),disabled:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>!e\\.isBiomeOverrideActive\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),onItemSelect:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.biomeOverrideId=t\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),value:\\(0,${extractedSymbolNames.facetHolder}\\.useFacetMap\\)\\(\\(e=>e\\.biomeOverrideId\\),\\[\\],\\[(?:[a-zA-Z0-9_\\$]{1})\\]\\),focusOnSelectedItem:!0\\}\\),${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.Mount,\\{when:(?:[a-zA-Z0-9_\\$]{1})\\},${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{onExportTemplate:(?:[a-zA-Z0-9_\\$]{1}),onClearPlayerData:(?:[a-zA-Z0-9_\\$]{1})\\}\\)\\)\\)\\)\\}`
                ),
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
                new RegExp(`e&&([tr])\\.push\\(\\{label:"\\.debugTabLabel",image:([a-zA-Z0-9_\\$]{2}),value:"debug"\\}\\),`),
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
                new RegExp(
                    `${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.facetHolder}\\.Mount,\\{when:([a-zA-Z0-9_\\$]{1})\\},${extractedSymbolNames.contextHolder}\\.createElement\\(${extractedSymbolNames.contextHolder}\\.Fragment,null,${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2})\\.Divider,null\\),${extractedSymbolNames.contextHolder}\\.createElement\\(([a-zA-Z0-9_\\$]{2}),\\{onClick:([eo]),screenAnalyticsId:([a-zA-Z0-9_\\$]{1})\\}\\)\\)\\)`
                ),
            ],
        },
    } as const;
    return replacerRegexes;
}

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
export const builtInPlugins = [
    {
        name: "Add exact ping count to servers tab.",
        id: "add-exact-ping-count-to-servers-tab",
        namespace: "built-in",
        version: "0.25.0",
        actions: [
            {
                id: "add-exact-ping-count-to-servers-tab",
                context: "per_text_file",
                action: async (currentFileContent: string, file: zip.ZipFileEntry<any, any>): Promise<string> => {
                    if (!/index-[0-9a-f]{5,20}\.js$/.test(file.data?.filename!)) return currentFileContent;
                    const origData: string = await file.getText();
                    const bindingVaiableTarget = origData
                        .match(
                            /\(0,[\s\n]*?([a-zA-Z0-9_\$]).useFacetMap\)\(\(?\(?[a-zA-Z0-9_\$]\)?[\s\n]*?=>[\s\n]*?[a-zA-Z0-9_\$]\.networkDetails\.pingStatus\)?,[\s\n]*?\[\],[\s\n]*?\[([a-zA-Z0-9_\$])\]\)/
                        )
                        ?.slice(1, 3);
                    if (!bindingVaiableTarget) {
                        throw new Error("Unable to find binding variable target.");
                    }
                    currentFileContent = currentFileContent.replace(
                        /\.createElement\(([a-zA-Z0-9_\$]{2}),[\s\n]*?\{[\s\n]*?pingStatus:[\s\n]*?([a-zA-Z0-9_\$])[\s\n]*?\}\)/g,
                        `.createElement($1, { pingStatus: $2, ping: (0, ${bindingVaiableTarget[0]}.useFacetMap)((e) => e.networkDetails.ping === "-1" ? "Loading..." : e.networkDetails.ping, [], [${bindingVaiableTarget[1]}]) })`
                    );
                    currentFileContent = currentFileContent.replace(
                        /function ([a-zA-Z0-9_\$]{2})\(\{pingStatus:([a-zA-Z0-9_\$])\}\){const ([a-zA-Z0-9_\$])=([a-zA-Z0-9_\$]{2})\((?:[a-zA-Z0-9_\$])\);return ([a-zA-Z0-9_\$])\.createElement\("div",\{className:"([^"]+?)"\},(?:[a-zA-Z0-9_\$])\.createElement\(([a-zA-Z0-9_\$]{2}),\{data:(?:[a-zA-Z0-9_\$]),children:([a-zA-Z0-9_\$]{2})\}\),(?:[a-zA-Z0-9_\$])\.createElement\(([a-zA-Z0-9_\$]{2}),\{size:1\}\),(?:[a-zA-Z0-9_\$])\.createElement\(([a-zA-Z0-9_\$]{2}),\{type:"body",variant:"dimmer"\},(?:[a-zA-Z0-9_\$])\)\)\}/,
                        `function $1({pingStatus:$2,ping}){const $3=$4($2);return $5.createElement("div",{className:"$6"},$5.createElement($7,{data:$2,children:$8}),$5.createElement($9,{size:1}),$5.createElement($10,{type:"body",variant:"dimmer"},ping))}`
                    );
                    return currentFileContent;
                },
            },
        ],
        format_version: "0.25.0",
        min_engine_version: "0.25.0",
    },
    {
        name: "Add max player count to servers tab.",
        id: "add-max-player-count-to-servers-tab",
        namespace: "built-in",
        version: "0.25.0",
        actions: [
            {
                id: "add-max-player-count-to-servers-tab",
                context: "per_text_file",
                action: async (currentFileContent: string, file: zip.ZipFileEntry<any, any>): Promise<string> => {
                    if (!/index-[0-9a-f]{5,20}\.js$/.test(file.data?.filename!)) return currentFileContent;
                    if (
                        !/function ([a-zA-Z0-9_\$]{2})\(\{playerCount:([a-zA-Z0-9_\$]),maximumCapacity:([a-zA-Z0-9_\$])\}\)\{const ([a-zA-Z0-9_\$])=\(0,([a-zA-Z0-9_\$])\.useFacetMap\)\(\(\((?:[a-zA-Z0-9_\$]),(?:[a-zA-Z0-9_\$])\)=>0!==(?:[a-zA-Z0-9_\$])&&(?:[a-zA-Z0-9_\$])===(?:[a-zA-Z0-9_\$])\),\[\],\[(?:[a-zA-Z0-9_\$]),(?:[a-zA-Z0-9_\$])\]\),\{(?:[a-zA-Z0-9_\$]):(?:[a-zA-Z0-9_\$])\}=([a-zA-Z0-9_\$]{2})\("PlayScreen\.serverCapacity"\);return ([a-zA-Z0-9_\$])\.createElement\("div",\{className:"([^"]+?)"\},(?:[a-zA-Z0-9_\$])\.createElement\(([a-zA-Z0-9_\$]{2}),null\),(?:[a-zA-Z0-9_\$])\.createElement\(([a-zA-Z0-9_\$]{2}),\{size:1\}\),(?:[a-zA-Z0-9_\$])\.createElement\(([a-zA-Z0-9_\$]{2}),\{type:"body",variant:"dimmer"\},(?:[a-zA-Z0-9_\$])\)/.test(
                            currentFileContent
                        )
                    ) {
                        throw new Error("Unable to find binding variable target.");
                    }
                    currentFileContent = currentFileContent.replace(
                        /function ([a-zA-Z0-9_\$]{2})\(\{playerCount:([a-zA-Z0-9_\$]),maximumCapacity:([a-zA-Z0-9_\$])\}\)\{const ([a-zA-Z0-9_\$])=\(0,([a-zA-Z0-9_\$])\.useFacetMap\)\(\(\((?:[a-zA-Z0-9_\$]),(?:[a-zA-Z0-9_\$])\)=>0!==(?:[a-zA-Z0-9_\$])&&(?:[a-zA-Z0-9_\$])===(?:[a-zA-Z0-9_\$])\),\[\],\[(?:[a-zA-Z0-9_\$]),(?:[a-zA-Z0-9_\$])\]\),\{(?:[a-zA-Z0-9_\$]):([a-zA-Z0-9_\$])\}=([a-zA-Z0-9_\$]{2})\("PlayScreen\.serverCapacity"\);return ([a-zA-Z0-9_\$])\.createElement\("div",\{className:"([^"]+?)"\},(?:[a-zA-Z0-9_\$])\.createElement\(([a-zA-Z0-9_\$]{2}),null\),(?:[a-zA-Z0-9_\$])\.createElement\(([a-zA-Z0-9_\$]{2}),\{size:1\}\),(?:[a-zA-Z0-9_\$])\.createElement\(([a-zA-Z0-9_\$]{2}),\{type:"body",variant:"dimmer"\},(?:[a-zA-Z0-9_\$])\)/,
                        `function $1({playerCount:$2,maximumCapacity:$3}){const $4=(0,$5.useFacetMap)((($2,$3)=>0!==$2&&$2===$3),[],[$2,$3]),{$3:$6}=$7("PlayScreen.serverCapacity");return $8.createElement("div",{className:"$9"},$8.createElement($10,null),$8.createElement($11,{size:1}),$8.createElement($12,{type:"body",variant:"dimmer"},(0, $5.useFacetMap)(($2, $3) => \`\${$2}/\${$3}\`, [], [$2, $3]))`
                    );
                    return currentFileContent;
                },
            },
        ],
        format_version: "0.25.0",
        min_engine_version: "0.25.0",
    },
    {
        name: "Facet spy.",
        id: "facet-spy",
        namespace: "built-in",
        version: "1.0.0",
        actions: [
            {
                id: "inject-facet-spy",
                context: "per_text_file",
                action: async (currentFileContent: string, file: zip.ZipFileEntry<any, any>): Promise<string> => {
                    if (!/(?:index|gameplay|editor)-[0-9a-f]{5,20}\.js$/.test(file.data?.filename!)) return currentFileContent;
                    const origData: string = await file.getText();
                    if (
                        !/inverse:\(0,([a-zA-Z0-9_\$])\.useFacetMap\)\(\(([a-zA-Z0-9_\$])=>"POP"===(?:[a-zA-Z0-9_\$])\),\[\],\[([a-zA-Z0-9_\$])\]\)\}\)\)\)/.test(
                            currentFileContent
                        )
                    ) {
                        throw new Error("Unable to find facet spy render injection location.");
                    }
                    /**
                     * The symbol name of the facet access holder.
                     */
                    const facetAccessHolderBindingVariableTarget: string = currentFileContent.match(
                        /inverse:\(0,([a-zA-Z0-9_\$])\.useFacetMap\)\(\(([a-zA-Z0-9_\$])=>"POP"===(?:[a-zA-Z0-9_\$])\),\[\],\[([a-zA-Z0-9_\$])\]\)\}\)\)\)/
                    )![1]!;
                    currentFileContent = currentFileContent.replace(
                        /inverse:\(0,([a-zA-Z0-9_\$])\.useFacetMap\)\(\(([a-zA-Z0-9_\$])=>"POP"===(?:[a-zA-Z0-9_\$])\),\[\],\[([a-zA-Z0-9_\$])\]\)\}\)\)\)/,
                        `inverse:(0,$1.useFacetMap)((($2)=>"POP"===$2),[],[$3])}))),${origData.match(
                            /([a-zA-Z0-9_\$])\.createElement\((?:[a-zA-Z0-9_\$]),\{visible:(?:[a-zA-Z0-9_\$]),alwaysMounted:(?:[a-zA-Z0-9_\$]),/
                        )![1]!}.createElement(facetSpy,null)`
                    );
                    /**
                     * The facet spy function that will be injected into the file.
                     */
                    const facetSpyFunction = `${
                        /index-[0-9a-f]{5,20}\.js$/.test(file.data?.filename!)
                            ? `var $1 = (globalThis.contextHolder = $2($3)),
                ${facetAccessHolderBindingVariableTarget} = (globalThis.facetAccessHolder = $2($4));`
                            : /gameplay-[0-9a-f]{5,20}\.js$/.test(file.data?.filename!)
                            ? `.URLSearchParams;
            var ${facetAccessHolderBindingVariableTarget} = (globalThis.facetAccessHolder = $1($2));`
                            : `var ${facetAccessHolderBindingVariableTarget} = (globalThis.facetAccessHolder = $1($2));`
                    }
            const facetList = [
                "core.animation",
                "core.customScaling",
                "core.deviceInformation",
                "core.featureFlags",
                "core.input",
                "core.locale",
                "core.performanceFacet",
                "core.router",
                "core.safeZone",
                "core.screenReader",
                "core.splitScreen",
                "core.social",
                "core.sound",
                "core.user",
                "core.vrMode", // Found in dev build file.

                "vanilla.achievements",
                "vanilla.achievementsReward",
                "vanilla.buildSettings",
                "vanilla.clipboard",
                "vanilla.createNewWorld",
                "vanilla.createPreviewRealmFacet",
                "vanilla.debugSettings",
                "vanilla.editor",
                "vanilla.editorInput",
                "vanilla.editorLogging",
                "vanilla.editorScripting",
                "vanilla.editorSelectionFacet",
                "vanilla.editorSettings",
                "vanilla.externalServerWorldList",
                "vanilla.followersList",
                "vanilla.friendsListFacet",
                "vanilla.friendsManagerFacet",
                "vanilla.gameplay.activeLevelHardcoreMode",
                "vanilla.gameplay.bedtime",
                "vanilla.gameplay.closeContainerCommand",
                "vanilla.gameplay.containerBlockActorType",
                "vanilla.gameplay.containerItemQuery",
                "vanilla.gameplay.containerSizeQuery",
                "vanilla.gameplay.furnace",
                "vanilla.gameplay.immediateRespawn",
                "vanilla.gameplay.leaveGame",
                "vanilla.gameplay.playerDeathInfo",
                "vanilla.gameplay.playerPositionHudElement",
                "vanilla.gameplay.playerRespawn",
                "vanilla.gamertagSearch",
                "vanilla.inbox",
                "vanilla.lanWorldList",
                "vanilla.localWorldList",
                "vanilla.marketplaceSuggestions",
                "vanilla.marketplacePassWorldTemplateList",
                "vanilla.networkWorldDetails",
                "vanilla.networkWorldJoiner",
                "vanilla.notificationOptions",
                "vanilla.notifications",
                "vanilla.options",
                "vanilla.party", // Found in dev build file.
                "vanilla.playerAchievements",
                "vanilla.playerBanned",
                "vanilla.playerFollowingList",
                "vanilla.playerLinkedPlatformProfile", // Found in dev build file.
                "vanilla.playermessagingservice",
                "vanilla.playerPermissions",
                "vanilla.playerProfile",
                "vanilla.playerReport",
                "vanilla.playerSocialManager",
                "vanilla.playerStatistics",
                "vanilla.privacyAndOnlineSafetyFacet",
                "vanilla.profanityFilter",
                "vanilla.realmsListFacet",
                "vanilla.realmSlots",
                "vanilla.realmsMembership",
                "vanilla.realmsStories.actions",
                "vanilla.realmsStories.localScreenshots",
                "vanilla.realmsStories.persistentData",
                "vanilla.realmsStories.players",
                "vanilla.realmsStories.realmData",
                "vanilla.realmsStories.settings",
                "vanilla.realmsStories.stories",
                "vanilla.RealmsPDPFacet",
                "vanilla.RealmWorldUploaderFacet",
                "vanilla.recentlyPlayedWithList",
                "vanilla.recommendedFriendsList",
                "vanilla.resourcePackOverrides",
                "vanilla.resourcePacks",
                "vanilla.screenshotGalleryList",
                "vanilla.screenSpecificOptions",
                "vanilla.screenTechStack",
                "vanilla.seedTemplates",
                "vanilla.share",
                "vanilla.simulationDistanceOptions",
                "vanilla.telemetry",
                "vanilla.thirdPartyWorldList",
                "vanilla.unpairedRealmsListFacet",
                "vanilla.userAccount",
                "vanilla.webBrowserFacet",
                "vanilla.worldCloudSyncFacet",
                "vanilla.worldEditor",
                "vanilla.worldOperations",
                "vanilla.worldPackages",
                "vanilla.worldPlayersList",
                "vanilla.worldStartup",
                "vanilla.worldTemplateList",
                "vanilla.worldTransfer",

                "vanilla.friendworldlist",
                "vanilla.offerRepository",
                "vanilla.realmsStories.actions",
                "vanilla.realmsStories.realmData",
                "vanilla.realmsStories.persistentData",
                "vanilla.realmsSettingsFacet",

                "vanilla.achievementCategories",
                "vanilla.blockInformation",
                "debug.worldTransfer",
                "vanilla.flatWorldPresets",
                "vanilla.inGame",
                "vanilla.playerPrivacy",
                "vanilla.realmsPurchase",
                "vanilla.realmsSubscriptionsData",
                "vanilla.realmsSubscriptionsMethods",
                "vanilla.realmsWorldContextCommands",
                "vanilla.realmsWorldContextQueries",
                "vanilla.realmsStories.sessions",
                "vanilla.realmsListActionsFacet",
                "vanilla.developerOptionsFacet",
                "vanilla.realmsStories.comments",
                "vanilla.screenshotGallery",
                "vanilla.playerShowcasedGallery",
                "vanilla.trialMode",
                "vanilla.featuredWorldTemplateList",
                "vanilla.ownedWorldTemplateList",
                "vanilla.worldTemplateOperations",
                "test.vector",
                // "vanilla.editorBlockPalette", // Crashes the game.
                // "vanilla.editorInputBinding",
                // "vanilla.editorInputState",
                // "vanilla.editorProjectConstants",
                // "vanilla.editorStructure",
                // "vanilla.editorTutorial",
                "vanilla.gameplay.localPlayerWeatherLightningFacet",
                "vanilla.levelInfo",
                "vanilla.currentParty",
                "vanilla.partyCommands",
                "vanilla.worldRealmEditor", // Found in dev build file.
                "vanilla.worldRealmEditorCommands",
                "vanilla.worldRealmEditorQueries",
                "vanilla.realmBackupsCommands",
                "vanilla.realmBackupsQueries",
                "vanilla.realmsPurchaseCommands",
                "vanilla.realmsPurchaseReconcilerQueries",
                "vanilla.character-selector",
                "vanilla.progressTracker",

                // Found in preview 1.21.100.21.
                "vanilla.realmsWorldEditorGameRulesCommands",
                "vanilla.realmsWorldEditorGameRulesQueries",
                "vanilla.realmsWorldEditorWorldDetailsQueries",
                "vanilla.realmsCommitCommandsFacet",
                "vanilla.realmsCommitQueriesFacet",
                "vanilla.realmsPurchaseQueries",
            ];
            function facetSpy({}) {
                let data = globalThis.facetSpyData ?? {
                    sharedFacets: Object.fromEntries(facetList.map((name) => [name, (0, ${facetAccessHolderBindingVariableTarget}.useSharedFacet)((0, ${facetAccessHolderBindingVariableTarget}.sharedFacet)(name))])),
                };
                /**
                 * Gets access to the provided facet.
                 *
                 * @param {string} facet The identifier of the facet to get access to.
                 */
                function getFacetAccess(facet) {
                    ${facetAccessHolderBindingVariableTarget}.render(
                        contextHolder.createElement(() => {
                            const a = (0, ${facetAccessHolderBindingVariableTarget}.useSharedFacet)(${facetAccessHolderBindingVariableTarget}.sharedFacet(facet)),
                                b = (0, ${facetAccessHolderBindingVariableTarget}.useFacetCallback)((a) => () => {}, [], [a]);
                            return null;
                        }),
                        document.createElement("div")
                    );
                }
                for (const name of facetList) {
                    try {
                        if (data.sharedFacets[name].get()?.toString?.() === "Symbol(NoValue)") {
                            getFacetAccess(name);
                        }
                    } catch {}
                }

                globalThis.facetSpyData = data;
                return null;
            }
            globalThis.facetSpy = facetSpy;
            globalThis.accessedFacets = {};/* 
            
            function facetSpy({}) {
                let data = {
                    sharedFacets: {
                        "vanilla.clipboard": (0, ${facetAccessHolderBindingVariableTarget}.useSharedFacet)(Ii),
                        "core.sound": (0, ${facetAccessHolderBindingVariableTarget}.useSharedFacet)(Hl),
                        "core.deviceInformation": (0, ${facetAccessHolderBindingVariableTarget}.useSharedFacet)(${facetAccessHolderBindingVariableTarget}.sharedFacet("core.deviceInformation")),
                        "core.performanceFacet": (0, ${facetAccessHolderBindingVariableTarget}.useSharedFacet)(${facetAccessHolderBindingVariableTarget}.sharedFacet("core.performanceFacet")),
                    }
                };
                if (globalThis.facetSpyData) {
                    data = globalThis.facetSpyData;
                    try {
                        if (data.sharedFacets["vanilla.clipboard"].get()?.toString?.() === "Symbol(NoValue)") {
                            data.sharedFacets["vanilla.clipboard"] = (0, ${facetAccessHolderBindingVariableTarget}.useSharedFacet)(Ii);
                        }
                    } catch {}
                    try {
                        if (data.sharedFacets["core.sound"].get()?.toString?.() === "Symbol(NoValue)") {
                            data.sharedFacets["core.sound"] = (0, ${facetAccessHolderBindingVariableTarget}.useSharedFacet)(Hl);
                        }
                    } catch {}
                    try {
                        if (data.sharedFacets["core.deviceInformation"].get()?.toString?.() === "Symbol(NoValue)") {
                            data.sharedFacets["core.deviceInformation"] = (0, ${facetAccessHolderBindingVariableTarget}.useSharedFacet)(${facetAccessHolderBindingVariableTarget}.sharedFacet("core.deviceInformation"));
                        }
                    } catch {}
                    try {
                        if (data.sharedFacets["core.performanceFacet"].get()?.toString?.() === "Symbol(NoValue)") {
                            data.sharedFacets["core.performanceFacet"] = (0, ${facetAccessHolderBindingVariableTarget}.useSharedFacet)(${facetAccessHolderBindingVariableTarget}.sharedFacet("core.performanceFacet"));
                        }
                    } catch {}
                }
                
                globalThis.facetSpyData = data;
                return null;
            }
            globalThis.facetSpy = facetSpy; */
            /**
             * Returns a list of all accessible facets from the facetSpy data.
             *
             * @returns {Partial<globalThis["facetSpyData"]['sharedFacets']>} The accessible facets.
             */
            function getAccessibleFacetSpyFacets() {
                return Object.fromEntries(
                    Object.entries(globalThis.facetSpyData?.sharedFacets || {}).filter(([name, facet]) => {
                        try {
                            return facet.get()?.toString?.() !== "Symbol(NoValue)";
                        } catch {
                            return false;
                        }
                    }).map(([name, facet]) => [
                        name,
                        facet?.get?.() ?? facet
                    ])
                );
            }
            globalThis.getAccessibleFacetSpyFacets = getAccessibleFacetSpyFacets;` as const;
                    currentFileContent = currentFileContent.replace(
                        /index-[0-9a-f]{5,20}\.js$/.test(file.data?.filename!)
                            ? new RegExp(`var ([a-zA-Z0-9_\\$])=([a-zA-Z0-9_\\$])\\(([0-9]+)\\),${facetAccessHolderBindingVariableTarget}=\\2\\(([0-9]+)\\);`)
                            : /gameplay-[0-9a-f]{5,20}\.js$/.test(file.data?.filename!)
                            ? new RegExp(`.URLSearchParams;var ${facetAccessHolderBindingVariableTarget}=([a-zA-Z0-9_\\$])\\(([0-9]+)\\);`)
                            : new RegExp(`var ${facetAccessHolderBindingVariableTarget}=([a-zA-Z0-9_\\$])\\(([0-9]+)\\);`),
                        facetSpyFunction
                    );
                    currentFileContent = currentFileContent.replace(
                        /(?:[a-zA-Z0-9_\$])\.sharedFacet=function\(([a-zA-Z0-9_\$]),([a-zA-Z0-9_\$])=([a-zA-Z0-9_\$])\.NO_VALUE\)\{const ([a-zA-Z0-9_\$])=\(0,([a-zA-Z0-9_\$])\.default\)\(\(([a-zA-Z0-9_\$])=>\(0,\3\.createFacet\)\(\{initialValue:\2,startSubscription:\2=>\6\(\1,\2\)\}\)\)\);return \4.factory=\3\.FACET_FACTORY,\4\}/,
                        `$2.sharedFacet = (name, $2) => {
                    if (globalThis.accessedFacets[name]) {
                        return globalThis.accessedFacets[name];
                    }
                    return (globalThis.accessedFacets[name] = (function ($1, $2 = $3.NO_VALUE) {
                        const $4 = (0, $5.default)(($6) => (0, $3.createFacet)({ initialValue: $2, startSubscription: ($2) => $6($1, $2) }));
                        return ($4.factory = $3.FACET_FACTORY), $4;
                    })(name, $2));
                };`
                    );
                    return currentFileContent;
                },
            },
            {
                id: "inject-into-routes",
                context: "per_text_file",
                action: async (currentFileContent: string, file: zip.ZipFileEntry<any, any>): Promise<string> => {
                    if (/routes\.json$/.test(file.data?.filename!)) {
                        const origData: string = await file.getText();
                        currentFileContent = currentFileContent.replace(
                            /(?<="fileName"(?:[\s\n]*):([\s\n]*)"\/hbui\/index\.html",(?:[\s\n]*)"scope":(?:[\s\n]*)\[(?:[\s\n]*)"in-game"(?:[\s\n]*),(?:[\s\n]*)"out-of-game"(?:[\s\n]*)\](?:[\s\n]*),(?:[\s\n]*)"defaultRoute"(?:[\s\n]*):(?:[\s\n]*)""(?:[\s\n]*),(?:[\s\n]*)"supportedRoutes"(?:[\s\n]*):(?:[\s\n]*)\[([\s\n]*))(?=\{([\s\n]*)")/,
                            `{$3"route":$1"/ouic/:menu/:tab?",$3"modes":$1[],$3"regexp":$1"^\\\\/ouic\\\\/([^\\\\/]+?)(?:\\\\/([^\\\\/]+?))?(?:\\\\/)?$",$3"params":$1[{"name":"menu","prefix":"/","delimiter":"/","optional":false,"repeat":false,"pattern":"[^\\\\/]+?"},{"name":"tab","prefix":"/","delimiter":"/","optional":true,"repeat":false,"pattern":"[^\\\\/]+?"}],$3"transition":$1"RouteSlideTransition"$2},$2`
                        )
                        return currentFileContent;
                    } else if (/index-[0-9a-f]{5,20}\.js$/.test(file.data?.filename!)) {
                        const origData: string = await file.getText();
                        /**
                         * The symbol name of the facet access holder.
                         */
                        const bindingVariableTargets: [
                            translatorPropertyKey: string,
                            translatorPropertyVariableName: string,
                            translatorSymbolName: string,
                            contextHolder: string,
                            screenLayoutCopmonent: string
                        ] = origData
                            .match(
                                /const\{([a-zA-Z0-9_\$]):([a-zA-Z0-9_\$])\}=([a-zA-Z0-9_\$]{2})\("PlayScreen"\);return ([a-zA-Z0-9_\$])\.createElement\(([a-zA-Z0-9_\$]{2}),\{debugDrawer:\[/
                            )!
                            .slice(1, 6) as [string, string, string, string, string];
                        if (!new RegExp(
                                `(?<=([a-zA-Z0-9_\\$])\\.createElement\\(([a-zA-Z0-9_\\$]{2})\\,{route:"/play/servers/add",component:(?:[a-zA-Z0-9_\\$]{2}),transitionComponent:([a-zA-Z0-9_\\$]{2})\\}\\),)`
                            ).test(currentFileContent)) {
                                throw new Error("Unable to find routes.");
                            }
                        currentFileContent = currentFileContent.replace(
                            new RegExp(
                                `(?<=([a-zA-Z0-9_\\$])\\.createElement\\(([a-zA-Z0-9_\\$]{2})\\,{route:"/play/servers/add",component:(?:[a-zA-Z0-9_\\$]{2}),transitionComponent:([a-zA-Z0-9_\\$]{2})\\}\\),)`
                            ),
                            `$1.createElement($2, {
                        route: "/ouic/play/:tab?",
                        component: () => {
                            // const { ${bindingVariableTargets[0]}: ${bindingVariableTargets[1]} } = ${bindingVariableTargets[2]}("PlayScreen");
                            return ${bindingVariableTargets[3]}.createElement(
                                ${bindingVariableTargets[4]},
                                {
                                    debugDrawer: ["create-test-world", "debug-import-worlds"],
                                    friendsDrawer: false,
                                    gamepadAlias: "play-layout-content",
                                    delegateByAlias: "play-screen-tab-bar-wrapper",
                                    screenAnalyticsId: "Play",
                                    title: "Title",
                                },
                                () => ${bindingVariableTargets[3]}.createElement(${bindingVariableTargets[3]}.Fragment, null)
                            );
                        },
                        transitionComponent: $3,
                    }),$1.createElement($2, {
                        route: "/ouic/friends/:tab?",
                        component: () => {
                            return ${bindingVariableTargets[3]}.createElement(
                                ${bindingVariableTargets[4]},
                                {
                                    debugDrawer: [],
                                    friendsDrawer: false,
                                    title: "Title",
                                },
                                () => ${bindingVariableTargets[3]}.createElement(${bindingVariableTargets[3]}.Fragment, null)
                            );
                        },
                        transitionComponent: $3,
                    }),$1.createElement($2, {
                        route: "/ouic/:menu/:tab?",
                        component: () => {
                            return ${bindingVariableTargets[3]}.createElement(
                                ${bindingVariableTargets[4]},
                                {
                                    debugDrawer: [],
                                    friendsDrawer: false,
                                    title: "Title",
                                },
                                () => ${bindingVariableTargets[3]}.createElement(${bindingVariableTargets[3]}.Fragment, null)
                            );
                        },
                        transitionComponent: $3,
                    }),`
                        );
                        return currentFileContent;
                    } else {
                        return currentFileContent;
                    }
                },
            },
        ],
        format_version: "1.0.0",
        min_engine_version: "1.0.0",
    },
] as const satisfies (Plugin & { namespace: "built-in" })[];
