declare namespace UTILS {
    class DOMNodePathStep {
        value: string;
        optimized: boolean;
        /**
         * @constructor
         * @param {string} value
         * @param {boolean} optimized
         */
        constructor(value: string, optimized: boolean);
        /**
         * @return {string}
         */
        toString(): string;
    }
    /**
     *
     * @param {Element} node
     * @param {boolean | undefined} [optimized]
     * @returns
     */
    function cssPath(node: Element, optimized?: boolean | undefined): string;
    type DOMNode = Element;
    /**
     *
     * @param {Element} node
     * @param {boolean} optimized
     * @param {boolean} isTargetNode
     * @returns
     */
    function _cssPathStep(node: Element, optimized: boolean, isTargetNode: boolean): DOMNodePathStep | null;
}
