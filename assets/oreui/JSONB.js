/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-regexp-exec */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-duplicate-type-constituents */
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
/* eslint-disable no-fallthrough, no-misleading-character-class */
/* global globalThis */ // This definition is for the output JS.
/**
 * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation B (JSONB) format.
 *
 * This is an improved version of {@link JSON}.
 *
 * @author 8Crafter
 */
var JSONB = {};
/**
 * An intrinsic object that provides functions to convert JavaScript values to console-formatted strings.
 * The same as {@link JSONB} except it is made for console output, with options for things like maximum depth and length, and the output is not parsable.
 *
 * @author 8Crafter
 */
var JSONBConsole = {};
class JSONBMaxDepthExceededError extends Error {
    key;
    holder;
    inclusionOptions;
    options;
    path;
    constructor(
    /**
     * The property.
     */
    key, 
    /**
     * The object containing the property.
     */
    holder, 
    /**
     * The inclusion options passed into {@link JSONB.stringify}.
     */
    inclusionOptions, 
    /**
     * The additional options passed into {@link JSONB.stringify}.
     */
    options, 
    /**
     * The property path.
     */
    path) {
        super();
        this.key = key;
        this.holder = holder;
        this.inclusionOptions = inclusionOptions;
        this.options = options;
        this.path = path;
    }
}
Object.defineProperty(JSONBMaxDepthExceededError.prototype, "name", {
    value: "JSONBMaxDepthExceededError",
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(JSONBMaxDepthExceededError.prototype, "message", {
    value: "Stack overflow",
    writable: true,
    enumerable: false,
    configurable: true,
});
class JSONBTimeoutError extends Error {
    key;
    holder;
    inclusionOptions;
    options;
    path;
    message;
    constructor(
    /**
     * The time in milliseconds that the operation took before timing out.
     */
    time, 
    /**
     * The property.
     */
    key, 
    /**
     * The object containing the property.
     */
    holder, 
    /**
     * The inclusion options passed into {@link JSONB.stringify}.
     */
    inclusionOptions, 
    /**
     * The additional options passed into {@link JSONB.stringify}.
     */
    options, 
    /**
     * The property path.
     *
     * Only available if {@link JSONBStringifyOptions.maxDepth} is not `Infinity` or `undefined`.
     */
    path) {
        super();
        this.key = key;
        this.holder = holder;
        this.inclusionOptions = inclusionOptions;
        this.options = options;
        this.path = path;
        this.message = `Timed out after ${typeof time === "number" ? time.toFixed(0) : time} milliseconds`;
    }
}
Object.defineProperty(JSONBTimeoutError.prototype, "name", {
    value: "JSONBTimeoutError",
    writable: true,
    enumerable: false,
    configurable: true,
});
Object.defineProperty(JSONBTimeoutError.prototype, "message", {
    value: "",
    writable: true,
    enumerable: false,
    configurable: true,
});
(function () {
    /**
     * Asserts that a value is not `undefined` or `null`.
     *
     * @template T The type of the value to check.
     * @param {T} value The value to check.
     * @returns {asserts value is NonNullable<T>} Asserts that the value is not `undefined` or `null`.
     *
     * @throws {Error} If the value is `undefined` or `null`.
     */
    function assertIsDefined(value) {
        if (value === undefined || value === null) {
            throw new Error(`${String(value)} is not defined`);
        }
    }
    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    /**
     * @deprecated Replaced with a dynamic regular expression.
     */
    var _rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? "0" + n : n;
    }
    /**
     * @deprecated No longer used.
     */
    function _this_value() {
        return this.valueOf();
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ?
                this.getUTCFullYear() +
                    "-" +
                    f(this.getUTCMonth() + 1) +
                    "-" +
                    f(this.getUTCDate()) +
                    "T" +
                    f(this.getUTCHours()) +
                    ":" +
                    f(this.getUTCMinutes()) +
                    ":" +
                    f(this.getUTCSeconds()) +
                    "Z"
                : null;
        }; /*

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;*/
    }
    var gap;
    var indent;
    var meta;
    var rep;
    /**
     * Stringifies a symbol if it is not unique (eg. `Symbol.toStringTag` or `Symbol.for("foo")`).
     *
     * If the symbol is unique, it returns `undefined`.
     */
    function stringifyNonUniqueSymbol(symbol) {
        if (Symbol.keyFor(symbol) !== undefined)
            return `Symbol.for(${JSON.stringify(Symbol.keyFor(symbol))})`;
        const wellKnownSymbol = Object.getOwnPropertyNames(Symbol).find((key) => typeof Symbol[key] === "symbol" && symbol === Symbol[key]);
        if (wellKnownSymbol !== undefined)
            return propertyIdentifierRegex.test(wellKnownSymbol) ? `Symbol.${wellKnownSymbol}` : `Symbol[${JSON.stringify(wellKnownSymbol)}]`;
        return undefined;
    }
    function quote(string, isKey = false) {
        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.
        rx_escapable.lastIndex = 0;
        if (typeof string === "symbol") {
            if (isKey) {
                const nonUniqueValue = stringifyNonUniqueSymbol(string);
                if (nonUniqueValue !== undefined)
                    return `[${nonUniqueValue}]`;
                return `[Symbol(${string.description !== undefined ? quote(string.description) : ""})]`;
            }
            else {
                return stringifyNonUniqueSymbol(string) ?? `Symbol(${string.description !== undefined ? quote(string.description) : ""})`;
            }
        }
        return rx_escapable.test(String(string)) ?
            '"' +
                String(string).replace(rx_escapable, function (a) {
                    var c = meta[a];
                    return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                }) +
                '"'
            : '"' + String(string) + '"';
    }
    let startTime = 0;
    function str(key, holder, inclusionOptions, options, path) {
        if (holder[key] === holder) {
            if (inclusionOptions?.circularReferences ?? true) {
                return "[[Circular Reference]]";
            }
            else {
                return "null";
            }
        }
        if ((options?.timeout ?? Infinity) < Infinity && startTime + 5000 < Date.now()) {
            throw new JSONBTimeoutError(Date.now() - startTime, key, holder, inclusionOptions, options, path);
        }
        if (path && path.length > options.maxDepth) {
            if (options.throwAtDepthExceeded === false)
                return undefined;
            throw new JSONBMaxDepthExceededError(key, holder, inclusionOptions, options, path);
        }
        // Produce a string from holder[key].
        var i; // The loop counter.
        var k; // The member key.
        var v; // The member value.
        var length;
        var mind = gap;
        var partial;
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- These are here for informational purposes only.
        var value = holder[key];
        if (inclusionOptions?.get) {
            if (Object.hasOwn(holder, "__lookupGetter__") ? !!holder?.__lookupGetter__(key) : false) {
                if (inclusionOptions.set) {
                    // eslint-disable-next-line no-extra-boolean-cast
                    if (!!holder.__lookupSetter__(key)) {
                        value = { get: holder.__lookupGetter__(key), set: holder.__lookupSetter__(key) };
                    }
                    else {
                        value = { get: holder.__lookupGetter__(key) };
                    }
                }
                else {
                    value = { get: holder.__lookupGetter__(key) };
                }
            }
            else if (inclusionOptions.set) {
                if (Object.hasOwn(holder, "__lookupSetter__") ? !!holder.__lookupSetter__(key) : false) {
                    value = { set: holder.__lookupSetter__(key) };
                }
            }
        }
        else if (inclusionOptions?.set) {
            if (Object.hasOwn(holder, "__lookupSetter__") ? !!holder.__lookupSetter__(key) : false) {
                value = { set: holder.__lookupSetter__(key) };
            }
        } /*

// If the value is an instance of the Decimal or Decimal2 class, convert it to decimal type.

        if (
            value
            && typeof value === "object"
            && typeof value.toJSONB === "function"
        ) {
            value = value.toJSONB(key);
        } */
        // If the value has a toJSONB or toJSON method, try to call it to obtain a replacement value.
        if (value && typeof value === "object" && typeof value.toJSONB === "function") {
            try {
                value = value.toJSONB(key);
            }
            catch { }
        }
        else if (value && typeof value === "object" && typeof value.toJSON === "function") {
            try {
                value = value.toJSON(key);
            }
            catch { }
        }
        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.
        if (typeof rep === "function") {
            value = rep.call(holder, typeof key === "symbol" ? key : key.toString(), value);
        }
        if (value === holder) {
            if (inclusionOptions?.circularReferences ?? true) {
                return "[[Circular Reference]]";
            }
            else {
                return "null";
            }
        }
        // What happens next depends on the value's type.
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return (isFinite(value) ? String(value)
                    : value === Infinity ?
                        (inclusionOptions?.Infinity ?? true) ?
                            "Infinity"
                            : "null"
                        : value === -Infinity ?
                            (inclusionOptions?.NegativeInfinity ?? true) ?
                                "-Infinity"
                                : "null"
                            : Number.isNaN(value) ?
                                (inclusionOptions?.NaN ?? true) ?
                                    "NaN"
                                    : "null"
                                : "null");
            case "bigint":
                return (inclusionOptions?.bigint ?? true) ? String(value) + "n" : "null";
            case "undefined":
                return (inclusionOptions?.undefined ?? true) ? "undefined" : undefined;
            case "function":
                return ((inclusionOptions?.function ?? false) ?
                    ((inclusionOptions?.commentFunctionNativeCode ?? true) &&
                        /function [^({]*\(\) \{ \[native code\] \}/.test(value.toString())) ?
                        value.toString().replace("() { [native code] }", "() { /* [native code] */ }")
                        : value.toString()
                    : undefined);
            case "boolean":
            // @ts-ignore
            case "null":
                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce "null". The case is included here in
                // the remote chance that this gets fixed someday.
                return String(value);
            case "symbol":
                return (inclusionOptions?.symbol ?? false) ? quote(value) : undefined;
            // If the type is "object", we might be dealing with an object or an array or
            // null.
            case "object":
                // Due to a specification blunder in ECMAScript, typeof null is "object",
                // so watch out for that case.
                if (!value) {
                    return "null";
                }
                // Make an array to hold the partial results of stringifying this object value.
                gap += indent;
                partial = [];
                // Is the value an array?
                if (Object.prototype.toString.apply(value) === "[object Array]" || value instanceof Array) {
                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSONB values.
                    // Assets that the value is an array.
                    if (!(function a(_) {
                        return true;
                    })(value))
                        throw new Error("UNREACHABLE CODE REACHED!");
                    length = value.length;
                    for (i = 0; i < length; i++) {
                        if (value[i] === value || value[i] === holder[key]) {
                            if (inclusionOptions?.circularReferences ?? true) {
                                partial[i] = "[[Circular Reference]]";
                            }
                            else {
                                partial[i] = "null";
                            }
                        }
                        else {
                            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                            partial[i] = str(i, value, inclusionOptions, options, path && [...path, key]) || "null";
                        }
                    }
                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.
                    v =
                        partial.length === 0 ? "[]"
                            : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                                : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v;
                }
                // If the replacer is an array, use it to select the members to be stringified.
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i++) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            if (value[k] === value || value[k] === holder[key]) {
                                if (inclusionOptions?.circularReferences ?? true) {
                                    v = "[[Circular Reference]]";
                                }
                                else {
                                    continue;
                                }
                            }
                            else {
                                v = str(k, value, inclusionOptions, options, path && [...path, key]);
                            }
                            if (v) {
                                partial.push(quote(k, true) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                }
                else {
                    // Otherwise, iterate through all of the keys in the object.
                    // Assets that the value is an array.
                    if (!(function a(_) {
                        return true;
                    })(value))
                        throw new Error("UNREACHABLE CODE REACHED!");
                    // DEBUG: These options should default to false.
                    if ((inclusionOptions?.includeSymbolKeys ?? true) || (inclusionOptions?.includeNonEnumerableKeys ?? false)) {
                        const propertyDescriptors = Object.getOwnPropertyDescriptors(value);
                        // DEBUG: This option should default to false.
                        for (k of (inclusionOptions?.includeSymbolKeys ?? true) ?
                            // DEBUG: This option should default to false.
                            (inclusionOptions?.includeNonEnumerableKeys ?? true) ?
                                [...Object.getOwnPropertyNames(propertyDescriptors), ...Object.getOwnPropertySymbols(propertyDescriptors)]
                                : [...Object.getOwnPropertyNames(propertyDescriptors), ...Object.getOwnPropertySymbols(propertyDescriptors)].filter((v) => propertyDescriptors[v]?.enumerable)
                            : Object.getOwnPropertyNames(value)) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                if (value[k] === value || value[k] === holder[key]) {
                                    if (inclusionOptions?.circularReferences ?? true) {
                                        v = "[[Circular Reference]]";
                                    }
                                    else {
                                        continue;
                                    }
                                }
                                else {
                                    v = str(k, value, inclusionOptions, options, path && [...path, key]);
                                }
                                if (v) {
                                    partial.push(quote(k, true) + (gap ? ": " : ":") + v);
                                }
                            }
                        }
                    }
                    else {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                if (value[k] === value || value[k] === holder[key]) {
                                    if (inclusionOptions?.circularReferences ?? true) {
                                        v = "[[Circular Reference]]";
                                    }
                                    else {
                                        continue;
                                    }
                                }
                                else {
                                    v = str(k, value, inclusionOptions, options, path && [...path, key]);
                                }
                                if (v) {
                                    partial.push(quote(k, true) + (gap ? ": " : ":") + v);
                                }
                            }
                        }
                    }
                }
                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.
                v =
                    partial.length === 0 ? "{}"
                        : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                            : "{" + partial.join(",") + "}";
                gap = mind;
                return v;
        }
    }
    // If the JSONB object does not yet have a stringify method, give it one.
    if (typeof JSONB.stringify !== "function") {
        meta = {
            // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\",
        };
        JSONB.stringify = function (value, replacer, space, inclusionOptions = {
            bigint: true,
            undefined: true,
            Infinity: true,
            NegativeInfinity: true,
            NaN: true,
            get: false,
            set: false,
            function: false,
            class: false,
            symbol: false,
            includeSymbolKeys: false,
            includeNonEnumerableKeys: false,
            commentFunctionNativeCode: true,
            circularReferences: false,
        }, options = {
            maxDepth: Infinity,
            throwAtDepthExceeded: true,
            timeout: Infinity,
        }) {
            startTime = Date.now();
            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSONB text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.
            var i;
            gap = "";
            indent = "";
            // If the space parameter is a number, make an indent string containing that
            // many spaces.
            if (typeof space === "number") {
                for (i = 0; i < space; i++) {
                    indent += " ";
                }
                // If the space parameter is a string, it will be used as the indent string.
            }
            else if (typeof space === "string") {
                indent = space;
            }
            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new SyntaxError("Invalid Replacer");
            }
            // Make a fake root object containing our value under the key of "".
            // Return the result of stringifying the value.
            return str("", { "": value }, inclusionOptions, options, (options?.timeout ?? Infinity) < Infinity ? [] : undefined);
        };
    }
    // If the JSONB object does not yet have a parse method, give it one.
    if (typeof JSONB.parse !== "function") {
        JSONB.parse = function (text, reviver, inclusionOptions = {
            bigint: true,
            undefined: true,
            Infinity: true,
            NegativeInfinity: true,
            NaN: true,
            get: false,
            set: false,
            function: false,
            class: false,
        }) {
            // The parse method takes a text and an optional reviver function, and returns
            // a JavaScript value if the text is a valid JSONB text.
            var j;
            var rx_three_b = RegExp(`"[^"\\\\\\n\\r]*"|true|false|null|${(inclusionOptions.undefined ?? true) ? "undefined|" : ""}${(inclusionOptions.Infinity ?? true) ? "Infinity|" : ""}${(inclusionOptions.NegativeInfinity ?? true) ? "-Infinity|" : ""}${(inclusionOptions.NaN ?? true) ? "NaN|" : ""}-?\\d+${(inclusionOptions.bigint ?? true) ? `(?:n|(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)` : `(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?`}`, "g");
            function walk(holder, key) {
                assertIsDefined(reviver);
                // The walk method is used to recursively walk the resulting structure so
                // that modifications can be made.
                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            }
                            else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            // Parsing happens in four stages. In the first stage, we replace certain
            // Unicode characters with escape sequences. JavaScript handles many characters
            // incorrectly, either silently deleting them, or treating them as line endings.
            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            // In the second stage, we run the text against regular expressions that look
            // for non-JSONB patterns. We are especially concerned with "()" and "new"
            // because they can cause invocation, and "=" because it can cause mutation.
            // But just to be safe, we want to reject all unexpected forms.
            // We split the second stage into 4 regexp operations in order to work around
            // crippling inefficiencies in IE's and Safari's regexp engines. First we
            // replace the JSONB backslash pairs with "@" (a non-JSONB character). Second, we
            // replace all simple value tokens with "]" characters. Third, we delete all
            // open brackets that follow a colon or comma or that begin the text. Finally,
            // we look to see that the remaining characters are only whitespace or "]" or
            // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.
            /* console.log(
    text
        .replace(rx_two, "@")
        .replace(rx_three_b, "]")
        .replace(rx_four, "")
) */
            if (rx_one.test(text.replace(rx_two, "@").replace(rx_three_b, "]").replace(rx_four, ""))) {
                // In the third stage we use the eval function to compile the text into a
                // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
                // in JavaScript: it can begin a block or an object literal. We wrap the text
                // in parens to eliminate the ambiguity.
                j = eval("(" + text + ")");
                // In the optional fourth stage, we recursively walk the new structure, passing
                // each name/value pair to a reviver function for possible transformation.
                return typeof reviver === "function" ? walk({ "": j }, "") : j;
            }
            // If the text is not JSONB parseable, then a SyntaxError is thrown.
            throw new SyntaxError("JSONB.parse");
        };
    }
})();
globalThis.JSONB = JSONB;
(function () {
    /**
     * Asserts that a value is not `undefined` or `null`.
     *
     * @template T The type of the value to check.
     * @param {T} value The value to check.
     * @returns {asserts value is NonNullable<T>} Asserts that the value is not `undefined` or `null`.
     *
     * @throws {Error} If the value is `undefined` or `null`.
     */
    function _assertIsDefined(value) {
        if (value === undefined || value === null) {
            throw new Error(`${String(value)} is not defined`);
        }
    }
    const defaultStringifyInclusionOptions = {
        bigint: true,
        undefined: true,
        Infinity: true,
        NegativeInfinity: true,
        NaN: true,
        get: false,
        set: false,
        function: true,
        class: false,
        symbol: true,
        includeProtoValues: true,
        includeSymbolKeys: false,
    };
    const defaultStringifyOptions = {
        arrayEmptyEntryXSymbol: "×",
        ellipsis: "…",
        maxLength: Infinity,
        maxDepth: Infinity,
        /**
         * @type {boolean | number}
         */
        inlineArrays: true,
        /**
         * @type {boolean | number}
         */
        inlineObjects: true,
        maxArrayLength: 100,
        maxPropertyCount: 100,
        maxLineCount: 5,
        useClassNameInsteadOfEllipsis: true,
    };
    // var rx_one = /^[\],:{}\s]*$/;
    // var rx_two = /\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    // var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g;
    // var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    // var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? "0" + n : n;
    }
    /**
     * @deprecated No longer used.
     */
    function _this_value() {
        return this.valueOf();
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ?
                this.getUTCFullYear() +
                    "-" +
                    f(this.getUTCMonth() + 1) +
                    "-" +
                    f(this.getUTCDate()) +
                    "T" +
                    f(this.getUTCHours()) +
                    ":" +
                    f(this.getUTCMinutes()) +
                    ":" +
                    f(this.getUTCSeconds()) +
                    "Z"
                : null;
        }; /*

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;*/
    }
    var gap;
    var indent;
    var meta;
    var rep;
    function quote(string) {
        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.
        rx_escapable.lastIndex = 0;
        return (typeof string === "symbol" ? string.toString()
            : rx_escapable.test(String(string)) ?
                '"' +
                    String(string).replace(rx_escapable, function (a) {
                        var c = meta[a];
                        return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                    }) +
                    '"'
                : '"' + String(string) + '"');
    }
    function str(key, holder, inclusionOptions = {}, options = {}, currentLength = 0, currentDepth = 0, entryCount = 0, lineCount = 0) {
        // Produce a string from holder[key].
        var i; // The loop counter.
        var k; // The member key.
        var v; // The member value.
        var length;
        var mind = gap;
        var partial;
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents -- These are here for informational purposes only.
        var value = holder[key];
        if (inclusionOptions.get ?? defaultStringifyInclusionOptions.get) {
            if (Object.hasOwn(holder, "__lookupGetter__") && typeof holder.__lookupGetter__ === "function" ?
                !!holder?.__lookupGetter__(key) && typeof holder.__lookupGetter__(key) === "function"
                : false) {
                if (inclusionOptions.set ?? defaultStringifyInclusionOptions.set) {
                    // eslint-disable-next-line no-extra-boolean-cast
                    if (!!holder.__lookupSetter__(key)) {
                        value = { get: holder.__lookupGetter__(key), set: holder.__lookupSetter__(key) };
                    }
                    else {
                        value = { get: holder.__lookupGetter__(key) };
                    }
                }
                else {
                    value = { get: holder.__lookupGetter__(key) };
                }
            }
            else if (inclusionOptions.set ?? defaultStringifyInclusionOptions.set) {
                if (Object.hasOwn(holder, "__lookupSetter__") && typeof holder.__lookupSetter__ === "function" ?
                    !!holder.__lookupSetter__(key) && typeof holder.__lookupSetter__(key) === "function"
                    : false) {
                    value = { set: holder.__lookupSetter__(key) };
                }
            }
        }
        else if (inclusionOptions.set ?? defaultStringifyInclusionOptions.set) {
            if (Object.hasOwn(holder, "__lookupSetter__") && typeof holder.__lookupSetter__ === "function" ?
                !!holder.__lookupSetter__(key) && typeof holder.__lookupSetter__(key) === "function"
                : false) {
                value = { set: holder.__lookupSetter__(key) };
            }
        } /*

// If the value is an instance of the Decimal or Decimal2 class, convert it to decimal type.

        if (
            value
            && typeof value === "object"
            && typeof value.toJSONB === "function"
        ) {
            value = value.toJSONB(key);
        } */
        // If the value has a toJSONB or toJSON method, try to call it to obtain a replacement value.
        if (value && typeof value === "object" && typeof value.toJSONB === "function") {
            try {
                value = value.toJSONB(key);
            }
            catch { }
        }
        else if (value && typeof value === "object" && typeof value.toJSON === "function") {
            try {
                value = value.toJSON(key);
            }
            catch { }
        }
        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.
        if (typeof rep === "function") {
            value = rep.call(holder, key.toString(), value);
        }
        if (currentDepth >= (options.maxDepth ?? defaultStringifyOptions.maxDepth)) {
            if (typeof value === "object" && value !== null) {
                if (value instanceof Array) {
                    if (options.useClassNameInsteadOfEllipsis ?? defaultStringifyOptions.useClassNameInsteadOfEllipsis) {
                        const className = Symbol.toStringTag in value ? String(value[Symbol.toStringTag])
                            : value.constructor?.name ? value.constructor.name
                                : null;
                        if (className !== null) {
                            return `${className}(${value.length})`;
                        }
                    }
                    return `[${options.ellipsis ?? defaultStringifyOptions.ellipsis}]`;
                }
                if (options.useClassNameInsteadOfEllipsis ?? defaultStringifyOptions.useClassNameInsteadOfEllipsis) {
                    const className = Symbol.toStringTag in value ? String(value[Symbol.toStringTag])
                        : value.constructor?.name && value.constructor !== Object ? value.constructor.name
                            : null;
                    if (className !== null) {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        return className;
                    }
                }
                return `{${options.ellipsis ?? defaultStringifyOptions.ellipsis}}`;
            }
            if (typeof value === "function") {
                return "ƒ";
            }
            if (currentDepth > (options.maxDepth ?? defaultStringifyOptions.maxDepth)) {
                return options.ellipsis ?? defaultStringifyOptions.ellipsis;
            }
        }
        // What happens next depends on the value's type.
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return (isFinite(value) ? String(value)
                    : value === Infinity ?
                        (inclusionOptions.Infinity ?? defaultStringifyInclusionOptions.Infinity) ?
                            "Infinity"
                            : "null"
                        : value === -Infinity ?
                            (inclusionOptions.NegativeInfinity ?? defaultStringifyInclusionOptions.NegativeInfinity) ?
                                "-Infinity"
                                : "null"
                            : Number.isNaN(value) ?
                                (inclusionOptions.NaN ?? defaultStringifyInclusionOptions.NaN) ?
                                    "NaN"
                                    : "null"
                                : "null");
            case "bigint":
                return (inclusionOptions.bigint ?? defaultStringifyInclusionOptions.bigint) ? String(value) + "n" : "null";
            case "undefined":
                return (inclusionOptions.undefined ?? defaultStringifyInclusionOptions.undefined) ? "undefined" : undefined;
            case "function":
                if (inclusionOptions.function ?? defaultStringifyInclusionOptions.function) {
                    return (`${value instanceof async function* () { }.constructor || value instanceof (async () => { }).constructor ? "async " : ""}ƒ${value instanceof async function* () { }.constructor || value instanceof function* () { }.constructor ? "*" : ""} ` +
                        (value.toString().startsWith("class ") ? `class ${value.name}` : `${value.name}${value.toString().match(/\([^)]*?\)/)?.[0] ?? "()"}`));
                }
                return undefined;
            case "boolean":
            // @ts-ignore
            case "null":
                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce "null". The case is included here in
                // the remote chance that this gets fixed someday.
                return String(value);
            case "symbol":
                return (inclusionOptions.symbol ?? defaultStringifyInclusionOptions.symbol) ? value.toString() : undefined;
            // If the type is "object", we might be dealing with an object or an array or
            // null.
            case "object":
                // Due to a specification blunder in ECMAScript, typeof null is "object",
                // so watch out for that case.
                if (!value) {
                    return "null";
                }
                // Make an array to hold the partial results of stringifying this object value.
                gap += indent;
                partial = [];
                // Is the value an array?
                if (Object.prototype.toString.apply(value) === "[object Array]" || value instanceof Array) {
                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSONB values.
                    // Assets that the value is an array.
                    if (!(function a(_) {
                        return true;
                    })(value))
                        throw new Error("UNREACHABLE CODE REACHED!");
                    length = value.length;
                    let localCurrentLength = currentLength;
                    const arrayEmptyEntryXSymbol = options.arrayEmptyEntryXSymbol ?? defaultStringifyOptions.arrayEmptyEntryXSymbol;
                    const arrayEmptyEntryXSymbolEscapedRegex = Array.from(options.arrayEmptyEntryXSymbol ?? defaultStringifyOptions.arrayEmptyEntryXSymbol)
                        .map((v) => "\\u" + v.charCodeAt(0).toString(16).padStart(4, "0"))
                        .join("");
                    for (i = 0; i < length; i++) {
                        {
                            const inlineArrays = options.inlineArrays ?? defaultStringifyOptions.inlineArrays;
                            if (partial.reduce((a, b) => a +
                                b.split("\n").length +
                                (a === 0 ? 0
                                    : inlineArrays === true || (inlineArrays !== false && partial.length <= inlineArrays) ? -1
                                        : 0), 0) +
                                lineCount >=
                                (options.maxLineCount ?? defaultStringifyOptions.maxLineCount)) {
                                localCurrentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length;
                                partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                break;
                            }
                        }
                        if ((typeof value === "object" || typeof value === "function") && value[i] === value) {
                            if (new RegExp(`^circular reference(?: ${arrayEmptyEntryXSymbolEscapedRegex} \\d+)?$`).test(partial.at(-1))) {
                                const lastValue = partial.pop();
                                const count = Number(lastValue.match(new RegExp(`^circular reference(?: ${arrayEmptyEntryXSymbolEscapedRegex} (\\d+))?$`))?.[1] ?? 1);
                                const currentValue = `circular reference ${arrayEmptyEntryXSymbol} ${count + 1}`;
                                localCurrentLength += currentValue.length - lastValue.length;
                                if (localCurrentLength +
                                    (options.ellipsis ?? defaultStringifyOptions.ellipsis).length * +(i < length - 1) +
                                    (gap.length ?
                                        (options.inlineArrays ?? defaultStringifyOptions.inlineArrays) === true ?
                                            Math.max(0, partial.length + +(i < length - 1)) * 2 + 2
                                            : ((options.inlineArrays ?? defaultStringifyOptions.inlineArrays) === false ||
                                                partial.length <= (options.inlineArrays ?? defaultStringifyOptions.inlineArrays)) ?
                                                Math.max(0, partial.length + +(i < length - 1)) * (gap.length + 2) + 4 + mind.length * 2
                                                : Math.max(0, partial.length + +(i < length - 1)) * 2 + 2
                                        : Math.max(0, partial.length + +(i < length - 1)) + 2) >=
                                    (options.maxLength ?? defaultStringifyOptions.maxLength)) {
                                    localCurrentLength -= currentValue.length - lastValue.length;
                                    localCurrentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length;
                                    partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                    break;
                                }
                                partial.push(currentValue);
                            }
                            else {
                                if (partial.length >= (options.maxArrayLength ?? defaultStringifyOptions.maxArrayLength)) {
                                    localCurrentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length;
                                    partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                    break;
                                }
                                localCurrentLength += 18;
                                entryCount++;
                                if (localCurrentLength +
                                    (options.ellipsis ?? defaultStringifyOptions.ellipsis).length * +(i < length - 1) +
                                    (gap.length ?
                                        (options.inlineArrays ?? defaultStringifyOptions.inlineArrays) === true ?
                                            Math.max(0, partial.length + +(i < length - 1)) * 2 + 2
                                            : ((options.inlineArrays ?? defaultStringifyOptions.inlineArrays) === false ||
                                                partial.length <= (options.inlineArrays ?? defaultStringifyOptions.inlineArrays)) ?
                                                Math.max(0, partial.length + +(i < length - 1)) * (gap.length + 2) + 4 + mind.length * 2
                                                : Math.max(0, partial.length + +(i < length - 1)) * 2 + 2
                                        : Math.max(0, partial.length + +(i < length - 1)) + 2) >=
                                    (options.maxLength ?? defaultStringifyOptions.maxLength)) {
                                    localCurrentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length - 18;
                                    partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                    break;
                                }
                                partial.push("circular reference");
                            }
                            continue;
                        }
                        if (!(i in value)) {
                            if (new RegExp(`^empty(?: ${arrayEmptyEntryXSymbolEscapedRegex} \\d+)?$`).test(partial.at(-1))) {
                                const lastValue = partial.pop();
                                const count = Number(lastValue.match(new RegExp(`^empty(?: ${arrayEmptyEntryXSymbolEscapedRegex} (\\d+))?$`))?.[1] ?? 1);
                                const currentValue = `empty ${arrayEmptyEntryXSymbol} ${count + 1}`;
                                localCurrentLength += currentValue.length - lastValue.length;
                                if (localCurrentLength +
                                    (options.ellipsis ?? defaultStringifyOptions.ellipsis).length * +(i < length - 1) +
                                    (gap.length ?
                                        (options.inlineArrays ?? defaultStringifyOptions.inlineArrays) === true ?
                                            Math.max(0, partial.length + +(i < length - 1)) * 2 + 2
                                            : ((options.inlineArrays ?? defaultStringifyOptions.inlineArrays) === false ||
                                                partial.length <= (options.inlineArrays ?? defaultStringifyOptions.inlineArrays)) ?
                                                Math.max(0, partial.length + +(i < length - 1)) * (gap.length + 2) + 4 + mind.length * 2
                                                : Math.max(0, partial.length + +(i < length - 1)) * 2 + 2
                                        : Math.max(0, partial.length + +(i < length - 1)) + 2) >=
                                    (options.maxLength ?? defaultStringifyOptions.maxLength)) {
                                    partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                    break;
                                }
                                partial.push(currentValue);
                            }
                            else {
                                if (partial.length >= (options.maxArrayLength ?? defaultStringifyOptions.maxArrayLength)) {
                                    localCurrentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length;
                                    partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                    break;
                                }
                                localCurrentLength += 5;
                                entryCount++;
                                if (localCurrentLength +
                                    (options.ellipsis ?? defaultStringifyOptions.ellipsis).length * +(i < length - 1) +
                                    (gap.length ?
                                        (options.inlineArrays ?? defaultStringifyOptions.inlineArrays) === true ?
                                            Math.max(0, partial.length + +(i < length - 1)) * 2 + 2
                                            : ((options.inlineArrays ?? defaultStringifyOptions.inlineArrays) === false ||
                                                partial.length <= (options.inlineArrays ?? defaultStringifyOptions.inlineArrays)) ?
                                                Math.max(0, partial.length + +(i < length - 1)) * (gap.length + 2) + 4 + mind.length * 2
                                                : Math.max(0, partial.length + +(i < length - 1)) * 2 + 2
                                        : Math.max(0, partial.length + +(i < length - 1)) + 2) >=
                                    (options.maxLength ?? defaultStringifyOptions.maxLength)) {
                                    localCurrentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length - 5;
                                    partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                    break;
                                }
                                partial.push("empty");
                            }
                            continue;
                        }
                        if (partial.length >= (options.maxArrayLength ?? defaultStringifyOptions.maxArrayLength)) {
                            localCurrentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length;
                            partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                            break;
                        }
                        const inlineArrays = options.inlineArrays ?? defaultStringifyOptions.inlineArrays;
                        var partialValue = str(i, value, inclusionOptions, options, localCurrentLength + (partial.length * (gap.length + 1) - 1), currentDepth + 1, entryCount + 1, partial.reduce((a, b) => a +
                            b.split("\n").length +
                            (a === 0 ? 0
                                : inlineArrays === true || (inlineArrays !== false && partial.length <= inlineArrays) ? -1
                                    : 0), 0) +
                            (inlineArrays === true || (inlineArrays !== false && partial.length + 1 <= inlineArrays) ? 1 + +(i < length - 1) : 0) +
                            lineCount);
                        if (partialValue !== undefined) {
                            localCurrentLength += partialValue.length;
                            entryCount++;
                            if (localCurrentLength +
                                (options.ellipsis ?? defaultStringifyOptions.ellipsis).length * +(i < length - 1) +
                                (gap.length ?
                                    (options.inlineArrays ?? defaultStringifyOptions.inlineArrays) === true ?
                                        Math.max(0, partial.length + +(i < length - 1)) * 2 + 2
                                        : ((options.inlineArrays ?? defaultStringifyOptions.inlineArrays) === false ||
                                            partial.length <= (options.inlineArrays ?? defaultStringifyOptions.inlineArrays)) ?
                                            Math.max(0, partial.length + +(i < length - 1)) * (gap.length + 2) + 4 + mind.length * 2
                                            : Math.max(0, partial.length + +(i < length - 1)) * 2 + 2
                                    : Math.max(0, partial.length + +(i < length - 1)) + 2) >=
                                (options.maxLength ?? defaultStringifyOptions.maxLength) ||
                                entryCount >= (options.maxLength ?? defaultStringifyOptions.maxLength) / 2) {
                                localCurrentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length - partialValue.length;
                                partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                break;
                            }
                            partial.push(partialValue);
                        }
                    }
                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.
                    const inlineArrays = options.inlineArrays ?? defaultStringifyOptions.inlineArrays;
                    if (inlineArrays === true || (inlineArrays !== false && partial.length <= inlineArrays)) {
                        // This verison does not add newlines, matching the DevTools console.
                        v =
                            partial.length === 0 ? "[]"
                                : gap ? "[" + partial.join(", ") + "]"
                                    : "[" + partial.join(",") + "]";
                    }
                    else {
                        v =
                            partial.length === 0 ? "[]"
                                : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                                    : "[" + partial.join(",") + "]";
                    }
                    currentLength += v.length;
                    if (Math.min(localCurrentLength, v.length) >= (options.maxLength ?? defaultStringifyOptions.maxLength)) {
                        if (options.useClassNameInsteadOfEllipsis ?? defaultStringifyOptions.useClassNameInsteadOfEllipsis) {
                            const className = value[Symbol.toStringTag] ? String(value[Symbol.toStringTag])
                                : value.constructor?.name ? value.constructor.name
                                    : null;
                            if (className !== null) {
                                return `${className}(${value.length})`;
                            }
                        }
                        return `[${options.ellipsis ?? defaultStringifyOptions.ellipsis}]`;
                    }
                    gap = mind;
                    return v;
                }
                // If the replacer is an array, use it to select the members to be stringified.
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i++) {
                        {
                            const inlineObjects = options.inlineObjects ?? defaultStringifyOptions.inlineObjects;
                            if (partial.reduce((a, b) => a +
                                b.split("\n").length +
                                (a === 0 ? 0
                                    : inlineObjects === true || (inlineObjects !== false && partial.length <= inlineObjects) ? -1
                                        : 0), 0) +
                                lineCount >=
                                (options.maxLineCount ?? defaultStringifyOptions.maxLineCount)) {
                                currentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length;
                                partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                break;
                            }
                        }
                        if (partial.length >= (options.maxPropertyCount ?? defaultStringifyOptions.maxPropertyCount)) {
                            currentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length;
                            partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                            break;
                        }
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            const inlineObjects = options.inlineObjects ?? defaultStringifyOptions.inlineObjects;
                            v = str(k, value, inclusionOptions, options, currentLength + partial.length * (inlineObjects !== true ? gap.length + 1 - 1 : 2), currentDepth + 1, partial.reduce((a, b) => a +
                                b.split("\n").length +
                                (a === 0 ? 0
                                    : inlineObjects === true || (inlineObjects !== false && partial.length <= inlineObjects) ? -1
                                        : 0), 0) +
                                (inlineObjects === true || (inlineObjects !== false && partial.length + 1 <= inlineObjects) ? 1 + +(i < length - 1) : 0) +
                                lineCount);
                            if (v) {
                                const newPartialValue = quote(k) + (gap ? ": " : ":") + v;
                                currentLength += newPartialValue.length;
                                entryCount++;
                                if (currentLength >= (options.maxLength ?? defaultStringifyOptions.maxLength) ||
                                    entryCount >= (options.maxLength ?? defaultStringifyOptions.maxLength) / 2) {
                                    partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                    break;
                                }
                                partial.push(newPartialValue);
                            }
                        }
                    }
                }
                else {
                    // Otherwise, iterate through all of the keys in the object.
                    const keys = [
                        ...new Set([
                            ...Object.keys(value),
                            ...((inclusionOptions.includeProtoValues ?? defaultStringifyInclusionOptions.includeProtoValues) ?
                                (() => {
                                    try {
                                        return [
                                            ...Object.getOwnPropertyNames(value.__proto__),
                                            ...((inclusionOptions.includeSymbolKeys ?? defaultStringifyInclusionOptions.includeSymbolKeys) ?
                                                Object.getOwnPropertySymbols(value.__proto__)
                                                : []),
                                        ].filter((key) => {
                                            try {
                                                // Make sure the property won't throw an error when accessed.
                                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                                value[key];
                                                return key in value;
                                            }
                                            catch {
                                                return false;
                                            }
                                        });
                                    }
                                    catch {
                                        return [];
                                    }
                                })()
                                : []),
                            ...Object.getOwnPropertyNames(value),
                            ...((inclusionOptions.includeSymbolKeys ?? defaultStringifyInclusionOptions.includeSymbolKeys) ?
                                Object.getOwnPropertySymbols(value)
                                : []),
                        ]),
                    ];
                    for (let i = 0; i < keys.length; i++) {
                        const k = keys[i];
                        {
                            const inlineObjects = options.inlineObjects ?? defaultStringifyOptions.inlineObjects;
                            if (partial.reduce((a, b) => a +
                                b.split("\n").length +
                                (a === 0 ? 0
                                    : inlineObjects === true || (inlineObjects !== false && partial.length <= inlineObjects) ? -1
                                        : 0), 0) +
                                lineCount >=
                                (options.maxLineCount ?? defaultStringifyOptions.maxLineCount)) {
                                currentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length;
                                partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                break;
                            }
                        }
                        if (partial.length >= (options.maxPropertyCount ?? defaultStringifyOptions.maxPropertyCount)) {
                            currentLength += (options.ellipsis ?? defaultStringifyOptions.ellipsis).length;
                            partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                            break;
                        }
                        try {
                            if (k in value) {
                                if (typeof value === "object" || typeof value === "function") {
                                    try {
                                        if (value[k] === value) {
                                            const newPartialValue = quote(k) + (gap ? ": " : ":") + "circular reference";
                                            currentLength += newPartialValue.length;
                                            entryCount++;
                                            if (currentLength + (partial.length * (gap.length + 1) - 1) >=
                                                (options.maxLength ?? defaultStringifyOptions.maxLength) ||
                                                entryCount >= (options.maxLength ?? defaultStringifyOptions.maxLength) / 2) {
                                                partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                                break;
                                            }
                                            partial.push(newPartialValue);
                                            continue;
                                        }
                                    }
                                    catch (e) {
                                        const newPartialValue = quote(k) + (gap ? ": " : ":") + (e?.name ?? e);
                                        currentLength += newPartialValue.length;
                                        entryCount++;
                                        if (currentLength + (partial.length * (gap.length + 1) - 1) >=
                                            (options.maxLength ?? defaultStringifyOptions.maxLength) ||
                                            entryCount >= (options.maxLength ?? defaultStringifyOptions.maxLength) / 2) {
                                            partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                            break;
                                        }
                                        // If we cannot access the property, we will skip it.
                                        partial.push(newPartialValue);
                                        continue;
                                    }
                                }
                                {
                                    const inlineObjects = options.inlineObjects ?? defaultStringifyOptions.inlineObjects;
                                    v = str(k, value, inclusionOptions, options, currentLength + (partial.length * (gap.length + 1) - 1), currentDepth + 1, entryCount + 1, partial.reduce((a, b) => a +
                                        b.split("\n").length +
                                        (a === 0 ? 0
                                            : inlineObjects === true || (inlineObjects !== false && partial.length <= inlineObjects) ? -1
                                                : 0), 0) +
                                        (inlineObjects === true || (inlineObjects !== false && partial.length + 1 <= inlineObjects) ?
                                            1 + +(i < keys.length - 1)
                                            : 0) +
                                        lineCount);
                                }
                                if (v) {
                                    currentLength += v.length;
                                    entryCount++;
                                    if (currentLength + (partial.length * (gap.length + 1) - 1) >= (options.maxLength ?? defaultStringifyOptions.maxLength) ||
                                        entryCount >= (options.maxLength ?? defaultStringifyOptions.maxLength) / 2) {
                                        partial.push(options.ellipsis ?? defaultStringifyOptions.ellipsis);
                                        break;
                                    }
                                    partial.push(quote(k) + (gap ? ": " : ":") + v);
                                }
                            }
                        }
                        catch (e) {
                            partial.push(quote(k) + (gap ? ": " : ":") + (e?.name ?? e));
                        }
                    }
                }
                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.
                {
                    const inlineObjects = options.inlineObjects ?? defaultStringifyOptions.inlineObjects;
                    if (inlineObjects === true || (inlineObjects !== false && partial.length <= inlineObjects)) {
                        v =
                            partial.length === 0 ? "{}"
                                : gap ? "{" + partial.join(", ") + "}"
                                    : "{" + partial.join(",") + "}";
                    }
                    else {
                        v =
                            partial.length === 0 ? "{}"
                                : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                                    : "{" + partial.join(",") + "}";
                    }
                }
                gap = mind;
                if (currentLength >= (options.maxLength ?? defaultStringifyOptions.maxLength)) {
                    return `{${options.ellipsis ?? defaultStringifyOptions.ellipsis}}`;
                }
                return v;
        }
    }
    // If the JSONB object does not yet have a stringify method, give it one.
    if (typeof JSONBConsole.stringify !== "function") {
        meta = {
            // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\",
        };
        JSONBConsole.stringify = function (value, replacer, space, inclusionOptions = defaultStringifyInclusionOptions, maxLengthOrOptions = defaultStringifyOptions, maxDepth) {
            const options = typeof maxLengthOrOptions === "number" ? { maxLength: maxLengthOrOptions, maxDepth } : maxLengthOrOptions;
            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSONB text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.
            var i;
            gap = "";
            indent = "";
            // If the space parameter is a number, make an indent string containing that
            // many spaces.
            if (typeof space === "number") {
                for (i = 0; i < space; i++) {
                    indent += " ";
                }
                // If the space parameter is a string, it will be used as the indent string.
            }
            else if (typeof space === "string") {
                indent = space;
            }
            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new SyntaxError("Invalid Replacer");
            }
            // Make a fake root object containing our value under the key of "".
            // Return the result of stringifying the value.
            return str("", { "": value }, inclusionOptions, options, 0, 0);
        };
    }
})();
globalThis.JSONBConsole = JSONBConsole;
//# sourceMappingURL=JSONB.js.map