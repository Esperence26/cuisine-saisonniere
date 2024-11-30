<template>
  <div>
    <div
      v-if="loading"
      class="flex justify-center items-center min-h-[400px]"
    >
      <LoadingSpinner size="lg" />
    </div>
    <div
      v-else-if="products.length === 0"
      class="text-center py-12"
    >
      <h3 class="mt-2 text-sm font-semibold text-gray-900">{{ $t('products.noProducts') }}</h3>
      <p class="mt-1 text-sm text-gray-500">{{ $t('products.tryDifferentFilters') }}</p>
    </div>
    <div
      v-else
      class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="$emit('add-to-cart', $event)"
      />
    </div>

    <div
      v-if="totalPages > 1"
      class="mt-8"
    >
      <Pagination
        v-model="currentPage"
        :per-page="perPage"
        :total-items="totalItems"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProductCard from './ProductCard.vue'
import Pagination from '@/components/common/Pagination.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  currentPage: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  }
})

defineEmits(['update:currentPage', 'add-to-cart'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage))
</script>
