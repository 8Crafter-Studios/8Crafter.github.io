# Ore UI Types - Enums

<!-- ![Thumbnail](./assets/thumbnail.png) --> <!-- TODO -->

[![NPM Downloads](https://img.shields.io/npm/d18m/@ore-ui-types/enums)](https://npmjs.com/package/@ore-ui-types/enums)
[![NPM Version](https://img.shields.io/npm/v/@ore-ui-types/enums)](https://npmjs.com/package/@ore-ui-types/enums)
[![NPM License](https://img.shields.io/npm/l/@ore-ui-types/enums)](https://npmjs.com/package/@ore-ui-types/enums)
[![NPM Last Update](https://img.shields.io/npm/last-update/@ore-ui-types/enums)](https://npmjs.com/package/@ore-ui-types/enums)
[![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/@ore-ui-types/enums)](https://npmjs.com/package/@ore-ui-types/enums)
[![GitHub last commit](https://img.shields.io/github/last-commit/8Crafter-Studios/Ore-UI-Types.Enums)](https://github.com/8Crafter-Studios/Ore-UI-Types.Enums/commits/main)
[![Discord](https://img.shields.io/discord/1213197616570048512?logo=discord&label=discord&link=https%3A%2F%2Fdiscord.8crafter.com)](https://discord.8crafter.com)

Enums for Minecraft Bedrock Edition's Ore UI scripting environment.

This is meant to be used with the [ore-ui-types](https://www.npmjs.com/package/ore-ui-types) package.

Unlike the [ore-ui-types](https://www.npmjs.com/package/ore-ui-types) package, this package is not purely type declaration files, to make use of the enums, you will need do the following:

1. Install the package using `npm install @ore-ui-types/enums`.
2. Copy the `index.js` file from `node_modules/@ore-ui-types/enums/index.js` to `gui/dist/hbui/@ore-ui-types/enums` (in the Ore UI files, the file should be called `enums` (with no file extension)) (or if you are using it in a plugin for 8Crafter's Ore UI Customizer (v1.10.0+), it will already be there, so you can skip this step).
    - Note: If the script or HTML file importing this package is not in `gui/dist/hbui/`, then you will need to copy this file to be at `./@ore-ui-types/enums` relative to the script or HTML file. (ex. If your file is at `gui/dist/myScript.js`, then you will need to copy the file to `gui/dist/@ore-ui-types/enums`.). If you don't want to copy the file to a specific location you can configure your `tsconfig.json` to map `/hbui/@ore-ui-types/enums` to the types for the package, to do that just add the following to your `tsconfig.json`'s `compilerOptions` (make sure `baseUrl` is set to `./` in your `tsconfig.json`'s `compilerOptions`) (once you do it you will import the package through `/hbui/@ore-ui-types/enums` instead of `@ore-ui-types/enums`):
        ```json
        {
            "compilerOptions": {
                "paths": {
                    "/hbui/@ore-ui-types/enums": ["./node_modules/@ore-ui-types/enums/index.d.ts"]
                }
            }
        }
        ```
