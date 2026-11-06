import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

import ApiCard from '../components/ApiCard.vue'
import HomeSpotlight from '../components/HomeSpotlight.vue'
import ScalarApi from '../components/ScalarApi.vue'

import './fonts.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { 'home-hero-before': () => h(HomeSpotlight) }),
  enhanceApp({ app }) {
    app.component('ApiCard', ApiCard)
    app.component('ScalarApi', ScalarApi)
  }
} satisfies Theme
