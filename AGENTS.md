# AGENTS.md — helpers4 organization (canonical)

This is the **canonical, org-wide** agent guidance for the helpers4 organization. Every helpers4 repository inherits these rules. Per-repo `AGENTS.md` files only add project-specific details (scopes, structure, commands) on top of what is defined here.

## ⛔ CRITICAL RESTRICTIONS

- **NEVER execute `git push`** — The user pushes manually after review.
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

| Emoji | Type | Description |
|-------|------|-------------|
| ✨ | feat | New feature |
| 🐛 | fix | Bug fix |
| 📝 | docs | Documentation |
| ♻️ | refactor | Code refactoring |
| ✅ | test | Tests |
| 🔧 | chore | Maintenance |
| 🚀 | perf | Performance |
| 💄 | style | Code style |
| 👷 | ci | CI/CD |
| 📦 | build | Build system |
| ⏪ | revert | Revert |

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
│   └── devcontainer.json       # Cross-repo dev environment
├── .vscode/
│   └── settings.json           # Repo-specific overrides (scopes)
├── helpers4.code-workspace     # Multi-root workspace + shared settings
├── AGENTS.md                   # This file (canonical org-wide rules)
├── README.md
└── LICENSE                     # LGPL-3.0
```

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
