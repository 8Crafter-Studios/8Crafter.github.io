type CSSJSObject = {
    selector: string;
    type: string;
    styles: string;
    rules?: undefined;
    subStyles?: undefined;
    comments?: undefined;
} | {
    selector: string;
    type: "media";
    styles?: undefined;
    rules?: undefined;
    subStyles: CSSJSObject[];
    comments?: string | null;
} | {
    selector: string;
    type?: string;
    styles?: undefined;
    rules: CSSJSRule[];
    subStyles?: undefined;
    comments?: string | null;
};
type CSSJSRule = {
    directive: string;
    value: string;
    defective?: boolean | undefined;
    type?: "DELETED";
};
declare class cssjs<TestMode extends false | ((...args: [string, string]) => any) = false> {
    cssImportStatements: string[];
    cssKeyframeStatements: any[];
    cssRegex: RegExp;
    cssMediaQueryRegex: string;
    cssKeyframeRegex: string;
    combinedCSSRegex: string;
    cssCommentsRegex: string;
    cssImportStatementRegex: RegExp;
    css: CSSJSObject[];
    cssPreviewNamespace?: string;
    testMode: TestMode;
    constructor(testMode?: TestMode);
    /**
              Strip outs css comments and returns cleaned css string
          
              @param css, the original css string to be stipped out of comments
          
              @return cleanedCSS contains no css comments
            */
    stripComments(cssString: string): string;
    /**
              Parses given css string, and returns css object
              keys as selectors and values are css rules
              eliminates all css comments before parsing
          
              @param source css string to be parsed
          
              @return object css
            */
    parseCSS(source: string): CSSJSObject[];
    /**
              parses given string containing css directives
              and returns an array of objects containing ruleName:ruleValue pairs
          
              @param rules, css directive string example
                  \n\ncolor:white;\n    font-size:18px;\n
            */
    parseRules(rules: string): CSSJSRule[];
    /**
              just returns the rule having given directive
              if not found returns false;
            */
    findCorrespondingRule(rules: CSSJSRule[], directive: string, value?: string | false | undefined): false | CSSJSRule;
    /**
                Finds styles that have given selector, compress them,
                and returns them
            */
    findBySelector(cssObjectArray: CSSJSObject[], selector: string, contains?: boolean | undefined): CSSJSObject[];
    /**
              deletes cssObjects having given selector, and returns new array
            */
    deleteBySelector(cssObjectArray: CSSJSObject[], selector: string): ({
        selector: string;
        type: string;
        styles: string;
        rules?: undefined;
        subStyles?: undefined;
        comments?: undefined;
    } | {
        selector: string;
        type: "media";
        styles?: undefined;
        rules?: undefined;
        subStyles: CSSJSObject[];
        comments?: string | null;
    } | {
        selector: string;
        type?: string;
        styles?: undefined;
        rules: CSSJSRule[];
        subStyles?: undefined;
        comments?: string | null;
    } | undefined)[];
    /**
                Compresses given cssObjectArray and tries to minimize
                selector redundence.
            */
    compressCSS(cssObjectArray: CSSJSObject[]): CSSJSObject[];
    /**
              Received 2 css objects with following structure
                {
                  rules : [{directive:"", value:""}, {directive:"", value:""}, ...]
                  selector : "SOMESELECTOR"
                }
          
              returns the changed(new,removed,updated) values on css1 parameter, on same structure
          
              if two css objects are the same, then returns false
          
                if a css directive exists in css1 and     css2, and its value is different, it is included in diff
                if a css directive exists in css1 and not css2, it is then included in diff
                if a css directive exists in css2 but not css1, then it is deleted in css1, it would be included in diff but will be marked as type='DELETED'
          
                @object css1 css object
                @object css2 css object
          
                @return diff css object contains changed values in css1 in regards to css2 see test input output in /test/data/css.js
            */
    cssDiff(css1: CSSJSObject, css2: CSSJSObject): false | {
        selector: string;
        rules: CSSJSRule[];
    };
    /**
                Merges 2 different css objects together
                using intelligentCSSPush,
          
                @param cssObjectArray, target css object array
                @param newArray, source array that will be pushed into cssObjectArray parameter
                @param reverse, [optional], if given true, first parameter will be traversed on reversed order
                        effectively giving priority to the styles in newArray
            */
    intelligentMerge(cssObjectArray: CSSJSObject[], newArray: CSSJSObject[], reverse?: boolean | undefined): void;
    /**
              inserts new css objects into a bigger css object
              with same selectors grouped together
          
              @param cssObjectArray, array of bigger css object to be pushed into
              @param minimalObject, single css object
              @param reverse [optional] default is false, if given, cssObjectArray will be reversly traversed
                      resulting more priority in minimalObject's styles
            */
    intelligentCSSPush(cssObjectArray: CSSJSObject[], minimalObject: CSSJSObject, reverse?: boolean | undefined): void;
    /**
              filter outs rule objects whose type param equal to DELETED
          
              @param rules, array of rules
          
              @returns rules array, compacted by deleting all unnecessary rules
            */
    compactRules(rules: CSSJSRule[]): CSSJSRule[];
    /**
              computes string for ace editor using this.css or given cssBase optional parameter
          
              @param [optional] cssBase, if given computes cssString from cssObject array
            */
    getCSSForEditor(cssBase?: CSSJSObject[] | undefined, depth?: number | undefined): string;
    getImports(cssObjectArray: CSSJSObject[]): (string | undefined)[];
    /**
              given rules array, returns visually formatted css string
              to be used inside editor
            */
    getCSSOfRules(rules: CSSJSRule[], depth: number): string;
    /**
                A very simple helper function returns number of spaces appended in a single string,
                the number depends input parameter, namely input*2
            */
    getSpaces(num: number): string;
    /**
              Given css string or objectArray, parses it and then for every selector,
              prepends this.cssPreviewNamespace to prevent css collision issues
          
              @returns css string in which this.cssPreviewNamespace prepended
            */
    applyNamespacing(css: CSSJSObject[] | string, forcedNamespace?: string | undefined): CSSJSObject[];
    /**
              given css string or object array, clears possible namespacing from
              all of the selectors inside the css
            */
    clearNamespacing(css: CSSJSObject[] | string, returnObj?: true | undefined): CSSJSObject[];
    clearNamespacing(css: CSSJSObject[] | string, returnObj: false): string;
    /**
              creates a new style tag (also destroys the previous one)
              and injects given css string into that css tag
            */
    createStyleElement(id: string, css: string | CSSJSObject[], format?: string | boolean | undefined): (TestMode extends false ? void : never) | Extract<TestMode, (...args: [string, string]) => any>;
}
