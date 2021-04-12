export default {
  namespaced: true,
  state: {
    accountCollection: []
  },
  mutations: {
    setCollection(state, response) {
      state.accountCollection = response.data
    }
  },
  actions: {
    get: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.get('marketing/accounts')
          .then(response => {
            context.commit('setCollection', response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    linkToProvider: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`marketing/accounts/${payload.provider}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    handleProviderCallback: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`marketing/accounts/${payload.provider}/callback`, payload?.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    delete: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.delete(`marketing/accounts/account-${payload.account}`)
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
