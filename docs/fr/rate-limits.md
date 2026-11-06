---
title: Limites de débit
description: "Limites de requêtes et bonnes pratiques pour les intégrations."
---

# Limites de débit

Les limites s’appliquent par workspace et par `X-Client-Name` :

<ApiCard
  title="limites"
  :items="[
    { key: 'Soutenu', description: '60 requêtes par minute' },
    { key: 'Rafale', description: 'jusqu’à 20 requêtes en une seconde' },
    { key: 'Limite dépassée', description: '<code>429 Too Many Requests</code> avec un en-tête <code>Retry-After</code>' }
  ]"
/>

## Bonnes pratiques

- **Réessayez avec un backoff.** Sur `429`, attendez `Retry-After` secondes. Sur `5xx`, réessayez les requêtes idempotentes (GET, PUT, DELETE) avec un backoff exponentiel et du jitter.
- **Regroupez les écritures.** `POST .../scheduled-visits` accepte une tournée entière en un seul appel : une requête pour 50 visites, et non 50 requêtes.
- **Paginez avec la taille maximale** (`size=200`) pour lire des collections complètes.
- **Mettez en cache ce qui change rarement**, comme les enseignes, les marques et les champs de questionnaire.
- **Synchronisez de façon incrémentale** avec `since` plutôt que de tout relire.

## Méthodes HTTP

<script setup>
const methodsTable = [
  { key: 'GET', description: 'Lecture' },
  { key: 'POST', description: 'Création' },
  { key: 'PUT', description: 'Remplacement (v1)' },
  { key: 'PATCH', description: 'Met à jour uniquement les champs envoyés (v3)' },
  { key: 'DELETE', description: 'Suppression. N’accepte jamais de corps ; les ID vont dans le chemin ou la query string.' }
]
</script>

<ApiCard title="Méthodes HTTP" :items="methodsTable" />
