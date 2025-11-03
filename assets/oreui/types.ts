declare global {
    namespace globalThis {
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
         * type Original = CutFirstChars<"abcdef", 2>; // "cdef"
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
        export type DeepPartial<T> = T extends object
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

        //#region Ore UI Native

        // copyTextToClipboardAsync(Object.entries(__commands__).map(v=>`${v[0]}: {${Object.keys(v[1]).map(v2=>`${v2}: {
        //     id: number;
        //     callable(...args: unknown[]): unknown;
        // };\n`).join("")}};`).join("\n"))

        /**
         * The Ore UI native commands.
         */
        var __commands__: {
            vanilla_menus_update_settings: {
                updateNumber: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                updateString: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                updateOption: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                updateBoolean: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
            vanilla_menus_invoke_action_settings: {
                invokeAction: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
            coreStorageCommandGroup: {
                changeStorage: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
            soundCommandGroup: {
                isPlaying: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                fadeOut: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                play: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
            coreTranslateCommandGroup: {
                translate: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
            routerCommandGroup: {
                go: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                back: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                replace: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                push: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
            vanillaGameplayRecipeBookFilteringCommandGroup: {
                setRecipeBookFiltering: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
            vanillaGameplayTradeCommandGroup: {
                performAutoTrade: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                pullInIngredientsForSelectedTrade: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                selectTrade: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
            vanillaGameplayRecipeBookSearchStringCommandGroup: {
                setRecipeBookSearchString: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
            vanillaGameplayAnvilCommandGroup: {
                setPreviewItemName: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
            coreHapticsCommandGroup: {
                vibrate: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
            vanillaGameplayContainerCommandGroup: {
                autoCraftAllItemsFromRecipe: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                autoCraftOneItemFromRecipe: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                selectRecipe: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                setDistributeAllSource: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                splitSingleItem: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                splitMultipleItems: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                autoPlaceItems: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                coalesceOrAutoPlaceItems: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                coalesceItems: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                dropOneItem: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                dropAllItems: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                placeAmountOfItems: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                placeOneItem: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                placeAllItems: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                takeHalfItems: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                takeOneItem: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                takeAllItems: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
                closeContainer: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
        } & {
            [commandGroup: string]: {
                [command: string]: {
                    id: number;
                    callable(...args: unknown[]): unknown;
                };
            };
        };

        var engine: {
            on<T extends EngineEventID>(
                name: T,
                callback: (...args: EngineEvent<T>) => void,
                context?: unknown
            ): {
                clear(): void;
            };
            off<T extends EngineEventID>(name: T, handler: (...args: EngineEvent<T>) => void, context?: unknown): void;
            trigger<T extends EngineEventID>(name: T, ...args: EngineEvent<T>): void;
            // TODO: Fill in the rest of the engine properties.
            [otherProperties: PropertyKey]: unknown;
        };

        type EngineEventID = LooseAutocomplete<
            | "facet:request"
            | `facet:updated:${FacetList[number]}`
            | `facet:error:${FacetList[number]}`
            | "facet:discard"
            | "engine:gamepad:onPress"
            | "engine:gamepad:onJoystickMovement"
            | "core:keyboard:changed"
            | "core:keyboard:submitted"
            | "core:keyboard:dismissed"
            | "core:keyboard:tabbed"
            | "core:exception"
            | "core:gui:resize-hack"
            | `query:subscribed/${any}` // TODO: Figure out what this any value actually is.
            | `query:updated/${any}` // TODO: Figure out what this any value actually is.
            | `query:subscribe/${any}` // TODO: Figure out what this any value actually is.
            | "query:unsubscribe"
            | "core:routing:not-found"
            | "core:telemetry:firstMeaningfulPaint"
            | "core:telemetry:firstContentfulPaint"
        >;
        type EngineEvent<T extends EngineEventID> = T extends "facet:request" | "facet:discard"
            ? [facetName: FacetList[number]]
            : T extends `facet:updated:${infer Facet}`
            ? Facet extends FacetList[number]
                ? [facetValue: FacetTypeMap[Facet]]
                : [facetValue: unknown]
            : T extends `facet:error:${infer _Facet}`
            ? [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "engine:gamepad:onPress"
            ? [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "engine:gamepad:onJoystickMovement"
            ? [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:keyboard:changed"
            ? [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:keyboard:submitted"
            ? [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:keyboard:dismissed"
            ? [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:keyboard:tabbed"
            ? [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:exception"
            ? [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:gui:resize-hack"
            ? []
            : T extends `query:subscribed/${infer _QueryName}` // TODO: Figure out what values QueryName actually uses.
            ? [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends `query:updated/${infer _QueryName}` // TODO: Figure out what values QueryName actually uses.
            ? [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends `query:subscribe/${infer _QueryName}` // TODO: Figure out what values QueryName actually uses.
            ? [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "query:unsubscribe"
            ? [queryName: unknown] // TODO: Figure out the type of this.
            : T extends "core:telemetry:firstMeaningfulPaint" | "core:telemetry:firstContentfulPaint"
            ? []
            : [...args: unknown[]];

        /**
         * A list of all the known facets.
         */
        type FacetList = [
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
            // "vanilla.editorLogging", // Crashes the game in the v1.21.110.23 preview.
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

            // Found in 1.21.120.4 (but may have existed before that).
            "vanilla.connectionErrorInfoFacet",
            "vanilla.partyReceivedInviteList",
            "vanilla.joinablePartyList",
            "vanilla.realmsFeatureFlags",
            "vanilla.realmsStories.reports",
            "vanilla.realmsStories.reportCommands",
            "vanilla.openAndCloseRealmCommandsFacet",
            "dev.realmsCommitCommandsFacet",
            "dev.realmsCommitQueriesFacet",
            "vanilla.newPlayerChoices"
        ];
        /**
         * An interface that maps facets to their types.
         */
        interface FacetTypeMap {
            "core.animation": { screenAnimationEnabled: boolean };
            "core.customScaling": {
                guiAccessibilityScaling: boolean;
                MAX_FIXED_GUI_SCALE_MODIFIER: number;
                MIN_FIXED_GUI_SCALE_MODIFIER: number;
                fixedGuiScaleModifier: number;
                scalingModeOverride: string;
            };
            "core.deviceInformation": {
                activeMultiplayerServiceIds: ArrayLike<number>;
                changeStorageTask: number;
                storageType: number;
                supportsSizeQuery: boolean;
                isStorageLow: boolean;
                isStorageFull: boolean;
                storageUsed: number;
                storageSize: number;
                storageAvailableSize: string;
                supportsManualAddedServers: boolean;
                onlyCellularAvailable: boolean;
                showCellularDataFee: boolean;
                isLANAllowed: boolean;
                isOnline: boolean;
                guiScaleBase: number;
                guiScaleModifier: number;
                displayHeight: number;
                displayWidth: number;
                pixelsPerMillimeter: number;
                isLowMemoryDevice: boolean;
                inputMethods: ArrayLike<number>;
                arvrPlatform: number;
                platform: number;
            };
            "core.featureFlags": {
                flags: CoherentArrayProxy<string>;
            };
            "core.input": {
                keyboardType: number;
                enableControllerHints: boolean;
                currentInputType: number;
                swapXYButtons: boolean;
                swapABButtons: boolean;
            };
            "core.locale": {
                locale: string;
                formatDate(...args: unknown[]): unknown;
                getHowLongAgoAsString(...args: unknown[]): unknown;
                translate(...args: unknown[]): unknown;
                translateWithParameters(...args: unknown[]): unknown;
            };
            // NOTE: Not present in 1.21.120.4 (may exist in dev builds).
            "core.performanceFacet": unknown; // TODO: Get the type for this facet. // NOTE: May not exist.
            "core.router": {
                /**
                 * The history object.
                 */
                history: {
                    /**
                     * Replaces the current route.
                     *
                     * @param {string} route The new route.
                     */
                    replace(route: string): void;
                    /**
                     * Pushes a new route onto the history stack.
                     *
                     * @param {string} route The new route.
                     */
                    push(route: string): void;
                    /**
                     * Goes to the previous route on the history stack.
                     */
                    goBack(): void;
                    /**
                     * Goes to the next route on the history stack.
                     */
                    goForward(): void;
                    /**
                     * Moves a specific distance on the history stack.
                     *
                     * @param {number} distance The distance to move. Negative numbers go back, positive numbers go forward.
                     */
                    go(distance?: number): void;
                    /**
                     * The current route.
                     */
                    location: RouteHistoryItem;
                    /**
                     * The history stack.
                     */
                    list: CoherentArrayProxy<RouteHistoryItem>;
                };
            };
            "core.safeZone": {
                screenPositionY: number;
                screenPositionX: number;
                safeAreaY: number;
                safeAreaX: number;
            };
            "core.screenReader": {
                isIdle: boolean;
                isUITextToSpeechEnabled: boolean;
                isChatTextToSpeechEnabled: boolean;
                read(...args: unknown[]): unknown;
                clear(...args: unknown[]): unknown;
            };
            "core.splitScreen": {
                splitScreenDirection: number;
                numActivePlayers: number;
                splitScreenPosition: number;
                isPrimaryUser: boolean;
            };
            "core.social": unknown; // TODO: Get the type for this facet. // NOTE: Exists but not yet accessed.
            "core.sound": {
                /**
                 * Plays a sound.
                 *
                 * @param {string} sound The sound to play. Should be a key from `sound_definitions.json`.
                 * @param {number} volume The volume to play the sound at.
                 * @param {number} pitch The pitch to play the sound at.
                 * @returns {number} The ID used to fade out the sound or check if the sound is playing.
                 */
                play(sound: string, volume: number, pitch: number): number;
                /**
                 * Fades out a sound.
                 *
                 * @param {number} id The ID of the sound to fade out.
                 * @param {number} duration The duration to fade out the sound in seconds.
                 * @returns {null} Returns `null`.
                 */
                fadeOut(id: number, duration: number): null;
                /**
                 * Checks if a sound is currently playing.
                 *
                 * @param {number} id The ID of the sound to check.
                 * @returns {boolean} Returns `true` if the sound is currently playing, `false` if it is not, or `undefined` if the id parameter is invalid.
                 */
                isPlaying(id: number): boolean;
            };
            "core.user": unknown; // TODO: Get the type for this facet. // NOTE: May not exist.
            "core.vrMode": unknown; // TODO: Get the type for this facet. // Found in dev build file. // DEPRECATED: May have been removed.
            "vanilla.achievements": unknown; // TODO: Get the type for this facet.
            "vanilla.achievementsReward": unknown; // TODO: Get the type for this facet. // NOTE: May not exist.
            "vanilla.buildSettings": {
                currentGameVersion: {
                    isBeta: boolean;
                    revision: number;
                    patch: number;
                    minor: number;
                    major: number;
                };
                isBetaBuild: boolean;
                isAnyBeta: boolean;
                isDevBuild: boolean;
            };
            "vanilla.clipboard": {
                isClipboardCopySupported: boolean;
                /**
                 * Copies text to the clipboard.
                 *
                 * @param {string} text The text to copy to the clipboard.
                 * @returns {undefined | null} `undefined` if the parameters are invalid, `null` otherwise.
                 */
                copyToClipboard(text: string): undefined | null;
            };
            "vanilla.createNewWorld": unknown; // TODO: Get the type for this facet.
            "vanilla.createPreviewRealmFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.debugSettings": unknown; // TODO: Get the type for this facet.
            "vanilla.editor": unknown; // TODO: Get the type for this facet.
            "vanilla.editorInput": unknown; // TODO: Get the type for this facet. // NOTE: May not exist.
            "vanilla.editorLogging": unknown; // TODO: Get the type for this facet.
            "vanilla.editorScripting": unknown; // TODO: Get the type for this facet.
            "vanilla.editorSelectionFacet": unknown; // TODO: Get the type for this facet. // NOTE: May not exist.
            "vanilla.editorSettings": unknown; // TODO: Get the type for this facet.
            "vanilla.externalServerWorldList": {
                addedServerId: number;
                externalServerWorlds: CoherentArrayProxy<{
                    msgOfTheDay: string;
                    image: string;
                    capacity: number;
                    playerCount: number;
                    pingStatus: number;
                    ping: string;
                    description: string;
                    name: string;
                    id: string;
                }>;
                /**
                 * @todo Figure out the types for this method.
                 */
                addExternalServerWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                editExternalServerWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                removeExternalServerWorld(...args: unknown[]): unknown;
            };
            "vanilla.followersList": unknown; // TODO: Get the type for this facet.
            "vanilla.friendsListFacet": {
                platformFriends: CoherentArrayProxy<unknown>;
                xblFriends: CoherentArrayProxy<{
                    favoriteStatus: number;
                    playingOnServerId: null;
                    isCurrentlyPlaying: boolean;
                    titleHistory: number;
                    presenceMessage: string;
                    isInSameGame: boolean;
                    titleId: number;
                    titleName: string;
                    presence: number;
                    gamerIcon: string;
                    gamerTag: string;
                    platformId: string;
                    xuid: string;
                }>;
                platformLoadingState: number;
                xblLoadingState: number;
                /**
                 * @todo Figure out the types for this method.
                 */
                userControlledUpdateGameList(...args: unknown[]): unknown;
            };
            "vanilla.friendsManagerFacet": unknown; // TODO: Get the type for this facet. // NOTE: Exists but not yet accessed.
            "vanilla.gameplay.activeLevelHardcoreMode": unknown; // TODO: Get the type for this facet.
            "vanilla.gameplay.bedtime": unknown; // TODO: Get the type for this facet.
            "vanilla.gameplay.closeContainerCommand": unknown; // TODO: Get the type for this facet. // NOTE: May not exist.
            "vanilla.gameplay.containerBlockActorType": unknown; // TODO: Get the type for this facet.
            "vanilla.gameplay.containerItemQuery": unknown; // TODO: Get the type for this facet. // NOTE: May not exist.
            "vanilla.gameplay.containerSizeQuery": unknown; // TODO: Get the type for this facet. // NOTE: May not exist.
            "vanilla.gameplay.furnace": unknown; // TODO: Get the type for this facet.
            "vanilla.gameplay.immediateRespawn": unknown; // TODO: Get the type for this facet.
            "vanilla.gameplay.leaveGame": unknown; // TODO: Get the type for this facet.
            "vanilla.gameplay.playerDeathInfo": unknown; // TODO: Get the type for this facet.
            "vanilla.gameplay.playerPositionHudElement": unknown; // TODO: Get the type for this facet. // NOTE: May not exist.
            "vanilla.gameplay.playerRespawn": unknown; // TODO: Get the type for this facet.
            "vanilla.gamertagSearch": unknown; // TODO: Get the type for this facet.
            "vanilla.inbox": unknown; // TODO: Get the type for this facet.
            "vanilla.lanWorldList": {
                lanWorlds: CoherentArrayProxy<{
                    ping: string;
                    capacity: number;
                    playerCount: number;
                    isHardcore: boolean;
                    gameMode: number;
                    port: number;
                    address: LooseAutocomplete<"UNASSIGNED_SYSTEM_ADDRESS" | `${number}.${number}.${number}.${number}`>;
                    ownerName: string;
                    name: string;
                    /**
                     * The world ID.
                     *
                     * In the format `${ownName}${name}v`.
                     */
                    id: `${string}${string}v`;
                }>;
            };
            "vanilla.localWorldList": {
                /**
                 * Whether or not the other storage type has any worlds.
                 */
                otherStorageTypeHasWorlds: boolean;
                /**
                 * The local worlds.
                 */
                localWorlds: ArrayLike<LocalWorldDataType>;
            };
            "vanilla.marketplaceSuggestions": unknown; // TODO: Get the type for this facet.
            "vanilla.marketplacePassWorldTemplateList": unknown; // TODO: Get the type for this facet.
            "vanilla.networkWorldDetails": {
                hasLoadedDetails: boolean;
                networkDetails: {
                    activities: CoherentArrayProxy<unknown>;
                    newsDescription: string;
                    newsTitle: string;
                    type: number;
                    capacity: number;
                    playerCount: number;
                    pingStatus: number;
                    imagePath: string;
                    ping: string;
                    port: number;
                    address: string;
                    description: string;
                    name: string;
                    id: string;
                };
                /**
                 * Loads the details of a network world.
                 *
                 * @param {`${number}`} id The ID of the server.
                 * @param {0 | 1 | 2 | 3} type `0` = Featured Server, `1` = External Server, `2` = Realm, `3` = LAN Server
                 * @returns {undefined | null} `undefined` if the parameters are invalid, `null` otherwise.
                 */
                loadNetworkWorldDetails(id: `${number}`, type: 0 | 1 | 2 | 3): undefined | null;
            };
            "vanilla.networkWorldJoiner": {
                joinLANServerTaskState: number; // TODO: MAKE ENUM
                joinLANServerResult: null | number; // TODO: MAKE ENUM
                joinFriendServerTaskState: number; // TODO: MAKE ENUM
                joinFriendServerResult: null | number; // TODO: MAKE ENUM
                joinRealmTaskState: number; // TODO: MAKE ENUM
                joinRealmResult: null | number; // TODO: MAKE ENUM
                joinExternalServerTaskState: number; // TODO: MAKE ENUM
                joinExternalServerResult: null | number; // TODO: MAKE ENUM
                joinThirdPartyServerTaskState: number; // TODO: MAKE ENUM
                joinThirdPartyServerResult: null | number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                joinThirdPartyServer(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearJoinThirdPartServerTaskState(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                joinExternalServer(serverID: string): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearJoinExternalServerTaskState(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                joinFriendServer(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearJoinFriendServerTaskState(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                joinLanServer(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearJoinLANServerTaskState(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                joinRealmWorld(realmID: string, joinRealmTaskState: number): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearJoinRealmTaskState(...args: unknown[]): unknown;
            };
            "vanilla.notificationOptions": {
                doNotShowEntitlementsWarning: boolean;
                doNotShowOldWorldsWarning: boolean;
                doNotShowAddonStackingWarning: boolean;
                doNotShowManageShowcaseReplaceWarning: boolean;
                doNotShowManageShowcaseClearWarning: boolean;
                doNotShowAlternativeStorageHasWorlds: boolean;
                doNotShowHiddenAlternativeStorageWorldsWarning: boolean;
                doNotShowHiddenLocalWorldsWarning: boolean;
                doNotShowUsingExternalStorageWarning: boolean;
                doNotShowMultiplayerOnlineSafetyWarning: boolean;
                doNotShowMultiplayerIpSafetyWarning: boolean;
                doNotShowHardcoreModeWarning: boolean;
                /**
                 * @param {string} worldId
                 * @returns {boolean}
                 */
                getDoNotShowExperimentalWorldWarning(worldId: string): boolean;
                /**
                 * @param {string} worldId
                 * @param {boolean} value
                 * @returns {null}
                 */
                setDoNotShowExperimentalWorldWarning(worldId: string, value: boolean): null;
            };
            "vanilla.notifications": unknown; // TODO: Get the type for this facet.
            "vanilla.options": unknown; // TODO: Get the type for this facet.
            "vanilla.party": unknown; // TODO: Get the type for this facet. // Found in dev build file.
            "vanilla.playerAchievements": unknown; // TODO: Get the type for this facet.
            "vanilla.playerBanned": unknown; // TODO: Get the type for this facet.
            "vanilla.playerFollowingList": unknown; // TODO: Get the type for this facet.
            "vanilla.playerLinkedPlatformProfile": unknown; // TODO: Get the type for this facet. // Found in dev build file.
            "vanilla.playermessagingservice": {
                data: { messages: CoherentArrayProxy<unknown>; messageCount: number };
                status: number;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportClick(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportDismiss(...args: unknown[]): unknown;
            };
            "vanilla.playerPermissions": unknown; // TODO: Get the type for this facet. // NOTE: Exists but not yet accessed.
            "vanilla.playerProfile": unknown; // TODO: Get the type for this facet.
            "vanilla.playerReport": unknown; // TODO: Get the type for this facet.
            "vanilla.playerSocialManager": unknown; // TODO: Get the type for this facet.
            "vanilla.playerStatistics": unknown; // TODO: Get the type for this facet.
            "vanilla.privacyAndOnlineSafetyFacet": {
                isCheckingCompleted: boolean;
                getAllowCapturesResult: boolean;
                getClubCheckResult: boolean;
                getMultiplayerCheckResult: boolean;
                checkClubAndMultiplayerPermissions(): null;
            };
            "vanilla.profanityFilter": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsListFacet": {
                realms: ArrayLike<RealmDataType>;
                error: number;
                state: number;
                compatibility: number;
            };
            "vanilla.realmSlots": {
                realmSlots: [slot0: RealmSlot, slot1: RealmSlot, slot2: RealmSlot];
                isLoading: boolean;
                selectedRealmIndex: number;
                isSlotSelected: boolean;
                didFailToActivateSlot: boolean;
                didFailToQuerySelectedRealmDetails: boolean;
                isShowingConfirmationModal: boolean;
                selectedRealmName: string;
                getSelectedRealmDetails: (id: string) => null;
                selectSlot: (index: 0 | 1 | 2) => null;
                confirm: () => null;
                reset: () => null;
                status: number;
            };
            "vanilla.realmsMembership": {
                clearFetchRealm(): null;
                fetchRealm(id: string): null;
                leaveRealmResult: null | number; // TODO: MAKE ENUM
                leaveRealmProgress: number;
                joinedRealmName: string;
                joinedRealmId: string;
                joinRealmError: null | (typeof JoinRealmsServerError)[keyof typeof JoinRealmsServerError];
                joinRealmProgress: number;
                fetchRealmError: null | (typeof JoinRealmsServerError)[keyof typeof JoinRealmsServerError];
                fetchRealmResult: null | {
                    onlinePlayers: CoherentArrayProxy<PlayerData>;
                    players: CoherentArrayProxy<PlayerData>;
                    closed: boolean;
                    lastSaved: null | number;
                    description: string;
                    isInitialized: boolean;
                    isHardcore: boolean;
                    gameMode: null | number;
                    expired: boolean;
                    daysLeft: number;
                    full: boolean;
                    maxPlayers: number;
                    ownerXuid: `${bigint}`;
                    slotName: string;
                    realmName: string;
                    id: number;
                };
                fetchRealmProgress: number;
                joinRealm(realmCode: string): null;
                clearJoinRealm(): null;
                leaveRealm(id: number): null;
                clearLeaveRealm(): null;
            };
            "vanilla.realmsStories.actions": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsStories.localScreenshots": unknown; // TODO: Get the type for this facet. // NOTE: May not exist.
            "vanilla.realmsStories.persistentData": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsStories.players": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsStories.realmData": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsStories.settings": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsStories.stories": unknown; // TODO: Get the type for this facet.
            "vanilla.RealmsPDPFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.RealmWorldUploaderFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.recentlyPlayedWithList": {
                xboxAPICallResult: number;
                playerList: CoherentArrayProxy<{
                    description: string;
                    isFollowedByMe: boolean;
                    isFollowingMe: boolean;
                    isOnline: boolean;
                    gamerIcon: string;
                    gamertag: string;
                    xuid: string;
                }>;
                isLoading: boolean;
            };
            "vanilla.recommendedFriendsList": {
                xboxAPICallResult: number;
                playerList: CoherentArrayProxy<{
                    description: string;
                    isFollowedByMe: boolean;
                    isFollowingMe: boolean;
                    isOnline: boolean;
                    gamerIcon: string;
                    gamertag: string;
                    xuid: string;
                }>;
                isLoading: boolean;
            };
            "vanilla.resourcePackOverrides": unknown; // TODO: Get the type for this facet.
            "vanilla.resourcePacks": unknown; // TODO: Get the type for this facet.
            "vanilla.screenshotGalleryList": unknown; // TODO: Get the type for this facet. // NOTE: May not exist.
            "vanilla.screenSpecificOptions": unknown; // TODO: Get the type for this facet.
            "vanilla.screenTechStack": unknown; // TODO: Get the type for this facet.
            "vanilla.seedTemplates": {
                failedToFetch: boolean;
                templates: CoherentArrayProxy<{ image: string; seedValue: string; title: string }>;
                /**
                 * @todo Figure out the types for this method.
                 */
                refresh(...args: unknown[]): unknown;
            };
            "vanilla.share": {
                isShareSupported: boolean;
                /**
                 * @todo Figure out the types for this method.
                 */
                share(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                shareFile(...args: unknown[]): unknown;
            };
            "vanilla.simulationDistanceOptions": {
                simulationDistanceOptions: CoherentArrayProxy<number>;
            };
            "vanilla.telemetry": {
                /**
                 * @todo Figure out the types for this method.
                 */
                fireEvent(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fireEventButtonPressed(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fireEventModalShown(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                trackOptionChanged(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fireEventOptionsChanged(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                discardTrackedOptions(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fireEventRealmsStoriesOptIn(...args: unknown[]): unknown;
            };
            "vanilla.thirdPartyWorldList": {
                fetchThirdPartyWorldsTaskState: number;
                thirdPartyServersStatus: number;
                thirdPartyWorlds: CoherentArrayProxy<{
                    msgOfTheDay: string;
                    image: string;
                    capacity: number;
                    playerCount: number;
                    pingStatus: number;
                    ping: string;
                    description: string;
                    name: string;
                    id: string;
                }>;
            };
            "vanilla.unpairedRealmsListFacet": {
                realms: CoherentArrayProxy<unknown>;
                state: number;
                compatibility: undefined;
                /**
                 * @todo Figure out the types for this method.
                 */
                forceFetchUnpairedRealmsList(...args: unknown[]): unknown;
            };
            "vanilla.userAccount": {
                signInPlatformNetworkTaskResult: null;
                signInPlatformNetworkTaskState: number;
                isSignedInPlatformNetwork: boolean;
                accountUnlinkState: number;
                currentXuid: string;
                currentPlatformId: string;
                isMarketplacePassSubscriptionActive: boolean;
                isRealmsPlusSubscriptionActive: boolean;
                hasValidCrossPlatformSkin: boolean;
                isSignInInProgress: boolean;
                hasPremiumNetworkAccess: boolean;
                banExpiration: string;
                banReason: string;
                isBanned: boolean;
                userPermissions: {
                    viewProfiles: { allowed: boolean; denyReasons: CoherentArrayProxy<unknown> };
                    addFriends: { allowed: boolean; denyReasons: CoherentArrayProxy<unknown> };
                    multiplayer: { allowed: boolean; denyReasons: CoherentArrayProxy<unknown> };
                };
                isLoggedInWithMicrosoftAccount: boolean;
                isTrialAccount: boolean;
                /**
                 * @todo Figure out the types for this method.
                 */
                updateMultiplayerPrivilegeUsingSystemModal(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                showPremiumNetworkUpsellModal(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                signOutOfMicrosoftAccount(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                manageMicrosoftAccount(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                unlinkMicrosoftAccount(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearAccountUnlinkState(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                signInToPlatformNetwork(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                resetSignInPlatformNetwork(...args: unknown[]): unknown;
            };
            "vanilla.webBrowserFacet": {
                /**
                 * @todo Figure out the types for this method.
                 */
                openLink(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                openLinkWithParams(...args: unknown[]): unknown;
            };
            "vanilla.worldCloudSyncFacet": {
                syncWorldTaskState: number;
                syncWorldResult: null;
                /**
                 * @todo Figure out the types for this method.
                 */
                syncWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearSyncWorldTaskState(...args: unknown[]): unknown;
            };
            "vanilla.worldEditor": {
                loadWorldTaskState: number;
                loadWorldError: null;
                saveRealmsWorldTaskState: number;
                saveRealmsWorldError: null;
                saveLocalWorldTaskState: number;
                saveLocalWorldError: null;
                worldHasBeenModified: boolean;
                worldIsInitialized: boolean;
                currentWorldId: string;
                isEditorWorld: boolean;
                isAchievementsEditDisabled: boolean;
                worldSummary: { lastSaved: string; fileSize: string; worldIconPath: string };
                worldData: {
                    achievementsPermanentlyDisabled: boolean;
                    achievementsDisabled: boolean;
                    isUsingTemplate: boolean;
                    isLockedTemplate: boolean;
                    betaFeatures: CoherentArrayProxy<{
                        isEnabled: boolean;
                        isTogglePermanentlyDisabled: boolean;
                        category: number;
                        description: string;
                        title: string;
                        id: string;
                    }>;
                    resourcePacks: { sharedPacksEnabled: boolean };
                    cheats: {
                        tickSpeed: string;
                        educationEdition: boolean;
                        commandBlocks: boolean;
                        weather: boolean;
                        entitiesDropLoot: boolean;
                        mobGriefing: boolean;
                        mobSpawning: boolean;
                        keepInventory: boolean;
                        daylightCycle: number;
                        cheatsEnabled: boolean;
                    };
                    scriptingCoding: {
                        consoleCommandsEnabled: boolean;
                        codeBuilderEnabled: boolean;
                    };
                    multiplayer: {
                        locatorBarEnabled: boolean;
                        friendlyFire: boolean;
                        visibleToLanPlayers: boolean;
                        playerPermissions: number;
                        playerAccess: number;
                        generalWarningState: number;
                        platformPlayerFriendsOfFriendsAccessSupported: boolean;
                        platformPlayerInviteAccessSupported: boolean;
                        platformPlayerAccessEnabled: boolean;
                        platformPlayerAccessSupported: boolean;
                        platformPlayerAccess: number;
                        multiplayerGame: boolean;
                        multiplayerSupported: boolean;
                    };
                    advanced: {
                        flatWorldPreset: null;
                        worldSeed: string;
                        respawnRadius: string;
                        immediateRespawn: boolean;
                        sleepSkipNightPercent: number;
                        sleepSkipNight: boolean;
                        tileDrops: boolean;
                        naturalRegeneration: boolean;
                        mobLoot: boolean;
                        respawnBlocksExplode: boolean;
                        tntExplodes: boolean;
                        recipesUnlock: boolean;
                        firesSpreads: boolean;
                        friendlyFire: boolean;
                        showDaysPlayed: boolean;
                        showCoordinates: boolean;
                        bonusChest: boolean;
                        startWithMap: boolean;
                        simulationDistance: number;
                        generatorType: number;
                        useFlatWorld: boolean;
                    };
                    general: {
                        difficulty: number;
                        playerHasDied: boolean;
                        isHardcore: boolean;
                        gameMode: number;
                        worldName: string;
                    };
                };
                /**
                 * @todo Figure out the types for this method.
                 */
                saveLocalWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearSaveLocalWorldTaskState(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                saveRealmsWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearSaveRealmsWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                addWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                loadWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                closeWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reloadWorld(...args: unknown[]): unknown;
            };
            "vanilla.worldOperations": unknown; // TODO: Get the type for this facet.
            "vanilla.worldPackages": unknown; // TODO: Get the type for this facet.
            "vanilla.worldPlayersList": unknown; // TODO: Get the type for this facet. // NOTE: Exists but not yet accessed.
            "vanilla.worldStartup": unknown; // TODO: Get the type for this facet.
            "vanilla.worldTemplateList": unknown; // TODO: Get the type for this facet.
            "vanilla.worldTransfer": {
                backupWorldProgress: number;
                backupWorldResult: null | number;
                importWorldProgress: number;
                importWorldProgressPercentage: number;
                importWorldResult: null | number;
                importWorld: {
                    progress: null | number;
                    state: number;
                    result: null | number;
                    run(): void;
                    cancel(): void;
                    clear(): void;
                };
                importWorld_v2(): null;
                resetImportWorld(): void;
                /**
                 * @todo Figure out the types for this method.
                 */
                backupWorld(): unknown;
                resetBackupWorld(): void;
            };
            "vanilla.friendworldlist": {
                friendWorlds: CoherentArrayProxy<{
                    friendOfFriendWorld: boolean;
                    capacity: number;
                    playerCount: number;
                    isHardcore: boolean;
                    gameMode: number;
                    ownerId: `${number}`;
                    ownerName: string;
                    name: string;
                    id: `${number}`;
                }>;
            };
            "vanilla.offerRepository": {
                plusSubscriptionPrice: string;
                coreSubscriptionPrice: string;
                plusSubscriptionTermsExtra: string;
                plusSubscriptionTerms: string;
                coreSubscriptionTermsExtra: string;
                coreSubscriptionTerms: string;
                isRealmsPlusOfferAvailable: boolean;
                isRealmsCoreOfferAvailable: boolean;
                isRealmsTrialOfferAvailable: boolean;
                isFinishedQueryingProductsAndPurchases: boolean;
            };
            "vanilla.realmsSettingsFacet": {
                /**
                 * @todo Figure out the types for this method.
                 */
                openRealm(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                closeRealm(...args: unknown[]): unknown;
            };
            "vanilla.achievementCategories": unknown; // TODO: Get the type for this facet.
            "vanilla.blockInformation": unknown; // TODO: Get the type for this facet.
            "debug.worldTransfer": unknown; // TODO: Get the type for this facet.
            "vanilla.flatWorldPresets": unknown; // TODO: Get the type for this facet.
            "vanilla.inGame": unknown; // TODO: Get the type for this facet.
            "vanilla.playerPrivacy": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsPurchase": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsSubscriptionsData": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsSubscriptionsMethods": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsWorldContextCommands": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsWorldContextQueries": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsStories.sessions": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsListActionsFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.developerOptionsFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsStories.comments": unknown; // TODO: Get the type for this facet.
            "vanilla.screenshotGallery": unknown; // TODO: Get the type for this facet.
            "vanilla.playerShowcasedGallery": unknown; // TODO: Get the type for this facet.
            "vanilla.trialMode": unknown; // TODO: Get the type for this facet.
            "vanilla.featuredWorldTemplateList": unknown; // TODO: Get the type for this facet.
            "vanilla.ownedWorldTemplateList": unknown; // TODO: Get the type for this facet.
            "vanilla.worldTemplateOperations": unknown; // TODO: Get the type for this facet.
            "test.vector": unknown; // TODO: Get the type for this facet.
            "vanilla.editorBlockPalette": unknown; // TODO: Get the type for this facet.
            "vanilla.editorInputBinding": unknown; // TODO: Get the type for this facet.
            "vanilla.editorInputState": unknown; // TODO: Get the type for this facet.
            "vanilla.editorProjectConstants": unknown; // TODO: Get the type for this facet.
            "vanilla.editorStructure": unknown; // TODO: Get the type for this facet.
            "vanilla.editorTutorial": unknown; // TODO: Get the type for this facet.
            "vanilla.gameplay.localPlayerWeatherLightningFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.levelInfo": unknown; // TODO: Get the type for this facet.
            "vanilla.currentParty": unknown; // TODO: Get the type for this facet.
            "vanilla.partyCommands": unknown; // TODO: Get the type for this facet.
            "vanilla.worldRealmEditor": unknown; // TODO: Get the type for this facet. // Found in dev build file.
            "vanilla.worldRealmEditorCommands": unknown; // TODO: Get the type for this facet.
            "vanilla.worldRealmEditorQueries": unknown; // TODO: Get the type for this facet.
            "vanilla.realmBackupsCommands": unknown; // TODO: Get the type for this facet.
            "vanilla.realmBackupsQueries": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsPurchaseCommands": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsPurchaseReconcilerQueries": unknown; // TODO: Get the type for this facet.
            "vanilla.character-selector": unknown; // TODO: Get the type for this facet.
            "vanilla.progressTracker": unknown; // TODO: Get the type for this facet.

            "vanilla.realmsWorldEditorGameRulesCommands": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsWorldEditorGameRulesQueries": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsWorldEditorWorldDetailsQueries": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsCommitCommandsFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsCommitQueriesFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsPurchaseQueries": unknown; // TODO: Get the type for this facet.

            "vanilla.connectionErrorInfoFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.partyReceivedInviteList": unknown; // TODO: Get the type for this facet.
            "vanilla.joinablePartyList": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsFeatureFlags": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsStories.reports": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsStories.reportCommands": unknown; // TODO: Get the type for this facet.
            "vanilla.openAndCloseRealmCommandsFacet": unknown; // TODO: Get the type for this facet.
            "dev.realmsCommitCommandsFacet": unknown; // TODO: Get the type for this facet.
            "dev.realmsCommitQueriesFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.newPlayerChoices": unknown; // TODO: Get the type for this facet.
        }
        /**
         * A shared facet.
         *
         * @see {@link SharedFacetBase}
         */
        interface SharedFacet<FacetType extends FacetList[number]> extends SharedFacetBase<FacetType> {}
        /**
         * The base type for a shared facet (use this for facets that are not in the {@link FacetList}).
         */
        interface SharedFacetBase<FacetType extends LooseAutocomplete<FacetList[number]>> {
            /**
             * Gets the current value of the facet.
             */
            get(): (FacetType extends FacetList[number] ? FacetTypeMap[FacetType] : unknown) | symbol;
            /**
             * Watches for changes to the value of the facet.
             *
             * @param callback The callback to call when the value of the facet changes.
             */
            observe(callback: (value: FacetType extends FacetList[number] ? FacetTypeMap[FacetType] : unknown) => void): void;
            /**
             * Sets the value of the facet.
             *
             * @param value The new value of the facet.
             */
            set(value: FacetType extends FacetList[number] ? FacetTypeMap[FacetType] : unknown): void;
            [k: PropertyKey]: unknown;
        }

        /**
         * An interface that represents a route history item.
         */
        interface RouteHistoryItem {
            /**
             * The hash component of the route.
             */
            hash: string;
            /**
             * The path component of the route.
             */
            pathname: string;
            /**
             * The search component of the route.
             */
            search: string;
        }
        /**
         * The local world data type.
         */
        interface LocalWorldDataType {
            /**
             * If multiplayer is enabled in the world.
             */
            isMultiplayerEnabled: boolean;
            /**
             * Whether the world requires cloud syncing.
             */
            requiresCloudSync: boolean;
            /**
             * If all content on the world is owned by the player.
             */
            allContentOwned: boolean;
            /**
             * If the world template is compatible with any version.
             */
            isTemplateCompatibleWithAnyVersion: boolean;
            /**
             * The version override of the world.
             */
            templateVersion: { isBeta: boolean; revision: number; patch: number; minor: number; major: number };
            /**
             * The game version that the world was last saved in.
             */
            gameVersion: { isBeta: boolean; revision: number; patch: number; minor: number; major: number };
            /**
             * Whether any player has died in the world before.
             */
            playerHasDied: boolean;
            /**
             * Whether the world has hardcore mode enabled.
             */
            isHardcore: boolean;
            /**
             * Whether the world has any experimental toggles enabled.
             */
            isExperimental: boolean;
            /**
             * The URI of the world preview image.
             */
            previewImgPath: `id://${bigint}`;
            /**
             * The size of the world in MiB.
             */
            fileSize: `${number}MB`;
            /**
             * The game mode of the world.
             */
            gameMode: number;
            /**
             * The last time the world was saved.
             */
            lastSaved: number;
            /**
             * The display name of the world.
             */
            name: string;
            /**
             * The world folder name.
             *
             * @example
             * "7w4ZHhMl-GA="
             */
            id: string;
        }
        interface RealmDataType {
            world: {
                onlinePlayers: CoherentArrayProxy<PlayerData>;
                players: CoherentArrayProxy<PlayerData>;
                closed: boolean;
                lastSaved: null | number;
                description: string;
                isInitialized: boolean;
                isHardcore: boolean;
                gameMode: number;
                expired: boolean;
                daysLeft: number;
                full: boolean;
                maxPlayers: number;
                ownerXuid: `${bigint}`;
                slotName: string;
                realmName: string;
                id: number;
            };
            unreadStoryCount: number;
            areStoriesNotificationsEnabled: boolean;
            isOwner: boolean;
        }
        interface PlayerData {
            // TO-DO
        }

        interface RealmSlot {
            id: 0 | 1 | 2;
            worldName: string;
            slotImage: string;
        }

        type CoherentArrayProxy<T> = ArrayLike<T> & {
            length: number;
            filter: Array<T>["filter"];
            map: Array<T>["map"];
            reduce: Array<T>["reduce"];
            some: Array<T>["some"];
            reduceRight: Array<T>["reduceRight"];
            every: Array<T>["every"];
            indexOf: Array<T>["indexOf"];
            forEach: Array<T>["forEach"];
            slice: Array<T>["slice"];
            find: Array<T>["find"];
            findIndex: Array<T>["findIndex"];
            includes: Array<T>["includes"];
            lastIndexOf: Array<T>["lastIndexOf"];
            entries(): ArrayIterator<[number, T]>;
            join(separator?: string): string;
            keys(): ArrayIterator<number>;
            values(): ArrayIterator<T>;
            toString(): string;
        };
        //#endregion
        type ConstNumberObjectEnumToEnumMappingType<T extends { [key: string]: number }> = MergeObjectTypes<
            {
                [K in keyof T as T[K]]: K;
            } & T
        >;

        /**
         * @author 8Crafter
         */
        type MergeObjectTypes<T> = { [key in keyof T]: T[key] };
    }
}

export {};

type MissingFacetTypeMapKeys = Exclude<FacetList[number], keyof FacetTypeMap>;

interface b {
    "core.animation": {
        screenAnimationEnabled: boolean;
    };
    "core.customScaling": {
        guiAccessibilityScaling: boolean;
        MAX_FIXED_GUI_SCALE_MODIFIER: number;
        MIN_FIXED_GUI_SCALE_MODIFIER: number;
        fixedGuiScaleModifier: number;
        scalingModeOverride: string;
    };
    "core.deviceInformation": {
        activeMultiplayerServiceIds: CoherentArrayProxy<number>;
        changeStorageTask: number;
        storageType: number;
        supportsSizeQuery: boolean;
        isStorageLow: boolean;
        isStorageFull: boolean;
        storageUsed: number;
        storageSize: number;
        storageAvailableSize: string;
        supportsManualAddedServers: boolean;
        onlyCellularAvailable: boolean;
        showCellularDataFee: boolean;
        isLANAllowed: boolean;
        isOnline: boolean;
        guiScaleBase: number;
        guiScaleModifier: number;
        displayHeight: number;
        displayWidth: number;
        pixelsPerMillimeter: number;
        isLowMemoryDevice: boolean;
        inputMethods: CoherentArrayProxy<number>;
        arvrPlatform: number;
        platform: number;
        changeStorage(...args: unknown[]): unknown;
    };
    "core.featureFlags": {
        flags: CoherentArrayProxy<string>;
    };
    "core.input": {
        keyboardType: number;
        enableControllerHints: boolean;
        currentInputType: number;
        swapXYButtons: boolean;
        swapABButtons: boolean;
    };
    "core.locale": {
        locale: string;
        formatDate(...args: unknown[]): unknown;
        getHowLongAgoAsString(...args: unknown[]): unknown;
        translate(...args: unknown[]): unknown;
        translateWithParameters(...args: unknown[]): unknown;
    };
    "core.router": {
        history: {
            list: CoherentArrayProxy<{ hash: string; search: string; pathname: string }>;
            location: { hash: string; search: string; pathname: string };
            action: string;
            length: number;
            push(...args: unknown[]): unknown;
            replace(...args: unknown[]): unknown;
            go(...args: unknown[]): unknown;
            goBack(...args: unknown[]): unknown;
            goForward(...args: unknown[]): unknown;
        };
    };
    "core.safeZone": {
        screenPositionY: number;
        screenPositionX: number;
        safeAreaY: number;
        safeAreaX: number;
    };
    "core.screenReader": {
        isIdle: boolean;
        isUITextToSpeechEnabled: boolean;
        isChatTextToSpeechEnabled: boolean;
        read(...args: unknown[]): unknown;
        clear(...args: unknown[]): unknown;
    };
    "core.splitScreen": {
        splitScreenDirection: number;
        numActivePlayers: number;
        splitScreenPosition: number;
        isPrimaryUser: boolean;
    };
    "core.sound": {
        play(...args: unknown[]): unknown;
        fadeOut(...args: unknown[]): unknown;
        isPlaying(...args: unknown[]): unknown;
    };
    "vanilla.achievements": {
        data: {
            achievements: CoherentArrayProxy<{
                suggestedOrder: number;
                rewardId: string;
                rewardRarity: number;
                rewardImage: string;
                rewardName: string;
                isRewardOwned: boolean;
                hasReward: boolean;
                image: string;
                progressTarget: number;
                progress: number;
                isSecret: boolean;
                isLocked: boolean;
                dateUnlocked: number;
                gamerScore: number;
                description: string;
                name: string;
                platformIndependentId: string;
                id: string;
            }>;
            maxGamerScore: number;
            currentGamerScore: number;
            maxAchievements: number;
            achievementsUnlocked: number;
        };
        status: number;
    };
    "vanilla.buildSettings": {
        currentGameVersion: {
            isBeta: boolean;
            revision: number;
            patch: number;
            minor: number;
            major: number;
        };
        isBetaBuild: boolean;
        isAnyBeta: boolean;
        isDevBuild: boolean;
    };
    "vanilla.clipboard": {
        isClipboardCopySupported: boolean;
        copyToClipboard(...args: unknown[]): unknown;
    };
    "vanilla.createNewWorld": {
        applyTemplateTaskState: number;
        consumeResetFlag: boolean;
        inWorldCreation: boolean;
        showedAchievementWarning: boolean;
        worldData: {
            achievementsPermanentlyDisabled: boolean;
            achievementsDisabled: boolean;
            isUsingTemplate: boolean;
            isLockedTemplate: boolean;
            betaFeatures: CoherentArrayProxy<{
                isEnabled: boolean;
                isTogglePermanentlyDisabled: boolean;
                category: number;
                description: string;
                title: string;
                id: string;
            }>;
            resourcePacks: { sharedPacksEnabled: boolean };
            cheats: {
                tickSpeed: string;
                educationEdition: boolean;
                commandBlocks: boolean;
                weather: boolean;
                entitiesDropLoot: boolean;
                mobGriefing: boolean;
                mobSpawning: boolean;
                keepInventory: boolean;
                daylightCycle: number;
                cheatsEnabled: boolean;
            };
            scriptingCoding: {
                consoleCommandsEnabled: boolean;
                codeBuilderEnabled: boolean;
            };
            multiplayer: {
                locatorBarEnabled: boolean;
                friendlyFire: boolean;
                visibleToLanPlayers: boolean;
                playerPermissions: number;
                playerAccess: number;
                generalWarningState: number;
                platformPlayerFriendsOfFriendsAccessSupported: boolean;
                platformPlayerInviteAccessSupported: boolean;
                platformPlayerAccessEnabled: boolean;
                platformPlayerAccessSupported: boolean;
                platformPlayerAccess: number;
                multiplayerGame: boolean;
                multiplayerSupported: boolean;
            };
            advanced: {
                flatWorldPreset: string;
                worldSeed: string;
                respawnRadius: string;
                immediateRespawn: boolean;
                sleepSkipNightPercent: number;
                sleepSkipNight: boolean;
                tileDrops: boolean;
                naturalRegeneration: boolean;
                mobLoot: boolean;
                respawnBlocksExplode: boolean;
                tntExplodes: boolean;
                recipesUnlock: boolean;
                firesSpreads: boolean;
                friendlyFire: boolean;
                showDaysPlayed: boolean;
                showCoordinates: boolean;
                bonusChest: boolean;
                startWithMap: boolean;
                simulationDistance: number;
                generatorType: number;
                useFlatWorld: boolean;
            };
            general: {
                difficulty: number;
                playerHasDied: boolean;
                isHardcore: boolean;
                gameMode: number;
                worldName: string;
            };
        };
        worldPreviewImagePath: string;
        createOnRealmsError: null;
        createWorldError: null;
        isCreatingWorld: boolean;
        isEditorWorld: boolean;
        isRandomSeedAllowed: boolean;
        checkDlcError: string;
        inputError: string;
        createWorld(...args: unknown[]): unknown;
        createOnRealms(...args: unknown[]): unknown;
        clearErrors(...args: unknown[]): unknown;
        applyTemplate(...args: unknown[]): unknown;
        selectRealmToCreateOn(...args: unknown[]): unknown;
        createWorldOnPreviewRealm(...args: unknown[]): unknown;
        unlockTemplateSettings(...args: unknown[]): unknown;
        checkIfUserHasChangedSettings(...args: unknown[]): unknown;
    };
    "vanilla.createPreviewRealmFacet": {
        createPreviewRealmFromSubscriptionResult: null;
        createPreviewRealmFromSubscriptionTaskState: number;
        createPreviewRealmFromSubscriptionId(...args: unknown[]): unknown;
        activateNewPreviewRealm(...args: unknown[]): unknown;
        reset(...args: unknown[]): unknown;
        getCreatedPreviewRealmId(...args: unknown[]): unknown;
    };
    "vanilla.debugSettings": {
        allBiomes: CoherentArrayProxy<{ dimension: number; id: number; label: string }>;
        isBiomeOverrideActive: boolean;
        biomeOverrideId: number;
        defaultSpawnBiome: boolean;
        spawnBiomeId: number;
        spawnDimensionId: number;
        gameVersionOverride: string;
        enableGameVersionOverride: boolean;
        flatNether: boolean;
    };
    "vanilla.editor": {
        canShowModeShortcutToast: boolean;
        editorMode: number;
        openPauseMenu(...args: unknown[]): unknown;
        shouldDisplayReloadModal(...args: unknown[]): unknown;
        resizeViewport(...args: unknown[]): unknown;
        onViewportFocusAreaResized(...args: unknown[]): unknown;
        openConsole(...args: unknown[]): unknown;
        navigateUri(...args: unknown[]): unknown;
        getCursorBlockName(...args: unknown[]): unknown;
    };
    "vanilla.editorLogging": {
        tagFilter: string;
        logLevelFilter: number;
        tagList: CoherentArrayProxy<unknown>;
        messageList: CoherentArrayProxy<unknown>;
        flush(...args: unknown[]): unknown;
    };
    "vanilla.editorScripting": {
        sendMessage(...args: unknown[]): unknown;
        dispatchDataStoreEvent(...args: unknown[]): unknown;
        reload(...args: unknown[]): unknown;
        attachDebugger(...args: unknown[]): unknown;
        addCleanupMessage(...args: unknown[]): unknown;
        getMouseRayCastActionPayload(...args: unknown[]): unknown;
    };
    "vanilla.editorSettings": {
        fontZoom: number;
        currentThemeId: string;
        themesMap: Record<string, never>;
        isEditorMode: boolean;
        selectedTool: string;
        selectedOperator: number;
        addNewTheme: "() => {}";
        updateThemeColor: "() => {}";
        deleteTheme: "() => {}";
        getKey: '() => ""';
        setKey: "() => {}";
        setKeys: "() => {}";
        hasKey: "() => !1";
    };
    "vanilla.externalServerWorldList": {
        addedServerId: number;
        externalServerWorlds: CoherentArrayProxy<{
            msgOfTheDay: string;
            image: string;
            capacity: number;
            playerCount: number;
            pingStatus: number;
            ping: string;
            description: string;
            name: string;
            id: string;
        }>;
        addExternalServerWorld(...args: unknown[]): unknown;
        editExternalServerWorld(...args: unknown[]): unknown;
        removeExternalServerWorld(...args: unknown[]): unknown;
    };
    "vanilla.followersList": {
        xboxAPICallResult: number;
        playerList: CoherentArrayProxy<{
            description: string;
            isFollowedByMe: boolean;
            isFollowingMe: boolean;
            isOnline: boolean;
            gamerIcon: string;
            gamertag: string;
            xuid: string;
        }>;
        isLoading: boolean;
    };
    "vanilla.friendsListFacet": {
        platformFriends: CoherentArrayProxy<unknown>;
        xblFriends: CoherentArrayProxy<{
            favoriteStatus: number;
            playingOnServerId: null;
            isCurrentlyPlaying: boolean;
            titleHistory: number;
            presenceMessage: string;
            isInSameGame: boolean;
            titleId: number;
            titleName: string;
            presence: number;
            gamerIcon: string;
            gamerTag: string;
            platformId: string;
            xuid: string;
        }>;
        platformLoadingState: number;
        xblLoadingState: number;
        userControlledUpdateGameList(...args: unknown[]): unknown;
    };
    "vanilla.gameplay.activeLevelHardcoreMode": {
        isHardcoreMode: null;
    };
    "vanilla.gameplay.bedtime": {
        canChangeSleepSettings: boolean;
        isAbleToSleep: boolean;
        remotePlayersCount: number;
        chatAvailability: number;
        isPlayerSleeping: boolean;
        requiredSleepingPlayerCount: number;
        sleepingPlayerCount: number;
        wakeUp(...args: unknown[]): unknown;
    };
    "vanilla.gameplay.containerBlockActorType": {
        blockActorType: number;
    };
    "vanilla.gameplay.furnace": {
        litProgress: number;
        burnProgress: number;
    };
    "vanilla.gameplay.immediateRespawn": {
        immediateRespawn: null;
    };
    "vanilla.gameplay.leaveGame": {
        leaveGame(...args: unknown[]): unknown;
        leaveGameThenJoinFriendsWorld(...args: unknown[]): unknown;
    };
    "vanilla.gameplay.playerDeathInfo": {
        deathInfo: string;
    };
    "vanilla.gameplay.playerRespawn": {
        isAlive: boolean;
        respawn(...args: unknown[]): unknown;
    };
    "vanilla.gamertagSearch": {
        xboxAPICallResult: number;
        searchResults: CoherentArrayProxy<unknown>;
        isLoading: boolean;
        search(...args: unknown[]): unknown;
    };
    "vanilla.inbox": {
        messagingServiceFailed: boolean;
        marketplacePassSubscriber: boolean;
        settings: {
            showOnlyFriendInvites: boolean;
            showMessageBadges: boolean;
            showInvitesBadges: boolean;
            toggleInvitesBadges(...args: unknown[]): unknown;
            toggleMessageBadges(...args: unknown[]): unknown;
            toggleOnlyFriendInvites(...args: unknown[]): unknown;
        };
        categoryData: CoherentArrayProxy<{
            imageUrl: string;
            unreadMessages: number;
            localizedName: string;
            categoryName: string;
        }>;
        realmsSubscriber: boolean;
        inboxMessages: CoherentArrayProxy<{
            style: number;
            gamedrop: null;
            items: CoherentArrayProxy<{
                button: {
                    action: number;
                    link: string;
                    description: string;
                    text: string;
                    id: string;
                    openExternalLink(...args: unknown[]): unknown;
                };
                image: {
                    isLoaded: boolean;
                    imageSize: { height: number; width: number };
                    nonAnimatedUrl: string;
                    animatedUrl: string;
                    id: string;
                };
                id: string;
            }>;
            buttons: CoherentArrayProxy<{
                action: number;
                link: string;
                description: string;
                text: string;
                id: string;
                openExternalLink(...args: unknown[]): unknown;
            }>;
            images: CoherentArrayProxy<{
                isLoaded: boolean;
                imageSize: null;
                nonAnimatedUrl: string;
                animatedUrl: string;
                id: string;
            }>;
            template: string;
            worldId: string;
            instanceId: string;
            invStatus: number;
            expiryDaysLeft: null;
            invType: number;
            imgSource: string;
            invitationId: string;
            read: boolean;
            inboxCategory: string;
            content: string;
            senderXuid: string;
            sender: string;
            subtitle: string;
            title: string;
            dateString: string;
            dateReceived: number;
            id: string;
        }>;
        setNotificationRead(...args: unknown[]): unknown;
        acceptInvitation(...args: unknown[]): unknown;
        rejectInvitation(...args: unknown[]): unknown;
        deleteNotification(...args: unknown[]): unknown;
        saveSettings(...args: unknown[]): unknown;
        reloadInvites(...args: unknown[]): unknown;
        markAllRead(...args: unknown[]): unknown;
        deleteAllRead(...args: unknown[]): unknown;
        reportClick(...args: unknown[]): unknown;
        requestMessages(...args: unknown[]): unknown;
    };
    "vanilla.localWorldList": {
        otherStorageTypeHasWorlds: boolean;
        localWorlds: CoherentArrayProxy<{
            isMultiplayerEnabled: boolean;
            requiresCloudSync: boolean;
            allContentOwned: boolean;
            isTemplateCompatibleWithAnyVersion: boolean;
            templateVersion: {
                isBeta: boolean;
                revision: number;
                patch: number;
                minor: number;
                major: number;
            };
            gameVersion: {
                isBeta: boolean;
                revision: number;
                patch: number;
                minor: number;
                major: number;
            };
            playerHasDied: boolean;
            isHardcore: boolean;
            isExperimental: boolean;
            previewImgPath: string;
            fileSize: string;
            gameMode: number;
            lastSaved: number;
            name: string;
            id: string;
        }>;
    };
    "vanilla.marketplaceSuggestions": {
        getMorePacks: { pageId: string; title: string };
    };
    "vanilla.marketplacePassWorldTemplateList": {
        refreshTaskState: number;
        seeMoreMarketplacePassRouteData: { pageId: string; title: string };
        marketplacePassWorldTemplates: CoherentArrayProxy<{
            storeCatalogCategory: number;
            isUpdateAvailable: boolean;
            isInstalled: boolean;
            packId: string;
            isExpired: boolean;
            ratingData: { totalRatingsCount: string; averageRating: number };
            thumbnailPath: string;
            creator: string;
            name: string;
            id: string;
        }>;
        refreshOffers(...args: unknown[]): unknown;
        clearRefreshTaskState(...args: unknown[]): unknown;
    };
    "vanilla.networkWorldDetails": {
        hasLoadedDetails: boolean;
        networkDetails: {
            activities: CoherentArrayProxy<unknown>;
            newsDescription: string;
            newsTitle: string;
            type: number;
            capacity: number;
            playerCount: number;
            pingStatus: number;
            imagePath: string;
            ping: string;
            port: number;
            address: string;
            description: string;
            name: string;
            id: string;
        };
        loadNetworkWorldDetails(...args: unknown[]): unknown;
    };
    "vanilla.networkWorldJoiner": {
        joinLANServerTaskState: number;
        joinLANServerResult: null;
        joinFriendServerState: number;
        joinFriendServerResult: null;
        joinRealmTaskState: number;
        joinRealmResult: null;
        joinExternalServerTaskState: number;
        joinExternalServerResult: null;
        joinThirdPartyServerTaskState: number;
        joinThirdPartyServerResult: null;
        joinThirdPartyServer(...args: unknown[]): unknown;
        clearJoinThirdPartyServerTaskState(...args: unknown[]): unknown;
        joinExternalServer(...args: unknown[]): unknown;
        clearJoinExternalServerTaskState(...args: unknown[]): unknown;
        joinRealmWorld(...args: unknown[]): unknown;
        clearJoinRealmTaskState(...args: unknown[]): unknown;
        joinFriendServer(...args: unknown[]): unknown;
        clearJoinFriendServerTaskState(...args: unknown[]): unknown;
        joinLanServer(...args: unknown[]): unknown;
        clearJoinLANServerTaskState(...args: unknown[]): unknown;
    };
    "vanilla.notificationOptions": {
        doNotShowAddonStackingWarning: boolean;
        doNotShowManageShowcaseReplaceWarning: boolean;
        doNotShowManageShowcaseClearWarning: boolean;
        doNotShowAlternativeStorageHasWorlds: boolean;
        doNotShowHiddenAlternativeStorageWorldsWarning: boolean;
        doNotShowHiddenLocalWorldsWarning: boolean;
        doNotShowUsingExternalStorageWarning: boolean;
        doNotShowMultiplayerOnlineSafetyWarning: boolean;
        doNotShowMultiplayerIpSafetyWarning: boolean;
        doNotShowHardcoreModeWarning: boolean;
        doNotShowOldWorldsWarning: boolean;
        doNotShowEntitlementsWarning: boolean;
        getDoNotShowExperimentalWorldWarning(...args: unknown[]): unknown;
        setDoNotShowExperimentalWorldWarning(...args: unknown[]): unknown;
    };
    "vanilla.notifications": {
        queueSnackbar(...args: unknown[]): unknown;
    };
    "vanilla.options": {
        playVideoInTouchControlSelectionScreen: boolean;
        useMobileDataOnce: boolean;
        showTouchControlSelectionScreen: boolean;
        touchControlScheme: number;
        showRenderDistanceWarningModal: boolean;
        maxRenderDistance: number;
        defaultRenderDistance: number;
        renderDistance: number;
    };
    "vanilla.playerAchievements": {
        data: {
            achievements: CoherentArrayProxy<unknown>;
            maxGamerScore: number;
            currentGamerScore: number;
            maxAchievements: number;
            achievementsUnlocked: number;
        };
        status: number;
        load(...args: unknown[]): unknown;
    };
    "vanilla.playerBanned": {
        openBannedInfoPage(...args: unknown[]): unknown;
        openXboxLiveBannedInfoPage(...args: unknown[]): unknown;
    };
    "vanilla.playerFollowingList": {
        playerList: CoherentArrayProxy<unknown>;
        isLoading: boolean;
        load(...args: unknown[]): unknown;
    };
    "vanilla.playermessagingservice": {
        data: { messages: CoherentArrayProxy<unknown>; messageCount: number };
        status: number;
        reportClick(...args: unknown[]): unknown;
        reportDismiss(...args: unknown[]): unknown;
    };
    "vanilla.playerProfile": {
        playerProfiles: CoherentArrayProxy<{
            state: {
                platformError: number;
                platformState: number;
                xblError: number;
                xblState: number;
            };
            data: {
                favoriteStatus: number;
                isInSameGame: boolean;
                playingOnServerId: string;
                url: string;
                qrCode: string;
                presenceMessage: string;
                titleId: undefined;
                titleName: string;
                presence: number;
                isMuted: boolean;
                isBlocked: boolean;
                relation: number;
                platformProfilePic: string;
                xblProfilePic: string;
                avatarState: number;
                avatar: string;
                realName: string;
                platformName: string;
                xblName: string;
                offlineName: string;
                platformId: string;
                xuid: string;
            };
        }>;
        subscribeToProfile(...args: unknown[]): unknown;
        refetchProfile(...args: unknown[]): unknown;
    };
    "vanilla.playerReport": {
        hasReachedReportLimit: boolean;
        screenshot: string;
        reportReasonOptions: CoherentArrayProxy<unknown>;
        reportAreaOptions: CoherentArrayProxy<unknown>;
        reportableChatMessages: CoherentArrayProxy<unknown>;
        selectedChatMessages: CoherentArrayProxy<unknown>;
        galleryScreenshotId: string;
        platformId: string;
        xuid: string;
        reportMessage: string;
        reportReason: number;
        reportArea: number;
        isChatAvailable(...args: unknown[]): unknown;
        decideReportReasonOptions(...args: unknown[]): unknown;
        finishReport(...args: unknown[]): unknown;
        startReport(...args: unknown[]): unknown;
    };
    "vanilla.playerSocialManager": {
        addFriend(...args: unknown[]): unknown;
        removeFriend(...args: unknown[]): unknown;
        block(...args: unknown[]): unknown;
        unblock(...args: unknown[]): unknown;
        mute(...args: unknown[]): unknown;
        unmute(...args: unknown[]): unknown;
        favorite(...args: unknown[]): unknown;
        unfavorite(...args: unknown[]): unknown;
    };
    "vanilla.playerStatistics": {
        data: CoherentArrayProxy<unknown>;
        loaded: boolean;
        load(...args: unknown[]): unknown;
    };
    "vanilla.privacyAndOnlineSafetyFacet": {
        isCheckingCompleted: boolean;
        getAllowCapturesResult: boolean;
        getClubCheckResult: boolean;
        getMultiplayerCheckResult: boolean;
        checkClubAndMultiplayerPermissions(...args: unknown[]): unknown;
    };
    "vanilla.profanityFilter": {
        isProfanityInString(...args: unknown[]): unknown;
    };
    "vanilla.realmsListFacet": {
        realms: CoherentArrayProxy<{
            world: {
                onlinePlayers: CoherentArrayProxy<unknown>;
                players: CoherentArrayProxy<unknown>;
                closed: boolean;
                lastSaved: null | number;
                description: string;
                isInitialized: boolean;
                isHardcore: boolean;
                gameMode: number;
                expired: boolean;
                daysLeft: number;
                full: boolean;
                maxPlayers: number;
                ownerXuid: string;
                slotName: string;
                realmName: string;
                id: number;
            };
            unreadStoryCount: number;
            areStoriesNotificationsEnabled: boolean;
            isOwner: boolean;
        }>;
        error: number;
        state: number;
        compatibility: number;
        forceFetchRealmsList(...args: unknown[]): unknown;
    };
    "vanilla.realmSlots": {
        didFailToActivateSlot: boolean;
        didFailToQuerySelectedRealmDetails: boolean;
        isShowingConfirmationModal: boolean;
        isSlotSelected: boolean;
        isLoading: boolean;
        selectedRealmName: string;
        realmSlots: CoherentArrayProxy<unknown>;
        status: number;
        selectSlot(...args: unknown[]): unknown;
        getSelectedRealmDetails(...args: unknown[]): unknown;
        reset(...args: unknown[]): unknown;
        confirm(...args: unknown[]): unknown;
    };
    "vanilla.realmsMembership": {
        leaveRealmResult: number;
        leaveRealmProgress: number;
        joinedRealmName: string;
        joinedRealmId: string;
        joinRealmError: null | number;
        joinRealmProgress: number;
        fetchRealmError: null | number;
        fetchRealmResult: null | number;
        fetchRealmProgress: number;
        fetchRealm(...args: unknown[]): unknown;
        clearFetchRealm(...args: unknown[]): unknown;
        joinRealm(...args: unknown[]): unknown;
        clearJoinRealm(...args: unknown[]): unknown;
        leaveRealm(...args: unknown[]): unknown;
        clearLeaveRealm(...args: unknown[]): unknown;
    };
    "vanilla.realmsStories.actions": {
        init(...args: unknown[]): unknown;
        reset(...args: unknown[]): unknown;
        joinRealmFromInvite(...args: unknown[]): unknown;
        postStory(...args: unknown[]): unknown;
        clearPostStoryStatus(...args: unknown[]): unknown;
        postComment(...args: unknown[]): unknown;
        clearPostCommentStatus(...args: unknown[]): unknown;
        fetchStories(...args: unknown[]): unknown;
        clearStoryFeedStatus(...args: unknown[]): unknown;
        fetchStoryImage(...args: unknown[]): unknown;
        fetchEvents(...args: unknown[]): unknown;
        clearEventsStatus(...args: unknown[]): unknown;
        fetchMembers(...args: unknown[]): unknown;
        fetchSessions(...args: unknown[]): unknown;
        clearFetchMembersStatus(...args: unknown[]): unknown;
        loadStoriesSlice(...args: unknown[]): unknown;
        fetchStoryComments(...args: unknown[]): unknown;
        setViewed(...args: unknown[]): unknown;
        clearSetViewedStatus(...args: unknown[]): unknown;
        toggleLike(...args: unknown[]): unknown;
        clearFetchSessionsStatus(...args: unknown[]): unknown;
        clearToggleLikeStatus(...args: unknown[]): unknown;
        delete(...args: unknown[]): unknown;
        clearDeleteStatus(...args: unknown[]): unknown;
        setPlayerOptInStatusAndPostWithOptInTelemetry(...args: unknown[]): unknown;
        setRealmEventsStatus(...args: unknown[]): unknown;
        setRealmCoordinatesStatus(...args: unknown[]): unknown;
        setRealmTimelineStatus(...args: unknown[]): unknown;
        setRealmTimelineRequirementStatus(...args: unknown[]): unknown;
        setRealmNotificationStatus(...args: unknown[]): unknown;
        postSettings(...args: unknown[]): unknown;
        postSettingsOnExit(...args: unknown[]): unknown;
        fetchSettings(...args: unknown[]): unknown;
        clearSettingsStatus(...args: unknown[]): unknown;
        reportToClubOwner(...args: unknown[]): unknown;
        clearReportToClubOwnerStatus(...args: unknown[]): unknown;
        reportFeedItemToXbox(...args: unknown[]): unknown;
        reportGamertagToXbox(...args: unknown[]): unknown;
        clearReportToXboxStatus(...args: unknown[]): unknown;
        openManageMembersScreen(...args: unknown[]): unknown;
    };
    "vanilla.realmsStories.persistentData": {
        newPostAvailable: boolean;
        currentMemberSortOption: number;
        currentMemberFilterOption: number;
        currentMemberSearchText: string;
        storyScreenshotSelectionFilePath: string;
        commentInProgressBody: string;
        postInProgressBody: string;
        currentStoryId: string;
    };
    "vanilla.realmsStories.players": {
        fetchOnlineMembersStatus: number;
        fetchMembersStatus: number;
        players: CoherentArrayProxy<unknown>;
    };
    "vanilla.realmsStories.realmData": {
        isHardcore: boolean;
        isFetchingRealmWorld: boolean;
        isRealmWorldValid: boolean;
        userXuid: string;
        ownerXuid: string;
        description: string;
        name: string;
    };
    "vanilla.realmsStories.settings": {
        timelineRequiredStatus: boolean;
        currentPostState: number;
        currentFetchState: number;
        realmTimelineStatus: boolean;
        realmCoordinatesStatus: boolean;
        realmEventsStatus: boolean;
        realmNotificationsStatus: boolean;
        playerOptIn: number;
        realmOptIn: number;
    };
    "vanilla.realmsStories.stories": {
        mostRecentStoriesViewed: boolean;
        pageLength: number;
        unreadStoryCount: number;
        totalStories: number;
        postStoryStatus: number;
        storiesFirstPageReady: boolean;
        storiesStatus: number;
        stories: CoherentArrayProxy<unknown>;
    };
    "vanilla.RealmsPDPFacet": {
        isRealmsTrialAvailable: boolean;
    };
    "vanilla.RealmWorldUploaderFacet": {
        choosePreviewRealm: boolean;
        uploadedRealmWorldId: number;
        uploadWorldToRealmError: null;
        uploadWorldToRealmTaskState: number;
        uploadWorldToRealm(...args: unknown[]): unknown;
        setPreviewRealmForUpload(...args: unknown[]): unknown;
        clearUploadWorldToRealmTaskState(...args: unknown[]): unknown;
    };
    "vanilla.recentlyPlayedWithList": {
        xboxAPICallResult: number;
        playerList: CoherentArrayProxy<{
            description: string;
            isFollowedByMe: boolean;
            isFollowingMe: boolean;
            isOnline: boolean;
            gamerIcon: string;
            gamertag: string;
            xuid: string;
        }>;
        isLoading: boolean;
    };
    "vanilla.recommendedFriendsList": {
        xboxAPICallResult: number;
        playerList: CoherentArrayProxy<{
            description: string;
            isFollowedByMe: boolean;
            isFollowingMe: boolean;
            isOnline: boolean;
            gamerIcon: string;
            gamertag: string;
            xuid: string;
        }>;
        isLoading: boolean;
    };
    "vanilla.resourcePackOverrides": {
        lastUpdated: number;
        definitions: CoherentArrayProxy<unknown>;
    };
    "vanilla.resourcePacks": {
        lastActivatedPackId: string;
        prompt: {
            actions: CoherentArrayProxy<unknown>;
            body: string;
            title: string;
            active: boolean;
            id: string;
            handleAction(...args: unknown[]): unknown;
        };
        availableBehaviorPacks: CoherentArrayProxy<{
            isAddon: boolean;
            hasSettings: boolean;
            isPlatformLocked: boolean;
            isMarketplaceItem: boolean;
            image: string;
            contentId: string;
            id: string;
            size: string;
            description: string;
            type: string;
            name: string;
        }>;
        activeBehaviorPacks: CoherentArrayProxy<unknown>;
        unownedTexturePacks: CoherentArrayProxy<unknown>;
        realmsTexturePacks: CoherentArrayProxy<{
            isAddon: boolean;
            hasSettings: boolean;
            isPlatformLocked: boolean;
            isMarketplaceItem: boolean;
            image: string;
            contentId: string;
            id: string;
            size: string;
            description: string;
            type: string;
            name: string;
        }>;
        globalTexturePacks: CoherentArrayProxy<unknown>;
        availableTexturePacks: CoherentArrayProxy<{
            isAddon: boolean;
            hasSettings: boolean;
            isPlatformLocked: boolean;
            isMarketplaceItem: boolean;
            image: string;
            contentId: string;
            id: string;
            size: string;
            description: string;
            type: string;
            name: string;
        }>;
        activeTexturePacks: CoherentArrayProxy<unknown>;
        importProgress: number;
        downloadProgress: number;
        marketplacePackId: string;
        resourcePackToDownload: { body: string; title: string };
        realmsSubscriber: boolean;
        realmsPlusSupported: boolean;
        status: number;
        activate(...args: unknown[]): unknown;
        deactivate(...args: unknown[]): unknown;
        showSettings(...args: unknown[]): unknown;
        cancelDownload(...args: unknown[]): unknown;
        changePackPriority(...args: unknown[]): unknown;
        clearLastActivatedPackId(...args: unknown[]): unknown;
    };
    "vanilla.screenSpecificOptions": {
        playScreenWorldLayoutMode: number;
    };
    "vanilla.screenTechStack": {
        selectTechStackForScreen(...args: unknown[]): unknown;
        getTechStackForScreen(...args: unknown[]): unknown;
        getPreferredTechStackForScreen(...args: unknown[]): unknown;
    };
    "vanilla.seedTemplates": {
        failedToFetch: boolean;
        templates: CoherentArrayProxy<{ image: string; seedValue: string; title: string }>;
        refresh(...args: unknown[]): unknown;
    };
    "vanilla.share": {
        isShareSupported: boolean;
        share(...args: unknown[]): unknown;
        shareFile(...args: unknown[]): unknown;
    };
    "vanilla.simulationDistanceOptions": {
        simulationDistanceOptions: CoherentArrayProxy<number>;
    };
    "vanilla.telemetry": {
        fireEvent(...args: unknown[]): unknown;
        fireEventButtonPressed(...args: unknown[]): unknown;
        fireEventModalShown(...args: unknown[]): unknown;
        trackOptionChanged(...args: unknown[]): unknown;
        fireEventOptionsChanged(...args: unknown[]): unknown;
        discardTrackedOptions(...args: unknown[]): unknown;
        fireEventRealmsStoriesOptIn(...args: unknown[]): unknown;
    };
    "vanilla.thirdPartyWorldList": {
        fetchThirdPartyWorldsTaskState: number;
        thirdPartyServersStatus: number;
        thirdPartyWorlds: CoherentArrayProxy<{
            msgOfTheDay: string;
            image: string;
            capacity: number;
            playerCount: number;
            pingStatus: number;
            ping: string;
            description: string;
            name: string;
            id: string;
        }>;
    };
    "vanilla.unpairedRealmsListFacet": {
        realms: CoherentArrayProxy<unknown>;
        state: number;
        compatibility: undefined;
        forceFetchUnpairedRealmsList(...args: unknown[]): unknown;
    };
    "vanilla.userAccount": {
        signInPlatformNetworkTaskResult: null;
        signInPlatformNetworkTaskState: number;
        isSignedInPlatformNetwork: boolean;
        accountUnlinkState: number;
        currentXuid: string;
        currentPlatformId: string;
        isMarketplacePassSubscriptionActive: boolean;
        isRealmsPlusSubscriptionActive: boolean;
        hasValidCrossPlatformSkin: boolean;
        isSignInInProgress: boolean;
        hasPremiumNetworkAccess: boolean;
        banExpiration: string;
        banReason: string;
        isBanned: boolean;
        userPermissions: {
            viewProfiles: { allowed: boolean; denyReasons: CoherentArrayProxy<unknown> };
            addFriends: { allowed: boolean; denyReasons: CoherentArrayProxy<unknown> };
            multiplayer: { allowed: boolean; denyReasons: CoherentArrayProxy<unknown> };
        };
        isLoggedInWithMicrosoftAccount: boolean;
        isTrialAccount: boolean;
        updateMultiplayerPrivilegeUsingSystemModal(...args: unknown[]): unknown;
        showPremiumNetworkUpsellModal(...args: unknown[]): unknown;
        signOutOfMicrosoftAccount(...args: unknown[]): unknown;
        manageMicrosoftAccount(...args: unknown[]): unknown;
        unlinkMicrosoftAccount(...args: unknown[]): unknown;
        clearAccountUnlinkState(...args: unknown[]): unknown;
        signInToPlatformNetwork(...args: unknown[]): unknown;
        resetSignInPlatformNetwork(...args: unknown[]): unknown;
    };
    "vanilla.webBrowserFacet": {
        openLink(...args: unknown[]): unknown;
        openLinkWithParams(...args: unknown[]): unknown;
    };
    "vanilla.worldCloudSyncFacet": {
        syncWorldTaskState: number;
        syncWorldResult: null;
        syncWorld(...args: unknown[]): unknown;
        clearSyncWorldTaskState(...args: unknown[]): unknown;
    };
    "vanilla.worldEditor": {
        loadWorldTaskState: number;
        loadWorldError: null;
        saveRealmsWorldTaskState: number;
        saveRealmsWorldError: null;
        saveLocalWorldTaskState: number;
        saveLocalWorldError: null;
        worldHasBeenModified: boolean;
        worldIsInitialized: boolean;
        currentWorldId: string;
        isEditorWorld: boolean;
        isAchievementsEditDisabled: boolean;
        worldSummary: { lastSaved: string; fileSize: string; worldIconPath: string };
        worldData: {
            achievementsPermanentlyDisabled: boolean;
            achievementsDisabled: boolean;
            isUsingTemplate: boolean;
            isLockedTemplate: boolean;
            betaFeatures: CoherentArrayProxy<{
                isEnabled: boolean;
                isTogglePermanentlyDisabled: boolean;
                category: number;
                description: string;
                title: string;
                id: string;
            }>;
            resourcePacks: { sharedPacksEnabled: boolean };
            cheats: {
                tickSpeed: string;
                educationEdition: boolean;
                commandBlocks: boolean;
                weather: boolean;
                entitiesDropLoot: boolean;
                mobGriefing: boolean;
                mobSpawning: boolean;
                keepInventory: boolean;
                daylightCycle: number;
                cheatsEnabled: boolean;
            };
            scriptingCoding: {
                consoleCommandsEnabled: boolean;
                codeBuilderEnabled: boolean;
            };
            multiplayer: {
                locatorBarEnabled: boolean;
                friendlyFire: boolean;
                visibleToLanPlayers: boolean;
                playerPermissions: number;
                playerAccess: number;
                generalWarningState: number;
                platformPlayerFriendsOfFriendsAccessSupported: boolean;
                platformPlayerInviteAccessSupported: boolean;
                platformPlayerAccessEnabled: boolean;
                platformPlayerAccessSupported: boolean;
                platformPlayerAccess: number;
                multiplayerGame: boolean;
                multiplayerSupported: boolean;
            };
            advanced: {
                flatWorldPreset: null;
                worldSeed: string;
                respawnRadius: string;
                immediateRespawn: boolean;
                sleepSkipNightPercent: number;
                sleepSkipNight: boolean;
                tileDrops: boolean;
                naturalRegeneration: boolean;
                mobLoot: boolean;
                respawnBlocksExplode: boolean;
                tntExplodes: boolean;
                recipesUnlock: boolean;
                firesSpreads: boolean;
                friendlyFire: boolean;
                showDaysPlayed: boolean;
                showCoordinates: boolean;
                bonusChest: boolean;
                startWithMap: boolean;
                simulationDistance: number;
                generatorType: number;
                useFlatWorld: boolean;
            };
            general: {
                difficulty: number;
                playerHasDied: boolean;
                isHardcore: boolean;
                gameMode: number;
                worldName: string;
            };
        };
        saveLocalWorld(...args: unknown[]): unknown;
        clearSaveLocalWorldTaskState(...args: unknown[]): unknown;
        saveRealmsWorld(...args: unknown[]): unknown;
        clearSaveRealmsWorld(...args: unknown[]): unknown;
        addWorld(...args: unknown[]): unknown;
        loadWorld(...args: unknown[]): unknown;
        closeWorld(...args: unknown[]): unknown;
        reloadWorld(...args: unknown[]): unknown;
    };
    "vanilla.worldOperations": {
        clearPlayerDataTaskState: number;
        startClearPlayerDataError: null;
        exportWorldStatus: number;
        exportWorldResult: null;
        makeWorldInfiniteProgress: number;
        makeWorldInfiniteState: number;
        makeWorldInfiniteError: null;
        duplicateWorldTaskState: number;
        duplicateWorldError: null;
        startDuplicateWorld(...args: unknown[]): unknown;
        clearDuplicateWorldTaskState(...args: unknown[]): unknown;
        makeWorldInfinite(...args: unknown[]): unknown;
        clearMakeWorldInfiniteState(...args: unknown[]): unknown;
        deleteWorld(...args: unknown[]): unknown;
        exportWorld(...args: unknown[]): unknown;
        exportWorldAsTemplate(...args: unknown[]): unknown;
        clearExportWorldResult(...args: unknown[]): unknown;
        clearPlayerData(...args: unknown[]): unknown;
        resetClearPlayerData(...args: unknown[]): unknown;
        saveScreenshotAsWorldIcon(...args: unknown[]): unknown;
        resetWorldIconToDefault(...args: unknown[]): unknown;
    };
    "vanilla.worldPackages": {
        lastConsultedPackSizes: string;
        lastConsultedPackSizesTaskState: number;
        lastConsultedPackSizesError: null;
        packDownloadErrorData: {
            packTitles: CoherentArrayProxy<unknown>;
            storageSpaceNeeded: string;
        };
        packDownloadStatus: number;
        packDownloadTaskState: number;
        packDownloadProgress: number;
        packDownloadName: string;
        packDownloadError: null;
        worldPacksData: {
            availableBehaviorPacks: CoherentArrayProxy<unknown>;
            activeBehaviorPacks: CoherentArrayProxy<unknown>;
            unownedTexturePacks: CoherentArrayProxy<unknown>;
            realmsTexturePacks: CoherentArrayProxy<unknown>;
            globalTexturePacks: CoherentArrayProxy<unknown>;
            availableTexturePacks: CoherentArrayProxy<unknown>;
            activeTexturePacks: CoherentArrayProxy<unknown>;
            realmsSubscriber: boolean;
            realmsPlusSupported: boolean;
        };
        isReadyForDownload: boolean;
        isInitialized: boolean;
        loadPacksData(...args: unknown[]): unknown;
        activatePack(...args: unknown[]): unknown;
        deactivatePack(...args: unknown[]): unknown;
        changePackPriority(...args: unknown[]): unknown;
        continuePackActivation(...args: unknown[]): unknown;
        continuePackDeactivation(...args: unknown[]): unknown;
        downloadPacks(...args: unknown[]): unknown;
        cancelPackDownload(...args: unknown[]): unknown;
        getPackSizes(...args: unknown[]): unknown;
        getPackSizesReset(...args: unknown[]): unknown;
    };
    "vanilla.worldStartup": {
        backupThenStartLocalWorld: {
            progress: null;
            state: number;
            result: null;
            run(...args: unknown[]): unknown;
            cancel(...args: unknown[]): unknown;
            clear(...args: unknown[]): unknown;
        };
        brokenPacksToStart: CoherentArrayProxy<unknown>;
        missingPacksSize: string;
        missingPacksToStart: CoherentArrayProxy<unknown>;
        missingTemplateToStart: string;
        hasMissingResources: boolean;
        startLocalWorldTaskState: number;
        startLocalWorldResult: null;
        startLocalWorld(...args: unknown[]): unknown;
        clearStartLocalWorldResult(...args: unknown[]): unknown;
    };
    "vanilla.worldTemplateList": {
        templates: CoherentArrayProxy<unknown>;
        customTemplates: CoherentArrayProxy<unknown>;
        premiumTemplates: CoherentArrayProxy<unknown>;
    };
    "vanilla.worldTransfer": {
        backupWorldProgress: number;
        backupWorldResult: null;
        importWorldProgress: number;
        importWorldProgressPercentage: number;
        importWorldResult: null;
        importWorld: {
            progress: null;
            state: number;
            result: null;
            run(): unknown;
            cancel(...args: unknown[]): unknown;
            clear(...args: unknown[]): unknown;
        };
        importWorld_v2(): unknown;
        resetImportWorld(...args: unknown[]): unknown;
        backupWorld(...args: unknown[]): unknown;
        resetBackupWorld(...args: unknown[]): unknown;
    };
    "vanilla.friendworldlist": {
        friendWorlds: CoherentArrayProxy<{
            friendOfFriendWorld: boolean;
            capacity: number;
            playerCount: number;
            isHardcore: boolean;
            gameMode: number;
            ownerId: string;
            ownerName: string;
            name: string;
            id: string;
        }>;
    };
    "vanilla.offerRepository": {
        plusSubscriptionPrice: string;
        coreSubscriptionPrice: string;
        plusSubscriptionTermsExtra: string;
        plusSubscriptionTerms: string;
        coreSubscriptionTermsExtra: string;
        coreSubscriptionTerms: string;
        isRealmsPlusOfferAvailable: boolean;
        isRealmsCoreOfferAvailable: boolean;
        isRealmsTrialOfferAvailable: boolean;
        isFinishedQueryingProductsAndPurchases: boolean;
    };
    "vanilla.realmsSettingsFacet": {
        openRealm(...args: unknown[]): unknown;
        closeRealm(...args: unknown[]): unknown;
    };
}

const JoinRealmsServerError = {
    RealmsAPIUnavailable: 0,
    AlreadyMember: 1,
    RealmExpired: 2,
    RealmClosed: 3,
    BadInvite: 4,
    BlockedInvite: 5,
    InviteLinkNotFound: 6,
    UnexpectedServerResponse: 7,
    AnonymousAccount: 8,
} as const;
type JoinRealmsServerError = ConstNumberObjectEnumToEnumMappingType<typeof JoinRealmsServerError>;
const ScreenType = {
    TV_SCREEN_TYPE: 0,
    DESKTOP_SCREEN_TYPE: 1,
    HANDHELD_SCREEN_TYPE: 2,
    VR_SCREEN_TYPE: 3,
} as const;
type ScreenType = ConstNumberObjectEnumToEnumMappingType<typeof ScreenType>;

const HandheldDeviceType = { PHONE: 0, TABLET: 1 } as const;
type HandheldDeviceType = ConstNumberObjectEnumToEnumMappingType<typeof HandheldDeviceType>;
const InputMethod = {
    GAMEPAD: 0,
    TOUCH: 1,
    MOUSE: 2,
    MOTION: 3,
    KEYBOARD: 4,
} as const;
type InputMethod = ConstNumberObjectEnumToEnumMappingType<typeof InputMethod>;

const ARVRPlatform = {
    ARVR_None: 0,
    ARVR_Rift: 1,
    ARVR_Holographic: 2,
    ARVR_WindowsMR: 3,
    ARVR_PSVR: 4,
    ARVR_GearVR: 5,
    ARVR_DesktopXR: 6,
} as const;
type ARVRPlatform = ConstNumberObjectEnumToEnumMappingType<typeof ARVRPlatform>;

const Platform = {
    IOS: 0,
    GOOGLE: 1,
    AMAZON_HANDHELD: 2,
    UWP: 3,
    XBOX: 4,
    NX_HANDHELD: 5,
    PS4: 6,
    GEARVR: 7,
    WIN32: 8,
    MACOS: 9,
    AMAZON_TV: 10,
    NX_TV: 11,
    PS5: 12,
} as const;
type Platform = ConstNumberObjectEnumToEnumMappingType<typeof Platform>;

const Controller = {
    XBOX: 0,
    PS: 1,
    STEAM: 2,
    SWITCH: 3,
    QUEST: 4,
} as const;
type Controller = ConstNumberObjectEnumToEnumMappingType<typeof Controller>;

const StorageType = {
    NONE: 0,
    EXTERNAL: 1,
    APPDATA: 2,
} as const;
type StorageType = ConstNumberObjectEnumToEnumMappingType<typeof StorageType>;

const RealmPlayerRoleEnum = {
    NONMEMBER: -1,
    VISITOR: 0,
    MEMBER: 1,
    OPERATOR: 2,
    OWNER: 3,
} as const;
type RealmPlayerRoleEnum = ConstNumberObjectEnumToEnumMappingType<typeof RealmPlayerRoleEnum>;
