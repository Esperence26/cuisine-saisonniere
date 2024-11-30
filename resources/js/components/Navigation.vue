<template>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <router-link to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Cuisine Saisonnière</span>
          <img class="h-12 w-auto" src="/img/logo.png" alt="Logo Cuisine Saisonnière" />
        </router-link>
      </div>
      
      <!-- Mobile menu button -->
      <div class="flex lg:hidden">
        <button 
          type="button" 
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Ouvrir le menu principal</span>
          <i class="fas fa-bars h-6 w-6"></i>
        </button>
      </div>

      <!-- Desktop navigation -->
      <div class="hidden lg:flex lg:gap-x-12">
        <router-link 
          v-for="item in navigation" 
          :key="item.name" 
          :to="item.href"
          class="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600"
          :class="{ 'text-emerald-600': isCurrentRoute(item.href) }"
        >
          {{ item.name }}
        </router-link>

        <!-- Dropdown menu -->
        <div class="relative">
          <button 
            type="button" 
            class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
            @click="toggleDropdown"
            @blur="closeDropdownOnBlur"
          >
            Catégories
            <i 
              class="fas fa-chevron-down h-4 w-4 transition-transform"
              :class="{ 'rotate-180': isDropdownOpen }"
            ></i>
          </button>

          <!-- Dropdown items -->
          <div 
            v-if="isDropdownOpen"
            class="absolute left-0 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
          >
            <div class="p-4">
              <div 
                v-for="category in categories" 
                :key="category.name" 
                class="group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
              >
                <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <i :class="[category.icon, 'text-gray-600 group-hover:text-emerald-600']"></i>
                </div>
                <div class="flex-auto">
                  <a 
                    :href="category.href" 
                    class="block font-semibold text-gray-900"
                  >
                    {{ category.name }}
                    <span class="absolute inset-0"></span>
                  </a>
                  <p class="mt-1 text-gray-600">{{ category.description }}</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              <a
                v-for="callout in callsToAction"
                :key="callout.name"
                :href="callout.href"
                class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
              >
                <i :class="[callout.icon, 'h-5 w-5 flex-none text-gray-400']"></i>
                {{ callout.name }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- User menu -->
      <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
        <router-link 
          to="/login" 
          class="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600"
        >
          Se connecter
        </router-link>
        <router-link 
          to="/register" 
          class="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          S'inscrire
        </router-link>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div 
      v-if="mobileMenuOpen" 
      class="lg:hidden"
      role="dialog" 
      aria-modal="true"
    >
      <div class="fixed inset-0 z-10"></div>
      <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <router-link to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Cuisine Saisonnière</span>
            <img class="h-8 w-auto" src="/img/logo.png" alt="Logo" />
          </router-link>
          <button 
            type="button" 
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Fermer le menu</span>
            <i class="fas fa-times h-6 w-6"></i>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                :class="{ 'text-emerald-600': isCurrentRoute(item.href) }"
              >
                {{ item.name }}
              </router-link>

              <!-- Mobile categories -->
              <div class="space-y-2">
                <button
                  type="button"
                  class="-mx-3 flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  @click="mobileCategoriesOpen = !mobileCategoriesOpen"
                >
                  Catégories
                  <i 
                    class="fas fa-chevron-down h-5 w-5 flex-none transition-transform"
                    :class="{ 'rotate-180': mobileCategoriesOpen }"
                  ></i>
                </button>
                <div v-if="mobileCategoriesOpen" class="mt-2 space-y-2">
                  <a
                    v-for="category in categories"
                    :key="category.name"
                    :href="category.href"
                    class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {{ category.name }}
                  </a>
                </div>
              </div>
            </div>
            <div class="py-6">
              <router-link
                to="/login"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Se connecter
              </router-link>
              <router-link
                to="/register"
                class="mt-4 block rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                S'inscrire
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)
const isDropdownOpen = ref(false)
const mobileCategoriesOpen = ref(false)

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'À propos', href: '/about' },
  { name: 'Produits', href: '/products' },
  { name: 'Contact', href: '/contact' },
]

const categories = [
  {
    name: 'Fruits & Légumes',
    description: 'Produits frais de saison directement de nos producteurs',
    href: '/categories/fruits-legumes',
    icon: 'fas fa-apple-alt'
  },
  {
    name: 'Produits Laitiers',
    description: 'Fromages et produits laitiers artisanaux',
    href: '/categories/produits-laitiers',
    icon: 'fas fa-cheese'
  },
  {
    name: 'Viandes & Poissons',
    description: 'Sélection de viandes et poissons de qualité',
    href: '/categories/viandes-poissons',
    icon: 'fas fa-drumstick-bite'
  },
  {
    name: 'Épicerie Fine',
    description: 'Produits d\'épicerie fine et spécialités locales',
    href: '/categories/epicerie',
    icon: 'fas fa-store'
  },
  {
    name: 'Boissons',
    description: 'Vins, jus et boissons artisanales',
    href: '/categories/boissons',
    icon: 'fas fa-wine-bottle'
  }
]

const callsToAction = [
  { name: 'Voir toutes les catégories', href: '/categories', icon: 'fas fa-th-large' },
  { name: 'Offres spéciales', href: '/offres', icon: 'fas fa-tag' }
]

const isCurrentRoute = (path) => {
  return route.path === path
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdownOnBlur = (event) => {
  // Ferme le dropdown seulement si on ne clique pas sur un élément du dropdown
  if (!event.relatedTarget || !event.relatedTarget.closest('.dropdown-menu')) {
    isDropdownOpen.value = false
  }
}

// Ferme le menu mobile quand on change de route
const closeMenus = () => {
  mobileMenuOpen.value = false
  mobileCategoriesOpen.value = false
  isDropdownOpen.value = false
}

onMounted(() => {
  window.addEventListener('resize', closeMenus)
})

onUnmounted(() => {
  window.removeEventListener('resize', closeMenus)
})
</script>
