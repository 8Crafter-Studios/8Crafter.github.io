export declare let VisibleOverlayPages: Set<exports.OverlayPageElement>;
declare namespace exports {
    /**
     * A custom HTML element for overlay pages.
     */
    class OverlayPageElement extends HTMLElement {
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
    class MessageFormDataElement extends HTMLElement {
        /**
         * A callback that is called when the close button is clicked.
         */
        oncloseclick: (this: this, evt: Event) => void;
        /**
         * A callback that is called when the first button is clicked.
         */
        onbutton1click: (this: this, evt: Event) => void;
        /**
         * A callback that is called when the second button is clicked.
         */
        onbutton2click: (this: this, evt: Event) => void;
        resizeListener?: () => void;
        constructor();
        connectedCallback(): void;
        disconnectedCallback(): void;
    }
}
declare global {
    export import OverlayPageElement = exports.OverlayPageElement;
    export import MessageFormDataElement = exports.MessageFormDataElement;
}
export {};
