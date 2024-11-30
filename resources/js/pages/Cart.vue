<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">
      {{ t('cart.title') }}
    </h1>

    <!-- Panier vide -->
    <div v-if="!cartItems.length" class="text-center py-12">
      <p class="text-gray-500 text-lg mb-4">{{ t('cart.empty') }}</p>
      <router-link
        to="/products"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
      >
        {{ t('cart.continue_shopping') }}
      </router-link>
    </div>

    <!-- Contenu du panier -->
    <div v-else class="space-y-8">
      <!-- Liste des articles -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="item in cartItems" :key="item.id" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img :src="item.image" :alt="item.name" class="h-16 w-16 object-cover rounded-md" />
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500">{{ formatPrice(item.price) }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex items-center border rounded-md">
                  <button
                    @click="decrementQuantity(item)"
                    class="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span class="px-3 py-1 border-x">{{ item.quantity }}</span>
                  <button
                    @click="incrementQuantity(item)"
                    class="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  @click="removeItem(item)"
                  class="text-red-600 hover:text-red-800"
                >
                  {{ t('cart.remove') }}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Résumé de la commande -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">
            {{ t('cart.order_summary') }}
          </h2>
          <dl class="space-y-2">
            <div class="flex justify-between">
              <dt class="text-sm text-gray-600">{{ t('cart.subtotal') }}</dt>
              <dd class="text-sm font-medium text-gray-900">{{ formatPrice(subtotal) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-sm text-gray-600">{{ t('cart.shipping') }}</dt>
              <dd class="text-sm font-medium text-gray-900">{{ formatPrice(shippingCost) }}</dd>
            </div>
            <div class="flex justify-between border-t border-gray-200 pt-2">
              <dt class="text-base font-medium text-gray-900">{{ t('cart.total') }}</dt>
              <dd class="text-base font-medium text-gray-900">{{ formatPrice(total) }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <!-- Bouton de commande -->
      <div class="flex justify-end">
        <button
          @click="checkout"
          class="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700"
        >
          {{ t('cart.proceed_to_checkout') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// État du panier (à remplacer par un store Pinia)
const cartItems = ref([
  {
    id: 1,
    name: 'Tomates Bio',
    price: 2.99,
    quantity: 2,
    image: '/images/products/tomatoes.jpg'
  },
  // Ajoutez plus d'articles ici
])

const shippingCost = 5.99

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const total = computed(() => {
  return subtotal.value + shippingCost
})

// Méthodes
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const incrementQuantity = (item) => {
  item.quantity++
}

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

const removeItem = (item) => {
  const index = cartItems.value.indexOf(item)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const checkout = () => {
  // Implémenter la logique de paiement
  console.log('Procéder au paiement')
}
</script>
