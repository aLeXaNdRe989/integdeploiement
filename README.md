# Formulaire d'enregistrement avec validation

Ce projet est une application web en React permettant à un utilisateur de s'enregistrer via un formulaire avec les fonctionnalités suivantes :

- Validation des champs en temps réel.
- Sauvegarde des données dans le Local Storage.
- Affichage de notifications de succès ou d'erreur.
- Blocage de l'accès au bouton de sauvegarde tant que les champs ne sont pas valides.

Le projet inclut des tests unitaires et d'intégration avec une couverture de 100 %, un déploiement automatisé avec GitHub Actions, et un rapport de couverture accessible via Codecov.

---

## Fonctionnalités

### Formulaire d'enregistrement
Le formulaire inclut les champs suivants :
- **Nom** : Doit être valide (pas de caractères spéciaux ni de chiffres, mais accepte les accents, tréma, tirets, etc.).
- **Prénom** : Même validation que pour le nom.
- **E-mail** : Doit être un e-mail valide.
- **Date de naissance** : Doit indiquer que l'utilisateur a au moins 18 ans.
- **Ville** : Doit être valide (pas de caractères spéciaux ni de chiffres, mais accepte les accents).
- **Code postal** : Doit respecter le format français (5 chiffres).

### Validation
- Les messages d'erreur sont affichés sous les champs invalides.
- Le bouton "Sauvegarder" est désactivé tant que tous les champs ne sont pas valides.
- Si les champs sont valides :
    - Une notification de succès s'affiche.
    - Les données sont sauvegardées dans le Local Storage.
    - Le formulaire est réinitialisé.

### Tests
- **Unitaires** :
    - Vérification des formats (nom, e-mail, code postal, etc.).
    - Calcul de l'âge.
- **Intégration** :
    - Désactivation du bouton si les champs ne sont pas remplis.
    - Sauvegarde dans le Local Storage.
    - Affichage des notifications.

---

### Scripts
- npm start : Lance le serveur de développement.
- npm run build : Génère une version optimisée pour la production.
- npm test : Lance les tests unitaires.
- npm run test:coverage : Génère un rapport de couverture.
- npm run lint : Analyse le code pour détecter les erreurs.

