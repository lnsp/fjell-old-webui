import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'
import MachineDetails from '@/components/machines/MachineDetails'
import AddMachine from '@/components/machines/AddMachine'
import StorageDashboard from '@/components/storage/Dashboard'
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
      path: '/machine/new',
      name: 'AddMachine',
      component: AddMachine
    },
    {
      path: '/machine/:vmName',
      name: 'MachineDetails',
      component: MachineDetails
    },
    {
      path: '/machine/:vmName/console',
      name: 'AccessConsole',
      component: AccessConsole
    },
    {
      path: '/machine/:vmName/destroy',
      name: 'DestroyMachine',
      component: DestroyMachine
    },
    {
      path: '/storage',
      name: 'Storage',
      component: StorageDashboard
    },
    {
      path: '/storage/block/new',
      Name: 'AddStorageBlock',
      component: StorageDashboard
    },
    {
      path: '/storage/bucket/new',
      Name: 'AddStorageBucket',
      component: StorageDashboard
    },
    {
      path: '/network',
      name: 'Networking',
      component: Networking
    },
    {
      path: '/network/domain/new/:ipAddress',
      name: 'AddDomain',
      component: AddDomain
    },
    {
      path: '/network/floating-ip/new',
      name: 'AddFloatingIP',
      component: Networking
    },
    {
      path: '/network/firewall/new',
      name: 'AddFirewall',
      component: Networking
    },
    {
      path: '/network/load-balancer/new',
      name: 'AddLoadBalancer',
      component: Networking
    }
  ],
  linkExactActiveClass: 'active'
})
