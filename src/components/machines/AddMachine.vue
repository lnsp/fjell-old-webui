<template>
  <div>
    <site-header>Add a virtual machine</site-header>
    <div class="add-vm">
      <site-subheader>Choose an image</site-subheader>
      <hr />
      <transition name="fade" mode="out-in">
        <p v-if="systems === null" class="text-center text-muted"><icon name="circle-o-notch" spin /></p>
        <div v-else>
          <card-selector :items="systems" @input="system => { selected.system = system; updateInstanceAllowance() }">
            <div slot-scope="props">
              <div class="card-header text-center">{{ props.item.name }}</div>
              <img class="card-img-top os-icon"
                :src="require('../../assets/distros/' + props.item.slug + (props.has(props.item) ? '' : '_offline') + '.svg')" height="150px">
              <div class="card-body">
                <div class="btn-group w-100 justify-content-center"  role="group">
                  <button v-for="(version, index) in props.item.versions" :key="version"
                    @click="() => props.item.version = index" class="btn col"
                    :class="{ 'border-white': props.has(props.item), 'btn-secondary': !props.has(props.item), 'btn-primary': props.has(props.item), 'active': props.item.version === index }">
                    {{ version }}
                  </button>
                </div>
              </div>
            </div>
          </card-selector>
        </div>
      </transition>
    </div>
    <div>
      <site-subheader>Choose a size</site-subheader>
      <hr />
      <transition name="fade" mode="out-in">
        <p v-if="sizes === null" class="text-center"><icon name="circle-o-notch" spin /></p>
        <div v-else>
          <card-selector :items="sizes" @input="size => { selected.size = size; updateInstanceAllowance() }">
            <div slot-scope="props">
              <div class="card-body"><strong>{{ props.item.cpus }}</strong> <small>vCPUs</small>
              <hr /><strong>{{ props.item.memory }} MB</strong> <small>RAM</small>
              <hr /><strong>{{ props.item.storage }} GB</strong> <small>HDD</small></div>
            </div>
          </card-selector>
        </div>
      </transition>
    </div>
    <div>
      <site-subheader>Add block storage</site-subheader>
      <hr />
      <transition name="fade" mode="out-in">
        <p key="if" v-if="blocks === null" class="text-center"><icon name="circle-o-notch" spin></icon></p>
        <p key="elseif" v-else-if="blocks.length === 0" class="text-center lead">
          No block storage available.
        </p>
        <div v-else>
          <card-selector :items="blocks" mode="toggle" size="small" @input="blocks => selected.blocks = blocks">
            <div slot-scope="props">
              <div class="card-header text-center">
                {{ props.item.name }}
              </div>
              <div class="card-body text-center">
                <h3>{{ props.item.size }} <small>GB</small></h3>
              </div>
            </div>
          </card-selector>
        </div>
      </transition>
    </div>
    <div>
      <site-subheader>Add an SSH key</site-subheader>
      <hr />
      <transition name="fade" mode="out-in">
        <p key="if" v-if="keys === null" class="text-center lead"><icon name="circle-o-notch" spin /></p>
        <p key="elseif" v-else-if="keys.length === 0" class="text-center lead">
          No keys available.
        </p>
        <div v-else>
          <card-selector :items="keys" mode="toggle" size="small" @input="keys => selected.keys = keys">
            <div class="card-body text-center" slot-scope="props" >
              <strong>{{ props.item.name }}</strong>
              <small>{{ props.item.fingerprint }}</small>
            </div>
          </card-selector>
        </div>
      </transition>
    </div>
    <div class="finalize-machine">
      <site-subheader>Create and finalize</site-subheader>
      <hr />
      <div class="row mb-3">
        <div class="col-sm-4">
          <h5>How many instances?</h5>
          <count-selector class="input-group-fixed mt-4"
            :value="instanceCount" @input="count => setInstanceCount(count)" :min="minInstances" :max="maxInstances" />
        </div>
        <div class="col">
          <h5>Choose your hostnames whisely!</h5>
          <transition-group name="fade">
            <div v-for="(name, index) in instanceNames" :key="index" class="row">
              <div class="input-group input-group-fixed m-3">
                <input type="text" class="form-control" v-model="instanceNames[index]"/>
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
import CardSelector from '@/components/controls/CardSelector'
export default {
  name: 'AddMachine',
  components: {
    'count-selector': CountSelector,
    'card-selector': CardSelector
  },
  data () {
    return {
      sizes: null,
      systems: null,
      blocks: null,
      keys: null,
      selected: {
        size: null,
        system: null,
        blocks: [],
        keys: []
      },
      instanceCount: 0,
      minInstances: 0,
      maxInstances: 0,
      instanceNames: []
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
        this.systems = systems.map(system => Object.assign({ version: system.defaultVersion }, system))
      }, [])
      this.wrapAPICall(API.getMachineSizeOptions, sizes => {
        this.sizes = sizes
      }, [])
      this.wrapAPICall(API.getDeployedBlockStorage, blocks => {
        this.blocks = blocks
      }, [])
      this.wrapAPICall(API.getDeployedSSHKeys, keys => {
        this.keys = keys
      }, [])
    },
    deployMachine () {
      API.deployMachine(this.selected.system.ID, this.selected.system.version, this.selected.size.ID, this.selected.storage, this.selected.keys, this.instanceNames, (err) => {
        if (err) {
          console.log('Failed to create VM:', err)
        } else {
          this.$router.push({ name: 'Dashboard' })
        }
      })
    },
    setInstanceCount (count) {
      this.instanceCount = count
      this.updateInstanceNames()
    },
    slugged (name) {
      return name.toLowerCase().replace(/[\s-]/g, '')
    },
    updateInstanceNames () {
      this.instanceNames = []
      for (var i = 0; i < this.instanceCount && this.selected.system && this.selected.size; i++) {
        let systemSlug = this.selected.system.slug
        let systemVersionSlug = this.slugged(this.selected.system.versions[this.selected.system.version])
        this.instanceNames.push(systemSlug + '-' + systemVersionSlug + '-' + this.selected.size.memory + 'mb-' + i)
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
  padding: 10%;
  background-color: #6C757D;
}

@media (max-width: 600px) {
  .os-icon {
    padding: 0%;
  }
}
.active .os-icon {
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

.finalize-machine {
  margin-bottom: 10rem;
}
.input-group-fixed {
  height: 50px;
}
</style>
