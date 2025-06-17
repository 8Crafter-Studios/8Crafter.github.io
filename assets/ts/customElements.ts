let VisibleOverlayPages: Set<OverlayPageElement> = new Set();

/**
 * A custom HTML element for overlay pages.
 */
class OverlayPageElement extends HTMLElement {
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
        $("body > *:not(.overlay_page, overlay-page), body > *:not(.overlay_page, overlay-page) *:not(.overlay_page, overlay-page)").toArray().forEach(function (element: HTMLElement) {
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
