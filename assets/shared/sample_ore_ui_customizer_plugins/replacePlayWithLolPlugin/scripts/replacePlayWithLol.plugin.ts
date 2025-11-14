import type { PluginEntryScriptPlugin } from "ore-ui-customizer-types";

export const plugin: PluginEntryScriptPlugin = {
    actions: [
        {
            id: "replace-text",
            context: "per_text_file",
            action: (currentFileContent: string, file: zip.ZipFileEntry<any, any>): string => {
                if (!/index-[0-9a-f]{20}\.js$/.test(file.data?.filename!)) return currentFileContent;
                return currentFileContent.replaceAll('"Play"', '"lol"');
            },
        },
    ],
};
