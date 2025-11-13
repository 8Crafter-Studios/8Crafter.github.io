// TODO: Switch all the constants to actual enums.

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
type ConstNumberObjectEnumToEnumMappingType<T extends { [key: string]: number }, Mode extends "enum" | "keys" | "values" = "enum"> = Mode extends "enum"
    ? MergeObjectTypes<
          {
              [K in keyof T as T[K]]: K;
          } & T
      >
    : Mode extends "keys"
    ? keyof T
    : Mode extends "values"
    ? T[keyof T]
    : never;

/**
 * Gets the keys of an object type that have `never` as their value type.
 *
 * @template T The object type to get keys from.
 */
type NeverValueKeys<T extends object> = {
    [K in keyof T]: T[K] extends never ? K : never;
}[keyof T];

/**
 * Omits the keys of an object type that have `never` as their value type.
 *
 * @template T The object type to omit keys from.
 */
type OmitNeverValueKeys<T extends object> = Omit<T, NeverValueKeys<T>>;

/**
 * Converts a number enum type to an object that maps the enum keys to their values.
 *
 * @template T The number enum type to convert.
 */
type NumberEnumToObject<T> = OmitNeverValueKeys<{
    [K in keyof T as K extends string ? T[K] extends number ? K : never : never]: T[K] extends number ? (`${T[K]}` extends `${infer B extends number}` ? B : never) : never;
}>;

/**
 * Merges two object types into one (only merges the evaluated type in certain situtations).
 *
 * @template T The object type to merge.
 */
type MergeObjectTypes<T> = { [key in keyof T]: T[key] };

export const JoinRealmsServerError = {
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
export type JoinRealmsServerError<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<
    typeof JoinRealmsServerError,
    Mode
>;

export const LeaveRealmsServerError = {
    RealmsAPIUnavailable: 0,
    ErrorTaskInProgress: 1,
    UnknownError: 2,
    Success: 3,
    Unknown: 4,
};
export type LeaveRealmsServerError<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<
    typeof LeaveRealmsServerError,
    Mode
>;

export const ScreenType = {
    TV_SCREEN_TYPE: 0,
    DESKTOP_SCREEN_TYPE: 1,
    HANDHELD_SCREEN_TYPE: 2,
    /**
     * @deprecated This was removed in 1.21.110.25.
     */
    VR_SCREEN_TYPE: 3,
} as const;
export type ScreenType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof ScreenType, Mode> & {
    /**
     * @deprecated This was removed in 1.21.110.25.
     */
    3: unknown;
};

export const HandheldDeviceType = {
    PHONE: 0,
    TABLET: 1,
} as const;
export type HandheldDeviceType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof HandheldDeviceType, Mode>;

export const InputMethod = {
    GAMEPAD: 0,
    TOUCH: 1,
    MOUSE: 2,
    MOTION: 3,
    KEYBOARD: 4,
} as const;
export type InputMethod<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof InputMethod, Mode>;

/**
 * @deprecated This was removed in 1.21.100.21.
 */
export const ARVRPlatform = {
    ARVR_None: 0,
    ARVR_Rift: 1,
    ARVR_Holographic: 2,
    ARVR_WindowsMR: 3,
    ARVR_PSVR: 4,
    ARVR_GearVR: 5,
    ARVR_DesktopXR: 6,
} as const;
/**
 * @deprecated This was removed in 1.21.100.21.
 */
export type ARVRPlatform<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof ARVRPlatform, Mode>;

/**
 * The platform export type enum.
 *
 * There a second platform enum export type in-game that includes all the removed entries and unsupported ones too (ex. `Linux`), that one is only used for the world players list facet.
 */
export const Platform = {
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
} as const;
export type Platform<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof Platform, Mode>;

export const Controller = {
    XBOX: 0,
    PS: 1,
    STEAM: 2,
    SWITCH: 3,
    QUEST: 4,
} as const;
export type Controller<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof Controller, Mode>;

export const KeyboardType = {
    Standard: 0,
    FullKeyboard: 1,
};
export type KeyboardType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof KeyboardType, Mode>;

export const StorageType = {
    NONE: 0,
    EXTERNAL: 1,
    APPDATA: 2,
} as const;
export type StorageType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof StorageType, Mode>;

export const RealmPlayerRoleEnum = {
    NONMEMBER: -1,
    VISITOR: 0,
    MEMBER: 1,
    OPERATOR: 2,
    OWNER: 3,
} as const;
export type RealmPlayerRoleEnum<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof RealmPlayerRoleEnum, Mode>;

export const FriendPresence = {
    Unknown: 0,
    Online: 1,
    Away: 2,
    Offline: 3,
};
export type FriendPresence<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof FriendPresence, Mode>;

export const FriendFavoriteStatus = {
    UNKNOWN: 0,
    FAVORITE: 1,
    NOT_FAVORITE: 2,
};
export type FriendFavoriteStatus<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof FriendFavoriteStatus, Mode>;

export const RealmsStoriesTimelineOptInStatus = {
    OptedIn: 0,
    OptedOut: 1,
    None: 2,
};
export type RealmsStoriesTimelineOptInStatus<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<
    typeof RealmsStoriesTimelineOptInStatus,
    Mode
>;

export const PlayerPermissionLevel = {
    Visitor: 0,
    Member: 1,
    Operator: 2,
    Custom: 3,
} as const;
export type PlayerPermissionLevel<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<
    typeof PlayerPermissionLevel,
    Mode
>;

export const PlayerRelation = {
    Self: 0,
    TwoWayFriend: 1,
    Following: 2,
    Follower: 3,
    Stranger: 4,
    Unknown: 5,
} as const;
export type PlayerRelation<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<typeof PlayerRelation, Mode>;

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

export const VanillaGameplayContainerChestType = {
    Chest: 0,
    TrappedChest: 1,
    CopperChest: 2,
    Barrel: 3,
    EnderChest: 4,
    ShulkerBox: 5,
} as const;
export type VanillaGameplayContainerChestType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<
    typeof VanillaGameplayContainerChestType,
    Mode
>;

export const VanillaGameplayContainerItemType = {
    Normal: 0,
    CreativeRecipe: 1,
    SurvivalRecipe: 2,
    RecipePreview: 3,
    Ghost: 4,
} as const;
export type VanillaGameplayContainerItemType<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<
    typeof VanillaGameplayContainerItemType,
    Mode
>;

export const VanillaGameplayUIProfile = {
    Classic: 0,
    Pocket: 1,
    None: 2,
} as const;
export type VanillaGameplayUIProfile<Mode extends "enum" | "keys" | "values" = "enum"> = ConstNumberObjectEnumToEnumMappingType<
    typeof VanillaGameplayUIProfile,
    Mode
>;
