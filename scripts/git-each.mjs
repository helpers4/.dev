#!/usr/bin/env node
/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: LGPL-3.0-or-later
 *
 * Run a git command in every sibling helpers4 repo.
 * Usage: node scripts/git-each.mjs <git-args...>
 */
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPOS = [".dev", ".github", "action", "devcontainer", "typescript", "website"];
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const args = process.argv.slice(2);
if (args.length === 0) {
	console.error("Usage: git-each.mjs <git-args...>");
	process.exit(2);
}

let failed = 0;
for (const repo of REPOS) {
	const cwd = repo === ".dev" ? root : resolve(root, "..", repo);
	if (!existsSync(resolve(cwd, ".git"))) {
		console.warn(`⚠️  ${repo}: not a git repo (skipped)`);
		continue;
	}
	console.log(`\n━━━ ${repo} — git ${args.join(" ")} ━━━`);
	const r = spawnSync("git", args, { cwd, stdio: "inherit" });
	if (r.status !== 0) failed++;
}
process.exit(failed ? 1 : 0);
