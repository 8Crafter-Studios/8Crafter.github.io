export const plugin = {
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
};
