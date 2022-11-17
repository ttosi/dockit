// import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'
import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

// const { email, token } = storeToRefs(authStore)

const networkService = {
  // headers: `"token": ${token}`,
  url: 'http://localhost:3000',
  headers() {
    return {
      // Authorization: `Bearer ${cookies.get('token')}`,
      'X-API-Key': cookies.get('token'),
      'X-Username': cookies.get('user'),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  },
  async get(endpoint: string) {
    return await fetch(`${this.url}${endpoint}`, {
      method: 'GET',
      headers: this.headers(),
    })
      .then((res) => res.json())
      .then((data) => data)
  },
  async post(endpoint: string, payload: object) {
    console.log(`${this.url}${endpoint}`)
    console.log(payload)
    return await fetch(`${this.url}${endpoint}`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => data)
  },
}

export { networkService }
