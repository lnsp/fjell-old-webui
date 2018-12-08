<template>
  <div>
    <site-subheader>Resize machine</site-subheader>
    <card-selector highlightColor="secondary" :items="sizes" @input="size => { selected = size; updateInstanceAllowance() }">
      <div slot-scope="props">
        <div class="card-body">
          <strong>{{ props.item.cpus }}</strong> <small>vCPUs</small>
          <hr /><strong>{{ props.item.memory }} MB</strong> <small>RAM</small>
          <hr /><strong>{{ props.item.storage }} GB</strong> <small>HDD</small>
        </div>
      </div>
    </card-selector>
    <button class="btn btn-outline-secondary" :disabled="selected === null">Apply changes</button>
    <p class="text-muted mt-3">Careful! The machine will be rebooted during this process.</p>
  </div>
</template>
<script>
import API from '@/API'
import CardSelector from '@/components/controls/CardSelector'
export default {
  name: 'ResizeMachine',
  data () {
    return {
      selected: null,
      sizes: []
    }
  },
  methods: {
    updateInstanceAllowance () {
      API.toggleMachineResize(() => {}, this.$route.params.id, this.selected)
    }
  },
  components: {
    'card-selector': CardSelector
  },
  created () {
    API.getConfigurationOptionSize((_, sizes) => {
      API.getMachineByID((_, machine) => {
        this.sizes = sizes.filter(tier => tier.storage > machine.storage)
      }, this.$route.params.id)
    })
  }
}
</script>
<style scoped>
</style>
