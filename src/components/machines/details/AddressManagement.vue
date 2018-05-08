<template>
  <div>
    <site-subheader>Networking</site-subheader>
    <hr />
    <div class="row" v-if="network">
      <div class="col-sm-4">
        <h5 class="network-label">IP Address</h5>
        <p>{{ network.ipv4.public.address }}</p>
      </div>
      <div class="col-sm-4">
        <h5 class="network-label">Gateway</h5>
        <p>{{ network.ipv4.public.gateway }}</p>
      </div>
      <div class="col-sm-4">
        <h5 class="network-label">Netmask</h5>
        <p>{{ network.ipv4.public.netmask }}</p>
      </div>
    </div>
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
      network: null,
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      API.getMachineNetwork((err, network) => {
        if (err != null) {
          console.log(err)
        } else {
          this.network = network
          console.log(network)
        }
      }, this.$route.params.id)
    }
  }
}
</script>
