#!/bin/bash

# Remove empty files
find . -type f -empty -delete

# Remove empty directories
find . -type d -empty -delete

# Remove specific unused files (add more patterns as needed)
rm -f *.bak
rm -f *.tmp
rm -f *.log
rm -f *copy*
rm -f styles.css.old
rm -f main.js.old

# Remove specific directories if they exist and are not needed
rm -rf node_modules     # Only if you're not using npm
rm -rf .git/tmp        # Temporary git files
rm -rf dist            # Build directory if not needed
rm -rf temp
rm -rf .cache 