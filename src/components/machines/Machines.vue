<template>
  <div>
    <div v-if="machines" class="dashboard-table mb-3">
      <div class="dashboard-header row d-none d-md-flex">
        <div class="dashboard-cell col-3 col-sm-5">Name</div>
        <div class="dashboard-cell col-7 row">
          <div class="col-4">IP Address</div>
          <div class="col-4 text-right">Created</div>
          <div class="col"></div>
        </div>
      </div>
      <div class="dashboard-body">
        <transition-group name="progress-action">
        <div class="dashboard-row row align-items-center justify-content-between" v-for="vm in machines" :key="vm.address">
          <div class="dashboard-cell col-12 col-md-5">
            <div class="dashboard-machine-info row align-items-center" @click="() => { if (vm.deployProgress === 100) $router.push({ name: 'UsageGraphs', params: { id: vm.id }}) }">
              <div class="col-auto">
                <transition name="deploy-action" mode="out-in">
                  <img key="logo-offline" v-if="vm.offline" :src="require('@/assets/distros/' + vm.osSlug + '_offline.svg')" class="dashboard-distro-logo">
                  <img key="logo-online" v-else :src="require('@/assets/distros/' + vm.osSlug + '.svg')" class="dashboard-distro-logo">
                </transition>
              </div>
              <div class="col-auto">
                <div class="row">
                  <strong :class="{ 'text-primary': !vm.offline, 'text-muted': vm.offline }">{{ vm.name }}</strong>
                </div>
                <div class="row">
                  <span class="text-muted">
                    <small>{{ vm.memory }} GB RAM / {{ vm.storage }} GB Disk / {{ vm.osName }}</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- find a better solution for animating transition !-->
          <transition name="progress-action" mode="out-in">
            <div key="ready" class="dashboard-cell dashboard-info-cell d-none d-sm-flex col-12 col-md-7 row" v-if="vm.deployProgress === 100">
              <div class="d-none d-sm-flex offset-1 offset-md-0 col-sm-auto col-md-4">
                <div class="copy-action-container">
                  <span class="text-muted d-inline d-md-none">IP </span>
                <span class="copy-action-ip" v-clipboard:copy="vm.address" v-on:click="toggleCopyIP(vm)">{{ vm.address }}</span>
                  <transition name="copy-action">
                    <span class="copy-action-label" v-if="showCopyFor === vm">Copied!</span>
                  </transition>
                </div>
              </div>
              <div class="d-none d-sm-inline col text-right col-md-4">
                <span class="text-muted d-inline d-md-none">Created </span>
                <span>
                {{ vm.createdAt | moment('from', true) }} ago
                </span>
              </div>
              <div class="col-md-4 d-none d-md-flex">
                <div class="btn-group">
                  <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    More
                  </button>
                  <div class="dropdown-menu">
                    <router-link :to="{ name: 'AddDomain', params: { address: vm.address }}" class="dropdown-item">Add a domain</router-link>
                    <router-link :to="{ name: 'AccessConsole', params: { id: vm.id }}" class="dropdown-item">Access console</router-link>
                    <div class="dropdown-divider"></div>
                    <router-link :to="{ name: 'DestroyMachine', params: { id: vm.id }}" class="dropdown-item destroy-dropdown">Destroy</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div v-else key="in-progress" class="dashboard-cell col-12 col-md-7 p-md-4">
              <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                :aria-valuenow="vm.deployProgress" aria-valuemin="0" aria-valuemax="100" :style="'width: ' + vm.deployProgress + '%'"></div>
              </div>
            </div>
          </transition>
        </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/API'
let copyActionInterval = 1000

export default {
  name: 'Machines',
  data () {
    return {
      loading: false,
      refreshTimer: null,
      machines: [],
      error: null,
      showCopyFor: null
    }
  },
  created () {
    this.fetchData()
    this.refreshTimer = setInterval(this.fetchData, 1000)
    this.showCopyFor = null
  },
  beforeDestroy () {
    this.cancelRefreshTimer()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    cancelRefreshTimer () {
      clearInterval(this.refreshTimer)
    },
    fetchData () {
      API.getDeployedMachines((err, machines) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.machines = machines
        }
      })
    },
    toggleCopyIP (vm) {
      console.log('Copying')
      this.showCopyFor = vm
      setTimeout(() => {
        this.showCopyFor = null
      }, copyActionInterval)
    }
  }
}
</script>

<style scoped>
.dashboard-header {
  border-top: 1px solid #dee2e6;
}
.dashboard-cell, .dashboard-header, .dashboard-row {
  margin: 0;
}
.dashboard-row {
  border-top: 1px solid #dee2e6;
}
.dashboard-cell {
  padding: 0.5rem;
  align-items: center;
  position: relative;
}

.distro-logo, .dashboard-distro-logo {
  width: 2.5em;
}
.machine-info, .dashboard-machine-info {
  cursor: pointer;
}
.machine-name, .dashboard-machine-name {
  color: #007bff;
}

.copy-action-enter {
  opacity: 0;
  transform: translateY(0px);
}
.copy-action-enter-active {
  transition: opacity .25s ease-in-out, transform .25s ease-in-out;
}
.copy-action-enter-to {
  transform: translateY(-20px);
  opacity: 1;
}
.copy-action-leave {
  transform: translateY(-20px);
  opacity: 1;
}
.copy-action-leave-active {
  transition: opacity .25s ease-in-out, transform .25s ease-in-out;
}
.copy-action-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
.copy-action-label {
  position: absolute;
  color: #007bff;
  font-size: 0.8em;
  right: -5em;
}
.copy-action-container {
  position: relative;
}
.copy-action-ip {
  cursor: pointer;
}

.deploy-action-enter-active, .deploy-action-leave-active {
  transition: all .3s ease;
}
.deploy-action-enter, .deploy-action-leave-to {
  opacity: 0;
}
.destroy-dropdown:hover {
  background-color: #dc3545;
  color: #fff;
}
.destroy-dropdown {
  color: #dc3545;
}

.progress-action-enter-active, .progress-action-leave-active {
  transition: all .3s ease;
}
.progress-action-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
.progress-action-enter {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
