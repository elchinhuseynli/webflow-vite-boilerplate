# Webflow Vite Boilerplate

A modern development boilerplate for Webflow projects using Vite for fast build times and hot module replacement.

## Features

- ⚡ **Vite** - Lightning fast build tool
- 🎨 **CSS Modules** - Scoped styling
- 📱 **Responsive Design** - Mobile-first approach
- 🚀 **Hot Module Replacement** - Instant updates during development
- 📦 **Component-based Architecture** - Modular and maintainable code

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd webflow-vite-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page-specific styles and scripts
├── single/        # Single post/page templates
├── main.css       # Global styles
└── loader.js      # Page loader
```

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Customization

- Update `vite.config.js` for build configuration
- Modify `src/main.css` for global styles
- Add new components in `src/components/`
- Create page-specific styles in `src/pages/`

## License

This project is open source and available under the [MIT License](LICENSE).
