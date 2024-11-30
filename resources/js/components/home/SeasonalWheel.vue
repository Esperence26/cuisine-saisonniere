<template>
  <div class="relative w-full h-full">
    <!-- Cercle principal -->
    <div
      class="absolute inset-0 rounded-full border-4 border-brand-200"
      :style="{ transform: `rotate(${rotation}deg)` }"
      @mouseenter="pauseRotation"
      @mouseleave="resumeRotation"
    >
      <!-- Sections des saisons -->
      <div
        v-for="(season, index) in seasons"
        :key="season.name"
        class="absolute inset-0 transition-opacity duration-300"
        :class="[
          currentSeason === season.name ? 'opacity-100' : 'opacity-0',
          'cursor-pointer'
        ]"
        :style="{ transform: `rotate(${index * 90}deg)` }"
        @click="selectSeason(season.name)"
      >
        <div
          class="absolute inset-0 flex items-center justify-center"
          :style="{ transform: `rotate(-${rotation}deg)` }"
        >
          <div class="text-center p-4">
            <component
              :is="season.icon"
              class="mx-auto h-12 w-12 text-brand-600"
              aria-hidden="true"
            />
            <h3 class="mt-2 text-lg font-semibold text-gray-900">
              {{ $t(`seasons.${season.name}`) }}
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ season.products.length }} {{ $t('products.available') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Produits de la saison -->
    <div
      class="absolute inset-x-0 bottom-0 bg-white/90 p-4 backdrop-blur-sm rounded-lg shadow-lg"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :visible="{ once: true }"
    >
      <h4 class="text-sm font-medium text-gray-900">
        {{ $t('products.inSeason') }}:
      </h4>
      <div class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="product in currentSeasonProducts"
          :key="product"
          class="inline-flex items-center rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-600/20"
        >
          {{ product }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  SunIcon,
  CloudIcon,
  LeafIcon,
  SnowflakeIcon
} from '@heroicons/vue/24/outline'

const seasons = [
  {
    name: 'summer',
    icon: SunIcon,
    products: ['Tomates', 'Aubergines', 'Courgettes', 'Pêches', 'Abricots']
  },
  {
    name: 'autumn',
    icon: LeafIcon,
    products: ['Potirons', 'Champignons', 'Raisins', 'Pommes', 'Poires']
  },
  {
    name: 'winter',
    icon: SnowflakeIcon,
    products: ['Choux', 'Poireaux', 'Endives', 'Agrumes', 'Kiwis']
  },
  {
    name: 'spring',
    icon: CloudIcon,
    products: ['Asperges', 'Petits pois', 'Fraises', 'Radis', 'Artichauts']
  }
]

const rotation = ref(0)
const currentSeason = ref(getCurrentSeason())
let rotationInterval = null

const currentSeasonProducts = computed(() => {
  const season = seasons.find(s => s.name === currentSeason.value)
  return season ? season.products : []
})

function getCurrentSeason() {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'autumn'
  return 'winter'
}

function selectSeason(season) {
  currentSeason.value = season
}

function startRotation() {
  rotationInterval = setInterval(() => {
    rotation.value = (rotation.value + 0.2) % 360
  }, 50)
}

function pauseRotation() {
  clearInterval(rotationInterval)
}

function resumeRotation() {
  startRotation()
}

onMounted(() => {
  startRotation()
})

onUnmounted(() => {
  clearInterval(rotationInterval)
})
</script>

<style scoped>
.season-section {
  clip-path: polygon(50% 50%, 100% 0, 100% 100%);
}
</style>
