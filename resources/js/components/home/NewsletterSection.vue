<template>
  <section class="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
        <div
          class="max-w-xl lg:max-w-lg"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0 }"
          :visible="{ once: true }"
        >
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {{ $t('home.newsletter.title') }}
          </h2>
          <p class="mt-4 text-lg leading-8 text-gray-300">
            {{ $t('home.newsletter.subtitle') }}
          </p>
          <div class="mt-6 flex max-w-md gap-x-4">
            <label for="email-address" class="sr-only">{{ $t('home.newsletter.emailLabel') }}</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              :class="[
                'min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm sm:leading-6',
                error ? 'ring-red-500' : 'ring-white/10'
              ]"
              :placeholder="$t('home.newsletter.placeholder')"
            >
            <button
              type="submit"
              :disabled="loading || !isValidEmail"
              class="flex-none rounded-md bg-brand-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
              @click="subscribe"
            >
              <span v-if="!loading">{{ $t('home.newsletter.button') }}</span>
              <LoadingSpinner
                v-else
                size="sm"
                class="text-white"
              />
            </button>
          </div>
          <p
            v-if="error"
            class="mt-2 text-sm text-red-400"
          >
            {{ error }}
          </p>
        </div>
        <dl
          class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2"
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :enter="{ opacity: 1, x: 0 }"
          :visible="{ once: true }"
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="flex flex-col items-start"
          >
            <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
              <component
                :is="feature.icon"
                class="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <dt class="mt-4 font-semibold text-white">
              {{ $t(feature.name) }}
            </dt>
            <dd class="mt-2 leading-7 text-gray-400">
              {{ $t(feature.description) }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div
      class="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      aria-hidden="true"
    >
      <div
        class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  CalendarIcon,
  HandRaisedIcon,
  SparklesIcon,
  TrophyIcon
} from '@heroicons/vue/24/outline'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

const email = ref('')
const loading = ref(false)
const error = ref('')

const features = [
  {
    name: 'home.newsletter.features.seasonal.title',
    description: 'home.newsletter.features.seasonal.description',
    icon: CalendarIcon
  },
  {
    name: 'home.newsletter.features.exclusive.title',
    description: 'home.newsletter.features.exclusive.description',
    icon: TrophyIcon
  },
  {
    name: 'home.newsletter.features.tips.title',
    description: 'home.newsletter.features.tips.description',
    icon: SparklesIcon
  },
  {
    name: 'home.newsletter.features.community.title',
    description: 'home.newsletter.features.community.description',
    icon: HandRaisedIcon
  }
]

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

async function subscribe() {
  if (!isValidEmail.value) {
    error.value = 'Veuillez entrer une adresse email valide'
    return
  }

  try {
    loading.value = true
    error.value = ''

    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000))

    notificationStore.addNotification({
      message: 'Merci pour votre inscription ! Vous recevrez bientôt nos actualités.',
      type: 'success'
    })

    email.value = ''
  } catch (e) {
    error.value = 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>
