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
              <hr /><strong>{{ size.memory }} MB</strong> <small>RAM</small>
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
          <h5>How many instances?</h5>
          <count-selector class="input-group-fixed mt-4"
            :value="instanceCount" @input="value => setInstanceCount(value)" :min="minInstances" :max="maxInstances" />
        </div>
        <div class="col">
          <h5>Choose your hostnames whisely!</h5>
          <transition-group name="fade">
            <div v-for="name in instanceNames" :key="name" class="row">
              <div class="input-group input-group-fixed m-3">
                <input type="text" class="form-control" :value="name" />
              </div>
            </div>
          </transition-group>
        </div>
      </div>
      <button class="btn btn-primary btn-lg btn-block" :disabled="instanceCount < 1" :class="{ 'btn-secondary': instanceCount < 1 }" @click="deployMachine()">
        Create
      </button>
    </div>
  </div>
</template>

<script>
import API from '@/API'
import CountSelector from '@/components/controls/CountSelector'
export default {
  name: 'AddMachine',
  components: {
    'count-selector': CountSelector
  },
  data () {
    return {
      sizes: null,
      systems: null,
      blocks: null,
      keys: null,
      instanceCount: 0,
      minInstances: 0,
      maxInstances: 0,
      instanceNames: [],
      selectedSize: null,
      selectedSystem: null
    }
  },
  created () {
    this.fetchOptions()
  },
  methods: {
    wrapAPICall (api, callback, args) {
      api.apply(null, [(err, obj) => {
        if (err) {
          console.log('Failed to reach API:', err)
        } else {
          callback(obj)
        }
      }].concat(args))
    },
    fetchOptions () {
      this.wrapAPICall(API.getMachineSystemOptions, systems => {
        this.systems = systems.map(system => Object.assign({ selected: false, selectedVersion: system.defaultVersion }, system))
        console.log(systems)
      }, [])
      this.wrapAPICall(API.getMachineSizeOptions, sizes => {
        this.sizes = sizes.map(size => Object.assign({ selected: false }, size))
      }, [])
      this.wrapAPICall(API.getDeployedBlockStorage, blocks => {
        this.blocks = blocks.map(block => Object.assign({ selected: false }, block))
      }, [])
      this.wrapAPICall(API.getDeployedSSHKeys, keys => {
        this.keys = keys.map(key => Object.assign({ selected: false }, key))
      }, [])
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
      API.deployMachine(system.ID, system.selectedVersion, size.ID, storage, keys, this.instanceNames, (err) => {
        if (err) {
          console.log('Failed to create VM:', err)
        } else {
          this.$router.push({ name: 'Dashboard' })
        }
      })
    },
    selectKey (key) {
      key.selected = !key.selected
    },
    selectSystem (sys) {
      this.systems.forEach(os => {
        if (os.name !== sys.name) {
          os.selected = false
        }
      })
      sys.selected = true

      this.selectedSystem = sys
      this.updateInstanceAllowance()
    },
    selectStorage (block) {
      block.selected = !block.selected
    },
    selectSize (size) {
      this.sizes.forEach(sz => {
        sz.selected = false
      })
      size.selected = true

      this.selectedSize = size
      this.updateInstanceAllowance()
    },
    selectSystemVersion (sys, index) {
      sys.selectedVersion = index
    },
    setInstanceCount (count) {
      this.instanceCount = count
      this.updateInstanceNames()
    },
    slugged (name) {
      return name.toLowerCase().replace(/[\s-]/g, '')
    },
    updateInstanceNames () {
      this.instanceNames = new Array(this.instanceCount)
      for (var i = 0; i < this.instanceCount && this.selectedSystem && this.selectedSize; i++) {
        this.instanceNames[i] = this.selectedSystem.slug + '-' + this.slugged(this.selectedSystem.versions[this.selectedSystem.selectedVersion]) + '-' + this.selectedSize.memory + 'mb-' + i
      }
    },
    updateInstanceAllowance () {
      this.wrapAPICall(API.getInstanceAllowanceOf, (allowance) => {
        this.maxInstances = allowance.max
        this.minInstances = allowance.min
        this.instanceCount = Math.min(this.maxInstances, Math.max(this.minInstances, this.instanceCount))
        this.updateInstanceNames()
      }, [])
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
  height: 50px;
}
</style>
