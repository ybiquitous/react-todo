#!/bin/bash
set -e

TARGET_BRANCH=production

NODE_ENV=production yarn build

git add --force public/

git commit \
    --no-verify \
    --author="Travis <10koba01@gmail.com>" \
    --message="build files to deploy"

git push --force --quiet \
    "https://${GH_TOKEN}@github.com/ybiquitous/react-todo.git" \
    master:$TARGET_BRANCH
#    >/dev/null 2>&1
