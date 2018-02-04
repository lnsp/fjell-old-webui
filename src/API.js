let prefix = [
  'gitlab',
  'vmware',
  'docker',
  'kubernetes',
  'etcd'
]

let suffix = [
  'server',
  'prod',
  'node1',
  'node2',
  'node3'
]

let machineTiers = [
  { cpus: 1, memory: 1, storage: 25 },
  { cpus: 1, memory: 2, storage: 50 },
  { cpus: 2, memory: 4, storage: 80 },
  { cpus: 4, memory: 8, storage: 160 },
  { cpus: 6, memory: 16, storage: 320 },
  { cpus: 8, memory: 32, storage: 640 },
  { cpus: 12, memory: 48, storage: 960 },
  { cpus: 16, memory: 64, storage: 1280 },
  { cpus: 20, memory: 96, storage: 1920 },
  { cpus: 24, memory: 128, storage: 2560 },
  { cpus: 32, memory: 92, storage: 3840 }
]

let machineSystems = [
  {
    name: 'Ubuntu',
    slug: 'ubuntu',
    versions: [ '14.04 LTS', '16.04 LTS', '17.10' ],
    defaultVersion: 1
  },
  {
    name: 'Debian',
    slug: 'debian',
    versions: [ 'Stretch', 'Jessie', 'Wheezy' ],
    defaultVersion: 0
  },
  {
    name: 'Arch Linux',
    slug: 'archlinux',
    versions: [ '2018.01.01' ],
    defaultVersion: 0
  },
  {
    name: 'FreeBSD',
    slug: 'freebsd',
    versions: ['10.3', '10.4', '11.1'],
    defaultVersion: 2
  }
]

function fakeIPAddress () {
  var s = ''
  for (var i = 0; i < 4; i++) {
    s += Math.floor(Math.random() * 255 + 1) + '.'
  }
  return s.substring(0, s.length - 1)
}

function randomMachine () {
  let name = prefix[Math.floor(Math.random() * prefix.length)] + '-' + suffix[Math.floor(Math.random() * prefix.length)]
  let tier = machineTiers[Math.floor(Math.random() * machineTiers.length)]
  let system = machineSystems[Math.floor(Math.random() * machineSystems.length)]
  let systemVersion = system.versions[Math.floor(Math.random() * system.versions.length)]
  let ip = fakeIPAddress()
  return {
    name: name,
    memory: tier.memory,
    storage: tier.storage,
    cpus: tier.cpus,
    systemName: system.name + ' ' + systemVersion,
    systemSlug: system.slug,
    tags: [],
    ipAddress: ip,
    deployProgress: 0,
    offline: true,
    createdAt: new Date()
  }
}

var fakeMachines = []

var fakeTimer = null

export default {
  getMachineSizeOptions (callback) {
    setTimeout(() => callback(null, machineTiers), 1000)
  },
  getMachineSystemOptions (callback) {
    setTimeout(() => callback(null, machineSystems), 1000)
  },
  getDeployedMachines (callback) {
    fakeMachines.forEach(element => {
      if (element.deployProgress < 100) {
        element.deployProgress = Math.min(element.deployProgress + 5, 100)
      }
      element.offline = element.deployProgress < 100
    })
    callback(null, fakeMachines)
    if (fakeTimer === null) {
      fakeTimer = setInterval(() => {
        fakeMachines.push(randomMachine())
      }, 1000)
    }
  }
}
