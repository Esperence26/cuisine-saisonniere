<template>
  <main>
    <!-- Hero section -->
    <div class="relative isolate overflow-hidden">
      <!-- Background video/image -->
      <div class="absolute inset-0 -z-10">
        <video
          autoplay
          loop
          muted
          playsinline
          class="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        >
          <source src="https://player.vimeo.com/external/517090081.hd.mp4?s=60c145388ed114d96665f11b90540d0f7314bc96&profile_id=175" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-gray-900/50 mix-blend-multiply" />
      </div>

      <!-- Content -->
      <div class="relative">
        <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div class="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <!-- Text content -->
            <div class="lg:col-span-7">
              <!-- Season badge -->
              <div class="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 mb-8">
                {{ currentSeason }}
              </div>

              <h1 class="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {{ $t('home.hero.title') }}
              </h1>
              <p class="mt-6 text-lg leading-8 text-gray-300">
                {{ $t('home.hero.description') }}
              </p>

              <!-- CTA buttons -->
              <div class="mt-10 flex items-center gap-x-6">
                <router-link
                  :to="{ name: 'recipes' }"
                  class="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                  {{ $t('home.hero.cta.primary') }}
                </router-link>
                <router-link
                  :to="{ name: 'about' }"
                  class="text-sm font-semibold leading-6 text-white hover:text-emerald-400"
                >
                  {{ $t('home.hero.cta.secondary') }} <span aria-hidden="true">→</span>
                </router-link>
              </div>

              <!-- Quick stats -->
              <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="stat in stats" :key="stat.name" class="flex flex-col-reverse">
                  <dt class="text-base leading-7 text-gray-300">{{ stat.name }}</dt>
                  <dd class="text-2xl font-bold leading-9 tracking-tight text-white">{{ stat.value }}</dd>
                </div>
              </dl>
            </div>

            <!-- Featured recipe card -->
            <div class="mt-16 lg:mt-0 lg:col-span-5">
              <div class="relative isolate overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm px-6 pt-8 sm:mx-0 sm:pt-16 md:pt-20 lg:gap-x-20 lg:px-8 xl:mt-6">
                <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900/50" />
                
                <div class="mx-auto max-w-md text-center lg:mx-0 lg:text-left">
                  <div class="flex items-center justify-center lg:justify-start gap-x-2 text-xs mb-4">
                    <span class="inline-flex items-center rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/20">
                      Recette du moment
                    </span>
                    <span class="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-400 ring-1 ring-inset ring-yellow-400/20">
                      {{ featuredRecipe.difficulty }}
                    </span>
                  </div>

                  <h2 class="text-lg font-semibold leading-8 tracking-tight text-white">
                    {{ featuredRecipe.title }}
                  </h2>
                  <p class="mt-2 text-sm leading-6 text-gray-300">
                    {{ featuredRecipe.description }}
                  </p>

                  <div class="mt-4 flex items-center justify-center lg:justify-start gap-x-4 text-sm text-gray-300">
                    <div class="flex items-center gap-x-1">
                      <i class="fas fa-clock text-emerald-400"></i>
                      <span>{{ featuredRecipe.prepTime }}</span>
                    </div>
                    <div class="flex items-center gap-x-1">
                      <i class="fas fa-utensils text-emerald-400"></i>
                      <span>{{ featuredRecipe.servings }} pers.</span>
                    </div>
                  </div>

                  <div class="mt-6">
                    <router-link
                      :to="{ name: 'recipe', params: { id: featuredRecipe.id }}"
                      class="text-sm font-semibold leading-6 text-emerald-400 hover:text-emerald-300"
                    >
                      Voir la recette <span aria-hidden="true">→</span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative elements -->
        <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white" />
        <div class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
          <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#68a384] to-[#34d399] opacity-20" />
        </div>
      </div>
    </div>

    <!-- Featured Categories -->
    <div class="relative bg-white py-24 sm:py-32 overflow-hidden">
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-emerald-600/10 ring-1 ring-emerald-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
      </div>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">{{ $t('home.categories.title') }}</h2>
          <p class="mt-4 text-lg leading-8 text-gray-600 text-center">{{ $t('home.categories.subtitle') }}</p>
        </div>
        
        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <div v-for="category in categories" :key="category.id" 
            class="group relative overflow-hidden rounded-3xl bg-gray-50 hover:bg-gray-100 transition-all duration-300">
            <div class="aspect-[3/4] w-full overflow-hidden rounded-3xl bg-gray-100">
              <img 
                :src="category.image" 
                :alt="category.name"
                class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105" 
              />
            </div>
            <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/40 to-transparent p-6">
              <h3 class="text-xl font-semibold leading-8 tracking-tight text-white">{{ category.name }}</h3>
              <p class="text-sm leading-6 text-gray-300 group-hover:text-white transition-colors">{{ category.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Recipes section -->
    <div class="relative isolate overflow-hidden bg-gradient-to-b from-emerald-50/70 to-white py-24 sm:py-32">
      <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.100),white)] opacity-20"></div>
      <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-emerald-600/10 ring-1 ring-emerald-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
      
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">{{ $t('home.featured_recipes.title') }}</h2>
          <p class="mt-4 text-lg leading-8 text-gray-600 text-center">{{ $t('home.featured_recipes.subtitle') }}</p>
        </div>

        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article v-for="recipe in recipes" :key="recipe.id" 
            class="group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
            <img :src="recipe.image" :alt="recipe.title" 
              class="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
            <div class="absolute inset-0 -z-10 rounded-3xl ring-1 ring-inset ring-gray-900/10"></div>

            <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
              <div class="flex items-center gap-x-4">
                <div class="flex items-center gap-x-1">
                  <i class="fas fa-clock text-emerald-400"></i>
                  <span>{{ recipe.duration }}</span>
                </div>
                <div class="flex items-center gap-x-1">
                  <i class="fas fa-utensils text-emerald-400"></i>
                  <span>{{ recipe.difficulty }}</span>
                </div>
              </div>
            </div>
            <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
              <router-link :to="{ name: 'recipe', params: { id: recipe.id }}">
                <span class="absolute inset-0"></span>
                {{ recipe.title }}
              </router-link>
            </h3>
          </article>
        </div>
      </div>
    </div>

    <!-- Seasonal Tips section -->
    <div class="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">{{ $t('home.seasonal_tips.title') }}</h2>
          <p class="mt-4 text-lg leading-8 text-gray-600 text-center">{{ $t('home.seasonal_tips.subtitle') }}</p>
        </div>

        <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div v-for="tip in seasonalTips" :key="tip.id"
            class="relative group">
            <div class="relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
              <div class="absolute inset-0 rounded-3xl ring-1 ring-inset ring-gray-900/10"></div>
              
              <!-- Icon container -->
              <div class="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 group-hover:bg-emerald-600 transition-colors">
                <i :class="tip.icon" class="text-white text-xl"></i>
              </div>

              <div class="p-8">
                <h3 class="text-xl font-semibold leading-8 tracking-tight text-gray-900">{{ tip.title }}</h3>
                <p class="mt-4 text-base leading-7 text-gray-600">{{ tip.description }}</p>
                
                <div class="mt-6 flex items-center gap-x-6">
                  <router-link
                    :to="{ name: 'tips', params: { id: tip.id }}"
                    class="text-sm font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
                  >
                    En savoir plus <span aria-hidden="true">→</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter section -->
    <div class="relative isolate overflow-hidden bg-emerald-700 py-16 sm:py-24 lg:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-white/10"></div>
          </div>
        </div>
        
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div class="max-w-xl lg:max-w-lg">
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">{{ $t('home.newsletter.title') }}</h2>
            <p class="mt-4 text-lg leading-8 text-gray-300">{{ $t('home.newsletter.description') }}</p>
            <div class="mt-6 flex max-w-md gap-x-4">
              <label for="email-address" class="sr-only">Adresse email</label>
              <input
                v-model="newsletterEmail"
                type="email"
                required
                class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                :placeholder="$t('home.newsletter.placeholder')"
              />
              <button
                type="submit"
                :disabled="isSubscribing"
                @click="subscribeNewsletter"
                class="flex-none rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i v-if="isSubscribing" class="fas fa-circle-notch fa-spin mr-2"></i>
                {{ $t('home.newsletter.button') }}
              </button>
            </div>
          </div>
          <dl class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div class="flex flex-col items-start">
              <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <i class="fas fa-leaf text-white text-2xl"></i>
              </div>
              <dt class="mt-4 font-semibold text-white">Recettes de saison</dt>
              <dd class="mt-2 leading-7 text-gray-400">Recevez des suggestions de recettes adaptées aux produits de saison.</dd>
            </div>
            <div class="flex flex-col items-start">
              <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <i class="fas fa-percent text-white text-2xl"></i>
              </div>
              <dt class="mt-4 font-semibold text-white">Offres exclusives</dt>
              <dd class="mt-2 leading-7 text-gray-400">Profitez de réductions et d'offres spéciales sur nos produits sélectionnés.</dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#68a384] to-[#34d399] opacity-30"></div>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Computed season
const currentSeason = computed(() => {
  const date = new Date()
  const month = date.getMonth()
  
  if (month >= 2 && month <= 4) return t('seasons.spring')
  if (month >= 5 && month <= 7) return t('seasons.summer')
  if (month >= 8 && month <= 10) return t('seasons.autumn')
  return t('seasons.winter')
})

// Featured categories
const categories = ref([
  {
    id: 1,
    name: t('categories.fruits'),
    description: t('categories.fruits_desc'),
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: t('categories.vegetables'),
    description: t('categories.vegetables_desc'),
    image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: t('categories.herbs'),
    description: t('categories.herbs_desc'),
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
  }
])

// Featured recipes
const featuredRecipes = ref([
  {
    id: 1,
    title: 'Salade printanière',
    description: 'Une salade fraîche et colorée avec des légumes de saison',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    prepTime: '15 min',
    difficulty: t('recipe.difficulty.easy'),
    servings: 4,
    tags: ['Printemps', 'Végétarien']
  },
  {
    id: 2,
    title: 'Ratatouille provençale',
    description: 'Un plat traditionnel du sud de la France',
    image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    prepTime: '45 min',
    difficulty: t('recipe.difficulty.medium'),
    servings: 6,
    tags: ['Été', 'Végétarien']
  },
  {
    id: 3,
    title: 'Soupe de potiron',
    description: 'Une soupe réconfortante pour l\'automne',
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    prepTime: '30 min',
    difficulty: t('recipe.difficulty.easy'),
    servings: 4,
    tags: ['Automne', 'Soupe']
  }
])

// Featured recipe (first recipe from the list)
const featuredRecipe = computed(() => featuredRecipes.value[0])

// Stats
const stats = [
  { name: t('home.stats.recipes'), value: '100+' },
  { name: t('home.stats.products'), value: '50+' },
  { name: t('home.stats.chefs'), value: '12' }
]

// Seasonal tips
const seasonalTips = ref([
  {
    id: 1,
    title: t('home.seasonal_tips.conservation.title'),
    description: t('home.seasonal_tips.conservation.description'),
    icon: 'fas fa-carrot'
  },
  {
    id: 2,
    title: t('home.seasonal_tips.zero_waste.title'),
    description: t('home.seasonal_tips.zero_waste.description'),
    icon: 'fas fa-recycle'
  }
])

// Newsletter
const email = ref('')

const subscribeNewsletter = async () => {
  try {
    console.log('Subscribing to newsletter:', email.value)
    // TODO: Implement API call
    email.value = ''
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
  }
}

onMounted(() => {
  console.log('Home component mounted')
})
</script>
