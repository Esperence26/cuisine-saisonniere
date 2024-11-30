<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span class="block sm:inline">{{ error }}</span>
    </div>

    <template v-else>
      <!-- En-tête -->
      <div class="flex justify-between items-start mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">{{ recipe.title }}</h1>
          <p class="text-lg text-gray-600">{{ recipe.description }}</p>
        </div>
        <div v-if="isAdmin" class="flex space-x-4">
          <router-link
            :to="`/recipes/${recipe.id}/edit`"
            class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            {{ $t('common.edit') }}
          </router-link>
          <button
            @click="handleDelete"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            {{ $t('common.delete') }}
          </button>
        </div>
      </div>

      <!-- Image et informations -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div class="lg:col-span-2">
          <img
            v-if="recipe.image"
            :src="'/storage/' + recipe.image"
            :alt="recipe.title"
            class="w-full h-96 object-cover rounded-lg shadow-lg"
          >
        </div>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold mb-6">{{ $t('recipes.details.info') }}</h2>
          
          <!-- Temps -->
          <div class="mb-6">
            <div class="flex items-center mb-3">
              <ClockIcon class="h-6 w-6 text-emerald-600 mr-2" />
              <span class="text-gray-700">{{ $t('recipes.details.totalTime') }}:</span>
              <span class="ml-2 font-semibold">{{ formatTime(recipe.prep_time + recipe.cook_time) }}</span>
            </div>
            <div class="pl-8 space-y-1 text-sm text-gray-600">
              <div>{{ $t('recipes.details.prepTime') }}: {{ formatTime(recipe.prep_time) }}</div>
              <div>{{ $t('recipes.details.cookTime') }}: {{ formatTime(recipe.cook_time) }}</div>
            </div>
          </div>

          <!-- Difficulté -->
          <div class="flex items-center mb-6">
            <ChartBarIcon class="h-6 w-6 text-emerald-600 mr-2" />
            <span class="text-gray-700">{{ $t('recipes.details.difficulty') }}:</span>
            <span
              :class="difficultyBadgeClass(recipe.difficulty)"
              class="ml-2 px-3 py-1 rounded-full text-sm"
            >
              {{ $t(`recipes.difficulty.${recipe.difficulty}`) }}
            </span>
          </div>

          <!-- Portions -->
          <div class="flex items-center mb-6">
            <UserGroupIcon class="h-6 w-6 text-emerald-600 mr-2" />
            <span class="text-gray-700">{{ $t('recipes.details.servings') }}:</span>
            <span class="ml-2 font-semibold">{{ recipe.servings }}</span>
          </div>

          <!-- Saisonnalité -->
          <div v-if="recipe.is_seasonal" class="mb-6">
            <div class="flex items-center mb-2">
              <CalendarIcon class="h-6 w-6 text-emerald-600 mr-2" />
              <span class="text-gray-700">{{ $t('recipes.details.seasonal') }}</span>
            </div>
            <div class="pl-8 flex flex-wrap gap-2">
              <span
                v-for="season in recipe.seasons"
                :key="season"
                class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
              >
                {{ $t(`seasons.${season}`) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Ingrédients et Instructions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Ingrédients -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold mb-6">{{ $t('recipes.details.ingredients') }}</h2>
          <ul class="space-y-3">
            <li
              v-for="(ingredient, index) in recipe.ingredients"
              :key="index"
              class="flex items-start"
            >
              <CheckCircleIcon class="h-6 w-6 text-emerald-600 mr-2 flex-shrink-0" />
              <span class="text-gray-700">{{ ingredient }}</span>
            </li>
          </ul>
        </div>

        <!-- Instructions -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-semibold mb-6">{{ $t('recipes.details.instructions') }}</h2>
          <div class="space-y-6">
            <div
              v-for="(instruction, index) in recipe.instructions"
              :key="index"
              class="flex"
            >
              <div class="flex-shrink-0 mr-4">
                <span class="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full font-semibold">
                  {{ index + 1 }}
                </span>
              </div>
              <p class="text-gray-700 flex-grow">{{ instruction }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Modal de confirmation de suppression -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">{{ $t('recipes.delete.title') }}</h3>
        <p class="text-gray-600 mb-6">{{ $t('recipes.delete.confirm') }}</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            {{ $t('common.cancel') }}
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            {{ $t('common.delete') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRecipeStore } from '@/stores/recipes'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  ClockIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
  CheckCircleIcon
} from '@heroicons/vue/outline'

const recipeStore = useRecipeStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const recipe = ref(null)
const loading = ref(true)
const error = ref(null)
const showDeleteModal = ref(false)
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

const handleDelete = () => {
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    await recipeStore.deleteRecipe(recipe.value.id)
    router.push('/recipes')
  } catch (error) {
    console.error('Error deleting recipe:', error)
  }
}

onMounted(async () => {
  try {
    recipe.value = await recipeStore.fetchRecipe(route.params.id)
  } catch (error) {
    error.value = error.message
  } finally {
    loading.value = false
  }
})
</script>
