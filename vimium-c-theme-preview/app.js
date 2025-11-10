// Vimium-C Theme Previewer - JavaScript

// DOM Elements
const cssEditor = document.getElementById("css-editor");
const themeUrlInput = document.getElementById("theme-url-input");
const loadUrlBtn = document.getElementById("load-url-btn");
const resetBtn = document.getElementById("reset-btn");
const themeDropdown = document.getElementById("theme-dropdown");

// Get all preview iframes
let iframes = [];
let availableThemes = [];

// Wait for all iframes to load
function waitForIframes() {
  return new Promise((resolve) => {
    const allIframes = document.querySelectorAll(".preview-iframe");
    let loadedCount = 0;

    if (allIframes.length === 0) {
      resolve();
      return;
    }

    allIframes.forEach((iframe) => {
      iframe.addEventListener("load", () => {
        loadedCount++;
        if (loadedCount === allIframes.length) {
          iframes = Array.from(allIframes);
          resolve();
        }
      });
    });
  });
}

// Load themes from JSON
async function loadThemesList() {
  try {
    const response = await fetch("themes.json");
    availableThemes = await response.json();
    populateThemeDropdown();
  } catch (error) {
    console.error("Error loading themes list:", error);
    showMessage("Error loading themes list", "error");
  }
}

// Populate theme dropdown
function populateThemeDropdown() {
  // Clear existing options except the first one
  themeDropdown.innerHTML = '<option value="">Select a theme...</option>';

  // Add each theme as an option
  availableThemes.forEach((theme, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${theme.name}${
      theme.author ? ` - by ${theme.author}` : ""
    }`;
    if (theme.description) {
      option.title = theme.description;
    }
    themeDropdown.appendChild(option);
  });
}

// Load theme from dropdown selection
async function loadThemeFromDropdown(themeIndex) {
  const theme = availableThemes[themeIndex];
  if (!theme) return;

  if (!theme.url) {
    // Reset to default
    resetTheme();
    return;
  }

  try {
    showMessage(`Loading ${theme.name}...`, "info");

    if (theme.local) {
      // Load local theme
      const response = await fetch(theme.url);
      if (!response.ok) {
        throw new Error(`Failed to load theme: ${response.statusText}`);
      }
      const css = await response.text();
      cssEditor.value = css;
      applyTheme(css);
      saveThemeToStorage(css);
      showMessage(`${theme.name} loaded successfully!`, "success");
    } else {
      // Load remote theme
      await loadThemeFromUrl(theme.url);
    }
  } catch (error) {
    console.error("Error loading theme:", error);
    showMessage(`Error loading ${theme.name}: ${error.message}`, "error");
  }
}

// Convert GitHub URL to raw URL
function convertGitHubUrlToRaw(url) {
  // If already a raw URL, return as is
  if (url.includes("raw.githubusercontent.com")) {
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
    showMessage("Theme loaded successfully!", "success");
  } catch (error) {
    console.error("Error loading theme:", error);
    showMessage(`Error loading theme: ${error.message}`, "error");
  }
}

// Apply theme CSS to all iframes
function applyTheme(css) {
  iframes.forEach((iframe) => {
    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const themeStyle = iframeDoc.getElementById("theme-style");
      if (themeStyle) {
        themeStyle.textContent = css;
      }
    } catch (error) {
      console.error("Error applying theme to iframe:", error);
    }
  });
}

// Save theme to localStorage
function saveThemeToStorage(css) {
  try {
    localStorage.setItem("vimium-c-theme", css);
  } catch (error) {
    console.error("Error saving theme to storage:", error);
  }
}

// Load theme from localStorage
function loadThemeFromStorage() {
  try {
    const savedTheme = localStorage.getItem("vimium-c-theme");
    if (savedTheme) {
      cssEditor.value = savedTheme;
      applyTheme(savedTheme);
      return true;
    }
  } catch (error) {
    console.error("Error loading theme from storage:", error);
  }
  return false;
}

// Reset to empty theme
function resetTheme() {
  cssEditor.value = "";
  applyTheme("");
  saveThemeToStorage("");
  showMessage("Theme cleared", "success");
}

// Show message to user
function showMessage(message, type = "info") {
  // Create or update message element
  let messageEl = document.getElementById("message");
  if (!messageEl) {
    messageEl = document.createElement("div");
    messageEl.id = "message";
    document.body.appendChild(messageEl);
  }

  messageEl.textContent = message;
  messageEl.className = `message message-${type}`;
  messageEl.style.display = "block";

  // Hide after 3 seconds
  setTimeout(() => {
    messageEl.style.display = "none";
  }, 3000);
}

// Event Listeners

// Real-time CSS application
cssEditor.addEventListener("input", () => {
  const css = cssEditor.value;
  applyTheme(css);
  saveThemeToStorage(css);
});

// Load from URL button
loadUrlBtn.addEventListener("click", () => {
  const url = themeUrlInput.value.trim();
  if (!url) {
    showMessage("Please enter a URL", "error");
    return;
  }
  loadThemeFromUrl(url);
});

// Enter key in URL input
themeUrlInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    loadUrlBtn.click();
  }
});

// Reset button
resetBtn.addEventListener("click", () => {
  if (confirm("Clear all CSS? This will remove your current theme.")) {
    resetTheme();
    themeDropdown.value = ""; // Reset dropdown
  }
});

// Theme dropdown change
themeDropdown.addEventListener("change", (e) => {
  const themeIndex = e.target.value;
  if (themeIndex !== "") {
    loadThemeFromDropdown(parseInt(themeIndex));
  }
});

// Initialize
async function init() {
  // Load themes list
  await loadThemesList();

  // Wait for all iframes to load
  await waitForIframes();

  // Try to load saved theme, otherwise leave empty
  if (!loadThemeFromStorage()) {
    cssEditor.value = "";
    applyTheme("");
  }

  // Preload example theme URL
  themeUrlInput.placeholder =
    "e.g., https://github.com/ysjn/vimium-simply-dark/blob/master/vimium-simply-dark.css";
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
