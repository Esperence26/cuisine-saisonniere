<template>
  <nav class="bg-gradient-to-r from-emerald-600 to-teal-500 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-12 w-12" src="/images/logo.svg" alt="Logo">
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  $route.path === item.href
                    ? 'bg-emerald-700 text-white'
                    : 'text-white hover:bg-emerald-500',
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200'
                ]"
              >
                {{ $t(item.name) }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex space-x-3">
            <button
              v-for="locale in availableLocales"
              :key="locale.code"
              @click="changeLocale(locale.code)"
              class="text-white hover:bg-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              {{ locale.flag }} {{ locale.name }}
            </button>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <button
              class="bg-emerald-500 p-1 rounded-full text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-600 focus:ring-white transition-colors duration-200"
            >
              <span class="sr-only">{{ $t('notifications') }}</span>
              <BellIcon class="h-6 w-6" />
            </button>
            <div class="ml-3 relative">
              <div>
                <button
                  class="max-w-xs bg-emerald-500 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-600 focus:ring-white transition-colors duration-200"
                >
                  <span class="sr-only">{{ $t('user_menu') }}</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="user.imageUrl"
                    alt=""
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { BellIcon } from '@heroicons/vue/outline'

export default {
  components: {
    BellIcon,
  },
  setup() {
    const navigation = [
      { name: 'menu.home', href: '/' },
      { name: 'menu.products', href: '/products' },
      { name: 'menu.recipes', href: '/recipes' },
      { name: 'menu.orders', href: '/orders' },
    ]

    const availableLocales = [
      { code: 'fr', name: 'FR', flag: '🇫🇷' },
      { code: 'en', name: 'EN', flag: '🇬🇧' },
      { code: 'de', name: 'DE', flag: '🇩🇪' },
    ]

    const user = ref({
      imageUrl: '/images/default-avatar.png',
    })

    const changeLocale = (locale) => {
      // Implémenter le changement de langue
    }

    return {
      navigation,
      availableLocales,
      user,
      changeLocale,
    }
  },
}
</script>
