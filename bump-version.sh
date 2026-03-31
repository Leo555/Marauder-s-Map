#!/bin/bash
# bump-version.sh — 更新 JS 模块的版本号（缓存破坏）
# 用法: ./bump-version.sh         (自动用当前时间戳)
#       ./bump-version.sh 2.0     (指定版本号)

cd "$(dirname "$0")"

if [ -n "$1" ]; then
  VER="$1"
else
  VER="$(date +%Y%m%d%H%M)"
fi

echo "Bumping version to: $VER"

# 替换 index.html 中 JS 的 ?v=xxx
sed -i.bak "s/app\.js?v=[^\"']*/app.js?v=$VER/g" index.html && rm -f index.html.bak

# 替换 index.html 中 CSS 的 ?v=xxx
sed -i.bak "s/\(css\/[^\"']*\)\.css?v=[^\"']*/\1.css?v=$VER/g" index.html && rm -f index.html.bak

# 替换 JS 文件中 import 路径的 ?v=xxx
for f in js/*.js data/*.js; do
  if [ -f "$f" ]; then
    sed -i.bak "s/?v=[^\"']*/?v=$VER/g" "$f" && rm -f "$f.bak"
  fi
done

echo "Done! All resources updated to v=$VER"
echo ""
grep -rn "?v=" index.html js/*.js data/*.js 2>/dev/null
