import("./JSONB.js")
/**
 * 
 * @param {()=>boolean} stopOnCondition 
 * @param {number} interval 
 * @param {number} step 
 * @returns 
 */
async function cycleHueRotate(stopOnCondition = ()=>false, interval = 20, step=1){
    let val = 0;
    return new Promise(resolve=>{
        let id = setInterval(()=>{
            if(stopOnCondition()==true){
                clearInterval(id);
                resolve(true);
                return;
            }
            // $("#hue_rotate_deg_slider").val(($("#hue_rotate_deg_slider").val() + 1) % 360);
			// $("#hue_rotate_deg_slider").trigger("input");
            
            val += step;
            val %= 360;
            
            const rule = document.styleSheets[0].cssRules.item(Object.values(document.styleSheets[0].cssRules).findIndex(r=>r.selectorText==":root"&&r.cssText.includes("--hue-rotate-deg:")));
            rule.style.cssText = rule.style.cssText.replace(/(?<=--hue-rotate-deg: )\d+(?:\.\d+)?(?=deg;)/, val);
        }, interval)
    })

}
// globalThis.cycleHueRotate = cycleHueRotate;
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
 * @param {string} key
 * @param {any} value 
 */
function saveSetting(key, value){
    window.localStorage.setItem(`8CrafterWebsite-${key}(734cf76b-bd45-4935-a129-b1208fa47637)`, JSON.stringify(value));
}
/**
 * 
 * @param {string} key
 */
function getSetting(key){
    return JSON.parse(window.localStorage.getItem(`8CrafterWebsite-${key}(734cf76b-bd45-4935-a129-b1208fa47637)`)??"null");
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
            $(':root').addClass('dark_theme');
            $(':root').removeClass('light_theme blue_theme');
        }else{
            $('.btn > span').removeClass('preventinvert');
            $(':root').addClass('light_theme');
            $(':root').removeClass('dark_theme blue_theme');
        }
    }else if(theme=="dark"){
        $('.btn > span').addClass('preventinvert');
        $(':root').addClass('dark_theme');
        $(':root').removeClass('light_theme blue_theme');
    }else if(theme=="light"){
        $('.btn > span').removeClass('preventinvert');
        $(':root').addClass('light_theme');
        $(':root').removeClass('dark_theme blue_theme');
    }else if(theme=="BlueTheme"){
        $('.btn > span').removeClass('preventinvert');
        $(':root').addClass('blue_theme');
        $(':root').removeClass('dark_theme light_theme');
    }else{
        $('.btn > span').removeClass('preventinvert');
        $(':root').addClass('light_theme');
        $(':root').removeClass('dark_theme blue_theme');
    }
}
$(async function onDocumentLoad(){
    const autofill_from_file_elements = document.getElementsByTagName('autofill_from_file');
    const autofill_from_file_elements_fill_promises = [];
    for(let i = 0; i < autofill_from_file_elements.length; i++){
        let v = autofill_from_file_elements.item(i);
        const path = $(v).attr('path');
        autofill_from_file_elements_fill_promises.push((async()=>{
            v.outerHTML = path.endsWith(".js")?(await import(path)).default(...JSON.parse($(v).attr("params")??"[]")):await (await fetch(new Request(path))).text()
        })());
    }
    for await(let r of autofill_from_file_elements_fill_promises){}
    const resizeObserver = new ResizeObserver(event => {
        const rule = document.styleSheets[0].cssRules.item(Object.values(document.styleSheets[0].cssRules).findIndex(r=>r.selectorText==":root"));
        rule.style.cssText = rule.style.cssText.replace(/(?<=--header-height: )\d+(?:\.\d+)?(?=px;)/, $(event[0].target).height());
        // console.log($(event[0].target).height(), rule.style.cssText.replace(/(?<=--header-height: )\d+(?:\.\d+)?(?=px;)/, $(event[0].target).height()))
    });
    resizeObserver.observe($('header').get(0));
    const resizeObserverB = new ResizeObserver(event => {
        const rule = document.styleSheets[0].cssRules.item(Object.values(document.styleSheets[0].cssRules).findIndex(r=>r.selectorText==":root"));
        rule.style.cssText = rule.style.cssText.replace(/(?<=--body-height: )\d+(?:\.\d+)?(?=px;)/, $(event[0].target).height());
        // console.log($(event[0].target).height(), rule.style.cssText.replace(/(?<=--header-height: )\d+(?:\.\d+)?(?=px;)/, $(event[0].target).height()))
    });
    resizeObserverB.observe($('body').get(0));
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
    $('#hue_rotate_deg_slider').on("input", ()=>{
				saveSetting("hue_rotate_deg", $('#hue_rotate_deg_slider').val());
        const rule = document.styleSheets[0].cssRules.item(Object.values(document.styleSheets[0].cssRules).findIndex(r=>r.selectorText==":root"&&r.cssText.includes("--hue-rotate-deg:")));
        rule.style.cssText = rule.style.cssText.replace(/(?<=--hue-rotate-deg: )\d+(?:\.\d+)?(?=deg;)/, $('#hue_rotate_deg_slider').val());
    });
		try{if(getSetting("use_noto_sans_font") == true){
			$("#use_noto_sans_font").prop("checked", true);
			$(':root').addClass('use_noto_sans_font');
		}}catch{}
        if(getSetting("filter_sepia_enabled") == true){
			$("#filter_sepia_enabled").prop("checked", true);
			$(':root').addClass('filter_sepia');
		}
        if(getSetting("filter_invert_enabled") == true){
			$("#filter_invert_enabled").prop("checked", true);
			$(':root').addClass('filter_invert');
		}
        if(getSetting("filter_grayscale_enabled") == true){
			$("#filter_grayscale_enabled").prop("checked", true);
			$(':root').addClass('filter_grayscale');
		}
    if(!!getSetting("hue_rotate_deg")){
			$("#hue_rotate_deg_slider").val(getSetting("hue_rotate_deg"));
			$("#hue_rotate_deg_slider").trigger("input");
		}
		if(!!getSetting("zoom")){
			$("#zoom_text_box").val(getSetting("zoom").slice(0, -1));
			$(':root')[0].style.zoom=getSetting("zoom");
		}
    $('.themeDropdownOption').click(event=>{
        changeTheme($(event.currentTarget).find('input')[0].id);
    });
    $('#use_noto_sans_font').parent().click(()=>{
        saveSetting("use_noto_sans_font", $('#use_noto_sans_font').prop("checked"))
        if($('#use_noto_sans_font').prop("checked")){
            $(':root').addClass('use_noto_sans_font');
        }else{
            $(':root').removeClass('use_noto_sans_font');
        }
    })
    $('#filter_invert_enabled').parent().click(()=>{
        saveSetting("filter_invert_enabled", $('#filter_invert_enabled').prop("checked"))
        if($('#filter_invert_enabled').prop("checked")){
            $(':root').addClass('filter_invert');
        }else{
            $(':root').removeClass('filter_invert');
        }
    })
    $('#filter_sepia_enabled').parent().click(()=>{
        saveSetting("filter_sepia_enabled", $('#filter_sepia_enabled').prop("checked"))
        if($('#filter_sepia_enabled').prop("checked")){
            $(':root').addClass('filter_sepia');
        }else{
            $(':root').removeClass('filter_sepia');
        }
    })
    $('#filter_grayscale_enabled').parent().click(()=>{
        saveSetting("filter_grayscale_enabled", $('#filter_grayscale_enabled').prop("checked"))
        if($('#filter_grayscale_enabled').prop("checked")){
            $(':root').addClass('filter_grayscale');
        }else{
            $(':root').removeClass('filter_grayscale');
        }
    })
    $('input[name="settings_section"]').change(()=>{
        try{
            if($('#settings_section_radio_video').prop('checked')){
                $('#video_settings_section').get(0).style.display=''
            }else{
                $('#video_settings_section').get(0).style.display='none'
            }
        }catch(e){
            console.error(e, e.stack)
        }
    })
		$('#confirm_zoom_change').click(()=>{
			$(':root')[0].style.zoom = $('#zoom_text_box').val()+"%";
		});
		$('#save_zoom_change').click(()=>{
			saveSetting("zoom", $('#zoom_text_box').val()+"%");
		});
    $('#link_button_list').scrollTop(-$('#link_button_list')[0].scrollHeight);
});