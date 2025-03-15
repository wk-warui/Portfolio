#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🚀 Starting deployment process..."

# Check if git status is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "${RED}⚠️  You have uncommitted changes. Please commit or stash them first.${NC}"
    exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Run pre-deployment checks
echo "🔍 Running pre-deployment checks..."

# Check HTML files
echo "Checking HTML files..."
if [ ! -f "index.html" ]; then
    echo "${RED}❌ index.html not found${NC}"
    exit 1
fi

# Check CSS files
echo "Checking CSS files..."
if [ ! -f "css/styles.css" ]; then
    echo "${RED}❌ styles.css not found${NC}"
    exit 1
fi

# Check JS files
echo "Checking JS files..."
if [ ! -f "js/main.js" ]; then
    echo "${RED}❌ main.js not found${NC}"
    exit 1
fi

# Push to main branch
echo "📤 Pushing to main branch..."
git push origin main

echo "${GREEN}✅ Deployment initiated successfully!${NC}"
echo "🌐 Monitor deployment status at: https://github.com/{username}/{repository}/actions" 