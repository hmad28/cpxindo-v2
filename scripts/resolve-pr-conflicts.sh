#!/usr/bin/env bash
set -euo pipefail

BASE_BRANCH="${1:-main}"
REMOTE="${2:-origin}"

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "Remote '$REMOTE' tidak ditemukan."
  echo "Tambahkan remote terlebih dahulu:"
  echo "  git remote add origin <URL_REPOSITORY_GITHUB>"
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Working tree harus bersih sebelum merge. Commit atau stash perubahan terlebih dahulu."
  exit 1
fi

CURRENT_BRANCH="$(git branch --show-current)"
if [[ -z "$CURRENT_BRANCH" ]]; then
  echo "Jalankan script ini dari feature branch, bukan detached HEAD."
  exit 1
fi

echo "Mengambil $REMOTE/$BASE_BRANCH..."
git fetch "$REMOTE" "$BASE_BRANCH"

set +e
git merge --no-commit --no-ff "$REMOTE/$BASE_BRANCH"
MERGE_EXIT=$?
set -e

if [[ $MERGE_EXIT -ne 0 ]]; then
  CONFLICTS="$(git diff --name-only --diff-filter=U)"
  if [[ -z "$CONFLICTS" ]]; then
    echo "Merge gagal, tetapi tidak ada conflict marker yang ditemukan."
    exit "$MERGE_EXIT"
  fi

  echo "Mempertahankan implementasi full-stack dari branch '$CURRENT_BRANCH' untuk file konflik:"
  while IFS= read -r file; do
    [[ -z "$file" ]] && continue
    echo "  - $file"
    git checkout --ours -- "$file"
    git add "$file"
  done <<< "$CONFLICTS"
fi

if git diff --name-only --diff-filter=U | grep -q .; then
  echo "Masih ada konflik yang belum terselesaikan:"
  git diff --name-only --diff-filter=U
  exit 1
fi

git commit -m "Merge $BASE_BRANCH and resolve storefront conflicts"

echo
echo "Konflik selesai. Push branch dengan:"
echo "  git push $REMOTE $CURRENT_BRANCH"
