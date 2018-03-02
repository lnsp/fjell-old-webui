<template>
  <div>
    <h3 class="machine-header"><span class="text-muted">Machine</span> <span class="machine-name">{{ $route.params.vmName }}</span></h3>
    <div v-if="systemSpecs" class="text-muted machine-specs">
      {{ systemSpecs.memory }} MB RAM / {{ systemSpecs.storage }} GB Disk / {{ systemSpecs.systemName }}
    </div>
    <hr class="mb-4">
    <div class="row">
      <div class="col-sm-2 action-selector">
        <ul class="nav flex-row flex-sm-column" :class="{ 'nav-tabs mb-3': windowWidth < 600 }" >
          <li class="nav-item"><router-link class="nav-link" :to="{ name: 'UsageGraphs', params: { vmName: $route.params.vmName } }">Graphs</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :to="{ name: 'AccessConsole', params: { vmName: $route.params.vmName } }">Console</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :to="{ name: 'DestroyMachine', params: { vmName: $route.params.vmName } }">Destroy</router-link></li>
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
      systemSpecs: null,
      windowWidth: 0
    }
  },
  created () {
    this.windowWidth = window.innerWidth
    API.getMachineByName((err, specs) => {
      if (err) {
        console.log(err)
      } else {
        this.systemSpecs = specs
      }
    }, this.$route.params.vmName)
  },
  mounted () {
    let that = this
    this.$nextTick(() => {
      window.addEventListener('resize', e => { that.windowWidth = window.innerWidth })
    })
  }

}
</script>

<style>
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
</style>
