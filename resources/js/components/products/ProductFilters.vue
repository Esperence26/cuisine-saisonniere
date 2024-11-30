<template>
  <div class="bg-white">
    <div class="border-b border-gray-200 py-4">
      <h2 class="text-lg font-medium text-gray-900">{{ $t('products.filters') }}</h2>
      
      <!-- Saisons -->
      <div class="mt-4 border-t border-gray-200 pt-4">
        <fieldset>
          <legend class="text-sm font-medium text-gray-900">{{ $t('products.seasons') }}</legend>
          <div class="space-y-3 pt-4">
            <div
              v-for="season in seasons"
              :key="season.value"
              class="flex items-center"
            >
              <input
                :id="'season-' + season.value"
                v-model="selectedSeasons"
                :value="season.value"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              >
              <label
                :for="'season-' + season.value"
                class="ml-3 text-sm text-gray-600"
              >
                {{ $t(season.label) }}
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <!-- Catégories -->
      <div class="mt-4 border-t border-gray-200 pt-4">
        <fieldset>
          <legend class="text-sm font-medium text-gray-900">{{ $t('products.categories') }}</legend>
          <div class="space-y-3 pt-4">
            <div
              v-for="category in categories"
              :key="category.value"
              class="flex items-center"
            >
              <input
                :id="'category-' + category.value"
                v-model="selectedCategories"
                :value="category.value"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              >
              <label
                :for="'category-' + category.value"
                class="ml-3 text-sm text-gray-600"
              >
                {{ $t(category.label) }}
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <!-- Prix -->
      <div class="mt-4 border-t border-gray-200 pt-4">
        <fieldset>
          <legend class="text-sm font-medium text-gray-900">{{ $t('products.priceRange') }}</legend>
          <div class="mt-4 space-y-4">
            <div class="flex items-center space-x-3">
              <input
                v-model.number="minPrice"
                type="number"
                min="0"
                step="0.5"
                class="block w-24 rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                @input="updatePriceRange"
              >
              <span class="text-gray-500">-</span>
              <input
                v-model.number="maxPrice"
                type="number"
                min="0"
                step="0.5"
                class="block w-24 rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
                @input="updatePriceRange"
              >
              <span class="text-sm text-gray-500">€</span>
            </div>
          </div>
        </fieldset>
      </div>

      <!-- Boutons -->
      <div class="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <button
          type="button"
          class="text-sm font-medium text-brand-600 hover:text-brand-500"
          @click="resetFilters"
        >
          {{ $t('common.resetFilters') }}
        </button>
        <button
          type="button"
          class="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          @click="applyFilters"
        >
          {{ $t('common.apply') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({
      seasons: [],
      categories: [],
      minPrice: null,
      maxPrice: null
    })
  }
})

const emit = defineEmits(['update:filters'])

const seasons = [
  { value: 'printemps', label: 'seasons.spring' },
  { value: 'ete', label: 'seasons.summer' },
  { value: 'automne', label: 'seasons.autumn' },
  { value: 'hiver', label: 'seasons.winter' }
]

const categories = [
  { value: 'legumes', label: 'categories.vegetables' },
  { value: 'fruits', label: 'categories.fruits' },
  { value: 'champignons', label: 'categories.mushrooms' },
  { value: 'herbes', label: 'categories.herbs' }
]

const selectedSeasons = ref(props.initialFilters.seasons || [])
const selectedCategories = ref(props.initialFilters.categories || [])
const minPrice = ref(props.initialFilters.minPrice || '')
const maxPrice = ref(props.initialFilters.maxPrice || '')

const updatePriceRange = () => {
  if (minPrice.value && maxPrice.value && Number(minPrice.value) > Number(maxPrice.value)) {
    const temp = minPrice.value
    minPrice.value = maxPrice.value
    maxPrice.value = temp
  }
}

const resetFilters = () => {
  selectedSeasons.value = []
  selectedCategories.value = []
  minPrice.value = ''
  maxPrice.value = ''
  applyFilters()
}

const applyFilters = () => {
  emit('update:filters', {
    seasons: selectedSeasons.value,
    categories: selectedCategories.value,
    minPrice: minPrice.value || null,
    maxPrice: maxPrice.value || null
  })
}

// Mettre à jour les filtres quand les valeurs changent
watch([selectedSeasons, selectedCategories], () => {
  applyFilters()
})
</script>
