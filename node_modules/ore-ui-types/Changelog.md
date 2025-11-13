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
