export const plugin = {
    name: 'Replace "Play" with "lol"',
    id: "replace-play-with-lol",
    namespace: "andexpl",
    version: "1.0.0",
    actions: [
        {
            id: "replace-text",
            context: "per_text_file",
            action: (currentFileContent, file) => {
                if (!/index-[0-9a-f]{20}\.js$/.test(file.data?.filename))
                    return currentFileContent;
                return currentFileContent.replaceAll('"Play"', '"lol"');
            },
        },
    ],
    format_version: "1.0.0",
    min_engine_version: "1.0.0",
};
