import '@scalar/api-reference/style.css'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import ApiCard from '../components/ApiCard.vue'
import HeroSection from '../components/HeroSection.vue'
import ScalarApi from '../components/ScalarApi.vue'

import './api-docs-responsive.css'
import './fonts.css'
import './sidebar.css'
import './style.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HeroSection', HeroSection)
    app.component('ScalarApi', ScalarApi)
    app.component('ApiCard', ApiCard)
  }
}

export default theme
