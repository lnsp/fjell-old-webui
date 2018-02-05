<template>
  <div>
    <site-header title="Add virtual machine" />
    <div class="add-vm">
      <h3 class="mb-3">Choose an image</h3>
      <hr />
      <transition name="fade" mode="out-in">
        <p v-if="systems === null" class="text-center lead">Fetching available distributions ...</p>
        <div v-else class="row align-content-stretch flex-wrap pl-2 pr-2">
          <div v-for="system in systems" :key="system.name" class="col-12 p-1 mb-2 col-sm-6 col-lg-4 col-xl-3">
            <div class="selection-card card os-card" @click="selectSystem(system)" :class="{ 'bg-primary': system.selected, 'text-white': system.selected }">
              <div class="card-header text-center">
                {{ system.name }}
              </div>
              <img class="card-img-top os-icon"
                :src="require('../../assets/distros/' + system.slug + (system.selected ? '' : '_offline') + '.svg')"
                :class="{ 'os-icon-selected': system.selected }">
              <div class="card-body">
                <div class="btn-group w-100 justify-content-center"  role="group">
                  <button v-for="(version, index) in system.versions" :key="version"
                    @click="selectSystemVersion(system, index)" class="btn col"
                    :class="{ 'border-white': system.selected, 'btn-secondary': !system.selected, 'btn-primary': system.selected, 'active': system.selectedVersion === index }">
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
        <div v-else class="row pl-2 pr-2 align-content-stretch flex-wrap">
          <div v-for="size in sizes" :key="size.memory+''+size.cpus+''+size.storage" class="col-12 p-1 mb-2 col-sm4 col-lg-4 col-xl-3">
            <div class="card selection-card" @click="selectSize(size)" :class="{ 'text-white': size.selected, 'bg-primary': size.selected }">
              <div class="card-body"><strong>{{ size.cpus }}</strong> <small>vCPUs</small>
              <hr /><strong>{{ size.memory }} GB</strong> <small>RAM</small>
              <hr /><strong>{{ size.storage }} GB</strong> <small>HDD</small></div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div>
      <h3 class="mb mt-3">Add block storage</h3>
      <hr />
      <transition name="fade" mode="out-in">
        <p key="if" v-if="blocks === null" class="text-center lead">Fetching block storage ...</p>
        <p key="elseif" v-else-if="blocks.length === 0" class="text-center lead">
          No block storage available.
        </p>
        <div v-else>
          <div class="row align-content-stretch flex-wrap pl-2 pr-2">
            <div v-for="block in blocks" :key="block.name" class="col-12 p-1 mb-2 col-sm-4 col-lg-3 col-xl-2">
              <div class="card selection-card" @click="selectStorage(block)" :class="{ 'text-white': block.selected, 'bg-primary': block.selected }">
                <div class="card-header text-center">
                  {{ block.name }}
                </div>
                <div class="card-body text-center">
                  <h3>{{ block.size }} <small>GB</small></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div>
      <h3 class="mb mt-3">Add an SSH key</h3>
      <hr />
      <transition name="fade" mode="out-in">
        <p key="if" v-if="keys === null" class="text-center lead">Fetching SSH keys ...</p>
        <p key="elseif" v-else-if="keys.length === 0" class="text-center lead">
          No keys available.
        </p>
        <div v-else>
          <div class="row align-content-stretch flex-wrap pl-2 pr-2">
            <div v-for="key in keys" :key="key.name" class="col-12 p-1 mb-2 col-sm-4 col-lg-3 col-xl-2">
              <div class="selection-card card" @click="selectKey(key)" :class="{ 'text-white': key.selected, 'bg-primary': key.selected }">
                <div class="card-body text-center">
                  <strong>{{ key.name }}</strong>
                  <small>{{ key.fingerprint }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="finalize-machine">
      <h3 class="mb mt-3">Create and finalize</h3>
      <hr />
      <div class="row mb-3">
        <div class="col-sm-4">
          <h5 class="mb-4">How many?</h5>
          <div class="input-group input-group-fixed">
            <div class="input-group-prepend">
              <button class="btn btn-lg btn-outline-primary" :class="{ 'btn-outline-secondary': hostnames.length <= 1 }" :disabled="hostnames.length <= 1" @click="removeInstance()">
                −
              </button>
            </div>
            <input type="text" class="form-control text-center" :value="hostnames.length" />
            <div class="input-group-append">
              <button class="btn btn-lg btn-outline-primary" @click="addInstance()">
                +
              </button>
            </div>
          </div>
        </div>
        <div class="col">
          <h5 class="mb-4">Choose a hostname</h5>
          <transition-group name="fade">
            <div v-for="hostname in hostnames" :key="hostname" class="row">
              <div class="input-group input-group-fixed mb-3">
                <input type="text" class="form-control" :value="hostname" />
              </div>
            </div>
          </transition-group>
        </div>
      </div>
      <button class="btn btn-primary btn-lg btn-block" @click="deployMachine()">
        Create
      </button>
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
      systems: null,
      blocks: null,
      keys: null,
      hostnames: ['my-virtual-machine']
    }
  },
  created () {
    this.fetchSizeOptions()
    this.fetchSystemOptions()
    this.fetchBlockStorage()
    this.fetchSSHKeys()
  },
  methods: {
    fetchSSHKeys () {
      this.keys = null
      API.getDeployedSSHKeys((err, keys) => {
        if (err) {
          this.error = err
        } else {
          this.keys = keys.map(key => {
            return {
              ID: key.ID,
              name: key.name,
              fingerprint: key.fingerprint,
              selected: false
            }
          })
        }
      })
    },
    fetchBlockStorage () {
      this.blocks = null
      API.getDeployedBlockStorage((err, blocks) => {
        if (err) {
          this.error = err
        } else {
          this.blocks = blocks.map(block => {
            return {
              ID: block.ID,
              name: block.name,
              size: block.size,
              selected: false
            }
          })
        }
      })
    },
    fetchSizeOptions () {
      this.sizes = null
      API.getMachineSizeOptions((err, sizes) => {
        if (err) {
          this.error = err
        } else {
          this.sizes = sizes.map(size => {
            return {
              ID: size.ID,
              cpus: size.cpus,
              memory: size.memory,
              storage: size.storage,
              selected: false
            }
          })
        }
      })
    },
    fetchSystemOptions () {
      this.systems = null
      API.getMachineSystemOptions((err, systems) => {
        if (err) {
          this.error = err
        } else {
          this.systems = systems.map(sys => {
            return {
              ID: sys.ID,
              name: sys.name,
              slug: sys.slug,
              versions: sys.versions,
              selected: false,
              selectedVersion: sys.defaultVersion
            }
          })
        }
      })
    },
    deployMachine () {
      var system, size
      var storage = []
      var keys = []
      this.systems.forEach(sys => {
        if (sys.selected) system = sys
      })
      this.sizes.forEach(sz => {
        if (sz.selected) size = sz
      })
      storage = this.blocks.filter(s => s.selected).map(s => s.ID)
      keys = this.keys.filter(k => keys).map(k => k.ID)
      API.deployMachine(system.ID, system.selectedVersion, size.ID, storage, keys, this.hostnames, (err) => {
        if (err) {
          console.log('Failed to create VM:', err)
        } else {
          this.router.push({ name: 'Dashboard' })
        }
      })
    },
    selectKey (key) {
      key.selected = !key.selected
    },
    removeInstance () {
      if (this.hostnames.length > 1) {
        this.hostnames.pop()
      }
    },
    addInstance () {
      this.hostnames.push(this.hostnames[0] + '' + this.hostnames.length)
    },
    selectSystem (sys) {
      this.systems.forEach(os => {
        if (os.name !== sys.name) {
          os.selected = false
        }
      })
      sys.selected = true
    },
    selectStorage (block) {
      block.selected = !block.selected
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
}
.fade-enter {
  opacity: 0;
}

.selection-card {
  cursor: pointer;
}

.finalize-machine {
  margin-bottom: 10rem;
}

.input-group-fixed {
  height: 60px;
}
</style>
