export const plugin = {
    actions: [
        {
            id: "delete-files",
            context: "global",
            action: (zip) => {
                const assetsDir = zip.find("gui/dist/hbui/assets");
                while (assetsDir.children.length > 0) {
                    zip.remove(assetsDir.children[0]);
                }
            },
        },
    ],
};
