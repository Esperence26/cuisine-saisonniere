<template>
  <div class="bg-white">
    <nav aria-label="Breadcrumb" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ol role="list" class="flex items-center space-x-4 py-4">
        <li>
          <div class="flex items-center">
            <router-link :to="{ name: 'products' }" class="text-sm font-medium text-gray-900 hover:text-emerald-600">
              {{ $t('products.all') }}
            </router-link>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
            <router-link
              :to="{ name: 'products', query: { category: product.category }}"
              class="ml-4 text-sm font-medium text-gray-900 hover:text-emerald-600"
            >
              {{ product.category }}
            </router-link>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <i class="fas fa-chevron-right text-gray-400 text-sm"></i>
            <span class="ml-4 text-sm font-medium text-gray-500" aria-current="page">{{ product.name }}</span>
          </div>
        </li>
      </ol>
    </nav>

    <!-- Product -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <!-- Product image -->
        <div class="lg:col-span-4 lg:row-end-1">
          <div class="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
            <img :src="product.imageUrl" :alt="product.name" class="object-cover object-center" />
            <span 
              class="absolute top-4 right-4 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
            >
              {{ product.season }}
            </span>
          </div>
        </div>

        <!-- Product details -->
        <div class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
          <div class="flex flex-col-reverse">
            <div class="mt-4">
              <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ product.name }}</h1>
              <h2 class="sr-only">Product information</h2>
              <div class="mt-2">
                <p class="text-xl text-gray-900">{{ formatPrice(product.price) }}</p>
              </div>
            </div>

            <div class="flex items-center">
              <div class="flex items-center">
                <div class="flex items-center">
                  <i 
                    v-for="rating in 5" 
                    :key="rating"
                    :class="[
                      rating <= Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300',
                      'fas fa-star text-sm'
                    ]"
                  ></i>
                </div>
                <p class="ml-2 text-sm text-gray-500">
                  {{ product.rating }} ({{ product.reviews }} avis)
                </p>
              </div>
            </div>
          </div>

          <!-- Producer info -->
          <div class="mt-6 border-t border-gray-200 pt-6">
            <h3 class="text-sm font-medium text-gray-900">Producteur</h3>
            <div class="mt-4 flex items-center">
              <img 
                :src="product.producer.imageUrl" 
                :alt="product.producer.name"
                class="h-12 w-12 rounded-full object-cover"
              />
              <div class="ml-4">
                <h4 class="text-sm font-medium text-gray-900">{{ product.producer.name }}</h4>
                <p class="text-sm text-gray-500">{{ product.producer.location }}</p>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="mt-6 border-t border-gray-200 pt-6">
            <h3 class="text-sm font-medium text-gray-900">Description</h3>
            <div class="prose prose-sm mt-4 text-gray-500">
              <p>{{ product.description }}</p>
            </div>
          </div>

          <!-- Properties -->
          <div class="mt-6 border-t border-gray-200 pt-6">
            <h3 class="text-sm font-medium text-gray-900">Caractéristiques</h3>
            <div class="mt-4 space-y-6">
              <div class="grid grid-cols-2 gap-4">
                <div v-for="(value, key) in product.properties" :key="key" class="flex items-center gap-x-2">
                  <i :class="['fas', propertyIcons[key], 'text-emerald-500']"></i>
                  <span class="text-sm text-gray-500">{{ value }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Add to cart form -->
          <div class="mt-10 border-t border-gray-200 pt-6">
            <div class="mt-4 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <button
                  @click="decrementQuantity"
                  class="inline-flex items-center justify-center rounded-md border border-gray-300 p-2 text-gray-400 hover:text-gray-500"
                >
                  <i class="fas fa-minus text-sm"></i>
                </button>
                <span class="text-base font-medium text-gray-700">{{ quantity }}</span>
                <button
                  @click="incrementQuantity"
                  class="inline-flex items-center justify-center rounded-md border border-gray-300 p-2 text-gray-400 hover:text-gray-500"
                >
                  <i class="fas fa-plus text-sm"></i>
                </button>
              </div>
              <p class="text-base font-medium text-gray-900">{{ formatPrice(product.price * quantity) }}</p>
            </div>

            <button
              @click="addToCart"
              class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-3 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Ajouter au panier
            </button>
          </div>

          <!-- Delivery info -->
          <div class="mt-6 border-t border-gray-200 pt-6">
            <div class="space-y-4">
              <div class="flex items-center gap-x-2">
                <i class="fas fa-truck text-emerald-500"></i>
                <span class="text-sm text-gray-500">Livraison gratuite à partir de 50€</span>
              </div>
              <div class="flex items-center gap-x-2">
                <i class="fas fa-leaf text-emerald-500"></i>
                <span class="text-sm text-gray-500">Produit local et de saison</span>
              </div>
              <div class="flex items-center gap-x-2">
                <i class="fas fa-shield-alt text-emerald-500"></i>
                <span class="text-sm text-gray-500">Qualité garantie</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Related products -->
        <div class="mx-auto mt-10 max-w-2xl lg:col-span-7 lg:mt-12 lg:max-w-none">
          <h2 class="text-xl font-bold tracking-tight text-gray-900">Produits similaires</h2>

          <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" class="group relative">
              <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                <img
                  :src="relatedProduct.imageUrl"
                  :alt="relatedProduct.name"
                  class="h-full w-full object-cover object-center group-hover:opacity-75"
                />
                <span 
                  class="absolute top-2 right-2 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
                >
                  {{ relatedProduct.season }}
                </span>
              </div>
              <div class="mt-4">
                <h3 class="text-sm text-gray-700">
                  <router-link :to="{ name: 'product', params: { id: relatedProduct.id }}">
                    <span class="absolute inset-0"></span>
                    {{ relatedProduct.name }}
                  </router-link>
                </h3>
                <div class="mt-1 flex items-center justify-between">
                  <p class="text-sm text-gray-500">{{ relatedProduct.producer.name }}</p>
                  <p class="text-sm font-medium text-gray-900">{{ formatPrice(relatedProduct.price) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()

// Product data (mock)
const product = ref({
  id: 1,
  name: 'Tomates cerises bio',
  description: 'Nos tomates cerises bio sont cultivées avec soin dans notre ferme locale. Parfaites pour les salades ou en apéritif, elles sont gorgées de soleil et de saveur. Récoltées à maturité, elles vous garantissent un goût authentique et une fraîcheur incomparable.',
  price: 3.50,
  rating: 4.8,
  reviews: 124,
  category: 'Légumes',
  season: 'Été',
  imageUrl: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  producer: {
    name: 'Ferme des Délices',
    location: 'Provence-Alpes-Côte d\'Azur',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'
  },
  properties: {
    origin: 'France',
    certification: 'Agriculture Biologique',
    packaging: 'Barquette 250g',
    conservation: '5-7 jours au réfrigérateur'
  }
})

const propertyIcons = {
  origin: 'fa-map-marker-alt',
  certification: 'fa-certificate',
  packaging: 'fa-box',
  conservation: 'fa-temperature-low'
}

// Related products (mock)
const relatedProducts = ref([
  {
    id: 2,
    name: 'Poivrons multicolores',
    price: 4.20,
    season: 'Été',
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    producer: { name: 'Ferme des Délices' }
  },
  {
    id: 3,
    name: 'Aubergines bio',
    price: 3.80,
    season: 'Été',
    imageUrl: 'https://images.unsplash.com/photo-1613884823276-9c6060b31699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    producer: { name: 'Les Jardins Bio' }
  },
  {
    id: 4,
    name: 'Courgettes fraîches',
    price: 2.90,
    season: 'Été',
    imageUrl: 'https://images.unsplash.com/photo-1596187435435-1eaf28b59c31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    producer: { name: 'Ferme du Soleil' }
  },
  {
    id: 5,
    name: 'Tomates anciennes',
    price: 4.50,
    season: 'Été',
    imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    producer: { name: 'Les Jardins de Marie' }
  }
])

// Cart functionality
const quantity = ref(1)

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  // Implement cart functionality
  console.log('Added to cart:', {
    product: product.value.name,
    quantity: quantity.value,
    price: product.value.price * quantity.value
  })
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>
