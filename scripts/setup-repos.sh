#!/usr/bin/env bash
# This file is part of helpers4.
# Copyright (C) 2025 baxyz
# SPDX-License-Identifier: LGPL-3.0-or-later
#
# Create relative symlinks under .dev/.repos/ pointing to every sibling
# helpers4 repository. The links use the form `../../<name>` so they
# resolve identically on host (helpers4/<name>) and inside the dev
# container (/workspaces/<name>) — provided the devcontainer mounts each
# sibling at /workspaces/<name> (see .devcontainer/devcontainer.json).
#
# Idempotent: safe to re-run.

set -euo pipefail

REPOS=(.github action devcontainer typescript website)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEV_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
REPOS_DIR="${DEV_DIR}/.repos"

mkdir -p "${REPOS_DIR}"

for repo in "${REPOS[@]}"; do
  link="${REPOS_DIR}/${repo}"
  target="../../${repo}"
  ln -sfn "${target}" "${link}"
  echo "✓ ${link} -> ${target}"
done

echo "Done. Open helpers4.code-workspace to load every repo."
