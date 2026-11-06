import { BookOpen, Gauge, KeyRound, ListOrdered, SquareCode, TriangleAlert } from 'lucide-static'
import { defineConfig, type DefaultTheme, type LocaleSpecificConfig } from 'vitepress'

// Every string that changes per language. Adding a locale means adding an
// entry here, its docs/<code>/ pages and docs/public/openapi.<lang>.json.
const LOCALES = {
  en: {
    label: 'English',
    lang: 'en',
    description: 'Multilingual API documentation portal with VitePress and Scalar',
    nav: { home: 'Home', guide: 'API guide', reference: 'API reference' },
    sidebar: {
      guide: 'API guide',
      intro: 'Introduction',
      auth: 'Authentication',
      limits: 'Rate limits',
      examples: 'Examples',
      reference: 'Reference',
      pagination: 'Pagination & links',
      errors: 'Errors'
    },
    outline: 'On this page',
    prev: 'Previous page',
    next: 'Next page',
    search: null
  },
  pt: {
    label: 'Português (Brasil)',
    lang: 'pt-BR',
    description: 'Portal de documentação de API multilíngue com VitePress e Scalar',
    nav: { home: 'Início', guide: 'Guia da API', reference: 'Referência da API' },
    sidebar: {
      guide: 'Guia da API',
      intro: 'Introdução',
      auth: 'Autenticação',
      limits: 'Limites',
      examples: 'Exemplos',
      reference: 'Referência',
      pagination: 'Paginação e links',
      errors: 'Erros'
    },
    outline: 'Nesta página',
    prev: 'Página anterior',
    next: 'Próxima página',
    search: ['Buscar', 'Nenhum resultado para', 'Limpar busca', 'selecionar', 'navegar', 'fechar']
  },
  es: {
    label: 'Español',
    lang: 'es',
    description: 'Portal de documentación de API multilingüe con VitePress y Scalar',
    nav: { home: 'Inicio', guide: 'Guía de la API', reference: 'Referencia de la API' },
    sidebar: {
      guide: 'Guía de la API',
      intro: 'Introducción',
      auth: 'Autenticación',
      limits: 'Límites',
      examples: 'Ejemplos',
      reference: 'Referencia',
      pagination: 'Paginación y enlaces',
      errors: 'Errores'
    },
    outline: 'En esta página',
    prev: 'Página anterior',
    next: 'Página siguiente',
    search: ['Buscar', 'Sin resultados para', 'Borrar búsqueda', 'seleccionar', 'navegar', 'cerrar']
  },
  fr: {
    label: 'Français',
    lang: 'fr',
    description: "Portail de documentation d'API multilingue avec VitePress et Scalar",
    nav: { home: 'Accueil', guide: "Guide de l'API", reference: "Référence de l'API" },
    sidebar: {
      guide: "Guide de l'API",
      intro: 'Introduction',
      auth: 'Authentification',
      limits: 'Limites',
      examples: 'Exemples',
      reference: 'Référence',
      pagination: 'Pagination et liens',
      errors: 'Erreurs'
    },
    outline: 'Sur cette page',
    prev: 'Page précédente',
    next: 'Page suivante',
    search: ['Rechercher', 'Aucun résultat pour', 'Effacer la recherche', 'sélectionner', 'naviguer', 'fermer']
  }
} as const

type Strings = (typeof LOCALES)[keyof typeof LOCALES]

// Icons are inlined into the sidebar labels; style.css sizes them.
const icon = (svg: string) => svg.replace('<svg', '<svg aria-hidden="true"')

function sidebar(code: string, t: Strings['sidebar']): DefaultTheme.SidebarItem[] {
  const item = (svg: string, text: string, page: string) => ({
    text: `${icon(svg)}<span>${text}</span>`,
    docFooterText: text,
    link: `/${code}/${page}`
  })

  return [
    {
      text: t.guide,
      collapsed: false,
      items: [
        item(BookOpen, t.intro, 'intro'),
        item(KeyRound, t.auth, 'authentication'),
        item(Gauge, t.limits, 'rate-limits'),
        item(SquareCode, t.examples, 'examples')
      ]
    },
    {
      text: t.reference,
      collapsed: false,
      items: [
        item(ListOrdered, t.pagination, 'pagination'),
        item(TriangleAlert, t.errors, 'errors')
      ]
    }
  ]
}

function locale(code: string, s: Strings): LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link: string } {
  return {
    label: s.label,
    lang: s.lang,
    link: `/${code}/`,
    description: s.description,
    themeConfig: {
      nav: [
        { text: s.nav.home, link: `/${code}/` },
        // Active on every guide page, not only the first one.
        { text: s.nav.guide, link: `/${code}/intro`, activeMatch: `^/${code}/(?!api-reference)[^/]+` },
        { text: s.nav.reference, link: `/${code}/api-reference` }
      ],
      sidebar: sidebar(code, s.sidebar),
      outline: { level: [2, 3], label: s.outline },
      docFooter: { prev: s.prev, next: s.next }
    }
  }
}

function searchLocale([button, noResults, reset, select, navigate, close]: readonly string[]) {
  return {
    translations: {
      button: { buttonText: button, buttonAriaLabel: button },
      modal: {
        noResultsText: noResults,
        resetButtonTitle: reset,
        footer: { selectText: select, navigateText: navigate, closeText: close }
      }
    }
  }
}

const entries = Object.entries(LOCALES)

export default defineConfig({
  title: 'API Documentation Starter',
  description: LOCALES.en.description,
  lang: 'en',
  cleanUrls: true,

  head: [
    ['meta', { name: 'theme-color', content: '#4f46e5' }],
    ['link', { rel: 'icon', href: '/logo-light.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'preload', href: '/fonts/Poppins-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }],
    ['link', { rel: 'preload', href: '/fonts/HeptaSlab-SemiBold.woff2', as: 'font', type: 'font/woff2', crossorigin: '' }]
  ],

  themeConfig: {
    siteTitle: false,
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg', alt: 'API Docs Starter' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/rafactx/api-docs-starter' }],
    // Shown only on pages without a sidebar, which here means the home pages.
    footer: { message: 'MIT License · <a href="https://github.com/rafactx">rafactx</a>' },
    search: {
      provider: 'local',
      options: {
        locales: Object.fromEntries(
          entries.filter(([, s]) => s.search).map(([code, s]) => [code, searchLocale(s.search!)])
        )
      }
    }
  },

  locales: Object.fromEntries(entries.map(([code, s]) => [code, locale(code, s)])),

  vite: {
    ssr: {
      noExternal: ['@scalar/api-reference']
    }
  }
})
