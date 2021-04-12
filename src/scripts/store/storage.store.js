export default {
  namespaced:true,
  actions: {
    uploadFile(context, payload) {
      let formData = new FormData()

      formData.append(`data`, JSON.stringify(payload.data))
      formData.append(`file`, payload.file)

      return axios.post('storages', formData)
    },
    deleteFiles(context, payload) {
      return axios.delete(`storages/${payload.file}`)
    }
  }
}