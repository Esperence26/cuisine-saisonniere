<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <!-- En-tête -->
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          {{ $t('products.seasonal.title') }}
        </h1>
        <div class="flex items-center space-x-4">
          <ProductSort v-model="sortBy" />
          <button
            type="button"
            class="lg:hidden p-2 text-gray-400 hover:text-gray-500"
            @click="mobileFiltersOpen = true"
          >
            <span class="sr-only">{{ $t('products.filters') }}</span>
            <FunnelIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Description -->
      <p class="mt-4 text-base text-gray-500">
        {{ $t('products.seasonal.description') }}
      </p>

      <div class="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <!-- Filtres mobile -->
        <TransitionRoot as="template" :show="mobileFiltersOpen">
          <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
            <TransitionChild
              as="template"
              enter="transition-opacity ease-linear duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 z-40 flex">
              <TransitionChild
                as="template"
                enter="transition ease-in-out duration-300 transform"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <DialogPanel class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                  <div class="flex items-center justify-between px-4">
                    <h2 class="text-lg font-medium text-gray-900">{{ $t('products.filters') }}</h2>
                    <button
                      type="button"
                      class="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                      @click="mobileFiltersOpen = false"
                    >
                      <span class="sr-only">{{ $t('common.close') }}</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <!-- Filtres -->
                  <div class="mt-4 px-4">
                    <ProductFilters
                      :initial-filters="filters"
                      @update:filters="updateFilters"
                    />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </TransitionRoot>

        <!-- Filtres desktop -->
        <div class="hidden lg:block">
          <ProductFilters
            :initial-filters="filters"
            @update:filters="updateFilters"
          />
        </div>

        <!-- Grille de produits -->
        <div class="lg:col-span-2 xl:col-span-3">
          <ProductGrid
            :products="filteredProducts"
            :loading="loading"
            :current-page="currentPage"
            :per-page="perPage"
            :total-items="totalItems"
            @update:current-page="currentPage = $event"
            @add-to-cart="addToCart"
          />
        </div>
      </div>
    </div>

    <!-- Notification -->
    <Notification
      v-if="notification"
      :message="notification.message"
      :type="notification.type"
      @close="notification = null"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon, FunnelIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import { useNotificationStore } from '@/stores/notification'
import { productsApi } from '@/services/api'
import ProductFilters from '@/components/products/ProductFilters.vue'
import ProductSort from '@/components/products/ProductSort.vue'
import ProductGrid from '@/components/products/ProductGrid.vue'
import Notification from '@/components/common/Notification.vue'

const cartStore = useCartStore()
const notificationStore = useNotificationStore()

const loading = ref(true)
const products = ref([])
const mobileFiltersOpen = ref(false)
const currentPage = ref(1)
const perPage = ref(12)
const totalItems = ref(0)
const notification = ref(null)

const filters = ref({
  seasons: [],
  categories: [],
  minPrice: null,
  maxPrice: null
})

const sortBy = ref('name-asc')

const filteredProducts = computed(() => {
  let result = [...products.value]

  // Appliquer les filtres
  if (filters.value.seasons.length > 0) {
    result = result.filter(product => filters.value.seasons.includes(product.saison))
  }

  if (filters.value.categories.length > 0) {
    result = result.filter(product => filters.value.categories.includes(product.categorie))
  }

  if (filters.value.minPrice !== null) {
    result = result.filter(product => product.prix_unitaire >= filters.value.minPrice)
  }

  if (filters.value.maxPrice !== null) {
    result = result.filter(product => product.prix_unitaire <= filters.value.maxPrice)
  }

  // Appliquer le tri
  result.sort((a, b) => {
    switch (sortBy.value) {
      case 'price-asc':
        return a.prix_unitaire - b.prix_unitaire
      case 'price-desc':
        return b.prix_unitaire - a.prix_unitaire
      case 'name-asc':
        return a.nom.localeCompare(b.nom)
      case 'name-desc':
        return b.nom.localeCompare(a.nom)
      default:
        return 0
    }
  })

  return result
})

const updateFilters = (newFilters) => {
  filters.value = newFilters
  currentPage.value = 1
}

const addToCart = (product) => {
  cartStore.addItem(product)
  notificationStore.addNotification({
    message: `${product.nom} a été ajouté au panier`,
    type: 'success'
  })
}

const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await productsApi.getAll()
    products.value = response.data.data
    totalItems.value = products.value.length
  } catch (error) {
    notificationStore.addNotification({
      message: "Une erreur est survenue lors du chargement des produits",
      type: 'error'
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>
