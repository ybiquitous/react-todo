#!/bin/bash
set -e

NODE_ENV=production yarn build

git add --force public/

git commit \
    --no-verify \
    --author="Travis <10koba01@gmail.com>" \
    --message="build files to deploy"

git push --quiet --force "https://${GH_TOKEN}@github.com/ybiquitous/react-todo.git" production 2>/dev/null
