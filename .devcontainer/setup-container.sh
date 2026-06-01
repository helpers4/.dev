#!/usr/bin/env bash
# This file is part of helpers4.
# Copyright (C) 2025 baxyz
# SPDX-License-Identifier: LGPL-3.0-or-later
#
# helpers4 orchestrator — devcontainer setup
# -----------------------------------------------------------------------------
# For every sibling repo declared in $HELPERS4_REPOS, ensure it exists at
# /workspaces/<repo>. If the bind-mount target is empty (Codespaces or
# fresh machine), fall back to `git clone`.
# pnpm install is handled by the package-auto-install feature (autoDiscover).
# -----------------------------------------------------------------------------
set -euo pipefail

echo "🎼 Setting up helpers4 orchestrator…"

REPOS="${HELPERS4_REPOS:-.github action devcontainer typescript website}"
ORG_URL="https://github.com/helpers4"

for repo in $REPOS; do
  target="/workspaces/${repo}"
  if [ -d "${target}/.git" ] || [ -f "${target}/package.json" ] || [ -n "$(ls -A "${target}" 2>/dev/null || true)" ]; then
    echo "✅ ${repo}: already present (bind-mounted)"
    continue
  fi

  url="${ORG_URL}/${repo}.git"
  echo "📥 ${repo}: missing — cloning from ${url}"
  rm -rf "${target}" 2>/dev/null || true
  git clone "${url}" "${target}" || echo "⚠️  ${repo}: clone failed (continuing)"
done

echo "🎉 helpers4 orchestrator ready."
echo "   Open helpers4.code-workspace to load every repo at once."
echo "   Try: pnpm run status:all | pull:all | branch:all"
