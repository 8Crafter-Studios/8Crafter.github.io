/**
 * JSONB.ts
 * An improved version of {@link JSON}
 * This version of JSONB is modified for 8Crafter's Ore UI Customizer.
 * This version of JSONB is a classic mode script instead of a module.
 * @description This file contains the {@link JSONB} and {@link JSONBConsole} classes.
 * @author 8Crafter
 * @version v1.2.0 (12/22/2025 4:29 PM) (JSONB)
 * @version v1.1.0 (12/22/2025 4:29 PM) (JSONBConsole)
 */
/**
 * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation B (JSONB) format.
 *
 * This is an improved version of {@link JSON}.
 *
 * @author 8Crafter
 */
declare var JSONB: JSONB;
/**
 * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation B (JSONB) format.
 *
 * This is an improved version of {@link JSON}.
 *
 * @author 8Crafter
 *
 * @ignore
 */
interface JSONB {
    /**
     * Converts a JavaScript Object Notation B (JSONB) string into an object.
     * @param text A valid JSON string.
     * @param reviver A function that transforms the results. This function is called for each member of the object.
     * If a member contains nested objects, the nested objects are transformed before the parent object is.
     */
    parse(text: string, reviver?: (this: any, key: string, value: any) => any, inclusionOptions?: JSONBParseInclusionOptions): any;
    /**
     * Converts a JavaScript value to a JavaScript Object Notation B (JSONB) string.
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer A function that transforms the results.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     */
    stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number | undefined, inclusionOptions?: (JSONBStringifyInclusionOptions & {
        includeSymbolKeys?: false | undefined;
    }) | undefined, options?: JSONBStringifyOptions | undefined): string;
    /**
     * Converts a JavaScript value to a JavaScript Object Notation B (JSONB) string.
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer A function that transforms the results.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     */
    stringify(value: any, replacer: ((this: any, key: string | symbol, value: any) => any) | undefined, space: string | number | undefined, inclusionOptions: JSONBStringifyInclusionOptions & {
        includeSymbolKeys: true;
    }, options?: JSONBStringifyOptions | undefined): string;
    /**
     * Converts a JavaScript value to a JavaScript Object Notation B (JSONB) string.
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     */
    stringify(value: any, replacer?: (number | string)[] | null | undefined, space?: string | number | undefined, inclusionOptions?: (JSONBStringifyInclusionOptions & {
        includeSymbolKeys?: false | undefined;
    }) | undefined, options?: JSONBStringifyOptions | undefined): string;
    /**
     * Converts a JavaScript value to a JavaScript Object Notation B (JSONB) string.
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     */
    stringify(value: any, replacer: (number | string | symbol)[] | null | undefined, space: string | number | undefined, inclusionOptions: JSONBStringifyInclusionOptions & {
        includeSymbolKeys: true;
    }, options?: JSONBStringifyOptions | undefined): string;
}
interface JSONBParseInclusionOptions {
    /**
     * @default true
     */
    bigint?: boolean | undefined;
    /**
     * @default true
     */
    undefined?: boolean | undefined;
    /**
     * @default true
     */
    Infinity?: boolean | undefined;
    /**
     * @default true
     */
    NegativeInfinity?: boolean | undefined;
    /**
     * @default true
     */
    NaN?: boolean | undefined;
    /**
     * @todo This is not functional yet, so it cannot be enabled.
     *
     * @default false
     */
    get?: false | undefined;
    /**
     * @todo This is not functional yet, so it cannot be enabled.
     *
     * @default false
     */
    set?: false | undefined;
    /**
     * @todo This is not functional yet, so it cannot be enabled.
     *
     * @default false
     */
    function?: false | undefined;
    /**
     * @todo This is not functional yet, so it cannot be enabled.
     *
     * @default false
     */
    class?: false | undefined;
}
interface JSONBStringifyInclusionOptions {
    /**
     * @default true
     */
    bigint?: boolean | undefined;
    /**
     * @default true
     */
    undefined?: boolean | undefined;
    /**
     * @default true
     */
    Infinity?: boolean | undefined;
    /**
     * @default true
     */
    NegativeInfinity?: boolean | undefined;
    /**
     * @default true
     */
    NaN?: boolean | undefined;
    /**
     * @default false
     */
    get?: boolean | undefined;
    /**
     * @default false
     */
    set?: boolean | undefined;
    /**
     * @default false
     */
    function?: boolean | undefined;
    /**
     * @todo This is not functional yet, so it cannot be enabled.
     *
     * @default false
     */
    class?: false | undefined;
    /**
     * @default false
     */
    symbol?: boolean | undefined;
    /**
     * @default false
     */
    includeSymbolKeys?: boolean | undefined;
    /**
     * @default false
     */
    includeNonEnumerableKeys?: boolean | undefined;
    /**
     * Whether a native function should be formatted as `function name() { /* [native code] *{@links}/ }` instead of `function name() { [native code] }`.
     *
     * @default true
     */
    commentFunctionNativeCode?: boolean | undefined;
    /**
     * Whether to include circular references in the output.
     *
     * Their values will be displayed as `[[Circular Reference]]`.
     *
     * @default false
     */
    circularReferences?: boolean | undefined;
}
interface JSONBStringifyOptions {
    /**
     * The maximum depth to stringify values.
     *
     * @default Infinity
     */
    maxDepth?: number | undefined;
    /**
     * Whether to throw an {@link JSONBMaxDepthExceededError | error} when the maximum depth is exceeded.
     *
     * Only applies if {@link JSONBStringifyOptions.maxDepth} is not `Infinity` or `undefined`.
     *
     * @default true
     */
    throwAtDepthExceeded?: boolean | undefined;
    /**
     * The amount of time in milliseconds after which the stringify operation will be aborted.
     *
     * @default Infinity
     */
    timeout?: number | undefined;
}
/**
 * An intrinsic object that provides functions to convert JavaScript values to console-formatted strings.
 * The same as {@link JSONB} except it is made for console output, with options for things like maximum depth and length, and the output is not parsable.
 *
 * @author 8Crafter
 */
declare var JSONBConsole: JSONBConsole;
/**
 * An intrinsic object that provides functions to convert JavaScript values to console-formatted strings.
 * The same as {@link JSONB} except it is made for console output, with options for things like maximum depth and length, and the output is not parsable.
 *
 * @author 8Crafter
 *
 * @ignore
 */
interface JSONBConsole {
    /**
     * Converts a JavaScript value to a console-formatted string.
     *
     * The same as {@link JSONB.stringify} except it is made for console output, with options for things like maximum depth and length.
     *
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     * @param inclusionOptions The options for what kinds of values can be stringified.
     * @param options The options for stringifying the provided value.
     * @returns A console-formatted JSONB string.
     */
    stringify(value: any, replacer?: (number | string)[] | null, space?: string | number, inclusionOptions?: JSONBConsoleStringifyInclusionOptions, options?: JSONBConsoleStringifyOptions): string;
    /**
     * Converts a JavaScript value to a console-formatted string.
     *
     * The same as {@link JSONB.stringify} except it is made for console output, with options for things like maximum depth and length.
     *
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer A function that transforms the results.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     * @param inclusionOptions The options for what kinds of values can be stringified.
     * @param options The options for stringifying the provided value.
     * @returns A console-formatted JSONB string.
     */
    stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number, inclusionOptions?: JSONBConsoleStringifyInclusionOptions, options?: JSONBConsoleStringifyOptions): string;
    /**
     * Converts a JavaScript value to a console-formatted string.
     *
     * The same as {@link JSONB.stringify} except it is made for console output, with options for things like maximum depth and length.
     *
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     * @param options The options for what kinds of values can be stringified.
     * @param {number} [maxLength=Infinity] The maximum length of the string to be generated. It does not actually limit the string to this length, it is buggy, but it will have some impact on the length of the string.
     * @param {number} [maxDepth=Infinity] The maximum depth to stringify objects.
     * @returns A console-formatted JSONB string.
     *
     * @deprecated This syntax has been deprecated.
     */
    stringify(value: any, replacer?: (number | string)[] | null, space?: string | number, options?: JSONBConsoleStringifyInclusionOptions, maxLength?: number, maxDepth?: number): string;
    /**
     * Converts a JavaScript value to a console-formatted string.
     *
     * The same as {@link JSONB.stringify} except it is made for console output, with options for things like maximum depth and length.
     *
     * @param value A JavaScript value, usually an object or array, to be converted.
     * @param replacer A function that transforms the results.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     * @param options The options for what kinds of values can be stringified.
     * @param {number} [maxLength=Infinity] The maximum length of the string to be generated. It does not actually limit the string to this length, it is buggy, but it will have some impact on the length of the string.
     * @param {number} [maxDepth=Infinity] The maximum depth to stringify objects.
     * @returns A console-formatted JSONB string.
     *
     * @deprecated This syntax has been deprecated.
     */
    stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number, options?: JSONBConsoleStringifyInclusionOptions, maxLength?: number, maxDepth?: number): string;
}
interface JSONBConsoleStringifyInclusionOptions {
    /**
     * @default true
     */
    bigint?: boolean;
    /**
     * @default true
     */
    undefined?: boolean;
    /**
     * @default true
     */
    Infinity?: boolean;
    /**
     * @default true
     */
    NegativeInfinity?: boolean;
    /**
     * @default true
     */
    NaN?: boolean;
    /**
     * @default false
     */
    get?: boolean;
    /**
     * @default false
     */
    set?: boolean;
    /**
     * @default true
     */
    function?: boolean;
    /**
     * @todo This is not functional yet, so it cannot be enabled.
     *
     * @default false
     */
    class?: false;
    /**
     * @default true
     */
    symbol?: boolean;
    /**
     * @default true
     */
    includeProtoValues?: boolean;
    /**
     * @default false
     */
    includeSymbolKeys?: boolean;
}
interface JSONBConsoleStringifyOptions {
    /**
     * The symbol to use when empty array entries are displayed (`empty × ${number}`).
     *
     * @default "×"
     */
    arrayEmptyEntryXSymbol?: string | undefined;
    /**
     * The symbol to use when truncating values.
     *
     * @default "…"
     */
    ellipsis?: string | undefined;
    /**
     * The maximum length of the string to be generated. It does not actually limit the string to this length, it is buggy, but it will have some impact on the length of the string.
     *
     * This does actually limit the length for arrays, but objects have the buggy behavior still.
     *
     * @default Infinity
     */
    maxLength?: number | undefined;
    /**
     * The maximum depth to stringify objects.
     *
     * @default Infinity
     */
    maxDepth?: number | undefined;
    /**
     * Whether to inline arrays.
     *
     * If a number is provided, any array with a displayed entry count less than or equal to that number will be inlined.
     *
     * @default true
     */
    inlineArrays?: boolean | number | undefined;
    /**
     * Whether to inline objects.
     *
     * If a number is provided, any object with a displayed property count less than or equal to that number will be inlined.
     *
     * @default true
     */
    inlineObjects?: boolean | number | undefined;
    /**
     * The maximum number of entries of an array to be displayed.
     *
     * @default 100
     */
    maxArrayLength?: number | undefined;
    /**
     * The maximum number of properties of an object to be displayed.
     *
     * @default 100
     */
    maxPropertyCount?: number | undefined;
    /**
     * The maximum number of lines to be displayed.
     *
     * This does not actually limit the number of lines, instead it starts truncating stuff at this line count.
     *
     * Currently only works on arrays.
     *
     * @default 5
     */
    maxLineCount?: number | undefined;
    /**
     * Whether to use class names instead of ellipsis.
     *
     * This only applies when {@link Symbol.toStringTag} is defined on the value or a custom constructor is used for the value
     * (ex. if it is an object and it has a constructor other than the {@link Object} constructor).
     *
     * @default true
     */
    useClassNameInsteadOfEllipsis?: boolean | undefined;
}
declare class JSONBMaxDepthExceededError extends Error {
    /**
     * The property.
     */
    readonly key: PropertyKey;
    /**
     * The object containing the property.
     */
    readonly holder: Record<PropertyKey, any>;
    /**
     * The inclusion options passed into {@link JSONB.stringify}.
     */
    readonly inclusionOptions: JSONBStringifyInclusionOptions | JSONBConsoleStringifyInclusionOptions;
    /**
     * The additional options passed into {@link JSONB.stringify}.
     */
    readonly options: JSONBStringifyOptions | JSONBConsoleStringifyOptions;
    /**
     * The property path.
     */
    readonly path: readonly PropertyKey[];
    readonly name: "JSONBMaxDepthExceededError";
    readonly message: "Stack overflow";
    constructor(
    /**
     * The property.
     */
    key: PropertyKey, 
    /**
     * The object containing the property.
     */
    holder: Record<PropertyKey, any>, 
    /**
     * The inclusion options passed into {@link JSONB.stringify}.
     */
    inclusionOptions: JSONBStringifyInclusionOptions | JSONBConsoleStringifyInclusionOptions, 
    /**
     * The additional options passed into {@link JSONB.stringify}.
     */
    options: JSONBStringifyOptions | JSONBConsoleStringifyOptions, 
    /**
     * The property path.
     */
    path: readonly PropertyKey[]);
}
declare class JSONBTimeoutError extends Error {
    /**
     * The property.
     */
    readonly key: PropertyKey;
    /**
     * The object containing the property.
     */
    readonly holder: Record<PropertyKey, any>;
    /**
     * The inclusion options passed into {@link JSONB.stringify}.
     */
    readonly inclusionOptions: JSONBStringifyInclusionOptions | JSONBConsoleStringifyInclusionOptions;
    /**
     * The additional options passed into {@link JSONB.stringify}.
     */
    readonly options: JSONBStringifyOptions | JSONBConsoleStringifyOptions;
    /**
     * The property path.
     *
     * Only available if {@link JSONBStringifyOptions.maxDepth} is not `Infinity` or `undefined`.
     */
    readonly path?: readonly PropertyKey[] | undefined;
    readonly name: "JSONBTimeoutError";
    readonly message: `Timed out after ${bigint} milliseconds`;
    constructor(
    /**
     * The time in milliseconds that the operation took before timing out.
     */
    time: number | bigint, 
    /**
     * The property.
     */
    key: PropertyKey, 
    /**
     * The object containing the property.
     */
    holder: Record<PropertyKey, any>, 
    /**
     * The inclusion options passed into {@link JSONB.stringify}.
     */
    inclusionOptions: JSONBStringifyInclusionOptions | JSONBConsoleStringifyInclusionOptions, 
    /**
     * The additional options passed into {@link JSONB.stringify}.
     */
    options: JSONBStringifyOptions | JSONBConsoleStringifyOptions, 
    /**
     * The property path.
     *
     * Only available if {@link JSONBStringifyOptions.maxDepth} is not `Infinity` or `undefined`.
     */
    path?: readonly PropertyKey[] | undefined);
}
