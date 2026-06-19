#!/usr/bin/env bash
# Hook bolankoko-studio — garde-fou post-édition
# Déclenché après chaque Edit/Write. Vérifie les 3 invariants projet.

file_path=$(python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    ti = data.get('tool_input', data)
    print(ti.get('file_path', ''))
except:
    print('')
" 2>/dev/null)

[[ "$file_path" == */src/* ]] || exit 0
[[ -f "$file_path" ]] || exit 0

errors=()

# 1. Pas de couleurs Tailwind arbitraires (utiliser bg-paper/text-ink/bg-terracotta)
if grep -qE 'bg-\[#|text-\[#|border-\[#|fill-\[#|stroke-\[#' "$file_path"; then
  errors+=("Couleur Tailwind arbitraire — utiliser bg-paper, text-ink, bg-terracotta, text-terracotta")
fi

# 2. N8N_WEBHOOK_URL interdit dans les .astro (exposé au navigateur)
if [[ "$file_path" == *.astro ]] && grep -q 'N8N_WEBHOOK_URL' "$file_path"; then
  errors+=("N8N_WEBHOOK_URL dans un .astro → secret exposé côté client !")
fi

# 3. Pas de bloc <style> dans les composants (classes utilitaires → global.css)
if [[ "$file_path" == */components/*.astro ]] && grep -q '<style' "$file_path"; then
  errors+=("<style> dans un composant → déplacer dans src/styles/global.css")
fi

if [[ ${#errors[@]} -gt 0 ]]; then
  echo "HOOK bolankoko-studio — $file_path"
  for err in "${errors[@]}"; do
    echo "  • $err"
  done
  exit 2
fi

exit 0
