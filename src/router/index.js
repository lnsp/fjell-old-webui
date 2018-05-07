import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'
import AddMachine from '@/components/machines/AddMachine'
import StorageDashboard from '@/components/storage/Dashboard'
import Networking from '@/components/networking/Networking'
import AddDomain from '@/components/networking/AddDomain'

import MachineDetails from '@/components/machines/MachineDetails'
import UsageGraphs from '@/components/machines/details/UsageGraphs'
import AccessConsole from '@/components/machines/details/AccessConsole'
import PowerControl from '@/components/machines/details/PowerControl'
import DestroyMachine from '@/components/machines/details/DestroyMachine'
import Snapshots from '@/components/machines/details/Snapshots'
import AddressManagement from '@/components/machines/details/AddressManagement'

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
      path: '/machines/new',
      name: 'AddMachine',
      component: AddMachine
    },
    {
      path: '/machines/:id',
      component: MachineDetails,
      children: [
        {
          path: '/machines/:id/',
          name: 'UsageGraphs',
          component: UsageGraphs
        },
        {
          path: '/machines/:id/console',
          name: 'AccessConsole',
          component: AccessConsole
        },
        {
          path: '/machines/:id/destroy',
          name: 'DestroyMachine',
          component: DestroyMachine
        },
        {
          path: '/machines/:id/power',
          name: 'PowerControl',
          component: PowerControl
        },
        {
          path: '/machines/:id/snapshots',
          name: 'Snapshots',
          component: Snapshots
        },
        {
          path: '/machines/:id/networking',
          name: 'AddressManagement',
          component: AddressManagement
        }
      ]
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
      path: '/network/domain/new/:address',
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
