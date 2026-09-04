#!/usr/bin/env bash

set -euo pipefail

# ============================================================
# Formify - Environment Setup
# ============================================================

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"
WORKSPACE_FILE="$ROOT_DIR/pnpm-workspace.yaml"

echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Formify · Environment Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo

# ------------------------------------------------------------
# Check pnpm workspace
# ------------------------------------------------------------

if [[ ! -f "$WORKSPACE_FILE" ]]; then
  echo "✗ pnpm-workspace.yaml not found"
  exit 1
fi

echo "✓ pnpm-workspace.yaml found"

# ------------------------------------------------------------
# Create root .env
# ------------------------------------------------------------

if [[ ! -f "$ENV_FILE" ]]; then
  touch "$ENV_FILE"
  echo "✓ Created root .env"
else
  echo "✓ Root .env already exists"
fi

# ------------------------------------------------------------
# Discover workspaces
# ------------------------------------------------------------

echo
echo "→ Discovering workspaces..."

WORKSPACES=()

for BASE_DIR in "$ROOT_DIR/apps" "$ROOT_DIR/packages"; do
  [[ -d "$BASE_DIR" ]] || continue

  for workspace in "$BASE_DIR"/*; do
    [[ -d "$workspace" ]] || continue

    WORKSPACES+=("$workspace")
  done
done

if [[ ${#WORKSPACES[@]} -eq 0 ]]; then
  echo "⚠ No workspace directories discovered."
else
  echo "✓ Found ${#WORKSPACES[@]} workspaces:"

  for workspace in "${WORKSPACES[@]}"; do
    RELATIVE_WORKSPACE="${workspace#"$ROOT_DIR"/}"
    echo "  → $RELATIVE_WORKSPACE"
  done
fi

# ------------------------------------------------------------
# Summary
# ------------------------------------------------------------

echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " Environment setup complete"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo
echo "Root environment:"
echo "  $ENV_FILE"
echo
echo "Workspaces discovered:"
echo "  ${#WORKSPACES[@]}"
echo
echo "No workspace .env symlinks were created."
echo "The root .env is the single source of truth."
echo
