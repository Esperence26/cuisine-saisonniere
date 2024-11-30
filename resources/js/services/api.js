import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  response => response,
  error => {
    // Gérer les erreurs globalement ici
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const productsApi = {
  getAll(params = {}) {
    return api.get('/produits', { params })
  },
  getById(id) {
    return api.get(`/produits/${id}`)
  },
  getBySeason(season) {
    return api.get('/produits', { params: { saison: season } })
  }
}

export const recipesApi = {
  getAll(params = {}) {
    return api.get('/recettes', { params })
  },
  getById(id) {
    return api.get(`/recettes/${id}`)
  },
  getBySeason(season) {
    return api.get('/recettes', { params: { saison: season } })
  }
}

export const newsletterApi = {
  subscribe(email) {
    return api.post('/newsletter/subscribe', { email })
  }
}

export const ordersApi = {
  create(orderData) {
    return api.post('/commandes', orderData)
  },
  getById(id) {
    return api.get(`/commandes/${id}`)
  },
  getUserOrders() {
    return api.get('/commandes/user')
  }
}

export default api
