---
layout: page
sidebar: false
aside: false
---


<HeroSection />

<script setup>
import { onMounted } from 'vue'

// SSR-safe language detection and redirect
onMounted(() => {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    const userLang = navigator.language || navigator.userLanguage
    if (userLang.startsWith('pt')) {
      window.location.replace('/pt/')
    } else if (userLang.startsWith('es')) {
      window.location.replace('/es/')
    } else if (userLang.startsWith('fr')) {
      window.location.replace('/fr/')
    } else {
      window.location.replace('/en/')
    }
  }
})
</script>

Not redirected? Choose a language:
- [Português](/pt/)
- [English](/en/)
- [Español](/es/)
- [Français](/fr/)
