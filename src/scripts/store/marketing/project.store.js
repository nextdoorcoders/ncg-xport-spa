export default {
  namespaced: true,
  state: {
    isProjectCollectionLoading: false,
    projectCollection: []
  },
  mutations: {
    setCollection(state, response) {
      state.projectCollection = response.data
    }
  },
  actions: {
    get: async (context, payload) => {
      return new Promise((resolve, reject) => {
        context.state.isProjectCollectionLoading = true

        axios.get(`marketing/projects`, {
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
            context.state.isProjectCollectionLoading = false
          })
      })
    },
    create: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`marketing/projects`, payload.data)
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
        axios.get(`marketing/projects/project-${payload.project}`)
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
        axios.put(`marketing/projects/project-${payload.project}`, payload.data)
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
        axios.delete(`marketing/projects/project-${payload.project}`)
          .then(response => {
            context.dispatch('get')

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getMaps: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`marketing/projects/project-${payload.project}/maps`)
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
