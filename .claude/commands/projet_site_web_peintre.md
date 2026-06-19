---
description: Audit build Astro + commit. Usage : /projet_site_web_peintre [message optionnel]
allowed-tools: Bash, Read
---

## Contexte projet — bolankoko-studio

**Chemin** : `/home/adsl_2/projet_site_web_peintre`
**Stack** : Astro 5 · Tailwind v4 · TypeScript strict

### Statut git
!`cd /home/adsl_2/projet_site_web_peintre && git status --short`

### Diff résumé
!`cd /home/adsl_2/projet_site_web_peintre && git diff --stat HEAD 2>/dev/null || git diff --stat --cached`

### Message / scope fourni
$ARGUMENTS

---

## Instructions

Exécute les 3 étapes dans l'ordre. Arrête-toi et signale l'erreur si une étape échoue.

### Étape 1 — Audit build
Lance `npm run build` dans `/home/adsl_2/projet_site_web_peintre`.
- **Échec** → affiche les erreurs TypeScript/Astro, stop. Ne commit pas.
- **Succès** → continue.

### Étape 2 — Vérifications sécurité
Depuis `/home/adsl_2/projet_site_web_peintre` :
1. `.env` non commité : `git ls-files .env` doit être vide.
2. Pas de valeurs Tailwind arbitraires en dur : `grep -r 'bg-\[#\|text-\[#\|border-\[#' src/ --include='*.astro' --include='*.ts'` doit être vide.
3. Clé n8n non exposée côté client : `grep -r 'N8N_WEBHOOK_URL' src/ --include='*.astro'` ne doit pas retourner de ligne dans un bloc `<script>` ou front matter exposé.

Si une vérification échoue → signale le problème précisément, stop.

### Étape 3 — Commit
Si les deux étapes précédentes sont OK :
1. `git add -A`
2. Génère un message de commit court au format `type(scope): description` basé sur le diff.
   - Si `$ARGUMENTS` est non vide, utilise-le comme message ou préfixe au message généré.
   - Exemples de types : `fix`, `feat`, `style`, `refactor`, `chore`.
3. `git commit -m "message généré"`

### Résumé final
Affiche une ligne par étape : `✅ build` / `✅ vérifications` / `✅ commit <sha court>`.
En cas d'échec : `❌ <étape> — <raison>`.
