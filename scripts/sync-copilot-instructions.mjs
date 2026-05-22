#!/usr/bin/env node
/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: LGPL-3.0-or-later
 *
 * Generate .vscode/copilot-commit.md for every helpers4 repo from its
 * conventionalCommits.scopes setting. The generated file is referenced by
 * github.copilot.chat.commitMessageGeneration.instructions via the "file"
 * property, so Copilot always sees the correct scope list without reading
 * VS Code settings dynamically (which it cannot do at generation time).
 *
 * Usage:  node scripts/sync-copilot-instructions.mjs
 *         pnpm sync-copilot
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const devRoot = resolve(__dirname, "..");
const orgRoot = resolve(devRoot, "..");

const REPOS = [
  { name: ".dev", path: devRoot },
  { name: ".github", path: resolve(orgRoot, ".github") },
  { name: "action", path: resolve(orgRoot, "action") },
  { name: "devcontainer", path: resolve(orgRoot, "devcontainer") },
  { name: "typescript", path: resolve(orgRoot, "typescript") },
  { name: "website", path: resolve(orgRoot, "website") },
];

/**
 * Read conventionalCommits.scopes from a repo's .vscode/settings.json.
 * Strips JSONC line comments before parsing.
 * @param {string} repoPath
 * @returns {string[] | null}
 */
function readScopes(repoPath) {
  const settingsPath = resolve(repoPath, ".vscode", "settings.json");
  if (!existsSync(settingsPath)) return null;
  const raw = readFileSync(settingsPath, "utf8");
  // Strip JSONC single-line comments (// ...) to allow parsing
  const stripped = raw.replace(/\/\/[^\n]*/g, "");
  try {
    const parsed = JSON.parse(stripped);
    const scopes = parsed["conventionalCommits.scopes"];
    return Array.isArray(scopes) && scopes.length > 0 ? scopes : null;
  } catch {
    return null;
  }
}

/**
 * Generate the markdown content for .vscode/copilot-commit.md.
 * @param {string} repoName
 * @param {string[]} scopes
 * @returns {string}
 */
function generateMarkdown(repoName, scopes) {
  const scopeList = scopes.join(", ");
  return `<!-- auto-generated — source of truth: conventionalCommits.scopes in .vscode/settings.json -->
<!-- to regenerate: run \`pnpm sync-copilot\` in the .dev orchestrator repo -->

Commit messages for the **${repoName}** repository must use Conventional Commits + gitmoji:

\`<type>(<scope>): <emoji> <description>\`

**Allowed scopes** (pick one, or omit the scope entirely):
${scopes.map((s) => `- \`${s}\``).join("\n")}

Never invent a scope that is not in the list above.

**Type → gitmoji** — pick the most specific emoji that fits the change:

| Type | Primary | More specific alternatives |
|------|---------|---------------------------|
| \`feat\` | ✨ | 🚸 UX · ♿️ a11y · 🌐 i18n · 💬 text/literals |
| \`fix\` | 🐛 | 🚑️ hotfix · 🔒️ security · 🩹 trivial · 🥅 caught errors · 🚨 linter warnings · ✏️ typo |
| \`docs\` | 📝 | 💡 source comments · 📄 license |
| \`refactor\` | ♻️ | 🎨 structure · 🔥 remove code · ⚰️ dead code · 🚚 move/rename |
| \`test\` | ✅ | 🧪 add failing test · 💚 fix CI test |
| \`chore\` | 🔧 | 🔖 tag/release · 📌 pin deps · 🩺 healthcheck · 🙈 gitignore |
| \`perf\` | ⚡️ | |
| \`style\` | 💄 | 🎨 code style |
| \`ci\` | 👷 | 💚 fix CI |
| \`build\` | 📦️ | ➕ add dep · ➖ remove dep · ⬆️ upgrade dep · ⬇️ downgrade dep |
| \`revert\` | ⏪️ | |

**Rules:**
- Always include exactly **one** emoji, placed between \`:\` and the description
- Description: ≤72 chars · English · lowercase · imperative mood · no trailing period
- Multiple logical changes → keep the dominant type in the subject line and use a bullet list in the body
`;
}

let changed = 0;
let skipped = 0;

for (const { name, path: repoPath } of REPOS) {
  const scopes = readScopes(repoPath);
  if (!scopes) {
    console.warn(`⚠️  ${name}: no conventionalCommits.scopes found — skipped`);
    skipped++;
    continue;
  }

  const outputPath = resolve(repoPath, ".vscode", "copilot-commit.md");
  const content = generateMarkdown(name, scopes);

  // Only write if content changed (avoid unnecessary dirty file)
  const existing = existsSync(outputPath) ? readFileSync(outputPath, "utf8") : null;
  if (existing === content) {
    console.log(`  ${name}: up to date`);
  } else {
    writeFileSync(outputPath, content, "utf8");
    console.log(`✅ ${name}: generated .vscode/copilot-commit.md (${scopes.length} scopes)`);
    changed++;
  }
}

console.log(`\n${changed} file(s) updated, ${skipped} skipped.`);
