---
title: Erreurs
description: "Codes de statut et corps d’erreur renvoyés par l’API Shelfline Field."
---

# Erreurs

<script setup>
const statusTable = [
  { key: '200 / 201 / 204', description: 'Succès. 201 quand une ressource a été créée, 204 quand il n’y a pas de corps.' },
  { key: '400', description: '<code>Bad Request</code> : requête mal formée ou champ invalide.' },
  { key: '401', description: '<code>Unauthorized</code> : identifiants manquants ou invalides.' },
  { key: '404', description: '<code>Not Found</code> : la ressource n’existe pas dans ce workspace.' },
  { key: '429', description: '<code>Too Many Requests</code> : attendez <code>Retry-After</code> secondes.' },
  { key: '5xx', description: 'Erreur serveur. Vous pouvez réessayer sans risque les requêtes idempotentes avec un backoff.' }
]
</script>

<ApiCard title="Codes de statut HTTP" :items="statusTable" />

## Corps d’erreur (v3)

```json
{
  "status": 400,
  "code": "INVALID_FIELD",
  "message": "Request validation failed.",
  "details": [
    { "field": "code", "message": "must be unique in the workspace" }
  ]
}
```

| Champ | Type | Description |
| --- | --- | --- |
| `status` | integer | Code de statut HTTP |
| `code` | string | Code d’erreur stable et lisible par une machine. Basez votre logique sur lui, pas sur `message`. |
| `message` | string | Message lisible par un humain |
| `details` | array | Problèmes au niveau des champs, lorsque le corps de la requête est invalide |

## Corps d’erreur (v1)

Les endpoints hérités renvoient une forme plus réduite :

```json
{ "code": 1001, "message": "Store not found" }
```

## Gérer les erreurs

::: code-group

```javascript [JavaScript]
const res = await fetch(url, { headers })
if (!res.ok) {
  const error = await res.json().catch(() => ({}))
  if (res.status === 429) {
    await sleep(Number(res.headers.get('Retry-After') ?? 1) * 1000)
    // nouvelle tentative
  }
  throw new Error(`${res.status} ${error.code ?? ''}: ${error.message ?? res.statusText}`)
}
```

```python [Python]
response = session.get(url)
if response.status_code == 429:
    time.sleep(int(response.headers.get("Retry-After", "1")))
elif not response.ok:
    error = response.json()
    raise RuntimeError(f"{response.status_code} {error.get('code')}: {error.get('message')}")
```

:::
