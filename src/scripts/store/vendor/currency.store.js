export default {
  namespaced: true,
  actions: {
    get(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`vendor/currencies`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  }
}
