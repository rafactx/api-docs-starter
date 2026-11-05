---
title: Autenticação
description: Credenciais e cabeçalhos obrigatórios da Shelfline Field API.
---

# Autenticação

A API usa **autenticação HTTP Basic** sobre HTTPS. Crie um *usuário de integração* no admin da Shelfline para cada sistema que chama a API, em vez de compartilhar o login de uma pessoa.

## Cabeçalhos obrigatórios

<ApiCard
  title="request.headers"
  :items="[
    { key: 'Authorization', description: '<code>Basic base64(username:password)</code>. Obrigatório em toda requisição.', color: 'blue' },
    { key: 'X-Client-Name', description: 'Nome da sua integração, como <code>erp-sync</code>. Aparece nos logs de auditoria e é usado no controle de limite de requisições. Obrigatório.', color: 'purple' },
    { key: 'Api-Version', description: 'Data de lançamento do contrato v3 para o qual você desenvolveu, como <code>2025-01-15</code>. Somente v3.', color: 'pink' }
  ]"
/>

## Montando o cabeçalho Authorization

```bash
echo -n "erp-integration:correct-horse-battery" | base64
# ZXJwLWludGVncmF0aW9uOmNvcnJlY3QtaG9yc2UtYmF0dGVyeQ==

Authorization: Basic ZXJwLWludGVncmF0aW9uOmNvcnJlY3QtaG9yc2UtYmF0dGVyeQ==
```

A maioria dos clientes HTTP faz isso por você: `curl -u user:password`, `requests.get(..., auth=(user, password))`.

::: warning Mantenha as credenciais fora do código
Leia as credenciais de variáveis de ambiente ou de um gerenciador de segredos. Se uma senha vazar, troque-a no admin: somente aquele usuário de integração é afetado.
:::

## Versionamento com Api-Version

Os endpoints v3 são versionados por data. Você envia a versão para a qual sua integração foi escrita, e o formato da resposta permanece o mesmo mesmo depois de novos lançamentos.

```http
Api-Version: 2025-01-15
```

- Quando um lançamento traz uma mudança incompatível, ele recebe uma nova data. Sua integração continua recebendo o formato antigo até você alterar o cabeçalho.
- Se você omitir o cabeçalho, receberá a versão mais recente. Serve para explorar, mas é arriscado em produção.
- Os endpoints v1 ignoram o cabeçalho.

## Encontrando o ID do workspace

O ID do workspace aparece na URL do admin: `https://demo.shelfline.example/admin/workspaces/7` → `workspaceId = 7`.
