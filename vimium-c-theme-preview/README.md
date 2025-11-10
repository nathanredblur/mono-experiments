# Vimium-C Theme Previewer

A real-time theme previewer for Vimium-C that allows you to edit CSS and see how all components look instantly.

## Features

- **Large CSS Editor**: Paste and edit your theme CSS in a large textarea
- **Real-time Preview**: See changes instantly as you type
- **All Components**: Preview all Vimium-C components on a single page (no tabs)
- **GitHub URL Loading**: Load themes directly from GitHub raw URLs
- **Preload Themes**: Quick access to popular themes via URL

## Usage

1. Open `index.html` in your browser
2. Paste your CSS theme code in the left panel
3. See the preview update in real-time on the right
4. Use the "Load from URL" feature to load themes from GitHub

## Loading Themes from GitHub

You can load themes from GitHub by converting the GitHub URL to a raw URL:

- GitHub URL: `https://github.com/ysjn/vimium-simply-dark/blob/master/vimium-simply-dark.css`
- Raw URL: `https://raw.githubusercontent.com/ysjn/vimium-simply-dark/master/vimium-simply-dark.css`

The app will automatically convert GitHub URLs to raw URLs when loading.

## Example Themes

- [Vimium Simply Dark](https://raw.githubusercontent.com/ysjn/vimium-simply-dark/master/vimium-simply-dark.css)

## Components Previewed

- **Help Dialog** (`#HDlg`): Command reference dialog
- **Vomnibar** (`#bar`, `#list`): URL/bookmark/history search
- **Hints** (`.LH`, `.HM`): Link hints overlay
- **Find Mode** (`.r`, `.Find`): In-page search
- **HUD/TEE** (`.HUD`, `.TEE`): Status messages

## File Structure

```
vimium-c-theme-preview/
├── README.md
├── index.html          # Main HTML file
├── app.js              # JavaScript logic
├── styles.css          # App styling
├── examples/           # Example HTML from vimium-c
│   ├── help.html
│   ├── hint.html
│   ├── find.html
│   └── vomnibar.html
└── themes/            # Example themes
    └── neuro-core.css
```

## Technical Details

- **Pure Vanilla JS**: No frameworks or dependencies
- **Real-time CSS Application**: CSS is applied instantly via `<style>` tag injection
- **LocalStorage**: Your current theme is saved automatically
- **GitHub Integration**: Fetches themes from GitHub raw URLs using CORS proxy if needed

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
