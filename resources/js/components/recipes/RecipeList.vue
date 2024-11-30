<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">{{ $t('recipes.title') }}</h1>
      <router-link 
        v-if="isAdmin"
        to="/recipes/create" 
        class="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
      >
        {{ $t('recipes.add') }}
      </router-link>
    </div>

    <!-- Filtres -->
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('recipes.filters.seasonal') }}
          </label>
          <select 
            v-model="filters.seasonal" 
            class="w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">{{ $t('common.all') }}</option>
            <option value="true">{{ $t('recipes.seasonal') }}</option>
            <option value="false">{{ $t('recipes.nonSeasonal') }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('recipes.filters.season') }}
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

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('recipes.filters.difficulty') }}
          </label>
          <select 
            v-model="filters.difficulty" 
            class="w-full border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="">{{ $t('common.all') }}</option>
            <option value="easy">{{ $t('recipes.difficulty.easy') }}</option>
            <option value="medium">{{ $t('recipes.difficulty.medium') }}</option>
            <option value="hard">{{ $t('recipes.difficulty.hard') }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Liste des recettes -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span class="block sm:inline">{{ error }}</span>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="recipe in recipes" :key="recipe.id" class="bg-white rounded-lg shadow overflow-hidden">
        <img 
          v-if="recipe.image" 
          :src="'/storage/' + recipe.image" 
          :alt="recipe.title"
          class="w-full h-48 object-cover"
        >
        <div class="p-4">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold text-gray-900">{{ recipe.title }}</h3>
            <span :class="difficultyBadgeClass(recipe.difficulty)" class="px-2 py-1 text-xs rounded-full">
              {{ $t(`recipes.difficulty.${recipe.difficulty}`) }}
            </span>
          </div>
          
          <p class="text-gray-600 text-sm mb-4">{{ recipe.description }}</p>
          
          <div class="flex items-center text-sm text-gray-500 mb-4">
            <div class="flex items-center mr-4">
              <ClockIcon class="h-4 w-4 mr-1" />
              {{ formatTime(recipe.prep_time + recipe.cook_time) }}
            </div>
            <div class="flex items-center">
              <UserGroupIcon class="h-4 w-4 mr-1" />
              {{ recipe.servings }} {{ $t('recipes.servings') }}
            </div>
          </div>

          <router-link 
            :to="'/recipes/' + recipe.id" 
            class="block w-full text-center bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
          >
            {{ $t('recipes.viewDetails') }}
          </router-link>
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
import { useRecipeStore } from '@/stores/recipes'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { ClockIcon, UserGroupIcon } from '@heroicons/vue/outline'

const recipeStore = useRecipeStore()
const { t } = useI18n()

const { recipes, loading, error, totalPages, currentPage } = storeToRefs(recipeStore)
const filters = ref({
  seasonal: '',
  season: '',
  difficulty: ''
})

const isAdmin = ref(false) // À remplacer par la logique d'authentification réelle

const formatTime = (minutes) => {
  if (!minutes) return '0 min'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`
}

const difficultyBadgeClass = (difficulty) => {
  const classes = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  }
  return classes[difficulty] || classes.medium
}

const changePage = (page) => {
  recipeStore.fetchRecipes(page, filters.value)
}

watch(filters, () => {
  recipeStore.fetchRecipes(1, filters.value)
}, { deep: true })

onMounted(() => {
  recipeStore.fetchRecipes(1, filters.value)
})
</script>
