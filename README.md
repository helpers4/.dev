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

### 2. Surface the siblings inside `.dev/`

The multi-root workspace and the devcontainer reference every sibling repo through symlinks under `.dev/.repos/`. Create them once:

```bash
./.dev/scripts/setup-repos.sh
```

Result:

```
.dev/
├── .repos/
│   ├── .github       -> ../../.github
│   ├── action        -> ../../action
│   ├── devcontainer  -> ../../devcontainer
│   ├── typescript    -> ../../typescript
│   └── website       -> ../../website
├── .devcontainer/
├── .vscode/
├── helpers4.code-workspace
└── ...
```

The links are **relative** (`../../<name>`) so they resolve identically on the host and inside the container.

### 3. Open the multi-root workspace

```bash
code .dev/helpers4.code-workspace
```

VS Code displays all six folders side by side with consistent settings (commit message format, license headers, scopes, agents).

### 4. (Optional) Use the unified DevContainer

When prompted, *Reopen in Container* — or run **Dev Containers: Reopen in Container** from the command palette. The container bind-mounts `.dev` at `/workspaces/.dev` and each sibling at `/workspaces/<name>`, so the symlinks under `.repos/` keep working as-is. The `postCreateCommand` re-runs `setup-repos.sh` to be safe.

## What Lives Here

| File | Purpose |
|------|---------|
| [`helpers4.code-workspace`](./helpers4.code-workspace) | VS Code multi-root workspace + shared settings |
| [`.devcontainer/devcontainer.json`](./.devcontainer/devcontainer.json) | Cross-repo dev environment (Node, pnpm, gh, helpers4 features) |
| [`scripts/setup-repos.sh`](./scripts/setup-repos.sh) | Creates the `.repos/` symlinks to every sibling helpers4 repo |
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
