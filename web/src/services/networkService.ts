const useNetwork = {
  endpoint: 'http://127.0.0.1:3000/',
  get(type: string) {
    return fetch(`${this.endpoint}${type}`).then((response) => response.json())
    // return new Promise((resolve, reject) => {
    //   fetch(`${this.endpoint}${type}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       // console.log(data)
    //       resolve(data)
    //     })
    //     .catch((err) => reject(err))
    // })
  },
  // post() { },
}

export default useNetwork
