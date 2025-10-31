function getGlobalStyleSheets() {
    return Array.from(document.styleSheets).map((x) => {
        const sheet = new CSSStyleSheet();
        const css = Array.from(x.cssRules)
            .map((rule) => rule.cssText)
            .join(" ");
        sheet.replaceSync(css);
        return sheet;
    });
}
function addGlobalStylesToShadowRoot(shadowRoot) {
    shadowRoot.adoptedStyleSheets.push(...getGlobalStyleSheets());
}
export let VisibleOverlayPages = new Set();
var exports;
(function (exports) {
    /**
     * A custom HTML element for overlay pages.
     */
    class OverlayPageElement extends HTMLElement {
        /**
         * Creates an instance of {@link OverlayPageElement}.
         */
        constructor() {
            super();
            const backgroundChild = document.createElement("div");
            backgroundChild.classList.add("overlay_page_background");
            this.prepend(backgroundChild);
        }
        /**
         * Called when the element is connected to the DOM.
         */
        connectedCallback() {
            this.style.display = "none";
            if (this.parentElement?.tagName !== "BODY") {
                throw new ReferenceError("overlay-page must be a direct child of body");
            }
        }
        /**
         * Toggles the visibility of the overlay page.
         */
        togglePageVisibility() {
            if (this.style.display === "none") {
                $(".active_overlay_page").removeClass("active_overlay_page");
                this.classList.add("active_overlay_page");
                VisibleOverlayPages.add(this);
            }
            else {
                this.classList.remove("active_overlay_page");
                VisibleOverlayPages.delete(this);
            }
            $(this).slideToggle();
            setBodyOverlayPageVisibleClass();
        }
    }
    exports.OverlayPageElement = OverlayPageElement;
    function setBodyOverlayPageVisibleClass() {
        if (VisibleOverlayPages.size > 0) {
            $("body > *:not(.overlay_page, overlay-page), body > *:not(.overlay_page, overlay-page) *:not(.overlay_page, overlay-page)")
                .toArray()
                .forEach(function (element) {
                if (element.parentElement?.classList.contains("button_container") || element.classList.contains("button_container")) {
                    return;
                }
                if (element.scrollWidth > element.clientWidth) {
                    element.classList.add("possible_scroll_x");
                    return;
                }
                else {
                    element.classList.remove("possible_scroll_x");
                }
                if (element.scrollHeight > element.clientHeight) {
                    element.classList.add("possible_scroll_y");
                    return;
                }
                else {
                    element.classList.remove("possible_scroll_y");
                }
            });
            $("body").addClass("overlay_page_visible");
        }
        else {
            $("body").removeClass("overlay_page_visible");
        }
    }
    customElements.define("overlay-page", OverlayPageElement);
    class MessageFormDataElement extends HTMLElement {
        /**
         * A callback that is called when the close button is clicked.
         */
        oncloseclick = () => {
            const callback = this.getAttribute("oncloseclick");
            if (callback) {
                eval(callback);
            }
        };
        /**
         * A callback that is called when the first button is clicked.
         */
        onbutton1click = () => {
            const callback = this.getAttribute("onbutton1click");
            if (callback) {
                eval(callback);
            }
        };
        /**
         * A callback that is called when the second button is clicked.
         */
        onbutton2click = () => {
            const callback = this.getAttribute("onbutton2click");
            if (callback) {
                eval(callback);
            }
        };
        resizeListener;
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot.innerHTML = `<link href="/assets/css/default.css" rel="stylesheet" /><div id="testHelpMenuMessageFormData" class="MessageFormData_popup">
      <div class="MessageFormData_body">
        <span class="MessageFormData_bodyText"><slot>Body Text</slot></span>
          <div style="height: 5px;"></div>
      </div>
      <div class="MessageFormData_title">
        <slot name="titleText">Title Text</slot>
      </div>
      <div class="MessageFormData_buttons">
        <div>
          <button type="button" class="btn no-remove-disabled nsel MessageFormData_button1"
            style="font-family: MINECRAFTFONT; display: inline;" ontouchstart="">
            <slot name="button1">Okay</slot>
          </button>
        </div>
        <div>
            <button type="button" class="btn no-remove-disabled nsel MessageFormData_button2"
            style="font-family: MINECRAFTFONT; display: inline;" ontouchstart="">
            <slot name="button2">Close</slot>
            </button>
        </div>
      </div>
      <button type="button" class="no-remove-disabled nsel MessageFormData_close"
        style="font-family: MINECRAFTFONT; margin-top: -10px; margin-bottom: 20px; display: inline;"
        title="Close" ontouchstart="" onclick="this.parentElement.parentNode.host.remove()"></button>
    </div>`;
            $(this.shadowRoot)
                .find("button")
                .mousedown(() => SoundEffects[defaultButtonSoundEffect]());
            this.shadowRoot.querySelector("button.MessageFormData_button1").addEventListener("click", (evt) => this.onbutton1click(evt));
            this.shadowRoot.querySelector("button.MessageFormData_button1").addEventListener("click", () => this.remove());
            this.shadowRoot.querySelector("button.MessageFormData_button2").addEventListener("click", (evt) => this.onbutton2click(evt));
            this.shadowRoot.querySelector("button.MessageFormData_button2").addEventListener("click", () => this.remove());
            this.shadowRoot.querySelector("button.MessageFormData_close").addEventListener("click", (evt) => this.oncloseclick(evt));
        }
        connectedCallback() {
            this.resizeListener = () => {
                const zoom = Math.min(innerWidth / 216.55, innerHeight / 177.5);
                this.style.zoom = `${zoom / 2}`;
            };
            window.addEventListener("resize", this.resizeListener);
            this.resizeListener();
        }
        disconnectedCallback() {
            window.removeEventListener("resize", this.resizeListener);
        }
    }
    exports.MessageFormDataElement = MessageFormDataElement;
    customElements.define("mc-message-form-data", MessageFormDataElement);
})(exports || (exports = {}));
