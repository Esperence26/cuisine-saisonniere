<template>
  <div class="relative h-screen-3/4 overflow-hidden bg-gray-900">
    <!-- Vidéo de fond -->
    <div class="absolute inset-0">
      <video
        class="h-full w-full object-cover"
        autoplay
        loop
        muted
        playsinline
      >
        <source
          src="/videos/hero-background.mp4"
          type="video/mp4"
        >
      </video>
      <div class="absolute inset-0 bg-gray-900/60" />
    </div>

    <!-- Contenu -->
    <div class="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div
        class="mx-auto max-w-2xl text-center"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      >
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {{ $t('home.hero.title') }}
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          {{ $t('home.hero.subtitle') }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link
            to="/produits"
            class="rounded-md bg-brand-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {{ $t('home.hero.cta') }}
          </router-link>
          <a
            href="#why-seasonal"
            class="text-sm font-semibold leading-6 text-white hover:text-brand-100"
          >
            {{ $t('home.hero.learnMore') }} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <!-- Défilement indicateur -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 800, delay: 1000 } }"
      >
        <div class="flex flex-col items-center">
          <span class="text-sm text-white/80">{{ $t('home.hero.scrollDown') }}</span>
          <div class="mt-2 h-16 w-px animate-bounce">
            <div class="h-full w-full bg-gradient-to-b from-white/80 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'

// Ajouter des classes pour l'animation de défilement fluide
onMounted(() => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
})
</script>
