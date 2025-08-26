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

function addGlobalStylesToShadowRoot(shadowRoot: ShadowRoot) {
    shadowRoot.adoptedStyleSheets.push(...getGlobalStyleSheets());
}

export let VisibleOverlayPages: Set<exports.OverlayPageElement> = new Set();

namespace exports {
    /**
     * A custom HTML element for overlay pages.
     */
    export class OverlayPageElement extends HTMLElement {
        /**
         * Creates an instance of {@link OverlayPageElement}.
         */
        public constructor() {
            super();
            const backgroundChild: HTMLDivElement = document.createElement("div");
            backgroundChild.classList.add("overlay_page_background");
            this.prepend(backgroundChild);
        }
        /**
         * Called when the element is connected to the DOM.
         */
        public connectedCallback(): void {
            this.style.display = "none";
            if (this.parentElement?.tagName !== "BODY") {
                throw new ReferenceError("overlay-page must be a direct child of body");
            }
        }
        /**
         * Toggles the visibility of the overlay page.
         */
        public togglePageVisibility() {
            if (this.style.display === "none") {
                $(".active_overlay_page").removeClass("active_overlay_page");
                this.classList.add("active_overlay_page");
                VisibleOverlayPages.add(this);
            } else {
                this.classList.remove("active_overlay_page");
                VisibleOverlayPages.delete(this);
            }
            $(this).slideToggle();
            setBodyOverlayPageVisibleClass();
        }
    }

    function setBodyOverlayPageVisibleClass(): void {
        if (VisibleOverlayPages.size > 0) {
            $("body > *:not(.overlay_page, overlay-page), body > *:not(.overlay_page, overlay-page) *:not(.overlay_page, overlay-page)")
                .toArray()
                .forEach(function (element: HTMLElement) {
                    if (element.parentElement?.classList.contains("button_container") || element.classList.contains("button_container")) {
                        return;
                    }
                    if (element.scrollWidth > element.clientWidth) {
                        element.classList.add("possible_scroll_x");
                        return;
                    } else {
                        element.classList.remove("possible_scroll_x");
                    }
                    if (element.scrollHeight > element.clientHeight) {
                        element.classList.add("possible_scroll_y");
                        return;
                    } else {
                        element.classList.remove("possible_scroll_y");
                    }
                });
            $("body").addClass("overlay_page_visible");
        } else {
            $("body").removeClass("overlay_page_visible");
        }
    }

    customElements.define("overlay-page", OverlayPageElement);

    export class MessageFormDataElement extends HTMLElement {
        /**
         * A callback that is called when the close button is clicked.
         */
        public oncloseclick: (this: this, evt: Event) => void = () => {
            const callback: string | null = this.getAttribute("oncloseclick");
            if (callback) {
                eval(callback);
            }
        };
        /**
         * A callback that is called when the first button is clicked.
         */
        public onbutton1click: (this: this, evt: Event) => void = () => {
            const callback: string | null = this.getAttribute("onbutton1click");
            if (callback) {
                eval(callback);
            }
        };
        /**
         * A callback that is called when the second button is clicked.
         */
        public onbutton2click: (this: this, evt: Event) => void = () => {
            const callback: string | null = this.getAttribute("onbutton2click");
            if (callback) {
                eval(callback);
            }
        };
        public resizeListener?: () => void;
        public constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.shadowRoot!.innerHTML = `<link href="/assets/css/default.css" rel="stylesheet" /><div id="testHelpMenuMessageFormData" class="MessageFormData_popup">
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
            $(this.shadowRoot!)
                .find("button")
                .mousedown(() => SoundEffects[defaultButtonSoundEffect]());
            this.shadowRoot!.querySelector("button.MessageFormData_button1")!.addEventListener("click", (evt: Event) => this.onbutton1click(evt));
            this.shadowRoot!.querySelector("button.MessageFormData_button1")!.addEventListener("click", () => this.remove());
            this.shadowRoot!.querySelector("button.MessageFormData_button2")!.addEventListener("click", (evt: Event) => this.onbutton2click(evt));
            this.shadowRoot!.querySelector("button.MessageFormData_button2")!.addEventListener("click", () => this.remove());
            this.shadowRoot!.querySelector("button.MessageFormData_close")!.addEventListener("click", (evt: Event) => this.oncloseclick(evt));
        }
        public connectedCallback(): void {
            this.resizeListener = (): void => {
                const zoom = Math.min(innerWidth / 216.55, innerHeight / 177.5);
                this.style.zoom = `${zoom / 2}`;
            };
            window.addEventListener("resize", this.resizeListener);
            this.resizeListener();
        }
        public disconnectedCallback(): void {
            window.removeEventListener("resize", this.resizeListener!);
        }
    }

    customElements.define("mc-message-form-data", MessageFormDataElement);
}

declare global {
    export import OverlayPageElement = exports.OverlayPageElement;
    export import MessageFormDataElement = exports.MessageFormDataElement;
}
