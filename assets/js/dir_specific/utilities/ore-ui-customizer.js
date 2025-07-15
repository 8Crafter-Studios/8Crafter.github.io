import { blobToDataURI, builtInPlugins, getExtractedSymbolNames, getReplacerRegexes, validatePluginFile, } from "../../../shared/ore-ui-customizer-assets.js";
// import semver from "../../../shared/semver.js";
/**
 * The namespace for 8Crafter's Ore UI Customizer.
 */
export var OreUICustomizer;
(function (OreUICustomizer) {
    /**
     *
     * @param buf1
     * @param buf2
     * @returns
     *
     * @see https://stackoverflow.com/a/21554107/16872762
     */
    function arrayBuffersAreEqual(buf1, buf2) {
        if (buf1.byteLength != buf2.byteLength)
            return false;
        var dv1 = new Int8Array(buf1);
        var dv2 = new Int8Array(buf2);
        for (var i = 0; i != buf1.byteLength; i++) {
            if (dv1[i] != dv2[i])
                return false;
        }
        return true;
    }
    /**
     * The list of zip file presets available presets for the Ore UI Customizer.
     */
    OreUICustomizer.currentPresets = {
        none: { displayName: "None (Use Imported .zip File)", url: "" },
        "v1.21.90_PC": { displayName: "v1.21.90 (PC)", url: "/assets/zip/gui_mc-v1.21.90_PC.zip" },
        "v1.21.90_Android": { displayName: "v1.21.90 (Android)", url: "/assets/zip/gui_mc-v1.21.90_Android.zip" },
        "v1.21.80_PC": { displayName: "v1.21.80 (PC)", url: "/assets/zip/gui_mc-v1.21.80_PC.zip" },
        "v1.21.80_Android": { displayName: "v1.21.80 (Android)", url: "/assets/zip/gui_mc-v1.21.80_Android.zip" },
        "v1.21.70-71_PC": { displayName: "v1.21.70/71 (PC)", url: "/assets/zip/gui_mc-v1.21.70-71_PC.zip" },
        "v1.21.70-71_Android": { displayName: "v1.21.70/71 (Android)", url: "/assets/zip/gui_mc-v1.21.70-71_Android.zip" },
        "v1.21.90-preview.21_PC": { displayName: "v1.21.90.21 Preview (PC)", url: "/assets/zip/gui_mc-v1.21.90-preview.21_PC.zip" },
        "v1.21.90-preview.20_PC": { displayName: "v1.21.90.20 Preview (PC)", url: "/assets/zip/gui_mc-v1.21.90-preview.20_PC.zip" },
        "v1.21.80-preview.27-28_PC": { displayName: "v1.21.80.27/28 Preview (PC)", url: "/assets/zip/gui_mc-v1.21.80-preview.27-28_PC.zip" },
        "v1.21.80-preview.25_PC": { displayName: "v1.21.80.25 Preview (PC)", url: "/assets/zip/gui_mc-v1.21.80-preview.25_PC.zip" },
        "v1.21.80-preview.20-22_PC": { displayName: "v1.21.80.20/21/22 Preview (PC)", url: "/assets/zip/gui_mc-v1.21.80-preview.20-22_PC.zip" },
    };
    /**
     * The version of the Ore UI Customizer.
     */
    OreUICustomizer.format_version = "1.2.1";
    /**
     * @type {File | undefined}
     */
    OreUICustomizer.zipFile = undefined;
    /**
     * @type {(zip.Entry)[] | undefined}
     */
    OreUICustomizer.zipFileEntries = undefined;
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
    OreUICustomizer.zipFs = undefined;
    /**
     * @type {keyof typeof currentPresets}
     */
    OreUICustomizer.currentPreset = "none";
    /**
     * @type {File}
     */
    OreUICustomizer.currentImportedFile = undefined;
    /**
     * @type {HTMLElement}
     */
    OreUICustomizer.currentColorPickerTarget = undefined;
    /**
     * The list of imported plugins for the Ore UI Customizer.
     *
     * @type {Plugin[]}
     */
    OreUICustomizer.importedPlugins = {};
    /**
     * The encoded list of the imported plugins for the Ore UI Customizer.
     *
     * @type {EncodedPluginData[]}
     */
    OreUICustomizer.encodedImportedPlugins = [];
    $(function onDocumentLoad() {
        $("body > *").on("dragenter", function (event) {
            event.preventDefault();
        });
        $("body > *").on("dragleave", function (event) {
            event.preventDefault();
        });
        $("body > *").on("dragover", function (event) {
            event.preventDefault();
        });
        $("body > *").on("drop", async function (event) {
            event.preventDefault();
            switch (event.originalEvent?.dataTransfer?.files[0]?.name.split(".").at(-1)?.toLowerCase()) {
                case "zip": {
                    // await updateZipFile(event.originalEvent?.dataTransfer?.files[0]!);
                    $("#file-import-input").prop("disabled", true);
                    $("#import_files_error").prop("hidden", true);
                    $("#apply_mods").prop("disabled", true);
                    $("#download").prop("disabled", true);
                    $("#download_in_new_tab_button").prop("disabled", true);
                    $("#download_in_new_tab_link_open_button").prop("disabled", true);
                    $("#download_in_new_tab_link").removeAttr("href");
                    OreUICustomizer.zipFile = event.originalEvent.dataTransfer.files[0];
                    OreUICustomizer.currentImportedFile = OreUICustomizer.zipFile;
                    $("#imported_file_name").css("color", "yellow");
                    $("#imported_file_name").text(`Imported file: ${OreUICustomizer.currentImportedFile.name} - ${formatFileSizeMetric(OreUICustomizer.currentImportedFile.size)} - (Validating...)`);
                    await validateZipFile();
                    $(this).val("");
                    $("#imported_file_name").css("color", "inherit");
                    $("#imported_file_name").text(`Imported file: ${OreUICustomizer.currentImportedFile.name} - ${formatFileSizeMetric(OreUICustomizer.currentImportedFile.size)}`);
                    $("#file-import-input").prop("disabled", false);
                    break;
                }
                case "mcouicplugin": {
                    try {
                        await validatePluginFile(event.originalEvent.dataTransfer.files[0], "mcouicplugin");
                    }
                    catch (e) {
                        const popupElement = document.createElement("mc-message-form-data");
                        popupElement.innerHTML = `<span slot="titleText">Failed to Import Plugin</span><span>Failed to import plugin. The following error occured: ${e?.stack ?? e}</span>`;
                        document.body.prepend(popupElement);
                        break;
                    }
                    break;
                }
                case "js": {
                    try {
                        const file = event.originalEvent.dataTransfer.files[0];
                        const objectURL = URL.createObjectURL(file);
                        await validatePluginFile(file, "js");
                        const data = await import(objectURL);
                        OreUICustomizer.importedPlugins[data.plugin.id] = data.plugin;
                        const dataURI = await blobToDataURI(file);
                        const encodedPluginIndex = OreUICustomizer.encodedImportedPlugins.findIndex((p) => p.id === data.plugin.id);
                        encodedPluginIndex !== -1 && OreUICustomizer.encodedImportedPlugins.splice(encodedPluginIndex, 1);
                        OreUICustomizer.encodedImportedPlugins.push({
                            dataURI,
                            fileType: "js",
                            id: data.plugin.id,
                            version: data.plugin.version,
                            name: data.plugin.name,
                            format_version: data.plugin.format_version,
                            namespace: data.plugin.namespace,
                            min_engine_version: data.plugin.min_engine_version,
                        });
                        updatePluginsList();
                        const popupElement = document.createElement("mc-message-form-data");
                        popupElement.innerHTML = `<span slot="titleText">Successfully Imported Plugin</span><span>The plugin ${data.plugin.name} v${data.plugin.version} has been successfully imported.</span>`;
                        document.body.prepend(popupElement);
                    }
                    catch (e) {
                        const popupElement = document.createElement("mc-message-form-data");
                        popupElement.innerHTML = `<span slot="titleText">Failed to Import Plugin</span><span>Failed to import plugin. The following error occured: ${e?.stack ?? e}</span>`;
                        document.body.prepend(popupElement);
                        break;
                    }
                    break;
                }
            }
        });
        $("#file-import-input").on("change", async function () {
            const files = $(this).prop("files");
            if (OreUICustomizer.currentPreset !== "none")
                return false;
            if (files.length === 0) {
                $("#imported_file_name").css("color", "red");
                $("#imported_file_name").text("No file imported.");
                return;
            }
            $("#file-import-input").prop("disabled", true);
            $("#import_files_error").prop("hidden", true);
            $("#apply_mods").prop("disabled", true);
            $("#download").prop("disabled", true);
            $("#download_in_new_tab_button").prop("disabled", true);
            $("#download_in_new_tab_link_open_button").prop("disabled", true);
            $("#download_in_new_tab_link").removeAttr("href");
            OreUICustomizer.zipFile = files[0];
            OreUICustomizer.currentImportedFile = OreUICustomizer.zipFile;
            $("#imported_file_name").css("color", "yellow");
            $("#imported_file_name").text(`Imported file: ${OreUICustomizer.currentImportedFile.name} - ${formatFileSizeMetric(OreUICustomizer.currentImportedFile.size)} - (Validating...)`);
            await validateZipFile();
            $(this).val("");
            $("#imported_file_name").css("color", "inherit");
            $("#imported_file_name").text(`Imported file: ${OreUICustomizer.currentImportedFile.name} - ${formatFileSizeMetric(OreUICustomizer.currentImportedFile.size)}`);
            $("#file-import-input").prop("disabled", false);
        });
        $("#plugin-import-input").on("change", async function () {
            const files = $(this).prop("files");
            switch (files[0]?.name.split(".").at(-1)?.toLowerCase()) {
                case "mcouicplugin": {
                    try {
                        await validatePluginFile(files[0], "mcouicplugin");
                    }
                    catch (e) {
                        const popupElement = document.createElement("mc-message-form-data");
                        popupElement.innerHTML = `<span slot="titleText">Failed to Import Plugin</span><span>Failed to import plugin. The following error occured: ${e?.stack ?? e}</span>`;
                        document.body.prepend(popupElement);
                        break;
                    }
                    break;
                }
                case "js": {
                    try {
                        const file = files[0];
                        const objectURL = URL.createObjectURL(file);
                        await validatePluginFile(file, "js");
                        const data = await import(objectURL);
                        OreUICustomizer.importedPlugins[data.plugin.id] = data.plugin;
                        const dataURI = await blobToDataURI(file);
                        const encodedPluginIndex = OreUICustomizer.encodedImportedPlugins.findIndex((p) => p.id === data.plugin.id);
                        encodedPluginIndex !== -1 && OreUICustomizer.encodedImportedPlugins.splice(encodedPluginIndex, 1);
                        OreUICustomizer.encodedImportedPlugins.push({
                            dataURI,
                            fileType: "js",
                            id: data.plugin.id,
                            version: data.plugin.version,
                            name: data.plugin.name,
                            format_version: data.plugin.format_version,
                            namespace: data.plugin.namespace,
                            min_engine_version: data.plugin.min_engine_version,
                        });
                        updatePluginsList();
                        const popupElement = document.createElement("mc-message-form-data");
                        popupElement.innerHTML = `<span slot="titleText">Successfully Imported Plugin</span><span>The plugin ${data.plugin.name} v${data.plugin.version} has been successfully imported.</span>`;
                        document.body.prepend(popupElement);
                    }
                    catch (e) {
                        const popupElement = document.createElement("mc-message-form-data");
                        popupElement.innerHTML = `<span slot="titleText">Failed to Import Plugin</span><span>Failed to import plugin. The following error occured: ${e?.stack ?? e}</span>`;
                        document.body.prepend(popupElement);
                        break;
                    }
                    break;
                }
            }
        });
        $("#hardcore_mode_toggle_always_clickable")
            .parent()
            .click(() => {
            saveSetting("hardcore_mode_toggle_always_clickable", $("#hardcore_mode_toggle_always_clickable").prop("checked"));
            if ($("#hardcore_mode_toggle_always_clickable").prop("checked")) {
                $(":root").addClass("hardcore_mode_toggle_always_clickable");
            }
            else {
                $(":root").removeClass("hardcore_mode_toggle_always_clickable");
            }
        });
        $("#hardcore_mode_toggle_always_clickable").click((e) => {
            e.preventDefault();
            $("#hardcore_mode_toggle_always_clickable").prop("checked", !$("#hardcore_mode_toggle_always_clickable").prop("checked"));
            saveSetting("hardcore_mode_toggle_always_clickable", $("#hardcore_mode_toggle_always_clickable").prop("checked"));
            if ($("#hardcore_mode_toggle_always_clickable").prop("checked")) {
                $(":root").addClass("hardcore_mode_toggle_always_clickable");
            }
            else {
                $(":root").removeClass("hardcore_mode_toggle_always_clickable");
            }
        });
        $("#options_box").submit(function () {
            return false;
        });
        const presetItemTemplate = $("#preset-item-template").prop("content");
        Object.entries(OreUICustomizer.currentPresets).forEach(([key, value]) => {
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
            if (selectedInput.value === OreUICustomizer.currentPreset)
                return;
            $("#download").prop("disabled", true);
            $("#download_in_new_tab_button").prop("disabled", true);
            $("#download_in_new_tab_link_open_button").prop("disabled", true);
            $("#download_in_new_tab_link").removeAttr("href");
            OreUICustomizer.currentPreset = selectedInput.value;
            $("#gui_preset").find(".guiPresetDropdownButtonSelectedOptionTextDisplay").text(OreUICustomizer.currentPresets[OreUICustomizer.currentPreset].displayName);
            if (selectedInput.value === "none") {
                $("#import_files_button").prop("disabled", false);
                $("#file-import-input").prop("disabled", false);
                OreUICustomizer.currentImportedFile = OreUICustomizer.zipFile;
                if (OreUICustomizer.currentImportedFile === undefined) {
                    $("#apply_mods").prop("disabled", true);
                    $("#imported_file_name").css("color", "red");
                    $("#imported_file_name").text("No file imported.");
                }
                else {
                    $("#imported_file_name").css("color", "yellow");
                    $("#imported_file_name").text(`Imported file: ${OreUICustomizer.currentImportedFile.name} - ${formatFileSizeMetric(OreUICustomizer.currentImportedFile.size)} - (Validating...)`);
                    await validateZipFile();
                    $("#imported_file_name").css("color", "inherit");
                    $("#imported_file_name").text(`Imported file: ${OreUICustomizer.currentImportedFile.name} - ${formatFileSizeMetric(OreUICustomizer.currentImportedFile.size)}`);
                    // $("#apply_mods").prop("disabled", false);
                }
            }
            else {
                $("#import_files_button").prop("disabled", true);
                $("#file-import-input").prop("disabled", true);
                $("#apply_mods").prop("disabled", true);
                OreUICustomizer.currentImportedFile = undefined;
                $("#imported_file_name").css("color", "orange");
                $("#imported_file_name").text(`Loading...`);
                const response = await fetch(OreUICustomizer.currentPresets[OreUICustomizer.currentPreset].url);
                if (response.status === 404) {
                    console.error(`404 while loading PRESET: ${OreUICustomizer.currentPresets[OreUICustomizer.currentPreset].displayName}`, OreUICustomizer.currentPresets[OreUICustomizer.currentPreset].url);
                    $("#imported_file_name").css("color", "red");
                    $("#imported_file_name").text(`Failed to load PRESET: ${OreUICustomizer.currentPresets[OreUICustomizer.currentPreset].displayName}`);
                    return;
                }
                OreUICustomizer.currentImportedFile = new File([await response.blob()], OreUICustomizer.currentPresets[OreUICustomizer.currentPreset].url.split("/").pop());
                $("#imported_file_name").css("color", "yellow");
                $("#imported_file_name").text(`Imported file: PRESET: ${OreUICustomizer.currentImportedFile.name} - ${formatFileSizeMetric(OreUICustomizer.currentImportedFile.size)} - (Validating...)`);
                // $("#apply_mods").prop("disabled", false);
                await validateZipFile();
                $("#imported_file_name").css("color", "inherit");
                $("#imported_file_name").text(`Imported file: PRESET: ${OreUICustomizer.currentImportedFile.name} - ${formatFileSizeMetric(OreUICustomizer.currentImportedFile.size)}`);
            }
        });
        $('input[name="customizer_settings_section"]').change(() => {
            try {
                if ($("#customizer_settings_section_radio_general").prop("checked")) {
                    $("#general_customizer_settings_section").get(0).style.display = "";
                    $("#colors_customizer_settings_section").get(0).style.display = "none";
                    $("#plugins_customizer_settings_section").get(0).style.display = "none";
                }
                else if ($("#customizer_settings_section_radio_colors").prop("checked")) {
                    $("#general_customizer_settings_section").get(0).style.display = "none";
                    $("#colors_customizer_settings_section").get(0).style.display = "";
                    $("#plugins_customizer_settings_section").get(0).style.display = "none";
                }
                else if ($("#customizer_settings_section_radio_plugins").prop("checked")) {
                    $("#general_customizer_settings_section").get(0).style.display = "none";
                    $("#colors_customizer_settings_section").get(0).style.display = "none";
                    $("#plugins_customizer_settings_section").get(0).style.display = "";
                }
                else {
                    $("#general_customizer_settings_section").get(0).style.display = "none";
                    $("#colors_customizer_settings_section").get(0).style.display = "none";
                    $("#plugins_customizer_settings_section").get(0).style.display = "none";
                }
            }
            catch (e) {
                console.error(e, e?.stack);
            }
        });
        // b.each((i, e)=>console.log([e, $(e), (()=>{try{return $(e).data()}catch{return 0;}})()]))
        $(".spectrum-colorpicker-color-override-option").each((i, element) => void $(element).spectrum({
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
                }
                catch (e) {
                    console.error(e, e?.stack);
                }
                OreUICustomizer.currentColorPickerTarget = element;
            },
            showAlpha: true,
            showInitial: true,
            showInput: true,
            showPalette: true,
            showSelectionPalette: true,
            localStorageKey: "ore-ui-customizer",
        }));
        $(".sp-picker-container").append(`<select class="spectrum-colorpicker-color-format-dropdown" onchange="$(currentColorPickerTarget).spectrum('option', 'preferredFormat', this.value); $(currentColorPickerTarget).spectrum('set', $(this).parent().find('.sp-input').val()); console.log(this.value);">
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
                    // console.log(scale, ui.size.width, ui.size.height, oreUIPreviewIframeWidth, oreUIPreviewIframeHeight);
                    oreUIPreviewIframe.css({
                        transform: `translate(${-(oreUIPreviewIframeWidth / 2 - ui.size.width / 2)}px, ${-(oreUIPreviewIframeHeight / 2 - ui.size.height / 2)}px) ` +
                            "scale(" +
                            scale +
                            ")",
                    });
                }
                catch (e) {
                    console.error(e, e?.stack);
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
            oreUIPreviewIframeContainer.on("resize", () => resize(null, {
                size: {
                    width: oreUIPreviewIframeContainer.width(),
                    height: oreUIPreviewIframeContainer.height(),
                },
            }));
        }
        catch (e) {
            console.error(e, e?.stack);
        }
    });
    /**
     * Changes the hue of a color.
     *
     * @param {string} rgb The hex color code to change the hue of.
     * @param {number} degree The degree to change the hue by.
     * @returns {string} The new hex color code with the hue shift applied.
     *
     * @see https://stackoverflow.com/a/17433060/16872762
     */
    function changeHue(rgb, degree) {
        var hsl = rgbToHSL(rgb);
        hsl.h += degree;
        if (hsl.h > 360) {
            hsl.h -= 360;
        }
        else if (hsl.h < 0) {
            hsl.h += 360;
        }
        return hslToRGB(hsl);
    }
    OreUICustomizer.changeHue = changeHue;
    /**
     * Converts a hex color code to HSL.
     *
     * @param {string} rgb The hex color code to convert to HSL.
     * @returns {{ h: number; s: number; l: number; }} The HSL values of the color.
     *
     * @see https://stackoverflow.com/a/17433060/16872762
     */
    function rgbToHSL(rgb) {
        // strip the leading # if it's there
        rgb = rgb.replace(/^\s*#|\s*$/g, "");
        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if (rgb.length == 3) {
            rgb = rgb.replace(/(.)/g, "$1$1");
        }
        var r = parseInt(rgb.substr(0, 2), 16) / 255, g = parseInt(rgb.substr(2, 2), 16) / 255, b = parseInt(rgb.substr(4, 2), 16) / 255, cMax = Math.max(r, g, b), cMin = Math.min(r, g, b), delta = cMax - cMin, l = (cMax + cMin) / 2, h = 0, s = 0;
        if (delta == 0) {
            h = 0;
        }
        else if (cMax == r) {
            h = 60 * (((g - b) / delta) % 6);
        }
        else if (cMax == g) {
            h = 60 * ((b - r) / delta + 2);
        }
        else {
            h = 60 * ((r - g) / delta + 4);
        }
        if (delta == 0) {
            s = 0;
        }
        else {
            s = delta / (1 - Math.abs(2 * l - 1));
        }
        return {
            h: h,
            s: s,
            l: l,
        };
    }
    OreUICustomizer.rgbToHSL = rgbToHSL;
    /**
     * Converts HSL values to a hex color code.
     *
     * @param {{ h: number; s: number; l: number }} hsl The HSL values.
     * @returns {string} The RGB hex code.
     *
     * @see https://stackoverflow.com/a/17433060/16872762
     */
    function hslToRGB(hsl) {
        var h = hsl.h, s = hsl.s, l = hsl.l, c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2, r, g, b;
        if (h < 60) {
            r = c;
            g = x;
            b = 0;
        }
        else if (h < 120) {
            r = x;
            g = c;
            b = 0;
        }
        else if (h < 180) {
            r = 0;
            g = c;
            b = x;
        }
        else if (h < 240) {
            r = 0;
            g = x;
            b = c;
        }
        else if (h < 300) {
            r = x;
            g = 0;
            b = c;
        }
        else {
            r = c;
            g = 0;
            b = x;
        }
        r = normalize_rgb_value(r, m);
        g = normalize_rgb_value(g, m);
        b = normalize_rgb_value(b, m);
        return rgbToHex(r, g, b);
    }
    OreUICustomizer.hslToRGB = hslToRGB;
    /**
     * Normalizes a color value.
     *
     * @param {number} color The color value to normalize.
     * @param {number} m UNDOCUMENTED
     * @returns {number} The normalized color value.
     *
     * @see https://stackoverflow.com/a/17433060/16872762
     */
    function normalize_rgb_value(color, m) {
        color = Math.floor((color + m) * 255);
        if (color < 0) {
            color = 0;
        }
        return color;
    }
    OreUICustomizer.normalize_rgb_value = normalize_rgb_value;
    /**
     * Converts RGB values to a hex color code.
     *
     * @param {number} r The red value of the color.
     * @param {number} g The green value of the color.
     * @param {number} b The blue value of the color.
     * @returns {string} The hex color code.
     *
     * @see https://stackoverflow.com/a/17433060/16872762
     */
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    OreUICustomizer.rgbToHex = rgbToHex;
    /**
     * Converts a hex color code to RGB.
     *
     * @param {string} hex The hex color code to convert to RGB.
     * @returns {{ r: number; g: number; b: number; } | null} The RGB values of the color, or null if the color is invalid.
     *
     * @author 8Crafter
     */
    function hexToRGB(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
    }
    OreUICustomizer.hexToRGB = hexToRGB;
    /**
     * A class for creating HTML RGB loading bars.
     */
    class HTMLRGBLoadingBar {
        targetElement;
        /**
         * Whether the loading bar is active or not.
         */
        #loadingBarActive = false;
        /**
         * Whether the loading bar should be stopped or not.
         */
        #stopLoadingBar = false;
        /**
         * Whether the loading bar is active or not.
         */
        get loadingBarActive() {
            return this.#loadingBarActive;
        }
        /**
         * Whether the loading bar is in the process of stopping or not.
         */
        get loadingBarIsStopping() {
            return this.#stopLoadingBar;
        }
        /**
         * Creates an instance of RGBLoadingBar.
         *
         * @param {HTMLElement} targetElement The element to apply the loading bar to.
         */
        constructor(targetElement) {
            this.targetElement = targetElement;
        }
        /**
         * Starts the loading bar.
         *
         * @returns {Promise<void>} A promise that resolves when the loading bar is stopped.
         *
         * @throws {Error} If the loading bar is already active.
         */
        async startLoadingBar(options = {}) {
            if (this.#loadingBarActive) {
                throw new Error("Loading bar is already active.");
            }
            /**
             * The width of the loading bar.
             *
             * This is how many characters the bar consists of.
             */
            const barWidth = options.barWidth ?? 40;
            /**
             * The hue span of the loading bar.
             *
             * This is how much the hue changes from the left side of the bar to the right side.
             */
            const hueSpan = options.hueSpan ?? 60;
            /**
             * The hue step of the loading bar.
             *
             * This is how much the hue is shifted each frame.
             */
            const hueStep = options.hueStep ?? 5;
            /**
             * The FPS of the loading bar animation.
             *
             * This is how many times per second the loading bar is updated, setting this too high may result in the loading bar having a buggy appearance.
             */
            const barAnimationFPS = options.barAnimationFPS ?? 10;
            this.#loadingBarActive = true;
            let i = 0;
            // let c = { r: 0, g: 255, b: 0 };
            while (!this.#stopLoadingBar) {
                i = (i + hueStep) % 360;
                if (i < 0) {
                    i += 360;
                }
                // c = hexToRGB(changeHue(rgbToHex(0, 255, 0), i))!;
                // const selectedColor = "rgb"[Math.floor(Math.random()*3)]! as "r" | "g" | "b";
                // c[selectedColor] = Math.floor(Math.random()*80);
                let str = "";
                for (let j = 0; j < barWidth; j++) {
                    // const charColor = [Math.floor(Math.abs(c.r - 40)/40*255), Math.floor(Math.abs(c.g - 40)/40*255), Math.floor(Math.abs(c.b - 40)/40*255)] as const;
                    // let colorValue: number = Math.max(Math.min(Math.floor((1 - /* Math.sqrt */ Math.abs(j - Math.abs(i - 40)) / 20) * 255), 255), 0);
                    // isNaN(colorValue) && (colorValue = 0);
                    // const charColor = [0, colorValue, 0] as const;
                    const c = hexToRGB(changeHue(rgbToHex(0, 255, 0), Math.abs(Math.floor((360 - i + (j / barWidth) * hueSpan) % 360))));
                    const charColor = [c.r, c.g, c.b];
                    str += `<span style="color: rgb(${charColor[0]}, ${charColor[1]}, ${charColor[2]})">█</span>`;
                }
                this.targetElement.innerHTML = str;
                await new Promise((resolve) => setTimeout(resolve, 1000 / barAnimationFPS));
            }
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(1);
            this.#loadingBarActive = false;
        }
        /**
         * Stops the loading bar.
         *
         * @returns {Promise<void>} A promise that resolves when the loading bar is stopped.
         */
        async stopLoadingBar() {
            this.#stopLoadingBar = true;
            while (this.#loadingBarActive) {
                await new Promise((resolve) => setTimeout(resolve, 10));
            }
            this.#stopLoadingBar = false;
        }
        /**
         * Waits until the loading bar is started.
         */
        async waitUntilLoadingBarIsStarted() {
            while (!this.#loadingBarActive) {
                await new Promise((resolve) => setTimeout(resolve, 10));
            }
        }
    }
    OreUICustomizer.HTMLRGBLoadingBar = HTMLRGBLoadingBar;
    /**
     * Updates the list of plugins.
     */
    function updatePluginsList() {
        $("#pluginCount").text(`${Object.keys(OreUICustomizer.importedPlugins).length} Plugin${Object.keys(OreUICustomizer.importedPlugins).length !== 1 ? "s" : ""}`);
        $("#plugin-list").children().remove();
        const pluginItemTemplate = $("#plugin-item-template").prop("content");
        for (const [thisKey, plugin] of Object.entries(OreUICustomizer.importedPlugins)) {
            const pluginItem = $(pluginItemTemplate).clone();
            $(pluginItem).find("[data-temp='pluginid']").text(`${plugin.id} (v${plugin.version})`);
            $(pluginItem).find("[data-temp='pluginname']").text(plugin.name);
            $(pluginItem).find("[data-temp]").removeAttr("data-temp");
            $(pluginItem)
                .find("button[name=delete]")
                .on("click", () => {
                delete OreUICustomizer.importedPlugins[thisKey];
                const encodedPluginIndex = OreUICustomizer.encodedImportedPlugins.findIndex((p) => p.id === plugin.id);
                encodedPluginIndex !== -1 && OreUICustomizer.encodedImportedPlugins.splice(encodedPluginIndex, 1);
                updatePluginsList();
            });
            $("#plugin-list").append(pluginItem);
        }
    }
    OreUICustomizer.updatePluginsList = updatePluginsList;
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
            OreUICustomizer.zipFs = new zip.fs.FS();
            await OreUICustomizer.zipFs.importBlob(OreUICustomizer.currentImportedFile);
        }
        catch (e) {
            failed = 1;
            console.error(e);
            $("#import_files_error").css("color", "red");
            $("#import_files_error").text(`Invalid zip file. ${e + e?.stack}`);
            return false;
        }
        if (!OreUICustomizer.currentImportedFile)
            return false;
        try {
            if (!failed && OreUICustomizer.zipFs.entries.findIndex((entry) => entry.data?.filename === "gui/") === -1) {
                failed = 1;
                if (OreUICustomizer.zipFs.entries.findIndex((entry) => entry.data?.filename === "dist/") !== -1) {
                    // Repair the zip directory structure.
                    OreUICustomizer.zipFs.move(OreUICustomizer.zipFs.entries.find((entry) => entry.data?.filename === "dist/"), OreUICustomizer.zipFs.addDirectory("gui")); // adding a / to the end of the string for addDirectory causes it to show "Local Disk" inside of the zip file on windows.
                    failed = 2;
                    $("#import_files_error").css("color", "yellow");
                    $("#import_files_error").text(`Your zip file folder structure was invalid, but was repaired. It was supposed have the entire gui/ folder in the root of the zip file. NOT just the contents of it. Your .zip file was structured ${OreUICustomizer.currentImportedFile.name}/dist/hbui/** instead of ${OreUICustomizer.currentImportedFile.name}/gui/dist/hbui/**. You had zipped the dist folder instead of the gui folder.`);
                    $("#import_files_error").prop("hidden", false); /*
                $("#import_files_error").text(
                    `Invalid zip file folder structure. You must have the entire gui/ folder in the root of the zip file. NOT just the contents of it. Your .zip file is structured ${currentImportedFile.name}/dist/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You have zipped the dist folder instead of the gui folder.`
                );
                $("#apply_mods").prop("disabled", true);
                $("#download").prop("disabled", true);
                $("#download_in_new_tab_button").prop("disabled", true);
        $("#download_in_new_tab_link_open_button").prop("disabled", true);
        $("#download_in_new_tab_link").removeAttr("href"); */
                }
                else if (OreUICustomizer.zipFs.entries.findIndex((entry) => entry.data?.filename === "hbui/") !== -1) {
                    // Repair the zip directory structure.
                    OreUICustomizer.zipFs.move(OreUICustomizer.zipFs.entries.find((entry) => entry.data?.filename === "hbui/"), OreUICustomizer.zipFs.addDirectory("gui/dist"));
                    failed = 2;
                    $("#import_files_error").css("color", "yellow");
                    $("#import_files_error").text(`Your zip file folder structure was invalid, but was repaired. It was supposed have the entire gui/ folder in the root of the zip file. NOT just the contents of the contents of it. Your .zip file was structured ${OreUICustomizer.currentImportedFile.name}/hbui/** instead of ${OreUICustomizer.currentImportedFile.name}/gui/dist/hbui/**. You had zipped the hbui folder instead of the gui folder.`);
                    $("#import_files_error").prop("hidden", false); /*
                $("#import_files_error").text(
                    `Invalid zip file folder structure. You must have the entire gui/ folder in the root of the zip file. NOT just the contents of it. Your .zip file is structured ${currentImportedFile.name}/dist/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You have zipped the dist folder instead of the gui folder.`
                );
                $("#apply_mods").prop("disabled", true);
                $("#download").prop("disabled", true);
                $("#download_in_new_tab_button").prop("disabled", true);
        $("#download_in_new_tab_link_open_button").prop("disabled", true);
        $("#download_in_new_tab_link").removeAttr("href"); */ /*
                            $("#import_files_error").css("color", "red");
                            $("#import_files_error").text(
                                `Invalid zip file folder structure. You must have the entire gui/ folder in the root of the zip file. NOT just the contents of the contents of it. Your .zip file is structured ${currentImportedFile.name}/hbui/** instead of ${currentImportedFile.name}/gui/dist/hbui/**. You have zipped the hbui folder instead of the gui folder.`
                            );
                            $("#import_files_error").prop("hidden", false);
                            $("#apply_mods").prop("disabled", true);
                            $("#download").prop("disabled", true);
                            $("#download_in_new_tab_button").prop("disabled", true);
                    $("#download_in_new_tab_link_open_button").prop("disabled", true);
                    $("#download_in_new_tab_link").removeAttr("href"); */
                }
                else {
                    $("#import_files_error").css("color", "red");
                    $("#import_files_error").text(`Invalid zip file folder structure. Missing gui/ folder. The gui/ folder must be at the root of the zip file.`);
                    $("#import_files_error").prop("hidden", false);
                }
            }
        }
        catch (e) {
            failed = 1;
            console.error(e);
            $("#import_files_error").css("color", "red");
            $("#import_files_error").text(`Invalid zip file. Error while parsing directory structure: ${e + e?.stack}`);
            $("#import_files_error").prop("hidden", false);
        }
        if (failed === 1) {
            $("#apply_mods").prop("disabled", true);
            return false;
        }
        else if (failed === 2) {
            $("#apply_mods").prop("disabled", false);
            return true;
        }
        else {
            $("#import_files_error").css("color", "red");
            $("#import_files_error").text("");
            $("#import_files_error").prop("hidden", true);
            $("#apply_mods").prop("disabled", false);
            return true;
        }
    }
    OreUICustomizer.validateZipFile = validateZipFile;
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
             * This will allow you to change the flat world preset, even after the world has been created.
             *
             * Note: This option requires that the {@link addGeneratorTypeDropdown} option is enabled.
             *
             * @type {boolean}
             */
            allowForChangingFlatWorldPreset: $("#allow_for_changing_flat_world_preset").prop("checked") && $("#add_generator_type_dropdown").prop("checked"),
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
            enabledBuiltInPlugins: {
                "add-exact-ping-count-to-servers-tab": true,
                "add-max-player-count-to-servers-tab": true,
                "facet-spy": true,
            },
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
                "#a0e081": $("#colors_customizer_settings_section_green10").val() ?? "#a0e081",
                "#86d562": $("#colors_customizer_settings_section_green20").val() ?? "#86d562",
                "#6cc349": $("#colors_customizer_settings_section_green30").val() ?? "#6cc349",
                "#52a535": $("#colors_customizer_settings_section_green40").val() ?? "#52a535",
                "#3c8527": $("#colors_customizer_settings_section_green50").val() ?? "#3c8527",
                "#2a641c": $("#colors_customizer_settings_section_green60").val() ?? "#2a641c",
                "#1d4d13": $("#colors_customizer_settings_section_green70").val() ?? "#1d4d13",
                "#153a0e": $("#colors_customizer_settings_section_green80").val() ?? "#153a0e",
                "#112f0b": $("#colors_customizer_settings_section_green90").val() ?? "#112f0b",
                "#0f2b0a": $("#colors_customizer_settings_section_green100").val() ?? "#0f2b0a",
                "#ffffff": $("#colors_customizer_settings_section_white").val() ?? "#ffffff",
                "#000000": $("#colors_customizer_settings_section_black").val() ?? "#000000",
                "#f4f6f9": $("#colors_customizer_settings_section_gray10").val() ?? "#f4f6f9",
                "#e6e8eb": $("#colors_customizer_settings_section_gray20").val() ?? "#e6e8eb",
                "#d0d1d4": $("#colors_customizer_settings_section_gray30").val() ?? "#d0d1d4",
                "#b1b2b5": $("#colors_customizer_settings_section_gray40").val() ?? "#b1b2b5",
                "#8c8d90": $("#colors_customizer_settings_section_gray50").val() ?? "#8c8d90",
                "#58585a": $("#colors_customizer_settings_section_gray60").val() ?? "#58585a",
                "#48494a": $("#colors_customizer_settings_section_gray70").val() ?? "#48494a",
                "#313233": $("#colors_customizer_settings_section_gray80").val() ?? "#313233",
                "#242425": $("#colors_customizer_settings_section_gray90").val() ?? "#242425",
                "#1e1e1f": $("#colors_customizer_settings_section_gray100").val() ?? "#1e1e1f",
                "#ff8080": $("#colors_customizer_settings_section_red10").val() ?? "#ff8080",
                "#d93636": $("#colors_customizer_settings_section_red20").val() ?? "#d93636",
                "#b31b1b": $("#colors_customizer_settings_section_red30").val() ?? "#b31b1b",
                "#d54242": $("#colors_customizer_settings_section_red40").val() ?? "#d54242",
                "#ca3636": $("#colors_customizer_settings_section_red50").val() ?? "#ca3636",
                "#c02d2d": $("#colors_customizer_settings_section_red60").val() ?? "#c02d2d",
                "#b62525": $("#colors_customizer_settings_section_red70").val() ?? "#b62525",
                "#ad1d1d": $("#colors_customizer_settings_section_red80").val() ?? "#ad1d1d",
                "#a31616": $("#colors_customizer_settings_section_red90").val() ?? "#a31616",
                "#990f0f": $("#colors_customizer_settings_section_red100").val() ?? "#990f0f",
                "#ffb366": $("#colors_customizer_settings_section_orange10").val() ?? "#ffb366",
                "#d3791f": $("#colors_customizer_settings_section_orange20").val() ?? "#d3791f",
                "#a65b11": $("#colors_customizer_settings_section_orange30").val() ?? "#a65b11",
                "#ffe866": $("#colors_customizer_settings_section_yellow10").val() ?? "#ffe866",
                "#e5c317": $("#colors_customizer_settings_section_yellow20").val() ?? "#e5c317",
                "#8a7500": $("#colors_customizer_settings_section_yellow30").val() ?? "#8a7500",
                "#fff0c5": $("#colors_customizer_settings_section_gold10").val() ?? "#fff0c5",
                "#ffd783": $("#colors_customizer_settings_section_gold20").val() ?? "#ffd783",
                "#f8af2b": $("#colors_customizer_settings_section_gold30").val() ?? "#f8af2b",
                "#ce8706": $("#colors_customizer_settings_section_gold40").val() ?? "#ce8706",
                "#ae7100": $("#colors_customizer_settings_section_gold50").val() ?? "#ae7100",
                "#8cb3ff": $("#colors_customizer_settings_section_blue10").val() ?? "#8cb3ff",
                "#2e6be5": $("#colors_customizer_settings_section_blue20").val() ?? "#2e6be5",
                "#1452cc": $("#colors_customizer_settings_section_blue30").val() ?? "#1452cc",
                "rgba(0, 0, 0, 0.1)": $("#colors_customizer_settings_section_blackOpacity10").val() ?? "rgba(0, 0, 0, 0.1)",
                "rgba(0, 0, 0, 0.2)": $("#colors_customizer_settings_section_blackOpacity20").val() ?? "rgba(0, 0, 0, 0.2)",
                "rgba(0, 0, 0, 0.25)": $("#colors_customizer_settings_section_blackOpacity25").val() ?? "rgba(0, 0, 0, 0.25)",
                "rgba(0, 0, 0, 0.3)": $("#colors_customizer_settings_section_blackOpacity30").val() ?? "rgba(0, 0, 0, 0.3)",
                "rgba(0, 0, 0, 0.4)": $("#colors_customizer_settings_section_blackOpacity40").val() ?? "rgba(0, 0, 0, 0.4)",
                "rgba(0, 0, 0, 0.5)": $("#colors_customizer_settings_section_blackOpacity50").val() ?? "rgba(0, 0, 0, 0.5)",
                "rgba(0, 0, 0, 0.6)": $("#colors_customizer_settings_section_blackOpacity60").val() ?? "rgba(0, 0, 0, 0.6)",
                "rgba(0, 0, 0, 0.7)": $("#colors_customizer_settings_section_blackOpacity70").val() ?? "rgba(0, 0, 0, 0.7)",
                "rgba(0, 0, 0, 0.8)": $("#colors_customizer_settings_section_blackOpacity80").val() ?? "rgba(0, 0, 0, 0.8)",
                "rgba(0, 0, 0, 0.9)": $("#colors_customizer_settings_section_blackOpacity90").val() ?? "rgba(0, 0, 0, 0.9)",
                "rgba(0, 0, 0, 1)": $("#colors_customizer_settings_section_blackOpacity100").val() ?? "rgba(0, 0, 0, 1)",
                "rgba(255, 255, 255, 0.1)": $("#colors_customizer_settings_section_whiteOpacity10").val() ?? "rgba(255, 255, 255, 0.1)",
                "rgba(255, 255, 255, 0.2)": $("#colors_customizer_settings_section_whiteOpacity20").val() ?? "rgba(255, 255, 255, 0.2)",
                "rgba(255, 255, 255, 0.3)": $("#colors_customizer_settings_section_whiteOpacity30").val() ?? "rgba(255, 255, 255, 0.3)",
                "rgba(255, 255, 255, 0.4)": $("#colors_customizer_settings_section_whiteOpacity40").val() ?? "rgba(255, 255, 255, 0.4)",
                "rgba(255, 255, 255, 0.5)": $("#colors_customizer_settings_section_whiteOpacity50").val() ?? "rgba(255, 255, 255, 0.5)",
                "rgba(255, 255, 255, 0.6)": $("#colors_customizer_settings_section_whiteOpacity60").val() ?? "rgba(255, 255, 255, 0.6)",
                "rgba(255, 255, 255, 0.7)": $("#colors_customizer_settings_section_whiteOpacity70").val() ?? "rgba(255, 255, 255, 0.7)",
                "rgba(255, 255, 255, 0.8)": $("#colors_customizer_settings_section_whiteOpacity80").val() ?? "rgba(255, 255, 255, 0.8)",
                "rgba(255, 255, 255, 0.9)": $("#colors_customizer_settings_section_whiteOpacity90").val() ?? "rgba(255, 255, 255, 0.9)",
                "#FB95E2": $("#colors_customizer_settings_section_pink10").val() ?? "#FB95E2",
                "#FFB1EC": $("#colors_customizer_settings_section_pink20").val() ?? "#FFB1EC",
                "#E833C2": $("#colors_customizer_settings_section_pink30").val() ?? "#E833C2",
                "#F877DC": $("#colors_customizer_settings_section_pink40").val() ?? "#F877DC",
                "#643ACB": $("#colors_customizer_settings_section_purple40").val() ?? "#643ACB",
                "#AC90F3": $("#colors_customizer_settings_section_deepBlue10").val() ?? "#AC90F3",
                "#9471E0": $("#colors_customizer_settings_section_deepBlue20").val() ?? "#9471E0",
                "#8557F8": $("#colors_customizer_settings_section_deepBlue40").val() ?? "#8557F8",
                "#7345E5": $("#colors_customizer_settings_section_deepBlue50").val() ?? "#7345E5",
                "#5D2CC6": $("#colors_customizer_settings_section_deepBlue60").val() ?? "#5D2CC6",
                "#4A1CAC": $("#colors_customizer_settings_section_deepBlue70").val() ?? "#4A1CAC",
                "#050029": $("#colors_customizer_settings_section_deepBlue100").val() ?? "#050029",
                "rgba(5, 0, 41, 0.5)": $("#colors_customizer_settings_section_deepBlueOpacity50").val() ?? "rgba(5, 0, 41, 0.5)",
            },
        };
    }
    OreUICustomizer.getSettings = getSettings;
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
            }
            else if (val < 0) {
                val = 360 + (val % 360);
            }
            elem.spectrum("set", str.replace(/(?<=\()[0-9.]+(?=, )/, String(val)));
        }
        if (filterOptions.saturationShift) {
            const str = elem.spectrum("get").toHsvString();
            elem.spectrum("set", str.replace(/(?<=\([0-9.]+, )[0-9.]+(?=, )/, String(Math.min(100, Math.max(0, Number(str.match(/(?<=\([0-9.]+, )[0-9.]+(?=, )/)[0]) + filterOptions.saturationShift)))));
        }
        if (filterOptions.lightnessShift) {
            const str = elem.spectrum("get").toHslString();
            elem.spectrum("set", str.replace(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/, String(Math.min(100, Math.max(0, Number(str.match(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/)[0]) + filterOptions.lightnessShift)))));
        }
        if (filterOptions.brightnessShift) {
            const str = elem.spectrum("get").toHsvString();
            elem.spectrum("set", str.replace(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/, String(Math.min(100, Math.max(0, Number(str.match(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/)[0]) + filterOptions.brightnessShift)))));
        }
        if (filterOptions.redShift) {
            const str = elem.spectrum("get").toRgbString();
            elem.spectrum("set", str.replace(/(?<=\()[0-9.]+(?=\))/, String(Math.min(255, Math.max(0, Number(str.match(/(?<=\()[0-9.]+(?=, )/)[0]) + filterOptions.redShift)))));
        }
        if (filterOptions.greenShift) {
            const str = elem.spectrum("get").toRgbString();
            elem.spectrum("set", str.replace(/(?<=\([0-9.]+, )[0-9.]+(?=, )/, String(Math.min(255, Math.max(0, Number(str.match(/(?<=\([0-9.]+, )[0-9.]+(?=, )/)[0]) + filterOptions.greenShift)))));
        }
        if (filterOptions.blueShift) {
            const str = elem.spectrum("get").toRgbString();
            elem.spectrum("set", str.replace(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/, String(Math.min(255, Math.max(0, Number(str.match(/(?<=\([0-9.]+, [0-9.]+, )[0-9.]+(?=[,\)])/)[0]) + filterOptions.blueShift)))));
        }
        if (filterOptions.alphaShift) {
            const str = elem.spectrum("get").toRgbString();
            if (str.startsWith("rgba")) {
                elem.spectrum("set", str.replace(/(?<=, )[0-9.]+(?=\))/, String(Math.min(1, Math.max(0, Number(str.match(/(?<=, )[0-9.]+(?=\))/)[0]) + filterOptions.alphaShift)))));
            }
            else {
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
            }
            else {
                elem.spectrum("set", str.replace("rgb(", "rgba(").replace(")", String(filterOptions.setAlpha) + ")"));
            }
        }
    }
    OreUICustomizer.applyColorFilterToColorOverride = applyColorFilterToColorOverride;
    function stringToRegexString(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    OreUICustomizer.stringToRegexString = stringToRegexString;
    function makeRegexRobustToWhitespace(regexString) {
        return regexString.replace(/\s+/g, "\\s*");
    }
    OreUICustomizer.makeRegexRobustToWhitespace = makeRegexRobustToWhitespace;
    async function refreshOreUIPreview(menuHTMLFileName = "index_playscreen_worldstab.html") {
        const newData = {
            newHTML: await fetch(`../assets/ore-ui-customizer-preview/${menuHTMLFileName}`).then((response) => response.text()),
            newIndexCSS: await fetch("../assets/ore-ui-customizer-preview/index-ffb39.css").then((response) => response.text()),
            // newGameplayCSS: await fetch("../assets/ore-ui-customizer-preview/gameplay-41f5f.css").then((response) => response.text()),
            // newEditorCSS: await fetch("../assets/ore-ui-customizer-preview/editor-7ac5c.css").then((response) => response.text()),
            newMenusThemeCSS: await fetch("../assets/ore-ui-customizer-preview/menus-theme.css").then((response) => response.text()),
            newGameplayThemeCSS: await fetch("../assets/ore-ui-customizer-preview/gameplay-theme.css").then((response) => response.text()),
            newCustomOverlaysCSS: await fetch("../assets/ore-ui-customizer-preview/customOverlays.css").then((response) => response.text()),
            oreUICustomizer8CrafterConfigJS: await fetch("../assets/ore-ui-customizer-preview/oreUICustomizer8CrafterConfig.js").then((response) => response.text()),
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
                if (color === replacementColor)
                    continue;
                newData[key] = newData[key].replaceAll(color, replacementColor);
            }
        }
        newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/index-ffb39.css`, `data:text/css;base64,${btoa(newData.newIndexCSS)}`);
        // newData.newHTML = newData.newHTML.replaceAll(`./gameplay-41f5f.css`, `data:text/css;base64,${btoa(newData.newGameplayCSS)}`);
        // newData.newHTML = newData.newHTML.replaceAll(`./editor-7ac5c.css`, `data:text/css;base64,${btoa(newData.newEditorCSS)}`);
        newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/menus-theme.css`, `data:text/css;base64,${btoa(newData.newMenusThemeCSS)}`);
        newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/gameplay-theme.css`, `data:text/css;base64,${btoa(newData.newGameplayThemeCSS)}`);
        newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/customOverlays.css`, `data:text/css;base64,${btoa(newData.newCustomOverlaysCSS)}`);
        newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/oreUICustomizer8CrafterConfig.js`, `data:text/javascript,${encodeURIComponent(newData.oreUICustomizer8CrafterConfigJS)}`);
        newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/class_path.js`, `data:text/javascript,${encodeURIComponent(newData.classPathJS)}`);
        newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/css.js`, `data:text/javascript,${encodeURIComponent(newData.cssJS)}`);
        newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/customOverlays.js`, `data:text/javascript,${encodeURIComponent(newData.customOverlaysJS)}`);
        newData.newHTML = newData.newHTML.replaceAll(`/assets/ore-ui-customizer-preview/index-d6df7.js`, `data:text/javascript,${encodeURIComponent(newData.indexJS)}`);
        // $("#ore-ui-preview-iframe").contents().remove();
        /** @type {HTMLIFrameElement} */
        const iframe = $("#ore-ui-preview-iframe").get(0);
        iframe.srcdoc = newData.newHTML;
        // $("#ore-ui-preview-iframe").contents().find("body").css("--base1Scale", "2px");
    }
    OreUICustomizer.refreshOreUIPreview = refreshOreUIPreview;
    /**
     * Exports the current config as a JSON file.
     */
    function exportConfigFile() {
        const settings = getSettings();
        settings.plugins = OreUICustomizer.encodedImportedPlugins;
        const config = {
            oreUICustomizerConfig: settings,
            oreUICustomizerVersion: OreUICustomizer.format_version,
        };
        const stringifiedConfig = JSON.stringify(config, null, 4);
        const blob = new Blob([stringifiedConfig], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ore-ui-customizer-config.json";
        a.click();
        URL.revokeObjectURL(url);
    }
    OreUICustomizer.exportConfigFile = exportConfigFile;
    async function applyMods() {
        $("#apply_mods").prop("disabled", true);
        $("#current_customizer_status").text("Validating zip file...");
        $("#download").prop("disabled", true);
        $("#download_in_new_tab_button").prop("disabled", true);
        $("#download_in_new_tab_link_open_button").prop("disabled", true);
        $("#download_in_new_tab_link").removeAttr("href");
        $("#customizer_loading_bar").show();
        if (!(await validateZipFile())) {
            console.error("applyMods - validateZipFile failed");
            return false;
        }
        $("#apply_mods").prop("disabled", true);
        $("#current_customizer_status").text("Applying mods...");
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
        if (!OreUICustomizer.zipFs)
            return false;
        /**
         * The list of plugins to apply.
         */
        const plugins = [...builtInPlugins, ...Object.values(OreUICustomizer.importedPlugins)];
        $("#current_customizer_status").text("Applying mods (Modifying files)...");
        for (const entry of OreUICustomizer.zipFs.entries) {
            if (/^(gui\/)?dist\/hbui\/assets\/[^\/]*?%40/.test(entry.data?.filename)) {
                let origName = entry.name;
                entry.rename(entry.name.split("/").pop().replaceAll("%40", "@"));
                console.log(`Entry ${origName} has been successfully renamed to ${entry.name}.`);
                modifiedCount++;
                renamedCount++;
            }
            else if (!/^(gui\/)?dist\/hbui\/[^\/]+\.(js|html|css)$/.test(entry.data?.filename)) {
                if (entry.directory !== void false) {
                    unmodifiedCount++;
                }
                else if (/\.(txt|md|js|jsx|html|css|json|jsonc|jsonl)$/.test(entry.data?.filename.toLowerCase())) {
                    /**
                     * @type {string}
                     */
                    const origData = await entry.getText();
                    let distData = origData;
                    /**
                     * @type {string[]}
                     */
                    let failedReplaces = [];
                    for (const plugin of plugins) {
                        if (plugin.namespace !== "built-in" ||
                            (settings.enabledBuiltInPlugins[plugin.id] ?? true)) {
                            for (const action of plugin.actions) {
                                if (action.context !== "per_text_file")
                                    continue;
                                try {
                                    distData = await action.action(distData, entry, OreUICustomizer.zipFs);
                                }
                                catch (e) {
                                    console.error(e, e?.stack);
                                    failedReplaces.push(`${plugin.namespace !== "built-in" ? `${plugin.namespace}:` : ""}${plugin.id}:${action.id}`);
                                }
                            }
                        }
                    }
                    if (failedReplaces.length > 0)
                        allFailedReplaces[entry.data?.filename] = failedReplaces;
                    if (origData !== distData) {
                        if (entry.data?.filename.endsWith(".js")) {
                            distData = `// Modified by 8Crafter's Ore UI Customizer v${OreUICustomizer.format_version}: https://www.8crafter.com/utilities/ore-ui-customizer\n// Options: ${JSON.stringify({ ...settings, plugins: settings.plugins?.map((plugin) => ({ ...plugin, dataURI: "..." })) })}\n${distData}`;
                        }
                        else if (entry.data?.filename.endsWith(".css")) {
                            distData = `/* Modified by 8Crafter's Ore UI Customizer v${OreUICustomizer.format_version}: https://www.8crafter.com/utilities/ore-ui-customizer */\n/* Options: ${JSON.stringify({ ...settings, plugins: settings.plugins?.map((plugin) => ({ ...plugin, dataURI: "..." })) })} */\n${distData}`;
                        }
                        else if (entry.data?.filename.endsWith(".html")) {
                            distData = `<!-- Modified by 8Crafter's Ore UI Customizer v${OreUICustomizer.format_version}: https://www.8crafter.com/utilities/ore-ui-customizer -->\n<!-- Options: ${JSON.stringify({ ...settings, plugins: settings.plugins?.map((plugin) => ({ ...plugin, dataURI: "..." })) })} -->\n${distData}`;
                        }
                        entry.replaceText(distData);
                        console.log(`Entry ${entry.name} has been successfully modified.`);
                        modifiedCount++;
                        editedCount++;
                    }
                    else {
                        // log(`Entry ${entry.name} has not been modified.`);
                        unmodifiedCount++;
                    }
                }
                else {
                    /**
                     * @type {Blob}
                     */
                    const origData = await entry.getBlob();
                    let distData = origData;
                    /**
                     * @type {string[]}
                     */
                    let failedReplaces = [];
                    for (const plugin of plugins) {
                        if (plugin.namespace !== "built-in" ||
                            (settings.enabledBuiltInPlugins[plugin.id] ?? true)) {
                            for (const action of plugin.actions) {
                                if (action.context !== "per_binary_file")
                                    continue;
                                try {
                                    distData = await action.action(distData, entry, OreUICustomizer.zipFs);
                                }
                                catch (e) {
                                    console.error(e, e?.stack);
                                    failedReplaces.push(`${plugin.namespace !== "built-in" ? `${plugin.namespace}:` : ""}${plugin.id}:${action.id}`);
                                }
                            }
                        }
                    }
                    if (failedReplaces.length > 0)
                        allFailedReplaces[entry.data?.filename] = failedReplaces;
                    if (!arrayBuffersAreEqual(await origData.arrayBuffer(), await distData.arrayBuffer())) {
                        entry.replaceBlob(distData);
                        console.log(`Entry ${entry.name} has been successfully modified.`);
                        modifiedCount++;
                        editedCount++;
                    }
                    else {
                        // log(`Entry ${entry.name} has not been modified.`);
                        unmodifiedCount++;
                    }
                }
            }
            else if (entry.data?.filename.endsWith("oreUICustomizer8CrafterConfig.js")) {
                unmodifiedCount++;
            }
            else if (entry.directory === void false) {
                /**
                 * The original data.
                 *
                 * @type {string}
                 */
                const origData = await entry.getText();
                /**
                 * The modified data.
                 */
                let distData = origData;
                /**
                 * The list of failed replaces.
                 *
                 * @type {string[]}
                 */
                let failedReplaces = [];
                /**
                 * The extracted symbol names.
                 */
                let extractedSymbolNames = getExtractedSymbolNames(origData);
                /**
                 * Lists of regexes to use for certain modifications.
                 */
                const replacerRegexes = getReplacerRegexes(extractedSymbolNames);
                if (settings.hardcoreModeToggleAlwaysClickable) {
                    let successfullyReplaced = false;
                    for (const regex of replacerRegexes.hardcoreModeToggleAlwaysClickable[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, `/**
             * The hardcore mode toggle.
             *
             * @param {Object} param0
             * @param {unknown} param0.generalData
             * @param {boolean} param0.isLockedTemplate
             */
            function $1({ generalData, isLockedTemplate: isLockedTemplate }) {
                const { t: $12 } = $2("CreateNewWorld.general"),
                    $3 = $4(),
                    oAA = (0, ${extractedSymbolNames.contextHolder}.useContext)($5) === $6.CREATE,
                    iAA = (0, ${extractedSymbolNames.facetHolder}.useSharedFacet)($7),
                    cAA = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((generalData, isLockedTemplate, $12) => $12 || isLockedTemplate || !oAA || (generalData.gameMode !== $8.SURVIVAL && generalData.gameMode !== $9.ADVENTURE), [oAA], [generalData, isLockedTemplate, iAA]);
                return ${extractedSymbolNames.contextHolder}.createElement($10, {
                    title: $11(".hardcoreModeTitle"),
                    soundEffectPressed: "ui.hardcore_toggle_press",
                    disabled: false /* cAA */, // Modified to make the hardcore mode toggle always be enabled.
                    description: $12(".hardcoreModeDescription"),
                    value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((generalData) => generalData.isHardcore, [], [generalData]),
                    onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                        (generalData) => (value) => {
                            (generalData.isHardcore = value), $3(value ? "ui.hardcore_enable" : "ui.hardcore_disable");
                        },
                        [$3],
                        [generalData]
                    ),
                    gamepad: { index: 4 },
                    imgSrc: $13,
                    "data-testid": "hardcore-mode-toggle",
                });
            }`);
                            successfullyReplaced = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5,20}\.js$/.test(entry.data?.filename) && !successfullyReplaced) {
                        failedReplaces.push("hardcoreModeToggleAlwaysClickable");
                    }
                }
                if (settings.allowDisablingEnabledExperimentalToggles) {
                    let successfullyReplaced = false;
                    for (const regex of replacerRegexes.allowDisablingEnabledExperimentalToggles[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, `/**
             * Handles the gneration of an experimental toggle, and the education edition toggle.
             *
             * @param {object} param0
             * @param {unknown} param0.experimentalFeature
             * @param {unknown} param0.gamepadIndex
             * @param {boolean} [param0.disabled]
             * @param {unknown} param0.achievementsDisabledMessages
             * @param {unknown} param0.areAllTogglesDisabled
             */
            function $1({ experimentalFeature, gamepadIndex: tAA, disabled: $2AA, achievementsDisabledMessages: $3AA, areAllTogglesDisabled: $4AA }) {
                const { gt: $5AA } = (function () {
                        const { translate, formatDate } = (0, ${extractedSymbolNames.contextHolder}.useContext)($6);
                        return (0, ${extractedSymbolNames.contextHolder}.useMemo)(
                            () => ({
                                f: { formatDate },
                                gt: (tAB, $2AA) => {
                                    var $3AA;
                                    return null !== ($3AA = translate(tAB, $2AA)) && void 0 !== $3AA ? $3AA : tAB;
                                },
                            }),
                            [translate, formatDate]
                        );
                    })(),
                    { t: cAA } = ${extractedSymbolNames.translationStringResolver}("CreateNewWorld.all"),
                    $7AA = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((eAB) => eAB.id, [], [experimentalFeature]),
                    $8AA = (0, ${extractedSymbolNames.facetHolder}.useFacetUnwrap)($7AA),
                    $9AA = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((eAB) => eAB.title, [], [experimentalFeature]),
                    $10AA = (0, ${extractedSymbolNames.facetHolder}.useFacetUnwrap)($9AA),
                    $11AA = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((eAB) => eAB.description, [], [experimentalFeature]),
                    $12AA = (0, ${extractedSymbolNames.facetHolder}.useFacetUnwrap)($11AA),
                    $13AA = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((eAB) => eAB.isEnabled, [], [experimentalFeature]),
                    $14AA = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((eAB, tAB) => eAB || tAB.isTogglePermanentlyDisabled, [], [(0, ${extractedSymbolNames.facetHolder}.useFacetWrap)(false /* $2AA */), experimentalFeature]), // Modified
                    $15AA = (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                        (eAB, tAB) => ($2AA) => {
                            $2AA && tAB
                                ? $16AA.set({ userTriedToActivateToggle: !0, doSetToggleValue: () => (eAB.isEnabled = $2AA), userHasAcceptedBetaFeatures: !1 })
                                : (eAB.isEnabled = $2AA);
                        },
                        [],
                        [experimentalFeature, $4AA]
                    ),
                    $17AA = cAA(".narrationSuffixDisablesAchievements"),
                    $18AA = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((eAB) => (0 === eAB.length ? cAA(".narrationSuffixEnablesAchievements") : void 0), [cAA], [$3AA]);
                return null != $8AA
                    ? ${extractedSymbolNames.contextHolder}.createElement($19, {
                          title: $10AA !== ${extractedSymbolNames.facetHolder}.NO_VALUE ? $5AA($10AA) : "",
                          description: $12AA !== ${extractedSymbolNames.facetHolder}.NO_VALUE ? $5AA($12AA) : "",
                          gamepad: { index: tAA },
                          value: $13AA,
                          disabled: false /* $14AA */, // Modified
                          onChange: $15AA,
                          onNarrationText: $17AA,
                          offNarrationText: $18AA,
                      })
                    : null;
            }`);
                            successfullyReplaced = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5,20}\.js$/.test(entry.data?.filename) && !successfullyReplaced) {
                        failedReplaces.push("allowDisablingEnabledExperimentalToggles");
                    }
                }
                // `FUNCTION CODE`.split("${extractedFunctionNames.translationStringResolver}").map(v=>stringToRegexString(v)).join("${extractedFunctionNames.translationStringResolver}")
                if (settings.addMoreDefaultGameModes) {
                    let successfullyReplacedA = false;
                    let successfullyReplacedB = false;
                    for (const regex of replacerRegexes.addMoreDefaultGameModes[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, `/**
             * The game mode dropdown.
             *
             * @param param0
             * @param {unknown} param0.generalData
             * @param {boolean} param0.isLockedTemplate
             * @param {boolean} param0.isUsingTemplate
             * @param {unknown} param0.achievementsDisabledMessages
             * @param {boolean} param0.isHardcoreMode
             */
            function $1({ generalData: eAA, isLockedTemplate: tAA, isUsingTemplate: $2, achievementsDisabledMessages: $3, isHardcoreMode: oAA }) {
                const { t: iAA } = ${extractedSymbolNames.translationStringResolver}("CreateNewWorld.general"),
                    { t: cAA } = ${extractedSymbolNames.translationStringResolver}("CreateNewWorld.all"),
                    sAA = (0, ${extractedSymbolNames.facetHolder}.useSharedFacet)($4),
                    uAA = (0, ${extractedSymbolNames.contextHolder}.useContext)($5) !== $6.CREATE,
                    dAA = (0, ${extractedSymbolNames.facetHolder}.useSharedFacet)($7),
                    mAA = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((eAA, tAA, $2) => eAA || tAA || $2, [], [tAA, sAA, oAA]),
                    pAA = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)(
                        (eAA, tAA) => {
                            const $2 = [/* 
                                $8(
                                    { label: iAA(".gameModeUnknownLabel"), description: iAA(".gameModeUnknownDescription"), value: $9.UNKNOWN },
                                    1 === eAA.length ? { narrationSuffix: cAA(".narrationSuffixEnablesAchievements") } : {}
                                ), */
                                $8(
                                    { label: iAA(".gameModeSurvivalLabel"), description: iAA(".gameModeSurvivalDescription"), value: $9.SURVIVAL },
                                    1 === eAA.length ? { narrationSuffix: cAA(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                {
                                    label: iAA(".gameModeCreativeLabel"),
                                    description: iAA(".gameModeCreativeDescription"),
                                    value: $9.CREATIVE,
                                    narrationSuffix: cAA(".narrationSuffixDisablesAchievements"),
                                },
                                $8(
                                    {
                                        label: iAA(".gameModeAdventureLabel"),
                                        description: iAA(tAA ? ".gameModeAdventureTemplateDescription" : ".gameModeAdventureDescription"),
                                        value: $9.ADVENTURE,
                                    },
                                    1 === eAA.length ? { narrationSuffix: cAA(".narrationSuffixEnablesAchievements") } : {}
                                ),/* 
                                $8(
                                    {
                                        label: "Game Mode 3",
                                        description: "Secret game mode 3.",
                                        value: $9.GM3,
                                    },
                                    1 === eAA.length ? { narrationSuffix: cAA(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                $8(
                                    {
                                        label: "Game Mode 4",
                                        description: "Secret game mode 4.",
                                        value: $9.GM4,
                                    },
                                    1 === eAA.length ? { narrationSuffix: cAA(".narrationSuffixEnablesAchievements") } : {}
                                ), */
                                $8(
                                    {
                                        label: "Default",
                                        description: "Default game mode, might break things if you set the default game mode to itself.",
                                        value: $9.DEFAULT,
                                    },
                                    1 === eAA.length ? { narrationSuffix: cAA(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                $8(
                                    {
                                        label: "Spectator",
                                        description: "Spectator mode.",
                                        value: $9.SPECTATOR,
                                    },
                                    1 === eAA.length ? { narrationSuffix: cAA(".narrationSuffixEnablesAchievements") } : {}
                                ),/* 
                                $8(
                                    {
                                        label: "Game Mode 7",
                                        description: "Secret game mode 7.",
                                        value: $9.GM7,
                                    },
                                    1 === eAA.length ? { narrationSuffix: cAA(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                $8(
                                    {
                                        label: "Game Mode 8",
                                        description: "Secret game mode 8.",
                                        value: $9.GM8,
                                    },
                                    1 === eAA.length ? { narrationSuffix: cAA(".narrationSuffixEnablesAchievements") } : {}
                                ),
                                $8(
                                    {
                                        label: "Game Mode 9",
                                        description: "Secret game mode 9.",
                                        value: $9.GM9,
                                    },
                                    1 === eAA.length ? { narrationSuffix: cAA(".narrationSuffixEnablesAchievements") } : {}
                                ), */
                            ]; /* 
                            return (
                                (uAA || tAA) &&
                                    $2.push(
                                        $8(
                                            {
                                                label: iAA(".gameModeAdventureLabel"),
                                                description: iAA(tAA ? ".gameModeAdventureTemplateDescription" : ".gameModeAdventureDescription"),
                                                value: $9.ADVENTURE,
                                            },
                                            1 === eAA.length ? { narrationSuffix: cAA(".narrationSuffixEnablesAchievements") } : {}
                                        )
                                    ),
                                $2
                            ); */
                            return $2;
                        },
                        [iAA, cAA, uAA],
                        [$3, $2]
                    ),
                    fAA = (0, ${extractedSymbolNames.facetHolder}.useNotifyMountComplete)();
                return ${extractedSymbolNames.contextHolder}.createElement($10, {
                    title: iAA(".gameModeTitle"),
                    disabled: mAA,
                    options: pAA,
                    onMountComplete: fAA,
                    value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((eAA) => eAA.gameMode, [], [eAA]),
                    onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                        (eAA, tAA) => ($2) => {
                            const $11 = eAA.gameMode;
                            (eAA.gameMode = $2), uAA && tAA.trackOptionChanged($12.GameModeChanged, $11, $2);
                        },
                        [uAA],
                        [eAA, dAA]
                    ),
                });
            }`);
                            successfullyReplacedA = true;
                            break;
                        }
                    }
                    for (const regex of replacerRegexes.addMoreDefaultGameModes[1]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, `(function (e) {
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
                })($1 || ($2 = {})),`);
                            successfullyReplacedB = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5,20}\.js$/.test(entry.data?.filename)) {
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
                            distData = distData.replace(regex, `// Modified to add this dropdown
                                      ${extractedSymbolNames.contextHolder}.createElement(
                                          ${extractedSymbolNames.facetHolder}.Mount,
                                          { when: true /* $1 */ },
                                          ${extractedSymbolNames.contextHolder}.createElement(
                                              ${extractedSymbolNames.facetHolder}.DeferredMount,
                                              null,
                                              ${extractedSymbolNames.contextHolder}.createElement($2, {
                                                  label: $3(".generatorTypeLabel"),
                                                  options: [
                                                      {
                                                          value: $4.Legacy,
                                                          label: "Legacy",
                                                          description: "The old world type.",
                                                      },
                                                      {
                                                          value: $4.Overworld,
                                                          label: $3(".vanillaWorldGeneratorLabel"),
                                                          description: $3(".vanillaWorldGeneratorDescription"),
                                                      },
                                                      {
                                                          value: $4.Flat,
                                                          label: $3(".flatWorldGeneratorLabel"),
                                                          description: $3(".flatWorldGeneratorDescription"),
                                                      },/* 
                                                      {
                                                          value: $4.Nether,
                                                          label: "Nether",
                                                          description: $3(".vanillaWorldGeneratorDescription"),
                                                      },
                                                      {
                                                          value: $4.TheEnd,
                                                          label: "The End",
                                                          description: $3(".vanillaWorldGeneratorDescription"),
                                                      }, */
                                                      {
                                                          value: $4.Void,
                                                          label: $3(".voidWorldGeneratorLabel"),
                                                          description: $3(".voidWorldGeneratorDescription"),
                                                      },/* 
                                                      {
                                                          value: $4.Undefined,
                                                          label: "Undefined",
                                                          description: $3(".vanillaWorldGeneratorDescription"),
                                                      }, */
                                                  ],
                                                  value: $5.value,
                                                  onChange: $5.onChange,
                                              }) /* 
                                              (e[(e.Legacy = 0)] = "Legacy"),
                                                (e[(e.Overworld = 1)] = "Overworld"),
                                                (e[(e.Flat = 2)] = "Flat"),
                                                (e[(e.Nether = 3)] = "Nether"),
                                                (e[(e.TheEnd = 4)] = "TheEnd"),
                                                (e[(e.Void = 5)] = "Void"),
                                                (e[(e.Undefined = 6)] = "Undefined"); */
                                          )
                                      )`);
                            successfullyReplacedA = true;
                            break;
                        }
                    }
                    for (const regex of replacerRegexes.addGeneratorTypeDropdown[1]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, `(function (e) {
                    (e[(e.Legacy = 0)] = "Legacy"),
                        (e[(e.Overworld = 1)] = "Overworld"),
                        (e[(e.Flat = 2)] = "Flat"),
                        (e[(e.Nether = 3)] = "Nether"),
                        (e[(e.TheEnd = 4)] = "TheEnd"),
                        (e[(e.Void = 5)] = "Void"),
                        (e[(e.Undefined = 6)] = "Undefined");
                })($1 || ($1 = {})),`);
                            successfullyReplacedB = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5,20}\.js$/.test(entry.data?.filename)) {
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
                    for (const regex of replacerRegexes.allowForChangingSeeds[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, `$1 = ({ advancedData: eAA, isEditorWorld: tAA, onSeedValueChange: $2, isSeedChangeLocked: $3, showSeedTemplates: oAA, worldData: wd }) => {
                    const { t: iAA } = $4("CreateNewWorld.advanced"),
                        { t: cAA } = $4("CreateNewWorld.all"),
                        sAA = (0, ${extractedSymbolNames.contextHolder}.useContext)($5) !== $6.CREATE,
                        uAA = true /* $7($8) */,
                        dAA = $9(),
                        mAA = (0, ${extractedSymbolNames.facetHolder}.useSharedFacet)($10),
                        pAA = (0, ${extractedSymbolNames.facetHolder}.useSharedFacet)($11),
                        fAA = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((eAA) => eAA.worldSeed, [], [eAA]),
                        gAA = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((eAA) => eAA.isClipboardCopySupported, [], [mAA]),
                        EAA = (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                            (eAA, tAA, $2) => () => {
                                tAA.copyToClipboard(eAA), $2.queueSnackbar(iAA(".copyToClipboard"));
                            },
                            [iAA],
                            [fAA, mAA, pAA]
                        ),
                        hAA = sAA ? EAA : () => dAA.push("/create-new-world/seed-templates"),
                        $12 = sAA ? "" : iAA(".worldSeedPlaceholder"),
                        $13 = iAA(sAA ? ".worldSeedCopyButton" : ".worldSeedButton"),
                        y = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((eAA, tAA, $2) => tAA || ($2 && uAA && !sAA && eAA.generatorType != $14.Overworld), [uAA, sAA], [eAA, $3, tAA]);
                    return ${extractedSymbolNames.contextHolder}.createElement(
                              ${extractedSymbolNames.facetHolder}.DeferredMount,
                              null,
                              ${extractedSymbolNames.contextHolder}.createElement($15, { data: gAA }, (eAA) =>
                                  /* sAA && !eAA
                                      ? ${extractedSymbolNames.contextHolder}.createElement($16, {
                                            disabled: sAA,
                                            label: iAA(".worldSeedLabel"),
                                            description: iAA(".worldSeedDescription"),
                                            maxLength: ${settings.maxTextLengthOverride === "" ? 1000000 : settings.maxTextLengthOverride},
                                            value: fAA,
                                            onChange: $2,
                                            placeholder: iAA(".worldSeedPlaceholder"),
                                            disabledNarrationSuffix: cAA(".narrationSuffixTemplateLocked"),
                                            "data-testid": "world-seed-text-field",
                                        })
                                      :  */${extractedSymbolNames.contextHolder}.createElement($16.WithButton, {
                                            buttonInputLegend: $13,
                                            buttonText: $13,
                                            buttonOnClick: hAA,
                                            textDisabled: false /* sAA */, // Modified
                                            disabled: false /* y */, // Modified
                                            label: iAA(".worldSeedLabel"),
                                            description: iAA(".worldSeedDescription") + (sAA ? " Please go to the Debug tab if you want to change the seed, as any changes made in this text box will not be saved." : ""),
                                            maxLength: ${settings.maxTextLengthOverride === "" ? 1000000 : settings.maxTextLengthOverride},
                                            value: fAA,
                                            onChange: $2,
                                            placeholder: $12,
                                            buttonNarrationHint: iAA(".narrationTemplatesButtonNarrationHint"),
                                            disabledNarrationSuffix: cAA(".narrationSuffixTemplateLocked"),
                                            "data-testid": "world-seed-with-button",
                                        })
                              )
                          );
                },`);
                            successfullyReplaced = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5,20}\.js$/.test(entry.data?.filename) && !successfullyReplaced) {
                        failedReplaces.push("allowForChangingSeeds");
                    }
                }
                if (settings.allowForChangingFlatWorldPreset) {
                    let successfullyReplacedA = false;
                    let successfullyReplacedB = false;
                    for (const regex of replacerRegexes.allowForChangingFlatWorldPreset[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, `${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.facetHolder}.Mount,{when:true},${extractedSymbolNames.contextHolder}.createElement($1,{value:(0,${extractedSymbolNames.facetHolder}.useFacetMap)((e=>e.useFlatWorld),[],[$2]),preset:(0,${extractedSymbolNames.facetHolder}.useFacetMap)((e=>e.flatWorldPreset),[],[$2]),onValueChanged:(0,${extractedSymbolNames.facetHolder}.useFacetCallback)((e=>t=>{e.useFlatWorld=t,t&&e.flatWorldPreset?$3($4[e.flatWorldPreset]):$3("")}),[$3],[$2]),onPresetChanged:(0,${extractedSymbolNames.facetHolder}.useFacetCallback)((e=>t=>{e.flatWorldPreset=t,e.useFlatWorld?$3($4[t]):c("")}),[$3],[$2]),disabled:false,hideAccordion:(0,${extractedSymbolNames.facetHolder}.useFacetMap)((e=>null==e.flatWorldPreset),[],[$2]),achievementsDisabledMessages:$5})))`);
                            successfullyReplacedA = true;
                            break;
                        }
                    }
                    for (const { regex, replacement } of replacerRegexes.allowForChangingFlatWorldPreset[1]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, replacement);
                            successfullyReplacedB = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5,20}\.js$/.test(entry.data?.filename) && origData.includes("flatWorldPreset")) {
                        if (!successfullyReplacedA) {
                            failedReplaces.push("allowForChangingFlatWorldPreset_enableToggleAndPresetSelector");
                        }
                        if (!successfullyReplacedB) {
                            failedReplaces.push("allowForChangingFlatWorldPreset_makePresetSelectorDropdownVisible");
                        }
                    }
                    if (/index-[0-9a-f]{5,20}\.js$/.test(entry.data?.filename) && origData.includes("flatWorldPreset") && !successfullyReplacedA) {
                        failedReplaces.push("allowForChangingFlatWorldPreset");
                    }
                }
                if (settings.addDebugTab) {
                    let successfullyReplacedA = false;
                    let successfullyReplacedB = false;
                    for (const regex of replacerRegexes.addDebugTab[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, `/**
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
                worldData: eAA,
                achievementsDisabledMessages: tAA,
                onUnlockTemplateSettings: nAA,
                onExportTemplate: lAA,
                onClearPlayerData: oAA,
                isEditorWorld: iAA,
            }) {
                const c = (0, ${extractedSymbolNames.facetHolder}.useSharedFacet)($2),
                    s = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)(({ allBiomes: e }) => e, [], [c]),
                    u = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.isLockedTemplate, [], [eAA]),
                    d = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.achievementsDisabled, [], [eAA]),
                    m = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)(({ spawnDimensionId: e }) => e, [], [c]),
                    p = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => $3(e, (e) => ({ label: e.label, dimension: e.dimension, value: e.id })), [], [s]),
                    f = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e, t) => $4(e, (e) => e.dimension === t), [], [p, m]),
                    g = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.spawnBiomeId, [], [c]),
                    E = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.defaultSpawnBiome || e.isBiomeOverrideActive, [], [c]),
                    h = (0, ${extractedSymbolNames.facetHolder}.useSharedFacet)($5),
                    v = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => $6(e.platform), [], [h]),
                    b = (0, ${extractedSymbolNames.contextHolder}.useContext)($7) !== $8.CREATE,
                    y = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e && b, [b], [v]),
                    rawData = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e, [], [eAA]);
                return ${extractedSymbolNames.contextHolder}.createElement(
                    ${extractedSymbolNames.facetHolder}.DeferredMountProvider,
                    null,
                    ${extractedSymbolNames.contextHolder}.createElement(
                        $9,
                        {
                            isLockedTemplate: u,
                            achievementsDisabled: d,
                            achievementsDisabledMessages: tAA,
                            narrationText: "Debug",
                            onUnlockTemplateSettings: nAA,
                            isEditorWorld: iAA,
                        },
                        ${extractedSymbolNames.contextHolder}.createElement(
                            ${extractedSymbolNames.facetHolder}.DeferredMount,
                            null,
                            ${extractedSymbolNames.contextHolder}.createElement($10, {
                                title: "Flat nether",
                                gamepad: { index: 0 },
                                value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.flatNether, [], [c]),
                                onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                                    (e) => (t) => {
                                        e.flatNether = t;
                                    },
                                    [],
                                    [c]
                                ),
                            })
                        ),
                        ${extractedSymbolNames.contextHolder}.createElement(
                            ${extractedSymbolNames.facetHolder}.DeferredMount,
                            null,
                            ${extractedSymbolNames.contextHolder}.createElement($10, {
                                title: "Enable game version override",
                                gamepad: { index: 1 },
                                value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.enableGameVersionOverride, [], [c]),
                                onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                                    (e) => (t) => {
                                        e.enableGameVersionOverride = t;
                                    },
                                    [],
                                    [c]
                                ),
                            })
                        ),
                        ${extractedSymbolNames.contextHolder}.createElement(
                            ${extractedSymbolNames.facetHolder}.DeferredMount,
                            null,
                            ${extractedSymbolNames.contextHolder}.createElement($11, {
                                label: "Game version override",
                                gamepadIndex: 2,
                                placeholder: "0.0.0",
                                maxLength: 30000,
                                disabled: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => !e.enableGameVersionOverride, [], [c]),
                                value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.gameVersionOverride, [], [c]),
                                onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                                    (e) => (t) => {
                                        e.gameVersionOverride = t;
                                    },
                                    [],
                                    [c]
                                ),
                            })
                        ),
                        ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.facetHolder}.DeferredMount, null, ${extractedSymbolNames.contextHolder}.createElement($12, { title: "World biome settings" })),
                        ${extractedSymbolNames.contextHolder}.createElement($10, {
                            title: "Default spawn biome",
                            description: "Using the default spawn biome will mean a random overworld spawn is selected",
                            gamepad: { index: 3 },
                            disabled: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.isBiomeOverrideActive, [], [c]),
                            value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.defaultSpawnBiome, [], [c]),
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                                (e) => (t) => {
                                    e.defaultSpawnBiome = t;
                                },
                                [],
                                [c]
                            ),
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement(
                            ${extractedSymbolNames.facetHolder}.DeferredMount,
                            null,
                            ${extractedSymbolNames.contextHolder}.createElement($13, {
                                onMountComplete: (0, ${extractedSymbolNames.facetHolder}.useNotifyMountComplete)(),
                                title: "Spawn dimension filter",
                                disabled: E,
                                wrapToggleText: !0,
                                options: [
                                    { label: "Overworld", value: 0 },
                                    { label: "Nether", value: 1 },
                                ],
                                value: m,
                                onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                                    (e) => (t) => {
                                        e.spawnDimensionId = t;
                                    },
                                    [],
                                    [c]
                                ),
                            })
                        ),
                        ${extractedSymbolNames.contextHolder}.createElement(
                            ${extractedSymbolNames.facetHolder}.DeferredMount,
                            null,
                            ${extractedSymbolNames.contextHolder}.createElement($14, {
                                title: "Spawn biome",
                                options: f,
                                onItemSelect: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)((e) => (t) => (e.spawnBiomeId = t), [], [c]),
                                disabled: E,
                                value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e, t) => (t.filter((t) => t.value === e).length > 0 ? e : t[0].value), [], [g, f]),
                                focusOnSelectedItem: !0,
                            })
                        ),
                        ${extractedSymbolNames.contextHolder}.createElement($10, {
                            title: "Biome override",
                            description: "Set the world to a selected biome. This will override the Spawn biome!",
                            gamepad: { index: 6 },
                            value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.isBiomeOverrideActive, [], [c]),
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                                (e) => (t) => {
                                    e.isBiomeOverrideActive = t;
                                },
                                [],
                                [c]
                            ),
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement($14, {
                            title: "Biome override",
                            description: "Select biome to be used in the entire world",
                            options: p,
                            disabled: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => !e.isBiomeOverrideActive, [], [c]),
                            onItemSelect: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                                (e) => (t) => {
                                    e.biomeOverrideId = t;
                                },
                                [],
                                [c]
                            ),
                            value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.biomeOverrideId, [], [c]),
                            focusOnSelectedItem: !0,
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.facetHolder}.Mount, { when: y }, ${extractedSymbolNames.contextHolder}.createElement($15, { onExportTemplate: lAA, onClearPlayerData: oAA })),
                        ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.facetHolder}.DeferredMount, null, ${extractedSymbolNames.contextHolder}.createElement(rawValueEditor, { rawData: eAA })),
                        ${extractedSymbolNames.contextHolder}.createElement(() =>
                            ${extractedSymbolNames.contextHolder}.createElement(
                                ${extractedSymbolNames.contextHolder}.Fragment,
                                null,
                                ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.headerFunciton}, null, "Debug Info - Raw"),
                                ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.headerSpacingFunction}, { size: 1 }) /* 
                                ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.facetHolder}.DeferredMount, null, ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.editWorldTextFunction}.Text, null, "worldSummary: " + JSON.stringify(e.get(), undefined, 2))),
                                ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.facetHolder}.DeferredMount, null, ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.editWorldTextFunction}.Text, null, "worldData: " + JSON.stringify(u.get(), undefined, 2))),
                                ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.facetHolder}.DeferredMount, null, ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.editWorldTextFunction}.Text, null, "achievementsDisabledMessages: " + JSON.stringify(t.get(), undefined, 2))), */,
                                ${extractedSymbolNames.contextHolder}.createElement(
                                    ${extractedSymbolNames.facetHolder}.DeferredMount,
                                    null,
                                    ${extractedSymbolNames.contextHolder}.createElement(
                                        function ({ children: e, align: t }) {
                                            return ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.jsText}, { type: "body", role: "inherit", align: t, shouldNarrate: !1, whiteSpace: "pre" }, e);
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
                                ${extractedSymbolNames.contextHolder}.createElement($11, {
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
                                ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.headerFunciton}, null, "Debug Info - Property Descriptors"),
                                ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.headerSpacingFunction}, { size: 1 }) /* 
                                ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.facetHolder}.DeferredMount, null, ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.editWorldTextFunction}.Text, null, "worldSummary: " + JSON.stringify(Object.getOwnPropertyDescriptors(e.get()), undefined, 2))),
                                ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.facetHolder}.DeferredMount, null, ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.editWorldTextFunction}.Text, null, "worldData: " + JSON.stringify(Object.getOwnPropertyDescriptors(u.get()), undefined, 2))),
                                ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.facetHolder}.DeferredMount, null, ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.editWorldTextFunction}.Text, null, "achievementsDisabledMessages: " + JSON.stringify(Object.getOwnPropertyDescriptors(t.get()), undefined, 2))), */,
                                ${extractedSymbolNames.contextHolder}.createElement(
                                    ${extractedSymbolNames.facetHolder}.DeferredMount,
                                    null,
                                    ${extractedSymbolNames.contextHolder}.createElement(
                                        function ({ children: e, align: t }) {
                                            return ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.jsText}, { type: "body", role: "inherit", align: t, shouldNarrate: !1, whiteSpace: "pre" }, e);
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
                                ${extractedSymbolNames.contextHolder}.createElement($11, {
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
            function rawValueEditor({ rawData: eAA }) {
                const { t: c } = ${extractedSymbolNames.translationStringResolver}("CreateNewWorld.general") /* ,
                s = 1 == (0, ${extractedSymbolNames.facetHolder}.useFacetUnwrap)(nAA) ? ".editor" : "",
                u = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.worldName, [], [oAA]),
                d = (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)((e) => (t) => (e.worldName = t), [], [oAA]) */,
                    rawData = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e, [], [eAA]),
                    PHD = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.general, [], [eAA]),
                    p = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.general, [], [eAA]),
                    g = (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.playerHasDied, [], [p]),
                    playerPermissionsChange = (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)((e) => (t) => (e.multiplayer.playerPermissions = Number(t)), [], [rawData]);
                // e.achievementsPermanentlyDisabled = false; // Modified
                // rawData.get().general.playerHasDied = false;
                return ${extractedSymbolNames.contextHolder}.createElement(
                    ${extractedSymbolNames.contextHolder}.Fragment,
                    null,
                    ${extractedSymbolNames.contextHolder}.createElement(
                        ${extractedSymbolNames.facetHolder}.DeferredMount,
                        null,
                        ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.headerFunciton}, null, "Raw Value Editor"),
                        ${extractedSymbolNames.contextHolder}.createElement($11, {
                            label: "worldSeed",
                            description: "The seed of the world. (advanced.worldSeed)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().advanced.worldSeed,
                            maxLength: 3000,
                            value: rawData.get().advanced.worldSeed,
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)((e) => (t) => (e.advanced.worldSeed = t), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement($11, {
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
                        ${extractedSymbolNames.contextHolder}.createElement($11, {
                            label: "playerAccess",
                            description: "?. (multiplayer.playerAccess)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().multiplayer.playerAccess,
                            maxLength: 3000,
                            value: rawData.get().multiplayer.playerAccess,
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)((e) => (t) => (e.multiplayer.playerAccess = Number(t)), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement($11, {
                            label: "gameMode",
                            description: "?. (general.gameMode)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().general.gameMode,
                            maxLength: 3000,
                            value: rawData.get().general.gameMode,
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)((e) => (t) => (e.general.gameMode = Number(t)), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement($11, {
                            label: "difficulty",
                            description: "?. (general.difficulty)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().general.difficulty,
                            maxLength: 3000,
                            value: rawData.get().general.difficulty,
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)((e) => (t) => (e.general.difficulty = Number(t)), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement($11, {
                            label: "generatorType",
                            description: "?. (advanced.generatorType)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().advanced.generatorType,
                            maxLength: 3000,
                            value: rawData.get().advanced.generatorType,
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)((e) => (t) => (e.advanced.generatorType = Number(t)), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement($11, {
                            label: "simulationDistance",
                            description: "?. (advanced.simulationDistance)",
                            gamepadIndex: 1,
                            placeholder: typeof rawData.get().advanced.simulationDistance,
                            maxLength: 3000,
                            value: rawData.get().advanced.simulationDistance,
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)((e) => (t) => (e.advanced.simulationDistance = Number(t)), [], [rawData]),
                            filterProfanity: !1,
                            disabled: false,
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement($10, {
                            title: "achievementsDisabled (read-only)",
                            disabled: true,
                            description: "Whether or not achievements are disabled. (read-only)",
                            value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((/** @type {ReturnType<RawWorldData["get"]>} */ e) => e.achievementsDisabled, [], [eAA]),
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                                (/** @type {ReturnType<RawWorldData["get"]>} */ e) => (t) => (e.achievementsDisabled = t),
                                [],
                                [rawData]
                            ),
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement($10, {
                            title: "achievementsPermanentlyDisabled (read-only)",
                            soundEffectPressed: "ui.hardcore_toggle_press",
                            disabled: true,
                            description: "Whether or not achievements are permanently disabled. (read-only)",
                            value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((/** @type {ReturnType<RawWorldData["get"]>} */ e) => e.achievementsPermanentlyDisabled, [], [eAA]),
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                                (/** @type {ReturnType<RawWorldData["get"]>} */ e) => (t) => (e.achievementsPermanentlyDisabled = t),
                                [],
                                [rawData]
                            ),
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement($10, {
                            title: "isUsingTemplate (read-only)",
                            disabled: true,
                            description: "isUsingTemplate (read-only)",
                            value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((/** @type {ReturnType<RawWorldData["get"]>} */ e) => e.isUsingTemplate, [], [eAA]),
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                                (/** @type {ReturnType<RawWorldData["get"]>} */ e) => (t) => (e.isUsingTemplate = t),
                                [],
                                [rawData]
                            ),
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement($10, {
                            title: "isLockedTemplate",
                            disabled: false,
                            description: "isLockedTemplate",
                            value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((/** @type {ReturnType<RawWorldData["get"]>} */ e) => e.isLockedTemplate, [], [eAA]),
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
                                (/** @type {ReturnType<RawWorldData["get"]>} */ e) => (t) => (e.isLockedTemplate = t),
                                [],
                                [rawData]
                            ),
                        }),
                        ${extractedSymbolNames.contextHolder}.createElement($10, {
                            title: "playerHasDied (read-only)",
                            disabled: true,
                            description: "readonly general.playerHasDied",
                            value: (0, ${extractedSymbolNames.facetHolder}.useFacetMap)((e) => e.playerHasDied, [], [p]),
                            onChange: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)((e) => (t) => (e.playerHasDied = t), [], [p]),
                        })
                    )
                );
            }`);
                            successfullyReplacedA = true;
                            break;
                        }
                    }
                    for (const { regex, replacement } of replacerRegexes.addDebugTab[1]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, replacement);
                            successfullyReplacedB = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5,20}\.js$/.test(entry.data?.filename)) {
                        if (!successfullyReplacedA) {
                            failedReplaces.push("addDebugTab_replaceTab");
                        }
                        if (!successfullyReplacedB) {
                            // console.log(replacerRegexes.addDebugTab[1][0], "\n\n\n");
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
                    .replace(/(?=<script defer="defer" src="\/hbui\/(?:index|gameplay|editor)-[a-zA-Z0-9]+\.js"><\/script>)/, `<script defer="defer" src="/hbui/oreUICustomizer8CrafterConfig.js"></script>
        <script defer="defer" src="/hbui/class_path.js"></script>
        <script defer="defer" src="/hbui/css.js"></script>
        <script defer="defer" src="/hbui/JSONB.js"></script>
        <script defer="defer" src="/hbui/customOverlays.js"></script>
        `)
                    .replace(/(?<=<link href="\/hbui\/gameplay-theme(?:-[a-zA-Z0-9]+)?\.css" rel="stylesheet">)/, `
        <link href="/hbui/customOverlays.css" rel="stylesheet" />`);
                distData = distData
                    .replace(new RegExp(`(?<=\\{title:(?:[a-zA-Z0-9_\$]{1})\\("\\.bonusChestTitle"\\),description:(?:[a-zA-Z0-9_\$]{1})\\("\\.bonusChestDescription"\\),value:\\(0,(?:[a-zA-Z0-9_\$]{1})\\.useFacetMap\\)\\(\\(\\((?:[a-zA-Z0-9_\$]{1}),(?:[a-zA-Z0-9_\$]{1})\\)=>!(?:[a-zA-Z0-9_\$]{1})&&(?:[a-zA-Z0-9_\$]{1})\\.bonusChest\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1}),(?:[a-zA-Z0-9_\$]{1})\\]\\),onChange:\\(0,(?:[a-zA-Z0-9_\$]{1})\\.useFacetCallback\\)\\(\\((?:[a-zA-Z0-9_\$]{1})=>(?:[a-zA-Z0-9_\$]{1})=>\\{(?:[a-zA-Z0-9_\$]{1})\\.bonusChest=(?:[a-zA-Z0-9_\$]{1})\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),disabled:)(?:[a-zA-Z0-9_\$]{1})(?=,visible:(?:[a-zA-Z0-9_\$]{1})\\})`), `false`)
                    .replace(new RegExp(`(?<=\\{title:(?:[a-zA-Z0-9_\$]{1})\\("\\.startWithMapTitle"\\),description:(?:[a-zA-Z0-9_\$]{1})\\("\\.startWithMapDescription"\\),value:\\(0,(?:[a-zA-Z0-9_\$]{1})\\.useFacetMap\\)\\(\\(\\((?:[a-zA-Z0-9_\$]{1}),(?:[a-zA-Z0-9_\$]{1})\\)=>!(?:[a-zA-Z0-9_\$]{1})&&(?:[a-zA-Z0-9_\$]{1})\\.startWithMap\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1}),(?:[a-zA-Z0-9_\$]{1})\\]\\),onChange:\\(0,(?:[a-zA-Z0-9_\$]{1})\\.useFacetCallback\\)\\(\\((?:[a-zA-Z0-9_\$]{1})=>(?:[a-zA-Z0-9_\$]{1})=>\\{(?:[a-zA-Z0-9_\$]{1})\\.startWithMap=(?:[a-zA-Z0-9_\$]{1})\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),disabled:)(?:[a-zA-Z0-9_\$]{1})(?=,visible:(?:[a-zA-Z0-9_\$]{1})\\})`), `false`)
                    .replace(new RegExp(`(?<=\\{title:(?:[a-zA-Z0-9_\$]{1})\\("\\.useFlatWorldTitle"\\),description:(?:[a-zA-Z0-9_\$]{1})\\("\\.useFlatWorldDescription"\\),value:\\(0,(?:[a-zA-Z0-9_\\$]{1}).useFacetMap\\)\\(\\((?:[a-zA-Z0-9_\$]{1})=>(?:[a-zA-Z0-9_\$]{1})\\.useFlatWorld\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),onChange:\\(0,(?:[a-zA-Z0-9_\$]{1})\\.useFacetCallback\\)\\(\\((?:[a-zA-Z0-9_\$]{1})=>(?:[a-zA-Z0-9_\$]{1})=>\\{(?:[a-zA-Z0-9_\$]{1})\\.useFlatWorld=(?:[a-zA-Z0-9_\$]{1})\\}\\),\\[\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),onNarrationText:(?:[a-zA-Z0-9_\$]{1})\\("\\.narrationSuffixDisablesAchievements"\\),offNarrationText:\\(0,(?:[a-zA-Z0-9_\$]{1})\\.useFacetMap\\)\\(\\((?:[a-zA-Z0-9_\$]{1})=>0===(?:[a-zA-Z0-9_\$]{1})\\.length\\?(?:[a-zA-Z0-9_\$]{1})\\("\\.narrationSuffixEnablesAchievements"\\):void 0\\),\\[(?:[a-zA-Z0-9_\$]{1})\\],\\[(?:[a-zA-Z0-9_\$]{1})\\]\\),disabled:)(?:[a-zA-Z0-9_\$]{1})(?=,visible:(?:[a-zA-Z0-9_\$]{1})\\})`), `false`);
                if (settings.maxTextLengthOverride !== "") {
                    const origDistData = distData;
                    const textLengthValues = distData.matchAll(/maxLength(:\s?)([0-9]+)/g);
                    const values = [...textLengthValues];
                    console.warn(`maxTextLengthOverrideReplacementsLength: ${values.length}`);
                    for (const textLengthValue of values) {
                        distData = distData.replace(textLengthValue[0], `maxLength${textLengthValue[1]}${settings.maxTextLengthOverride /* BigInt(settings.maxTextLengthOverride) > BigInt(textLengthValue[1]) ? settings.maxTextLengthOverride : textLengthValue[1] */}`);
                    }
                    if (/index-[0-9a-f]{5,20}\.js$/.test(entry.data?.filename) && distData === origDistData) {
                        failedReplaces.push("maxTextLengthOverride");
                    }
                }
                else {
                    console.warn("maxTextLengthOverride is empty");
                }
                if (settings.add8CrafterUtilitiesMainMenuButton) {
                    let successfullyReplaced = false;
                    let [disabledVariableSymbolName, focusGridIndexVariableSymbolName, navbarButtonImageClass] = origData
                        .match(/DebugButton=function\(\{onClick:e,selected:t,disabled:([a-zA-Z0-9_\$]{1}),focusGridIndex:([a-zA-Z0-9_\$]{1}),role:l="inherit",narrationText:o\}\)\{const\{t:i\}=(?:[a-zA-Z0-9_\$]{2})\("NavigationBarLayout\.DebugButton"\);return (?:[a-zA-Z0-9_\$]{1})\.createElement\((?:[a-zA-Z0-9_\$]{1})\.Fragment,null,(?:[a-zA-Z0-9_\$]{1})\.createElement\((?:[a-zA-Z0-9_\$]{2}),\{disabled:(?:[a-zA-Z0-9_\$]{1}),focusGridIndex:(?:[a-zA-Z0-9_\$]{1}),inputLegend:i\("\.inputLegend"\),narrationText:null!=o\?o:i\("\.narration"\),onClick:e,role:l,selected:t\},(?:[a-zA-Z0-9_\$]{1})\.createElement\((?:[a-zA-Z0-9_\$]{2}),\{className:"([a-zA-Z0-9_\$]{5,})",imageRendering:"pixelated",src:(?:[a-zA-Z0-9_\$]{2})\}/)
                        ?.slice(1, 4) ?? [];
                    disabledVariableSymbolName ??= "n";
                    focusGridIndexVariableSymbolName ??= "r";
                    navbarButtonImageClass ??= "QQfwv";
                    for (const regex of replacerRegexes.add8CrafterUtilitiesMainMenuButton[0]) {
                        if (regex.test(distData)) {
                            distData = distData.replace(regex, `${extractedSymbolNames.contextHolder}.createElement(
                                                    ${extractedSymbolNames.facetHolder}.Mount,
                                                    { when: true },
                                                    ${extractedSymbolNames.contextHolder}.createElement(
                                                        ${extractedSymbolNames.contextHolder}.Fragment,
                                                        null,
                                                        ${extractedSymbolNames.contextHolder}.createElement($2.Divider, null),
                                                        ${extractedSymbolNames.contextHolder}.createElement(() =>
                                                            ${extractedSymbolNames.contextHolder}.createElement(
                                                                function ({ onClick: e, selected: t, disabled: ${disabledVariableSymbolName}, focusGridIndex: ${focusGridIndexVariableSymbolName}, role: l = "inherit" }) {
                                                                    return ${extractedSymbolNames.contextHolder}.createElement(
                                                                        ${extractedSymbolNames.contextHolder}.Fragment,
                                                                        null,
                                                                        ${extractedSymbolNames.contextHolder}.createElement(
                                                                            ${extractedSymbolNames.navbarButtonFunction},
                                                                            {
                                                                                disabled: ${disabledVariableSymbolName},
                                                                                // focusGridIndex: ${focusGridIndexVariableSymbolName},
                                                                                inputLegend: "8Crafter Utilities",
                                                                                // narrationText: "8Crafter Utilities Button",
                                                                                onClick: e,
                                                                                role: l,
                                                                                selected: t,
                                                                                className: "reverse_m2lNR_rightPadding",
                                                                            },
                                                                            ${extractedSymbolNames.contextHolder}.createElement(${extractedSymbolNames.navbarButtonImageFunction}, {
                                                                                className: "${navbarButtonImageClass}",
                                                                                imageRendering: "pixelated",
                                                                                src: "assets/8crafter.gif",
                                                                                isAnimated: true,
                                                                            })
                                                                        )
                                                                    );
                                                                },
                                                                {
                                                                    onClick: (0, ${extractedSymbolNames.facetHolder}.useFacetCallback)(
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
                                                ${extractedSymbolNames.contextHolder}.createElement(
                                                    ${extractedSymbolNames.facetHolder}.Mount,
                                                    { when: $1 },
                                                    ${extractedSymbolNames.contextHolder}.createElement(
                                                        ${extractedSymbolNames.contextHolder}.Fragment,
                                                        null,
                                                        ${extractedSymbolNames.contextHolder}.createElement($2.Divider, null),
                                                        ${extractedSymbolNames.contextHolder}.createElement($3, { onClick: $4, screenAnalyticsId: $5 })
                                                    )
                                                )`);
                            successfullyReplaced = true;
                            break;
                        }
                    }
                    if (/index-[0-9a-f]{5,20}\.js$/.test(entry.data?.filename) && !successfullyReplaced) {
                        failedReplaces.push("add8CrafterUtilitiesMainMenuButton");
                    }
                }
                for (const plugin of plugins) {
                    if (plugin.namespace !== "built-in" || (settings.enabledBuiltInPlugins[plugin.id] ?? true)) {
                        for (const action of plugin.actions) {
                            if (action.context !== "per_text_file")
                                continue;
                            try {
                                distData = await action.action(distData, entry, OreUICustomizer.zipFs);
                            }
                            catch (e) {
                                console.error(e, e?.stack);
                                failedReplaces.push(`${plugin.namespace !== "built-in" ? `${plugin.namespace}:` : ""}${plugin.id}:${action.id}`);
                            }
                        }
                    }
                }
                if (failedReplaces.length > 0)
                    allFailedReplaces[entry.data?.filename] = failedReplaces;
                if (origData !== distData) {
                    if (entry.data?.filename.endsWith(".js")) {
                        distData = `// Modified by 8Crafter's Ore UI Customizer v${OreUICustomizer.format_version}: https://www.8crafter.com/utilities/ore-ui-customizer\n// Options: ${JSON.stringify({ ...settings, plugins: settings.plugins?.map((plugin) => ({ ...plugin, dataURI: "..." })) })}\n${distData}`;
                    }
                    else if (entry.data?.filename.endsWith(".css")) {
                        distData = `/* Modified by 8Crafter's Ore UI Customizer v${OreUICustomizer.format_version}: https://www.8crafter.com/utilities/ore-ui-customizer */\n/* Options: ${JSON.stringify({ ...settings, plugins: settings.plugins?.map((plugin) => ({ ...plugin, dataURI: "..." })) })} */\n${distData}`;
                    }
                    else if (entry.data?.filename.endsWith(".html")) {
                        distData = `<!-- Modified by 8Crafter's Ore UI Customizer v${OreUICustomizer.format_version}: https://www.8crafter.com/utilities/ore-ui-customizer -->\n<!-- Options: ${JSON.stringify({ ...settings, plugins: settings.plugins?.map((plugin) => ({ ...plugin, dataURI: "..." })) })} -->\n${distData}`;
                    }
                    entry.replaceText(distData);
                    console.log(`Entry ${entry.name} has been successfully modified.`);
                    modifiedCount++;
                    editedCount++;
                }
                else {
                    // console.log(`Entry ${entry.name} has not been modified.`);
                    unmodifiedCount++;
                }
            }
            else {
                console.error("Entry is not a ZipFileEntry but has a file extension of js, html, or css: " + entry.data?.filename);
                unmodifiedCount++;
            }
        }
        $("#current_customizer_status").text("Applying mods (Adding assets)...");
        try {
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/8crafter.gif", await fetch("/assets/oreui/assets/8crafter.gif").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/8crafter.gif");
            addedCount++;
            // Toggle
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/toggle_off_hover.png", await fetch("/assets/images/ui/toggle/toggle_off_hover.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/toggle_off_hover.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/toggle_off.png", await fetch("/assets/images/ui/toggle/toggle_off.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/toggle_off.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/toggle_on_hover.png", await fetch("/assets/images/ui/toggle/toggle_on_hover.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/toggle_on_hover.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/toggle_on.png", await fetch("/assets/images/ui/toggle/toggle_on.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/toggle_on.png");
            addedCount++;
            // Radio
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/radio_off_hover.png", await fetch("/assets/images/ui/radio/radio_off_hover.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/radio_off_hover.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/radio_off.png", await fetch("/assets/images/ui/radio/radio_off.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/radio_off.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/radio_on_hover.png", await fetch("/assets/images/ui/radio/radio_on_hover.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/radio_on_hover.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/radio_on.png", await fetch("/assets/images/ui/radio/radio_on.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/radio_on.png");
            addedCount++;
            // Checkbox
            // to-do
            // Textboxes
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/edit_box_indent_hover.png", await fetch("/assets/images/ui/textboxes/edit_box_indent_hover.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/edit_box_indent_hover.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/edit_box_indent.png", await fetch("/assets/images/ui/textboxes/edit_box_indent.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/edit_box_indent.png");
            addedCount++;
            // Buttons
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_dark.png", await fetch("/assets/images/ui/buttons/button_borderless_dark.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_dark.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_light.png", await fetch("/assets/images/ui/buttons/button_borderless_light.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_light.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_light_blue_default.png", await fetch("/assets/images/ui/buttons/button_borderless_light_blue_default.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_light_blue.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_darkhover.png", await fetch("/assets/images/ui/buttons/button_borderless_darkhover.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_darkhover.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_lighthover.png", await fetch("/assets/images/ui/buttons/button_borderless_lighthover.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_lighthover.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_light_blue_hover.png", await fetch("/assets/images/ui/buttons/button_borderless_light_blue_hover.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_light_blue_hover.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_darkpressed.png", await fetch("/assets/images/ui/buttons/button_borderless_darkpressed.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_darkpressed.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_lightpressed.png", await fetch("/assets/images/ui/buttons/button_borderless_lightpressed.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_lightpressed.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_light_blue_hover_pressed.png", await fetch("/assets/images/ui/buttons/button_borderless_light_blue_hover_pressed.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_light_blue_hover_pressed.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_darkpressednohover.png", await fetch("/assets/images/ui/buttons/button_borderless_darkpressednohover.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_darkpressednohover.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_lightpressednohover.png", await fetch("/assets/images/ui/buttons/button_borderless_lightpressednohover.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_lightpressednohover.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/button_borderless_light_blue_pressed.png", await fetch("/assets/images/ui/buttons/button_borderless_light_blue_pressed.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/button_borderless_light_blue_pressed.png");
            addedCount++;
        }
        catch (e) {
            console.error(e);
        }
        try {
            OreUICustomizer.zipFs.addText("gui/dist/hbui/oreUICustomizer8CrafterConfig.js", `const oreUICustomizerConfig = ${JSON.stringify(settings, undefined, 4)};
const oreUICustomizerVersion = ${JSON.stringify(OreUICustomizer.format_version)};`);
            console.log("Added gui/dist/hbui/oreUICustomizer8CrafterConfig.js");
            addedCount++;
        }
        catch (e) {
            console.error(e);
        }
        try {
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/customOverlays.js", await fetch("/assets/oreui/customOverlays.js").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/customOverlays.js");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/customOverlays.css", await fetch("/assets/oreui/customOverlays.css").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/customOverlays.css");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/class_path.js", await fetch("/assets/oreui/class_path.js").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/class_path.js");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/css.js", await fetch("/assets/oreui/css.js").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/css.js");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/JSONB.js", await fetch("/assets/oreui/JSONB.js").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/JSONB.js");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/JSONB.d.ts", await fetch("/assets/oreui/JSONB.d.ts").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/JSONB.d.ts");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/chevron_new_white_right.png", await fetch("/assets/oreui/assets/chevron_new_white_right.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/chevron_new_white_right.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/chevron_white_down.png", await fetch("/assets/oreui/assets/chevron_white_down.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/chevron_white_down.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/assets/chevron_white_up.png", await fetch("/assets/oreui/assets/chevron_white_up.png").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/assets/chevron_white_up.png");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/fonts/consola.ttf", await fetch("/assets/oreui/fonts/consola.ttf").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/fonts/consola.ttf");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/fonts/consolab.ttf", await fetch("/assets/oreui/fonts/consolab.ttf").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/fonts/consolab.ttf");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/fonts/consolai.ttf", await fetch("/assets/oreui/fonts/consolai.ttf").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/fonts/consolai.ttf");
            addedCount++;
            OreUICustomizer.zipFs.addBlob("gui/dist/hbui/fonts/consolaz.ttf", await fetch("/assets/oreui/fonts/consolaz.ttf").then((r) => r.blob()));
            console.log("Added gui/dist/hbui/fonts/consolaz.ttf");
            addedCount++;
        }
        catch (e) {
            console.error(e);
        }
        $("#current_customizer_status").text("");
        if (Object.keys(allFailedReplaces).length > 0) {
            console.warn("Some customizations failed, this could be due to the provided file being modified, or that version is not supported for the failed customizations:", allFailedReplaces);
            $("#import_files_error").css("color", "yellow");
            const originalWarning = $("#import_files_error").text();
            const newWarning = `<b>Some customizations failed, this could be due to the provided file being modified, or that version is not supported for the failed customizations:</b>
<pre>${Object.entries(allFailedReplaces)
                .map(([k, v]) => `${JSON.stringify(k)}: ${JSON.stringify(v, null, 4)}`)
                .join("\n")}</pre>`;
            $("#import_files_error").append(newWarning);
            // $("#import_files_error").text(originalWarning + (originalWarning.length > 0 ? "\n\n" : "") + newWarning);
            $("#import_files_error").prop("hidden", false);
        }
        console.log(`Added entries: ${addedCount}.`);
        console.log(`Removed entries: ${removedCount}.`);
        console.log(`Modified entries: ${modifiedCount}.`);
        console.log(`Unmodified entries: ${unmodifiedCount}.`);
        console.log(`Edited ${editedCount} entries.`);
        console.log(`Renamed ${renamedCount} entries.`);
        console.log(`Total entries: ${OreUICustomizer.zipFs.entries.length}.`);
        $("#customizer_loading_bar").hide();
        $("#apply_mods").prop("disabled", false);
        $("#download").prop("disabled", false);
        $("#download_in_new_tab_button").prop("disabled", false);
        return true;
    }
    OreUICustomizer.applyMods = applyMods;
    async function downloadInNewTab() {
        if (OreUICustomizer.zipFs === undefined) {
            throw new Error("zipFs is undefined");
        }
        $("#download").prop("disabled", true);
        $("#current_customizer_status").text("Exporting modified zip file...");
        $("#customizer_loading_bar").show();
        const blob = await OreUICustomizer.zipFs.exportBlob();
        $("#current_customizer_status").text("Generating download URI...");
        const url = URL.createObjectURL(blob);
        $("#current_customizer_status").text("Setting download link...");
        const a = $("#download_in_new_tab_link")[0];
        a.href = url;
        a.download = "gui-mod.zip";
        a.target = "_blank";
        $("#customizer_loading_bar").hide();
        $("#current_customizer_status").text("");
        $(a).prop("disabled", false);
        $("#download_in_new_tab_link_open_button").prop("disabled", false);
    }
    OreUICustomizer.downloadInNewTab = downloadInNewTab;
    async function download() {
        if (OreUICustomizer.zipFs === undefined) {
            throw new Error("zipFs is undefined");
        }
        $("#download").prop("disabled", true);
        $("#current_customizer_status").text("Exporting modified zip file...");
        $("#customizer_loading_bar").show();
        const blob = await OreUICustomizer.zipFs.exportBlob();
        $("#current_customizer_status").text("Generating download URI...");
        const url = URL.createObjectURL(blob);
        $("#current_customizer_status").text("Downloading modified zip file...");
        const a = document.createElement("a");
        a.href = url;
        a.download = "gui-mod.zip";
        a.click();
        $("#customizer_loading_bar").hide();
        $("#download").prop("disabled", false);
        $("#current_customizer_status").text("");
    }
    OreUICustomizer.download = download;
})(OreUICustomizer || (OreUICustomizer = {}));
Object.defineProperties(globalThis, {
    oreUICustomizer: { enumerable: true, value: OreUICustomizer, writable: false },
});
