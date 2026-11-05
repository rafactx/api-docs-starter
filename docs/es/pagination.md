---
title: Paginación y enlaces
description: Cómo leer colecciones grandes y seguir los enlaces de los recursos.
---

# Paginación y enlaces

## Paginación

Las colecciones que pueden crecer mucho (tiendas, productos, representantes de campo, respuestas de encuestas) están paginadas. Envía `page` (empieza en 1) y `size` (hasta 200, por defecto 50):

```http
GET /api/v3/workspaces/7/reps?page=2&size=100
```

Todas las páginas tienen la misma estructura:

```json
{
  "items": [{ "id": 57, "name": "Ana Costa" }],
  "page": 2,
  "size": 100,
  "totalItems": 1280
}
```

Sigue solicitando la página siguiente hasta que `page * size >= totalItems`.

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

## Enlaces de recursos

Los recursos v3 incluyen un `_link` con su URL canónica:

```json
{
  "id": 4021,
  "name": "Bom Preço - Paulista",
  "_link": "https://demo.shelfline.example/api/v3/workspaces/7/stores/4021"
}
```

Es preferible seguir `_link` en lugar de construir las URL tú mismo: si un recurso cambia de ubicación, el enlace sigue siendo correcto.

## Sincronización incremental

Para mantener al día una copia de las respuestas de encuestas, guarda el valor más reciente de `submittedAt` que hayas visto y envíalo como `since` en la siguiente ejecución:

```http
GET /api/v3/workspaces/7/surveys/640/responses?since=2025-03-14T12:58:40Z
```

::: tip No es un flujo en tiempo real
Consultar cada pocos minutos está bien. Si necesitas cada cambio al instante, la API no es la herramienta adecuada: solicita una exportación masiva.
:::
