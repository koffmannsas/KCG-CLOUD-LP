# CHANGELOG

## Sprint 01 - Production Readiness (OPERATION PHOENIX)

### Ajouts et Modifications
- **Package.json :** Remplacement de `react-example` par `kcg-cloud-lp`. Ajout des meta informations `description`, `author`, `repository`, `homepage` et `keywords` pour correspondre au branding KCG.
- **Documentation :** Réécriture totale du `README.md` en une documentation de niveau Enterprise (Architecture, Scripts, Lancement).
- **SEO & Méta-données :** Modification massive de `index.html`. Ajout du `<title>` institutionnel, `meta description`, balises OpenGraph, Twitter Cards, `theme-color`, et déclaration `JSON-LD`.
- **Fichiers Publics :** Ajout de `robots.txt`, `sitemap.xml`, et `manifest.webmanifest`.
- **Sécurité :** Ajout d'une balise `Content-Security-Policy` robuste, `X-Content-Type-Options` et `Referrer-Policy`.

### Vérifications
- Le build s'exécute correctement via `npm run build` sans erreur de TS ni régression visuelle liée au framework de base.
