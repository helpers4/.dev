<h1 align="center">helpers4 — .dev</h1>

<p align="center">
  <strong>Orchestration workspace for the helpers4 organization. One devcontainer to rule them all.</strong>
</p>

<p align="center">
  <a href="https://github.com/helpers4/.dev/blob/main/LICENSE"><img src="https://img.shields.io/github/license/helpers4/.dev?color=blue" alt="license" /></a>
  <a href="https://github.com/helpers4/.dev"><img src="https://img.shields.io/github/last-commit/helpers4/.dev" alt="last commit" /></a>
</p>

---

## Overview

This repository is the **central orchestrator** for all helpers4 projects. It hosts:

- A unified [VS Code multi-root workspace](./helpers4.code-workspace) opening every sibling repo at once
- A single [DevContainer](./.devcontainer/devcontainer.json) configured for cross-repo development
- The [canonical AGENTS.md](./AGENTS.md) shared by every helpers4 repo (Copilot / AI agents)
- Shared VS Code settings inherited by every folder in the workspace

It does **not** ship runtime code, packages, or actions. Each helpers4 project lives in its own repo.

## Repository Layout

This repo is meant to be cloned **alongside** the other helpers4 repos in a common parent directory:

```
helpers4/
├── .dev/             ← this repo (open helpers4.code-workspace)
├── .github/          ← org-wide GitHub config
├── action/           ← reusable GitHub Actions
├── devcontainer/     ← DevContainer Features (GHCR)
├── typescript/       ← TS helper library
└── website/          ← landing + docs portal
```

## Quick Start

### 1. Clone everything into a single parent

```bash
mkdir helpers4 && cd helpers4
gh repo clone helpers4/.dev
gh repo clone helpers4/.github
gh repo clone helpers4/action
gh repo clone helpers4/devcontainer
gh repo clone helpers4/typescript
gh repo clone helpers4/website
```

### 2. Open the multi-root workspace

```bash
code .dev/helpers4.code-workspace
```

VS Code displays all six folders side by side with consistent settings (commit message format, license headers, scopes, agents). The workspace references siblings via `../<name>` — they live next to `.dev/` on the host, no symlinks needed.

### 3. (Optional) Reopen in DevContainer

When prompted, *Reopen in Container* — or run **Dev Containers: Reopen in Container** from the command palette. The container:

- bind-mounts `.dev/` at `/workspaces/.dev`
- bind-mounts each sibling repo at `/workspaces/<name>` so the same `../<name>` path used by the workspace resolves correctly inside the container
- runs [`setup-container.sh`](./.devcontainer/setup-container.sh) on first start to:
  - clone any sibling repo missing on the host (Codespaces fallback)
  - run `pnpm install` in every sibling that has a `package.json`

### 4. Cross-repo commands

From `.dev/`, run any of:

```bash
pnpm run install:all   # pnpm install in every sibling
pnpm run build:all     # pnpm run build in every sibling that defines it
pnpm run test:all
pnpm run lint:all
pnpm run status:all    # git status -sb in every repo
pnpm run fetch:all     # git fetch --all --prune
pnpm run pull:all      # git pull --rebase --autostash
pnpm run branch:all    # show current branch
```

Powered by [`scripts/run-each.mjs`](./scripts/run-each.mjs) and [`scripts/git-each.mjs`](./scripts/git-each.mjs).

## What Lives Here

| File | Purpose |
|------|---------|
| [`helpers4.code-workspace`](./helpers4.code-workspace) | VS Code multi-root workspace + shared settings |
| [`.devcontainer/devcontainer.json`](./.devcontainer/devcontainer.json) | Cross-repo dev environment (Node, pnpm, gh, helpers4 features) |
| [`.devcontainer/setup-container.sh`](./.devcontainer/setup-container.sh) | postCreateCommand — clone-fallback + pnpm install |
| [`scripts/run-each.mjs`](./scripts/run-each.mjs) | Run a pnpm script in every sibling repo |
| [`scripts/git-each.mjs`](./scripts/git-each.mjs) | Run a git command in every sibling repo |
| [`package.json`](./package.json) | Cross-repo orchestration scripts (`*:all`) |
| [`AGENTS.md`](./AGENTS.md) | Canonical org-wide agent instructions |
| [`.vscode/settings.json`](./.vscode/settings.json) | Settings applied when opening `.dev/` standalone |
| [`LICENSE`](./LICENSE) | LGPL-3.0-or-later |

## Centralization Strategy

- **AGENTS.md** — `.dev/AGENTS.md` holds the canonical org-wide governance (restrictions, commit format, emoji table, repo links). Each project repo keeps its own `AGENTS.md` for project-specific scopes/structure but defers to this one for shared rules.
- **VS Code settings** — Common settings (psi-header, commit message generator, EditorConfig hints) live at the workspace level in [`helpers4.code-workspace`](./helpers4.code-workspace). Per-repo `.vscode/settings.json` only override repo-specific values like `conventionalCommits.scopes`.
- **DevContainer** — A single DevContainer for the whole org, replacing the need for one per repo.

## Repository Links

- Organization: https://github.com/helpers4
- TypeScript: https://github.com/helpers4/typescript
- DevContainer: https://github.com/helpers4/devcontainer
- Actions: https://github.com/helpers4/action
- Website: https://github.com/helpers4/website
- Org config: https://github.com/helpers4/.github

## License

[LGPL-3.0-or-later](./LICENSE)
