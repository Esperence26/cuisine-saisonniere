<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden">
      <!-- Background pattern -->
      <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.100),white)]"></div>
      
      <!-- Header content -->
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {{ $t('recipes.title') }}
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            {{ $t('recipes.description') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- Search and filters -->
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <!-- Search -->
        <div class="relative flex-1 max-w-lg">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <i class="fas fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            :placeholder="$t('recipes.search_placeholder')"
            class="block w-full rounded-lg border-0 py-3 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600"
          >
        </div>

        <!-- View toggle and filters -->
        <div class="flex items-center gap-4">
          <!-- View toggle -->
          <div class="flex rounded-lg shadow-sm">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'relative inline-flex items-center px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10',
                viewMode === 'grid' 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500 ring-emerald-600' 
                  : 'bg-white text-gray-900',
                'rounded-l-lg'
              ]"
            >
              <i class="fas fa-th-large"></i>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'relative -ml-px inline-flex items-center px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10',
                viewMode === 'list'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500 ring-emerald-600'
                  : 'bg-white text-gray-900',
                'rounded-r-lg'
              ]"
            >
              <i class="fas fa-list"></i>
            </button>
          </div>

          <!-- Season filter -->
          <div class="relative">
            <button
              @click="showSeasonFilter = !showSeasonFilter"
              type="button"
              class="inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <i class="fas fa-leaf text-emerald-500"></i>
              {{ selectedSeason ? $t(`seasons.${selectedSeason}`) : $t('recipes.all_seasons') }}
              <i class="fas fa-chevron-down -mr-1 text-gray-400"></i>
            </button>

            <!-- Filter dropdown -->
            <div v-if="showSeasonFilter"
              class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <a href="#"
                  @click.prevent="selectedSeason = null; showSeasonFilter = false"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {{ $t('recipes.all_seasons') }}
                </a>
                <a v-for="season in seasons" :key="season"
                  href="#"
                  @click.prevent="selectedSeason = season; showSeasonFilter = false"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {{ $t(`seasons.${season}`) }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="(stat, index) in statistics" :key="index"
          class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 px-6 py-8 shadow-sm">
          <div class="absolute bottom-0 right-0 opacity-10 text-emerald-600">
            <i :class="stat.icon" class="text-8xl transform translate-x-4 translate-y-4"></i>
          </div>
          <dt class="text-sm font-medium text-gray-600">{{ $t(`recipes.stats.${stat.key}`) }}</dt>
          <dd class="mt-2 text-3xl font-bold tracking-tight text-gray-900">{{ stat.value }}</dd>
        </div>
      </div>

      <!-- Categories -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">
          {{ $t('recipes.categories_title') }}
        </h2>
        <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(category, index) in categories" :key="index"
            class="group relative overflow-hidden rounded-2xl">
            <div class="absolute inset-0">
              <img :src="category.image" :alt="category.name"
                class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0"></div>
            </div>
            <div class="relative flex flex-col justify-end px-6 py-8 h-80">
              <h3 class="font-semibold text-white">
                <a :href="category.href">
                  <span class="absolute inset-0"></span>
                  {{ $t(`categories.${category.key}`) }}
                </a>
              </h3>
              <p class="mt-2 text-sm text-gray-300">
                {{ $t(`categories.${category.key}_desc`) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recipe grid/list -->
      <div class="mt-16">
        <!-- Grid view -->
        <div v-if="viewMode === 'grid'"
          class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <div v-for="recipe in filteredRecipes" :key="recipe.id"
            class="group relative">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-2xl bg-gray-200">
              <img :src="recipe.image_url || '/images/default-recipe.jpg'" :alt="recipe.nom"
                class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div class="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="p-4 w-full">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4 text-white">
                      <span class="flex items-center">
                        <i class="fas fa-clock mr-1"></i>
                        {{ formatTime(recipe.temps_preparation + recipe.temps_cuisson) }}
                      </span>
                      <span class="flex items-center">
                        <i class="fas fa-utensils mr-1"></i>
                        {{ recipe.difficulte }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-900">
              <router-link :to="'/recipe/' + recipe.id">
                {{ recipe.nom }}
              </router-link>
            </h3>
            <p class="mt-1 text-sm text-gray-500 line-clamp-2">{{ recipe.description }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span v-for="tag in recipe.tags" :key="tag"
                class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- List view -->
        <div v-else class="divide-y divide-gray-200">
          <div v-for="recipe in filteredRecipes" :key="recipe.id"
            class="flex py-6 hover:bg-gray-50 rounded-xl transition-colors">
            <div class="h-40 w-40 flex-shrink-0 overflow-hidden rounded-xl">
              <img :src="recipe.image_url || '/images/default-recipe.jpg'" :alt="recipe.nom"
                class="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-300">
            </div>
            <div class="ml-6 flex flex-1 flex-col">
              <div class="flex justify-between">
                <h3 class="text-lg font-semibold text-gray-900">
                  <router-link :to="'/recipe/' + recipe.id">
                    {{ recipe.nom }}
                  </router-link>
                </h3>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span class="flex items-center">
                    <i class="fas fa-clock mr-1"></i>
                    {{ formatTime(recipe.temps_preparation + recipe.temps_cuisson) }}
                  </span>
                  <span class="flex items-center">
                    <i class="fas fa-utensils mr-1"></i>
                    {{ recipe.difficulte }}
                  </span>
                </div>
              </div>
              <p class="mt-2 flex-1 text-sm text-gray-500 line-clamp-3">{{ recipe.description }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span v-for="tag in recipe.tags" :key="tag"
                  class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import mockRecipes from '../data/mockData'

const { t } = useI18n()

// View mode state
const viewMode = ref('grid')
const showSeasonFilter = ref(false)
const selectedSeason = ref(null)
const searchQuery = ref('')

// Seasons data
const seasons = ['spring', 'summer', 'autumn', 'winter']

// Statistics
const statistics = [
  { key: 'total_recipes', value: mockRecipes.length, icon: 'fas fa-book-open' },
  { key: 'seasonal_products', value: '45+', icon: 'fas fa-carrot' },
  { key: 'active_chefs', value: '12', icon: 'fas fa-user-chef' },
  { key: 'happy_users', value: '1.2k', icon: 'fas fa-smile' }
]

// Categories
const categories = [
  {
    key: 'appetizers',
    image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a',
    href: '#'
  },
  {
    key: 'main_courses',
    image: 'https://images.unsplash.com/photo-1547928576-965be7f5f6a2',
    href: '#'
  },
  {
    key: 'desserts',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e',
    href: '#'
  }
]

// Computed properties
const filteredRecipes = computed(() => {
  let recipes = mockRecipes

  // Apply season filter
  if (selectedSeason.value) {
    recipes = recipes.filter(recipe => 
      recipe.season && recipe.season.toLowerCase() === selectedSeason.value.toLowerCase()
    )
  }

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    recipes = recipes.filter(recipe =>
      recipe.nom.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return recipes
})

// Helper function to format time
const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}min`
}
</script>
