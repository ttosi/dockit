import fetch, { Headers } from 'node-fetch'
// import { Headers } from 'node-fetch'

const network = {
  username: 'admin',
  password: 'Mak3nna03',
  auth() {
    return new Headers({
      Authorization: `Basic ${Buffer.from(
        this.username + ':' + this.password
      ).toString('base64')}`,
    })
  },
  async get(url: string) {
    return await fetch(`${url}`, {
      headers: this.auth(),
    })
      .then((res: any) => res.json())
      .then((data: any) => data)
  },
  async put() {
    //
  },
  async post() {},
  async delete() {},
}

export { network }
