<template>
  <div class="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
    <div class="relative">
      <img :src="recipe.image_url || '/images/default-recipe.jpg'" :alt="recipe.nom" class="w-full h-64 object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div class="absolute bottom-0 left-0 p-6">
        <h3 class="text-2xl font-bold text-white mb-2">{{ recipe.nom }}</h3>
        <div class="flex items-center space-x-4">
          <div class="flex items-center text-white">
            <ClockIcon class="h-5 w-5 mr-1" />
            <span>{{ formatTime(recipe.temps_preparation + recipe.temps_cuisson) }}</span>
          </div>
          <div 
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
            :class="difficultyClass"
          >
            {{ $t(`difficulty.${recipe.difficulte.toLowerCase()}`) }}
          </div>
        </div>
      </div>
    </div>
    <div class="p-6">
      <p class="text-gray-600 mb-4">{{ recipe.description }}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="ingredient in recipe.ingredients.slice(0, 3)"
          :key="ingredient.id"
          class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
        >
          {{ ingredient.nom }}
        </span>
        <span v-if="recipe.ingredients.length > 3" class="text-gray-500 text-sm">
          +{{ recipe.ingredients.length - 3 }} {{ $t('recipes.more_ingredients') }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <StarIcon 
            v-for="i in 5" 
            :key="i"
            class="h-5 w-5"
            :class="i <= recipe.rating ? 'text-yellow-400' : 'text-gray-300'"
          />
          <span class="text-gray-600 text-sm">({{ recipe.reviews_count || 0 }})</span>
        </div>
        <button 
          @click="viewRecipe"
          class="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200 flex items-center space-x-2"
        >
          <EyeIcon class="h-5 w-5" />
          <span>{{ $t('recipes.view_recipe') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { ClockIcon, StarIcon, EyeIcon } from '@heroicons/vue/solid'

export default {
  components: {
    ClockIcon,
    StarIcon,
    EyeIcon,
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const difficultyClass = computed(() => {
      const classes = {
        'facile': 'bg-green-100 text-green-800',
        'moyen': 'bg-yellow-100 text-yellow-800',
        'difficile': 'bg-red-100 text-red-800',
      }
      return classes[props.recipe.difficulte.toLowerCase()]
    })

    const formatTime = (minutes) => {
      const hours = Math.floor(minutes / 60)
      const remainingMinutes = minutes % 60
      
      if (hours > 0) {
        return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`
      }
      return `${remainingMinutes}min`
    }

    const viewRecipe = () => {
      // Implémenter la navigation vers la recette
    }

    return {
      difficultyClass,
      formatTime,
      viewRecipe,
    }
  },
}
</script>
