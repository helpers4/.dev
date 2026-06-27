# Claude Code — helpers4 workspace

Full org-wide rules (commit format, license headers, git restrictions) live in
[AGENTS.md](AGENTS.md). This file adds Claude Code-specific context.

## Workspace layout

All repos are bind-mounted at `/workspaces/<name>` and open together in
`helpers4.code-workspace`:

| Path | Repo | Role |
| ---- | ---- | ---- |
| `/workspaces/.dev` | `.dev` | Orchestration — canonical AGENTS.md, devcontainer, scripts |
| `/workspaces/devcontainer` | `devcontainer` | DevContainer Features published to GHCR |
| `/workspaces/typescript` | `typescript` | Tree-shakable TS utility library |
| `/workspaces/action` | `action` | Reusable GitHub Actions |
| `/workspaces/website` | `website` | Astro + Starlight docs site (helpers4.dev) |
| `/workspaces/.github` | `.github` | Org GitHub config (workflows, templates) |

## Cross-repo commands (run from `/workspaces/.dev`)

```bash
pnpm run status:all   # git status -sb in every repo
pnpm run fetch:all    # git fetch --all --prune in every repo
pnpm run pull:all     # git pull --rebase in every repo
pnpm run branch:all   # show active branch in every repo
pnpm run build:all    # pnpm build in every repo
pnpm run test:all     # pnpm test in every repo
```

## Common gotchas

**Adding a devcontainer feature** (in `/workspaces/devcontainer`): checklist in order —
`src/<name>/devcontainer-feature.json`, `install.sh`, `README.md`,
`test/<name>/test.sh`, `scopes.json` (add feature name),
both test workflow matrices (`pr-validation.yml` + `test.yml`), `AGENTS.md` features table.
Missing the scope in `scopes.json` breaks PR CI.

**Commit scopes**: always read `scopes.json` at the active repo root before choosing a scope.
Never invent a scope that isn't listed. Full type→emoji mapping: `/workspaces/.dev/commit-convention.json`.
Use `/commit` (Claude Code slash command) to auto-generate a message from staged changes.

**License header**: every new source file needs the LGPL-3.0 header — see AGENTS.md for
the exact comment syntax per language (TS/JS vs Bash).

**Website docs** are auto-generated from sibling repos on release — never edit files under
`/workspaces/website/src/content/docs/{typescript,devcontainer,action}/` by hand.

## AI persistence

`~/.claude` is bind-mounted from the host and symlinked at every container start by
`claude-dev`. Memory, credentials, and settings survive all rebuilds.
The auto-memory directory for this workspace is `~/.claude/projects/-workspaces--dev/memory/`.
