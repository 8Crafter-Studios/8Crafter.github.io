import type {} from "ore-ui-types";

declare global {
    namespace globalThis {
        // TODO: These are not the right types for this package, these are going to be part of a separate package, this one should have the types that will always be present (the ones from `customOverlays.ts`).
        /**
         * A function to be put into the react renderer to collect facet accessors.
         *
         * @param {{}} [param0] Ignore this.
         * @returns {null} Returns `null`.
         */
        // eslint-disable-next-line no-empty-pattern, @typescript-eslint/ban-types
        function facetSpy({}: {}): null;
        /**
         * The context holder.
         *
         * @todo Get the type for this variable.
         */
        var contextHolder: unknown;
        /**
         * The facet access holder.
         *
         * @todo Get the type for this variable.
         */
        var facetAccessHolder: unknown;
        /**
         * The facet spy data.
         */
        var facetSpyData: {
            /**
             * The shared facets.
             *
             * This only includes facets that are in the {@link FacetList}.
             */
            sharedFacets: { [FacetType in FacetList[number]]: SharedFacet<FacetType> };
        };
        /**
         * The current list of facets that have been forcefully loaded.
         */
        var forceLoadedFacets: { [FacetType in FacetList[number]]?: true };
        /**
         * The list of accessed facets.
         *
         * This includes any new facets that are not in the {@link FacetList}.
         *
         * This only includes facets that have been accessed at least once.
         */
        var accessedFacets: Partial<
            { [FacetType in FacetList[number]]: (a?: unknown) => SharedFacet<FacetType> } & { [key in string]: (a?: unknown) => SharedFacetBase<key> }
        >;
        /**
         * A list of new facets that have been detected that are not in the {@link FacetList}.
         */
        var notedNewFacets: string[];
        /**
         * Forcefully loads a facet that is not loaded (meaning it is not accessible through the {@link getAccessibleFacetSpyFacets} function).
         *
         * @param facetName The name of the facet to load.
         * @param timeout The timeout in milliseconds to wait for the facet to load. If set to `0` or `Infinity`, it will never time out. Defaults to `5000ms`.
         * @returns A promise that resolves with the loaded facet's value, if the facet it already loaded it will resolve with its current value.
         *
         * @throws {ReferenceError} If the request times out (can happen if the facet doesn't exist).
         * @throws {any} If the facet request throws an error.
         */
        function forceLoadFacet<FacetType extends LooseAutocomplete<FacetList[number]>>(
            facetName: FacetType,
            timeout?: number
        ): Promise<FacetType extends FacetList[number] ? FacetTypeMap[FacetType] : unknown>;
        /**
         * Forcefully discards a facet.
         *
         * This will attempt to discard the facet even if it appears to not be loaded.
         *
         * @param facetName The name of the facet to unload.
         */
        function forceUnloadFacet(facetName: LooseAutocomplete<FacetList[number]>): void;
        /**
         * Unloads a facet that was forcefully loaded.
         *
         * This will attampt to unload the facet even if it appears to not be loaded, as long as it was originally loaded forcefully.
         *
         * @param facetName The name of the facet to unload.
         * @returns `true` if is was unloaded or `false` if the facet was not a forcefully loaded facet.
         */
        function unloadForceLoadedFacet(facetName: LooseAutocomplete<FacetList[number]>): boolean;
        /**
         * The list of currently loading facets.
         *
         * Only exists when the {@link forceLoadUnloadedFacets} function is run with the `enableLoadingFacetsTracking` option set to `true`.
         */
        var loadingFacets: { [FacetType in FacetList[number]]?: true } | undefined;
        /**
         * Forcefully loads all facets that are not loaded (meaning they are not accessible through the {@link getAccessibleFacetSpyFacets} function).
         *
         * @param options Debugging options.
         * @returns An array of tuples containing the facet name and its data if it was successfully loaded or was already loaded, or the error that occured if it failed.
         */
        function forceLoadUnloadedFacets(
            options?:
                | {
                      /**
                       * Whether to log errors to the console.
                       *
                       * @default false
                       */
                      enableErrorLogging?: boolean | undefined;
                      /**
                       * Whether to log success to the console.
                       *
                       * @default false
                       */
                      enableSuccessLogging?: boolean | undefined;
                      /**
                       * Whether to log already loaded facets to the console.
                       *
                       * @default false
                       */
                      enableAlreadyLoadedLogging?: boolean | undefined;
                      /**
                       * Whether to track the loading of facets in a global {@link loadingFacets} variable.
                       *
                       * @default false
                       */
                      enableLoadingFacetsTracking?: boolean | undefined;
                  }
                | undefined
        ): Promise<
            (
                | {
                      [key in FacetList[number]]: [facetName: key, facetData: FacetTypeMap[key], status: "success" | "alreadyLoaded", newFacetType: false];
                  }[FacetList[number]]
                | [facetName: LooseAutocomplete<FacetList[number]>, facetData: unknown, status: "success" | "alreadyLoaded", newFacetType: true]
                | [facetName: LooseAutocomplete<FacetList[number]>, error: any, status: "error"]
            )[]
        >;
        /**
         * Unloads all forcefully loaded facets.
         *
         * @returns A list of the unloaded facets and whether they were successfully unloaded.
         */
        function unloadForceLoadedFacets(): [facetName: LooseAutocomplete<FacetList[number]>, successfullyUnloaded: boolean][];
        /**
         * Returns a list of all accessible facets from the facetSpy data.
         *
         * It sources from both {@link facetSpyData.sharedFacets} and {@link accessedFacets}.
         *
         * @returns The accessible facets.
         *
         * @todo Maybe add a parameter for context for getting facets from accessedFacets.
         */
        function getAccessibleFacetSpyFacets(): Partial<{ [FacetType in FacetList[number]]: FacetTypeMap[FacetType] }> & Record<string, unknown>;
    }
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

export {};
