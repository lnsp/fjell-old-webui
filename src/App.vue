<template>
  <div id="app" class="container mt-3">
    <header class="align-items-center header pt-3">
      <nav>
        <ul class="nav nav-pills float-right">
          <li class="nav-item">
            <router-link :to="{ name: 'Dashboard' }" class="nav-link">Dashboard</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Storage' }" class="nav-link">Storage</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Networking' }" class="nav-link">Networking</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Settings' }" class="nav-link">Settings</router-link>
          </li>
        </ul>
      </nav>
      <h3 class="text-muted">
        Paddle
      </h3>
    </header>
    <router-view/>
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
