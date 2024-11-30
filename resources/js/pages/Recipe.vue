<template>
  <div class="min-h-screen bg-gray-50">
    <div class="relative">
      <!-- Hero Image -->
      <div class="h-96 relative">
        <img
          :src="recipe.image_url || '/images/default-recipe.jpg'"
          :alt="recipe.nom"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-8">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-bold text-white mb-4">{{ recipe.nom }}</h1>
            <div class="flex items-center space-x-6 text-white">
              <div class="flex items-center">
                <i class="fas fa-clock h-6 w-6 mr-2"></i>
                <span>{{ formatTime(recipe.temps_preparation + recipe.temps_cuisson) }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-users h-6 w-6 mr-2"></i>
                <span>{{ recipe.portions }} {{ $t('recipe.portions') }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-utensils h-6 w-6 mr-2"></i>
                <span>{{ recipe.difficulte }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div class="bg-white rounded-xl shadow-xl p-8">
          <!-- Actions -->
          <div class="flex justify-end space-x-4 mb-8">
            <button class="flex items-center text-gray-600 hover:text-red-500">
              <i class="fas fa-heart mr-2"></i>
              <span>{{ $t('recipe.save') }}</span>
            </button>
            <button class="flex items-center text-gray-600 hover:text-blue-500">
              <i class="fas fa-share-alt mr-2"></i>
              <span>{{ $t('recipe.share') }}</span>
            </button>
          </div>

          <!-- Description -->
          <div class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('recipe.description') }}</h2>
            <p class="text-gray-600">{{ recipe.description }}</p>
          </div>

          <!-- Ingredients -->
          <div class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('recipe.ingredients') }}</h2>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li v-for="ingredient in recipe.ingredients" :key="ingredient.nom" class="flex items-center">
                <i class="fas fa-check text-green-500 mr-3"></i>
                <span>{{ ingredient.quantite }} {{ ingredient.unite }} {{ ingredient.nom }}</span>
              </li>
            </ul>
          </div>

          <!-- Instructions -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('recipe.instructions') }}</h2>
            <ol class="space-y-6">
              <li v-for="(instruction, index) in recipe.instructions" :key="index" class="flex">
                <span class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 font-semibold mr-4">
                  {{ index + 1 }}
                </span>
                <p class="text-gray-600">{{ instruction }}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import mockRecipes from '../data/mockData'

export default {
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const recipe = ref(mockRecipes.find(r => r.id === parseInt(route.params.id)) || {})

    const formatTime = (minutes) => {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      return `${hours}h ${remainingMinutes}min`
    }

    return {
      recipe,
      formatTime,
      $t: t
    }
  }
}
</script>
