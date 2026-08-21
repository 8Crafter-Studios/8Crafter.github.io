# v1.7.0

## Breaking Changes

-   Renamed the `FriendFavoriteStatus` enum constant to `FavoriteStatusEnum`.
-   Renamed the `FriendPresence` enum constant to `SocialPresence`.
-   Renamed the `PlayerPartyPresence` enum constant to `PartyPresence`.
-   Renamed the `WebBrowserFacetLinkType` enum constant to `WebBrowserLink`.

## Additions

-   Added the following enum constants:
    -   `FetchStatus`
    -   `PostStatus`
    -   `DeletionStatus`
    -   `NetworkWorldType`
    -   `WorldPingStatus`
    -   `ProfileImageState`
    -   `FriendsLoadingState`
    -   `WorldCloudSyncResult`
    -   `InvocationState`
    -   `InvocationResult`
    -   `FacetTaskState`
    -   `DuplicateWorldError`
    -   `ExportWorldFlags`
    -   `ExportWorldResult`
    -   `ClearPlayerDataType`
    -   `ExportWorldStatus`
    -   `StartClearPlayerDataError`
    -   `WorldSizeConvertResult`
    -   `DownloadWorldTemplateStatus`
    -   `ImportFailure`
    -   `DownloadWorldTemplateError`

# v1.6.0

## Additions

-   Added the following enum constants:
    -   `RealmsPlayerListPlayerPermission`

# v1.5.1

## Fixes

-   Fixed the `RealmsPermissionRole` enum constant.

# v1.5.0

## Additions

-   Added the following enum constants:
    -   `RealmsPermissionAction`
    -   `RealmsPermissionRole`

# v1.4.0

## Additions

-   Added the following enum constants:
    -   `WebBrowserFacetLinkType`

# v1.3.0

## Additions

-   Added the following enum constants:
    -   `WorldPlayerInfoBindingsConnectionType`
    -   `PlayerPartyPresence`
    -   `PlayerTitleHistory`

# v1.2.0

## Additions

-   Added the `WorldPlayerInfoBindingsPlatform` enum constant.

# v1.1.0

## Critical Fixes

-   Fixed a bug where the following enum constants were missing `as const` in their declaration, cauing the types of the values of their properties to be `number` instead of a number literal type, and causing their properties to not be labeled as read-only:
    -   `LeaveRealmsServerError`
    -   `KeyboardType`
    -   `StorageType`
    -   `FriendFavoriteStatus`
    -   `RealmsStoriesTimelineOptInStatus`
-   Fixed a bug where the `ScreenType` type always had an object type intersecting with it, instead of only when in `enum` mode.

## Additions

-   Added CommonJS support.
-   Added the `reverseNumericEnumMapping` function. When one of the enum constants from this package are passed into it, it will return the reverse mapping.

## Removals

-   The `package.json` file no longer has a `main` field.

# v1.0.0

-   Initial Release
