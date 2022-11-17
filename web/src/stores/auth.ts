import { defineStore } from 'pinia'
import { useCookies } from 'vue3-cookies'
import { networkService } from '@/services/networkService'
const { cookies } = useCookies()

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      email: '',
      authenticated: false,
      token: '',
    }
  },
  actions: {
    async authenticate(password: string) {
      // const promise = await fetch('http://localhost:3000/auth', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: this.email,
      //     password: password,
      //   }),
      // })
      // const response = await promise.json()

      // const response await networkService.post("/auth", {
      //   email: this.email,

      // })
      const response = await networkService.post('/auth', {
        email: this.email,
        password: password,
      })

      if (!response.authenticated) {
        this.authenticated = false
        this.token = ''
        return false
      }

      this.authenticated = true
      this.token = response.token

      localStorage.setItem('authenticated', 'true')
      cookies.set('token', this.token, '30d', '/', '', true, 'None')
      cookies.set('user', this.email, '30d', '/', '', true, 'None')

      return {
        authenticated: true,
      }
    },
  },
})
