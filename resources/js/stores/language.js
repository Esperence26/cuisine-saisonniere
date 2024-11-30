import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLocale: localStorage.getItem('locale') || 'fr',
    availableLocales: ['fr', 'en', 'de']
  }),

  getters: {
    getCurrentLocale: (state) => state.currentLocale,
    getAvailableLocales: (state) => state.availableLocales
  },

  actions: {
    setLocale(locale) {
      if (this.availableLocales.includes(locale)) {
        this.currentLocale = locale
        localStorage.setItem('locale', locale)
        const i18n = useI18n()
        i18n.locale.value = locale
        document.documentElement.lang = locale
        
        // Update meta tags for SEO
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
          metaDescription.setAttribute('content', i18n.t('app.description'))
        }
        
        // Update Open Graph meta tags
        const ogTitle = document.querySelector('meta[property="og:title"]')
        if (ogTitle) {
          ogTitle.setAttribute('content', i18n.t('app.name'))
        }
        
        const ogDescription = document.querySelector('meta[property="og:description"]')
        if (ogDescription) {
          ogDescription.setAttribute('content', i18n.t('app.description'))
        }
      }
    },

    initializeLocale() {
      const savedLocale = localStorage.getItem('locale')
      const browserLocale = navigator.language.split('-')[0]
      const locale = savedLocale || 
                    (this.availableLocales.includes(browserLocale) ? browserLocale : 'fr')
      this.setLocale(locale)
    }
  }
})
