<template>
  <div class="container mx-auto px-4 py-8">
    <form @submit.prevent="handleSubmit" class="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold mb-6">
        {{ isEditing ? $t('recipes.edit') : $t('recipes.create') }}
      </h2>

      <!-- Sélection de langue -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('common.language') }}
        </label>
        <div class="flex space-x-4">
          <button
            v-for="lang in availableLanguages"
            :key="lang"
            type="button"
            @click="currentLanguage = lang"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium',
              currentLanguage === lang
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ lang.toUpperCase() }}
          </button>
        </div>
      </div>

      <!-- Titre -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('recipes.form.title') }}
        </label>
        <input
          v-model="formData.translations[currentLanguage].title"
          type="text"
          required
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
        >
      </div>

      <!-- Description -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('recipes.form.description') }}
        </label>
        <textarea
          v-model="formData.translations[currentLanguage].description"
          rows="3"
          required
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
        ></textarea>
      </div>

      <!-- Ingrédients -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('recipes.form.ingredients') }}
        </label>
        <div v-for="(ingredient, index) in formData.translations[currentLanguage].ingredients" :key="index" class="flex mb-2">
          <input
            v-model="formData.translations[currentLanguage].ingredients[index]"
            type="text"
            :placeholder="$t('recipes.form.ingredient')"
            class="flex-1 border-gray-300 rounded-l-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          >
          <button
            type="button"
            @click="removeIngredient(index)"
            class="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700"
          >
            {{ $t('common.remove') }}
          </button>
        </div>
        <button
          type="button"
          @click="addIngredient"
          class="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          {{ $t('recipes.form.addIngredient') }}
        </button>
      </div>

      <!-- Instructions -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('recipes.form.instructions') }}
        </label>
        <div v-for="(step, index) in formData.translations[currentLanguage].instructions" :key="index" class="flex mb-2">
          <textarea
            v-model="formData.translations[currentLanguage].instructions[index]"
            :placeholder="$t('recipes.form.step', { number: index + 1 })"
            rows="2"
            class="flex-1 border-gray-300 rounded-l-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          ></textarea>
          <button
            type="button"
            @click="removeInstruction(index)"
            class="px-4 py-2 bg-red-600 text-white rounded-r-md hover:bg-red-700"
          >
            {{ $t('common.remove') }}
          </button>
        </div>
        <button
          type="button"
          @click="addInstruction"
          class="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
        >
          {{ $t('recipes.form.addStep') }}
        </button>
      </div>

      <!-- Temps de préparation et cuisson -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('recipes.form.prepTime') }}
          </label>
          <input
            v-model.number="formData.prep_time"
            type="number"
            min="0"
            required
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('recipes.form.cookTime') }}
          </label>
          <input
            v-model.number="formData.cook_time"
            type="number"
            min="0"
            required
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          >
        </div>
      </div>

      <!-- Difficulté et portions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('recipes.form.difficulty') }}
          </label>
          <select
            v-model="formData.difficulty"
            required
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="easy">{{ $t('recipes.difficulty.easy') }}</option>
            <option value="medium">{{ $t('recipes.difficulty.medium') }}</option>
            <option value="hard">{{ $t('recipes.difficulty.hard') }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('recipes.form.servings') }}
          </label>
          <input
            v-model.number="formData.servings"
            type="number"
            min="1"
            required
            class="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
          >
        </div>
      </div>

      <!-- Saisonnalité -->
      <div class="mb-6">
        <div class="flex items-center">
          <input
            v-model="formData.is_seasonal"
            type="checkbox"
            class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
          >
          <label class="ml-2 block text-sm text-gray-900">
            {{ $t('recipes.form.seasonal') }}
          </label>
        </div>
      </div>

      <div v-if="formData.is_seasonal" class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('recipes.form.seasons') }}
        </label>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="season in seasons" :key="season" class="flex items-center">
            <input
              v-model="formData.seasons"
              :value="season"
              type="checkbox"
              class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            >
            <label class="ml-2 block text-sm text-gray-900">
              {{ $t(`seasons.${season}`) }}
            </label>
          </div>
        </div>
      </div>

      <!-- Image -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('recipes.form.image') }}
        </label>
        <input
          type="file"
          @change="handleImageUpload"
          accept="image/*"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
        >
        <img
          v-if="imagePreview"
          :src="imagePreview"
          alt="Preview"
          class="mt-4 h-48 w-auto object-cover rounded-lg"
        >
      </div>

      <!-- Boutons -->
      <div class="flex justify-end space-x-4">
        <router-link
          to="/recipes"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          {{ $t('common.cancel') }}
        </router-link>
        <button
          type="submit"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          :disabled="loading"
        >
          {{ loading ? $t('common.saving') : $t('common.save') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRecipeStore } from '@/stores/recipes'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const recipeStore = useRecipeStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const loading = ref(false)
const imagePreview = ref(null)
const currentLanguage = ref('fr')
const availableLanguages = ['fr', 'en', 'de']
const seasons = ['spring', 'summer', 'autumn', 'winter']

const isEditing = computed(() => !!route.params.id)

const formData = ref({
  translations: {
    fr: { title: '', description: '', ingredients: [''], instructions: [''] },
    en: { title: '', description: '', ingredients: [''], instructions: [''] },
    de: { title: '', description: '', ingredients: [''], instructions: [''] }
  },
  prep_time: 0,
  cook_time: 0,
  difficulty: 'medium',
  servings: 4,
  is_seasonal: false,
  seasons: [],
  image: null
})

const addIngredient = () => {
  formData.value.translations[currentLanguage.value].ingredients.push('')
}

const removeIngredient = (index) => {
  formData.value.translations[currentLanguage.value].ingredients.splice(index, 1)
}

const addInstruction = () => {
  formData.value.translations[currentLanguage.value].instructions.push('')
}

const removeInstruction = (index) => {
  formData.value.translations[currentLanguage.value].instructions.splice(index, 1)
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    if (isEditing.value) {
      await recipeStore.updateRecipe(route.params.id, formData.value)
    } else {
      await recipeStore.createRecipe(formData.value)
    }
    router.push('/recipes')
  } catch (error) {
    console.error('Error saving recipe:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (isEditing.value) {
    const recipe = await recipeStore.fetchRecipe(route.params.id)
    if (recipe) {
      formData.value = {
        ...recipe,
        image: null // Reset image to prevent showing old file input
      }
      if (recipe.image) {
        imagePreview.value = `/storage/${recipe.image}`
      }
    }
  }
})
</script>
