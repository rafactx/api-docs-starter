# Contributing to API Docs Starter

Thank you for your interest in contributing to API Docs Starter! This document provides guidelines and instructions for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Documentation](#documentation)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

This project adheres to the [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.15.5

### Setup

1. Fork the repository
2. Clone your fork locally:
   ```bash
   git clone https://github.com/rafactx/api-docs-starter.git
   cd api-docs-starter
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

## Development Workflow

### 1. Create a Branch

Create a new branch for your contribution:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-fix-name
```

### 2. Make Changes

- Follow the [Coding Standards](#coding-standards)
- Test your changes thoroughly
- Update documentation if needed

### 3. Commit Your Changes

Use clear and descriptive commit messages:
```bash
git commit -m "feat: add new feature for component XYZ"
# or
git commit -m "fix: resolve styling issue in mobile view"
```

### 4. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 5. Create a Pull Request

1. Go to the original repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Submit the PR

## Pull Request Process

### PR Template

When creating a PR, please provide:

- **Description**: Clear explanation of changes
- **Type**: feat/fix/docs/chore/refactor
- **Testing**: How you tested the changes
- **Breaking Changes**: Any backward incompatible changes
- **Related Issues**: Link to relevant GitHub issues

### PR Guidelines

- Keep PRs focused on a single change
- Ensure all tests pass
- Update documentation
- Follow coding standards
- Be responsive to review comments

### Review Process

1. Automated checks must pass
2. At least one maintainer review required
3. Address review feedback promptly
4. PRs are typically merged within 3-5 business days

## Coding Standards

### TypeScript

- Use strict TypeScript settings
- Provide explicit return types for functions
- Use interfaces over types for object shapes
- Avoid `any` type - use `unknown` when necessary

### Vue.js

- Use Composition API with `<script setup>`
- Use kebab-case for component names in templates
- Use PascalCase for component imports
- Prefer reactive refs over reactive objects

### CSS/Styling

- Use the CSS variables defined in `docs/.vitepress/theme/theme.css`
- Follow BEM naming for custom CSS
- Use CSS custom properties for theming
- Ensure responsive design (mobile-first)

### Code Style

- Use ESLint and Prettier configurations
- Run `pnpm lint` and `pnpm format` before committing
- Keep functions small and focused
- Use meaningful variable and function names

### Comments

- Use JSDoc-style comments for functions and components
- Write comments in English
- Explain why, not what
- Keep comments up-to-date

## Documentation

### Component Documentation

Document all Vue components with:
- Purpose and usage
- Props and their types
- Events emitted
- Slots available

### API Documentation

Keep API documentation:
- Accurate and up-to-date
- Include examples in multiple languages
- Provide clear error handling guidance
- Document authentication methods

### README Updates

Update README.md for:
- New features
- Breaking changes
- Setup instruction changes
- New dependencies

## Reporting Issues

### Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, Node.js version)
- Screenshots if applicable

### Feature Requests

For feature requests, provide:
- Clear description of the feature
- Use case and benefits
- Proposed implementation (if known)
- Alternative approaches considered

### Questions

For general questions:
- Check existing issues and documentation first
- Use GitHub Discussions for questions
- Be specific and provide context

## Development Tips

### Hot Reload

The project supports hot reload. Changes to Vue components and markdown files will automatically refresh in the browser.

### Testing Changes

- Test in multiple browsers (Chrome, Firefox, Safari)
- Test on mobile devices using browser dev tools
- Test both light and dark themes
- Verify multi-language functionality

### Performance

- Use lazy loading for heavy components
- Optimize images and assets
- Monitor bundle size
- Use Chrome DevTools for performance analysis

## Community

### Getting Help

- GitHub Discussions: General questions and discussions
- GitHub Issues: Bug reports and feature requests
- Documentation: Check docs and examples first

### Staying Informed

- Watch the repository for releases
- Subscribe to issues and PRs
- Join discussions about new features

Thank you for contributing to API Docs Starter! 🚀