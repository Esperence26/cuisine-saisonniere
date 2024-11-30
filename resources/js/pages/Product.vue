<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Image gallery -->
        <div class="flex flex-col-reverse">
          <div class="aspect-h-1 aspect-w-1 w-full">
            <img :src="product.image" :alt="product.name" class="h-full w-full object-cover object-center sm:rounded-lg">
          </div>
        </div>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <p class="text-3xl tracking-tight text-gray-900">{{ product.price.toFixed(2) }} €</p>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Description</h3>
            <div class="space-y-6 text-base text-gray-700">
              <p>{{ product.description }}</p>
            </div>
          </div>

          <div class="mt-6">
            <div class="flex items-center">
              <h4 class="text-sm font-medium text-gray-900">Season:</h4>
              <p class="ml-2 text-sm text-gray-500 capitalize">{{ product.season }}</p>
            </div>
          </div>

          <form class="mt-6">
            <div class="mt-10 flex">
              <button
                type="submit"
                class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
              >
                Add to cart
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '@/data/mockData'

const route = useRoute()
const product = computed(() => {
  return products.find(p => p.id === parseInt(route.params.id)) || {
    id: 0,
    name: 'Product not found',
    description: 'This product does not exist.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c',
    season: 'unknown'
  }
})
</script>
