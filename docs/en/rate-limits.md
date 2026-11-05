---
title: Rate limits
description: Request limits and good habits for integrations.
---

# Rate limits

Limits are applied per workspace and per `X-Client-Name`:

<ApiCard
  title="limits"
  :items="[
    { key: 'Sustained', description: '60 requests per minute', color: 'blue' },
    { key: 'Burst', description: 'up to 20 requests in one second', color: 'purple' },
    { key: 'Over the limit', description: '<code>429 Too Many Requests</code> with a <code>Retry-After</code> header', color: 'yellow' }
  ]"
/>

## Good habits

- **Retry with backoff.** On `429` wait `Retry-After` seconds. On `5xx`, retry idempotent requests (GET, PUT, DELETE) with exponential backoff and jitter.
- **Batch writes.** `POST .../scheduled-visits` accepts a whole route in one call: one request for 50 visits, not 50 requests.
- **Page with the maximum size** (`size=200`) when reading full collections.
- **Cache what rarely changes**, such as chains, brands and survey fields.
- **Sync incrementally** with `since` instead of re-reading everything.

## HTTP methods

<script setup>
const methodsTable = [
  { key: 'GET', description: 'Read', color: 'blue' },
  { key: 'POST', description: 'Create', color: 'green' },
  { key: 'PUT', description: 'Replace (v1)', color: 'purple' },
  { key: 'PATCH', description: 'Update only the fields you send (v3)', color: 'yellow' },
  { key: 'DELETE', description: 'Delete. Never takes a body; IDs go in the path or query string.', color: 'red' }
]
</script>

<ApiCard title="HTTP methods" :items="methodsTable" />
