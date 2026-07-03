# ROLLBACK PROCEDURE

En cas d'échec critique post-déploiement sur `www.koffmann.group` :

1. **Identifier le dernier tag stable :**
   ```bash
   git tag -l
   # Exemple : v0.9.8
   ```

2. **Checkout et Rebuild :**
   ```bash
   git checkout tags/v0.9.8
   npm install
   npm run build
   ```

3. **Redémarrage du service :**
   ```bash
   pm2 restart kcg-server
   ```

*Une interruption de service maximale de 45 secondes est estimée durant le processus.*
