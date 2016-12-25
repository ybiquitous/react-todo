#!/bin/bash
set -e

TARGET_BRANCH=production

git branch -D $TARGET_BRANCH || true

git checkout -b $TARGET_BRANCH remotes/origin/$TARGET_BRANCH

NODE_ENV=production yarn build

git add --force public/

git commit \
    --no-verify \
    --author="Travis <10koba01@gmail.com>" \
    --message="build files to deploy"

git push --quiet --force origin $TARGET_BRANCH
