<template>
  <div>
    <site-subheader>Networking</site-subheader>
    <hr />
    <site-subsubheader>Public IPv4 Network</site-subsubheader>
    <p v-if="vm">Your IP Address is {{ vm.address }}.</p>
    <!--
    <site-subsubheader>Public IPv6 Network</site-subsubheader>
    <p class="text-muted">Disabled.</p>
    <site-subsubheader>Private Network</site-subsubheader>
    <p class="text-muted">Disabled.</p>
    !-->
  </div>
</template>

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
