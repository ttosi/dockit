import { useCookies } from 'vue3-cookies'
const { cookies } = useCookies()

const networkService = {
  url: import.meta.env.VITE_BASE_URL,
  token: cookies.get('token'),
  user: cookies.get('user'),
  headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': this.token,
      'X-Auth-User': this.user,
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
