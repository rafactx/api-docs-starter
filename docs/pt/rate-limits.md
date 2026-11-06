---
title: Limites de requisições
description: Limites de requisições e boas práticas para integrações.
---

# Limites de requisições

Os limites são aplicados por workspace e por `X-Client-Name`:

<ApiCard
  title="limites"
  :items="[
    { key: 'Sustained', description: '60 requisições por minuto' },
    { key: 'Burst', description: 'até 20 requisições em um segundo' },
    { key: 'Over the limit', description: '<code>429 Too Many Requests</code> com o cabeçalho <code>Retry-After</code>' }
  ]"
/>

## Boas práticas

- **Tente de novo com backoff.** Em um `429`, aguarde `Retry-After` segundos. Em `5xx`, repita requisições idempotentes (GET, PUT, DELETE) com backoff exponencial e jitter.
- **Agrupe as escritas.** `POST .../scheduled-visits` aceita um roteiro inteiro em uma chamada: uma requisição para 50 visitas, não 50 requisições.
- **Pagine com o tamanho máximo** (`size=200`) ao ler coleções completas.
- **Faça cache do que muda pouco**, como redes, marcas e campos de pesquisa.
- **Sincronize de forma incremental** com `since` em vez de reler tudo.

## Métodos HTTP

<script setup>
const methodsTable = [
  { key: 'GET', description: 'Leitura' },
  { key: 'POST', description: 'Criação' },
  { key: 'PUT', description: 'Substituição (v1)' },
  { key: 'PATCH', description: 'Atualiza somente os campos enviados (v3)' },
  { key: 'DELETE', description: 'Exclusão. Nunca recebe corpo; os IDs vão no caminho ou na query string.' }
]
</script>

<ApiCard title="Métodos HTTP" :items="methodsTable" />
