# Vimium-C Theme Previewer - Architecture

## How Vimium-C Styles Work

Vimium-C uses different styling approaches for different UI components:

### 1. **Vomnibar** (Search Bar)

- **Source**: `front/vomnibar.html`
- **Styling**: Has its own **inline styles** in the `<style>` tag
- **Does NOT use**: `vimium-c.css`
- **Our implementation**: Copy the exact inline styles from `vomnibar.html`

### 2. **Help Dialog**

- **Source**: `front/help_dialog.html`
- **Styling**: Has its own **inline styles** in the `<style>` tag
- **Does NOT use**: `vimium-c.css`
- **Our implementation**: Copy the exact inline styles from `help_dialog.html`

### 3. **Link Hints, HUD, Find Mode**

- **Source**: Injected into pages dynamically
- **Styling**: Uses `vimium-c.css` (the core styles)
- **Key classes**: `.R`, `.LH`, `.HM`, `.HUD`, `.r`
- **Our implementation**: Use selected styles from `vimium-c.css`, but override positioning

## Our Preview Architecture

```
┌─────────────────────────────────────────────┐
│           Main Page (index.html)            │
│  - CSS Editor                               │
│  - Controls (Load URL, Reset)               │
│  - Preview Container (iframes)              │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│  vomnibar.html  │     │ help-dialog.html│
│  - Inline CSS   │     │  - Inline CSS   │
│  + theme-style  │     │  + theme-style  │
└─────────────────┘     └─────────────────┘
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│   hints.html    │     │    hud.html     │
│  - Base CSS     │     │  - Base CSS     │
│  + theme-style  │     │  + theme-style  │
└─────────────────┘     └─────────────────┘
        │
        ▼
┌─────────────────┐
│    find.html    │
│  - Base CSS     │
│  + theme-style  │
└─────────────────┘
```

### Style Loading Order (per iframe)

```
1. Base Styles (inline <style>)
   ↓
2. User Theme (injected via app.js)
   ↓
3. Result: Combined styles
```

## Key Adjustments for Preview

Since Vimium-C components use `position: fixed` to float over web pages, we need to adjust them for the preview:

### Position Overrides

```css
/* Original Vimium-C */
.R {
  position: fixed;
}
.LH {
  position: absolute;
}

/* Preview Override */
.R {
  position: relative;
}
.LH {
  position: static;
  display: inline-block;
}
```

### Why Not Load vimium-c.css Directly?

❌ **Wrong approach**: Load `vimium-c.css` in all iframes

- Causes conflicts with components that have their own styles
- `vimium-c.css` has `.R{position:fixed}` which breaks layout
- Vomnibar and Help Dialog don't use it in the original extension

✅ **Correct approach**:

- Vomnibar: Use inline styles from `vomnibar.html`
- Help Dialog: Use inline styles from `help_dialog.html`
- Hints/HUD/Find: Extract only needed styles from `vimium-c.css`

## Theme Application

The user's CSS is injected into each iframe's `<style id="theme-style">`:

```javascript
// app.js
function applyTheme(css) {
  iframes.forEach((iframe) => {
    const iframeDoc = iframe.contentDocument;
    const themeStyle = iframeDoc.getElementById("theme-style");
    themeStyle.textContent = css;
  });
}
```

This mimics how Vimium-C applies custom themes:

1. Load default styles first
2. Apply user's custom CSS on top
3. User CSS can override any default style

## Testing Your Theme

When you paste CSS into the editor:

1. **Default styles test**: Paste `themes/vimium-c.css` content

   - Should look the same (no visible change)
   - Confirms base styles are correct

2. **Custom theme test**: Paste any custom theme

   - Only specified styles should change
   - Unspecified styles keep default appearance

3. **Empty test**: Clear all CSS
   - Should show original Vimium-C appearance
   - Confirms base styles are working
