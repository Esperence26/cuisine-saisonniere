<template>
  <nav class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <router-link :to="{ name: 'home' }" class="text-emerald-600 font-bold text-xl">
              Cuisine Saisonnière
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              v-for="item in navigationItems"
              :key="item.name"
              :to="{ name: item.name }"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium"
              :class="[
                $route.name === item.name
                  ? 'border-emerald-500 text-gray-900 border-b-2'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              ]"
            >
              {{ t(`nav.${item.name}`) }}
            </router-link>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
          <LanguageSelector />
          
          <template v-if="!isAuthenticated">
            <router-link
              :to="{ name: 'login' }"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
            >
              {{ t('auth.sign_in') }}
            </router-link>
            <router-link
              :to="{ name: 'register' }"
              class="bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              {{ t('auth.create_account') }}
            </router-link>
          </template>

          <template v-else>
            <!-- Cart Icon -->
            <router-link
              :to="{ name: 'cart' }"
              class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500"
            >
              <span class="absolute -inset-1.5"></span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span v-if="cartItemCount > 0" class="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-emerald-500 rounded-full">
                {{ cartItemCount }}
              </span>
            </router-link>

            <!-- Profile Dropdown -->
            <div class="relative ml-3">
              <button
                type="button"
                @click="isProfileMenuOpen = !isProfileMenuOpen"
                class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">{{ t('nav.open_user_menu') }}</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>

              <div
                v-if="isProfileMenuOpen"
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <router-link
                  :to="{ name: 'profile' }"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ t('profile.title') }}
                </router-link>
                <router-link
                  :to="{ name: 'orders' }"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ t('orders.title') }}
                </router-link>
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {{ t('auth.sign_out') }}
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="-mr-2 flex items-center sm:hidden">
          <button
            type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">{{ t('nav.open_menu') }}</span>
            <svg
              :class="{ hidden: isMobileMenuOpen, 'block': !isMobileMenuOpen }"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg
              :class="{ hidden: !isMobileMenuOpen, 'block': isMobileMenuOpen }"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="sm:hidden" :class="{ hidden: !isMobileMenuOpen }">
      <div class="space-y-1 pb-3 pt-2">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="{ name: item.name }"
          class="block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
          :class="[
            $route.name === item.name
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
          ]"
        >
          {{ t(`nav.${item.name}`) }}
        </router-link>
      </div>

      <div class="border-t border-gray-200 pb-3 pt-4">
        <div v-if="isAuthenticated" class="flex items-center px-4">
          <div class="flex-shrink-0">
            <img
              class="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">{{ userName }}</div>
            <div class="text-sm font-medium text-gray-500">{{ userEmail }}</div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <template v-if="isAuthenticated">
            <router-link
              :to="{ name: 'profile' }"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              {{ t('profile.title') }}
            </router-link>
            <router-link
              :to="{ name: 'orders' }"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              {{ t('orders.title') }}
            </router-link>
            <button
              @click="logout"
              class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              {{ t('auth.sign_out') }}
            </button>
          </template>
          <template v-else>
            <router-link
              :to="{ name: 'login' }"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              {{ t('auth.sign_in') }}
            </router-link>
            <router-link
              :to="{ name: 'register' }"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              {{ t('auth.create_account') }}
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSelector from '@/components/common/LanguageSelector.vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const cartStore = useCartStore()

const isMobileMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)

// Navigation items
const navigationItems = [
  { name: 'home', href: '/' },
  { name: 'products', href: '/products' },
  { name: 'about', href: '/about' },
  { name: 'contact', href: '/contact' }
]

// Computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.user?.name || '')
const userEmail = computed(() => authStore.user?.email || '')
const cartItemCount = computed(() => cartStore.itemCount)

// Methods
const logout = async () => {
  await authStore.logout()
  isProfileMenuOpen.value = false
  router.push({ name: 'home' })
}

// Close menus when clicking outside
const handleClickOutside = (event) => {
  if (isProfileMenuOpen.value && !event.target.closest('.relative')) {
    isProfileMenuOpen.value = false
  }
  if (isMobileMenuOpen.value && !event.target.closest('nav')) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
