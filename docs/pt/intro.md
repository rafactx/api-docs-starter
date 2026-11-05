---
title: Introdução
description: O que a Shelfline Field API faz e como enviar sua primeira requisição.
---

# Introdução

A Shelfline Field API conecta seus sistemas à Shelfline, uma plataforma (fictícia) para equipes de campo do varejo. Use-a para sincronizar o catálogo de lojas e produtos, planejar os roteiros que os promotores seguem e ler as pesquisas que eles preenchem em cada visita.

::: info Uma API de demonstração
A Shelfline não existe. Este portal é um exemplo funcional de um site de documentação de API multilíngue, e a [referência da API](./api-reference) é gerada a partir de uma especificação corrigida pelo [openapi-fixer](https://github.com/rafactx/openapi-fixer-v2). As requisições para `shelfline.example` não serão resolvidas.
:::

## URL base

Cada cliente recebe um subdomínio. Todos os endpoints ficam em `/api`:

```text
https://{workspace}.shelfline.example/api
```

Dentro de uma conta, os dados são divididos em **workspaces** (por exemplo, um por país ou unidade de negócio). A maioria dos endpoints recebe um `workspaceId` no caminho.

## Versões da API

| Versão | Caminhos | Observações |
| --- | --- | --- |
| v3 | `/v3/workspaces/{workspaceId}/...` | Atual. Fixada com o cabeçalho `Api-Version`. |
| v1 | `/v1/{workspaceId}/...` | Legada. Ainda compatível para lojas, produtos e campos de pesquisa. |

Novas integrações devem usar a v3 sempre que houver endpoint equivalente.

## Sua primeira requisição

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

::: tip Teste em um workspace de sandbox
Crie um workspace separado, com seu próprio usuário de integração, para desenvolvimento. Assim os dados de teste nunca se misturam com os roteiros de produção.
:::

## Próximos passos

- [Autenticação](./authentication): credenciais e cabeçalhos obrigatórios
- [Paginação e links](./pagination): leitura de coleções grandes
- [Erros](./errors): códigos de status e corpos de erro
