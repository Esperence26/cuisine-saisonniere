<template>
  <nav
    v-if="totalPages > 1"
    class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
  >
    <!-- Mobile version -->
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        :disabled="currentPage === 1"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        @click="$emit('update:modelValue', currentPage - 1)"
      >
        Précédent
      </button>
      <button
        :disabled="currentPage === totalPages"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        @click="$emit('update:modelValue', currentPage + 1)"
      >
        Suivant
      </button>
    </div>

    <!-- Desktop version -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Affichage de
          <span class="font-medium">{{ startItem }}</span>
          à
          <span class="font-medium">{{ endItem }}</span>
          sur
          <span class="font-medium">{{ totalItems }}</span>
          résultats
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            :disabled="currentPage === 1"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            @click="$emit('update:modelValue', currentPage - 1)"
          >
            <span class="sr-only">Précédent</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            v-for="page in displayedPages"
            :key="page"
            :class="[
              page === currentPage
                ? 'relative z-10 inline-flex items-center bg-brand-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600'
                : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
            ]"
            @click="$emit('update:modelValue', page)"
          >
            {{ page }}
          </button>

          <button
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
            @click="$emit('update:modelValue', currentPage + 1)"
          >
            <span class="sr-only">Suivant</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  modelValue: {
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
  },
  maxDisplayedPages: {
    type: Number,
    default: 5
  }
})

defineEmits(['update:modelValue'])

const currentPage = computed(() => props.modelValue)
const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage))

const startItem = computed(() => ((currentPage.value - 1) * props.perPage) + 1)
const endItem = computed(() => Math.min(currentPage.value * props.perPage, props.totalItems))

const displayedPages = computed(() => {
  const pages = []
  let start = Math.max(1, currentPage.value - Math.floor(props.maxDisplayedPages / 2))
  let end = Math.min(totalPages.value, start + props.maxDisplayedPages - 1)

  if (end - start + 1 < props.maxDisplayedPages) {
    start = Math.max(1, end - props.maxDisplayedPages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})
</script>
