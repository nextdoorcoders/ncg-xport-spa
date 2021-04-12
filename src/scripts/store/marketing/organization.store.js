export default {
  namespaced: true,
  state: {
    isOrganizationCollectionLoading: false,
    organizationCollection: []
  },
  mutations: {
    setCollection(state, response) {
      state.organizationCollection = response.data
    }
  },
  actions: {
    get: async (context, payload) => {
      return new Promise((resolve, reject) => {
        context.state.isOrganizationCollectionLoading = true

        axios.get(`marketing/organizations`, {
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
            context.state.isOrganizationCollectionLoading = false
          })
      })
    },
    create: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`marketing/organizations`, payload.data)
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
        axios.get(`marketing/organizations/organization-${payload.organization}`)
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
        axios.put(`marketing/organizations/organization-${payload.organization}`, payload.data)
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
        axios.delete(`marketing/organizations/organization-${payload.organization}`)
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
