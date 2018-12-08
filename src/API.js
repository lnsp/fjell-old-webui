import moment from 'moment'

let machineTiers = [
  { cpus: 1, memory: 1024, storage: 25, id: '051b245a-ebbb-4008-8df8-7713371f1b12' },
  { cpus: 1, memory: 2048, storage: 50, id: 'b8670386-6e18-48c0-a62d-d1cc19e076d5' },
  { cpus: 2, memory: 4096, storage: 80, id: 'ce193d7f-e64b-4c94-a2a2-ff838fa1dc51' },
  { cpus: 4, memory: 8192, storage: 160, id: '4660e24e-2aab-4bcc-8da0-8cfb4ef8ae9d' }
]

let machineSystems = [
  {
    name: 'Ubuntu',
    slug: 'ubuntu',
    versions: [ '14.04 LTS', '16.04 LTS', '17.10' ],
    defaultVersion: 1,
    id: '2546c328-af66-4599-be08-fa811ffd9074'
  },
  {
    name: 'Debian',
    slug: 'debian',
    versions: [ 'Stretch', 'Jessie', 'Wheezy' ],
    defaultVersion: 0,
    id: 'b9b6248e-5eb5-4990-a6b6-2cc1a864ab9c'
  },
  {
    name: 'Arch Linux',
    slug: 'archlinux',
    versions: [ '2018.01.01' ],
    defaultVersion: 0,
    id: '9b17ab55-358b-4944-a3b8-b56d2a022bec'
  },
  {
    name: 'FreeBSD',
    slug: 'freebsd',
    versions: ['10.3', '10.4', '11.1'],
    defaultVersion: 2,
    id: 'bd7db908-0b3d-4ae3-9ceb-2d5e6b58ac88'
  }
]

function fakeIPAddress () {
  var s = ''
  for (var i = 0; i < 4; i++) {
    s += Math.floor(Math.random() * 255 + 1) + '.'
  }
  return s.substring(0, s.length - 1)
}

var fakeKeys = [
  {
    name: 'Personal',
    fingerprint: '84BE79F2',
    id: '472ad1cd-b78a-48ce-9596-2e6c0c7b592e'
  },
  {
    name: 'Work',
    fingerprint: 'A62B982F',
    id: '066efe85-be6f-4c7b-a553-dbd0b69c9d10'
  }
]

var fakeVolumes = [
  {
    name: 'registry-storage',
    size: 140,
    id: '0f07f3f4-e583-4410-8a23-77700c616776'
  },
  {
    name: 'backups',
    size: 1200,
    id: 'c153c591-164f-4934-89d8-563a0518ee16'
  }
]

var fakeSnapshots = [
  {
    id: '10a61208-23cc-4820-be2f-43b14006ccff',
    size: 12345,
    createdAt: moment().format()
  },
  {
    id: 'd7829fde-823b-4bf6-a2e6-e9b7b36b4831',
    size: 20000,
    createdAt: moment().format()
  },
  {
    id: 'b464e258-c34e-47f2-8011-e6a861eb8ecd',
    size: 42000,
    createdAt: moment().format()
  }
]

let defaultLatencyVariance = 0
let defaultLatencyMin = 0

function delay (callback) {
  setTimeout(callback, defaultLatencyVariance * Math.random() + defaultLatencyMin)
}

var fakeMachines = []

function guid () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

function s4 () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

export default {
  // Request a domain deployment of the given configuration.
  deployMachine (systemID, systemVersionIndex, tierID, volumeIDs, keyIDs, names, callback) {
    names.forEach(name => {
      var selectedTier = null
      machineTiers.forEach(tier => {
        if (tier.id === tierID) selectedTier = tier
      })
      var selectedSystem = null
      machineSystems.forEach(system => {
        if (system.id === systemID) selectedSystem = system
      })
      var keys = fakeKeys.filter(k => keyIDs.includes(k.id))
      var volumes = fakeVolumes.filter(v => volumeIDs.includes(v.id))
      fakeMachines.push({
        name: name,
        memory: selectedTier.memory,
        cpus: selectedTier.cpus,
        id: guid(),
        keys: keys,
        volumes: volumes,
        snapshots: fakeSnapshots,
        storage: selectedTier.storage,
        osName: selectedSystem.name + ' ' + selectedSystem.versions[systemVersionIndex],
        osSlug: selectedSystem.slug,
        tags: [],
        address: fakeIPAddress(),
        deployProgress: 0,
        offline: true,
        createdAt: moment().format('ddd, DD MMM YYYY HH:mm:ss ZZ')
      })
    })
    callback(null)
  },
  // Get the user's allowance of a given machine tier.
  getConfigurationAllowance (callback, size) {
    delay(() => callback(null, { min: 1, max: 10 }))
  },
  // Get the available size options.
  getConfigurationOptionSize (callback) {
    delay(() => callback(null, machineTiers))
  },
  // Get the available operating system configuration options.
  getConfigurationOptionSystem (callback) {
    delay(() => callback(null, machineSystems))
  },
  // List all available block storage.
  getDeployedVolumes (callback) {
    delay(() => callback(null, fakeVolumes))
  },
  // List all available SSH keys.
  getDeployedSSHKeys (callback) {
    delay(() => callback(null, fakeKeys))
  },
  // List all available machines.
  getDeployedMachines (callback) {
    fakeMachines.forEach(element => {
      var offlineSwitch = false
      if (element.deployProgress < 100) {
        offlineSwitch = true
        element.deployProgress = Math.min(element.deployProgress + 20 + Math.random() * 20 + 1, 100)
      }
      if (offlineSwitch) element.offline = element.deployProgress < 100
    })
    delay(() => callback(null, fakeMachines.map(machine => {
      return {
        id: machine.id,
        name: machine.name,
        memory: machine.memory,
        cpus: machine.cpus,
        storage: machine.storage,
        osName: machine.osName,
        osSlug: machine.osSlug,
        tags: machine.tags,
        address: machine.address,
        deployProgress: machine.deployProgress,
        offline: machine.offline,
        createdAt: machine.createdAt
      }
    })))
  },
  // Get machine configuration information.
  getMachineByName (callback, name) {
    delay(() => callback(null, fakeMachines.filter(m => m.name === name)[0]))
  },
  getMachineByID (callback, id) {
    delay(() => callback(null, fakeMachines.filter(m => m.id === id)[0]))
  },
  getMachineStatsCPUUsage (callback, id) {
    var labels = Array.apply(null, { length: 100 }).map((value, index, _) => new Date(new Date().getTime() - (100 - index) * 60000))
    var values = Array.apply(null, { length: 100 }).map((value, index, _) => Math.random() * index)
    delay(() => callback(null, { labels: labels, data: values }))
  },
  getMachineAccessVNCUrl (callback, id) {
    delay(() => callback(null, 'javascript:alert("getMachineVNCSession")'))
  },
  getMachineNetwork (callback, id) {
    let machine = fakeMachines.filter(m => m.id === id)[0]
    delay(() => callback(null, {
      'ipv4': {
        'public': {
          'address': machine.address,
          'netmask': '255.255.240.0',
          'gateway': machine.address.replace(/\.[0-9]+$/g, '.1')
        },
        'private': null
      },
      'ipv6': null
    }))
  },
  getMachineKeysByID (callback, id) {
    let machine = fakeMachines.filter(m => m.id === id)[0]
    delay(() => callback(null, machine.keys))
  },
  getMachineVolumesByID (callback, id) {
    let machine = fakeMachines.filter(m => m.id === id)[0]
    delay(() => callback(null, machine.volumes))
  },
  getMachineSnapshotsByID (callback, id) {
    let machine = fakeMachines.filter(m => m.id === id)[0]
    delay(() => callback(null, machine.snapshots))
  },
  toggleMachineResize (callback, id, tier) {
    let vm = fakeMachines.find(vm => vm.id === id)
    setTimeout(() => { vm.offline = true }, Math.random() * 750 + 250)
    setTimeout(() => {
      vm.storage = tier.storage
      vm.memory = tier.memory
      vm.cpus = tier.cpus
    }, Math.random() * 2000 + 1500)
    setTimeout(() => { vm.offline = false }, 4000 + Math.random() * 1500)
    delay(() => callback(null))
  },
  toggleMachineReboot (callback, id) {
    let vm = fakeMachines.find(vm => vm.id === id)
    setTimeout(() => { vm.offline = true }, Math.random() * 750 + 250)
    setTimeout(() => { vm.offline = false }, Math.random() * 5000 + 15000)
    delay(() => callback(null))
  },
  toggleMachinePower (callback, id) {
    let vm = fakeMachines.find(vm => vm.id === id)
    setTimeout(() => { vm.offline = !vm.offline }, Math.random() * 750 + 250)
    setTimeout(() => callback(null), Math.random() * 750 + 250)
  },
  toggleMachineDestroy (callback, id) {
    fakeMachines = fakeMachines.filter(vm => vm.id !== id)
    delay(() => callback(null))
  },
  toggleSnapshotCreate (callback, vmID) {
    let vm = fakeMachines.find(vm => vm.id === vmID)
    vm.snapshots.push({
      id: guid(),
      size: vm.storage * 1000,
      createdAt: new Date()
    })
    delay(() => callback(null))
  },
  toggleSnapshotDelete (callback, vmID, snapshotID) {
    let vm = fakeMachines.find(vm => vm.id === vmID)
    vm.snapshots = vm.snapshots.filter(snap => snap.id !== snapshotID)
    delay(() => callback(null))
  },
  toggleSnapshotRestore (callback, vmID, snapshotID) {
    delay(() => callback(null))
  }
}
