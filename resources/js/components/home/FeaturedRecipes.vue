<template>
  <section class="bg-gray-50 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto max-w-2xl text-center"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
        :visible="{ once: true }"
      >
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ $t('home.featuredRecipes.title') }}
        </h2>
        <p class="mt-4 text-lg leading-8 text-gray-600">
          {{ $t('home.featuredRecipes.subtitle') }}
        </p>
      </div>

      <div
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
        :visible="{ once: true }"
      >
        <article
          v-for="recipe in recipes"
          :key="recipe.id"
          class="flex flex-col items-start group"
        >
          <div class="relative w-full">
            <img
              :src="recipe.image"
              :alt="recipe.titre"
              class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
            >
            <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div class="max-w-xl">
            <div class="mt-8 flex items-center gap-x-4 text-xs">
              <time
                :datetime="recipe.created_at"
                class="text-gray-500"
              >
                {{ formatDate(recipe.created_at) }}
              </time>
              <span
                class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                {{ $t(`categories.${recipe.categorie}`) }}
              </span>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <router-link :to="'/recettes/' + recipe.id">
                  <span class="absolute inset-0" />
                  {{ recipe.titre }}
                </router-link>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {{ recipe.description }}
              </p>
            </div>
            <div class="mt-6 flex items-center gap-x-4">
              <div class="flex items-center gap-x-2">
                <ClockIcon class="h-4 w-4 text-gray-500" />
                <span class="text-sm text-gray-500">
                  {{ formatDuration(recipe.temps_preparation + recipe.temps_cuisson) }}
                </span>
              </div>
              <div class="flex items-center gap-x-2">
                <ChartBarIcon class="h-4 w-4 text-gray-500" />
                <span class="text-sm text-gray-500">
                  {{ $t(`difficulty.${recipe.difficulte}`) }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Lien vers toutes les recettes -->
      <div class="mt-12 text-center">
        <router-link
          to="/recettes"
          class="text-sm font-semibold leading-6 text-brand-600 hover:text-brand-500"
        >
          {{ $t('home.featuredRecipes.viewAll') }}
          <span aria-hidden="true">→</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ClockIcon, ChartBarIcon } from '@heroicons/vue/20/solid'

defineProps({
  recipes: {
    type: Array,
    required: true
  }
})

function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours > 0) {
    return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`
  }
  return `${minutes}min`
}
</script>
