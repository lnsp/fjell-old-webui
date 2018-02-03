import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'
import MachineDetails from '@/components/machines/MachineDetails'
import Storage from '@/components/storage/Storage'
import Networking from '@/components/networking/Networking'
import AddDomain from '@/components/networking/AddDomain'
import AccessConsole from '@/components/machines/AccessConsole'
import DestroyMachine from '@/components/machines/DestroyMachine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/machines/:vmName',
      name: 'MachineDetails',
      component: MachineDetails
    },
    {
      path: '/machines/:vmName/console',
      name: 'AccessConsole',
      component: AccessConsole
    },
    {
      path: '/machines/:vmName/destroy',
      name: 'DestroyMachine',
      component: DestroyMachine
    },
    {
      path: '/storage',
      name: 'Storage',
      component: Storage
    },
    {
      path: '/networking',
      name: 'Networking',
      component: Networking
    },
    {
      path: '/networking/domains/new/:ipAddress',
      name: 'AddDomain',
      component: AddDomain
    }
  ],
  linkExactActiveClass: 'active'
})
