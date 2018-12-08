<template>
  <div>
    <site-subheader>Console</site-subheader>
    <hr />
    <site-subsubheader>Access via VNC</site-subsubheader>
    <p>
      If the host machine supports it, you can access your machine via <code>noVNC</code>.
    </p>
    <a :href="vncURL" class="btn btn-outline-secondary" :class="{ 'disabled': !vncURL }" target="_blank">Access via VNC</a>
    <hr />
    <site-subsubheader>Access via SSH</site-subsubheader>
    <p>
      You should be able to access the machine using the following SSH keys.
    </p>
    <ul>
      <li v-for="key in sshKeys" :key="key.ID" class="text-muted"><strong>{{ key.name }}</strong> <code>{{ key.fingerprint }}</code></li>
    </ul>
  </div>
</template>

<script>
import API from '@/API'
export default {
  name: 'AccessConsole',
  data () {
    return {
      vncURL: null,
      sshKeys: []
    }
  },
  created () {
    this.updateVNCURL()
    this.updateSSHKeys()
  },
  methods: {
    updateSSHKeys () {
      API.getMachineKeysByID((err, keys) => {
        if (err) {
          console.log(err)
        } else {
          this.sshKeys = keys
        }
      }, this.$route.params.id)
    },
    updateVNCURL () {
      API.getMachineAccessVNCUrl((err, url) => {
        if (err) {
          console.log(err)
        } else {
          this.vncURL = url
        }
      }, this.$route.params.id)
    }
  }
}
</script>
