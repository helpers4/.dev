#!/usr/bin/env node
/**
 * This file is part of helpers4.
 * Copyright (C) 2025 baxyz
 * SPDX-License-Identifier: LGPL-3.0-or-later
 *
 * Run a pnpm script in every sibling helpers4 repo that exposes it.
 * Usage: node scripts/run-each.mjs <script-name>
 */
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPOS = [".github", "action", "devcontainer", "typescript", "website"];
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const script = process.argv[2];
if (!script) {
	console.error("Usage: run-each.mjs <pnpm-script>");
	process.exit(2);
}

const results = [];
for (const repo of REPOS) {
	const cwd = resolve(root, "..", repo);
	if (!existsSync(resolve(cwd, "package.json"))) {
		console.warn(`⚠️  ${repo}: no package.json (skipped)`);
		continue;
	}

	if (script !== "install") {
		const pkg = JSON.parse(readFileSync(resolve(cwd, "package.json"), "utf8"));
		if (!pkg.scripts || !pkg.scripts[script]) {
			console.warn(`⚠️  ${repo}: no "${script}" script (skipped)`);
			continue;
		}
	}

	console.log(`\n━━━ ${repo} — pnpm ${script} ━━━`);
	const args = script === "install" ? ["install"] : ["run", script];
	const r = spawnSync("pnpm", args, { cwd, stdio: "inherit" });
	results.push({ repo, code: r.status ?? -1 });
}

const failed = results.filter((r) => r.code !== 0);
console.log("\n━━━ Summary ━━━");
for (const r of results) {
	console.log(`  ${r.code === 0 ? "✅" : "❌"} ${r.repo} (${r.code})`);
}
process.exit(failed.length ? 1 : 0);
