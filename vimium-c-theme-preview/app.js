// Vimium-C Theme Previewer - JavaScript

// DOM Elements
const cssEditor = document.getElementById('css-editor');
const themeStyle = document.getElementById('theme-style');
const themeUrlInput = document.getElementById('theme-url-input');
const loadUrlBtn = document.getElementById('load-url-btn');
const resetBtn = document.getElementById('reset-btn');

// Default theme (vimium-c.css - the actual default Vimium-C theme)
const defaultTheme = `:host{border:none!important;contain:none!important;height:0!important;margin:0!important;
  opacity:1!important;outline:none!important;padding:0!important;position:static!important;
  transform:none!important;width:0!important;display:contents!important}:host:before,:host:after{display:none!important}
  .R{background:none;border:none;box-sizing:content-box;cursor:auto;float:none;font-size-adjust:none;
  letter-spacing:normal;line-height-step:0;margin:0;opacity:1;outline:none;padding:0;text-align-last:auto;text-indent:0;
  text-shadow:none;text-transform:none;visibility:visible;white-space:normal;word-spacing:normal;
  -webkit-writing-mode:horizontal-tb;all:initial;display:block;text-align:left;unicode-bidi:normal;
  color:#000;contain:layout style;direction:ltr;font:12px/1 "Helvetica Neue",Arial,sans-serif;
  pointer-events:none;position:fixed;user-select:none;z-index:2147483647}
  .HM{font-weight:bold;position:absolute;white-space:nowrap}.DLG::backdrop{background:#0000}
  .LH{background:linear-gradient(#fff785,#ffc542);border:0.01px solid #e3be23;border-radius:3px;box-shadow:0 3px
   5px #0000004d;box-sizing:border-box;contain:layout style;overflow:hidden;padding:2.5px 3px 2px;position:absolute}
  .IH{background:#fff7854d;border:0.01px solid #c38a22;position:absolute}.IHS{background:#f664;border-color:#933}
  .HUD,.TEE{bottom:-1px;font-size:14px;height:20px;line-height:16px;max-width:336px;min-width:152px;overflow:hidden;
  padding:4px 4px 1px;right:152px;text-overflow:ellipsis;white-space:nowrap}
  .HUD:after{background:#eee;border-radius:4px 4px 0 0;border:0.01px solid #bbb;content:"";position:absolute;z-index:-1}
  .HL{max-width:60vw;right:-4px;padding-right:8px}
  .HUD.UI{cursor:text;height:24px}.Find{cursor:text;position:static;width:100%}
  .Flash{box-shadow:0 0 4px 2px #4183c4;padding:1px}.AbsF{padding:0;position:absolute}.Sel{box-shadow:0 0 4px 2px #fa0}
  .Frame{border:5px solid #ff0}.Frame,.DLG,.HUD:after{box-sizing:border-box;height:100%;left:0;top:0;width:100%}
  .Omnibar{left:max(10vw - 12px,50vw - 972px);height:520px;top:64px;width:min(80vw + 24px,1944px)}
  .O2{left:max(10% - 12px,50% - 972px);width:min(80% + 24px,1944px)}
  .BH{color:#902809}.MC,.MH{color:#d4ac3a}.One{border-color:#fa7}.UI,.DLG{color-scheme:light;pointer-events:all}
  .DLG{position:fixed}.PO{all:initial;left:0;position:fixed;top:0}
  .D>.LH{background:linear-gradient(#cb0,#c80)}.HUD.D{color:#ccc}.HUD.D:after{background:#222}
  @media(forced-colors:active){.R{border-radius:0}
  .HM>.LH,.HUD:after{background:#000;border-radius:0}.Flash{outline:4px solid #fff}}
  /*#find*/
  ::selection { background: #ff9632 !important; }
  html, body, * { user-select: auto; }
  *{cursor:text;font:14px/16px "Helvetica Neue",Arial,sans-serif;margin:0;outline:none;white-space:pre}
  .r{all:initial;background:#fff;border-radius:3px 3px 0 0;box-shadow:inset 0 0 1.5px 1px #aaa;color:#000;
  cursor:text;display:flex;height:21px;padding:4px 4px 0}.r.D{background:#222;color:#d4d4d4}
  #s{flex:0 0 4px}#i{flex:0 1 auto;height:16px;min-width:9px;margin-left:2px;overflow:hidden;padding:0 2px 0 0}
  #h{flex:1 0 auto}br{all:inherit!important;display:inline!important}#c{flex:0 0 auto;margin-left:2px}
  #s::after{content:"/"}#c::after{content:attr(data-vimium);display:inline}
  :host,body{background:#0000!important;margin:0!important;height:24px}`;

// Convert GitHub URL to raw URL
function convertGitHubUrlToRaw(url) {
    // If already a raw URL, return as is
    if (url.includes('raw.githubusercontent.com')) {
        return url;
    }
    
    // Convert GitHub blob URL to raw URL
    // https://github.com/user/repo/blob/branch/file.css
    // -> https://raw.githubusercontent.com/user/repo/branch/file.css
    const githubPattern = /github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)/;
    const match = url.match(githubPattern);
    
    if (match) {
        const [, user, repo, branch, file] = match;
        return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${file}`;
    }
    
    // If it doesn't match, try to use it as is (might be a direct raw URL)
    return url;
}

// Load theme from URL
async function loadThemeFromUrl(url) {
    try {
        const rawUrl = convertGitHubUrlToRaw(url);
        const response = await fetch(rawUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to load theme: ${response.statusText}`);
        }
        
        const css = await response.text();
        cssEditor.value = css;
        applyTheme(css);
        saveThemeToStorage(css);
        
        // Show success message
        showMessage('Theme loaded successfully!', 'success');
    } catch (error) {
        console.error('Error loading theme:', error);
        showMessage(`Error loading theme: ${error.message}`, 'error');
    }
}

// Apply theme CSS
function applyTheme(css) {
    themeStyle.textContent = css;
}

// Save theme to localStorage
function saveThemeToStorage(css) {
    try {
        localStorage.setItem('vimium-c-theme', css);
    } catch (error) {
        console.error('Error saving theme to storage:', error);
    }
}

// Load theme from localStorage
function loadThemeFromStorage() {
    try {
        const savedTheme = localStorage.getItem('vimium-c-theme');
        if (savedTheme) {
            cssEditor.value = savedTheme;
            applyTheme(savedTheme);
            return true;
        }
    } catch (error) {
        console.error('Error loading theme from storage:', error);
    }
    return false;
}

// Reset to default theme
function resetTheme() {
    cssEditor.value = defaultTheme;
    applyTheme(defaultTheme);
    saveThemeToStorage(defaultTheme);
    showMessage('Theme reset to default', 'success');
}

// Show message to user
function showMessage(message, type = 'info') {
    // Create or update message element
    let messageEl = document.getElementById('message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'message';
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.className = `message message-${type}`;
    messageEl.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 3000);
}

// Event Listeners

// Real-time CSS application
cssEditor.addEventListener('input', () => {
    const css = cssEditor.value;
    applyTheme(css);
    saveThemeToStorage(css);
});

// Load from URL button
loadUrlBtn.addEventListener('click', () => {
    const url = themeUrlInput.value.trim();
    if (!url) {
        showMessage('Please enter a URL', 'error');
        return;
    }
    loadThemeFromUrl(url);
});

// Enter key in URL input
themeUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadUrlBtn.click();
    }
});

// Reset button
resetBtn.addEventListener('click', () => {
    if (confirm('Reset to default theme? This will overwrite your current theme.')) {
        resetTheme();
    }
});

// Initialize
function init() {
    // Try to load saved theme, otherwise use default
    if (!loadThemeFromStorage()) {
        cssEditor.value = defaultTheme;
        applyTheme(defaultTheme);
    }
    
    // Preload example theme URL
    themeUrlInput.placeholder = 'e.g., https://github.com/ysjn/vimium-simply-dark/blob/master/vimium-simply-dark.css';
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

