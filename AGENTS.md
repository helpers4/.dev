# AGENTS.md — helpers4 organization (canonical)

This is the **canonical, org-wide** agent guidance for the helpers4 organization. Every helpers4 repository inherits these rules. Per-repo `AGENTS.md` files only add project-specific details (scopes, structure, commands) on top of what is defined here.

## ⛔ CRITICAL RESTRICTIONS

- **NEVER execute `git push`** — The user pushes manually after review.
- **NEVER execute `git commit` or `git add`** — The user stages and commits manually. Fix files, then stop. Wait for an explicit "commit" instruction.
- **NEVER use GPT models** — Use Claude models only (claude-sonnet-4, Claude Opus 4.5).
- **Everything in English** — Code, comments, commits, documentation, logs, PR descriptions.
- **License is LGPL-3.0-or-later** for every helpers4 repo.

## Organization Context

**helpers4** is a collection of open-source utilities split across these repositories:

| Repo | Purpose |
|------|---------|
| [`.dev`](https://github.com/helpers4/.dev) | Orchestration workspace + unified DevContainer + canonical agent rules (this file) |
| [`.github`](https://github.com/helpers4/.github) | Org-wide GitHub config (workflows, templates, community files) |
| [`typescript`](https://github.com/helpers4/typescript) | Tree-shakable TS utility functions |
| [`devcontainer`](https://github.com/helpers4/devcontainer) | DevContainer Features published on GHCR |
| [`action`](https://github.com/helpers4/action) | Reusable GitHub Actions |
| [`website`](https://github.com/helpers4/website) | Landing page + Docusaurus docs (helpers4.dev) |

All repos are licensed **LGPL-3.0-or-later**.

## Commit Messages

All repos follow [Conventional Commits](https://www.conventionalcommits.org/) with a **gitmoji** between the scope and the description.

**Format:** `<type>(<scope>): <emoji> <description>`

**Rules:**
- Description ≤72 chars, lowercase, imperative mood, no trailing period
- Always include the emoji
- Multiple logical changes → bullet list in body
- Allowed scopes are repo-specific — see each repo's `AGENTS.md` and `.vscode/settings.json` (`conventionalCommits.scopes`)

**Type / emoji table:**

| Type | Primary | Alternatives (gitmoji.dev) | When to use |
|------|---------|---------------------------|-------------|
| feat | ✨ | 🚸 UX, ♿️ a11y, 🌐 i18n, 💬 text/literals | New feature |
| fix | 🐛 | 🚑️ hotfix, 🔒️ security, 🩹 trivial, 🥅 errors, 🚨 warnings, ✏️ typo | Bug fix |
| docs | 📝 | 💡 source comments, 📄 license | Documentation |
| refactor | ♻️ | 🎨 structure, 🔥 remove code, ⚰️ dead code, 🚚 move/rename | Code refactoring |
| test | ✅ | 🧪 failing test, 💚 fix CI test | Tests |
| chore | 🔧 | 🙈 gitignore, 🔖 tag/release, 📌 pin deps, 🩺 healthcheck | Maintenance |
| perf | ⚡️ | — | Performance |
| style | 💄 | 🎨 code style | Code style / UI |
| ci | 👷 | 💚 fix CI | CI/CD |
| build | 📦️ | ➕ add dep, ➖ remove dep, ⬆️ upgrade dep, ⬇️ downgrade dep | Build system |
| revert | ⏪️ | — | Revert |

> Pick the **most specific** gitmoji that matches the change. The primary is the safe default; reach for an alternative when it adds real signal. Full list: https://gitmoji.dev

**Examples:**
- `feat(array): ✨ add flatMap helper`
- `fix(CI-CD): 🐛 fix checkout depth`
- `docs(governance): 📝 update contributing guide`

## License Header

Every source file (TS, JS, sh, etc.) must include the LGPL-3.0 header. Comment syntax depends on the language.

**TypeScript / JavaScript:**

```ts
/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */
```

**Bash / shell:**

```bash
# This file is part of helpers4.
# Copyright (C) 2025 baxyz
# SPDX-License-Identifier: LGPL-3.0-or-later
```

The `psi-header` VS Code extension is configured in the workspace to inject these automatically.

## This Repository (.dev)

**Purpose:** Orchestrate the helpers4 organization — multi-root VS Code workspace, unified DevContainer, canonical agent rules, shared VS Code settings.

**Allowed scopes:** `governance`, `workspace`, `devcontainer`, `CI-CD`

### Project Structure

```
.dev/
├── .devcontainer/
│   ├── devcontainer.json       # Cross-repo dev environment
│   └── setup-container.sh      # postCreateCommand: clone-fallback + install
├── .vscode/
│   └── settings.json           # Repo-specific overrides (scopes)
├── scripts/
│   ├── run-each.mjs            # Run a pnpm script in every sibling repo
│   └── git-each.mjs            # Run a git command in every sibling repo
├── helpers4.code-workspace     # Multi-root workspace + shared settings
├── package.json                # Cross-repo orchestration scripts
├── AGENTS.md                   # This file (canonical org-wide rules)
├── README.md
└── LICENSE                     # LGPL-3.0
```

Sibling repos (`.github`, `action`, `devcontainer`, `typescript`, `website`) live **next to** this folder on the host. The devcontainer bind-mounts each of them at `/workspaces/<name>` so the multi-root workspace sees them via `../<name>`.

### What NOT to do here

- Do **not** add runtime code, packages, or build outputs. This repo is configuration only.
- Do **not** duplicate per-repo agent rules — they live in their own `AGENTS.md`.

## Repository Links

- Organization: https://github.com/helpers4
- TypeScript: https://github.com/helpers4/typescript
- DevContainer: https://github.com/helpers4/devcontainer
- Actions: https://github.com/helpers4/action
- Website: https://github.com/helpers4/website
- Org config: https://github.com/helpers4/.github
- Orchestrator: https://github.com/helpers4/.dev

## Questions?

Open an issue or comment on the PR.
