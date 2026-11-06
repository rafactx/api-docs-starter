---
title: Introduction
description: "Ce que fait l’API Shelfline Field et comment envoyer votre première requête."
---

# Introduction

L’API Shelfline Field connecte vos systèmes à Shelfline, une plateforme (fictive) pour les équipes terrain du commerce de détail. Utilisez-la pour synchroniser votre catalogue de magasins et de produits, planifier les tournées de vos commerciaux terrain et lire les questionnaires qu’ils remplissent lors de chaque visite.

::: info Une API de démonstration
Shelfline n’existe pas. Ce portail est un exemple fonctionnel de site de documentation d’API multilingue, et la [référence de l’API](./api-reference) est générée à partir d’une spécification nettoyée par [openapi-fixer](https://github.com/rafactx/openapi-fixer). Les requêtes vers `shelfline.example` ne seront pas résolues.
:::

## URL de base

Chaque client dispose d’un sous-domaine. Tous les endpoints se trouvent sous `/api` :

```text
https://{workspace}.shelfline.example/api
```

Au sein d’un compte, les données sont réparties en **workspaces** (par exemple, un par pays ou par unité commerciale). La plupart des endpoints attendent un `workspaceId` dans le chemin.

## Versions de l’API

| Version | Chemins | Remarques |
| --- | --- | --- |
| v3 | `/v3/workspaces/{workspaceId}/...` | Actuelle. Fixée avec l’en-tête `Api-Version`. |
| v1 | `/v1/{workspaceId}/...` | Héritée. Toujours prise en charge pour les magasins, les produits et les champs de questionnaire. |

Les nouvelles intégrations doivent utiliser la v3 partout où un endpoint existe.

## Votre première requête

::: code-group

```bash [cURL]
curl "https://demo.shelfline.example/api/v3/workspaces/7/stores/4021" \
  -u "$SHELFLINE_USER:$SHELFLINE_PASSWORD" \
  -H "X-Client-Name: erp-sync" \
  -H "Api-Version: 2025-01-15"
```

```javascript [JavaScript]
const auth = btoa(`${process.env.SHELFLINE_USER}:${process.env.SHELFLINE_PASSWORD}`)

const response = await fetch('https://demo.shelfline.example/api/v3/workspaces/7/stores/4021', {
  headers: {
    Authorization: `Basic ${auth}`,
    'X-Client-Name': 'erp-sync',
    'Api-Version': '2025-01-15'
  }
})
const store = await response.json()
```

```python [Python]
import os
import requests

response = requests.get(
    "https://demo.shelfline.example/api/v3/workspaces/7/stores/4021",
    auth=(os.environ["SHELFLINE_USER"], os.environ["SHELFLINE_PASSWORD"]),
    headers={"X-Client-Name": "erp-sync", "Api-Version": "2025-01-15"},
)
store = response.json()
```

:::

::: tip Testez dans un workspace sandbox
Créez un workspace distinct avec son propre utilisateur d’intégration pour le développement, afin que les données de test ne se mélangent jamais aux tournées de production.
:::

## Étapes suivantes

- [Authentification](./authentication) : identifiants et en-têtes requis
- [Pagination et liens](./pagination) : lire de grandes collections
- [Erreurs](./errors) : codes de statut et corps d’erreur
