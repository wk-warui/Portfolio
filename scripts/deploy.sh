#!/bin/bash

# Deployment script
echo "Starting deployment..."

# Build the project
npm run build

# Run tests
npm test

# Optimize images
echo "Optimizing images..."
find build/images -type f -name "*.jpg" -exec jpegoptim --strip-all --max=85 {} \;
find build/images -type f -name "*.png" -exec optipng -o5 {} \;

# Deploy to server
echo "Deploying to server..."
rsync -avz --delete build/ user@your-server:/var/www/kelvinwarui.com/

# Clear cache
echo "Clearing cache..."
curl -X PURGE https://kelvinwarui.com/*

echo "Deployment complete!" 