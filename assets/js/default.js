import("./JSONB.js");
/**
 * The volume options.
 *
 * Each category *should* be between 0 and 100 (inclusive).
 *
 * @type {{[category in typeof volumeCategories[number]]: number}}
 */
const volume = {
    master: 100,
    ui: 100,
};
/**
 * @type {`${keyof typeof SoundEffects["audioElementsB"]}${"" | "B"}`}
 */
let defaultButtonSoundEffect = "pop";
/**
 *
 * @param {()=>boolean} stopOnCondition
 * @param {number} interval
 * @param {number} step
 * @returns
 */
async function cycleHueRotate(stopOnCondition = () => false, interval = 20, step = 1) {
    let val = 0;
    return new Promise((resolve) => {
        let id = setInterval(() => {
            if (stopOnCondition() == true) {
                clearInterval(id);
                resolve(true);
                return;
            }
            // $("#hue_rotate_deg_slider").val(($("#hue_rotate_deg_slider").val() + 1) % 360);
            // $("#hue_rotate_deg_slider").trigger("input");

            val += step;
            val %= 360;

            const rule = document.styleSheets[0].cssRules.item(
                Object.values(document.styleSheets[0].cssRules).findIndex((r) => r.selectorText == ":root" && r.cssText.includes("--hue-rotate-deg:"))
            );
            rule.style.cssText = rule.style.cssText.replace(/(?<=--hue-rotate-deg: )\d+(?:\.\d+)?(?=deg;)/, val);
        }, interval);
    });
}
// globalThis.cycleHueRotate = cycleHueRotate;
/**
 *
 * @param {string} name
 * @returns
 */
function getStyleRule(name) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var ix,
            sheet = document.styleSheets[i];
        for (ix = 0; ix < sheet.cssRules.length; ix++) {
            if (sheet.cssRules[ix].selectorText === name) return sheet.cssRules[ix].style;
        }
    }
    return null;
}
/**
 *
 * @param {(rule: CSSRule, ruleName: string, styleSheet: CSSStyleSheet)=>any} callbackfn
 * @returns
 */
function forEachRuleCallback(callbackfn) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var ix,
            sheet = document.styleSheets[i];
        for (ix = 0; ix < sheet.cssRules.length; ix++) {
            callbackfn(sheet.cssRules.item(ix)?.style, sheet.cssRules[ix].selectorText, sheet);
        }
    }
    return null;
}
/**
 * Saves a setting.
 *
 * @param {string} key The ID of the setting.
 * @param {any} value The new value for the settings. Should be a value that can be serialized by `JSON.stringify`.
 * @throws {DOMException} Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
 */
function saveSetting(key, value) {
    window.localStorage.setItem(`8CrafterWebsite-${key}(734cf76b-bd45-4935-a129-b1208fa47637)`, JSON.stringify(value));
}
/**
 * Gets a setting.
 *
 * @param {string} key The ID of the setting.
 * @returns {string | null} The value of the setting, or `null` if the setting hasn't been set.
 */
function getSetting(key) {
    return JSON.parse(window.localStorage.getItem(`8CrafterWebsite-${key}(734cf76b-bd45-4935-a129-b1208fa47637)`) ?? "null");
}
/**
 *
 * @param {"auto"|"dark"|"light"|"BlueTheme"} theme
 */
function changeTheme(theme, setCSS = true) {
    if (!["auto", "dark", "light", "BlueTheme"].includes(theme)) {
        throw new TypeError("Invalid Theme: " + JSON.stringify(theme));
    }
    colorScheme = ["auto", "dark", "light", "BlueTheme"].indexOf(theme);
    window.localStorage.setItem("8CrafterWebsite-ColorScheme(734cf76b-bd45-4935-a129-b1208fa47637)", String(colorScheme));
    if (setCSS) {
        changeThemeCSS(theme);
    }
}
const themeDisplayMapping = {
    get auto() {
        return window.matchMedia ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "Auto (Dark)" : "Auto (Light)") : "Auto";
    },
    dark: "Dark",
    light: "Light",
    BlueTheme: "Blue",
};
const themeDisplayMappingB = {
    get auto() {
        return window.matchMedia ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : "dark";
    },
    dark: "dark",
    light: "light",
    BlueTheme: "BlueTheme",
};

// MediaQueryList
const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");

// recommended method for newer browsers: specify event-type as first argument
darkModePreference.addEventListener("change", (e) => e.matches && changeThemeCSS("auto"));

/**
 *
 * @param {"auto"|"dark"|"light"|"BlueTheme"} theme
 */
function changeThemeCSS(theme) {
    if (!["auto", "dark", "light", "BlueTheme"].includes(theme)) {
        throw new TypeError("Invalid CSS Theme Value: " + JSON.stringify(theme));
    }
    try {
        $("#themeDropdown > #dropdowncontents").find(`input[id="${theme}"]`).prop("checked", true);
        $("#themeDropdownButtonSelectedOptionTextDisplay").text(themeDisplayMapping[theme]);
        $("#themeDropdownAutoOptionLabel").text(themeDisplayMapping.auto);
    } catch (e) {
        console.error(e.toString(), e.stack);
    }
    forEachRuleCallback((rule, ruleName, styleSheet) => {
        if (
            !!rule?.cssText?.match(
                /(?<=(?:[\n\s;\{]|^)---theme-var-switcher--[a-zA-Z0-9\-_]+[\n\s]*:[\n\s]*var\([\n\s]*--[a-zA-Z0-9\-_]*)(?:light|dark|BlueTheme)(?=[a-zA-Z0-9\-_]*[\n\s]*\)[\n\s]*;?)/
            )
        ) {
            rule.cssText = rule.cssText.replaceAll(
                /(?<=(?:[\n\s;\{]|^)---theme-var-switcher--[a-zA-Z0-9\-_]+[\n\s]*:[\n\s]*var\([\n\s]*--[a-zA-Z0-9\-_]*)(?:light|dark|BlueTheme)(?=[a-zA-Z0-9\-_]*[\n\s]*\)[\n\s]*;?)/g,
                theme == "auto" ? (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme
            );
        }
    });
    if (theme == "auto") {
        if (themeDisplayMappingB.auto == "dark") {
            $(".btn > span").addClass("preventinvert");
            $(":root").addClass("dark_theme");
            $(":root").removeClass("light_theme blue_theme");
        } else {
            $(".btn > span").removeClass("preventinvert");
            $(":root").addClass("light_theme");
            $(":root").removeClass("dark_theme blue_theme");
        }
    } else if (theme == "dark") {
        $(".btn > span").addClass("preventinvert");
        $(":root").addClass("dark_theme");
        $(":root").removeClass("light_theme blue_theme");
    } else if (theme == "light") {
        $(".btn > span").removeClass("preventinvert");
        $(":root").addClass("light_theme");
        $(":root").removeClass("dark_theme blue_theme");
    } else if (theme == "BlueTheme") {
        $(".btn > span").removeClass("preventinvert");
        $(":root").addClass("blue_theme");
        $(":root").removeClass("dark_theme light_theme");
    } else {
        $(".btn > span").removeClass("preventinvert");
        $(":root").addClass("light_theme");
        $(":root").removeClass("dark_theme blue_theme");
    }
}

// Sound Effects
/**
 * @type {["master", "ui"]}
 */
const volumeCategories = ["master", "ui"];
const volumeCategoryDisplayMapping = {
    master: "Master",
    ui: "UI",
};
/**
 * Get the volume of a volume category.
 *
 * @param {typeof volumeCategories[number]} category The volume category to get the volume of.
 * @returns {number} The volume of the volume category. Between 0 and 100 (inclusive).
 */
function getAudioCategoryVolume(category) {
    if (!volumeCategories.includes(category)) {
        throw new TypeError("Invalid Audio Volume Category: " + JSON.stringify(category));
    }
    if (category === "master") {
        return volume.master;
    }
    return volume[category] * (volume.master / 100);
}
async function readableStreamToBlob(readableStream) {
    const reader = readableStream.getReader();
    const chunks = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        chunks.push(value);
    }
    return new Blob(chunks);
}
const audioCtx = new AudioContext();
class SoundEffects {
    /**
     * @type {string}
     */
    static scriptSrc = document.currentScript.src;
    static audioElements = {
        pop: new Audio(new URL("../sounds/ui/click/Click_stereo.ogg.mp3", SoundEffects.scriptSrc)),
        release: new Audio(new URL("../sounds/ui/click/Release.ogg.mp3", SoundEffects.scriptSrc)),
        toast: new Audio(new URL("../sounds/ui/toast.ogg", SoundEffects.scriptSrc)),
    };
    static dataURLs = {};
    static audioElementsB = {
        get pop() {
            return new Audio(SoundEffects.dataURLs.pop);
        },
        get release() {
            return new Audio(SoundEffects.dataURLs.release);
        },
        get toast() {
            return new Audio(SoundEffects.dataURLs.toast);
        },
    };
    /**
     * @type {{pop: AudioBuffer; release: AudioBuffer; toast: AudioBuffer;}}
     */
    static audioBuffers = {};
    /**
     * Plays the pop sound effect.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<void>} A promise that resolves when the audio has finished playing.
     */
    static async pop(options = { volumeCategory: "ui", volume: undefined }) {
        const volume = (options?.volume ?? getAudioCategoryVolume(options?.volumeCategory ?? "ui")) / 100;
        const audioElement = this.audioElementsB.pop;
        audioElement.volume = volume;
        return await audioElement.play();
    }
    /**
     * Plays the pop sound effect using an audio buffer.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<{source: AudioScheduledSourceNode; ev: Event;}>} A promise that resolves with the audio source and event when the audio buffer has finished playing.
     */
    static async popB(options = { volumeCategory: "ui", volume: undefined }) {
        return await this.playBuffer(this.audioBuffers.pop, options);
    }
    /**
     * Plays the release sound effect.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<void>} A promise that resolves when the audio has finished playing.
     */
    static async release(options = { volumeCategory: "ui", volume: undefined }) {
        const volume = (options?.volume ?? getAudioCategoryVolume(options?.volumeCategory ?? "ui")) / 100;
        const audioElement = this.audioElementsB.release;
        audioElement.volume = volume;
        return await audioElement.play();
    }
    /**
     * Plays the release sound effect using an audio buffer.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<{source: AudioScheduledSourceNode; ev: Event;}>} A promise that resolves with the audio source and event when the audio buffer has finished playing.
     */
    static async releaseB(options = { volumeCategory: "ui", volume: undefined }) {
        return await this.playBuffer(this.audioBuffers.release, options);
    }
    /**
     * Plays the toast sound effect.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<void>} A promise that resolves when the audio has finished playing.
     */
    static async toast(options = { volumeCategory: "ui", volume: undefined }) {
        const volume = (options?.volume ?? getAudioCategoryVolume(options?.volumeCategory ?? "ui")) / 100;
        const audioElement = this.audioElementsB.toast;
        audioElement.volume = volume;
        return await audioElement.play();
    }
    /**
     * Plays the toast sound effect using an audio buffer.
     *
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<{source: AudioScheduledSourceNode; ev: Event;}>} A promise that resolves with the audio source and event when the audio buffer has finished playing.
     */
    static async toastB(options = { volumeCategory: "ui", volume: undefined }) {
        return await this.playBuffer(this.audioBuffers.toast, options);
    }
    /**
     * Play an audio buffer.
     *
     * @param {AudioBuffer | null} audioBuffer The audio buffer to play.
     * @param {object} [options = {volumeCategory: "ui", volume: undefined}] The options to use.
     * @param {typeof volumeCategories[number]} [options.volumeCategory = "ui"] The volume category to use.
     * @param {number} [options.volume = undefined] The volume to use. If undefined, the volume of the volume category will be used. If specified it will override the volume of the volume category. Should be a float between 0 and 100 (inclusive).
     * @returns {Promise<{source: AudioScheduledSourceNode, ev: Event}>} A promise that resolves with the audio source and event when the audio buffer has finished playing.
     */
    static playBuffer(audioBuffer, options = { volumeCategory: "ui", volume: undefined }) {
        const volume = -1 + (options?.volume ?? getAudioCategoryVolume(options?.volumeCategory ?? "ui")) / 100;
        // create an AudioBufferSourceNode
        const source = audioCtx.createBufferSource();

        // set the AudioBuffer
        source.buffer = audioBuffer;

        const sourceB = audioCtx.createGain();
        sourceB.gain.value = volume;
        source.connect(sourceB);
        sourceB.connect(audioCtx.destination);

        // connect it to the default sound output
        source.connect(audioCtx.destination);

        // start playback
        source.start();
        return new Promise((resolve) => (source.onended = (ev) => resolve({ source, ev })));
    }
}
(async () => ({
    pop: await audioCtx.decodeAudioData(await (await fetch("/assets/sounds/ui/click/Click_stereo.ogg.mp3")).arrayBuffer()),
    release: await audioCtx.decodeAudioData(await (await fetch("/assets/sounds/ui/click/Release.ogg.mp3")).arrayBuffer()),
    toast: await audioCtx.decodeAudioData(await (await fetch("/assets/sounds/ui/toast.ogg")).arrayBuffer()),
}))().then((o) => (SoundEffects.audioBuffers = o));
(async () => {
    const file = await (await fetch("/assets/sounds/ui/click/Click_stereo.ogg.mp3")).blob();
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            SoundEffects.dataURLs.pop = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
})();
(async () => {
    const file = await (await fetch("/assets/sounds/ui/click/Release.ogg.mp3")).blob();
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            SoundEffects.dataURLs.release = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
})();
(async () => {
    const file = await (await fetch("/assets/sounds/ui/toast.ogg")).blob();
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            SoundEffects.dataURLs.toast = reader.result;
        },
        false
    );

    if (file) {
        reader.readAsDataURL(file);
    }
})();

// On Load
$(async function onDocumentLoad() {
    // console.log(1)
    const autofill_from_file_elements = document.getElementsByTagName("autofill_from_file");
    const autofill_from_file_elements_fill_promises = [];
    for (let i = 0; i < autofill_from_file_elements.length; i++) {
        let v = autofill_from_file_elements.item(i);
        const path = $(v).attr("src");
        // console.log(1.1)
        autofill_from_file_elements_fill_promises.push(
            (async () => {
                v.outerHTML = path.endsWith(".js")
                    ? (await import(path)).default(...JSON.parse($(v).attr("params") ?? "[]"))
                    : await (await fetch(new Request(path))).text();
                // console.log(1.2)
            })()
        );
        // console.log(1.3)
    }
    for await (let r of autofill_from_file_elements_fill_promises) {
        // console.log(1.4)
    }
    // console.log(1.5)
    // Commented out because the website is no longer under construction.
    /* if(new URLSearchParams(window.location.search).get('hide_under_construction_alert')=='true'){
        try{
            $("#under_construction_alert")[0].style.display='none';
        }catch(e){
            console.error(e, e.stack)
        }
    }; */
    try {
        const resizeObserver = new ResizeObserver((event) => {
            const rule = document.styleSheets[0].cssRules.item(Object.values(document.styleSheets[0].cssRules).findIndex((r) => r.selectorText == ":root"));
            rule.style.cssText = rule.style.cssText.replace(/(?<=--header-height: )\d+(?:\.\d+)?(?=px;)/, $(event[0].target).height());
            // console.log($(event[0].target).height(), rule.style.cssText.replace(/(?<=--header-height: )\d+(?:\.\d+)?(?=px;)/, $(event[0].target).height()))
        });
        resizeObserver.observe($("header").get(0));
    } catch (e) {
        console.error(e, e.stack);
    }
    try {
        const resizeObserverB = new ResizeObserver((event) => {
            const rule = document.styleSheets[0].cssRules.item(Object.values(document.styleSheets[0].cssRules).findIndex((r) => r.selectorText == ":root"));
            rule.style.cssText = rule.style.cssText.replace(/(?<=--body-height: )\d+(?:\.\d+)?(?=px;)/, $(event[0].target).height());
            // console.log($(event[0].target).height(), rule.style.cssText.replace(/(?<=--header-height: )\d+(?:\.\d+)?(?=px;)/, $(event[0].target).height()))
        });
        resizeObserverB.observe($("body").get(0));
    } catch (e) {
        console.error(e, e.stack);
    }
    try {
        const resizeObserverC = new ResizeObserver((event) => {
            const rule = document.styleSheets[0].cssRules.item(Object.values(document.styleSheets[0].cssRules).findIndex((r) => r.selectorText == ":root"));
            rule.style.cssText = rule.style.cssText.replace(/(?<=--footer-height: )\d+(?:\.\d+)?(?=px;)/, $(event[0].target).height() + 20);
            // console.log($(event[0].target).height(), rule.style.cssText.replace(/(?<=--header-height: )\d+(?:\.\d+)?(?=px;)/, $(event[0].target).height()))
        });
        resizeObserverC.observe($("footer.main-footer").get(0));
    } catch (e) {
        console.error(e, e.stack);
    }
    globalThis.colorScheme = Number(window.localStorage.getItem("8CrafterWebsite-ColorScheme(734cf76b-bd45-4935-a129-b1208fa47637)") ?? 0);
    if (colorScheme == 0) {
        changeThemeCSS("auto");
    } else if (colorScheme == 1) {
        changeThemeCSS("dark");
    } else if (colorScheme == 2) {
        changeThemeCSS("light");
    } else if (colorScheme == 3) {
        changeThemeCSS("BlueTheme");
    } else {
        /*
        console.error("Invalid value for variable colorScheme: " + JSON.stringify(
            colorScheme,
            undefined,
            0,
            {
                bigint: true,
                class: true,
                undefined: true,
                Infinity: true,
                NegativeInfinity: true,
                NaN: true,
                get: true,
                set: true,
                function: true,
            }
        ))*/
    }
    $("#hue_rotate_deg_slider").on("input", () => {
        saveSetting("hue_rotate_deg", $("#hue_rotate_deg_slider").val());
        const rule = document.styleSheets[0].cssRules.item(
            Object.values(document.styleSheets[0].cssRules).findIndex((r) => r.selectorText == ":root" && r.cssText.includes("--hue-rotate-deg:"))
        );
        rule.style.cssText = rule.style.cssText.replace(/(?<=--hue-rotate-deg: )\d+(?:\.\d+)?(?=deg;)/, $("#hue_rotate_deg_slider").val());
    });
    volumeCategories.forEach((category) => {
        const slider = $(`#${category}_volume_slider`);
        const loadedValue = getSetting(`${category}_volume`) ?? 100;
        volume[category] = loadedValue;
        slider.parent().find("label").text(`${volumeCategoryDisplayMapping[category]} Volume: ${loadedValue}%`);
        slider.val(loadedValue);
        slider.on("input", () => {
            const value = $(`#${category}_volume_slider`).val();
            saveSetting(`${category}_volume`, value);
            volume[category] = value;
        });
    });
    defaultButtonSoundEffect = getSetting("defaultButtonSoundEffect") ?? "pop";
    const defaultButtonSoundEffectDropdownButtonSelectedOptionTextDisplay = $("#defaultButtonSoundEffectDropdownButtonSelectedOptionTextDisplay");
    defaultButtonSoundEffectDropdownButtonSelectedOptionTextDisplay.text($(".defaultButtonSoundEffectDropdownOption:has(input[value='" + defaultButtonSoundEffect + "']) label").text());
    $(".defaultButtonSoundEffectDropdownOption input[value='" + defaultButtonSoundEffect + "']").prop("checked", true);
    $(".defaultButtonSoundEffectDropdownOption").click((event) => {
        const input = $(event.currentTarget).find("input")[0];
        const label = $(event.currentTarget).find("label")[0];
        const value = input.value;
        saveSetting("defaultButtonSoundEffect", value);
        defaultButtonSoundEffect = value;
        if(defaultButtonSoundEffectDropdownButtonSelectedOptionTextDisplay.text() === label.textContent) return;
        SoundEffects[defaultButtonSoundEffect]();
        defaultButtonSoundEffectDropdownButtonSelectedOptionTextDisplay.text(label.textContent);
    });
    try {
        if (getSetting("use_noto_sans_font") == true) {
            $("#use_noto_sans_font").prop("checked", true);
            $(":root").addClass("use_noto_sans_font");
        }
    } catch {}
    if (getSetting("filter_sepia_enabled") == true) {
        $("#filter_sepia_enabled").prop("checked", true);
        $(":root").addClass("filter_sepia");
    }
    if (getSetting("filter_invert_enabled") == true) {
        $("#filter_invert_enabled").prop("checked", true);
        $(":root").addClass("filter_invert");
    }
    if (getSetting("filter_grayscale_enabled") == true) {
        $("#filter_grayscale_enabled").prop("checked", true);
        $(":root").addClass("filter_grayscale");
    }
    if (!!getSetting("hue_rotate_deg")) {
        $("#hue_rotate_deg_slider").val(getSetting("hue_rotate_deg"));
        $("#hue_rotate_deg_slider").trigger("input");
    }
    if (!!getSetting("zoom")) {
        $("#zoom_text_box").val(getSetting("zoom").slice(0, -1));
        $(":root")[0].style.zoom = getSetting("zoom");
    }
    $(".themeDropdownOption").click((event) => {
        changeTheme($(event.currentTarget).find("input")[0].id);
    });
    $("#use_noto_sans_font")
        .parent()
        .click(() => {
            saveSetting("use_noto_sans_font", $("#use_noto_sans_font").prop("checked"));
            if ($("#use_noto_sans_font").prop("checked")) {
                $(":root").addClass("use_noto_sans_font");
            } else {
                $(":root").removeClass("use_noto_sans_font");
            }
        });
    $("#use_noto_sans_font").click((e) => {
        e.preventDefault = true;
        $("#use_noto_sans_font").prop("checked", !$("#use_noto_sans_font").prop("checked"));
        saveSetting("use_noto_sans_font", $("#use_noto_sans_font").prop("checked"));
        if ($("#use_noto_sans_font").prop("checked")) {
            $(":root").addClass("use_noto_sans_font");
        } else {
            $(":root").removeClass("use_noto_sans_font");
        }
    });
    $("#filter_invert_enabled")
        .parent()
        .click(() => {
            saveSetting("filter_invert_enabled", $("#filter_invert_enabled").prop("checked"));
            if ($("#filter_invert_enabled").prop("checked")) {
                $(":root").addClass("filter_invert");
            } else {
                $(":root").removeClass("filter_invert");
            }
        });
    $("#filter_invert_enabled").click((e) => {
        e.preventDefault = true;
        $("#filter_invert_enabled").prop("checked", !$("#filter_invert_enabled").prop("checked"));
        saveSetting("filter_invert_enabled", $("#filter_invert_enabled").prop("checked"));
        if ($("#filter_invert_enabled").prop("checked")) {
            $(":root").addClass("filter_invert");
        } else {
            $(":root").removeClass("filter_invert");
        }
    });
    $("#filter_sepia_enabled")
        .parent()
        .click(() => {
            saveSetting("filter_sepia_enabled", $("#filter_sepia_enabled").prop("checked"));
            if ($("#filter_sepia_enabled").prop("checked")) {
                $(":root").addClass("filter_sepia");
            } else {
                $(":root").removeClass("filter_sepia");
            }
        });
    $("#filter_sepia_enabled").click((e) => {
        e.preventDefault = true;
        $("#filter_sepia_enabled").prop("checked", !$("#filter_sepia_enabled").prop("checked"));
        saveSetting("filter_sepia_enabled", $("#filter_sepia_enabled").prop("checked"));
        if ($("#filter_sepia_enabled").prop("checked")) {
            $(":root").addClass("filter_sepia");
        } else {
            $(":root").removeClass("filter_sepia");
        }
    });
    $("#filter_grayscale_enabled")
        .parent()
        .click(() => {
            saveSetting("filter_grayscale_enabled", $("#filter_grayscale_enabled").prop("checked"));
            if ($("#filter_grayscale_enabled").prop("checked")) {
                $(":root").addClass("filter_grayscale");
            } else {
                $(":root").removeClass("filter_grayscale");
            }
        });
    $("#filter_grayscale_enabled").click((e) => {
        e.preventDefault = true;
        $("#filter_grayscale_enabled").prop("checked", !$("#filter_grayscale_enabled").prop("checked"));
        saveSetting("filter_grayscale_enabled", $("#filter_grayscale_enabled").prop("checked"));
        if ($("#filter_grayscale_enabled").prop("checked")) {
            $(":root").addClass("filter_grayscale");
        } else {
            $(":root").removeClass("filter_grayscale");
        }
    });
    $('input[name="settings_section"]').change(() => {
        try {
            const id = $('input[name="settings_section"]:checked').attr("id").slice(23);
            $("#settings_menu > settings_section").each((_i, section) => {
                if ($(section).attr("id").slice(0, -17) === id) {
                    $(section).get(0).style.display = "";
                } else {
                    $(section).get(0).style.display = "none";
                }
            });
        } catch (e) {
            console.error(e, e.stack);
        }
    });
    $("#confirm_zoom_change").click(() => {
        $(":root")[0].style.zoom = $("#zoom_text_box").val() + "%";
    });
    $("#save_zoom_change").click(() => {
        saveSetting("zoom", $("#zoom_text_box").val() + "%");
    });
    // $('#link_button_list').scrollTop(-$('#link_button_list')[0].scrollHeight);

    // all <a> tags containing a certain rel=""
    // source: https://stackoverflow.com/a/15579157/16872762
    $("a[rel~='keep-params']").click(function (e) {
        e.preventDefault();

        var params = window.location.search,
            dest = $(this).attr("href") + params;

        // in my experience, a short timeout has helped overcome browser bugs
        window.setTimeout(function () {
            window.location.href = dest;
        }, 100);
    });
    $(".collapsible-group > .collapsible-group-header *").attr("inert", true);
    const collapsibeGroupHeaders = $(".collapsible-group > .collapsible-group-header");
    collapsibeGroupHeaders
        .find("> h1, h2, h3, h4, h5, h6")
        .prepend('<img src="/assets/images/ui/glyphs/chevron_new_white_right.png" class="collapsible-group-header-arrow"></img>');

    const collapsibeGroupsThatNeedExpanding = $(".collapsible-group:first-of-type():not(.collapsible-group-collapsed), .collapsible-group.start-not-collapsed");
    collapsibeGroupsThatNeedExpanding.removeClass("collapsible-group-collapsed");
    collapsibeGroupsThatNeedExpanding.find("> .collapsible-group-content").removeClass("collapsible-group-content-collapsed");
    collapsibeGroupsThatNeedExpanding.find("> .collapsible-group-content").css("display", "");
    collapsibeGroupsThatNeedExpanding
        .find("> .collapsible-group-header")
        .find("> h1, h2, h3, h4, h5, h6")
        .find("> .collapsible-group-header-arrow")
        .css("transform", "rotate(90deg)");

    const collapsibeGroupsThatNeedCollapsing = $(
        ".collapsible-group:not(:first-of-type()):not(.start-not-collapsed), .collapsible-group.collapsible-group-collapsed"
    );
    collapsibeGroupsThatNeedCollapsing.addClass("collapsible-group-collapsed");
    collapsibeGroupsThatNeedCollapsing.find("> .collapsible-group-content").addClass("collapsible-group-content-collapsed");
    collapsibeGroupsThatNeedCollapsing.find("> .collapsible-group-content").css("display", "none");
    collapsibeGroupsThatNeedCollapsing
        .find("> .collapsible-group-header")
        .find("> h1, h2, h3, h4, h5, h6")
        .find("> .collapsible-group-header-arrow")
        .css("transform", "rotate(0deg)");

    collapsibeGroupHeaders.click((e) => {
        e.preventDefault = true;
        const parent = $(e.target).parent();
        const header = parent.find("> .collapsible-group-header");
        const content = parent.find("> .collapsible-group-content");
        if (content.hasClass("collapsible-group-content-collapsed")) {
            header.find("> h1, h2, h3, h4, h5, h6").find("> .collapsible-group-header-arrow").css("transform", "rotate(90deg)");
            content.slideDown();
            content.removeClass("collapsible-group-content-collapsed");
            parent.removeClass("collapsible-group-collapsed");
        } else {
            header.find("> h1, h2, h3, h4, h5, h6").find("> .collapsible-group-header-arrow").css("transform", "rotate(0deg)");
            content.slideUp(() => {
                content.addClass("collapsible-group-content-collapsed");
                parent.addClass("collapsible-group-collapsed");
            });
        }
    });
    $(
        ".btn, .mcdropdownoption:not(.defaultButtonSoundEffectDropdownOption), .radio_button_container_label, a:has(> .settings_button:not(.silent)), .mctogglecontainer, .horizontal-nav > li > a, .vertical-nav > li > a, .vertical-nav > li > div > a"
    )
        .filter(":not(.silent):not(.soundEffectBound):not(.defaultButtonSoundEffectBound)")
        .each((index, element) => {
            if ($(element).hasClass("silent") || $(element).hasClass("soundEffectBound") || $(element).hasClass("defaultButtonSoundEffectBound")) return;
            const elem = $(element);
            elem.addClass("soundEffectBound");
            elem.addClass("defaultButtonSoundEffectBound");
            $(element).mousedown(() => SoundEffects[defaultButtonSoundEffect]());
        });
});
class PurpleBorderBackgroundElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
    <img src="/assets/images/ui/backgrounds/purpleBorder_sliceL.png" style="height: calc(100% - 1.75vw); width: 1vw; left: 0px; top: 0.875vw; z-index: -5;
    position: absolute; image-rendering: pixelated;">
    <img src="/assets/images/ui/backgrounds/purpleBorder_sliceR.png" style="height: calc(100% - 1.75vw); width: 1vw; right: 0px; top: 0.875vw; z-index: -5;
    position: absolute; image-rendering: pixelated;">
    <img src="/assets/images/ui/backgrounds/purpleBorder_sliceT.png" style="height: 1vw; width: calc(100% - 1.75vw); left: 0.875vw; top: 0px; z-index: -5;
    position: absolute; image-rendering: pixelated;">
    <img src="/assets/images/ui/backgrounds/purpleBorder_sliceB.png" style="height: 1vw; width: calc(100% - 1.75vw); left: 0.875vw; bottom: 0px; z-index: -5;
    position: absolute; image-rendering: pixelated;">
    <img src="/assets/images/ui/backgrounds/purpleBorder_sliceTL.png" style="height: 1vw; width: 1vw; left: 0px; top: 0px; z-index: -4;
    position: absolute; image-rendering: pixelated;">
    <img src="/assets/images/ui/backgrounds/purpleBorder_sliceTR.png" style="height: 1vw; width: 1vw; right: 0px; top: 0px; z-index: -4;
    position: absolute; image-rendering: pixelated;">
    <img src="/assets/images/ui/backgrounds/purpleBorder_sliceBL.png" style="height: 1vw; width: 1vw; left: 0px; bottom: 0px; z-index: -4;
    position: absolute; image-rendering: pixelated;">
    <img src="/assets/images/ui/backgrounds/purpleBorder_sliceBR.png" style="height: 1vw; width: 1vw; right: 0px; bottom: 0px; z-index: -4;
    position: absolute; image-rendering: pixelated;">
    <img src="/assets/images/ui/backgrounds/purpleBorder_sliceC.png" style="height: calc(100% - 1.75vw); width: calc(100% - 1.75vw); right: 0.875vw; bottom: 0.875vw; z-index: -6;
    position: absolute; image-rendering: pixelated;">`;
    }
}

customElements.define("purple-border_background", PurpleBorderBackgroundElement);

