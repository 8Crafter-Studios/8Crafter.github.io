/**
 * @import {JSONB, JSONBConsole} from "./JSONB.d.ts"
 */

// Hooks onto console data.
if (console.everything === undefined) {
    console.everything = [];
    function TS() {
        return new Date().toLocaleString("sv", { timeZone: "UTC" }) + "Z";
    }
    window.onerror = function (error, url, line) {
        console.everything.push({
            type: "exception",
            timeStamp: TS(),
            value: { error, url, line },
        });
        return false;
    };
    window.onunhandledrejection = function (e) {
        console.everything.push({
            type: "promiseRejection",
            timeStamp: TS(),
            value: e.reason,
        });
    };

    function hookLogType(logType) {
        const original = console[logType].bind(console);
        return function () {
            const data = {
                type: logType,
                timeStamp: TS(),
                value: Array.from(arguments),
            };
            console.everything.push(data);
            original.apply(console, arguments);
            (globalThis.onConsoleLogCallbacks ?? []).forEach((f) => {
                f(data);
            });
        };
    }

    ["log", "error", "warn", "debug"].forEach((logType) => {
        console[logType] = hookLogType(logType);
    });
}

/**
 * @type {HTMLDivElement}
 */
let mainMenu8CrafterUtilities;

/**
 * @type {HTMLDivElement}
 */
let consoleOverlayElement;

/**
 * @type {HTMLDivElement}
 */
let consoleOverlayTextElement;

/**
 * @type {HTMLTextAreaElement}
 */
let consoleOverlayInputFieldElement;

/**
 * @type {HTMLDivElement}
 */
let screenDisplayElement;

/**
 * @type {HTMLDivElement}
 */
let elementGeneralDebugOverlayElement;

/**
 * @type {HTMLDivElement}
 */
let smallCornerDebugOverlayElement;

/**
 * @type {HTMLDivElement}
 */
let cssEditorDisplayElement;

/**
 * @type {HTMLDivElement}
 */
let screenInputBlocker;

/**
 * @type {HTMLDivElement}
 */
let htmlSourceCodePreviewElement;

/**
 * @type {HTMLParagraphElement}
 */
let htmlSourceCodePreviewElementP;

/**
 * @type {HTMLDivElement}
 */
let cssEditorSubtitleElement;

/**
 * @type {HTMLStyleElement}
 */
let customGlobalCSSStyleElement;

/**
 * @type {HTMLTextAreaElement}
 */
let cssEditorTextBox;

/**
 * @type {HTMLParagraphElement}
 */
let cssEditorErrorText;

/**
 * @type {HTMLButtonElement}
 */
let cssEditorSelectTargetButton;

/**
 * @type {"none" | "hoveredElementDetails"}
 */
let currentDebugMode = "none";

/**
 * @type {CSSStyleSheet[]}
 */
let cssEditor_selectableStyleSheets = [];

/**
 * @type {HTMLElement}
 */
let cssEditorSelectedElement;

/**
 * @type {CSSStyleSheet}
 */
let cssEditorSelectedStyleSheet;

/**
 * @type {CSSRule[]}
 */
let cssEditorSelectedStyleSheet_rules = [];
/**
 * @type {"none" | "element" | "styleSheet" | "root" | "globalStyleElement"}
 */
let cssEditorSelectedType = "none";

/**
 * @type {boolean}
 */
let cssEditorInSelectMode = false;

/**
 * @type {HTMLElement & EventTarget}
 */
let currentMouseHoverTarget;

var mousePos = { clientX: 0, clientY: 0, screenX: 0, screenY: 0, offsetX: 0, offsetY: 0, pageX: 0, pageY: 0, layerX: 0, layerY: 0, movementX: 0, movementY: 0 };

/**
 * @type {string[]}
 */
var heldKeys = [];

/**
 * @type {number[]}
 */
var heldKeyCodes = [];

/**
 * @type {((data: { type: "log" | "error" | "warn" | "debug", timeStamp: string, value: any[], }) => void)[]}
 */
globalThis.onConsoleLogCallbacks = globalThis.onConsoleLogCallbacks ?? [];

/**
 * Validates the CSS or JSON in the CSS Editor text box.
 *
 * @returns {boolean} true if valid, false if invalid
 *
 * @deprecated Unused.
 */
function validateCssEditorTextBoxValue() {
    if (cssEditorSelectedType === "element") {
        try {
            const newCSS = JSON.parse(cssEditorTextBox.value);
            cssEditorErrorText.textContent = "";
            cssEditorSelectedElement.style = newCSS;
            return true;
        } catch (e) {
            cssEditorErrorText.textContent = e + " " + e?.stack;
            return false;
        }
    } else if (cssEditorSelectedType === "root") {
        try {
            const newCSS = JSON.parse(cssEditorTextBox.value);
            cssEditorErrorText.textContent = "";
            document.getElementById("root").style = newCSS;
            return true;
        } catch (e) {
            cssEditorErrorText.textContent = e + " " + e?.stack;
            return false;
        }
    } else if (cssEditorSelectedType === "globalStyleElement") {
        try {
            const newCSS = JSON.parse(cssEditorTextBox.value);
            cssEditorErrorText.textContent = "";
            customGlobalCSSStyleElement.style = newCSS;
            return true;
        } catch (e) {
            cssEditorErrorText.textContent = e + " " + e?.stack;
            return false;
        }
    } else if (cssEditorSelectedType === "styleSheet") {
        // throw new Error("validateCssEditorTextBoxValue is not implemented for cssEditorSelectedType === 'styleSheet'");
        cssEditorErrorText.textContent = "validateCssEditorTextBoxValue is not implemented for cssEditorSelectedType === 'styleSheet'";
        return false;
    } else {
        // throw new Error("validateCssEditorTextBoxValue is not implemented for cssEditorSelectedType === '" + cssEditorSelectedType + "'");
        cssEditorErrorText.textContent = "validateCssEditorTextBoxValue is not implemented for cssEditorSelectedType === '" + cssEditorSelectedType + "'";
        return false;
    }
}

/**
 * Puts the CSS Editor in style sheet selection mode.
 *
 * @deprecated The style sheet rules are undefined for some reason.
 */
function cssEditor_selectDocumentStyleSheet_activate() {
    document.getElementById("cssEditor_mainDiv").style.display = "none";
    cssEditor_selectableStyleSheets = [];
    let styleSheetList = document.styleSheets;
    for (let i = 0; i < styleSheetList.length; i++) {
        cssEditor_selectableStyleSheets.push(styleSheetList[i]);
    }
    document.getElementById("cssEditor_documentStyleSelectorDiv").innerHTML = cssEditor_selectableStyleSheets
        .map((s, i) => `<button type="button" onclick="cssEditor_selectDocumentStyleSheet_selected(${i})">${i}</button>`)
        .join("");
    document.getElementById("cssEditor_documentStyleSelectorDiv").style.display = "block";
}

/**
 * Used when a style sheet is selected.
 *
 * @param {number} index
 *
 * @deprecated The style sheet rules are undefined for some reason.
 */
async function cssEditor_selectDocumentStyleSheet_selected(index) {
    document.getElementById("cssEditor_documentStyleSelectorDiv").style.display = "none";
    cssEditorSelectedType = "styleSheet";
    cssEditorSelectedStyleSheet = cssEditor_selectableStyleSheets[index];
    cssEditorSelectedStyleSheet_rules = [];
    try {
        const ownerNode = cssEditorSelectedStyleSheet.ownerNode;
        // if(ownerNode){
        //     if(ownerNode.href){
        //         const srcData = (await fetch(ownerNode.href))
        //     }
        // }
        // cssEditorSelectedStyleSheet = document.styleSheets.item(0)
        // const cssRulesList = cssEditorSelectedStyleSheet.cssRules;
        // const a = Object.getOwnPropertyNames(Array.from(cssEditorSelectedStyleSheet.cssRules));
        // cssEditorSelectedStyleSheet_rules.push(...a.slice(0, 100));
        // for (let i = 0; i < a.length; i++) {
        //     cssEditorSelectedStyleSheet_rules.push(
        //         Object.hasOwn(Array.from(cssEditorSelectedStyleSheet.cssRules), a[i]),
        //         typeof Array.from(cssEditorSelectedStyleSheet.cssRules)[a[i]]
        //     );
        // }
        cssEditorSelectedStyleSheet_rules.push(
            cssEditorSelectedStyleSheet.ownerNode?.shadowRoot,
            cssEditorSelectedStyleSheet.ownerNode?.slot,
            cssEditorSelectedStyleSheet.ownerNode?.tagName,
            cssEditorSelectedStyleSheet.ownerNode?.href,
            Object.getOwnPropertyNames(cssEditorSelectedStyleSheet) /* , ownerNode.href ? (f(ownerNode.href)) : "NO HREF!" */
        );
        cssEditorTextBox.value = cssEditorSelectedStyleSheet_rules.map((v) => v ?? "MISSING!").join("\n");
    } catch (e) {
        cssEditorTextBox.value = e + e.stack;
    }
    setCSSEditorMode("styleSheet");
    document.getElementById("cssEditor_mainDiv").style.display = "block";
}

/**
 * Saves the CSS Editor changes.
 */
async function cssEditor_saveChanges() {
    if (cssEditorSelectedType === "element") {
        try {
            const newCSS = cssEditorTextBox.value;
            cssEditorErrorText.textContent = "";
            cssEditorSelectedElement.setAttribute("style", newCSS);
        } catch (e) {
            cssEditorErrorText.textContent = e + " " + e?.stack;
        }
    } else if (cssEditorSelectedType === "root") {
        try {
            const newCSS = cssEditorTextBox.value;
            cssEditorErrorText.textContent = "";
            document.getElementById("root").setAttribute("style", newCSS);
        } catch (e) {
            cssEditorErrorText.textContent = e + " " + e?.stack;
        }
    } else if (cssEditorSelectedType === "globalStyleElement") {
        try {
            const newCSS = cssEditorTextBox.value;
            cssEditorErrorText.textContent = "";
            // const elem = document.getElementById("customGlobalCSSStyle");
            // document.getElementById("customGlobalCSSStyle").remove();
            customGlobalCSSStyleElement;
            customGlobalCSSStyleElement.innerHTML = newCSS;
            //initialize parser object
            // var parser = new cssjs();
            //parse css string
            // var parsed = parser.parseCSS(newCSS);

            // console.log(parsed);
            // cssEditorTextBox.value = JSON.stringify(parsed);

            // elem.id = Date.now().toString();
            // document.head.appendChild(elem);
            customGlobalCSSStyleElement.dispatchEvent(new Event("change"));
            for (const styleSheet of document.styleSheets) {
                if (styleSheet.ownerNode === customGlobalCSSStyleElement) {
                    for (let i = 0; i < styleSheet.cssRules.length; i++) {
                        styleSheet.deleteRule(i);
                    }
                    styleSheet.insertRule(newCSS, 0);
                    break;
                }
            }
        } catch (e) {
            cssEditorErrorText.textContent = e + " " + e?.stack;
        }
    } else if (cssEditorSelectedType === "styleSheet") {
        // throw new Error("validateCssEditorTextBoxValue is not implemented for cssEditorSelectedType === 'styleSheet'");
        cssEditorErrorText.textContent = "validateCssEditorTextBoxValue is not implemented for cssEditorSelectedType === 'styleSheet'";
    } else {
        // throw new Error("validateCssEditorTextBoxValue is not implemented for cssEditorSelectedType === '" + cssEditorSelectedType + "'");
        cssEditorErrorText.textContent = "validateCssEditorTextBoxValue is not implemented for cssEditorSelectedType === '" + cssEditorSelectedType + "'";
    }
}

/**
 * Sets the CSS Editor mode.
 *
 * @param {typeof cssEditorSelectedType} mode The mode to set the CSS Editor to.
 *
 * @throws {Error} Throws an error if the mode is not valid.
 */
function setCSSEditorMode(mode) {
    cssEditorSelectedType = mode;
    cssEditorErrorText.textContent = "";
    switch (mode) {
        case "none":
            document.getElementById("cssEditor_subtitle").textContent = "Nothing selected!";
            cssEditorTextBox.style.backgroundColor = "#808080FF";
            cssEditorTextBox.style.pointerEvents = "none";
            document.getElementById("cssEditorSaveChangesButton").disabled = true;
            break;
        case "element":
            document.getElementById("cssEditor_subtitle").textContent = "Element Style (CSS): " + UTILS.cssPath(cssEditorSelectedElement).split(" > ").pop();
            cssEditorTextBox.style.backgroundColor = "";
            cssEditorTextBox.style.pointerEvents = "";
            document.getElementById("cssEditorSaveChangesButton").disabled = false;
            break;
        case "root":
            document.getElementById("cssEditor_subtitle").textContent = "Root Element Style (CSS): " + cssEditorSelectedElement.accessKey;
            cssEditorTextBox.style.backgroundColor = "";
            cssEditorTextBox.style.pointerEvents = "";
            document.getElementById("cssEditorSaveChangesButton").disabled = false;
            break;
        case "globalStyleElement":
            document.getElementById("cssEditor_subtitle").textContent = "Global CSS (CSS)";
            cssEditorTextBox.style.backgroundColor = "";
            cssEditorTextBox.style.pointerEvents = "";
            document.getElementById("cssEditorSaveChangesButton").disabled = false;
            break;
        case "styleSheet":
            document.getElementById("cssEditor_subtitle").textContent = "Style Sheet Rules (JSON): " + cssEditorSelectedStyleSheet.title;
            cssEditorTextBox.style.backgroundColor = "";
            cssEditorTextBox.style.pointerEvents = "";
            document.getElementById("cssEditorSaveChangesButton").disabled = true;
            break;
        default:
            throw new Error("setCSSEditorMode is not implemented for mode === '" + mode + "'");
    }
}

function cssEditor_rootElementStylesMode() {
    setCSSEditorMode("root");
    cssEditorTextBox.value = document.getElementById("root").getAttribute("style") ?? "";
}

function cssEditor_globalStyleElementStylesMode() {
    setCSSEditorMode("globalStyleElement");
    cssEditorTextBox.value = customGlobalCSSStyleElement.textContent;
}

/**
 * Sets the tab of the 8Crafter Utilities Main Menu.
 * @param {string} tab
 */
function setMainMenu8CrafterUtilitiesTab(tab) {
    for (const child of document.getElementById("8CrafterUtilitiesMenu_rightSide").children) {
        if (child.classList.contains("customScrollbarParent")) continue;
        if (child.id === "8CrafterUtilitiesMenu_leftSidebar") continue;
        child.style.display = child.id === "8CrafterUtilitiesMenu_" + tab ? "block" : "none";
    }
    for (const child of document.getElementById("8CrafterUtilitiesMenu_leftSidebar").children) {
        if (child.classList.contains("customScrollbarParent")) continue;
        if (child.id === "8CrafterUtilitiesMenu_tabButton_" + tab) {
            child.classList.add("selected");
        } else {
            child.classList.remove("selected");
        }
    }
}

function toggleSmallCornerDebugOverlay() {
    if (smallCornerDebugOverlayElement.style.display === "none") {
        smallCornerDebugOverlayElement.style.display = "block";
        smallCornerDebugOverlayElement.textContent = `Client: x: ${mousePos.clientX} y: ${mousePos.clientY}
Offset x: ${mousePos.offsetX} y: ${mousePos.offsetY}
Page: x: ${mousePos.pageX} y: ${mousePos.pageY}
Screen: x: ${mousePos.screenX} y: ${mousePos.screenY}
Layer: x: ${e.layerX} y: ${e.layerY}
Movement: x: ${e.movementX} y: ${e.movementY}`;
    } else {
        smallCornerDebugOverlayElement.style.display = "none";
    }
}

function toggleGeneralDebugOverlayElement() {
    if (elementGeneralDebugOverlayElement.style.display === "none") {
        elementGeneralDebugOverlayElement.style.display = "block";
        const boundingBox = currentMouseHoverTarget.getBoundingClientRect();
        elementGeneralDebugOverlayElement.textContent = `Element: ${UTILS.cssPath(currentMouseHoverTarget)}
Bounding Box: ${JSON.stringify({
            x: boundingBox.x,
            y: boundingBox.y,
            width: boundingBox.width,
            height: boundingBox.height,
            top: boundingBox.top,
            right: boundingBox.right,
            bottom: boundingBox.bottom,
            left: boundingBox.left,
        })}
Children: ${currentMouseHoverTarget.children.length}
Attributes:
${
    currentMouseHoverTarget.getAttributeNames().length > 0
        ? currentMouseHoverTarget
              .getAttributeNames()
              .map((name) => `${name}: ${currentMouseHoverTarget.getAttribute(name)}`)
              .join("\n")
        : "None"
}`;
    } else {
        elementGeneralDebugOverlayElement.style.display = "none";
    }
}

function toggleHTMLSourceCodePreviewElement() {
    if (htmlSourceCodePreviewElement.style.display === "block") {
        htmlSourceCodePreviewElement.style.display = "none";
    } else {
        htmlSourceCodePreviewElementP.textContent = "";
        htmlSourceCodePreviewElementP.textContent = document.documentElement.outerHTML;
        htmlSourceCodePreviewElement.style.display = "block";
    }
}

function toggleConsoleOverlay() {
    if (consoleOverlayElement.style.display === "block") {
        consoleOverlayElement.style.display = "none";
    } else {
        consoleOverlayElement.style.display = "block";
    }
}

/* function consoleOverlayExecute() {
    const input = consoleOverlayInputFieldElement.value;
    const elem = document.createElement("pre");
    if(consoleOverlayTextElement.children.length > 0 && !consoleOverlayTextElement.lastChild?.style?.backgroundColor?.length > 0){
        elem.style.borderTop = "1px solid #888888";
    };
    elem.textContent = `> ${input}`;
    consoleOverlayTextElement.appendChild(elem);
    const resultElem = document.createElement("pre");
    try {
        const result = eval(input);
        if(!consoleOverlayTextElement.lastChild?.style?.backgroundColor?.length > 0){
            resultElem.style.borderTop = "1px solid #888888";
        };
        resultElem.style.borderTop = "#";
        resultElem.textContent = `${(() => {
            switch (typeof v) {
                case "symbol":
                case "function":
                    return result.toString();
                default:
                    return JSONB.stringify(result);
            }
        })()}`;
        consoleOverlayTextElement.appendChild(resultElem);
        consoleOverlayInputFieldElement.value = "";
    } catch (e) {
        resultElem.style.backgroundColor = "#FF000055";
        resultElem.textContent = `${e + " " + e?.stack}`;
        consoleOverlayTextElement.appendChild(resultElem);
    }
} */
function consoleOverlayExecute() {
    const input = consoleOverlayInputFieldElement.value;
    const commandElem = document.createElement("div");
    commandElem.style.whiteSpace = "pre-wrap";
    commandElem.style.overflowWrap = "anywhere";
    if (consoleOverlayTextElement.children.length > 0 && !consoleOverlayTextElement.lastChild?.style?.backgroundColor?.length > 0) {
        commandElem.style.borderTop = "1px solid #888888";
    }
    commandElem.textContent = `> ${input}`;
    consoleOverlayTextElement.appendChild(commandElem);

    const resultElem = document.createElement("div");
    resultElem.style.whiteSpace = "pre-wrap";
    resultElem.style.overflowWrap = "anywhere";
    try {
        const result = eval(input);
        if (!consoleOverlayTextElement.lastChild?.style?.backgroundColor?.length > 0) {
            resultElem.style.borderTop = "1px solid #888888";
        }
        if ((typeof result === "object" && result !== null) || typeof v === "function") {
            resultElem.appendChild(createExpandableObjectView(result, true));
        } else {
            resultElem.textContent = JSONB.stringify(result);
        }
        consoleOverlayTextElement.appendChild(resultElem);
        consoleOverlayInputFieldElement.value = "";
    } catch (e) {
        resultElem.style.backgroundColor = "#FF000055";
        resultElem.textContent = `${e + " " + e?.stack}`;
        consoleOverlayTextElement.appendChild(resultElem);
    }
}

var consoleExpansionArrowID = 0n;

/**
 * @param {Object} obj
 * @param {boolean} isRoot
 * @param {boolean} forceObjectMode
 * @param {{summaryValueOverride?: string, summaryValueOverride_toStringTag?: string, displayKey?: string}} options
 */
function createExpandableObjectView(obj, isRoot = false, forceObjectMode = false, options) {
    const arrowID = (consoleExpansionArrowID++).toString(36);
    const container = document.createElement("div"); /* 
    const arrow = document.createElement("img");
    arrow.style = "float: left; display: inline;";
    arrow.src = "assets/arrowForwardWhite-9acff.png";
    container.appendChild(arrow); */
    const summary = document.createElement("div");
    summary.textContent = JSONBConsole.stringify(
        obj,
        undefined,
        4,
        { bigint: true, undefined: true, Infinity: true, NegativeInfinity: true, NaN: true, get: true, set: true, function: true, class: false },
        5,
        2
    );
    if (options?.summaryValueOverride) {
        summary.innerHTML = `<img src="assets/chevron_new_white_right.png" style="width: 22px; height: 22px; vertical-align: bottom; position: absolute; left: ${
            isRoot ? 0 : -22
        }px; top: 50%; margin-top: -11px; margin-bottom: 11px; image-rendering: pixelated; float: left; display: inline;" id="consoleExpansionArrow-${arrowID}"><span style="display: inline; white-space: pre-wrap;">${
            options.displayKey ? `${options.displayKey}: ` : ""
        }${
            options.summaryValueOverride_toStringTag
                ? `<i style="display: inline; font-style: italic;">${options.summaryValueOverride_toStringTag
                      .replaceAll("<", "&lt;")
                      .replaceAll(">", "&gt;")}</i> `
                : ""
        }${options.summaryValueOverride
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("\n", `</span><span style="display: inline; white-space: pre-wrap;">`)}</span>`;
    } else if (obj[Symbol.toStringTag]) {
        summary.innerHTML = `<img src="assets/chevron_new_white_right.png" style="width: 22px; height: 22px; vertical-align: bottom; position: absolute; left: ${
            isRoot ? 0 : -22
        }px; top: 50%; margin-top: -11px; margin-bottom: 11px; image-rendering: pixelated; float: left; display: inline;" id="consoleExpansionArrow-${arrowID}"><span style="display: inline; white-space: pre-wrap;">${
            options?.displayKey ? `${options.displayKey}: ` : ""
        }<i style="display: inline; font-style: italic;">${obj[Symbol.toStringTag].replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</i> ${summary.textContent
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("\n", `</span><span style="display: inline; white-space: pre-wrap;">`)}</span>`;
    } else {
        summary.innerHTML = `<img src="assets/chevron_new_white_right.png" style="width: 22px; height: 22px; vertical-align: bottom; position: absolute; left: ${
            isRoot ? 0 : -22
        }px; top: 50%; margin-top: -11px; margin-bottom: 11px; image-rendering: pixelated; float: left; display: inline;" id="consoleExpansionArrow-${arrowID}"><span style="display: inline; white-space: pre-wrap;">${
            options?.displayKey ? `${options.displayKey}: ` : ""
        }${summary.textContent
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("\n", `</span><span style="display: inline; white-space: pre-wrap;">`)}</span>`;
    }
    const evaluatedUponFirstExpandingInfo = document.createElement("div");
    evaluatedUponFirstExpandingInfo.style = "display: none; white-space: pre-wrap; position: relative; left: 0px; top: 0px; height: 100%;";
    evaluatedUponFirstExpandingInfo.classList.add("evaluatedUponFirstExpandingInfo");
    const evaluatedUponFirstExpandingInfoIcon = document.createElement("img");
    evaluatedUponFirstExpandingInfoIcon.style =
        "display: inline; width: 24px; height: 24px; position: relative; left: 0px; top: 50%; margin-top: -12px; margin-bottom: -12px; image-rendering: pixelated;";
    evaluatedUponFirstExpandingInfoIcon.src = "assets/Information-44f83.png";
    evaluatedUponFirstExpandingInfoIcon.addEventListener("mouseover", () => {
        evaluatedUponFirstExpandingInfoText.style.display = "inline";
    });
    evaluatedUponFirstExpandingInfoIcon.addEventListener("mouseout", () => {
        evaluatedUponFirstExpandingInfoText.style.display = "none";
    });
    evaluatedUponFirstExpandingInfo.appendChild(evaluatedUponFirstExpandingInfoIcon);
    const evaluatedUponFirstExpandingInfoText = document.createElement("span");
    evaluatedUponFirstExpandingInfoText.style =
        "position: absolute; top: -100%; left: 0px; display: none; background-color: #FFFFFFAA; color: #000000FF; pointer-events: none;";
    evaluatedUponFirstExpandingInfoText.textContent = "This value was evaluated upon first expanding. It may have changed since then.";
    evaluatedUponFirstExpandingInfo.appendChild(evaluatedUponFirstExpandingInfoText);
    summary.lastChild.appendChild(evaluatedUponFirstExpandingInfo);
    summary.style.cursor = "pointer";
    summary.style.display = "flex";
    if (isRoot) {
        summary.style.paddingLeft = "22px";
    }
    container.appendChild(summary);

    summary.addEventListener("click", () => {
        if (container.childNodes.length === 1) {
            try {
                document.getElementById(`consoleExpansionArrow-${arrowID}`).style.transform = "rotateZ(90deg)";
            } catch (e) {
                console.error(e.toString(), e.stack);
            }
            summary.getElementsByClassName("evaluatedUponFirstExpandingInfo")[0].style.display = "inline";
            const details = document.createElement("div");
            /**
             * @type {(string | number | symbol | {displayName: string, key: string})[]}
             */
            const keys = [...new Set([...Object.keys(obj), ...Object.getOwnPropertyNames(obj), ...Object.getOwnPropertySymbols(obj)])];
            if (obj.__proto__) keys.push({ displayName: "[[Prototype]]", key: "__proto__" });
            for (const keyRaw of keys) {
                const key = ["number", "string", "symbol"].includes(typeof keyRaw) ? keyRaw : keyRaw.key;
                const displayName = ["number", "string", "symbol"].includes(typeof keyRaw) ? keyRaw.toString() : keyRaw.displayName;
                const item = document.createElement("div");
                item.style.marginLeft = "44px";
                try {
                    if (forceObjectMode || (typeof obj[key] === "object" && obj[key] !== null) /*  || typeof obj[key] === "function" */) {
                        const expandableObjectView = createExpandableObjectView(obj[key]);
                        expandableObjectView.children[0].children[1].insertAdjacentText("afterbegin", `${displayName}: `);
                        item.appendChild(expandableObjectView);
                    } else if (typeof obj[key] === "function") {
                        const arrowID = (consoleExpansionArrowID++).toString(36);
                        const funcSummary = document.createElement("span");
                        funcSummary.innerHTML = `<img src="assets/chevron_new_white_right.png" style="width: 22px; height: 22px; vertical-align: bottom; position: absolute; left: -22px; top: 50%; margin-top: -11px; margin-bottom: 11px; image-rendering: pixelated; float: left; display: inline;" id="consoleExpansionArrow-${arrowID}"><span style="display: inline; white-space: pre-wrap;">${displayName}: ${JSONBConsole.stringify(
                            obj[key],
                            undefined,
                            4,
                            {
                                bigint: true,
                                undefined: true,
                                Infinity: true,
                                NegativeInfinity: true,
                                NaN: true,
                                get: true,
                                set: true,
                                function: true,
                                class: false,
                            },
                            5,
                            1
                        )
                            .replaceAll("<", "&lt;")
                            .replaceAll(">", "&gt;")
                            .replaceAll("\n", `</span><span style="display: inline; white-space: pre-wrap;">`)}</span>`;
                        funcSummary.style.cursor = "pointer";
                        const evaluatedUponFirstExpandingInfo = document.createElement("div");
                        evaluatedUponFirstExpandingInfo.style = "display: none; white-space: pre-wrap; position: relative; left: 0px; top: 0px; height: 100%;";
                        evaluatedUponFirstExpandingInfo.classList.add("evaluatedUponFirstExpandingInfo");
                        const evaluatedUponFirstExpandingInfoIcon = document.createElement("img");
                        evaluatedUponFirstExpandingInfoIcon.style =
                            "display: inline; width: 24px; height: 24px; position: relative; left: 0px; top: 50%; margin-top: -12px; margin-bottom: -12px; image-rendering: pixelated;";
                        evaluatedUponFirstExpandingInfoIcon.src = "assets/Information-44f83.png";
                        evaluatedUponFirstExpandingInfoIcon.addEventListener("mouseover", () => {
                            evaluatedUponFirstExpandingInfoText.style.display = "inline";
                        });
                        evaluatedUponFirstExpandingInfoIcon.addEventListener("mouseout", () => {
                            evaluatedUponFirstExpandingInfoText.style.display = "none";
                        });
                        evaluatedUponFirstExpandingInfo.appendChild(evaluatedUponFirstExpandingInfoIcon);
                        const evaluatedUponFirstExpandingInfoText = document.createElement("span");
                        evaluatedUponFirstExpandingInfoText.style =
                            "position: absolute; top: -100%; left: 0px; display: none; background-color: #FFFFFFAA; color: #000000FF; pointer-events: none;";
                        evaluatedUponFirstExpandingInfoText.textContent = "This value was evaluated upon first expanding. It may have changed since then.";
                        evaluatedUponFirstExpandingInfo.appendChild(evaluatedUponFirstExpandingInfoText);
                        funcSummary.lastChild.appendChild(evaluatedUponFirstExpandingInfo);
                        item.appendChild(funcSummary);

                        funcSummary.addEventListener("click", () => {
                            if (funcSummary.nextSibling) {
                                document.getElementById(`consoleExpansionArrow-${arrowID}`).style.transform = "rotateZ(0deg)";
                                funcSummary.getElementsByClassName("evaluatedUponFirstExpandingInfo")[0].style.display = "none";
                                funcSummary.nextSibling.remove();
                            } else {
                                document.getElementById(`consoleExpansionArrow-${arrowID}`).style.transform = "rotateZ(90deg)";
                                funcSummary.getElementsByClassName("evaluatedUponFirstExpandingInfo")[0].style.display = "inline";
                                const funcDetails = document.createElement("div");
                                const funcName = document.createElement("div");
                                funcName.textContent = `name: ${obj[key].name}`;
                                funcName.style.marginLeft = "44px";
                                funcDetails.appendChild(funcName);
                                const funcLength = document.createElement("div");
                                funcLength.textContent = `length: ${obj[key].length}`;
                                funcLength.style.marginLeft = "44px";
                                funcDetails.appendChild(funcLength);
                                const arrowIDB = (consoleExpansionArrowID++).toString(36);
                                const funcToStringContainer = document.createElement("div");
                                const funcToString = document.createElement("span");
                                funcToString.innerHTML = `<img src="assets/chevron_new_white_right.png" style="width: 22px; height: 22px; vertical-align: bottom; position: absolute; left: 22px; top: 50%; margin-top: -11px; margin-bottom: 11px; image-rendering: pixelated; float: left; display: inline;" id="consoleExpansionArrow-${arrowIDB}"><span style="display: inline; white-space: pre-wrap;">toString: ƒ toString()</span>`;
                                funcToString.style.cursor = "pointer";
                                funcToString.style.marginLeft = "44px";
                                const evaluatedUponFirstExpandingInfo = document.createElement("div");
                                evaluatedUponFirstExpandingInfo.style =
                                    "display: none; white-space: pre-wrap; position: relative; left: 0px; top: 0px; height: 100%;";
                                evaluatedUponFirstExpandingInfo.classList.add("evaluatedUponFirstExpandingInfo");
                                const evaluatedUponFirstExpandingInfoIcon = document.createElement("img");
                                evaluatedUponFirstExpandingInfoIcon.style =
                                    "display: inline; width: 24px; height: 24px; position: relative; left: 0px; top: 50%; margin-top: -12px; margin-bottom: -12px; image-rendering: pixelated;";
                                evaluatedUponFirstExpandingInfoIcon.src = "assets/Information-44f83.png";
                                evaluatedUponFirstExpandingInfoIcon.addEventListener("mouseover", () => {
                                    evaluatedUponFirstExpandingInfoText.style.display = "inline";
                                });
                                evaluatedUponFirstExpandingInfoIcon.addEventListener("mouseout", () => {
                                    evaluatedUponFirstExpandingInfoText.style.display = "none";
                                });
                                evaluatedUponFirstExpandingInfo.appendChild(evaluatedUponFirstExpandingInfoIcon);
                                const evaluatedUponFirstExpandingInfoText = document.createElement("span");
                                evaluatedUponFirstExpandingInfoText.style =
                                    "position: absolute; top: -100%; left: 0px; display: none; background-color: #FFFFFFAA; color: #000000FF; pointer-events: none;";
                                evaluatedUponFirstExpandingInfoText.textContent =
                                    "This value was evaluated upon first expanding. It may have changed since then.";
                                evaluatedUponFirstExpandingInfo.appendChild(evaluatedUponFirstExpandingInfoText);
                                funcToString.appendChild(evaluatedUponFirstExpandingInfo);
                                funcToStringContainer.appendChild(funcToString);
                                funcDetails.appendChild(funcToStringContainer);
                                Object.getOwnPropertySymbols(obj[key]).forEach((symbol) => {
                                    try {
                                        const symbolDetails = document.createElement("div");
                                        symbolDetails.textContent = `${symbol.toString()}: ${JSONB.stringify(obj[key][symbol], undefined, undefined, {
                                            bigint: true,
                                            undefined: true,
                                            Infinity: true,
                                            NegativeInfinity: true,
                                            NaN: true,
                                            get: true,
                                            set: true,
                                            function: true,
                                            class: false,
                                        })}`;
                                        symbolDetails.style.marginLeft = "44px";
                                        funcDetails.appendChild(symbolDetails);
                                    } catch (e) {
                                        console.error(e, e.stack);
                                    }
                                });

                                if (obj[key].__proto__) {
                                    try {
                                        const prototypeExpandableObjectView = createExpandableObjectView(obj[key].__proto__, false, true);
                                        prototypeExpandableObjectView.children[0].children[1].insertAdjacentText("afterbegin", `[[Prototype]]: `);
                                        prototypeExpandableObjectView.style.marginLeft = "44px";
                                        funcDetails.appendChild(prototypeExpandableObjectView);
                                    } catch (e) {
                                        console.error(e, e.stack);
                                    }
                                } else {
                                    console.warn(`No prototype found for ${displayName}`);
                                }

                                funcToString.addEventListener("click", () => {
                                    if (funcToString.nextSibling) {
                                        document.getElementById(`consoleExpansionArrow-${arrowIDB}`).style.transform = "rotateZ(0deg)";
                                        funcToString.getElementsByClassName("evaluatedUponFirstExpandingInfo")[0].style.display = "none";
                                        funcToString.nextSibling.remove();
                                    } else {
                                        document.getElementById(`consoleExpansionArrow-${arrowIDB}`).style.transform = "rotateZ(90deg)";
                                        funcToString.getElementsByClassName("evaluatedUponFirstExpandingInfo")[0].style.display = "inline";
                                        const funcSource = document.createElement("pre");
                                        funcSource.classList.add("funcSource");
                                        funcSource.textContent = obj[key].toString();
                                        funcSource.style.marginLeft = "88px";
                                        funcToStringContainer.appendChild(funcSource);
                                    }
                                });

                                item.appendChild(funcDetails);
                            }
                        });
                    } else {
                        item.textContent = `${displayName}: ${JSONB.stringify(obj[key], undefined, undefined, {
                            bigint: true,
                            undefined: true,
                            Infinity: true,
                            NegativeInfinity: true,
                            NaN: true,
                            get: true,
                            set: true,
                            function: true,
                            class: false,
                        })}`;
                    }
                    details.appendChild(item);
                } catch (e) {
                    const exceptionExpandableObjectView = createExpandableObjectView(e, false, false, {
                        summaryValueOverride: `(Exception)`,
                        summaryValueOverride_toStringTag: e?.name ?? e?.[Symbol.toStringTag],
                        displayKey: displayName,
                    });
                    item.appendChild(exceptionExpandableObjectView);
                    details.appendChild(item);
                }
            }
            container.appendChild(details);
        } else {
            try {
                document.getElementById(`consoleExpansionArrow-${arrowID}`).style.transform = "rotateZ(0deg)";
            } catch (e) {
                console.error(e, e.stack);
            }
            summary.getElementsByClassName("evaluatedUponFirstExpandingInfo")[0].style.display = "none";
            container.removeChild(container.childNodes[1]);
        }
    });

    return container;
}

/**
 * @param {Parameters<typeof onConsoleLogCallbacks[0]>[0]} data
 */
function consoleOverlayConsoleLogCallback(data) {
    const elem = document.createElement("pre");
    switch (data.type) {
        case "error":
            elem.style.backgroundColor = "#FF000055";
            break;
        case "warn":
            elem.style.backgroundColor = "#FFA50055";
            break;
        case "debug":
            elem.style.backgroundColor = "#5555BB55";
            break;
        default:
            if (consoleOverlayTextElement.children.length > 0 && !consoleOverlayTextElement.lastChild?.style?.backgroundColor?.length > 0) {
                elem.style.borderTop = "1px solid #888888";
            }
    }
    elem.textContent = `[${data.timeStamp}] [${data.type}]`;
    for (const v of data.value) {
        if ((typeof v === "object" && v !== null) || typeof v === "function") {
            elem.appendChild(createExpandableObjectView(v, true));
        } else {
            switch (typeof v) {
                case "bigint":
                case "object":
                    elem.textContent += " " + JSONB.stringify(v);
                case "function":
                    elem.textContent += " " + v.toString();
                default:
                    elem.textContent += " " + v;
            }
        }
    }
    consoleOverlayTextElement.appendChild(elem);
}

/**
 * @param {Parameters<typeof onConsoleLogCallbacks[0]>[0]} data
 */
/* function consoleOverlayConsoleLogCallback(data) {
    const elem = document.createElement("span");
    switch (data.type) {
        case "error":
            elem.style.backgroundColor = "#FF000055";
            break;
        case "warn":
            elem.style.backgroundColor = "#FFA50055";
            break;
        case "debug":
            elem.style.backgroundColor = "#5555BB55";
            break;
        default:
            if(consoleOverlayTextElement.children.length > 0 && !consoleOverlayTextElement.lastChild?.style?.backgroundColor?.length > 0){
                elem.style.borderTop = "1px solid #888888";
            };
    }
    elem.textContent = `[${data.timeStamp}] [${data.type}] ${data.value.map((v) => {
        switch (typeof v) {
            case "bigint":
            case "object":
                return JSONB.stringify(v);
            case "function":
                return v.toString();
            default:
                return v;
        }
    })}`;
    consoleOverlayTextElement.appendChild(elem);
} */

onConsoleLogCallbacks.push(consoleOverlayConsoleLogCallback);

let nonTextKeyCodes = [
    8, 9, 13, 16, 17, 18, 20, 27, 32, 33, 34, 35, 37, 38, 39, 40, 45, 46, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 112, 113, 114, 115, 116, 117, 118, 119,
    120, 121, 122, 123, 195, 196, 197, 198, 199, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210,
];

let types_KeyboardKey = {
    8: "BACKSPACE",
    9: "TAB",
    13: "ENTER",
    16: "SHIFT",
    17: "CTRL",
    18: "ALT",
    20: "CAPS_LOCK",
    27: "ESCAPE",
    32: "SPACE",
    33: "PG_UP",
    34: "PG_DOWN",
    35: "END",
    37: "LEFT",
    38: "UP",
    39: "RIGHT",
    40: "DOWN",
    45: "INSERT",
    46: "DELETE",
    48: "KEY_0",
    49: "KEY_1",
    50: "KEY_2",
    51: "KEY_3",
    52: "KEY_4",
    53: "KEY_5",
    54: "KEY_6",
    55: "KEY_7",
    56: "KEY_8",
    57: "KEY_9",
    59: "SEMICOLON",
    61: "EQUALS",
    65: "KEY_A",
    66: "KEY_B",
    67: "KEY_C",
    68: "KEY_D",
    69: "KEY_E",
    70: "KEY_F",
    71: "KEY_G",
    72: "KEY_H",
    73: "KEY_I",
    74: "KEY_J",
    75: "KEY_K",
    76: "KEY_L",
    77: "KEY_M",
    78: "KEY_N",
    79: "KEY_O",
    80: "KEY_P",
    81: "KEY_Q",
    82: "KEY_R",
    83: "KEY_S",
    84: "KEY_T",
    85: "KEY_U",
    86: "KEY_V",
    87: "KEY_W",
    88: "KEY_X",
    89: "KEY_Y",
    90: "KEY_Z",
    96: "NUMPAD_0",
    97: "NUMPAD_1",
    98: "NUMPAD_2",
    99: "NUMPAD_3",
    100: "NUMPAD_4",
    101: "NUMPAD_5",
    102: "NUMPAD_6",
    103: "NUMPAD_7",
    104: "NUMPAD_8",
    105: "NUMPAD_9",
    109: "MINUS",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    188: "COMMA",
    190: "PERIOD",
    191: "SLASH",
    192: "GRAVE",
    195: "MOUSE_MOVEMENT",
    196: "MOUSE_BUTTON_LEFT",
    197: "MOUSE_BUTTON_MIDDLE",
    198: "MOUSE_BUTTON_RIGHT",
    199: "MOUSE_WHEEL",
    201: "PSEUDO_KEY_1",
    202: "PSEUDO_KEY_2",
    203: "PSEUDO_KEY_3",
    204: "PSEUDO_KEY_4",
    205: "PSEUDO_KEY_5",
    206: "PSEUDO_KEY_6",
    207: "PSEUDO_KEY_7",
    208: "PSEUDO_KEY_8",
    209: "PSEUDO_KEY_9",
    210: "PSEUDO_KEY_10",
    219: "BRACKET_OPEN",
    220: "BACKSLASH",
    221: "BRACKET_CLOSE",
    222: "APOSTROPHE",
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    CAPS_LOCK: 20,
    ESCAPE: 27,
    SPACE: 32,
    PG_UP: 33,
    PG_DOWN: 34,
    END: 35,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INSERT: 45,
    DELETE: 46,
    KEY_0: 48,
    KEY_1: 49,
    KEY_2: 50,
    KEY_3: 51,
    KEY_4: 52,
    KEY_5: 53,
    KEY_6: 54,
    KEY_7: 55,
    KEY_8: 56,
    KEY_9: 57,
    SEMICOLON: 59,
    EQUALS: 61,
    KEY_A: 65,
    KEY_B: 66,
    KEY_C: 67,
    KEY_D: 68,
    KEY_E: 69,
    KEY_F: 70,
    KEY_G: 71,
    KEY_H: 72,
    KEY_I: 73,
    KEY_J: 74,
    KEY_K: 75,
    KEY_L: 76,
    KEY_M: 77,
    KEY_N: 78,
    KEY_O: 79,
    KEY_P: 80,
    KEY_Q: 81,
    KEY_R: 82,
    KEY_S: 83,
    KEY_T: 84,
    KEY_U: 85,
    KEY_V: 86,
    KEY_W: 87,
    KEY_X: 88,
    KEY_Y: 89,
    KEY_Z: 90,
    NUMPAD_0: 96,
    NUMPAD_1: 97,
    NUMPAD_2: 98,
    NUMPAD_3: 99,
    NUMPAD_4: 100,
    NUMPAD_5: 101,
    NUMPAD_6: 102,
    NUMPAD_7: 103,
    NUMPAD_8: 104,
    NUMPAD_9: 105,
    MINUS: 109,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    GRAVE: 192,
    MOUSE_MOVEMENT: 195,
    MOUSE_BUTTON_LEFT: 196,
    MOUSE_BUTTON_MIDDLE: 197,
    MOUSE_BUTTON_RIGHT: 198,
    MOUSE_WHEEL: 199,
    PSEUDO_KEY_1: 201,
    PSEUDO_KEY_2: 202,
    PSEUDO_KEY_3: 203,
    PSEUDO_KEY_4: 204,
    PSEUDO_KEY_5: 205,
    PSEUDO_KEY_6: 206,
    PSEUDO_KEY_7: 207,
    PSEUDO_KEY_8: 208,
    PSEUDO_KEY_9: 209,
    PSEUDO_KEY_10: 210,
    BRACKET_OPEN: 219,
    BACKSLASH: 220,
    BRACKET_CLOSE: 221,
    APOSTROPHE: 222,
};

// const container = consoleOverlayTextElement;
// const textBox = createCustomTextBox(container);
// consoleOverlayInputFieldElement.style.display = "contents";
// consoleOverlayElement.appendChild(textBox);

/**
 * Creates a custom text box element.
 *
 * @param {HTMLElement} container - The container element to create the custom text box in.
 * @returns {HTMLDivElement} The created custom text box element.
 *
 * @todo This is a work in progress.
 */
function createCustomTextBox(container) {
    try {
        const textBoxSelection = {
            selectionStart: 0,
            selectionEnd: 0,
        };
        const textBox = document.createElement("div");
        textBox.contentEditable = "true";
        textBox.style.width = "100%";
        textBox.style.height = "200px";
        textBox.style.overflowY = "auto";
        textBox.style.wordWrap = "break-word";
        textBox.style.padding = "10px";
        textBox.style.border = "1px solid #ccc";
        textBox.style.cursor = "text"; // Add cursor
        textBox.tabIndex = 0; // Make focusable
        textBox.classList.add("customTextBox");
        const textBoxValueDisplay = document.createElement("div");
        textBoxValueDisplay.style.width = "100%";
        textBoxValueDisplay.style.height = "100%";
        textBoxValueDisplay.classList.add("customTextBox_valueDisplay");
        textBox.appendChild(textBoxValueDisplay);
        const textBoxTextarea = document.createElement("textarea");
        textBoxTextarea.style.opacity = 0;
        textBoxTextarea.classList.add("customTextBox_textareaElement");

        // Add event listeners for copy, cut, and paste
        textBox.addEventListener("copy", (e) => {
            const selectedText = window.getSelection().toString();
            e.clipboardData.setData("text", selectedText);
            e.preventDefault();
        });

        textBox.addEventListener("cut", (e) => {
            const selectedText = window.getSelection().toString();
            e.clipboardData.setData("text", selectedText);
            textBoxValueDisplay.textContent = textBoxValueDisplay.textContent.replace(selectedText, "");
            e.preventDefault();
        });

        textBox.addEventListener("paste", (e) => {
            const pastedText = e.clipboardData.getData("text");
            const selection = window.getSelection();
            selection.deleteFromDocument();
            textBoxValueDisplay.textContent += pastedText;
            e.preventDefault();
        });

        textBoxValueDisplay.addEventListener("mouseup", () => {
            const selection = window.getSelection();
            textBoxSelection.selectionStart = selection.anchorOffset;
            textBoxSelection.selectionEnd = selection.focusOffset;
        });

        // Add event listener for keyboard input
        textBoxTextarea.addEventListener("keydown", (e) => {
            let preventDefault = true;
            if (e.keyCode === types_KeyboardKey.ENTER) {
                textBoxTextarea.value += "\n";
                textBoxValueDisplay.textContent = textBoxTextarea.value;
            }
            const text = textBoxTextarea.value;
            let newText = text;
            if (!nonTextKeyCodes.includes(e.keyCode)) {
                newText =
                    text.substring(0, Math.min(textBoxSelection.selectionStart, textBoxSelection.selectionEnd)) +
                    e.key +
                    text.substring(Math.max(textBoxSelection.selectionStart, textBoxSelection.selectionEnd));
            } else {
                switch (e.keyCode) {
                    case types_KeyboardKey.BACKSPACE:
                        if (textBoxSelection.selectionStart === textBoxSelection.selectionEnd) {
                            newText = text.substring(0, textBoxSelection.selectionStart - 1) + text.substring(textBoxSelection.selectionEnd);
                        } else {
                            newText = text.substring(0, textBoxSelection.selectionStart) + text.substring(textBoxSelection.selectionEnd);
                        }
                        break;
                    case types_KeyboardKey.DELETE:
                        if (textBoxSelection.selectionStart === textBoxSelection.selectionEnd) {
                            newText = text.substring(0, textBoxSelection.selectionStart) + text.substring(textBoxSelection.selectionEnd + 1);
                        } else {
                            newText = text.substring(0, textBoxSelection.selectionStart) + text.substring(textBoxSelection.selectionEnd);
                        }
                        break;
                    case types_KeyboardKey.ENTER:
                        newText = text.substring(0, textBoxSelection.selectionStart) + "\n" + text.substring(textBoxSelection.selectionEnd);
                        break;
                    case types_KeyboardKey.ARROW_LEFT:
                        if (textBoxSelection.selectionStart === textBoxSelection.selectionEnd) {
                            if (e.shiftKey) {
                                textBoxSelection.selectionStart -= 1;
                            } else {
                                textBoxSelection.selectionStart -= 1;
                                textBoxSelection.selectionEnd -= 1;
                            }
                        } else if (e.shiftKey) {
                            textBoxSelection.selectionEnd -= 1;
                        } else {
                            textBoxSelection.selectionEnd = textBoxSelection.selectionStart;
                        }
                        break;
                    case types_KeyboardKey.ARROW_RIGHT:
                        if (textBoxSelection.selectionStart === textBoxSelection.selectionEnd) {
                            textBoxSelection.selectionStart += 1;
                            textBoxSelection.selectionEnd += 1;
                        } else if (e.shiftKey) {
                            textBoxSelection.selectionEnd += 1;
                        } else {
                            textBoxSelection.selectionEnd = textBoxSelection.selectionStart;
                        }
                        break;
                    case types_KeyboardKey.HOME:
                        textBoxSelection.selectionStart = 0;
                        textBoxSelection.selectionEnd = 0;
                        break;
                    case types_KeyboardKey.END:
                        textBoxSelection.selectionStart = text.length;
                        textBoxSelection.selectionEnd = text.length;
                        break;
                    default:
                        preventDefault = false;
                }
            }
            textBoxTextarea.value = newText;
            textBoxValueDisplay.textContent = textBoxTextarea.value;
            if (preventDefault) {
                e.preventDefault();
            }
        });
        textBoxValueDisplay.textContent = "test1234";

        // Add event listener for click to focus
        textBox.addEventListener("click", () => {
            textBoxTextarea.focus();
        });

        textBoxTextarea.addEventListener("input", () => {
            textBoxValueDisplay.textContent = textBoxTextarea.value;
        });

        textBox.appendChild(textBoxTextarea);

        container.appendChild(textBox);

        return textBox;
    } catch (e) {
        console.error(e, e?.stack);
    }
}

(() => {
    document.getElementsByTagName("html")[0].classList.add("dark_theme");

    // Hovered element HTML content overlay, accessed with CTRL+O.
    let element = document.createElement("div");
    element.innerHTML = `<div id="textDisplayBoxRootA" style="pointer-events: none; background-color: #00000080; color: #FFFFFFFF; width: 100vw; height: 50vh; position: fixed; top: 0; left: 0; z-index: 10000000; display: none; white-space: pre-wrap; overflow-wrap: anywhere">Nothing selected!</div>`;
    window.document.body.appendChild(element);
    screenDisplayElement = document.getElementById("textDisplayBoxRootA");

    // General element debug info overlay, accessed with CTRL+ALT+I.
    element = document.createElement("div");
    element.id = "elementGeneralDebugOverlayElement";
    element.setAttribute(
        "style",
        "pointer-events: none; background-color: #00000080; color: #FFFFFFFF; width: 100vw; height: 25vh; position: fixed; top: 0; left: 0; z-index: 10000000; display: none; white-space: pre-wrap; overflow-wrap: anywhere;"
    );
    window.document.body.appendChild(element);
    elementGeneralDebugOverlayElement = document.getElementById("elementGeneralDebugOverlayElement");

    // Small corner debug info overlay, accessed with CTRL+I.
    element = document.createElement("div");
    element.id = "smallCornerDebugOverlayElement";
    element.setAttribute(
        "style",
        "pointer-events: none; background-color: #00000080; color: #FFFFFFFF; width: auto; height: auto; position: fixed; top: 0; right: 0; z-index: 10000000; display: none; white-space: pre-wrap; overflow-wrap: anywhere;"
    );
    element.textContent = "Nothing selected!";
    window.document.body.appendChild(element);
    smallCornerDebugOverlayElement = document.getElementById("smallCornerDebugOverlayElement");

    // CSS Editor, accessed with CTRL+P.
    element = document.createElement("div");
    element.innerHTML = `<div id="cssEditorBoxRootA" style="background-color: #00000080; color: #FFFFFFFF; width: 500px; height: 500px; max-width: 100%; max-height: 100%; position: fixed; top: 0; left: 0; z-index: 10000000; display: none;" draggable="true">
    <div id="cssEditor_mainDiv" style="display: block;">
        <h3 id="cssEditor_title" style="margin: 0; text-align: center;">CSS Editor</h3>
        <h6 id="cssEditor_subtitle" style="margin: 0;">Nothing selected!</h6>
        <textarea style="pointer-events: auto; user-select: text; width: auto; height: 300px; background-color: #808080FF; pointer-events: none;" id="cssEditorTextBoxA"></textarea>
        <button type="button" id="cssEditorSelectTargetButton" onclick="cssEditorDisplayElement.style.display = 'none'; cssEditorInSelectMode = true; event.preventDefault();">Select Target</button>
        <!-- <button type="button" id="cssEditorSelectStyleSheetTargetButton" onclick="cssEditor_selectDocumentStyleSheet_activate(); event.preventDefault();">Select Style Sheet Target</button> -->
        <button type="button" id="cssEditorEditRootCSSButton" onclick="cssEditor_rootElementStylesMode(); event.preventDefault();">Edit Root CSS</button>
        <button type="button" id="cssEditorEditGlobalStyleSheetButton" onclick="cssEditor_globalStyleElementStylesMode(); event.preventDefault();">Edit Global Style Sheet</button>
        <button type="button" id="cssEditorSaveChangesButton" onclick="cssEditor_saveChanges(); event.preventDefault();" disabled>Save Changes</button>
        <p id="cssEditorErrorText" style="color: red"></p>
    </div>
    <!-- <div id="cssEditor_documentStyleSelectorDiv" style="display: none;">
    </div> -->
</div>`;
    window.document.body.appendChild(element);
    cssEditorDisplayElement = document.getElementById("cssEditorBoxRootA");
    cssEditorTextBox = document.getElementById("cssEditorTextBoxA");
    cssEditorErrorText = document.getElementById("cssEditorErrorText");
    cssEditorSelectTargetButton = document.getElementById("cssEditorSelectTargetButton");
    // cssEditorTextBox.onkeypress = function (/** @type {KeyboardEvent} */ e) {
    //     e.stopPropagation();
    // };

    // Console overlay, accessed with CTRL+ALT+C.
    element = document.createElement("div");
    element.id = "consoleOverlayElement";
    element.setAttribute(
        "style",
        "background-color: #00000080; color: #FFFFFFFF; width: 95vw; height: 95vh; position: fixed; top: 2.5vh; left: 2.5vw; z-index: 10000000; display: none; white-space: pre-wrap; overflow-wrap: anywhere;/*  font-family: unset; */"
    );
    element.innerHTML = `<button type="button" style="position: absolute; top: 0; right: 0; font-family: Minecraft Seven v2; font-size: 50px; aspect-ratio: 1/1; color: #000000; width: 50px; height: 50px; z-index: 1;" onclick="consoleOverlayElement.style.display = 'none';"><span style="margin-top: -5px; font-family: Minecraft Seven v2;">x</span></button>
<div style="display: flex; flex-direction: row; height: 100%; width: 100%;">
    <div style="width: 100%; height: 75%; overflow-y: scroll; overflow-x: hidden; position: absolute; top: 0; left: 0;" class="addScrollbar">
        <div id="consoleOverlayTextElement" style="user-select: text; /* white-space: pre-wrap; overflow-wrap: anywhere;  */width: 100%; height: 100%;"></div>
    </div>
    <div style="width: 100%; height: 25%; position: absolute; bottom: 0; left: 0;">
        <textarea id="consoleOverlayInputFieldElement" style="user-select: text; width: 100%; height: 100%; pointer-events: auto;"></textarea>
        <button type="button" class="btn" style="position: absolute; bottom: 5px; right: 5px; font-size: 0.5in; line-height: 0.7142857143in; font-family: Minecraft Seven v2;" onclick="consoleOverlayExecute();">Execute</button>
    </div>
</div>`;
    window.document.body.appendChild(element);
    consoleOverlayElement = document.getElementById("consoleOverlayElement");
    consoleOverlayTextElement = document.getElementById("consoleOverlayTextElement");
    consoleOverlayInputFieldElement = document.getElementById("consoleOverlayInputFieldElement");

    // setInterval(()=>console.log(consoleOverlayInputFieldElement.value), 1000)

    // 8Crafter Utilities Main Menu, accessed with CTRL+M.
    element = document.createElement("div");
    element.innerHTML = `<div id="mainMenu8CrafterUtilities" style="background-color: #00000080; color: #FFFFFFFF; width: 75vw; height: 75vh; position: fixed; top: 12.5vh; left: 12.5vw; z-index: 20000000; display: none; backdrop-filter: blur(5px); border: 5px solid #87CEEb;" draggable="true">
    <div id="8CrafterUtilitiesMenu_leftSidebar" style="display: block; height: 100%; width: 30%; border-right: 5px solid #87CEEb; position: absolute; top: 0; left: 0;">
        <button type="button" class="btn nsel selected" style="font-size: 0.5in; line-height: 0.7142857143in;" id="8CrafterUtilitiesMenu_tabButton_general" onclick="setMainMenu8CrafterUtilitiesTab('general'); event.preventDefault();">General</button>
        <button type="button" class="btn nsel" style="font-size: 0.5in; line-height: 0.7142857143in;" id="8CrafterUtilitiesMenu_tabButton_UIs" onclick="setMainMenu8CrafterUtilitiesTab('UIs'); event.preventDefault();">UIs</button>
        <button type="button" class="btn nsel" style="font-size: 0.5in; line-height: 0.7142857143in;" id="8CrafterUtilitiesMenu_tabButton_about" onclick="setMainMenu8CrafterUtilitiesTab('about'); event.preventDefault();">About</button>
    </div>
    <div id="8CrafterUtilitiesMenu_rightSide" style="display: block; height: 100%; width: 70%; border-right: 5px solid #87CEEb; position: absolute; top: 0; right: 0; padding: 1rem; padding-right: 10px; overflow-y: scroll;" class="addScrollbar">
        <div id="8CrafterUtilitiesMenu_general" style="display: block;">
            <center>
                <h1>8Crafter Utilities</h1>
            </center>
            <p>
                <span style="white-space: pre-wrap;"><b>Version:</b> v${typeof oreUICustomizerVersion !== "undefined" ? oreUICustomizerVersion : window.oreUICustomizerVersion}</span>
            </p>
            <p>
                <span style="white-space: pre-wrap;"><b>Config:</b> ${JSON.stringify(typeof oreUICustomizerConfig !== "undefined" ? oreUICustomizerConfig : window.oreUICustomizerConfig, undefined, 4)}</span>
            </p>
        </div>
        <div id="8CrafterUtilitiesMenu_UIs" style="display: none;">
            <center>
                <h1>UIs</h1>
            </center>
            <button type="button" class="btn nsel" style="font-size: 0.5in; line-height: 0.7142857143in;" id="8CrafterUtilitiesMenu_button_viewHTMLSource" onclick="toggleHTMLSourceCodePreviewElement(); event.preventDefault();">View HTML Source</button>
            <button type="button" class="btn nsel" style="font-size: 0.5in; line-height: 0.7142857143in;" id="8CrafterUtilitiesMenu_button_CSSEditor" onclick="cssEditorDisplayElement.style.display = cssEditorDisplayElement.style.display === 'none' ? 'block' : 'none'; event.preventDefault();">CSS Editor</button>
            <button type="button" class="btn nsel" style="font-size: 0.5in; line-height: 0.7142857143in;" id="8CrafterUtilitiesMenu_button_smallCornerDebugOverlayElement" onclick="toggleSmallCornerDebugOverlay(); event.preventDefault();">Small Corner Debug Overlay</button>
            <button type="button" class="btn nsel" style="font-size: 0.5in; line-height: 0.7142857143in;" id="8CrafterUtilitiesMenu_button_elementGeneralDebugOverlayElement" onclick="toggleGeneralDebugOverlayElement(); event.preventDefault();">Element General Debug Overlay</button>
            <button type="button" class="btn nsel" style="font-size: 0.5in; line-height: 0.7142857143in;" id="8CrafterUtilitiesMenu_button_consoleOverlay" onclick="toggleConsoleOverlay(); event.preventDefault();">Console</button>
        </div>
        <div id="8CrafterUtilitiesMenu_about" style="display: none;">
            <center>
                <h1>About</h1>
            </center>
            <p>
                8Crafter's Ore UI Customizer v${typeof oreUICustomizerVersion !== "undefined" ? oreUICustomizerVersion : window.oreUICustomizerVersion}
            </p>
            <p>
                Source: https://www.8crafter.com/utilities/ore-ui-customizer
            </p>
            <h3>Support</h3>
            <p>
                Discord: https://discord.gg/jrCTeHGuhx
            </p>
            <p>
                GitHub: https://github.com/8Crafter-Studios/8Crafter.github.io
            </p>
            <p>
                Email: 8crafteryt@gmail.com
            </p>
        </div>
    </div>
</div>`;
    window.document.body.appendChild(element);
    mainMenu8CrafterUtilities = document.getElementById("mainMenu8CrafterUtilities");
    element = document.createElement("div");
    element.innerHTML = `<div id="screenInputBlocker" style="background-color: #00000080; color: #FFFFFFFF; width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 9999999; display: none;"></div>`;
    window.document.body.appendChild(element);
    screenInputBlocker = document.getElementById("screenInputBlocker");
    element = document.createElement("div");
    element.id = "htmlSourceCodePreviewElement";
    element.setAttribute(
        "style",
        `background-color: #000000C0; color: #FFFFFFFF; width: 95vw; height: 95vh; position: fixed; top: 2.5vh; left: 2.5vw; z-index: 10000001; display: none; overflow: scroll; scrollbar-width: thin;`
    );
    element.classList.add("addScrollbar");
    element.innerHTML = `<button type="button" style="position: absolute; top: 0; right: 0; font-family: Minecraft Seven v2; font-size: 50px; aspect-ratio: 1/1; color: #000000; width: 50px; height: 50px;" onclick="htmlSourceCodePreviewElement.style.display = 'none';"><span style="margin-top: -5px">x</span></button><p style="width: 100%;"></p>`;
    window.document.body.appendChild(element);
    htmlSourceCodePreviewElement = document.getElementById("htmlSourceCodePreviewElement");
    htmlSourceCodePreviewElementP = document.getElementById("htmlSourceCodePreviewElement").querySelector("p");
    element = document.createElement("style");
    element.id = "customGlobalCSSStyle";
    window.document.head.appendChild(element);
    customGlobalCSSStyleElement = document.getElementById("customGlobalCSSStyle");

    cssEditorTextBox.addEventListener("mouseup", () => {
        const caretPosition = cssEditorTextBox.selectionStart;
        screenDisplayElement.textContent = "Caret position: " + caretPosition;
    });
    // cssEditorTextBox.addEventListener("focusin", () => {
    //     document.getElementById("root").style.display = "none";
    //     for (const styleSheet of document.styleSheets) {
    //         if (styleSheet.ownerNode === customGlobalCSSStyleElement) {
    //             styleSheet.insertRule(`#root * { pointer-events: none !important; }`, 0);
    //             break;
    //         }
    //     }
    //     // document.getElementById("root").style.pointerEvents = "none";
    //     // document.getElementById("root").inert = true;
    //     // document.getElementById("root").setAttribute("disabled", "");
    // });
    // cssEditorTextBox.addEventListener("focusout", (e) => {
    //     document.getElementById("root").style.display = "";
    //     for (const styleSheet of document.styleSheets) {
    //         if (styleSheet.ownerNode === customGlobalCSSStyleElement) {
    //             styleSheet.deleteRule(0);
    //             break;
    //         }
    //     }
    //     e.preventDefault();
    //     e.stopImmediatePropagation();
    //     // document.getElementById("root").style.pointerEvents = "";
    //     // document.getElementById("root").inert = false;
    //     // document.getElementById("root").removeAttribute("disabled");
    // });

    // window.onkeyup = function(/** @type {KeyboardEvent} */ e) {
    //     if(e.key.toLowerCase() === "o" && screenDisplayElement.style.display === "block"){
    //         screenDisplayElement.style.display = "none";
    //         if(currentDebugMode === "hoveredElementDetails"){
    //             currentDebugMode = "none";
    //         }
    //     }
    // }
    window.onkeyup = function (/** @type {KeyboardEvent} */ e) {
        heldKeys = heldKeys.filter((key) => key !== e.key.toLowerCase());
        heldKeyCodes = heldKeyCodes.filter((key) => key !== e.keyCode);
        if (e.key.toLowerCase() === "p" && e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            // cssEditorInSelectMode = false;
            // if (cssEditorDisplayElement.style.display === "block") {
            //     cssEditorDisplayElement.style.display = "none";
            // } else {
            //     cssEditorDisplayElement.style.display = "block";
            // }
        } else if (e.key.toLowerCase() === "o" && e.ctrlKey) {
            e.preventDefault();
            // screenDisplayElement.style.display = "block";
            // if (currentDebugMode === "none") {
            //     currentDebugMode = "hoveredElementDetails";
            // } else {
            //     screenDisplayElement.style.display = "none";
            //     currentDebugMode = "none";
            // }
        } else if (e.key.toLowerCase() === "i" && e.ctrlKey && !e.altKey) {
            e.preventDefault();
        } else if (e.key.toLowerCase() === "i" && e.ctrlKey && e.altKey) {
            e.preventDefault();
        } else if (e.key.toLowerCase() === "m" && e.ctrlKey && e.altKey) {
            e.preventDefault();
        } else if (e.key.toLowerCase() === "c" && e.ctrlKey && e.altKey) {
            e.preventDefault();
        } else if (e.key.toLowerCase() === "u" && e.ctrlKey) {
            e.preventDefault();
            // screenDisplayElement.style.display = "block";
            // if (currentDebugMode === "none") {
            //     currentDebugMode = "hoveredElementDetails";
            // } else {
            //     screenDisplayElement.style.display = "none";
            //     currentDebugMode = "none";
            // }
        } else if (e.key.toLowerCase() === "s" && cssEditorInSelectMode && e.target !== cssEditorSelectTargetButton) {
            e.preventDefault();
            // cssEditorInSelectMode = false;
            // /**
            //  * @type {HTMLElement & EventTarget}
            //  */
            // const srcElement = currentMouseHoverTarget;
            // cssEditorSelectedType = "element";
            // cssEditorSelectedElement = srcElement;
            // cssEditorTextBox.value = JSON.stringify(srcElement.attributes.style, undefined, 4);
            // cssEditorDisplayElement.style.display = "block";
        }
    };
    window.onkeydown = function (/** @type {KeyboardEvent} */ e) {
        heldKeys = [...heldKeys.filter((key) => key !== e.key.toLowerCase()), e.key.toLowerCase()];
        heldKeyCodes = [...heldKeyCodes.filter((key) => key !== e.keyCode), e.keyCode];
        if (e.key.toLowerCase() === "p" && e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            cssEditorInSelectMode = false;
            if (cssEditorDisplayElement.style.display === "block") {
                cssEditorDisplayElement.style.display = "none";
            } else {
                cssEditorDisplayElement.style.display = "block";
            }
        } else if (e.key.toLowerCase() === "o" && e.ctrlKey) {
            e.preventDefault();
            screenDisplayElement.style.display = "block";
            if (currentDebugMode === "none") {
                currentDebugMode = "hoveredElementDetails";
            } else {
                screenDisplayElement.style.display = "none";
                currentDebugMode = "none";
            }
        } else if (e.key.toLowerCase() === "i" && e.ctrlKey && !e.altKey) {
            e.preventDefault();
            toggleSmallCornerDebugOverlay();
        } else if (e.key.toLowerCase() === "i" && e.ctrlKey && e.altKey) {
            e.preventDefault();
            toggleGeneralDebugOverlayElement();
        } else if (e.key.toLowerCase() === "m" && e.ctrlKey && e.altKey) {
            e.preventDefault();
            if (mainMenu8CrafterUtilities.style.display === "none") {
                mainMenu8CrafterUtilities.style.display = "block";
            } else {
                mainMenu8CrafterUtilities.style.display = "none";
            }
        } else if (e.key.toLowerCase() === "c" && e.ctrlKey && e.altKey) {
            e.preventDefault();
            toggleConsoleOverlay();
        } else if (e.key.toLowerCase() === "u" && e.ctrlKey) {
            e.preventDefault();
            toggleHTMLSourceCodePreviewElement();
        } else if (e.key.toLowerCase() === "s" && cssEditorInSelectMode && currentMouseHoverTarget !== cssEditorSelectTargetButton) {
            e.preventDefault();
            cssEditorInSelectMode = false;
            /**
             * @type {HTMLElement & EventTarget}
             */
            const srcElement = currentMouseHoverTarget;
            cssEditorSelectedType = "element";
            cssEditorSelectedElement = srcElement;
            cssEditorTextBox.value = srcElement.getAttribute("style") ?? "";
            setCSSEditorMode("element");
            cssEditorDisplayElement.style.display = "block";
        }
    };
    window.onmousedown = function (/** @type {KeyboardEvent} */ e) {
        if (cssEditorInSelectMode && e.target !== cssEditorSelectTargetButton) {
            e.preventDefault();
            // cssEditorInSelectMode = false;
            /**
             * @type {HTMLElement & EventTarget}
             */
            const srcElement = currentMouseHoverTarget;
            cssEditorSelectedType = "element";
            cssEditorSelectedElement = srcElement;
            cssEditorTextBox.value = srcElement.getAttribute("style") ?? "";
            setCSSEditorMode("element");
            cssEditorDisplayElement.style.display = "block";
            screenInputBlocker.style.display = "block";

            // document.getElementById("root").style.pointerEvents = "none";
            // document.getElementById("root").style.filter = "brightness(5)";
        }
    };
    window.onmouseup = function (/** @type {KeyboardEvent} */ e) {
        if (cssEditorInSelectMode && e.target !== cssEditorSelectTargetButton) {
            e.preventDefault();
            cssEditorInSelectMode = false;
            screenInputBlocker.style.display = "none";
            // /**
            //  * @type {HTMLElement & EventTarget}
            //  */
            // const srcElement = currentMouseHoverTarget;
            // cssEditorSelectedType = "element";
            // cssEditorSelectedElement = srcElement;
            // cssEditorTextBox.value = JSON.stringify(srcElement.attributes.style, undefined, 4);
            // cssEditorDisplayElement.style.display = "block";
            // e.target = undefined;
        }
    };
    window.onmousemove = function (/** @type {MouseEvent} */ e) {
        /**
         * @type {HTMLElement & EventTarget}
         */
        const srcElement = e.target;
        currentMouseHoverTarget = srcElement;
        // screenDisplayElement.textContent = "aaaa";
        if (currentDebugMode === "hoveredElementDetails") {
            screenDisplayElement.textContent = srcElement.outerHTML.slice(0, 9000);
        }
        if (elementGeneralDebugOverlayElement.style.display === "block") {
            const boundingBox = srcElement.getBoundingClientRect();
            elementGeneralDebugOverlayElement.textContent = `Element: ${UTILS.cssPath(srcElement)}
Bounding Box: ${JSON.stringify({
                x: boundingBox.x,
                y: boundingBox.y,
                width: boundingBox.width,
                height: boundingBox.height,
                top: boundingBox.top,
                right: boundingBox.right,
                bottom: boundingBox.bottom,
                left: boundingBox.left,
            })}
Children: ${srcElement.children.length}
Attributes:
${
    currentMouseHoverTarget.getAttributeNames().length > 0
        ? currentMouseHoverTarget
              .getAttributeNames()
              .map((name) => `${name}: ${currentMouseHoverTarget.getAttribute(name)}`)
              .join("\n")
        : "None"
}`;
        }
        if (smallCornerDebugOverlayElement.style.display === "block") {
            smallCornerDebugOverlayElement.textContent = `Client: x: ${e.clientX} y: ${e.clientY}
Offset x: ${e.offsetX} y: ${e.offsetY}
Page: x: ${e.pageX} y: ${e.pageY}
Screen: x: ${e.screenX} y: ${e.screenY}
Layer: x: ${e.layerX} y: ${e.layerY}
Movement: x: ${e.movementX} y: ${e.movementY}
Held Keys: ${heldKeys}
Held Key Codes: ${heldKeyCodes}`;
        }
    };

    /**
     *
     * @param {MouseEvent} event
     */
    function updateCursorPosition(event) {
        mousePos.clientX = event.clientX;
        mousePos.clientY = event.clientY;
        mousePos.offsetX = event.offsetX;
        mousePos.offsetY = event.offsetY;
        mousePos.pageX = event.pageX;
        mousePos.pageY = event.pageY;
        mousePos.screenX = event.screenX;
        mousePos.screenY = event.screenY;
        mousePos.layerX = event.layerX;
        mousePos.layerY = event.layerY;
        mousePos.movementX = event.movementX;
        mousePos.movementY = event.movementY;
    }
    document.addEventListener("mousemove", updateCursorPosition);
    document.querySelectorAll(".addScrollbar").forEach((/** @type {HTMLElement} */ element) => {
        // Add a scrollbar to the div element
        // element.style.overflowY = "auto";

        element.style.paddingRight = "10px";
        // Create a scrollbar element
        var scrollbarParent = document.createElement("div");
        scrollbarParent.style.position = "absolute";
        scrollbarParent.style.top = "0px";
        scrollbarParent.style.right = "0px";
        scrollbarParent.style.width = "10px";
        scrollbarParent.style.height = "100%";
        scrollbarParent.style.margin = "0";
        scrollbarParent.style.padding = "0";
        scrollbarParent.style.background = "rgba(100, 100, 100, 1)";
        scrollbarParent.style.zIndex = "100000000000";
        scrollbarParent.classList.add("customScrollbarParent");
        var scrollbar = document.createElement("div");
        scrollbar.style.position = "absolute";
        scrollbar.style.top = "0px";
        scrollbar.style.right = "0px";
        scrollbar.style.width = "10px";
        scrollbar.style.height = "100%";
        scrollbar.style.background = "rgba(255, 255, 255, 1)";
        scrollbar.style.borderRadius = "5px";
        scrollbar.style.zIndex = "100000000000";
        scrollbar.classList.add("customScrollbar");

        // Add the scrollbar to the div element
        scrollbarParent.appendChild(scrollbar);
        element.appendChild(scrollbarParent);

        var mouseDownOnScrollbar = false;
        var mousePosOffset = 0;
        var totalHeight = 0;
        var visibleHeight = 0;
        var scrollPosition = 0;
        var scrollbarHeight = 0;
        var scrollbarTop = 0;

        // Add event listeners to the scrollbar
        scrollbarParent.addEventListener("mousedown", function (event) {
            event.preventDefault();
            var scrollbarParentClientRect = scrollbarParent.getBoundingClientRect();
            mouseDownOnScrollbar = true;
            mousePosOffset = event.clientY - scrollbarParentClientRect.top - scrollbarTop;
            var mouseY = Math.min(
                scrollbarParentClientRect.top + scrollbarParentClientRect.height,
                Math.max(scrollbarParentClientRect.top, event.clientY - mousePosOffset)
            );
            totalHeight = element.scrollHeight;
            visibleHeight = element.clientHeight;
            scrollPosition = Math.min(
                Math.max(0, ((mouseY - scrollbarParentClientRect.top) / (scrollbarParentClientRect.height - scrollbarHeight)) * (totalHeight - visibleHeight)),
                totalHeight - visibleHeight
            );
            element.scrollTop = scrollPosition;
            scrollbarHeight = Math.max(60, (visibleHeight / totalHeight) * visibleHeight);
            scrollbarTop = Math.min((scrollPosition / (totalHeight - visibleHeight)) * (visibleHeight - scrollbarHeight), visibleHeight - scrollbarHeight);
            scrollbar.style.height = scrollbarHeight + "px";
            scrollbar.style.top = scrollbarTop + "px";
            scrollbarParent.style.top = element.scrollTop + "px";
        });

        document.addEventListener("mouseup", function (event) {
            if (mouseDownOnScrollbar) {
                event.preventDefault();
                mouseDownOnScrollbar = false;
            }
        });

        document.addEventListener("mousemove", function (event) {
            if (mouseDownOnScrollbar) {
                event.preventDefault();
                var scrollbarParentClientRect = scrollbarParent.getBoundingClientRect();
                var mouseY = Math.min(
                    scrollbarParentClientRect.top + scrollbarParentClientRect.height,
                    Math.max(scrollbarParentClientRect.top, event.clientY - mousePosOffset)
                );
                totalHeight = element.scrollHeight;
                visibleHeight = element.clientHeight;
                scrollPosition = Math.min(
                    Math.max(
                        0,
                        ((mouseY - scrollbarParentClientRect.top) / (scrollbarParentClientRect.height - scrollbarHeight)) * (totalHeight - visibleHeight)
                    ),
                    totalHeight - visibleHeight
                );
                element.scrollTop = scrollPosition;
                scrollbarHeight = Math.max(60, (visibleHeight / totalHeight) * visibleHeight);
                scrollbarTop = Math.min((scrollPosition / (totalHeight - visibleHeight)) * (visibleHeight - scrollbarHeight), visibleHeight - scrollbarHeight);
                scrollbar.style.height = scrollbarHeight + "px";
                scrollbar.style.top = scrollbarTop + "px";
                scrollbarParent.style.top = element.scrollTop + "px";
            }
        });

        // Update the scrollbar position when the div is scrolled
        element.addEventListener("scroll", function () {
            var scrollPosition = element.scrollTop;
            totalHeight = element.scrollHeight;
            visibleHeight = element.clientHeight;
            scrollbarHeight = Math.max(60, (visibleHeight / totalHeight) * visibleHeight);
            scrollbarTop = Math.min((scrollPosition / (totalHeight - visibleHeight)) * (visibleHeight - scrollbarHeight), visibleHeight - scrollbarHeight);
            scrollbar.style.height = scrollbarHeight + "px";
            scrollbar.style.top = scrollbarTop + "px";
            scrollbarParent.style.top = Math.min(element.scrollTop, element.scrollHeight - visibleHeight) + "px";
            scrollbarParent.style.height = visibleHeight + "px";
        });
        const mutationObserver = new MutationObserver(() => {
            setTimeout(() => {
                totalHeight = element.scrollHeight;
                visibleHeight = element.clientHeight;
                scrollbarHeight = Math.max(60, (visibleHeight / totalHeight) * visibleHeight);
                scrollbarTop = Math.min((element.scrollTop / (totalHeight - visibleHeight)) * (visibleHeight - scrollbarHeight), visibleHeight - scrollbarHeight);
                scrollbar.style.height = scrollbarHeight + "px";
                scrollbar.style.top = scrollbarTop + "px";
                scrollbarParent.style.top = Math.min(element.scrollTop, element.scrollHeight - visibleHeight) + "px";
                scrollbarParent.style.height = visibleHeight + "px";
            }, 10);
        });
        mutationObserver.observe(element, {
            childList: true,
            attributes: true,
            subtree: true,
        });
    });
    document.querySelectorAll("div").forEach((/** @type {HTMLElement} */ element) => {
        if(!element.className.includes("interactive") && getComputedStyle(element).cursor !== "pointer") return;
        element.addEventListener("mouseover", function (event) {
            element.classList.add("hovered");
            if(element.classList.contains("J3E01")) {
                element.classList.add("CndCq")
            } else if(element.classList.contains("A9EUw")) {
                element.classList.add("MaRsn")
            } else if(element.classList.contains("koZyA")) {
                element.classList.add("uZ4Jk")
            }
        });
        element.addEventListener("mouseout", function (event) {
            element.classList.remove("hovered");
            if(element.classList.contains("J3E01")) {
                element.classList.remove("CndCq")
            } else if(element.classList.contains("A9EUw")) {
                element.classList.remove("MaRsn")
            } else if(element.classList.contains("koZyA")) {
                element.classList.remove("uZ4Jk")
            }
            element.classList.remove("pressed");
            if(element.classList.contains("LtoW3")) {
                element.classList.remove("fYLl1")
            } else if(element.classList.contains("J3E01")) {
                element.classList.remove("W_NP7")
            } else if(element.classList.contains("A9EUw")) {
                element.classList.remove("ZQArf")
            } else if(element.classList.contains("koZyA")) {
                element.classList.remove("f7Wn5")
            }
        });
        element.addEventListener("mousedown", function (event) {
            element.classList.add("pressed");
            if(element.classList.contains("LtoW3")) {
                element.classList.add("fYLl1")
            } else if(element.classList.contains("J3E01")) {
                element.classList.add("W_NP7")
            } else if(element.classList.contains("A9EUw")) {
                element.classList.add("ZQArf")
            } else if(element.classList.contains("koZyA")) {
                element.classList.add("f7Wn5")
            }
        });
        element.addEventListener("mouseup", function (event) {
            element.classList.remove("pressed");
            if(element.classList.contains("LtoW3")) {
                element.classList.remove("fYLl1")
            } else if(element.classList.contains("J3E01")) {
                element.classList.remove("W_NP7")
            } else if(element.classList.contains("A9EUw")) {
                element.classList.remove("ZQArf")
            } else if(element.classList.contains("koZyA")) {
                element.classList.remove("f7Wn5")
            }
        });
    });
})();
