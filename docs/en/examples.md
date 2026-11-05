---
title: Examples
description: Common integration tasks, end to end.
---

# Examples

All examples assume these environment variables:

```bash
export SHELFLINE_URL="https://demo.shelfline.example/api"
export SHELFLINE_USER="erp-integration"
export SHELFLINE_PASSWORD="..."
```

## Create a store

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

`code` is your own identifier and must be unique in the workspace, so it is the natural key to match stores between your ERP and Shelfline.

## Disable a store without deleting it

```bash
curl -X PATCH "$SHELFLINE_URL/v3/workspaces/7/stores/4021" \
  -u "$SHELFLINE_USER:$SHELFLINE_PASSWORD" \
  -H "X-Client-Name: erp-sync" -H "Api-Version: 2025-01-15" \
  -H "Content-Type: application/json" \
  -d '{ "enabled": false }'
```

## Plan next week's route for a rep

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

To take visits off the route, pass their IDs in the query string. `DELETE` never takes a body:

```bash
curl -X DELETE "$SHELFLINE_URL/v3/workspaces/7/reps/57/scheduled-visits?visitIds=120554,120555" \
  -u "$SHELFLINE_USER:$SHELFLINE_PASSWORD" -H "X-Client-Name: route-planner"
```

## Export shelf prices from a survey

```python
rows = []
for response in paginate(f"/v3/workspaces/7/surveys/640/responses", since=last_run):
    for answer in response["answers"]:
        if answer["fieldId"] == 7712:  # "Shelf price (R$)"
            rows.append((response["storeId"], response["submittedAt"], float(answer["value"])))
```

Look up field IDs once with `GET /v1/7/surveys/640/fields` and cache them.
