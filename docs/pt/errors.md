---
title: Erros
description: Códigos de status e corpos de erro retornados pela Shelfline Field API.
---

# Erros

<script setup>
const statusTable = [
  { key: '200 / 201 / 204', description: 'Sucesso. 201 quando algo foi criado, 204 quando não há corpo.' },
  { key: '400', description: '<code>Bad Request</code>: requisição malformada ou campo inválido.' },
  { key: '401', description: '<code>Unauthorized</code>: credenciais ausentes ou inválidas.' },
  { key: '404', description: '<code>Not Found</code>: o recurso não existe neste workspace.' },
  { key: '429', description: '<code>Too Many Requests</code>: aguarde o número de segundos indicado em <code>Retry-After</code>.' },
  { key: '5xx', description: 'Erro do servidor. É seguro repetir requisições idempotentes com backoff.' }
]
</script>

<ApiCard title="Códigos de status HTTP" :items="statusTable" />

## Corpo de erro (v3)

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

| Campo | Tipo | Descrição |
| --- | --- | --- |
| `status` | integer | Código de status HTTP |
| `code` | string | Código de erro estável e legível por máquina. Use este campo na lógica, não `message`. |
| `message` | string | Mensagem legível por pessoas |
| `details` | array | Problemas por campo, quando o corpo da requisição é inválido |

## Corpo de erro (v1)

Os endpoints legados retornam um formato menor:

```json
{ "code": 1001, "message": "Store not found" }
```

## Tratando erros

::: code-group

```javascript [JavaScript]
const res = await fetch(url, { headers })
if (!res.ok) {
  const error = await res.json().catch(() => ({}))
  if (res.status === 429) {
    await sleep(Number(res.headers.get('Retry-After') ?? 1) * 1000)
    // tentar novamente
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
