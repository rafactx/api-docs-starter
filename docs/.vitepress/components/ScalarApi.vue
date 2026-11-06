<template>
  <div v-if="isMounted" class="scalar-api-container">
    <ApiReference :key="`${themeKey}-${resolvedSpecUrl}`" :configuration="scalarConfig" />
  </div>
  <div v-else class="scalar-api-status">
    <div class="scalar-api-spinner"></div>
    <p>{{ messages.loading }}</p>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, defineAsyncComponent, h, onMounted, ref } from 'vue'

const MESSAGES: Record<string, { loading: string; error: string }> = {
  en: { loading: 'Loading API reference…', error: 'Could not load the API reference. Please reload the page.' },
  pt: { loading: 'Carregando a referência da API…', error: 'Não foi possível carregar a referência da API. Recarregue a página.' },
  es: { loading: 'Cargando la referencia de la API…', error: 'No se pudo cargar la referencia de la API. Recarga la página.' },
  fr: { loading: "Chargement de la référence de l'API…", error: "Impossible de charger la référence de l'API. Rechargez la page." }
}

const { isDark, lang } = useData()
const messages = computed(() => MESSAGES[lang.value] ?? MESSAGES.en)

// Scalar is large, so it is loaded only on the API reference page.
// Loading and error states use render functions: the runtime-only Vue build cannot compile `template` strings.
// Their styles are global (below) because scoped styles do not reach these child components.
const ApiReference = defineAsyncComponent({
  loader: () => import('@scalar/api-reference').then((module) => module.ApiReference),
  loadingComponent: {
    render: () =>
      h('div', { class: 'scalar-api-status' }, [h('div', { class: 'scalar-api-spinner' }), h('p', messages.value.loading)])
  },
  errorComponent: {
    render: () => h('div', { class: 'scalar-api-status' }, h('p', messages.value.error))
  },
  delay: 200,
  timeout: 10000
})

const props = defineProps({
  // Override to point at any spec. By default the spec follows the page language.
  specUrl: {
    type: String,
    default: ''
  }
})

// One spec per locale, produced by the openapi-fixer pipeline (see README).
const SPEC_BY_LANG: Record<string, string> = {
  en: '/openapi.en.json',
  pt: '/openapi.pt-BR.json',
  es: '/openapi.es.json',
  fr: '/openapi.fr.json'
}

const resolvedSpecUrl = computed(() => props.specUrl || SPEC_BY_LANG[lang.value] || SPEC_BY_LANG.en)

// Scalar reads its configuration once, so the component is recreated when the theme changes.
const themeKey = computed(() => (isDark.value ? 'dark' : 'light'))

const scalarConfig = computed(() => ({
  spec: {
    url: resolvedSpecUrl.value
  },
  // 'none' disables Scalar's built-in themes; the <style> block below maps its variables onto VitePress's.
  theme: 'none' as const,
  darkMode: isDark.value,
  withDefaultFonts: false,
  // VitePress already has a theme switch.
  hideDarkModeButton: true,
  layout: 'modern' as const,
  showSidebar: true,
  searchHotKey: 'k' as const,
  metaData: {
    title: 'Shelfline Field API Reference',
    description: 'Interactive reference for the fictional Shelfline Field API'
  }
}))

// Render Scalar only on the client, after the page is idle.
const isMounted = ref(false)
onMounted(() => {
  const show = () => (isMounted.value = true)
  if ('requestIdleCallback' in window) window.requestIdleCallback(show)
  else setTimeout(show, 0)
})
</script>

<style>
.scalar-api-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.scalar-api-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  gap: 1rem;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.scalar-api-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-bg-mute);
  border-top: 3px solid var(--vp-c-brand-1);
  border-radius: 50%;
  animation: scalar-api-spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  box-shadow: var(--vp-shadow-1);
}

@keyframes scalar-api-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Map Scalar's theme variables onto VitePress's. */
.scalar-api-reference {
  --scalar-font: var(--vp-font-family-body, 'Poppins', sans-serif);
  --scalar-font-code: var(--vp-font-family-mono, monospace);
  --scalar-heading-font: var(--vp-font-family-heading, 'Hepta Slab', serif);

  --scalar-color-1: var(--vp-c-text-1);
  --scalar-color-2: var(--vp-c-text-2);
  --scalar-color-3: var(--vp-c-text-3);
  --scalar-color-accent: var(--vp-c-brand-1);

  --scalar-background-1: var(--vp-c-bg);
  --scalar-background-2: var(--vp-c-bg-alt);
  --scalar-background-3: var(--vp-c-bg-soft);
  --scalar-background-accent: var(--vp-c-brand-soft);

  --scalar-border-color: var(--vp-c-border);
  --scalar-border-radius: var(--vp-radius-md);
  --scalar-border-radius-lg: var(--vp-radius-lg);

  --scalar-shadow-1: var(--vp-shadow-1);
  --scalar-shadow-2: var(--vp-shadow-2);
  --scalar-shadow-3: var(--vp-shadow-3);

  /* HTTP method colors */
  --scalar-color-green: #34c759;
  --scalar-color-red: #ff3b30;
  --scalar-color-orange: #ff9500;
  --scalar-color-blue: #007aff;
  --scalar-color-purple: #af52de;
  --scalar-color-yellow: #ffcc00;

  --scalar-sidebar-background-1: var(--vp-c-bg-alt);
  --scalar-sidebar-border-color: var(--vp-c-divider);
  --scalar-sidebar-color-1: var(--vp-c-text-1);
  --scalar-sidebar-color-2: var(--vp-c-text-2);
  --scalar-sidebar-color-active: var(--vp-c-brand-1);
  --scalar-sidebar-item-hover-background: var(--vp-c-brand-soft);
  --scalar-sidebar-item-active-background: var(--vp-c-brand-soft);
  --scalar-sidebar-search-background: var(--vp-c-bg-soft);
  --scalar-sidebar-search-border-color: var(--vp-c-border);
  --scalar-sidebar-search-color: var(--vp-c-text-2);
}

.scalar-api-reference .scalar-heading {
  font-family: var(--scalar-heading-font);
}

/* Buttons */
.scalar-api-reference .scalar-button {
  border-radius: var(--vp-radius-md) !important;
  font-weight: 500 !important;
  box-shadow: var(--vp-shadow-1) !important;
  transition: all 150ms var(--vp-ease-out) !important;
  will-change: transform, box-shadow;
}
.scalar-api-reference .scalar-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--vp-shadow-2) !important;
}
.scalar-api-reference .scalar-button:active {
  transform: translateY(0);
}

/* Cards */
.scalar-api-reference .scalar-card {
  border-radius: var(--vp-radius-lg) !important;
  box-shadow: var(--vp-shadow-1) !important;
  transition: all 250ms var(--vp-ease-out) !important;
  will-change: transform, box-shadow;
}
.scalar-api-reference .scalar-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-2) !important;
}

/* Code blocks */
.scalar-api-reference .scalar-code-block,
.scalar-api-reference .scalar-code-block pre {
  border-radius: var(--vp-radius-md) !important;
}

/* Scrollbar */
.scalar-api-reference ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.scalar-api-reference ::-webkit-scrollbar-track {
  background: var(--vp-c-bg-soft);
}
.scalar-api-reference ::-webkit-scrollbar-thumb {
  background: var(--vp-c-text-3);
  border-radius: var(--vp-radius-sm);
}
.scalar-api-reference ::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-text-2);
}
</style>
