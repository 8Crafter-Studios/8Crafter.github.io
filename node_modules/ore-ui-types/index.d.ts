import type {
    ARVRPlatform,
    FriendFavoriteStatus,
    InputMethod,
    JoinRealmsServerError,
    KeyboardType,
    LeaveRealmsServerError,
    Platform,
    PlayerPermissionLevel,
    PlayerRelation,
    StorageType,
    VanillaGameplayContainerChestType,
    VanillaGameplayContainerItemType,
    VanillaGameplayUIProfile,
} from "@ore-ui-types/enums";

declare global {
    namespace globalThis {
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
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: [unknown, ...unknown[]]): unknown;
                };
                updateString: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: [unknown, ...unknown[]]): unknown;
                };
                updateOption: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: [unknown, ...unknown[]]): unknown;
                };
                updateBoolean: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: [unknown, ...unknown[]]): unknown;
                };
            };
            vanilla_menus_invoke_action_settings: {
                invokeAction: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: [unknown, ...unknown[]]): unknown;
                };
            };
            coreStorageCommandGroup: {
                changeStorage: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: [unknown, ...unknown[]]): unknown;
                };
            };
            soundCommandGroup: {
                isPlaying: {
                    id: number;
                    callable: FacetTypeMap["core.sound"]["isPlaying"];
                };
                fadeOut: {
                    id: number;
                    callable: FacetTypeMap["core.sound"]["fadeOut"];
                };
                play: {
                    id: number;
                    callable: FacetTypeMap["core.sound"]["play"];
                };
            };
            coreTranslateCommandGroup: {
                translate: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: [unknown, ...unknown[]]): unknown;
                };
            };
            routerCommandGroup: {
                go: {
                    id: number;
                    callable: FacetTypeMap["core.router"]["history"]["go"];
                };
                back: {
                    id: number;
                    callable: FacetTypeMap["core.router"]["history"]["goBack"];
                };
                replace: {
                    id: number;
                    callable: FacetTypeMap["core.router"]["history"]["replace"];
                };
                push: {
                    id: number;
                    callable: FacetTypeMap["core.router"]["history"]["push"];
                };
            };
            vanillaGameplayRecipeBookFilteringCommandGroup: {
                setRecipeBookFiltering: {
                    id: number;
                    callable(enabled: boolean): null;
                };
            };
            vanillaGameplayTradeCommandGroup: {
                performAutoTrade: {
                    id: number;
                    callable(tradeTier: number, tradeIndex: number): null;
                };
                pullInIngredientsForSelectedTrade: {
                    id: number;
                    callable(): null;
                };
                selectTrade: {
                    id: number;
                    callable(tradeTier: number, tradeIndex: number): null;
                };
            };
            vanillaGameplayRecipeBookSearchStringCommandGroup: {
                setRecipeBookSearchString: {
                    id: number;
                    callable(searchString: string): null;
                };
            };
            vanillaGameplayAnvilCommandGroup: {
                setPreviewItemName: {
                    id: number;
                    callable(itemName: string): null;
                };
            };
            coreHapticsCommandGroup: {
                vibrate: {
                    id: number;
                    callable(duration: number): null;
                };
            };
            vanillaGameplayContainerCommandGroup: {
                autoCraftAllItemsFromRecipe: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): unknown;
                };
                autoCraftOneItemFromRecipe: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): unknown;
                };
                selectRecipe: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): unknown;
                };
                setDistributeAllSource: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): unknown;
                };
                splitSingleItem: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: [number, number, number, number]): unknown;
                };
                splitMultipleItems: {
                    id: number;
                    callable(containerIDA: number, slotIndexA: number, containerIDB: number, slotIndexB: number): null;
                };
                autoPlaceItems: {
                    id: number;
                    callable(containerID: number, slotIndex: number): null;
                };
                coalesceOrAutoPlaceItems: {
                    id: number;
                    callable(containerID: number, slotIndex: number): null;
                };
                coalesceItems: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): unknown;
                };
                dropOneItem: {
                    id: number;
                    callable(containerID: number, slotIndex: number): null;
                };
                dropAllItems: {
                    id: number;
                    callable(containerID: number, slotIndex: number): null;
                };
                placeAmountOfItems: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): unknown;
                };
                placeOneItem: {
                    id: number;
                    callable(fromContainerID: number, fromSlotIndex: number, toContainerID: number, toSlotIndex: number): null;
                };
                placeAllItems: {
                    id: number;
                    callable(fromContainerID: number, fromSlotIndex: number, toContainerID: number, toSlotIndex: number): null;
                };
                takeHalfItems: {
                    id: number;
                    callable(destinationContainerID: number, destinationSlotIndex: number, sourceContainerID: number, sourceSlotIndex: number): null;
                };
                takeOneItem: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): unknown;
                };
                takeAllItems: {
                    id: number;
                    callable(destinationContainerID: number, destinationSlotIndex: number, sourceContainerID: number, sourceSlotIndex: number): null;
                };
                closeContainer: {
                    id: number;
                    callable(): null;
                };
            };
            vanilla_partyChatCommandGroup: {
                sendComposedMessage: {
                    id: number;
                    callable(): null;
                };
                setComposedMessage: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): unknown;
                };
                setIsOpen: {
                    id: number;
                    callable(isOpen: boolean): void;
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

        interface Engine {
            /**
             * Adds an event listener.
             *
             * @param name The name of the event.
             * @param callback The callback function.
             * @param context The context to bind the callback to.
             * @returns An object with a clear method that can be used to remove the event listener.
             *
             * @description
             * This is the code of the function:
             * ```ts
             * if (!callback) {
             *     console.error("No handler specified for engine.on");
             *     return { clear: function() {} };
             * }
             * engine.AddOrRemoveOnHandler(name, callback, context || engine);
             * return { clear: this._createClear(this, name, callback, context) };
            ```
             */
            on<T extends EngineEventID>(
                name: T,
                callback: (...args: EngineEvent<EngineEventID extends T ? undefined : T>) => void,
                context?: unknown
            ): {
                clear(): void;
            };
            /**
             * Removes an event listener.
             *
             * @param name The name of the event.
             * @param handler The callback function.
             * @param context The context to bind the callback to.
             *
             * @description
             * This is the code of the function:
             * ```ts
             * var handlers = this.events[name];

             * if (handlers !== undefined) {
             *     context = context || this;

             *     var index;
             *     var length = handlers.length;
             *     for (index = 0; index < length; ++index) {
             *         var reg = handlers[index];
             *         if (reg.code == handler && reg.context == context) {
             *             break;
             *         }
             *     }
             *     if (index < length) {
             *         handlers.splice(index, 1);
             *         if (handlers.length === 0) {
             *             delete this.events[name];
             *         }
             *     }
             * }
             * else {
             *     engine.RemoveOnHandler(name, handler, context || this);
             * }
             * ```
             */
            off<T extends EngineEventID>(name: T, handler: (...args: EngineEvent<EngineEventID extends T ? undefined : T>) => void, context?: unknown): void;
            /**
             * Triggers an event.
             *
             * @param name The name of the event.
             * @param args The arguments to pass to the event.
             *
             * @description
             * This is the code of the function:
             * ```ts
             * if (!this._trigger.apply(this, arguments)) {
             *     this.TriggerEvent.apply(this, arguments);
             * }
             * ```
             */
            trigger<T extends EngineEventID>(name: T, ...args: EngineEvent<EngineEventID extends T ? undefined : T>): void;
            TriggerEvent(...args: unknown[]): unknown;
            SendMessage(...args: [unknown, requestId: number, ...unknown[]]): unknown;
            BindingsReady(...args: unknown[]): unknown;
            AddOrRemoveOnHandler(...args: unknown[]): unknown;
            RemoveOnHandler(...args: unknown[]): unknown;
            enableImmediateLayout(...args: unknown[]): unknown;
            isImmediateLayoutEnabled(...args: unknown[]): unknown;
            executeImmediateLayoutSync(...args: unknown[]): unknown;
            createJSModel(...args: unknown[]): unknown;
            unregisterModel(...args: unknown[]): unknown;
            updateWholeModel(...args: unknown[]): unknown;
            synchronizeModels(...args: unknown[]): unknown;
            createVirtualList(...args: unknown[]): unknown;
            registerBindingAttribute(...args: unknown[]): unknown;
            addDataBindEventListner(...args: unknown[]): unknown;
            removeDataBindEventListner(...args: unknown[]): unknown;
            translate(...args: unknown[]): unknown;
            reloadLocalization(...args: unknown[]): unknown;
            setInspectorInitatorsUpperBound(...args: unknown[]): unknown;
            isAttached: boolean;
            events: Record<PropertyKey, unknown>;
            _createClear<T extends EngineEventID>(
                object: Pick<typeof engine, "events">,
                name: T,
                handler?: (...args: EngineEvent<T>) => void,
                context?: unknown
            ): () => void;
            whenReady: Promise<unknown>;
            _trigger<T extends EngineEventID>(name: T): boolean;
            mock(...args: unknown[]): unknown;
            _BindingsReady: boolean;
            _WindowLoaded: boolean;
            _RequestId: 0;
            _ActiveRequests: {
                [id: number]: {
                    resolve: (value: unknown) => void;
                    reject: (reason?: any) => void;
                };
            };
            call(
                ...args: [
                    Parameters<NonNullable<(typeof engine)["SendMessage"]>>[0],
                    ...RemoveFirstNElements<Parameters<NonNullable<(typeof engine)["SendMessage"]>>, 2>
                ]
            ): Promise<unknown>;
            _Result(requestId: number, ...resultArguments: Parameters<NonNullable<typeof engine._ActiveRequests>[number]["resolve"]>): void;
            _Reject(requestId: number): void;
            _ForEachError<T extends { first: unknown; second: unknown }[]>(
                errors: T,
                callback: (...args: { [key in keyof T]: [T[key]["first"], T[key]["second"]] }[number]) => void
            ): void;
            /**
             * This runs {@link engine.trigger} with the following arguments: `["Error", message]`.
             */
            _TriggerError(message: Parameters<typeof engine.trigger<"Error">>[1]): void;
            /**
             *
             * @template T
             * @param requestId If `null` or `0` this will run {@link engine._ForEachError}, otherwise it will trigger reject on the sepcified request.
             * @param errors
             * @throws {T[0]["second"]}
             *
             * @example
             * ```ts
             * engine._OnError(1, [{first: 1, second: "error"}]);
             * // This does the following:
             * var deferred = engine._ActiveRequests[requestId];
             * delete engine._ActiveRequests[requestId];
             * deferred.reject(new Error(errors[0].second));
             * throw new Error(errors[0].second);
             * ```
             *
             * @example
             * ```ts
             * engine._OnError(null, [{first: 1, second: "error"}]);
             * // This does the following:
             * engine._ForEachError(errors, engine._TriggerError);
             * throw new Error(errors[0].second);
             * ```
             */
            _OnError<T extends { first: unknown; second: unknown }[]>(requestId: null | number, errors: T): void;
            /**
             * Marks the engine as ready.
             *
             * @description
             * This function does the following:
             * 1. Sets {@link engine._BindingsReady} to `true`.
             * 2. If {@link engine._WindowLoaded} is `true` it will run {@link engine.trigger} with the following arguments: `["Ready"]`.
             */
            _OnReady(): void;
            /**
             * Marks the window as loaded.
             *
             * @description
             * This function does the following:
             * 1. Sets {@link engine._WindowLoaded} to `true`.
             * 2. If {@link engine._BindingsReady} is `true` it will run {@link engine.trigger} with the following arguments: `["Ready"]`.
             */
            _OnWindowLoaded(): void;
            dependency: WeakMap<unknown & WeakKey, unknown[]>;
            hasAttachedUpdateListner: boolean;
            /**
             * Updates all models that depend on the specified model.
             *
             * @param object They key of the dependency in the {@link engine.dependency} map.
             *
             * @description
             * This function does the following:
             * 1. Gets the dependencies of the specified model.
             * 2. For each dependency it will run {@link engine.updateWholeModel}.
             *
             * @example
             * ```ts
             * engine.onUpdateWholeModel(object);
             * // This does the following:
             * let deps = engine.dependency.get(object) || [];
             * deps.forEach((dep) => engine.updateWholeModel(dep));
             * ```
             */
            onUpdateWholeModel(object: unknown & WeakKey): void;
            /**
             * Creates a model that updates all models that depend on it.
             *
             * @param observableName The name of the model.
             *
             * @description
             * This function does the following:
             * 1. Creates a model with the specified name.
             * 2. Creates a proxy for the model.
             * 3. Sets the `set` method of the proxy to update all models that depend on the specified model.
             *
             * @example
             * ```ts
             * engine.createObservableModel("object");
             * // This does the following:
             * // observableName = "object"
             * engine.createJSModel(observableName, new Proxy({}, {
             *     set: (target, prop, value) => {
             *         engine.updateWholeModel(window[observableName]);
             *         target[prop] = value;
             *     }
             * }));
             * ```
             */
            createObservableModel(observableName: unknown & PropertyKey): void;
            /**
             * Adds a dependency to a model.
             *
             * @param first The value used as the key of the dependency in the {@link engine.dependency} map.
             * @param second The value to be pushed to the array that is stored under the {@link first} key in the {@link engine.dependency} map.
             *
             * @description
             * This function does the following:
             * 1. If the {@link engine.dependency} map has not been created it will create it.
             * 2. Gets the array that is stored under the {@link first} key in the {@link engine.dependency} map.
             * 3. Pushes the {@link second} value to the array.
             *
             * @example
             * ```ts
             * engine.addSynchronizationDependency(first, second);
             * // This does the following:
             * if (!engine.hasAttachedUpdateListner) {
             *     // will attach updateWholeModel callback for when there are one or more model dependencies
             *     engine.addDataBindEventListner("updateWholeModel", engine.onUpdateWholeModel);
             *     engine.hasAttachedUpdateListner = true;
             * }
             * let deps = engine.dependency.get(first);
             * if (!deps) {
             *     deps = [];
             *     engine.dependency.set(first, deps);
             * }
             * deps.push(second);
             * ```
             */
            addSynchronizationDependency(
                first: NonNullable<typeof engine.dependency> extends WeakMap<infer K, any> ? K : never,
                second: NonNullable<typeof engine.dependency> extends WeakMap<any, infer V> ? V : never
            ): void;
            /**
             * Removes a dependency from a model.
             *
             * @param first The value used as the key of the dependency in the {@link engine.dependency} map.
             * @param second The value to be removed from the array that is stored under the {@link first} key in the {@link engine.dependency} map.
             *
             * @description
             * This function does the following:
             * 1. Gets the array that is stored under the {@link first} key in the {@link engine.dependency} map.
             * 2. Removes the {@link second} value from the array.
             *
             * @example
             * ```ts
             * engine.removeSynchronizationDependency(first, second);
             * // This does the following:
             * let deps = engine.dependency.get(first) || [];
             * deps.splice(deps.indexOf(second), 1);
             * ```
             */
            removeSynchronizationDependency(
                first: NonNullable<typeof engine.dependency> extends WeakMap<infer K, any> ? K : never,
                second: NonNullable<typeof engine.dependency> extends WeakMap<any, infer V> ? V : never
            ): void;
            _Initialized: boolean;
            // TODO: Fill in the rest of the engine properties.
            [otherProperties: PropertyKey]: unknown;
        }
        var engine: Engine;

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
            | `query:subscribed/${number}`
            | `query:updated/${number}`
            | `query:subscribe/${keyof EngineQuerySubscribeEventParamsMap}`
            | "query:unsubscribe"
            | "core:routing:not-found"
            | "core:telemetry:eventfulNavigation"
            | "core:telemetry:firstMeaningfulPaint"
            | "core:telemetry:firstContentfulPaint"
            | "Ready"
        >;
        type EngineEvent<T extends EngineEventID | undefined> = T extends "facet:request" | "facet:discard"
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
            ? [
                  // Horizontal values are positive towards the right, vertical values are positive towards the bottom.
                  joystickLeftHorizontal: number,
                  joystickLeftVertical: number,
                  joystickRightHorizontal: number,
                  joystickRightVertical: number
              ]
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
            : T extends `query:subscribed/${infer _QueryID extends number}`
            ? [...args: any[]] // TODO: Figure out the type of this.
            : T extends `query:updated/${infer _QueryID extends number}`
            ? [...args: any[]] // TODO: Figure out the type of this.
            : T extends `query:subscribe/${infer QueryName}`
            ? [
                  queryID: number,
                  ...queryParams: QueryName extends keyof EngineQuerySubscribeEventParamsMap ? EngineQuerySubscribeEventParamsMap[QueryName] : unknown[]
              ]
            : T extends "query:unsubscribe"
            ? [queryName: unknown] // TODO: Figure out the type of this.
            : T extends "core:telemetry:eventfulNavigation" | "core:telemetry:firstMeaningfulPaint" | "core:telemetry:firstContentfulPaint" | "Ready"
            ? []
            : [...args: unknown[]];
        interface EngineQuerySubscribeEventParamsMap {
            "vanilla.core.dataDrivenUICompositionQuery": [
                screenID: LooseAutocomplete<
                    | "minecraft:default_chest_screen"
                    | "minecraft:chest_screen"
                    | "minecraft:barrel_screen"
                    | "minecraft:ender_chest_screen"
                    | "minecraft:shulker_box_screen"
                >
            ];
            "vanilla.gameplay.furnace": [];
            /**
             * @todo Figure out the purposes for the parameters of this query event.
             */
            vanillaGameplayContainerSizeQuery: [conatinerID: number];
            /**
             * @todo Figure out the purposes for the parameters of this query event.
             */
            vanillaGameplayContainerItemQuery: [containerID: number, slotIndex: number];
            vanillaGameplayContainerNameQuery: [];
            vanillaGameplayContainerChestTypeQuery: [];
            vanillaGameplayRecipeBookSearchStringQuery: [];
            vanillaGameplayRecipeBookFilteringQuery: [];
            vanillaGameplayUIProfile: [];
            vanillaGameplayAnvilQuery: [];
            vanillaGameplayTradeOverviewQuery: [];
            vanillaGameplayTradeTierQuery: [tradeTier: number];
            vanillaGameplayTradeOfferQuery: [tradeTier: number, tradeIndex: number];
        }
        interface EngineQueryNonFacetResultMap {
            "vanilla.core.dataDrivenUICompositionQuery": {
                __Type: `vanilla.core.dataDrivenUICompositionQuery$_$${number}`;
                /**
                 * The data of this UI definition.
                 */
                children: Record<string, any>;
            };
            "vanilla.gameplay.furnace": {
                __Type: `vanilla.gameplay.furnace$_$${number}`;
                litProgress: number;
                burnProgress: number;
            };
            vanillaGameplayContainerSizeQuery: {
                /**
                 * The type of this query.
                 *
                 * The number at the end of this value is the index of this query (each time there is a query, this value seems to go up).
                 */
                __Type: `vanillaGameplayContainerSizeQuery$_$${number}`;
                size: number;
            };
            vanillaGameplayContainerItemQuery: {
                __Type: `vanillaGameplayContainerItemQuery$_$${number}`;
                amount: number;
                name: string;
                image: string;
                hasDamageValue: boolean;
                maxDamage: number;
                damageValue: number;
                /**
                 * @see {@link VanillaGameplayContainerItemType}
                 */
                containerItemType: VanillaGameplayContainerItemType<"values">;
            };
            vanillaGameplayContainerNameQuery: {
                __Type: `vanillaGameplayContainerNameQuery$_$${number}`;
                name: string;
            };
            vanillaGameplayContainerChestTypeQuery: {
                __Type: `vanillaGameplayContainerChestTypeQuery$_$${number}`;
                /**
                 * @see {@link VanillaGameplayContainerChestType}
                 */
                chestType: null | VanillaGameplayContainerChestType<"values">;
            };
            vanillaGameplayRecipeBookSearchStringQuery: {
                __Type: `vanillaGameplayRecipeBookSearchStringQuery$_$${number}`;
                searchString: string;
            };
            vanillaGameplayRecipeBookFilteringQuery: {
                __Type: `vanillaGameplayRecipeBookFilteringQuery$_$${number}`;
                isFiltering: boolean;
            };
            vanillaGameplayUIProfile: {
                __Type: `vanillaGameplayUIProfile$_$${number}`;
                /**
                 * @see {@link VanillaGameplayUIProfile}
                 */
                uiProfile: VanillaGameplayUIProfile<"values">;
            };
            vanillaGameplayAnvilQuery: {
                __Type: `vanillaGameplayAnvilQuery$_$${number}`;
                costText: string;
                shouldCrossOutIconBeVisible: boolean;
                previewItemName: string;
                hasInputItem: boolean;
                damageState: number; // TODO: MAKE ENUM
            };
            vanillaGameplayTradeOverviewQuery: {
                __Type: `vanillaGameplayTradeOverviewQuery$_$${number}`;
                isExperienceBarVisible: boolean;
                experienceProgress: number;
                experiencePossibleProgress: number;
                traderName: string;
                tradeTiers: number;
            };
            vanillaGameplayTradeTierQuery: {
                __Type: `vanillaGameplayTradeTierQuery$_$${number}`;
                tierName: string;
                isTierVisible: boolean;
                isTierUnlocked: boolean;
                tradeOffers: number;
            };
            vanillaGameplayTradeOfferQuery: {
                __Type: `vanillaGameplayTradeOfferQuery$_$${number}`;
                isOutOfUses: boolean;
                buyAItemName: string;
                buyBItemName: string;
                sellItemName: string;
                buyAItemAmount: number;
                buyBItemAmount: number;
                sellItemAmount: number;
                buyAItemImage: string;
                buyBItemImage: string;
                sellItemImage: string;
                hasSecondaryBuyItem: boolean;
                playerHasItemsForTrade: boolean;
                isSelectedTrade: boolean;
            };
        }
        type EngineQueryResult<T extends LooseAutocomplete<FacetList[number] | keyof EngineQueryNonFacetResultMap>> = T extends FacetList[number]
            ? FacetTypeMap[T] & {
                  __Type: `${T}$_$${number}`;
              }
            : T extends keyof EngineQueryNonFacetResultMap
            ? EngineQueryNonFacetResultMap[T]
            : {
                  __Type: `${T}$_$${number}`;
                  [key: PropertyKey]: unknown;
              };

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
            "vanilla.newPlayerChoices",

            // Found in 1.21.130.26 Preview (but may have existed before that).
            "vanilla.realmsRolesAndPermissionsQueries",
            "vanilla.realmsRolesAndPermissionsCommands",
            "vanilla.realmsPlayerListQueries",
            "vanilla.realmsPlayerListCommands",

            // Editor mode only facets (crashes the game when not in editor mode).
            editorModeOnly: "vanilla.editorLogging", // Crashes the game in the v1.21.110.23 preview when not in editor mode.
            editorModeOnly: "vanilla.editorBlockPalette", // Crashes the game when not in editor mode.
            editorModeOnly: "vanilla.editorInputBinding", // Crashes the game when not in editor mode.
            editorModeOnly: "vanilla.editorInputState", // Crashes the game when not in editor mode.
            editorModeOnly: "vanilla.editorProjectConstants", // Crashes the game when not in editor mode.
            editorModeOnly: "vanilla.editorStructure", // Crashes the game when not in editor mode.
            editorModeOnly: "vanilla.editorTutorial" // Crashes the game when not in editor mode.
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
                scalingModeOverride: LooseAutocomplete<"legacy">;
            };
            "core.deviceInformation": {
                activeMultiplayerServiceIds: CoherentArrayProxy<number>;
                changeStorageTask: number;
                /**
                 * @see {@link StorageType}
                 */
                storageType: StorageType<"values">;
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
                /**
                 * @see {@link InputMethod}
                 */
                inputMethods: CoherentArrayProxy<InputMethod<"values">>;
                /**
                 * @see {@link ARVRPlatform}
                 *
                 * @deprecated This was removed in 1.21.80 with the removal of VR support.
                 */
                arvrPlatform?: ARVRPlatform<"values">;
                /**
                 * @see {@link Platform}
                 */
                platform: Platform<"values">;
            };
            "core.featureFlags": {
                flags: CoherentArrayProxy<string>;
            };
            "core.input": {
                /**
                 * @see {@link KeyboardType}
                 */
                keyboardType: KeyboardType<"values">;
                enableControllerHints: boolean;
                /**
                 * @see {@link InputMethod}
                 */
                currentInputType: InputMethod<"values">;
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
            /**
             * NOTE: Not present in 1.21.120.4 (may exist in dev builds).
             */
            "core.performanceFacet": unknown; // TODO: Get the type for this facet.
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
                    /**
                     * The length of the history stack.
                     */
                    length?: number;
                    /**
                     * The last action performed on the history stack.
                     */
                    action?: LooseAutocomplete<"REPLACE" | "PUSH" | "POP">;
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
                /**
                 * @todo Figure out the types for this method.
                 */
                read(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clear(...args: unknown[]): unknown;
            };
            "core.splitScreen": {
                splitScreenDirection: number;
                numActivePlayers: number;
                splitScreenPosition: number;
                isPrimaryUser: boolean;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "core.social": unknown; // TODO: Get the type for this facet.
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
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "core.user": unknown; // TODO: Get the type for this facet.
            /**
             * @deprecated This has been removed.
             */
            "core.vrMode": unknown; // TODO: Get the type for this facet. // Found in dev build file.
            "vanilla.achievements": {
                data: PlayerAchievementData;
                status: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                setTrackedStatus(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.achievementsReward": unknown; // TODO: Get the type for this facet.
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
            "vanilla.createNewWorld": {
                applyTemplateTaskState: number; // TODO: MAKE ENUM
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
                        category: number; // TODO: MAKE ENUM
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
                        daylightCycle: number; // TODO: MAKE ENUM
                        cheatsEnabled: boolean;
                    };
                    scriptingCoding?: {
                        consoleCommandsEnabled: boolean;
                        codeBuilderEnabled: boolean;
                    };
                    multiplayer: {
                        locatorBarEnabled: boolean;
                        friendlyFire: boolean;
                        visibleToLanPlayers: boolean;
                        playerPermissions: number; // TODO: MAKE ENUM
                        playerAccess: number; // TODO: MAKE ENUM
                        generalWarningState: number; // TODO: MAKE ENUM
                        platformPlayerFriendsOfFriendsAccessSupported: boolean;
                        platformPlayerInviteAccessSupported: boolean;
                        platformPlayerAccessEnabled: boolean;
                        platformPlayerAccessSupported: boolean;
                        platformPlayerAccess: number; // TODO: MAKE ENUM
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
                        generatorType: number; // TODO: MAKE ENUM
                        useFlatWorld: boolean;
                    };
                    general: {
                        difficulty: number; // TODO: MAKE ENUM
                        playerHasDied: boolean;
                        isHardcore: boolean;
                        gameMode: number; // TODO: MAKE ENUM
                        worldName: string;
                    };
                };
                worldPreviewImagePath: string;
                createOnRealmsError: null | number; // TODO: MAKE ENUM
                createWorldError: null | number; // TODO: MAKE ENUM
                isCreatingWorld: boolean;
                isEditorWorld: boolean;
                isRandomSeedAllowed: boolean;
                checkDlcError: string;
                inputError: string;
                /**
                 * @todo Figure out the types for this method.
                 */
                createWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                createOnRealms(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearErrors(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                applyTemplate(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                selectRealmToCreateOn(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                createWorldOnPreviewRealm(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                unlockTemplateSettings(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                checkIfUserHasChangedSettings(...args: unknown[]): unknown;
            };
            "vanilla.createPreviewRealmFacet": {
                createPreviewRealmFromSubscriptionResult: null | number; // TODO: MAKE ENUM
                createPreviewRealmFromSubscriptionTaskState: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                createPreviewRealmFromSubscriptionId(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                activateNewPreviewRealm(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reset(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                getCreatedPreviewRealmId(...args: unknown[]): unknown;
            };
            "vanilla.debugSettings": {
                allBiomes: CoherentArrayProxy<{
                    dimension: number;
                    id: number;
                    label: string;
                }>;
                isBiomeOverrideActive: boolean;
                biomeOverrideId: number;
                defaultSpawnBiome: boolean;
                spawnBiomeId: number;
                spawnDimensionId: number;
                gameVersionOverride: string;
                enableGameVersionOverride: boolean;
                flatNether: boolean;
            };
            /**
             * This CAN be used outside of editor mode.
             */
            "vanilla.editor": {
                canShowModeShortcutToast: boolean;
                editorMode: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                openPauseMenu(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                shouldDisplayReloadModal(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                resizeViewport(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                onViewportFocusAreaResized(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                openConsole(...args: unknown[]): unknown;
                /**
                 * Opens whatever URI is passed into it (no restrictions).
                 *
                 * @param {string} uri The URI to open.
                 * @returns {null} Returns `null`.
                 */
                navigateUri(uri: string): null;
                /**
                 * @todo Figure out the types for this method.
                 */
                getCursorBlockName(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.editorInput": unknown; // TODO: Get the type for this facet.
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             */
            "vanilla.editorLogging": unknown; // TODO: Get the type for this facet.
            "vanilla.editorScripting": {
                /**
                 * @todo Figure out the types for this method.
                 */
                sendMessage(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                dispatchDataStoreEvent(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reload(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                attachDebugger(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                addCleanupMessage(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                getMouseRayCastActionPayload(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.editorSelectionFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.editorSettings": {
                selectedOperator: number;
                selectedTool: string;
                isEditorMode: boolean;
                themesMap: Partial<
                    Record<
                        LooseAutocomplete<
                            | "minecraft:editor:theme:dark"
                            | "minecraft:editor:theme:light"
                            | "minecraft:editor:theme:redstone"
                            | "minecraft:editor:theme:high_contrast"
                            | "andexdb:editor:theme:8CrafterServerUtilitiesTheme"
                        >,
                        {
                            colorProps: Partial<
                                Record<
                                    LooseAutocomplete<
                                        | "SecondaryBackground3"
                                        | "TitleBarBackground"
                                        | "ElementBorder"
                                        | "PanelBackground"
                                        | "Caret"
                                        | "PrimaryMute"
                                        | "HeaderBackground"
                                        | "CursorVolumeBorder"
                                        | "Confirm2"
                                        | "PrimaryActive"
                                        | "PlacementVolumeFill"
                                        | "PanelBorder"
                                        | "PrimaryDefault"
                                        | "DisableBackground"
                                        | "FocusOutline"
                                        | "PrimaryDisable"
                                        | "CoordinateControlX"
                                        | "Coordinate3"
                                        | "PrimaryBackground1"
                                        | "HotbarOutline"
                                        | "PrimaryBackground2"
                                        | "Coordinate1"
                                        | "PrimaryBackground3"
                                        | "PrefillVolumeBorder"
                                        | "PrimaryBackground4"
                                        | "SecondaryActive"
                                        | "SecondaryDefault"
                                        | "PrefillVolumeFill"
                                        | "DisableText"
                                        | "SecondaryMute"
                                        | "SecondaryDisable"
                                        | "SecondaryBackground1"
                                        | "Error"
                                        | "SecondaryBackground2"
                                        | "DropDown1"
                                        | "ConfirmFill"
                                        | "DropDown2"
                                        | "DropDown3"
                                        | "SelectionVolumeBorder"
                                        | "Destroy2"
                                        | "ScrollBar"
                                        | "ViewportOutline"
                                        | "FocusErrorOutline"
                                        | "CoordinateControlY"
                                        | "Coordinate2"
                                        | "Warning"
                                        | "DisableOutline"
                                        | "DisableFill"
                                        | "Info3"
                                        | "Confirm1"
                                        | "Info1"
                                        | "Confirm3"
                                        | "DestroyFill"
                                        | "Destroy1"
                                        | "Destroy3"
                                        | "InfoFill"
                                        | "Info2"
                                        | "PlacementVolumeBorder"
                                        | "CursorVolumeFill"
                                        | "SelectionVolumeFill"
                                        | "SelectionVolumeOutlineBorder"
                                        | "SelectionVolumeOutlineFill"
                                        | "ControlsGeneralFill"
                                        | "ControlsGeneralHighlight"
                                        | "CoordinateControlZ"
                                    >,
                                    { [channel in "alpha" | "blue" | "green" | "red"]: number }
                                >
                            >;
                            sourceThemeId: string;
                            isMutatable: boolean;
                            name: string;
                            id: string;
                        }
                    >
                >;
                fontZoom: number;
                currentThemeId: string;
                /**
                 * @todo Figure out the types for this method.
                 */
                addNewTheme(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                updateThemeColor(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                deleteTheme(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                getKey(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setKey(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setKeys(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                hasKey(...args: unknown[]): unknown;
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
                    id: `${number}`;
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
                /**
                 * @todo Figure out the types for this method.
                 */
                userControlledUpdateGameList(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.friendsManagerFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.gameplay.activeLevelHardcoreMode": {
                isHardcoreMode: null | boolean;
            };
            "vanilla.gameplay.bedtime": {
                canChangeSleepSettings: boolean;
                isAbleToSleep: boolean;
                remotePlayersCount: number;
                chatAvailability: number; // TODO: MAKE ENUM
                requiredSleepingPlayerCount: number;
                sleepingPlayerCount: number;
                /**
                 * @todo Figure out the types for this method.
                 */
                wakeUp(...args: unknown[]): unknown;
            };
            /**
             * @see {@link __commands__.vanillaGameplayContainerCommandGroup.closeContainer | \_\_commands\_\_.vanillaGameplayContainerCommandGroup.closeContainer}
             *
             * @deprecated This has been removed in 1.21.120.4 and replaced with the new commands system.
             */
            "vanilla.gameplay.closeContainerCommand": unknown; // TODO: Get the type for this facet.
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.gameplay.containerBlockActorType": unknown; // TODO: Get the type for this facet.
            /**
             * @see {@link EngineQuerySubscribeEventParamsMap.vanillaGameplayContainerItemQuery}
             * @see {@link EngineQueryNonFacetResultMap.vanillaGameplayContainerItemQuery}
             *
             * @deprecated This has been removed in 1.21.120.4 and replaced with the new query system.
             */
            "vanilla.gameplay.containerItemQuery": unknown; // TODO: Get the type for this facet.
            /**
             * @see {@link EngineQuerySubscribeEventParamsMap.vanillaGameplayContainerSizeQuery}
             * @see {@link EngineQueryNonFacetResultMap.vanillaGameplayContainerSizeQuery}
             *
             * @deprecated This has been removed in 1.21.120.4 and replaced with the new query system.
             */
            "vanilla.gameplay.containerSizeQuery": unknown; // TODO: Get the type for this facet.
            /**
             * @see {@link EngineQuerySubscribeEventParamsMap | EngineQuerySubscribeEventParamsMap["vanilla.gameplay.furnace"]}
             * @see {@link EngineQueryNonFacetResultMap | EngineQueryNonFacetResultMap["vanilla.gameplay.furnace"]}
             *
             * @deprecated This has been removed in 1.21.120.4 and replaced with the new query system.
             */
            "vanilla.gameplay.furnace": {
                litProgress: number;
                burnProgress: number;
            };
            "vanilla.gameplay.immediateRespawn": {
                immediateRespawn: null | boolean;
            };
            "vanilla.gameplay.leaveGame": {
                /**
                 * @todo Figure out the types for this method.
                 */
                leaveGame(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                leaveGameThenJoinFriendsWorld(...args: unknown[]): unknown;
            };
            "vanilla.gameplay.playerDeathInfo": {
                /**
                 * @default ""
                 */
                deathInfo: string;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.gameplay.playerPositionHudElement": unknown; // TODO: Get the type for this facet.
            "vanilla.gameplay.playerRespawn": {
                isAlive: boolean;
                /**
                 * @returns {null} Returns `null`.
                 */
                respawn(): null;
            };
            "vanilla.gamertagSearch": {
                xboxAPICallResult: number;
                /**
                 * @todo Figure out the types for this array.
                 */
                searchResults: CoherentArrayProxy<unknown>;
                isLoading: boolean;
                /**
                 * @todo Figure out the types for this method.
                 */
                search(...args: unknown[]): unknown;
            };
            "vanilla.inbox": {
                messagingServiceFailed: boolean;
                marketplacePassSubscriber: boolean;
                settings: {
                    showOnlyFriendInvites: boolean;
                    showMessageBadges: boolean;
                    showInvitesBadges: boolean;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    toggleInvitesBadges(...args: unknown[]): unknown;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    toggleMessageBadges(...args: unknown[]): unknown;
                    /**
                     * @todo Figure out the types for this method.
                     */
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
                    style: number; // TODO: MAKE ENUM
                    /**
                     * @default null
                     */
                    gamedrop: null | unknown;
                    items: CoherentArrayProxy<{
                        button: {
                            action: number;
                            link: string;
                            description: string;
                            text: string;
                            id: string;
                            /**
                             * @todo Figure out the types for this method.
                             */
                            openExternalLink(...args: unknown[]): unknown;
                        };
                        image: {
                            isLoaded: boolean;
                            imageSize: null | { height: number; width: number };
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
                        /**
                         * @todo Figure out the types for this method.
                         */
                        openExternalLink(...args: unknown[]): unknown;
                    }>;
                    images: CoherentArrayProxy<{
                        isLoaded: boolean;
                        imageSize: null | { height: number; width: number };
                        nonAnimatedUrl: string;
                        animatedUrl: string;
                        id: string;
                    }>;
                    template: string;
                    worldId: string;
                    instanceId: string;
                    invStatus: number; // TODO: MAKE ENUM
                    /**
                     * @default null
                     */
                    expiryDaysLeft: null | unknown;
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
                /**
                 * @todo Figure out the types for this method.
                 */
                setNotificationRead(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                acceptInvitation(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                rejectInvitation(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                deleteNotification(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                saveSettings(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reloadInvites(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                markAllRead(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                deleteAllRead(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportClick(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                requestMessages(...args: unknown[]): unknown;
            };
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
                localWorlds: CoherentArrayProxy<LocalWorldDataType>;
            };
            "vanilla.marketplaceSuggestions": {
                getMorePacks: {
                    /**
                     * @example "MultiItemPage_0182b00f-3b8f-411a-9e40-69d904408f90%7cPagedList_342ec38f-e305-2bc6-7b61-04c33682aed7"
                     */
                    pageId: string;
                    /**
                     * @example "store.upsell.resourcepicker"
                     */
                    title: string;
                };
            };
            "vanilla.marketplacePassWorldTemplateList": {
                refreshTaskState: number; // TODO: MAKE ENUM
                seeMoreMarketplacePassRouteData: {
                    /**
                     * @example "MultiItemPage_0182b00f-3b8f-411a-9e40-69d904408f90%7cPagedList_af5d5474-a360-e5f6-2de7-08514e8f12a8"
                     */
                    pageId: string;
                    /**
                     * @example "selectTemplate.marketplacePass"
                     */
                    title: string;
                };
                marketplacePassWorldTemplates: CoherentArrayProxy<{
                    storeCatalogCategory: number; // TODO: MAKE ENUM
                    isUpdateAvailable: boolean;
                    isInstalled: boolean;
                    packId: string;
                    isExpired: boolean;
                    ratingData: {
                        totalRatingsCount: string;
                        averageRating: number;
                    };
                    thumbnailPath: string;
                    creator: string;
                    name: string;
                    id: string;
                }>;
                /**
                 * @todo Figure out the types for this method.
                 */
                refreshOffers(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
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
                /**
                 * Loads the details of a network world.
                 *
                 * @param {`${number | bigint}`} id The ID of the server.
                 * @param {0 | 1 | 2 | 3} type `0` = Featured Server, `1` = External Server, `2` = Realm, `3` = LAN Server
                 * @returns {undefined | null} `undefined` if the parameters are invalid, `null` otherwise.
                 */
                loadNetworkWorldDetails(id: `${number | bigint}`, type: 0 | 1 | 2 | 3): undefined | null;
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
                doNotShowFriendsListFTUE: boolean;
                doNotShowManageFeedDeleteWarning: boolean;
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
            "vanilla.notifications": {
                /**
                 * Queues a snackbar message to be shown.
                 *
                 * Snackbar messages are the little popup messages that appear at the bottom of the screen (ex. when saving your world or adding/removing a pack).
                 *
                 * Snackbar mesages are one of the very few things in Ore UI that actually support [formatting codes](https://minecraft.wiki/w/Formatting_codes).
                 *
                 * @param {string} message The message to show. Any newlines will cause the message to be truncated there and appended with ellipses.
                 * @returns {null} Returns `null`.
                 */
                queueSnackbar(message: string): null;
            };
            "vanilla.options": {
                playVideoInTouchControlSelectionScreen: boolean;
                useMobileDataOnce: boolean;
                showTouchControlSelectionScreen: boolean;
                touchControlScheme: number; // TODO: MAKE ENUM
                showRenderDistanceWarningModal: boolean;
                maxRenderDistance: number;
                defaultRenderDistance: number;
                renderDistance: number;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.party": unknown; // TODO: Get the type for this facet. // Found in dev build file.
            "vanilla.playerAchievements": {
                data: PlayerAchievementData;
                status: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                load(...args: unknown[]): unknown;
            };
            "vanilla.playerBanned": {
                /**
                 * @todo Figure out the types for this method.
                 */
                openBannedInfoPage(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                openXboxLiveBannedInfoPage(...args: unknown[]): unknown;
            };
            "vanilla.playerFollowingList": {
                /**
                 * @todo Figure out the types for this array.
                 */
                playerList: CoherentArrayProxy<unknown>;
                isLoading: boolean;
                /**
                 * @todo Figure out the types for this method.
                 */
                load(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.playerLinkedPlatformProfile": unknown; // TODO: Get the type for this facet. // Found in dev build file.
            "vanilla.playermessagingservice": {
                data: {
                    messages: CoherentArrayProxy<{
                        style: number;
                        /**
                         * @default null
                         */
                        gamedrop: null | unknown;
                        buttons: CoherentArrayProxy<{
                            action: number;
                            link: string;
                            description: string;
                            text: string;
                            id: string;
                            /**
                             * @todo Figure out the types for this method.
                             */
                            openExternalLink(...args: unknown[]): unknown;
                        }>;
                        images: CoherentArrayProxy<{
                            isLoaded: boolean;
                            imageSize: null | { height: number; width: number };
                            nonAnimatedUrl: string;
                            animatedUrl: string;
                            id: string;
                        }>;
                        body: string;
                        subtitle: string;
                        header: string;
                        template: string;
                        surface: string;
                        instanceId: string;
                        id: string;
                    }>;
                    messageCount: number;
                };
                status: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                reportClick(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportDismiss(...args: unknown[]): unknown;
            };
            "vanilla.playerPermissions": {
                kickCommandState: number; // TODO: MAKE ENUM
                operatorCommandsRevokedFlag: boolean;
                selectedPlayerPermissionsChangedFlag: boolean;
                selectedPlayerLeftFlag: boolean;
                playerPermissionsMissingFlag: boolean;
                playerIdInvalidFlag: boolean;
                isWorldTemplateOptionsLocked: boolean;
                areCheatsEnabled: boolean;
                canKickPlayer: boolean;
                canEditPermissions: boolean;
                playerPermissionList: CoherentArrayProxy<{
                    isEnabled: boolean;
                    abilityIndex: number;
                }>;
                playerPermissionLevel: null | PlayerPermissionLevel<"values">; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                loadPlayerPermissions(playerName: unknown): unknown;
                /**
                 * @todo Figure out the return type for this method.
                 */
                requestSavePermissions(): unknown;
                /**
                 * @param {unknown} playerId The ID of the player to set the permission level for.
                 * @param {PlayerPermissionLevel<"values">} permissionLevel The {@link PlayerPermissionLevel|permission level} to set.
                 *
                 * @todo Figure out the types for this method.
                 */
                setPlayerPermissionLevel(playerId: unknown, permissionLevel: PlayerPermissionLevel<"values">): unknown;
                /**
                 * @param {unknown} playerId The ID of the player to set the permission for.
                 * @param {number} abilityIndex The index of the permission to set.
                 * @param {boolean} isEnabled Whether the permission should be enabled or disabled.
                 *
                 * @todo Figure out the types for this method.
                 */
                setPlayerPermission(playerId: unknown, abilityIndex: number, isEnabled: boolean): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                kickPlayer(playerId: unknown): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                enableCheats(): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearErrorFlag(arg0: unknown): unknown;
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
                        /**
                         * @see {@link PlayerRelation}
                         */
                        relation: PlayerRelation<"values">;
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
                /**
                 * @todo Figure out the types for this method.
                 */
                subscribeToProfile(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                refetchProfile(...args: unknown[]): unknown;
            };
            "vanilla.playerReport": {
                hasReachedReportLimit: boolean;
                screenshot: string;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportReasonOptions: CoherentArrayProxy<unknown>;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportAreaOptions: CoherentArrayProxy<unknown>;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportableChatMessages: CoherentArrayProxy<unknown>;
                /**
                 * @todo Figure out the types for this method.
                 */
                selectedChatMessages: CoherentArrayProxy<unknown>;
                galleryScreenshotId: string;
                platformId: string;
                xuid: string;
                reportMessage: string;
                reportReason: number; // TODO: MAKE ENUM
                reportArea: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                isChatAvailable(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                decideReportReasonOptions(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                finishReport(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                startReport(...args: unknown[]): unknown;
            };
            "vanilla.playerSocialManager": {
                /**
                 * @todo Figure out the types for this method.
                 */
                addFriend(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                removeFriend(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                block(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                unblock(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                mute(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                unmute(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                favorite(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                unfavorite(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                showXboxProfileCard(...args: unknown[]): unknown;
            };
            "vanilla.playerStatistics": {
                /**
                 * @todo Figure out the types for this array.
                 */
                data: CoherentArrayProxy<{
                    currentUserValueNarration: string;
                    currentUserValueDisplay: string;
                    currentUserValueRaw: number;
                    valueNarration: string;
                    valueDisplay: string;
                    valueRaw: number;
                    icon: number;
                    label: LooseAutocomplete<"Time played" | "Blocks broken" | "Mobs defeated" | "Distance traveled">;
                    name: LooseAutocomplete<"MinutesPlayed" | "BlockBrokenTotal" | "MobKilled.IsMonster.1" | "DistanceTravelled">;
                }>;
                loaded: boolean;
                /**
                 * @todo Figure out the types for this method.
                 */
                load(...args: unknown[]): unknown;
            };
            "vanilla.privacyAndOnlineSafetyFacet": {
                isCheckingCompleted: boolean;
                getAllowCapturesResult: boolean;
                getClubCheckResult: boolean;
                getMultiplayerCheckResult: boolean;
                checkClubAndMultiplayerPermissions(): null;
            };
            "vanilla.profanityFilter": {
                /**
                 * Checks if a string contains profanity.
                 *
                 * @param {string} string The string to check.
                 * @returns {boolean} `true` if the string contains profanity, `false` otherwise.
                 */
                isProfanityInString(string: string): boolean;
            };
            "vanilla.realmsListFacet": {
                realms: CoherentArrayProxy<RealmDataType>;
                error: number; // TODO: MAKE ENUM
                state: number; // TODO: MAKE ENUM
                compatibility: number; // TODO: MAKE ENUM
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
                /**
                 * @see {@link LeaveRealmsServerError}
                 */
                leaveRealmResult: null | LeaveRealmsServerError<"values">;
                leaveRealmProgress: number;
                joinedRealmName: string;
                joinedRealmId: string;
                /**
                 * @see {@link JoinRealmsServerError}
                 */
                joinRealmError: null | JoinRealmsServerError<"values">;
                joinRealmProgress: number;
                fetchRealmError: null | number; // TODO: MAKE ENUM
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
            "vanilla.realmsStories.actions": {
                /**
                 * @todo Figure out the types for this method.
                 */
                init(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reset(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                joinRealmFromInvite(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                postStory(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearPostStoryStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                postComment(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearPostCommentStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fetchStories(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearStoryFeedStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fetchStoryImage(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fetchEvents(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearEventsStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fetchMembers(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fetchSessions(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearFetchMembersStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                loadStoriesSlice(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fetchStoryComments(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setViewed(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearSetViewedStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                toggleLike(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearFetchSessionsStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearToggleLikeStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                delete(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearDeleteStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setPlayerOptInStatusAndPostWithOptInTelemetry(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setRealmEventsStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setRealmCoordinatesStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setRealmTimelineStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setRealmTimelineRequirementStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setRealmNotificationStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                postSettings(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                postSettingsOnExit(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fetchSettings(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearSettingsStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportToClubOwner(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearReportToClubOwnerStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportFeedItemToXbox(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportGamertagToXbox(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearReportToXboxStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                openManageMembersScreen(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.realmsStories.localScreenshots": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsStories.persistentData": {
                newPostAvailable: boolean;
                currentMemberSortOption: number; // TODO: MAKE ENUM
                currentMemberFilterOption: number; // TODO: MAKE ENUM
                currentMemberSearchText: string;
                storyScreenshotSelectionFilePath: string;
                commentInProgressBody: string;
                postInProgressBody: string;
                currentStoryId: string;
            };
            "vanilla.realmsStories.players": {
                fetchOnlineMembersStatus: number; // TODO: MAKE ENUM
                fetchMembersStatus: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this array.
                 */
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
                newPostAvailable: boolean;
                currentMemberSortOption: number; // TODO: MAKE ENUM
                currentMemberFilterOption: number; // TODO: MAKE ENUM
                currentMemberSearchText: string;
                storyScreenshotSelectionFilePath: string;
                commentInProgressBody: string;
                postInProgressBody: string;
                currentStoryId: string;
            };
            "vanilla.realmsStories.stories": {
                mostRecentStoriesViewed: boolean;
                pageLength: number;
                unreadStoryCount: number;
                totalStories: number;
                postStoryStatus: number; // TODO: MAKE ENUM
                storiesFirstPageReady: boolean;
                storiesStatus: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this array.
                 */
                stories: CoherentArrayProxy<unknown>;
            };
            "vanilla.RealmsPDPFacet": {
                isRealmsTrialAvailable: boolean;
            };
            "vanilla.RealmWorldUploaderFacet": {
                choosePreviewRealm: boolean;
                uploadedRealmWorldId: number;
                uploadWorldToRealmError: null | number; // TODO: MAKE ENUM
                uploadWorldToRealmTaskState: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                uploadWorldToRealm(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setPreviewRealmForUpload(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearUploadWorldToRealmTaskState(...args: unknown[]): unknown;
            };
            "vanilla.recentlyPlayedWithList": {
                xboxAPICallResult: number; // TODO: MAKE ENUM
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
                xboxAPICallResult: number; // TODO: MAKE ENUM
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
                /**
                 * @todo Figure out the types for this array.
                 */
                definitions: CoherentArrayProxy<unknown>;
            };
            "vanilla.resourcePacks": {
                lastActivatedPackId: string;
                prompt: {
                    /**
                     * @todo Figure out the types for this array.
                     */
                    actions: CoherentArrayProxy<unknown>;
                    body: string;
                    title: string;
                    active: boolean;
                    id: string;
                    /**
                     * @todo Figure out the types for this method.
                     */
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
                    type: "Behavior";
                    name: string;
                    /**
                     * May not actually be part of the type.
                     */
                    creator?: string;
                }>;
                activeBehaviorPacks: CoherentArrayProxy<{
                    isAddon: boolean;
                    hasSettings: boolean;
                    isPlatformLocked: boolean;
                    isMarketplaceItem: boolean;
                    image: string;
                    contentId: string;
                    id: string;
                    size: string;
                    description: string;
                    type: "Behavior";
                    name: string;
                    /**
                     * May not actually be part of the type.
                     */
                    creator?: string;
                }>;
                unownedTexturePacks: CoherentArrayProxy<{
                    isAddon: boolean;
                    hasSettings: boolean;
                    isPlatformLocked: boolean;
                    isMarketplaceItem: boolean;
                    image: string;
                    contentId: string;
                    id: string;
                    size: string;
                    description: string;
                    type: "Resource";
                    name: string;
                    /**
                     * May not actually be part of the type.
                     */
                    creator?: string;
                }>;
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
                    type: "Resource";
                    name: string;
                    /**
                     * May not actually be part of the type.
                     */
                    creator?: string;
                }>;
                globalTexturePacks: CoherentArrayProxy<{
                    isAddon: boolean;
                    hasSettings: boolean;
                    isPlatformLocked: boolean;
                    isMarketplaceItem: boolean;
                    image: string;
                    contentId: string;
                    id: string;
                    size: string;
                    description: string;
                    type: "Resource";
                    name: string;
                    /**
                     * May not actually be part of the type.
                     */
                    creator?: string;
                }>;
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
                    type: "Resource";
                    name: string;
                    /**
                     * May not actually be part of the type.
                     */
                    creator?: string;
                }>;
                activeTexturePacks: CoherentArrayProxy<{
                    isAddon: boolean;
                    hasSettings: boolean;
                    isPlatformLocked: boolean;
                    isMarketplaceItem: boolean;
                    image: string;
                    contentId: string;
                    id: string;
                    size: string;
                    description: string;
                    type: "Resource";
                    name: string;
                    /**
                     * May not actually be part of the type.
                     */
                    creator?: string;
                }>;
                importProgress: number;
                downloadProgress: number;
                marketplacePackId: string;
                resourcePackToDownload: { body: string; title: string };
                realmsSubscriber: boolean;
                realmsPlusSupported: boolean;
                status: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                activate(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                deactivate(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                showSettings(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                cancelDownload(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                changePackPriority(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearLastActivatedPackId(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.screenshotGalleryList": unknown; // TODO: Get the type for this facet.
            "vanilla.screenSpecificOptions": {
                devPlayScreenHideLanWorlds: boolean;
                playScreenWorldLayoutMode: number; // TODO: MAKE ENUM
            };
            "vanilla.screenTechStack": {
                /**
                 * @todo Figure out the types for this method.
                 */
                selectTechStackForScreen(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                getTechStackForScreen(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                getPreferredTechStackForScreen(...args: unknown[]): unknown;
            };
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
                /**
                 * The options for the simulation distance dropdown.
                 *
                 * @example
                 * ```ts
                 * [4, 6, 8, 10, 12]
                 * ```
                 */
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
                    id: `${bigint}`;
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
                signInPlatformNetworkTaskResult: null | number; // TODO: MAKE ENUM
                signInPlatformNetworkTaskState: number; // TODO: MAKE ENUM
                isSignedInPlatformNetwork: boolean;
                accountUnlinkState: number; // TODO: MAKE ENUM
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
                    viewProfiles: {
                        allowed: boolean;
                        /**
                         * @todo Figure out the types for this array.
                         */
                        denyReasons: CoherentArrayProxy<unknown>;
                    };
                    addFriends: {
                        allowed: boolean;
                        /**
                         * @todo Figure out the types for this array.
                         */
                        denyReasons: CoherentArrayProxy<unknown>;
                    };
                    multiplayer: {
                        allowed: boolean;
                        /**
                         * @todo Figure out the types for this array.
                         */
                        denyReasons: CoherentArrayProxy<unknown>;
                    };
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
                syncWorldTaskState: number; // TODO: MAKE ENUM
                syncWorldResult: null | number; // TODO: MAKE ENUM
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
                loadWorldTaskState: number; // TODO: MAKE ENUM
                loadWorldError: null | number; // TODO: MAKE ENUM
                saveRealmsWorldTaskState: number; // TODO: MAKE ENUM
                saveRealmsWorldError: null | number; // TODO: MAKE ENUM
                saveLocalWorldTaskState: number; // TODO: MAKE ENUM
                saveLocalWorldError: null | number; // TODO: MAKE ENUM
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
                        category: number; // TODO: MAKE ENUM
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
                        daylightCycle: number; // TODO: MAKE ENUM
                        cheatsEnabled: boolean;
                    };
                    scriptingCoding?: {
                        consoleCommandsEnabled: boolean;
                        codeBuilderEnabled: boolean;
                    };
                    multiplayer: {
                        locatorBarEnabled: boolean;
                        friendlyFire: boolean;
                        visibleToLanPlayers: boolean;
                        playerPermissions: number; // TODO: MAKE ENUM
                        playerAccess: number; // TODO: MAKE ENUM
                        generalWarningState: number; // TODO: MAKE ENUM
                        platformPlayerFriendsOfFriendsAccessSupported: boolean;
                        platformPlayerInviteAccessSupported: boolean;
                        platformPlayerAccessEnabled: boolean;
                        platformPlayerAccessSupported: boolean;
                        platformPlayerAccess: number; // TODO: MAKE ENUM
                        multiplayerGame: boolean;
                        multiplayerSupported: boolean;
                    };
                    advanced: {
                        flatWorldPreset: null | string;
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
                        generatorType: number; // TODO: MAKE ENUM
                        useFlatWorld: boolean;
                    };
                    general: {
                        difficulty: number; // TODO: MAKE ENUM
                        playerHasDied: boolean;
                        isHardcore: boolean;
                        gameMode: number; // TODO: MAKE ENUM
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
            "vanilla.worldOperations": {
                clearPlayerDataTaskState: number; // TODO: MAKE ENUM
                startClearPlayerDataError: null | number; // TODO: MAKE ENUM
                exportWorldStatus: number; // TODO: MAKE ENUM
                exportWorldResult: null | number; // TODO: MAKE ENUM
                makeWorldInfiniteProgress: number;
                makeWorldInfiniteState: number; // TODO: MAKE ENUM
                makeWorldInfiniteError: null | number; // TODO: MAKE ENUM
                duplicateWorldTaskState: number; // TODO: MAKE ENUM
                duplicateWorldError: null | number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                startDuplicateWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearDuplicateWorldTaskState(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                makeWorldInfinite(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearMakeWorldInfiniteState(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                deleteWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                exportWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                exportWorldAsTemplate(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearExportWorldResult(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearPlayerData(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                resetClearPlayerData(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                saveScreenshotAsWorldIcon(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                resetWorldIconToDefault(...args: unknown[]): unknown;
            };
            "vanilla.worldPackages": {
                lastConsultedPackSizes: string;
                lastConsultedPackSizesTaskState: number; // TODO: MAKE ENUM
                lastConsultedPackSizesError: null | number; // TODO: MAKE ENUM
                packDownloadErrorData: {
                    /**
                     * @todo Figure out the types for this array.
                     */
                    packTitles: CoherentArrayProxy<unknown>;
                    storageSpaceNeeded: string;
                };
                packDownloadStatus: number; // TODO: MAKE ENUM
                packDownloadTaskState: number; // TODO: MAKE ENUM
                packDownloadProgress: number;
                packDownloadName: string;
                packDownloadError: null | number; // TODO: MAKE ENUM
                worldPacksData: {
                    /**
                     * @todo Figure out the types for this array.
                     */
                    availableBehaviorPacks: CoherentArrayProxy<unknown>;
                    /**
                     * @todo Figure out the types for this array.
                     */
                    activeBehaviorPacks: CoherentArrayProxy<unknown>;
                    /**
                     * @todo Figure out the types for this array.
                     */
                    unownedTexturePacks: CoherentArrayProxy<unknown>;
                    /**
                     * @todo Figure out the types for this array.
                     */
                    realmsTexturePacks: CoherentArrayProxy<unknown>;
                    /**
                     * @todo Figure out the types for this array.
                     */
                    globalTexturePacks: CoherentArrayProxy<unknown>;
                    /**
                     * @todo Figure out the types for this array.
                     */
                    availableTexturePacks: CoherentArrayProxy<unknown>;
                    /**
                     * @todo Figure out the types for this array.
                     */
                    activeTexturePacks: CoherentArrayProxy<unknown>;
                    realmsSubscriber: boolean;
                    realmsPlusSupported: boolean;
                };
                isReadyForDownload: boolean;
                isInitialized: boolean;
                /**
                 * @todo Figure out the types for this method.
                 */
                loadPacksData(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                activatePack(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                deactivatePack(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                changePackPriority(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                continuePackActivation(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                continuePackDeactivation(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                downloadPacks(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                cancelPackDownload(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                getPackSizes(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                getPackSizesReset(...args: unknown[]): unknown;
            };
            "vanilla.worldPlayersList": {
                isInRealm: boolean;
                enableInviteToPlayButton: boolean;
                playersInMyWorld: CoherentArrayProxy<{
                    /**
                     * @see {@link PlayerRelation}
                     */
                    relation: PlayerRelation<"values">;
                    isMuted: boolean;
                    isBlocked: boolean;
                    /**
                     * @see {@link PlayerPermissionLevel}
                     */
                    permissionLevel: PlayerPermissionLevel<"values">;
                    favoriteStatus: FriendFavoriteStatus<"values">;
                    isCurrentlyPlaying: boolean;
                    titleHistory: number;
                    presenceMessage: string;
                    isInSameGame: boolean;
                    titleName: string;
                    partyPresence: number;
                    presence: number;
                    gamerIcon: string;
                    playingOnServerId: string;
                    gamerTag: string;
                    platformId: string;
                    xuid: string;
                    actorId: string;
                }>;
                players: CoherentArrayProxy<{
                    platform: number;
                    isHosting: boolean;
                    permissionLevel: number;
                    profileImage: string;
                    name: string;
                    connectionType: number;
                    id: string;
                }>;
                /**
                 * Wheter the player whose client is running this code is the host of the world.
                 */
                isLocalPlayerHosting: boolean;
                /**
                 * The UUID of the player whose client is running this code.
                 *
                 * This is the same UUID stored in the world data and that would be accessed through the scripting API.
                 *
                 * @example "-4294967295"
                 */
                localPlayerID: `${bigint}`;
            };
            "vanilla.worldStartup": {
                backupThenStartLocalWorld: {
                    progress: null | number; // TODO: MAKE ENUM
                    state: number; // TODO: MAKE ENUM
                    result: null | number; // TODO: MAKE ENUM
                    /**
                     * @todo Figure out the types for this method.
                     */
                    run(...args: unknown[]): unknown;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    cancel(...args: unknown[]): unknown;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    clear(...args: unknown[]): unknown;
                };
                /**
                 * @todo Figure out the types for this array.
                 */
                brokenPacksToStart: CoherentArrayProxy<unknown>;
                missingPacksSize: string;
                /**
                 * @todo Figure out the types for this array.
                 */
                missingPacksToStart: CoherentArrayProxy<unknown>;
                missingTemplateToStart: string;
                hasMissingResources: boolean;
                startLocalWorldTaskState: number; // TODO: MAKE ENUM
                startLocalWorldResult: null; // TODO: Figure out the non-null type of this.
                /**
                 * @todo Figure out the types for this method.
                 */
                startLocalWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearStartLocalWorldResult(...args: unknown[]): unknown;
            };
            "vanilla.worldTemplateList": {
                /**
                 * @todo Figure out the types for this array.
                 */
                templates: CoherentArrayProxy<unknown>;
                /**
                 * @todo Figure out the types for this array.
                 */
                customTemplates: CoherentArrayProxy<unknown>;
                /**
                 * @todo Figure out the types for this array.
                 */
                premiumTemplates: CoherentArrayProxy<unknown>;
            };
            "vanilla.worldTransfer": {
                backupWorldProgress: number;
                backupWorldResult: null | number; // TODO: MAKE ENUM
                importWorldProgress: number;
                importWorldProgressPercentage: number;
                importWorldResult: null | number; // TODO: MAKE ENUM
                importWorld: {
                    progress: null | number;
                    state: number; // TODO: MAKE ENUM
                    result: null | number; // TODO: MAKE ENUM
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
            /**
             * NOTE: Not present in 1.21.120.4.
             */
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
            "vanilla.achievementCategories": {
                /**
                 * @todo Figure out the types for this array.
                 */
                releaseCategoryData: CoherentArrayProxy<unknown>;
                /**
                 * @todo Figure out the types for this array.
                 */
                standardCategoryData: CoherentArrayProxy<unknown>;
            };
            "vanilla.blockInformation": {
                blockDisplayName: Partial<
                    Record<
                        | "minecraft:cobblestone"
                        | "minecraft:bedrock"
                        | "minecraft:deepslate"
                        | "minecraft:snow_layer"
                        | "minecraft:dirt"
                        | "minecraft:grass_block"
                        | "minecraft:sandstone"
                        | "minecraft:gravel"
                        | "minecraft:sand"
                        | "minecraft:snow"
                        | "minecraft:stone"
                        | "minecraft:water",
                        string
                    >
                > & {
                    [blockNamespacedID: string]: string;
                };
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "debug.worldTransfer": unknown; // TODO: Get the type for this facet.
            "vanilla.flatWorldPresets": {
                /**
                 * The flat world presets.
                 */
                presets: Partial<
                    Record<
                        LooseAutocomplete<
                            | "Desert"
                            | "BottomlessPit"
                            | "ClassicFlat"
                            | "WaterWorld"
                            | "TunnelersDream"
                            | "Overworld"
                            | "SnowyKingdom"
                            | "RedstoneReady"
                            | "TheVoid"
                        >,
                        {
                            /**
                             * The layers of this flat world preset.
                             */
                            layers: CoherentArrayProxy<{
                                /**
                                 * The number of blocks thick this layer is.
                                 */
                                height: number;
                                /**
                                 * The namespaced ID of the block type.
                                 */
                                material: string;
                            }>;
                            /**
                             * The biome of this flat world preset.
                             *
                             * @todo Find a preset that has a biome other than `undefined` to figure out its type.
                             */
                            biome: unknown | undefined;
                            /**
                             * The index this flat world preset should be displayed in the presets list.
                             */
                            id: number;
                        }
                    >
                >;
            };
            "vanilla.inGame": {
                isInMultiplayerSession: boolean;
                isHosting: boolean;
                /**
                 * @todo Figure out the format of the level IDs in this.
                 */
                currentLevelId: "" | `${any}`;
                isInGame: boolean;
            };
            "vanilla.playerPrivacy": {
                loaded: boolean;
                data: {
                    viewTargetProfile: boolean;
                };
                load(xuid: string): null;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.realmsPurchase": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsSubscriptionsData": {
                /**
                 * An array of realm subscriptions.
                 */
                subscriptions: CoherentArrayProxy<{
                    /**
                     * The ID of the store this realm subscription was purchased from.
                     */
                    storeId: LooseAutocomplete<"onestore.store">;
                    /**
                     * The ID of the subscription as a hexadecimal string.
                     */
                    subscriptionId: string;
                    /**
                     * The ID of the realm.
                     */
                    realmId: `${bigint}`;
                }>;
                canBuyPlusRealm: boolean;
                canBuyCoreRealm: boolean;
                state: number; // TODO: MAKE ENUM
            };
            "vanilla.realmsSubscriptionsMethods": {
                /**
                 * @todo Figure out the types for this method.
                 */
                reset(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                initialize(...args: unknown[]): unknown;
            };
            "vanilla.realmsWorldContextCommands": {
                /**
                 * Fetches the realm data for the realm with the given ID.
                 *
                 * @param {`${bigint}`} realmId The ID of the realm.
                 * @returns {null} Returns `null`.
                 */
                fetchRealmsWorld(realmId: `${bigint}`): null;
                /**
                 * Unloads the fetched realm data.
                 *
                 * @returns {null} Returns `null`.
                 */
                reset(): null;
            };
            "vanilla.realmsWorldContextQueries": {
                /**
                 * Whether the realm is expired.
                 *
                 * When no realm data has been fetched in the `vanilla.realmsWorldContextCommands` facet this will be `false`.
                 *
                 * @default false
                 */
                expired: boolean;
                /**
                 * Whether the realm is closed.
                 *
                 * When no realm data has been fetched in the `vanilla.realmsWorldContextCommands` facet this will be `false`.
                 *
                 * @default false
                 */
                closed: boolean;
                /**
                 * The max players for the realm.
                 *
                 * When no realm data has been fetched in the `vanilla.realmsWorldContextCommands` facet this will be `0`.
                 *
                 * @default 0
                 */
                maxPlayers: LooseAutocompleteB<number, 0 | 2 | 10>;
                /**
                 * The active slot index of the realm.
                 *
                 * When no realm data has been fetched in the `vanilla.realmsWorldContextCommands` facet this will be `-1`.
                 *
                 * @default -1
                 */
                activeSlotIndex: LooseAutocompleteB<number, -1 | 0 | 1 | 2>;
                /**
                 * The ID of the realm.
                 *
                 * When no realm data has been fetched in the `vanilla.realmsWorldContextCommands` facet this will be `"0"`.
                 *
                 * @default "0"
                 */
                realmId: `${bigint}`;
                /**
                 * The name of the realm.
                 *
                 * When no realm data has been fetched in the `vanilla.realmsWorldContextCommands` facet this will be `""`.
                 *
                 * @default ""
                 */
                realmName: string;
                state: number; // TODO: MAKE ENUM
            };
            "vanilla.realmsStories.sessions": {
                fetchSessionStatus: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this array.
                 */
                sessions: CoherentArrayProxy<unknown>;
            };
            "vanilla.realmsListActionsFacet": {
                /**
                 * @todo Figure out the types for this method.
                 */
                forceFetchRealmList(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearRealmUnreadCount(...args: unknown[]): unknown;
            };
            "vanilla.developerOptionsFacet": {
                isRealmsPreproductionEnvironment: boolean;
            };
            "vanilla.realmsStories.comments": {
                postCommentStatus: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this array.
                 */
                comments: CoherentArrayProxy<unknown>;
            };
            "vanilla.screenshotGallery": {
                deleteScreenshotsError: number; // TODO: MAKE ENUM
                isDeleteScreenshotsInProgress: boolean;
                modifyShowcaseGalleryError: number; // TODO: MAKE ENUM
                isModifyShowcaseGalleryInProgress: boolean;
                isAddShowcasedImageInProgress: boolean;
                isAddFeaturedImageInProgress: boolean;
                loadGalleryError: number; // TODO: MAKE ENUM
                isLoadGalleryInProgress: boolean;
                isLoadingCount: boolean;
                isLoadingFeaturedScreenshot: boolean;
                maxScreenshots: number;
                featuredScreenshot: string;
                undownloadedCount: number;
                count: number;
                screenshots: CoherentArrayProxy<{
                    loadingImage: boolean;
                    featured: boolean;
                    showcased: boolean;
                    lastModifiedTime: number;
                    captureTimeLabel: string;
                    captureTime: number;
                    /**
                     * The absolute file path of the screenshot.
                     */
                    filePath: string;
                    image: string;
                    thumbnail: string;
                    /**
                     * A UUID that is the ID of this screenshot.
                     */
                    id: string;
                }>;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearLoadGalleryError(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearModifyShowcaseGalleryError(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearDeleteScreenshotsError(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                retryLoadGallery(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                addScreenshotToShowcase(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                removeShowcasedScreenshot(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                deleteScreenshots(...args: unknown[]): unknown;
            };
            "vanilla.playerShowcasedGallery": {
                isLoadingCount: boolean;
                isLoadingFeaturedScreenshot: boolean;
                isLoadingScreenshots: boolean;
                maxScreenshots: number;
                featuredScreenshot: string;
                count: number;
                /**
                 * @todo Figure out the types for this array.
                 */
                screenshots: CoherentArrayProxy<unknown>;
                /**
                 * @todo Figure out the types for this method.
                 */
                loadGallery(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                loadCount(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                loadShowcasedScreenshot(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                loadFeaturedScreenshot(...args: unknown[]): unknown;
            };
            "vanilla.trialMode": {
                purchaseGameError: null | number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this method.
                 */
                purchaseGame(...args: unknown[]): unknown;
            };
            "vanilla.featuredWorldTemplateList": {
                refreshTaskState: number; // TODO: MAKE ENUM
                seeMoreFeaturedRouteData: { pageId: string; title: string };
                featuredWorldTemplates: CoherentArrayProxy<{
                    storeCatalogCategory: number; // TODO: MAKE ENUM
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
                /**
                 * @todo Figure out the types for this method.
                 */
                refreshOffers(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearRefreshTaskState(...args: unknown[]): unknown;
            };
            "vanilla.ownedWorldTemplateList": {
                ownedTemplateWorldList: CoherentArrayProxy<{
                    canBeRated: boolean;
                    thumbnailPath: string;
                    ownedWorldTemplateData: {
                        isLocked: boolean;
                        isInstalled: boolean;
                        isPremium: boolean;
                        creator: string;
                        name: string;
                        marketplaceId: string;
                        localId: string;
                    };
                }>;
            };
            "vanilla.worldTemplateOperations": {
                isTemplateScreenAvailable: boolean;
                canDownloadBeCancelled: boolean;
                importedPackName: string;
                importingTaskResult: null | number; // TODO: MAKE ENUM
                importingTaskState: number; // TODO: MAKE ENUM
                downloadingTaskResult: null | number; // TODO: MAKE ENUM
                downloadingTaskState: number; // TODO: MAKE ENUM
                downloadingStatus: null | number; // TODO: MAKE ENUM
                downloadTotalBytes: string;
                downloadingProgressBytes: string;
                downloadingProgressPercent: number;
                /**
                 * @todo Figure out the types for this method.
                 */
                downloadWorldTemplate(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                cancelDownload(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                importWorldTemplate(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                resetDownloadTask(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                resetImportTask(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "test.vector": unknown; // TODO: Get the type for this facet.
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             */
            "vanilla.editorBlockPalette": unknown; // TODO: Get the type for this facet.
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             */
            "vanilla.editorInputBinding": unknown; // TODO: Get the type for this facet.
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             */
            "vanilla.editorInputState": unknown; // TODO: Get the type for this facet.
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             */
            "vanilla.editorProjectConstants": unknown; // TODO: Get the type for this facet.
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             */
            "vanilla.editorStructure": unknown; // TODO: Get the type for this facet.
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             */
            "vanilla.editorTutorial": unknown; // TODO: Get the type for this facet.
            "vanilla.gameplay.localPlayerWeatherLightningFacet": {
                isLightning: null | boolean;
            };
            "vanilla.levelInfo": {
                isInitialized: boolean;
                worldIconPath: string;
                worldName: string;
            };
            "vanilla.currentParty": {
                /**
                 * @todo Figure out the types for this array.
                 */
                pendingInvitees: CoherentArrayProxy<unknown>;
                leaderXuid: string;
                /**
                 * @todo Figure out the types for this array.
                 */
                members: CoherentArrayProxy<unknown>;
                privacy: number;
                partyId: string;
                isInParty: boolean;
            };
            "vanilla.partyCommands": {
                acceptInviteState: {
                    hasError: boolean;
                    /**
                     * @default undefined
                     */
                    error: undefined | unknown;
                    loading: boolean;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    clearError(...args: unknown[]): unknown;
                };
                joinPartyState: {
                    hasError: boolean;
                    /**
                     * @default undefined
                     */
                    error: undefined | unknown;
                    loading: boolean;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    clearError(...args: unknown[]): unknown;
                };
                createPartyState: {
                    hasError: boolean;
                    /**
                     * @default undefined
                     */
                    error: undefined | unknown;
                    loading: boolean;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    clearError(...args: unknown[]): unknown;
                };
                /**
                 * @todo Figure out the types for this method.
                 */
                sendInvite(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                ignoreInvite(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setPrivacy(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                leaveParty(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                removeMember(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setLeader(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                createParty(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                joinParty(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                acceptInvite(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.worldRealmEditor": unknown; // TODO: Get the type for this facet. // Found in dev build file.
            "vanilla.worldRealmEditorCommands": {
                /**
                 * @todo Figure out the types for this method.
                 */
                saveRealmWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                resetRealmWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearRealmWorldEditorState(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setUseRealmWorldBackend(...args: unknown[]): unknown;
            };
            "vanilla.worldRealmEditorQueries": {
                realmWorldEditorStateStatus: number; // TODO: MAKE ENUM
                realmWorldEditorState: number; // TODO: MAKE ENUM
                useRealmsWorldBackend: boolean;
                realmWorldHasBeenModified: boolean;
                realmWorldData: {
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
                    multiplayer: {
                        locatorBarEnabled: boolean;
                        friendlyFire: boolean;
                        visibleToLanPlayers: boolean;
                        playerPermissions: number; // TODO: MAKE ENUM
                        playerAccess: number; // TODO: MAKE ENUM
                        generalWarningState: number; // TODO: MAKE ENUM
                        platformPlayerFriendsOfFriendsAccessSupported: boolean;
                        platformPlayerInviteAccessSupported: boolean;
                        platformPlayerAccessEnabled: boolean;
                        platformPlayerAccessSupported: boolean;
                        platformPlayerAccess: number; // TODO: MAKE ENUM
                        multiplayerGame: boolean;
                        multiplayerSupported: boolean;
                    };
                    advanced: {
                        flatWorldPreset: null | string;
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
                        generatorType: number; // TODO: MAKE ENUM
                        useFlatWorld: boolean;
                    };
                    general: {
                        difficulty: number; // TODO: MAKE ENUM
                        playerHasDied: boolean;
                        isHardcore: boolean;
                        gameMode: number; // TODO: MAKE ENUM
                        worldName: string;
                    };
                };
            };
            "vanilla.realmBackupsCommands": {
                /**
                 * @todo Figure out the types for this method.
                 */
                downloadRealmWorld(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearRealmBackupsState(...args: unknown[]): unknown;
            };
            "vanilla.realmBackupsQueries": {
                realmBackupsState: number; // TODO: MAKE ENUM
                realmWorldSummary: {
                    lastSaved: string;
                    fileSize: string;
                    worldIconPath: string;
                };
            };
            "vanilla.realmsPurchaseCommands": {
                /**
                 * @todo Figure out the types for this method.
                 */
                purchase(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                resetPurchase(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                purchaseTrial(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                prepareAppStoreForPurchases(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                prepareAppStoreForTrialPurchases(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fulfillPriorRealmsPurchase(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                checkUnfulfilledPurchase(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                resetReconciler(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                prepareAppStoreForReconciliation(...args: unknown[]): unknown;
            };
            "vanilla.realmsPurchaseReconcilerQueries": {
                failureReason: number; // TODO: MAKE ENUM
                state: number; // TODO: MAKE ENUM
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.character-selector": unknown; // TODO: Get the type for this facet.
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.progressTracker": unknown; // TODO: Get the type for this facet.

            "vanilla.realmsWorldEditorGameRulesCommands": {
                /**
                 * @todo Figure out the types for this method.
                 */
                setShowCoordinates(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setShowDaysPlayed(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setRecipesUnlock(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setFireSpreads(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setTNTExplodes(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setRespawnBlocksExplode(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setMobsDropLoot(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setNaturalRegeneration(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setTileDrops(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setSleepSkipNight(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setSleepSkipNightPercent(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setImmediateRespawn(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setRespawnRadius(...args: unknown[]): unknown;
            };
            "vanilla.realmsWorldEditorGameRulesQueries": {
                respawnRadius: number;
                immediateRespawn: boolean;
                sleepSkipNightPercent: number;
                sleepSkipNight: boolean;
                tileDrops: boolean;
                naturalRegeneration: boolean;
                mobLoot: boolean;
                respawnBlocksExplode: boolean;
                tntExplodes: boolean;
                fireSpreads: boolean;
                recipesUnlock: boolean;
                showDaysPlayed: boolean;
                showCoordinates: boolean;
            };
            "vanilla.realmsWorldEditorWorldDetailsQueries": {
                simulationDistance: number;
                bonusChest: boolean;
                startWithMap: boolean;
                generatorType: number; // TODO: MAKE ENUM
                flatWorldPreset: string;
                useFlatWorld: boolean;
                worldSeed: string;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.realmsCommitCommandsFacet": unknown; // TODO: Get the type for this facet.
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.realmsCommitQueriesFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.realmsPurchaseQueries": {
                purchaseDisabledDueToStoreVersion: boolean;
                failureReason: number; // TODO: MAKE ENUM
                state: number; // TODO: MAKE ENUM
            };

            "vanilla.connectionErrorInfoFacet": {
                /**
                 * @todo Figure out the types for this method.
                 */
                getConnectionErrorInfo(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                openLearnMoreLink(...args: unknown[]): unknown;
            };
            "vanilla.partyReceivedInviteList": {
                /**
                 * @todo Figure out the types for this array.
                 */
                invites: CoherentArrayProxy<unknown>;
            };
            "vanilla.joinablePartyList": {
                /**
                 * @todo Figure out the types for this array.
                 */
                joinablePartyFriends: CoherentArrayProxy<unknown>;
            };
            /**
             * @todo Try this.
             */
            "vanilla.realmsFeatureFlags": {
                flags: CoherentArrayProxy<string>;
            };
            "vanilla.realmsStories.reports": {
                hasDeleted: number;
                pageLength: number;
                totalStories: number;
                storiesStatus: number; // TODO: MAKE ENUM
                /**
                 * @todo Figure out the types for this array.
                 */
                reports: CoherentArrayProxy<unknown>;
            };
            "vanilla.realmsStories.reportCommands": {
                /**
                 * @todo Figure out the types for this method.
                 */
                reset(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fetchReportPaths(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                fetchReportImage(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                loadReportsSlice(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                dismiss(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearReportFeedStatus(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearReportStatuses(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                clearDeletionStatuses(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportFeedItemToXbox(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                reportGamertagToXbox(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                retryLoad(...args: unknown[]): unknown;
            };
            "vanilla.openAndCloseRealmCommandsFacet": {
                /**
                 * @todo Figure out the types for this method.
                 */
                openRealm(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                closeRealm(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4 (however, it is referenced by the vanilla files there for some reason).
             */
            "dev.realmsCommitCommandsFacet": unknown; // TODO: Get the type for this facet.
            /**
             * NOTE: Not present in 1.21.120.4 (however, it is referenced by the vanilla files there for some reason).
             */
            "dev.realmsCommitQueriesFacet": unknown; // TODO: Get the type for this facet.
            "vanilla.newPlayerChoices": {
                selectedCharacterId: string;
                selectableCharacters: CoherentArrayProxy<{
                    id: string;
                    name: string;
                }>;
                /**
                 * @todo Figure out the types for this method.
                 */
                setSelectedCharacter(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                applySelectedCharacterSkin(...args: unknown[]): unknown;
                /**
                 * @todo Figure out the types for this method.
                 */
                setIsCreative(...args: unknown[]): unknown;
            };

            /**
             * @since Somewhere between 1.21.130.20 Preview and 1.21.130.26 Preview.
             */
            "vanilla.realmsRolesAndPermissionsQueries": unknown; // TODO: Get the type for this facet.
            /**
             * @since Somewhere between 1.21.130.20 Preview and 1.21.130.26 Preview.
             */
            "vanilla.realmsRolesAndPermissionsCommands": unknown; // TODO: Get the type for this facet.
            /**
             * @since Somewhere between 1.21.130.20 Preview and 1.21.130.26 Preview.
             */
            "vanilla.realmsPlayerListQueries": unknown; // TODO: Get the type for this facet.
            /**
             * @since Somewhere between 1.21.130.20 Preview and 1.21.130.26 Preview.
             */
            "vanilla.realmsPlayerListCommands": unknown; // TODO: Get the type for this facet.
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
                gameMode: number; // TODO: MAKE ENUM
                expired: boolean;
                daysLeft: number;
                full: boolean;
                maxPlayers: LooseAutocompleteB<number, 2 | 10>;
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

        interface AchievementData {
            /**
             * The suggested index of this achievement in the list.
             *
             * @example 125
             */
            suggestedOrder: number;
            /**
             * The UUID associated with the reward associated with this achievement.
             *
             * This will be a valid UUID even when this achievement has no reward.
             *
             * @example "aae5037a-76a2-6455-f7b2-158c50c38a76"
             */
            rewardId: string;
            /**
             * The rarity of the reward associated with this achievement.
             *
             * @default 0
             */
            rewardRarity: number; // TODO: MAKE ENUM
            /**
             * The image associated with the reward associated with this achievement.
             *
             * @default ""
             */
            rewardImage: string;
            /**
             * The name of the reward associated with this achievement.
             *
             * @default ""
             */
            rewardName: string;
            /**
             * Whether or not the reward associated with this achievement is owned by the user.
             */
            isRewardOwned: boolean;
            /**
             * Whether or not this achievement has a reward.
             */
            hasReward: boolean;
            /**
             * The thumbnail of this achievement.
             *
             * @example "id://193"
             */
            image: string;
            trackedByUser: number; // TODO: MAKE ENUM
            progressTarget: number; // TODO: MAKE ENUM
            /**
             * The progress of this achievement.
             */
            progress: number; // TODO: MAKE ENUM
            /**
             * Whether or not this achievement is secret.
             */
            isSecret: boolean;
            /**
             * Whether or not this achievement is locked.
             */
            isLocked: boolean;
            /**
             * The date this achievement was unlocked.
             *
             * @example 1724461987
             */
            dateUnlocked: number;
            /**
             * The gamerscore granted by completing this achievement.
             *
             * @example 10
             */
            gamerScore: number;
            /**
             * The description of this achievement.
             *
             * @example "Be near a Crafter when it crafts a Crafter"
             */
            description: string;
            /**
             * The name of this achievement.
             *
             * @example "Crafters Crafting Crafters"
             */
            name: string;
            /**
             * The platform independent ID of this achievement.
             *
             * @example "Crafters Crafting Crafters"
             */
            platformIndependentId: string;
            /**
             * The numeric ID of this achievement.
             *
             * @example "136"
             */
            id: `${bigint}`;
        }

        interface PlayerAchievementData {
            achievements: CoherentArrayProxy<AchievementData>;
            maxGamerScore: number;
            currentGamerScore: number;
            maxAchievements: number;
            achievementsUnlocked: number;
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
/**
 * @author 8Crafter
 */
type IncludeFromTuple<T extends readonly any[], E> = T extends [infer F, ...infer R]
    ? [F] extends [E]
        ? [F, ...IncludeFromTuple<R, E>]
        : IncludeFromTuple<R, E>
    : [];
/**
 * @author 8Crafter
 */
type NullableArray<T extends any[] | readonly any[]> = T | [null, ...T] | [...T, null];

/**
 * @author 8Crafter
 */
type MergeObjectTypes<T> = { [key in keyof T]: T[key] };

export {};

/**
 * @internal
 */
type __INTERNAL_DEV_MissingFacetTypeMapKeys__ = Exclude<FacetList[number], keyof FacetTypeMap>;
/**
 * @internal
 */
type __INTERNAL_DEV_MissingFacetListEntries__ = Exclude<keyof FacetTypeMap, FacetList[number]>;
