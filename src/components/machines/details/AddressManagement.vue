<template>
  <div>
    <site-subheader>Networking</site-subheader>
    <hr />
    <div class="row">
      <div class="col-sm-4">
        <h5 class="network-label">IP Address</h5>
        <p v-if="vm">{{ vm.address }}</p>
      </div>
      <div class="col-sm-4">
        <h5 class="network-label">Gateway</h5>
        <p v-if="vm">225.67.4.1</p>
      </div>
      <div class="col-sm-4">
        <h5 class="network-label">Netmask</h5>
        <p v-if="vm">255.255.240.0</p>
      </div>
    </div>
    <!--Net
    <site-subsubheader>Public IPv6 Network</site-subsubheader>
    <p class="text-muted">Disabled.</p>
    <site-subsubheader>Private Network</site-subsubheader>
    <p class="text-muted">Disabled.</p>
    !-->
  </div>
</template>

<style scoped>
.network-label {
  color: #787878;
  font-size: 0.8em;
  text-transform: uppercase;
}
</style>

<script>
import API from '@/API'

export default {
  name: 'AddressManagement',
  data () {
    return {
      vm: null
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      API.getMachineByID((err, machine) => {
        if (err != null) {
          console.log(err)
        } else {
          this.vm = machine
        }
      }, this.$route.params.id)
    }
  }
}
</script>
