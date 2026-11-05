# Security Policy

## Supported Versions

We provide security updates for the latest version of API Docs Starter.

| Version | Supported          |
|---------|--------------------|
| 1.0.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within API Docs Starter, please send an email to Rafael Teixeira at [rafactx@icloud.com](mailto:rafactx@icloud.com). All security vulnerabilities will be promptly addressed.

Please include the following information in your report:

- A clear description of the vulnerability
- Steps to reproduce the vulnerability
- Potential impact of the vulnerability
- Any suggested mitigation or fix

We will acknowledge receipt of your vulnerability report within 48 hours and provide an estimated timeline for addressing the issue.

## Security Best Practices

### For Template Users

When using this template for your API documentation:

1. **Environment Variables**
   - Never commit sensitive information to version control
   - Use environment variables for API keys and credentials
   - Include `.env.example` with placeholder values

2. **Authentication Examples**
   - The template uses placeholder authentication examples
   - Replace with your actual authentication mechanism
   - Follow security best practices for your specific auth method

3. **Content Security Policy**
   - Implement appropriate CSP headers for your deployment
   - Consider the security requirements of your specific API
   - Regularly review and update security configurations

4. **Dependencies**
   - Regularly update dependencies to get security patches
   - Use `npm audit` or `pnpm audit` to check for vulnerabilities
   - Monitor security advisories for used packages

### For Contributors

When contributing to this template:

1. **No Secrets in Code**
   - Never commit API keys, passwords, or other secrets
   - Use placeholder values in examples and documentation
   - Ensure all secrets are properly documented as placeholders

2. **Dependency Security**
   - Check security implications of new dependencies
   - Prefer well-maintained packages with good security track records
   - Update dependencies regularly

3. **Input Validation**
   - Validate all user inputs in components
   - Sanitize user-generated content
   - Prevent XSS vulnerabilities

4. **Secure Communication**
   - Use HTTPS for all external resources
   - Implement proper CORS policies
   - Validate external API responses

## Common Security Considerations

### OpenAPI Specifications

The template includes generic OpenAPI specifications. When customizing:

1. **Remove Sensitive Information**
   - Don't include real API keys or endpoints in public repos
   - Use placeholder domains and credentials
   - Remove any internal server information

2. **Authentication Documentation**
   - Document your actual authentication method
   - Include security considerations specific to your API
   - Provide examples of secure implementation

### Static Site Security

This template generates static HTML files. Consider:

1. **Deployment Security**
   - Use secure hosting providers
   - Implement proper access controls
   - Enable HTTPS and security headers

2. **Content Security**
   - Implement appropriate CSP headers
   - Use Subresource Integrity (SRI) for external scripts
   - Regularly audit included third-party resources

3. **Analytics and Tracking**
   - The template includes Vercel analytics (optional)
   - Consider privacy implications of tracking
   - Provide opt-out options where required

## Vulnerability Disclosure Process

### Disclosure Timeline

1. **Report Received**: Vulnerability report is received and acknowledged
2. **Assessment**: Vulnerability is validated and impact assessed (1-3 business days)
3. **Fix Development**: Patch is developed and tested (3-10 business days)
4. **Release**: Security patch is released (timeline depends on severity)
5. **Public Disclosure**: Public disclosure coordinated with reporter

### Severity Levels

- **Critical**: Exploitable vulnerabilities with high impact (24-48 hour response)
- **High**: Vulnerabilities that could compromise user data (3-5 day response)
- **Medium**: Vulnerabilities with limited impact (7-14 day response)
- **Low**: Minor security issues (30 day response)

### Credit

Security researchers who responsibly disclose vulnerabilities will be credited in the security advisory and changelog, unless they prefer to remain anonymous.

## Security Resources

### Learning

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Google Web Fundamentals: Security](https://developers.google.com/web/fundamentals/security)

### Tools

- [npm audit](https://docs.npmjs.com/cli/commands/audit)
- [Snyk](https://snyk.io/)
- [GitHub Dependabot](https://docs.github.com/en/code-security/dependabot)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

### Standards

- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [CIS Security Controls](https://www.cisecurity.org/controls/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

## Contact

For security-related inquiries:
- Email: [rafactx@icloud.com](mailto:rafactx@icloud.com)
- GitHub Issues: [Report a security issue](https://github.com/rafactx/api-docs-starter/security/advisories/new)

**Please do not report security vulnerabilities through public GitHub issues.**