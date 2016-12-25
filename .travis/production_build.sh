#!/bin/bash
set -e

NODE_ENV=production yarn build

git add --force public/

git commit \
    --no-verify \
    --author="Travis <10koba01@gmail.com>" \
    --message="build files to deploy"

git branch -a
git push --quiet --force origin production
