#!/bin/bash

# Release script for memflow-mcp
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

# Default to patch if no argument provided
VERSION_TYPE=${1:-patch}

echo "🚀 Preparing release..."

# Ensure we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Error: Must be on main branch to release. Current branch: $CURRENT_BRANCH"
    exit 1
fi

# Ensure working directory is clean
if ! git diff-index --quiet HEAD --; then
    echo "❌ Error: Working directory is not clean. Please commit your changes."
    exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Run tests
echo "🧪 Running tests..."
npm run lint
npm run build

# Bump version
echo "📝 Bumping version ($VERSION_TYPE)..."
npm version $VERSION_TYPE --no-git-tag-version

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
echo "📦 New version: $NEW_VERSION"

# Commit version bump
git add package.json
git commit -m "chore: bump version to $NEW_VERSION"

# Create and push tag
echo "🏷️ Creating tag v$NEW_VERSION..."
git tag "v$NEW_VERSION"

# Push changes and tag
echo "📤 Pushing changes..."
git push origin main
git push origin "v$NEW_VERSION"

echo "✅ Release v$NEW_VERSION initiated!"
echo "📋 GitHub Actions will automatically publish to NPM."
echo "🔗 Check progress: https://github.com/sacmii/memflow-mcp/actions"
