---
title: Paginação e links
description: Como ler coleções grandes e seguir os links dos recursos.
---

# Paginação e links

## Paginação

Coleções que podem crescer muito (lojas, produtos, promotores, respostas de pesquisa) são paginadas. Envie `page` (começando em 1) e `size` (até 200, padrão 50):

```http
GET /api/v3/workspaces/7/reps?page=2&size=100
```

Toda página tem o mesmo envelope:

```json
{
  "items": [{ "id": 57, "name": "Ana Costa" }],
  "page": 2,
  "size": 100,
  "totalItems": 1280
}
```

Continue pedindo a próxima página até que `page * size >= totalItems`.

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

## Links de recursos

Os recursos da v3 incluem um `_link` com sua URL canônica:

```json
{
  "id": 4021,
  "name": "Bom Preço - Paulista",
  "_link": "https://demo.shelfline.example/api/v3/workspaces/7/stores/4021"
}
```

Prefira seguir o `_link` a montar as URLs por conta própria: se um recurso mudar de lugar, o link continua correto.

## Sincronização incremental

Para manter uma cópia das respostas de pesquisa atualizada, guarde o `submittedAt` mais recente que você já viu e envie-o como `since` na próxima execução:

```http
GET /api/v3/workspaces/7/surveys/640/responses?since=2025-03-14T12:58:40Z
```

::: tip Não é um feed em tempo real
Consultar a cada poucos minutos é suficiente. Se você precisa de cada alteração no momento em que acontece, a API não é a ferramenta certa: peça uma exportação em lote.
:::
