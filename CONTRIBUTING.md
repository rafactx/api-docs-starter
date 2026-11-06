# Contributing

Thanks for taking a look. This is a small project maintained by one person, so the process is short.

## Setup

Requires Node.js 20 or later (CI uses 22) and pnpm 10. With Corepack, the pnpm version pinned in `package.json` is picked up automatically:

```bash
corepack enable
pnpm install
pnpm dev        # http://localhost:5173
```

## Checks

These are the commands CI runs on every pull request. Run them before you push:

```bash
pnpm install --frozen-lockfile
pnpm typecheck  # vue-tsc on docs/.vitepress
pnpm build      # VitePress build of every page and language; fails on dead links
```

There is no automated test suite. For UI changes, also run `pnpm preview` and check the pages you touched in the four languages, in light and dark mode, and at a phone width.

## Pull requests

- Branch from `main` and open a pull request into `main`. Direct pushes to `main` are not accepted.
- The `ci` check must pass before merge.
- Pull requests are squash-merged, so the PR title becomes the commit subject. Keep one change per PR.
- Fill in the template: what changed, why, and how you tested it.

## Commit style

Imperative subject line in plain English, about 72 characters at most, for example `Fix sidebar overlap on the API reference page`. Use the body to explain why when it is not obvious.

## Reporting bugs and security issues

Use the issue forms for bugs and feature requests. Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).
