const currentPresets = {
    none: { displayName: "None (Use Imported .zip File)", url: "" },
    "v1.21.70-71_PC": { displayName: "v1.27.70/71 (PC)", url: "/assets/zip/gui_mc-v1.21.70-71_PC.zip" },
    "v1.21.70-71_Android": { displayName: "v1.27.70/71 (Android)", url: "/assets/zip/gui_mc-v1.21.70-71_Android.zip" },
};
/**
 * @type {File}
 */
let zipFile = undefined;
/**
 * @type {(zip.Entry)[]}
 */
let zipFileEntries = undefined;
// /**
//  * @type {zip.BlobWriter}
//  */
// let blobWriter = undefined;
// /**
//  * @type {zip.ZipWriter}
//  */
// let writer = undefined;
/**
 * @type {zip.FS}
 */
let zipFs = undefined;
/**
 * @type {"none"}
 */
let currentPreset = "none";
/**
 * @type {File}
 */
let currentImportedFile = undefined;

$(function onDocumentLoad() {
    $("#list-wrapper").on("dragenter", function (event) {
        event.preventDefault();
    });

    $("#list-wrapper").on("dragleave", function (event) {
        event.preventDefault();
    });

    $("#list-wrapper").on("dragover", function (event) {
        event.preventDefault();
    });
    $("#list-wrapper").on("drop", async function (event) {
        event.preventDefault();
        await updateZipFile(event.originalEvent.dataTransfer.files[0]);
    });
    $("#file-import-input").on("change", async function () {
        const files = $(this).prop("files");
        if (currentPreset !== "none") return false;
        if (files.length === 0) {
            $("#imported_file_name").css("color", "red");
            $("#imported_file_name").text("No file imported.");
            return;
        }
        $("#file-import-input").prop("disabled", true);
        $("#import_files_error").prop("hidden", true);
        $("#apply_mods").prop("disabled", true);
        $("#download").prop("disabled", true);
        zipFile = files[0];
        currentImportedFile = zipFile;
        $("#imported_file_name").css("color", "yellow");
        $("#imported_file_name").text(`Imported file: ${currentImportedFile.name} - ${formatFileSizeMetric(currentImportedFile.size)} - (Validating...)`);
        await validateZipFile();
        $(this).val("");
        $("#imported_file_name").css("color", "inherit");
        $("#imported_file_name").text(`Imported file: ${currentImportedFile.name} - ${formatFileSizeMetric(currentImportedFile.size)}`);
        $("#file-import-input").prop("disabled", false);
    });
    $("#hardcore_mode_toggle_always_clickable")
        .parent()
        .click(() => {
            saveSetting("hardcore_mode_toggle_always_clickable", $("#hardcore_mode_toggle_always_clickable").prop("checked"));
            if ($("#hardcore_mode_toggle_always_clickable").prop("checked")) {
                $(":root").addClass("hardcore_mode_toggle_always_clickable");
            } else {
                $(":root").removeClass("hardcore_mode_toggle_always_clickable");
            }
        });
    $("#hardcore_mode_toggle_always_clickable").click((e) => {
        e.preventDefault = true;
        $("#hardcore_mode_toggle_always_clickable").prop("checked", !$("#hardcore_mode_toggle_always_clickable").prop("checked"));
        saveSetting("hardcore_mode_toggle_always_clickable", $("#hardcore_mode_toggle_always_clickable").prop("checked"));
        if ($("#hardcore_mode_toggle_always_clickable").prop("checked")) {
            $(":root").addClass("hardcore_mode_toggle_always_clickable");
        } else {
            $(":root").removeClass("hardcore_mode_toggle_always_clickable");
        }
    });
    $("#options_box").submit(function () {
        return false;
    });
    const presetItemTemplate = $("#preset-item-template").prop("content");
    Object.entries(currentPresets).forEach(([key, value]) => {
        if (key !== "none") {
            const presetItem = $(presetItemTemplate).clone();
            presetItem.find("label").text(value.displayName);
            presetItem.find("label").attr("for", "gui_preset_" + key);
            presetItem.find("input").attr("id", "gui_preset_" + key);
            presetItem.find("input").attr("value", key);
            $("#gui_preset .dropdowncontentsinner").append(presetItem);
        }
    });
    $(".guiPresetDropdownOption").click(async (event) => {
        const selectedInput = $(event.currentTarget).find("input")[0];
        if (selectedInput.value === currentPreset) return;
        $("#download").prop("disabled", true);
        currentPreset = selectedInput.value;
        $("#gui_preset").find(".guiPresetDropdownButtonSelectedOptionTextDisplay").text(currentPresets[currentPreset].displayName);
        if (selectedInput.value === "none") {
            $("#import_files_button").prop("disabled", false);
            $("#file-import-input").prop("disabled", false);
            currentImportedFile = zipFile;
            if (currentImportedFile === undefined) {
                $("#apply_mods").prop("disabled", true);
                $("#imported_file_name").css("color", "red");
                $("#imported_file_name").text("No file imported.");
            } else {
                $("#imported_file_name").css("color", "yellow");
                $("#imported_file_name").text(`Imported file: ${currentImportedFile.name} - ${formatFileSizeMetric(currentImportedFile.size)} - (Validating...)`);
                await validateZipFile();
                $("#imported_file_name").css("color", "inherit");
                $("#imported_file_name").text(`Imported file: ${currentImportedFile.name} - ${formatFileSizeMetric(currentImportedFile.size)}`);
                // $("#apply_mods").prop("disabled", false);
            }
        } else {
            $("#import_files_button").prop("disabled", true);
            $("#file-import-input").prop("disabled", true);
            $("#apply_mods").prop("disabled", true);
            currentImportedFile = undefined;
            $("#imported_file_name").css("color", "orange");
            $("#imported_file_name").text(`Loading...`);
            const response = await fetch(currentPresets[currentPreset].url);
            if(response.status === 404) {
                console.error(`404 while loading PRESET: ${currentPresets[currentPreset].displayName}`, currentPresets[currentPreset].url);
                $("#imported_file_name").css("color", "red");
                $("#imported_file_name").text(`Failed to load PRESET: ${currentPresets[currentPreset].displayName}`);
                return;
            }
            currentImportedFile = new File(
                [await response.blob()],
                currentPresets[currentPreset].url.split("/").pop()
            );
            $("#imported_file_name").css("color", "yellow");
            $("#imported_file_name").text(`Imported file: PRESET: ${currentImportedFile.name} - ${formatFileSizeMetric(currentImportedFile.size)} - (Validating...)`);
            // $("#apply_mods").prop("disabled", false);
            await validateZipFile();
            $("#imported_file_name").css("color", "inherit");
            $("#imported_file_name").text(`Imported file: PRESET: ${currentImportedFile.name} - ${formatFileSizeMetric(currentImportedFile.size)}`);
        }
    });
});

/**
 * Format file size in metric prefix
 * @param {number|string} fileSize
 * @returns {string}
 */
const formatFileSizeMetric = (fileSize) => {
    let size = Math.abs(fileSize);

    if (Number.isNaN(size)) {
        return 'Invalid file size';
    }

    if (size === 0) {
        return '0 bytes';
    }

    const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'RB', 'QB'];
    let quotient = Math.floor(Math.log10(size) / 3);
    quotient = quotient < units.length ? quotient : units.length - 1;
    size /= (1000 ** quotient);

    return `${+size.toFixed(2)} ${units[quotient]}`;
};

/**
 * Validates the currently imported zip file, also importing it into zipFs and repairing the directory structure if possible.
 *
 * @returns {Promise<boolean>} A promise resolving to `true` if the zip file is valid and `false` otherwise.
 */
async function validateZipFile() {
    /**
     * @type {0 | 1 | 2}
     */
    let failed = 0;
    try {
        zipFs = new zip.fs.FS();
        await zipFs.importBlob(currentImportedFile);
    } catch (e) {
        failed = 1;
        console.error(e);
        $("#import_files_error").css("color", "red");
        $("#import_files_error").text(`Invalid zip file. ${e + e.stack}`);
    }
    try {
        if (!failed && zipFs.entries.findIndex((entry) => entry.data?.filename === "gui/") === -1) {
            failed = 1;
            if (zipFs.entries.findIndex((entry) => entry.data?.filename === "dist/") !== -1) {
                // Repair the zip directory structure.
                zipFs.move(zipFs.entries.find((entry) => entry.data?.filename === "dist/"), zipFs.addDirectory("gui")); // adding a / to the end of the string for addDirectory causes it to show "Local Disk" inside of the zip file on windows.
                failed = 2;
                $("#import_files_error").css("color", "yellow");
                $("#import_files_error").text(
                    `Your zip file folder structure was invalid, but was repaired. It was supposed have the entire gui/ folder in the root of the zip file. NOT just the contents of it. Your .zip file was structured ${currentImportedFile.name}/dist/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You had zipped the dist folder instead of the gui folder.`
                );
                $("#import_files_error").prop("hidden", false);/* 
                $("#import_files_error").text(
                    `Invalid zip file folder structure. You must have the entire gui/ folder in the root of the zip file. NOT just the contents of it. Your .zip file is structured ${currentImportedFile.name}/dist/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You have zipped the dist folder instead of the gui folder.`
                );
                $("#apply_mods").prop("disabled", true);
                $("#download").prop("disabled", true); */
            } else if (zipFs.entries.findIndex((entry) => entry.data?.filename === "hbui/") !== -1) {
                // Repair the zip directory structure.
                zipFs.move(zipFs.entries.find((entry) => entry.data?.filename === "hbui/"), zipFs.addDirectory("gui/dist"));
                failed = 2;
                $("#import_files_error").css("color", "yellow");
                $("#import_files_error").text(
                    `Your zip file folder structure was invalid, but was repaired. It was supposed have the entire gui/ folder in the root of the zip file. NOT just the contents of the contents of it. Your .zip file was structured ${currentImportedFile.name}/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You had zipped the hbui folder instead of the gui folder.`
                );
                $("#import_files_error").prop("hidden", false);/* 
                $("#import_files_error").text(
                    `Invalid zip file folder structure. You must have the entire gui/ folder in the root of the zip file. NOT just the contents of it. Your .zip file is structured ${currentImportedFile.name}/dist/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You have zipped the dist folder instead of the gui folder.`
                );
                $("#apply_mods").prop("disabled", true);
                $("#download").prop("disabled", true); *//* 
                $("#import_files_error").css("color", "red");
                $("#import_files_error").text(
                    `Invalid zip file folder structure. You must have the entire gui/ folder in the root of the zip file. NOT just the contents of the contents of it. Your .zip file is structured ${currentImportedFile.name}/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You have zipped the hbui folder instead of the gui folder.`
                );
                $("#import_files_error").prop("hidden", false);
                $("#apply_mods").prop("disabled", true);
                $("#download").prop("disabled", true); */
            }else{
                $("#import_files_error").css("color", "red");
                $("#import_files_error").text(`Invalid zip file folder structure. Missing gui/ folder. The gui/ folder must be at the root of the zip file.`);
                $("#import_files_error").prop("hidden", false);
            }
        }
    } catch (e) {
        failed = 1;
        console.error(e);
        $("#import_files_error").css("color", "red");
        $("#import_files_error").text(`Invalid zip file. Error while parsing directory structure: ${e + e.stack}`);
        $("#import_files_error").prop("hidden", false);
    }
    if (failed === 1) {
        $("#apply_mods").prop("disabled", true);
        return false;
    } else if (failed === 2) {
        $("#apply_mods").prop("disabled", false);
        return true;
    } else {
        $("#import_files_error").css("color", "red");
        $("#import_files_error").text("");
        $("#import_files_error").prop("hidden", true);
        $("#apply_mods").prop("disabled", false);
        return true;
    }
}

function getSettings() {
    // Temporary placeholders
    return {
        /**
         * This will allow you to turn hardcore mode on and off whenever you want.
         *
         * @type {boolean}
         */
        hardcoreModeToggleAlwaysClickable: $("#hardcore_mode_toggle_always_clickable").prop("checked"),
        /**
         * This will allow you to disable the experimental toggles even after the world has been played with them on, also applies to the `Education Edition` toggle.
         *
         * @type {boolean}
         */
        allowDisablingEnabledExperimentalToggles: $("#allow_disabling_enabled_experimental_toggles").prop("checked"),
        /**
         * This will add a dropdown that allows you to select the world generator type.
         *
         * It lets you choose any of the following world generator types:
         *
         * - `Legacy`
         * - `Infinite world`
         * - `Flat world`
         * - `Void world`
         *
         * @type {boolean}
         */
        addGeneratorTypeDropdown: $("#add_generator_type_dropdown").prop("checked"),
        /**
         * This will add more options to the `Game Mode` dropdown.
         *
         * It will cause the dropdown to have the following options:
         *
         * - `Survival`
         * - `Creative`
         * - `Adventure`
         * - `Default`
         * - `Spectator`
         *
         * @type {boolean}
         */
        addMoreDefaultGameModes: $("#add_more_default_game_modes").prop("checked"),
        /**
         * This will allow you to change the world seed whenever you want, also works on marketplace worlds that don't let you change the seed.
         *
         * @type {boolean}
         */
        allowForChangingSeeds: $("#allow_for_changing_seeds").prop("checked"),
        /**
         * If specified, this will override the max length of every text box to be the specified value.
         *
         * Leave it blank to not override it.
         *
         * @type {`${number}` | ""}
         */
        maxTextLengthOverride: $("#max_text_length_override").val(),
        /**
         * This adds the `Debug` tab to the create and edit world screens.
         *
         * It also has a bunch of additional options added to the tab that aren't normally in there.
         *
         * @type {boolean}
         */
        addDebugTab: $("#add_debug_tab").prop("checked"),
        /**
         * These are replacements for the UI colors.
         *
         * @type {Record<`#${string}`, `#${string}`>}
         *
         * @todo Make this functional.
         */
        colorReplacements: {
            /**
             * Gray 80
             *
             * This is used as the solid background for many Ore UI menus.
             *
             * @type {`#${string}`}
             */
            "#313233": "#006188",
            /**
             * Gray 70
             *
             * This is used for the main part of a pressed button.
             *
             * @type {`#${string}`}
             */
            "#48494a": "#007eaf",
            "#3c8527": "#27856e",
            "#e6e8eb": "#6200ff",
            "#58585a": "#2c6387",
            "#242425": "#003347",
            "#1e1e1f": "#002c3d",
            "#8c8d90": "#1fbfff",
        },
    };
}

async function applyMods() {
    $("#apply_mods").prop("disabled", true);
    $("#download").prop("disabled", true);
    if(!await validateZipFile()){
        console.error("applyMods - validateZipFile failed");
        return false;
    };
    const settings = getSettings();
    zipFs.entries.map(
        /** @param {zip.ZipFileEntry | zip.ZipDirectoryEntry} entry */ async (entry) => {
            if (!/^(gui\/)?dist\/hbui\/[^\/]+\.(js|html|css)/.test(entry.data?.filename)) {
                return entry;
            }

            if (entry.directory === void false) {
                const origData = await entry.getText();
                let distData = origData;
                if (settings.hardcoreModeToggleAlwaysClickable) {
                    distData = distData.replace(
                        /function hA\(\s*?\{\s*?generalData\s*?:\s*?e\s*?,\s*?isLockedTemplate\s*?:\s*?t\s*?\}\s*?\)\s*?\{\s*?const\s*?\{\s*?t\s*?:\s*?n\s*?\}\s*?=\s*?wi\("CreateNewWorld\.general"\)\s*?,\s*?l\s*?=\s*?ea\(\)\s*?,\s*?o\s*?=\s*?\(\s*?0\s*?,\s*?a\s*?\.\s*?useContext\s*?\)\s*?\(\s*?lT\s*?\)\s*?===\s*?rT\.CREATE\s*?,\s*?i=\s*?\(\s*?0\s*?,\s*?r\.useSharedFacet\s*?\)\s*?\(\s*?Gh\s*?\)\s*?,\s*?c\s*?=\s*?\(\s*?0\s*?,\s*?r\.useFacetMap\s*?\)\s*?\(\s*?\(\s*?\(\s*?e\s*?,\s*?t\s*?,\s*?n\s*?\)\s*?=>\s*?n\s*?\|\|\s*?t\s*?\|\|\s*?!o\s*?\|\|\s*?e\.gameMode\s*?!==\s*?Th\.SURVIVAL\s*?&&\s*?e\.gameMode\s*?!==\s*?Th\.ADVENTURE\s*?\)\s*?,\s*?\[\s*?o\s*?\]\s*?,\s*?\[\s*?e\s*?,\s*?t\s*?,\s*?i\s*?\]\s*?\)\s*?;\s*?return \s*?a\.createElement\(\s*?Nx\s*?,\s*?\{\s*?title\s*?:\s*?n\("\.hardcoreModeTitle"\)\s*?,\s*?soundEffectPressed\s*?:\s*?"ui\.hardcore_toggle_press"\s*?,\s*?disabled\s*?:\s*?c\s*?,\s*?description\s*?:\s*?n\("\.hardcoreModeDescription"\)\s*?,\s*?value\s*?:\s*?\(\s*?0\s*?,\s*?r\.useFacetMap\s*?\)\s*?\(\s*?\(\s*?e\s*?=>\s*?e\.isHardcore\s*?\)\s*?,\s*?\[\s*?\]\s*?,\s*?\[\s*?e\s*?\]\s*?\)\s*?,\s*?onChange\s*?:\s*?\(\s*?0\s*?,\s*?r\.useFacetCallback\s*?\)\s*?\(\s*?\(\s*?e\s*?=>\s*?t\s*?=>\s*?\{\s*?e\.isHardcore\s*?=\s*?t\s*?,\s*?l\(\s*?t\s*?\?\s*?"ui\.hardcore_enable"\s*?:\s*?"ui\.hardcore_disable"\s*?\)\s*?\}\s*?\)\s*?,\s*?\[\s*?l\s*?\]\s*?,\s*?\[\s*?e\s*?\]\s*?\)\s*?,\s*?gamepad\s*?:\s*?\{\s*?index\s*?:\s*?4\s*?\}\s*?,\s*?imgSrc\s*?:\s*?uA\s*?,\s*?"data-testid"\s*?:\s*?"hardcore-mode-toggle"\s*?\}\s*?\)\s*?\}/g,
                        `/**
             * The hardcore mode toggle.
             *
             * @param {Object} param0
             * @param {unknown} param0.generalData
             * @param {boolean} param0.isLockedTemplate
             */
            function hA({ generalData: e, isLockedTemplate: t }) {
                const { t: n } = wi("CreateNewWorld.general"),
                    l = ea(),
                    o = (0, a.useContext)(lT) === rT.CREATE,
                    i = (0, r.useSharedFacet)(Gh),
                    c = (0, r.useFacetMap)((e, t, n) => n || t || !o || (e.gameMode !== Th.SURVIVAL && e.gameMode !== Th.ADVENTURE), [o], [e, t, i]);
                return a.createElement(Nx, {
                    title: n(".hardcoreModeTitle"),
                    soundEffectPressed: "ui.hardcore_toggle_press",
                    disabled: false /* c */, // Modified to make the hardcore mode toggle always be enabled.
                    description: n(".hardcoreModeDescription"),
                    value: (0, r.useFacetMap)((e) => e.isHardcore, [], [e]),
                    onChange: (0, r.useFacetCallback)(
                        (e) => (t) => {
                            (e.isHardcore = t), l(t ? "ui.hardcore_enable" : "ui.hardcore_disable");
                        },
                        [l],
                        [e]
                    ),
                    gamepad: { index: 4 },
                    imgSrc: uA,
                    "data-testid": "hardcore-mode-toggle",
                });
            }`
                    );
                }
                if (settings.allowDisablingEnabledExperimentalToggles) {
                    distData = distData.replace(
                        `function BA({experimentalFeature:e,gamepadIndex:t,disabled:n,achievementsDisabledMessages:l,areAllTogglesDisabled:o}){const{gt:i}=function(){const{translate:e,formatDate:t}=(0,a.useContext)(gl);return(0,a.useMemo)((()=>({f:{formatDate:t},gt:(t,n)=>{var a;return null!==(a=e(t,n))&&void 0!==a?a:t}})),[e,t])}(),{t:c}=wi("CreateNewWorld.all"),s=(0,r.useFacetMap)((e=>e.id),[],[e]),u=(0,r.useFacetUnwrap)(s),d=(0,r.useFacetMap)((e=>e.title),[],[e]),m=(0,r.useFacetUnwrap)(d),p=(0,r.useFacetMap)((e=>e.description),[],[e]),f=(0,r.useFacetUnwrap)(p),g=(0,r.useFacetMap)((e=>e.isEnabled),[],[e]),E=(0,r.useFacetMap)(((e,t)=>e||t.isTogglePermanentlyDisabled),[],[(0,r.useFacetWrap)(n),e]),h=(0,r.useFacetCallback)(((e,t)=>n=>{n&&t?xf.set({userTriedToActivateToggle:!0,doSetToggleValue:()=>e.isEnabled=n,userHasAcceptedBetaFeatures:!1}):e.isEnabled=n}),[],[e,o]),v=c(".narrationSuffixDisablesAchievements"),b=(0,r.useFacetMap)((e=>0===e.length?c(".narrationSuffixEnablesAchievements"):void 0),[c],[l]);return null!=u?a.createElement(Nx,{title:m!==r.NO_VALUE?i(m):"",description:f!==r.NO_VALUE?i(f):"",gamepad:{index:t},value:g,disabled:E,onChange:h,onNarrationText:v,offNarrationText:b}):null}`,
                        `/**
             * Handles the gneration of an experimental toggle, and the education edition toggle.
             *
             * @param {object} param0
             * @param {unknown} param0.experimentalFeature
             * @param {unknown} param0.gamepadIndex
             * @param {boolean} [param0.disabled]
             * @param {unknown} param0.achievementsDisabledMessages
             * @param {unknown} param0.areAllTogglesDisabled
             */
            function BA({ experimentalFeature: e, gamepadIndex: t, disabled: n, achievementsDisabledMessages: l, areAllTogglesDisabled: o }) {
                const { gt: i } = (function () {
                        const { translate: e, formatDate: t } = (0, a.useContext)(gl);
                        return (0, a.useMemo)(
                            () => ({
                                f: { formatDate: t },
                                gt: (t, n) => {
                                    var a;
                                    return null !== (a = e(t, n)) && void 0 !== a ? a : t;
                                },
                            }),
                            [e, t]
                        );
                    })(),
                    { t: c } = wi("CreateNewWorld.all"),
                    s = (0, r.useFacetMap)((e) => e.id, [], [e]),
                    u = (0, r.useFacetUnwrap)(s),
                    d = (0, r.useFacetMap)((e) => e.title, [], [e]),
                    m = (0, r.useFacetUnwrap)(d),
                    p = (0, r.useFacetMap)((e) => e.description, [], [e]),
                    f = (0, r.useFacetUnwrap)(p),
                    g = (0, r.useFacetMap)((e) => e.isEnabled, [], [e]),
                    E = (0, r.useFacetMap)((e, t) => e || t.isTogglePermanentlyDisabled, [], [(0, r.useFacetWrap)(false /* n */), e]), // Modified
                    h = (0, r.useFacetCallback)(
                        (e, t) => (n) => {
                            n && t
                                ? xf.set({ userTriedToActivateToggle: !0, doSetToggleValue: () => (e.isEnabled = n), userHasAcceptedBetaFeatures: !1 })
                                : (e.isEnabled = n);
                        },
                        [],
                        [e, o]
                    ),
                    v = c(".narrationSuffixDisablesAchievements"),
                    b = (0, r.useFacetMap)((e) => (0 === e.length ? c(".narrationSuffixEnablesAchievements") : void 0), [c], [l]);
                return null != u
                    ? a.createElement(Nx, {
                          title: m !== r.NO_VALUE ? i(m) : "",
                          description: f !== r.NO_VALUE ? i(f) : "",
                          gamepad: { index: t },
                          value: g,
                          disabled: false /* E */, // Modified
                          onChange: h,
                          onNarrationText: v,
                          offNarrationText: b,
                      })
                    : null;
            }`
                    );
                }
                if (settings.addMoreDefaultGameModes) {
                    distData = distData
                        .replace(
                            `function bA({generalData:e,isLockedTemplate:t,isUsingTemplate:n,achievementsDisabledMessages:l,isHardcoreMode:o}){const{t:i}=wi("CreateNewWorld.general"),{t:c}=wi("CreateNewWorld.all"),s=(0,r.useSharedFacet)(Gh),u=(0,a.useContext)(lT)!==rT.CREATE,d=(0,r.useSharedFacet)(bh),m=(0,r.useFacetMap)(((e,t,n)=>e||t||n),[],[t,s,o]),p=(0,r.useFacetMap)(((e,t)=>{const n=[mA({label:i(".gameModeSurvivalLabel"),description:i(".gameModeSurvivalDescription"),value:Th.SURVIVAL},1===e.length?{narrationSuffix:c(".narrationSuffixEnablesAchievements")}:{}),{label:i(".gameModeCreativeLabel"),description:i(".gameModeCreativeDescription"),value:Th.CREATIVE,narrationSuffix:c(".narrationSuffixDisablesAchievements")}];return(u||t)&&n.push(mA({label:i(".gameModeAdventureLabel"),description:i(t?".gameModeAdventureTemplateDescription":".gameModeAdventureDescription"),value:Th.ADVENTURE},1===e.length?{narrationSuffix:c(".narrationSuffixEnablesAchievements")}:{})),n}),[i,c,u],[l,n]),f=(0,r.useNotifyMountComplete)();return a.createElement(Fx,{title:i(".gameModeTitle"),disabled:m,options:p,onMountComplete:f,value:(0,r.useFacetMap)((e=>e.gameMode),[],[e]),onChange:(0,r.useFacetCallback)(((e,t)=>n=>{const a=e.gameMode;e.gameMode=n,u&&t.trackOptionChanged(cA.GameModeChanged,a,n)}),[u],[e,d])})}`,
                            `/**
             * The game mode dropdown.
             *
             * @param param0
             * @param {unknown} param0.generalData
             * @param {boolean} param0.isLockedTemplate
             * @param {boolean} param0.isUsingTemplate
             * @param {unknown} param0.achievementsDisabledMessages
             * @param {boolean} param0.isHardcoreMode
             */
            function bA({ generalData: e, isLockedTemplate: t, isUsingTemplate: n, achievementsDisabledMessages: l, isHardcoreMode: o }) {
                const { t: i } = wi("CreateNewWorld.general"),
                    { t: c } = wi("CreateNewWorld.all"),
                    s = (0, r.useSharedFacet)(Gh),
                    u = (0, a.useContext)(lT) !== rT.CREATE,
                    d = (0, r.useSharedFacet)(bh),
                    m = (0, r.useFacetMap)((e, t, n) => e || t || n, [], [t, s, o]),
                    p = (0, r.useFacetMap)(
                        (e, t) => {
                            const n = [/* 
                                mA(
                                    { label: i(".gameModeUnknownLabel"), description: i(".gameModeUnknownDescription"), value: Th.UNKNOWN },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ), */
                                mA(
                                    { label: i(".gameModeSurvivalLabel"), description: i(".gameModeSurvivalDescription"), value: Th.SURVIVAL },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                {
                                    label: i(".gameModeCreativeLabel"),
                                    description: i(".gameModeCreativeDescription"),
                                    value: Th.CREATIVE,
                                    narrationSuffix: c(".narrationSuffixDisablesAchievements"),
                                },
                                mA(
                                    {
                                        label: i(".gameModeAdventureLabel"),
                                        description: i(t ? ".gameModeAdventureTemplateDescription" : ".gameModeAdventureDescription"),
                                        value: Th.ADVENTURE,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),/* 
                                mA(
                                    {
                                        label: "Game Mode 3",
                                        description: "Secret game mode 3.",
                                        value: Th.GM3,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                mA(
                                    {
                                        label: "Game Mode 4",
                                        description: "Secret game mode 4.",
                                        value: Th.GM4,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ), */
                                mA(
                                    {
                                        label: "Default",
                                        description: "Default game mode, might break things if you set the default game mode to itself.",
                                        value: Th.DEFAULT,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                mA(
                                    {
                                        label: "Spectator",
                                        description: "Spectator mode.",
                                        value: Th.SPECTATOR,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),/* 
                                mA(
                                    {
                                        label: "Game Mode 7",
                                        description: "Secret game mode 7.",
                                        value: Th.GM7,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                mA(
                                    {
                                        label: "Game Mode 8",
                                        description: "Secret game mode 8.",
                                        value: Th.GM8,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                mA(
                                    {
                                        label: "Game Mode 9",
                                        description: "Secret game mode 9.",
                                        value: Th.GM9,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ), */
                            ]; /* 
                            return (
                                (u || t) &&
                                    n.push(
                                        mA(
                                            {
                                                label: i(".gameModeAdventureLabel"),
                                                description: i(t ? ".gameModeAdventureTemplateDescription" : ".gameModeAdventureDescription"),
                                                value: Th.ADVENTURE,
                                            },
                                            1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                        )
                                    ),
                                n
                            ); */
                            return n;
                        },
                        [i, c, u],
                        [l, n]
                    ),
                    f = (0, r.useNotifyMountComplete)();
                return a.createElement(Fx, {
                    title: i(".gameModeTitle"),
                    disabled: m,
                    options: p,
                    onMountComplete: f,
                    value: (0, r.useFacetMap)((e) => e.gameMode, [], [e]),
                    onChange: (0, r.useFacetCallback)(
                        (e, t) => (n) => {
                            const a = e.gameMode;
                            (e.gameMode = n), u && t.trackOptionChanged(cA.GameModeChanged, a, n);
                        },
                        [u],
                        [e, d]
                    ),
                });
            }`
                        )
                        .replace(
                            `function(e){e[e.UNKNOWN=-1]="UNKNOWN",e[e.SURVIVAL=0]="SURVIVAL",e[e.CREATIVE=1]="CREATIVE",e[e.ADVENTURE=2]="ADVENTURE"}(Th||(Th={})),`,
                            `(function (e) {
                    // Modified to add more game modes.
                    (e[(e.UNKNOWN = -1)] = "UNKNOWN"),
                        (e[(e.SURVIVAL = 0)] = "SURVIVAL"),
                        (e[(e.CREATIVE = 1)] = "CREATIVE"),
                        (e[(e.ADVENTURE = 2)] = "ADVENTURE"),
                        (e[(e.GM3 = 3)] = "GM3"),
                        (e[(e.GM4 = 4)] = "GM4"),
                        (e[(e.DEFAULT = 5)] = "DEFAULT"),
                        (e[(e.SPECTATOR = 6)] = "SPECTATOR"),
                        (e[(e.GM7 = 7)] = "GM7"),
                        (e[(e.GM8 = 8)] = "GM8"),
                        (e[(e.GM9 = 9)] = "GM9");
                })(Th || (Th = {})),`
                        );
                }
                if (settings.addGeneratorTypeDropdown) {
                    distData = distData
                        .replace(
                            `E&&!s?a.createElement(r.Mount,{when:n},a.createElement(r.DeferredMount,null,a.createElement(tR,{label:c(".generatorTypeLabel"),options:[{value:Qh.Overworld,label:c(".vanillaWorldGeneratorLabel"),description:c(".vanillaWorldGeneratorDescription")},{value:Qh.Flat,label:c(".flatWorldGeneratorLabel"),description:c(".flatWorldGeneratorDescription")},{value:Qh.Void,label:c(".voidWorldGeneratorLabel"),description:c(".voidWorldGeneratorDescription")}],value:b.value,onChange:b.onChange}))):null`,
                            `// Modified to add this dropdown
                                      a.createElement(
                                          r.Mount,
                                          { when: true /* n */ },
                                          a.createElement(
                                              r.DeferredMount,
                                              null,
                                              a.createElement(tR, {
                                                  label: c(".generatorTypeLabel"),
                                                  options: [
                                                      {
                                                          value: Qh.Legacy,
                                                          label: "Legacy",
                                                          description: "The old world type.",
                                                      },
                                                      {
                                                          value: Qh.Overworld,
                                                          label: c(".vanillaWorldGeneratorLabel"),
                                                          description: c(".vanillaWorldGeneratorDescription"),
                                                      },
                                                      {
                                                          value: Qh.Flat,
                                                          label: c(".flatWorldGeneratorLabel"),
                                                          description: c(".flatWorldGeneratorDescription"),
                                                      },/* 
                                                      {
                                                          value: Qh.Nether,
                                                          label: "Nether",
                                                          description: c(".vanillaWorldGeneratorDescription"),
                                                      },
                                                      {
                                                          value: Qh.TheEnd,
                                                          label: "The End",
                                                          description: c(".vanillaWorldGeneratorDescription"),
                                                      }, */
                                                      {
                                                          value: Qh.Void,
                                                          label: c(".voidWorldGeneratorLabel"),
                                                          description: c(".voidWorldGeneratorDescription"),
                                                      },/* 
                                                      {
                                                          value: Qh.Undefined,
                                                          label: "Undefined",
                                                          description: c(".vanillaWorldGeneratorDescription"),
                                                      }, */
                                                  ],
                                                  value: b.value,
                                                  onChange: b.onChange,
                                              }) /* 
                                              (e[(e.Legacy = 0)] = "Legacy"),
                                                (e[(e.Overworld = 1)] = "Overworld"),
                                                (e[(e.Flat = 2)] = "Flat"),
                                                (e[(e.Nether = 3)] = "Nether"),
                                                (e[(e.TheEnd = 4)] = "TheEnd"),
                                                (e[(e.Void = 5)] = "Void"),
                                                (e[(e.Undefined = 6)] = "Undefined"); */
                                          )
                                      )`
                        )
                        .replace(
                            `function(e){e[e.Legacy=0]="Legacy",e[e.Overworld=1]="Overworld",e[e.Flat=2]="Flat",e[e.Nether=3]="Nether",e[e.TheEnd=4]="TheEnd",e[e.Void=5]="Void",e[e.Undefined=6]="Undefined"}(Qh||(Qh={})),`,
                            `(function (e) {
                    (e[(e.Legacy = 0)] = "Legacy"),
                        (e[(e.Overworld = 1)] = "Overworld"),
                        (e[(e.Flat = 2)] = "Flat"),
                        (e[(e.Nether = 3)] = "Nether"),
                        (e[(e.TheEnd = 4)] = "TheEnd"),
                        (e[(e.Void = 5)] = "Void"),
                        (e[(e.Undefined = 6)] = "Undefined");
                })(Qh || (Qh = {})),`
                        );
                }
                if (settings.allowForChangingSeeds) {
                    distData = distData.replace(
                        `ER=({advancedData:e,isEditorWorld:t,onSeedValueChange:n,isSeedChangeLocked:l,showSeedTemplates:o})=>{const{t:i}=Og("CreateNewWorld.advanced"),{t:c}=Og("CreateNewWorld.all"),s=(0,a.useContext)(lT)!==rT.CREATE,u=Tv($A),d=Gr(),m=(0,r.useSharedFacet)(Cf),p=(0,r.useSharedFacet)(jg),f=(0,r.useFacetMap)((e=>e.worldSeed),[],[e]),g=(0,r.useFacetMap)((e=>e.isClipboardCopySupported),[],[m]),E=(0,r.useFacetCallback)(((e,t,n)=>()=>{t.copyToClipboard(e),n.queueSnackbar(i(".copyToClipboard"))}),[i],[f,m,p]),h=s?E:()=>d.push("/create-new-world/seed-templates"),v=s?"":i(".worldSeedPlaceholder"),b=i(s?".worldSeedCopyButton":".worldSeedButton"),y=(0,r.useFacetMap)(((e,t,n)=>t||n&&u&&!s&&e.generatorType!=Qh.Overworld),[u,s],[e,l,t]);return o?a.createElement(r.DeferredMount,null,a.createElement(Fl,{data:g},(e=>s&&!e?a.createElement($O,{disabled:s,label:i(".worldSeedLabel"),description:i(".worldSeedDescription"),maxLength:32,value:f,onChange:n,placeholder:i(".worldSeedPlaceholder"),disabledNarrationSuffix:c(".narrationSuffixTemplateLocked"),"data-testid":"world-seed-text-field"}):a.createElement($O.WithButton,{buttonInputLegend:b,buttonText:b,buttonOnClick:h,textDisabled:s,disabled:y,label:i(".worldSeedLabel"),description:i(".worldSeedDescription"),maxLength:32,value:f,onChange:n,placeholder:v,buttonNarrationHint:i(".narrationTemplatesButtonNarrationHint"),disabledNarrationSuffix:c(".narrationSuffixTemplateLocked"),"data-testid":"world-seed-with-button"})))):a.createElement(r.DeferredMount,null,a.createElement($O,{disabled:y,label:i(".worldSeedLabel"),description:i(".worldSeedDescription"),maxLength:32,value:f,onChange:n,placeholder:i(".worldSeedPlaceholder"),disabledNarrationSuffix:c(".narrationSuffixTemplateLocked")}))},`,
                        `ER = ({ advancedData: e, isEditorWorld: t, onSeedValueChange: n, isSeedChangeLocked: l, showSeedTemplates: o, worldData: wd }) => {
                    const { t: i } = Og("CreateNewWorld.advanced"),
                        { t: c } = Og("CreateNewWorld.all"),
                        s = (0, a.useContext)(lT) !== rT.CREATE,
                        u = Tv($A),
                        d = Gr(),
                        m = (0, r.useSharedFacet)(Cf),
                        p = (0, r.useSharedFacet)(jg),
                        f = (0, r.useFacetMap)((e) => e.worldSeed, [], [e]),
                        g = (0, r.useFacetMap)((e) => e.isClipboardCopySupported, [], [m]),
                        E = (0, r.useFacetCallback)(
                            (e, t, n) => () => {
                                t.copyToClipboard(e), n.queueSnackbar(i(".copyToClipboard"));
                            },
                            [i],
                            [f, m, p]
                        ),
                        h = s ? E : () => d.push("/create-new-world/seed-templates"),
                        v = s ? "" : i(".worldSeedPlaceholder"),
                        b = i(s ? ".worldSeedCopyButton" : ".worldSeedButton"),
                        y = (0, r.useFacetMap)((e, t, n) => t || (n && u && !s && e.generatorType != Qh.Overworld), [u, s], [e, l, t]);
                    return (/* o
                        ?  */a.createElement(
                              r.DeferredMount,
                              null,
                              a.createElement(Fl, { data: g }, (e) =>
                                  /* s && !e
                                      ? a.createElement($O, {
                                            disabled: s,
                                            label: i(".worldSeedLabel"),
                                            description: i(".worldSeedDescription"),
                                            maxLength: ${
                                                settings.maxTextLengthOverride === ""
                                                    ? 1000000
                                                    : BigInt(settings.maxTextLengthOverride) > 1000000n
                                                    ? 1000000
                                                    : settings.maxTextLengthOverride
                                            },
                                            value: f,
                                            onChange: n,
                                            placeholder: i(".worldSeedPlaceholder"),
                                            disabledNarrationSuffix: c(".narrationSuffixTemplateLocked"),
                                            "data-testid": "world-seed-text-field",
                                        })
                                      :  */a.createElement($O.WithButton, {
                                            buttonInputLegend: b,
                                            buttonText: b,
                                            buttonOnClick: h,
                                            textDisabled: false /* s */, // Modified
                                            disabled: false /* y */, // Modified
                                            label: i(".worldSeedLabel"),
                                            description: i(".worldSeedDescription") + (s ? " Please go to the Debug tab if you want to change the seed, as any changes made in this text box will not be saved." : ""),
                                            maxLength: ${
                                                settings.maxTextLengthOverride === ""
                                                    ? 1000000
                                                    : BigInt(settings.maxTextLengthOverride) > 1000000n
                                                    ? 1000000
                                                    : settings.maxTextLengthOverride
                                            },
                                            value: f,
                                            onChange: n,
                                            placeholder: v,
                                            buttonNarrationHint: i(".narrationTemplatesButtonNarrationHint"),
                                            disabledNarrationSuffix: c(".narrationSuffixTemplateLocked"),
                                            "data-testid": "world-seed-with-button",
                                        })
                              )
                          )/* 
                        : a.createElement(
                              r.DeferredMount,
                              null,
                              a.createElement($O, {
                                  disabled: y,
                                  label: i(".worldSeedLabel"),
                                  description: i(".worldSeedDescription"),
                                  maxLength: ${
                                      settings.maxTextLengthOverride === ""
                                          ? 1000000
                                          : BigInt(settings.maxTextLengthOverride) > 1000000n
                                          ? 1000000
                                          : settings.maxTextLengthOverride
                                  },
                                  value: f,
                                  onChange: n,
                                  placeholder: i(".worldSeedPlaceholder"),
                                  disabledNarrationSuffix: c(".narrationSuffixTemplateLocked"),
                              })
                          ) */);
                },`
                    );
                }
                if (settings.addDebugTab) {
                    distData = distData.replace(
                        `function n_({worldData:e,achievementsDisabledMessages:t,onUnlockTemplateSettings:n,onExportTemplate:l,onClearPlayerData:o,isEditorWorld:i}){const c=(0,r.useSharedFacet)(Nf),s=(0,r.useFacetMap)((({allBiomes:e})=>e),[],[c]),u=(0,r.useFacetMap)((e=>e.isLockedTemplate),[],[e]),d=(0,r.useFacetMap)((e=>e.achievementsDisabled),[],[e]),m=(0,r.useFacetMap)((({spawnDimensionId:e})=>e),[],[c]),p=(0,r.useFacetMap)((e=>mL(e,(e=>({label:e.label,dimension:e.dimension,value:e.id})))),[],[s]),f=(0,r.useFacetMap)(((e,t)=>QC(e,(e=>e.dimension===t))),[],[p,m]),g=(0,r.useFacetMap)((e=>e.spawnBiomeId),[],[c]),E=(0,r.useFacetMap)((e=>e.defaultSpawnBiome||e.isBiomeOverrideActive),[],[c]),h=(0,r.useSharedFacet)(al),v=(0,r.useFacetMap)((e=>XC(e.platform)),[],[h]),b=(0,a.useContext)(lT)!==rT.CREATE,y=(0,r.useFacetMap)((e=>e&&b),[b],[v]);return a.createElement(r.DeferredMountProvider,null,a.createElement(UO,{isLockedTemplate:u,achievementsDisabled:d,achievementsDisabledMessages:t,narrationText:"Debug",onUnlockTemplateSettings:n,isEditorWorld:i},a.createElement(r.DeferredMount,null,a.createElement(Nx,{title:"Flat nether",gamepad:{index:0},value:(0,r.useFacetMap)((e=>e.flatNether),[],[c]),onChange:(0,r.useFacetCallback)((e=>t=>{e.flatNether=t}),[],[c])})),a.createElement(r.DeferredMount,null,a.createElement(Nx,{title:"Enable game version override",gamepad:{index:1},value:(0,r.useFacetMap)((e=>e.enableGameVersionOverride),[],[c]),onChange:(0,r.useFacetCallback)((e=>t=>{e.enableGameVersionOverride=t}),[],[c])})),a.createElement(r.DeferredMount,null,a.createElement($O,{label:"Game version override",gamepadIndex:2,placeholder:"0.0.0",maxLength:30,disabled:(0,r.useFacetMap)((e=>!e.enableGameVersionOverride),[],[c]),value:(0,r.useFacetMap)((e=>e.gameVersionOverride),[],[c]),onChange:(0,r.useFacetCallback)((e=>t=>{e.gameVersionOverride=t}),[],[c])})),a.createElement(r.DeferredMount,null,a.createElement(NP,{title:"World biome settings"})),a.createElement(Nx,{title:"Default spawn biome",description:"Using the default spawn biome will mean a random overworld spawn is selected",gamepad:{index:3},disabled:(0,r.useFacetMap)((e=>e.isBiomeOverrideActive),[],[c]),value:(0,r.useFacetMap)((e=>e.defaultSpawnBiome),[],[c]),onChange:(0,r.useFacetCallback)((e=>t=>{e.defaultSpawnBiome=t}),[],[c])}),a.createElement(r.DeferredMount,null,a.createElement(Fx,{onMountComplete:(0,r.useNotifyMountComplete)(),title:"Spawn dimension filter",disabled:E,wrapToggleText:!0,options:[{label:"Overworld",value:0},{label:"Nether",value:1}],value:m,onChange:(0,r.useFacetCallback)((e=>t=>{e.spawnDimensionId=t}),[],[c])})),a.createElement(r.DeferredMount,null,a.createElement(vx,{title:"Spawn biome",options:f,onItemSelect:(0,r.useFacetCallback)((e=>t=>e.spawnBiomeId=t),[],[c]),disabled:E,value:(0,r.useFacetMap)(((e,t)=>t.filter((t=>t.value===e)).length>0?e:t[0].value),[],[g,f]),focusOnSelectedItem:!0})),a.createElement(Nx,{title:"Biome override",description:"Set the world to a selected biome. This will override the Spawn biome!",gamepad:{index:6},value:(0,r.useFacetMap)((e=>e.isBiomeOverrideActive),[],[c]),onChange:(0,r.useFacetCallback)((e=>t=>{e.isBiomeOverrideActive=t}),[],[c])}),a.createElement(vx,{title:"Biome override",description:"Select biome to be used in the entire world",options:p,disabled:(0,r.useFacetMap)((e=>!e.isBiomeOverrideActive),[],[c]),onItemSelect:(0,r.useFacetCallback)((e=>t=>{e.biomeOverrideId=t}),[],[c]),value:(0,r.useFacetMap)((e=>e.biomeOverrideId),[],[c]),focusOnSelectedItem:!0}),a.createElement(r.Mount,{when:y},a.createElement(a_,{onExportTemplate:l,onClearPlayerData:o}))))}`,
                        `/**
             * The function for the Debug tab of the create and edit world screens.
             *
             * @param {object} param0
             * @param {RawWorldData} param0.worldData
             * @param {unknown} param0.achievementsDisabledMessages
             * @param {unknown} param0.onUnlockTemplateSettings
             * @param {unknown} param0.onExportTemplate
             * @param {unknown} param0.onClearPlayerData
             * @param {boolean} param0.isEditorWorld
             */
            function n_({
                worldData: e,
                achievementsDisabledMessages: t,
                onUnlockTemplateSettings: n,
                onExportTemplate: l,
                onClearPlayerData: o,
                isEditorWorld: i,
            }) {
                const c = (0, r.useSharedFacet)(Nf),
                    s = (0, r.useFacetMap)(({ allBiomes: e }) => e, [], [c]),
                    u = (0, r.useFacetMap)((e) => e.isLockedTemplate, [], [e]),
                    d = (0, r.useFacetMap)((e) => e.achievementsDisabled, [], [e]),
                    m = (0, r.useFacetMap)(({ spawnDimensionId: e }) => e, [], [c]),
                    p = (0, r.useFacetMap)((e) => mL(e, (e) => ({ label: e.label, dimension: e.dimension, value: e.id })), [], [s]),
                    f = (0, r.useFacetMap)((e, t) => QC(e, (e) => e.dimension === t), [], [p, m]),
                    g = (0, r.useFacetMap)((e) => e.spawnBiomeId, [], [c]),
                    E = (0, r.useFacetMap)((e) => e.defaultSpawnBiome || e.isBiomeOverrideActive, [], [c]),
                    h = (0, r.useSharedFacet)(al),
                    v = (0, r.useFacetMap)((e) => XC(e.platform), [], [h]),
                    b = (0, a.useContext)(lT) !== rT.CREATE,
                    y = (0, r.useFacetMap)((e) => e && b, [b], [v]),
                    rawData = (0, r.useFacetMap)((e) => e, [], [e]);
                return a.createElement(
                    r.DeferredMountProvider,
                    null,
                    a.createElement(
                        UO,
                        {
                            isLockedTemplate: u,
                            achievementsDisabled: d,
                            achievementsDisabledMessages: t,
                            narrationText: "Debug",
                            onUnlockTemplateSettings: n,
                            isEditorWorld: i,
                        },
                        a.createElement(
                            r.DeferredMount,
                            null,
                            a.createElement(Nx, {
                                title: "Flat nether",
                                gamepad: { index: 0 },
                                value: (0, r.useFacetMap)((e) => e.flatNether, [], [c]),
                                onChange: (0, r.useFacetCallback)(
                                    (e) => (t) => {
                                        e.flatNether = t;
                                    },
                                    [],
                                    [c]
                                ),
                            })
                        ),
                        a.createElement(
                            r.DeferredMount,
                            null,
                            a.createElement(Nx, {
                                title: "Enable game version override",
                                gamepad: { index: 1 },
                                value: (0, r.useFacetMap)((e) => e.enableGameVersionOverride, [], [c]),
                                onChange: (0, r.useFacetCallback)(
                                    (e) => (t) => {
                                        e.enableGameVersionOverride = t;
                                    },
                                    [],
                                    [c]
                                ),
                            })
                        ),
                        a.createElement(
                            r.DeferredMount,
                            null,
                            a.createElement($O, {
                                label: "Game version override",
                                gamepadIndex: 2,
                                placeholder: "0.0.0",
                                maxLength: 30000,
                                disabled: (0, r.useFacetMap)((e) => !e.enableGameVersionOverride, [], [c]),
                                value: (0, r.useFacetMap)((e) => e.gameVersionOverride, [], [c]),
                                onChange: (0, r.useFacetCallback)(
                                    (e) => (t) => {
                                        e.gameVersionOverride = t;
                                    },
                                    [],
                                    [c]
                                ),
                            })
                        ),
                        a.createElement(r.DeferredMount, null, a.createElement(NP, { title: "World biome settings" })),
                        a.createElement(Nx, {
                            title: "Default spawn biome",
                            description: "Using the default spawn biome will mean a random overworld spawn is selected",
                            gamepad: { index: 3 },
                            disabled: (0, r.useFacetMap)((e) => e.isBiomeOverrideActive, [], [c]),
                            value: (0, r.useFacetMap)((e) => e.defaultSpawnBiome, [], [c]),
                            onChange: (0, r.useFacetCallback)(
                                (e) => (t) => {
                                    e.defaultSpawnBiome = t;
                                },
                                [],
                                [c]
                            ),
                        }),
                        a.createElement(
                            r.DeferredMount,
                            null,
                            a.createElement(Fx, {
                                onMountComplete: (0, r.useNotifyMountComplete)(),
                                title: "Spawn dimension filter",
                                disabled: E,
                                wrapToggleText: !0,
                                options: [
                                    { label: "Overworld", value: 0 },
                                    { label: "Nether", value: 1 },
                                ],
                                value: m,
                                onChange: (0, r.useFacetCallback)(
                                    (e) => (t) => {
                                        e.spawnDimensionId = t;
                                    },
                                    [],
                                    [c]
                                ),
                            })
                        ),
                        a.createElement(
                            r.DeferredMount,
                            null,
                            a.createElement(vx, {
                                title: "Spawn biome",
                                options: f,
                                onItemSelect: (0, r.useFacetCallback)((e) => (t) => (e.spawnBiomeId = t), [], [c]),
                                disabled: E,
                                value: (0, r.useFacetMap)((e, t) => (t.filter((t) => t.value === e).length > 0 ? e : t[0].value), [], [g, f]),
                                focusOnSelectedItem: !0,
                            })
                        ),
                        a.createElement(Nx, {
                            title: "Biome override",
                            description: "Set the world to a selected biome. This will override the Spawn biome!",
                            gamepad: { index: 6 },
                            value: (0, r.useFacetMap)((e) => e.isBiomeOverrideActive, [], [c]),
                            onChange: (0, r.useFacetCallback)(
                                (e) => (t) => {
                                    e.isBiomeOverrideActive = t;
                                },
                                [],
                                [c]
                            ),
                        }),
                        a.createElement(vx, {
                            title: "Biome override",
                            description: "Select biome to be used in the entire world",
                            options: p,
                            disabled: (0, r.useFacetMap)((e) => !e.isBiomeOverrideActive, [], [c]),
                            onItemSelect: (0, r.useFacetCallback)(
                                (e) => (t) => {
                                    e.biomeOverrideId = t;
                                },
                                [],
                                [c]
                            ),
                            value: (0, r.useFacetMap)((e) => e.biomeOverrideId, [], [c]),
                            focusOnSelectedItem: !0,
                        }),
                        a.createElement(r.Mount, { when: y }, a.createElement(a_, { onExportTemplate: l, onClearPlayerData: o })),
                        a.createElement(r.DeferredMount, null, a.createElement(rawValueEditor, { rawData: e })),
                        a.createElement(() =>
                            a.createElement(
                                a.Fragment,
                                null,
                                a.createElement(fu, null, "Debug Info - Raw"),
                                a.createElement(Gc, { size: 1 }) /* 
                                a.createElement(r.DeferredMount, null, a.createElement(Dk.Text, null, "worldSummary: " + JSON.stringify(e.get(), undefined, 2))),
                                a.createElement(r.DeferredMount, null, a.createElement(Dk.Text, null, "worldData: " + JSON.stringify(u.get(), undefined, 2))),
                                a.createElement(r.DeferredMount, null, a.createElement(Dk.Text, null, "achievementsDisabledMessages: " + JSON.stringify(t.get(), undefined, 2))), */,
                                a.createElement(
                                    r.DeferredMount,
                                    null,
                                    a.createElement(
                                        function ({ children: e, align: t }) {
                                            return a.createElement(js, { type: "body", role: "inherit", align: t, shouldNarrate: !1, whiteSpace: "pre" }, e);
                                        },
                                        null,
                                        "rawData: " +
                                            JSON.stringify(
                                                {
                                                    ...rawData.get(),
                                                    betaFeatures: rawData.get().betaFeatures.map((v) => JSON.parse(JSON.stringify(v))),
                                                },
                                                undefined,
                                                2
                                            )
                                    )
                                ),
                                a.createElement($O, {
                                    label: "rawData (read-only)",
                                    // gamepadIndex: 1,
                                    placeholder: "Raw Data JSON",
                                    maxLength: 3000000,
                                    value: JSON.stringify(
                                        {
                                            ...rawData.get(),
                                            betaFeatures: rawData.get().betaFeatures.map((v) => JSON.parse(JSON.stringify(v))),
                                        },
                                        undefined,
                                        0
                                    ),
                                    // onChange: d,
                                    filterProfanity: !1,
                                    disabled: false,
                                    title: "Raw Data as JSON",
                                }),
                                a.createElement(fu, null, "Debug Info - Property Descriptors"),
                                a.createElement(Gc, { size: 1 }) /* 
                                a.createElement(r.DeferredMount, null, a.createElement(Dk.Text, null, "worldSummary: " + JSON.stringify(Object.getOwnPropertyDescriptors(e.get()), undefined, 2))),
                                a.createElement(r.DeferredMount, null, a.createElement(Dk.Text, null, "worldData: " + JSON.stringify(Object.getOwnPropertyDescriptors(u.get()), undefined, 2))),
                                a.createElement(r.DeferredMount, null, a.createElement(Dk.Text, null, "achievementsDisabledMessages: " + JSON.stringify(Object.getOwnPropertyDescriptors(t.get()), undefined, 2))), */,
                                a.createElement(
                                    r.DeferredMount,
                                    null,
                                    a.createElement(
                                        function ({ children: e, align: t }) {
                                            return a.createElement(js, { type: "body", role: "inherit", align: t, shouldNarrate: !1, whiteSpace: "pre" }, e);
                                        },
                                        null,
                                        "rawData: " +
                                            JSON.stringify(
                                                {
                                                    ...Object.getOwnPropertyDescriptors(rawData.get()),
                                                    general: {
                                                        ...Object.getOwnPropertyDescriptor(rawData.get(), "general"),
                                                        value: Object.getOwnPropertyDescriptors(rawData.get().general),
                                                    },
                                                },
                                                undefined,
                                                2
                                            )
                                    )
                                ),
                                a.createElement($O, {
                                    label: "rawData (Property Descriptors) (read-only)",
                                    // gamepadIndex: 1,
                                    placeholder: "Raw Data JSON",
                                    maxLength: 3000000,
                                    value: JSON.stringify(Object.getOwnPropertyDescriptors(rawData.get()), undefined, 0),
                                    // onChange: d,
                                    filterProfanity: !1,
                                    disabled: false,
                                    title: "Raw Data as JSON",
                                })
                            )
                        )
                    )
                );
            }
            /**
             * a
             * @param {Object} param0
             * @param {RawWorldData} param0.rawData
             */
            function rawValueEditor({ rawData: e }) {
                const { t: c } = wi("CreateNewWorld.general") /* ,
                s = 1 == (0, r.useFacetUnwrap)(n) ? ".editor" : "",
                u = (0, r.useFacetMap)((e) => e.worldName, [], [o]),
                d = (0, r.useFacetCallback)((e) => (t) => (e.worldName = t), [], [o]) */,
                    rawData = (0, r.useFacetMap)((e) => e, [], [e]),
                    PHD = (0, r.useFacetMap)((e) => e.general, [], [e]),
                    p = (0, r.useFacetMap)((e) => e.general, [], [e]),
                    s = (0, r.useFacetMap)((e) => e.scriptingCoding, [], [e]),
                    g = (0, r.useFacetMap)((e) => e.playerHasDied, [], [p]),
                    playerPermissionsChange = (0, r.useFacetCallback)((e) => (t) => (e.multiplayer.playerPermissions = Number(t)), [], [rawData]);
                // e.achievementsPermanentlyDisabled = false; // Modified
                rawData.get().general.playerHasDied = false;
                return a.createElement(
                    a.Fragment,
                    null,
                    a.createElement(
                        r.DeferredMount,
                        null,
                        a.createElement(fu, null, "Raw Value Editor"),
                        a.createElement($O, {
                            label: "worldSeed",
                            description: "The seed of the world. (advanced.worldSeed)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().advanced.worldSeed,
                            maxLength: 3000,
                            value: rawData.get().advanced.worldSeed,
                            onChange: (0, r.useFacetCallback)((e) => (t) => (e.advanced.worldSeed = t), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        a.createElement($O, {
                            label: "playerPermissions",
                            description: "?. (multiplayer.playerPermissions)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().multiplayer.playerPermissions,
                            maxLength: 3000,
                            value: rawData.get().multiplayer.playerPermissions,
                            onChange: playerPermissionsChange,
                            filterProfanity: !1,
                            disabled: false,
                            title: "Player Permissions",
                        }),
                        a.createElement($O, {
                            label: "playerAccess",
                            description: "?. (multiplayer.playerAccess)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().multiplayer.playerAccess,
                            maxLength: 3000,
                            value: rawData.get().multiplayer.playerAccess,
                            onChange: (0, r.useFacetCallback)((e) => (t) => (e.multiplayer.playerAccess = Number(t)), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        a.createElement($O, {
                            label: "gameMode",
                            description: "?. (general.gameMode)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().general.gameMode,
                            maxLength: 3000,
                            value: rawData.get().general.gameMode,
                            onChange: (0, r.useFacetCallback)((e) => (t) => (e.general.gameMode = Number(t)), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        a.createElement($O, {
                            label: "difficulty",
                            description: "?. (general.difficulty)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().general.difficulty,
                            maxLength: 3000,
                            value: rawData.get().general.difficulty,
                            onChange: (0, r.useFacetCallback)((e) => (t) => (e.general.difficulty = Number(t)), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        a.createElement($O, {
                            label: "generatorType",
                            description: "?. (advanced.generatorType)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().advanced.generatorType,
                            maxLength: 3000,
                            value: rawData.get().advanced.generatorType,
                            onChange: (0, r.useFacetCallback)((e) => (t) => (e.advanced.generatorType = Number(t)), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        a.createElement($O, {
                            label: "simulationDistance",
                            description: "?. (advanced.simulationDistance)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().advanced.simulationDistance,
                            maxLength: 3000,
                            value: rawData.get().advanced.simulationDistance,
                            onChange: (0, r.useFacetCallback)((e) => (t) => (e.advanced.simulationDistance = Number(t)), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        a.createElement(Nx, {
                            title: "achievementsDisabled (read-only)",
                            disabled: true,
                            description: "Whether or not achievements are disabled. (read-only)",
                            value: (0, r.useFacetMap)((/** @type {ReturnType<RawWorldData["get"]>} */ e) => e.achievementsDisabled, [], [e]),
                            onChange: (0, r.useFacetCallback)(
                                (/** @type {ReturnType<RawWorldData["get"]>} */ e) => (t) => (e.achievementsDisabled = t),
                                [],
                                [rawData]
                            ),
                        }),
                        a.createElement(Nx, {
                            title: "achievementsPermanentlyDisabled (read-only)",
                            soundEffectPressed: "ui.hardcore_toggle_press",
                            disabled: true,
                            description: "Whether or not achievements are permanently disabled. (read-only)",
                            value: (0, r.useFacetMap)((/** @type {ReturnType<RawWorldData["get"]>} */ e) => e.achievementsPermanentlyDisabled, [], [e]),
                            onChange: (0, r.useFacetCallback)(
                                (/** @type {ReturnType<RawWorldData["get"]>} */ e) => (t) => (e.achievementsPermanentlyDisabled = t),
                                [],
                                [rawData]
                            ),
                        }),
                        a.createElement(Nx, {
                            title: "isUsingTemplate (read-only)",
                            disabled: true,
                            description: "isUsingTemplate (read-only)",
                            value: (0, r.useFacetMap)((/** @type {ReturnType<RawWorldData["get"]>} */ e) => e.isUsingTemplate, [], [e]),
                            onChange: (0, r.useFacetCallback)(
                                (/** @type {ReturnType<RawWorldData["get"]>} */ e) => (t) => (e.isUsingTemplate = t),
                                [],
                                [rawData]
                            ),
                        }),
                        a.createElement(Nx, {
                            title: "isLockedTemplate",
                            disabled: false,
                            description: "isLockedTemplate",
                            value: (0, r.useFacetMap)((/** @type {ReturnType<RawWorldData["get"]>} */ e) => e.isLockedTemplate, [], [e]),
                            onChange: (0, r.useFacetCallback)(
                                (/** @type {ReturnType<RawWorldData["get"]>} */ e) => (t) => (e.isLockedTemplate = t),
                                [],
                                [rawData]
                            ),
                        }),
                        a.createElement(Nx, {
                            title: "playerHasDied (read-only)",
                            disabled: true,
                            description: "readonly general.playerHasDied",
                            value: (0, r.useFacetMap)((e) => e.playerHasDied, [], [p]),
                            onChange: (0, r.useFacetCallback)((e) => (t) => (e.playerHasDied = t), [], [p]),
                        }),
                        a.createElement(Nx, {
                            title: "consoleCommandsEnabled (read-only)",
                            disabled: true,
                            description: "scriptingCoding.consoleCommandsEnabled",
                            value: (0, r.useFacetMap)((/** @type {ReturnType<RawWorldData["get"]>} */ e) => e.scriptingCoding.consoleCommandsEnabled, [], [e]),
                            onChange: (0, r.useFacetCallback)(
                                (/** @type {ReturnType<RawWorldData["get"]>} */ e) => (t) => (e.scriptingCoding.consoleCommandsEnabled = t),
                                [],
                                [rawData]
                            ),
                        }),
                        a.createElement(Nx, {
                            title: "codeBuilderEnabled (read-only)",
                            disabled: true,
                            description: "scriptingCoding.codeBuilderEnabled (read-only)",
                            value: (0, r.useFacetMap)((/** @type {ReturnType<RawWorldData["get"]>} */ e) => e.scriptingCoding.codeBuilderEnabled, [], [e]),
                            onChange: (0, r.useFacetCallback)(
                                (/** @type {ReturnType<RawWorldData["get"]>} */ e) => (t) => (e.scriptingCoding.codeBuilderEnabled = t),
                                [],
                                [rawData]
                            ),
                        })
                    )
                );
            }`
                    ).replace(`e&&t.push({label:".debugTabLabel",image:mP,value:"debug"}),`, `t.push({label:".debugTabLabel",image:mP,value:"debug"}),`);
                }
                if (settings.maxTextLengthOverride !== "") {
                    const textLengthValues = distData.matchAll(/maxLength: ([0-9]+)/gs);
                    for (const textLengthValue of textLengthValues) {
                        distData = distData.replace(
                            textLengthValue[0],
                            `maxLength: ${
                                BigInt(settings.maxTextLengthOverride) > BigInt(textLengthValue[1]) ? settings.maxTextLengthOverride : textLengthValue[1]
                            }`
                        );
                    }
                }
                if (origData !== distData) {
                    if (entry.data.filename.endsWith(".js")) {
                        distData = `// Modified by 8Crafter's Ore UI Customizer v0.11.2: https://www.8crafter.com/utilities/ore-ui-customizer\n// Options: ${JSON.stringify(
                            settings
                        )}\n${distData}`;
                    } else if (entry.data.filename.endsWith(".css")) {
                        distData = `/* Modified by 8Crafter's Ore UI Customizer v0.11.2: https://www.8crafter.com/utilities/ore-ui-customizer */\n/* Options: ${JSON.stringify(
                            settings
                        )} */\n${distData}`;
                    } else if (entry.data.filename.endsWith(".html")) {
                        distData = `<!-- Modified by 8Crafter's Ore UI Customizer v0.11.2: https://www.8crafter.com/utilities/ore-ui-customizer -->\n<!-- Options: ${JSON.stringify(
                            settings
                        )} -->\n${distData}`;
                    }
                    entry.replaceText(distData);
                    console.log(`Entry ${entry.name} has been successfully modified.`);
                } else {
                    console.log(`Entry ${entry.name} has not been modified.`);
                }
            } else {
                console.error("Entry is not a ZipFileEntry but has a file extension of js, html, or css: " + entry.filename);
                return entry;
            }
        }
    );
    $("#apply_mods").prop("disabled", false);
    $("#download").prop("disabled", false);
    return true;
}

async function download() {
    if (zipFs === undefined) {
        throw new Error("zipFs is undefined");
    }

    const blob = await zipFs.exportBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gui-mod.zip";
    a.click();
}
