# Koffmann Capital Group | KCG CLOUD LP

Bienvenue sur le dépôt officiel de la **Landing Page Institutionnelle** de Koffmann Capital Group.
Ce projet représente la vitrine technologique et financière du groupe, conçu avec un niveau d'exigence *Enterprise*.

## 🚀 Présentation
KCG-CLOUD-LP est l'infrastructure frontend publique du groupe, intégrant :
- Le portail d'intelligence stratégique.
- L'expérience 3D interactive de la "War Room".
- Le streaming audio de la KCG Strategic Radio.

## 🛠 Stack Technique
- **Framework :** React 19 + TypeScript
- **Build Tool :** Vite + ESBuild (Server)
- **Styling :** TailwindCSS v4 + Motion
- **3D Engine :** Three.js + React Three Fiber / Drei
- **Backend :** Express (Node.js) via `server.ts`

## ⚙️ Installation & Lancement

1. **Installer les dépendances :**
   ```bash
   npm install
   ```
2. **Configurer l'environnement :**
   Copiez `.env.example` vers `.env.local` et ajoutez votre `GEMINI_API_KEY`.
3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```

## 🏗 Scripts Disponibles
- `npm run dev` : Lance le serveur frontend et backend en mode développement.
- `npm run build` : Compile le projet pour la production (Vite + ESBuild).
- `npm run lint` : Vérifie le typage TypeScript.
- `npm run start` : Lance le serveur de production compilé.

## 🏛 Architecture & Conventions
- `src/components/` : Composants UI réutilisables.
- `src/intelligence/` : Moteurs d'analyse et d'orchestration cognitive.
- `src/core/` : Bus d'événements et orchestrateur central.
- `public/` : Assets statiques et manifestes SEO/PWA.

## 📄 Licence
Copyright © 2026 Koffmann Capital Group. Tous droits réservés.
Propriété exclusive de Koffmann SAS. Code source confidentiel.
