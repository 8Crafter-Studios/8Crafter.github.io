import type {
    ARVRPlatform,
    FriendFavoriteStatus,
    FriendPresence,
    InputMethod,
    JoinRealmsServerError,
    KeyboardType,
    LeaveRealmsServerError,
    Platform,
    PlayerPartyPresence,
    PlayerPermissionLevel,
    PlayerRelation,
    PlayerTitleHistory,
    StorageType,
    VanillaGameplayContainerChestType,
    VanillaGameplayContainerItemType,
    VanillaGameplayUIProfile,
    WebBrowserFacetLinkType,
    WorldPlayerInfoBindingsConnectionType,
    WorldPlayerInfoBindingsPlatform,
} from "@ore-ui-types/enums/ts";
declare global {
    namespace globalThis {
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
                getHowLongAgoAsString: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): string;
                };
                formatDate: {
                    id: number;
                    callable(timestampInSeconds: number): string;
                };
                translate: {
                    id: number;
                    callable(key: string, parameters: string[]): string;
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
            vanillaCoreDataStoreSetCommandGroup: {
                dataStoreButtonPress: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(datastore: unknown, property: unknown, hbuiRoute: string): unknown;
                };
                setDataStorePathBool: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(datastore: unknown, property: unknown, hbuiRoute: string, args_3: unknown): unknown;
                };
                setDataStorePathNumber: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(datastore: unknown, property: unknown, hbuiRoute: string, args_3: unknown): unknown;
                };
                setDataStorePathString: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(datastore: unknown, property: unknown, hbuiRoute: string, args_3: unknown): unknown;
                };
            };
            vanillaGameInviteCommandGroup: {
                invitePlatformPlayers: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): unknown;
                };
                inviteXboxPlayers: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): unknown;
                };
            };
            coreScreenReaderCommandGroup: {
                read: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
                    callable(...args: unknown[]): unknown;
                };
                clear: {
                    id: number;
                    /**
                     * @todo Figure out the types for this method.
                     */
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

        /**
         * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
         */
        interface Engine_SingleArgumentCallback<T> {
            (result: T): any;
        }
        /**
         * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
         */
        interface Engine_ArbitraryCallback {
            (...args: any[]): any;
        }
        /**
         * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
         */
        interface Engine_EventHandle {
            /**
             * Detach this handler from the event
             **/
            clear(): void;
        }
        /**
         * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
         */
        interface Engine_VirtualList {
            /**
             * Index from which the data-bind-for will start generating DOM elements. The default value is 0.
             **/
            startIndex: number;

            /**
             * The maximum number of elements that will be generated from the data-bind-for.
             **/
            pageSize: number;
        }
        /**
         * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
         */
        interface Engine_AttributeHandler {
            /**
             * This will be executed only once per element when the attribute attached to it is bound with a model.
             * Set up any initial state, event handlers, etc. here.
             * @param element The DOM element to which the handler is attached
             * @param value The result from the evaluation of the attribute's expression in the HTML
             **/
            init(element: Element, value: any): void;

            /**
             * This will be executed only once per element when the element is detached from the DOM.
             * Cleanup state, event handlers, etc. here.
             * @param element The DOM element to which the handler is attached
             **/
            deinit(element: Element): void;

            /**
             * This will be executed every time when the model on which the attribute is attached is synchronized.
             * @param element The DOM element to which the handler is attached
             * @param value The result from the evaluation of the attribute's expression in the HTML
             **/
            update(element: Element, value: any): void;
        }
        /**
         * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
         */
        interface Engine_AttributeHandlerConstructor {
            new (): Engine_AttributeHandler;
        }
        /**
         * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
         */
        interface Engine_Deferred<T> extends Promise<T> {
            /**
             * Resolve the promise with the specified value. All success handlers will be called with value
             * @param value The success value of the promise
             **/
            resolve(value: T): void;

            /**
             * Reject the promise with the specified value. All failure handlers will be called with value
             * @param value The failure value of the promise
             **/
            reject(value: T): void;
        }

        interface Engine {
            /**
             * Adds an event listener.
             *
             * @param name The name of the event.
             * @param callback The callback function.
             * @param context The context to bind the callback to. Defaults to {@link engine}.
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
            on<T extends EngineEventID, Context extends unknown = Engine>(
                name: T,
                callback: (this: Context, ...args: EngineEvent<EngineEventID extends T ? undefined : T>) => void,
                context?: Context
            ): {
                clear(): void;
            };
            /**
             * Removes an event listener.
             *
             * @param name The name of the event.
             * @param handler The callback function.
             * @param context context *this* context for the function, by default all removes all callbacks, regardless of context. Defaults to {@link engine}.
             * @warning Removing all handlers for `engine` will remove some *Coherent UI* internal events, breaking some functionality.
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
            off<T extends EngineEventID, Context extends unknown = Engine>(
                name: T,
                handler: (this: Context, ...args: EngineEvent<EngineEventID extends T ? undefined : T>) => void,
                context?: Context
            ): void;
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
            /**
             * Tries to invoke handlers for an event.
             *
             * It will invoke any handler registered in C++ or the only handler registered in JavaScript.
             * {@link engine._trigger} will handle the case where more than one event handler is registered in JavaScript
             * or there are handlers from C++ and JavaScript at the same time.
             *
             * @param name name of the event to be fired
             * @param args any extra parameters to be passed to event handlers
             * @returns `true` if any event handlers have been registered in C++ or exactly one in JavaScript. Always returns `true` in Cohtml (Ore UI).
             *
             * @deprecated This does nothing in Ore UI. It just always returns `true`.
             *
             * @note this mock-mode version will return true if there is any event handler in JavaScript
             *
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L222C3-L222C38}
             */
            TriggerEvent<T extends EngineEventID>(name: T, ...args: EngineEvent<EngineEventID extends T ? undefined : T>): boolean;
            /**
             * @deprecated This does nothing in Ore UI.
             *
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L196}
             */
            SendMessage(mockName: unknown, requestId: number, ...args: unknown[]): void;
            /**
             * Called once the engine is initialized.
             *
             * @param _version The version of the engine.
             *
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L236}
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L460}
             */
            BindingsReady(..._version: [number, number, number, number] | []): void;
            /**
             * Adds or removes an event listener.
             *
             * @param name The name of the event.
             * @param callback The callback function.
             * @param context The context to bind the callback to. Normally this is {@link engine}.
             */
            AddOrRemoveOnHandler<T extends EngineEventID, Context extends unknown = Engine>(
                name: T,
                callback: (this: Context, ...args: EngineEvent<EngineEventID extends T ? undefined : T>) => void,
                context: Context
            ): void;
            /**
             * Removes an event listener.
             *
             * @param name The name of the event.
             * @param handler The callback function.
             * @param context The context to bind the callback to. Normally this is {@link engine}.
             */
            RemoveOnHandler<T extends EngineEventID, Context extends unknown = Engine>(
                name: T,
                handler: (this: Context, ...args: EngineEvent<EngineEventID extends T ? undefined : T>) => void,
                context: Context
            ): void;
            /**
             * Enables or disables immediate layout. Disabled by default.
             * @param isEnabled Whether to enable immediate layout
             *
             * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
             **/
            enableImmediateLayout(isEnabled: boolean): void;
            /**
             * Returns whether or not immediate layout is enabled.
             * @return boolean
             *
             * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
             **/
            isImmediateLayoutEnabled(): boolean;
            /**
             * Performs Immediate Layout sync
             *
             * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
             **/
            executeImmediateLayoutSync(): void;
            /**
             * Registers a JavaScript data binding model
             *
             * @param name The name of the model
             * @param model The model's definition
             *
             * @see {@link https://github.com/CitiesSkylinesModding/StockModTemplatesDiffer/blob/247be33865ffadfe86213cb5680b508198073b96/ui/types/cohtml.d.ts#L116C19-L116C46}
             */
            createJSModel(name: string, model: object): void;
            /**
             * Unregisters a model and removes the global variable that is associated with it.
             *
             * @param model The model to be removed
             *
             * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
             **/
            unregisterModel(model: object): void;
            /**
             * Marks a model as dirty. Properties will be synchronized using the synchronizeModels call.
             *
             * @param model The model to be marked as dirty
             *
             * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
             **/
            updateWholeModel(model: object): void;
            /**
             * Applies the changes accumulated by updateWholeModel to the corresponding JavaScript objects.
             *
             * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
             **/
            synchronizeModels(): void;
            /**
             * Creates a virtual list object to be used for pagination in data-bind-for
             *
             * @returns VirtualList object for configuring the pagination options
             *
             * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
             **/
            createVirtualList(): Engine_VirtualList;
            /**
             * Registers a custom handler for a given data-bind attribute name
             *
             * @param attributeName The name for the custom data-bind attribute, excluding the "data-bind-" prefix
             * @param attributeHandler The AttributeHandler for the data-bind attribute
             *
             * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
             **/
            registerBindingAttribute(attributeName: string, attributeHandler: Engine_AttributeHandlerConstructor): void;
            addDataBindEventListner(...args: unknown[]): unknown;
            removeDataBindEventListner(...args: unknown[]): unknown;
            /**
             * Registers a JavaScript data binding model
             *
             * @param id The id that will be requested in the localization manager
             * @returns The translated text from the localization manager
             *
             * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
             **/
            translate(id: string): string;
            /**
             * Updates all localized elements having `data-l10n-id`. Useful after changing the locale.
             *
             * @see {@link https://github.com/krzychu124/Traffic/blob/cb50cdb5b67bc932c1978452e4839f4ea979f66d/UI/types/cohtml.d.ts}
             **/
            reloadLocalization(): void;
            /**
             * Used to specify the number of maximum initiators shown for a single Recalculate Styles and Layout event.
             *
             * This is for the official Gameface DevTools fork.
             *
             * @param count The number of maximum initiators shown for a single Recalculate Styles and Layout event.
             *
             * @see {@link https://docs.coherent-labs.com/unity-gameface/content_development/devtools_js/#:~:text=Tracking%20of%20different,can%20be%20analyzed.}
             */
            setInspectorInitatorsUpperBound(count: number): void;
            /**
             * Indicates whether the script is currently running inside Cohtml (Ore UI).
             *
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L144}
             */
            isAttached: boolean;
            events: Record<PropertyKey, unknown>;
            _createClear<T extends EngineEventID, Context extends unknown = Engine>(
                object: Pick<typeof engine, "events">,
                name: T,
                handler?: (this: Context, ...args: EngineEvent<T>) => void,
                context?: Context
            ): () => void;
            whenReady: Promise<undefined>;
            /**
             * Trigger an event
             *
             * This function will trigger any C++ handler registered for this event with `View::RegisterForEvent`
             *
             * @param {String} name name of the event
             * @param args any extra arguments to be passed to the event handlers
             */
            _trigger<T extends EngineEventID>(name: T, ...args: EngineEvent<EngineEventID extends T ? undefined : T>): boolean;
            /**
             * Mocks a C++ function call with the specified function.
             *
             * Only works in the browser. Attempts to use it in Coherent UI (Ore UI) will do nothing.
             *
             * @param name name of the event
             * @param mock a function to be called in-place of your native binding
             * @param isEvent whether you are mocking an event or function call
             *
             * @deprecated This does nothing in Ore UI.
             *
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L312}
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L258}
             *
             * @description
             * This is the code of this function in Coherent UI (Ore UI):
             * ```js
             * if (engine.isAttached) {
             * 	   engine.mock = function () {};
             * }
             * ```
             * This is the code of this function in the browser:
             * ```js
             * engine.mock = function (name, mock, isEvent) {
             * 	   this._mockImpl(name, mock, true, isEvent);
             * };
             * ```
             */
            mock(name: string, mock: (...args: unknown[]) => unknown, isEvent?: boolean | undefined): void;
            /**
             * Whether {@link engine} has been fully initialized.
             *
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L315}
             */
            _BindingsReady: boolean;
            /**
             * Whether the window is loaded.
             *
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L316}
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L395}
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L401}
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L412}
             */
            _WindowLoaded: boolean;
            /**
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L317}
             */
            _RequestId: 0;
            /**
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L318}
             */
            _ActiveRequests: {
                [id: number]: {
                    resolve: (value: unknown) => void;
                    reject: (reason?: any) => void;
                };
            };
            /**
             * Call asynchronously a C++ handler and retrieve the result
             *
             * The C++ handler must have been registered with `View::BindCall`
             *
             * @param {String} name name of the C++ handler to be called
             * @param args any extra parameters to be passed to the C++ handler
             * @returns ECMAScript 6 promise
             *
             * @see {@link https://github.com/CoherentLabs/StarterGuide/blob/f533a0c505a787a7f348ea3464f60992c09509cb/files/chapter_11/cohtml.js#L326}
             **/
            call(
                name: Parameters<NonNullable<(typeof engine)["SendMessage"]>>[0],
                ...args: RemoveFirstNElements<Parameters<NonNullable<(typeof engine)["SendMessage"]>>, 2>
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

        type FacetErrorCode =
            | "activate-facet-not-found"
            | "deactivate-facet-not-found"
            | "facet-is-already-active"
            | "facet-is-already-deactivated"
            | "facet-initialization-failed";

        type EngineCallErrorCode = "No handler registered";

        type SupportedURIProtocol =
            // Standard:
            | "profile-img"
            | "qr"
            | "id"
            | "pack"
            | "ui"
            // Editor Mode Exclusive:
            | "structure"
            | "block";
        // NOTE: `api://` and `ws://` may also exist.

        // engine.on("facet:updated:core.router", (v)=>console.info(JSONB.stringify(v)))

        type SpecialFunctionalityRoute =
            // JSON UI Screens:
            | "/tabbed-upsell" // Unlock Full Game modal.
            | "/win10-trial-conversion" // Unlock Full Game collection selection screen.
            | "/update-version" // Cannot access marketplace due to outdated version modal.
            | "/world-pre-loading-screen" // World loading screen.
            | "/project-pre-loading-screen" // Editor mode world loading screen.
            | "/marketplace" // Marketplace
            | "/marketplace/realms-2p-subscription" // Marketplace
            | "/marketplace/inventory" // Marketplace
            | "/marketplace/store" // Marketplace
            | "/marketplace?productId=-1" // Marketplace error L-404 screen.
            | "/marketplace?productId=" // Marketplace error L-400 screen.
            | `/marketplace?productId=${string}` // Marketplace product screen.
            | "/marketplace?pageId=-1" // Marketplace error L-404 screen.
            | "/marketplace?pageId=" // Marketplace error L-400 screen.
            | `/marketplace?pageId=${string}` // Marketplace page screen.
            | "/credits" // End credits screen. (not the end poem, but the credits)
            | "/credits/end-poem" // End credits screen. (not the end poem, but the credits)
            | "/persona" // Dressing room screen.
            | "/realms-stories-timeline-information" // Minecraft Encyclopedia: Realms Stories
            | "/settings/members/manage" // Settings (No section selected)
            | "/settings/world/saves" // Settings
            | "/csb-pdp?tab=default" // Marketplace Pass info screen.
            | "/safezone" // Safezone selection screen.
            | "/settings" // Settings
            | "/realms-plus-ended-screen" // Realms Plus Subscription Expired modal.
            | "/mobile-data-blocked-modal/links/settings-page" // General Settings
            | "/settings/accessibility" // Settings
            | "/settings/how_to_play" // Settings
            | "/settings/keyboard-and-mouse" // Settings
            | "/settings/controller" // Settings
            | "/settings/touch" // Settings
            | "/settings/party" // Settings
            | "/settings/general" // General Settings
            | "/settings/video" // Video Settings
            | "/settings/audio" // Settings
            | "/settings/account" // Settings
            | "/settings/global_resources" // Settings
            | "/settings/storage" // Settings
            | "/settings/language" // Settings
            | "/settings/creator" // Settings
            | "/settings/debug" // Settings
            | "/settings/ui_debug" // Settings
            // | "/settings/????" // Edu Debug Settings
            | "/settings/marketplace_debug" // Settings
            // | "/settings/????" // Gatherings Settings
            | "/settings/flighting_debug" // Settings
            | "/settings/automation" // Settings
            | "/settings/game" // World Game Settings
            | "/settings/multiplayer" // World Multiplayer Settings
            | "/settings/classroom" // World Classroom Settings
            // | "/settings/????" // World Resource Packs Settings
            // | "/settings/????" // World Behavior Packs Settings
            | "/settings/classroom" // World Classroom Settings
            // | "/settings/????" // World Debug Settings
            // | "/settings/????" // Realm Game Settings
            | "/settings/members" // Realm Members Settings
            | "/settings/subscription" // Realm Subscription Settings
            // | "/settings/????" // TODO: Realms Backups Settings
            | "/settings/dev_options" // Realms Dev Options Settings

            // Crashing Screens:
            | "/realms-allowlist"
            | "/realms-create-screen"
            | "/csb-pdp"
            | "/realm-settings"
            | "/realms-plus-pdp"

            // Untriggerable Screens:
            | "/__INVALID_ROUTE__"
            | "/__bedrock__/cubemap_background_screen"
            | "/__bedrock__/debug_screen"
            | "/__bedrock__/toast_screen"
            | "/__bedrock__/start_screen"
            | "/__bedrock__/hud_screen"
            | "/__bedrock__/pause_screen"
            | "/__bedrock__/gamepad_disconnected_screen"
            | "/__bedrock__/in_game_play_screen"
            | "/__bedrock__/credits_screen"
            | "/legacy-player-permissions"
            | "/legacy-create-new-world"
            | "/legacy-play"
            | "/legacy-edit-world"
            | "/legacy-edit-realm-world"
            | "/invite-screen-legacy"
            | "/legacy-start-from-template"
            | "/sign-in-achievements"
            | "/gameplay/menu"
            | "/gameplay/chat"
            | "/gameplay/pause-menu/debug-drawer"
            | "/send-invites"
            | "/edit-realm-world"
            | "/view-all-packs"
            | "/game-settings"
            | "/pack-settings"
            | "/realms-permissions"
            | "/realms-replace-world"
            | "/manifest-validation"

            // Blank Screens:
            // | "/realms-purchase-subscription/"
            // | "/player-permissions"
            // | "/edit-world"
            // | "/realms-create-preview-with-only-one-subscription"
            // | "/realms-choose-slot/"
            // | "/announcement-modal"
            // | "/achievement-detail"
            // | "/realms-stories-report-feed-item"
            // | "/realms-story-comments"

            // Ore UI Screens:
            // | "/disconnected"
            // | "/friends-drawer"
            // | "/hardcore-mode-world-warning-modal-route"
            // | "/sign-in-worlds-friends-servers"
            // | "/realms-pdp"
            // | "/create-new-world"
            // | "/post-to-realm-stories"
            // | `/edit-world/${string}/general/?packid=` // Edit World error screen.
            // | `/edit-world/${string}/general/?packid=${string}`
            // | "/new-player-path/mode"
            // | "/new-player-path/survival/difficulty"
            // | "/idle-route"
            // | "/first-time-sign-in"
            // | "/realms-plan-picker-in-game"
            // | "/realms-plan-picker"
            // | "/inbox"
            // | "/play"
            // | "/start-from-template"
            // | "/sign-in-play-on-server"
            // | "/add-friend"
            // | "/sign-in-add-friend"
            // | "/realms-choose-realm/realm-subscriptions"
            // | "/account-unlink"
            // | "/mobile-data-blocked-modal/show-modal"
            // | "/touch-control-selection"
            // | "/achievements"
            // | "/realms-stories"
            // | "/realms-story-entry-route"
            // | "/realms-story-share-link-modal-route"
            // | "/realms-new-story"
            // | "/realms-stories-settings"

            // Ore UI Editor Mode Screens:
            // | "/editor"

            // Other Screens:
            | "/sign-in" // Closes itself, probably because I am already signed in, test while signed out.
            | "/sign-in?signInSource=AnnouncementModal_OreUI"; // Closes itself, probably because I am already signed in, test while signed out.

        // Unchecked Screens:

        type EngineEventID = LooseAutocomplete<
            | "facet:request"
            | `facet:updated:${FacetList[number]}`
            | `facet:error:${FacetList[number]}`
            | "facet:discard"
            | "engine:gamepad:onPress"
            | "engine:gamepad:onJoystickMovement"
            | "core:mouse:delta"
            | "core:touchdevice:back"
            | "core:keyboard:changed"
            | "core:keyboard:submitted"
            | "core:keyboard:dismissed"
            | "core:keyboard:tabbed"
            | "core:exception"
            | "core:gui:flush-audio-streams"
            | "core:gui:resize-hack"
            | `query:subscribed/${number | bigint}`
            | `query:updated/${number | bigint}`
            | `query:subscribe/${keyof EngineQuerySubscribeEventParamsMap}`
            | "query:unsubscribe"
            | "core:routing:not-found"
            | "core:telemetry:eventfulNavigation"
            | "core:telemetry:firstMeaningfulPaint"
            | "core:telemetry:firstContentfulPaint"
            | "core:telemetry:uneventfulNavigation"
            | "Ready"
            | "_Unhandled"
            | "_Result"
            | "_Reject"
            | "_OnReady"
            | "_OnError"
            | "*"
        >;
        type EngineEvent<T extends EngineEventID | undefined> =
            T extends "facet:request" ? [facetName: FacetList[number], facetName: FacetList[number], options: Record<PropertyKey, any>]
            : T extends "facet:discard" ? [facetName: FacetList[number]]
            : T extends `facet:updated:${infer Facet}` ?
                Facet extends FacetList[number] ?
                    [facetValue: FacetTypeMap[Facet]]
                :   [facetValue: unknown]
            : T extends `facet:error:${infer _Facet}` ?
                [errorMessage: FacetErrorCode] // TODO: Figure out the type of this.
            : T extends "engine:gamepad:onPress" ?
                [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "engine:gamepad:onJoystickMovement" ?
                [
                    // Horizontal values are positive towards the right, vertical values are positive towards the bottom.
                    joystickLeftHorizontal: number,
                    joystickLeftVertical: number,
                    joystickRightHorizontal: number,
                    joystickRightVertical: number,
                ]
            : T extends "core:mouse:delta" ?
                [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:touchdevice:back" ?
                [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:keyboard:changed" ?
                [
                    textInputChangeDetails: {
                        index: number;
                        invalidChars: string;
                        removedChars: string;
                        addedChars: string;
                    },
                ]
            : T extends "core:keyboard:submitted" ?
                [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:keyboard:dismissed" ?
                [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:keyboard:tabbed" ?
                [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:exception" ?
                [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:gui:flush-audio-streams" ?
                [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "core:gui:resize-hack" ? []
            : T extends `query:subscribed/${infer _QueryID extends number}` ?
                [...args: any[]] // TODO: Figure out the type of this.
            : T extends `query:updated/${infer _QueryID extends number}` ?
                [...args: any[]] // TODO: Figure out the type of this.
            : T extends `query:subscribe/${infer QueryName}` ?
                [
                    queryID: number | bigint,
                    ...queryParams: QueryName extends keyof EngineQuerySubscribeEventParamsMap ? EngineQuerySubscribeEventParamsMap[QueryName] : unknown[],
                ]
            : T extends "query:unsubscribe" ?
                [queryName: unknown] // TODO: Figure out the type of this.
            : T extends "core:telemetry:eventfulNavigation" | "core:telemetry:firstMeaningfulPaint" | "core:telemetry:firstContentfulPaint" | "Ready" ? []
            : T extends "core:telemetry:uneventfulNavigation" ?
                [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "_Unhandled" ? [eventName: LooseAutocomplete<EngineEventID>, ...args: any[]]
            : T extends "_Result" | "_Reject" | "_OnReady" | "_OnError" ?
                [...args: unknown[]] // TODO: Figure out the type of this.
            : T extends "*" ? [...args: any[]]
            : [...args: unknown[]];
        interface EngineQuerySubscribeEventDeprecatedParamsMap {}
        interface EngineQuerySubscribeEventParamsMap {
            "core.locale": [];
            "core.splitscreen": [];
            "core.safeZone": [];
            "core.animation": [];
            "core.input": [];
            "vanilla.core.dataDrivenUICompositionQuery": [
                screenID: LooseAutocomplete<
                    | "minecraft:default_chest_screen"
                    | "minecraft:chest_screen"
                    | "minecraft:barrel_screen"
                    | "minecraft:ender_chest_screen"
                    | "minecraft:shulker_box_screen"
                >,
            ];
            "vanilla.gameplay.furnace": [];
            /**
             * @todo Figure out what `unknownArg1` is.
             */
            vanillaCoreDataDrivenUIDefinitionQuery: [
                unknownArg1: number | bigint,
                screenID: LooseAutocomplete<
                    | "minecraft:default_chest_screen"
                    | "minecraft:chest_screen"
                    | "minecraft:barrel_screen"
                    | "minecraft:ender_chest_screen"
                    | "minecraft:shulker_box_screen"
                >,
            ];
            vanillaCoreDataDrivenUIScreenIdQuery: [];
            /**
             * @todo Figure out the parameters of this query.
             */
            vanillaCoreDataStoreNumberQuery: [...args: unknown[]];
            /**
             * @todo Figure out the parameters of this query.
             */
            vanillaCoreDataStoreStringQuery: [...args: unknown[]];
            /**
             * @todo Figure out the parameters of this query.
             */
            vanillaCoreDataStoreBoolQuery: [...args: unknown[]];
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
            /**
             * @todo Figure out the parameters of this query.
             */
            "vanilla.menus.settingsGroupQuery": [...args: unknown[]];
            /**
             * @todo Figure out the parameters of this query.
             */
            "vanilla.menus.settingsGroupInfoQuery": [...args: unknown[]];
            /**
             * @todo Figure out the parameters of this query.
             */
            "vanilla.menus.settingsUiDebugQuery": [...args: unknown[]];
            /**
             * @todo Figure out the parameters of this query.
             */
            "vanilla.menus.settingsTextQuery": [...args: unknown[]];
            /**
             * @todo Figure out the parameters of this query.
             */
            "vanilla.menus.settingsBooleanQuery": [...args: unknown[]];
            /**
             * @todo Figure out all of the option IDs and put them into a type.
             */
            "vanilla.menus.settingsNumberQuery": [optionID: LooseAutocomplete<"video.mode.fancy.framerate">];
            /**
             * @todo Figure out the parameters of this query.
             */
            "vanilla.menus.settingsOptionQuery": [...args: unknown[]];
            /**
             * @todo Figure out the parameters of this query.
             */
            "vanilla.menus.settingsActionQuery": [...args: unknown[]];
            /**
             * @todo Figure out the parameters of this query.
             */
            "vanilla.menus.buildInfoQuery": [...args: unknown[]];
        }
        interface EngineQueryNonFacetResultMap {
            "core.locale": {
                __Type: `core.locale$_$${number}`;
                locale: LooseAutocomplete<"en_US">;
            };
            "core.splitscreen": {
                __Type: `core.splitscreen$_$${number}`;
                isPrimaryUser: boolean;
                splitScreenPosition: number;
                numActivePlayer: number;
                splitScreenDirection: number;
            };
            "core.safeZone": {
                __Type: `core.safeZone$_$${number}`;
                safeAreaX: number;
                safeAreaY: number;
                screenPositionX: number;
                screenPositionY: number;
            };
            "core.animation": {
                __Type: `core.animation$_$${number}`;
                screenAnimationEnabled: boolean;
            };
            "core.input": {
                __Type: `core.input$_$${number}`;
                swapABButtons: boolean;
                swapXYButtons: boolean;
                currentInputType: number;
                enableControllerHints: boolean;
                keyboardType: number;
                interactionModelLocked: boolean;
            };
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
            vanillaCoreDataDrivenUIDefinitionQuery: {
                __Type: `vanillaCoreDataDrivenUIDefinitionQuery$_$${number}`;
                /**
                 * The data of this UI definition.
                 */
                children: Record<string, any>;
            };
            vanillaCoreDataDrivenUIScreenIdQuery: {
                __Type: `vanillaCoreDataDrivenUIScreenIdQuery$_$${number}`;
                screenId: null | string;
            };
            vanillaCoreDataStoreNumberQuery: unknown; // TODO
            vanillaCoreDataStoreStringQuery: unknown; // TODO
            vanillaCoreDataStoreBoolQuery: unknown; // TODO
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
                /**
                 * @todo Make the type an enum.
                 */
                damageState: number;
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
            /**
             * @todo Figure out the type of this query.
             */
            "vanilla.menus.settingsGroupQuery": unknown;
            /**
             * @todo Figure out the type of this query.
             */
            "vanilla.menus.settingsGroupInfoQuery": unknown;
            /**
             * @todo Figure out the type of this query.
             */
            "vanilla.menus.settingsUiDebugQuery": unknown;
            /**
             * @todo Figure out the type of this query.
             */
            "vanilla.menus.settingsTextQuery": unknown;
            /**
             * @todo Figure out the type of this query.
             */
            "vanilla.menus.settingsBooleanQuery": unknown;
            /**
             * @todo Add the version this was added in.
             */
            "vanilla.menus.settingsNumberQuery":
                | {
                      __Type: `vanilla.menus.settingsNumberQuery$_$${number}`;
                      id: "video.mode.fancy.framerate";
                      name: LooseAutocomplete<"Framerate Limit">;
                      /**
                       * @todo Make the type an enum.
                       */
                      state: number;
                      description: LooseAutocomplete<"Set a limit for maximum frames per second to keep a steady frame rate or prevent overheating your device">;
                      value: LooseAutocompleteB<number, 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>;
                      valueText: LooseAutocomplete<`${30 | 35 | 40 | 45 | 50 | 55 | 60} FPS` | "Unlimited">;
                      min: LooseAutocompleteB<number, 0>;
                      max: LooseAutocompleteB<number, 7>;
                      step: LooseAutocompleteB<number, 1>;
                  }
                | {
                      __Type: `vanilla.menus.settingsNumberQuery$_$${number}`;
                      id: string;
                      // TODO: Add the rest of the fields.
                      [key: PropertyKey]: unknown;
                  };
            /**
             * @todo Figure out the type of this query.
             */
            "vanilla.menus.settingsOptionQuery": unknown;
            /**
             * @todo Figure out the type of this query.
             */
            "vanilla.menus.settingsActionQuery": unknown;
            /**
             * @todo Figure out the type of this query.
             */
            "vanilla.menus.buildInfoQuery": unknown;
        }
        type EngineQueryResult<T extends LooseAutocomplete<FacetList[number] | keyof EngineQueryNonFacetResultMap>> =
            T extends keyof EngineQueryNonFacetResultMap ? EngineQueryNonFacetResultMap[T]
            : T extends FacetList[number] ?
                FacetTypeMap[T] & {
                    __Type: `${T}$_$${number}`;
                }
            :   {
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

            // Found in 1.26.0.26 preview (but may have existed before that).
            "vanilla.realmsWorldEditorWorldDetailsCommands",
            "vanilla.realmsWorldPackEditorQueries",
            "vanilla.realmsWorldPackEditorCommands",

            // Found in 1.26.0.2 Release (it is unknown what preview these were added in).
            "vanilla.realmsRegionSettingsCommands",
            "vanilla.realmsRegionSettingsQueries",

            // Editor mode only facets (crashes the game when not in editor mode).
            editorModeOnly: "vanilla.editorLogging", // Crashes the game in the v1.21.110.23 preview when not in editor mode.
            editorModeOnly: "vanilla.editorBlockPalette", // Crashes the game when not in editor mode.
            editorModeOnly: "vanilla.editorInputBinding", // Crashes the game when not in editor mode.
            editorModeOnly: "vanilla.editorInputState", // Crashes the game when not in editor mode.
            editorModeOnly: "vanilla.editorProjectConstants", // Crashes the game when not in editor mode.
            editorModeOnly: "vanilla.editorStructure", // Crashes the game when not in editor mode.
            editorModeOnly: "vanilla.editorTutorial", // Crashes the game when not in editor mode.
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
            /**
             * @deprecated Removed in either 1.26.0.23, 1.26.0.25, or 1.26.0.26.
             * @see
             * Use the `core.locale` query and {@link __commands__.coreTranslateCommandGroup| \_\_commands\_\_.coreTranslateCommandGroup} instead.
             */
            "core.locale": {
                /**
                 * @deprecated This facet was removed in either 1.26.0.23, 1.26.0.25, or 1.26.0.26.
                 * Use the `core.locale` query instead.
                 */
                locale: LooseAutocomplete<"en_US">;
                /**
                 * @deprecated This facet was removed in either 1.26.0.23, 1.26.0.25, or 1.26.0.26.
                 * @see {@link __commands__.coreTranslateCommandGroup.formatDate.callable | \_\_commands\_\_.coreTranslateCommandGroup.formatDate.callable}
                 */
                formatDate(timestampInSeconds: number): string;
                /**
                 * @deprecated This facet was removed in either 1.26.0.23, 1.26.0.25, or 1.26.0.26.
                 * @see {@link __commands__.coreTranslateCommandGroup.getHowLongAgoAsString.callable | \_\_commands\_\_.coreTranslateCommandGroup.getHowLongAgoAsString.callable}
                 */
                getHowLongAgoAsString(...args: unknown[]): string;
                /**
                 * @deprecated This facet was removed in either 1.26.0.23, 1.26.0.25, or 1.26.0.26.
                 * @see {@link __commands__.coreTranslateCommandGroup.translate.callable | \_\_commands\_\_.coreTranslateCommandGroup.translate.callable}
                 */
                translate(key: string): string;
                /**
                 * @deprecated This facet was removed in either 1.26.0.23, 1.26.0.25, or 1.26.0.26.
                 * @see {@link __commands__.coreTranslateCommandGroup.translate.callable | \_\_commands\_\_.coreTranslateCommandGroup.translate.callable}
                 */
                translateWithParameters(key: string, parameters: string[]): string;
            };
            /**
             * NOTE: Not present in 1.21.120.4 (may exist in dev builds).
             *
             * @todo Get the type for this facet.
             */
            "core.performanceFacet": unknown;
            /**
             * The router facet.
             *
             * This is used for navigating between routes in the UI.
             */
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
                     * @param distance The distance to move. Negative numbers go back, positive numbers go forward.
                     */
                    go(distance?: number | undefined): void;
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
            /**
             * @deprecated Removed in either 1.26.0.23, 1.26.0.25, or 1.26.0.26.
             * @see
             * Use the `core.splitScreen` query instead.
             */
            "core.splitScreen": {
                /**
                 * @deprecated This facet was removed in either 1.26.0.23, 1.26.0.25, or 1.26.0.26.
                 * @see
                 * Use the `core.splitScreen` query instead.
                 */
                splitScreenDirection: number;
                /**
                 * @deprecated This facet was removed in either 1.26.0.23, 1.26.0.25, or 1.26.0.26.
                 * @see
                 * Use the `core.splitScreen` query instead.
                 */
                numActivePlayers: number;
                /**
                 * @deprecated This facet was removed in either 1.26.0.23, 1.26.0.25, or 1.26.0.26.
                 * @see
                 * Use the `core.splitScreen` query instead.
                 */
                splitScreenPosition: number;
                /**
                 * @deprecated This facet was removed in either 1.26.0.23, 1.26.0.25, or 1.26.0.26.
                 * @see
                 * Use the `core.splitScreen` query instead.
                 */
                isPrimaryUser: boolean;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             *
             * @todo Get the type for this facet.
             */
            "core.social": unknown;
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
                 * @returns `null`
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
             *
             * @todo Get the type for this facet.
             */
            "core.user": unknown;
            /**
             * @deprecated This has been removed.
             *
             * @todo Get the type for this facet.
             */
            "core.vrMode": unknown; // Found in dev build file.
            "vanilla.achievements": {
                data: PlayerAchievementData;
                /**
                 * @todo Make the type an enum.
                 */
                status: number;
                /**
                 * @todo Figure out the types for this method.
                 */
                setTrackedStatus(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.achievementsReward": unknown;
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
                /**
                 * @todo Make the type an enum.
                 */
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
                        /**
                         * @todo Make the type an enum.
                         */
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
                        /**
                         * @todo Make the type an enum.
                         */
                        daylightCycle: number;
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
                        /**
                         * @todo Make the type an enum.
                         */
                        playerPermissions: number;
                        /**
                         * @todo Make the type an enum.
                         */
                        playerAccess: number;
                        /**
                         * @todo Make the type an enum.
                         */
                        generalWarningState: number;
                        platformPlayerFriendsOfFriendsAccessSupported: boolean;
                        platformPlayerInviteAccessSupported: boolean;
                        platformPlayerAccessEnabled: boolean;
                        platformPlayerAccessSupported: boolean;
                        /**
                         * @todo Make the type an enum.
                         */
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
                        /**
                         * @todo Make the type an enum.
                         */
                        generatorType: number;
                        useFlatWorld: boolean;
                    };
                    general: {
                        /**
                         * @todo Make the type an enum.
                         */
                        difficulty: number;
                        playerHasDied: boolean;
                        isHardcore: boolean;
                        /**
                         * @todo Make the type an enum.
                         */
                        gameMode: number;
                        worldName: string;
                    };
                };
                worldPreviewImagePath: string;
                /**
                 * @todo Make the type an enum.
                 */
                createOnRealmsError: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                createWorldError: null | number;
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
                /**
                 * @todo Make the type an enum.
                 */
                createPreviewRealmFromSubscriptionResult: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                createPreviewRealmFromSubscriptionTaskState: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                editorMode: number;
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
                 * @returns `null`
                 */
                navigateUri(uri: string): null;
                /**
                 * @todo Figure out the types for this method.
                 */
                getCursorBlockName(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.editorInput": unknown;
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             *
             * @todo Get the type for this facet.
             */
            "vanilla.editorLogging": unknown;
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
             *
             * @todo Get the type for this facet.
             */
            "vanilla.editorSelectionFacet": unknown;
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
                playerList: CoherentArrayProxy<AddFriendUserItem>;
                isLoading: boolean;
            };
            "vanilla.friendsListFacet": {
                /**
                 * @todo Figure out the types for this array.
                 */
                platformFriends: CoherentArrayProxy<unknown>;
                xblFriends: CoherentArrayProxy<SocialPlayer>;
                /**
                 * @todo Make the type an enum.
                 */
                platformLoadingState: number;
                /**
                 * @todo Make the type an enum.
                 */
                xblLoadingState: number;
                /**
                 * @todo Figure out the types for this method.
                 */
                userControlledUpdateGameList(...args: unknown[]): unknown;
                // Unverified deprecated properties.
                /**
                 * This property may or may not have existed in older versions.
                 *
                 * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
                 * @deprecated Newer versions use the `xblLoadingState` property instead.
                 */
                loadingState?: number;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.friendsManagerFacet": unknown;
            "vanilla.gameplay.activeLevelHardcoreMode": {
                isHardcoreMode: null | boolean;
            };
            "vanilla.gameplay.bedtime": {
                canChangeSleepSettings: boolean;
                isAbleToSleep: boolean;
                remotePlayersCount: number;
                /**
                 * @todo Make the type an enum.
                 */
                chatAvailability: number;
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
             *
             * @todo Get the type for this facet.
             */
            "vanilla.gameplay.closeContainerCommand": unknown;
            /**
             * NOTE: Not present in 1.21.120.4.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.gameplay.containerBlockActorType": unknown;
            /**
             * @see {@link EngineQuerySubscribeEventParamsMap.vanillaGameplayContainerItemQuery}
             * @see {@link EngineQueryNonFacetResultMap.vanillaGameplayContainerItemQuery}
             *
             * @deprecated This has been removed in 1.21.120.4 and replaced with the new query system.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.gameplay.containerItemQuery": unknown;
            /**
             * @see {@link EngineQuerySubscribeEventParamsMap.vanillaGameplayContainerSizeQuery}
             * @see {@link EngineQueryNonFacetResultMap.vanillaGameplayContainerSizeQuery}
             *
             * @deprecated This has been removed in 1.21.120.4 and replaced with the new query system.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.gameplay.containerSizeQuery": unknown;
            /**
             * @see {@link EngineQuerySubscribeEventParamsMap | EngineQuerySubscribeEventParamsMap["vanilla.gameplay.furnace"]}
             * @see {@link EngineQueryNonFacetResultMap | EngineQueryNonFacetResultMap["vanilla.gameplay.furnace"]}
             *
             * @deprecated This has been removed in 1.21.120.4 and replaced with the new query system.
             *
             * @todo Get the type for this facet.
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
             *
             * @todo Get the type for this facet.
             */
            "vanilla.gameplay.playerPositionHudElement": unknown;
            "vanilla.gameplay.playerRespawn": {
                isAlive: boolean;
                /**
                 * @returns `null`
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
                    /**
                     * @todo Make the type an enum.
                     */
                    style: number;
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
                    /**
                     * @todo Make the type an enum.
                     */
                    invStatus: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                refreshTaskState: number;
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
                    /**
                     * @todo Make the type an enum.
                     */
                    storeCatalogCategory: number;
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
                    /**
                     * @todo Figure out the types for this array.
                     */
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
                    /**
                     * @added in a 1.26.10 preview.
                     * @todo Figure out what 1.26.10 preview this was added in.
                     */
                    isSupportedForPartyTravel?: boolean;
                };
                /**
                 * Loads the details of a network world.
                 *
                 * @param {`${number | bigint | string}`} id The ID of the server, if it is a non-numeric string it should be a UUID (ex. `a26af7a2-ed3b-473d-8d1c-a5b4733b85bd`).
                 * @param {0 | 1 | 2 | 3} type `0` = Featured Server, `1` = External Server, `2` = Realm, `3` = LAN Server
                 * @returns {undefined | null} `undefined` if the parameters are invalid, `null` otherwise.
                 */
                loadNetworkWorldDetails(id: `${number | bigint | string}`, type: 0 | 1 | 2 | 3): undefined | null;
            };
            "vanilla.networkWorldJoiner": {
                /**
                 * @todo Make the type an enum.
                 */
                joinLANServerTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                joinLANServerResult: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                joinFriendServerTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                joinFriendServerResult: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                joinRealmTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                joinRealmResult: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                joinExternalServerTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                joinExternalServerResult: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                joinThirdPartyServerTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                joinThirdPartyServerResult: null | number;
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
                 * @returns `null`
                 */
                queueSnackbar(message: string): null;
            };
            "vanilla.options": {
                playVideoInTouchControlSelectionScreen: boolean;
                useMobileDataOnce: boolean;
                showTouchControlSelectionScreen: boolean;
                /**
                 * @todo Make the type an enum.
                 */
                touchControlScheme: number;
                showRenderDistanceWarningModal: boolean;
                maxRenderDistance: number;
                defaultRenderDistance: number;
                renderDistance: number;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.party": unknown;
            "vanilla.playerAchievements": {
                data: PlayerAchievementData;
                /**
                 * @todo Make the type an enum.
                 */
                status: number;
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
                playerList: CoherentArrayProxy<AddFriendUserItem>;
                isLoading: boolean;
                /**
                 * @todo Figure out the types for this method.
                 */
                load(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.playerLinkedPlatformProfile": unknown; // Found in dev build file.
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
                /**
                 * @todo Make the type an enum.
                 */
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
            "vanilla.playerPermissions": {
                /**
                 * @todo Make the type an enum.
                 */
                kickCommandState: number;
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
                playerPermissionLevel: null | PlayerPermissionLevel<"values">;
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
                playerProfiles: CoherentArrayProxy<PlayerProfile>;
                /**
                 * Subscribes to a player's profile.
                 *
                 * @param xuid The XUID of the player to subscribe to.
                 * @param platformId The platform ID of the player to subscribe to. Can be an empty string if there isn't one.
                 *
                 * @todo Figure out the types for this method.
                 */
                subscribeToProfile(xuid: string, platformId: LooseAutocomplete<"">): unknown;
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
                /**
                 * @todo Make the type an enum.
                 */
                reportReason: number;
                /**
                 * @todo Make the type an enum.
                 */
                reportArea: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                error: number;
                /**
                 * @todo Make the type an enum.
                 */
                state: number;
                /**
                 * @todo Make the type an enum.
                 */
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
                /**
                 * @todo Make the type an enum.
                 */
                fetchRealmError: null | number;
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
             *
             * @todo Get the type for this facet.
             */
            "vanilla.realmsStories.localScreenshots": unknown;
            "vanilla.realmsStories.persistentData": {
                newPostAvailable: boolean;
                /**
                 * @todo Make the type an enum.
                 */
                currentMemberSortOption: number;
                /**
                 * @todo Make the type an enum.
                 */
                currentMemberFilterOption: number;
                currentMemberSearchText: string;
                storyScreenshotSelectionFilePath: string;
                commentInProgressBody: string;
                postInProgressBody: string;
                currentStoryId: string;
            };
            "vanilla.realmsStories.players": {
                /**
                 * @todo Make the type an enum.
                 */
                fetchOnlineMembersStatus: number;
                /**
                 * @todo Make the type an enum.
                 */
                fetchMembersStatus: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                currentMemberSortOption: number;
                /**
                 * @todo Make the type an enum.
                 */
                currentMemberFilterOption: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                postStoryStatus: number;
                storiesFirstPageReady: boolean;
                /**
                 * @todo Make the type an enum.
                 */
                storiesStatus: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                uploadWorldToRealmError: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                uploadWorldToRealmTaskState: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                xboxAPICallResult: number;
                /**
                 * @added some time after 1.21.93.1.
                 *
                 * @todo Figure out exactly what version this was added in.
                 */
                recentlyPlayedWith: CoherentArrayProxy<SocialPlayer>;
                playerList: CoherentArrayProxy<AddFriendUserItem>;
                isLoading: boolean;
            };
            "vanilla.recommendedFriendsList": {
                /**
                 * @todo Make the type an enum.
                 */
                xboxAPICallResult: number;
                playerList: CoherentArrayProxy<AddFriendUserItem>;
                isLoading: boolean;
            };
            "vanilla.resourcePackOverrides": {
                /**
                 * This is in an unknown format.
                 *
                 * @example 62125.210887600006
                 */
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
                /**
                 * @todo Make the type an enum.
                 */
                status: number;
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
             *
             * @todo Get the type for this facet.
             */
            "vanilla.screenshotGalleryList": unknown;
            "vanilla.screenSpecificOptions": {
                devPlayScreenHideLanWorlds: boolean;
                /**
                 * @todo Make the type an enum.
                 */
                playScreenWorldLayoutMode: number;
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
            } & (
                | {
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
                  }
                | {
                      creatorExperiences: CoherentArrayProxy<{
                          msgOfTheDay: string;
                          image: string;
                          capacity: number;
                          playerCount: number;
                          pingStatus: number;
                          ping: string;
                          description: string;
                          name: string;
                          /**
                           * @example "086920fe-4f18-4db5-a7bf-b587cec822ec"
                           */
                          id: string;
                      }>;
                      featuredExperiences: CoherentArrayProxy<{
                          msgOfTheDay: string;
                          image: string;
                          capacity: number;
                          playerCount: number;
                          pingStatus: number;
                          ping: string;
                          description: string;
                          name: string;
                          /**
                           * @example "a26af7a2-ed3b-473d-8d1c-a5b4733b85bd"
                           */
                          id: string;
                      }>;
                  }
            );
            "vanilla.unpairedRealmsListFacet": {
                /**
                 * @todo Figure out the types for this array.
                 */
                realms: CoherentArrayProxy<unknown>;
                state: number;
                compatibility: undefined;
                /**
                 * @todo Figure out the types for this method.
                 */
                forceFetchUnpairedRealmsList(...args: unknown[]): unknown;
            };
            "vanilla.userAccount": {
                /**
                 * @todo Make the type an enum.
                 */
                signInPlatformNetworkTaskResult: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                signInPlatformNetworkTaskState: number;
                isSignedInPlatformNetwork: boolean;
                /**
                 * @todo Make the type an enum.
                 */
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
                 * Opens a hardcoded link.
                 *
                 * @param linkId The link to open. Should be a {@link WebBrowserFacetLinkType}.
                 * @returns `null`
                 *
                 * @example
                 * ```ts
                 * // Opens the Edit World Screen feedback page.
                 * openLink(WebBrowserFacetLinkType.EditWorldScreenFeedbackPage);
                 * ```
                 */
                openLink(linkId: WebBrowserFacetLinkType<"values">): null;
                /**
                 * Opens a hardcoded link with a parameter appended to the end of the URI.
                 *
                 * @param linkId The link to open. Should be a {@link WebBrowserFacetLinkType}.
                 * @param param The string to be appended to the end of the URI.
                 * @returns `null`
                 *
                 * @example
                 * ```ts
                 * // Opens the Xbox account profile of "Andexter8".
                 * openLinkWithParams(WebBrowserFacetLinkType.XboxAccountProfile, "Andexter8");
                 * ```
                 */
                openLinkWithParams(linkId: WebBrowserFacetLinkType<"values">, param: string): null;
            };
            "vanilla.worldCloudSyncFacet": {
                /**
                 * @todo Make the type an enum.
                 */
                syncWorldTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                syncWorldResult: null | number;
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
                /**
                 * @todo Make the type an enum.
                 */
                loadWorldTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                loadWorldError: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                saveRealmsWorldTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                saveRealmsWorldError: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                saveLocalWorldTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                saveLocalWorldError: null | number;
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
                        /**
                         * @todo Make the type an enum.
                         */
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
                        /**
                         * @todo Make the type an enum.
                         */
                        daylightCycle: number;
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
                        /**
                         * @todo Make the type an enum.
                         */
                        playerPermissions: number;
                        /**
                         * @todo Make the type an enum.
                         */
                        playerAccess: number;
                        /**
                         * @todo Make the type an enum.
                         */
                        generalWarningState: number;
                        platformPlayerFriendsOfFriendsAccessSupported: boolean;
                        platformPlayerInviteAccessSupported: boolean;
                        platformPlayerAccessEnabled: boolean;
                        platformPlayerAccessSupported: boolean;
                        /**
                         * @todo Make the type an enum.
                         */
                        platformPlayerAccess: number;
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
                        /**
                         * @todo Make the type an enum.
                         */
                        generatorType: number;
                        useFlatWorld: boolean;
                    };
                    general: {
                        /**
                         * @todo Make the type an enum.
                         */
                        difficulty: number;
                        playerHasDied: boolean;
                        isHardcore: boolean;
                        /**
                         * @todo Make the type an enum.
                         */
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
            "vanilla.worldOperations": {
                /**
                 * @todo Make the type an enum.
                 */
                clearPlayerDataTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                startClearPlayerDataError: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                exportWorldStatus: number;
                /**
                 * @todo Make the type an enum.
                 */
                exportWorldResult: null | number;
                makeWorldInfiniteProgress: number;
                /**
                 * @todo Make the type an enum.
                 */
                makeWorldInfiniteState: number;
                /**
                 * @todo Make the type an enum.
                 */
                makeWorldInfiniteError: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                duplicateWorldTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                duplicateWorldError: null | number;
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
                /**
                 * @todo Make the type an enum.
                 */
                lastConsultedPackSizesTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                lastConsultedPackSizesError: null | number;
                packDownloadErrorData: {
                    /**
                     * @todo Figure out the types for this array.
                     */
                    packTitles: CoherentArrayProxy<unknown>;
                    storageSpaceNeeded: string;
                };
                /**
                 * @todo Make the type an enum.
                 */
                packDownloadStatus: number;
                /**
                 * @todo Make the type an enum.
                 */
                packDownloadTaskState: number;
                packDownloadProgress: number;
                packDownloadName: string;
                /**
                 * @todo Make the type an enum.
                 */
                packDownloadError: null | number;
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
                playersInMyWorld: CoherentArrayProxy<SocialPlayer>;
                players: CoherentArrayProxy<WorldPlayerInfoBindings>;
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
                    /**
                     * @todo Make the type an enum.
                     */
                    progress: null | number;
                    /**
                     * @todo Make the type an enum.
                     */
                    state: number;
                    /**
                     * @todo Make the type an enum.
                     */
                    result: null | number;
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
                /**
                 * @todo Make the type an enum.
                 */
                startLocalWorldTaskState: number;
                /**
                 * @todo Figure out the non-null type of this.
                 */
                startLocalWorldResult: null;
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
                /**
                 * @todo Make the type an enum.
                 */
                backupWorldResult: null | number;
                importWorldProgress: number;
                importWorldProgressPercentage: number;
                /**
                 * @todo Make the type an enum.
                 */
                importWorldResult: null | number;
                importWorld: {
                    progress: null | number;
                    /**
                     * @todo Make the type an enum.
                     */
                    state: number;
                    /**
                     * @todo Make the type an enum.
                     */
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
             *
             * @todo Get the type for this facet.
             */
            "debug.worldTransfer": unknown;
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
             *
             * @todo Get the type for this facet.
             */
            "vanilla.realmsPurchase": unknown;
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
                /**
                 * @todo Make the type an enum.
                 */
                state: number;
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
                 * @returns `null`
                 */
                fetchRealmsWorld(realmId: `${bigint}`): null;
                /**
                 * Unloads the fetched realm data.
                 *
                 * @returns `null`
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
                /**
                 * @todo Make the type an enum.
                 */
                state: number;
            };
            "vanilla.realmsStories.sessions": {
                /**
                 * @todo Make the type an enum.
                 */
                fetchSessionStatus: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                postCommentStatus: number;
                /**
                 * @todo Figure out the types for this array.
                 */
                comments: CoherentArrayProxy<unknown>;
            };
            "vanilla.screenshotGallery": {
                /**
                 * @todo Make the type an enum.
                 */
                deleteScreenshotsError: number;
                isDeleteScreenshotsInProgress: boolean;
                /**
                 * @todo Make the type an enum.
                 */
                modifyShowcaseGalleryError: number;
                isModifyShowcaseGalleryInProgress: boolean;
                isAddShowcasedImageInProgress: boolean;
                isAddFeaturedImageInProgress: boolean;
                /**
                 * @todo Make the type an enum.
                 */
                loadGalleryError: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                purchaseGameError: null | number;
                /**
                 * @todo Figure out the types for this method.
                 */
                purchaseGame(...args: unknown[]): unknown;
            };
            "vanilla.featuredWorldTemplateList": {
                /**
                 * @todo Make the type an enum.
                 */
                refreshTaskState: number;
                seeMoreFeaturedRouteData: { pageId: string; title: string };
                featuredWorldTemplates: CoherentArrayProxy<{
                    /**
                     * @todo Make the type an enum.
                     */
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
                /**
                 * @todo Make the type an enum.
                 */
                importingTaskResult: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                importingTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                downloadingTaskResult: null | number;
                /**
                 * @todo Make the type an enum.
                 */
                downloadingTaskState: number;
                /**
                 * @todo Make the type an enum.
                 */
                downloadingStatus: null | number;
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
             *
             * @todo Get the type for this facet.
             */
            "test.vector": unknown;
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             *
             * @todo Get the type for this facet.
             */
            "vanilla.editorBlockPalette": unknown;
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             *
             * @todo Get the type for this facet.
             */
            "vanilla.editorInputBinding": unknown;
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             *
             * @todo Get the type for this facet.
             */
            "vanilla.editorInputState": unknown;
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             *
             * @todo Get the type for this facet.
             */
            "vanilla.editorProjectConstants": unknown;
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             *
             * @todo Get the type for this facet.
             */
            "vanilla.editorStructure": unknown;
            /**
             * @warning THIS CRASHES THE GAME WHEN NOT IN EDITOR MODE!
             *
             * @todo Get the type for this facet.
             */
            "vanilla.editorTutorial": unknown;
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
                /**
                 * @todo Make the type an enum.
                 */
                privacy: number;
                partyId: string;
                isInParty: boolean;
                shouldShowJoinDestination: boolean;
                destinationName: LooseAutocomplete<"">;
                // Unverified deprecated properties.
                /**
                 * This property may or may not have existed in older versions.
                 *
                 * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
                 * @deprecated Newer versions use the `pendingInvitees` property instead.
                 *
                 * @todo Figure out the types for this array.
                 * @todo Figure out if this ever actually existed.
                 */
                pendingInvites?: CoherentArrayProxy<unknown>;
                /**
                 * This property may or may not have existed in older versions.
                 *
                 * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
                 * @deprecated Newer versions use the `leaderXuid` property instead.
                 *
                 * @todo Figure out if this ever actually existed.
                 */
                leader?: { xuid: string; pfid: string };
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
                /**
                 * @todo Figure out the types for this method.
                 */
                travelToDestination(...args: unknown[]): unknown;
                // Unverified deprecated properties.
                /**
                 * This property may or may not have existed in older versions.
                 *
                 * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
                 *
                 * @todo Figure out if this ever actually existed.
                 */
                cancelInvite?(...args: unknown[]): unknown;
                /**
                 * This property may or may not have existed in older versions.
                 *
                 * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
                 * @deprecated Newer versions use the `setPrivacy` property instead.
                 *
                 * @todo Figure out if this ever actually existed.
                 */
                setPartyPrivacy?(...args: unknown[]): unknown;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.worldRealmEditor": unknown; // Found in dev build file.
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
                /**
                 * @todo Make the type an enum.
                 */
                realmWorldEditorStateStatus: number;
                /**
                 * @todo Make the type an enum.
                 */
                realmWorldEditorState: number;
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
                        /**
                         * @todo Make the type an enum.
                         */
                        playerPermissions: number;
                        /**
                         * @todo Make the type an enum.
                         */
                        playerAccess: number;
                        /**
                         * @todo Make the type an enum.
                         */
                        generalWarningState: number;
                        platformPlayerFriendsOfFriendsAccessSupported: boolean;
                        platformPlayerInviteAccessSupported: boolean;
                        platformPlayerAccessEnabled: boolean;
                        platformPlayerAccessSupported: boolean;
                        /**
                         * @todo Make the type an enum.
                         */
                        platformPlayerAccess: number;
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
                        /**
                         * @todo Make the type an enum.
                         */
                        generatorType: number;
                        useFlatWorld: boolean;
                    };
                    general: {
                        /**
                         * @todo Make the type an enum.
                         */
                        difficulty: number;
                        playerHasDied: boolean;
                        isHardcore: boolean;
                        /**
                         * @todo Make the type an enum.
                         */
                        gameMode: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                realmBackupsState: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                failureReason: number;
                /**
                 * @todo Make the type an enum.
                 */
                state: number;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.character-selector": unknown;
            /**
             * NOTE: Not present in 1.21.120.4.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.progressTracker": unknown;

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
                /**
                 * @todo Make the type an enum.
                 */
                generatorType: number;
                flatWorldPreset: string;
                useFlatWorld: boolean;
                worldSeed: string;
            };
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.realmsCommitCommandsFacet": unknown;
            /**
             * NOTE: Not present in 1.21.120.4.
             */
            "vanilla.realmsCommitQueriesFacet": unknown;
            "vanilla.realmsPurchaseQueries": {
                purchaseDisabledDueToStoreVersion: boolean;
                /**
                 * @todo Make the type an enum.
                 */
                failureReason: number;
                /**
                 * @todo Make the type an enum.
                 */
                state: number;
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
                /**
                 * @todo Make the type an enum.
                 */
                storiesStatus: number;
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
             *
             * @todo Get the type for this facet.
             */
            "dev.realmsCommitCommandsFacet": unknown;
            /**
             * NOTE: Not present in 1.21.120.4 (however, it is referenced by the vanilla files there for some reason).
             *
             * @todo Get the type for this facet.
             */
            "dev.realmsCommitQueriesFacet": unknown;
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
             *
             * @todo Get the type for this facet.
             */
            "vanilla.realmsRolesAndPermissionsQueries": unknown;
            /**
             * @since Somewhere between 1.21.130.20 Preview and 1.21.130.26 Preview.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.realmsRolesAndPermissionsCommands": unknown;
            /**
             * @since Somewhere between 1.21.130.20 Preview and 1.21.130.26 Preview.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.realmsPlayerListQueries": unknown;
            /**
             * @since Somewhere between 1.21.130.20 Preview and 1.21.130.26 Preview.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.realmsPlayerListCommands": unknown;
            /**
             * @since (First Referenced): Somewhere between 1.26.0.23 Preview and 1.26.0.26 Preview (in these previews this facet does not actually exist).
             *
             * @todo Get the type for this facet.
             */
            "vanilla.realmsWorldEditorWorldDetailsCommands": unknown;
            /**
             * @since Somewhere between 1.26.0.23 Preview and 1.26.0.26 Preview.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.realmsWorldPackEditorQueries": unknown;
            /**
             * @since Somewhere between 1.26.0.23 Preview and 1.26.0.26 Preview.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.realmsWorldPackEditorCommands": unknown;
            /**
             * @since Somewhere between 1.26.0.27 Preview and 1.26.0.2.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.realmsRegionSettingsCommands": unknown;
            /**
             * @since Somewhere between 1.26.0.27 Preview and 1.26.0.2.
             *
             * @todo Get the type for this facet.
             */
            "vanilla.realmsRegionSettingsQueries": unknown;
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
                /**
                 * @todo Make the type an enum.
                 */
                gameMode: number;
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
             * @todo Make the type an enum.
             *
             * @default 0
             */
            rewardRarity: number;
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
            /**
             * @todo Make the type an enum.
             */
            trackedByUser: number;
            /**
             * @todo Make the type an enum.
             */
            progressTarget: number;
            /**
             * The progress of this achievement.
             *
             * @todo Figure out if this type should be an enum.
             */
            progress: number;
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

        interface PlayerProfile {
            state: PlayerProfileState;
            data: PlayerProfileData;
        }
        interface PlayerProfileState {
            platformError: number;
            platformState: number;
            xblError: number;
            xblState: number;
        }
        interface PlayerProfileData {
            /**
             * @see {@link FriendFavoriteStatus}
             */
            favoriteStatus: FriendFavoriteStatus<"values">;
            isInSameGame: boolean;
            playingOnServerId: string;
            url: string;
            /**
             * The URI of the QR code to add this player as a friend.
             *
             * Usually in the format `qr://${number}`.
             *
             * @example "qr://1"
             */
            qrCode: string;
            presenceMessage: string;
            /**
             * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
             */
            titleId?: undefined;
            /**
             * The name of the player's activity status.
             *
             * If the player is offline, this will be an empty string.
             *
             * @default ""
             *
             * @example "Minecraft"
             *
             * @example "Online"
             */
            titleName: LooseAutocomplete<"Minecraft" | "Online" | "">;
            /**
             * @see {@link PlayerPartyPresence}
             */
            partyPresence: PlayerPartyPresence<"values">;
            /**
             * @see {@link FriendPresence}
             */
            presence: FriendPresence<"values">;
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
            // Unverified deprecated properties.
            /**
             * This property may or may not have existed in older versions.
             *
             * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
             * @deprecated Newer versions use the `xblName` property instead.
             */
            gamerTag?: string;
            /**
             * This property may or may not have existed in older versions.
             *
             * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
             * @deprecated Newer versions use the `xblProfilePic` property instead.
             */
            gamerIcon?: string;
            /**
             * This property may or may not have existed in older versions.
             *
             * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
             * @deprecated Newer versions use the `presence` property instead.
             */
            isOnline?: boolean;
            /**
             * This property may or may not have existed in older versions.
             *
             * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
             * @deprecated Newer versions use the `presence` property instead.
             */
            isCurrentlyPlaying?: boolean;
        }

        interface SocialPlayer<InWorld extends boolean = boolean> {
            /**
             * @see {@link PlayerRelation}
             */
            relation: PlayerRelation<"values">;
            isMuted: false;
            isBlocked: false;
            /**
             * The permission level of the player in the current world.
             *
             * If the client user is not in a world/realm/server, or the player is not in the same world as the client user, this will be `null`.
             *
             * @see {@link PlayerPermissionLevel}
             */
            permissionLevel: (true extends InWorld ? PlayerPermissionLevel<"values"> : never) | (false extends InWorld ? null : never);
            /**
             * @see {@link FriendFavoriteStatus}
             */
            favoriteStatus: FriendFavoriteStatus<"values">;
            playingOnServerId: LooseAutocomplete<""> | null;
            isCurrentlyPlaying: boolean;
            /**
             * @see {@link PlayerTitleHistory}
             */
            titleHistory: PlayerTitleHistory<"values">;
            presenceMessage: LooseAutocomplete<
                `Playing ${"in" | "on a Realm -"} ${"Creative" | "Survival" | "Adventure"} Mode` | "In the Minecraft Menus" | ""
            >;
            isInSameGame: boolean;
            /**
             * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
             */
            titleId?: number;
            /**
             * The name of the player's activity status.
             *
             * If the player is offline, this will be an empty string.
             *
             * @default ""
             *
             * @example "Minecraft"
             *
             * @example "Online"
             */
            titleName: LooseAutocomplete<"Minecraft" | "Online" | "">;
            /**
             * @see {@link FriendPresence}
             */
            presence: FriendPresence<"values">;
            /**
             * The URI of the player's profile picture.
             *
             * Usually in the format `profile-img://${number}`.
             *
             * @example "profile-img://356"
             */
            gamerIcon: string;
            gamerTag: string;
            platformId: string | null;
            xuid: string;
            /**
             * @see {@link PlayerPartyPresence}
             */
            partyPresence: PlayerPartyPresence<"values">;
            /**
             * The player's UUID on the world.
             *
             * This is the same UUID accessible to add-ons in Script API through `Player.prototype.id`.
             *
             * If the client user is not in a world/realm/server, or the player is not in the same world as the client user, this will be `null`.
             *
             * @example "-4294967295"
             */
            actorId: (true extends InWorld ? string : never) | (false extends InWorld ? null : never);
            // Unverified deprecated properties.
            /**
             * This property may or may not have existed in older versions.
             *
             * @deprecated This property does not exist in newer versions. It is unknown what version this property was removed in.
             * @deprecated Newer versions use the `presence` property instead.
             */
            isOnline?: boolean;
        }

        interface WorldPlayerInfoBindings {
            /**
             * @see {@link WorldPlayerInfoBindingsPlatform}
             */
            platform: WorldPlayerInfoBindingsPlatform<"values">;
            /**
             * Whether the player is the host of the world.
             */
            isHosting: boolean;
            /**
             * @see {@link PlayerPermissionLevel}
             */
            permissionLevel: PlayerPermissionLevel<"values">;
            /**
             * The URI of the player's profile picture.
             *
             * Usually in the format `profile-img://${number}`.
             *
             * @example "profile-img://356"
             */
            profileImage: string;
            /**
             * The player's name on the world.
             *
             * This is the same name accessible to add-ons in Script API through `Player.prototype.name`.
             *
             * @example "Andexter8"
             */
            name: string;
            /**
             * @see {@link WorldPlayerInfoBindingsConnectionType}
             */
            connectionType: WorldPlayerInfoBindingsConnectionType<"values">;
            /**
             * The player's UUID on the world.
             *
             * This is the same UUID accessible to add-ons in Script API through `Player.prototype.id`.
             *
             * @example "-4294967295"
             */
            id: string;
        }

        interface AddFriendUserItem {
            description: LooseAutocomplete<"">;
            isFollowedByMe: boolean;
            isFollowingMe: boolean;
            isOnline: boolean;
            /**
             * The URI of the player's profile picture.
             *
             * Usually in the format `profile-img://${number}`.
             *
             * @example "profile-img://5"
             */
            gamerIcon: string;
            gamertag: string;
            xuid: string;
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
            join(separator?: string | undefined): string;
            keys(): ArrayIterator<number>;
            values(): ArrayIterator<T>;
            toString(): string;
        };

        // interface Navigator {
        //     get userAgent(): LooseAutocomplete<"Cohtml/1.59.2.7 (Windows; Native) cohtml/1.59.2.7 (Coherent Labs)">;
        //     getGamepads(...args: unknown[]): unknown[];
        // }
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
type Split<S extends string> =
    S extends "" ? []
    : S extends `${infer C}${infer R}` ? [C, ...Split<R>]
    : never;

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
type TakeFirstNElements<T extends any[], N extends number, Result extends any[] = []> =
    Result["length"] extends N ? Result
    : T extends [infer First, ...infer Rest] ? TakeFirstNElements<Rest, N, [...Result, First]>
    : Result;

/**
 * @author 8Crafter
 */
type TakeLastNElements<T extends any[], N extends number, Result extends any[] = []> =
    Result["length"] extends N ? Result
    : T extends [...infer Rest, infer Last] ? TakeLastNElements<Rest, N, [Last, ...Result]>
    : Result;

/**
 * @author 8Crafter
 */
type RemoveFirstNElements<T extends any[], N extends number, Removed extends any[] = [], Result extends any[] = []> =
    Removed["length"] extends N ? Result
    : T extends [infer First, ...infer Rest] ? RemoveFirstNElements<Rest, N, [...Removed, First], Rest>
    : Result;

/**
 * @author 8Crafter
 */
type RemoveLastNElements<T extends any[], N extends number, Removed extends any[] = [], Result extends any[] = []> =
    Removed["length"] extends N ? Result
    : T extends [...infer Rest, infer Last] ? RemoveFirstNElements<Rest, N, [...Removed, Last], Rest>
    : Result;

/**
 * @author 8Crafter
 */
type CreateTupleOfLength<T extends any, N extends number, Result extends any[] = []> =
    Result["length"] extends N ? Result : CreateTupleOfLength<T, N, [T, ...Result]>;

/**
 * @author 8Crafter
 */
type SliceTuple<T extends any[], start extends number, end extends number> =
    RemoveFirstNElements<T, start> extends infer R extends any[] ? TakeFirstNElements<R, RemoveFirstNElements<TakeFirstNElements<T, end>, start>["length"]>
    :   never;

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
type Join<T extends string[]> =
    T extends [] ? ""
    : T extends [infer Head, ...infer Tail] ?
        Head extends string ?
            `${Head}${Join<Tail extends string[] ? Tail : []>}`
        :   never
    :   never;

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
type DeepPartial<T> =
    T extends object ?
        {
            [P in keyof T]?: DeepPartial<T[P]>;
        }
    :   T;
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
type ExcludeFromTuple<T extends readonly any[], E> =
    T extends [infer F, ...infer R] ?
        [F] extends [E] ?
            ExcludeFromTuple<R, E>
        :   [F, ...ExcludeFromTuple<R, E>]
    :   [];
/**
 * @author 8Crafter
 */
type IncludeFromTuple<T extends readonly any[], E> =
    T extends [infer F, ...infer R] ?
        [F] extends [E] ?
            [F, ...IncludeFromTuple<R, E>]
        :   IncludeFromTuple<R, E>
    :   [];
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
