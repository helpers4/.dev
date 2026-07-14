# AGENTS.md — helpers4 (canonical)

Org-wide rules inherited by all repos. Per-repo `AGENTS.md` only adds repo-specific content.

## Restrictions

- **Never `git push` or `git commit` unless explicitly asked this turn** — by default the user
  commits manually after review. A specific in-conversation request (e.g. "commit by topic as
  you go") authorizes committing for that task, but is not a standing change to this default —
  ask again next time unless told otherwise. `git push` still always needs explicit confirmation
  even when commits are authorized.
- **English only** — code, comments, commits, docs
- **LGPL-3.0-or-later** on every file

## Repos

| Repo | Purpose |
| ---- | ------- |
| `.dev` | Orchestration: multi-root workspace, devcontainer, these rules |
| `.github` | Org GitHub config: workflows, templates |
| `typescript` | Tree-shakable TS utility library |
| `devcontainer` | DevContainer Features published to GHCR |
| `action` | Reusable GitHub Actions |
| `website` | Astro + Starlight docs (helpers4.dev) |

## Commit Messages

Format: `<type>(<scope>): <emoji> <description>` ([Conventional Commits](https://www.conventionalcommits.org/) + [gitmoji](https://gitmoji.dev))

Rules: ≤72 chars · lowercase · imperative · no trailing period · one emoji always · scopes from `scopes.json` at repo root · machine-readable convention in `/workspaces/.dev/commit-convention.json`

| Type | Emoji | Alternatives | When |
| ---- | ----- | ------------ | ---- |
| feat | ✨ | 🚸 UX · ♿️ a11y · 🌐 i18n · 💬 text | New feature |
| fix | 🐛 | 🚑️ hotfix · 🔒️ security · 🩹 trivial · 🥅 errors · 🚨 warnings · ✏️ typo | Bug fix |
| docs | 📝 | 💡 comments · 📄 license | Documentation |
| refactor | ♻️ | 🎨 structure · 🔥 remove · ⚰️ dead code · 🚚 move/rename | Refactor |
| test | ✅ | 🧪 failing · 💚 fix CI | Tests |
| chore | 🔧 | 🙈 gitignore · 🔖 release · 📌 pin deps · 🩺 healthcheck | Maintenance |
| perf | ⚡️ | | Performance |
| style | 💄 | 🎨 code style | Style |
| ci | 👷 | 💚 fix CI | CI/CD |
| build | 📦️ | ➕ add · ➖ remove · ⬆️ upgrade · ⬇️ downgrade dep | Build |
| revert | ⏪️ | | Revert |

Examples: `feat(array): ✨ add flatMap helper` · `fix(CI-CD): 🐛 fix checkout depth` · `chore(pnpm-store): ⬆️ bump version`

## License Header

**TS/JS:**

```ts
/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */
```

**Bash/shell:**

```bash
# This file is part of helpers4.
# Copyright (C) 2025 baxyz
# SPDX-License-Identifier: LGPL-3.0-or-later
```

`psi-header` (VS Code extension) injects these automatically.
