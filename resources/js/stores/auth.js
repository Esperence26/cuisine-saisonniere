import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  const login = async (credentials) => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simuler une réponse réussie
      const response = {
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: credentials.email
        },
        token: 'fake-jwt-token'
      }

      // Stocker les informations de l'utilisateur
      user.value = response.user
      isAuthenticated.value = true

      // Stocker le token dans le localStorage
      localStorage.setItem('token', response.token)
      
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simuler une réponse réussie
      const response = {
        user: {
          id: 1,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email
        },
        token: 'fake-jwt-token'
      }

      // Stocker les informations de l'utilisateur
      user.value = response.user
      isAuthenticated.value = true

      // Stocker le token dans le localStorage
      localStorage.setItem('token', response.token)
      
      return response
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    // Réinitialiser l'état
    user.value = null
    isAuthenticated.value = false

    // Supprimer le token du localStorage
    localStorage.removeItem('token')
  }

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      logout()
      return
    }

    try {
      // Simuler un appel API pour vérifier le token
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Simuler une réponse réussie
      const response = {
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com'
        }
      }

      // Mettre à jour l'état
      user.value = response.user
      isAuthenticated.value = true
    } catch (error) {
      console.error('Auth check error:', error)
      logout()
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth
  }
})
