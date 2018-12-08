<template>
  <div>
    <site-subheader>Power control</site-subheader>
    <hr>
    <div v-if="!validState" class="text-center"><icon name="circle-o-notch" spin /></div>
    <div v-else>
      <site-subsubheader>Power <span v-if="isOffline">On</span><span v-else>Off</span></site-subsubheader>
      <p v-if="isOffline">
        This will power on your machine.
      </p>
      <p v-else>
        This will power off your machine. We recommend powering off through the command line, as this action is the same as hard resetting the server and may cause data corruption.
      </p>
      <button class="btn btn-outline-secondary d-flex align-items-center" @click="togglePower()">
        <icon name="circle-o-notch" spin class="mr-2" :class="{ 'd-none': !powerToggleActive }" />
        Power<span v-if="isOffline">on</span><span v-else>off</span>
      </button>

      <div v-if="!isOffline">
        <hr>
        <site-subsubheader>Reboot cycle</site-subsubheader>
        <p>
          This will power of your machine, reset it and power it back on. We recommend rebooting through the command line, as this action is the same as hard resetting the server and may cause data corruption.
        </p>
        <button class="btn btn-outline-secondary d-flex align-items-center" @click="toggleReboot">
          <icon name="circle-o-notch" spin class="mr-2" :class="{ 'd-none': !rebootActive }" />
          Reboot
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/API'
export default {
  name: 'PowerControl',
  data () {
    return {
      validState: false,
      isOffline: false,
      rebootActive: false,
      powerToggleActive: false
    }
  },
  created () {
    this.updateState()
  },
  methods: {
    updateState () {
      API.getMachineByID((err, machine) => {
        if (err) {
          console.log(err)
        } else {
          this.validState = true
          this.isOffline = machine.offline
        }
      }, this.$route.params.id)
    },
    toggleReboot () {
      this.rebootActive = true
      API.toggleMachineReboot(err => {
        this.rebootActive = false
        if (err) {
          console.log(err)
        } else {
          this.updateState()
        }
      }, this.$route.params.id)
    },
    togglePower () {
      this.powerToggleActive = true
      API.toggleMachinePower(err => {
        this.powerToggleActive = false
        if (err) {
          console.log(err)
        } else {
          this.updateState()
        }
      }, this.$route.params.id)
    }
  }
}
</script>
