<template>
  <div>
    <site-header title="Add virtual machine" />
    <div>
      <h3 class="mb-3">Choose an image</h3>
      <hr />
      <transition name="fade" mode="out-in">
        <p v-if="systems === null" class="text-center lead">Fetching available distributions ...</p>
        <div v-else class="row align-content-stretch flex-wrap pl-2 pr-2">
          <div v-for="system in systems" :key="system.name" class="col-12 p-1 mb-2 col-sm-6 col-lg-4 col-xl-3">
            <div class="card os-card" @click="selectSystem(system)" :class="{ 'border-primary': system.selected, 'border-secondary': !system.selected }">
              <div class="card-header text-center">
                {{ system.name }}
              </div>
              <img class="card-img-top os-icon"
                :src="require('../../assets/distros/' + system.slug + (system.selected ? '' : '_offline') + '.svg')"
                :class="{ 'os-icon-selected': system.selected }">
              <div class="card-body">
                <div class="btn-group w-100 justify-content-center" role="group">
                  <button v-for="(version, index) in system.versions" :key="version"
                    @click="selectSystemVersion(system, index)" class="btn col"
                    :class="{ 'btn-secondary': !system.selected, 'btn-primary': system.selected, 'active': system.selectedVersion === index }">
                    {{ version }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div>
      <h3 class="mb-3 mt-3">Choose a size</h3>
      <hr />
      <transition name="fade" mode="out-in">
        <p v-if="sizes === null" class="text-center lead">Fetching available machine sizes ...</p>
        <div v-else>
          <div v-for="size in sizes" :key="size.memory+''+size.cpus+''+size.storage" @click="selectSize(size)" class="row size-table-row" :class="{ 'size-table-row-active': size.selected }">
            <div class="col-4 size-table-cell"><strong>{{ size.cpus }}</strong> <span class="text-muted">vCPUs</span></div>
            <div class="col-4 size-table-cell"><strong>{{ size.memory }} GB</strong> <span class="text-muted">RAM</span></div>
            <div class="col-4 size-table-cell"><strong>{{ size.storage }} GB</strong> <span class="text-muted">HDD</span></div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import API from '@/API'
export default {
  name: 'AddMachine',
  data () {
    return {
      sizes: null,
      systems: null
    }
  },
  created () {
    this.fetchSizeOptions()
    this.fetchSystemOptions()
  },
  methods: {
    fetchSizeOptions () {
      this.sizes = null
      API.getMachineSizeOptions((err, sizes) => {
        if (err) {
          this.error = err
        } else {
          this.sizes = sizes.map(size => { return {
            cpus: size.cpus,
            memory: size.memory,
            storage: size.storage,
            selected: false
          }})
        }
      })
    },
    fetchSystemOptions () {
      this.systems = null
      API.getMachineSystemOptions((err, systems) => {
        if (err) {
          this.error = err
        } else {
          this.systems = systems.map(sys => { return {
            name: sys.name,
            slug: sys.slug,
            versions: sys.versions,
            selected: false,
            selectedVersion: sys.defaultVersion
          }})
        }
      })
    },
    selectSystem (sys) {
      this.systems.forEach(os => {
        if (os.name !== sys.name) {
          os.selected = false
        } else {
          os.selected = true
        }
      })
    },
    selectSize (size) {
      this.sizes.forEach(sz => {
        sz.selected = false
      })
      size.selected = true
      console.log('selected size')
    },
    selectSystemVersion (sys, index) {
      sys.selectedVersion = index
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

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.size-table-header {
  border-top: 1px solid #dee2e6;
}
.size-table-cell, .size-table-header, .size-table-row {
  margin: 0;
}
.size-table-row {
  border: 1px solid #dee2e6;
  border-radius: 10px;
  margin-bottom: 0.4rem;
  cursor: pointer;
}
.size-table-row:hover {
  background-color: #dfefff;
}
.size-table-row-active {
  border: 1px solid #007bff;
  background-color: #dfefff;
}

.size-table-cell {
  padding: 1rem;
  align-items: center;
  position: relative;
}
</style>
