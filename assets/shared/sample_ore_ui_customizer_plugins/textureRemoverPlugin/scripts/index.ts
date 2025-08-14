import type { PluginEntryScriptPlugin } from "../../../ore-ui-customizer-assets";

export const plugin: PluginEntryScriptPlugin = {
    actions: [
        {
            id: "delete-files",
            context: "global",
            action: (zip: zip.FS): void => {
                const assetsDir = zip.find("gui/dist/hbui/assets") as zip.ZipDirectoryEntry;
                while (assetsDir.children.length > 0) {
                    zip.remove(assetsDir.children[0]!);
                }
            },
        },
    ],
};
