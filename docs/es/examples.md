---
title: Ejemplos
description: Tareas de integración comunes, de principio a fin.
---

# Ejemplos

Todos los ejemplos suponen que están definidas estas variables de entorno:

```bash
export SHELFLINE_URL="https://demo.shelfline.example/api"
export SHELFLINE_USER="erp-integration"
export SHELFLINE_PASSWORD="..."
```

## Crear una tienda

```bash
curl -X POST "$SHELFLINE_URL/v1/7/stores" \
  -u "$SHELFLINE_USER:$SHELFLINE_PASSWORD" \
  -H "X-Client-Name: erp-sync" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bom Preço - Paulista",
    "code": "SP-0042",
    "chainName": "Mercado Bom Preço",
    "enabled": true,
    "address": { "street": "Rua Augusta", "number": "1500", "city": "São Paulo", "postalCode": "01304-001" }
  }'
```

`code` es tu propio identificador y debe ser único en el workspace, por lo que es la clave natural para relacionar las tiendas entre tu ERP y Shelfline.

## Deshabilitar una tienda sin eliminarla

```bash
curl -X PATCH "$SHELFLINE_URL/v3/workspaces/7/stores/4021" \
  -u "$SHELFLINE_USER:$SHELFLINE_PASSWORD" \
  -H "X-Client-Name: erp-sync" -H "Api-Version: 2025-01-15" \
  -H "Content-Type: application/json" \
  -d '{ "enabled": false }'
```

## Planificar la ruta de la próxima semana para un representante

::: code-group

```python [Python]
import os
import requests

session = requests.Session()
session.auth = (os.environ["SHELFLINE_USER"], os.environ["SHELFLINE_PASSWORD"])
session.headers.update({"X-Client-Name": "route-planner", "Api-Version": "2025-01-15"})

visits = [
    {"storeId": 4021, "date": "2025-03-17", "plannedStart": "09:00"},
    {"storeId": 4022, "date": "2025-03-17", "plannedStart": "11:00"},
    {"storeId": 4107, "date": "2025-03-18", "plannedStart": "09:30"},
]
response = session.post(
    f"{os.environ['SHELFLINE_URL']}/v3/workspaces/7/reps/57/scheduled-visits", json=visits
)
response.raise_for_status()
```

```javascript [JavaScript]
const res = await fetch(`${process.env.SHELFLINE_URL}/v3/workspaces/7/reps/57/scheduled-visits`, {
  method: 'POST',
  headers: {
    Authorization: `Basic ${btoa(`${process.env.SHELFLINE_USER}:${process.env.SHELFLINE_PASSWORD}`)}`,
    'X-Client-Name': 'route-planner',
    'Api-Version': '2025-01-15',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify([
    { storeId: 4021, date: '2025-03-17', plannedStart: '09:00' },
    { storeId: 4022, date: '2025-03-17', plannedStart: '11:00' }
  ])
})
```

:::

Para quitar visitas de la ruta, pasa sus ID en la cadena de consulta. `DELETE` nunca lleva cuerpo:

```bash
curl -X DELETE "$SHELFLINE_URL/v3/workspaces/7/reps/57/scheduled-visits?visitIds=120554,120555" \
  -u "$SHELFLINE_USER:$SHELFLINE_PASSWORD" -H "X-Client-Name: route-planner"
```

## Exportar precios en góndola desde una encuesta

```python
rows = []
for response in paginate(f"/v3/workspaces/7/surveys/640/responses", since=last_run):
    for answer in response["answers"]:
        if answer["fieldId"] == 7712:  # "Precio en góndola (R$)"
            rows.append((response["storeId"], response["submittedAt"], float(answer["value"])))
```

Consulta los ID de los campos una sola vez con `GET /v1/7/surveys/640/fields` y guárdalos en caché.
