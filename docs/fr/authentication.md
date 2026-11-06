---
title: Authentification
description: "Identifiants et en-têtes requis pour l’API Shelfline Field."
---

# Authentification

L’API utilise l’**authentification HTTP Basic** via HTTPS. Créez un *utilisateur d’intégration* dans l’administration Shelfline pour chaque système qui appelle l’API, plutôt que de partager l’identifiant d’une personne.

## En-têtes requis

<ApiCard
  title="request.headers"
  :items="[
    { key: 'Authorization', description: '<code>Basic base64(username:password)</code>. Requis pour chaque requête.' },
    { key: 'X-Client-Name', description: 'Nom de votre intégration, par exemple <code>erp-sync</code>. Affiché dans les journaux d’audit et utilisé pour la limitation de débit. Requis.' },
    { key: 'Api-Version', description: 'Date de publication du contrat v3 pour lequel votre intégration a été développée, par exemple <code>2025-01-15</code>. v3 uniquement.' }
  ]"
/>

## Construire l’en-tête Authorization

```bash
echo -n "erp-integration:correct-horse-battery" | base64
# ZXJwLWludGVncmF0aW9uOmNvcnJlY3QtaG9yc2UtYmF0dGVyeQ==

Authorization: Basic ZXJwLWludGVncmF0aW9uOmNvcnJlY3QtaG9yc2UtYmF0dGVyeQ==
```

La plupart des clients HTTP le font pour vous : `curl -u user:password`, `requests.get(..., auth=(user, password))`.

::: warning Gardez les identifiants hors du code
Lisez les identifiants depuis des variables d’environnement ou un gestionnaire de secrets. Si un mot de passe fuite, renouvelez-le dans l’administration : seul cet utilisateur d’intégration est concerné.
:::

## Gestion des versions avec Api-Version

Les endpoints v3 sont versionnés par date. Vous envoyez la version pour laquelle votre intégration a été écrite, et la forme de la réponse reste identique même après de nouvelles publications.

```http
Api-Version: 2025-01-15
```

- Lorsqu’une publication introduit un changement incompatible, elle reçoit une nouvelle date. Votre intégration continue de recevoir l’ancienne forme tant que vous ne modifiez pas l’en-tête.
- Si vous omettez l’en-tête, vous obtenez la dernière version. Pratique pour explorer, risqué en production.
- Les endpoints v1 ignorent l’en-tête.

## Trouver votre ID de workspace

L’ID du workspace apparaît dans l’URL de l’administration : `https://demo.shelfline.example/admin/workspaces/7` → `workspaceId = 7`.
