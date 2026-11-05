# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Example content is now the fictional **Shelfline Field API**: one OpenAPI spec per locale
  (`docs/public/openapi.<locale>.json`), produced by [openapi-fixer](https://github.com/rafactx/openapi-fixer-v2)
- The API reference loads the spec that matches the page language
- Guide pages rewritten for the example API, with English URLs (`/authentication`, `/rate-limits`, `/examples`, `/pagination`, `/errors`)
- New indigo palette; `oldHeroSection.vue` renamed to `HeroSection.vue`; hero shows a screenshot of the portal

### Removed
- Unused `vite.config.ts` (referenced an uninstalled Tailwind plugin) and `docs/dummy.ts`

### Added
- Initial release as public template
- Multi-language support (Portuguese, English, Spanish, French)
- Interactive API reference with Scalar integration
- Responsive design with mobile-first approach
- Dark/light theme support
- Performance optimizations with code splitting
- Accessibility features and ARIA compliance
- Comprehensive documentation and contribution guidelines

## [1.0.0] - 2025-01-16

### Added
- **Initial Public Release**
  - Complete API documentation template
  - VitePress + Vue 3 + TypeScript setup
  - Scalar API reference component
  - Multi-language i18n support
  - Responsive design system
  - Performance optimizations
  - Open source infrastructure (MIT License, Contributing guidelines)
  - Comprehensive documentation

### Technical Features
- Vue 3 Composition API with `<script setup>`
- TypeScript with strict configuration
- ESLint + Prettier code formatting
- Vite build system with optimized chunks
- Pnpm package manager
- Component architecture with proper separation of concerns
- Custom theme system with CSS variables
- Mobile-optimized with touch support
- Accessibility-first approach
- SEO optimized with proper meta tags

### Documentation
- Complete developer documentation
- Multi-language content structure
- API reference examples
- Authentication and security best practices
- Performance optimization guides
- Contribution guidelines
- Code of conduct

### Deployment Ready
- Vercel deployment configuration
- Static site generation
- Optimized assets and bundle splitting
- Proper caching strategies
- Security headers and CSP support

---

## Migration Guide

### From Company-specific version
If you're migrating from a company-specific version of this template:

1. **Brand References**: All company-specific branding has been replaced with generic placeholders
2. **API Endpoints**: Update `https://api.example.com` to your actual API domain
3. **Authentication**: Replace placeholder credentials with your actual auth setup
4. **Content**: Customize documentation content for your specific API
5. **Styling**: Update colors and logos to match your brand

### Customization
See the [README.md](./README.md) for detailed customization instructions.

## Support

- 📖 [Documentation](./docs/)
- 🐛 [Issue Tracker](https://github.com/rafactx/api-docs-starter/issues)
- 💬 [Discussions](https://github.com/rafactx/api-docs-starter/discussions)
- 📧 [Email Support](mailto:teixeirac.rafael@gmail.com)