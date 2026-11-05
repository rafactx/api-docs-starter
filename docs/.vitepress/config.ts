import { resolve } from 'path'
import { defineConfig } from 'vitepress'

// Shared configuration
const sharedLogo = {
  light: '/logo-light.svg',
  dark: '/logo-dark.svg',
  alt: 'API Docs Starter Logo'
}

const sharedFooter = {
  copyright: `
    API Docs Starter © 2025 · made with care by
    <a href="https://github.com/rafactx" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 4px;">
    <span>rafactx</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style="vertical-align: text-bottom;">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.94.58.1.79-.25.79-.56v-2.15c-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.04 1.78 2.72 1.27 3.38.97.1-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.11-3.12 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.62.23 2.82.11 3.12.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.28 5.69.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A10.5 10.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/>
      </svg>
    </a>`
}

export default defineConfig({
  base: '/',
  cleanUrls: true,
  lastUpdated: false,
  ignoreDeadLinks: true,

  head: [
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['script', { src: 'https://va.vercel-scripts.com/v1/script.js', defer: true }]
  ],

  locales: {
    pt: {
      label: 'Português (Brasil)',
      lang: 'pt',
      title: 'API Documentation Starter',
      description: 'Template moderno para documentação de APIs com VitePress, Vue 3 e TailwindCSS',
      link: '/pt/',
      themeConfig: {
        siteTitle: false,
        logo: sharedLogo,
        nav: [
          { text: 'Home', link: '/pt/' },
          { text: 'Guia da API', link: '/pt/intro' },
          { text: 'API Reference', link: '/pt/api-reference' },
          {
            text: 'Recursos',
            items: [
              { text: 'GitHub', link: 'https://github.com/rafactx/api-docs-starter' }
            ]
          }
        ],
        sidebar: [
          {
            text: 'Guia da API',
            items: [
              { text: 'Introdução', link: '/pt/intro' },
              { text: 'Autenticação', link: '/pt/authentication' },
              { text: 'Limites', link: '/pt/rate-limits' },
              { text: 'Exemplos', link: '/pt/examples' }
            ]
          },
          {
            text: 'Referência',
            items: [
              { text: 'Paginação e links', link: '/pt/pagination' },
              { text: 'Erros', link: '/pt/errors' }
            ]
          }
        ],
        search: {
          provider: 'local',
          options: {
            locales: {
              pt: {
                translations: {
                  button: {
                    buttonText: 'Buscar documentos',
                    buttonAriaLabel: 'Buscar documentos'
                  },
                  modal: {
                    noResultsText: 'Nenhum resultado encontrado',
                    resetButtonTitle: 'Limpar busca',
                    footer: {
                      selectText: 'para selecionar',
                      navigateText: 'para navegar',
                      closeText: 'para fechar'
                    }
                  }
                }
              }
            }
          }
        },
        outline: {
          level: [2, 3],
          label: 'Nesta página'
        },
        footer: sharedFooter,
        docFooter: {
          prev: 'Página anterior',
          next: 'Próxima página'
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/rafactx/api-docs-starter' }
        ]
      }
    },

    en: {
      label: 'English',
      lang: 'en',
      title: 'API Documentation Starter',
      description: 'Modern API documentation template with VitePress, Vue 3, and TailwindCSS',
      link: '/en/',
      themeConfig: {
        siteTitle: false,
        logo: sharedLogo,
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'API Guide', link: '/en/intro' },
          { text: 'API Reference', link: '/en/api-reference' },
          {
            text: 'Resources',
            items: [
              { text: 'GitHub', link: 'https://github.com/rafactx/api-docs-starter' }
            ]
          }
        ],
        sidebar: [
          {
            text: 'API Guide',
            items: [
              { text: 'Introduction', link: '/en/intro' },
              { text: 'Authentication', link: '/en/authentication' },
              { text: 'Rate Limits', link: '/en/rate-limits' },
              { text: 'Examples', link: '/en/examples' }
            ]
          },
          {
            text: 'Reference',
            items: [
              { text: 'Pagination & links', link: '/en/pagination' },
              { text: 'Errors', link: '/en/errors' }
            ]
          }
        ],
        outline: {
          level: [2, 3],
          label: 'On this page'
        },
        footer: sharedFooter,
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/rafactx/api-docs-starter' }
        ]
      }
    },

    es: {
      label: 'Español',
      lang: 'es',
      title: 'API Documentation Starter',
      description: 'Plantilla moderna para documentación de APIs con VitePress, Vue 3 y TailwindCSS',
      link: '/es/',
      themeConfig: {
        siteTitle: false,
        logo: sharedLogo,
        nav: [
          { text: 'Inicio', link: '/es/' },
          { text: 'Guía de la API', link: '/es/intro' },
          { text: 'Referencia API', link: '/es/api-reference' }
        ],
        sidebar: [
          {
            text: 'Guía de la API',
            items: [
              { text: 'Introducción', link: '/es/intro' },
              { text: 'Autenticación', link: '/es/authentication' },
              { text: 'Límites', link: '/es/rate-limits' },
              { text: 'Ejemplos', link: '/es/examples' }
            ]
          },
          {
            text: 'Referencia',
            items: [
              { text: 'Paginación y enlaces', link: '/es/pagination' },
              { text: 'Errores', link: '/es/errors' }
            ]
          }
        ],
        outline: {
          level: [2, 3],
          label: 'En esta página'
        },
        footer: sharedFooter,
        docFooter: {
          prev: 'Página anterior',
          next: 'Siguiente página'
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/rafactx/api-docs-starter' }
        ]
      }
    },

    fr: {
      label: 'Français',
      lang: 'fr',
      title: 'API Documentation Starter',
      description: 'Template moderne pour la documentation d\'API avec VitePress, Vue 3 et TailwindCSS',
      link: '/fr/',
      themeConfig: {
        siteTitle: false,
        logo: sharedLogo,
        nav: [
          { text: 'Accueil', link: '/fr/' },
          { text: "Guide de l'API", link: '/fr/intro' },
          { text: "Référence API", link: '/fr/api-reference' }
        ],
        sidebar: [
          {
            text: "Guide de l'API",
            items: [
              { text: 'Introduction', link: '/fr/intro' },
              { text: 'Authentification', link: '/fr/authentication' },
              { text: 'Limites', link: '/fr/rate-limits' },
              { text: 'Exemples', link: '/fr/examples' }
            ]
          },
          {
            text: 'Référence',
            items: [
              { text: 'Pagination et liens', link: '/fr/pagination' },
              { text: 'Erreurs', link: '/fr/errors' }
            ]
          }
        ],
        outline: {
          level: [2, 3],
          label: 'Sur cette page'
        },
        footer: sharedFooter,
        docFooter: {
          prev: 'Page précédente',
          next: 'Page suivante'
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/rafactx/api-docs-starter' }
        ]
      }
    }
  },

  vite: {
    ssr: {
      noExternal: ['@scalar/api-reference', '@vueuse/motion', '@vueuse/core', 'motion-v']
    },
    build: {
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
        }
      }
    },
    css: {
      postcss: {
        plugins: []
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './theme')
      }
    }
  }
})
