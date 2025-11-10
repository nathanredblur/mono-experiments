# Vimium-C Theme Creation Guide

## Adding New Themes to the Dropdown

To add a new theme to the dropdown menu, edit `themes.json`:

```json
{
  "name": "Theme Name",
  "description": "Brief description of the theme",
  "author": "Author name or GitHub username",
  "url": "URL to the CSS file",
  "local": false
}
```

### Properties

- **name** (required): Display name of the theme
- **description** (optional): Short description shown in tooltip
- **author** (optional): Theme creator's name or GitHub username
- **url** (required for themes): URL to CSS file or local path
  - Remote: `https://raw.githubusercontent.com/user/repo/branch/file.css`
  - Local: `themes/my-theme.css`
- **local** (required): `true` for local files, `false` for remote URLs

### Example: Adding a Remote Theme

```json
{
  "name": "My Cool Theme",
  "description": "A cool dark theme with neon accents",
  "author": "cooldev",
  "url": "https://raw.githubusercontent.com/cooldev/vimium-themes/main/cool-theme.css",
  "local": false
}
```

### Example: Adding a Local Theme

```json
{
  "name": "My Custom Theme",
  "description": "My personal Vimium-C theme",
  "author": "Me",
  "url": "themes/my-custom.css",
  "local": true
}
```

## Creating Custom Themes

### Important: Vimium-C CSS Limitations

⚠️ **Vimium-C does NOT support:**
- CSS Variables (`:root` and `var()`)
- Complex CSS features like `@import`
- External font loading with `@font-face` URLs

✅ **Vimium-C DOES support:**
- Direct color values (`#fff`, `rgb()`, `rgba()`)
- Gradients, shadows, borders
- Animations and transitions
- Most standard CSS properties

### Theme Template

```css
/* ====== YOUR THEME NAME ====== */

/* Help Dialog */
#HDlg {
  background: #000 !important;
  color: #fff !important;
  border: 1px solid #333 !important;
}

.HelpKey {
  background: #222 !important;
  color: #0f0 !important;
  border: 1px solid #0f0 !important;
}

.HelpSectionTitle {
  color: #0ff !important;
}

/* Vomnibar */
body {
  background: #111 !important;
}

#bar {
  background: #000 !important;
  border-bottom-color: #333 !important;
}

#input {
  background: #000 !important;
  color: #fff !important;
  border-color: #0f0 !important;
}

.item.s {
  background-color: #222 !important;
}

/* Link Hints */
.LH {
  background: #ff0 !important;
  color: #000 !important;
  border: 2px solid #f00 !important;
}

.MC {
  color: #f00 !important;
}

/* HUD */
.HUD:after {
  background: #000 !important;
  border-color: #333 !important;
}

.HUD {
  color: #0f0 !important;
}
```

### Key Selectors Reference

#### Help Dialog
- `#HDlg` - Main container
- `.HelpKey` - Keyboard key buttons
- `.HelpSectionTitle` - Section headers
- `.HelpCommandInfo` - Command descriptions
- `.VimL` - Links
- `.Vim`, `.VimC` - Logo text

#### Vomnibar
- `body` - Overall background
- `#bar` - Top bar
- `#input` - Search input
- `#toolbar` - Toolbar icons
- `.button` - Toolbar buttons
- `.item` - Result items
- `.item.s` - Selected item
- `.icon` - Icons
- `.title` - Item titles
- `.label` - Labels
- `a` - URLs

#### Link Hints
- `.LH` - Hint boxes
- `.MC` - Main character (highlighted)
- `.BH` - Frame hint specific styling

#### HUD
- `.HUD` - Container
- `.HUD:after` - Background pseudo-element

### Best Practices

1. **Always use `!important`** - Vimium-C base styles need to be overridden
2. **Test in the previewer** - See your changes in real-time
3. **Use solid colors** - Avoid transparency for better readability
4. **High contrast** - Ensure text is readable against backgrounds
5. **Consider both light and dark modes** - Test your theme in different conditions

### Converting Themes with CSS Variables

If your theme uses CSS variables (`:root`), convert them to direct values:

**Before (NOT supported):**
```css
:root {
  --bg: #000;
  --text: #fff;
}

#HDlg {
  background: var(--bg) !important;
  color: var(--text) !important;
}
```

**After (Supported):**
```css
/* Colors: bg: #000, text: #fff */

#HDlg {
  background: #000 !important;
  color: #fff !important;
}
```

## Testing Your Theme

1. Save your CSS file in the `themes/` directory
2. Add it to `themes.json`
3. Reload the previewer
4. Select your theme from the dropdown
5. Check all components (Help Dialog, Vomnibar, Hints, HUD)

## Sharing Your Theme

### Method 1: GitHub Repository
1. Create a repo with your theme
2. Share the raw URL: `https://raw.githubusercontent.com/USER/REPO/BRANCH/theme.css`
3. Users can paste this URL in the previewer

### Method 2: Pull Request
1. Fork this repository
2. Add your theme to `themes/` folder
3. Add entry to `themes.json`
4. Submit a pull request

## Resources

- [Vimium-C Wiki](https://github.com/gdh1995/vimium-c/wiki)
- [Community Themes Collection](https://github.com/darukutsu/vimiumc-themes)
- [Vimium Dark Themes](https://github.com/Foldex/vimium-dark-themes)

## Troubleshooting

### Theme doesn't load
- Check that the URL is accessible
- Ensure it's a raw URL (not GitHub UI)
- Verify the file contains valid CSS

### Styles don't apply
- Add `!important` to all rules
- Check selector specificity
- Verify you're targeting the right elements

### Colors look wrong
- Avoid CSS variables - use direct values
- Test with high contrast
- Check against multiple components

### Animations don't work
- Ensure `@keyframes` are defined
- Use standard animation properties
- Keep animations subtle for better UX

