<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { withBase, useData } from 'vitepress'
import SpotlightBackground from './SpotlightBackground.vue'

const HEADLINE = 'API Documentation Starter'
const GITHUB_URL = 'https://github.com/rafactx/api-docs-starter'

const translations = {
  pt: {
    subtitle: 'Um portal de documentação de API multilíngue com VitePress e Scalar.\nEsta demonstração documenta a Shelfline Field API, uma API fictícia de execução no varejo.',
    primaryButtonText: 'Conheça a API',
    primaryButtonLink: '/pt/intro',
    imageAltText: 'Preview da documentação API Documentation Starter'
  },
  en: {
    subtitle: 'A multilingual API documentation portal built with VitePress and Scalar.\nThis demo documents the Shelfline Field API, a fictional retail field-execution API.',
    primaryButtonText: 'Explore the API',
    primaryButtonLink: '/en/intro',
    imageAltText: 'Preview of the API Documentation Starter'
  },
  es: {
    subtitle: 'Un portal de documentación de API multilingüe con VitePress y Scalar.\nEsta demo documenta la Shelfline Field API, una API ficticia de ejecución en el punto de venta.',
    primaryButtonText: 'Explora la API',
    primaryButtonLink: '/es/intro',
    imageAltText: 'Vista previa de la documentación API Documentation Starter'
  },
  fr: {
    subtitle: "Un portail de documentation d'API multilingue construit avec VitePress et Scalar.\nCette démo documente la Shelfline Field API, une API fictive d'exécution terrain en magasin.",
    primaryButtonText: "Découvrez l'API",
    primaryButtonLink: '/fr/intro',
    imageAltText: "Aperçu de la documentation API Documentation Starter"
  }
}

const { lang } = useData()
const t = computed(() => translations[lang.value as keyof typeof translations] || translations.en)

const props = withDefaults(defineProps<{ imageSrc?: string; animationDelay?: number }>(), {
  imageSrc: '/preview.png',
  animationDelay: 100
})

const headlineWords = HEADLINE.split(' ')
const animationStarted = ref(false)
const isImageLoading = ref(true)
const image = ref<HTMLImageElement | null>(null)

onMounted(() => {
  requestAnimationFrame(() => (animationStarted.value = true))
  // The image may finish loading before hydration attaches the load listener.
  if (image.value?.complete) isImageLoading.value = false
})
</script>

<template>
  <SpotlightBackground>
    <div class="hero-container">
      <section class="main-content">
        <h1 class="headline">
          <span
            v-for="(word, idx) in headlineWords"
            :key="idx"
            class="word-span"
            :class="{ 'is-visible': animationStarted }"
            :style="{ transitionDelay: `${idx * props.animationDelay}ms` }"
          >
            {{ word }}
          </span>
        </h1>

        <p class="subtitle" :class="{ 'is-visible': animationStarted }">
          {{ t.subtitle }}
        </p>

        <div class="buttons-container" :class="{ 'is-visible': animationStarted }">
          <a
            :href="withBase(t.primaryButtonLink)"
            class="button button--primary"
          >
            <span class="button__text">{{ t.primaryButtonText }}</span>
            <span class="button__icon" aria-hidden="true">→</span>
          </a>
          <a
            :href="GITHUB_URL"
            class="button button--secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="button__text">GitHub</span>
          </a>
        </div>

        <div class="image-preview" :class="{ 'is-visible': animationStarted }">
          <div class="image-container">
            <img
              ref="image"
              class="preview-image"
              :src="withBase(props.imageSrc)"
              :alt="t.imageAltText"
              loading="eager"
              decoding="async"
              @load="isImageLoading = false"
              @error="isImageLoading = false"
            />
            <div v-if="isImageLoading" class="image-skeleton" aria-hidden="true" />
          </div>
        </div>
      </section>
    </div>
  </SpotlightBackground>
</template>

<style scoped>
.hero-container {
  margin: 2.5rem auto;
  padding: 0 1rem;
  display: flex;
  max-width: 1280px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main-content {
  padding: 2.5rem 1rem;
  text-align: center;
  position: relative;
  z-index: 10;
  width: 100%;
}

.headline {
  margin: 0 auto 1rem;
  max-width: 56rem;
  font-size: clamp(2rem, 4vw, 4.5rem);
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.1;
}

.word-span {
  display: inline-block;
  margin-right: 0.5rem;
  opacity: 0;
  transform: translateY(10px);
  filter: blur(4px);
  transition:
    transform 0.35s cubic-bezier(.42,0,.58,1),
    filter 0.35s cubic-bezier(.42,0,.58,1),
    opacity 0.35s cubic-bezier(.42,0,.58,1);
  will-change: transform, opacity, filter;
}
.word-span.is-visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.subtitle {
  margin: 0 auto;
  padding: 1.25rem 0;
  max-width: 44rem;
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  font-weight: 400;
  line-height: 1.75;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  white-space: normal;
  opacity: 0;
  transition: opacity 0.4s ease-in-out 0.8s;
  will-change: opacity;
}

.buttons-container {
  margin-top: var(--vp-space-xl);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--vp-space-md);
  opacity: 0;
  transition: opacity var(--vp-transition-timing-slower) var(--vp-ease-out) 1s;
  will-change: opacity;
}

.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--vp-space-sm);
  padding: var(--vp-space-sm) var(--vp-space-lg);
  font-weight: 600;
  font-size: var(--vp-font-size-base);
  text-decoration: none;
  border-radius: var(--vp-radius-lg);
  border: none;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: all var(--vp-transition-timing-base) var(--vp-ease-out);
  transform: translateZ(0);
  backface-visibility: hidden;
}

.button--primary {
  background: linear-gradient(135deg, var(--vp-hero-primary-color) 0%, var(--vp-c-brand-2) 100%);
  color: #ffffff;
  box-shadow: var(--vp-shadow-2);
  overflow: hidden;
}

.button--primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-dark) 100%);
  opacity: 0;
  transition: opacity var(--vp-transition-timing-base) var(--vp-ease-out);
  border-radius: inherit;
}

.button--primary:hover::before {
  opacity: 1;
}

.button--primary:hover {
  transform: translateY(-1px) scale(1.02);
  box-shadow: var(--vp-shadow-3);
}

.button--primary:active {
  transform: translateY(0) scale(0.98);
  box-shadow: var(--vp-shadow-1);
  transition: all var(--vp-transition-timing-fast) var(--vp-ease-in);
}

.button--primary:focus-visible {
  outline: 2px solid var(--vp-hero-primary-color);
  outline-offset: 2px;
  box-shadow: var(--vp-shadow-3), 0 0 0 4px rgba(var(--vp-hero-primary-rgb), 0.2);
}

.button--primary .button__text,
.button--primary .button__icon {
  position: relative;
  z-index: 1;
}

.button--primary .button__icon {
  transition: transform var(--vp-transition-timing-base) var(--vp-ease-bounce);
}

.button--primary:hover .button__icon {
  transform: translateX(4px);
}

.button--secondary {
  background: var(--vp-c-bg);
  backdrop-filter: var(--vp-backdrop-blur-sm);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
  box-shadow: var(--vp-shadow-1);
  overflow: hidden;
}

.button--secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--vp-c-bg-soft);
  opacity: 0;
  transition: opacity var(--vp-transition-timing-base) var(--vp-ease-out);
  border-radius: inherit;
}

.button--secondary:hover::before {
  opacity: 1;
}

.button--secondary:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-1px) scale(1.02);
  box-shadow: var(--vp-shadow-2);
}

.button--secondary:active {
  transform: translateY(0) scale(0.98);
  box-shadow: var(--vp-shadow-1);
  transition: all var(--vp-transition-timing-fast) var(--vp-ease-in);
}

.button--secondary:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
  box-shadow: var(--vp-shadow-2), 0 0 0 4px var(--vp-c-brand-soft);
}

.button--secondary .button__text {
  position: relative;
  z-index: 1;
}

.image-preview {
  margin-top: 5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease-in-out 1.2s, transform 0.4s ease-in-out 1.2s;
  will-change: opacity, transform;
}

.image-container {
  position: relative;
  overflow: visible;
  border-radius: 0.75rem;
}

.preview-image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  transition: transform 0.3s ease;
}
.image-preview:hover .preview-image {
  transform: scale(1.02);
}

.image-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
    var(--vp-c-bg-soft) 25%,
    var(--vp-c-bg-mute) 50%,
    var(--vp-c-bg-soft) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.is-visible {
  opacity: 1;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 768px) {
  .hero-container { margin: var(--vp-space-md) auto; }
  .main-content { padding: var(--vp-space-md); }
  .buttons-container {
    flex-direction: column;
    width: 100%;
    gap: var(--vp-space-sm);
  }
  .button {
    width: 100%;
    padding: var(--vp-space-md) var(--vp-space-lg);
    font-size: var(--vp-font-size-lg);
  }
  .button:hover {
    transform: translateY(-0.5px) scale(1.01);
  }
  .image-preview { margin-top: var(--vp-space-2xl); }
}
@media (max-width: 480px) {
  .headline { font-size: var(--vp-font-size-4xl); }
  .subtitle { font-size: var(--vp-font-size-base); }
  .button {
    padding: var(--vp-space-md) var(--vp-space-xl);
  }
}

@media (prefers-reduced-motion: reduce) {
  .word-span,
  .subtitle,
  .buttons-container,
  .image-preview,
  .button,
  .button--primary::before,
  .button--secondary::before,
  .button__icon,
  .preview-image {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }

  .button:hover,
  .button:active {
    transform: none !important;
  }
}
@media (prefers-contrast: high) {
  .button--primary, .button--secondary {
    border: 2px solid currentColor;
  }
}
</style>
