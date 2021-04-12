export default {
  namespaced: true,
  actions: {
    get: (commit, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`trigger/conditions/group-${payload.group}`, payload.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    create: (commit, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`trigger/conditions/group-${payload.group}`, payload.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update: (commit, payload) => {
      return new Promise((resolve, reject) => {
        axios.put(`trigger/conditions/condition-${payload.condition}`, payload.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    delete: (commit, payload) => {
      return new Promise((resolve, reject) => {
        axios.delete(`trigger/conditions/condition-${payload.condition}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    replicate: (commit, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`trigger/conditions/condition-${payload.condition}/replicate`, payload.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  }
}
