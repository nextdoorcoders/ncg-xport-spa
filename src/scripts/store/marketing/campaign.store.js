export default {
  namespaced: true,
  state: {
    isCampaignCollectionLoading: false,
    campaignCollection: [],
  },
  mutations: {
    setCollection (state, response) {
      state.campaignCollection = response.data
    }
  },
  actions: {
    index: async (context, payload) => {
      return new Promise((resolve, reject) => {
        context.state.isCampaignCollectionLoading = true

        axios.get(`marketing/campaigns`)
          .then(response => {
            context.commit('setCollection', response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
          .then(() => {
            context.state.isCampaignCollectionLoading = false
          })
      })
    },
    get: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`marketing/campaigns/map-${payload.map}`, {
            params: payload?.data
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    create: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`marketing/campaigns/map-${payload.map}`, payload.data)
          .then(response => {
            context.dispatch('index')

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    read: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`marketing/campaigns/campaign-${payload.campaign}`)
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
        axios.put(`marketing/campaigns/campaign-${payload.campaign}`, payload.data)
          .then(response => {
            context.dispatch('index')

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    delete: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.delete(`marketing/campaigns/campaign-${payload.campaign}`)
          .then(response => {
            context.dispatch('index')

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
