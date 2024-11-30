import { defineStore } from 'pinia'
import axios from 'axios'

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [],
    loading: false,
    error: null,
    currentOrder: null,
    totalPages: 0,
    currentPage: 1
  }),

  actions: {
    async fetchOrders(page = 1) {
      this.loading = true
      try {
        const response = await axios.get('/api/orders', { params: { page } })
        this.orders = response.data.data.data
        this.totalPages = Math.ceil(response.data.data.total / response.data.data.per_page)
        this.currentPage = page
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    },

    async fetchOrder(id) {
      this.loading = true
      try {
        const response = await axios.get(`/api/orders/${id}`)
        this.currentOrder = response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    },

    async createOrder(orderData) {
      this.loading = true
      try {
        const response = await axios.post('/api/orders', orderData)
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateOrder(id, orderData) {
      this.loading = true
      try {
        const response = await axios.put(`/api/orders/${id}`, orderData)
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    },

    async cancelOrder(id) {
      this.loading = true
      try {
        const response = await axios.post(`/api/orders/${id}/cancel`)
        const index = this.orders.findIndex(order => order.id === id)
        if (index !== -1) {
          this.orders[index] = response.data.data
        }
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
