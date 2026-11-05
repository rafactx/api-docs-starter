---
title: Errors
description: Status codes and error bodies returned by the Shelfline Field API.
---

# Errors

<script setup>
const statusTable = [
  { key: '200 / 201 / 204', description: 'Success. 201 when something was created, 204 when there is no body.', color: 'green' },
  { key: '400', description: '<code>Bad Request</code>: malformed request or invalid field.', color: 'red' },
  { key: '401', description: '<code>Unauthorized</code>: missing or invalid credentials.', color: 'red' },
  { key: '404', description: '<code>Not Found</code>: the resource does not exist in this workspace.', color: 'purple' },
  { key: '429', description: '<code>Too Many Requests</code>: wait for <code>Retry-After</code> seconds.', color: 'yellow' },
  { key: '5xx', description: 'Server error. Safe to retry idempotent requests with backoff.', color: 'pink' }
]
</script>

<ApiCard title="HTTP status codes" :items="statusTable" />

## Error body (v3)

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

| Field | Type | Description |
| --- | --- | --- |
| `status` | integer | HTTP status code |
| `code` | string | Stable, machine-readable error code. Branch on this, not on `message`. |
| `message` | string | Human-readable message |
| `details` | array | Field-level problems, when the request body is invalid |

## Error body (v1)

Legacy endpoints return a smaller shape:

```json
{ "code": 1001, "message": "Store not found" }
```

## Handling errors

::: code-group

```javascript [JavaScript]
const res = await fetch(url, { headers })
if (!res.ok) {
  const error = await res.json().catch(() => ({}))
  if (res.status === 429) {
    await sleep(Number(res.headers.get('Retry-After') ?? 1) * 1000)
    // retry
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
