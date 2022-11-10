import { defineStore } from 'pinia'
import { networkService } from '@/services/networkService'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      email: '',
      authenticated: false,
    }
  },
  actions: {
    async authenticate(password: string) {
      const response = await networkService.post('/auth', {
        email: this.email,
        password: password,
      })
      this.authenticated = response.authenticated
    },
  },
})
