const TOKEN_KEY = 'accessToken'
const STASHED_TOKEN_KEY = 'stashedAccessToken'

export const loginResponse = (response) => {
  let data = response.data

  if (data.token_type !== undefined && data.access_token !== undefined) {
    if (hasToken()) {
      saveStashedToken(getToken())
    }

    saveToken(data.token_type + ' ' + data.access_token)
  }
}

export const logoutResponse = () => {
  if (hasStashedToken()) {
    saveToken(getStashedToken())
  } else {
    destroyToken()
  }

  destroyStashedToken()
}


export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY) || null
}

export const getStashedToken = () => {
  return window.localStorage.getItem(STASHED_TOKEN_KEY) || null
}


export const hasToken = () => {
  return !!getToken()
}

export const hasStashedToken = () => {
  return !!getStashedToken()
}


export const saveStashedToken = (token) => {
  window.localStorage.setItem(STASHED_TOKEN_KEY, token)
}

export const saveToken = (token) => {
  window.localStorage.setItem(TOKEN_KEY, token)
}


export const destroyStashedToken = () => {
  window.localStorage.removeItem(STASHED_TOKEN_KEY)
}

export const destroyToken = () => {
  window.localStorage.removeItem(TOKEN_KEY)
}
