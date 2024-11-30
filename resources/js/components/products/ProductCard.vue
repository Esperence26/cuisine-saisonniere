<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
    <div class="relative">
      <img :src="product.image_url || '/images/default-product.jpg'" :alt="product.nom" class="w-full h-48 object-cover">
      <div class="absolute top-0 right-0 mt-2 mr-2">
        <span 
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
          :class="seasonClass"
        >
          {{ $t(`seasons.${product.saison.toLowerCase()}`) }}
        </span>
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ product.nom }}</h3>
      <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-emerald-600 font-bold">{{ formatPrice(product.prix_unitaire) }}</span>
        <div class="flex space-x-2">
          <span 
            class="inline-flex items-center px-2 py-1 rounded-md text-sm"
            :class="stockClass"
          >
            {{ stockStatus }}
          </span>
        </div>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <button 
          @click="addToCart"
          class="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors duration-200 flex items-center space-x-2"
        >
          <ShoppingCartIcon class="h-5 w-5" />
          <span>{{ $t('products.add_to_cart') }}</span>
        </button>
        <button 
          @click="toggleFavorite"
          class="text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <HeartIcon class="h-6 w-6" :class="{ 'text-red-500': isFavorite }" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ShoppingCartIcon, HeartIcon } from '@heroicons/vue/outline'

export default {
  components: {
    ShoppingCartIcon,
    HeartIcon,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isFavorite = ref(false)

    const seasonClass = computed(() => {
      const classes = {
        'ete': 'bg-yellow-100 text-yellow-800',
        'hiver': 'bg-blue-100 text-blue-800',
        'printemps': 'bg-green-100 text-green-800',
        'automne': 'bg-orange-100 text-orange-800',
      }
      return classes[props.product.saison.toLowerCase()]
    })

    const stockClass = computed(() => {
      if (props.product.quantite_stock > 20) {
        return 'bg-green-100 text-green-800'
      } else if (props.product.quantite_stock > 0) {
        return 'bg-yellow-100 text-yellow-800'
      }
      return 'bg-red-100 text-red-800'
    })

    const stockStatus = computed(() => {
      if (props.product.quantite_stock > 20) {
        return $t('products.in_stock')
      } else if (props.product.quantite_stock > 0) {
        return $t('products.low_stock')
      }
      return $t('products.out_of_stock')
    })

    const formatPrice = (price) => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(price)
    }

    const addToCart = () => {
      // Implémenter l'ajout au panier
    }

    const toggleFavorite = () => {
      isFavorite.value = !isFavorite.value
    }

    return {
      isFavorite,
      seasonClass,
      stockClass,
      stockStatus,
      formatPrice,
      addToCart,
      toggleFavorite,
    }
  },
}
</script>
