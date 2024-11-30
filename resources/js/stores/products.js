import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
    currentProduct: null,
    totalPages: 0,
    currentPage: 1
  }),

  actions: {
    async fetchProducts(page = 1, filters = {}) {
      this.loading = true
      try {
        const params = { page, ...filters }
        const response = await axios.get('/api/products', { params })
        this.products = response.data.data.data
        this.totalPages = Math.ceil(response.data.data.total / response.data.data.per_page)
        this.currentPage = page
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    },

    async fetchProduct(id) {
      this.loading = true
      try {
        const response = await axios.get(`/api/products/${id}`)
        this.currentProduct = response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    },

    async createProduct(productData) {
      this.loading = true
      try {
        const formData = new FormData()
        Object.keys(productData).forEach(key => {
          if (key === 'image' && productData[key]) {
            formData.append(key, productData[key])
          } else if (typeof productData[key] === 'object') {
            formData.append(key, JSON.stringify(productData[key]))
          } else {
            formData.append(key, productData[key])
          }
        })

        const response = await axios.post('/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProduct(id, productData) {
      this.loading = true
      try {
        const formData = new FormData()
        formData.append('_method', 'PUT')
        
        Object.keys(productData).forEach(key => {
          if (key === 'image' && productData[key]) {
            formData.append(key, productData[key])
          } else if (typeof productData[key] === 'object') {
            formData.append(key, JSON.stringify(productData[key]))
          } else {
            formData.append(key, productData[key])
          }
        })

        const response = await axios.post(`/api/products/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProduct(id) {
      this.loading = true
      try {
        await axios.delete(`/api/products/${id}`)
        this.products = this.products.filter(product => product.id !== id)
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
