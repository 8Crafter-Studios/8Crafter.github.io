export default function getComponent(){
	return `
    <overlay-page id="settings_menu" class="overlay_page blur_behind_5px" aria-hidden style="display: none;">
      <div style="border-right: 1px solid #cccccc; border-bottom: 1px solid #cccccc; position: absolute">
        <button type="button" onclick="$('#settings_left_sidebar').toggle('slide'); if($(this).attr('mode')=='1'){$(this).text('Show'); $(this).attr('mode', '0');}else{$(this).text('Hide'); $(this).attr('mode', '1')}" class="btn nsel" style="float: left; width: 60px" id="settings_left_sidebar_toggle_button" ontouchstart="" mode="1">Hide</button>
      </div>
      <div id="settings_left_sidebar" class="no_margins" style="width: 60px; height: -webkit-fill-available; margin-top: 32px; overflow-y: auto; float: left; border-right: 1px solid #cccccc; ">
        <label ontouchstart="" for="settings_section_radio_video" class="radio_button_container_label" style="width: -webkit-fill-available;">
          <input type="radio" name="settings_section" style="display: none;" class="no-remove-disabled nsel" id="settings_section_radio_video" title="Video" checked>
          <div class="no-remove-disabled nsel">Video</div>
        </label>
        <label ontouchstart="" for="settings_section_radio_audio" class="radio_button_container_label" style="width: -webkit-fill-available;">
          <input type="radio" name="settings_section" style="display: none;" class="no-remove-disabled nsel" id="settings_section_radio_audio" title="Audio">
          <div class="no-remove-disabled nsel">Audio</div>
        </label>
      </div>
      <settings-section id="video_settings_section" class="settings_section">
        <center><h1>Video Settings</h1></center>
        <div class="mctogglecontainer nsel" ontouchstart="" onclick="{let checkbox = $(this).find('input[type=\\'checkbox\\']'); checkbox.prop('checked', !checkbox.prop('checked'))}" style="display: inline-block;">
          <input type="checkbox" id="use_noto_sans_font" name="use_noto_sans_font" value="Use Noto Sans Font" class="mctoggle" title="use_noto_sans_font">
          <div class="mctoggleswitch"></div>
          <label>Use Noto Sans Font</label>
        </div>
        <br>
        <div class="mctogglecontainer nsel" ontouchstart="" onclick="{let checkbox = $(this).find('input[type=\\'checkbox\\']'); checkbox.prop('checked', !checkbox.prop('checked'))}" style="display: inline-block;">
          <input type="checkbox" id="filter_invert_enabled" name="filter_invert_enabled" value="Invert Colors" class="mctoggle" title="filter_invert_enabled">
          <div class="mctoggleswitch"></div>
          <label>Invert Colors</label>
        </div>
        <br>
        <div class="mctogglecontainer nsel" ontouchstart="" onclick="{let checkbox = $(this).find('input[type=\\'checkbox\\']'); checkbox.prop('checked', !checkbox.prop('checked'))}" style="display: inline-block;">
          <input type="checkbox" id="filter_grayscale_enabled" name="filter_grayscale_enabled" value="Grayscale" class="mctoggle" title="filter_grayscale_enabled">
          <div class="mctoggleswitch"></div>
          <label>Grayscale</label>
        </div>
        <br>
        <div class="mctogglecontainer nsel" ontouchstart="" onclick="{let checkbox = $(this).find('input[type=\\'checkbox\\']'); checkbox.prop('checked', !checkbox.prop('checked'))}" style="display: inline-block;">
          <input type="checkbox" id="filter_sepia_enabled" name="filter_sepia_enabled" value="Sepia Filter" class="mctoggle" title="filter_sepia_enabled">
          <div class="mctoggleswitch"></div>
          <label>Sepia Filter</label>
        </div>
        <br>
        <mcslider>
          <label for="hue_rotate_deg_slider">Hue Rotate Degrees: 0deg</label>
          <br>
          <input id="hue_rotate_deg_slider" name="hue_rotate_deg_slider" type="range" min="0" max="360" step="1" value="0" oninput="{let parentElement = $(this).parent().find('label'); parentElement.text(parentElement.text().replace(/(?<=Degrees: )\\d+(?:\\.\\d+)?(?=deg)/, $(this).val()))}">
        </mcslider>
        <br>
        <div class="mcdropdown nsel" id="themeDropdown" style="display: inline-block">
          Theme
          <br>
          <button id="dropdownbutton" class="btn" type="button" ontouchstart="" style="min-width: 140px; text-align: left;" onclick="if($(this).parent().find('#dropdowncontents').prop('hidden')){$(this).find('#cv').prop('hidden', true); $(this).find('#cvsel').prop('hidden', false); $(this).parent().find('#dropdowncontents').prop('hidden', false)}else{$(this).find('#cv').prop('hidden', false); $(this).find('#cvsel').prop('hidden', true); $(this).parent().find('#dropdowncontents').prop('hidden', true)}">
            <span id="themeDropdownButtonSelectedOptionTextDisplay">Auto</span>
            <div style="width: 11px; height: 11px; margin: 0px; padding: 0px; display: inline-block;"></div>
            <img id="cv" src="/assets/images/ui/dropdown/dropdown_chevron.png" inert class="nsel" style="right: 7px; top: 10px; position: absolute">
            <img id="cvsel" src="/assets/images/ui/dropdown/dropdown_chevron_up.png" inert class="nsel" style="right: 7px; top: 10px; position: absolute" hidden>
          </button>
          <div id="dropdowncontents" hidden style="display: flex;">
            <div style="flex-grow: 1; width: 0;">
              <div class="mcdropdownoption themeDropdownOption" ontouchstart="" onclick="$(this).find('input[type=\\'radio\\']').prop('checked', true)">
                <input type="radio" id="auto" name="themeDropdown" value="auto" class="mcradio themeDropdownOptionInput">
                <div class="mcradiocheckbox"></div>
                <label for="auto" id="themeDropdownAutoOptionLabel">Auto</label>
              </div>
              <div class="mcdropdownoption themeDropdownOption" ontouchstart="" onclick="$(this).find('input[type=\\'radio\\']').prop('checked', true)">
                <input type="radio" id="dark" name="themeDropdown" value="dark" class="mcradio themeDropdownOptionInput">
                <div class="mcradiocheckbox"></div>
                <label for="dark">Dark</label>
              </div>
              <div class="mcdropdownoption themeDropdownOption" ontouchstart="" onclick="$(this).find('input[type=\\'radio\\']').prop('checked', true)">
                <input type="radio" id="light" name="themeDropdown" value="light" class="mcradio themeDropdownOptionInput">
                <div class="mcradiocheckbox"></div>
                <label for="light">Light</label>
              </div>
              <div class="mcdropdownoption themeDropdownOption" ontouchstart="" onclick="$(this).find('input[type=\\'radio\\']').prop('checked', true)">
                <input type="radio" id="BlueTheme" name="themeDropdown" value="BlueTheme" class="mcradio themeDropdownOptionInput">
                <div class="mcradiocheckbox"></div>
                <label for="BlueTheme">Blue</label>
              </div>
            </div>
          </div>
        </div>
				<div class="form-group">
          <div class="form-group-header">
            <label for="zoom_text_box">Zoom %</label>
          </div>
          <div class="form-group-body">
            <input type="number" id="zoom_text_box" name="zoom_text_box" value="100" placeholder="100"
              class="form-control" ontouchstart onchange="$(this).val($(this).val().replaceAll(/[^0-9\\.\\-]/g, ''))">
          </div>
        	<button ontouchstart type="button" class="btn no-remove-disabled nsel" id="confirm_zoom_change">Confirm Zoom Change</button>
        	<button ontouchstart type="button" class="btn no-remove-disabled nsel" id="save_zoom_change">Save Zoom Change</button>
					<button ontouchstart type="button" class="btn no-remove-disabled nsel" id="reset_zoom" onclick="$('#zoom_text_box').val('100'); $('#confirm_zoom_change').click(); $('#save_zoom_change').click()">Reset Zoom</button>
        </div>
      </settings-section>
      <settings-section id="audio_settings_section" class="settings_section">
        <center><h1>Audio</h1></center>
        <mcslider>
          <label for="master_volume_slider">Master Volume: 0%</label>
          <br>
          <input id="master_volume_slider" name="master_volume_slider" type="range" min="0" max="100" step="1" value="100" oninput="{let parentElement = $(this).parent().find('label'); parentElement.text(parentElement.text().replace(/(?<=Volume: )\\d+(?:\\.\\d+)?(?=%)/, $(this).val()))}">
        </mcslider>
        <br>
        <mcslider>
          <label for="master_volume_slider">UI Volume: 0%</label>
          <br>
          <input id="ui_volume_slider" name="ui_volume_slider" type="range" min="0" max="100" step="1" value="100" oninput="{let parentElement = $(this).parent().find('label'); parentElement.text(parentElement.text().replace(/(?<=Volume: )\\d+(?:\\.\\d+)?(?=%)/, $(this).val()))}">
        </mcslider>
        <br>
        <div class="mcdropdown nsel" id="defaultButtonSoundEffectDropdown" style="display: inline-block">
          Default Button Sound Effect
          <br>
          <button id="dropdownbutton" class="btn" type="button" ontouchstart="" style="min-width: 250px; text-align: left;" onclick="if($(this).parent().find('#dropdowncontents').prop('hidden')){$(this).find('#cv').prop('hidden', true); $(this).find('#cvsel').prop('hidden', false); $(this).parent().find('#dropdowncontents').prop('hidden', false)}else{$(this).find('#cv').prop('hidden', false); $(this).find('#cvsel').prop('hidden', true); $(this).parent().find('#dropdowncontents').prop('hidden', true)}">
            <span id="defaultButtonSoundEffectDropdownButtonSelectedOptionTextDisplay">Pop (Default)</span>
            <div style="width: 11px; height: 11px; margin: 0px; padding: 0px; display: inline-block;"></div>
            <img id="cv" src="/assets/images/ui/dropdown/dropdown_chevron.png" inert class="nsel" style="right: 7px; top: 10px; position: absolute">
            <img id="cvsel" src="/assets/images/ui/dropdown/dropdown_chevron_up.png" inert class="nsel" style="right: 7px; top: 10px; position: absolute" hidden>
          </button>
          <div id="dropdowncontents" hidden style="display: flex;">
            <div style="flex-grow: 1; width: 0;">
              <div class="mcdropdownoption defaultButtonSoundEffectDropdownOption" ontouchstart="" onclick="$(this).find('input[type=\\'radio\\']').prop('checked', true)">
                <input type="radio" id="defaultButtonSoundEffectDropdownOption_pop" name="defaultButtonSoundEffectDropdown" value="pop" class="mcradio defaultButtonSoundEffectDropdownOptionInput">
                <div class="mcradiocheckbox"></div>
                <label for="defaultButtonSoundEffectDropdownOption_pop">Pop (Default)</label>
              </div>
              <div class="mcdropdownoption defaultButtonSoundEffectDropdownOption" ontouchstart="" onclick="$(this).find('input[type=\\'radio\\']').prop('checked', true)">
                <input type="radio" id="defaultButtonSoundEffectDropdownOption_popB" name="defaultButtonSoundEffectDropdown" value="popB" class="mcradio defaultButtonSoundEffectDropdownOptionInput">
                <div class="mcradiocheckbox"></div>
                <label for="defaultButtonSoundEffectDropdownOption_popB">Pop (Audio Buffer)</label>
              </div>
              <div class="mcdropdownoption defaultButtonSoundEffectDropdownOption" ontouchstart="" onclick="$(this).find('input[type=\\'radio\\']').prop('checked', true)">
                <input type="radio" id="defaultButtonSoundEffectDropdownOption_release" name="defaultButtonSoundEffectDropdown" value="release" class="mcradio defaultButtonSoundEffectDropdownOptionInput">
                <div class="mcradiocheckbox"></div>
                <label for="defaultButtonSoundEffectDropdownOption_release">Release</label>
              </div>
              <div class="mcdropdownoption defaultButtonSoundEffectDropdownOption" ontouchstart="" onclick="$(this).find('input[type=\\'radio\\']').prop('checked', true)">
                <input type="radio" id="defaultButtonSoundEffectDropdownOption_releaseB" name="defaultButtonSoundEffectDropdown" value="releaseB" class="mcradio defaultButtonSoundEffectDropdownOptionInput">
                <div class="mcradiocheckbox"></div>
                <label for="defaultButtonSoundEffectDropdownOption_releaseB">Release (Audio Buffer)</label>
              </div>
              <div class="mcdropdownoption defaultButtonSoundEffectDropdownOption" ontouchstart="" onclick="$(this).find('input[type=\\'radio\\']').prop('checked', true)">
                <input type="radio" id="defaultButtonSoundEffectDropdownOption_toast" name="defaultButtonSoundEffectDropdown" value="toast" class="mcradio defaultButtonSoundEffectDropdownOptionInput">
                <div class="mcradiocheckbox"></div>
                <label for="defaultButtonSoundEffectDropdownOption_toast">Toast</label>
              </div>
              <div class="mcdropdownoption defaultButtonSoundEffectDropdownOption" ontouchstart="" onclick="$(this).find('input[type=\\'radio\\']').prop('checked', true)">
                <input type="radio" id="defaultButtonSoundEffectDropdownOption_toastB" name="defaultButtonSoundEffectDropdown" value="toastB" class="mcradio defaultButtonSoundEffectDropdownOptionInput">
                <div class="mcradiocheckbox"></div>
                <label for="defaultButtonSoundEffectDropdownOption_toastB">Toast (Audio Buffer)</label>
              </div>
            </div>
          </div>
        </div>
        <br>
      </settings-section>
    </overlay-page>`
}
