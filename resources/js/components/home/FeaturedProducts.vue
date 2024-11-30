<template>
  <section class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto max-w-2xl text-center"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
        :visible="{ once: true }"
      >
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ $t('home.featuredProducts.title') }}
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          {{ $t('home.featuredProducts.subtitle') }}
        </p>
      </div>

      <!-- Carrousel -->
      <div
        class="relative mt-16"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 800, delay: 200 } }"
        :visible="{ once: true }"
      >
        <!-- Boutons de navigation -->
        <button
          type="button"
          class="absolute left-0 top-1/2 z-10 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
          :disabled="currentSlide === 0"
          @click="prevSlide"
        >
          <ChevronLeftIcon class="h-5 w-5 text-gray-600" />
        </button>

        <button
          type="button"
          class="absolute right-0 top-1/2 z-10 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === maxSlide }"
          :disabled="currentSlide === maxSlide"
          @click="nextSlide"
        >
          <ChevronRightIcon class="h-5 w-5 text-gray-600" />
        </button>

        <!-- Slides -->
        <div
          class="relative overflow-hidden"
          @mouseenter="pauseAutoplay"
          @mouseleave="resumeAutoplay"
        >
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * (100 / slidesVisible)}%)` }"
          >
            <div
              v-for="product in products"
              :key="product.id"
              :style="{ flex: `0 0 ${100 / slidesVisible}%` }"
              class="px-4"
            >
              <div
                class="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
                  <img
                    :src="product.image"
                    :alt="product.nom"
                    class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                  >
                </div>
                <div class="p-6">
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900">
                      {{ product.nom }}
                    </h3>
                    <p class="text-lg font-medium text-brand-600">
                      {{ formatPrice(product.prix_unitaire) }}
                    </p>
                  </div>
                  <p class="mt-2 text-sm text-gray-600">
                    {{ product.description }}
                  </p>
                  <div class="mt-4 flex items-center justify-between">
                    <span
                      class="inline-flex items-center rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700"
                    >
                      {{ $t(`seasons.${product.saison}`) }}
                    </span>
                    <button
                      type="button"
                      class="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                      @click="$emit('add-to-cart', product)"
                    >
                      {{ $t('products.addToCart') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Indicateurs -->
        <div class="mt-8 flex justify-center gap-2">
          <button
            v-for="n in slideCount"
            :key="n"
            class="h-2 w-2 rounded-full transition-all duration-300"
            :class="[
              currentSlide === n - 1
                ? 'bg-brand-600 w-4'
                : 'bg-gray-300 hover:bg-gray-400'
            ]"
            @click="goToSlide(n - 1)"
          >
            <span class="sr-only">Slide {{ n }}</span>
          </button>
        </div>
      </div>

      <!-- Lien vers tous les produits -->
      <div class="mt-12 text-center">
        <router-link
          to="/produits"
          class="text-sm font-semibold leading-6 text-brand-600 hover:text-brand-500"
        >
          {{ $t('home.featuredProducts.viewAll') }}
          <span aria-hidden="true">→</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})

defineEmits(['add-to-cart'])

const currentSlide = ref(0)
const slidesVisible = computed(() => {
  if (window.innerWidth < 640) return 1
  if (window.innerWidth < 1024) return 2
  return 3
})

const slideCount = computed(() => Math.ceil(props.products.length / slidesVisible.value))
const maxSlide = computed(() => slideCount.value - 1)

let autoplayInterval = null

function nextSlide() {
  if (currentSlide.value < maxSlide.value) {
    currentSlide.value++
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

function goToSlide(index) {
  currentSlide.value = index
}

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    if (currentSlide.value === maxSlide.value) {
      currentSlide.value = 0
    } else {
      nextSlide()
    }
  }, 5000)
}

function pauseAutoplay() {
  clearInterval(autoplayInterval)
}

function resumeAutoplay() {
  startAutoplay()
}

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

// Gestion du responsive
function handleResize() {
  if (currentSlide.value > maxSlide.value) {
    currentSlide.value = maxSlide.value
  }
}

onMounted(() => {
  startAutoplay()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  clearInterval(autoplayInterval)
  window.removeEventListener('resize', handleResize)
})
</script>
