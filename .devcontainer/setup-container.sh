#!/usr/bin/env bash
# This file is part of helpers4.
# Copyright (C) 2025 baxyz
# SPDX-License-Identifier: LGPL-3.0-or-later
#
# helpers4 orchestrator — devcontainer setup
# -----------------------------------------------------------------------------
# For every sibling repo declared in $HELPERS4_REPOS, ensure it exists at
# /workspaces/<repo>. Each lives on its own named Docker volume (see
# devcontainer.json's "mounts"), not a host bind mount — this loop only
# actually clones on a fresh volume (first-ever run, or after a full
# teardown: `docker volume rm`, deleted Codespace); a plain "Rebuild
# Container" keeps whatever was already cloned/committed here.
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
