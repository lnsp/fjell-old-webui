<template>
  <div>
    <h4>Destroy</h4>
    <hr>
    <p>
      Are you sure you want to do this? All data stored directly on the system will be lost and not recoverable. Please use with caution.
    </p>
    <button class="btn btn-outline-danger d-flex align-items-center" @click="destroyMachine()">
      <icon name="circle-o-notch" spin class="mr-2" :class="{ 'd-none': !active }" />
      Yes, I understand!
    </button>
  </div>
</template>

<script>
import API from '@/API'
export default {
  name: 'DestroyMachine',
  data () {
    return {
      active: false
    }
  },
  methods: {
    destroyMachine () {
      this.active = true
      API.toggleMachineDestroy((err) => {
        this.active = false
        if (err) {
          console.log(err)
        } else {
          this.$router.push({ name: 'Machines' })
        }
      }, this.$route.params.id)
    }
  }
}
</script>
