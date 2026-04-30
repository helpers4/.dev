#!/usr/bin/env bash
# This file is part of helpers4.
# Copyright (C) 2025 baxyz
# SPDX-License-Identifier: LGPL-3.0-or-later
#
# helpers4 orchestrator — devcontainer setup
# -----------------------------------------------------------------------------
# 1. For every sibling repo declared in $HELPERS4_REPOS, ensure it exists at
#    /workspaces/<repo>. If the bind-mount target is empty (Codespaces or
#    fresh machine), fall back to `git clone`.
# 2. Run `pnpm install` on each sibling that has a package.json (best effort).
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

if command -v pnpm >/dev/null 2>&1; then
  for repo in $REPOS; do
    target="/workspaces/${repo}"
    if [ -f "${target}/package.json" ]; then
      echo "📦 pnpm install — ${repo}"
      (cd "${target}" && pnpm install --prefer-offline) \
        || echo "⚠️  pnpm install failed in ${repo} (continuing)"
    fi
  done
fi

echo "🎉 helpers4 orchestrator ready."
echo "   Open helpers4.code-workspace to load every repo at once."
echo "   Try: pnpm run status:all | pull:all | branch:all"
