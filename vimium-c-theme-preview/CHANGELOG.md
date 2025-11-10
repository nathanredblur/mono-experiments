# Changelog

## [2024-01-10] - Major Preview Fixes

### Fixed
- **Vomnibar Structure**: Corrected the HTML structure to match the actual Vimium-C extension
  - Added proper `body.mono-url` wrapper
  - Included SVG icons for toolbar buttons (dark mode toggle, close)
  - Fixed input placeholder styling
  - Improved item structure with proper icon, title, and URL layout
  - Added selected item (`.item.b`) styling

- **Vomnibar Styles**: Enhanced CSS to accurately represent the extension
  - Added `.mono-url` container styles
  - Improved `#bar` and `#list` styling with proper shadows and borders
  - Added `.btn_svg` styles for toolbar icons
  - Fixed `.item` hover and selected states
  - Added proper color scheme for titles, labels, and URLs

- **Link Hints**: Improved hint rendering
  - Fixed `.LH` (link hint) styling with proper gradients
  - Enhanced `.MC` (matched character) highlighting
  - Added `.BH` (button hint) special styling
  - Improved positioning and spacing

- **HUD Messages**: Fixed status message positioning
  - Corrected relative positioning for preview
  - Improved visibility and styling

### Enhanced
- **Theme Support**: Updated `neuro-core.css` theme with complete Vomnibar styling
  - Added dark mode colors for all Vomnibar elements
  - Included hover states and transitions
  - Added selected item highlighting

- **Documentation**: Comprehensive README update
  - Added detailed component documentation
  - Included CSS selector reference
  - Added theme development tips
  - Improved usage instructions

### Technical Improvements
- Removed conflicting CSS rules
- Improved preview wrapper styling
- Enhanced component isolation
- Better font rendering across components

## Previous Versions

### Initial Release
- Basic theme previewer with all Vimium-C components
- Real-time CSS editing
- GitHub URL loading support
- LocalStorage auto-save

