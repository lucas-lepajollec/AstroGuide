# Security policy

AstroGuide is a static web application with no backend, user account, or application secret. Relevant reports can still concern its browser behavior, dependencies, container image, HTTP headers, or GitHub Actions supply chain.

## Supported versions

Until the first deliberate public release, security fixes target `main`. After releases begin, this section will identify the supported release line explicitly.

## Reporting a vulnerability

Use the repository's [private vulnerability reporting form](https://github.com/lucas-lepajollec/AstroGuide/security/advisories/new).

If private reporting is unavailable, open a minimal public issue asking for a private contact channel. Do not include exploit code, credentials, private data, or other sensitive details in that issue.

Include the affected commit or image tag, clear reproduction steps, the expected impact, and a sanitized proof of concept when possible. You should receive an acknowledgement within seven days and an initial assessment within fourteen days.

General scientific-data corrections and display bugs are not security vulnerabilities and should use the normal issue tracker.
