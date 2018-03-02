<template>
  <div>
    <site-subheader>Power control</site-subheader>
    <hr>
    <site-subsubheader>On / off</site-subsubheader>
    <p>
      This will power of your machine. We recommend powering off through the command line, as this action is the same as hard resetting the server and may cause data corruption.
    </p>
    <button class="btn btn-outline-warning d-flex align-items-center" @click="togglePower()">
      <icon name="circle-o-notch" spin class="mr-2" :class="{ 'd-none': !powerToggleActive }" />
      Power off
    </button>
    <hr>
    <site-subsubheader>Reboot cycle</site-subsubheader>
    <p>
      This will power of your machine, reset it and power it back on. We recommend rebooting through the command line, as this action is the same as hard resetting the server and may cause data corruption.
    </p>
    <button class="btn btn-outline-warning d-flex align-items-center" @click="toggleReboot">
      <icon name="circle-o-notch" spin class="mr-2" :class="{ 'd-none': !rebootActive }" />
      Reboot
    </button>
  </div>
</template>

<script>
import API from '@/API'
export default {
  name: 'PowerControl',
  data () {
    return {
      rebootActive: false,
      powerToggleActive: false
    }
  },
  methods: {
    toggleReboot () {
      this.rebootActive = true
      API.toggleMachineReboot(err => {
        this.rebootActive = false
        if (err) {
          console.log(err)
        } else {
        }
      }, this.$route.params.vmName)
    },
    togglePower () {
      this.powerToggleActive = true
      API.toggleMachinePower(err => {
        this.powerToggleActive = false
        if (err) {
          console.log(err)
        } else {
        }
      }, this.$route.params.vmName)
    }
  }
}
</script>
