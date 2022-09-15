export default ($axios, apiVersion) => ({
  create(id) {
    return $axios.get(`${apiVersion}/todos/${id}`)
  },
})
