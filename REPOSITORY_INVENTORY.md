# INVENTAIRE DU DÉPÔT

## Informations Git
- Branches : `main`, `jules-4281418890105473821-40661232` (courante)
- Tags : Aucun
- Releases : Aucune

## Infrastructure & CI/CD
- Workflows GitHub Actions : Aucun (le dossier `.github/workflows` n'existe pas)
- Variables d'environnement attendues : `GEMINI_API_KEY` (via `.env.local` / `.env.example`)
- Secrets attendus : Aucun explicitement défini outre la clé API
- Hooks : Aucun

## Codebase & Dépendances
- Dépendances principales : `@google-cloud/text-to-speech`, `@google/genai`, `@react-three/drei`, `@react-three/fiber`, `express`, `openai`, `react`, `react-dom`, `three`, `vite`, `zustand`
- Submodules : Aucun
- Assets : Images et CSS dans `src/assets` ou `public` générés/copiés lors du build
- Fichiers générés : Répertoire `dist` contenant les artefacts de production
- Documentation : `README.md`, `MIGRATION_AUDIT.md`, `REPOSITORY_INVENTORY.md`, `KCG_CLOUD_MIGRATION_REPORT.md`

Inventaire généré dans le cadre de la Phase 0 de l'Audit Pré-Migration.
