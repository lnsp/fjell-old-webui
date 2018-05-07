<template>
  <div class="mt-4">
    <div v-if="vm">
      <h3 class="machine-header"><span class="text-muted">Machine</span> <span class="machine-name">{{ vm.name }}</span></h3>
      <div class="text-muted machine-specs">
        {{ vm.memory }} MB RAM / {{ vm.storage }} GB Disk / {{ vm.osName }}
      </div>
    </div>
    <hr class="mb-4">
    <div class="row">
      <div class="col-sm-2 action-selector">
        <ul class="nav flex-row flex-sm-column" :class="{ 'nav-tabs mb-3': windowWidth < 600 }" >
          <li class="nav-item"><router-link class="nav-link" :to="{ name: 'UsageGraphs', params: { id: $route.params.id } }">Graphs</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :to="{ name: 'AccessConsole', params: { id: $route.params.id } }">Console</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :to="{ name: 'PowerControl', params: { id: $route.params.id } }">Power</router-link></li>
          <li class="nav-item"><a class="nav-link" href="#">Volumes</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Resize</a></li>
          <li class="nav-item"><router-link class="nav-link" :to="{ name: 'AddressManagement', params: { id: $route.params.id } }">Networking</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :to="{ name: 'Snapshots', params: { id: $route.params.id } }">Snapshots</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :to="{ name: 'DestroyMachine', params: { id: $route.params.id } }">Destroy</router-link></li>
        </ul>
      </div>
      <div class="col-sm-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/API'

export default {
  name: 'MachineDetails',
  data () {
    return {
      vm: null,
      windowWidth: 0
    }
  },
  created () {
    this.windowWidth = window.innerWidth
    API.getMachineByID((err, specs) => {
      if (err) {
        console.log(err)
      } else {
        this.vm = specs
      }
    }, this.$route.params.id)
  },
  mounted () {
    let that = this
    this.$nextTick(() => {
      window.addEventListener('resize', e => { that.windowWidth = window.innerWidth })
    })
  }
}
</script>

<style scoped>
.machine-name {
  color: #007bff;
}
.action-selector .nav-link {
  color: #999999;
}
.action-selector .nav-link:focus {
  outline: none !important;
}
.action-selector .nav-link:hover {
  color: #777777;
}
.action-selector .nav-link.active {
  color: #007bff;
}
@media (max-width: 600px) {
  .machine-header {
    font-size: 20px;
  }
}
p {
  color: #6c757d;
}
</style>
