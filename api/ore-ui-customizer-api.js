export const format_version = "0.23.0";
import { defaultOreUICustomizerSettings, getExtractedFunctionNames, getReplacerRegexes, } from "../assets/shared/ore-ui-customizer-assets.js";
import "./zip.js";
/**
 * Checks if a string is a URI or a path.
 *
 * @param {string} URIOrPath The string to check.
 * @returns {"URI" | "Path"} "URI" if the string is a URI, "Path" if the string is a path.
 */
function checkIsURIOrPath(URIOrPath) {
    if (/^[^:\/\\]+:\/\//.test(URIOrPath)) {
        return "URI";
    }
    else {
        return "Path";
    }
}
/**
 * Applies mods to a zip file.
 *
 * @param {Blob} file The zip file to apply mods to.
 * @param options The options.
 * @returns {Promise<ApplyModsResult>} A promise resolving to the result.
 */
export async function applyMods(file, options = {}) {
    const zipFs = new zip.fs.FS();
    zipFs.importBlob(file);
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
    const log = options.enableDebugLogging ? console.log : () => { };
    /**
     * The base URI or file path to be used to resolve URIs.
     *
     * @default "https://www.8crafter.com/"
     */
    const baseURI = options.baseURI ?? "https://www.8crafter.com/";
    if (checkIsURIOrPath(baseURI) === "Path" && !options.nodeFS) {
        throw new TypeError("options.nodeFS is required if options.baseURI is a file path.");
    }
    /**
     * Fetches a file as a blob.
     *
     * @param {string} uri The URI of the file.
     * @returns {Promise<Blob>} A promise resolving to the blob.
     */
    async function fetchFileBlob(uri) {
        const resolvedURI = new URL(uri, baseURI).href;
        if (checkIsURIOrPath(resolvedURI) === "URI") {
            const response = await fetch(resolvedURI);
            return response.blob();
        }
        else {
            return new Blob([options.nodeFS.readFileSync(resolvedURI)]);
        }
    }
    /**
     * The settings used to apply the mods.
     */
    const settings = options.settings ?? defaultOreUICustomizerSettings;
    zipFs.entries.forEach(
    /** @param {zip.ZipFileEntry<any, any> | zip.ZipDirectoryEntry} entry */ async (entry) => {
        if (/^(gui\/)?dist\/hbui\/assets\/[^\/]*?%40/.test(entry.data?.filename)) {
            let origName = entry.name;
            entry.rename(entry.name.split("/").pop().replaceAll("%40", "@"));
            log(`Entry ${origName} has been successfully renamed to ${entry.name}.`);
            modifiedCount++;
            renamedCount++;
            return 3;
        }
        if (!/^(gui\/)?dist\/hbui\/[^\/]+\.(js|html|css)$/.test(entry.data?.filename)) {
            unmodifiedCount++;
            return 0;
        }
        if (entry.data?.filename.endsWith("oreUICustomizer8CrafterConfig.js")) {
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
             * @type {string[]}
             */
            let failedReplaces = [];
            const extractedFunctionNames = getExtractedFunctionNames(origData);
            const replacerRegexes = getReplacerRegexes(extractedFunctionNames);
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
            }`);
                        successfullyReplaced = true;
                        break;
                    }
                }
                if (/index-[0-9a-f]{5}\.js$/.test(entry.data?.filename) && !successfullyReplaced) {
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
            }`);
                        successfullyReplaced = true;
                        break;
                    }
                }
                if (/index-[0-9a-f]{5}\.js$/.test(entry.data?.filename) && !successfullyReplaced) {
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
                if (/index-[0-9a-f]{5}\.js$/.test(entry.data?.filename)) {
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
                                      a.createElement(
                                          r.Mount,
                                          { when: true /* $1 */ },
                                          a.createElement(
                                              r.DeferredMount,
                                              null,
                                              a.createElement($2, {
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
                if (/index-[0-9a-f]{5}\.js$/.test(entry.data?.filename)) {
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
                        distData = distData.replace(regex, `$1 = ({ advancedData: e, isEditorWorld: t, onSeedValueChange: n, isSeedChangeLocked: l, showSeedTemplates: o, worldData: wd }) => {
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
                                            maxLength: ${settings.maxTextLengthOverride === "" ? 1000000 : settings.maxTextLengthOverride},
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
                                            maxLength: ${settings.maxTextLengthOverride === "" ? 1000000 : settings.maxTextLengthOverride},
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
                                  maxLength: ${settings.maxTextLengthOverride === "" ? 1000000 : settings.maxTextLengthOverride},
                                  value: f,
                                  onChange: n,
                                  placeholder: i(".worldSeedPlaceholder"),
                                  disabledNarrationSuffix: c(".narrationSuffixTemplateLocked"),
                              })
                          ) */);
                },`);
                        successfullyReplaced = true;
                        break;
                    }
                }
                if (/index-[0-9a-f]{5}\.js$/.test(entry.data?.filename) && !successfullyReplaced) {
                    failedReplaces.push("allowForChangingSeeds");
                }
            }
            if (settings.allowForChangingFlatWorldPreset) {
                let successfullyReplacedA = false;
                let successfullyReplacedB = false;
                for (const regex of replacerRegexes.allowForChangingFlatWorldPreset[0]) {
                    if (regex.test(distData)) {
                        distData = distData.replace(regex, `a.createElement(r.Mount,{when:true},a.createElement($1,{value:(0,r.useFacetMap)((e=>e.useFlatWorld),[],[$2]),preset:(0,r.useFacetMap)((e=>e.flatWorldPreset),[],[$2]),onValueChanged:(0,r.useFacetCallback)((e=>t=>{e.useFlatWorld=t,t&&e.flatWorldPreset?$3($4[e.flatWorldPreset]):$3("")}),[$3],[$2]),onPresetChanged:(0,r.useFacetCallback)((e=>t=>{e.flatWorldPreset=t,e.useFlatWorld?$3($4[t]):c("")}),[$3],[$2]),disabled:false,hideAccordion:(0,r.useFacetMap)((e=>null==e.flatWorldPreset),[],[$2]),achievementsDisabledMessages:$5})))`);
                        successfullyReplacedA = true;
                        break;
                    }
                }
                for (const regex of replacerRegexes.allowForChangingFlatWorldPreset[1]) {
                    if (regex.test(distData)) {
                        distData = distData.replace(regex, `return a.createElement(a.Fragment,null,a.createElement(r.Mount,{when:false},a.createElement($1,{onChange:$2,value:$3,title:$4(".useFlatWorldTitle"),description:$4(".useFlatWorldDescription"),disabled:$5,offNarrationText:$6,onNarrationText:$7,narrationSuffix:$8})),a.createElement(r.Mount,{when:false,condition:!1},a.createElement($9,{title:$4(".useFlatWorldTitle"),description:$4(".useFlatWorldDescription"),value:$3,onChange:$2,disabled:$5,narrationSuffix:$8,offNarrationText:$6,onNarrationText:$7,onExpandNarrationHint:$10},a.createElement($11,{title:$12(".title"),customSelectionDescription:a.createElement($13,{preset:$14}),options:$15,value:$16,onItemSelect:e=>l($17[e]),disabled:$5,wrapperRole:"neutral80",indented:!0,dropdownNarrationSuffix:$18}))))`);
                        successfullyReplacedB = true;
                        break;
                    }
                }
                if (/index-[0-9a-f]{5}\.js$/.test(entry.data?.filename) && origData.includes("flatWorldPreset")) {
                    if (!successfullyReplacedA) {
                        failedReplaces.push("allowForChangingFlatWorldPreset_enableToggleAndPresetSelector");
                    }
                    if (!successfullyReplacedB) {
                        failedReplaces.push("allowForChangingFlatWorldPreset_makePresetSelectorDropdownVisible");
                    }
                }
                if (/index-[0-9a-f]{5}\.js$/.test(entry.data?.filename) && origData.includes("flatWorldPreset") && !successfullyReplacedA) {
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
                            a.createElement($13, {
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
                            a.createElement($14, {
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
                        a.createElement($14, {
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
                        a.createElement(r.Mount, { when: y }, a.createElement($15, { onExportTemplate: l, onClearPlayerData: o })),
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
            }`);
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
                if (/index-[0-9a-f]{5}\.js$/.test(entry.data?.filename)) {
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
                .replace(/(?=<script defer="defer" src="\/hbui\/index-[a-zA-Z0-9]+\.js"><\/script>)/, `<script defer="defer" src="/hbui/oreUICustomizer8CrafterConfig.js"></script>
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
                if (/index-[0-9a-f]{5}\.js$/.test(entry.data?.filename) && distData === origDistData) {
                    failedReplaces.push("maxTextLengthOverride");
                }
            }
            else {
                console.warn("maxTextLengthOverride is empty");
            }
            if (settings.add8CrafterUtilitiesMainMenuButton) {
                let successfullyReplaced = false;
                for (const regex of replacerRegexes.add8CrafterUtilitiesMainMenuButton[0]) {
                    if (regex.test(distData)) {
                        distData = distData.replace(regex, `a.createElement(
                                                    r.Mount,
                                                    { when: true },
                                                    a.createElement(
                                                        a.Fragment,
                                                        null,
                                                        a.createElement($2.Divider, null),
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
                                                    { when: $1 },
                                                    a.createElement(
                                                        a.Fragment,
                                                        null,
                                                        a.createElement($2.Divider, null),
                                                        a.createElement($3, { onClick: $4, screenAnalyticsId: $5 })
                                                    )
                                                )`);
                        successfullyReplaced = true;
                        break;
                    }
                }
                if (/index-[0-9a-f]{5}\.js$/.test(entry.data?.filename) && !successfullyReplaced) {
                    failedReplaces.push("add8CrafterUtilitiesMainMenuButton");
                }
            }
            if (failedReplaces.length > 0)
                allFailedReplaces[entry.data?.filename] = failedReplaces;
            if (origData !== distData) {
                if (entry.data?.filename.endsWith(".js")) {
                    distData = `// Modified by 8Crafter's Ore UI Customizer v${format_version}: https://www.8crafter.com/utilities/ore-ui-customizer\n// Options: ${JSON.stringify(settings)}\n${distData}`;
                }
                else if (entry.data?.filename.endsWith(".css")) {
                    distData = `/* Modified by 8Crafter's Ore UI Customizer v${format_version}: https://www.8crafter.com/utilities/ore-ui-customizer */\n/* Options: ${JSON.stringify(settings)} */\n${distData}`;
                }
                else if (entry.data?.filename.endsWith(".html")) {
                    distData = `<!-- Modified by 8Crafter's Ore UI Customizer v${format_version}: https://www.8crafter.com/utilities/ore-ui-customizer -->\n<!-- Options: ${JSON.stringify(settings)} -->\n${distData}`;
                }
                entry.replaceText(distData);
                log(`Entry ${entry.name} has been successfully modified.`);
                modifiedCount++;
                editedCount++;
                return 1;
            }
            else {
                // log(`Entry ${entry.name} has not been modified.`);
                unmodifiedCount++;
                return 2;
            }
        }
        else {
            console.error("Entry is not a ZipFileEntry but has a file extension of js, html, or css: " + entry.data?.filename);
            unmodifiedCount++;
            return -1;
        }
    });
    try {
        zipFs.addBlob("gui/dist/hbui/assets/8crafter.gif", await fetchFileBlob("./assets/images/ore-ui-customizer/8crafter.gif"));
        log("Added gui/dist/hbui/assets/8crafter.gif");
        addedCount++;
        // Toggle
        zipFs.addBlob("gui/dist/hbui/assets/toggle_off_hover.png", await fetchFileBlob("./assets/images/ui/toggle/toggle_off_hover.png"));
        log("Added gui/dist/hbui/assets/toggle_off_hover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/toggle_off.png", await fetchFileBlob("./assets/images/ui/toggle/toggle_off.png"));
        log("Added gui/dist/hbui/assets/toggle_off.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/toggle_on_hover.png", await fetchFileBlob("./assets/images/ui/toggle/toggle_on_hover.png"));
        log("Added gui/dist/hbui/assets/toggle_on_hover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/toggle_on.png", await fetchFileBlob("./assets/images/ui/toggle/toggle_on.png"));
        log("Added gui/dist/hbui/assets/toggle_on.png");
        addedCount++;
        // Radio
        zipFs.addBlob("gui/dist/hbui/assets/radio_off_hover.png", await fetchFileBlob("./assets/images/ui/radio/radio_off_hover.png"));
        log("Added gui/dist/hbui/assets/radio_off_hover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/radio_off.png", await fetchFileBlob("./assets/images/ui/radio/radio_off.png"));
        log("Added gui/dist/hbui/assets/radio_off.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/radio_on_hover.png", await fetchFileBlob("./assets/images/ui/radio/radio_on_hover.png"));
        log("Added gui/dist/hbui/assets/radio_on_hover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/radio_on.png", await fetchFileBlob("./assets/images/ui/radio/radio_on.png"));
        log("Added gui/dist/hbui/assets/radio_on.png");
        addedCount++;
        // Checkbox
        // to-do
        // Textboxes
        zipFs.addBlob("gui/dist/hbui/assets/edit_box_indent_hover.png", await fetchFileBlob("./assets/images/ui/textboxes/edit_box_indent_hover.png"));
        log("Added gui/dist/hbui/assets/edit_box_indent_hover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/edit_box_indent.png", await fetchFileBlob("./assets/images/ui/textboxes/edit_box_indent.png"));
        log("Added gui/dist/hbui/assets/edit_box_indent.png");
        addedCount++;
        // Buttons
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_dark.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_dark.png"));
        log("Added gui/dist/hbui/assets/button_borderless_dark.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_light.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_light.png"));
        log("Added gui/dist/hbui/assets/button_borderless_light.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_light_blue_default.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_light_blue_default.png"));
        log("Added gui/dist/hbui/assets/button_borderless_light_blue.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_darkhover.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_darkhover.png"));
        log("Added gui/dist/hbui/assets/button_borderless_darkhover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_lighthover.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_lighthover.png"));
        log("Added gui/dist/hbui/assets/button_borderless_lighthover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_light_blue_hover.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_light_blue_hover.png"));
        log("Added gui/dist/hbui/assets/button_borderless_light_blue_hover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_darkpressed.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_darkpressed.png"));
        log("Added gui/dist/hbui/assets/button_borderless_darkpressed.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_lightpressed.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_lightpressed.png"));
        log("Added gui/dist/hbui/assets/button_borderless_lightpressed.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_light_blue_hover_pressed.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_light_blue_hover_pressed.png"));
        log("Added gui/dist/hbui/assets/button_borderless_light_blue_hover_pressed.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_darkpressednohover.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_darkpressednohover.png"));
        log("Added gui/dist/hbui/assets/button_borderless_darkpressednohover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_lightpressednohover.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_lightpressednohover.png"));
        log("Added gui/dist/hbui/assets/button_borderless_lightpressednohover.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/button_borderless_light_blue_pressed.png", await fetchFileBlob("./assets/images/ui/buttons/button_borderless_light_blue_pressed.png"));
        log("Added gui/dist/hbui/assets/button_borderless_light_blue_pressed.png");
        addedCount++;
    }
    catch (e) {
        console.error(e);
    }
    try {
        zipFs.addText("gui/dist/hbui/oreUICustomizer8CrafterConfig.js", `const oreUICustomizerConfig = ${JSON.stringify(settings, undefined, 4)};
const oreUICustomizerVersion = ${JSON.stringify(format_version)};`);
        log("Added gui/dist/hbui/oreUICustomizer8CrafterConfig.js");
        addedCount++;
    }
    catch (e) {
        console.error(e);
    }
    try {
        zipFs.addBlob("gui/dist/hbui/customOverlays.js", await fetchFileBlob("./assets/oreui/customOverlays.js"));
        log("Added gui/dist/hbui/customOverlays.js");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/customOverlays.css", await fetchFileBlob("./assets/oreui/customOverlays.css"));
        log("Added gui/dist/hbui/customOverlays.css");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/class_path.js", await fetchFileBlob("./assets/oreui/class_path.js"));
        log("Added gui/dist/hbui/class_path.js");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/css.js", await fetchFileBlob("./assets/oreui/css.js"));
        log("Added gui/dist/hbui/css.js");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/JSONB.js", await fetchFileBlob("./assets/oreui/JSONB.js"));
        log("Added gui/dist/hbui/JSONB.js");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/JSONB.d.ts", await fetchFileBlob("./assets/oreui/JSONB.d.ts"));
        log("Added gui/dist/hbui/JSONB.d.ts");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/chevron_new_white_right.png", await fetchFileBlob("./assets/oreui/assets/chevron_new_white_right.png"));
        log("Added gui/dist/hbui/assets/chevron_new_white_right.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/chevron_white_down.png", await fetchFileBlob("./assets/oreui/assets/chevron_white_down.png"));
        log("Added gui/dist/hbui/assets/chevron_white_down.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/assets/chevron_white_up.png", await fetchFileBlob("./assets/oreui/assets/chevron_white_up.png"));
        log("Added gui/dist/hbui/assets/chevron_white_up.png");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/fonts/consola.ttf", await fetchFileBlob("./assets/oreui/fonts/consola.ttf"));
        log("Added gui/dist/hbui/fonts/consola.ttf");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/fonts/consolab.ttf", await fetchFileBlob("./assets/oreui/fonts/consolab.ttf"));
        log("Added gui/dist/hbui/fonts/consolab.ttf");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/fonts/consolai.ttf", await fetchFileBlob("./assets/oreui/fonts/consolai.ttf"));
        log("Added gui/dist/hbui/fonts/consolai.ttf");
        addedCount++;
        zipFs.addBlob("gui/dist/hbui/fonts/consolaz.ttf", await fetchFileBlob("./assets/oreui/fonts/consolaz.ttf"));
        log("Added gui/dist/hbui/fonts/consolaz.ttf");
        addedCount++;
    }
    catch (e) {
        console.error(e);
    }
    log(`Added entries: ${addedCount}.`);
    log(`Removed entries: ${removedCount}.`);
    log(`Modified entries: ${modifiedCount}.`);
    log(`Unmodified entries: ${unmodifiedCount}.`);
    log(`Edited ${editedCount} entries.`);
    log(`Renamed ${renamedCount} entries.`);
    log(`Total entries: ${zipFs.entries.length}.`);
    return {
        zip: await zipFs.exportBlob(),
        config: settings,
        allFailedReplaces,
        addedCount,
        removedCount,
        modifiedCount,
        unmodifiedCount,
        editedCount,
        renamedCount,
        totalEntries: zipFs.entries.length,
    };
}
