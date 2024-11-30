import { defineStore } from 'pinia'
import axios from 'axios'

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    recipes: [],
    loading: false,
    error: null,
    currentRecipe: null,
    totalPages: 0,
    currentPage: 1
  }),

  actions: {
    async fetchRecipes(page = 1, filters = {}) {
      this.loading = true
      try {
        const params = { page, ...filters }
        const response = await axios.get('/api/recipes', { params })
        this.recipes = response.data.data.data
        this.totalPages = Math.ceil(response.data.data.total / response.data.data.per_page)
        this.currentPage = page
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    },

    async fetchRecipe(id) {
      this.loading = true
      try {
        const response = await axios.get(`/api/recipes/${id}`)
        this.currentRecipe = response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
      } finally {
        this.loading = false
      }
    },

    async createRecipe(recipeData) {
      this.loading = true
      try {
        const formData = new FormData()
        Object.keys(recipeData).forEach(key => {
          if (key === 'image' && recipeData[key]) {
            formData.append(key, recipeData[key])
          } else if (typeof recipeData[key] === 'object') {
            formData.append(key, JSON.stringify(recipeData[key]))
          } else {
            formData.append(key, recipeData[key])
          }
        })

        const response = await axios.post('/api/recipes', formData, {
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

    async updateRecipe(id, recipeData) {
      this.loading = true
      try {
        const formData = new FormData()
        formData.append('_method', 'PUT')
        
        Object.keys(recipeData).forEach(key => {
          if (key === 'image' && recipeData[key]) {
            formData.append(key, recipeData[key])
          } else if (typeof recipeData[key] === 'object') {
            formData.append(key, JSON.stringify(recipeData[key]))
          } else {
            formData.append(key, recipeData[key])
          }
        })

        const response = await axios.post(`/api/recipes/${id}`, formData, {
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

    async deleteRecipe(id) {
      this.loading = true
      try {
        await axios.delete(`/api/recipes/${id}`)
        this.recipes = this.recipes.filter(recipe => recipe.id !== id)
      } catch (error) {
        this.error = error.response?.data?.message || 'Une erreur est survenue'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
