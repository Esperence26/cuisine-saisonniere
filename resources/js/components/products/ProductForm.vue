<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        {{ isEditing ? $t('products.edit') : $t('products.create') }}
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Nom et traductions -->
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">{{ $t('products.name') }}</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">{{ $t('languages.default') }}</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              >
            </div>

            <div v-for="locale in availableLocales" :key="locale" v-if="locale !== defaultLocale">
              <label class="block text-sm font-medium text-gray-700">{{ $t(`languages.${locale}`) }}</label>
              <input
                v-model="form.name_translations[locale]"
                type="text"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              >
            </div>
          </div>
        </div>

        <!-- Description et traductions -->
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-4">{{ $t('products.description') }}</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">{{ $t('languages.default') }}</label>
              <textarea
                v-model="form.description"
                required
                rows="3"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              ></textarea>
            </div>

            <div v-for="locale in availableLocales" :key="locale" v-if="locale !== defaultLocale">
              <label class="block text-sm font-medium text-gray-700">{{ $t(`languages.${locale}`) }}</label>
              <textarea
                v-model="form.description_translations[locale]"
                rows="3"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Prix et stock -->
        <div class="bg-white shadow rounded-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">{{ $t('products.price') }}</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span class="text-gray-500 sm:text-sm">€</span>
                </div>
                <input
                  v-model="form.price"
                  type="number"
                  step="0.01"
                  required
                  class="pl-7 block w-full border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">{{ $t('products.stock') }}</label>
              <input
                v-model="form.stock"
                type="number"
                min="0"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              >
            </div>
          </div>
        </div>

        <!-- Saisonnalité -->
        <div class="bg-white shadow rounded-lg p-6">
          <div class="space-y-4">
            <div class="flex items-center">
              <input
                v-model="form.is_seasonal"
                type="checkbox"
                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              >
              <label class="ml-2 block text-sm text-gray-900">
                {{ $t('products.isSeasonalProduct') }}
              </label>
            </div>

            <div v-if="form.is_seasonal">
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('products.seasons') }}</label>
              <div class="space-y-2">
                <div v-for="season in seasons" :key="season" class="flex items-center">
                  <input
                    :id="season"
                    type="checkbox"
                    v-model="form.seasons"
                    :value="season"
                    class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  >
                  <label :for="season" class="ml-2 block text-sm text-gray-900">
                    {{ $t(`seasons.${season}`) }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Image -->
        <div class="bg-white shadow rounded-lg p-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('products.image') }}
            </label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label
                    for="image-upload"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
                  >
                    <span>{{ $t('common.uploadFile') }}</span>
                    <input
                      id="image-upload"
                      type="file"
                      class="sr-only"
                      @change="handleImageUpload"
                      accept="image/*"
                    >
                  </label>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 2MB</p>
              </div>
            </div>
            <div v-if="imagePreview" class="mt-4">
              <img :src="imagePreview" alt="Preview" class="h-32 w-32 object-cover rounded-lg">
            </div>
          </div>
        </div>

        <!-- Boutons -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$router.back()"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {{ $t('common.cancel') }}
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {{ isEditing ? $t('common.save') : $t('common.create') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/products'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const productStore = useProductStore()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const isEditing = ref(false)
const productId = ref(null)
const loading = ref(false)
const imagePreview = ref(null)

const defaultLocale = 'fr'
const availableLocales = ['fr', 'en', 'de']
const seasons = ['spring', 'summer', 'autumn', 'winter']

const form = ref({
  name: '',
  name_translations: {},
  description: '',
  description_translations: {},
  price: '',
  stock: 0,
  is_seasonal: false,
  seasons: [],
  image: null
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    if (isEditing.value) {
      await productStore.updateProduct(productId.value, form.value)
    } else {
      await productStore.createProduct(form.value)
    }
    router.push('/products')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true
    productId.value = route.params.id
    try {
      loading.value = true
      await productStore.fetchProduct(productId.value)
      const product = productStore.currentProduct
      
      form.value = {
        name: product.name,
        name_translations: product.name_translations || {},
        description: product.description,
        description_translations: product.description_translations || {},
        price: product.price,
        stock: product.stock,
        is_seasonal: product.is_seasonal,
        seasons: product.seasons || [],
        image: null
      }

      if (product.image) {
        imagePreview.value = `/storage/${product.image}`
      }
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
})
</script>
