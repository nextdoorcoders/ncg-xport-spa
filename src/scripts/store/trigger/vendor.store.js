export default {
  namespaced: true,
  actions: {
    get(context, {data}) {
      return new Promise((resolve, reject) => {
        axios.get(`trigger/vendors`, {
            params: data
          })
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
