---
title: Errores
description: Códigos de estado y cuerpos de error que devuelve la Shelfline Field API.
---

# Errores

<script setup>
const statusTable = [
  { key: '200 / 201 / 204', description: 'Éxito. 201 cuando se creó algo, 204 cuando no hay cuerpo.', color: 'green' },
  { key: '400', description: '<code>Bad Request</code>: solicitud mal formada o campo no válido.', color: 'red' },
  { key: '401', description: '<code>Unauthorized</code>: credenciales ausentes o no válidas.', color: 'red' },
  { key: '404', description: '<code>Not Found</code>: el recurso no existe en este workspace.', color: 'purple' },
  { key: '429', description: '<code>Too Many Requests</code>: espera los segundos indicados en <code>Retry-After</code>.', color: 'yellow' },
  { key: '5xx', description: 'Error del servidor. Es seguro reintentar las solicitudes idempotentes con retroceso exponencial.', color: 'pink' }
]
</script>

<ApiCard title="Códigos de estado HTTP" :items="statusTable" />

## Cuerpo del error (v3)

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

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `status` | integer | Código de estado HTTP |
| `code` | string | Código de error estable y legible por máquina. Basa tu lógica en este campo, no en `message`. |
| `message` | string | Mensaje legible para personas |
| `details` | array | Problemas a nivel de campo, cuando el cuerpo de la solicitud no es válido |

## Cuerpo del error (v1)

Los endpoints heredados devuelven una estructura más pequeña:

```json
{ "code": 1001, "message": "Store not found" }
```

## Manejo de errores

::: code-group

```javascript [JavaScript]
const res = await fetch(url, { headers })
if (!res.ok) {
  const error = await res.json().catch(() => ({}))
  if (res.status === 429) {
    await sleep(Number(res.headers.get('Retry-After') ?? 1) * 1000)
    // reintentar
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
