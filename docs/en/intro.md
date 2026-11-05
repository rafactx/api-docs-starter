---
title: Introduction
description: What the Shelfline Field API does and how to make your first request.
---

# Introduction

The Shelfline Field API connects your systems to Shelfline, a (fictional) platform for retail field teams. Use it to sync your store and product catalogue, plan the routes your field reps follow, and read the surveys they fill in during each visit.

::: info A demo API
Shelfline does not exist. This portal is a working example of a multilingual API documentation site, and the [API reference](./api-reference) is generated from a spec cleaned up by [openapi-fixer](https://github.com/rafactx/openapi-fixer-v2). Requests to `shelfline.example` will not resolve.
:::

## Base URL

Every customer gets a subdomain. All endpoints live under `/api`:

```text
https://{workspace}.shelfline.example/api
```

Inside an account, data is split into **workspaces** (for example, one per country or business unit). Most endpoints take a `workspaceId` in the path.

## API versions

| Version | Paths | Notes |
| --- | --- | --- |
| v3 | `/v3/workspaces/{workspaceId}/...` | Current. Pinned with the `Api-Version` header. |
| v1 | `/v1/{workspaceId}/...` | Legacy. Still supported for stores, products and survey fields. |

New integrations should use v3 wherever an endpoint exists.

## Your first request

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

::: tip Test in a sandbox workspace
Create a separate workspace with its own integration user for development, so test data never mixes with production routes.
:::

## Next steps

- [Authentication](./authentication): credentials and required headers
- [Pagination and links](./pagination): reading large collections
- [Errors](./errors): status codes and error bodies
