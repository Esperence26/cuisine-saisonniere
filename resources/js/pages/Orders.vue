<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        {{ t('orders.title') }}
      </h1>

      <!-- Liste des commandes -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div v-if="orders.length === 0" class="p-6 text-center text-gray-500">
          {{ t('orders.no_orders') }}
        </div>

        <ul v-else role="list" class="divide-y divide-gray-200">
          <li v-for="order in orders" :key="order.id" class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-medium text-gray-900">
                  {{ t('orders.order_number', { number: order.number }) }}
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  {{ formatDate(order.date) }}
                </p>
              </div>
              <div class="text-right">
                <span :class="[
                  statusClasses[order.status],
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
                ]">
                  {{ t(`orders.status.${order.status}`) }}
                </span>
                <p class="mt-1 text-sm font-medium text-gray-900">
                  {{ formatPrice(order.total) }}
                </p>
              </div>
            </div>

            <!-- Détails de la commande -->
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">{{ t('orders.items') }}</h3>
              <ul role="list" class="mt-2 divide-y divide-gray-200">
                <li v-for="item in order.items" :key="item.id" class="flex py-4">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div class="ml-4 flex flex-1 flex-col">
                    <div>
                      <div class="flex justify-between">
                        <h4 class="text-sm font-medium text-gray-900">
                          {{ item.name }}
                        </h4>
                        <p class="ml-4 text-sm font-medium text-gray-900">
                          {{ formatPrice(item.price) }}
                        </p>
                      </div>
                      <p class="mt-1 text-sm text-gray-500">
                        {{ t('orders.quantity', { quantity: item.quantity }) }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Adresse de livraison -->
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">
                {{ t('orders.delivery_address') }}
              </h3>
              <address class="mt-2 not-italic text-sm text-gray-500">
                <p>{{ order.address.name }}</p>
                <p>{{ order.address.street }}</p>
                <p>{{ order.address.city }}, {{ order.address.postal_code }}</p>
              </address>
            </div>

            <!-- Actions -->
            <div class="mt-6 flex justify-end space-x-4">
              <button
                @click="downloadInvoice(order)"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {{ t('orders.download_invoice') }}
              </button>
              <button
                v-if="order.status === 'delivered'"
                @click="reorder(order)"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {{ t('orders.reorder') }}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Statuts des commandes avec leurs classes CSS
const statusClasses = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
}

// Données de démonstration
const orders = ref([
  {
    id: 1,
    number: 'CMD-2024-001',
    date: '2024-03-20T10:00:00',
    status: 'delivered',
    total: 89.99,
    items: [
      {
        id: 1,
        name: 'Panier de légumes bio',
        quantity: 1,
        price: 49.99,
        image: '/images/products/vegetables.jpg'
      },
      {
        id: 2,
        name: 'Fruits de saison',
        quantity: 2,
        price: 19.99,
        image: '/images/products/fruits.jpg'
      }
    ],
    address: {
      name: 'John Doe',
      street: '123 Rue de Paris',
      city: 'Paris',
      postal_code: '75001'
    }
  },
  {
    id: 2,
    number: 'CMD-2024-002',
    date: '2024-03-19T15:30:00',
    status: 'processing',
    total: 45.98,
    items: [
      {
        id: 3,
        name: 'Panier découverte',
        quantity: 1,
        price: 45.98,
        image: '/images/products/discovery.jpg'
      }
    ],
    address: {
      name: 'John Doe',
      street: '123 Rue de Paris',
      city: 'Paris',
      postal_code: '75001'
    }
  }
])

// Formatage de la date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Formatage du prix
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

// Téléchargement de la facture
const downloadInvoice = (order) => {
  console.log('Téléchargement de la facture pour la commande:', order.number)
  // Implémenter la logique de téléchargement
}

// Repasser une commande
const reorder = (order) => {
  console.log('Repasser la commande:', order.number)
  // Implémenter la logique de recommande
}
</script>
