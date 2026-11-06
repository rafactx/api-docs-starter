<template>
  <div
    ref="containerRef"
    class="spotlight-container"
    :class="{ 'spotlight-active': isActive }"
  >
    <div class="spotlight-glow" :style="spotlightStyle" />
    <div class="spotlight-overlay" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const isActive = ref(false)
// Pointer position as a percentage of the container.
const mousePosition = ref({ x: 50, y: 50 })

const spotlightStyle = computed(() => ({
  '--mouse-x': `${mousePosition.value.x}%`,
  '--mouse-y': `${mousePosition.value.y}%`
}))

const clamp = (n: number) => Math.max(0, Math.min(100, n))

let cleanup: (() => void) | undefined

onMounted(() => {
  const container = containerRef.value
  if (!container) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let rafId = 0

  const moveTo = (clientX: number, clientY: number) => {
    if (reducedMotion.matches) return
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect()
      mousePosition.value = {
        x: clamp(((clientX - rect.left) / rect.width) * 100),
        y: clamp(((clientY - rect.top) / rect.height) * 100)
      }
    })
  }

  const onMouseMove = (e: MouseEvent) => moveTo(e.clientX, e.clientY)
  const onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    if (touch) moveTo(touch.clientX, touch.clientY)
  }
  const onMouseEnter = () => (isActive.value = true)
  const onMouseLeave = () => {
    isActive.value = false
    if (!reducedMotion.matches) mousePosition.value = { x: 50, y: 50 }
  }

  const addListeners = () => {
    container.addEventListener('mouseenter', onMouseEnter, { passive: true })
    container.addEventListener('mouseleave', onMouseLeave, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
  }
  const removeListeners = () => {
    container.removeEventListener('mouseenter', onMouseEnter)
    container.removeEventListener('mouseleave', onMouseLeave)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('touchmove', onTouchMove)
  }

  addListeners()

  // Turn the spotlight on if the hero is already in view once layout settles.
  const initialCheck = setTimeout(() => {
    const rect = container.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) isActive.value = true
  }, 100)

  // Stop tracking the pointer while the hero is off screen.
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        addListeners()
      } else {
        removeListeners()
        isActive.value = false
      }
    },
    { threshold: 0.1, rootMargin: '50px' }
  )
  observer.observe(container)

  cleanup = () => {
    clearTimeout(initialCheck)
    cancelAnimationFrame(rafId)
    observer.disconnect()
    removeListeners()
  }
})

onUnmounted(() => cleanup?.())
</script>

<style scoped>
.spotlight-container {
  position: relative;
  min-height: 100vh;
  background: var(--vp-c-bg);
  overflow: hidden;
  transform: translateZ(0);
  --mouse-x: 50%;
  --mouse-y: 50%;
}

.spotlight-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(79, 70, 229, 0.45) 0%,
    rgba(79, 70, 229, 0.25) 18%,
    rgba(147, 51, 234, 0.15) 50%,
    transparent 85%
  );
  filter: blur(28px);
  transition:
    opacity var(--vp-transition-timing-base) var(--vp-ease-out),
    background var(--vp-transition-timing-fast) var(--vp-ease-out),
    filter var(--vp-transition-timing-fast) var(--vp-ease-out);
  transform: translateZ(0);
  will-change: background, opacity;
}

.spotlight-container.spotlight-active .spotlight-glow {
  opacity: 0.9;
}

.spotlight-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.03) 0%,
    transparent 60%,
    rgba(147, 51, 234, 0.04) 100%
  );
  z-index: 0;
  pointer-events: none;
  transition: opacity var(--vp-transition-timing-base) var(--vp-ease-out);
}

.dark .spotlight-glow {
  opacity: 0.5;
  background: radial-gradient(
    720px circle at var(--mouse-x) var(--mouse-y),
    rgba(79, 70, 229, 0.2) 0%,
    rgba(147, 51, 234, 0.15) 50%,
    transparent 85%
  );
  filter: blur(24px);
}

.dark .spotlight-container.spotlight-active .spotlight-glow {
  opacity: 0.8;
}

.dark .spotlight-overlay {
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.12) 0%,
    transparent 60%,
    rgba(147, 51, 234, 0.15) 100%
  );
}

/* Without JavaScript, keep a centered glow. */
@media (scripting: none) {
  .spotlight-glow {
    opacity: 0.7 !important;
    background: radial-gradient(
      600px circle at 50% 50%,
      rgba(79, 70, 229, 0.4) 0%,
      rgba(147, 51, 234, 0.2) 50%,
      transparent 85%
    ) !important;
  }

  .dark .spotlight-glow {
    opacity: 0.5 !important;
    background: radial-gradient(
      700px circle at 50% 50%,
      rgba(79, 70, 229, 0.15) 0%,
      rgba(147, 51, 234, 0.1) 50%,
      transparent 85%
    ) !important;
  }
}

@media (max-width: 768px) {
  .spotlight-glow {
    filter: blur(24px);
  }

  .dark .spotlight-glow {
    filter: blur(18px);
  }
}

@media (max-width: 480px) {
  .spotlight-glow {
    filter: blur(16px);
  }

  .dark .spotlight-glow {
    filter: blur(12px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spotlight-glow {
    transition: none;
    opacity: 0.5;
    background: radial-gradient(
      800px circle at 50% 50%,
      rgba(79, 70, 229, 0.15) 0%,
      rgba(147, 51, 234, 0.08) 50%,
      transparent 85%
    );
  }

  .spotlight-container.spotlight-active .spotlight-glow {
    opacity: 0.3;
  }
}

@media (prefers-contrast: high) {
  .spotlight-glow {
    opacity: 0.2;
  }

  .spotlight-overlay {
    opacity: 0.1;
  }
}

.spotlight-container > :slotted(*) {
  position: relative;
  z-index: 2;
}
</style>
