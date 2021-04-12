export default {
  namespaced: true,
  actions: {
    get(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`google/map-${payload.map}/campaigns`, {
            params: payload?.data
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
