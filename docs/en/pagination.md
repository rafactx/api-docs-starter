---
title: Pagination and links
description: Reading large collections and following resource links.
---

# Pagination and links

## Pagination

Collections that can grow large (stores, products, field reps, survey responses) are paginated. Send `page` (starting at 1) and `size` (up to 200, default 50):

```http
GET /api/v3/workspaces/7/reps?page=2&size=100
```

Every page has the same envelope:

```json
{
  "items": [{ "id": 57, "name": "Ana Costa" }],
  "page": 2,
  "size": 100,
  "totalItems": 1280
}
```

Keep requesting the next page until `page * size >= totalItems`.

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

## Resource links

v3 resources include a `_link` with their canonical URL:

```json
{
  "id": 4021,
  "name": "Bom Preço - Paulista",
  "_link": "https://demo.shelfline.example/api/v3/workspaces/7/stores/4021"
}
```

Prefer following `_link` over building URLs yourself: if a resource moves, the link stays correct.

## Incremental sync

To keep a copy of survey responses up to date, store the newest `submittedAt` you have seen and pass it as `since` on the next run:

```http
GET /api/v3/workspaces/7/surveys/640/responses?since=2025-03-14T12:58:40Z
```

::: tip Not a real-time feed
Polling every few minutes is fine. If you need every change as it happens, the API is the wrong tool: ask for a bulk export instead.
:::
