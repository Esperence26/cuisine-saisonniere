<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">{{ $t('products.title') }}</h1>
      <router-link 
        v-if="isAdmin"
        to="/products/create" 
        class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
      >
        {{ $t('products.add') }}
      </router-link>
    </div>

    <!-- Filtres -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('products.filters.seasonal') }}
          </label>
          <select 
            v-model="filters.seasonal" 
            class="w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">{{ $t('common.all') }}</option>
            <option value="true">{{ $t('products.seasonal') }}</option>
            <option value="false">{{ $t('products.nonSeasonal') }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('products.filters.season') }}
          </label>
          <select 
            v-model="filters.season" 
            class="w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">{{ $t('common.all') }}</option>
            <option value="spring">{{ $t('seasons.spring') }}</option>
            <option value="summer">{{ $t('seasons.summer') }}</option>
            <option value="autumn">{{ $t('seasons.autumn') }}</option>
            <option value="winter">{{ $t('seasons.winter') }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Liste des produits -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span class="block sm:inline">{{ error }}</span>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow overflow-hidden">
        <img 
          v-if="product.image" 
          :src="'/storage/' + product.image" 
          :alt="product.name"
          class="w-full h-48 object-cover"
        >
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
          <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-emerald-600 font-bold">{{ formatPrice(product.price) }}</span>
            <button 
              @click="addToCart(product)"
              class="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
              :disabled="product.stock === 0"
            >
              {{ product.stock > 0 ? $t('products.addToCart') : $t('products.outOfStock') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="changePage(page)"
          :class="[
            'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
            currentPage === page
              ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
          ]"
        >
          {{ page }}
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useProductStore } from '@/stores/products'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const cartStore = useCartStore()
const { t } = useI18n()

const { products, loading, error, totalPages, currentPage } = storeToRefs(productStore)
const filters = ref({
  seasonal: '',
  season: ''
})

const isAdmin = ref(false) // À remplacer par la logique d'authentification réelle

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const addToCart = (product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
    image: product.image
  })
}

const changePage = (page) => {
  productStore.fetchProducts(page, filters.value)
}

watch(filters, () => {
  productStore.fetchProducts(1, filters.value)
}, { deep: true })

onMounted(() => {
  productStore.fetchProducts(1, filters.value)
})
</script>
