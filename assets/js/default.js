import("./JSONB.js")
globalThis.colorScheme=Number(window.localStorage.getItem("8CrafterWebsite-ColorScheme(734cf76b-bd45-4935-a129-b1208fa47637)")??0);
/**
 * 
 * @param {string} name 
 * @returns 
 */
function getStyleRule(name) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var ix, sheet = document.styleSheets[i];
        for (ix = 0; ix < sheet.cssRules.length; ix++) {
            if (sheet.cssRules[ix].selectorText === name)
                return sheet.cssRules[ix].style;
        }
    }
    return null;
}
/**
 * 
 * @param {(rule: CSSRule, ruleName: string, styleSheet: CSSStyleSheet)=>any} callbackfn 
 * @returns 
 */
function forEachRuleCallback(callbackfn) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var ix, sheet = document.styleSheets[i];
        for (ix = 0; ix < sheet.cssRules.length; ix++) {
            callbackfn(sheet.cssRules.item(ix).style, sheet.cssRules[ix].selectorText, sheet);
        }
    }
    return null;
}
/**
 * 
 * @param {"auto"|"dark"|"light"|"BlueTheme"} theme 
 */
function changeTheme(theme, setCSS = true){
    if(!["auto", "dark", "light", "BlueTheme"].includes(theme)){
        throw new TypeError("Invalid Theme: "+JSON.stringify(theme))
    };
    colorScheme=["auto", "dark", "light", "BlueTheme"].indexOf(theme)
    window.localStorage.setItem("8CrafterWebsite-ColorScheme(734cf76b-bd45-4935-a129-b1208fa47637)", String(colorScheme));
    if(setCSS){
        changeThemeCSS(theme);
    };
}
/**
 * 
 * @param {"auto"|"dark"|"light"|"BlueTheme"} theme 
 */
function changeThemeCSS(theme){
    if(!["auto", "dark", "light", "BlueTheme"].includes(theme)){
        throw new TypeError("Invalid CSS Theme Value: "+JSON.stringify(theme))
    };
    try{
        $('themeDropdownContents').find(`input[id="${theme}"]`).prop('checked', true);
    }catch(e){
        console.error(e, e.stack)
    };
    forEachRuleCallback((rule, ruleName, styleSheet)=>{
        if(!!rule.cssText.match(/(?<=[\n\s;\{]---theme-var-switcher--[a-zA-Z0-9\-_]+:\s*var\(--[a-zA-Z0-9\-_]*)(?:light|dark|BlueTheme)(?=[a-zA-Z0-9\-_]*\);)/)){
            rule.cssText=rule.cssText.replaceAll(/(?<=[\n\s;\{]---theme-var-switcher--[a-zA-Z0-9\-_]+:\s*var\(--[a-zA-Z0-9\-_]*)(?:light|dark|BlueTheme)(?=[a-zA-Z0-9\-_]*\);)/g, theme=="auto"?(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)?"dark":"light":theme)
        }
    });
}
if(colorScheme==0){
    changeThemeCSS("auto");
}else if(colorScheme==1){
    changeThemeCSS("light");
}else if(colorScheme==2){
    changeThemeCSS("dark");
}else if(colorScheme==3){
    changeThemeCSS("BlueTheme");
}else{
    throw new TypeError("Invalid value for variable colorScheme: " + JSONB.stringify(
        colorScheme,
        undefined,
        0,
        {
            bigint: true,
            class: true,
            undefined: true,
            Infinity: true,
            NegativeInfinity: true,
            NaN: true,
            get: true,
            set: true,
            function: true,
        }
    ))
};