export default function getComponent(tabIndex = -1){
	return `
    <header class="header" style="position: fixed; width: 100%">
      <noscript>
          <div id="noscript_alert" class="alert warning">
              <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
              This website requires JavaScript to function, please allow JavaScript on this website.
          </div>
      </noscript>
      <div id="under_construction_alert" class="alert">
          <span
              class="closebtn"
              onclick="this.parentElement.style.display='none'; {const urlParams = new URLSearchParams(window.location.search); urlParams.set('hide_under_construction_alert', 'true'); window.history.pushState({ id: '100' }, 'Page', window.location.pathname + '?' + urlParams.toString());}"
              >&times;</span
          >
          This website is currently under construction.
      </div>
      <ul class="horizontal-nav full-sized-nav">
        <li style="height: 48px; margin-bottom: -5px;" class="NavLink_8Crafter"><a href="https://youtube.com/@8crafter" style="padding-top: 3.5px; padding-bottom: 3.5px;"><image title="8Crafter" src="/favicon.ico" width="32px" height="32px" class="piximg" style="vertical-align: middle; margin-right: 5px; padding: 2px 0px;"></image><span class="NavLink_8Crafter_Span" style="vertical-align: text-bottom; font-size: 32px; font-family: Mojangles; line-height: initial;">8Crafter</span></a></li>
        <li${tabIndex==0?' class="active"':""}><a href="/index.html" rel="keep-params">Home</a></li>
        <li${tabIndex==1?' class="active"':""}><a href="/main/contact.html" rel="keep-params">Contact</a></li>
        <li${tabIndex==2?' class="active"':""}><a href="/main/about.html" rel="keep-params">About</a></li>
        <li${tabIndex==3?' class="active"':""}><a href="https://wiki.8crafter.com/main/">Wiki<image src="/assets/images/ui/glyphs/external_link.png" style="width: 17px; height: 17px; margin: -10px -10px -10px 5px; image-rendering: pixelated; vertical-align: middle; padding: 9.5px 0px;"></image></a></li>
        <li style="float:right;cursor:pointer;"><a onclick="$('#settings_menu').slideToggle()" style="vertical-align: middle;"><div class="settings_button" title="Settings Icon" style="width: 30px; height: 30px; margin-right: 5px"></div>Settings</a></li>
      </ul>
      <ul class="horizontal-nav compressed-nav">
        <li style="float:left; cursor:pointer;"><a onclick="$('#nav-sidebar').toggle('slide')" style="vertical-align: middle; padding: 0px; height:44px; width:44px;"><div class="menu_threebars_button" title="Menu" style="width: 30px; height: 30px;"></div></a></li>
        <li style="height: 44px; margin-bottom: 0px;" class="NavLink_8Crafter"><a href="https://youtube.com/@8crafter" style="padding: 4px 7px;"><image title="8Crafter" src="/favicon.ico" width="32px" height="32px" class="piximg" style="vertical-align: middle; margin-right: 5px; padding: 2px 0px;"></image><span class="NavLink_8Crafter_Span" style="vertical-align: text-bottom; font-size: 32px; font-family: Mojangles; line-height: initial;">8Crafter</span></a></li>
      </ul>
      <div id="nav-sidebar" class="blur_behind_5px" style="display: none;">
        <ul class="vertical-nav compressed-nav" style="background-color: unset;">
          <!-- <li style="height: 48px; margin-bottom: -5px;"><a href="https://youtube.com/@8crafter" style="padding-top: 4px; padding-bottom: 4px;"><image title="8Crafter" src="/favicon.ico" width="32px" height="32px" class="piximg" style="vertical-align: middle; margin-right: 5px; padding: 2px 0px;"></image><span style="vertical-align: text-bottom; font-size: 32px; font-family: Mojangles; line-height: initial;">8Crafter</span></a></li> -->
          <li${tabIndex==0?' class="active"':""}><a href="/index.html" rel="keep-params">Home</a></li>
          <li${tabIndex==1?' class="active"':""}><a href="/main/contact.html" rel="keep-params">Contact</a></li>
          <li${tabIndex==2?' class="active"':""}><a href="/main/about.html" rel="keep-params">About</a></li>
          <li${tabIndex==3?' class="active"':""}><a href="https://wiki.8crafter.com/main/">Wiki<inlinecontainer class="nav-image-invert-on-button-hover"><image src="/assets/images/ui/glyphs/external_link.png" style="width: 17px; height: 17px; margin: -10px -10px -10px 5px; image-rendering: pixelated; vertical-align: middle; padding: 7.5px 0px; filter: invert(1);"></image></inlinecontainer></a></li>
          <li style="cursor:pointer;"><a onclick="$('#settings_menu').slideToggle()" style="vertical-align: middle;"><div class="settings_button" title="Settings Icon" style="width: 30px; height: 30px; margin-right: 5px"></div>Settings</a></li>
        </ul>
      </div>
    </header>`
}
