<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div class="container">

      <router-link :to="{ name: 'Dashboard' }" class="navbar-brand">
        <!--<img :src="require('./assets/logo.svg')" style="width: 2em">!-->
        <strong>Paddle</strong>
      </router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'Dashboard' }" class="nav-link">Dashboard</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Storage' }" class="nav-link">Storage</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Networking' }" class="nav-link">Networking</router-link>
        </li>
      </ul>
      <div class="my-2 my-lg-0">
        <div class="dropdown add-service-dropdown">
          <button class="btn btn-primary dropdown-toggle d-flex align-items-center" type="button" id="addDropdownToggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <octicon name="plus"></octicon>
            <strong>
              <span class="ml-2">Add</span>
            </strong>
          </button>
          <div class="dropdown-menu" aria-labelledby="addDropdownToggle">
            <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'AddMachine' }">
              Virtual Machine
              <div class="small text-muted">Create virtual servers</div>
            </router-link>
            <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'Storage' }">
              Block Storage
              <div class="small text-muted">Add storage to machines</div>
            </router-link>
            <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'Storage' }">
              Bucket Storage
              <div class="small text-muted">Store and server static assets</div>
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'AddFloatingIP' }">
              Floating IP
              <div class="small text-muted">Reserve IP addresses for servers</div>
            </router-link>
            <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'AddFirewall' }">
              Firewall
              <div class="small text-muted">Increase server security</div>
            </router-link>
            <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'AddLoadBalancer' }">
              Load Balancer
              <div class="small text-muted">Distribute traffic to servers</div>
            </router-link>
          </div>
        </div>
      </div>
      </div>
    </nav>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Lato', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.add-service-dropdown .dropdown-item:hover {
  background-color: #dfefff;
}
</style>

<style lang="sass">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import url('https://fonts.googleapis.com/css?family=Lato');
</style>