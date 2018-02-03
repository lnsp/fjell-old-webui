<template>
  <div>
    <h3>Machine <span class="machine-name">{{ $route.params.vmName }}</span></h3>
  </div>
</template>

<script>
export default {
  name: 'MachineDetails',
  data () {
    return {
      msg: 'MachineDetails'
    }
  }
}
</script>

<style>
.machine-name {
  color: #007bff;
}
</style>