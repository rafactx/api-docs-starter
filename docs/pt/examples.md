---
title: Exemplos
description: Tarefas comuns de integração, de ponta a ponta.
---

# Exemplos

Todos os exemplos presumem estas variáveis de ambiente:

```bash
export SHELFLINE_URL="https://demo.shelfline.example/api"
export SHELFLINE_USER="erp-integration"
export SHELFLINE_PASSWORD="..."
```

## Criar uma loja

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

`code` é o seu próprio identificador e deve ser único no workspace, por isso é a chave natural para relacionar lojas entre o seu ERP e a Shelfline.

## Desativar uma loja sem excluí-la

```bash
curl -X PATCH "$SHELFLINE_URL/v3/workspaces/7/stores/4021" \
  -u "$SHELFLINE_USER:$SHELFLINE_PASSWORD" \
  -H "X-Client-Name: erp-sync" -H "Api-Version: 2025-01-15" \
  -H "Content-Type: application/json" \
  -d '{ "enabled": false }'
```

## Planejar o roteiro da próxima semana de um promotor

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

Para retirar visitas do roteiro, passe os IDs delas na query string. `DELETE` nunca recebe corpo:

```bash
curl -X DELETE "$SHELFLINE_URL/v3/workspaces/7/reps/57/scheduled-visits?visitIds=120554,120555" \
  -u "$SHELFLINE_USER:$SHELFLINE_PASSWORD" -H "X-Client-Name: route-planner"
```

## Exportar preços de gôndola de uma pesquisa

```python
rows = []
for response in paginate(f"/v3/workspaces/7/surveys/640/responses", since=last_run):
    for answer in response["answers"]:
        if answer["fieldId"] == 7712:  # "Preço de gôndola (R$)"
            rows.append((response["storeId"], response["submittedAt"], float(answer["value"])))
```

Consulte os IDs dos campos uma única vez com `GET /v1/7/surveys/640/fields` e guarde-os em cache.
