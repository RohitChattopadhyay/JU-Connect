#!/bin/bash
if [ -e ./public/index.html ]
then
    echo "Gatsby build present, Skipping gatsby build"
else
    echo "Building Gatsby"
    gatsby build
fi
echo "Starting Node Server"
node ./backend/app.js
