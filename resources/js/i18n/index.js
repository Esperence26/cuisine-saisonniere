import { createI18n } from 'vue-i18n'
import fr from './fr.json'
import en from './en.json'
import de from './de.json'

const messages = {
  fr,
  en,
  de
}

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  messages,
  numberFormats: {
    fr: {
      currency: {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'symbol'
      }
    },
    en: {
      currency: {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'symbol'
      }
    },
    de: {
      currency: {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'symbol'
      }
    }
  },
  datetimeFormats: {
    fr: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }
    },
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }
    },
    de: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }
    }
  }
})

export default i18n
