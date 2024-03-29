import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { networkService } from '@/services/networkService'

const { cookies } = useCookies()

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      authenticated: false,
      email: '',
      token: '',
    }
  },
  actions: {
    async login(password: string) {
      console.log('nn', this.email)
      const auth = await networkService.post('/auth', {
        email: this.email,
        password: password,
      })

      if (!auth.authenticated) {
        return false
      }

      cookies.set('token', auth.token)
      cookies.set('user', auth.email)

      this.authenticated = true
      this.token = auth.token
      this.email = auth.email

      return true
    },
    async logout() {
      cookies.remove('token')
      cookies.remove('user')

      this.authenticated = false
      this.token = ''
      this.email = ''
    },
  },
})
