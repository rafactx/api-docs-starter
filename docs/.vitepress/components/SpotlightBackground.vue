<template>
  <div
    class="spotlight-container"
    ref="containerRef"
    :class="{ 'spotlight-active': isActive }"
  >
    <!-- Background with spotlight -->
    <div
      class="spotlight-glow"
      :style="spotlightStyle"
    />

    <!-- Gradient overlay for depth -->
    <div class="spotlight-overlay" />

    <!-- Slot for content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inBrowser } from 'vitepress'
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface SpotlightProps {
  intensity?: number
  radius?: number
  disabled?: boolean
  throttleMs?: number
}

const props = withDefaults(defineProps<SpotlightProps>(), {
  intensity: 1,
  radius: 600,
  disabled: false,
  throttleMs: 16, // ~60fps
})

// Refs
const containerRef = ref<HTMLElement | null>(null)
const isActive = ref(false)
const mousePosition = ref({ x: 50, y: 50 }) // percentages

// Computed styles
const spotlightStyle = computed(() => ({
  '--mouse-x': `${mousePosition.value.x}%`,
  '--mouse-y': `${mousePosition.value.y}%`,
  '--radius': `${props.radius}px`,
  '--intensity': props.intensity.toString(),
}))

// Control variables
let cleanup: (() => void) | null = null
let rafId: number | null = null
let lastUpdate = 0
let intersectionObserver: IntersectionObserver | null = null

// Optimized throttle function
const throttle = (func: Function, delay: number) => {
  return (...args: any[]) => {
    const now = performance.now()
    if (now - lastUpdate >= delay) {
      lastUpdate = now
      func.apply(null, args)
    }
  }
}

// Check for reduced motion preference
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Update spotlight position
const updateSpotlight = (e: MouseEvent) => {
  if (!containerRef.value || props.disabled || prefersReducedMotion()) return

  // Cancel previous RAF if pending
  if (rafId) {
    cancelAnimationFrame(rafId)
  }

  rafId = requestAnimationFrame(() => {
    if (!containerRef.value) return

    const rect = containerRef.value.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    // Clamp values to container bounds
    mousePosition.value = {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    }
  })
}

// Touch support for mobile
const updateSpotlightTouch = (e: TouchEvent) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0]
    updateSpotlight({
      clientX: touch.clientX,
      clientY: touch.clientY,
    } as MouseEvent)
  }
}

// Throttled event handlers
const throttledMouseMove = throttle(updateSpotlight, props.throttleMs)
const throttledTouchMove = throttle(updateSpotlightTouch, props.throttleMs)

// Mouse enter/leave handlers
const handleMouseEnter = () => {
  isActive.value = true
}

const handleMouseLeave = () => {
  isActive.value = false
  // Reset to center when mouse leaves
  if (!prefersReducedMotion()) {
    mousePosition.value = { x: 50, y: 50 }
  }
}

onMounted(() => {
  if (!inBrowser || props.disabled) return

  const container = containerRef.value
  if (!container) return

  // Setup event listeners immediately
  const setupEventListeners = () => {
    container.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    window.addEventListener('mousemove', throttledMouseMove, { passive: true })
    window.addEventListener('touchmove', throttledTouchMove, { passive: true })
  }

  const removeEventListeners = () => {
    container.removeEventListener('mouseenter', handleMouseEnter)
    container.removeEventListener('mouseleave', handleMouseLeave)
    window.removeEventListener('mousemove', throttledMouseMove)
    window.removeEventListener('touchmove', throttledTouchMove)
  }

  // Setup immediately on first load
  setupEventListeners()

  // Check if mouse is already over the component on initialization
  const checkInitialMousePosition = () => {
    const rect = container.getBoundingClientRect()
    // If component is visible in viewport, activate spotlight
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      isActive.value = true
    }
  }

  // Run verification after a small delay to ensure layout is ready
  setTimeout(checkInitialMousePosition, 100)

  // Intersection Observer for optimization (but not as main dependency)
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (!entry.isIntersecting) {
        // Only remove listeners if not visible
        removeEventListeners()
        isActive.value = false
      } else {
        // Re-add if necessary
        setupEventListeners()
      }
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
    }
  )

  intersectionObserver.observe(container)

  // Cleanup function
  cleanup = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
    }

    if (intersectionObserver) {
      intersectionObserver.disconnect()
    }

    removeEventListeners()
  }
})

onUnmounted(() => {
  cleanup?.()
})

// Expose methods for parent components
defineExpose({
  setPosition: (x: number, y: number) => {
    mousePosition.value = { x, y }
  },
  activate: () => {
    isActive.value = true
  },
  deactivate: () => {
    isActive.value = false
  },
})
</script>

<style scoped>
.spotlight-container {
  position: relative;
  min-height: 100vh;
  background: var(--vp-c-bg);
  overflow: hidden;
  /* Performance optimizations */
  transform: translateZ(0);
  will-change: auto;
  /* Set default CSS variables */
  --mouse-x: 50%;
  --mouse-y: 50%;
  --radius: 600px;
  --intensity: 1;
}

.spotlight-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.6; /* Always visible from start */
  /* More vibrant colors for light mode */
  background: radial-gradient(
    calc(var(--radius) * var(--intensity)) circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(79, 70, 229, calc(0.45 * var(--intensity))) 0%,
    rgba(79, 70, 229, calc(0.25 * var(--intensity))) 18%,
    rgba(147, 51, 234, calc(0.15 * var(--intensity))) 50%,
    transparent 85%
  );
  filter: blur(calc(28px * var(--intensity)));
  transition:
    opacity var(--vp-transition-timing-base) var(--vp-ease-out),
    background var(--vp-transition-timing-fast) var(--vp-ease-out),
    filter var(--vp-transition-timing-fast) var(--vp-ease-out);
  /* Performance optimizations */
  transform: translateZ(0);
  will-change: background, opacity;
}

.spotlight-container.spotlight-active .spotlight-glow {
  opacity: 0.9; /* More visible when active */
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

/* Dark mode adjustments */
.dark .spotlight-glow {
  opacity: 0.5; /* Visible by default in dark */
  background: radial-gradient(
    calc(var(--radius) * var(--intensity) * 1.2) circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(79, 70, 229, calc(0.20 * var(--intensity))) 0%,
    rgba(147, 51, 234, calc(0.15 * var(--intensity))) 50%,
    transparent 85%
  );
  filter: blur(calc(24px * var(--intensity)));
}

.dark .spotlight-container.spotlight-active .spotlight-glow {
  opacity: 0.8; /* More visible when active in dark */
}

.dark .spotlight-overlay {
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.12) 0%,
    transparent 60%,
    rgba(147, 51, 234, 0.15) 100%
  );
}

/* Fallback: Spotlight always visible even without JavaScript */
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .spotlight-glow {
    --radius: 400px;
    filter: blur(calc(24px * var(--intensity)));
  }

  .dark .spotlight-glow {
    filter: blur(calc(18px * var(--intensity)));
  }
}

@media (max-width: 480px) {
  .spotlight-glow {
    --radius: 300px;
    filter: blur(calc(16px * var(--intensity)));
  }

  .dark .spotlight-glow {
    filter: blur(calc(12px * var(--intensity)));
  }
}

/* Accessibility: Respect reduced motion preference */
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

/* High contrast mode support */
@media (prefers-contrast: high) {
  .spotlight-glow {
    opacity: 0.2;
  }

  .spotlight-overlay {
    opacity: 0.1;
  }
}

/* Ensure content is always above */
.spotlight-container > :slotted(*) {
  position: relative;
  z-index: 2;
}

/* Performance hint for GPU acceleration */
.spotlight-container,
.spotlight-glow,
.spotlight-overlay {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}</style>
