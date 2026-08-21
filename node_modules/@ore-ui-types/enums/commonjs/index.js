"use strict";
// TODO: Switch all the constants to actual enums.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadWorldTemplateError = exports.ImportFailure = exports.DownloadWorldTemplateStatus = exports.WorldSizeConvertResult = exports.StartClearPlayerDataError = exports.ExportWorldStatus = exports.ClearPlayerDataType = exports.ExportWorldResult = exports.ExportWorldFlags = exports.DuplicateWorldError = exports.FacetTaskState = exports.InvocationResult = exports.InvocationState = exports.WorldCloudSyncResult = exports.FriendsLoadingState = exports.ProfileImageState = exports.WorldPingStatus = exports.NetworkWorldType = exports.DeletionStatus = exports.PostStatus = exports.FetchStatus = exports.WebBrowserLink = exports.VanillaGameplayUIProfile = exports.VanillaGameplayContainerItemType = exports.VanillaGameplayContainerChestType = exports.RealmsPermissionRole = exports.RealmsPermissionAction = exports.PlayerTitleHistory = exports.PartyPresence = exports.PlayerRelation = exports.PlayerPermissionLevel = exports.RealmsStoriesTimelineOptInStatus = exports.FavoriteStatusEnum = exports.SocialPresence = exports.RealmsPlayerListPlayerPermission = exports.RealmPlayerRoleEnum = exports.StorageType = exports.KeyboardType = exports.Controller = exports.WorldPlayerInfoBindingsConnectionType = exports.WorldPlayerInfoBindingsPlatform = exports.Platform = exports.ARVRPlatform = exports.InputMethod = exports.HandheldDeviceType = exports.ScreenType = exports.LeaveRealmsServerError = exports.JoinRealmsServerError = void 0;
exports.reverseNumericEnumMapping = reverseNumericEnumMapping;
exports.JoinRealmsServerError = {
    RealmsAPIUnavailable: 0,
    AlreadyMember: 1,
    RealmExpired: 2,
    RealmClosed: 3,
    BadInvite: 4,
    BlockedInvite: 5,
    InviteLinkNotFound: 6,
    UnexpectedServerResponse: 7,
    AnonymousAccount: 8,
};
exports.LeaveRealmsServerError = {
    RealmsAPIUnavailable: 0,
    ErrorTaskInProgress: 1,
    UnknownError: 2,
    Success: 3,
    Unknown: 4,
};
exports.ScreenType = {
    TV_SCREEN_TYPE: 0,
    DESKTOP_SCREEN_TYPE: 1,
    HANDHELD_SCREEN_TYPE: 2,
    /**
     * @deprecated This was removed in 1.21.110.25.
     */
    VR_SCREEN_TYPE: 3,
};
exports.HandheldDeviceType = {
    PHONE: 0,
    TABLET: 1,
};
exports.InputMethod = {
    GAMEPAD: 0,
    TOUCH: 1,
    MOUSE: 2,
    MOTION: 3,
    KEYBOARD: 4,
};
/**
 * @deprecated This was removed in 1.21.100.21.
 */
exports.ARVRPlatform = {
    ARVR_None: 0,
    ARVR_Rift: 1,
    ARVR_Holographic: 2,
    ARVR_WindowsMR: 3,
    ARVR_PSVR: 4,
    ARVR_GearVR: 5,
    ARVR_DesktopXR: 6,
};
/**
 * The platform export type enum.
 *
 * There a second platform enum export type in-game that includes all the removed entries and unsupported ones too (ex. `Linux`), that one is only used for the world players list facet.
 */
exports.Platform = {
    IOS: 0,
    GOOGLE: 1,
    AMAZON_HANDHELD: 2,
    UWP: 3,
    XBOX: 4,
    NX_HANDHELD: 5,
    PS4: 6,
    WIN32: 7,
    MACOS: 8,
    NX_TV: 9,
    PS5: 10,
};
exports.WorldPlayerInfoBindingsPlatform = {
    GOOGLE: 1,
    IOS: 2,
    OSX: 3,
    AMAZON: 4,
    GEARVR_DEPRECATED: 5,
    UWP_GDK_PC: 7,
    WIN32: 8,
    DEDICATED: 9,
    TVOS_DEPRECATED: 10,
    SONY: 11,
    NX: 12,
    XBOX: 13,
    WINDOWSPHONE_DEPRECATED: 14,
    LINUX: 15,
    UNKNOWN: -1,
};
exports.WorldPlayerInfoBindingsConnectionType = {
    LAN: 0,
    PLATFORM: 1,
    XBOX_LIVE: 2,
};
exports.Controller = {
    XBOX: 0,
    PS: 1,
    STEAM: 2,
    SWITCH: 3,
    QUEST: 4,
};
exports.KeyboardType = {
    Standard: 0,
    FullKeyboard: 1,
};
exports.StorageType = {
    NONE: 0,
    EXTERNAL: 1,
    APPDATA: 2,
};
exports.RealmPlayerRoleEnum = {
    NONMEMBER: -1,
    VISITOR: 0,
    MEMBER: 1,
    OPERATOR: 2,
    OWNER: 3,
};
exports.RealmsPlayerListPlayerPermission = {
    NONMEMBER: 0,
    VISITOR: 1,
    MEMBER: 2,
    OPERATOR: 3,
    OWNER: 4,
};
exports.SocialPresence = {
    Unknown: 0,
    Online: 1,
    Away: 2,
    Offline: 3,
};
exports.FavoriteStatusEnum = {
    UNKNOWN: 0,
    FAVORITE: 1,
    NOT_FAVORITE: 2,
};
exports.RealmsStoriesTimelineOptInStatus = {
    OptedIn: 0,
    OptedOut: 1,
    None: 2,
};
exports.PlayerPermissionLevel = {
    Visitor: 0,
    Member: 1,
    Operator: 2,
    Custom: 3,
};
exports.PlayerRelation = {
    Self: 0,
    TwoWayFriend: 1,
    Following: 2,
    Follower: 3,
    Stranger: 4,
    Unknown: 5,
};
// TODO
// export enum PlayerRelation {
//     Self = 0,
//     TwoWayFriend = 1,
//     Following = 2,
//     Follower = 3,
//     Stranger = 4,
//     Unknown = 5,
// }
// export type PlayerRelation_Type<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<
//     NumberEnumToObject<typeof PlayerRelation>,
//     Mode
// >;
exports.PartyPresence = {
    NotInParty: 0,
    InParty: 1,
    Disconnecting: 2,
};
exports.PlayerTitleHistory = {
    Unknown: 0,
    NotPlayed: 1,
    HasPlayed: 2,
};
exports.RealmsPermissionAction = {
    ManageWorlds: 0,
    ManageSettings: 1,
    ManageMembers: 2,
    ManageRoles: 3,
    ManageHubSettings: 4,
    ManageGameSettings: 5,
    ManageInviteLinks: 6,
    ManagePacks: 7,
    SetPermissions: 8,
    ManageAdmins: 9,
    ModerateStories: 10,
    OpenCloseRealm: 11,
    ViewAdminLog: 12,
    EditPacks: 13,
    ManageSubscription: 14,
    JoinRealmWhenFull: 15,
    NotLeaveRealm: 16,
    InteractWithStories: 17,
};
exports.RealmsPermissionRole = {
    Player: 0,
    Admin: 1,
    Owner: 2,
};
exports.VanillaGameplayContainerChestType = {
    Chest: 0,
    TrappedChest: 1,
    CopperChest: 2,
    Barrel: 3,
    EnderChest: 4,
    ShulkerBox: 5,
};
exports.VanillaGameplayContainerItemType = {
    Normal: 0,
    CreativeRecipe: 1,
    SurvivalRecipe: 2,
    RecipePreview: 3,
    Ghost: 4,
};
exports.VanillaGameplayUIProfile = {
    Classic: 0,
    Pocket: 1,
    None: 2,
};
exports.WebBrowserLink = {
    NewWorldCreationFeedbackPage: 0,
    PlayScreenFeedbackPage: 1,
    EditWorldScreenFeedbackPage: 2,
    DeathScreenFeedbackPage: 3,
    RealmsSafetyPage: 4,
    BannedHelpPage: 6,
    ParentPermissionHelpPage: 5,
    NintendoSwitchTechnicalSupportPage: 7,
    BuyMinecraftStorePage: 8,
    XboxPrivacyAndOnlineSafety: 9,
    XboxAccountProfile: 10,
    JoinRealmHelpPage: 11,
    FriendsDrawerFeedbackPage: 12,
    ServersTabFeedbackPage: 13,
    PlayerFeedbackMain: 14,
    PlayerFeedbackIdeas: 15,
    ProfileFeedbackMain: 16,
    StartFromTemplateFeedbackPage: 17,
    RealmsTabFeedbackPage: 18,
    TermsAndServicePage: 19,
    PrivacyPolicyPage: 20,
    PreproductionRealmsGuide: 21,
    TroubleshootingMultiplayerDisabled: 22,
    EduAboutAddOns: 23,
    EduAboutBehaviorPacks: 24,
    EduAboutResourcePacks: 25,
    EduAboutCloud: 26,
    FlatWorldFeedbackPage: 27,
    SignInCapeTerms: 28,
    ContactSupport: 29,
    RealmsCommitWikiLink: 30,
    OtherStore: 31,
    IOSStore: 32,
    AndroidGooglePlay: 33,
    AndroidAmazonAppStore: 34,
    XboxOneStore: 35,
};
exports.FetchStatus = {
    Idle: 0,
    InProgress: 1,
    Success: 2,
    InternalError: 3,
    FetchFailed: 4,
    RateLimit: 5,
};
exports.PostStatus = {
    Idle: 0,
    InProgress: 1,
    Success: 2,
    InternalError: 3,
    InputInvalid: 4,
    Uploading: 5,
    UploadFailed: 6,
    PostingFailed: 7,
    RateLimit: 8,
};
exports.DeletionStatus = {
    Idle: 0,
    DeleteComment: 1,
    DeletePost: 2,
    Dismiss: 3,
    isDeleting: 4,
    isDismissing: 5,
};
exports.NetworkWorldType = {
    ThirdParty: 0,
    External: 1,
    Realm: 2,
    LAN: 3,
};
exports.WorldPingStatus = {
    Unavailable: 0,
    Low: 1,
    Medium: 2,
    High: 3,
};
exports.ProfileImageState = {
    Undefined: 0,
    Requested: 1,
    Success: 2,
    Failure: 3,
};
exports.FriendsLoadingState = {
    Unavailable: 0,
    Loading: 1,
    Ready: 2,
    Error: 3,
};
exports.WorldCloudSyncResult = {
    Ok: 0,
    Unsupported: 1,
    WorldNotCloudStored: 2,
    UnableToGetManifest: 3,
    UnableToSyncWorld: 4,
};
/**
 * Represents the state of a command invocation.
 */
exports.InvocationState = {
    Idle: 0,
    Working: 1,
    Done: 2,
};
exports.InvocationResult = {
    Invalid: -1,
    Success: 0,
    Fail: 1,
};
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
exports.FacetTaskState = {
    IDLE: 0,
    RUNNING: 1,
    DONE: 2,
    CANCELLED: 3,
    FAILED: 4,
};
exports.DuplicateWorldError = {
    Ok: 0,
    IncorrectWorldId: 1,
    InsufficientDiskSpace: 2,
    UnknownError: 3,
};
exports.ExportWorldFlags = {
    None: 0,
    ClearPlayerData: 2,
    ForceHardcoreMode: 4,
    All: -1,
};
exports.ExportWorldResult = {
    IncorrectWorldId: 1,
    NoFile: 2,
    ZipError: 3,
    PremiumContent: 4,
    EditionMismatch: 5,
    EditorMismatch: 6,
    ZipDepthError: 7,
    UnknownError: 8,
    Cancelled: 9,
};
exports.ClearPlayerDataType = {
    SkipLocalUser: 0,
    IncludeLocalUser: 1,
};
exports.ExportWorldStatus = {
    Idle: 0,
    Setup: 1,
    SelectingFileDestination: 2,
    Exporting: 3,
};
exports.StartClearPlayerDataError = {
    FailedToOpenDatabase: 0,
};
exports.WorldSizeConvertResult = {
    Ok: 0,
    InvalidLevel: 1,
};
exports.DownloadWorldTemplateStatus = {
    Initialiing: 0,
    Downloading: 1,
    Importing: 2,
    Success: 3,
    Fail: 4,
};
exports.ImportFailure = {
    UnknownFileType: 0,
    Duplicate: 1,
    MalformedZip: 2,
    Default: 3,
    Incompatible: 4,
    Cancelled: 5,
};
exports.DownloadWorldTemplateError = {
    AlreadyDownloaded: 0,
    DownloadAlreadyInProgress: 1,
    DownloadFailed: 2,
    ItemNotOwned: 3,
    CancelledByUser: 4,
    InsufficientStorage: 5,
};
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
function reverseNumericEnumMapping(object) {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [value, typeof value === "string" ? Number(key) : key]));
}
//# sourceMappingURL=index.js.map