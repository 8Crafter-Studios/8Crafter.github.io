const currentPresets = {
    none: { displayName: "None (Use Imported .zip File)", url: "" },
    "v1.21.70-71_PC": { displayName: "v1.27.70/71 (PC)", url: "/assets/zip/gui_mc-v1.21.70-71_PC.zip" },
    "v1.21.70-71_Android": { displayName: "v1.27.70/71 (Android)", url: "/assets/zip/gui_mc-v1.21.70-71_Android.zip" },
};
const format_version = "0.17.3";
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

/**
 * @type {HTMLElement}
 */
let currentColorPickerTarget = undefined;

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
                $("#imported_file_name").text(
                    `Imported file: ${currentImportedFile.name} - ${formatFileSizeMetric(currentImportedFile.size)} - (Validating...)`
                );
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
            if (response.status === 404) {
                console.error(`404 while loading PRESET: ${currentPresets[currentPreset].displayName}`, currentPresets[currentPreset].url);
                $("#imported_file_name").css("color", "red");
                $("#imported_file_name").text(`Failed to load PRESET: ${currentPresets[currentPreset].displayName}`);
                return;
            }
            currentImportedFile = new File([await response.blob()], currentPresets[currentPreset].url.split("/").pop());
            $("#imported_file_name").css("color", "yellow");
            $("#imported_file_name").text(
                `Imported file: PRESET: ${currentImportedFile.name} - ${formatFileSizeMetric(currentImportedFile.size)} - (Validating...)`
            );
            // $("#apply_mods").prop("disabled", false);
            await validateZipFile();
            $("#imported_file_name").css("color", "inherit");
            $("#imported_file_name").text(`Imported file: PRESET: ${currentImportedFile.name} - ${formatFileSizeMetric(currentImportedFile.size)}`);
        }
    });
    $('input[name="customizer_settings_section"]').change(() => {
        try {
            if ($("#customizer_settings_section_radio_general").prop("checked")) {
                $("#general_customizer_settings_section").get(0).style.display = "";
                $("#colors_customizer_settings_section").get(0).style.display = "none";
            } else if ($("#customizer_settings_section_radio_colors").prop("checked")) {
                $("#general_customizer_settings_section").get(0).style.display = "none";
                $("#colors_customizer_settings_section").get(0).style.display = "";
            } else {
                $("#general_customizer_settings_section").get(0).style.display = "none";
                $("#colors_customizer_settings_section").get(0).style.display = "none";
            }
        } catch (e) {
            console.error(e, e.stack);
        }
    });
    // b.each((i, e)=>console.log([e, $(e), (()=>{try{return $(e).data()}catch{return 0;}})()]))
    $(".spectrum-colorpicker-color-override-option").each((i, element) =>
        $(element).spectrum({
            allowEmpty: true,
            noColorSelectedText: "Do not replace color.",
            preferredFormat: /^#([0-9a-fA-F]{3}){1,2}$/.test(element.value)
                ? "hex"
                : /^#([0-9a-fA-F]{4}){1,2}$/.test(element.value)
                ? "hex8"
                : /^hsl/.test(element.value)
                ? "hsl"
                : /^hsv/.test(element.value)
                ? "hsl"
                : /^rgb/.test(element.value)
                ? "rgb"
                : /^hsb/.test(element.value)
                ? "hsb"
                : element.getAttribute("format") ?? "rgb",
            beforeShow: (color, element) => {
                try {
                    $(".sp-picker-container select").val(color.getFormat());
                } catch (e) {
                    console.error(e, e.stack);
                }
                currentColorPickerTarget = element;
            },
            showAlpha: true,
            showInitial: true,
            showInput: true,
            showPalette: true,
            showSelectionPalette: true,
            localStorageKey: "ore-ui-customizer",
        })
    );
    $(
        ".sp-picker-container"
    ).append(`<select class="spectrum-colorpicker-color-format-dropdown" onchange="$(currentColorPickerTarget).spectrum('option', 'preferredFormat', this.value); $(currentColorPickerTarget).spectrum('set', $(this).parent().find('.sp-input').val()); console.log(this.value);">
        <option value="hex">HEX</option>
        <option value="hex3">HEX3</option>
        <option value="hex6">HEX6</option>
        <option value="hex8">HEX8</option>
        <option value="prgb">PRGB</option>
        <option value="rgb">RGB</option>
        <option value="hsv">HSV</option>
        <option value="hsl">HSL</option>
        <option value="none">name</option>
        <option value="none">none</option>
    </select>`);
    // $(".sp-choose").addClass("btn btn-primary");
    try {
        var oreUIPreviewIframe = $("#ore-ui-preview-iframe");
        var oreUIPreviewIframeContainer = $("#ore-ui-preview-iframe-container");
        var oreUIPreviewIframeHeight = oreUIPreviewIframe.outerHeight();
        var oreUIPreviewIframeWidth = oreUIPreviewIframe.outerWidth();

        function resize(event, ui) {
            try {
                var scale, origin;

                scale = Math.min(ui.size.width / oreUIPreviewIframeWidth, ui.size.height / oreUIPreviewIframeHeight);
                console.log(scale, ui.size.width, ui.size.height, oreUIPreviewIframeWidth, oreUIPreviewIframeHeight);

                oreUIPreviewIframe.css({
                    transform:
                        `translate(${-(oreUIPreviewIframeWidth / 2 - ui.size.width / 2)}px, ${-(oreUIPreviewIframeHeight / 2 - ui.size.height / 2)}px) ` +
                        "scale(" +
                        scale +
                        ")",
                });
            } catch (e) {
                console.error(e, e.stack);
            }
        }

        oreUIPreviewIframeContainer.resizable({
            resize,
        });

        resize(null, {
            size: {
                width: oreUIPreviewIframeContainer.width(),
                height: oreUIPreviewIframeContainer.height(),
            },
        });
        const oreUIPreviewIframeResizeObserver = new ResizeObserver((e) => oreUIPreviewIframeContainer.trigger("resize"));
        oreUIPreviewIframeResizeObserver.observe(oreUIPreviewIframeContainer.get(0));
        oreUIPreviewIframeContainer.on("resize", () =>
            resize(null, {
                size: {
                    width: oreUIPreviewIframeContainer.width(),
                    height: oreUIPreviewIframeContainer.height(),
                },
            })
        );
    } catch (e) {
        console.error(e, e.stack);
    }
});

/**
 * Format file size in metric prefix
 * @param {number|string} fileSize
 * @returns {string}
 */
const formatFileSizeMetric = (fileSize) => {
    let size = Math.abs(fileSize);

    if (Number.isNaN(size)) {
        return "Invalid file size";
    }

    if (size === 0) {
        return "0 bytes";
    }

    const units = ["bytes", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "RB", "QB"];
    let quotient = Math.floor(Math.log10(size) / 3);
    quotient = quotient < units.length ? quotient : units.length - 1;
    size /= 1000 ** quotient;

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
                zipFs.move(
                    zipFs.entries.find((entry) => entry.data?.filename === "dist/"),
                    zipFs.addDirectory("gui")
                ); // adding a / to the end of the string for addDirectory causes it to show "Local Disk" inside of the zip file on windows.
                failed = 2;
                $("#import_files_error").css("color", "yellow");
                $("#import_files_error").text(
                    `Your zip file folder structure was invalid, but was repaired. It was supposed have the entire gui/ folder in the root of the zip file. NOT just the contents of it. Your .zip file was structured ${currentImportedFile.name}/dist/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You had zipped the dist folder instead of the gui folder.`
                );
                $("#import_files_error").prop("hidden", false); /* 
                $("#import_files_error").text(
                    `Invalid zip file folder structure. You must have the entire gui/ folder in the root of the zip file. NOT just the contents of it. Your .zip file is structured ${currentImportedFile.name}/dist/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You have zipped the dist folder instead of the gui folder.`
                );
                $("#apply_mods").prop("disabled", true);
                $("#download").prop("disabled", true); */
            } else if (zipFs.entries.findIndex((entry) => entry.data?.filename === "hbui/") !== -1) {
                // Repair the zip directory structure.
                zipFs.move(
                    zipFs.entries.find((entry) => entry.data?.filename === "hbui/"),
                    zipFs.addDirectory("gui/dist")
                );
                failed = 2;
                $("#import_files_error").css("color", "yellow");
                $("#import_files_error").text(
                    `Your zip file folder structure was invalid, but was repaired. It was supposed have the entire gui/ folder in the root of the zip file. NOT just the contents of the contents of it. Your .zip file was structured ${currentImportedFile.name}/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You had zipped the hbui folder instead of the gui folder.`
                );
                $("#import_files_error").prop("hidden", false); /* 
                $("#import_files_error").text(
                    `Invalid zip file folder structure. You must have the entire gui/ folder in the root of the zip file. NOT just the contents of it. Your .zip file is structured ${currentImportedFile.name}/dist/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You have zipped the dist folder instead of the gui folder.`
                );
                $("#apply_mods").prop("disabled", true);
                $("#download").prop("disabled", true); */ /* 
                $("#import_files_error").css("color", "red");
                $("#import_files_error").text(
                    `Invalid zip file folder structure. You must have the entire gui/ folder in the root of the zip file. NOT just the contents of the contents of it. Your .zip file is structured ${currentImportedFile.name}/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You have zipped the hbui folder instead of the gui folder.`
                );
                $("#import_files_error").prop("hidden", false);
                $("#apply_mods").prop("disabled", true);
                $("#download").prop("disabled", true); */
            } else {
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

/*
const colorMap = {green10:"#a0e081",green20:"#86d562",green30:"#6cc349",green40:"#52a535",green50:"#3c8527",green60:"#2a641c",green70:"#1d4d13",green80:"#153a0e",green90:"#112f0b",green100:"#0f2b0a",white:"#ffffff",black:"#000000",gray10:"#f4f6f9",gray20:"#e6e8eb",gray30:"#d0d1d4",gray40:"#b1b2b5",gray50:"#8c8d90",gray60:"#58585a",gray70:"#48494a",gray80:"#313233",gray90:"#242425",gray100:"#1e1e1f",red10:"#ff8080",red20:"#d93636",red30:"#b31b1b",red40:"#d54242",red50:"#ca3636",red60:"#c02d2d",red70:"#b62525",red80:"#ad1d1d",red90:"#a31616",red100:"#990f0f",orange10:"#ffb366",orange20:"#d3791f",orange30:"#a65b11",yellow10:"#ffe866",yellow20:"#e5c317",yellow30:"#8a7500",gold10:"#fff0c5",gold20:"#ffd783",gold30:"#f8af2b",gold40:"#ce8706",gold50:"#ae7100",blue10:"#8cb3ff",blue20:"#2e6be5",blue30:"#1452cc",blackOpacity10:"rgba(0, 0, 0, 0.1)",blackOpacity20:"rgba(0, 0, 0, 0.2)",blackOpacity25:"rgba(0, 0, 0, 0.25)",blackOpacity30:"rgba(0, 0, 0, 0.3)",blackOpacity40:"rgba(0, 0, 0, 0.4)",blackOpacity50:"rgba(0, 0, 0, 0.5)",blackOpacity60:"rgba(0, 0, 0, 0.6)",blackOpacity70:"rgba(0, 0, 0, 0.7)",blackOpacity80:"rgba(0, 0, 0, 0.8)",blackOpacity90:"rgba(0, 0, 0, 0.9)",blackOpacity100:"rgba(0, 0, 0, 1)",whiteOpacity10:"rgba(255, 255, 255, 0.1)",whiteOpacity20:"rgba(255, 255, 255, 0.2)",whiteOpacity30:"rgba(255, 255, 255, 0.3)",whiteOpacity40:"rgba(255, 255, 255, 0.4)",whiteOpacity50:"rgba(255, 255, 255, 0.5)",whiteOpacity60:"rgba(255, 255, 255, 0.6)",whiteOpacity70:"rgba(255, 255, 255, 0.7)",whiteOpacity80:"rgba(255, 255, 255, 0.8)",whiteOpacity90:"rgba(255, 255, 255, 0.9)",pink10:"#FB95E2",pink20:"#FFB1EC",pink30:"#E833C2",pink40:"#F877DC",purple40:"#643ACB",deepBlue10:"#AC90F3",deepBlue20:"#9471E0",deepBlue40:"#8557F8",deepBlue50:"#7345E5",deepBlue60:"#5D2CC6",deepBlue70:"#4A1CAC",deepBlue100:"#050029",deepBlueOpacity50:"rgba(5, 0, 41, 0.5)"};
console.log(Object.entries(colorMap).map(v=>`                    <div class="form-group">
                        <div class="form-group-header">
                            <label for="colors_customizer_settings_section_${v[0]}">
                                ${v[0]}
                                <br />
                                Default: ${v[1]}
                            </label>
                        </div>
                        <div class="form-group-body">
                            <input type="text" class="spectrum-colorpicker-color-override-option" value="${v[1]}" id="colors_customizer_settings_section_${v[0]}" ontouchstart style="width: 100%" />
                        </div>
                    </div>
                    <br />`).join("\n"));
console.log(Object.entries(colorMap).map(v=>`            ${JSON.stringify(v[1])}: $("#colors_customizer_settings_section_${v[0]}").val(),`).join("\n"));
*/

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
        add8CrafterUtilitiesMainMenuButton: true,
        /**
         * These are replacements for the UI colors.
         *
         * @type {Record<string, string>}
         *
         * @todo Make this functional.
         */
        colorReplacements: {
            // /**
            //  * Gray 80
            //  *
            //  * This is used as the solid background for many Ore UI menus.
            //  */
            // "#313233": "#006188",
            // /**
            //  * Gray 70
            //  *
            //  * This is used for the main part of a pressed button.
            //  */
            // "#48494a": "#007eaf",
            // "#3c8527": "#27856e",
            // "#e6e8eb": "#6200ff",
            // "#58585a": "#2c6387",
            // "#242425": "#003347",
            // "#1e1e1f": "#002c3d",
            // "#8c8d90": "#1fbfff",
            "#a0e081": $("#colors_customizer_settings_section_green10").val(),
            "#86d562": $("#colors_customizer_settings_section_green20").val(),
            "#6cc349": $("#colors_customizer_settings_section_green30").val(),
            "#52a535": $("#colors_customizer_settings_section_green40").val(),
            "#3c8527": $("#colors_customizer_settings_section_green50").val(),
            "#2a641c": $("#colors_customizer_settings_section_green60").val(),
            "#1d4d13": $("#colors_customizer_settings_section_green70").val(),
            "#153a0e": $("#colors_customizer_settings_section_green80").val(),
            "#112f0b": $("#colors_customizer_settings_section_green90").val(),
            "#0f2b0a": $("#colors_customizer_settings_section_green100").val(),
            "#ffffff": $("#colors_customizer_settings_section_white").val(),
            "#000000": $("#colors_customizer_settings_section_black").val(),
            "#f4f6f9": $("#colors_customizer_settings_section_gray10").val(),
            "#e6e8eb": $("#colors_customizer_settings_section_gray20").val(),
            "#d0d1d4": $("#colors_customizer_settings_section_gray30").val(),
            "#b1b2b5": $("#colors_customizer_settings_section_gray40").val(),
            "#8c8d90": $("#colors_customizer_settings_section_gray50").val(),
            "#58585a": $("#colors_customizer_settings_section_gray60").val(),
            "#48494a": $("#colors_customizer_settings_section_gray70").val(),
            "#313233": $("#colors_customizer_settings_section_gray80").val(),
            "#242425": $("#colors_customizer_settings_section_gray90").val(),
            "#1e1e1f": $("#colors_customizer_settings_section_gray100").val(),
            "#ff8080": $("#colors_customizer_settings_section_red10").val(),
            "#d93636": $("#colors_customizer_settings_section_red20").val(),
            "#b31b1b": $("#colors_customizer_settings_section_red30").val(),
            "#d54242": $("#colors_customizer_settings_section_red40").val(),
            "#ca3636": $("#colors_customizer_settings_section_red50").val(),
            "#c02d2d": $("#colors_customizer_settings_section_red60").val(),
            "#b62525": $("#colors_customizer_settings_section_red70").val(),
            "#ad1d1d": $("#colors_customizer_settings_section_red80").val(),
            "#a31616": $("#colors_customizer_settings_section_red90").val(),
            "#990f0f": $("#colors_customizer_settings_section_red100").val(),
            "#ffb366": $("#colors_customizer_settings_section_orange10").val(),
            "#d3791f": $("#colors_customizer_settings_section_orange20").val(),
            "#a65b11": $("#colors_customizer_settings_section_orange30").val(),
            "#ffe866": $("#colors_customizer_settings_section_yellow10").val(),
            "#e5c317": $("#colors_customizer_settings_section_yellow20").val(),
            "#8a7500": $("#colors_customizer_settings_section_yellow30").val(),
            "#fff0c5": $("#colors_customizer_settings_section_gold10").val(),
            "#ffd783": $("#colors_customizer_settings_section_gold20").val(),
            "#f8af2b": $("#colors_customizer_settings_section_gold30").val(),
            "#ce8706": $("#colors_customizer_settings_section_gold40").val(),
            "#ae7100": $("#colors_customizer_settings_section_gold50").val(),
            "#8cb3ff": $("#colors_customizer_settings_section_blue10").val(),
            "#2e6be5": $("#colors_customizer_settings_section_blue20").val(),
            "#1452cc": $("#colors_customizer_settings_section_blue30").val(),
            "rgba(0, 0, 0, 0.1)": $("#colors_customizer_settings_section_blackOpacity10").val(),
            "rgba(0, 0, 0, 0.2)": $("#colors_customizer_settings_section_blackOpacity20").val(),
            "rgba(0, 0, 0, 0.25)": $("#colors_customizer_settings_section_blackOpacity25").val(),
            "rgba(0, 0, 0, 0.3)": $("#colors_customizer_settings_section_blackOpacity30").val(),
            "rgba(0, 0, 0, 0.4)": $("#colors_customizer_settings_section_blackOpacity40").val(),
            "rgba(0, 0, 0, 0.5)": $("#colors_customizer_settings_section_blackOpacity50").val(),
            "rgba(0, 0, 0, 0.6)": $("#colors_customizer_settings_section_blackOpacity60").val(),
            "rgba(0, 0, 0, 0.7)": $("#colors_customizer_settings_section_blackOpacity70").val(),
            "rgba(0, 0, 0, 0.8)": $("#colors_customizer_settings_section_blackOpacity80").val(),
            "rgba(0, 0, 0, 0.9)": $("#colors_customizer_settings_section_blackOpacity90").val(),
            "rgba(0, 0, 0, 1)": $("#colors_customizer_settings_section_blackOpacity100").val(),
            "rgba(255, 255, 255, 0.1)": $("#colors_customizer_settings_section_whiteOpacity10").val(),
            "rgba(255, 255, 255, 0.2)": $("#colors_customizer_settings_section_whiteOpacity20").val(),
            "rgba(255, 255, 255, 0.3)": $("#colors_customizer_settings_section_whiteOpacity30").val(),
            "rgba(255, 255, 255, 0.4)": $("#colors_customizer_settings_section_whiteOpacity40").val(),
            "rgba(255, 255, 255, 0.5)": $("#colors_customizer_settings_section_whiteOpacity50").val(),
            "rgba(255, 255, 255, 0.6)": $("#colors_customizer_settings_section_whiteOpacity60").val(),
            "rgba(255, 255, 255, 0.7)": $("#colors_customizer_settings_section_whiteOpacity70").val(),
            "rgba(255, 255, 255, 0.8)": $("#colors_customizer_settings_section_whiteOpacity80").val(),
            "rgba(255, 255, 255, 0.9)": $("#colors_customizer_settings_section_whiteOpacity90").val(),
            "#FB95E2": $("#colors_customizer_settings_section_pink10").val(),
            "#FFB1EC": $("#colors_customizer_settings_section_pink20").val(),
            "#E833C2": $("#colors_customizer_settings_section_pink30").val(),
            "#F877DC": $("#colors_customizer_settings_section_pink40").val(),
            "#643ACB": $("#colors_customizer_settings_section_purple40").val(),
            "#AC90F3": $("#colors_customizer_settings_section_deepBlue10").val(),
            "#9471E0": $("#colors_customizer_settings_section_deepBlue20").val(),
            "#8557F8": $("#colors_customizer_settings_section_deepBlue40").val(),
            "#7345E5": $("#colors_customizer_settings_section_deepBlue50").val(),
            "#5D2CC6": $("#colors_customizer_settings_section_deepBlue60").val(),
            "#4A1CAC": $("#colors_customizer_settings_section_deepBlue70").val(),
            "#050029": $("#colors_customizer_settings_section_deepBlue100").val(),
            "rgba(5, 0, 41, 0.5)": $("#colors_customizer_settings_section_deepBlueOpacity50").val(),
        },
    };
}

/**
 *
 * @param {HTMLElement} target
 * @param {{hueShift?: number, saturationShift?: number, lightnessShift?: number, brightnessShift?: number, redShift?: number, greenShift?: number, blueShift?: number, alphaShift?: number, setHue?: number, setSaturation?: number, setLightness?: number, setBrightness?: number, setRed?: number, setGreen?: number, setBlue?: number, setAlpha?: number}} filterOptions
 */
function applyColorFilterToColorOverride(target, filterOptions) {
    const elem = $(target);
    if (filterOptions.hueShift) {
        const str = elem.spectrum("get").toHsvString();
        let val = Number(str.match(/(?<=\()[0-9.]+(?=, )/)[0]) + filterOptions.hueShift;
        if (val > 360) {
            val = val % 360;
        } else if (val < 0) {
            val = 360 + (val % 360);
        }
        elem.spectrum("set", str.replace(/(?<=\()[0-9.]+(?=, )/, String(val)));
    }
    if (filterOptions.saturationShift) {
        const str = elem.spectrum("get").toHsvString();
        elem.spectrum(
            "set",
            str.replace(
                /(?<=\([0-9.]+, )[0-9.]+(?=, )/,
                String(Math.min(100, Math.max(0, Number(str.match(/(?<=\([0-9.]+, )[0-9.]+(?=, )/)[0]) + filterOptions.saturationShift)))
            )
        );
    }
    if (filterOptions.lightnessShift) {
        const str = elem.spectrum("get").toHslString();
        elem.spectrum(
            "set",
            str.replace(
                /(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/,
                String(Math.min(100, Math.max(0, Number(str.match(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/)[0]) + filterOptions.lightnessShift)))
            )
        );
    }
    if (filterOptions.brightnessShift) {
        const str = elem.spectrum("get").toHsvString();
        elem.spectrum(
            "set",
            str.replace(
                /(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/,
                String(Math.min(100, Math.max(0, Number(str.match(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/)[0]) + filterOptions.brightnessShift)))
            )
        );
    }
    if (filterOptions.redShift) {
        const str = elem.spectrum("get").toRgbString();
        elem.spectrum(
            "set",
            str.replace(/(?<=\()[0-9.]+(?=\))/, String(Math.min(255, Math.max(0, Number(str.match(/(?<=\()[0-9.]+(?=, )/)[0]) + filterOptions.redShift))))
        );
    }
    if (filterOptions.greenShift) {
        const str = elem.spectrum("get").toRgbString();
        elem.spectrum(
            "set",
            str.replace(
                /(?<=\([0-9.]+, )[0-9.]+(?=, )/,
                String(Math.min(255, Math.max(0, Number(str.match(/(?<=\([0-9.]+, )[0-9.]+(?=, )/)[0]) + filterOptions.greenShift)))
            )
        );
    }
    if (filterOptions.blueShift) {
        const str = elem.spectrum("get").toRgbString();
        elem.spectrum(
            "set",
            str.replace(
                /(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/,
                String(Math.min(255, Math.max(0, Number(str.match(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/)[0]) + filterOptions.blueShift)))
            )
        );
    }
    if (filterOptions.alphaShift) {
        const str = elem.spectrum("get").toRgbString();
        if (str.startsWith("rgba")) {
            elem.spectrum(
                "set",
                str.replace(/(?<=, )[0-9.]+(?=\))/, String(Math.min(1, Math.max(0, Number(str.match(/(?<=, )[0-9.]+(?=\))/)[0]) + filterOptions.alphaShift))))
            );
        } else {
            elem.spectrum("set", str.replace("rgb(", "rgba(").replace(")", String(Math.min(1, Math.max(0, Number(1 + filterOptions.alphaShift)))) + ")"));
        }
    }
    if (filterOptions.setHue) {
        const str = elem.spectrum("get").toHsvString();
        elem.spectrum("set", str.replace(/(?<=\()[0-9.]+(?=, )/, String(filterOptions.setHue)));
    }
    if (filterOptions.setSaturation) {
        const str = elem.spectrum("get").toHsvString();
        elem.spectrum("set", str.replace(/(?<=\([0-9.]+, )[0-9.]+(?=, )/, String(filterOptions.setSaturation)));
    }
    if (filterOptions.setLightness) {
        const str = elem.spectrum("get").toHslString();
        elem.spectrum("set", str.replace(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/, String(filterOptions.setLightness)));
    }
    if (filterOptions.setBrightness) {
        const str = elem.spectrum("get").toHsvString();
        elem.spectrum("set", str.replace(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/, String(filterOptions.setBrightness)));
    }
    if (filterOptions.setRed) {
        const str = elem.spectrum("get").toRgbString();
        elem.spectrum("set", str.replace(/(?<=\()[0-9.]+(?=\))/, String(filterOptions.setRed)));
    }
    if (filterOptions.setGreen) {
        const str = elem.spectrum("get").toRgbString();
        elem.spectrum("set", str.replace(/(?<=\([0-9.]+, )[0-9.]+(?=, )/, String(filterOptions.setGreen)));
    }
    if (filterOptions.setBlue) {
        const str = elem.spectrum("get").toRgbString();
        elem.spectrum("set", str.replace(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/, String(filterOptions.setBlue)));
    }
    if (filterOptions.setAlpha) {
        const str = elem.spectrum("get").toRgbString();
        if (str.startsWith("rgba")) {
            elem.spectrum("set", str.replace(/(?<=, )[0-9.]+(?=\))/, String(filterOptions.setAlpha)));
        } else {
            elem.spectrum("set", str.replace("rgb(", "rgba(").replace(")", String(filterOptions.setAlpha) + ")"));
        }
    }
}

function stringToRegexString(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function makeRegexRobustToWhitespace(regexString) {
    return regexString.replace(/\s+/g, "\\s*");
}

async function refreshOreUIPreview(menuHTMLFileName = "index_playscreen_worldstab.html") {
    const newData = {
        newHTML: await fetch(`../assets/ore-ui-customizer-preview/${menuHTMLFileName}`).then((response) => response.text()),
        newIndexCSS: await fetch("../assets/ore-ui-customizer-preview/index-ffb39.css").then((response) => response.text()),
        // newGameplayCSS: await fetch("../assets/ore-ui-customizer-preview/gameplay-41f5f.css").then((response) => response.text()),
        // newEditorCSS: await fetch("../assets/ore-ui-customizer-preview/editor-7ac5c.css").then((response) => response.text()),
        newMenusThemeCSS: await fetch("../assets/ore-ui-customizer-preview/menus-theme.css").then((response) => response.text()),
        newGameplayThemeCSS: await fetch("../assets/ore-ui-customizer-preview/gameplay-theme.css").then((response) => response.text()),
        newCustomOverlaysCSS: await fetch("../assets/ore-ui-customizer-preview/customOverlays.css").then((response) => response.text()),
        oreUICustomizer8CrafterConfigJS: await fetch("../assets/ore-ui-customizer-preview/oreUICustomizer8CrafterConfig.js").then((response) =>
            response.text()
        ),
        classPathJS: await fetch("../assets/ore-ui-customizer-preview/class_path.js").then((response) => response.text()),
        cssJS: await fetch("../assets/ore-ui-customizer-preview/css.js").then((response) => response.text()),
        customOverlaysJS: await fetch("../assets/ore-ui-customizer-preview/customOverlays.js").then((response) => response.text()),
        indexJS: await fetch("../assets/ore-ui-customizer-preview/index-d6df7.js").then((response) => response.text()),
    };
    for (const k in newData) {
        /** @type {keyof typeof newData} */
        const key = k;
        newData[key] = newData[key].replaceAll("/hbui/", "/assets/ore-ui-customizer-preview/");
    }

    const settings = getSettings();

    // Color Replacements
    for (const k in newData) {
        /** @type {keyof typeof newData} */
        const key = k;
        for (const [color, replacementColor] of Object.entries(settings.colorReplacements)) {
            if (color === replacementColor) continue;
            newData[key] = newData[key].replaceAll(color, replacementColor);
        }
    }

    newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/index-ffb39.css`, `data:text/css;base64,${btoa(newData.newIndexCSS)}`);
    // newData.newHTML = newData.newHTML.replaceAll(`./gameplay-41f5f.css`, `data:text/css;base64,${btoa(newData.newGameplayCSS)}`);
    // newData.newHTML = newData.newHTML.replaceAll(`./editor-7ac5c.css`, `data:text/css;base64,${btoa(newData.newEditorCSS)}`);
    newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/menus-theme.css`, `data:text/css;base64,${btoa(newData.newMenusThemeCSS)}`);
    newData.newHTML = newData.newHTML.replaceAll(
        `/assets/ore-ui-customizer-preview/gameplay-theme.css`,
        `data:text/css;base64,${btoa(newData.newGameplayThemeCSS)}`
    );
    newData.newHTML = newData.newHTML.replaceAll(
        `/assets/ore-ui-customizer-preview/customOverlays.css`,
        `data:text/css;base64,${btoa(newData.newCustomOverlaysCSS)}`
    );

    newData.newHTML = newData.newHTML.replaceAll(
        `/assets/ore-ui-customizer-preview/oreUICustomizer8CrafterConfig.js`,
        `data:text/javascript,${encodeURIComponent(newData.oreUICustomizer8CrafterConfigJS)}`
    );
    newData.newHTML = newData.newHTML.replaceAll(
        `/assets/ore-ui-customizer-preview/class_path.js`,
        `data:text/javascript,${encodeURIComponent(newData.classPathJS)}`
    );
    newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/css.js`, `data:text/javascript,${encodeURIComponent(newData.cssJS)}`);
    newData.newHTML = newData.newHTML.replaceAll(
        `/assets/ore-ui-customizer-preview/customOverlays.js`,
        `data:text/javascript,${encodeURIComponent(newData.customOverlaysJS)}`
    );
    newData.newHTML = newData.newHTML.replaceAll(
        `/assets/ore-ui-customizer-preview/index-d6df7.js`,
        `data:text/javascript,${encodeURIComponent(newData.indexJS)}`
    );

    // $("#ore-ui-preview-iframe").contents().remove();
    /** @type {HTMLIFrameElement} */
    const iframe = $("#ore-ui-preview-iframe").get(0);
    iframe.srcdoc = newData.newHTML;
    // $("#ore-ui-preview-iframe").contents().find("body").css("--base1Scale", "2px");
}

async function applyMods() {
    $("#apply_mods").prop("disabled", true);
    $("#download").prop("disabled", true);
    if (!(await validateZipFile())) {
        console.error("applyMods - validateZipFile failed");
        return false;
    }
    const settings = getSettings();
    var addedCount = 0n;
    var removedCount = 0n;
    var modifiedCount = 0n;
    var unmodifiedCount = 0n;
    var editedCount = 0n;
    var renamedCount = 0n;
    /**
     * @type {{[filename: string]: string[]}}
     */
    var allFailedReplaces = {};
    zipFs.entries.forEach(
        /** @param {zip.ZipFileEntry | zip.ZipDirectoryEntry} entry */ async (entry) => {
            if (/^(gui\/)?dist\/hbui\/assets\/[^\/]*?%40/.test(entry.data?.filename)) {
                let origName = entry.name;
                entry.rename(entry.name.split("/").pop().replaceAll("%40", "@"));
                console.log(`Entry ${origName} has been successfully renamed to ${entry.name}.`);
                modifiedCount++;
                renamedCount++;
                return 3;
            }
            if (!/^(gui\/)?dist\/hbui\/[^\/]+\.(js|html|css)$/.test(entry.data?.filename)) {
                unmodifiedCount++;
                return 0;
            }
            if (entry.data.filename.endsWith("oreUICustomizer8CrafterConfig.js")) {
                unmodifiedCount++;
                return -2;
            }

            if (entry.directory === void false) {
                /**
                 * @type {string}
                 */
                const origData = await entry.getText();
                let distData = origData;
                /**
                 * @type {{[filename: string]: string[]}}
                 */
                let failedReplaces = [];
                let extractedFunctionNames = {
                    translationStringResolver: "wi",
                    headerFunciton: "fu",
                    headerSpacingFunction: "Gc",
                    editWorldTextFunction: "Dk",
                    jsText: "js",
                    navbarButtonFunction: "lc",
                    navbarButtonImageFunction: "xc",
                };

                extractedFunctionNames.translationStringResolver =
                    origData.match(/([a-zA-Z0-9_\$]{2})\("TitleBar.Buttons.Close"\)/)?.[1] ?? extractedFunctionNames.translationStringResolver;

                extractedFunctionNames.headerFunciton =
                    origData.match(/a\.createElement\(([a-zA-Z0-9_\$]{2}),null,n\("\.microsoftSignInButtonTitle"\)\),/)?.[1] ??
                    extractedFunctionNames.headerFunciton;

                extractedFunctionNames.headerSpacingFunction =
                    origData.match(/a\.createElement\(([a-zA-Z0-9_\$]{2}),\{size:1\}\),/)?.[1] ?? extractedFunctionNames.headerSpacingFunction;

                extractedFunctionNames.editWorldTextFunction =
                    origData.match(/([a-zA-Z0-9_\$]{2})\.Text=function\(\{children:e,align:t\}\)/)?.[1] ?? extractedFunctionNames.editWorldTextFunction;

                extractedFunctionNames.jsText =
                    origData.match(/a\.createElement\(([a-zA-Z0-9_\$]{2}),\{type:"body",variant:"dimmer"\}/)?.[1] ?? extractedFunctionNames.jsText;

                extractedFunctionNames.navbarButtonFunction =
                    origData.match(/return a\.createElement\(([a-zA-Z0-9_\$]{2}),\{className:"r5Ne9"/)?.[1] ?? extractedFunctionNames.navbarButtonFunction;

                extractedFunctionNames.navbarButtonImageFunction =
                    origData.match(/a\.createElement\(([a-zA-Z0-9_\$]{2}),\{className:"GNMZ6"/)?.[1] ?? extractedFunctionNames.navbarButtonImageFunction;

                /**
                 * Lists of regexes to use for certain modifications.
                 */
                const replacerRegexes = {
                    hardcoreModeToggleAlwaysClickable: {
                        /**
                         * Replacing the hardcore mode toggle (v1).
                         *
                         * Known supported Minecraft versions:
                         *
                         * - 1.21.70/71/72 (index-d6df7.js)
                         * - 1.21.70/71/72 dev (index-1fd56.js)
                         */
                        0: [
                            /**
                             * Known supported Minecraft versions:
                             *
                             * - 1.21.70/71/72 (index-d6df7.js)
                             * - 1.21.70/71/72 dev (index-1fd56.js)
                             */
                            /function ([a-zA-Z0-9_\$]{2})\(\s*?\{\s*?generalData\s*?:\s*?e\s*?,\s*?isLockedTemplate\s*?:\s*?t\s*?\}\s*?\)\s*?\{\s*?const\s*?\{\s*?t\s*?:\s*?n\s*?\}\s*?=\s*?([a-zA-Z0-9_\$]{2})\("CreateNewWorld\.general"\)\s*?,\s*?l\s*?=\s*?([a-zA-Z0-9_\$]{2})\(\)\s*?,\s*?o\s*?=\s*?\(\s*?0\s*?,\s*?a\s*?\.\s*?useContext\s*?\)\s*?\(\s*?([a-zA-Z0-9_\$]{2})\s*?\)\s*?===\s*?([a-zA-Z0-9_\$]{2})\.CREATE\s*?,\s*?i=\s*?\(\s*?0\s*?,\s*?r\.useSharedFacet\s*?\)\s*?\(\s*?([a-zA-Z0-9_\$]{2})\s*?\)\s*?,\s*?c\s*?=\s*?\(\s*?0\s*?,\s*?r\.useFacetMap\s*?\)\s*?\(\s*?\(\s*?\(\s*?e\s*?,\s*?t\s*?,\s*?n\s*?\)\s*?=>\s*?n\s*?\|\|\s*?t\s*?\|\|\s*?!o\s*?\|\|\s*?e\.gameMode\s*?!==\s*?([a-zA-Z0-9_\$]{2})\.SURVIVAL\s*?&&\s*?e\.gameMode\s*?!==\s*?([a-zA-Z0-9_\$]{2})\.ADVENTURE\s*?\)\s*?,\s*?\[\s*?o\s*?\]\s*?,\s*?\[\s*?e\s*?,\s*?t\s*?,\s*?i\s*?\]\s*?\)\s*?;\s*?return \s*?a\.createElement\(\s*?([a-zA-Z0-9_\$]{2})\s*?,\s*?\{\s*?title\s*?:\s*?([a-zA-Z0-9_\$]{1})\("\.hardcoreModeTitle"\)\s*?,\s*?soundEffectPressed\s*?:\s*?"ui\.hardcore_toggle_press"\s*?,\s*?disabled\s*?:\s*?c\s*?,\s*?description\s*?:\s*?([a-zA-Z0-9_\$]{1})\("\.hardcoreModeDescription"\)\s*?,\s*?value\s*?:\s*?\(\s*?0\s*?,\s*?r\.useFacetMap\s*?\)\s*?\(\s*?\(\s*?e\s*?=>\s*?e\.isHardcore\s*?\)\s*?,\s*?\[\s*?\]\s*?,\s*?\[\s*?e\s*?\]\s*?\)\s*?,\s*?onChange\s*?:\s*?\(\s*?0\s*?,\s*?r\.useFacetCallback\s*?\)\s*?\(\s*?\(\s*?e\s*?=>\s*?t\s*?=>\s*?\{\s*?e\.isHardcore\s*?=\s*?t\s*?,\s*?l\(\s*?t\s*?\?\s*?"ui\.hardcore_enable"\s*?:\s*?"ui\.hardcore_disable"\s*?\)\s*?\}\s*?\)\s*?,\s*?\[\s*?l\s*?\]\s*?,\s*?\[\s*?e\s*?\]\s*?\)\s*?,\s*?gamepad\s*?:\s*?\{\s*?index\s*?:\s*?4\s*?\}\s*?,\s*?imgSrc\s*?:\s*?([a-zA-Z0-9_\$]{2})\s*?,\s*?"data-testid"\s*?:\s*?"hardcore-mode-toggle"\s*?\}\s*?\)\s*?\}/g,
                        ],
                    },
                    allowDisablingEnabledExperimentalToggles: {
                        /**
                         * Replacing experimental toggle generation code (v1).
                         *
                         * Known supported Minecraft versions:
                         *
                         * - 1.21.70/71/72 (index-d6df7.js)
                         * - 1.21.70/71/72 dev (index-1fd56.js)
                         */
                        0: [
                            /**
                             * Known supported Minecraft versions:
                             *
                             * - 1.21.70/71/72 (index-d6df7.js)
                             * - 1.21.70/71/72 dev (index-1fd56.js)
                             */
                            new RegExp(
                                `function ([a-zA-Z0-9_\$]{2})\\(\\{experimentalFeature:e,gamepadIndex:t,disabled:n,achievementsDisabledMessages:l,areAllTogglesDisabled:o\\}\\)\\{const\\{gt:i\\}=function\\(\\)\\{const\\{translate:e,formatDate:t\\}=\\(0,a\\.useContext\\)\\(([a-zA-Z0-9_\$]{2})\\);return\\(0,a\\.useMemo\\)\\(\\(\\(\\)=>\\(\\{f:\\{formatDate:t\\},gt:\\(t,n\\)=>\\{var a;return null!==\\(a=e\\(t,n\\)\\)&&void 0!==a\\?a:t\\}\\}\\)\\),\\[e,t\\]\\)\\}\\(\\),\\{t:c\\}=${extractedFunctionNames.translationStringResolver}\\("CreateNewWorld\\.all"\\),s=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.id\\),\\[\\],\\[e\\]\\),u=\\(0,r\\.useFacetUnwrap\\)\\(s\\),d=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.title\\),\\[\\],\\[e\\]\\),m=\\(0,r\\.useFacetUnwrap\\)\\(d\\),p=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.description\\),\\[\\],\\[e\\]\\),f=\\(0,r\\.useFacetUnwrap\\)\\(p\\),g=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.isEnabled\\),\\[\\],\\[e\\]\\),E=\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t\\)=>e\\|\\|t\\.isTogglePermanentlyDisabled\\),\\[\\],\\[\\(0,r\\.useFacetWrap\\)\\(n\\),e\\]\\),h=\\(0,r\\.useFacetCallback\\)\\(\\(\\(e,t\\)=>n=>\\{n&&t\\?([a-zA-Z0-9_\$]{2})\\.set\\(\\{userTriedToActivateToggle:!0,doSetToggleValue:\\(\\)=>e\\.isEnabled=n,userHasAcceptedBetaFeatures:!1\\}\\):e\\.isEnabled=n\\}\\),\\[\\],\\[e,o\\]\\),v=c\\("\\.narrationSuffixDisablesAchievements"\\),b=\\(0,r\\.useFacetMap\\)\\(\\(e=>0===e\\.length\\?c\\("\\.narrationSuffixEnablesAchievements"\\):void 0\\),\\[c\\],\\[l\\]\\);return null!=u\\?a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:m!==r\\.NO_VALUE\\?i\\(m\\):"",description:f!==r\\.NO_VALUE\\?i\\(f\\):"",gamepad:\\{index:t\\},value:g,disabled:E,onChange:h,onNarrationText:v,offNarrationText:b\\}\\):null\\}`
                            ),
                        ],
                    },
                    addMoreDefaultGameModes: {
                        /**
                         * Replacing game mode dropdown code (v1).
                         *
                         * Known supported Minecraft versions:
                         *
                         * - 1.21.70/71/72 (index-d6df7.js)
                         * - 1.21.70/71/72 dev (index-1fd56.js)
                         */
                        0: [
                            /**
                             * Known supported Minecraft versions:
                             *
                             * - 1.21.70/71/72 (index-d6df7.js)
                             * - 1.21.70/71/72 dev (index-1fd56.js)
                             */
                            new RegExp(
                                `function ([a-zA-Z0-9_\$]{2})\\(\\{generalData:e,isLockedTemplate:t,isUsingTemplate:n,achievementsDisabledMessages:l,isHardcoreMode:o\\}\\)\\{const\\{t:i\\}=${extractedFunctionNames.translationStringResolver}\\("CreateNewWorld\\.general"\\),\\{t:c\\}=${extractedFunctionNames.translationStringResolver}\\("CreateNewWorld\\.all"\\),s=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),u=\\(0,a\\.useContext\\)\\(([a-zA-Z0-9_\$]{2})\\)!==([a-zA-Z0-9_\$]{2})\\.CREATE,d=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),m=\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t,n\\)=>e\\|\\|t\\|\\|n\\),\\[\\],\\[t,s,o\\]\\),p=\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t\\)=>\\{const n=\\[([a-zA-Z0-9_\$]{2})\\(\\{label:i\\("\\.gameModeSurvivalLabel"\\),description:i\\("\\.gameModeSurvivalDescription"\\),value:([a-zA-Z0-9_\$]{2})\\.SURVIVAL\\},1===e\\.length\\?\\{narrationSuffix:c\\("\\.narrationSuffixEnablesAchievements"\\)\\}:\\{\\}\\),\\{label:i\\("\\.gameModeCreativeLabel"\\),description:i\\("\\.gameModeCreativeDescription"\\),value:(?:[a-zA-Z0-9_\$]{2})\\.CREATIVE,narrationSuffix:c\\("\\.narrationSuffixDisablesAchievements"\\)\\}\\];return\\(u\\|\\|t\\)&&n\\.push\\((?:[a-zA-Z0-9_\$]{2})\\(\\{label:i\\("\\.gameModeAdventureLabel"\\),description:i\\(t\\?"\\.gameModeAdventureTemplateDescription":"\\.gameModeAdventureDescription"\\),value:(?:[a-zA-Z0-9_\$]{2})\\.ADVENTURE\\},1===e\\.length\\?\\{narrationSuffix:c\\("\\.narrationSuffixEnablesAchievements"\\)\\}:\\{\\}\\)\\),n\\}\\),\\[i,c,u\\],\\[l,n\\]\\),f=\\(0,r\\.useNotifyMountComplete\\)\\(\\);return a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:i\\("\\.gameModeTitle"\\),disabled:m,options:p,onMountComplete:f,value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.gameMode\\),\\[\\],\\[e\\]\\),onChange:\\(0,r\\.useFacetCallback\\)\\(\\(\\(e,t\\)=>n=>\\{const a=e\\.gameMode;e\\.gameMode=n,u&&t\\.trackOptionChanged\\(([a-zA-Z0-9_\$]{2})\\.GameModeChanged,a,n\\)\\}\\),\\[u\\],\\[e,d\\]\\)\\}\\)\\}`
                            ),
                        ],
                        /**
                         * Replacing game mode id enumeration (v1).
                         *
                         * Known supported Minecraft versions:
                         *
                         * - 1.21.70/71/72 (index-d6df7.js)
                         * - 1.21.70/71/72 dev (index-1fd56.js)
                         */
                        1: [
                            /**
                             * Known supported Minecraft versions:
                             *
                             * - 1.21.70/71/72 (index-d6df7.js)
                             * - 1.21.70/71/72 dev (index-1fd56.js)
                             */
                            new RegExp(
                                `function\\(e\\)\\{e\\[e\\.UNKNOWN=-1\\]="UNKNOWN",e\\[e\\.SURVIVAL=0\\]="SURVIVAL",e\\[e\\.CREATIVE=1\\]="CREATIVE",e\\[e\\.ADVENTURE=2\\]="ADVENTURE"\\}\\(([a-zA-Z0-9_\$]{2})\\|\\|\\(([a-zA-Z0-9_\$]{2})=\\{\\}\\)\\),`
                            ),
                        ],
                    },
                    addGeneratorTypeDropdown: {
                        /**
                         * Adding the generator type dropdown (v1).
                         *
                         * Known supported Minecraft versions:
                         *
                         * - 1.21.70/71/72 (index-d6df7.js)
                         * - 1.21.70/71/72 dev (index-1fd56.js)
                         */
                        0: [
                            /**
                             * Known supported Minecraft versions:
                             *
                             * - 1.21.70/71/72 (index-d6df7.js)
                             * - 1.21.70/71/72 dev (index-1fd56.js)
                             */
                            new RegExp(
                                `E&&!s\\?a\\.createElement\\(r\\.Mount,\\{when:n\\},a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{label:c\\("\\.generatorTypeLabel"\\),options:\\[\\{value:([a-zA-Z0-9_\$]{2})\\.Overworld,label:c\\("\\.vanillaWorldGeneratorLabel"\\),description:c\\("\\.vanillaWorldGeneratorDescription"\\)\\},\\{value:(?:[a-zA-Z0-9_\$]{2})\\.Flat,label:c\\("\\.flatWorldGeneratorLabel"\\),description:c\\("\\.flatWorldGeneratorDescription"\\)\\},\\{value:(?:[a-zA-Z0-9_\$]{2})\\.Void,label:c\\("\\.voidWorldGeneratorLabel"\\),description:c\\("\\.voidWorldGeneratorDescription"\\)\\}\\],value:b\\.value,onChange:b\\.onChange\\}\\)\\)\\):null`
                            ),
                        ],
                        /**
                         * Replacing generator type id enumeration (v1).
                         *
                         * Known supported Minecraft versions:
                         *
                         * - 1.21.70/71/72 (index-d6df7.js)
                         * - 1.21.70/71/72 dev (index-1fd56.js)
                         */
                        1: [
                            /**
                             * Known supported Minecraft versions:
                             *
                             * - 1.21.70/71/72 (index-d6df7.js)
                             * - 1.21.70/71/72 dev (index-1fd56.js)
                             */
                            new RegExp(
                                `function\\(e\\)\\{e\\[e\\.Legacy=0\\]="Legacy",e\\[e\\.Overworld=1\\]="Overworld",e\\[e\\.Flat=2\\]="Flat",e\\[e\\.Nether=3\\]="Nether",e\\[e\\.TheEnd=4\\]="TheEnd",e\\[e\\.Void=5\\]="Void",e\\[e\\.Undefined=6\\]="Undefined"\\}\\(([a-zA-Z0-9_\$]{2})\\|\\|\\((?:[a-zA-Z0-9_\$]{2})=\\{\\}\\)\\),`
                            ),
                        ],
                    },
                    /**
                     * Allow for changing the seed in the edit world screen (v1).
                     *
                     * ### Minecraft version support:
                     *
                     * #### Fully Supported:
                     * - 1.21.70/71/72 (index-d6df7.js)
                     * - 1.21.70/71/72 dev (index-1fd56.js)
                     *
                     * #### Partially Supported:
                     *
                     * #### Not Supported:
                     * - < 1.21.70
                     */
                    allowForChangingSeeds: {
                        /**
                         * Replacing the seed text box in the advanced edit world tab (v1).
                         *
                         * ### Minecraft version support:
                         *
                         * #### Fully Supported:
                         * - 1.21.70/71/72 (index-d6df7.js)
                         * - 1.21.70/71/72 dev (index-1fd56.js)
                         *
                         * #### Partially Supported:
                         *
                         * #### Not Supported:
                         * - < 1.21.70
                         */
                        0: [
                            /**
                             * Known supported Minecraft versions:
                             *
                             * - 1.21.70/71/72 (index-d6df7.js)
                             * - 1.21.70/71/72 dev (index-1fd56.js)
                             */
                            new RegExp(
                                `([a-zA-Z0-9_\$]{2})=\\(\\{advancedData:e,isEditorWorld:t,onSeedValueChange:n,isSeedChangeLocked:l,showSeedTemplates:o\\}\\)=>\\{const\\{t:i\\}=([a-zA-Z0-9_\$]{2})\\("CreateNewWorld\\.advanced"\\),\\{t:c\\}=(?:[a-zA-Z0-9_\$]{2})\\("CreateNewWorld\\.all"\\),s=\\(0,a\\.useContext\\)\\(([a-zA-Z0-9_\$]{2})\\)!==([a-zA-Z0-9_\$]{2})\\.CREATE,u=([a-zA-Z0-9_\$]{2})\\(([a-zA-Z0-9_\$]{2})\\),d=([a-zA-Z0-9_\$]{2})\\(\\),m=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),p=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),f=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.worldSeed\\),\\[\\],\\[e\\]\\),g=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.isClipboardCopySupported\\),\\[\\],\\[m\\]\\),E=\\(0,r\\.useFacetCallback\\)\\(\\(\\(e,t,n\\)=>\\(\\)=>\\{t\\.copyToClipboard\\(e\\),n\\.queueSnackbar\\(i\\("\\.copyToClipboard"\\)\\)\\}\\),\\[i\\],\\[f,m,p\\]\\),h=s\\?E:\\(\\)=>d\\.push\\("/create-new-world/seed-templates"\\),v=s\\?"":i\\("\\.worldSeedPlaceholder"\\),b=i\\(s\\?"\\.worldSeedCopyButton":"\\.worldSeedButton"\\),y=\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t,n\\)=>t\\|\\|n&&u&&!s&&e\\.generatorType!=([a-zA-Z0-9_\$]{2})\\.Overworld\\),\\[u,s\\],\\[e,l,t\\]\\);return o\\?a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{data:g\\},\\(e=>s&&!e\\?a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{disabled:s,label:i\\("\\.worldSeedLabel"\\),description:i\\("\\.worldSeedDescription"\\),maxLength:32,value:f,onChange:n,placeholder:i\\("\\.worldSeedPlaceholder"\\),disabledNarrationSuffix:c\\("\\.narrationSuffixTemplateLocked"\\),"data-testid":"world-seed-text-field"\\}\\):a\\.createElement\\((?:[a-zA-Z0-9_\$]{2})\\.WithButton,\\{buttonInputLegend:b,buttonText:b,buttonOnClick:h,textDisabled:s,disabled:y,label:i\\("\\.worldSeedLabel"\\),description:i\\("\\.worldSeedDescription"\\),maxLength:32,value:f,onChange:n,placeholder:v,buttonNarrationHint:i\\("\\.narrationTemplatesButtonNarrationHint"\\),disabledNarrationSuffix:c\\("\\.narrationSuffixTemplateLocked"\\),"data-testid":"world-seed-with-button"\\}\\)\\)\\)\\):a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\((?:[a-zA-Z0-9_\$]{2}),\\{disabled:y,label:i\\("\\.worldSeedLabel"\\),description:i\\("\\.worldSeedDescription"\\),maxLength:32,value:f,onChange:n,placeholder:i\\("\\.worldSeedPlaceholder"\\),disabledNarrationSuffix:c\\("\\.narrationSuffixTemplateLocked"\\)\\}\\)\\)\\},`
                            ),
                        ],
                    },
                    /**
                     * Adds the debug tab to the create and edit world screens.
                     *
                     * ### Minecraft version support:
                     *
                     * #### Fully Supported:
                     * - 1.21.70/71/72 (index-d6df7.js)
                     * - 1.21.70/71/72 dev (index-1fd56.js)
                     *
                     * #### Partially Supported:
                     * - 1.21.60/61/62 (index-41cdf.js) {Only adds debug tab, does not modify it.}
                     * - 1.21.60.27/28 preview (index-41cdf.js) {Only adds debug tab, does not modify it.}
                     *
                     * #### Not Supported:
                     * - < 1.21.60
                     */
                    addDebugTab: {
                        /**
                         * Replacing the debug tab of the create and edit world screens (v1).
                         *
                         * Known supported Minecraft versions:
                         *
                         * - 1.21.70/71/72 (index-d6df7.js)
                         * - 1.21.70/71/72 dev (index-1fd56.js)
                         */
                        0: [
                            /**
                             * Known supported Minecraft versions:
                             *
                             * - 1.21.70/71/72 (index-d6df7.js)
                             * - 1.21.70/71/72 dev (index-1fd56.js)
                             */
                            new RegExp(
                                `function ([a-zA-Z0-9_\$]{2})\\(\\{worldData:e,achievementsDisabledMessages:t,onUnlockTemplateSettings:n,onExportTemplate:l,onClearPlayerData:o,isEditorWorld:i\\}\\)\\{const c=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),s=\\(0,r\\.useFacetMap\\)\\(\\(\\(\\{allBiomes:e\\}\\)=>e\\),\\[\\],\\[c\\]\\),u=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.isLockedTemplate\\),\\[\\],\\[e\\]\\),d=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.achievementsDisabled\\),\\[\\],\\[e\\]\\),m=\\(0,r\\.useFacetMap\\)\\(\\(\\(\\{spawnDimensionId:e\\}\\)=>e\\),\\[\\],\\[c\\]\\),p=\\(0,r\\.useFacetMap\\)\\(\\(e=>([a-zA-Z0-9_\$]{2})\\(e,\\(e=>\\(\\{label:e\\.label,dimension:e\\.dimension,value:e\\.id\\}\\)\\)\\)\\),\\[\\],\\[s\\]\\),f=\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t\\)=>([a-zA-Z0-9_\$]{2})\\(e,\\(e=>e\\.dimension===t\\)\\)\\),\\[\\],\\[p,m\\]\\),g=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.spawnBiomeId\\),\\[\\],\\[c\\]\\),E=\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.defaultSpawnBiome\\|\\|e\\.isBiomeOverrideActive\\),\\[\\],\\[c\\]\\),h=\\(0,r\\.useSharedFacet\\)\\(([a-zA-Z0-9_\$]{2})\\),v=\\(0,r\\.useFacetMap\\)\\(\\(e=>([a-zA-Z0-9_\$]{2})\\(e\\.platform\\)\\),\\[\\],\\[h\\]\\),b=\\(0,a\\.useContext\\)\\(([a-zA-Z0-9_\$]{2})\\)!==([a-zA-Z0-9_\$]{2})\\.CREATE,y=\\(0,r\\.useFacetMap\\)\\(\\(e=>e&&b\\),\\[b\\],\\[v\\]\\);return a\\.createElement\\(r\\.DeferredMountProvider,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{isLockedTemplate:u,achievementsDisabled:d,achievementsDisabledMessages:t,narrationText:"Debug",onUnlockTemplateSettings:n,isEditorWorld:i\\},a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:"Flat nether",gamepad:\\{index:0\\},value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.flatNether\\),\\[\\],\\[c\\]\\),onChange` +
                                    `:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.flatNether=t\\}\\),\\[\\],\\[c\\]\\)\\}\\)\\),a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\((?:[a-zA-Z0-9_\$]{2}),\\{title:"Enable game version override",gamepad:\\{index:1\\},value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.enableGameVersionOverride\\),\\[\\],\\[c\\]\\),onChange:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.enableGameVersionOverride=t\\}\\),\\[\\],\\[c\\]\\)\\}\\)\\),a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{label:"Game version override",gamepadIndex:2,placeholder:"0\\.0\\.0",maxLength:30,disabled:\\(0,r\\.useFacetMap\\)\\(\\(e=>!e\\.enableGameVersionOverride\\),\\[\\],\\[c\\]\\),value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.gameVersionOverride\\),\\[\\],\\[c\\]\\),onChange:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.gameVersionOverride=t\\}\\),\\[\\],\\[c\\]\\)\\}\\)\\),` +
                                    `a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:"World biome settings"\\}\\)\\),a\\.createElement\\((?:[a-zA-Z0-9_\$]{2}),\\{title:"Default spawn biome",description:"Using the default spawn biome will mean a random overworld spawn is selected",gamepad:\\{index:3\\},disabled:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.isBiomeOverrideActive\\),\\[\\],\\[c\\]\\),value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.defaultSpawnBiome\\),\\[\\],\\[c\\]\\),onChange:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.defaultSpawnBiome=t\\}\\),\\[\\],\\[c\\]\\)\\}\\),a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{onMountComplete:\\(0,r\\.useNotifyMountComplete\\)\\(\\),title:"Spawn dimension filter",disabled:E,wrapToggleText:!0,options:\\[\\{label:"Overworld",value:0\\},\\{label:"Nether",value:1\\}\\],value:m,onChange:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.spawnDimensionId=t\\}\\),\\[\\],\\[c\\]\\)\\}\\)\\),a\\.createElement\\(r\\.DeferredMount,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{title:"Spawn biome",options:f,onItemSelect:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>e\\.spawnBiomeId=t\\),\\[\\],\\[c\\]\\),disabled:E,value:\\(0,r\\.useFacetMap\\)\\(\\(\\(e,t\\)=>t\\.filter\\(\\(t=>t\\.value===e\\)\\)\\.length>0\\?e:t\\[0\\]\\.value\\),\\[\\],\\[g,f\\]\\),focusOnSelectedItem:!0\\}\\)\\),a\\.createElement\\((?:[a-zA-Z0-9_\$]{2}),\\{title:"Biome override",description:"Set the world to a selected biome\\. This will override the Spawn biome!",gamepad:\\{index:6\\},value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.isBiomeOverrideActive\\),\\[\\],\\[c\\]\\),onChange:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.isBiomeOverrideActive=t\\}\\),\\[\\],\\[c\\]\\)\\}\\),a\\.createElement\\((?:[a-zA-Z0-9_\$]{2}),\\{title:"Biome override",description:"Select biome to be used in the entire world",options:p,disabled:\\(0,r\\.useFacetMap\\)\\(\\(e=>!e\\.isBiomeOverrideActive\\),\\[\\],\\[c\\]\\),onItemSelect:\\(0,r\\.useFacetCallback\\)\\(\\(e=>t=>\\{e\\.biomeOverrideId=t\\}\\),\\[\\],\\[c\\]\\),value:\\(0,r\\.useFacetMap\\)\\(\\(e=>e\\.biomeOverrideId\\),\\[\\],\\[c\\]\\),focusOnSelectedItem:!0\\}\\),a\\.createElement\\(r\\.Mount,\\{when:y\\},a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{onExportTemplate:l,onClearPlayerData:o\\}\\)\\)\\)\\)\\}`
                            ),
                        ],
                        /**
                         * Unhiding the debug tab of the create and edit world screens (v1).
                         *
                         * ### Minecraft version support:
                         *
                         * #### Fully Supported:
                         * - 1.21.60/61/62 (index-41cdf.js)
                         * - 1.21.60.27/28 preview (index-41cdf.js)
                         * - 1.21.70/71/72 (index-d6df7.js)
                         * - 1.21.70/71/72 dev (index-1fd56.js)
                         * - 1.21.80.20/21/22 preview (index-1da13.js)
                         *
                         * #### Partially Supported:
                         *
                         * #### Not Supported:
                         * - < 1.21.60
                         *
                         * #### Support Unknown:
                         * - \> 1.21.80.22 preview
                         * - 1.21.70.xx preview
                         */
                        1: [
                            /**
                             * Known supported Minecraft versions:
                             *
                             * - 1.21.60/61/62 (index-41cdf.js)
                             * - 1.21.60.27/28 preview (index-41cdf.js)
                             * - 1.21.70/71/72 (index-d6df7.js)
                             * - 1.21.70/71/72 dev (index-1fd56.js)
                             * - 1.21.80.20/21/22 preview (index-1da13.js)
                             */
                            new RegExp(`e&&([tr])\\.push\\(\\{label:"\\.debugTabLabel",image:([a-zA-Z0-9_\$]{2}),value:"debug"\\}\\),`),
                        ],
                    },
                    add8CrafterUtilitiesMainMenuButton: {
                        /**
                         * Adding the 8Crafter Utilities main menu button to the top right corner of the screen, in the navbar (v1).
                         *
                         * ### Minecraft version support:
                         *
                         * #### Fully Supported:
                         * - 1.21.60/61/62 (index-41cdf.js)
                         * - 1.21.60.27/28 preview (index-41cdf.js)
                         * - 1.21.70/71/72 (index-d6df7.js)
                         * - 1.21.70/71/72 dev (index-1fd56.js)
                         * - 1.21.80.20/21/22 preview (index-1da13.js)
                         *
                         * #### Partially Supported:
                         *
                         * #### Not Supported:
                         *
                         * #### Support Unknown:
                         * - < 1.21.60
                         * - \> 1.21.80.22 preview
                         * - 1.21.70.xx preview
                         */
                        0: [
                            /**
                             * Known supported Minecraft versions:
                             *
                             * - 1.21.60/61/62 (index-41cdf.js)
                             * - 1.21.60.27/28 preview (index-41cdf.js)
                             * - 1.21.70/71/72 (index-d6df7.js)
                             * - 1.21.70/71/72 dev (index-1fd56.js)
                             * - 1.21.80.20/21/22 preview (index-1da13.js)
                             */
                            new RegExp(
                                `a\\.createElement\\(r\\.Mount,\\{when:E\\},a\\.createElement\\(a\\.Fragment,null,a\\.createElement\\(([a-zA-Z0-9_\$]{2})\\.Divider,null\\),a\\.createElement\\(([a-zA-Z0-9_\$]{2}),\\{onClick:[eo],screenAnalyticsId:u\\}\\)\\)\\)`
                            ),
                        ],
                    },
                };
                if (settings.hardcoreModeToggleAlwaysClickable) {
                    let successfullyReplaced = false;
                    for (const regex of replacerRegexes.hardcoreModeToggleAlwaysClickable[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(
                                regex,
                                `/**
             * The hardcore mode toggle.
             *
             * @param {Object} param0
             * @param {unknown} param0.generalData
             * @param {boolean} param0.isLockedTemplate
             */
            function $1({ generalData: e, isLockedTemplate: t }) {
                const { t: n } = $2("CreateNewWorld.general"),
                    l = $3(),
                    o = (0, a.useContext)($4) === $5.CREATE,
                    i = (0, r.useSharedFacet)($6),
                    c = (0, r.useFacetMap)((e, t, n) => n || t || !o || (e.gameMode !== $7.SURVIVAL && e.gameMode !== $8.ADVENTURE), [o], [e, t, i]);
                return a.createElement($9, {
                    title: $10(".hardcoreModeTitle"),
                    soundEffectPressed: "ui.hardcore_toggle_press",
                    disabled: false /* c */, // Modified to make the hardcore mode toggle always be enabled.
                    description: $11(".hardcoreModeDescription"),
                    value: (0, r.useFacetMap)((e) => e.isHardcore, [], [e]),
                    onChange: (0, r.useFacetCallback)(
                        (e) => (t) => {
                            (e.isHardcore = t), l(t ? "ui.hardcore_enable" : "ui.hardcore_disable");
                        },
                        [l],
                        [e]
                    ),
                    gamepad: { index: 4 },
                    imgSrc: $12,
                    "data-testid": "hardcore-mode-toggle",
                });
            }`
                            );
                            successfullyReplaced = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5}\.js$/.test(entry.data.filename) && !successfullyReplaced) {
                        failedReplaces.push("hardcoreModeToggleAlwaysClickable");
                    }
                }
                if (settings.allowDisablingEnabledExperimentalToggles) {
                    let successfullyReplaced = false;
                    for (const regex of replacerRegexes.allowDisablingEnabledExperimentalToggles[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(
                                regex,
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
            function $1({ experimentalFeature: e, gamepadIndex: t, disabled: n, achievementsDisabledMessages: l, areAllTogglesDisabled: o }) {
                const { gt: i } = (function () {
                        const { translate: e, formatDate: t } = (0, a.useContext)($2);
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
                    { t: c } = ${extractedFunctionNames.translationStringResolver}("CreateNewWorld.all"),
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
                                ? $3.set({ userTriedToActivateToggle: !0, doSetToggleValue: () => (e.isEnabled = n), userHasAcceptedBetaFeatures: !1 })
                                : (e.isEnabled = n);
                        },
                        [],
                        [e, o]
                    ),
                    v = c(".narrationSuffixDisablesAchievements"),
                    b = (0, r.useFacetMap)((e) => (0 === e.length ? c(".narrationSuffixEnablesAchievements") : void 0), [c], [l]);
                return null != u
                    ? a.createElement($4, {
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
                            successfullyReplaced = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5}\.js$/.test(entry.data.filename) && !successfullyReplaced) {
                        failedReplaces.push("allowDisablingEnabledExperimentalToggles");
                    }
                }
                // `FUNCTION CODE`.split("${extractedFunctionNames.translationStringResolver}").map(v=>stringToRegexString(v)).join("${extractedFunctionNames.translationStringResolver}")
                if (settings.addMoreDefaultGameModes) {
                    let successfullyReplacedA = false;
                    let successfullyReplacedB = false;
                    for (const regex of replacerRegexes.addMoreDefaultGameModes[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(
                                regex,
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
            function $1({ generalData: e, isLockedTemplate: t, isUsingTemplate: n, achievementsDisabledMessages: l, isHardcoreMode: o }) {
                const { t: i } = ${extractedFunctionNames.translationStringResolver}("CreateNewWorld.general"),
                    { t: c } = ${extractedFunctionNames.translationStringResolver}("CreateNewWorld.all"),
                    s = (0, r.useSharedFacet)($2),
                    u = (0, a.useContext)($3) !== $4.CREATE,
                    d = (0, r.useSharedFacet)($5),
                    m = (0, r.useFacetMap)((e, t, n) => e || t || n, [], [t, s, o]),
                    p = (0, r.useFacetMap)(
                        (e, t) => {
                            const n = [/* 
                                $6(
                                    { label: i(".gameModeUnknownLabel"), description: i(".gameModeUnknownDescription"), value: $7.UNKNOWN },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ), */
                                $6(
                                    { label: i(".gameModeSurvivalLabel"), description: i(".gameModeSurvivalDescription"), value: $7.SURVIVAL },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                {
                                    label: i(".gameModeCreativeLabel"),
                                    description: i(".gameModeCreativeDescription"),
                                    value: $7.CREATIVE,
                                    narrationSuffix: c(".narrationSuffixDisablesAchievements"),
                                },
                                $6(
                                    {
                                        label: i(".gameModeAdventureLabel"),
                                        description: i(t ? ".gameModeAdventureTemplateDescription" : ".gameModeAdventureDescription"),
                                        value: $7.ADVENTURE,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),/* 
                                $6(
                                    {
                                        label: "Game Mode 3",
                                        description: "Secret game mode 3.",
                                        value: $7.GM3,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                $6(
                                    {
                                        label: "Game Mode 4",
                                        description: "Secret game mode 4.",
                                        value: $7.GM4,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ), */
                                $6(
                                    {
                                        label: "Default",
                                        description: "Default game mode, might break things if you set the default game mode to itself.",
                                        value: $7.DEFAULT,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                $6(
                                    {
                                        label: "Spectator",
                                        description: "Spectator mode.",
                                        value: $7.SPECTATOR,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),/* 
                                $6(
                                    {
                                        label: "Game Mode 7",
                                        description: "Secret game mode 7.",
                                        value: $7.GM7,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                $6(
                                    {
                                        label: "Game Mode 8",
                                        description: "Secret game mode 8.",
                                        value: $7.GM8,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                $6(
                                    {
                                        label: "Game Mode 9",
                                        description: "Secret game mode 9.",
                                        value: $7.GM9,
                                    },
                                    1 === e.length ? { narrationSuffix: c(".narrationSuffixEnablesAchievements") } : {}
                                ), */
                            ]; /* 
                            return (
                                (u || t) &&
                                    n.push(
                                        $6(
                                            {
                                                label: i(".gameModeAdventureLabel"),
                                                description: i(t ? ".gameModeAdventureTemplateDescription" : ".gameModeAdventureDescription"),
                                                value: $7.ADVENTURE,
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
                return a.createElement($8, {
                    title: i(".gameModeTitle"),
                    disabled: m,
                    options: p,
                    onMountComplete: f,
                    value: (0, r.useFacetMap)((e) => e.gameMode, [], [e]),
                    onChange: (0, r.useFacetCallback)(
                        (e, t) => (n) => {
                            const a = e.gameMode;
                            (e.gameMode = n), u && t.trackOptionChanged($9.GameModeChanged, a, n);
                        },
                        [u],
                        [e, d]
                    ),
                });
            }`
                            );
                            successfullyReplacedA = true;
                            break;
                        }
                    }
                    for (const regex of replacerRegexes.addMoreDefaultGameModes[1]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(
                                regex,
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
                })($1 || ($2 = {})),`
                            );
                            successfullyReplacedB = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5}\.js$/.test(entry.data.filename)) {
                        if (!successfullyReplacedA) {
                            failedReplaces.push("addMoreDefaultGameModes_dropdown");
                        }
                        if (!successfullyReplacedB) {
                            failedReplaces.push("addMoreDefaultGameModes_enumeration");
                        }
                    }
                }
                if (settings.addGeneratorTypeDropdown) {
                    let successfullyReplacedA = false;
                    let successfullyReplacedB = false;
                    for (const regex of replacerRegexes.addGeneratorTypeDropdown[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(
                                regex,
                                `// Modified to add this dropdown
                                      a.createElement(
                                          r.Mount,
                                          { when: true /* n */ },
                                          a.createElement(
                                              r.DeferredMount,
                                              null,
                                              a.createElement($1, {
                                                  label: c(".generatorTypeLabel"),
                                                  options: [
                                                      {
                                                          value: $2.Legacy,
                                                          label: "Legacy",
                                                          description: "The old world type.",
                                                      },
                                                      {
                                                          value: $2.Overworld,
                                                          label: c(".vanillaWorldGeneratorLabel"),
                                                          description: c(".vanillaWorldGeneratorDescription"),
                                                      },
                                                      {
                                                          value: $2.Flat,
                                                          label: c(".flatWorldGeneratorLabel"),
                                                          description: c(".flatWorldGeneratorDescription"),
                                                      },/* 
                                                      {
                                                          value: $2.Nether,
                                                          label: "Nether",
                                                          description: c(".vanillaWorldGeneratorDescription"),
                                                      },
                                                      {
                                                          value: $2.TheEnd,
                                                          label: "The End",
                                                          description: c(".vanillaWorldGeneratorDescription"),
                                                      }, */
                                                      {
                                                          value: $2.Void,
                                                          label: c(".voidWorldGeneratorLabel"),
                                                          description: c(".voidWorldGeneratorDescription"),
                                                      },/* 
                                                      {
                                                          value: $2.Undefined,
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
                            );
                            successfullyReplacedA = true;
                            break;
                        }
                    }
                    for (const regex of replacerRegexes.addGeneratorTypeDropdown[1]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(
                                regex,
                                `(function (e) {
                    (e[(e.Legacy = 0)] = "Legacy"),
                        (e[(e.Overworld = 1)] = "Overworld"),
                        (e[(e.Flat = 2)] = "Flat"),
                        (e[(e.Nether = 3)] = "Nether"),
                        (e[(e.TheEnd = 4)] = "TheEnd"),
                        (e[(e.Void = 5)] = "Void"),
                        (e[(e.Undefined = 6)] = "Undefined");
                })($1 || ($1 = {})),`
                            );
                            successfullyReplacedB = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5}\.js$/.test(entry.data.filename)) {
                        if (!successfullyReplacedA) {
                            failedReplaces.push("addGeneratorTypeDropdown_dropdown");
                        }
                        if (!successfullyReplacedB) {
                            failedReplaces.push("addGeneratorTypeDropdown_enumeration");
                        }
                    }
                }
                if (settings.allowForChangingSeeds) {
                    let successfullyReplaced = false;
                    for (const regex of replacerRegexes.addGeneratorTypeDropdown[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(
                                regex,
                                `$1 = ({ advancedData: e, isEditorWorld: t, onSeedValueChange: n, isSeedChangeLocked: l, showSeedTemplates: o, worldData: wd }) => {
                    const { t: i } = $2("CreateNewWorld.advanced"),
                        { t: c } = $2("CreateNewWorld.all"),
                        s = (0, a.useContext)($3) !== $4.CREATE,
                        u = $5($6),
                        d = $7(),
                        m = (0, r.useSharedFacet)($8),
                        p = (0, r.useSharedFacet)($9),
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
                        y = (0, r.useFacetMap)((e, t, n) => t || (n && u && !s && e.generatorType != $10.Overworld), [u, s], [e, l, t]);
                    return (/* o
                        ?  */a.createElement(
                              r.DeferredMount,
                              null,
                              a.createElement($11, { data: g }, (e) =>
                                  /* s && !e
                                      ? a.createElement($12, {
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
                                      :  */a.createElement($12.WithButton, {
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
                              a.createElement($12, {
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
                            successfullyReplaced = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5}\.js$/.test(entry.data.filename) && !successfullyReplaced) {
                        failedReplaces.push("allowForChangingSeeds");
                    }
                }
                if (settings.addDebugTab) {
                    let successfullyReplacedA = false;
                    let successfullyReplacedB = false;
                    for (const regex of replacerRegexes.addDebugTab[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(
                                regex,
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
            function $1({
                worldData: e,
                achievementsDisabledMessages: t,
                onUnlockTemplateSettings: n,
                onExportTemplate: l,
                onClearPlayerData: o,
                isEditorWorld: i,
            }) {
                const c = (0, r.useSharedFacet)($2),
                    s = (0, r.useFacetMap)(({ allBiomes: e }) => e, [], [c]),
                    u = (0, r.useFacetMap)((e) => e.isLockedTemplate, [], [e]),
                    d = (0, r.useFacetMap)((e) => e.achievementsDisabled, [], [e]),
                    m = (0, r.useFacetMap)(({ spawnDimensionId: e }) => e, [], [c]),
                    p = (0, r.useFacetMap)((e) => $3(e, (e) => ({ label: e.label, dimension: e.dimension, value: e.id })), [], [s]),
                    f = (0, r.useFacetMap)((e, t) => $4(e, (e) => e.dimension === t), [], [p, m]),
                    g = (0, r.useFacetMap)((e) => e.spawnBiomeId, [], [c]),
                    E = (0, r.useFacetMap)((e) => e.defaultSpawnBiome || e.isBiomeOverrideActive, [], [c]),
                    h = (0, r.useSharedFacet)($5),
                    v = (0, r.useFacetMap)((e) => $6(e.platform), [], [h]),
                    b = (0, a.useContext)($7) !== $8.CREATE,
                    y = (0, r.useFacetMap)((e) => e && b, [b], [v]),
                    rawData = (0, r.useFacetMap)((e) => e, [], [e]);
                return a.createElement(
                    r.DeferredMountProvider,
                    null,
                    a.createElement(
                        $9,
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
                            a.createElement($10, {
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
                            a.createElement($10, {
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
                            a.createElement($11, {
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
                        a.createElement(r.DeferredMount, null, a.createElement($12, { title: "World biome settings" })),
                        a.createElement($10, {
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
                            a.createElement($12, {
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
                            a.createElement($13, {
                                title: "Spawn biome",
                                options: f,
                                onItemSelect: (0, r.useFacetCallback)((e) => (t) => (e.spawnBiomeId = t), [], [c]),
                                disabled: E,
                                value: (0, r.useFacetMap)((e, t) => (t.filter((t) => t.value === e).length > 0 ? e : t[0].value), [], [g, f]),
                                focusOnSelectedItem: !0,
                            })
                        ),
                        a.createElement($10, {
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
                        a.createElement($13, {
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
                        a.createElement(r.Mount, { when: y }, a.createElement($14, { onExportTemplate: l, onClearPlayerData: o })),
                        a.createElement(r.DeferredMount, null, a.createElement(rawValueEditor, { rawData: e })),
                        a.createElement(() =>
                            a.createElement(
                                a.Fragment,
                                null,
                                a.createElement(${extractedFunctionNames.headerFunciton}, null, "Debug Info - Raw"),
                                a.createElement(${extractedFunctionNames.headerSpacingFunction}, { size: 1 }) /* 
                                a.createElement(r.DeferredMount, null, a.createElement(${extractedFunctionNames.editWorldTextFunction}.Text, null, "worldSummary: " + JSON.stringify(e.get(), undefined, 2))),
                                a.createElement(r.DeferredMount, null, a.createElement(${extractedFunctionNames.editWorldTextFunction}.Text, null, "worldData: " + JSON.stringify(u.get(), undefined, 2))),
                                a.createElement(r.DeferredMount, null, a.createElement(${extractedFunctionNames.editWorldTextFunction}.Text, null, "achievementsDisabledMessages: " + JSON.stringify(t.get(), undefined, 2))), */,
                                a.createElement(
                                    r.DeferredMount,
                                    null,
                                    a.createElement(
                                        function ({ children: e, align: t }) {
                                            return a.createElement(${extractedFunctionNames.jsText}, { type: "body", role: "inherit", align: t, shouldNarrate: !1, whiteSpace: "pre" }, e);
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
                                a.createElement($11, {
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
                                a.createElement(${extractedFunctionNames.headerFunciton}, null, "Debug Info - Property Descriptors"),
                                a.createElement(${extractedFunctionNames.headerSpacingFunction}, { size: 1 }) /* 
                                a.createElement(r.DeferredMount, null, a.createElement(${extractedFunctionNames.editWorldTextFunction}.Text, null, "worldSummary: " + JSON.stringify(Object.getOwnPropertyDescriptors(e.get()), undefined, 2))),
                                a.createElement(r.DeferredMount, null, a.createElement(${extractedFunctionNames.editWorldTextFunction}.Text, null, "worldData: " + JSON.stringify(Object.getOwnPropertyDescriptors(u.get()), undefined, 2))),
                                a.createElement(r.DeferredMount, null, a.createElement(${extractedFunctionNames.editWorldTextFunction}.Text, null, "achievementsDisabledMessages: " + JSON.stringify(Object.getOwnPropertyDescriptors(t.get()), undefined, 2))), */,
                                a.createElement(
                                    r.DeferredMount,
                                    null,
                                    a.createElement(
                                        function ({ children: e, align: t }) {
                                            return a.createElement(${extractedFunctionNames.jsText}, { type: "body", role: "inherit", align: t, shouldNarrate: !1, whiteSpace: "pre" }, e);
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
                                a.createElement($11, {
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
                const { t: c } = ${extractedFunctionNames.translationStringResolver}("CreateNewWorld.general") /* ,
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
                        a.createElement(${extractedFunctionNames.headerFunciton}, null, "Raw Value Editor"),
                        a.createElement($11, {
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
                        a.createElement($11, {
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
                        a.createElement($11, {
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
                        a.createElement($11, {
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
                        a.createElement($11, {
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
                        a.createElement($11, {
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
                        a.createElement($11, {
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
                        a.createElement($10, {
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
                        a.createElement($10, {
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
                        a.createElement($10, {
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
                        a.createElement($10, {
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
                        a.createElement($10, {
                            title: "playerHasDied (read-only)",
                            disabled: true,
                            description: "readonly general.playerHasDied",
                            value: (0, r.useFacetMap)((e) => e.playerHasDied, [], [p]),
                            onChange: (0, r.useFacetCallback)((e) => (t) => (e.playerHasDied = t), [], [p]),
                        }),
                        a.createElement($10, {
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
                        a.createElement($10, {
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
                            );
                            successfullyReplacedA = true;
                            break;
                        }
                    }
                    for (const regex of replacerRegexes.addDebugTab[1]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, `$1.push({label:".debugTabLabel",image:$2,value:"debug"}),`);
                            successfullyReplacedB = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5}\.js$/.test(entry.data.filename)) {
                        if (!successfullyReplacedA) {
                            failedReplaces.push("addDebugTab_replaceTab");
                        }
                        if (!successfullyReplacedB) {
                            failedReplaces.push("addDebugTab_makeVisible");
                        }
                    }
                }
                Object.entries(settings.colorReplacements).forEach(([key, value]) => {
                    if (value !== "" && value !== undefined && value !== null && value !== key) {
                        distData = distData.replaceAll(key, value);
                    }
                });
                distData = distData
                    .replace(
                        /(?=<script defer="defer" src="\/hbui\/index-[a-zA-Z0-9]+\.js"><\/script>)/,
                        `<script defer="defer" src="/hbui/oreUICustomizer8CrafterConfig.js"></script>
        <script defer="defer" src="/hbui/class_path.js"></script>
        <script defer="defer" src="/hbui/css.js"></script>
        <script defer="defer" src="/hbui/JSONB.js"></script>
        <script defer="defer" src="/hbui/customOverlays.js"></script>
        `
                    )
                    .replace(
                        /(?<=<link href="\/hbui\/gameplay-theme\.css" rel="stylesheet">)/,
                        `
        <link href="/hbui/customOverlays.css" rel="stylesheet" />`
                    );
                if (settings.maxTextLengthOverride !== "") {
                    const origDistData = distData;
                    const textLengthValues = distData.matchAll(/maxLength: ([0-9]+)/gs);
                    for (const textLengthValue of textLengthValues) {
                        distData = distData.replace(
                            textLengthValue[0],
                            `maxLength: ${
                                settings.maxTextLengthOverride /* BigInt(settings.maxTextLengthOverride) > BigInt(textLengthValue[1]) ? settings.maxTextLengthOverride : textLengthValue[1] */
                            }`
                        );
                    }
                    if (/index-[0-9a-f]{5}\.js$/.test(entry.data.filename) && distData === origDistData) {
                        failedReplaces.push("maxTextLengthOverride");
                    }
                }
                if (settings.add8CrafterUtilitiesMainMenuButton) {
                    let successfullyReplaced = false;
                    for (const regex of replacerRegexes.add8CrafterUtilitiesMainMenuButton[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(
                                regex,
                                `a.createElement(
                                                    r.Mount,
                                                    { when: true },
                                                    a.createElement(
                                                        a.Fragment,
                                                        null,
                                                        a.createElement($1.Divider, null),
                                                        a.createElement(() =>
                                                            a.createElement(
                                                                function ({ onClick: e, selected: t, disabled: n, focusGridIndex: r, role: l = "inherit" }) {
                                                                    return a.createElement(
                                                                        a.Fragment,
                                                                        null,
                                                                        a.createElement(
                                                                            ${extractedFunctionNames.navbarButtonFunction},
                                                                            {
                                                                                disabled: n,
                                                                                // focusGridIndex: r,
                                                                                inputLegend: "8Crafter Utilities",
                                                                                // narrationText: "8Crafter Utilities Button",
                                                                                onClick: e,
                                                                                role: l,
                                                                                selected: t,
                                                                                className: "reverse_m2lNR_rightPadding",
                                                                            },
                                                                            a.createElement(${extractedFunctionNames.navbarButtonImageFunction}, {
                                                                                className: "QQfwv",
                                                                                imageRendering: "pixelated",
                                                                                src: "assets/8crafter.gif",
                                                                                isAnimated: true,
                                                                            })
                                                                        )
                                                                    );
                                                                },
                                                                {
                                                                    onClick: (0, r.useFacetCallback)(
                                                                        () => () => {
                                                                            if (mainMenu8CrafterUtilities.style.display === "none") {
                                                                                mainMenu8CrafterUtilities.style.display = "block";
                                                                            } else {
                                                                                mainMenu8CrafterUtilities.style.display = "none";
                                                                            }
                                                                        },
                                                                        ["", [], () => {}],
                                                                        []
                                                                    ),
                                                                }
                                                            )
                                                        )
                                                    )
                                                ),
                                                a.createElement(
                                                    r.Mount,
                                                    { when: E },
                                                    a.createElement(
                                                        a.Fragment,
                                                        null,
                                                        a.createElement($1.Divider, null),
                                                        a.createElement($2, { onClick: e, screenAnalyticsId: u })
                                                    )
                                                )`
                            );
                            successfullyReplaced = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5}\.js$/.test(entry.data.filename) && !successfullyReplaced) {
                        failedReplaces.push("allowForChangingSeeds");
                    }
                }
                if (failedReplaces.length > 0) allFailedReplaces[entry.data.filename] = failedReplaces;
                if (origData !== distData) {
                    if (entry.data.filename.endsWith(".js")) {
                        distData = `// Modified by 8Crafter's Ore UI Customizer v${format_version}: https://www.8crafter.com/utilities/ore-ui-customizer\n// Options: ${JSON.stringify(
                            settings
                        )}\n${distData}`;
                    } else if (entry.data.filename.endsWith(".css")) {
                        distData = `/* Modified by 8Crafter's Ore UI Customizer v${format_version}: https://www.8crafter.com/utilities/ore-ui-customizer */\n/* Options: ${JSON.stringify(
                            settings
                        )} */\n${distData}`;
                    } else if (entry.data.filename.endsWith(".html")) {
                        distData = `<!-- Modified by 8Crafter's Ore UI Customizer v${format_version}: https://www.8crafter.com/utilities/ore-ui-customizer -->\n<!-- Options: ${JSON.stringify(
                            settings
                        )} -->\n${distData}`;
                    }
                    entry.replaceText(distData);
                    console.log(`Entry ${entry.name} has been successfully modified.`);
                    modifiedCount++;
                    editedCount++;
                    return 1;
                } else {
                    // console.log(`Entry ${entry.name} has not been modified.`);
                    unmodifiedCount++;
                    return 2;
                }
            } else {
                console.error("Entry is not a ZipFileEntry but has a file extension of js, html, or css: " + entry.filename);
                unmodifiedCount++;
                return -1;
            }
        }
    );
    try {
        zipFs.addBlob("gui/dist/hbui/assets/8crafter.gif", await fetch("/assets/images/ore-ui-customizer/8crafter.gif").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/8crafter.gif");
        addedCount++;
        // Toggle
        zipFs.addBlob("gui/dist/hbui/assets/toggle_off_hover.png", await fetch("/assets/images/ui/toggle/toggle_off_hover.png").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/toggle_off_hover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/toggle_off.png", await fetch("/assets/images/ui/toggle/toggle_off.png").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/toggle_off.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/toggle_on_hover.png", await fetch("/assets/images/ui/toggle/toggle_on_hover.png").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/toggle_on_hover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/toggle_on.png", await fetch("/assets/images/ui/toggle/toggle_on.png").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/toggle_on.png");
        addedCount++;
        // Radio
        zipFs.addBlob("gui/dist/hbui/assets/radio_off_hover.png", await fetch("/assets/images/ui/radio/radio_off_hover.png").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/radio_off_hover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/radio_off.png", await fetch("/assets/images/ui/radio/radio_off.png").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/radio_off.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/radio_on_hover.png", await fetch("/assets/images/ui/radio/radio_on_hover.png").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/radio_on_hover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/radio_on.png", await fetch("/assets/images/ui/radio/radio_on.png").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/radio_on.png");
        addedCount++;
        // Checkbox
        // to-do
        // Textboxes
        zipFs.addBlob(
            "gui/dist/hbui/assets/edit_box_indent_hover.png",
            await fetch("/assets/images/ui/textboxes/edit_box_indent_hover.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/edit_box_indent_hover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/edit_box_indent.png", await fetch("/assets/images/ui/textboxes/edit_box_indent.png").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/edit_box_indent.png");
        addedCount++;
        // Buttons
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_dark.png",
            await fetch("/assets/images/ui/buttons/button_borderless_dark.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_dark.png");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_light.png",
            await fetch("/assets/images/ui/buttons/button_borderless_light.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_light.png");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_light_blue_default.png",
            await fetch("/assets/images/ui/buttons/button_borderless_light_blue_default.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_light_blue.png");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_darkhover.png",
            await fetch("/assets/images/ui/buttons/button_borderless_darkhover.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_darkhover.png");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_lighthover.png",
            await fetch("/assets/images/ui/buttons/button_borderless_lighthover.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_lighthover.png");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_light_blue_hover.png",
            await fetch("/assets/images/ui/buttons/button_borderless_light_blue_hover.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_light_blue_hover.png");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_darkpressed.png",
            await fetch("/assets/images/ui/buttons/button_borderless_darkpressed.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_darkpressed.png");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_lightpressed.png",
            await fetch("/assets/images/ui/buttons/button_borderless_lightpressed.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_lightpressed.png");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_light_blue_hover_pressed.png",
            await fetch("/assets/images/ui/buttons/button_borderless_light_blue_hover_pressed.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_light_blue_hover_pressed.png");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_darkpressednohover.png",
            await fetch("/assets/images/ui/buttons/button_borderless_darkpressednohover.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_darkpressednohover.png");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_lightpressednohover.png",
            await fetch("/assets/images/ui/buttons/button_borderless_lightpressednohover.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_lightpressednohover.png");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/button_borderless_light_blue_pressed.png",
            await fetch("/assets/images/ui/buttons/button_borderless_light_blue_pressed.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/button_borderless_light_blue_pressed.png");
        addedCount++;
    } catch (e) {
        console.error(e);
    }
    try {
        zipFs.addText(
            "gui/dist/hbui/oreUICustomizer8CrafterConfig.js",
            `const oreUICustomizerConfig = ${JSON.stringify(settings, undefined, 4)};
const oreUICustomizerVersion = ${JSON.stringify(format_version)};`
        );
        console.log("Added gui/dist/hbui/oreUICustomizer8CrafterConfig.js");
        addedCount++;
    } catch (e) {
        console.error(e);
    }
    try {
        zipFs.addBlob("gui/dist/hbui/customOverlays.js", await fetch("/assets/oreui/customOverlays.js").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/customOverlays.js");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/customOverlays.css", await fetch("/assets/oreui/customOverlays.css").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/customOverlays.css");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/class_path.js", await fetch("/assets/oreui/class_path.js").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/class_path.js");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/css.js", await fetch("/assets/oreui/css.js").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/css.js");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/JSONB.js", await fetch("/assets/oreui/JSONB.js").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/JSONB.js");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/JSONB.d.ts", await fetch("/assets/oreui/JSONB.d.ts").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/JSONB.d.ts");
        addedCount++;
        zipFs.addBlob(
            "gui/dist/hbui/assets/chevron_new_white_right.png",
            await fetch("/assets/oreui/assets/chevron_new_white_right.png").then((r) => r.blob())
        );
        console.log("Added gui/dist/hbui/assets/chevron_new_white_right.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/chevron_white_down.png", await fetch("/assets/oreui/assets/chevron_white_down.png").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/chevron_white_down.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/chevron_white_up.png", await fetch("/assets/oreui/assets/chevron_white_up.png").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/assets/chevron_white_up.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/fonts/consola.ttf", await fetch("/assets/oreui/fonts/consola.ttf").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/fonts/consola.ttf");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/fonts/consolab.ttf", await fetch("/assets/oreui/fonts/consolab.ttf").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/fonts/consolab.ttf");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/fonts/consolai.ttf", await fetch("/assets/oreui/fonts/consolai.ttf").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/fonts/consolai.ttf");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/fonts/consolaz.ttf", await fetch("/assets/oreui/fonts/consolaz.ttf").then((r) => r.blob()));
        console.log("Added gui/dist/hbui/fonts/consolaz.ttf");
        addedCount++;
    } catch (e) {
        console.error(e);
    }
    if (Object.keys(allFailedReplaces).length > 0) {
        console.warn(
            "Some customizations failed, this could be due to the provided file being modified, or that version is not supported for the failed customizations:",
            allFailedReplaces
        );
        $("#import_files_error").css("color", "yellow");
        const originalWarning = $("#import_files_error").text();
        const newWarning = `<b>Some customizations failed, this could be due to the provided file being modified, or that version is not supported for the failed customizations:</b>
<pre>${Object.entries(allFailedReplaces)
            .map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v, null, 4)}`)
            .join("\n")}</pre>`;
        $("#import_files_error").append([newWarning]);
        // $("#import_files_error").text(originalWarning + (originalWarning.length > 0 ? "\n\n" : "") + newWarning);
        $("#import_files_error").prop("hidden", false);
    }
    console.log(`Added entries: ${addedCount}.`);
    console.log(`Removed entries: ${removedCount}.`);
    console.log(`Modified entries: ${modifiedCount}.`);
    console.log(`Unmodified entries: ${unmodifiedCount}.`);
    console.log(`Edited ${editedCount} entries.`);
    console.log(`Renamed ${renamedCount} entries.`);
    console.log(`Total entries: ${zipFs.entries.length}.`);
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
