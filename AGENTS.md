# AGENTS.md — helpers4 (canonical)

Org-wide rules inherited by all repos. Per-repo `AGENTS.md` only adds repo-specific content.

## Restrictions

- **English only** — code, comments, commits, docs
- **LGPL-3.0-or-later** on every file

## Git Workflow

Default policy — nuanced, not a hard rule: ask if a specific task calls for
something different, but absent other instructions:

1. **Branch** — work on a branch, never directly on `main`. Group related
   changes on the same branch instead of opening a new one per small change.
2. **Commit** — one commit per subject, Conventional Commits format mandatory
   (see Commit Messages below).
3. **Push** — only once it looks safe to do so; a human review of the diff
   first is recommended for anything non-trivial. Ask if unsure.
4. **Pull Request** — open one once pushed.
5. **Merge** — never merge. Merging is always a human decision.

A narrow, temporary carve-out (e.g. "push straight to `main` for this one fix")
may be granted in conversation for a specific piece of work — treat it as
scoped to exactly what was said, never as a standing precedent to reuse
elsewhere or later without asking again.

## Code Comments

Write comments for someone reading the code cold — they never see the diff or the previous
version, only what's in front of them. Describe what the code *is* and *why* it's that way,
never what changed to get there.

- ❌ `contents: write # was read-only — this job now also commits X`
- ✅ `contents: write # commits X`

If a comment needs "was"/"before"/"previously"/"now" (or a timestamp: "as of writing", "since
last month") to make sense, that content belongs in the commit message or PR description, not
the code — it rots the moment someone reads the file without the diff in front of them.

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

Examples: `feat(array): ✨ add flatMap helper` · `fix(ci): 🐛 fix checkout depth` · `chore(pnpm-store): ⬆️ bump version`

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
