declare let VisibleOverlayPages: Set<OverlayPageElement>;
/**
 * A custom HTML element for overlay pages.
 */
declare class OverlayPageElement extends HTMLElement {
    /**
     * Creates an instance of {@link OverlayPageElement}.
     */
    constructor();
    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback(): void;
    /**
     * Toggles the visibility of the overlay page.
     */
    togglePageVisibility(): void;
}
declare function setBodyOverlayPageVisibleClass(): void;
