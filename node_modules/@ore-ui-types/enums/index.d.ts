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
export declare const RealmsPlayerListPlayerPermission: {
    readonly NONMEMBER: 0;
    readonly VISITOR: 1;
    readonly MEMBER: 2;
    readonly OPERATOR: 3;
    readonly OWNER: 4;
};
export type RealmsPlayerListPlayerPermission<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof RealmsPlayerListPlayerPermission, Mode>;
export declare const SocialPresence: {
    readonly Unknown: 0;
    readonly Online: 1;
    readonly Away: 2;
    readonly Offline: 3;
};
export type SocialPresence<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof SocialPresence, Mode>;
export declare const FavoriteStatusEnum: {
    readonly UNKNOWN: 0;
    readonly FAVORITE: 1;
    readonly NOT_FAVORITE: 2;
};
export type FavoriteStatusEnum<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof FavoriteStatusEnum, Mode>;
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
export declare const PartyPresence: {
    readonly NotInParty: 0;
    readonly InParty: 1;
    readonly Disconnecting: 2;
};
export type PartyPresence<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof PartyPresence, Mode>;
export declare const PlayerTitleHistory: {
    readonly Unknown: 0;
    readonly NotPlayed: 1;
    readonly HasPlayed: 2;
};
export type PlayerTitleHistory<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof PlayerTitleHistory, Mode>;
export declare const RealmsPermissionAction: {
    readonly ManageWorlds: 0;
    readonly ManageSettings: 1;
    readonly ManageMembers: 2;
    readonly ManageRoles: 3;
    readonly ManageHubSettings: 4;
    readonly ManageGameSettings: 5;
    readonly ManageInviteLinks: 6;
    readonly ManagePacks: 7;
    readonly SetPermissions: 8;
    readonly ManageAdmins: 9;
    readonly ModerateStories: 10;
    readonly OpenCloseRealm: 11;
    readonly ViewAdminLog: 12;
    readonly EditPacks: 13;
    readonly ManageSubscription: 14;
    readonly JoinRealmWhenFull: 15;
    readonly NotLeaveRealm: 16;
    readonly InteractWithStories: 17;
};
export type RealmsPermissionAction<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof RealmsPermissionAction, Mode>;
export declare const RealmsPermissionRole: {
    readonly Player: 0;
    readonly Admin: 1;
    readonly Owner: 2;
};
export type RealmsPermissionRole<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof RealmsPermissionRole, Mode>;
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
export declare const WebBrowserLink: {
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
export type WebBrowserLink<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof WebBrowserLink, Mode>;
export declare const FetchStatus: {
    readonly Idle: 0;
    readonly InProgress: 1;
    readonly Success: 2;
    readonly InternalError: 3;
    readonly FetchFailed: 4;
    readonly RateLimit: 5;
};
export type FetchStatus<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof FetchStatus, Mode>;
export declare const PostStatus: {
    readonly Idle: 0;
    readonly InProgress: 1;
    readonly Success: 2;
    readonly InternalError: 3;
    readonly InputInvalid: 4;
    readonly Uploading: 5;
    readonly UploadFailed: 6;
    readonly PostingFailed: 7;
    readonly RateLimit: 8;
};
export type PostStatus<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof PostStatus, Mode>;
export declare const DeletionStatus: {
    readonly Idle: 0;
    readonly DeleteComment: 1;
    readonly DeletePost: 2;
    readonly Dismiss: 3;
    readonly isDeleting: 4;
    readonly isDismissing: 5;
};
export type DeletionStatus<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof DeletionStatus, Mode>;
export declare const NetworkWorldType: {
    readonly ThirdParty: 0;
    readonly External: 1;
    readonly Realm: 2;
    readonly LAN: 3;
};
export type NetworkWorldType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof NetworkWorldType, Mode>;
export declare const WorldPingStatus: {
    readonly Unavailable: 0;
    readonly Low: 1;
    readonly Medium: 2;
    readonly High: 3;
};
export type WorldPingStatus<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof WorldPingStatus, Mode>;
export declare const ProfileImageState: {
    readonly Undefined: 0;
    readonly Requested: 1;
    readonly Success: 2;
    readonly Failure: 3;
};
export type ProfileImageState<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof ProfileImageState, Mode>;
export declare const FriendsLoadingState: {
    readonly Unavailable: 0;
    readonly Loading: 1;
    readonly Ready: 2;
    readonly Error: 3;
};
export type FriendsLoadingState<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof FriendsLoadingState, Mode>;
export declare const WorldCloudSyncResult: {
    readonly Ok: 0;
    readonly Unsupported: 1;
    readonly WorldNotCloudStored: 2;
    readonly UnableToGetManifest: 3;
    readonly UnableToSyncWorld: 4;
};
export type WorldCloudSyncResult<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof WorldCloudSyncResult, Mode>;
/**
 * Represents the state of a command invocation.
 */
export declare const InvocationState: {
    readonly Idle: 0;
    readonly Working: 1;
    readonly Done: 2;
};
export type InvocationState<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof InvocationState, Mode>;
export declare const InvocationResult: {
    readonly Invalid: -1;
    readonly Success: 0;
    readonly Fail: 1;
};
export type InvocationResult<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof InvocationResult, Mode>;
/**
 * Represents the state of a facet method execution.
 *
 * A facet that has a method that should be possible to sequence using
 * `useFacetCoroutine` should expose a corresponding state property of this
 * type that is updated by the facet when the method is running.
 *
 * example:
 * ```
 * type NetworkFacet = {
 *  uploadToServer(): void
 *  uploadToServerProgress: FacetTaskState
 * }
 * ```
 */
export declare const FacetTaskState: {
    readonly IDLE: 0;
    readonly RUNNING: 1;
    readonly DONE: 2;
    readonly CANCELLED: 3;
    readonly FAILED: 4;
};
export type FacetTaskState<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof FacetTaskState, Mode>;
export declare const DuplicateWorldError: {
    readonly Ok: 0;
    readonly IncorrectWorldId: 1;
    readonly InsufficientDiskSpace: 2;
    readonly UnknownError: 3;
};
export type DuplicateWorldError<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof DuplicateWorldError, Mode>;
export declare const ExportWorldFlags: {
    readonly None: 0;
    readonly ClearPlayerData: 2;
    readonly ForceHardcoreMode: 4;
    readonly All: -1;
};
export type ExportWorldFlags<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof ExportWorldFlags, Mode>;
export declare const ExportWorldResult: {
    readonly IncorrectWorldId: 1;
    readonly NoFile: 2;
    readonly ZipError: 3;
    readonly PremiumContent: 4;
    readonly EditionMismatch: 5;
    readonly EditorMismatch: 6;
    readonly ZipDepthError: 7;
    readonly UnknownError: 8;
    readonly Cancelled: 9;
};
export type ExportWorldResult<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof ExportWorldResult, Mode>;
export declare const ClearPlayerDataType: {
    readonly SkipLocalUser: 0;
    readonly IncludeLocalUser: 1;
};
export type ClearPlayerDataType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof ClearPlayerDataType, Mode>;
export declare const ExportWorldStatus: {
    readonly Idle: 0;
    readonly Setup: 1;
    readonly SelectingFileDestination: 2;
    readonly Exporting: 3;
};
export type ExportWorldStatus<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof ExportWorldStatus, Mode>;
export declare const StartClearPlayerDataError: {
    readonly FailedToOpenDatabase: 0;
};
export type StartClearPlayerDataError<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof StartClearPlayerDataError, Mode>;
export declare const WorldSizeConvertResult: {
    readonly Ok: 0;
    readonly InvalidLevel: 1;
};
export type WorldSizeConvertResult<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof WorldSizeConvertResult, Mode>;
export declare const DownloadWorldTemplateStatus: {
    readonly Initialiing: 0;
    readonly Downloading: 1;
    readonly Importing: 2;
    readonly Success: 3;
    readonly Fail: 4;
};
export type DownloadWorldTemplateStatus<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof DownloadWorldTemplateStatus, Mode>;
export declare const ImportFailure: {
    readonly UnknownFileType: 0;
    readonly Duplicate: 1;
    readonly MalformedZip: 2;
    readonly Default: 3;
    readonly Incompatible: 4;
    readonly Cancelled: 5;
};
export type ImportFailure<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof ImportFailure, Mode>;
export declare const DownloadWorldTemplateError: {
    readonly AlreadyDownloaded: 0;
    readonly DownloadAlreadyInProgress: 1;
    readonly DownloadFailed: 2;
    readonly ItemNotOwned: 3;
    readonly CancelledByUser: 4;
    readonly InsufficientStorage: 5;
};
export type DownloadWorldTemplateError<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof DownloadWorldTemplateError, Mode>;
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
