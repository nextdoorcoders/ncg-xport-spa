import {destroyToken, hasToken, loginResponse, logoutResponse} from '../../service/token.service'
import {saveLanguage} from '../../service/language.service'
import ability from '../../service/ability.service'

export default {
  namespaced: true,
  state: {
    currentUser: {},
    currentUserPermissions: [],
    currentUserRoles: [],
    isAuthenticated: hasToken(),

    isUserCollectionLoading: false,
    userCollection: []
  },
  mutations: {
    setCollection(state, response) {
      state.userCollection = response.data
    },
    setAuth(state, response) {
      state.currentUser = {}
      state.isAuthenticated = true
      loginResponse(response)
    },
    purgeAuth(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      logoutResponse()

      // TODO: Remove abilities
    },
    setCurrentUser(state, response) {
      state.currentUser = response.data
      state.isAuthenticated = true
      saveLanguage(response.data.language)
    },
    setCurrentUserPermissions(state, response) {
      state.currentUserPermissions = response.data
      // setPermissions(response.data)
    },
    setCurrentUserRoles(state, response) {
      state.currentUserRoles = response.data

      let abilities = []

      _.each(response.data, function (role) {
        abilities.push({
          action: 'role',
          subject: role.name
        })

        _.each(role.permissions, function (permission) {
          abilities.push({
            action: permission.action,
            subject: permission.subject
          })
        })
      })

      ability.update(abilities)
    }
  },
  actions: {
    get: async (context, payload) => {
      return new Promise((resolve, reject) => {
        context.state.isUserCollectionLoading = true

        axios.get(`accounts/users`, {
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
            context.state.isUserCollectionLoading = false
          })
      })
    },
    read: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.get(`accounts/users-${payload.user}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    register: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`accounts/auth/register`, payload.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    login: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`accounts/auth/login`, payload.data)
          .then(response => {
            context.commit('setAuth', response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    switch: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`accounts/auth/switch/${payload.user}`, payload.data)
          .then(response => {
            context.commit('setAuth', response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout: async (context) => {
      return new Promise((resolve, reject) => {
        axios.delete(`accounts/auth/logout`)
          .then(response => {
            context.commit('purgeAuth')

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    forgotSendCode: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`accounts/auth/forgot/send-code`, payload.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    forgotConfirmCode: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(`accounts/auth/forgot/confirm-code`, payload.data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    readCurrentUser: async (context) => {
      return new Promise((resolve, reject) => {
        axios.get(`accounts/users/current`)
          .then(response => {
            context.commit('setCurrentUser', response)

            // context.dispatch('readCurrentUserPermissions')
            context.dispatch('readCurrentUserRoles')

            resolve(response)
          })
          .catch(error => {
            if (typeof error.response === 'undefined' || error.response.status === 401) {
              context.commit('purgeAuth')
            }

            reject(error)
          })
      })
    },
    updateCurrentUser: async (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.put(`accounts/users/current`, payload.data)
          .then(response => {
            context.commit('setCurrentUser', response)

            resolve(response)
          })
          .catch(error => {
            if (typeof error.response === 'undefined' || error.response.status === 401) {
              context.commit('purgeAuth')
            }

            reject(error)
          })
      })
    },
    readCurrentUserPermissions: async (context) => {
      return new Promise((resolve, reject) => {
        axios.get(`accounts/users/current/permissions`)
          .then(response => {
            context.commit('setCurrentUserPermissions', response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    readCurrentUserRoles: async (context) => {
      return new Promise((resolve, reject) => {
        axios.get(`accounts/users/current/roles`)
          .then(response => {
            context.commit('setCurrentUserRoles', response)

            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated
    },
    currentUser(state) {
      return state.currentUser
    }
  }
}
