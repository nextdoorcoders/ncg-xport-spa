import Vue from 'vue'
import {getToken} from './service/token.service'
import {getLanguage} from './service/language.service'
import {Settings} from 'luxon'
import ModalMessage from '../views/components/messages/ModalMessage'
import Bus from './service/utils/bus'

window.Bus = new Vue()

window._ = require('lodash')

Settings.throwOnInvalid = true

window.axios = require('axios')

axios.defaults.baseURL = process.env.MIX_API_URL + '/api'
axios.defaults.headers.common['Accept'] = 'application/json'

axios.interceptors.request.use(request => {
  request.headers['Accept-Language'] = getLanguage()
  request.headers['Authorization'] = getToken()

  return request
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  if (
    !_.isEmpty(response.data.message) &&
    (!_.isEmpty(response.data.message.title) || !_.isEmpty(response.data.message.description))
  ) {
    // Bus.$emit('modal-message', response.data)
    Bus.$emit('new', {
      component: ModalMessage,
      props: {
        response: response.data
      }
    })
  }

  return Promise.resolve(response.data)
}, error => {
  if (process.env.NODE_ENV === 'development') {
    let errorResponse = {}

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorResponse.response = error.response
    }

    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      errorResponse.request = error.request
    }

    if (error.config) {
      errorResponse.config = error.config
    }

    if (error.message) {
      errorResponse.message = error.message
    }

    console.log(errorResponse)
  }

  if (typeof error.response === 'undefined') {
    console.log('We are sorry, but server is offline. Please try to run it later.')

    Bus.$emit('new', {
      component: ModalMessage,
      props: {
        response: {
          message: {
            title: 'Error',
            description: 'We are sorry, but server is offline. Please try to run it later.',
            type: 'danger',
          },
          errors: []
        }
      }
    })
  }

  if (
    !_.isEmpty(error.response.data.message) &&
    (!_.isEmpty(error.response.data.message.title) || !_.isEmpty(error.response.data.message.description))
  ) {
    // Bus.$emit('modal-message', error.response.data)
    Bus.$emit('new', {
      component: ModalMessage,
      props: {
        response: error.response.data
      }
    })
  }

  return Promise.reject(error)
})


// import Echo from 'laravel-echo'
//
// window.io = require('socket.io-client')
//
// window.Echo = new Echo({
//   broadcaster: 'socket.io',
//   host: window.location.hostname + ':' + process.env.MIX_SOCKET_PORT,
//   auth: {
//     headers: {
//       Authorization: getToken()
//     }
//   }
// })
