<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

// A soft brand-colored glow behind the home hero that follows the pointer.
// The gradient is painted once; moving it is a transform, so pointer moves
// never trigger a repaint. Touch screens and reduced motion get a still glow.

const root = ref<HTMLElement | null>(null)
const glow = ref<HTMLElement | null>(null)
const active = ref(false)

let frame = 0
let stop: (() => void) | undefined

function moveTo(clientX: number, clientY: number) {
  const box = root.value?.getBoundingClientRect()
  if (!box || !glow.value) return
  const inside = clientY >= box.top && clientY <= box.bottom
  active.value = inside
  if (!inside) return
  glow.value.style.translate = `${clientX - box.left}px ${clientY - box.top}px`
}

onMounted(() => {
  const canFollow = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  if (!canFollow.matches) return

  const onMove = (e: PointerEvent) => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => moveTo(e.clientX, e.clientY))
  }
  const onLeave = () => (active.value = false)

  window.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
  stop = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('pointermove', onMove)
    document.documentElement.removeEventListener('pointerleave', onLeave)
  }
})

onUnmounted(() => stop?.())
</script>

<template>
  <div ref="root" class="spotlight" aria-hidden="true">
    <div ref="glow" class="spotlight-glow" :class="{ 'is-active': active }" />
  </div>
</template>

<style scoped>
.spotlight {
  position: absolute;
  inset: 0;
  overflow: clip;
  /* Fade out toward the footer so the glow never ends on a hard edge. */
  mask-image: linear-gradient(to bottom, #000 60%, transparent);
  pointer-events: none;
  z-index: -1;
}

.spotlight-glow {
  --size: 1100px;
  position: absolute;
  top: 0;
  left: 0;
  width: var(--size);
  height: var(--size);
  margin: calc(var(--size) / -2) 0 0 calc(var(--size) / -2);
  /* Resting spot: centered over the headline, before the pointer arrives. */
  translate: 50vw 260px;
  border-radius: 50%;
  /* Brand-tinted so the glow follows a re-skin; a touch of violet at the rim. */
  background: radial-gradient(
    closest-side,
    color-mix(in oklch, var(--vp-c-brand-3) 38%, transparent),
    color-mix(in oklch, var(--vp-c-brand-3) 20%, transparent) 35%,
    color-mix(in oklch, var(--vp-c-brand-3) 10%, rgb(147 51 234 / 0.1)) 65%,
    transparent
  );
  opacity: 0.6;
  transition:
    translate 500ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 400ms ease;
}

.spotlight-glow.is-active {
  opacity: 1;
}

.dark .spotlight-glow {
  background: radial-gradient(
    closest-side,
    color-mix(in oklch, var(--vp-c-brand-2) 22%, transparent),
    color-mix(in oklch, var(--vp-c-brand-3) 12%, transparent) 35%,
    color-mix(in oklch, var(--vp-c-brand-3) 7%, rgb(147 51 234 / 0.07)) 65%,
    transparent
  );
}

@media (max-width: 768px) {
  .spotlight-glow {
    --size: 700px;
    translate: 50vw 200px;
  }
}
</style>
