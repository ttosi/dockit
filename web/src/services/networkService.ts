import { useCookies } from 'vue3-cookies'

const { cookies } = useCookies()

const networkService = {
  url: '',
  // url: 'http://127.0.0.1:3000',
  headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': cookies.get('token'),
      'X-Auth-User': cookies.get('user'),
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
    return fetch(`${this.url}${endpoint}`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => data)
  },
  async delete() {},
}

export { networkService }
