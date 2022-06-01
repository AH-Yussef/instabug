<template>
  <div id="welcome">
    <div class="header">
      <div id="label">Welcome to <span class="email-label">{{getActiveEmail}}</span></div>
      <div id="logout-btn" @click="logout()">Logout</div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  name: 'welcome',
  computed: mapGetters(['getActiveEmail']),
  methods: {
    ...mapActions(['unAuthorize']),
    ...mapMutations(['setActiveEmail']),
    logout() {
      this.setActiveEmail("");
      this.unAuthorize();
      this.$router.push('/login');
    },
  }
}
</script>

<style lang="scss" scoped>
$primaryColor: rgb(6, 36, 112);
$shinyBlue: rgb(56, 137, 222);

.header {
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

#label {
  color: $primaryColor;
  font: {
    size: x-large;
    weight: bold;
  }

  .email-label {
    font-size: large;
    color: $shinyBlue;
  }
}

#logout-btn {
  color: white;
  background-color: $primaryColor;
  font-weight: 500;
  margin-left: auto;
  height: 2.5rem;
  width: 5rem;
  line-height: 2.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
}
</style>
