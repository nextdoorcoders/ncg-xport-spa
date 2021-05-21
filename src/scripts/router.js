import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import {hasToken} from './service/token.service'

import TheAuth from '../views/layouts/TheAuth'
import TheDashboard from '../views/layouts/TheDashboard'

import Login from '../views/pages/auth/Login'
import Register from '../views/pages/auth/Register'
import Forgot from '../views/pages/auth/Forgot'
import Socialite from '../views/pages/auth/Socialite'

import Dashboard from '../views/pages/Dashboard'

import ProfileUpdate from '../views/pages/account/ProfileUpdate'

import ProjectCreate from '../views/pages/marketing/ProjectCreate'
import ProjectUpdate from '../views/pages/marketing/ProjectUpdate'

import CampaignUpdate from '../views/pages/marketing/CampaignUpdate'

import OrganizationCreate from '../views/pages/marketing/OrganizationCreate'
import OrganizationUpdate from '../views/pages/marketing/OrganizationUpdate'

import MapCreate from '../views/pages/trigger/MapCreate'
import MapUpdate from '../views/pages/trigger/MapUpdate'

import TermsAndConditions from '../views/pages/text/TermsAndConditions'
import PrivacyPolicy from '../views/pages/text/PrivacyPolicy'

import Error404 from '../views/pages/error/Error404'

import StateVendor from "../views/pages/reports/StateVendor";
import LogsVendor from "../views/pages/reports/LogsVendor";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: TheAuth,
    children: [
      {
        path: '',
        name: 'home',
        component: Login,
        meta: {
          auth: false
        }
      }
    ]
  },
  {
    path: '/dashboard',
    component: TheDashboard,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          auth: true,
          module: 'dashboard'
        }
      },
      {
        path: 'profile',
        name: 'profile.update',
        component: ProfileUpdate,
        meta: {
          auth: true,
          module: 'dashboard'
        }
      },
      {
        path: 'marketing/project/create',
        name: 'marketing.project.create',
        component: ProjectCreate,
        meta: {
          auth: true,
          module: 'project'
        }
      },
      {
        path: 'marketing/project/:project/update',
        name: 'marketing.project.update',
        component: ProjectUpdate,
        meta: {
          auth: true,
          module: 'project'
        }
      },
      {
        path: 'marketing/campaign/:campaign/update',
        name: 'marketing.campaign.update',
        component: CampaignUpdate,
        meta: {
          auth: true,
          module: 'project'
        }
      },
      {
        path: 'marketing/organization/create',
        name: 'marketing.organization.create',
        component: OrganizationCreate,
        meta: {
          auth: true,
          module: 'organization'
        }
      },
      {
        path: 'marketing/organization/:organization/update',
        name: 'marketing.organization.update',
        component: OrganizationUpdate,
        meta: {
          auth: true,
          module: 'organization'
        }
      },
      {
        path: 'trigger/map/create',
        name: 'trigger.map.create',
        component: MapCreate,
        meta: {
          auth: true,
          module: 'map'
        }
      },
      {
        path: 'trigger/map/:map/update',
        name: 'trigger.map.update',
        component: MapUpdate,
        meta: {
          auth: true,
          module: 'map'
        }
      },
      {
        path: 'reports/state',
        name: 'reports.state',
        component: StateVendor,
        meta: {
          auth: true,
          module: 'state'
        }
      },
      {
        path: 'reports/logs',
        name: 'reports.logs',
        component: LogsVendor,
        meta: {
          auth: true,
          module: 'logs'
        }
      }
    ]
  },
  {
    path: '/auth',
    component: TheAuth,
    children: [
      {
        path: '',
        name: 'auth',
        component: Login,
        meta: {
          auth: false
        }
      },
      {
        path: 'login',
        name: 'auth.login',
        component: Login,
        meta: {
          auth: false
        }
      },
      {
        path: 'register',
        name: 'auth.register',
        component: Register,
        meta: {
          auth: false
        }
      },
      {
        path: 'forgot',
        name: 'auth.forgot',
        component: Forgot,
        meta: {
          auth: false
        }
      },
      {
        path: 'social-account/:provider/callback',
        name: 'auth.account.callback',
        component: Socialite
      }
    ]
  },
  {
    path: '/',
    component: TheAuth,
    children: [
      {
        path: 'terms-and-conditions',
        name: 'terms-and-conditions',
        component: TermsAndConditions
      },
      {
        path: 'privacy-policy',
        name: 'privacy-policy',
        component: PrivacyPolicy
      }
    ]
  },
  {
    path: '*',
    component: Error404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from) {
    if (from.path !== to.path) {
      let restorePosition = JSON.parse(window.localStorage.getItem('restorePosition')) || null

      if (restorePosition) {
        window.localStorage.removeItem('restorePosition')

        return restorePosition
      }
    }

    return {
      x: 0,
      y: 0
    }
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth === true)) {
    store.dispatch('account/user/readCurrentUser')
      .then(response => {
        next()
      })
      .catch(error => {
        next({
          name: 'auth.login',
          query: {
            redirect: to.fullPath
          }
        })
      })
  } else if (to.matched.some(record => record.meta.auth === false) && hasToken()) {
    next({
      name: 'dashboard'
    })
  } else {
    next()
  }
})

export default router
