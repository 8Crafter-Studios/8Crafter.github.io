/**
 * @import {} from "./JSONB.d.ts"
 * @import {} from "./types.d.ts"
 * @import {} from "./customOverlays.d.ts"
 * @import {} from "./oreUICustomizer8CrafterConfig.d.ts"
 * @import {} from "./class_path.js"
 */
interface Console {
    everything: ConsoleEverythingEntry[];
}
type LogType = "log" | "info" | "error" | "warn" | "debug";
type ConsoleEverythingEntry = {
    type: "log" | "info" | "error" | "warn" | "debug";
    timeStamp: string;
    value: any[];
    stack?: string | undefined;
} | {
    type: "exception";
    timeStamp: string;
    value: ErrorEvent;
    stack?: string | undefined;
} | {
    type: "promiseRejection";
    timeStamp: string;
    value: PromiseRejectionEvent;
    stack?: string | undefined;
};
type ConsoleLogCallback = (data: ConsoleEverythingEntry) => void;
interface ContextMenuCreationOptions {
    x: number;
    y: number;
    width?: number | undefined;
    height?: number | undefined;
    items: ContextMenuItemCreationOptions[];
}
type ContextMenuItemCreationOptions = {
    type?: "action" | undefined;
    title?: string | undefined;
    label: string;
    action(): void;
    disabled?: boolean | undefined;
} | {
    type: "separator";
} | {
    type: "submenu";
    label: string;
    title?: string | undefined;
    submenu: ContextMenuItemCreationOptions[];
    disabled?: boolean | undefined;
};
type CSSEditorSelectedType = "none" | "element" | "styleSheet" | "root" | "globalStyleElement";
interface Window {
    /**
     * @todo Add an actual option for this.
     * @idea Make these displayed using the `Readonly_icon.png` icon instead of an italic 75% opacity `read-only` before the property name. The icon would be to the left of the expansion arrow (or where it would be when there isn't one).
     */
    showReadonlyPropertiesLabelInConsoleEnabled?: boolean | undefined;
    /**
     * @internal
     */
    observingExternalServerWorldListForLitePlayScreenServersTab?: boolean | undefined;
    /**
     * @internal
     */
    observingThirdPartyWorldListForLitePlayScreenServersTab?: boolean | undefined;
    /**
     * @internal
     */
    observingFriendWorldListForLitePlayScreenFriendsTab?: boolean | undefined;
    /**
     * @internal
     */
    observingLANWorldListForLitePlayScreenLanTab?: boolean | undefined;
    /**
     * @internal
     */
    observingNetworkWorldDetailsForLitePlayScreenServersTab?: boolean | undefined;
    /**
     * @internal
     */
    copying?: boolean | undefined;
    /**
     * Only present when using the {@link copyTextToClipboard_old} and the `core.router` facet is not available.
     *
     * @deprecated
     */
    __DEBUG_copyTextToClipboard_old_GLOBALS_copyError__?: unknown | undefined;
    [key: `temp${bigint}`]: any;
}
/**
 * Whether to intercept engine subscriptions and store them in the {@link cachedEngineSubscriptions} object.
 *
 * This stores additions and removals of event subscription callbacks (from {@link engine.on} and {@link engine.off}), as well as the parameters of
 * {@link engine.trigger} calls.
 *
 * To enable it, either set the `setting:__CACHING_ENGINE_SUBSCRIPTIONS_FROM_HOOK_ENABLED__` {@link localStorage} item to `"true"` and reload the page, or set this variable to `true`.
 *
 * @type {boolean}
 */
declare let __CACHING_ENGINE_SUBSCRIPTIONS_FROM_HOOK_ENABLED__: boolean;
/**
 * Whether to intercept engine query results and store them in the {@link cachedQueryResults} object.
 *
 * To enable it, either set the `setting:__CACHING_ENGINE_QUERY_RESULTS_FROM_HOOK_ENABLED__` {@link localStorage} item to `"true"` and reload the page, or set this variable to `true`.
 *
 * @type {boolean}
 */
declare let __CACHING_ENGINE_QUERY_RESULTS_FROM_HOOK_ENABLED__: boolean;
/**
 * Whether to intercept vanilla command calls and store their parameters and results in the {@link cachedVanillaCommandCalls} object.
 *
 * To enable it, set the `setting:__CACHING_VANILLA_COMMAND_CALLS_ENABLED__` {@link localStorage} item to `"true"`, then reload the page.
 *
 * @type {boolean}
 */
declare const __CACHING_VANILLA_COMMAND_CALLS_ENABLED__: boolean;
/**
 * Whether to debug log vanilla command calls, their parameters, and their results to the console.
 *
 * To enable it the {@link __CACHING_VANILLA_COMMAND_CALLS_ENABLED__ | \_\_CACHING_VANILLA_COMMAND_CALLS_ENABLED\_\_} setting must be enabled first, then either set the
 * `setting:__VANILLA_COMMAND_CALL_DEBUG_LOGGING_ENABLED__` {@link localStorage} item to `"true"` and reload the page, or set this variable to `true`.
 *
 * @type {boolean}
 */
declare let __VANILLA_COMMAND_CALL_DEBUG_LOGGING_ENABLED__: boolean;
declare const hookedEngineSubscriptions: {
    on: Record<EngineEventID, RemoveFirstNElements<Parameters<typeof engine.on<EngineEventID>>, 1>[]>;
    off: Record<EngineEventID, RemoveFirstNElements<Parameters<typeof engine.off<EngineEventID>>, 1>[]>;
    trigger: Record<EngineEventID, RemoveFirstNElements<Parameters<typeof engine.trigger<EngineEventID>>, 1>[]>;
};
/**
 * @type {{[key in keyof EngineQueryNonFacetResultMap]?: [timestamp: number, value: EngineQueryNonFacetResultMap[key]][]} & {[key in FacetList[number]]?: [timestamp: number, value: FacetTypeMap[key]][]} & Record<string, [timestamp: number, value: any][]>}
 */
declare const cachedQueryResults: {
    [key in keyof EngineQueryNonFacetResultMap]?: [timestamp: number, value: EngineQueryNonFacetResultMap[key]][];
} & {
    [key in FacetList[number]]?: [timestamp: number, value: FacetTypeMap[key]][];
} & Record<string, [timestamp: number, value: any][]>;
/**
 * @type {{[method in keyof typeof hookedEngineSubscriptions]: { "before": ((...args: Parameters<typeof engine[method]>) => void | boolean)[]; "after": ((...args: Parameters<typeof engine[method]>) => void)[] }}}
 */
declare const engineHookTriggerCallbacks: {
    [method in keyof typeof hookedEngineSubscriptions]: {
        before: ((...args: Parameters<(typeof engine)[method]>) => void | boolean)[];
        after: ((...args: Parameters<(typeof engine)[method]>) => void)[];
    };
};
/**
 * @type {{[method in keyof typeof hookedEngineSubscriptions]: typeof engine[method]}}
 */
declare const originalUnboundEngineMethods: {
    [method in keyof typeof hookedEngineSubscriptions]: (typeof engine)[method];
};
/**
 * @type {Pick<typeof engine, keyof typeof hookedEngineSubscriptions>}
 */
declare const originalEngineMethods: Pick<typeof engine, keyof typeof hookedEngineSubscriptions>;
/**
 * @param {keyof typeof hookedEngineSubscriptions} method
 */
declare function hookEngineMethod(method: keyof typeof hookedEngineSubscriptions): void;
/**
 * This will only have values if {@link __CACHING_VANILLA_COMMAND_CALLS_ENABLED__} is set to `true`.
 *
 * @type {{[commandGroup in keyof typeof __commands__]?: {[command in keyof typeof __commands__[commandGroup]]?: { params?: Parameters<typeof __commands__[commandGroup][command]["callable"]>; result?: ReturnType<typeof __commands__[commandGroup][command]["callable"]> }[]}}}
 */
declare const cachedVanillaCommandCalls: {
    [commandGroup in keyof typeof __commands__]?: {
        [command in keyof (typeof __commands__)[commandGroup]]?: {
            params?: Parameters<(typeof __commands__)[commandGroup][command]["callable"]>;
            result?: ReturnType<(typeof __commands__)[commandGroup][command]["callable"]>;
        }[];
    };
};
declare function vanillaCommandsInterceptor(): void;
/**
 * @type {HTMLDivElement}
 */
declare let mainMenu8CrafterUtilities: HTMLDivElement;
/**
 * @type {HTMLDivElement}
 */
declare let consoleOverlayElement: HTMLDivElement;
/**
 * @type {HTMLDivElement}
 */
declare let consoleOverlayTextElement: HTMLDivElement;
/**
 * @type {HTMLTextAreaElement}
 */
declare let consoleOverlayInputFieldElement: HTMLTextAreaElement;
/**
 * @type {HTMLDivElement}
 */
declare let screenDisplayElement: HTMLDivElement;
/**
 * @type {HTMLDivElement}
 */
declare let elementGeneralDebugOverlayElement: HTMLDivElement;
/**
 * @type {HTMLDivElement}
 */
declare let smallCornerDebugOverlayElement: HTMLDivElement;
/**
 * @type {HTMLDivElement}
 */
declare let cssEditorDisplayElement: HTMLDivElement;
/**
 * @type {HTMLDivElement}
 */
declare let screenInputBlocker: HTMLDivElement;
/**
 * @type {HTMLDivElement}
 */
declare let htmlSourceCodePreviewElement: HTMLDivElement;
/**
 * @type {HTMLParagraphElement}
 */
declare let htmlSourceCodePreviewElementP: HTMLParagraphElement;
/**
 * @type {HTMLDivElement}
 */
declare let cssEditorSubtitleElement: HTMLDivElement;
/**
 * @type {HTMLStyleElement}
 */
declare let customGlobalCSSStyleElement: HTMLStyleElement;
/**
 * @type {HTMLTextAreaElement}
 */
declare let cssEditorTextBox: HTMLTextAreaElement;
/**
 * @type {HTMLParagraphElement}
 */
declare let cssEditorErrorText: HTMLParagraphElement;
/**
 * @type {HTMLButtonElement}
 */
declare let cssEditorSelectTargetButton: HTMLButtonElement;
/**
 * @type {"none" | "hoveredElementDetails"}
 */
declare let currentDebugMode: "none" | "hoveredElementDetails";
/**
 * @type {CSSStyleSheet[]}
 */
declare let cssEditor_selectableStyleSheets: CSSStyleSheet[];
/**
 * @type {HTMLElement}
 */
declare let cssEditorSelectedElement: HTMLElement;
/**
 * @type {CSSStyleSheet}
 */
declare let cssEditorSelectedStyleSheet: CSSStyleSheet;
/**
 * @type {CSSRule[]}
 */
declare let cssEditorSelectedStyleSheet_rules: CSSRule[];
/**
 * @type {CSSEditorSelectedType}
 */
declare let cssEditorSelectedType: CSSEditorSelectedType;
/**
 * @type {boolean}
 */
declare let cssEditorInSelectMode: boolean;
/**
 * @type {HTMLElement & EventTarget}
 */
declare let currentMouseHoverTarget: HTMLElement & EventTarget;
declare var mousePos: {
    clientX: number;
    clientY: number;
    screenX: number;
    screenY: number;
    movementX: number;
    movementY: number;
    mTarget: EventTarget | null;
    kTarget: EventTarget | null;
};
/**
 * The currently held keys.
 *
 * This is used for the small corner debug overlay (`CTRL+I`).
 */
declare var heldKeys: string[];
/**
 * @type {number[]}
 */
declare var heldKeyCodes: number[];
/**
 * @type {string[]}
 */
declare var heldMouseButtons: string[];
/**
 * @type {readonly ["MAIN", "AUX", "SEC", "BACK", "FRWD"]}
 */
declare const MOUSE_BUTTON_NAMES: readonly ["MAIN", "AUX", "SEC", "BACK", "FRWD"];
/**
 * An array of callbacks to be executed when a console message is intercepted.
 */
declare var onConsoleLogCallbacks: ConsoleLogCallback[];
/**
 * Copies the current list of new facets to the clipboard.
 *
 * @returns {ReturnType<typeof copyTextToClipboardAsync>} A promise that resolves with the result of {@link copyTextToClipboardAsync}.
 */
declare function copyNewFacetListToClipboard(): ReturnType<typeof copyTextToClipboardAsync>;
/**
 * Joins a realm by name.
 *
 * @param {string} realmName The name of the realm to join.
 * @returns {Promise<{success: boolean, message: string, error?: unknown}>} The result.
 *
 * @description
 * 1. Switches to the realms tab, it it is not already open.
 * 2. Waits for the realms list to load.
 * 3. Finds the realm in the realms list and clicks on it.
 * 4. Waits for the realm details to load.
 * 5. Clicks the realm play button.
 *
 * @example
 * ```javascript
 * autoJoinRealm("Asteria").then(console.log);
 * ```
 */
declare function autoJoinRealm(realmName: string): Promise<{
    success: boolean;
    message: string;
    error?: unknown;
}>;
/**
 * Joins a server by name.
 *
 * @param {string} serverName The name of the server to join.
 * @returns {Promise<{success: boolean, message: string, error?: unknown}>} The result.
 *
 * @description
 * 1. Switches to the servers tab, it it is not already open.
 * 2. Waits for the servers list to load.
 * 3. Finds the realm in the servers list and clicks on it.
 * 4. Waits for the server details to load.
 * 5. Clicks the server play button.
 */
declare function autoJoinServer(serverName: string): Promise<{
    success: boolean;
    message: string;
    error?: unknown;
}>;
/**
 * Joins a world by name.
 *
 * @param {string} worldName The name of the world to join.
 * @returns {Promise<{success: boolean, message: string, error?: any}>} The result.
 *
 * @description
 * 1. Switches to the worlds tab, it it is not already open.
 * 2. Waits for the worlds list to load.
 * 3. Finds the realm in the worlds list and clicks on it.
 * 4. Waits for the world details to load.
 * 5. Clicks the world play button.
 */
declare function autoJoinWorld(worldName: string): Promise<{
    success: boolean;
    message: string;
    error?: any;
}>;
declare function enableAutoJoinForOpenServer(): Promise<void>;
/**
 * Prompts the user with a confirmation dialog.
 *
 * @param {string} message The message to prompt the user with.
 * @param {string} [button1="Confirm"] The text of the first button. Defaults to "Confirm".
 * @param {string} [button2="Cancel"] The text of the second button. Defaults to "Cancel".
 * @param {string} [button3] The text of the third button. Defaults to undefined. If undefined, there will be no third button.
 * @param {(container: HTMLDivElement, resolve: (result: 0|1|2) => void, reject: (error: any) => void) => void} [additionalModificationsCallback=()=>{}] A callback function that will be called after the dialog is created.
 * @returns {Promise<0|1|2>} A promise that resovles with `1` if the user clicked the first button and `0` if the user clicked the second button.
 * @throws {any} If the additionalModificationsCallback throws an error.
 */
declare function promptForConfirmation(message: string, button1?: string, button2?: string, button3?: string | undefined, additionalModificationsCallback?: (container: HTMLDivElement, resolve: (result: 0 | 1 | 2) => void, reject: (error: any) => void) => void): Promise<0 | 1 | 2>;
/**
 * Creates a button selection menu.
 *
 * @param {object} options The options for the button selection menu.
 * @param {string} [options.body] The body of the button selection menu.
 * @param {[text: string, icon?: string][]} options.buttons The buttons of the button selection menu.
 * @param {"1column" | "2columns"} [options.style="2columns"] The style of the button selection menu. "1column" means there is only one column. "2columns" means there are two columns.Defaults to "2columns".
 * @returns {Promise<{canceled: boolean, selection?: number}>} A promise that resolves with the index of the button that was clicked.
 */
declare function buttonSelectionMenu(options: {
    body?: string;
    buttons: [text: string, icon?: string][];
    style?: "1column" | "2columns";
}): Promise<{
    canceled: boolean;
    selection?: number;
}>;
/**
 * Validates the CSS or JSON in the CSS Editor text box.
 *
 * @returns {boolean} true if valid, false if invalid
 *
 * @deprecated Unused.
 */
declare function validateCssEditorTextBoxValue(): boolean;
/**
 * Puts the CSS Editor in style sheet selection mode.
 *
 * @deprecated The style sheet rules are undefined for some reason.
 */
declare function cssEditor_selectDocumentStyleSheet_activate(): void;
/**
 * Used when a style sheet is selected.
 *
 * @param {number} index
 *
 * @deprecated The style sheet rules are undefined for some reason.
 */
declare function cssEditor_selectDocumentStyleSheet_selected(index: number): Promise<void>;
/**
 * Saves the CSS Editor changes.
 */
declare function cssEditor_saveChanges(): Promise<void>;
/**
 * Sets the CSS Editor mode.
 *
 * @param {CSSEditorSelectedType} mode The mode to set the CSS Editor to.
 *
 * @throws {Error} Throws an error if the mode is not valid.
 */
declare function setCSSEditorMode(mode: CSSEditorSelectedType): void;
declare function cssEditor_rootElementStylesMode(): void;
declare function cssEditor_globalStyleElementStylesMode(): void;
/**
 * Sets the tab of the 8Crafter Utilities Main Menu.
 * @param {string} tab
 */
declare function setMainMenu8CrafterUtilitiesTab(tab: string): void;
declare function toggleSmallCornerDebugOverlay(): void;
declare function toggleGeneralDebugOverlayElement(): void;
declare function toggleHTMLSourceCodePreviewElement(): void;
declare function toggleConsoleOverlay(): void;
/**
 * Represents an entry in the console execution history.
 */
declare class ConsoleExecutionHistoryEntry {
    /**
     * The code that was executed.
     *
     * @public
     *
     * @type {string}
     */
    code: string;
    /**
     * The time when the code was executed.
     *
     * @public
     *
     * @type {number}
     */
    time: number;
    /**
     * Creates a new ConsoleExecutionHistoryEntry instance.
     *
     * @constructor
     * @param {string} code The code that was executed.
     * @param {number} [time=Date.now()] The time when the code was executed. Defaults to the current time.
     * @returns The ConsoleExecutionHistoryEntry instance.
     *
     * @public
     */
    constructor(code: string, time?: number);
    /**
     * Returns the JSON representation of the ConsoleExecutionHistoryEntry instance.
     *
     * @returns The JSON representation of the ConsoleExecutionHistoryEntry instance.
     *
     * @public
     */
    toJSON(): {
        code: string;
        time: number;
    };
    /**
     * Creates a new ConsoleExecutionHistoryEntry instance from a JSON object.
     *
     * @param {{code: string; time: number}} json The JSON object to create the ConsoleExecutionHistoryEntry instance from.
     * @returns The ConsoleExecutionHistoryEntry instance.
     *
     * @public
     * @static
     */
    static fromJSON(json: {
        code: string;
        time: number;
    }): ConsoleExecutionHistoryEntry;
}
/**
 * Stores the history of executed console commands.
 *
 * @hideconstructor
 */
declare class ConsoleExecutionHistory {
    /**
     * The maximum number of entries to store in the history.
     *
     * @public
     * @static
     *
     * @type {number}
     *
     * @default 100
     */
    static maxEntries: number;
    /**
     * The maximum length of an entry in the history.
     *
     * @public
     * @static
     *
     * @type {number}
     *
     * @default 1000
     */
    static maxEntryLength: number;
    /**
     * The entries in the history, oldest first.
     *
     * @readonly
     *
     * @public
     * @static
     *
     * @type {ConsoleExecutionHistoryEntry[]}
     */
    static entries: ConsoleExecutionHistoryEntry[];
    /**
     * @constructor
     *
     * @throws {TypeError} Throws an error if the constructor is called.
     *
     * @private
     */
    constructor();
    /**
     * Gets the nth newest entry in the history.
     *
     * @param {number} n The index of the entry to retrieve.
     * @returns {ConsoleExecutionHistoryEntry | undefined} The nth newest entry in the history.
     *
     * @public
     * @static
     */
    static getNthNewestEntry(n: number): ConsoleExecutionHistoryEntry | undefined;
    /**
     * Adds a new entry to the history.
     *
     * @param {string} code The code that was executed.
     * @param {number} [time=Date.now()] The time when the code was executed. Defaults to the current time.
     * @returns {ConsoleExecutionHistoryEntry} The new entry that was added to the history.
     *
     * @public
     * @static
     */
    static addHistoryItem(code: string, time?: number): ConsoleExecutionHistoryEntry;
    /**
     * Clears the history.
     *
     * @public
     * @static
     */
    static clearHistory(): void;
    /**
     * Saves the history to local storage.
     *
     * @public
     * @static
     */
    static saveToLocalStorage(): void;
    /**
     * Loads the history from local storage.
     *
     * @public
     * @static
     */
    static loadFromLocalStorage(): void;
}
/**
 * Reads the keys of the {@link localStorage}.
 *
 * There is a bug with the Ore UI environment where localStorage.key() returns null for all indexes other than 0, so this works by removing keys one at a time
 * to read them and then restoring them.
 *
 * @returns {string[]} The keys of the {@link localStorage}.
 */
declare function readLocalStorageKeys(): string[];
/**
 * The index of the currently selected console execution history item.
 *
 * @type {number}
 *
 * @default -1
 */
declare var currentlySelctedConsoleExecutionHistoryItemIndex: number;
/**
 * Executes the console input field contents.
 */
declare function consoleOverlayExecute(): void;
/**
 * The contents of the console input field before it was replaced with a history item.
 *
 * @type {string}
 *
 * @default ""
 */
declare var savedConsoleInputFieldContents: string;
/**
 * Sets the contents of the console input field to the contents of the nth most recent history item.
 *
 * @param {number} index The index of the history item to set the input field to. It will be bound to be withing the range of the history items, or `-1`. If `-1`, the input field will be restored to what it was before replacing the input field with a history item.
 */
declare function setConsoleInputFieldContentsToHistoryItem(index: number): void;
/**
 * Shows a context menu.
 *
 * @param {ContextMenuCreationOptions} menu The menu to show.
 * @returns {void}
 */
declare function showContextMenu(menu: ContextMenuCreationOptions): void;
declare function quoteStringDynamic(str: string): string;
/**
 * Adds a context menu to a primitive value element at the top level of the console.
 *
 * @template {HTMLElement} T
 * @param {string | number | boolean | bigint | symbol | null | undefined} primitiveValue The primitive value to add a context menu to.
 * @param {T} primitiveValueElement The element to add a context menu to.
 * @param {{ copyConsoleMessageStackCallback?: (() => void) | undefined; copyConsoleMessageStackButtonEnabled?: boolean | undefined }} [options] Additional options for the context menu.
 * @returns {T} The element with a context menu added.
 */
declare function addContextMenuToTopLevelPrimitiveConsoleValue<T extends HTMLElement>(primitiveValue: string | number | boolean | bigint | symbol | null | undefined, primitiveValueElement: T, options?: {
    copyConsoleMessageStackCallback?: (() => void) | undefined;
    copyConsoleMessageStackButtonEnabled?: boolean | undefined;
}): T;
/**
 * The last used ID for a temporary variable from the console.
 *
 * @type {bigint}
 *
 * @default 0n
 */
declare var __console_last_temp_variable_id__: bigint;
/**
 * The last used ID for a console expansion arrow.
 *
 * @type {bigint}
 *
 * @default 0n
 */
declare var consoleExpansionArrowID: bigint;
/**
 * Creates a view for an expandable object for use in the console.
 *
 * @param {Record<PropertyKey, any>} obj The object to create a view for.
 * @param {boolean} [isRoot=false] Whether the object is the root object. Defaults to `false`.
 * @param {boolean} [forceObjectMode=false] Whether to force the value into object mode. Defaults to `false`.
 * @param {{ summaryValueOverride?: string | undefined; summaryValueOverride_toStringTag?: string | undefined; displayKey?: string | undefined; objectKeysSource?: Record<PropertyKey, any> | undefined; copyConsoleMessageStackCallback?: (() => void) | undefined; copyConsoleMessageStackButtonEnabled?: boolean | undefined; showReadonly?: boolean | undefined }} [options] The options for creating the view.
 * @returns {HTMLDivElement} The view for the object.
 */
declare function createExpandableObjectView(obj: Record<PropertyKey, any>, isRoot?: boolean, forceObjectMode?: boolean, options?: {
    summaryValueOverride?: string | undefined;
    summaryValueOverride_toStringTag?: string | undefined;
    displayKey?: string | undefined;
    objectKeysSource?: Record<PropertyKey, any> | undefined;
    copyConsoleMessageStackCallback?: (() => void) | undefined;
    copyConsoleMessageStackButtonEnabled?: boolean | undefined;
    showReadonly?: boolean | undefined;
}): HTMLDivElement;
/**
 *
 * @param {`temp${bigint}`} variableName
 */
declare function displayStoredConsoleTempVariable(variableName: `temp${bigint}`): void;
/**
 * The queue of messages to display in the console overlay once it is loaded.
 *
 * @type {ConsoleEverythingEntry[]}
 */
declare var consoleOverlayOnLoadMessageQueue: ConsoleEverythingEntry[];
/**
 * The callback called by the hook on the {@link console} methods.
 *
 * @param {ConsoleEverythingEntry} data The data of the message.
 *
 * @idea Make a system where it uses the click location to determine what text was right-clicked or long-pressed on to determine which context menu to show.
 */
declare function consoleOverlayConsoleLogCallback(data: ConsoleEverythingEntry): void;
declare let nonTextKeyCodes: number[];
declare let types_KeyboardKey: {
    8: string;
    9: string;
    13: string;
    16: string;
    17: string;
    18: string;
    20: string;
    27: string;
    32: string;
    33: string;
    34: string;
    35: string;
    37: string;
    38: string;
    39: string;
    40: string;
    45: string;
    46: string;
    48: string;
    49: string;
    50: string;
    51: string;
    52: string;
    53: string;
    54: string;
    55: string;
    56: string;
    57: string;
    59: string;
    61: string;
    65: string;
    66: string;
    67: string;
    68: string;
    69: string;
    70: string;
    71: string;
    72: string;
    73: string;
    74: string;
    75: string;
    76: string;
    77: string;
    78: string;
    79: string;
    80: string;
    81: string;
    82: string;
    83: string;
    84: string;
    85: string;
    86: string;
    87: string;
    88: string;
    89: string;
    90: string;
    96: string;
    97: string;
    98: string;
    99: string;
    100: string;
    101: string;
    102: string;
    103: string;
    104: string;
    105: string;
    109: string;
    112: string;
    113: string;
    114: string;
    115: string;
    116: string;
    117: string;
    118: string;
    119: string;
    120: string;
    121: string;
    122: string;
    123: string;
    188: string;
    190: string;
    191: string;
    192: string;
    195: string;
    196: string;
    197: string;
    198: string;
    199: string;
    201: string;
    202: string;
    203: string;
    204: string;
    205: string;
    206: string;
    207: string;
    208: string;
    209: string;
    210: string;
    219: string;
    220: string;
    221: string;
    222: string;
    BACKSPACE: number;
    TAB: number;
    ENTER: number;
    SHIFT: number;
    CTRL: number;
    ALT: number;
    PAUSE: number;
    CAPS_LOCK: number;
    ESCAPE: number;
    SPACE: number;
    PG_UP: number;
    PG_DOWN: number;
    END: number;
    HOME: number;
    LEFT: number;
    UP: number;
    RIGHT: number;
    DOWN: number;
    INSERT: number;
    DELETE: number;
    KEY_0: number;
    KEY_1: number;
    KEY_2: number;
    KEY_3: number;
    KEY_4: number;
    KEY_5: number;
    KEY_6: number;
    KEY_7: number;
    KEY_8: number;
    KEY_9: number;
    KEY_A: number;
    KEY_B: number;
    KEY_C: number;
    KEY_D: number;
    KEY_E: number;
    KEY_F: number;
    KEY_G: number;
    KEY_H: number;
    KEY_I: number;
    KEY_J: number;
    KEY_K: number;
    KEY_L: number;
    KEY_M: number;
    KEY_N: number;
    KEY_O: number;
    KEY_P: number;
    KEY_Q: number;
    KEY_R: number;
    KEY_S: number;
    KEY_T: number;
    KEY_U: number;
    KEY_V: number;
    KEY_W: number;
    KEY_X: number;
    KEY_Y: number;
    KEY_Z: number;
    META_LFET: number;
    CONTEXT_MENU: number;
    NUMPAD_0: number;
    NUMPAD_1: number;
    NUMPAD_2: number;
    NUMPAD_3: number;
    NUMPAD_4: number;
    NUMPAD_5: number;
    NUMPAD_6: number;
    NUMPAD_7: number;
    NUMPAD_8: number;
    NUMPAD_9: number;
    NUMPAD_MULTIPLY: number;
    NUMPAD_PLUS: number;
    NUMPAD_MINUS: number;
    NUMPAD_PERIOD: number;
    NUMPAD_DIVIDE: number;
    F1: number;
    F2: number;
    F3: number;
    F4: number;
    F5: number;
    F6: number;
    F7: number;
    F8: number;
    F9: number;
    F10: number;
    F11: number;
    F12: number;
    F13: number;
    F14: number;
    F15: number;
    F16: number;
    F17: number;
    F18: number;
    F19: number;
    F20: number;
    F21: number;
    F22: number;
    F23: number;
    F24: number;
    NUM_LOCK: number;
    SCROLL_LOCK: number;
    SEMICOLON: number;
    EQUALS: number;
    COMMA: number;
    MINUS: number;
    PERIOD: number;
    SLASH: number;
    GRAVE: number;
    MOUSE_MOVEMENT: number;
    MOUSE_BUTTON_LEFT: number;
    MOUSE_BUTTON_MIDDLE: number;
    MOUSE_BUTTON_RIGHT: number;
    MOUSE_WHEEL: number;
    PSEUDO_KEY_1: number;
    PSEUDO_KEY_2: number;
    PSEUDO_KEY_3: number;
    PSEUDO_KEY_4: number;
    PSEUDO_KEY_5: number;
    PSEUDO_KEY_6: number;
    PSEUDO_KEY_7: number;
    PSEUDO_KEY_8: number;
    PSEUDO_KEY_9: number;
    PSEUDO_KEY_10: number;
    BRACKET_OPEN: number;
    BACKSLASH: number;
    BRACKET_CLOSE: number;
    APOSTROPHE: number;
    INTL_BACKSLASH: number;
    KANA_MODE: number;
    CR_SEL: number;
    EX_SEL: number;
    ERASE_EOF: number;
};
/**
 * Creates a custom text box element.
 *
 * @param {HTMLElement} container - The container element to create the custom text box in.
 * @returns {HTMLDivElement | undefined} The created custom text box element, or `undefined` if the element could not be created.
 *
 * @todo This is a work in progress.
 */
declare function createCustomTextBox(container: HTMLElement): HTMLDivElement | undefined;
/**
 * Add a scrollbar to an HTML element.
 *
 * @param {Element} element The HTML element to add a scrollbar to.
 * @returns {boolean} True if the scrollbar was added successfully, false otherwise.
 */
declare function addScrollbarToHTMLElement(element: Element): boolean;
declare var litePlayScreenActive: boolean;
/**
 * Maps game mode IDs to their names.
 */
declare const GameModeIDMap: {
    [-1]: string;
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
};
/**
 * Enables the lite play screen.
 */
declare function enableLitePlayScreen(noReload?: boolean): Promise<void>;
declare function disableLitePlayScreen(): Promise<void>;
declare function litePlayScreen_friendsMenu(): Promise<void>;
/**
 * Sets whether the lite play screen is enabled.
 *
 * @param {boolean} value Whether to set the lite play screen to enabled or disabled.
 * @param {boolean} [noReload=false] Whether to not reload the page every time it is opened to unload the old contents.
 *
 * @throws {ReferenceError} If the external server world list is not available.
 */
declare function setLitePlayScreenEnabled(value: boolean, noReload?: boolean): void;
/**
 * Copies text to the clipboard.
 *
 * @param {string} text The text to copy to the clipboard.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the text was copied to the clipboard, `false` otherwise.
 *
 * @throws {ReferenceError} If the router facet is not available.
 *
 * @deprecated Use {@link copyTextToClipboard} or {@link copyTextToClipboardAsync} instead.
 */
declare function copyTextToClipboard_old(text: string): Promise<boolean>;
/**
 * Copies text to the clipboard.
 *
 * This will fail if the clipboard facet is no loaded. If you want to force load the clipboard facet, use the {@link copyTextToClipboardAsync} function.
 *
 * @param {string} text The text to copy to the clipboard.
 * @returns {boolean} `true` if the text was copied to the clipboard, `false` otherwise.
 */
declare function copyTextToClipboard(text: string): boolean;
/**
 * Copies text to the clipboard, and if necessary tries to force load the clipboard facet if it is not loaded.
 *
 * @param {string} text The text to copy to the clipboard.
 * @param {number} [timeout=100] The timeout in milliseconds to wait for the facet to load. If set to `0` or `Infinity`, it will never time out. Defaults to `100ms`.
 * @param {boolean} [allowErrorLogging=true] Whether to log errors that occur while force loading the facet to the console. Defaults to `true`.
 * @returns {Promise<[success: true, successType: "alreadyLoaded" | "forceLoaded"] | [sucess: false, error: Error, originalError?: any]>} A promise that resolves with a tuple with the first]\item being whether the text was copied to the clipboard, and the second item being whether it was force loaded or already loaded if it was successful or the error that occured if it wasn't, and a third item being the original error if the failure happened while force loading the facet.
 */
declare function copyTextToClipboardAsync(text: string, timeout?: number, allowErrorLogging?: boolean): Promise<[success: true, successType: "alreadyLoaded" | "forceLoaded"] | [sucess: false, error: Error, originalError?: any]>;
declare var framesSinceLastSecond: number;
declare var currentFPS: number;
