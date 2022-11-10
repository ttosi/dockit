const networkService = {
  token: '',
  url: 'https://tdc.app:3000',
  async get(endpoint: string) {},
  async post(endpoint: string, payload: object) {
    return await fetch(`${this.url}${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => data)
  },
}

export { networkService }
