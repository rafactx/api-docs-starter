import '@scalar/api-reference/style.css'
import { MotionPlugin } from '@vueuse/motion'
import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'


// Custom components
import ApiCard from '../components/ApiCard.vue'
import HeroSection from '../components/HeroSection.vue'
import ScalarApi from '../components/ScalarApi.vue'

// Global styles
import './api-docs-responsive.css'
import './fonts.css'
import './sidebar.css'
import './style.css'

const customTheme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Plugins
    app.use(MotionPlugin)

    // Global components
    app.component('HeroSection', HeroSection)
    app.component('ScalarApi', ScalarApi)
    app.component('ApiCard', ApiCard)

    // Global error configuration
    app.config.errorHandler = (err, instance, info) => {
      console.error('Global Vue error:', err)
      console.error('Info:', info)
    }
  }
}

export default customTheme
