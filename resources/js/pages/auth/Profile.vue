<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        {{ t('profile.title') }}
      </h1>

      <!-- Informations personnelles -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-lg font-medium text-gray-900">
            {{ t('profile.personal_info') }}
          </h2>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
          <form @submit.prevent="updateProfile" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                {{ t('profile.name') }}
              </label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                {{ t('profile.email') }}
              </label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">
                {{ t('profile.phone') }}
              </label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {{ loading ? t('profile.saving') : t('profile.save') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Adresses -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-lg font-medium text-gray-900">
            {{ t('profile.addresses') }}
          </h2>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div v-if="addresses.length === 0" class="text-gray-500">
            {{ t('profile.no_addresses') }}
          </div>
          <ul v-else role="list" class="divide-y divide-gray-200">
            <li v-for="address in addresses" :key="address.id" class="py-4">
              <div class="flex justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ address.name }}</p>
                  <p class="text-sm text-gray-500">{{ address.street }}</p>
                  <p class="text-sm text-gray-500">{{ address.city }}, {{ address.postal_code }}</p>
                </div>
                <div class="flex space-x-3">
                  <button
                    @click="editAddress(address)"
                    class="text-emerald-600 hover:text-emerald-900"
                  >
                    {{ t('profile.edit') }}
                  </button>
                  <button
                    @click="deleteAddress(address)"
                    class="text-red-600 hover:text-red-900"
                  >
                    {{ t('profile.delete') }}
                  </button>
                </div>
              </div>
            </li>
          </ul>
          <button
            @click="addAddress"
            class="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {{ t('profile.add_address') }}
          </button>
        </div>
      </div>

      <!-- Commandes récentes -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h2 class="text-lg font-medium text-gray-900">
            {{ t('profile.recent_orders') }}
          </h2>
        </div>
        <div class="border-t border-gray-200">
          <div v-if="orders.length === 0" class="px-4 py-5 sm:px-6 text-gray-500">
            {{ t('profile.no_orders') }}
          </div>
          <ul v-else role="list" class="divide-y divide-gray-200">
            <li v-for="order in orders" :key="order.id" class="px-4 py-5 sm:px-6">
              <div class="flex justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ t('profile.order_number', { number: order.number }) }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ new Date(order.date).toLocaleDateString() }}
                  </p>
                </div>
                <div class="text-sm">
                  <span :class="orderStatusClass(order.status)">
                    {{ t(`profile.status.${order.status}`) }}
                  </span>
                  <p class="mt-1 font-medium text-gray-900">
                    {{ formatPrice(order.total) }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const loading = ref(false)
const form = reactive({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+33 6 12 34 56 78'
})

const addresses = ref([
  {
    id: 1,
    name: 'Domicile',
    street: '123 Rue de Paris',
    city: 'Paris',
    postal_code: '75001'
  }
])

const orders = ref([
  {
    id: 1,
    number: 'CMD-001',
    date: '2024-03-20',
    status: 'delivered',
    total: 89.99
  }
])

const updateProfile = async () => {
  try {
    loading.value = true
    // Implémenter la mise à jour du profil
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Profile updated:', form)
  } finally {
    loading.value = false
  }
}

const addAddress = () => {
  // Implémenter l'ajout d'adresse
  console.log('Add address')
}

const editAddress = (address) => {
  // Implémenter la modification d'adresse
  console.log('Edit address:', address)
}

const deleteAddress = (address) => {
  // Implémenter la suppression d'adresse
  console.log('Delete address:', address)
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const orderStatusClass = (status) => {
  const classes = {
    pending: 'text-yellow-600',
    processing: 'text-blue-600',
    delivered: 'text-green-600',
    cancelled: 'text-red-600'
  }
  return classes[status] || 'text-gray-600'
}
</script>
