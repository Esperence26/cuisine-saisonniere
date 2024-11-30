<template>
  <div class="bg-white">
    <!-- Hero section -->
    <div class="relative isolate">
      <!-- Background image -->
      <div class="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
          alt=""
          class="h-full w-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gray-900/70 mix-blend-multiply" />
      </div>

      <!-- Content -->
      <div class="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <!-- Mission badge -->
        <div class="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 mb-8">
          Notre Mission
        </div>
        
        <!-- Main content -->
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          <h1 class="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {{ $t('about.hero.title') }}
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-300">
            {{ $t('about.hero.description') }}
          </p>
          
          <!-- Stats -->
          <dl class="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
            <div v-for="stat in heroStats" :key="stat.name" class="flex flex-col">
              <dt class="text-sm leading-6 text-gray-400">{{ stat.name }}</dt>
              <dd class="mt-2 text-3xl font-bold leading-10 tracking-tight text-white">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>

        <!-- Features grid -->
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div v-for="feature in heroFeatures" :key="feature.name" class="flex flex-col bg-white/5 backdrop-blur-sm rounded-2xl p-6">
              <dt class="text-base font-semibold leading-7 text-white">
                <div class="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
                  <i :class="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                {{ feature.name }}
              </dt>
              <dd class="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                <p class="flex-auto">{{ feature.description }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Values section -->
    <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ $t('about.values.title') }}</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">{{ $t('about.values.description') }}</p>
      </div>
      <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <div v-for="value in values" :key="value.name">
          <dt class="font-semibold text-gray-900">
            <div class="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
              <i :class="value.icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            {{ value.name }}
          </dt>
          <dd class="mt-1 text-gray-600">{{ value.description }}</dd>
        </div>
      </dl>
    </div>

    <!-- Team section -->
    <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ $t('about.team.title') }}</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">{{ $t('about.team.description') }}</p>
      </div>
      <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
        <li v-for="person in team" :key="person.name">
          <img :src="person.imageUrl" :alt="person.name" class="aspect-[14/13] w-full rounded-2xl object-cover">
          <h3 class="mt-6 text-lg font-semibold leading-8 text-gray-900">{{ person.name }}</h3>
          <p class="text-base leading-7 text-gray-600">{{ person.role }}</p>
          <p class="text-sm leading-6 text-gray-600">{{ person.location }}</p>
        </li>
      </ul>
    </div>

    <!-- Stats -->
    <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {{ $t('about.stats.title') }}
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          {{ $t('about.stats.description') }}
        </p>
      </div>
      <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.name" class="flex flex-col gap-y-3 rounded-2xl bg-emerald-600 p-6">
          <dt class="text-sm leading-6">{{ stat.name }}</dt>
          <dd class="order-first text-3xl font-semibold tracking-tight">{{ stat.value }}</dd>
        </div>
      </dl>
    </div>

    <!-- CTA section -->
    <div class="relative isolate mt-32 px-6 py-32 sm:mt-40 sm:py-40 lg:px-8">
      <div class="absolute inset-x-0 top-0 -z-10 h-full bg-emerald-50">
        <div class="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
          <svg class="h-[40rem] w-[80rem] flex-none stroke-emerald-600/30" aria-hidden="true">
            <defs>
              <pattern id="grid" width="80" height="80" x="50%" y="100%" patternUnits="userSpaceOnUse">
                <path d="M.5 80V.5H80" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ $t('about.cta.title') }}</h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">{{ $t('about.cta.description') }}</p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link :to="{ name: 'contact' }" class="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
            {{ $t('about.cta.button') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const heroStats = ref([
  { name: 'Années d\'expérience', value: '10+' },
  { name: 'Producteurs locaux', value: '50+' },
  { name: 'Recettes partagées', value: '1000+' },
  { name: 'Clients satisfaits', value: '25k+' }
])

const heroFeatures = ref([
  {
    name: 'Engagement Local',
    description: 'Nous collaborons étroitement avec les producteurs locaux pour vous offrir les meilleurs produits de saison.',
    icon: 'fas fa-handshake'
  },
  {
    name: 'Qualité Premium',
    description: 'Chaque produit est soigneusement sélectionné pour garantir une qualité et une fraîcheur exceptionnelles.',
    icon: 'fas fa-award'
  },
  {
    name: 'Impact Durable',
    description: 'Notre approche favorise une agriculture durable et respectueuse de l\'environnement.',
    icon: 'fas fa-leaf'
  }
])

const values = ref([
  {
    name: 'Qualité et Fraîcheur',
    icon: 'fas fa-leaf',
    description: 'Nous sélectionnons rigoureusement nos produits pour garantir une qualité et une fraîcheur optimales.'
  },
  {
    name: 'Local et Durable',
    icon: 'fas fa-home',
    description: 'Nous travaillons exclusivement avec des producteurs locaux engagés dans une démarche durable.'
  },
  {
    name: 'Saisonnalité',
    icon: 'fas fa-sun',
    description: 'Nous respectons le rythme des saisons pour vous offrir des produits au meilleur de leur saveur.'
  },
  {
    name: 'Transparence',
    icon: 'fas fa-check-circle',
    description: 'Nous vous garantissons une totale transparence sur l\'origine et la qualité de nos produits.'
  },
  {
    name: 'Innovation Culinaire',
    icon: 'fas fa-lightbulb',
    description: 'Nous développons constamment de nouvelles recettes pour sublimer les produits de saison.'
  },
  {
    name: 'Engagement Social',
    icon: 'fas fa-hands-helping',
    description: 'Nous soutenons activement les producteurs locaux et contribuons au développement de l\'économie locale.'
  }
])

const team = ref([
  {
    name: 'Marie Dubois',
    role: 'Fondatrice & Chef Cuisinière',
    location: 'Paris, France',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Pierre Martin',
    role: 'Chef des Relations Producteurs',
    location: 'Lyon, France',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Sophie Laurent',
    role: 'Nutritionniste',
    location: 'Bordeaux, France',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80'
  },
  {
    name: 'Lucas Bernard',
    role: 'Chef Développement Durable',
    location: 'Nantes, France',
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80'
  }
])

const stats = ref([
  { name: 'Producteurs partenaires', value: '50+' },
  { name: 'Recettes disponibles', value: '200+' },
  { name: 'Clients satisfaits', value: '10k+' },
  { name: 'Régions couvertes', value: '12' }
])
</script>
