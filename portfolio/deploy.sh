#!/bin/bash

# Create dist directory
mkdir -p dist

# Copy files to dist
cp -r index.html css js images dist/

# Minify CSS
npx cleancss -o dist/css/styles.min.css css/styles.css

# Minify JS
npx uglify-js js/main.js -o dist/js/main.min.js

# Optimize images
npx imagemin images/* -o dist/images

echo "Portfolio built successfully!" 