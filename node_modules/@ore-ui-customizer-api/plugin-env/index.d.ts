import "./backend.d.ts";

declare global {
    /**
     * The variable used to access and manage the current plugin.
     *
     * Currently cannot be used in single-file plugins (plugins that are a single `.js` file instead of a renamed `.zip` with a `manifest.json` and other files), but may be able to be used for them in the future.
     *
     * @since Ore UI Customizer v1.11.0
     */
    const pluginEnv: OreUICustomizerPluginEnv;
}

export type {};
