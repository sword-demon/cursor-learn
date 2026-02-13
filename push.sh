#!/bin/bash

# 推送代码到 GitCode 和 GitHub 双仓库
# 用法: ./push.sh [branch]

BRANCH="${1:-main}"

echo "推送分支: $BRANCH"
echo ""

echo "→ 推送到 GitCode (origin)..."
git push origin "$BRANCH"
ORIGIN_STATUS=$?

echo ""
echo "→ 推送到 GitHub (github)..."
git push github "$BRANCH"
GITHUB_STATUS=$?

echo ""
echo "--- 结果 ---"
[ $ORIGIN_STATUS -eq 0 ] && echo "GitCode: 成功" || echo "GitCode: 失败"
[ $GITHUB_STATUS -eq 0 ] && echo "GitHub:  成功" || echo "GitHub:  失败"
