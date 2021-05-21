export default {
    namespaced: true,
    state: {
        isLogsCollectionLoading: false,
        LogsCollection: []
    },
    mutations: {
        setCollection(state, response) {
            state.LogsCollection = response.data
        }
    },
    actions: {
        get: async (context, payload) => {
            return new Promise((resolve, reject) => {
                context.state.isLogsCollectionLoading = true

                axios.get(`reports/vendors`, {
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
                        context.state.isLogsCollectionLoading = false
                    })
            })
        },
        read: async (context, payload) => {
            return new Promise((resolve, reject) => {
                axios.get(`reports/logs/${payload.id}`)
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
                axios.delete(`reports/delete/${payload.project}`)
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
