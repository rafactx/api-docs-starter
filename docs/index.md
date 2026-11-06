---
layout: page
sidebar: false
aside: false
---

<HeroSection />

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const lang = navigator.language.slice(0, 2)
  window.location.replace(['pt', 'es', 'fr'].includes(lang) ? `/${lang}/` : '/en/')
})
</script>

Not redirected? Choose a language:
- [Português](/pt/)
- [English](/en/)
- [Español](/es/)
- [Français](/fr/)
