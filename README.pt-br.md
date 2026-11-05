# API Docs Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Demo](https://img.shields.io/badge/demo-cloudflare-F38020?logo=cloudflare&logoColor=white)](https://api-docs-starter.rafactx.workers.dev)

Um portal de documentação de API multilíngue feito com VitePress, Vue 3 e [Scalar](https://scalar.com/). Guias e uma referência de API interativa em inglês, português, espanhol e francês, com a referência trocando para a spec do idioma da página.

**Demo:** <https://api-docs-starter.rafactx.workers.dev>

> Also available in English: [README.md](README.md)

![Referência da API renderizada pelo Scalar dentro do tema do VitePress](docs/public/preview.png)

## Por que existe

Criei este projeto quando era Support Engineer na Involves, onde documentei uma API SaaS real para clientes em vários países. As ferramentas prontas entregavam bons guias ou uma boa referência de API, nunca os dois no mesmo lugar, e nenhuma lidava com uma spec traduzida por idioma. Este repositório é esse portal, reconstruído como um starter reutilizável.

A API da empresa **não** está incluída. A demo documenta a **Shelfline Field API**, uma API fictícia de execução no varejo (lojas, produtos, promotores, visitas, pesquisas). As quatro specs localizadas são geradas pelo [openapi-fixer](https://github.com/rafactx/openapi-fixer-v2), o pipeline que transforma uma spec gerada crua em uma spec válida e traduzida.

## Início rápido

Requer Node.js 18+ e pnpm.

```bash
git clone https://github.com/rafactx/api-docs-starter.git
cd api-docs-starter
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # site estático em docs/.vitepress/dist
pnpm preview    # serve o build localmente
```

Se a sua versão do pnpm for diferente da fixada no `package.json`, use via npx: `npx -y pnpm@8.15.5 install`.

## Como funciona

```text
openapi-fixer (outro repo)                    este repo
spec crua ──► hydrate ► fix ► validate ──► docs/public/openapi.<locale>.json ──► ScalarApi.vue ──► /<lang>/api-reference
                                           docs/<lang>/*.md ─────────────────► guias VitePress
```

- **Guias** são Markdown em `docs/{en,pt,es,fr}/`. Cada idioma tem nav e sidebar próprios em `docs/.vitepress/config.ts`.
- **Referência da API**: `docs/.vitepress/components/ScalarApi.vue` embute o Scalar e escolhe a spec pelo idioma da página (`pt` → `openapi.pt-BR.json`, `en` → `openapi.en.json`, ...). Use `spec-url` para sobrescrever.
- **Tema**: o Scalar roda com `theme: 'none'` e suas variáveis CSS são mapeadas para as do VitePress, então a referência segue cores, fontes e modo escuro do site. A paleta fica em `docs/.vitepress/theme/theme.css`.
- **Componentes**: `ApiCard` (tabelas chave/descrição dos guias), `HeroSection` + `SpotlightBackground` (página inicial), Vercel Analytics.
- **Idioma**: `docs/index.md` redireciona para o idioma do navegador; `/` redireciona para `/en` (`docs/public/_redirects`).

## Usando com a sua API

1. Substitua `docs/public/openapi.*.json` pelas suas specs (uma por idioma, ou aponte todos os idiomas para o mesmo arquivo em `SPEC_BY_LANG`, dentro de `ScalarApi.vue`).
2. Reescreva os guias em `docs/<lang>/` e ajuste as sidebars em `docs/.vitepress/config.ts`.
3. Troque o bloco de marca em `docs/.vitepress/theme/theme.css` e os logos em `docs/public/`.
4. Gere um novo `docs/public/preview.png` (1440×900 funciona bem).
5. Publique em qualquer host estático. A demo roda no Cloudflare Workers Static Assets: `pnpm build && npx wrangler deploy` (configuração em `wrangler.jsonc`).

## Licença

[MIT](LICENSE) © 2025 Rafael Teixeira
