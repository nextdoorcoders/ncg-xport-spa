export default {
  namespaced: true,
  actions: {
    get(context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`trigger/groups/map-${payload.map}`, {
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
    create(context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`trigger/groups/map-${payload.map}`, payload.data)
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
        axios.get(`trigger/groups/group-${payload.group}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update(context, payload) {
      return new Promise((resolve, reject) => {
        axios.put(`trigger/groups/group-${payload.group}`, payload.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    delete(context, payload) {
      return new Promise((resolve, reject) => {
        axios.delete(`trigger/groups/group-${payload.group}`)
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
