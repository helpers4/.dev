# AGENTS.md — helpers4 `.dev`

This repository is the **shared workspace** for the helpers4 organization. Every helpers4 repository
inherits these rules; per-repo `AGENTS.md` files only add repo-specific content.

## Language

**All content in all helpers4 repositories must be in English** — code, comments,
doc-comments, commit messages, issues, pull requests, specs, logs, and configuration.
This rule applies to every sibling repository. No exceptions.

## Restrictions

- **LGPL-3.0-or-later** on every file (see License Header below)

## Code Comments

Write comments for someone reading the code cold — they never see the diff or the previous
version, only what's in front of them. Describe what the code *is* and *why* it's that way,
never what changed to get there.

- ❌ `contents: write # was read-only — this job now also commits X`
- ✅ `contents: write # commits X`

If a comment needs "was"/"before"/"previously"/"now" (or a timestamp: "as of writing", "since
last month") to make sense, that content belongs in the commit message or PR description, not
the code — it rots the moment someone reads the file without the diff in front of them.

## Scope

- VS Code multi-root workspace (`helpers4.code-workspace`)
- devcontainer setup (`.devcontainer/`)
- shared AI / agent guidance and the Copilot-instructions sync script (`scripts/sync-copilot-instructions.mjs`)

This repository contains **no product runtime code** — it is configuration and documentation only.

## Workspace structure

All repositories are cloned as siblings under `/workspaces/` by the `org-workspace` devcontainer
feature (`.devcontainer/devcontainer.json`) — only `.dev` itself is bind-mounted from the host.
This is what makes the devcontainer work identically on a local checkout (Docker Desktop/WSL2)
and on GitHub Codespaces, which only ever checks out the one repo you launch the codespace from.
`helpers4.code-workspace` is kept up to date by the same feature.

| Path | Repo | Purpose |
| --- | --- | --- |
| `/workspaces/.dev` | `helpers4/.dev` | Orchestration: multi-root workspace, devcontainer, these rules |
| `/workspaces/.github` | `helpers4/.github` | Org GitHub config: workflows, templates |
| `/workspaces/typescript` | `helpers4/typescript` | Tree-shakable TS utility library |
| `/workspaces/devcontainer` | `helpers4/devcontainer` | DevContainer Features published to GHCR |
| `/workspaces/action` | `helpers4/action` | Reusable GitHub Actions |
| `/workspaces/rust` | `helpers4/rust` | General-purpose Rust helpers crate |
| `/workspaces/website` | `helpers4/website` | Astro + Starlight docs (helpers4.dev) |

## Devcontainer — available tools

The container is self-contained; no host toolchain installation is needed.

- Node.js 26
- `pnpm` (via `helpers4/devcontainer/pnpm-store` + `typescript-dev`), dependencies installed on container creation (`package-auto-install`)
- `nub` — an accelerator (`nub run`, `nubx`) that delegates to pnpm; it is **not** a package manager replacement
- `vp` (Vite+: Oxlint/Oxfmt, Vitest)
- Rust toolchain (`rustup`, `cargo`)
- `gh` CLI
- `git-absorb`
- Docker CLI (talks to the host Docker daemon)
- Claude Code (CLI + VS Code extension) with Remote Control enabled — `claude-rc status` inside the container
- AI assistants: Copilot, Cline
- `org-workspace`: clones the org repos into `/workspaces` and keeps the `.code-workspace` file up to date

## Rules

- Treat this repository as configuration/documentation only — no product runtime code.
- Do not duplicate per-repo agent rules — they live in each repo's own `AGENTS.md`.
- Add future repositories as siblings of `.dev/`, not nested inside it. Nothing to update by hand:
  `org-workspace` discovers the org repos and keeps `helpers4.code-workspace` up to date (tune its
  options in `.devcontainer/devcontainer.json`).

## Commit conventions

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

## Git Workflow

Default policy — nuanced, not a hard rule: ask if a specific task calls for
something different, but absent other instructions:

1. **Branch** — work on a branch, never directly on `main`. Create the branch
   (`git checkout -b <name>`) *before* the first commit — never commit while
   on `main` and rename the branch afterward, since that can leave the
   branch's upstream tracking pointed at `origin/main` and let a later push
   land directly on `main` unnoticed. Group related changes on the same
   branch instead of opening a new one per small change.
2. **Commit** — one commit per subject, Conventional Commits format mandatory
   (see Commit conventions above).
3. **Push** — only once it looks safe to do so; a human review of the diff
   first is recommended for anything non-trivial. Ask if unsure.
4. **Pull Request** — open one once pushed.
5. **Merge** — never merge. Merging is always a human decision.

A narrow, temporary carve-out (e.g. "push straight to `main` for this one fix")
may be granted in conversation for a specific piece of work — treat it as
scoped to exactly what was said, never as a standing precedent to reuse
elsewhere or later without asking again.

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

**Rust:**

```rust
// This file is part of helpers4.
// Copyright (C) 2025 baxyz
// SPDX-License-Identifier: LGPL-3.0-or-later
```

`psi-header` (VS Code extension) injects these automatically.
