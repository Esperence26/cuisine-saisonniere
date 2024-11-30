<template>
  <div class="bg-white">
    <!-- Hero section -->
    <div class="relative">
      <!-- Background image -->
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt=""
          class="h-full w-full object-cover"
        />
        <div class="absolute inset-0 bg-gray-900/60 mix-blend-multiply" />
      </div>

      <div class="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {{ $t('products.hero.title') }}
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-300 max-w-xl">
          {{ $t('products.hero.description') }}
        </p>
      </div>
    </div>

    <!-- Filters section -->
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <!-- Search -->
          <div class="relative w-full sm:w-96">
            <input
              type="text"
              v-model="searchQuery"
              :placeholder="$t('products.search.placeholder')"
              class="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <i class="fas fa-search text-gray-400"></i>
            </div>
          </div>

          <!-- Filters -->
          <div class="flex flex-wrap gap-4 items-center">
            <!-- Category filter -->
            <select
              v-model="selectedCategory"
              class="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm"
            >
              <option value="">Toutes les catégories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>

            <!-- Season filter -->
            <select
              v-model="selectedSeason"
              class="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm"
            >
              <option value="">Toutes les saisons</option>
              <option v-for="season in seasons" :key="season" :value="season">
                {{ season }}
              </option>
            </select>

            <!-- Sort -->
            <select
              v-model="sortBy"
              class="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-emerald-600 sm:text-sm"
            >
              <option value="popular">Les plus populaires</option>
              <option value="recent">Plus récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        <!-- Active filters -->
        <div class="mt-4 flex flex-wrap gap-2">
          <button
            v-if="selectedCategory"
            @click="selectedCategory = ''"
            class="inline-flex items-center gap-x-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700"
          >
            {{ selectedCategory }}
            <i class="fas fa-times-circle"></i>
          </button>
          <button
            v-if="selectedSeason"
            @click="selectedSeason = ''"
            class="inline-flex items-center gap-x-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700"
          >
            {{ selectedSeason }}
            <i class="fas fa-times-circle"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Products grid -->
    <div class="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
      <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group relative"
        >
          <!-- Product image -->
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
            <img
              :src="product.imageUrl"
              :alt="product.name"
              class="h-full w-full object-cover object-center group-hover:opacity-75"
            />
            <!-- Season badge -->
            <div class="absolute top-2 right-2">
              <span class="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                {{ product.season }}
              </span>
            </div>
          </div>

          <!-- Product info -->
          <div class="mt-4">
            <h3 class="text-sm text-gray-700">
              <router-link :to="{ name: 'product', params: { id: product.id }}">
                <span class="absolute inset-0"></span>
                {{ product.name }}
              </router-link>
            </h3>
            <div class="mt-1 flex items-center justify-between">
              <p class="text-sm text-gray-500">{{ product.producer }}</p>
              <p class="text-sm font-medium text-gray-900">{{ formatPrice(product.price) }}</p>
            </div>
            <div class="mt-1 flex items-center gap-x-1">
              <i class="fas fa-star text-yellow-400 text-sm"></i>
              <span class="text-sm text-gray-500">{{ product.rating }} ({{ product.reviews }})</span>
            </div>
          </div>

          <!-- Quick add button -->
          <button
            @click="addToCart(product)"
            class="absolute bottom-0 right-0 m-4 rounded-full bg-emerald-600 p-2 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <i class="fas fa-search text-gray-400 text-4xl mb-4"></i>
        <h3 class="text-sm font-medium text-gray-900">Aucun produit trouvé</h3>
        <p class="mt-1 text-sm text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
      </div>

      <!-- Load more -->
      <div v-if="hasMoreProducts" class="text-center mt-12">
        <button
          @click="loadMore"
          class="inline-flex items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Voir plus de produits
          <i class="fas fa-chevron-down ml-2"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Filters state
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedSeason = ref('')
const sortBy = ref('popular')

// Filter options
const categories = ['Fruits', 'Légumes', 'Herbes', 'Produits laitiers', 'Viandes', 'Boissons']
const seasons = ['Printemps', 'Été', 'Automne', 'Hiver']

// Products data (mock)
const products = ref([
  {
    id: 1,
    name: 'Tomates cerises bio',
    producer: 'Ferme des Délices',
    price: 3.50,
    rating: 4.8,
    reviews: 124,
    category: 'Légumes',
    season: 'Été',
    imageUrl: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Fraises Gariguette',
    producer: 'Les Jardins de Marie',
    price: 4.90,
    rating: 4.9,
    reviews: 89,
    category: 'Fruits',
    season: 'Printemps',
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Basilic frais',
    producer: 'Herbes & Traditions',
    price: 2.20,
    rating: 4.7,
    reviews: 56,
    category: 'Herbes',
    season: 'Été',
    imageUrl: 'https://images.unsplash.com/photo-1618164435735-413d3b066c9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Fromage de chèvre',
    producer: 'La Chèvrerie du Val',
    price: 5.80,
    rating: 4.9,
    reviews: 203,
    category: 'Produits laitiers',
    season: 'Printemps',
    imageUrl: 'https://images.unsplash.com/photo-1634487359989-3e90c9432133?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
  },
  // Add more products...
])

// Computed properties
const filteredProducts = computed(() => {
  let result = products.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.producer.toLowerCase().includes(query)
    )
  }

  // Apply category filter
  if (selectedCategory.value) {
    result = result.filter(product => product.category === selectedCategory.value)
  }

  // Apply season filter
  if (selectedSeason.value) {
    result = result.filter(product => product.season === selectedSeason.value)
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'recent':
      result = [...result].sort((a, b) => b.id - a.id)
      break
    case 'price-asc':
      result = [...result].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result = [...result].sort((a, b) => b.price - a.price)
      break
    default: // 'popular'
      result = [...result].sort((a, b) => b.rating - a.rating)
  }

  return result
})

const hasMoreProducts = computed(() => {
  // Mock implementation - in real app, this would depend on pagination
  return false
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const addToCart = (product) => {
  // Implement cart functionality
  console.log('Added to cart:', product.name)
}

const loadMore = () => {
  // Implement pagination
  console.log('Loading more products...')
}
</script>
