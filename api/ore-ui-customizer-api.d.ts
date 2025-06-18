export declare const format_version = "0.23.0";
import { OreUICustomizerSettings } from "~shared/ore-ui-customizer-assets.js";
import "./zip.js";
/**
 * The result of the {@link applyMods} function.
 */
export interface ApplyModsResult {
    /**
     * The zip file with the mods applied.
     */
    zip: Blob;
    /**
     * The settings used to apply the mods.
     */
    config: OreUICustomizerSettings;
    /**
     * A list of mods that failed.
     */
    allFailedReplaces: {
        [filename: string]: string[];
    };
    /**
     * The number of entries added.
     */
    addedCount: bigint;
    /**
     * The number of entries removed.
     */
    removedCount: bigint;
    /**
     * The number of entries modified.
     */
    modifiedCount: bigint;
    /**
     * The number of entries unmodified.
     */
    unmodifiedCount: bigint;
    /**
     * The number of entries edited.
     */
    editedCount: bigint;
    /**
     * The number of entries renamed.
     */
    renamedCount: bigint;
    /**
     * The total number of entries.
     */
    totalEntries: number;
}
export declare function applyMods(file: Blob, settings?: OreUICustomizerSettings, enableDebugLogging?: boolean): Promise<ApplyModsResult>;
