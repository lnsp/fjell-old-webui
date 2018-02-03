<template>
  <div>
    <h3>Dashboard</h3>
    <div class="loading" v-if="loading">
      Loading ...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <table v-if="machines" class="table">
      <thead>
        <tr>
          <td>Name</td>
          <td>IP Address</td>
          <td>Created</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vm in machines" :key="vm.ipAddress">
          <td class="align-middle machine-info" v-on:click="$router.push({ name: 'MachineDetails', params: { vmName: vm.name }})">
            <div class="row d-flex align-items-center">
            <div class="col-2">
              <img :src="require('../assets/distros/' + vm.systemName + '.svg')" class="distro-logo">
            </div>
            <div class="col">
              <div class="row">
                <strong class="machine-name">{{ vm.name }}</strong>
              </div>
              <div class="row">
                <span class="text-muted">
                  <small>{{ vm.memory }} GB RAM / {{ vm.storage }} GB Disk / {{ vm.system }}</small>
                </span>
              </div>
            </div>
            </div>
          </td>
          <template v-if="vm.deployProgress === 100">
            <td class="align-middle">
              <div class="copy-action-container">
                <span class="copy-action-ip" v-clipboard:copy="vm.ipAddress" v-on:click="toggleCopyIP(vm)">{{ vm.ipAddress }}</span>
                <transition name="copy-action">
                  <span class="copy-action-label" v-if="vm.showCopyState">Copied!</span>
                </transition>
              </div>
            </td>
            <td class="align-middle">
              {{ vm.createdAt | moment("from", true) }} ago
            </td>
            <td class="align-middle">
              <div class="btn-group">
                <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  More
                </button>
                <div class="dropdown-menu">
                  <router-link :to="{ name: 'AddDomain', params: { ipAddress: vm.ipAddress }}" class="dropdown-item">Add a domain</router-link>
                  <router-link :to="{ name: 'AccessConsole', params: { vmName: vm.name }}" class="dropdown-item">Access console</router-link>
                  <div class="dropdown-divider"></div>
                  <router-link :to="{ name: 'DestroyMachine', params: { vmName: vm.name }}" class="dropdown-item text-danger">Destroy</router-link>
                </div>
              </div>
            </td>
          </template>
          <template v-else>
            <td class="align-middle" colspan="2">
              <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                :aria-valuenow="vm.deployProgress" aria-valuemin="0" aria-valuemax="100" :style="'width: ' + vm.deployProgress + '%'"></div>
              </div>
            </td>
            <td></td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import API from '@/API'
let copyActionInterval = 1000

export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Dashboard',
      loading: false,
      refreshTimer: null,
      machines: null,
      error: null
    }
  },
  created () {
    this.fetchData()
    this.refreshTimer = setInterval(this.fetchData, 1000)
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
      this.error = this.post = null
      this.loading = true
      API.fetchMachines((err, machines) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.machines = machines
        }
      })
    },
    toggleCopyIP (vm) {
      console.log('Show "Copied" for', vm.ipAddress)
      vm.showCopyState = true
      setTimeout(() => {
        console.log('Hide "Copied" for ', vm.ipAddress)
        vm.showCopyState = false
      }, copyActionInterval)
    }
  }
}
</script>

<style>
.distro-logo {
  width: 2.5em;
}
.machine-info {
  cursor: pointer;
}
.machine-name {
  color: #007bff;
}

.copy-action-enter {
  opacity: 0;
  transform: translateY(20px);
}
.copy-action-enter-active {
  transition: opacity .25s ease-in-out, transform .25s ease-in-out;
}
.copy-action-enter-to {
  transform: translateY(0px);
  opacity: 1;
}
.copy-action-leave {
  transform: translateY(0px);
  opacity: 1;
}
.copy-action-leave-active {
  transition: opacity .25s ease-in-out, transform .25s ease-in-out;
}
.copy-action-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.copy-action-label {
  position: absolute;
  right: 1em;
  color: #007bff;
  font-size: 0.8em;
}
.copy-action-container {
  position: relative;
}
.copy-action-ip {
  cursor: pointer;
}
</style>
