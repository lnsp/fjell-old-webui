<template>
  <div class="hello">
    <h1>Machine <span class="text-muted">{{ $route.params.vmName }}</span></h1>
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
