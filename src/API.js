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

var fakeMachines = []

export default {
  deployMachine (systemID, systemVersion, tierID, buckets, keys, names, callback) {
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
        buckets: buckets,
        storage: selectedTier.storage,
        systemName: selectedSystem.name + ' ' + selectedSystem.versions[systemVersion],
        systemSlug: selectedSystem.slug,
        tags: [],
        ipAddress: fakeIPAddress(),
        deployProgress: 0,
        offline: true,
        createdAt: new Date().toUTCString()
      })
    })
    callback(null)
  },
  getInstanceAllowanceOf (callback, tier) {
    setTimeout(() => callback(null, { min: 1, max: 10 }), Math.random() * 750 + 250)
  },
  getMachineSizeOptions (callback) {
    setTimeout(() => callback(null, machineTiers), Math.random() * 750 + 250)
  },
  getMachineSystemOptions (callback) {
    setTimeout(() => callback(null, machineSystems), Math.random() * 750 + 250)
  },
  getDeployedBlockStorage (callback) {
    setTimeout(() => callback(null, fakeStorage), Math.random() * 750 + 250)
  },
  getDeployedSSHKeys (callback) {
    setTimeout(() => callback(null, fakeKeys), Math.random() * 750 + 250)
  },
  getMachineByName (callback, name) {
    setTimeout(() => callback(null, fakeMachines.filter(m => m.name === name)[0]), Math.random() * 750 + 250)
  },
  getUsageStatsCPU (callback, name) {
    var labels = Array.apply(null, { length: 100 }).map((value, index, _) => new Date(new Date().getTime() - (100 - index) * 60000))
    var values = Array.apply(null, { length: 100 }).map((value, index, _) => Math.random() * index)
    setTimeout(() => callback(null, { labels: labels, data: values }), Math.random() * 750 + 250)
  },
  getMachineVNCSessionURL (callback, name) {
    setTimeout(() => callback(null, 'javascript:alert("getMachineVNCSession")'), Math.random() * 750 + 250)
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
    setTimeout(() => callback(null), Math.random() * 750 + 250)
  },
  getDeployedMachines (callback) {
    fakeMachines.forEach(element => {
      var offlineSwitch = false
      if (element.deployProgress < 100) {
        offlineSwitch = true
        element.deployProgress = Math.min(element.deployProgress + Math.random() * 10 + 1, 100)
      }
      if (offlineSwitch) element.offline = element.deployProgress < 100
    })
    setTimeout(() => callback(null, fakeMachines), Math.random() * 750 + 250)
  }
}
