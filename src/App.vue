<template>
  <div id="app">
    <nav class="mb-3 mt-3">
      <div class="container">
        <div class="row w-100 m-0 align-items-center justify-content-between">
          <div class="col-auto pl-0 order-1">
            <router-link :to="{ name: 'Machines' }" class="main-nav-brand">
              fjell
            </router-link>
          </div>
          <div class="col-sm-12 col-md-auto pl-0 order-md-2 order-3">
            <ul class="nav main-nav-pills">
              <li class="nav-item mr-3">
                <router-link :to="{ name: 'Machines' }" class="nav-link" active-class="nav-item-active">Machines</router-link>
              </li>
              <li class="nav-item mr-3">
                <router-link :to="{ name: 'Storage' }" class="nav-link" active-class="nav-item-active">Storage</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'Networking' }" class="nav-link" active-class="nav-item-active">Networking</router-link>
              </li>
            </ul>
          </div>
          <div class="col-auto order-md-3 order-2">
            <div class="my-2 my-lg-0 main-nav-dropdown">
              <div class="btn-group add-service-dropdown">
                <button class="btn btn-success dropdown-toggle d-flex align-items-center" type="button" id="addDropdownToggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <strong>
                    <span class="ml-2">Create</span>
                  </strong>
                </button>
                <div class="dropdown-menu dropdown-menu-right add-instance-menu" aria-labelledby="addDropdownToggle">
                  <div class="dropdown-header">Compute</div>
                  <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'AddMachine' }">
                    Virtual Machine
                    <div class="small text-muted">Spawn virtual servers</div>
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <div class="dropdown-header">Storage</div>
                  <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'Storage' }">
                    Block volumes
                    <div class="small text-muted">Add storage to machines</div>
                  </router-link>
                  <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'Storage' }">
                    Buckets
                    <div class="small text-muted">Store and server static assets</div>
                  </router-link>
                  <div class="dropdown-divider"></div>
                  <div class="dropdown-header">Network</div>
                  <router-link exact-active-class="" class="dropdown-item" disabled :to="{ name: 'Networking' }">
                    Floating IP
                    <div class="small text-muted">Reserve IP addresses for servers</div>
                  </router-link>
                  <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'Networking' }">
                    Firewall
                    <div class="small text-muted">Increase server security</div>
                  </router-link>
                  <router-link exact-active-class="" class="dropdown-item" :to="{ name: 'Networking' }">
                    Load Balancer
                    <div class="small text-muted">Distribute traffic to servers</div>
                  </router-link>
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
  font-family: Nunito, -apple-system, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-bottom: 20px;
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
  font-size: 28px;
  font-family: 'Circular Std';
}
.main-nav-brand:hover {
  text-decoration: none;
}
.dropdown-header {
  display: block;
  text-transform: uppercase;
  font-size: 0.7em;
  clear: both;
  font-weight: 600;
  padding: 0.25rem 0.7rem;
  background-color: transparent;
  border: 0;
  width: 100%;
}

.main-nav-pills .nav-item a.active, .nav-item-active {
  color: #007dff;
  border-bottom: 3px solid #007dff;
}

.nav-item a:not(.nav-item-active) {
  color: #777777;
}

.main-nav-pills .nav-item a {
  font-weight: 500;
  padding-left: 0;
  padding-right: 0;
  text-transform: uppercase;
  font-size: 0.9em;
  font-weight: 600;
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
  @import url('https://fonts.googleapis.com/css?family=Nunito:300,400,700');
</style>
