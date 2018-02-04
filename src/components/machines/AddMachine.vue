<template>
  <div>
    <site-header title="Add virtual machine" />
    <div>
      <h3 class="mb-3">Step 1: Choose an image</h3>
      <div class="card-deck">
        <div v-for="os in operatingSystems" :key="os.slug" class="card os-card" @click="selectOperatingSystem(os)" :class="{ 'border-primary': os.selected, 'border-secondary': !os.selected }">
          <img class="card-img-top os-icon"
            :src="require('../../assets/distros/' + os.slug + (os.selected ? '' : '_offline') + '.svg')"
            :class="{ 'os-icon-selected': os.selected }">
          <div class="card-body">
            <h4 class="card-title">{{ os.system }}</h4>
            <p class="text-muted">{{ os.description }}</p>
          </div>
          <div class="card-body">
            <div class="btn-group w-100">
              <button type="button" :class="{ 'btn-primary': os.selected, 'btn-secondary': !os.selected }" class="btn btn-lg btn-block dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ os.versions[os.selectedVersion] }}
              </button>
              <div class="dropdown-menu">
                <a v-for="(version, index) in os.versions" :key="version" @click="os.selectedVersion = index" class="dropdown-item">{{ version }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddMachine',
  data () {
    return {
      operatingSystems: [
        {
          system: 'Ubuntu',
          selected: false,
          selectedVersion: 1,
          slug: 'ubuntu',
          versions: [ '14.04 LTS', '16.04 LTS', '17.10' ],
          description: 'Ubuntu is a server operating system, developed by Canonical and open source programmers around the world.'
        },
        {
          system: 'Debian',
          selected: false,
          selectedVersion: 0,
          slug: 'debian',
          versions: [ '9 (Stretch)', '8 (Jessie)', '7 (Wheezy)' ],
          description: 'Debian is a Unix-like computer operating system that is composed entirely of free software.'
        }
      ],
    }
  },
  methods: {
    selectOperatingSystem (system) {
      this.operatingSystems.forEach(os => {
        os.selected = false
      })
      system.selected = true
    }
  }
}
</script>

<style>
.component-header {
  font-weight: 100;
}
.os-icon {
  padding: 20%;
  background-color: #6C757D;
}
.os-icon-selected {
  background-color: #007bff;
}
.os-card {
  transition: all 0.3s ease;
}
</style>
