<template>
  <div>
    <site-subheader>Snapshots</site-subheader>
    <hr />
    <site-subsubheader>Build</site-subsubheader>
    <p>
      By using snapshots, you can easily restore your virtual machine into a previous safe-state.
      To create a snapshot, the machine has to be turned off.
    </p>
    <button @click="buildSnapshot()" class="btn btn-outline-primary">
      <icon name="circle-o-notch" spin class="mr-2" :class="{ 'd-none': !buildActive }" />
      Build snapshot
    </button>
    <hr />
    <site-subsubheader>Manage</site-subsubheader>
    <div class="snapshot-table">
      <div class="snapshot-header row">
        <div class="snapshot-cell col-4">Created at</div>
        <div class="snapshot-cell col-4">Size</div>
        <div class="snapshot-cell col-4"></div>
      </div>
      <div class="snapshot-row row" v-for="snap in snapshots" :key="snap.ID">
        <div class="snapshot-cell col-4"> {{ snap.createdAt | moment("calendar") }}</div>
        <div class="snapshot-cell col-4"> {{ snap.size }} MB </div>
        <div class="snapshot-cell col-4">
          <a @click="restoreFromSnapshot(snap)" class="btn btn-link text-primary">Restore</a>
          <a @click="deleteSnapshot(snap)" class="btn btn-link text-danger">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/API'
export default {
  name: 'Snapshots',
  data () {
    return {
      snapshots: [],
      buildActive: false
    }
  },
  created () {
    this.fetchSnapshots()
  },
  methods: {
    buildSnapshot () {
      this.buildActive = true
      API.toggleSnapshotCreate((err) => {
        this.buildActive = false
        if (err) {
          console.log(err)
        } else {
          this.fetchSnapshots()
        }
      }, this.$route.params.vmName)
    },
    restoreFromSnapshot (snap) {
      API.toggleSnapshotRestore((err) => {
        if (err) {
          console.log(err)
        } else {
          // TODO: Show confirmation
          alert('Successfully restored from snapshot!')
        }
      }, this.$route.params.vmName, snap.ID)
    },
    deleteSnapshot (snap) {
      API.toggleSnapshotDelete((err) => {
        if (err) {
          console.log(err)
        } else {
          this.fetchSnapshots()
        }
      }, this.$route.params.vmName, snap.ID)
    },
    fetchSnapshots () {
      API.getMachineByName((err, machine) => {
        if (err) {
          console.log(err)
        } else {
          this.snapshots = machine.snapshots.sort((a, b) => b.createdAt - a.createdAt)
        }
      }, this.$route.params.vmName)
    }
  }
}
</script>

<style>
.snapshot-cell, .snapshot-header, .snapshot-row {
  margin: 0;
}
.snapshot-row {
  border-top: 1px solid #dee2e6;
}
.snapshot-cell {
  padding: 0.5rem;
  align-items: center;
  position: relative;
}
</style>
