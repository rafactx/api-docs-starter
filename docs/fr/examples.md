---
title: Exemples
description: "Tâches d’intégration courantes, de bout en bout."
---

# Exemples

Tous les exemples supposent ces variables d’environnement :

```bash
export SHELFLINE_URL="https://demo.shelfline.example/api"
export SHELFLINE_USER="erp-integration"
export SHELFLINE_PASSWORD="..."
```

## Créer un magasin

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

`code` est votre propre identifiant et doit être unique dans le workspace ; c’est donc la clé naturelle pour faire correspondre les magasins entre votre ERP et Shelfline.

## Désactiver un magasin sans le supprimer

```bash
curl -X PATCH "$SHELFLINE_URL/v3/workspaces/7/stores/4021" \
  -u "$SHELFLINE_USER:$SHELFLINE_PASSWORD" \
  -H "X-Client-Name: erp-sync" -H "Api-Version: 2025-01-15" \
  -H "Content-Type: application/json" \
  -d '{ "enabled": false }'
```

## Planifier la tournée de la semaine prochaine pour un commercial terrain

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

Pour retirer des visites de la tournée, passez leurs ID dans la query string. `DELETE` n’accepte jamais de corps :

```bash
curl -X DELETE "$SHELFLINE_URL/v3/workspaces/7/reps/57/scheduled-visits?visitIds=120554,120555" \
  -u "$SHELFLINE_USER:$SHELFLINE_PASSWORD" -H "X-Client-Name: route-planner"
```

## Exporter les prix en rayon depuis un questionnaire

```python
rows = []
for response in paginate(f"/v3/workspaces/7/surveys/640/responses", since=last_run):
    for answer in response["answers"]:
        if answer["fieldId"] == 7712:  # "Prix en rayon (R$)"
            rows.append((response["storeId"], response["submittedAt"], float(answer["value"])))
```

Recherchez les ID de champ une seule fois avec `GET /v1/7/surveys/640/fields` et mettez-les en cache.
