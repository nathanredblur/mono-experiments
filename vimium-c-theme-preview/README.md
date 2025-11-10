# Vimium-C Theme Previewer

A real-time theme previewer for Vimium-C that allows you to edit CSS and see how all components look instantly. This tool provides an accurate preview of how your custom themes will appear in the actual Vimium-C extension.

## Features

- **Large CSS Editor**: Paste and edit your theme CSS in a large textarea with syntax highlighting
- **Real-time Preview**: See changes instantly as you type
- **All Components**: Preview all Vimium-C components on a single page:
  - Help Dialog
  - Vomnibar (search bar with results)
  - Link Hints
  - Find Mode
  - HUD/Status Messages
- **GitHub URL Loading**: Load themes directly from GitHub raw URLs
- **Auto-save**: Your current theme is automatically saved to localStorage
- **Accurate Rendering**: Uses the same HTML structure and CSS classes as the actual extension

## Usage

### Basic Usage

1. Open `index.html` in your browser (or run a local server)
2. Paste your CSS theme code in the left panel
3. See the preview update in real-time on the right
4. Use the "Load from URL" feature to load themes from GitHub

### Running with a Local Server

```bash
# Using Python 3
python3 -m http.server 3000

# Using Node.js (http-server)
npx http-server -p 3000

# Then open: http://127.0.0.1:3000/vimium-c-theme-preview/
```

## Loading Themes from GitHub

You can load themes from GitHub by pasting either the GitHub URL or the raw URL:

- **GitHub URL**: `https://github.com/ysjn/vimium-simply-dark/blob/master/vimium-simply-dark.css`
- **Raw URL**: `https://raw.githubusercontent.com/ysjn/vimium-simply-dark/master/vimium-simply-dark.css`

The app will automatically convert GitHub URLs to raw URLs when loading.

## Example Themes

Try these themes to see the previewer in action:

- **Neuro Core** (included): `themes/neuro-core.css` - A dark theme with purple/blue accents
- [Vimium Simply Dark](https://raw.githubusercontent.com/ysjn/vimium-simply-dark/master/vimium-simply-dark.css)

## Components Previewed

All major Vimium-C UI components are included:

- **Help Dialog** (`#HDlg`): The command reference dialog that appears when you press `?`
- **Vomnibar** (`#bar`, `#list`, `.item`): The URL/bookmark/history search interface
  - Search input with placeholder
  - Toolbar buttons (dark mode toggle, close)
  - Result items with icons, titles, and URLs
  - Selected item highlighting
- **Hints** (`.LH`, `.HM`, `.MC`, `.BH`): Link hints overlay that appears when you press `f`
  - Regular hints
  - Matched character highlighting
  - Special hint types (`.BH` for buttons)
- **Find Mode** (`.r`, `#s`, `#i`, `#c`): In-page search interface
- **HUD/TEE** (`.HUD`, `.TEE`): Status messages that appear at the bottom of the page

## File Structure

```
vimium-c-theme-preview/
├── README.md
├── index.html          # Main HTML file with all components
├── app.js              # JavaScript logic for theme loading and preview
├── styles.css          # App styling (editor and preview panels)
├── examples/           # Reference HTML from vimium-c
│   ├── help.html       # Help dialog structure
│   ├── hint.html       # Link hints structure
│   ├── find.html       # Find mode structure
│   └── vomnibar.html   # Vomnibar structure
└── themes/             # Example themes
    ├── vimium-c.css    # Default Vimium-C theme
    └── neuro-core.css  # Dark theme with purple/blue accents
```

## Technical Details

- **Pure Vanilla JS**: No frameworks or dependencies required
- **Real-time CSS Application**: CSS is applied instantly via `<style>` tag injection
- **LocalStorage**: Your current theme is saved automatically
- **GitHub Integration**: Fetches themes from GitHub raw URLs
- **Accurate Structure**: Uses the same HTML structure and CSS classes as the actual Vimium-C extension

## Creating Custom Themes

### Key CSS Selectors

Here are the main selectors you'll want to customize:

```css
/* Help Dialog */
#HDlg { /* Main dialog container */ }
.HelpKey { /* Keyboard shortcut keys */ }
.HelpSectionTitle { /* Section headers */ }

/* Vomnibar */
#bar { /* Search input container */ }
#input { /* Search input field */ }
#list { /* Results list */ }
.item { /* Individual result item */ }
.item.b { /* Selected item */ }

/* Link Hints */
.LH { /* Hint label */ }
.MC { /* Matched character */ }
.BH { /* Button hint */ }

/* Find Mode */
.r { /* Find container */ }
#i { /* Search term */ }
#c { /* Match count */ }

/* HUD/Status */
.HUD { /* Status message */ }
```

### Tips for Theme Development

1. **Start with a base**: Copy the default theme and modify colors
2. **Use !important**: Vimium-C uses inline styles, so you'll need `!important` to override them
3. **Test all components**: Make sure to check how your theme looks on all UI elements
4. **Consider contrast**: Ensure text is readable against backgrounds
5. **Use the preview**: The real-time preview makes it easy to iterate quickly

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Contributing

Feel free to submit pull requests with:
- New example themes
- Bug fixes
- UI improvements
- Documentation updates

## License

MIT License - Feel free to use this tool for creating and sharing your own Vimium-C themes!
