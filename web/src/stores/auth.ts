import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      email: undefined,
      authenticated: false,
    }
  },
  actions: {
    async authenticate(password: string) {
      console.log(this.email, password)
    },
  },
})
