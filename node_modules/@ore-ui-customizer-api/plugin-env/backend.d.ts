import type { OreUICustomizerSettings, PluginManifestJSON, zip } from "ore-ui-customizer-types";

declare global {
    /**
     * Environment details about the Ore UI Customizer.
     *
     * @since Ore UI Customizer v1.11.0
     */
    const customizerEnv: OreUICustomizerEnv;
    /**
     * Type type of the variable used to access and manage the current plugin.
     */
    interface OreUICustomizerPluginEnv {
        /**
         * Fetches the contents of a file inside of the plugin.
         *
         * Cannot be used in single-file plugins (plugins that are a single `.js` file instead of a renamed `.zip` with a `manifest.json` and other files).
         *
         * @param path The path relative to the root of the plugin.
         * @returns The contents of the file.
         */
        fetchFileContents(path: string): Promise<Uint8Array>;
        /**
         * Fetches the contents of a file inside of the plugin as a string.
         *
         * Cannot be used in single-file plugins (plugins that are a single `.js` file instead of a renamed `.zip` with a `manifest.json` and other files).
         *
         * @param path The path relative to the root of the plugin.
         * @returns The contents of the file as a string.
         */
        fetchFileStringContents(path: string): Promise<string>;
        /**
         * Fetches the contents of a file inside of the plugin as a Blob.
         *
         * Cannot be used in single-file plugins (plugins that are a single `.js` file instead of a renamed `.zip` with a `manifest.json` and other files).
         *
         * @param path The path relative to the root of the plugin.
         * @returns The contents of the file as a Blob.
         */
        fetchFileAsBlob(path: string): Promise<Blob>;
        /**
         * Fetches the contents of a file inside of the plugin as a WritableStream.
         *
         * Cannot be used in single-file plugins (plugins that are a single `.js` file instead of a renamed `.zip` with a `manifest.json` and other files).
         * 
         * @param path The path relative to the root of the plugin.
         * @returns The contents of the file as a WritableStream.
         */
        fetchFileAsWritableStream(path: string): Promise<WritableStream<Uint8Array>>;
        /**
         * Gets the {@link zip.ZipEntry} at the specified path in the plugin, if it exists.
         *
         * This can find both files and directories.
         *
         * @param path The path to the zip entry.
         * @returns The {@link zip.ZipEntry}, or `undefined` if it could not be found.
         */
        findZipEntry(path: string): zip.ZipEntry | undefined;
        /**
         * Gets the {@link zip.ZipFileEntry} at the specified path in the plugin, if it exists.
         *
         * This can only find files.
         *
         * @param path The path to the zip file entry.
         * @returns The {@link zip.ZipFileEntry}, or `undefined` if it could not be found.
         */
        findZipFileEntry<ReaderType = any, WriterType = any>(path: string): zip.ZipFileEntry<ReaderType, WriterType> | undefined;
        /**
         * Gets the {@link zip.ZipDirectoryEntry} at the specified path in the plugin, if it exists.
         *
         * This can only find directories.
         *
         * @param path The path to the zip directory entry.
         * @returns The {@link zip.ZipDirectoryEntry}, or `undefined` if it could not be found.
         */
        findZipDirectoryEntry(path: string): zip.ZipDirectoryEntry | undefined;
        /**
         * The zip filesystem for the plugin.
         *
         * This is what stores all the contents of the plugin.
         *
         * Cannot be used in single-file plugins (plugins that are a single `.js` file instead of a renamed `.zip` with a `manifest.json` and other files).
         */
        readonly zipFs: zip.FS;
        /**
         * The manifest of the plugin.
         *
         * This is read-only and should not be modified.
         *
         * Cannot be used in single-file plugins (plugins that are a single `.js` file instead of a renamed `.zip` with a `manifest.json` and other files).
         */
        readonly manifest: ReadonlyDeep<PluginManifestJSON>;
    }
    /**
     * Environment details about the Ore UI Customizer.
     */
    interface OreUICustomizerEnv {
        /**
         * The version of the Ore UI Customizer.
         *
         * This will always be valid semver.
         */
        readonly version: string;
        /**
         * The type of the Ore UI Customizer.
         */
        readonly type: OreUICustomizerType;
        /**
         * The current settings for the Ore UI Customizer.
         *
         * These can be modified in plugin actions using `global_before` context before the Customizer applies them.
         */
        readonly settings: OreUICustomizerSettings;
    }
    /**
     * The type of the Ore UI Customizer.
     */
    type OreUICustomizerType = "Website" | "App" | "CLI";
}

/**
 * Mutates the type by removing the `readonly` modifier from all properties.
 *
 * @template T The type to mutate.
 *
 * @example
 * ```ts
 * type Original = { readonly name: string; readonly age: number };
 * type Mutated = Mutable<Original>; // { name: string; age: number }
 * ```
 */
type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
/**
 * Mutates the type by removing the `readonly` modifier and the optional modifier (`?`) from all properties.
 *
 * @template T The type to mutate.
 *
 * @example
 * ```ts
 * type Original = { readonly name?: string; readonly age?: number };
 * type Mutated = MutableRequired<Original>; // { name: string; age: number }
 * ```
 */
type MutableRequired<T> = {
    -readonly [P in keyof T]-?: T[P];
};
/**
 * Mutates the type by adding the `readonly` modifier and the optional modifier (`?`) to all properties.
 *
 * @template T The type to mutate.
 *
 * @example
 * ```ts
 * type Original = { name?: string; age?: number };
 * type Mutated = ReadonlyPartial<Original>; // { readonly name?: string; readonly age?: number }
 * ```
 */
type ReadonlyPartial<T> = {
    +readonly [P in keyof T]+?: T[P];
};
/**
 * Converts a union type to an intersection type.
 *
 * @template U The union type to convert.
 *
 * @example
 * ```ts
 * type Original = string | number;
 * type Mutated = UnionToIntersection<Original>; // string & number
 * ```
 */
type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;
// type test1a = [name: number, id: `ID:${number}`, hi: "text"];
/**
 * Pushes a value to the front of a tuple type.
 *
 * @template TailT The tail of the tuple.
 * @template HeadT The head to push to the front.
 *
 * @example
 * ```ts
 * type Original = [number, string];
 * type Mutated = PushFront<Original, boolean>; // [boolean, number, string]
 * ```
 */
type PushFront<TailT extends any[], HeadT> = ((head: HeadT, ...tail: TailT) => void) extends (...arr: infer ArrT) => void ? ArrT : never;
/* type NoRepetition<U extends string, ResultT extends any[] = []> = {
        [k in U]: PushFront<ResultT, k> | NoRepetition<Exclude<U, k>, PushFront<ResultT, k>>;
    }[U]; */
/**
 * Creates a type that represents a string with no repeated characters.
 *
 * @template U The string to process.
 * @template ResultT The result type, defaulting to an empty array.
 *
 * @example
 * ```ts
 * type Original = NoRepetition<"abc">; // ["a", "b", "c"]
 * ```
 */
type NoRepetition<U extends string, ResultT extends any[] = []> =
    | ResultT
    | {
          [k in U]: NoRepetition<Exclude<U, k>, [k, ...ResultT]>;
      }[U];
// Source: https://www.totaltypescript.com/tips/create-autocomplete-helper-which-allows-for-arbitrary-values
/**
 * Creates a type that allows for autocomplete suggestions on a string type, while not giving errors for other values.
 *
 * @template T A union type of string literals to add to the autocomplete.
 *
 * @example
 * ```ts
 * // Will allow autocomplete for "abc", "b", and "def", and will not throw errors for other string values.
 * type Original = LooseAutocomplete<"abc" | "b" | "def">; // "abc" | "b" | "def" | (Omit<string, "abc" | "b" | "def"> & string)
 * ```
 */
type LooseAutocomplete<T extends string> = T | (Omit<string, T> & string);
/**
 * Creates a type that allows for autocomplete suggestions on a custom type (can only be string, number, or symbol), while not giving errors for other values.
 *
 * @template U A union type that can contain string, number, and symbol, this will be the base type, anything not assignable to this WILL throw an error.
 * @template T A union type of string literals and number literals to add to the autocomplete, string literals are only allowed if {@link U} contains string, and number literals are only allowed if {@link U} contains number.
 *
 * @example
 * ```ts
 * // Will allow autocomplete for "abc", "b", and "def", and will not throw errors for other string values.
 * type Original = LooseAutocompleteB<string, "abc" | "b" | "def">; // "abc" | "b" | "def" | (Omit<string, "abc" | "b" | "def"> & string)
 *
 * // Will allow autocomplete for 1, 2, and 3, and will not throw errors for other number values.
 * type Original = LooseAutocompleteB<number, 1 | 2 | 3>; // 1 | 2 | 3 | (Omit<number, 1 | 2 | 3> & number)
 *
 * // Will allow autocomplete for 1, 2, and 3, and will not throw errors for other number or string values.
 * type Original = LooseAutocompleteB<number | string, 1 | 2 | 3>; // 1 | 2 | 3 | (Omit<number | string, 1 | 2 | 3> & (number | string))
 *
 * // Will allow autocomplete for "a", 45, and "fhsd", and will not throw errors for other number, symbol, or string values.
 * type Original = LooseAutocompleteB<string | number | symbol, "a" | 45 | "fhsd">; // "a" | 45 | "fhsd" | (Omit<string | number | symbol, "a" | 45 | "fhsd"> & (string | number | symbol))
 * ```
 */
type LooseAutocompleteB<U extends string | number | symbol, T extends U> = T | (Omit<U, T> & U);
/**
 * Splits a string into an array of characters.
 *
 * @template S The string to split.
 *
 * @example
 * ```ts
 * type Original = Split<"abc">; // ["a", "b", "c"]
 * ```
 */
type Split<S extends string> = S extends "" ? [] : S extends `${infer C}${infer R}` ? [C, ...Split<R>] : never;

/**
 * Takes the first N elements from a tuple type.
 *
 * @template T The tuple type to take elements from.
 * @template N The number of elements to take.
 * @template Result The result type, defaulting to an empty array.
 *
 * @example
 * ```ts
 * type Original = TakeFirstNElements<[1, 2, 3, 4], 2>; // [1, 2]
 * ```
 */
type TakeFirstNElements<T extends any[], N extends number, Result extends any[] = []> = Result["length"] extends N
    ? Result
    : T extends [infer First, ...infer Rest]
    ? TakeFirstNElements<Rest, N, [...Result, First]>
    : Result;

/**
 * @author 8Crafter
 */
type TakeLastNElements<T extends any[], N extends number, Result extends any[] = []> = Result["length"] extends N
    ? Result
    : T extends [...infer Rest, infer Last]
    ? TakeLastNElements<Rest, N, [Last, ...Result]>
    : Result;

/**
 * @author 8Crafter
 */
type RemoveFirstNElements<T extends any[], N extends number, Removed extends any[] = [], Result extends any[] = []> = Removed["length"] extends N
    ? Result
    : T extends [infer First, ...infer Rest]
    ? RemoveFirstNElements<Rest, N, [...Removed, First], Rest>
    : Result;

/**
 * @author 8Crafter
 */
type RemoveLastNElements<T extends any[], N extends number, Removed extends any[] = [], Result extends any[] = []> = Removed["length"] extends N
    ? Result
    : T extends [...infer Rest, infer Last]
    ? RemoveFirstNElements<Rest, N, [...Removed, Last], Rest>
    : Result;

/**
 * @author 8Crafter
 */
type CreateTupleOfLength<T extends any, N extends number, Result extends any[] = []> = Result["length"] extends N
    ? Result
    : CreateTupleOfLength<T, N, [T, ...Result]>;

/**
 * @author 8Crafter
 */
type SliceTuple<T extends any[], start extends number, end extends number> = RemoveFirstNElements<T, start> extends infer R extends any[]
    ? TakeFirstNElements<R, RemoveFirstNElements<TakeFirstNElements<T, end>, start>["length"]>
    : never;

/**
 * Joins an array of strings into a single string.
 *
 * @template T The array of strings to join.
 *
 * @example
 * ```ts
 * type Original = Join<["a", "bcc", "de"]>; // "abccde"
 * ```
 */
type Join<T extends string[]> = T extends []
    ? ""
    : T extends [infer Head, ...infer Tail]
    ? Head extends string
        ? `${Head}${Join<Tail extends string[] ? Tail : []>}`
        : never
    : never;

/**
 * Cuts the first N characters from a string.
 *
 * @template S The string to cut.
 * @template N The number of characters to cut.
 *
 * @example
 * ```ts
 * type Original = CutFirstChars<"abcdef", 2>; // "ab"
 * ```
 */
type CutFirstChars<S extends string, N extends number, SArray = TakeFirstNElements<Split<S>, N>> = Join<SArray extends string[] ? SArray : never>;

/**
 * Mutates the type by removing the optional modifier (`?`) from all properties.
 *
 * @template T The type to mutate.
 *
 * @example
 * ```ts
 * type Original = { readonly name?: string; age?: number };
 * type Mutated = MutableRequired<Original>; // { readonly name: string; age: number }
 * ```
 */
type Full<T> = {
    [P in keyof T]-?: T[P];
};

/**
 * Mutates the type by making all properties `readonly`, recursively.
 *
 * @template T The type to mutate.
 *
 * @example
 * ```ts
 * type Original = { name: string; age: number }
 * type Mutated = ReadonlyDeep<Original>; // { readonly name: string; readonly age: number }
 * ```
 */
type ReadonlyDeep<T> = {
    readonly [P in keyof T]: ReadonlyDeep<T[P]>;
};

/**
 * Mutates the type by removing the `readonly` modifier from all properties, recursively.
 *
 * @template T The type to mutate.
 *
 * @example
 * ```ts
 * type Original = { readonly name: string; readonly age: number };
 * type Mutated = MutableDeep<Original>; // { name: string; age: number }
 * ```
 */
type MutableDeep<T> = {
    -readonly [P in keyof T]: MutableDeep<T[P]>;
};

/**
 * Mutates the type by making all properties optional and allowing for deep partials.
 *
 * @template T The type to mutate.
 *
 * @example
 * ```ts
 * type Original = { name: string; age: number }
 * type Mutated = DeepPartial<Original>; // { name?: string; age?: number }
 * ```
 */
type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
type KeysOfUnion<T> = T extends T ? keyof T : never;
type ValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
type AllValues<T> = T extends { [key: string]: infer V } ? V : never;
type KeyValuePairs<T> = {
    [K in KeysOfUnion<T>]: AllValues<Extract<T, Record<K, any>>>;
};
/**
 * @see https://stackoverflow.com/a/58986589
 * @author jcalz <https://stackoverflow.com/users/2887218/jcalz>
 */
type ExcludeFromTuple<T extends readonly any[], E> = T extends [infer F, ...infer R]
    ? [F] extends [E]
        ? ExcludeFromTuple<R, E>
        : [F, ...ExcludeFromTuple<R, E>]
    : [];
type IncludeFromTuple<T extends readonly any[], E> = T extends [infer F, ...infer R]
    ? [F] extends [E]
        ? [F, ...IncludeFromTuple<R, E>]
        : IncludeFromTuple<R, E>
    : [];
type NullableArray<T extends any[] | readonly any[]> = T | [null, ...T] | [...T, null];

/**
 * @author 8Crafter
 */
type MergeObjectTypes<T> = { [key in keyof T]: T[key] };

export type {};
