<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
  name: 'app',
  components: {
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || 'Instabug';
      }
    }
  },
  computed: mapGetters(['getActiveEmail']),
  methods: {
    ...mapMutations(['setActiveEmail']),
    getAuthInfo() {
      let authInfo = localStorage.getItem('authInfo');
      return JSON.parse(authInfo);
    }
  },
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
