<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, defineAsyncComponent, h } from 'vue'

// Keyed by the locale `lang` in config.ts.
const MESSAGES: Record<string, { loading: string; error: string }> = {
  en: { loading: 'Loading API reference…', error: 'Could not load the API reference. Reload the page to try again.' },
  'pt-BR': { loading: 'Carregando a referência da API…', error: 'Não foi possível carregar a referência da API. Recarregue a página.' },
  es: { loading: 'Cargando la referencia de la API…', error: 'No se pudo cargar la referencia de la API. Recarga la página.' },
  fr: { loading: "Chargement de la référence de l'API…", error: "Impossible de charger la référence de l'API. Rechargez la page." }
}

const { isDark, lang } = useData()
const messages = computed(() => MESSAGES[lang.value] ?? MESSAGES.en)

const status = (key: 'loading' | 'error') => () => h('p', { class: 'scalar-status' }, messages.value[key])

// Scalar is large; load it only on the reference page.
const ApiReference = defineAsyncComponent({
  loader: () =>
    Promise.all([
      import('@scalar/api-reference'),
      import('@scalar/api-reference/style.css')
    ]).then(([m]) => m.ApiReference),
  loadingComponent: status('loading'),
  errorComponent: status('error'),
  timeout: 15000
})

const props = defineProps<{
  /** Overrides the spec. By default it follows the page language. */
  specUrl?: string
}>()

// One spec per locale, produced by the openapi-fixer pipeline (see README).
const SPEC_BY_LANG: Record<string, string> = {
  en: '/openapi.en.json',
  'pt-BR': '/openapi.pt-BR.json',
  es: '/openapi.es.json',
  fr: '/openapi.fr.json'
}

const specUrl = computed(() => props.specUrl || SPEC_BY_LANG[lang.value] || SPEC_BY_LANG.en)

const configuration = computed(() => ({
  spec: { url: specUrl.value },
  // Scalar's own themes and fonts are off; the variables below map it onto VitePress.
  theme: 'none' as const,
  withDefaultFonts: false,
  // VitePress owns the appearance switch.
  hideDarkModeToggle: true,
  forceDarkModeState: (isDark.value ? 'dark' : 'light') as 'dark' | 'light',
  metaData: {
    title: 'Shelfline Field API Reference',
    description: 'Interactive reference for the fictional Shelfline Field API'
  }
}))
</script>

<template>
  <!-- Remount on theme or spec change: Scalar reads both only at startup. -->
  <ApiReference :key="`${isDark}-${specUrl}`" :configuration="configuration" />
</template>

<style>
.scalar-status {
  padding: 96px 24px;
  text-align: center;
  color: var(--vp-c-text-2);
}

.scalar-api-reference {
  --scalar-font: var(--vp-font-family-base);
  --scalar-font-code: var(--vp-font-family-mono);

  --scalar-color-1: var(--vp-c-text-1);
  --scalar-color-2: var(--vp-c-text-2);
  --scalar-color-3: var(--vp-c-text-3);
  --scalar-color-accent: var(--vp-c-brand-1);

  --scalar-background-1: var(--vp-c-bg);
  --scalar-background-2: var(--vp-c-bg-alt);
  --scalar-background-3: var(--vp-c-bg-soft);
  --scalar-background-accent: var(--vp-c-brand-soft);

  --scalar-border-color: var(--vp-c-divider);
  --scalar-radius: 6px;
  --scalar-radius-lg: 8px;

  --scalar-color-green: var(--vp-c-green-1);
  --scalar-color-red: var(--vp-c-red-1);
  --scalar-color-orange: var(--vp-c-yellow-1);
  --scalar-color-yellow: var(--vp-c-yellow-1);
  --scalar-color-blue: var(--vp-c-indigo-1);
  --scalar-color-purple: var(--vp-c-purple-1);
}

/*
 * Scalar re-declares its sidebar palette on `.light-mode .t-doc__sidebar` in a
 * stylesheet that loads after this one, so this selector needs one more step.
 */
.scalar-api-reference .t-doc__sidebar.t-doc__sidebar {
  --scalar-sidebar-background-1: var(--vp-c-bg);
  --scalar-sidebar-border-color: var(--vp-c-divider);
  --scalar-sidebar-color-1: var(--vp-c-text-1);
  --scalar-sidebar-color-2: var(--vp-c-text-2);
  --scalar-sidebar-color-active: var(--vp-c-brand-1);
  --scalar-sidebar-item-hover-background: var(--vp-c-default-soft);
  --scalar-sidebar-item-active-background: var(--vp-c-brand-soft);
  --scalar-sidebar-search-background: var(--vp-c-bg);
  --scalar-sidebar-search-border-color: var(--vp-c-divider);
  --scalar-sidebar-search-color: var(--vp-c-text-2);
}
</style>
