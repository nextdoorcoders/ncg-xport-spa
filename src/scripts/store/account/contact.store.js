export default {
  namespaced: true,
  state: {
    contactCollection: []
  },
  mutations: {
    setCollection(state, response) {
      state.contactCollection = response.data
    }
  },
  actions: {
    get: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`accounts/contacts`)
          .then(response => {
            context.commit('setCollection', response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    create: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`accounts/contacts`, payload.data)
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
        axios.get(`accounts/contacts/contact-${payload.contact}`)
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
        axios.put(`accounts/contacts/contact-${payload.contact}`, payload.data)
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
        axios.delete(`accounts/contacts/contact-${payload.contact}`)
          .then(response => {
            context.dispatch('get')

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
