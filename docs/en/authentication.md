---
title: Authentication
description: Credentials and required headers for the Shelfline Field API.
---

# Authentication

The API uses **HTTP Basic authentication** over HTTPS. Create an *integration user* in the Shelfline admin for each system that calls the API, instead of sharing a person's login.

## Required headers

<ApiCard
  title="request.headers"
  :items="[
    { key: 'Authorization', description: '<code>Basic base64(username:password)</code>. Required on every request.', color: 'blue' },
    { key: 'X-Client-Name', description: 'Name of your integration, such as <code>erp-sync</code>. Shown in audit logs and used for rate limiting. Required.', color: 'purple' },
    { key: 'Api-Version', description: 'Release date of the v3 contract you were built against, such as <code>2025-01-15</code>. v3 only.', color: 'pink' }
  ]"
/>

## Building the Authorization header

```bash
echo -n "erp-integration:correct-horse-battery" | base64
# ZXJwLWludGVncmF0aW9uOmNvcnJlY3QtaG9yc2UtYmF0dGVyeQ==

Authorization: Basic ZXJwLWludGVncmF0aW9uOmNvcnJlY3QtaG9yc2UtYmF0dGVyeQ==
```

Most HTTP clients do this for you: `curl -u user:password`, `requests.get(..., auth=(user, password))`.

::: warning Keep credentials out of code
Read credentials from environment variables or a secret manager. If a password leaks, rotate it in the admin: only that integration user is affected.
:::

## Versioning with Api-Version

v3 endpoints are versioned by date. You send the version your integration was written for, and the response shape stays the same even after new releases.

```http
Api-Version: 2025-01-15
```

- When a release adds a breaking change, it gets a new date. Your integration keeps receiving the old shape until you change the header.
- If you omit the header, you get the latest version. Fine for exploring, risky in production.
- v1 endpoints ignore the header.

## Finding your workspace ID

The workspace ID appears in the admin URL: `https://demo.shelfline.example/admin/workspaces/7` → `workspaceId = 7`.
