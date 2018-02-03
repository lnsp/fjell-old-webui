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
        <router-link :to="{ name: 'AddMachine' }" class="btn btn-primary align-items-center d-flex"><octicon name="plus" /><strong><span class="ml-3">Create</span></strong></router-link>
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
</style>

<style lang="sass">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
  @import url('https://fonts.googleapis.com/css?family=Lato');
</style>
