<script setup lang="ts">
import { inBrowser } from 'vitepress'
import { onMounted } from 'vue'

onMounted(async () => {
  if (!inBrowser) return

  try {
    // Import and initialize Vercel Analytics
    const { inject } = await import('@vercel/analytics')
    inject()

    // Import and initialize Speed Insights
    const { inject: injectSpeedInsights } = await import('@vercel/speed-insights')
    injectSpeedInsights()
  } catch (error) {
    console.warn('Failed to load Vercel analytics:', error)
  }
})
</script>

<template>
  <!-- This component doesn't render anything visible -->
</template>