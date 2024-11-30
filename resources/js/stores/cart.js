import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    
    totalPrice: (state) => state.items.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    ),

    formattedTotal: (state) => {
      const total = state.items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
      )
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(total)
    },
  },

  actions: {
    async fetchCart() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get('/api/cart')
        this.items = response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    },

    async addItem(productId, quantity = 1) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post('/api/cart/add', {
          product_id: productId,
          quantity,
        })
        this.items = response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateQuantity(productId, quantity) {
      if (quantity < 1) return this.removeItem(productId)

      this.loading = true
      this.error = null

      try {
        const response = await axios.put(`/api/cart/update`, {
          product_id: productId,
          quantity,
        })
        this.items = response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    },

    async removeItem(productId) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.delete(`/api/cart/remove/${productId}`)
        this.items = response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    },

    async clearCart() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post('/api/cart/clear')
        this.items = response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    },

    async checkout(paymentDetails) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post('/api/orders', {
          items: this.items,
          payment: paymentDetails,
        })

        // Vider le panier après une commande réussie
        await this.clearCart()

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
