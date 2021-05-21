export default {
    namespaced: true,
    state: {
        isStateCollectionLoading: false,
        StateCollection: []
    },
    mutations: {
        setCollection(state, response) {
            state.StateCollection = response.data
        }
    },
    actions: {
        get: async (context, payload) => {
            return new Promise((resolve, reject) => {
                context.state.isStateCollectionLoading = true

                axios.get(`reports/vendors-state`, {
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
                        context.state.isStateCollectionLoading = false
                    })
            })
        },
        delete: async (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.delete(`reports/delete/${payload.id}`)
                    .then(response => {
                        context.dispatch('get')

                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    }
}
