/**
 * Creates a dynamic enum type from an object that maps properties to numbers.
 *
 * @template T The object type to create the enum from.
 * @template Mode The mode to use, either `"enum"`, `"keys"`, or `"values"`. Defaults to `"enum"`.
 *
 * @example
 * ```ts
 * type Original = { a: 0; b: 1; c: 2 };
 * type Enum = ConstNumberObjectEnumToEnumMappingType<Original>; // { a: 0; b: 1; c: 2; 0: "a"; 1: "b"; 2: "c" }
 * type Enum = ConstNumberObjectEnumToEnumMappingType<Original, "enum">; // { a: 0; b: 1; c: 2; 0: "a"; 1: "b"; 2: "c" }
 * type Keys = ConstNumberObjectEnumToEnumMappingType<Original, "keys">; // "a" | "b" | "c"
 * type Values = ConstNumberObjectEnumToEnumMappingType<Original, "values">; // 0 | 1 | 2
 * ```
 */
type ConstNumberObjectEnumToEnumMappingType<T extends {
    [key: string]: number;
}, Mode extends "enum" | "keys" | "values" = "enum"> = Mode extends "enum" ? MergeObjectTypes<{
    [K in keyof T as T[K]]: K;
} & T> : Mode extends "keys" ? keyof T : Mode extends "values" ? T[keyof T] : never;
/**
 * Merges two object types into one (only merges the evaluated type in certain situtations).
 *
 * @template T The object type to merge.
 */
type MergeObjectTypes<T> = {
    [key in keyof T]: T[key];
};
export declare const JoinRealmsServerError: {
    readonly RealmsAPIUnavailable: 0;
    readonly AlreadyMember: 1;
    readonly RealmExpired: 2;
    readonly RealmClosed: 3;
    readonly BadInvite: 4;
    readonly BlockedInvite: 5;
    readonly InviteLinkNotFound: 6;
    readonly UnexpectedServerResponse: 7;
    readonly AnonymousAccount: 8;
};
export type JoinRealmsServerError<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof JoinRealmsServerError, Mode>;
export declare const LeaveRealmsServerError: {
    readonly RealmsAPIUnavailable: 0;
    readonly ErrorTaskInProgress: 1;
    readonly UnknownError: 2;
    readonly Success: 3;
    readonly Unknown: 4;
};
export type LeaveRealmsServerError<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof LeaveRealmsServerError, Mode>;
export declare const ScreenType: {
    readonly TV_SCREEN_TYPE: 0;
    readonly DESKTOP_SCREEN_TYPE: 1;
    readonly HANDHELD_SCREEN_TYPE: 2;
    /**
     * @deprecated This was removed in 1.21.110.25.
     */
    readonly VR_SCREEN_TYPE: 3;
};
export type ScreenType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof ScreenType, Mode> & (Mode extends "enum" ? {
    /**
     * @deprecated This was removed in 1.21.110.25.
     */
    3: unknown;
} : unknown);
export declare const HandheldDeviceType: {
    readonly PHONE: 0;
    readonly TABLET: 1;
};
export type HandheldDeviceType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof HandheldDeviceType, Mode>;
export declare const InputMethod: {
    readonly GAMEPAD: 0;
    readonly TOUCH: 1;
    readonly MOUSE: 2;
    readonly MOTION: 3;
    readonly KEYBOARD: 4;
};
export type InputMethod<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof InputMethod, Mode>;
/**
 * @deprecated This was removed in 1.21.100.21.
 */
export declare const ARVRPlatform: {
    readonly ARVR_None: 0;
    readonly ARVR_Rift: 1;
    readonly ARVR_Holographic: 2;
    readonly ARVR_WindowsMR: 3;
    readonly ARVR_PSVR: 4;
    readonly ARVR_GearVR: 5;
    readonly ARVR_DesktopXR: 6;
};
/**
 * @deprecated This was removed in 1.21.100.21.
 */
export type ARVRPlatform<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof ARVRPlatform, Mode>;
/**
 * The platform export type enum.
 *
 * There a second platform enum export type in-game that includes all the removed entries and unsupported ones too (ex. `Linux`), that one is only used for the world players list facet.
 */
export declare const Platform: {
    readonly IOS: 0;
    readonly GOOGLE: 1;
    readonly AMAZON_HANDHELD: 2;
    readonly UWP: 3;
    readonly XBOX: 4;
    readonly NX_HANDHELD: 5;
    readonly PS4: 6;
    readonly WIN32: 7;
    readonly MACOS: 8;
    readonly NX_TV: 9;
    readonly PS5: 10;
};
export type Platform<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof Platform, Mode>;
export declare const WorldPlayerInfoBindingsPlatform: {
    readonly GOOGLE: 1;
    readonly IOS: 2;
    readonly OSX: 3;
    readonly AMAZON: 4;
    readonly GEARVR_DEPRECATED: 5;
    readonly UWP_GDK_PC: 7;
    readonly WIN32: 8;
    readonly DEDICATED: 9;
    readonly TVOS_DEPRECATED: 10;
    readonly SONY: 11;
    readonly NX: 12;
    readonly XBOX: 13;
    readonly WINDOWSPHONE_DEPRECATED: 14;
    readonly LINUX: 15;
    readonly UNKNOWN: -1;
};
export type WorldPlayerInfoBindingsPlatform<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof WorldPlayerInfoBindingsPlatform, Mode>;
export declare const WorldPlayerInfoBindingsConnectionType: {
    readonly LAN: 0;
    readonly PLATFORM: 1;
    readonly XBOX_LIVE: 2;
};
export type WorldPlayerInfoBindingsConnectionType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof WorldPlayerInfoBindingsConnectionType, Mode>;
export declare const Controller: {
    readonly XBOX: 0;
    readonly PS: 1;
    readonly STEAM: 2;
    readonly SWITCH: 3;
    readonly QUEST: 4;
};
export type Controller<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof Controller, Mode>;
export declare const KeyboardType: {
    readonly Standard: 0;
    readonly FullKeyboard: 1;
};
export type KeyboardType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof KeyboardType, Mode>;
export declare const StorageType: {
    readonly NONE: 0;
    readonly EXTERNAL: 1;
    readonly APPDATA: 2;
};
export type StorageType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof StorageType, Mode>;
export declare const RealmPlayerRoleEnum: {
    readonly NONMEMBER: -1;
    readonly VISITOR: 0;
    readonly MEMBER: 1;
    readonly OPERATOR: 2;
    readonly OWNER: 3;
};
export type RealmPlayerRoleEnum<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof RealmPlayerRoleEnum, Mode>;
export declare const FriendPresence: {
    readonly Unknown: 0;
    readonly Online: 1;
    readonly Away: 2;
    readonly Offline: 3;
};
export type FriendPresence<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof FriendPresence, Mode>;
export declare const FriendFavoriteStatus: {
    readonly UNKNOWN: 0;
    readonly FAVORITE: 1;
    readonly NOT_FAVORITE: 2;
};
export type FriendFavoriteStatus<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof FriendFavoriteStatus, Mode>;
export declare const RealmsStoriesTimelineOptInStatus: {
    readonly OptedIn: 0;
    readonly OptedOut: 1;
    readonly None: 2;
};
export type RealmsStoriesTimelineOptInStatus<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof RealmsStoriesTimelineOptInStatus, Mode>;
export declare const PlayerPermissionLevel: {
    readonly Visitor: 0;
    readonly Member: 1;
    readonly Operator: 2;
    readonly Custom: 3;
};
export type PlayerPermissionLevel<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof PlayerPermissionLevel, Mode>;
export declare const PlayerRelation: {
    readonly Self: 0;
    readonly TwoWayFriend: 1;
    readonly Following: 2;
    readonly Follower: 3;
    readonly Stranger: 4;
    readonly Unknown: 5;
};
export type PlayerRelation<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof PlayerRelation, Mode>;
export declare const PlayerPartyPresence: {
    readonly NotInParty: 0;
    readonly InParty: 1;
    readonly Disconnecting: 2;
};
export type PlayerPartyPresence<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof PlayerPartyPresence, Mode>;
export declare const PlayerTitleHistory: {
    readonly Unknown: 0;
    readonly NotPlayed: 1;
    readonly HasPlayed: 2;
};
export type PlayerTitleHistory<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof PlayerTitleHistory, Mode>;
export declare const VanillaGameplayContainerChestType: {
    readonly Chest: 0;
    readonly TrappedChest: 1;
    readonly CopperChest: 2;
    readonly Barrel: 3;
    readonly EnderChest: 4;
    readonly ShulkerBox: 5;
};
export type VanillaGameplayContainerChestType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof VanillaGameplayContainerChestType, Mode>;
export declare const VanillaGameplayContainerItemType: {
    readonly Normal: 0;
    readonly CreativeRecipe: 1;
    readonly SurvivalRecipe: 2;
    readonly RecipePreview: 3;
    readonly Ghost: 4;
};
export type VanillaGameplayContainerItemType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof VanillaGameplayContainerItemType, Mode>;
export declare const VanillaGameplayUIProfile: {
    readonly Classic: 0;
    readonly Pocket: 1;
    readonly None: 2;
};
export type VanillaGameplayUIProfile<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof VanillaGameplayUIProfile, Mode>;
export declare const WebBrowserFacetLinkType: {
    readonly NewWorldCreationFeedbackPage: 0;
    readonly PlayScreenFeedbackPage: 1;
    readonly EditWorldScreenFeedbackPage: 2;
    readonly DeathScreenFeedbackPage: 3;
    readonly RealmsSafetyPage: 4;
    readonly BannedHelpPage: 6;
    readonly ParentPermissionHelpPage: 5;
    readonly NintendoSwitchTechnicalSupportPage: 7;
    readonly BuyMinecraftStorePage: 8;
    readonly XboxPrivacyAndOnlineSafety: 9;
    readonly XboxAccountProfile: 10;
    readonly JoinRealmHelpPage: 11;
    readonly FriendsDrawerFeedbackPage: 12;
    readonly ServersTabFeedbackPage: 13;
    readonly PlayerFeedbackMain: 14;
    readonly PlayerFeedbackIdeas: 15;
    readonly ProfileFeedbackMain: 16;
    readonly StartFromTemplateFeedbackPage: 17;
    readonly RealmsTabFeedbackPage: 18;
    readonly TermsAndServicePage: 19;
    readonly PrivacyPolicyPage: 20;
    readonly PreproductionRealmsGuide: 21;
    readonly TroubleshootingMultiplayerDisabled: 22;
    readonly EduAboutAddOns: 23;
    readonly EduAboutBehaviorPacks: 24;
    readonly EduAboutResourcePacks: 25;
    readonly EduAboutCloud: 26;
    readonly FlatWorldFeedbackPage: 27;
    readonly SignInCapeTerms: 28;
    readonly ContactSupport: 29;
    readonly RealmsCommitWikiLink: 30;
    readonly OtherStore: 31;
    readonly IOSStore: 32;
    readonly AndroidGooglePlay: 33;
    readonly AndroidAmazonAppStore: 34;
    readonly XboxOneStore: 35;
};
export type WebBrowserFacetLinkType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof WebBrowserFacetLinkType, Mode>;
/**
 * Reverses a numeric enum mapping.
 *
 * @param object The enum mapping to reverse.
 * @returns The reversed enum mapping.
 *
 * @example
 * ```ts
 * reverseNumericEnumMapping({ 0: "a", 1: "b", 2: "c" }); // { a: 0, b: 1, c: 2 }
 * ```
 */
export declare function reverseNumericEnumMapping<T extends {
    [key: string]: number;
} | {
    [key: number]: string;
}>(object: T): {
    [K in keyof T as T[K] extends string | number ? T[K] : never]: K;
};
export {};
