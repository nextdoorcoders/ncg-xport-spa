const LANGUAGE_KEY = 'language'
const LANGUAGE_PRIORITY_KEY = 'language_priority'

export const getLanguage = () => {
  return window.localStorage.getItem(LANGUAGE_KEY) || 'en'
}

export const getLanguagePriority = () => {
  return JSON.parse(window.localStorage.getItem(LANGUAGE_PRIORITY_KEY)) || [
    'en',
    'ru',
    'uk',
  ]
}

export const saveLanguage = (language) => {
  window.localStorage.setItem(LANGUAGE_KEY, language.code)
  window.localStorage.setItem(LANGUAGE_PRIORITY_KEY, JSON.stringify(language.priority))
}

export const destroyLanguage = () => {
  window.localStorage.removeItem(LANGUAGE_KEY)
  window.localStorage.removeItem(LANGUAGE_PRIORITY_KEY)
}

export default {
  getLanguage,
  saveLanguage,
  destroyLanguage
}
