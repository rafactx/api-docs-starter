---
title: Pagination et liens
description: "Lire de grandes collections et suivre les liens entre ressources."
---

# Pagination et liens

## Pagination

Les collections susceptibles de devenir volumineuses (magasins, produits, commerciaux terrain, réponses aux questionnaires) sont paginées. Envoyez `page` (à partir de 1) et `size` (jusqu’à 200, 50 par défaut) :

```http
GET /api/v3/workspaces/7/reps?page=2&size=100
```

Chaque page a la même enveloppe :

```json
{
  "items": [{ "id": 57, "name": "Ana Costa" }],
  "page": 2,
  "size": 100,
  "totalItems": 1280
}
```

Continuez à demander la page suivante jusqu’à ce que `page * size >= totalItems`.

::: code-group

```python [Python]
def all_reps(session, workspace_id):
    page = 1
    while True:
        body = session.get(
            f"{BASE}/v3/workspaces/{workspace_id}/reps",
            params={"page": page, "size": 200},
        ).json()
        yield from body["items"]
        if page * body["size"] >= body["totalItems"]:
            return
        page += 1
```

```javascript [JavaScript]
async function* allReps(workspaceId) {
  for (let page = 1; ; page++) {
    const res = await api(`/v3/workspaces/${workspaceId}/reps?page=${page}&size=200`)
    const body = await res.json()
    yield* body.items
    if (page * body.size >= body.totalItems) return
  }
}
```

:::

## Liens entre ressources

Les ressources v3 incluent un champ `_link` contenant leur URL canonique :

```json
{
  "id": 4021,
  "name": "Bom Preço - Paulista",
  "_link": "https://demo.shelfline.example/api/v3/workspaces/7/stores/4021"
}
```

Privilégiez le suivi de `_link` plutôt que la construction manuelle des URL : si une ressource est déplacée, le lien reste correct.

## Synchronisation incrémentale

Pour tenir à jour une copie des réponses aux questionnaires, conservez la valeur `submittedAt` la plus récente que vous avez vue et transmettez-la en tant que `since` à l’exécution suivante :

```http
GET /api/v3/workspaces/7/surveys/640/responses?since=2025-03-14T12:58:40Z
```

::: tip Pas un flux en temps réel
Interroger l’API toutes les quelques minutes convient. Si vous avez besoin de chaque modification en direct, l’API n’est pas le bon outil : demandez plutôt un export en masse.
:::
