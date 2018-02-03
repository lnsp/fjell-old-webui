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

let vmTiers = [
  { memory: 1, storage: 25 },
  { memory: 2, storage: 50 },
  { memory: 4, storage: 80 },
  { memory: 8, storage: 160 }
]

let operatingSystems = [
  'Ubuntu 14.04',
  'Ubuntu 16.04',
  'Ubuntu 17.10',
  'Debian 7',
  'Debian 8',
  'Debian 9'
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
  let tier = Math.floor(Math.random() * vmTiers.length)
  let system = operatingSystems[Math.floor(Math.random() * operatingSystems.length)]
  let ip = fakeIPAddress()
  let tags = []
  return newMachine(name, tier, ip, system, tags)
}

function newMachine (name, tier, ip, system, tags) {
  return {
    name: name,
    memory: vmTiers[tier].memory,
    storage: vmTiers[tier].storage,
    system: system,
    systemName: system.replace(/ .*/, '').toLowerCase(),
    tags: tags,
    ipAddress: ip,
    createdAt: new Date(),
    deployProgress: 0,
    offline: true
  }
}

var fakeMachines = []

var fakeTimer = null

export default {
  fetchMachines (callback) {
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
      }, 10000)
    }
  }
}
