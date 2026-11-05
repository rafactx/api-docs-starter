---
title: Introducción
description: Qué hace la Shelfline Field API y cómo hacer tu primera solicitud.
---

# Introducción

La Shelfline Field API conecta tus sistemas con Shelfline, una plataforma (ficticia) para equipos de campo del sector retail. Úsala para sincronizar tu catálogo de tiendas y productos, planificar las rutas que siguen tus representantes de campo y leer las encuestas que completan en cada visita.

::: info Una API de demostración
Shelfline no existe. Este portal es un ejemplo funcional de un sitio de documentación de API multilingüe, y la [referencia de la API](./api-reference) se genera a partir de una especificación depurada con [openapi-fixer](https://github.com/rafactx/openapi-fixer-v2). Las solicitudes a `shelfline.example` no se resolverán.
:::

## URL base

Cada cliente recibe un subdominio. Todos los endpoints están bajo `/api`:

```text
https://{workspace}.shelfline.example/api
```

Dentro de una cuenta, los datos se dividen en **workspaces** (por ejemplo, uno por país o unidad de negocio). La mayoría de los endpoints reciben un `workspaceId` en la ruta.

## Versiones de la API

| Versión | Rutas | Notas |
| --- | --- | --- |
| v3 | `/v3/workspaces/{workspaceId}/...` | Actual. Se fija con el encabezado `Api-Version`. |
| v1 | `/v1/{workspaceId}/...` | Heredada. Sigue siendo compatible para tiendas, productos y campos de encuesta. |

Las integraciones nuevas deben usar v3 siempre que exista el endpoint.

## Tu primera solicitud

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

::: tip Prueba en un workspace de sandbox
Crea un workspace aparte con su propio usuario de integración para desarrollo, de modo que los datos de prueba nunca se mezclen con las rutas de producción.
:::

## Siguientes pasos

- [Autenticación](./authentication): credenciales y encabezados obligatorios
- [Paginación y enlaces](./pagination): lectura de colecciones grandes
- [Errores](./errors): códigos de estado y cuerpos de error
