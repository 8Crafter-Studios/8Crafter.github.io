# v1.3.1

## Fixes

-   Fixed an incorrect dependency version.

# v1.3.0

## Changelog Pending

# v1.2.0

## Changes

-   The `package.json` file now uses an `exports` field.
-   The package now requires `v1.1.0` or newer of [`@ore-ui-types/enums`](https://www.npmjs.com/package/@ore-ui-types/enums) instead of `v1.0.0`.

## Removals

-   The `package.json` file no longer has a `main` or `types` field field.

# v1.1.1

## Additions

-   Added return types for the following methods (before they had `unknown` as placeholders):
    -   `FacetTypeMap["core.locale"].formatDate`
    -   `FacetTypeMap["core.locale"].getHowLongAgoAsString`
    -   `FacetTypeMap["core.locale"].translateWithParameters`

## Changes

-   A lot of the `TODO` comments have been converted to JSDoc `@todo` tags so that they show up in the documentation.
-   The types now have `exactOptionalPropertyTypes` enabled.

# v1.1.0

## Additions

-   Added definitions for the following:
    -   `__commands__.coreTranslateCommandGroup.getHowLongAgoAsString`
    -   `__commands__.coreTranslateCommandGroup.formatDate`
    -   `__commands__.vanillaCoreDataStoreSetCommandGroup`
    -   `__commands__.vanillaGameInviteCommandGroup`
    -   `__commands__.coreScreenReaderCommandGroup`
-   Added typings for the following methods (before they had `unknown` as placeholders):
    -   `__commands__.coreTranslateCommandGroup.translate.callable`
    -   `FacetTypeMap["core.locale"].formatDate`
    -   `FacetTypeMap["core.locale"].translate`
    -   `FacetTypeMap["core.locale"].translateWithParameters`
-   Added definitions for the following query types:
    -   `vanillaCoreDataDrivenUIDefinitionQuery`
    -   `vanillaCoreDataDrivenUIScreenIdQuery`
    -   `vanillaCoreDataStoreNumberQuery`
    -   `vanillaCoreDataStoreStringQuery`
    -   `vanillaCoreDataStoreBoolQuery`

## Fixes

-   Fixed the parameters for the `facet:request` event.

# v1.0.2

## Performance

-   Fixed a few engine methods that could cause slowdowns when `EngineEventID` was passed as their `T` type parameter.

# v1.0.1

## Changes

-   The global `engine` variable now has its type specified using an interface, alowing modifying its type.
-   The parameters for the following event types are now `any` instead of `unknown` to allow for type coersion in JavaScript with the `@type` JSDoc tag:
    -   `query:subscribed/${number}`
    -   `query:updated/${number}`

## Fixes

-   Fixed a bug where the `README.md` file had incorrect package name references for the badges.
-   Removed a leftover TSDoc comment from a function that was moved to a different package.

# v1.0.0

-   Initial Release
