/**
 * @type {HTMLDivElement}
 */
let mainMenu8CrafterUtilities;

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
        if(child.id === "8CrafterUtilitiesMenu_leftSidebar") continue;
        child.style.display = child.id === "8CrafterUtilitiesMenu_" + tab ? "block" : "none";
    }
    for (const child of document.getElementById("8CrafterUtilitiesMenu_leftSidebar").children) {
        if(child.id === "8CrafterUtilitiesMenu_tabButton_" + tab) {
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
Bounding Box: ${JSON.stringify({x: boundingBox.x, y: boundingBox.y, width: boundingBox.width, height: boundingBox.height, top: boundingBox.top, right: boundingBox.right, bottom: boundingBox.bottom, left: boundingBox.left})}
Children: ${currentMouseHoverTarget.children.length}
Attributes:
${currentMouseHoverTarget.getAttributeNames().length > 0 ? currentMouseHoverTarget.getAttributeNames().map((name) => `${name}: ${currentMouseHoverTarget.getAttribute(name)}`).join("\n") : "None"}`;
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

(() => {
    document.getElementsByTagName("html")[0].classList.add("dark_theme");
    // Hovered element HTML content overlay, accessed with CTRL+O.
    let element = document.createElement("div");
    element.innerHTML = `<div id="textDisplayBoxRootA" style="pointer-events: none; background-color: #00000080; color: #FFFFFFFF; width: 100vw; height: 50vh; position: fixed; top: 0; left: 0; z-index: 10000000; display: none;">Nothing selected!</div>`;
    window.document.body.appendChild(element);
    screenDisplayElement = document.getElementById("textDisplayBoxRootA");
    // General element debug info overlay, accessed with CTRL+ALT+I.
    element = document.createElement("div");
    element.id = "elementGeneralDebugOverlayElement";
    element.setAttribute("style", "pointer-events: none; background-color: #00000080; color: #FFFFFFFF; width: 100vw; height: 25vh; position: fixed; top: 0; left: 0; z-index: 10000000; display: none; white-space: pre-wrap; overflow-wrap: anywhere;");
    window.document.body.appendChild(element);
    elementGeneralDebugOverlayElement = document.getElementById("elementGeneralDebugOverlayElement");
    // Small corner debug info overlay, accessed with CTRL+I.
    element = document.createElement("div");
    element.id = "smallCornerDebugOverlayElement";
    element.setAttribute("style", "pointer-events: none; background-color: #00000080; color: #FFFFFFFF; width: auto; height: auto; position: fixed; top: 0; right: 0; z-index: 10000000; display: none; white-space: pre-wrap; overflow-wrap: anywhere;");
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
    // CSS Editor, accessed with CTRL+P.
    element = document.createElement("div");
    element.innerHTML = `<div id="mainMenu8CrafterUtilities" style="background-color: #00000080; color: #FFFFFFFF; width: 75vw; height: 75vh; position: fixed; top: 12.5vh; left: 12.5vw; z-index: 20000000; display: none; backdrop-filter: blur(5px); border: 5px solid #87CEEb;" draggable="true">
    <div id="8CrafterUtilitiesMenu_leftSidebar" style="display: block; height: 100%; width: 30%; border-right: 5px solid #87CEEb; position: absolute; top: 0; left: 0;">
        <button type="button" class="btn nsel selected" id="8CrafterUtilitiesMenu_tabButton_general" onclick="setMainMenu8CrafterUtilitiesTab('general'); event.preventDefault();">General</button>
        <button type="button" class="btn nsel" id="8CrafterUtilitiesMenu_tabButton_UIs" onclick="setMainMenu8CrafterUtilitiesTab('UIs'); event.preventDefault();">UIs</button>
    </div>
    <div id="8CrafterUtilitiesMenu_rightSide" style="display: block; height: 100%; width: 70%; border-right: 5px solid #87CEEb; position: absolute; top: 0; right: 0; padding: 1rem;">
        <div id="8CrafterUtilitiesMenu_general" style="display: block;">
            <center>
                <h1>8Crafter Utilities</h1>
            </center>
        </div>
        <div id="8CrafterUtilitiesMenu_UIs" style="display: none;">
            <center>
                <h1>UIs</h1>
            </center>
            <button type="button" class="btn nsel" id="8CrafterUtilitiesMenu_button_viewHTMLSource" onclick="toggleHTMLSourceCodePreviewElement(); event.preventDefault();">View HTML Source</button>
            <button type="button" class="btn nsel" id="8CrafterUtilitiesMenu_button_CSSEditor" onclick="cssEditorDisplayElement.style.display = cssEditorDisplayElement.style.display === 'none' ? 'block' : 'none'; event.preventDefault();">CSS Editor</button>
            <button type="button" class="btn nsel" id="8CrafterUtilitiesMenu_button_smallCornerDebugOverlayElement" onclick="toggleSmallCornerDebugOverlay(); event.preventDefault();">Small Corner Debug Overlay</button>
            <button type="button" class="btn nsel" id="8CrafterUtilitiesMenu_button_elementGeneralDebugOverlayElement" onclick="toggleGeneralDebugOverlayElement(); event.preventDefault();">Element General Debug Overlay</button>
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
    element.innerHTML = `<button type="button" style="position: absolute; top: 0; right: 0; font-family: Minecraft Seven v2; font-size: 50px; aspect-ratio: 1/1; color: #000000; width: 50px; height: 50px;" onclick="htmlSourceCodePreviewElement.style.display = 'none';"><span style="margin-top: -5px">x</span></button><p style="width: 100%;"></p>`;
    window.document.body.appendChild(element);
    htmlSourceCodePreviewElement = document.getElementById("htmlSourceCodePreviewElement");
    htmlSourceCodePreviewElementP = document.getElementById("htmlSourceCodePreviewElement").querySelector("p");
    element = document.createElement("style");
    element.id = "customGlobalCSSStyle";
    window.document.head.appendChild(element);
    customGlobalCSSStyleElement = document.getElementById("customGlobalCSSStyle");

    cssEditorTextBox.addEventListener('mouseup', () => {
      const caretPosition = cssEditorTextBox.selectionStart;
      screenDisplayElement.textContent = 'Caret position: ' + caretPosition;
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
Bounding Box: ${JSON.stringify({x: boundingBox.x, y: boundingBox.y, width: boundingBox.width, height: boundingBox.height, top: boundingBox.top, right: boundingBox.right, bottom: boundingBox.bottom, left: boundingBox.left})}
Children: ${srcElement.children.length}
Attributes:
${currentMouseHoverTarget.getAttributeNames().length > 0 ? currentMouseHoverTarget.getAttributeNames().map((name) => `${name}: ${currentMouseHoverTarget.getAttribute(name)}`).join("\n") : "None"}`;
        }
        if(smallCornerDebugOverlayElement.style.display === "block") {
            smallCornerDebugOverlayElement.textContent = `Client: x: ${e.clientX} y: ${e.clientY}
Offset x: ${e.offsetX} y: ${e.offsetY}
Page: x: ${e.pageX} y: ${e.pageY}
Screen: x: ${e.screenX} y: ${e.screenY}
Layer: x: ${e.layerX} y: ${e.layerY}
Movement: x: ${e.movementX} y: ${e.movementY}`;
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
})();
