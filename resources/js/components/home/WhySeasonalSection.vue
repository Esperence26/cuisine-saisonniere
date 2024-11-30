<template>
  <div
    id="why-seasonal"
    class="relative isolate overflow-hidden bg-white py-24 sm:py-32"
  >
    <!-- Décoration de fond -->
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.brand.100),white)]" />
    <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-brand-600/10 ring-1 ring-brand-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
    
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto max-w-2xl lg:max-w-none"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        :visible="{ once: true }"
      >
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {{ $t('home.whySeasonal.title') }}
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-600">
            {{ $t('home.whySeasonal.subtitle') }}
          </p>
        </div>

        <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(benefit, index) in benefits"
            :key="benefit.title"
            class="relative pl-16"
            v-motion
            :initial="{ opacity: 0, x: -20 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: index * 200 } }"
            :visible="{ once: true }"
          >
            <div class="text-base font-semibold leading-7 text-gray-900">
              <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600">
                <component
                  :is="benefit.icon"
                  class="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </div>
              {{ $t(benefit.title) }}
            </div>
            <dd class="mt-2 text-base leading-7 text-gray-600">
              {{ $t(benefit.description) }}
            </dd>
          </div>
        </dl>

        <!-- Graphique saisonnier -->
        <div
          class="mt-16"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 800 } }"
          :visible="{ once: true }"
        >
          <div class="relative mx-auto max-w-4xl">
            <div class="aspect-[4/3] overflow-hidden rounded-xl bg-gray-50 p-8">
              <SeasonalWheel />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  LeafIcon,
  SparklesIcon,
  HeartIcon,
  BanknotesIcon
} from '@heroicons/vue/24/outline'
import SeasonalWheel from './SeasonalWheel.vue'

const benefits = [
  {
    icon: LeafIcon,
    title: 'home.whySeasonal.benefits.0.title',
    description: 'home.whySeasonal.benefits.0.description'
  },
  {
    icon: SparklesIcon,
    title: 'home.whySeasonal.benefits.1.title',
    description: 'home.whySeasonal.benefits.1.description'
  },
  {
    icon: HeartIcon,
    title: 'home.whySeasonal.benefits.2.title',
    description: 'home.whySeasonal.benefits.2.description'
  },
  {
    icon: BanknotesIcon,
    title: 'home.whySeasonal.benefits.3.title',
    description: 'home.whySeasonal.benefits.3.description'
  }
]
</script>
