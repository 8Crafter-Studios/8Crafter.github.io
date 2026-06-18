import type { PluginEntryScriptPlugin, zip } from "ore-ui-customizer-types";
import type {} from "@ore-ui-customizer-api/plugin-env";

export const plugin: PluginEntryScriptPlugin = {
    actions: [
        {
            id: "delete-files",
            context: "global",
            action: async (zip: zip.FS): Promise<void> => {
                // You need to use an as statement to allow TypeScript to treat the entry as a ZipDirectoryEntry or ZipFileEntry if it is one, rather than a generic ZipEntry.
                const targetDir = zip.find("gui/dist/hbui") as zip.ZipFileEntry<unknown, unknown> | zip.ZipDirectoryEntry | undefined;
                if (targetDir === undefined) throw new ReferenceError('Could not find directory "gui/dist/hbui".');
                // If the directory property is non-existent or not equal to true, then it is not a directory.
                if (!("directory" in targetDir && targetDir.directory)) throw new TypeError('"gui/dist/hbui" is not a directory.');
                // Fetch the file as a blob, then add it to the target directory.
                targetDir.addBlob("example_file_123a.txt", await pluginEnv.fetchFileAsBlob("assets/example_file.txt"))
            },
        },
    ],
};
