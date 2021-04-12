import Vue from 'vue'
import {DateTime} from 'luxon'

Vue.filter('adwordsID', function (value) {
  if (value) {
    return value.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  }

  return '-'
})

Vue.filter('date', function (value, timezone) {
  try {
    return DateTime.fromISO(value).setZone(timezone).toFormat('dd.LL.y')
  } catch (e) {
    return value
  }
})

Vue.filter('time', function (value, timezone) {
  try {
    return DateTime.fromISO(value).setZone(timezone).toFormat('HH:mm')
  } catch (e) {
    return value
  }
})

Vue.filter('times', function (value, timezone) {
  try {
    return DateTime.fromISO(value).setZone(timezone).toFormat('HH:mm:ss')
  } catch (e) {
    return value
  }
})

Vue.filter('datetime', function (value, timezone) {
  try {
    return DateTime.fromISO(value).setZone(timezone).toFormat('HH:mm, dd.LL.y')
  } catch (e) {
    return value
  }
})

Vue.filter('datetimes', function (value, timezone) {
  try {
    return DateTime.fromISO(value).setZone(timezone).toFormat('HH:mm:ss, dd.LL.y')
  } catch (e) {
    return value
  }
})

Vue.filter('round', function (value, decimals = 0) {
  if (value) {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
  }

  return '-'
})
