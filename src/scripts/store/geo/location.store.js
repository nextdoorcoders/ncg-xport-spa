export default {
  namespaced: true,
  actions: {
    get(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`geo/locations`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    read(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`geo/locations/location-${payload.location}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    readGlobalVendors() {
      // Read global vendors
      return new Promise((resolve, reject) => {
        axios.get(`geo/locations/vendors`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    readLocationVendors(context, payload) {
      // Read local vendors for current location and parents
      return new Promise((resolve, reject) => {
        axios.get(`geo/locations/location-${payload.location}/vendors`)
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
