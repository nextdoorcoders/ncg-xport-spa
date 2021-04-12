import {getLanguage, getLanguagePriority} from '../service/language.service'

export default {
  filters: {
    trans: function (value) {
      if (_.isString(value)) {
        return value
      }

      let language = getLanguage()

      if (!_.isUndefined(value[language])) {
        return value[language]
      } else {
        let priorities = getLanguagePriority()

        let priorityIndex = 0

        do {
          if (!_.isUndefined(value[priorities[priorityIndex]])) {
            return value[priorities[priorityIndex]]
          }

          priorityIndex++
        } while (priorityIndex < priorities.length);

        return '- no translation -'
      }
    }
  }
}
