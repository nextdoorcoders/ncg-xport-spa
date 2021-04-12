export default {
  namespaced: true,
  state: {
    isMapCollectionLoading: false,
    mapCollection: [],
  },
  mutations: {
    setCollection(state, response) {
      state.mapCollection = response.data
    }
  },
  actions: {
    get: async (context, payload) => {
      return new Promise((resolve, reject) => {
        context.state.isMapCollectionLoading = true

        axios.get(`trigger/maps`, {
            params: payload?.data
          })
          .then(response => {
            context.commit('setCollection', response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
          .then(() => {
            context.state.isMapCollectionLoading = false
          })
      })
    },
    create: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`trigger/maps`, payload.data)
          .then(response => {
            context.dispatch('get')

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    read: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`trigger/maps/map-${payload.map}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.put(`trigger/maps/map-${payload.map}`, payload.data)
          .then(response => {
            context.dispatch('get')

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    delete: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.delete(`trigger/maps/map-${payload.map}`)
          .then(response => {
            context.dispatch('get')

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    replicate: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`trigger/maps/map-${payload.map}/replicate`)
          .then(response => {
            context.dispatch('get')

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getConditions: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`trigger/maps/map-${payload.map}/conditions`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateConditions: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.put(`trigger/maps/map-${payload.map}/conditions`, payload.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getHistories: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`trigger/maps/map-${payload.map}/histories`)
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
