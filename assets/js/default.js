import("./JSONB.js")
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
            callbackfn(sheet.cssRules.item(ix)?.style, sheet.cssRules[ix].selectorText, sheet);
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
const themeDisplayMapping = {
    get auto(){
        return window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)").matches?"Auto (Dark)":"Auto (Light)":"Auto"
    },
    "dark": "Dark",
    "light": "Light",
    "BlueTheme": "Blue",
}
const themeDisplayMappingB = {
    get auto(){
        return window.matchMedia?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":"dark"
    },
    "dark": "dark",
    "light": "light",
    "BlueTheme": "BlueTheme",
}

// MediaQueryList
const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");

// recommended method for newer browsers: specify event-type as first argument
darkModePreference.addEventListener("change", e => e.matches && changeThemeCSS("auto"));

/**
 * 
 * @param {"auto"|"dark"|"light"|"BlueTheme"} theme 
 */
function changeThemeCSS(theme){
    if(!["auto", "dark", "light", "BlueTheme"].includes(theme)){
        throw new TypeError("Invalid CSS Theme Value: "+JSON.stringify(theme))
    };
    try{
        $('#themeDropdown > #dropdowncontents').find(`input[id="${theme}"]`).prop('checked', true);
        $('#themeDropdownButtonSelectedOptionTextDisplay').text(themeDisplayMapping[theme]);
        $('#themeDropdownAutoOptionLabel').text(themeDisplayMapping.auto);
    }catch(e){
        console.error(e.toString(), e.stack)
    };
    forEachRuleCallback((rule, ruleName, styleSheet)=>{
        if(!!rule?.cssText?.match(/(?<=(?:[\n\s;\{]|^)---theme-var-switcher--[a-zA-Z0-9\-_]+[\n\s]*:[\n\s]*var\([\n\s]*--[a-zA-Z0-9\-_]*)(?:light|dark|BlueTheme)(?=[a-zA-Z0-9\-_]*[\n\s]*\)[\n\s]*;?)/)){
            rule.cssText=rule.cssText.replaceAll(/(?<=(?:[\n\s;\{]|^)---theme-var-switcher--[a-zA-Z0-9\-_]+[\n\s]*:[\n\s]*var\([\n\s]*--[a-zA-Z0-9\-_]*)(?:light|dark|BlueTheme)(?=[a-zA-Z0-9\-_]*[\n\s]*\)[\n\s]*;?)/g, theme=="auto"?(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)?"dark":"light":theme)
        }
    });
    if(theme=="auto"){
        if(themeDisplayMappingB.auto=="dark"){
            $('.btn > span').addClass('preventinvert');
        }else{
            $('.btn > span').removeClass('preventinvert');
        }
    }else if(theme=="dark"){
        $('.btn > span').addClass('preventinvert');
    }else if(theme=="light"){
        $('.btn > span').removeClass('preventinvert');
    }else if(theme=="BlueTheme"){
        $('.btn > span').removeClass('preventinvert');
    }else{
        $('.btn > span').removeClass('preventinvert');
    }
}
$(function onDocumentLoad(){
    globalThis.colorScheme=Number(window.localStorage.getItem("8CrafterWebsite-ColorScheme(734cf76b-bd45-4935-a129-b1208fa47637)")??0);
    if(colorScheme==0){
        changeThemeCSS("auto");
    }else if(colorScheme==1){
        changeThemeCSS("dark");
    }else if(colorScheme==2){
        changeThemeCSS("light");
    }else if(colorScheme==3){
        changeThemeCSS("BlueTheme");
    }else{/*
        console.error("Invalid value for variable colorScheme: " + JSON.stringify(
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
        ))*/
    };
    $('.themeDropdownOption').click(event=>{
        changeTheme($(event.currentTarget).find('input')[0].id);
    });
});