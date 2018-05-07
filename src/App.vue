<template>
  <div id="app">
    <nav class="mb-3 mt-3">
      <div class="container">
        <div class="row w-100 m-0 align-items-center justify-content-between">
          <div class="col-auto pl-0 order-1">
            <router-link :to="{ name: 'Dashboard' }" class="main-nav-brand">
              <strong>王八蛋 Cloud</strong>
            </router-link>
          </div>
          <div class="col-sm-12 col-md-auto pl-0 order-md-2 order-3">
            <ul class="nav main-nav-pills">
              <li class="nav-item mr-3">
                <router-link :to="{ name: 'Dashboard' }" class="nav-link">Dashboard</router-link>
              </li>
              <li class="nav-item mr-3">
                <router-link :to="{ name: 'Storage' }" class="nav-link">Storage</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'Networking' }" class="nav-link">Networking</router-link>
              </li>
            </ul>
          </div>
          <div class="col-auto order-md-3 order-2">
            <div class="my-2 my-lg-0 main-nav-dropdown">
              <div class="btn-group add-service-dropdown">
                <button class="btn btn-success dropdown-toggle d-flex align-items-center" type="button" id="addDropdownToggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <icon name="plus"></icon>
                  <strong>
                    <span class="ml-2">Add</span>
                  </strong>
                </button>
                <div class="dropdown-menu dropdown-menu-right add-instance-menu" aria-labelledby="addDropdownToggle">
                  <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'AddMachine' }">
                    Virtual Machine
                    <div class="small text-muted">Create virtual servers</div>
                  </router-link>
                  <!--
                  <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'Storage' }">
                    Block storage
                    <div class="small text-muted">Add storage to machines</div>
                  </router-link>
                  <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'Storage' }">
                    Buckets
                    <div class="small text-muted">Store and server static assets</div>
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <router-link exact-active-class="" class="dropdown-item" disabled :to="{ name: 'AddFloatingIP' }">
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
                  !-->
                </div>
              </div>
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
  font-family: 'Fakt Pro', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/*
.add-service-dropdown .dropdown-item:hover {
  background-color: #dfefff;
}

.add-service-dropdown .dropdown-item.disabled {
  background-color: #fff;
  cursor: pointer;
}

.add-service-dropdown .dropdown-item.disabled:hover {
  background-color: #fff;
}
*/
.main-nav-brand {
  font-size: 24px;
}
.main-nav-brand:hover {
  text-decoration: none;
}

.main-nav-pills .nav-item a {
  color: #777777;
  font-weight: 500;
  padding-left: 0;
  padding-right: 0;
}
.main-nav-pills .nav-item a.active {
  color: #007dff;
  border-bottom: 3px solid #007dff;
}
.main-nav-pills .nav-item a:focus {
  outline: none !important;
}
.add-instance-menu .dropdown-item:active {
  background-color: #eee;
  color: #212529;
}
.add-instance-menu .dropdown-item:focus {
}
</style>

<style lang="sass">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import './assets/fonts/FaktPro-Medium.ttf';
  @import './assets/fonts/FaktPro-SemiBold.ttf';
  @import './assets/fonts/FaktPro-Normal.ttf';
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
</style>
