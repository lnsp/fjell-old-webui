let machineTiers = [
  { cpus: 1, memory: 1024, storage: 25, ID: '051b245a-ebbb-4008-8df8-7713371f1b12' },
  { cpus: 1, memory: 2048, storage: 50, ID: 'b8670386-6e18-48c0-a62d-d1cc19e076d5' },
  { cpus: 2, memory: 4096, storage: 80, ID: 'ce193d7f-e64b-4c94-a2a2-ff838fa1dc51' },
  { cpus: 4, memory: 8192, storage: 160, ID: '4660e24e-2aab-4bcc-8da0-8cfb4ef8ae9d' }
  /*
  { cpus: 6, memory: 16, storage: 320 },
  { cpus: 8, memory: 32, storage: 640 },
  { cpus: 12, memory: 48, storage: 960 },
  { cpus: 16, memory: 64, storage: 1280 },
  { cpus: 20, memory: 96, storage: 1920 },
  { cpus: 24, memory: 128, storage: 2560 },
  { cpus: 32, memory: 92, storage: 3840 }
  */
]

let machineSystems = [
  {
    name: 'Ubuntu',
    slug: 'ubuntu',
    versions: [ '14.04 LTS', '16.04 LTS', '17.10' ],
    defaultVersion: 1,
    ID: '2546c328-af66-4599-be08-fa811ffd9074'
  },
  {
    name: 'Debian',
    slug: 'debian',
    versions: [ 'Stretch', 'Jessie', 'Wheezy' ],
    defaultVersion: 0,
    ID: 'b9b6248e-5eb5-4990-a6b6-2cc1a864ab9c'
  },
  {
    name: 'Arch Linux',
    slug: 'archlinux',
    versions: [ '2018.01.01' ],
    defaultVersion: 0,
    ID: '9b17ab55-358b-4944-a3b8-b56d2a022bec'
  },
  {
    name: 'FreeBSD',
    slug: 'freebsd',
    versions: ['10.3', '10.4', '11.1'],
    defaultVersion: 2,
    ID: 'bd7db908-0b3d-4ae3-9ceb-2d5e6b58ac88'
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
    ID: '472ad1cd-b78a-48ce-9596-2e6c0c7b592e'
  },
  {
    name: 'Work',
    fingerprint: 'A62B982F',
    ID: '066efe85-be6f-4c7b-a553-dbd0b69c9d10'
  }
]

var fakeStorage = [
  {
    name: 'registry-storage',
    size: 140,
    ID: '0f07f3f4-e583-4410-8a23-77700c616776'
  },
  {
    name: 'backups',
    size: 1200,
    ID: 'c153c591-164f-4934-89d8-563a0518ee16'
  }
]

var fakeSnapshots = [
  {
    ID: '10a61208-23cc-4820-be2f-43b14006ccff',
    size: 12345,
    createdAt: new Date(1974, 6)
  },
  {
    ID: 'd7829fde-823b-4bf6-a2e6-e9b7b36b4831',
    size: 20000,
    createdAt: new Date(1980, 1)
  },
  {
    ID: 'b464e258-c34e-47f2-8011-e6a861eb8ecd',
    size: 42000,
    createdAt: new Date(2016, 2)
  }
]

let defaultLatencyVariance = 0
let defaultLatencyMin = 750

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
  deployMachine (systemID, systemVersion, tierID, blocks, keys, names, callback) {
    names.forEach(name => {
      var selectedTier = null
      machineTiers.forEach(tier => {
        if (tier.ID === tierID) selectedTier = tier
      })
      var selectedSystem = null
      machineSystems.forEach(system => {
        if (system.ID === systemID) selectedSystem = system
      })
      fakeMachines.push({
        name: name,
        memory: selectedTier.memory,
        cpus: selectedTier.cpus,
        keys: keys,
        blocks: blocks,
        snapshots: fakeSnapshots,
        storage: selectedTier.storage,
        systemName: selectedSystem.name + ' ' + selectedSystem.versions[systemVersion],
        systemSlug: selectedSystem.slug,
        tags: [],
        ipAddress: fakeIPAddress(),
        deployProgress: 0,
        offline: true,
        createdAt: new Date().toUTCString(),
        ID: guid()
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
  getDeployedBlockStorage (callback) {
    delay(() => callback(null, fakeStorage))
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
        element.deployProgress = Math.min(element.deployProgress + Math.random() * 10 + 1, 100)
      }
      if (offlineSwitch) element.offline = element.deployProgress < 100
    })
    delay(() => callback(null, fakeMachines))
  },
  // Get machine configuration information.
  getMachineByName (callback, name) {
    delay(() => callback(null, fakeMachines.filter(m => m.name === name)[0]))
  },
  getMachineByID (callback, id) {
    delay(() => callback(null, fakeMachines.filter(m => m.ID === id)[0]))
  },
  getMachineStatsCPUUsage (callback, name) {
    var labels = Array.apply(null, { length: 100 }).map((value, index, _) => new Date(new Date().getTime() - (100 - index) * 60000))
    var values = Array.apply(null, { length: 100 }).map((value, index, _) => Math.random() * index)
    delay(() => callback(null, { labels: labels, data: values }))
  },
  getMachineAccessVNCUrl (callback, name) {
    delay(() => callback(null, 'javascript:alert("getMachineVNCSession")'))
  },
  toggleMachineReboot (callback, name) {
    let vm = fakeMachines.find(vm => vm.name === name)
    setTimeout(() => { vm.offline = true }, Math.random() * 750 + 250)
    setTimeout(() => { vm.offline = false }, Math.random() * 5000 + 15000)
    setTimeout(() => callback(null), Math.random() * 750 + 250)
  },
  toggleMachinePower (callback, name) {
    let vm = fakeMachines.find(vm => vm.name === name)
    setTimeout(() => { vm.offline = !vm.offline }, Math.random() * 750 + 250)
    setTimeout(() => callback(null), Math.random() * 750 + 250)
  },
  toggleMachineDestroy (callback, name) {
    fakeMachines = fakeMachines.filter(vm => vm.name !== name)
    delay(() => callback(null))
  },
  toggleSnapshotCreate (callback, vmName) {
    let vm = fakeMachines.find(vm => vm.name === vmName)
    vm.snapshots.push({
      ID: guid(),
      size: vm.storage * 1000,
      createdAt: new Date()
    })
    delay(() => callback(null))
  },
  toggleSnapshotDelete (callback, vmName, id) {
    let vm = fakeMachines.find(vm => vm.name === vmName)
    vm.snapshots = vm.snapshots.filter(snap => snap.ID !== id)
    delay(() => callback(null))
  },
  toggleSnapshotRestore (callback, vmName, id) {
    delay(() => callback(null))
  }
}
