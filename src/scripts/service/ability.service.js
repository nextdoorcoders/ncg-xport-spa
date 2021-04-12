import Vue from 'vue'
import {Ability} from '@casl/ability'
import {Can} from '@casl/vue'
import {abilitiesPlugin} from '@casl/vue'

Vue.use(abilitiesPlugin)

Vue.component('Can', Can)

export default new Ability()
