import { $fetch } from 'ohmyfetch'

import * as v1 from '@/api/config/apiV1'

const getBaseUrl = () => {
  let baseUrl = `http://`

  if (process.env.nodeEnv === 'production') {
    baseUrl = `https://`
  }

  return `${baseUrl}jsonplaceholder.typicode.com`
}

const setClientApi = (clientApiV1) => {
  const services = {
    ...clientApiV1,
  }
  const clientApi = {}
  const baseURL = getBaseUrl()

  const httpService = () => {
    return {
      post: (url, data) => {
        return $fetch(`${baseURL}${url}`, {
          method: 'POST',
          params: { data },
        })
      },
      get: (url, data) => {
        return $fetch(`${baseURL}${url}`, {
          method: 'GET',
          params: { data },
        })
      },
      put: (url, data) => {
        return $fetch(`${baseURL}${url}`, {
          method: 'PUT',
          params: { data },
        })
      },
      delete: (url, data) => {
        return $fetch(`${baseURL}${url}`, {
          method: 'DELETE',
          params: { data },
        })
      },
    }
  }

  Object.keys(services).forEach((version) => {
    Object.keys(services[version]).forEach((service) => {
      if (!clientApi[version]) clientApi[version] = {}
      clientApi[version][service] = services[version][service](
        httpService(),
        version
      )
    })
  })

  return clientApi
}

const clientApiV1 = v1.default

export default (inject) => {
  const clientApi = setClientApi(clientApiV1)

  inject('api', { ...clientApi })
}
